/*
 * verg2101_sync_notes.js - v2.1.1 follow-up: copies `analysis` / `analysisIt`
 * (and the descriptions) from the Release 2 builder (batch/verg2101_frags.js,
 * i.e. the part files) into the bank, matched by work and citation. For the
 * user's notes, folded into the part files in place. The Latin, the
 * translations and the version tags are not touched.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');
const SLUG = 'publius-vergilius-maro';
const FIELDS = ['description', 'descriptionIt', 'analysis', 'analysisIt'];

const src = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');
const headMark = '  var AUTHORS = ', tailMark = '\n\n  global.PracticeBank';
const headAt = src.indexOf(headMark), tailAt = src.indexOf(tailMark);
if (headAt < 0 || tailAt < 0) throw new Error('js/fragments.js markers not found - refusing to write');
global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;

let changed = 0;
for (const item of require('./verg2101_frags.js')) {
  const w = AUTHORS[SLUG].works.find(x => x.id === item.work);
  const f = w && w.fragments.find(x => x.citation === item.citation);
  if (!f) throw new Error('not in the bank: ' + item.work + ' ' + item.citation);
  const diff = FIELDS.filter(k => f[k] !== item[k]);
  diff.forEach(k => { f[k] = item[k]; });
  if (diff.length) changed++;
  console.log((diff.length ? 'updated ' : 'same    ') + item.citation + (diff.length ? '  [' + diff.join(', ') + ']' : ''));
}
fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
console.log(changed + ' excerpt(s) updated');
