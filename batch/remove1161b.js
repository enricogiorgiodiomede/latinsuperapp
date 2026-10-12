// v1.16.1 follow-up: take (De Oratore I.32-33) out of the bank so that
// apply_batch.js can put it back as (De Oratore I.32-34), rebuilt from the
// source with the rest of section 32 and section 34 (batch/frags1161b.js keeps
// its 1.10.0 tag). Run once, before apply_batch. Same guarded round-trip as the
// other writers.
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
const work = AUTHORS['marcus-tullius-cicero'].works.filter(w => w.id === 'de-oratore')[0];
const before = work.fragments.length;
work.fragments = work.fragments.filter(f => f.citation !== '(De Oratore I.32-33)');
if (work.fragments.length !== before - 1) throw new Error('expected to remove exactly one fragment');
fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
console.log('removed (De Oratore I.32-33); de-oratore now has ' + work.fragments.length);
