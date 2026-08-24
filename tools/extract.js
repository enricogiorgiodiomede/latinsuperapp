/*
 * extract.js - pull passages out of the cached source texts, verbatim.
 *
 *   node tools/extract.js <spec.json> <out.json>
 *
 * The spec is { "<key>": ["<page>", "<start text>", "<end text>"], ... } where
 * <page> is a cached file name without .txt (e.g. "cat1", "phil14"). Each
 * passage is the source text from the first occurrence of <start text> through
 * the end of the first following <end text>, with whitespace collapsed to
 * single spaces. Section markers are left exactly as the source prints them.
 *
 * Getting the Latin this way rather than by retyping is the whole point: it is
 * what makes `node tools/verify.js` a real check instead of a formality.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const [specFile, outFile] = process.argv.slice(2);
if (!specFile || !outFile) throw new Error('usage: extract.js <spec.json> <out.json>');

const CACHE = path.join(__dirname, '.cache');
const spec = JSON.parse(fs.readFileSync(path.resolve(specFile), 'utf8'));
const out = {};
let bad = 0;

for (const [key, entry] of Object.entries(spec)) {
  if (key.startsWith('_')) continue;
  const [page, from, to] = entry;
  const file = path.join(CACHE, page + '.txt');
  if (!fs.existsSync(file)) { out[key] = 'ERR no cached page ' + page; bad++; continue; }
  const flat = fs.readFileSync(file, 'utf8').replace(/\s+/g, ' ').trim();
  const i = flat.indexOf(from);
  const j = i < 0 ? -1 : flat.indexOf(to, i);
  if (i < 0) { out[key] = 'ERR start not found'; bad++; continue; }
  if (j < 0) { out[key] = 'ERR end not found'; bad++; continue; }
  out[key] = flat.slice(i, j + to.length);
}

fs.writeFileSync(path.resolve(outFile), JSON.stringify(out, null, 2));
for (const [k, v] of Object.entries(out)) {
  const marks = (v.match(/\[[^\]]*\]/g) || []).join(' ') || '-';
  console.log(k.padEnd(14) + String(v.length).padStart(6) + '  marks: ' + marks.padEnd(20) +
    v.slice(0, 30) + ' ... ' + v.slice(-24));
}
console.log('\n' + Object.keys(out).length + ' passages, ' + bad + ' failed');
process.exit(bad ? 1 : 0);
