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

// Normalise line endings before looking for the markers. With git's
// core.autocrlf=true a checkout hands back CRLF, the '\n\n' in tailMark stops
// matching, indexOf returns -1, and slice(-1) would quietly truncate the whole
// bank to its last character. Assert as well, so a future edit to the file's
// shape fails loudly instead.
const src = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const headAt = src.indexOf(headMark);
const tailAt = src.indexOf(tailMark);
if (headAt < 0 || tailAt < 0) throw new Error('js/fragments.js markers not found (head ' + headAt + ', tail ' + tailAt + ') - refusing to write');
const head = src.slice(0, headAt + headMark.length);
const tail = src.slice(tailAt);

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
    // One pair (['a','b']) or several ([['a','b'], ['c','d']]). De Senectute needs
    // several: TLL prints its section numbers as '40. ' and a fragment that spans
    // three sections has two of them to rewrite into the app's [40] style.
    var fixes = Array.isArray(item.fix[0]) ? item.fix : [item.fix];
    for (var fi = 0; fi < fixes.length; fi++) {
      if (t.indexOf(fixes[fi][0]) < 0) throw new Error('fix anchor missing for ' + item.citation + ': ' + fixes[fi][0]);
      t = t.replace(fixes[fi][0], fixes[fi][1]);
    }
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
// In Pisonem is the exception: the Latin Library prints that speech with
// chapter divisions only, so it is cited "(In Pisonem, ch. XXVIII)" and has to
// be sorted on the numeral instead.
const ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const romanToInt = (s) => {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const v = ROMAN[s[i]], next = ROMAN[s[i + 1]];
    n += (next && v < next) ? -v : v;
  }
  return n;
};
const firstSection = (f) => {
  // Letters are cited by BOOK and letter ("Ad Familiares XIV.20"), and a book
  // number sorts before a letter number: without this, Att. VII.11 would fall
  // between I.2 and I.16. The optional letter suffix is for the doublets the
  // manuscripts number 3a, 4a and so on. Speech citations that happen to end
  // the same way (In Catilinam I.33) all share one book inside their work, so
  // the scaled key leaves their order untouched.
  // The (?:-\d+)? is for a citation that ends on a RANGE - "(De Oratore
  // I.16-18)". Without it the book-aware branch misses, the plain-digits rule
  // below picks up 16, and De Oratore III.5 would sort ahead of I.16.
  const l = f.citation.match(/([IVXLCDM]+)\.(\d+)(?:-\d+)?([a-z]?)\)$/);
  if (l) return romanToInt(l[1]) * 100000 + parseInt(l[2], 10) * 10 + (l[3] ? 1 : 0);
  const m = f.citation.match(/(\d+)(?:-\d+)?\)$/);
  if (m) return parseInt(m[1], 10);
  const r = f.citation.match(/ch\. ([IVXLCDM]+)\)$/);
  return r ? romanToInt(r[1]) : 0;
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
