// v1.11.0: CAESAR AND HIRTIUS. Caesar gets a nested chooser on the Verrines
// pattern - two top-level groups (bellum-gallicum, bellum-civile) holding one
// work per book - because apply_batch's firstSection sorts book-cited citations
// as book*100000+section*10 and flat ones as plain integers, so mixing the two
// wars in one work would silently reorder it. Hirtius gets two flat works on the
// Plautus pattern, with ids deliberately distinct from Caesar's: sources.json is
// keyed by WORK ID and shared across authors, so a shared `bellum-gallicum`
// would hand one of them the wrong page list.
// Run twice: once with --author=gaius-julius-caesar, once with --author=aulus-hirtius.
// Works with no fragments are hidden by PracticeBank.works(), so a work created
// here shows up only once apply_batch has filled it.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');

const NEW = [
  { id: 'bellum-gallicum-viii', label: 'De Bello Gallico VIII', labelIt: 'De Bello Gallico VIII' },
  { id: 'bellum-alexandrinum', label: 'Bellum Alexandrinum', labelIt: 'Bellum Alexandrinum' }
];

// Same guard as apply_batch.js: with git's core.autocrlf=true a checkout hands
// back CRLF, the '\n\n' in tailMark stops matching, indexOf returns -1, and
// slice(-1) would quietly truncate the whole bank to its last character.
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
// --author=<slug>, defaulting to Cicero so older invocations are unaffected.
const authorArg = process.argv.slice(2).filter(a => a.startsWith('--author='))[0];
const AUTHOR = authorArg ? authorArg.slice('--author='.length) : 'marcus-tullius-cicero';
const cic = AUTHORS[AUTHOR];
if (!cic) throw new Error('no author ' + AUTHOR + ' in the bank');

for (const meta of NEW) {
  if (cic.works.some(w => w.id === meta.id)) throw new Error('work already exists: ' + meta.id);
  const w = { id: meta.id, label: meta.label, group: meta.group, fragments: [] };
  if (meta.labelIt) w.labelIt = meta.labelIt;
  cic.works.push(w);
}

fs.writeFileSync(P, head + JSON.stringify(AUTHORS, null, 2) + ';' + tail);
console.log('created for ' + AUTHOR + ': ' + NEW.map(n => n.id).join(', '));
