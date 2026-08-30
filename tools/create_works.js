// v1.9.3: the last work of the philosophical group. Paradoxa Stoicorum is the
// odd one out - six Stoic paradoxes written up as rhetorical set-pieces in 46 BC
// and dedicated to Brutus, and by some distance the easiest philosophical Latin
// Cicero wrote. PHIL_ORDER already pins it between the Somnium and the Tusculans.
// Works with no fragments are hidden by PracticeBank.works(), so a work created
// here shows up only once apply_batch has filled it.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');

const NEW = [
  { id: 'paradoxa-stoicorum', label: 'Paradoxa Stoicorum', labelIt: 'Paradoxa Stoicorum', group: 'philosophical' }
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
