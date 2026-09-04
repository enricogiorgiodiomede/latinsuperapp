/*
 * check_sections.js - catch a translation that divides an excerpt into
 * subsections DIFFERENTLY from the Latin.
 *
 *   node tools/check_sections.js            # every fragment carrying markers
 *   node tools/check_sections.js 1.11.5     # only fragments tagged 1.11.5
 *
 * Why this exists. Since v1.11.0 the app supplies the standard editorial
 * subsection numbers as bold `**n.**`, in the Latin AND in both translations,
 * so a reader checking a translation can find the place. An earlier check
 * already proved the three texts carry the SAME numbers in the SAME order -
 * and that turned out to be worth very little, because a marker can be in the
 * right sequence and still be in the wrong place. In v1.11.5 four of the nine
 * Book VII excerpts put a marker one period too early in both translations:
 * the Latin closed section 2 after two sentences, the translations closed it
 * after one, and every following section was off by a period for the rest of
 * the excerpt. The user found all four by reading. Nothing in the pipeline
 * looked.
 *
 * The check. A section is compared with its counterpart on two counts:
 *
 *   1. HOW IT ENDS. If the Latin section ends on a full stop, question mark
 *      or exclamation, the translation's section must too; if the Latin ends
 *      mid-period - on a comma, semicolon or colon, which is extremely common,
 *      since the editors divided Caesar by sense and not by sentence - the
 *      translation must also end mid-period. This is what catches a boundary
 *      dropped INSIDE a sentence, as at VII.89, where the Latin runs the
 *      period across the 1/2 boundary and the translations closed 1 on it.
 *
 *   2. HOW MANY SENTENCES IT HOLDS. Terminal marks are counted. This is what
 *      catches the commonest fault, as at VII.14 and VII.73: two Latin
 *      sentences in a section, one of them moved into the next section in
 *      translation. Both sections still end on a full stop, so test 1 sees
 *      nothing; the counts are 2 and 1, and test 2 sees it at once.
 *
 * Neither test proves a translation is right - only a reading does that - and
 * a flag is not automatically a fault. A translator may legitimately break one
 * long Latin period into two English sentences, or join two short ones, and
 * that shows up here as a count of 1 against 2. Those are the false positives
 * to expect, and they are cheap: look at the section, satisfy yourself the
 * text either side of the marker is the same text, and move on. Exit code is
 * always 0.
 *
 * CLEARED holds the ones that have already been read that way, so that a run
 * is silent unless something has changed. Each entry records the exact set of
 * flags the fragment produced when it was read: edit the text and the set
 * stops matching, and the fragment is reported in full again rather than
 * quietly staying on the list. Add to it only after reading the excerpt.
 *
 * What it cannot see. It compares shapes, not meaning. A translation that
 * divides in exactly the right places but renders the wrong clause in a
 * section will pass. Read the excerpt.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

const argv = process.argv.slice(2);
// --sigs prints the signature of every flagged fragment, ready to paste into
// CLEARED once the excerpt has been read and the flag judged harmless.
const harvest = argv.indexOf('--sigs') !== -1;
const only = argv.filter(function (a) { return a.charAt(0) !== '-'; })[0] || null;

// Split a field on its subsection markers. Anything before the first marker
// is the chapter heading (`> [73] `) and is not part of any section.
function sections(text) {
  if (!text) return null;
  const re = /\*\*(\d+)\.\*\*/g;
  const out = [];
  let m, n = null, from = 0;
  while ((m = re.exec(text))) {
    if (n !== null) out.push({ n: n, body: text.slice(from, m.index) });
    n = m[1];
    from = re.lastIndex;
  }
  if (n !== null) out.push({ n: n, body: text.slice(from) });
  return out.length ? out : null;
}

// Emphasis and quotation are invisible to both tests: a section that ends
// `servitute."` ends on a full stop, and one that ends `*stimuli*.` does too.
function clean(s) {
  return s.replace(/\*/g, '').replace(/[)\]"'”’»]/g, '').trim();
}

// A terminal mark ends a sentence when a space or the end of the field
// follows it - after the closers above are dropped. Ellipsis is not a
// sentence end and no excerpt in the bank ends a section on one.
//
// Abbreviations are the one thing that has to be subtracted, and they are all
// Latin: a praenomen (`C. Valerius Procillus`), a legion's number (`ab X.
// legionis`, `XII. legionis`), or a calendar date (`a.d. VII Id. Ian.`). The
// English and Italian spell all of these out, so an abbreviation always counts
// on one side of the comparison and not the other - II.25 and I.53 were both
// flagged for nothing before this went in, and BC I.5 was flagged for the `d.`
// of `a.d.` A dot only counts as an abbreviation when more text follows it
// INSIDE the same section: `circiter centum LX.` closes VII.3 and is a real
// full stop. The single-letter case is deliberately either case - a one-letter
// Latin word never ends a sentence, and `a.` and `d.` are half of every date.
const ABBREV = /(^|[\s.])(?:[A-Za-z]|Cn|Sex|Ser|Sp|App|Mam|Ti|Kal|Non|Id)$/;
function terminals(s) {
  const t = clean(s).replace(/\.\.\./g, '…');
  const re = /[.?!](?=\s|$)/g;
  let m, n = 0;
  while ((m = re.exec(t))) {
    const tail = t.slice(re.lastIndex);
    if (m[0] === '.' && tail.trim() && ABBREV.test(t.slice(0, m.index))) continue;
    n++;
  }
  return n;
}

function endsClosed(s) {
  return /[.?!]$/.test(clean(s));
}

// Read and cleared by hand on 2026-09-04, when the check was written. Every
// one of these is a punctuation choice and not a displaced boundary: the
// Latin closes a section on a semicolon or a colon where the translation
// closes it on a full stop, or divides one long Latin period into two. In
// each case the text on either side of the marker is the same text.
const CLEARED = {
  '(De Bello Gallico I.53.1-7)': {
    why: 'periit; duae filiae -> "perished in that flight. There were two daughters"',
    sig: 'english 4: holds 2 sentences, the Latin holds 1 | italian 4: holds 2 sentences, the Latin holds 1' },
  '(De Bello Gallico II.25)': {
    why: 'the single vast period closes on a comma; no translation can end two hundred words on one',
    sig: 'english 1: ends on a full stop, the Latin ends mid-period | italian 1: ends on a full stop, the Latin ends mid-period' },
  '(De Bello Gallico IV.17)': {
    why: 'the bridge runs on semicolons throughout; both translations close those clauses with full stops',
    sig: 'english 6: ends on a full stop, the Latin ends mid-period | english 6: holds 1 sentence, the Latin holds 0 | english 8: ends on a full stop, the Latin ends mid-period | english 8: holds 1 sentence, the Latin holds 0 | italian 6: ends on a full stop, the Latin ends mid-period | italian 6: holds 1 sentence, the Latin holds 0 | italian 8: ends on a full stop, the Latin ends mid-period | italian 8: holds 1 sentence, the Latin holds 0' },
  '(De Bello Gallico V.7)': {
    why: 'semicolon after posset and colon after cognosceret, both full stops in translation',
    sig: 'english 2: ends on a full stop, the Latin ends mid-period | english 3: ends on a full stop, the Latin ends mid-period | english 3: holds 1 sentence, the Latin holds 0 | italian 2: ends on a full stop, the Latin ends mid-period | italian 3: ends on a full stop, the Latin ends mid-period | italian 3: holds 1 sentence, the Latin holds 0' },
  '(De Bello Gallico V.14)': {
    why: 'semicolon after aspectu, full stop in translation',
    sig: 'english 2: ends on a full stop, the Latin ends mid-period | italian 2: ends on a full stop, the Latin ends mid-period' },
  '(De Bello Gallico V.27)': {
    why: 'the colon that opens Ambiorix\' speech becomes a full stop before it',
    sig: 'english 1: ends on a full stop, the Latin ends mid-period | english 1: holds 1 sentence, the Latin holds 0 | italian 1: ends on a full stop, the Latin ends mid-period | italian 1: holds 1 sentence, the Latin holds 0' },
  '(De Bello Gallico V.37)': {
    why: 'semicolon after sustinent, full stop in translation',
    sig: 'english 5: ends on a full stop, the Latin ends mid-period | italian 5: ends on a full stop, the Latin ends mid-period' },
  '(De Bello Gallico VI.11)': {
    why: 'colon after egeret -> "for the following reason: ... . For each man"',
    sig: 'english 4: holds 2 sentences, the Latin holds 1 | italian 4: holds 2 sentences, the Latin holds 1' },
  '(De Bello Gallico VI.14)': {
    why: 'two Latin sentences joined on a semicolon in both translations',
    sig: 'english 3: holds 1 sentence, the Latin holds 2 | italian 3: holds 1 sentence, the Latin holds 2' },
  '(De Bello Gallico VI.21)': {
    why: 'the full stop after student falls inside section 3 either way',
    sig: 'english 3: ends on a full stop, the Latin ends mid-period | italian 3: ends on a full stop, the Latin ends mid-period' },
  '(De Bello Gallico VII.4)': {
    why: 'semicolon after Gergovia, full stop in translation',
    sig: 'english 2: ends on a full stop, the Latin ends mid-period | english 2: holds 2 sentences, the Latin holds 1 | italian 2: ends on a full stop, the Latin ends mid-period | italian 2: holds 2 sentences, the Latin holds 1' },
  '(De Bello Gallico VII.28)': {
    why: 'semicolon after interfecta, full stop in translation',
    sig: 'english 3: ends on a full stop, the Latin ends mid-period | english 3: holds 1 sentence, the Latin holds 0 | italian 3: ends on a full stop, the Latin ends mid-period | italian 3: holds 1 sentence, the Latin holds 0' },
  '(De Bello Civili I.7)': {
    why: 'ne cogitatum quidem set off as its own sentence in both translations',
    sig: 'english 6: holds 3 sentences, the Latin holds 2 | italian 6: holds 3 sentences, the Latin holds 2' }
};

let checked = 0, flagged = 0, cleared = 0;
const notes = [], quiet = [];

for (const slug of Object.keys(AUTHORS)) {
  for (const work of AUTHORS[slug].works) {
    for (const f of work.fragments || []) {
      if (only && f.version !== only) continue;
      const la = sections(f.latin);
      if (!la) continue;
      checked++;
      const bad = [];
      for (const lang of ['english', 'italian']) {
        const tr = sections(f[lang]);
        if (!tr) { bad.push('  ' + lang + ': carries no markers at all'); continue; }
        if (tr.length !== la.length) {
          bad.push('  ' + lang + ': ' + tr.length + ' sections against the Latin\'s ' + la.length);
          continue;
        }
        for (let i = 0; i < la.length; i++) {
          if (tr[i].n !== la[i].n) {
            bad.push('  ' + lang + ' section ' + (i + 1) + ': numbered ' + tr[i].n + ', Latin has ' + la[i].n);
            continue;
          }
          const lc = endsClosed(la[i].body), tc = endsClosed(tr[i].body);
          if (lc !== tc) {
            bad.push('  ' + lang + ' ' + la[i].n + ': ends ' + (tc ? 'on a full stop' : 'mid-period')
              + ', the Latin ends ' + (lc ? 'on a full stop' : 'mid-period')
              + '\n      LA ...' + clean(la[i].body).slice(-60)
              + '\n      TR ...' + clean(tr[i].body).slice(-60));
          }
          const ln = terminals(la[i].body), tn = terminals(tr[i].body);
          if (ln !== tn) {
            bad.push('  ' + lang + ' ' + la[i].n + ': holds ' + tn + ' sentence' + (tn === 1 ? '' : 's')
              + ', the Latin holds ' + ln);
          }
        }
      }
      if (bad.length) {
        // The signature is the summary line of each flag, without the two
        // excerpt lines, so it changes when the counts or the boundaries
        // change and not when a word inside a section is reworded.
        const sig = bad.map(function (b) { return b.split('\n')[0].trim(); }).join(' | ');
        const ok = CLEARED[f.citation];
        if (harvest) { console.log('  ' + JSON.stringify(f.citation) + ': ' + JSON.stringify(sig) + ','); continue; }
        if (!ok) {
          flagged++;
          notes.push(f.citation + '  [' + slug + '/' + work.id + ']\n' + bad.join('\n'));
        } else if (ok.sig !== sig) {
          flagged++;
          notes.push(f.citation + '  [' + slug + '/' + work.id + ']  ON THE CLEARED LIST, BUT ITS FLAGS HAVE CHANGED'
            + '\n  was: ' + ok.sig + '\n  now: ' + sig + '\n' + bad.join('\n'));
        } else {
          cleared++;
          quiet.push('  ' + f.citation + ' - ' + ok.why);
        }
      }
    }
  }
}

if (harvest) process.exit(0);
if (notes.length) console.log(notes.join('\n\n') + '\n');
console.log(checked + ' fragment' + (checked === 1 ? '' : 's') + ' with subsection markers checked, '
  + flagged + ' to look at'
  + (cleared ? ', ' + cleared + ' already read and cleared:' : '.'));
if (cleared) console.log(quiet.join('\n'));
