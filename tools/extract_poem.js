/*
 * extract_poem.js - pull Catullus passages out of the cached Latin Library page
 * by POEM and VERSE, verbatim, one verse per line (v1.17.0).
 *
 *   node tools/extract_poem.js <spec.json> <out.json>
 *
 * The spec is { "<key>": ["catullus", "<poem>", <from>?, <to>?], ... }, e.g.
 * { "cat.8": ["catullus", "8"], "cat.64.1": ["catullus", "64", 1, 21] }. Without
 * a range the whole poem is taken. The output maps each key to the verses
 * joined by "\n", read by apply_batch.js like any other passage.
 *
 * Finding the poem. The page prints one heading per poem - the Roman numeral,
 * a full stop and usually a title ("VIII. ad se ipsum", "LXX.") - and a
 * doublet the editors split off with a "b" ("IIb.", "XIVb."). A poem runs from
 * its heading to the next one. Its verses are counted from 1.
 *
 * The check. The page has no line numbers, so a count is the only way to cite
 * a verse, and every verse taken is compared word for word (lowercase, u/v and
 * i/j folded, punctuation dropped) with the same number in the Perseus edition
 * (tools/.cache/sections/catullus.<poem>.json, from fetch_sections_catullus.js).
 * A difference is printed, never fixed: a real variant reading is left alone, a
 * typo on the page becomes an `emend` on the fragment, and a miscount shows up
 * as a whole run of verses that do not match. Perseus lines that hold only a
 * gap (2.10a) are not verses and are skipped.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const [specFile, outFile] = process.argv.slice(2);
if (!specFile || !outFile) throw new Error('usage: extract_poem.js <spec.json> <out.json>');
const CACHE = path.join(__dirname, '.cache');

function fold(w) {
  return w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z]/g, '').replace(/j/g, 'i').replace(/v/g, 'u');
}
const foldLine = (s) => s.split(/\s+/).map(fold).filter(Boolean);

function toRoman(n) {
  const map = [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let out = '';
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}
const HEADING = /^[IVXLC]+b?\.(\s|$)/;
// Headings the page misprints (v1.17.1): Carmen 49 is set as "IL." instead of
// "XLIX.". The poem is the right one (the address to Cicero); only the numeral
// is wrong, so the heading is looked up under the page's own spelling.
const HEADING_ALIAS = { 'XLIX.': 'IL.' };

function poemLines(page, poem) {
  const all = fs.readFileSync(path.join(CACHE, page + '.txt'), 'utf8').split('\n').map(l => l.trim());
  const m = String(poem).match(/^(\d+)(b?)$/);
  if (!m) throw new Error('bad poem number ' + poem);
  let head = toRoman(parseInt(m[1], 10)) + m[2] + '.';
  if (HEADING_ALIAS[head]) head = HEADING_ALIAS[head];
  const at = all.findIndex(l => l === head || l.startsWith(head + ' '));
  if (at < 0) throw new Error('no heading ' + head + ' on ' + page);
  const out = [];
  for (let i = at + 1; i < all.length && !HEADING.test(all[i]); i++) if (all[i]) out.push(all[i]);
  return out;
}

const spec = JSON.parse(fs.readFileSync(path.resolve(specFile), 'utf8'));
const out = {};
let bad = 0, diffs = 0;
for (const [key, entry] of Object.entries(spec)) {
  if (key.startsWith('_')) continue;
  const [page, poem, from0, to0] = entry;
  let lines;
  try { lines = poemLines(page, poem); } catch (e) { out[key] = 'ERR ' + e.message; bad++; continue; }
  const edFile = path.join(CACHE, 'sections', 'catullus.' + String(poem).replace(/b$/, '') + '.json');
  if (!fs.existsSync(edFile)) { out[key] = 'ERR no Perseus file - run fetch_sections_catullus.js'; bad++; continue; }
  const ed = JSON.parse(fs.readFileSync(edFile, 'utf8'));
  const verses = ed.lines.filter(l => !l.gap);
  const from = from0 || 1, to = to0 || lines.length;
  if (to > lines.length) { out[key] = 'ERR poem ' + poem + ' has ' + lines.length + ' lines on the page, asked for ' + to; bad++; continue; }
  const taken = lines.slice(from - 1, to);
  out[key] = taken.join('\n');
  out[key + '#n'] = taken.map((_, k) => from + k);
  const rep = [];
  if (!from0 && lines.length !== verses.length) rep.push('   the page has ' + lines.length + ' lines, Perseus ' + verses.length + ' verses');
  taken.forEach((t, k) => {
    const n = from + k;
    const p = verses.find(l => parseInt(l.n, 10) === n && /^\d+$/.test(l.n));
    if (!p) { rep.push('   ' + n + ': not in Perseus'); return; }
    const a = foldLine(t), b = foldLine(p.text);
    if (a.join(' ') !== b.join(' ')) {
      const onlyA = a.filter(w => b.indexOf(w) < 0), onlyB = b.filter(w => a.indexOf(w) < 0);
      rep.push('   ' + n + ': TLL [' + onlyA.join(' ') + ']  Perseus [' + onlyB.join(' ') + ']');
    }
  });
  diffs += rep.length;
  console.log(key.padEnd(12) + ' Carmen ' + poem + ' vv. ' + from + '-' + to + ' (' + taken.length + ', ' + (ed.meter || '?') + ')  ' +
    taken[0].slice(0, 30) + ' ... ' + taken[taken.length - 1].slice(-24));
  if (rep.length) console.log(rep.join('\n'));
}
fs.writeFileSync(path.resolve(outFile), JSON.stringify(out, null, 2));
console.log('\n' + Object.keys(out).filter(k => !k.includes('#')).length + ' passages, ' + bad + ' failed, ' + diffs + ' verse(s) differing from Perseus');
process.exit(bad ? 1 : 0);
