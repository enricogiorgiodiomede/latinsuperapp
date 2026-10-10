/*
 * patch_fields.js - make exact find-and-replace edits inside fragments of
 * js/fragments.js, addressed by author and citation.
 *
 *   node tools/patch_fields.js <author-slug> <patches.json>
 *
 * <patches.json> is [ { cit, field, find, replace }, ... ]. `field` is any text
 * field of a fragment EXCEPT `latin`, which only the pipeline may write
 * (extract.js -> apply_batch.js): a hand-edited Latin field is exactly what
 * verify.js exists to catch. `find` must occur exactly once in that field.
 *
 * WHY THIS EXISTS. apply_batch.js refuses a citation that is already in the
 * bank, so a correction found by the checkers or by re-reading after a batch
 * has been applied cannot go back through it. Hand-editing a 9,000-line JSON
 * literal with escaped quotes is how typos get in. This is the same guarded
 * round-trip as the other writers: CRLF normalised, head and tail markers
 * asserted, nothing written unless every patch landed. Keep the batch file in
 * step by making the same edit there.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const [AUTHOR, patchFile] = process.argv.slice(2);
if (!AUTHOR || !patchFile) throw new Error('usage: patch_fields.js <author-slug> <patches.json>');

const P = path.join(__dirname, '..', 'js', 'fragments.js');
const src = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const headAt = src.indexOf(headMark);
const tailAt = src.indexOf(tailMark);
if (headAt < 0 || tailAt < 0) throw new Error('js/fragments.js markers not found - refusing to write');

global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;
const author = AUTHORS[AUTHOR];
if (!author) throw new Error('no author ' + AUTHOR + ' in the bank');

const patches = JSON.parse(fs.readFileSync(path.resolve(patchFile), 'utf8'));
for (const p of patches) {
  if (p.field === 'latin') throw new Error(p.cit + ': the Latin is never patched by hand');
  const hits = [].concat(...author.works.map(w => w.fragments.filter(f => f.citation === p.cit)));
  if (hits.length !== 1) throw new Error(p.cit + ': ' + hits.length + ' fragments carry this citation');
  const text = hits[0][p.field];
  if (typeof text !== 'string') throw new Error(p.cit + ': no field ' + p.field);
  const n = text.split(p.find).length - 1;
  if (n !== 1) throw new Error(p.cit + ' [' + p.field + ']: `find` occurs ' + n + ' times - ' + p.find.slice(0, 60));
  hits[0][p.field] = text.replace(p.find, () => p.replace);
  console.log('patched ' + p.cit + ' [' + p.field + ']  ' + text.length + ' -> ' + hits[0][p.field].length + ' chars');
}

// On Windows the open can fail with UNKNOWN for a moment while another process
// (an indexer, a sync client, the preview) holds the file. Nothing has been
// written at that point, so trying again is safe.
const out = src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt);
for (let attempt = 1; ; attempt++) {
  try { fs.writeFileSync(P, out); break; }
  catch (e) {
    if (attempt === 5) throw e;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400);
  }
}
console.log(patches.length + ' patches written for ' + AUTHOR);
