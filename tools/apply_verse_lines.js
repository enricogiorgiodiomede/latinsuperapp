'use strict';
/*
 * Convert a verse excerpt from the SENTENCE-BLOCK standard to the LINE-FOR-LINE
 * one used by Catullus, Plautus and Terence: the Latin marks the first verse of
 * the excerpt and then every verse whose number is a multiple of five, and each
 * translation carries one line per verse with the same markers on the same
 * lines. This is the standard `check_numbering.js` enforces.
 *
 *   node tools/apply_verse_lines.js <author-slug> <batch.json>
 *   node tools/apply_verse_lines.js titus-lucretius-carus batch/luc_b6a.json
 *
 * Written for the Lucretius conversion (v1.15.10-v1.15.15, all 60 excerpts and
 * 1,018 verses, one book per release) and kept for the next poet moved over.
 *
 * The batch file is [{ cit, nums?, en: [...], it: [...] }], one translation line
 * per Latin verse, in verse order and WITH NO MARKERS: this script puts the
 * markers on all three columns itself, so they cannot disagree.
 *
 * The Latin is NOT retyped. Its lines are kept exactly as they are and only the
 * markers move: off the sentence openings they used to sit on, and onto the
 * verses the line-for-line rule wants them on.
 */
const fs = require('fs');
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const esc = (t) => JSON.stringify(t).slice(1, -1);
const isVerse = (l) => /^>\s*\S/.test(l);
const MARK = /^>\s*\*\*[\d-]+\.\*\*\s*/;

const slug = process.argv[2];
const batch = process.argv[3];
if (!slug || !batch) {
  console.error('usage: node tools/apply_verse_lines.js <author-slug> <batch.json>');
  process.exit(1);
}

const jobs = JSON.parse(fs.readFileSync(batch, 'utf8'));
let src = fs.readFileSync('js/fragments.js', 'utf8');
global.window = {};
eval(src);
const author = window.PracticeBank.authors[slug];
if (!author) throw new Error('no such author in the bank: ' + slug);
const all = author.works.reduce((a, w) => a.concat(w.fragments), []);

let done = 0;
for (const job of jobs) {
  const frag = all.find(f => f.citation === job.cit);
  if (!frag) throw new Error('not found: ' + job.cit);
  const m = frag.citation.match(/vv?\.\s*(\d+)/);
  if (!m) throw new Error(job.cit + ': the citation does not name a first verse');
  const first = Number(m[1]);

  // the Latin, markers stripped, nothing else touched
  const latin = frag.latin.split('\n').filter(isVerse).map(l => l.replace(MARK, '> '));
  if (job.en.length !== latin.length || job.it.length !== latin.length) {
    throw new Error(job.cit + ': ' + latin.length + ' verses but ' +
      job.en.length + ' en / ' + job.it.length + ' it lines');
  }

  // A [...] line is a lacuna the source itself marks, not a verse: it takes no
  // number and does not advance the count. The two translations must carry it
  // in the same position, so that the three columns stay aligned.
  const GAP = /^>\s*\[?\.\.\.\]?\s*$/;
  const isGap = latin.map(l => GAP.test(l));
  ['en', 'it'].forEach(function (k) {
    job[k].forEach(function (t, i) {
      const gap = /^\s*\[?\.\.\.\]?\s*$/.test(t);
      if (gap !== isGap[i]) {
        throw new Error(job.cit + ': line ' + (i + 1) + ' is a lacuna in ' +
          (isGap[i] ? 'the Latin but not in the ' + k : 'the ' + k + ' but not in the Latin'));
      }
    });
  });

  // The verse each line carries. Normally the excerpt runs straight, so it is
  // the first verse plus however many VERSES (not lines) have gone before. An
  // excerpt that is TRIMMED or pulls in a verse from far away says so with an
  // explicit `nums` list, with a null where a lacuna falls - v. 680 printed
  // after v. 659 is still v. 680, and DRN VI.738-755, 760-766 is both trimmed
  // and gapped, so neither counting up nor counting lines would land right.
  let seen = -1;
  const nums = job.nums || latin.map((_, i) => isGap[i] ? null : first + (++seen));
  if (nums.length !== latin.length) throw new Error(job.cit + ': nums length');
  if (nums[0] !== first) throw new Error(job.cit + ': nums must start at the cited first verse');
  nums.forEach((n, i) => {
    if ((n == null) !== isGap[i]) throw new Error(job.cit + ': nums null at line ' + (i + 1) +
      ' does not match the lacuna in the Latin');
  });

  // marker on the first verse and on every multiple of five
  const mark = (line, i) => {
    const n = nums[i];
    if (n == null) return line;                       // the lacuna
    if (n !== first && n % 5 !== 0) return line;
    return line.replace(/^>\s?/, '> **' + n + '.** ');
  };

  const next = {
    latin: latin.map(mark).join('\n'),
    english: job.en.map((t, i) => mark('> ' + t, i)).join('\n'),
    italian: job.it.map((t, i) => mark('> ' + t, i)).join('\n')
  };

  for (const field of ['latin', 'english', 'italian']) {
    if (next[field] === frag[field]) continue;
    const a = esc(frag[field]), b = esc(next[field]);
    if (src.split(a).length - 1 !== 1) throw new Error('field not unique: ' + job.cit + ' ' + field);
    src = src.replace(a, () => b);
  }
  done++;
  console.log('converted  ' + job.cit + '   ' + latin.filter((_, i) => !isGap[i]).length +
    ' verses, markers ' +
    nums.filter(n => n != null && (n === first || n % 5 === 0)).join(', ') +
    (isGap.some(Boolean) ? '   (with a lacuna)' : ''));
}
fs.writeFileSync('js/fragments.js', src, 'utf8');
console.log('\n' + done + ' excerpts converted');
console.log('Now run: node tools/check_verses.js && node tools/check_numbering.js && node tools/verify.js');
