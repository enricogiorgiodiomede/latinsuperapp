'use strict';
/*
 * Rewrite short early analysis notes at length: keep the existing analysis
 * whole, add a paragraph of history or aftermath, and end on a paragraph of
 * grammar. This is the shape every note extended since v1.14.5 carries.
 *
 *   node tools/extend_notes.js <author-slug> <batch.json>
 *   node tools/extend_notes.js marcus-tullius-cicero batch/phil2.json
 *
 * The batch file is
 *   [{ work, cit, history_en, history_it, grammar_en, grammar_it }]
 * where `work` is the work id and `cit` a substring of the citation.
 *
 * Where a note ends on a remark about the SOURCE (a lost initial, a chapter
 * numeral, a textual variant), the history paragraph goes IN FRONT of that
 * remark, so the footnote stays last but one. The grammar paragraph always ends
 * the note. A note that already has a grammar paragraph is skipped.
 *
 * THE SCRIPT CANNOT READ. After applying, re-read each new paragraph against
 * the paragraph it now sits beside: in the Philippica I batch (v1.15.15) five of
 * six needed correcting for contradicting or repeating the analysis above them.
 * Nothing here catches that.
 */
const fs = require('fs');
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const esc = (t) => JSON.stringify(t).slice(1, -1);

const slug = process.argv[2];
const batch = process.argv[3];
if (!slug || !batch) {
  console.error('usage: node tools/extend_notes.js <author-slug> <batch.json>');
  process.exit(1);
}

// A final paragraph that opens like one of these is a footnote about the source
// text, not part of the argument, so the history paragraph goes before it.
const SOURCE_NOTE = /^(One oddity of the source|The source prints|One thing to know about the source|One small textual point|The Latin Library prints|Una stranezza della fonte|La fonte stampa|Una cosa da sapere sulla fonte|Un piccolo punto testuale)/;

const JOBS = JSON.parse(fs.readFileSync(batch, 'utf8'));
let src = fs.readFileSync('js/fragments.js', 'utf8');
global.window = {};
eval(src);
const author = window.PracticeBank.authors[slug];
if (!author) throw new Error('no such author in the bank: ' + slug);

let n = 0;
for (const job of JOBS) {
  const w = author.works.find(x => x.id === job.work);
  if (!w) throw new Error('no such work: ' + job.work);
  const frag = w.fragments.find(f => f.citation.indexOf(job.cit) >= 0);
  if (!frag) throw new Error('not found: ' + job.cit);
  if (/Grammar notes[.:]/.test(frag.analysis)) {
    console.log('already extended: ' + job.cit);
    continue;
  }

  for (const [field, hist, gram] of [['analysis', job.history_en, job.grammar_en],
                                     ['analysisIt', job.history_it, job.grammar_it]]) {
    const ps = frag[field].split('\n\n');
    const last = ps.length - 1;
    if (SOURCE_NOTE.test(ps[last])) ps.splice(last, 0, hist);
    else ps.push(hist);
    ps.push(gram);
    const next = ps.join('\n\n');
    const a = esc(frag[field]), b = esc(next);
    if (src.split(a).length - 1 !== 1) throw new Error('field not unique: ' + job.cit + ' ' + field);
    src = src.replace(a, () => b);
  }
  n++;
  console.log('extended  ' + frag.citation);
}
fs.writeFileSync('js/fragments.js', src, 'utf8');

// report the new lengths - the house target is ~2,700-3,700 in both languages
global.window = {};
eval(fs.readFileSync('js/fragments.js', 'utf8'));
const after = window.PracticeBank.authors[slug];
console.log('');
for (const job of JOBS) {
  const f = after.works.find(x => x.id === job.work)
    .fragments.find(x => x.citation.indexOf(job.cit) >= 0);
  console.log('   ' + String(f.analysis.length).padStart(5) + ' EN / ' +
    String(f.analysisIt.length).padStart(5) + ' IT   ' +
    f.analysis.split('\n\n').length + 'p   ' + f.citation);
}
console.log('\n' + n + ' notes extended');
console.log('NOW RE-READ each new paragraph against the one above it, then run the lints.');
