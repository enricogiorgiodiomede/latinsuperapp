/*
 * check_metres.js - keep js/metres.js honest against the bank.
 *
 *   node tools/check_metres.js
 *
 * The metre of an excerpt is held in a lookup table (js/metres.js) rather than
 * as a field on the excerpt itself, which keeps js/fragments.js and the whole
 * batch pipeline untouched but means the two can drift apart in silence. This
 * is the check that stops that.
 *
 * It asserts:
 *   1. every author and work named in ASSIGN exists in the bank;
 *   2. every citation named in a byCitation block exists in that work - a
 *      typo there would simply never match, and the label would vanish with
 *      no error anywhere;
 *   3. every metre id used resolves to a page or to a declared stub;
 *   4. no labelled excerpt is PROSE (one blockquote paragraph rather than one
 *      verse per line);
 *
 * And it REPORTS, without failing, where the excerpt's own analysis names a
 * different metre from the table. The labels were read off the analyses in the
 * first place, so a disagreement is worth a look - but an analysis may
 * legitimately mention a metre it is not written in (Livius' Odusia explains
 * that the hexameter had not arrived yet; the first line of an elegiac couplet
 * IS a hexameter), so this one is a prompt, not a verdict, and has a cleared
 * list like check_sections.js and check_context.js.
 *
 * Exit code 1 if a hard check fails.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

// js/metres.js expects an I18n; it only ever reads .lang, and English is the
// base language, so a stub is enough to load the table.
global.I18n = { lang: 'en' };
eval(fs.readFileSync(path.join(REPO, 'js/metres.js'), 'utf8'));
const { ASSIGN, STUBS, PAGES } = window.Metres;

// The metre words an analysis might use, mapped to the id they imply. Order
// matters: the longest phrase has to be tried first, so that "trochaic
// septenarius" is not read as a bare mention of the hexameter family.
const WORDS = [
  [/trochaic septenari/i, 'trochaic-septenarius'],
  [/settenari[oi] trocaic/i, 'trochaic-septenarius'],
  [/dactylic hexameter|hexameters?\b/i, 'dactylic-hexameter'],
  [/esametr[oi] dattilic|esametri?\b/i, 'dactylic-hexameter'],
  [/saturnian/i, 'saturnian'],
  [/saturni[oi]\b/i, 'saturnian'],
  [/hendecasyllab/i, 'phalaecian-hendecasyllable'],
  [/endecasillab/i, 'phalaecian-hendecasyllable'],
  [/elegiac couplet|elegiac distich/i, 'elegiac-couplets'],
  [/distic[ih] elegiac/i, 'elegiac-couplets']
];

// Read and cleared: an analysis that names a metre the excerpt is not in, and
// names no other. Empty, and it should stay that way for as long as possible.
//
// It is empty because the check collects EVERY metre an analysis names rather
// than the first one, which is what the two awkward cases needed. Livius'
// Odusia mentions the hexameter only to say he did not have it yet, and then
// asserts the Saturnian; Catullus 101 says its first line scans "almost as a
// dactylic hexameter" - true, since the first verse of an elegiac couplet IS a
// hexameter - and says "ten lines of elegiac couplets" a sentence later. Match
// on the first mention and both look like errors; match on all of them and
// both are correct.
const CLEARED = {};

let bad = 0, labelled = 0, linked = 0, checkedAnalyses = 0, look = 0, cleared = 0;
const fail = (msg) => { bad++; console.log('FAIL ' + msg); };

function fragmentsOf(slug, workId) {
  const a = AUTHORS[slug];
  if (!a) return null;
  const w = a.works.filter(x => x.id === workId)[0];
  return w ? w.fragments : null;
}

// A verse excerpt keeps one verse per "> " line; prose is one long blockquote
// paragraph (sometimes several, separated by a bare ">").
function looksLikeProse(f) {
  const lines = f.latin.split('\n').filter(l => l.trim() !== '' && l.trim() !== '>');
  if (lines.length === 1) return f.latin.length > 200;   // one very long line
  return lines.some(l => l.replace(/^> /, '').length > 140);
}

// ---- 1-3: the shape of the table --------------------------------------
for (const slug of Object.keys(ASSIGN)) {
  if (!AUTHORS[slug]) { fail('ASSIGN names an author the bank does not have: ' + slug); continue; }
  const node = ASSIGN[slug];
  const works = (typeof node === 'string')
    ? AUTHORS[slug].works.map(w => [w.id, node])
    : Object.keys(node).map(id => [id, node[id]]);

  for (const [workId, val] of works) {
    const frags = fragmentsOf(slug, workId);
    if (!frags) { fail(slug + ': ASSIGN names a work the bank does not have: ' + workId); continue; }

    const ids = new Set();
    if (typeof val === 'string') ids.add(val);
    else {
      if (val.def) ids.add(val.def);
      for (const cit of Object.keys(val.byCitation || {})) {
        ids.add(val.byCitation[cit]);
        if (!frags.some(f => f.citation === cit)) {
          fail(slug + '/' + workId + ': byCitation names a citation that is not in the work: ' + JSON.stringify(cit));
        }
      }
    }
    for (const id of ids) {
      if (!PAGES[id] && !STUBS[id]) fail(slug + '/' + workId + ': unknown metre id ' + JSON.stringify(id));
    }
  }
}

// ---- 4-5: every fragment the table actually labels ---------------------
for (const slug of Object.keys(AUTHORS)) {
  for (const w of AUTHORS[slug].works) {
    for (const f of w.fragments) {
      const m = window.Metres.forFragment(slug, w.id, f.citation);
      if (!m) continue;
      labelled++;
      if (m.hasPage) linked++;

      if (looksLikeProse(f)) {
        fail(f.citation + ' is labelled ' + m.name + ' but reads as prose');
      }

      // The analysis is the authority the labels were taken from. Collect
      // EVERY metre it names, not just the first: an analysis often mentions
      // more than one, and the table is right as long as its own is among them.
      const prose = (f.analysis || '') + ' ' + (f.analysisIt || '');
      const named = [];
      for (const [re, id] of WORDS) { if (re.test(prose) && named.indexOf(id) < 0) named.push(id); }
      if (named.length) {
        checkedAnalyses++;
        if (named.indexOf(m.id) < 0) {
          if (CLEARED[f.citation]) { cleared++; }
          else {
            look++;
            console.log('LOOK ' + f.citation + '\n  the table says ' + m.id +
              '; the analysis names only: ' + named.join(', '));
          }
        }
      }
    }
  }
}

// ---- coverage, for the record -----------------------------------------
const byMetre = {};
for (const slug of Object.keys(AUTHORS)) {
  for (const w of AUTHORS[slug].works) {
    for (const f of w.fragments) {
      const m = window.Metres.forFragment(slug, w.id, f.citation);
      if (m) byMetre[m.name] = (byMetre[m.name] || 0) + 1;
    }
  }
}
console.log('Labelled excerpts by metre:');
Object.keys(byMetre).sort().forEach(n => {
  const id = Object.keys(PAGES).filter(k => PAGES[k].name === n)[0];
  console.log('  ' + String(byMetre[n]).padStart(3) + '  ' + n + (id ? '  (has a page)' : ''));
});
console.log('\n' + labelled + ' excerpts labelled, ' + linked + ' of them linked to a page; ' +
  checkedAnalyses + ' checked against the metre named in their own analysis, ' +
  look + ' to look at, ' + cleared + ' already read and cleared; ' + bad + ' failed');
if (cleared) {
  Object.keys(CLEARED).forEach(c => console.log('  cleared: ' + c + ' - ' + CLEARED[c]));
}
process.exit(bad ? 1 : 0);
