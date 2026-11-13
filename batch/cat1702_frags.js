// v1.17.2: CATULLUS, Release 3 - the first ten epigrams (70, 72, 73, 75, 76, 77, 79, 83, 84, 85),
// all in elegiac couplets. Same builder as v1.17.1 (batch/cat1701_frags.js), work catullus-epigrammata. Same as v1.17.0
// (batch/cat1700_frags.js), plus one case: an excerpt with a verse the
// manuscripts lost (Carmen 51, v. 8). Such an item names its pieces in `keys`,
// `joins` puts the app's [...] line between them, `from` lists the verse each
// piece starts on (so the count resumes at 9 after the gap), and `nums` gives
// the verse of every line, with null on the [...] line, for the translations.
// The part files use backtick strings, so apostrophes need no escaping.
const parts = [require('./cat1702_frags_a.js'), require('./cat1702_frags_b.js'), require('./cat1702_frags_c.js')];

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
    work: p.work || 'catullus-epigrammata',
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
