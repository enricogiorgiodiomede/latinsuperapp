/*
 * apply_batch.js - add a batch of practice fragments to js/fragments.js.
 *
 *   node tools/apply_batch.js <passages.json> <fragments.js> <version>
 *   node tools/apply_batch.js batch/passages.json batch/frags.js 1.7.1
 *
 * <passages.json> maps a key to a verbatim Latin passage (see tools/README.md
 * for how to produce one). <fragments.js> exports an array of fragment objects
 * without the Latin: each names its `work`, its passage `key` (or `keys` +
 * `joins` for a trimmed fragment), an optional `prefix` for the leading section
 * marker, and the prose fields. Latin is never typed by hand.
 *
 * Fragments in every touched work are re-sorted by section number afterwards.
 */
const fs = require('fs');
const path = require('path');

const [passagesFile, fragsFile, VERSION] = process.argv.slice(2);
if (!passagesFile || !fragsFile || !VERSION) throw new Error('usage: apply_batch.js <passages.json> <frags.js> <version>');

const REPO = path.join(__dirname, '..');
const P = path.join(REPO, 'js/fragments.js');
const passages = require(path.resolve(passagesFile));
const incoming = require(path.resolve(fragsFile));
const SOURCE = 'The Latin Library (thelatinlibrary.com)';

const src = fs.readFileSync(P, 'utf8');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const head = src.slice(0, src.indexOf(headMark) + headMark.length);
const tail = src.slice(src.indexOf(tailMark));

global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;
const cic = AUTHORS['marcus-tullius-cicero'];

function pieceOf(key) {
  const t = passages[key];
  if (!t || t.startsWith('ERR')) throw new Error('no passage for ' + key);
  return t;
}

function latinOf(item) {
  let t;
  if (item.keys) {
    // A trimmed fragment: several extracted pieces joined by explicit separators,
    // which carry the section markers and the "[...]" cut mark.
    const joins = item.joins || [];
    if (joins.length !== item.keys.length - 1) throw new Error('joins/keys mismatch for ' + item.citation);
    t = item.keys.map(pieceOf).reduce((acc, p, i) => acc + joins[i - 1] + p);
  } else {
    t = pieceOf(item.key);
  }
  if (item.fix) {
    if (t.indexOf(item.fix[0]) < 0) throw new Error('fix anchor missing for ' + item.citation);
    t = t.replace(item.fix[0], item.fix[1]);
  }
  // `emend` is for the rare case where the source has a plain error and the app
  // prints the corrected word: [[sourceReading, appReading], ...]. Unlike `fix`,
  // which only reconciles source STYLE that normalise() already handles, an
  // emendation changes the text, so it is recorded on the fragment and verify.js
  // puts the source's reading back before checking. Say so in the analysis too.
  for (const [sourceReading, appReading] of (item.emend || [])) {
    if (t.indexOf(sourceReading) < 0) throw new Error('emend anchor missing for ' + item.citation + ': ' + sourceReading);
    t = t.split(sourceReading).join(appReading);
  }
  t = (item.prefix || '') + t;
  t = t.replace(/ (\[\d+\]) /g, '\n>\n> $1 ');   // digits only: [esse], [id], [...] left alone
  return '> ' + t;
}

for (const item of incoming) {
  const work = cic.works.filter(w => w.id === item.work)[0];
  if (!work) throw new Error('no work ' + item.work);
  if (work.fragments.some(f => f.citation === item.citation)) throw new Error('duplicate citation ' + item.citation);
  work.fragments.push({
    title: item.title, citation: item.citation, source: SOURCE,
    description: item.description, latin: latinOf(item),
    italian: item.italian, english: item.english, analysis: item.analysis,
    titleIt: item.titleIt, descriptionIt: item.descriptionIt, analysisIt: item.analysisIt,
    emend: item.emend, version: VERSION
  });
}

// Order the fragments of every touched speech by its first section number.
const firstSection = (f) => {
  const m = f.citation.match(/(\d+)(?:-\d+)?\)$/);
  return m ? parseInt(m[1], 10) : 0;
};
const touched = [...new Set(incoming.map(i => i.work))];
touched.forEach(id => {
  const w = cic.works.filter(w => w.id === id)[0];
  w.fragments.sort((a, b) => firstSection(a) - firstSection(b));
});

fs.writeFileSync(P, head + JSON.stringify(AUTHORS, null, 2) + ';' + tail);
console.log('written (version ' + VERSION + '). Touched works:');
touched.forEach(id => {
  const w = cic.works.filter(w => w.id === id)[0];
  console.log('  ' + w.id + ' (' + w.fragments.length + '): ' +
    w.fragments.map(f => f.citation.replace(/[()]/g, '') + ' [' + f.version + ']').join(' | '));
});
