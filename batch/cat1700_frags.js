// v1.17.0: CATULLUS, Release 1 of the expansion - the first ten polymetra.
// Each part file holds poems written as { poem, from?, en: [...], it: [...] }
// with ONE TRANSLATION LINE PER VERSE and no markers. This builder puts the
// line-for-line markers (first verse, then every multiple of five) on all
// three columns at once - the Latin through apply_batch's `blocks`, the two
// translations here with the same arithmetic - so they cannot disagree.
// Written in parts because one huge Write gets cut off (v1.16.7 lesson).
const parts = [require('./cat1700_frags_a.js'), require('./cat1700_frags_b.js'), require('./cat1700_frags_c.js'), require('./cat1700_frags_d.js')];

function markers(from, count) {
  const out = [from];
  for (let n = from + 1; n < from + count; n++) if (n % 5 === 0) out.push(n);
  return out;
}
function mark(lines, from) {
  return lines.map((t, i) => {
    const n = from + i;
    return '> ' + ((n === from || n % 5 === 0) ? '**' + n + '.** ' : '') + t;
  }).join('\n');
}

module.exports = [].concat(...parts).map(p => {
  const from = p.from || 1;
  if (p.en.length !== p.it.length) throw new Error('Carmen ' + p.poem + ': ' + p.en.length + ' en lines, ' + p.it.length + ' it lines');
  const item = {
    work: p.work || 'catullus-polymetra',
    key: p.key || ('cat.' + p.poem),
    from: from,
    blocks: markers(from, p.en.length),
    title: p.title, citation: p.citation || '(Carmen ' + p.poem + ')',
    description: p.description,
    english: mark(p.en, from), italian: mark(p.it, from),
    analysis: p.analysis,
    titleIt: p.titleIt, descriptionIt: p.descriptionIt, analysisIt: p.analysisIt
  };
  if (p.emend) item.emend = p.emend;
  if (p.version) item.version = p.version;
  if (p.explicit) item.explicit = true;
  return item;
});
