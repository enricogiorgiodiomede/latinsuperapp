// v1.17.3: takes the launch excerpt of Carmen 101 out of catullus-epigrammata
// so that apply_batch.js (which refuses a duplicate citation) can put in the
// rebuilt one from batch/cat1703_frags_b.js, keeping its 1.0.0 tag. The
// removed fragment is saved to batch/cat1703_old101.json. Run once, before
// apply_batch.
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
const work = AUTHORS['gaius-valerius-catullus'].works.find(w => w.id === 'catullus-epigrammata');
const at = work.fragments.findIndex(f => f.citation === '(Carmen 101)');
if (at < 0) throw new Error('Carmen 101 is not in the bank');
fs.writeFileSync(path.join(__dirname, 'cat1703_old101.json'), JSON.stringify(work.fragments[at], null, 2));
work.fragments.splice(at, 1);
fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
console.log('removed the launch Carmen 101; ' + work.fragments.length + ' epigrams left');
