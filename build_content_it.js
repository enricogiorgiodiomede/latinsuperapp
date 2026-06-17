/*
 * build_content_it.js - ONE-OFF generator. Parses italian_translations_archaic.md
 * (the user's Italian working file, left untouched) and emits js/content-it.js
 * with the Italian biography / works / style per author + the era intro, keyed
 * by the SAME slugs the app uses. The Italian file's heading levels are
 * inconsistent, so we anchor on author NAMES rather than heading depth. Run with
 * `node build_content_it.js`, then delete this file.
 */
'use strict';
var fs = require('fs');

var SRC = 'italian_translations_archaic.md';
var OUT = 'js/content-it.js';

// Author anchors in file order: first heading line matching `re` (whose slug is
// not yet located) starts that author's span.
var ANCHORS = [
  { slug: 'livius-andronicus', re: /livio andronico/i },
  { slug: 'gnaeus-naevius', re: /gneo nevio/i },
  { slug: 'quintus-ennius', re: /quinto ennio/i },
  { slug: 'titus-maccius-plautus', re: /tito maccio plauto/i },
  { slug: 'marcus-porcius-cato', re: /marco porcio catone/i },
  { slug: 'caecilius-statius', re: /caecilius statius/i },
  { slug: 'publius-terentius-afer', re: /publius terentius afer|terenzio/i },
  { slug: 'marcus-pacuvius-and-lucius-accius', re: /marco pacuvio/i },
  { slug: 'gaius-lucilius', re: /gaio lucilio/i },
  { slug: 'pomponius-bononiensis-and-quintus-novius', re: /pomponio bononiense/i }
];

function classify(headingText) {
  var t = headingText.toLowerCase();
  if (/testo latin|testi latin/.test(t)) return null;   // excerpt -> skip
  if (/livello/.test(t)) return null;                    // rating -> skip
  if (/\bbiograf/.test(t)) return 'biography';
  if (/\boper/.test(t)) return 'works';
  if (/\bstile/.test(t)) return 'style';
  return null;
}

// Normalize Italian apostrophe-style accents (e' -> è, perche' -> perché,
// virtu' -> virtù, citta' -> città, mando' -> mandò, ...) to proper accents.
// Skips *...* (Latin) spans, elisions (apostrophe + letter), truncated
// imperatives / po', closing-quote words, and one known source typo.
var ACC_SKIP = { po: 1, fa: 1, va: 1, da: 1, di: 1, sta: 1, mo: 1, be: 1, to: 1,
  estraneo: 1, fratello: 1, sorella: 1, me: 1, temano: 1, sto: 1, sette: 1 };
var ACC_E = { e: 'è', cioe: 'cioè', ahime: 'ahimè', ohime: 'ohimè', pie: 'piè',
  caffe: 'caffè', te: 'tè', perche: 'perché', purche: 'purché', anziche: 'anziché',
  finche: 'finché', poiche: 'poiché', benche: 'benché', giacche: 'giacché',
  sicche: 'sicché', nonche: 'nonché', ne: 'né', se: 'sé', combatte: 'combatté',
  pote: 'poté', dove: 'dové', batte: 'batté', crede: 'credé' };
var ACC_OVERRIDE = { elogi: 'elogiò' };
var ACC_GRAVE = { a: 'à', i: 'ì', o: 'ò', u: 'ù' };
var accUnknown = {};
function accCap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function normalizeAccents(text) {
  if (!text) return text;
  return text.split(/(\*[^*]+\*)/).map(function (seg, i) {
    if (i % 2 === 1) return seg; // italic Latin span -> untouched
    return seg.replace(/([A-Za-zàèéìòùÀÈÉÌÒÙ]+)'(?=[^A-Za-zàèéìòùÀÈÉÌÒÙ]|$)/g, function (m, word) {
      var low = word.toLowerCase();
      if (ACC_SKIP[low]) return m;
      var isCap = word.charAt(0) !== low.charAt(0);
      if (ACC_OVERRIDE[low]) return isCap ? accCap(ACC_OVERRIDE[low]) : ACC_OVERRIDE[low];
      var last = low.charAt(low.length - 1);
      if (ACC_GRAVE[last]) return word.slice(0, -1) + ACC_GRAVE[last];
      if (last === 'e') {
        if (ACC_E[low]) return isCap ? accCap(ACC_E[low]) : ACC_E[low];
      }
      accUnknown[low] = (accUnknown[low] || 0) + 1;
      return m;
    });
  }).join('');
}

function clean(lines) {
  return normalizeAccents(lines
    .filter(function (l) {
      if (/^\s*---\s*$/.test(l)) return false;                 // hr separators
      if (/^\s*!\[.*\]\(.*\)\s*$/.test(l)) return false;       // images
      return true;
    })
    .join('\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, ''));
}

function isHeading(line) { return /^#{1,6}\s+\S/.test(line); }
function headingText(line) { return line.replace(/^#{1,6}\s+/, '').trim(); }

var text = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
var lines = text.split('\n');

// 1) Locate author anchors + the intro heading.
var located = {};        // slug -> line index
var order = [];          // [{ slug, idx }]
var introIdx = -1;
for (var i = 0; i < lines.length; i++) {
  if (!isHeading(lines[i])) continue;
  var h = headingText(lines[i]);
  if (introIdx === -1 && /introduzione/i.test(h)) { introIdx = i; continue; }
  for (var a = 0; a < ANCHORS.length; a++) {
    if (ANCHORS[a].re.test(h) && !(ANCHORS[a].slug in located)) {
      located[ANCHORS[a].slug] = i;
      order.push({ slug: ANCHORS[a].slug, idx: i });
      break;
    }
  }
}
order.sort(function (x, y) { return x.idx - y.idx; });

// 2) Era intro: body under the intro heading up to the first author anchor.
var firstAuthorIdx = order.length ? order[0].idx : lines.length;
var introLines = [];
if (introIdx !== -1) {
  for (var j = introIdx + 1; j < firstAuthorIdx; j++) {
    if (/^\s*---\s*$/.test(lines[j])) break;  // intro ends at first hr
    introLines.push(lines[j]);
  }
}
var eraIntro = { archaic: clean(introLines) };

// 3) Each author span -> biography / works / style.
function extractAuthor(startIdx, endIdx) {
  var section = null;
  var buf = { biography: [], works: [], style: [] };
  for (var k = startIdx + 1; k < endIdx; k++) {
    var line = lines[k];
    if (isHeading(line)) { section = classify(headingText(line)); continue; }
    if (section && buf[section]) buf[section].push(line);
  }
  return {
    biography: clean(buf.biography),
    works: clean(buf.works),
    style: clean(buf.style)
  };
}

var authors = {};
for (var o = 0; o < order.length; o++) {
  var startIdx = order[o].idx;
  var endIdx = o + 1 < order.length ? order[o + 1].idx : lines.length;
  authors[order[o].slug] = extractAuthor(startIdx, endIdx);
}

// 4) Emit.
var header =
  '/*\n' +
  ' * content-it.js - GENERATED by build_content_it.js. Italian author prose\n' +
  ' * (biography / works / style) + era intro, extracted from\n' +
  ' * italian_translations_archaic.md and keyed by the app slugs. Do NOT edit by\n' +
  ' * hand: change the markdown and regenerate. data.js scrubs ranking language\n' +
  ' * from this at render time (scrubRankingIt), as it does for the English text.\n' +
  ' */\n';

var body =
  'window.__AUTHORS_IT__ = ' + JSON.stringify(authors, null, 2) + ';\n' +
  'window.__ERA_INTRO_IT__ = ' + JSON.stringify(eraIntro, null, 2) + ';\n';

fs.writeFileSync(OUT, header + body);

// Console report so we can eyeball coverage.
console.log('intro chars:', eraIntro.archaic.length);
Object.keys(authors).forEach(function (slug) {
  var x = authors[slug];
  console.log(slug, '| bio', x.biography.length, '| works', x.works.length, '| style', x.style.length);
});
console.log('authors found:', Object.keys(authors).length, '/ 10');
var accLeft = Object.keys(accUnknown);
console.log(accLeft.length ? 'apostrophe tokens left unconverted (review): ' + accLeft.map(function (k) { return k + "'x" + accUnknown[k]; }).join(', ') : 'all apostrophe-accents normalized');
