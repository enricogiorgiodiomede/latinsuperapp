/*
 * verg2100_restructure.js - v2.1.0, Virgil's top-up begins. Turns Virgil's three
 * flat launch works (bucolica, georgica, aeneis) into three chooser GROUPS on
 * the Caesar pattern, with one work per eclogue (bucolica-1..10) and per book
 * (georgica-i..iv, aeneis-i..xii). Works with no fragments stay hidden, so each
 * group shows only what has excerpts.
 *
 * The launch excerpts: Georgica IV vv. 1-24 moves into georgica-iv and Aeneis
 * III vv. 655-665 into aeneis-iii, both keeping version 2.0.0. Bucolica 2 vv.
 * 6-18 is REMOVED here, because it is rebuilt as vv. 1-18 in this release's
 * batch (apply_batch refuses a citation that already exists; the rebuilt one
 * keeps the 2.0.0 tag through the item's `version`).
 *
 *   node batch/verg2100_restructure.js     # refuses if the groups already exist
 */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');
const SLUG = 'publius-vergilius-maro';

const src = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const headAt = src.indexOf(headMark), tailAt = src.indexOf(tailMark);
if (headAt < 0 || tailAt < 0) throw new Error('js/fragments.js markers not found - refusing to write');
global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;
const v = AUTHORS[SLUG];
if (!v) throw new Error('no Virgil in the bank');
if (v.groups) throw new Error('Virgil already has groups - already restructured');

const old = {};
for (const w of v.works) old[w.id] = w;
['bucolica', 'georgica', 'aeneis'].forEach(id => { if (!old[id]) throw new Error('missing launch work ' + id); });

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
v.groups = [
  { id: 'bucolica', label: 'Bucolica (Eclogues)', labelIt: 'Bucoliche',
    heading: 'Choose an eclogue', headingIt: 'Scegli un\'egloga' },
  { id: 'georgica', label: 'Georgica (Georgics)', labelIt: 'Georgiche',
    heading: 'Choose a book of the Georgics', headingIt: 'Scegli un libro delle Georgiche' },
  { id: 'aeneis', label: 'Aeneis (Aeneid)', labelIt: 'Eneide',
    heading: 'Choose a book of the Aeneid', headingIt: 'Scegli un libro dell\'Eneide' }
];
const works = [];
for (let n = 1; n <= 10; n++) {
  works.push({ id: 'bucolica-' + n, label: 'Eclogue ' + n, labelIt: 'Egloga ' + n, group: 'bucolica', fragments: [] });
}
for (let b = 1; b <= 4; b++) {
  works.push({ id: 'georgica-' + ROMAN[b - 1].toLowerCase(), label: 'Book ' + ROMAN[b - 1], labelIt: 'Libro ' + ROMAN[b - 1], group: 'georgica', fragments: [] });
}
for (let b = 1; b <= 12; b++) {
  works.push({ id: 'aeneis-' + ROMAN[b - 1].toLowerCase(), label: 'Book ' + ROMAN[b - 1], labelIt: 'Libro ' + ROMAN[b - 1], group: 'aeneis', fragments: [] });
}
const byId = Object.fromEntries(works.map(w => [w.id, w]));

// Move the two launch excerpts that stay, drop the one that is rebuilt.
const take = (workId, citation) => {
  const f = old[workId].fragments.find(x => x.citation === citation);
  if (!f) throw new Error('launch excerpt not found: ' + citation);
  return f;
};
byId['georgica-iv'].fragments.push(take('georgica', '(Georgica IV, vv. 1-24)'));
byId['aeneis-iii'].fragments.push(take('aeneis', '(Aeneis III, vv. 655-665)'));
take('bucolica', '(Bucolica 2, vv. 6-18)');   // asserted, then dropped: rebuilt as vv. 1-18
const left = old.bucolica.fragments.length + old.georgica.fragments.length + old.aeneis.fragments.length - 3;
if (left !== 0) throw new Error('the launch works hold ' + left + ' more excerpt(s) than expected');

v.works = works;
v.selectHeading = 'Choose a work by Virgil';
v.selectHeadingIt = 'Scegli un\'opera di Virgilio';
v.needsSelection = true;

fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
console.log('Virgil restructured: 3 groups, ' + works.length + ' works; moved Georg. IV 1-24 and Aen. III 655-665; dropped Ecl. 2 6-18 (rebuilt in the batch)');
