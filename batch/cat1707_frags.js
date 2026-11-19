// v1.17.7: CATULLUS, Release 8, the last - Carmen 66 vv. 39-50; Carmen 67 (whole, explicit banner);
// Carmen 68 vv. 1-24, 41-72 (v. 47 lost), 89-104. Same builder as v1.17.0-v1.17.6 (batch/cat1700_frags.js):
// `from` is the first verse; Carmen 68 keeps the standard continuous numbering (Perseus restarts at v. 41);
// 68 vv. 41-72 is two pieces (`keys`, `joins`, `fromPieces`, `nums` with null). `emend`: 68 vv. 56, 101.
// The part files use backtick strings, so apostrophes need no escaping.
const parts = [require('./cat1707_frags_a.js'), require('./cat1707_frags_b.js')];

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
