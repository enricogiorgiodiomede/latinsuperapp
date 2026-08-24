// v1.7.0: create the five new Cicero speech works (empty; apply_batch fills them).
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');

const NEW = [
  { id: 'pro-caelio', label: 'Pro Caelio', group: 'speeches' },
  { id: 'in-pisonem', label: 'In Pisonem', group: 'speeches' },
  { id: 'philippica-i', label: 'Philippica I', labelIt: 'Prima Filippica', group: 'speeches' },
  { id: 'philippica-iv', label: 'Philippica IV', labelIt: 'Quarta Filippica', group: 'speeches' },
  { id: 'philippica-xiv', label: 'Philippica XIV', labelIt: 'Quattordicesima Filippica', group: 'speeches' }
];

const src = fs.readFileSync(P, 'utf8');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const head = src.slice(0, src.indexOf(headMark) + headMark.length);
const tail = src.slice(src.indexOf(tailMark));

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
