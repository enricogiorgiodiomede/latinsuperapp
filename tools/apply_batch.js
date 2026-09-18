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

// --author=<slug> picks whose works array to write into. It defaults to Cicero,
// so every invocation written before v1.11.0 keeps working unchanged; Caesar and
// Hirtius need it, because until then this script could only ever see Cicero.
const argv = process.argv.slice(2);
const authorArg = argv.filter(a => a.startsWith('--author='))[0];
const AUTHOR = authorArg ? authorArg.slice('--author='.length) : 'marcus-tullius-cicero';
const [passagesFile, fragsFile, VERSION] = argv.filter(a => !a.startsWith('--'));
if (!passagesFile || !fragsFile || !VERSION) throw new Error('usage: apply_batch.js <passages.json> <frags.js> <version> [--author=<slug>]');

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
const cic = AUTHORS[AUTHOR];
if (!cic) throw new Error('no author ' + AUTHOR + ' in the bank');

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
  if (item.blocks) return verseLayout(item, t);
  t = (item.prefix || '') + t;
  t = t.replace(/ (\[\d+\]) /g, '\n>\n> $1 ');   // digits only: [esse], [id], [...] left alone
  return '> ' + t;
}

// VERSE (v1.14.0, Lucretius). The passage comes from extract_verse.js as one
// verse per line, starting at verse `item.from`. It stays one verse per line,
// and each sentence block opens with the bold number of the verse it begins on:
// `blocks` lists them, either as a number (the block starts at the beginning of
// that verse) or as [number, "words"] when it starts inside the verse, before
// the quoted words, which must occur exactly once in that line. The
// translations carry the same numbers, written in by hand, so check_sections.js
// can hold them to the Latin's boundaries.
function verseLayout(item, t) {
  if (typeof item.from !== 'number') throw new Error('verse item without `from`: ' + item.citation);
  const lines = t.split('\n');
  // Verses are numbered IN READING ORDER: line k of the passage is verse
  // from + k, the way printed school editions number a transposed line. The
  // manuscript numbers extract_verse.js reports as `<key>#n` (Perseus keeps them,
  // so I.1-20 reads 13, 15, 14, 16) are NOT used: v1.14.0 did use them and put
  // `**15.**` on the 14th verse, which the user caught against their book.
  // A `[...]` line is the app's mark for a gap the SOURCE ITSELF prints: a
  // lacuna the manuscripts leave, which the Latin Library shows as a row of
  // asterisks (Book V, between vv. 1012 and 1013). It is not a verse, so it
  // takes no number and the count runs straight through it, which is how a
  // printed edition numbers across a lacuna. verify.js already splits a
  // fragment on the same mark, and check_verses.js matches run by run.
  let vn = 0;
  const nums = lines.map(l => (l.trim() === '[...]' ? null : item.from + vn++));
  if (nums.length !== lines.length) throw new Error(item.citation + ': line numbers do not match the passage');
  for (const b of item.blocks) {
    const [n, words] = Array.isArray(b) ? b : [b, null];
    const k = nums.indexOf(n);
    if (k < 0) throw new Error('block ' + n + ' is outside ' + item.citation);
    if (!words) { lines[k] = '**' + n + '.** ' + lines[k]; continue; }
    const at = lines[k].indexOf(words);
    if (at < 0 || lines[k].indexOf(words, at + 1) >= 0) {
      throw new Error('block ' + n + ' of ' + item.citation + ': "' + words + '" must occur exactly once in: ' + lines[k]);
    }
    lines[k] = lines[k].slice(0, at) + '**' + n + '.** ' + lines[k].slice(at);
  }
  if (lines[0].indexOf('**' + item.from + '.**') !== 0) throw new Error(item.citation + ': the first block must open the excerpt');
  return '> ' + lines.join('\n> ');
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
    // `version` on the item keeps an existing excerpt's version when it is
    // rebuilt through the pipeline (v1.14.0 re-laid Lucretius I.80-101, first
    // added in 1.0.0): the tag says when an excerpt arrived, not when it was
    // last touched.
    emend: item.emend, version: item.version || VERSION
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
  // Poetry: `(De Rerum Natura II, vv. 646-659, 680)` sorts on its FIRST verse. The
  // plain-digits rule below would pick up the trailing 680 of a citation that
  // names an editor's transposed verse.
  const vv = f.citation.match(/, vv\. (\d+)/);
  if (vv) return parseInt(vv[1], 10);
  // Letters are cited by BOOK and letter ("Ad Familiares XIV.20"), and a book
  // number sorts before a letter number: without this, Att. VII.11 would fall
  // between I.2 and I.16. The optional letter suffix is for the doublets the
  // manuscripts number 3a, 4a and so on. Speech citations that happen to end
  // the same way (In Catilinam I.33) all share one book inside their work, so
  // the scaled key leaves their order untouched.
  // The (?:-\d+)? is for a citation that ends on a RANGE - "(De Oratore
  // I.16-18)". Without it the book-aware branch misses, the plain-digits rule
  // below picks up 16, and De Oratore III.5 would sort ahead of I.16.
  // A citation that names its SUBSECTIONS as well, because the excerpt does not
  // cover the whole chapter - "(De Bello Gallico I.40.10-15)". This has to be
  // tried FIRST: the book-aware rule below cannot match three numeric parts, so
  // the citation would fall through to the plain-digits rule and sort on the
  // subsection instead of the chapter, putting I.1.1-4 and I.40.10-15 at 1 and
  // 10. The key deliberately ignores the subsection, so a chapter sorts to the
  // same place whether or not the citation spells its sections out.
  // The comma test matters. A citation that names its own book, chapter and
  // sections never has one - "(De Bello Gallico I.40.10-15)" - while a
  // fragment cited from an external source always does, and those end in the
  // same shape: "(Odusia, in Gellius, Noctes Atticae III.16.11)". Without the
  // test this rule would capture the source reference and silently reorder
  // Livius Andronicus and Caecilius the next time either is touched.
  const t = f.citation.indexOf(',') === -1
    && f.citation.match(/([IVXLCDM]+)\.(\d+)\.(\d+)(?:-\d+)?\)$/);
  if (t) return romanToInt(t[1]) * 100000 + parseInt(t[2], 10) * 10;
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
console.log('written (version ' + VERSION + ', author ' + AUTHOR + '). Touched works:');
touched.forEach(id => {
  const w = cic.works.filter(w => w.id === id)[0];
  console.log('  ' + w.id + ' (' + w.fragments.length + '): ' +
    w.fragments.map(f => f.citation.replace(/[()]/g, '') + ' [' + f.version + ']').join(' | '));
});
