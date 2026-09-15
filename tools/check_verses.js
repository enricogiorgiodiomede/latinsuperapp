/*
 * check_verses.js - for POETRY excerpts, prove that every verse marker sits on
 * its verse and that every line is the source's line, spacing included.
 *
 *   node tools/check_verses.js            # every verse excerpt in the bank
 *   node tools/check_verses.js 1.14.0     # only fragments tagged 1.14.0
 *
 * Why this exists. v1.14.0 numbered two Latin blocks by the manuscript numbers
 * Perseus keeps for a transposed line - `**15.**` on *inde ferae pecudes*, which
 * is the 14th verse as the poem is read, and `**156.**` on *quas ob res*, the
 * 155th - and the user found both against a printed edition. The app numbers
 * verses IN READING ORDER, the way school editions do: the first line of
 * `(De Rerum Natura I, vv. 1-20)` is verse 1 and every line after it is one more.
 *
 * Checks, per verse excerpt (a citation ending `, vv. a-b)`):
 *   1. The Latin has exactly b - a + 1 lines.
 *   2. Every `**n.**` in the Latin is on line n - a, followed by one space, and
 *      either opens the line or follows a single space.
 *   3. Every line, markers removed, is IDENTICAL to the corresponding line of the
 *      cached Latin Library page - same words, same punctuation, same spacing -
 *      and the run of lines is contiguous on the page. No doubled, leading or
 *      trailing spaces.
 *   4. Each translation's blocks are `**a-b.**` ranges (or `**a.**` for one
 *      verse) that start on the Latin's markers and together cover the excerpt
 *      exactly, with no gap and no overlap.
 *
 * Exit code 1 if anything fails.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { verseLines, VERSE_PAGE } = require('./strip');

const REPO = path.join(__dirname, '..');
const CACHE = path.join(__dirname, '.cache');
const only = process.argv.slice(2).filter(a => !a.startsWith('-'))[0] || null;

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources.json'), 'utf8'));
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

const pageLines = {};
function linesOf(page) {
  if (!pageLines[page]) {
    const file = path.join(CACHE, page.split('/').pop() + '.txt');
    if (!fs.existsSync(file)) throw new Error('no cached page ' + page + ' - run fetch_sources.js');
    pageLines[page] = verseLines(fs.readFileSync(file, 'utf8')).filter(v => !v.lacuna).map(v => v.text);
  }
  return pageLines[page];
}

let checked = 0, failed = 0;
for (const author of Object.values(AUTHORS)) {
  for (const w of author.works) {
    const pages = (cfg[w.id] || []).filter(p => VERSE_PAGE.test(p));
    if (!pages.length) continue;
    for (const f of w.fragments) {
      if (only && f.version !== only) continue;
      // `, vv. a-b)` or, where an editor has moved a distant verse into the
      // passage and it keeps its own number, `, vv. a-b, c)` (II, vv. 646-659, 680).
      const cm = f.citation.match(/, vv\. (\d+)-(\d+)((?:, \d+)*)\)$/);
      if (!cm) continue;
      checked++;
      const from = parseInt(cm[1], 10), rangeTo = parseInt(cm[2], 10);
      const extras = cm[3] ? cm[3].split(',').map(s => s.trim()).filter(Boolean).map(Number) : [];
      const verseNo = [];
      for (let n = from; n <= rangeTo; n++) verseNo.push(n);
      verseNo.push(...extras);
      const to = verseNo[verseNo.length - 1];
      const bad = [];
      const lines = f.latin.split('\n').map(l => l.replace(/^> /, ''));

      // 1. line count
      if (lines.length !== verseNo.length) bad.push('the Latin has ' + lines.length + ' lines for ' + verseNo.length + ' verses');

      // 2. markers on their verses
      const starts = [];
      lines.forEach((l, i) => {
        const re = /\*\*(\d+)\.\*\*/g;
        let m;
        while ((m = re.exec(l))) {
          const n = parseInt(m[1], 10);
          starts.push(n);
          if (n !== verseNo[i]) bad.push('marker ' + n + '. is on verse ' + verseNo[i] + ': ' + JSON.stringify(l));
          if (l[re.lastIndex] !== ' ' || l[re.lastIndex + 1] === ' ') bad.push('marker ' + n + '. is not followed by exactly one space');
          if (m.index > 0 && (l[m.index - 1] !== ' ' || l[m.index - 2] === ' ')) bad.push('marker ' + n + '. is not preceded by exactly one space');
        }
      });
      if (starts[0] !== from) bad.push('the first block does not open the excerpt');

      // 3. verbatim lines, spacing included
      const clean = lines.map(l => l.replace(/\*\*\d+\.\*\* /g, ''));
      clean.forEach((l, i) => {
        if (/ {2}|^ | $/.test(l)) bad.push('verse ' + (from + i) + ' has a doubled, leading or trailing space: ' + JSON.stringify(l));
      });
      let matched = false;
      for (const page of pages) {
        const P = linesOf(page);
        const hits = P.map((t, j) => (t === clean[0] ? j : -1)).filter(j => j >= 0);
        for (const j of hits) {
          const k = clean.findIndex((t, i) => P[j + i] !== t);
          if (k < 0) { matched = true; break; }
          if (hits.length === 1) {
            bad.push('verse ' + (from + k) + ' differs from the page:\n      app : ' + JSON.stringify(clean[k]) + '\n      page: ' + JSON.stringify(P[j + k]));
            matched = true;
          }
        }
        if (matched) break;
      }
      if (!matched) bad.push('the first verse is not a line of the source page: ' + JSON.stringify(clean[0]));

      // 4. translation ranges
      for (const lang of ['english', 'italian']) {
        const marks = [];
        // `**14-16.**`, `**974.**`, or `**655-659, 680.**` for a block that ends on a
        // transposed verse; the block's end is its last number.
        const re = /\*\*(\d+)(?:-(\d+))?((?:, \d+)*)\.\*\*/g;
        let m;
        while ((m = re.exec(f[lang]))) {
          const tail = m[3] ? m[3].split(',').map(s => s.trim()).filter(Boolean).map(Number) : [];
          const end = tail.length ? tail[tail.length - 1] : (m[2] ? parseInt(m[2], 10) : parseInt(m[1], 10));
          marks.push([parseInt(m[1], 10), end, !!m[2]]);
        }
        if (marks.length !== starts.length) { bad.push(lang + ': ' + marks.length + ' blocks, the Latin has ' + starts.length); continue; }
        marks.forEach(([a, b, ranged], i) => {
          const want = i + 1 < starts.length ? starts[i + 1] - 1 : to;
          if (a !== starts[i] || b !== want) bad.push(lang + ': block ' + a + (ranged ? '-' + b : '') + ' should be ' + starts[i] + (want > starts[i] ? '-' + want : ''));
          if (ranged && a === b) bad.push(lang + ': one-verse block written as a range ' + a + '-' + b);
          if (!ranged && want > starts[i]) bad.push(lang + ': block ' + a + ' needs its range ' + a + '-' + want);
        });
      }

      if (bad.length) {
        failed++;
        console.log('FAIL ' + f.citation + '\n  ' + bad.join('\n  '));
      } else {
        console.log('OK   ' + f.citation + '  (' + lines.length + ' verses, ' + starts.length + ' blocks)');
      }
    }
  }
}
console.log('\n' + checked + ' verse excerpts checked, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
