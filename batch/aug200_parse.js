/*
 * aug200_parse.js - v2.0.0, the Augustan launch. Reads the 29 excerpts out of
 * augustan_era_draft.md (English) and italian_translations_augustan.md
 * (Italian), in file order, and returns them as plain objects:
 *   { heading, context, latin[], english[], analysis, headingIt, contextIt, italian[], analysisIt }
 * `latin`, `english` and `italian` are arrays of non-empty lines (the "> "
 * quote marker removed). Nothing is changed here; aug200_build.js decides the
 * layout. Run directly to print a summary.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..');

function read(f) { return fs.readFileSync(path.join(REPO, f), 'utf8').replace(/\r\n/g, '\n').split('\n'); }

// Split one file into excerpt blocks: a block opens at a "### Excerpt"/"### Brano"
// heading and closes at the next heading of level 1-3 or a "---" rule.
function blocks(lines, headRe) {
  const out = [];
  let cur = null;
  for (const line of lines) {
    if (headRe.test(line)) { cur = { heading: line.replace(/^#+\s*/, '').trim(), lines: [] }; out.push(cur); continue; }
    if (cur && (/^#{1,3}\s/.test(line) || /^---\s*$/.test(line))) { cur = null; continue; }
    if (cur) cur.lines.push(line);
  }
  return out;
}

// Inside a block, fields start at a bold label line.
function fields(block, labels) {
  const out = {};
  let key = null;
  for (const line of block.lines) {
    const hit = labels.find(l => l.re.test(line));
    if (hit) {
      key = hit.key;
      out[key] = out[key] || [];
      const rest = line.replace(hit.re, '').trim();
      if (rest) out[key].push(rest);
      continue;
    }
    if (key) out[key].push(line);
  }
  return out;
}

const EN_LABELS = [
  { key: 'source', re: /^\*\*Source:\*\*/ },
  { key: 'context', re: /^\*\*Context:\*\*/ },
  { key: 'latin', re: /^\*\*Latin Text:\*\*/i },
  { key: 'english', re: /^\*\*English Translation:\*\*/i },
  { key: 'analysis', re: /^\*\*Analysis:\*\*/ }
];
const IT_LABELS = [
  { key: 'source', re: /^\*\*Fonte:\*\*/ },
  { key: 'context', re: /^\*\*Contesto:\*\*/ },
  { key: 'latin', re: /^\*\*Testo latino:\*\*/i },
  { key: 'italian', re: /^\*\*Traduzione italiana\*\*(\s*\*\(originale\)\*)?:?/i },
  { key: 'analysis', re: /^\*\*Analisi:\*\*/ }
];

const nonEmpty = (arr) => (arr || []).map(l => l.replace(/^>\s?/, '').replace(/\s+$/, '')).filter(l => l.trim() !== '');
const prose = (arr) => (arr || []).join('\n').trim();

function parse() {
  const en = blocks(read('augustan_era_draft.md'), /^###\s+Excerpt\b/);
  const it = blocks(read('italian_translations_augustan.md'), /^###\s+Brano\b/);
  if (en.length !== it.length) throw new Error('excerpt count differs: EN ' + en.length + ', IT ' + it.length);
  return en.map((b, i) => {
    const e = fields(b, EN_LABELS), t = fields(it[i], IT_LABELS);
    return {
      heading: b.heading, headingIt: it[i].heading,
      source: prose(e.source), context: prose(e.context), contextIt: prose(t.context),
      latin: nonEmpty(e.latin), latinIt: nonEmpty(t.latin),
      english: nonEmpty(e.english), italian: nonEmpty(t.italian),
      analysis: prose(e.analysis), analysisIt: prose(t.analysis)
    };
  });
}

module.exports = parse;

if (require.main === module) {
  parse().forEach((x, i) => {
    const same = x.latin.join('\n') === x.latinIt.join('\n');
    console.log(String(i + 1).padStart(2) + ' ' + x.heading.slice(0, 70));
    console.log('     lat ' + x.latin.length + ' / en ' + x.english.length + ' / it ' + x.italian.length +
      '  latin EN=IT ' + same + '  ctx ' + x.context.length + '/' + x.contextIt.length +
      '  an ' + x.analysis.length + '/' + x.analysisIt.length);
  });
}
