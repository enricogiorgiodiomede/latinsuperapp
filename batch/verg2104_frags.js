// v2.1.4, VIRGIL RELEASE 4 (Georgics I): the builder read by tools/apply_batch.js
// with --author=publius-vergilius-maro. Same shape as the Catullus builder
// (batch/cat1700_frags.js): each part item carries plain translation lines (`en`,
// `it`, one per verse, speaker tags included) and the verse it starts on
// (`from`); this marks the first verse and every multiple of five in both
// translations, and gives apply_batch the same `blocks` for the Latin, so the
// three columns cannot disagree. (Virgil's works were restructured in v2.1.0.)
const parts = [require('./verg2104_frags_a.js'), require('./verg2104_frags_b.js')];

function mark(lines, nums) {
  const first = nums[0];
  return lines.map((t, i) => {
    const n = nums[i];
    const on = n != null && (n === first || n % 5 === 0);
    return '> ' + (on ? '**' + n + '.** ' : '') + t;
  }).join('\n');
}

module.exports = [].concat(...parts).map(p => {
  if (p.en.length !== p.it.length) throw new Error(p.citation + ': ' + p.en.length + ' en lines, ' + p.it.length + ' it lines');
  const nums = p.en.map((_, i) => p.from + i);
  const blocks = nums.filter((n, i) => i === 0 || n % 5 === 0);
  const item = {
    work: p.work, key: p.key, from: p.from, blocks: blocks,
    title: p.title, citation: p.citation, description: p.description,
    english: mark(p.en, nums), italian: mark(p.it, nums),
    analysis: p.analysis,
    titleIt: p.titleIt, descriptionIt: p.descriptionIt, analysisIt: p.analysisIt
  };
  if (p.emend) item.emend = p.emend;
  if (p.fix) item.fix = p.fix;
  if (p.version) item.version = p.version;
  return item;
});
