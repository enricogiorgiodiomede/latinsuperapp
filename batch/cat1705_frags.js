// v1.17.5: CATULLUS, Release 6 - Carmen 64 (vv. 1-21 rebuilt from the launch vv. 1-7, 50-70, 132-153,
// 186-201, 215-237), work catullus-carmina-docta. Same builder as v1.17.0-v1.17.4 (batch/cat1700_frags.js):
// `from` is the first verse of the excerpt: after v. 23 the page prints v. 23b as its own line, so page
// line N is v. N-1 (see batch/cat1705_spec.json). `emend` declares v. 16, v. 142 and v. 153.
// The part files use backtick strings, so apostrophes need no escaping.
const parts = [require('./cat1705_frags_a.js'), require('./cat1705_frags_b.js')];

function mark(lines, nums) {
  const first = nums[0];
  return lines.map((t, i) => {
    const n = nums[i];
    const on = n != null && (n === first || n % 5 === 0);
    return '> ' + (on ? '**' + n + '.** ' : '') + t;
  }).join('\n');
}

module.exports = [].concat(...parts).map(p => {
  if (p.en.length !== p.it.length) throw new Error('Carmen ' + p.poem + ': ' + p.en.length + ' en lines, ' + p.it.length + ' it lines');
  const nums = p.nums || p.en.map((_, i) => (p.from || 1) + i);
  if (nums.length !== p.en.length) throw new Error('Carmen ' + p.poem + ': nums length');
  const blocks = nums.filter((n, i) => n != null && (i === 0 || n % 5 === 0));
  const item = {
    work: p.work || 'catullus-carmina-docta',
    from: p.fromPieces || (p.from || 1),
    blocks: blocks,
    title: p.title, citation: p.citation || '(Carmen ' + p.poem + ')',
    description: p.description,
    english: mark(p.en, nums), italian: mark(p.it, nums),
    analysis: p.analysis,
    titleIt: p.titleIt, descriptionIt: p.descriptionIt, analysisIt: p.analysisIt
  };
  if (p.keys) { item.keys = p.keys; item.joins = p.joins; } else item.key = p.key || ('cat.' + p.poem);
  if (p.emend) item.emend = p.emend;
  if (p.version) item.version = p.version;
  if (p.explicit) item.explicit = true;
  return item;
});
