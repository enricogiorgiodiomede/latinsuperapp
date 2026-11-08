// v1.17.0: CATULLUS BECOMES A CHOOSER AUTHOR. Until now he had one work,
// `catullus-carmina`, holding the three v1.0.0 excerpts (Carmina 3, 101 and
// 64 vv. 1-7), with no chooser. The expansion (the user, 08/11/2026) wants 60
// excerpts in the three parts of the Liber, 20 each, so this saves the three
// old excerpts to batch/cat1700_old.json (they are rebuilt through the
// pipeline with their 1.0.0 tags, not lost), and replaces the work with three
// empty ones in collection order. Works with no fragments stay hidden until
// apply_batch.js fills them. Run once.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');
const src = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const headAt = src.indexOf(headMark), tailAt = src.indexOf(tailMark);
if (headAt < 0 || tailAt < 0) throw new Error('js/fragments.js markers not found - refusing to write');
global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;
const SLUG = 'gaius-valerius-catullus';
const old = AUTHORS[SLUG];
if (old.works.length !== 1 || old.works[0].id !== 'catullus-carmina') throw new Error('Catullus is not in the launch shape any more');
fs.writeFileSync(path.join(__dirname, 'cat1700_old.json'), JSON.stringify(old.works[0].fragments, null, 2));
console.log('saved and removed: ' + old.works[0].fragments.map(f => f.citation).join(' | '));
AUTHORS[SLUG] = {
  selectHeading: 'Choose a part of the Liber Catulli',
  selectHeadingIt: 'Scegli una sezione del Liber Catulli',
  needsSelection: true,
  works: [
    { id: 'catullus-polymetra', label: 'Polymetra (Carmina 1-60)', labelIt: 'Polimetri (carmi 1-60)', fragments: [] },
    { id: 'catullus-carmina-docta', label: 'Carmina docta (Carmina 61-68)', labelIt: 'Carmina docta (carmi 61-68)', fragments: [] },
    { id: 'catullus-epigrammata', label: 'Epigrammata (Carmina 69-116)', labelIt: 'Epigrammi (carmi 69-116)', fragments: [] }
  ]
};
fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
console.log('Catullus is now a chooser author with three empty works.');
