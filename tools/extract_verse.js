/*
 * extract_verse.js - pull VERSE passages out of the cached Latin Library pages
 * by verse number, verbatim, one verse per line.
 *
 *   node tools/extract_verse.js <spec.json> <out.json>
 *
 * The spec is { "<key>": ["<page>", <from>, <to>], ... }, e.g.
 * { "drn.1.62": ["lucretius1", 62, 79] }. The output maps each key to the
 * verses joined by "\n", and is read by apply_batch.js exactly like the prose
 * passages extract.js writes.
 *
 * Numbering. The page prints a number every five verses at the end of the line
 * (strip.js verseLines). Every other line is numbered by counting FORWARD from
 * the last printed number and, independently, BACKWARD from the next one; the
 * two counts must agree, or the line is left unnumbered and any range touching
 * it fails. That is what makes a reordered block safe: the Latin Library prints
 * Book I vv. 50-61 after v. 135, with 50 on its first line, so both counts
 * resolve it correctly and a range is found by NUMBER, never by position.
 *
 * The check. Every verse taken is compared word for word (lowercase, u/v and
 * i/j folded, punctuation dropped) with the same verse number in the Perseus
 * edition (tools/.cache/sections/drn.<book>.json, from
 * fetch_sections_perseus_verse.js). A difference is printed, never fixed: it is
 * either a real variant reading, which is left alone, or a typo in the source,
 * which becomes an `emend` on the fragment. A miscount shows up here too, as a
 * whole run of verses that do not match.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { verseLines } = require('./strip');

const [specFile, outFile] = process.argv.slice(2);
if (!specFile || !outFile) throw new Error('usage: extract_verse.js <spec.json> <out.json>');

const CACHE = path.join(__dirname, '.cache');
const FOOTER = new Set(['Lucretius', 'The Latin Library', 'The Classics Page']);

function fold(w) {
  return w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z]/g, '').replace(/j/g, 'i').replace(/v/g, 'u');
}
const foldLine = (s) => s.split(/\s+/).map(fold).filter(Boolean);

// Number the verses of one cached page.
//
// The page's own numbers cannot be trusted as the authority: in Book I it
// prints `156` on the verse that is 155 and `155` on the verse that is 158, and
// a count from a printed number runs straight through a reordered block. So
// every line is numbered by FINDING it in the Perseus edition - its folded words
// equal to exactly one Perseus line, preferring the verse right after the
// previous line's when a line occurs more than once (Lucretius repeats himself).
// A line that matches nothing (a variant reading) takes the number between its
// neighbours, but only when the neighbours leave exactly one to take. The
// printed numbers are then compared with the result and every disagreement is
// reported as a misprint on the page.
function numbered(page, ed) {
  const all = verseLines(fs.readFileSync(path.join(CACHE, page + '.txt'), 'utf8'));
  // The page opens with a site heading and a LIBER title, and closes with the
  // site footer; none of those are verses.
  const start = all.findIndex(v => v.text && /LIBER/.test(v.text)) + 1;
  const body = all.slice(start).filter(v => v.lacuna || !FOOTER.has(v.text));
  const byText = new Map();
  for (const l of ed) {
    if (l.gap) continue;
    const k = foldLine(l.text).join(' ');
    if (!byText.has(k)) byText.set(k, []);
    byText.get(k).push(parseInt(l.n, 10));
  }
  const nums = body.map(() => null);
  let prev = null;
  body.forEach((v, i) => {
    if (v.lacuna) { prev = null; return; }
    const c = byText.get(foldLine(v.text).join(' ')) || [];
    if (prev !== null && c.indexOf(prev + 1) >= 0) nums[i] = prev + 1;
    else if (c.length === 1) nums[i] = c[0];
    prev = nums[i];
  });
  // Fill single unmatched runs whose neighbours leave no choice.
  for (let i = 0; i < body.length; i++) {
    if (nums[i] !== null || body[i].lacuna) continue;
    let j = i; while (j < body.length && nums[j] === null && !body[j].lacuna) j++;
    const before = i > 0 ? nums[i - 1] : null, after = j < body.length ? nums[j] : null;
    if (before !== null && after !== null && after - before === j - i + 1) {
      for (let k = i; k < j; k++) nums[k] = before + (k - i) + 1;
    } else if (before === null && after !== null && i === 0) {
      for (let k = i; k < j; k++) nums[k] = after - (j - k);
    }
    i = j;
  }
  const misprints = [];
  body.forEach((v, i) => {
    if (v.lacuna || !v.n || /[a-z]$/.test(v.n)) return;
    if (nums[i] !== null && parseInt(v.n, 10) !== nums[i]) misprints.push('page prints ' + v.n + ' on v. ' + nums[i]);
  });
  const out = body.map((v, i) => (v.lacuna ? { lacuna: true } : { n: nums[i], text: v.text }));
  out.misprints = misprints;
  return out;
}

const spec = JSON.parse(fs.readFileSync(path.resolve(specFile), 'utf8'));
const out = {};
const pages = {};
let bad = 0, diffs = 0;

for (const [key, entry] of Object.entries(spec)) {
  if (key.startsWith('_')) continue;
  const [page, from, to] = entry;
  if (!fs.existsSync(path.join(CACHE, page + '.txt'))) { out[key] = 'ERR no cached page ' + page; bad++; continue; }
  const book = page.match(/(\d+)$/)[1];
  const edFile = path.join(CACHE, 'sections', 'drn.' + book + '.json');
  if (!fs.existsSync(edFile)) { out[key] = 'ERR no Perseus file - run fetch_sections_perseus_verse.js'; bad++; continue; }
  const ed = JSON.parse(fs.readFileSync(edFile, 'utf8')).lines;
  if (!pages[page]) {
    pages[page] = numbered(page, ed);
    if (pages[page].misprints.length) console.log(page + ': ' + pages[page].misprints.join('; '));
  }
  const lines = pages[page];
  // Every verse from..to must be on the page exactly once, and together they
  // must fill one unbroken run of lines. The run is taken in PAGE order, which
  // is the edited order: editors transpose single verses (Book I prints 15
  // before 14, and 155 after 158, in Perseus too), so the numbers inside a good
  // excerpt need not ascend. A lacuna or a stray verse inside the run fails.
  const at = [];
  for (let n = from; n <= to; n++) {
    const hits = lines.map((v, idx) => (v.n === n ? idx : -1)).filter(x => x >= 0);
    if (hits.length !== 1) { at.length = 0; out[key] = 'ERR verse ' + n + ' found ' + hits.length + ' times on the page'; break; }
    at.push(hits[0]);
  }
  if (!at.length) { bad++; continue; }
  const lo = Math.min(...at), hi = Math.max(...at);
  // The run may be broken ONLY by a lacuna the page itself marks with a row of
  // asterisks (Book V, between vv. 1012 and 1013): the manuscripts lose lines
  // there, editors print the gap, and the verse numbering runs straight through
  // it. Those lines come out as the app's `[...]` mark, which apply_batch does
  // not number, check_verses matches around, and verify splits on. Any OTHER
  // break - a stray line, a reordering across the boundary - still fails.
  const span = lines.slice(lo, hi + 1);
  const gaps = span.filter(v => v.lacuna).length;
  if (hi - lo - gaps !== to - from) {
    out[key] = 'ERR verses ' + from + '-' + to + ' do not form one unbroken run on the page (a stray line, or a reordering across the boundary)';
    bad++; continue;
  }
  const taken = span;
  if (gaps) console.log('   note: the page marks ' + gaps + ' lacuna between these verses; it becomes a [...] line');
  out[key] = taken.map(v => (v.lacuna ? '[...]' : v.text)).join('\n');
  out[key + '#n'] = taken.filter(v => !v.lacuna).map(v => v.n);
  const order = taken.filter(v => !v.lacuna).map(v => v.n);
  if (order.some((n, k) => n !== from + k)) {
    console.log('   note: the page (and the edition) order this excerpt ' +
      order.filter((n, k) => n !== from + k).map(n => n).join(', ') + ' out of sequence: ' + order.join(' '));
  }

  const rep = [];
  {
    for (const v of taken) {
      if (v.lacuna) continue;
      const p = ed.find(l => l.n === String(v.n));
      if (!p) { rep.push('   ' + v.n + ': not in Perseus'); continue; }
      const a = foldLine(v.text), b = foldLine(p.text);
      if (a.join(' ') !== b.join(' ')) {
        const onlyA = a.filter(w => b.indexOf(w) < 0), onlyB = b.filter(w => a.indexOf(w) < 0);
        rep.push('   ' + v.n + ': TLL [' + onlyA.join(' ') + ']  Perseus [' + onlyB.join(' ') + ']' + (p.del ? '  (Perseus brackets this line)' : ''));
      } else if (p.del) rep.push('   ' + v.n + ': Perseus brackets this line as spurious');
    }
  }
  diffs += rep.length;
  console.log(key.padEnd(14) + ' vv. ' + from + '-' + to + ' (' + taken.length + ')  ' +
    taken[0].text.slice(0, 32) + ' ... ' + taken[taken.length - 1].text.slice(-24));
  if (rep.length) console.log(rep.join('\n'));
}

fs.writeFileSync(path.resolve(outFile), JSON.stringify(out, null, 2));
console.log('\n' + Object.keys(out).length + ' passages, ' + bad + ' failed, ' + diffs + ' verse(s) differing from Perseus');
process.exit(bad ? 1 : 0);
