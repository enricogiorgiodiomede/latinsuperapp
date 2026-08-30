// v1.9.2: the two works of 45-44 BC in which Cicero puts Roman religion on
// trial. De Natura Deorum gives a book to each school - Epicurean, Stoic,
// Academic - and De Divinatione is its sequel: Quintus argues the case for
// divination in book I, Cicero dismantles it in book II. They are separate
// works here because they are separate works, but they cross-reference each
// other, and De Divinatione II.148 names De Natura Deorum out loud.
// `reorder_works.js` already pins both in PHIL_ORDER, between the Tusculans
// and De Senectute.
// Works with no fragments are hidden by PracticeBank.works(), so a work created
// here shows up only once apply_batch has filled it.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');

const NEW = [
  { id: 'de-natura-deorum', label: 'De Natura Deorum', labelIt: 'De Natura Deorum', group: 'philosophical' },
  { id: 'de-divinatione', label: 'De Divinatione', labelIt: 'De Divinatione', group: 'philosophical' }
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
const cic = AUTHORS['marcus-tullius-cicero'];

for (const meta of NEW) {
  if (cic.works.some(w => w.id === meta.id)) throw new Error('work already exists: ' + meta.id);
  const w = { id: meta.id, label: meta.label, group: meta.group, fragments: [] };
  if (meta.labelIt) w.labelIt = meta.labelIt;
  cic.works.push(w);
}

fs.writeFileSync(P, head + JSON.stringify(AUTHORS, null, 2) + ';' + tail);
console.log('created: ' + NEW.map(n => n.id).join(', '));
