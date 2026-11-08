// v1.17.0: the two launch excerpts that belong to later releases (Carmen 101,
// Carmen 64 vv. 1-7) go back into the bank in their new works, under the new
// citation form, so nothing disappears between releases; they keep their 1.0.0
// tag and their launch notes until Release 4 (101) and Release 6 (64) rebuild
// them in full. Their Latin now comes from the page through extract_poem.js:
// the launch Latin of 101 had never been checked, and v. 7 on the page reads
// "prisco quae more parentum", not "prout ea consuetudo" - so the two
// translation lines of vv. 7-8 are corrected to match, and the old "--"
// dashes in the translations are taken out (house rule: no em dashes).
const old = require('./cat1700_old.json');
const strip = (s) => s.split('\n').map(l => l.replace(/^>\s*(\*\*\d+\.\*\*\s*)?/, ''));
function mark(lines, from) {
  return lines.map((t, i) => { const n = from + i; return '> ' + ((n === from || n % 5 === 0) ? '**' + n + '.** ' : '') + t; }).join('\n');
}
const f101 = old.find(f => /101/.test(f.citation)), f64 = old.find(f => /64/.test(f.citation));
const en101 = strip(f101.english), it101 = strip(f101.italian);
en101[4] = 'Since fortune has taken you, you yourself, from me,';
en101[5] = 'oh, poor brother, so unfairly taken from me,';
en101[6] = 'now at least accept these offerings, which by the ancient custom of our fathers';
en101[7] = 'are handed down as a sad gift for the rites:';
en101[8] = 'take them, wet with a brother\'s many tears,';
it101[4] = 'Poiché la sorte ha tolto te, proprio te, a me,';
it101[5] = 'o povero fratello, strappato a me ingiustamente,';
it101[6] = 'ora almeno questi doni, che per antica usanza dei padri';
it101[7] = 'si offrono come triste tributo ai riti funebri,';
it101[8] = 'accettali, bagnati dalle molte lacrime di un fratello,';
const pick = (f) => ({ title: f.title, description: f.description, analysis: f.analysis, titleIt: f.titleIt, descriptionIt: f.descriptionIt, analysisIt: f.analysisIt, version: '1.0.0' });
module.exports = [
  Object.assign(pick(f101), { work: 'catullus-epigrammata', key: 'cat.101', from: 1, blocks: [1, 5, 10], citation: '(Carmen 101)',
    english: mark(en101, 1), italian: mark(it101, 1) }),
  Object.assign(pick(f64), { work: 'catullus-carmina-docta', key: 'cat.64.1', from: 1, blocks: [1, 5], citation: '(Carmen 64, vv. 1-7)',
    english: mark(strip(f64.english), 1), italian: mark(strip(f64.italian), 1) })
];
