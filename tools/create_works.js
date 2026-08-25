// v1.7.5: create the seven Verrine works (empty; apply_batch fills them).
// The Verrines are one case in seven speeches, so they become seven sibling
// works inside the speeches group, as the four Catilinarians did in v1.6.0.
// Works with no fragments are hidden by PracticeBank.works(), so the five that
// stay empty until v1.7.6 do not show up in the chooser.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');

const NEW = [
  { id: 'in-verrem-divinatio', label: 'Divinatio in Caecilium', labelIt: 'Divinatio in Caecilium', group: 'speeches' },
  { id: 'in-verrem-i', label: 'In Verrem I: Actio Prima', labelIt: 'Verrine I: Prima azione', group: 'speeches' },
  { id: 'in-verrem-ii-1', label: 'In Verrem II.1: De praetura urbana', labelIt: 'Verrine II.1: La pretura urbana', group: 'speeches' },
  { id: 'in-verrem-ii-2', label: 'In Verrem II.2: De praetura Siciliensi', labelIt: 'Verrine II.2: La pretura siciliana', group: 'speeches' },
  { id: 'in-verrem-ii-3', label: 'In Verrem II.3: De frumento', labelIt: 'Verrine II.3: Il grano', group: 'speeches' },
  { id: 'in-verrem-ii-4', label: 'In Verrem II.4: De signis', labelIt: 'Verrine II.4: Le statue', group: 'speeches' },
  { id: 'in-verrem-ii-5', label: 'In Verrem II.5: De suppliciis', labelIt: 'Verrine II.5: I supplizi', group: 'speeches' }
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
