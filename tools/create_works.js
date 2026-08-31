// v1.10.0: THE RHETORICAL GROUP GOES LIVE. Three works at once - De Oratore
// (55 BC, the dialogue), Brutus (46 BC, the history of Roman oratory) and
// Orator (46 BC, the portrait of the ideal speaker). All three were already
// mapped in sources.json and pinned in RHET_ORDER; only the work objects were
// missing, which is why the whole rhetorical category has been invisible in
// the chooser since v1.5.0 created it.
// NOTE: the id `brutus` is deliberately shared with Hortensius, whose single
// fragment IS a passage of Cicero's Brutus. Work ids are unique per author, so
// the two coexist; verify.js prints a NOTE about the shared sources.json key.
// Works with no fragments are hidden by PracticeBank.works(), so a work created
// here shows up only once apply_batch has filled it.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');

const NEW = [
  { id: 'de-oratore', label: 'De Oratore', labelIt: 'De Oratore', group: 'rhetorical' },
  { id: 'brutus', label: 'Brutus', labelIt: 'Brutus', group: 'rhetorical' },
  { id: 'orator', label: 'Orator', labelIt: 'Orator', group: 'rhetorical' }
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
