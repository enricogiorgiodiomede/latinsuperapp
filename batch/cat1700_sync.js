// v1.17.0 follow-up (11/11/2026): the user's notes on Release 1, folded into
// the batch part files in place. This copies the analysis and analysisIt of
// every Release 1 excerpt from the batch (batch/cat1700_frags.js) into
// js/fragments.js, by exact replacement of the old field, so nothing else in
// the bank is touched. The Latin and the translations are not changed.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');
let src = fs.readFileSync(P, 'utf8');
global.window = {};
eval(src);
const frags = window.PracticeBank.authors['gaius-valerius-catullus'].works.reduce((a, w) => a.concat(w.fragments), []);
const esc = (t) => JSON.stringify(t).slice(1, -1);
let n = 0;
for (const item of require('./cat1700_frags.js')) {
  const f = frags.find(x => x.citation === item.citation);
  if (!f) throw new Error('not in the bank: ' + item.citation);
  for (const field of ['analysis', 'analysisIt']) {
    if (f[field] === item[field]) continue;
    const a = esc(f[field]);
    if (src.split(a).length !== 2) throw new Error('field not unique: ' + item.citation + ' ' + field);
    src = src.replace(a, () => esc(item[field]));
    console.log('updated ' + item.citation + ' ' + field + '  ' + f[field].length + ' -> ' + item[field].length);
    n++;
  }
}
fs.writeFileSync(P, src, 'utf8');
console.log(n + ' fields written');
