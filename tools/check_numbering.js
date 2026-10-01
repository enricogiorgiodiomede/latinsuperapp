/*
 * check_numbering.js - are the verse numbers printed on an excerpt right?
 *
 *   node tools/check_numbering.js
 *
 * Since v1.15.5 the comic and lyric excerpts carry verse numbers: the first
 * verse of the excerpt, and then every verse whose number is a multiple of
 * five, exactly as a printed edition numbers a page. The numbers matter,
 * because the metre labels point at them - "Trochaic Septenarius (vv. 755-760)"
 * can only be followed if v. 755 is findable.
 *
 * Two kinds of number appear, and the shape of the marker says which:
 *
 *   ARABIC  the verse numbers of the edition. The first one must be the verse
 *           the citation names, and the text between two markers must account
 *           for the difference.
 *   ROMAN   editorial numbers, this app's own, for a poet who survives only in
 *           quotation and therefore has no numbering of his own (Caecilius,
 *           Lucilius, Pomponius). These always start at I, and - the rule the
 *           user set - they COUNT STRAIGHT THROUGH the gaps between clusters,
 *           so that they describe the verses actually printed rather than
 *           pretending to know how many are lost. A [...] line takes no
 *           numeral and does not advance the count.
 *
 * This checks the ways the numbering could lie:
 *
 *   1. the first marker is on the first line, and is the verse the citation
 *      names (Arabic) or I (Roman);
 *   2. the markers run 5, 10, 15 ... in order, with nothing skipped;
 *   3. counting the lines from one marker to the next gives the next marker,
 *      so the numbers agree with the text between them;
 *   4. no multiple of five is missing off the end (Roman only, where the count
 *      is exact);
 *   5. the English and the Italian carry the SAME markers on the SAME lines,
 *      which is also a check that the translations are still line-for-line.
 *
 * An excerpt with no markers at all is listed as unnumbered, not failed: a
 * handful are still waiting on a citation that does not match the text.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

const isVerse = (l) => /^>\s*\S/.test(l);
const MARK = /^>\s*\*\*(\d+|[IVXLCDM]+)\.\*\*/;
const GAP = /^>\s*\[?\.\.\.\]?\s*$/;
const ROMAN = /^[IVXLCDM]+$/;

function unroman(s) {
  const V = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = V[s[i]], next = V[s[i + 1]] || 0;
    n += next > cur ? -cur : cur;
  }
  return n;
}

let checked = 0, bad = 0, editorial = 0;
const unnumbered = [];
const fail = (msg) => { bad++; console.log('FAIL ' + msg); };

for (const slug of Object.keys(AUTHORS)) {
  for (const w of AUTHORS[slug].works) {
    for (const f of w.fragments) {
      const fields = ['latin', 'english', 'italian'];
      const lines = {};
      for (const field of fields) lines[field] = (f[field] || '').split('\n').filter(isVerse);
      if (!lines.latin.length) continue;

      // Two standards live in the bank. Lucretius and the other hexameter
      // authors are numbered at the start of each SENTENCE, with prose
      // translations carrying a range - tools/check_verses.js checks those.
      // This tool is about the line-for-line excerpts introduced in v1.15.5,
      // whose translations have one line per verse; the line counts tell the
      // two apart without either having to declare itself.
      const lineForLine = lines.english.length === lines.latin.length &&
        lines.italian.length === lines.latin.length;
      if (!lineForLine) continue;

      const marks = lines.latin
        .map((l, i) => {
          const m = l.match(MARK);
          return m ? { i: i, n: ROMAN.test(m[1]) ? unroman(m[1]) : Number(m[1]), raw: m[1] } : null;
        })
        .filter(Boolean);
      if (!marks.length) continue;                  // not numbered (yet)
      checked++;

      const romans = marks.filter(m => ROMAN.test(m.raw)).length;
      if (romans && romans !== marks.length) {
        fail(f.citation + ': Roman and Arabic numerals mixed in one excerpt');
        continue;
      }
      const isEditorial = romans > 0;
      if (isEditorial) editorial++;

      // A very short editorial excerpt may number EVERY verse rather than the
      // first and every fifth: two or three quoted lines give "first and every
      // fifth" nothing to say, and the analysis sometimes needs to point at the
      // second of them (Pomponius: the metre label covers v. I because v. II is
      // only the four syllables Macrobius kept).
      const totalVerses = lines.latin.filter(l => !GAP.test(l)).length;
      const dense = isEditorial && marks.length === totalVerses && totalVerses < 5;

      // 1. the first marker is on the first verse, and is where it should
      //    start. An excerpt may OPEN with a gap, where the quotation begins
      //    mid-thought, and that line takes no number.
      const cited = (f.citation || '').match(/vv?\.?\s*(\d+)(?:\s*-\s*(\d+))?/);
      const citedTo = cited && cited[2] ? Number(cited[2]) : 0;
      const firstVerse = lines.latin.findIndex(l => !GAP.test(l));
      if (marks[0].i !== firstVerse) fail(f.citation + ': the first verse carries no number');
      else if (isEditorial) {
        if (marks[0].n !== 1) fail(f.citation + ': editorial numbering starts at ' + marks[0].raw + ', not I');
      } else if (cited && marks[0].n !== Number(cited[1])) {
        fail(f.citation + ': starts at v. ' + marks[0].n + ' but the citation says ' + cited[1]);
      }

      // 2. and 3. every later marker is a multiple of five, and the lines
      //    between two markers account for the difference
      for (let k = 1; k < marks.length; k++) {
        const prev = marks[k - 1], cur = marks[k];
        if (!dense && cur.n % 5 !== 0) fail(f.citation + ': v. ' + cur.raw + ' is marked but is not a multiple of five');
        if (cur.n <= prev.n) fail(f.citation + ': v. ' + cur.raw + ' comes after v. ' + prev.raw);
        const between = lines.latin.slice(prev.i, cur.i);
        const gaps = between.filter(l => GAP.test(l)).length;
        const verses = between.length - gaps;       // lines, each one verse
        // Counting lines only proves anything where one line is one verse.
        // Where a comic text prints two half-verses as one line, or runs two
        // verses together, the count is legitimately short, and the numbers
        // came from the alignment rather than from counting in the first place.
        // Editorial numbering has no such excuse: it was counted from the text.
        const span = citedTo ? citedTo - Number(cited[1]) + 1 : 0;
        const countable = isEditorial || (span === lines.latin.length && !gaps);
        if (countable && cur.n - prev.n !== verses) {
          fail(f.citation + ': ' + verses + ' verses between v. ' + prev.raw + ' and v. ' + cur.raw +
            ', which should be ' + (cur.n - prev.n));
        }
      }

      // 4. nothing missing off the end: if five or more verses follow the last
      //    marker, a marker was dropped
      if (isEditorial && !dense) {
        const last = marks[marks.length - 1];
        const after = lines.latin.slice(last.i + 1).filter(l => !GAP.test(l)).length;
        if (after >= 5) {
          fail(f.citation + ': ' + after + ' verses after the last marker (v. ' + last.raw +
            '), so v. ' + (last.n + 5) + ' should be marked too');
        }
      }

      // 5. the translations carry the same markers on the same lines
      for (const field of ['english', 'italian']) {
        if (lines[field].length !== lines.latin.length) {
          fail(f.citation + ': the ' + field + ' has ' + lines[field].length +
            ' lines and the Latin has ' + lines.latin.length);
          continue;
        }
        const theirs = lines[field]
          .map((l, i) => { const m = l.match(MARK); return m ? m[1] + '@' + i : null; })
          .filter(Boolean).join(' ');
        const ours = marks.map(m => m.raw + '@' + m.i).join(' ');
        if (theirs !== ours) {
          fail(f.citation + ': the ' + field + ' markers are ' + (theirs || '(none)') +
            ' where the Latin has ' + ours);
        }
      }
    }
  }
}

// what is still waiting
for (const slug of Object.keys(AUTHORS)) {
  for (const w of AUTHORS[slug].works) {
    for (const f of w.fragments) {
      const lat = (f.latin || '').split('\n').filter(isVerse);
      if (!lat.length || lat.some(l => MARK.test(l))) continue;
      if (!/vv?\.\s*\d/.test(f.citation || '')) continue;      // no verse numbers to print
      unnumbered.push(f.citation);
    }
  }
}

console.log('\n' + checked + ' numbered excerpts checked (' + editorial +
  ' of them editorial), ' + bad + ' failed');
if (unnumbered.length) {
  console.log(unnumbered.length + ' excerpts cite verse numbers but carry none yet:');
  unnumbered.forEach(c => console.log('   ' + c));
}
process.exit(bad ? 1 : 0);
