/*
 * verg2100_sync.js - v2.1.0: writes the new descriptions and notes of the two
 * launch excerpts that are not rebuilt (batch/verg2100_old.js) into the bank,
 * matched by work and citation. Touches description/descriptionIt/analysis/
 * analysisIt only; the Latin, the translations and the version tag stay.
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

for (const item of require('./verg2100_old.js')) {
  const w = AUTHORS[SLUG].works.find(x => x.id === item.work);
  const f = w && w.fragments.find(x => x.citation === item.citation);
  if (!f) throw new Error('not found: ' + item.work + ' ' + item.citation);
  for (const k of FIELDS) {
    if (!item[k]) throw new Error(item.citation + ': missing ' + k);
    f[k] = item[k];
  }
  console.log('synced ' + item.citation + ' (version stays ' + f.version + ')');
}
fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
