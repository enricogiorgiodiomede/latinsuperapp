/*
 * lint_markdown.js - catch the one Markdown construction this app cannot render.
 *
 *   node tools/lint_markdown.js
 *
 * js/markdown.js matches bold with a pattern whose inner group forbids an
 * asterisk, so a bold span containing an italic one silently fails to match and
 * leaks its literal asterisks onto the page:
 *
 *   ***De Bello Gallico*, Book VIII**   ->   **<em>De Bello Gallico</em>, Book VIII**
 *   **Il *De Bello Gallico***           ->   *<em>Il </em>De Bello Gallico***
 *
 * `***word***` is fine and is not reported. This has now shipped broken twice,
 * so it is checked in every release, over the era drafts, their generated
 * copies, the excerpt bank and the in-app What's New.
 *
 * IT ALSO CHECKS FOR BACKTICKS, which js/markdown.js does not render at all -
 * there is no code-span rule in it, so a backtick reaches the page as a
 * backtick. 306 of them had accumulated across 28 fragments before anybody
 * looked, all of them wrapping chapter references that wanted no markup in the
 * first place. If a code span is ever genuinely wanted, teach the renderer
 * first and then relax this rule.
 *
 * Two things are skipped, both because the app never renders them: the portrait
 * caption lines, which js/data.js `cleanBody` filters out before the renderer
 * sees them, and the block comments in the .js files, which are code.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BACKTICK = String.fromCharCode(96);
const FILES = [
  'archaic_era_draft.md', 'caesar_era_draft.md',
  'italian_translations_archaic.md', 'italian_translations_caesar.md',
  'js/content.js', 'js/content-it.js', 'js/fragments.js', 'js/changelog.js',
];

// Same two exclusions js/data.js applies, plus the Italian caption wording.
function skipLine(line) {
  if (/^\s*!\[.*\]\(.*\)\s*$/.test(line)) return true;
  if (/\((?:imaginary reconstruction|ricostruzione immaginaria)\)\*+\s*$/.test(line)) return true;
  if (/^\s*(?:\/\*|\*|\/\/)/.test(line)) return true;   // JS comment
  return false;
}

// Render exactly as js/markdown.js does, then see whether an asterisk survived.
function renderInline(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+?)\*/g, '<em>$1</em>');
}

// content.js and content-it.js hold whole markdown documents inside JS string
// literals, so the lines are escaped "\n" rather than real newlines.
function linesOf(file, text) {
  if (/content(-it)?\.js$/.test(file)) return text.split(/\\n|\n/);
  return text.split(/\r?\n/);
}

let bad = 0, checked = 0;
for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  linesOf(rel, fs.readFileSync(file, 'utf8')).forEach((line, i) => {
    const hasTick = line.indexOf(BACKTICK) !== -1;
    if ((line.indexOf('*') === -1 && !hasTick) || skipLine(line)) return;
    checked++;
    const html = renderInline(line);
    const at = html.indexOf('*') !== -1 ? html.indexOf('*') : html.indexOf(BACKTICK);
    if (at === -1) return;
    bad++;
    console.log(rel + ':' + (i + 1));
    console.log('   ' + html.slice(Math.max(0, at - 70), at + 70).replace(/\s+/g, ' '));
  });
}
console.log('\n' + checked + ' lines with emphasis checked, ' + bad + ' leaking a literal asterisk or backtick');
process.exit(bad ? 1 : 0);
