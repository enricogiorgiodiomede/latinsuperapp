// v1.16.0: SALLUST LEAVES THE LAUNCH CATCH-ALL. Until now he had one work,
// `sallust-excerpts`, holding the two v1.0.0 excerpts, with no chooser. This
// empties it, removes it, and turns the author into a needsSelection one with
// the Hirtius-style headings; tools/create_works.js then adds the two
// monographs and apply_batch.js rebuilds both launch excerpts through the
// pipeline with their 1.0.0 tags (batch/frags1160.js), the way v1.11.0
// migrated Caesar's six. Run once, before create_works.js.
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
const old = AUTHORS['gaius-sallustius-crispus'];
if (old.works.length !== 1 || old.works[0].id !== 'sallust-excerpts') throw new Error('Sallust is not in the launch shape any more');
console.log('removing: ' + old.works[0].fragments.map(f => f.citation).join(' | '));
// Key order matters only for the diff: match Hirtius.
AUTHORS['gaius-sallustius-crispus'] = {
  selectHeading: 'Choose a work by Sallust',
  selectHeadingIt: "Scegli un'opera di Sallustio",
  needsSelection: true,
  works: []
};
fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
console.log('Sallust is now a chooser author with no works; run create_works.js next.');
