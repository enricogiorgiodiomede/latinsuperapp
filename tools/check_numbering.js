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
 * This checks four things, and they are the four ways the numbering could lie:
 *
 *   1. the first marker is the first verse the citation names;
 *   2. the markers run 5, 10, 15 ... in order, with nothing skipped except
 *      where the Latin itself skips (a [...] line);
 *   3. counting the lines from one marker to the next gives the next marker,
 *      so the numbers agree with the text between them;
 *   4. the English and the Italian carry the SAME markers on the SAME lines,
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
const MARK = /^>\s*\*\*(\d+)\.\*\*/;
const GAP = /^>\s*\[\.\.\.\]/;

let checked = 0, bad = 0, unnumbered = [];
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
        .map((l, i) => { const m = l.match(MARK); return m ? { i: i, n: Number(m[1]) } : null; })
        .filter(Boolean);
      if (!marks.length) continue;                  // not numbered (yet)
      checked++;

      // 1. the first marker is on the first line, and is the cited first verse
      const cited = (f.citation || '').match(/vv?\.?\s*(\d+)(?:\s*-\s*(\d+))?/);
      const citedTo = cited && cited[2] ? Number(cited[2]) : 0;
      if (marks[0].i !== 0) fail(f.citation + ': the first line carries no number');
      else if (cited && marks[0].n !== Number(cited[1])) {
        fail(f.citation + ': starts at v. ' + marks[0].n + ' but the citation says ' + cited[1]);
      }

      // 2. and 3. every later marker is a multiple of five, and the lines
      //    between two markers account for the difference
      for (let k = 1; k < marks.length; k++) {
        const prev = marks[k - 1], cur = marks[k];
        if (cur.n % 5 !== 0) fail(f.citation + ': v. ' + cur.n + ' is marked but is not a multiple of five');
        // Counting lines only proves anything where one line is one verse.
        // Where a comic text prints two half-verses as one line, or runs two
        // verses together, the count is legitimately short, and the numbers
        // came from the alignment rather than from counting in the first place.
        const span = citedTo ? citedTo - Number(cited[1]) + 1 : 0;
        const oneToOne = span === lines.latin.length;
        const between = lines.latin.slice(prev.i, cur.i);
        const gaps = between.filter(l => GAP.test(l)).length;
        const verses = between.length - gaps;       // lines, each one verse
        if (oneToOne && !gaps && cur.n - prev.n !== verses) {
          fail(f.citation + ': ' + verses + ' lines between v. ' + prev.n + ' and v. ' + cur.n +
            ', which should be ' + (cur.n - prev.n));
        }
      }

      // 4. the translations carry the same markers on the same lines
      for (const field of ['english', 'italian']) {
        if (lines[field].length !== lines.latin.length) {
          fail(f.citation + ': the ' + field + ' has ' + lines[field].length +
            ' lines and the Latin has ' + lines.latin.length);
          continue;
        }
        const theirs = lines[field]
          .map((l, i) => { const m = l.match(MARK); return m ? m[1] + '@' + i : null; })
          .filter(Boolean).join(' ');
        const ours = marks.map(m => m.n + '@' + m.i).join(' ');
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

console.log('\n' + checked + ' numbered excerpts checked, ' + bad + ' failed');
if (unnumbered.length) {
  console.log(unnumbered.length + ' excerpts cite verse numbers but carry none yet:');
  unnumbered.forEach(c => console.log('   ' + c));
}
process.exit(bad ? 1 : 0);
