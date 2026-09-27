/*
 * check_metre_quotes.js - prove that every verse quoted on a metre page is
 * real, verbatim Latin.
 *
 *   node tools/check_metre_quotes.js
 *
 * The metre pages (js/metres.js) show one line per poet with its scansion
 * marked on it: macrons and breves over the vowels, bars between the feet,
 * a double bar at the caesura, and round brackets round an elided syllable.
 * All of that is editorial. Underneath it there has to be a line somebody
 * actually wrote, because the standing rule of this project is that Latin is
 * never retyped.
 *
 * So, for each example:
 *   1. strip the editorial marks off `marked` and check what is left is
 *      character-for-character the `plain` line;
 *   2. check `plain` is verbatim in its source - the bank (js/fragments.js)
 *      for a poet whose excerpt we already carry, or the cached Latin Library
 *      page for Catullus 1, which is not an excerpt.
 *
 * Step 1 is the one that earns its keep: it means a macron cannot be put on
 * the wrong vowel, or a foot bar dropped, without the tool noticing that the
 * scansion no longer spells the verse.
 *
 * Exit code 1 if anything fails.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CACHE = path.join(__dirname, '.cache');

global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

global.I18n = { lang: 'en' };
eval(fs.readFileSync(path.join(REPO, 'js/metres.js'), 'utf8'));
const PAGES = window.Metres.PAGES;

// Long and short marks, upper and lower case.
const QUANTITY = {
  'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y',
  'ă': 'a', 'ĕ': 'e', 'ĭ': 'i', 'ŏ': 'o', 'ŭ': 'u',
  'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U', 'Ȳ': 'Y',
  'Ă': 'A', 'Ĕ': 'E', 'Ĭ': 'I', 'Ŏ': 'O', 'Ŭ': 'U'
};

// Undo the editorial marking: drop the foot bars and the caesura, drop the
// brackets that show an elided syllable (keeping the letter inside, which is
// written in the source even though it is not pronounced), and put every
// marked vowel back to its plain letter. Then collapse the whitespace, since
// removing a bar can leave a double space where a word break already was.
function unmark(s) {
  let out = '';
  for (const ch of s) {
    if (ch === '|' || ch === '‖' || ch === '(' || ch === ')') continue;
    out += (QUANTITY[ch] != null) ? QUANTITY[ch] : ch;
  }
  return out.replace(/\s+/g, ' ').trim();
}

// Every verse line in the bank, stripped of the blockquote marker and of the
// "**n.**" verse numbers.
const bankLines = (function () {
  const set = new Set();
  for (const slug of Object.keys(AUTHORS)) {
    for (const w of AUTHORS[slug].works) {
      for (const f of w.fragments) {
        f.latin.split('\n').forEach(l => {
          const t = l.replace(/^>\s?/, '').replace(/\*\*\d+\.\*\*\s*/g, '').trim();
          if (t) set.add(t);
        });
      }
    }
  }
  return set;
})();

function cachedLines(page) {
  const file = path.join(CACHE, page + '.txt');
  if (!fs.existsSync(file)) return null;
  return new Set(
    fs.readFileSync(file, 'utf8').split('\n')
      .map(l => l.replace(/\s+\d+\s*$/, '').trim())      // trailing line numbers
      .filter(Boolean)
  );
}

let checked = 0, bad = 0;
const fail = (msg) => { bad++; console.log('FAIL ' + msg); };

for (const id of Object.keys(PAGES)) {
  const page = PAGES[id];
  for (const ex of page.examples) {
    checked++;
    const label = id + ' / ' + ex.author + ', ' + ex.where;

    // 1. the scansion has to spell the line
    const spelled = unmark(ex.marked);
    const plain = ex.plain.replace(/\s+/g, ' ').trim();
    if (spelled !== plain) {
      fail(label + ': the marked scansion does not spell the verse' +
        '\n  marked -> ' + JSON.stringify(spelled) +
        '\n  plain  -> ' + JSON.stringify(plain));
      continue;
    }

    // 2. and the line has to be somebody's, verbatim
    if (ex.source === 'bank') {
      if (!bankLines.has(plain)) fail(label + ': not a verbatim line of any excerpt in the bank: ' + JSON.stringify(plain));
    } else {
      const lines = cachedLines(ex.source);
      if (!lines) {
        fail(label + ': no cached page "' + ex.source + '" - run node tools/fetch_sources.js');
      } else if (!lines.has(plain)) {
        fail(label + ': not a verbatim line of the cached page "' + ex.source + '": ' + JSON.stringify(plain));
      }
    }

    // 3. a foot count sanity check: the pattern must have as many feet as the
    //    marked line has bars, plus one.
    const bars = (ex.marked.match(/\|/g) || []).length;
    const feet = (ex.pattern.match(/\|/g) || []).length;
    if (bars !== feet) {
      fail(label + ': ' + (bars + 1) + ' feet marked on the verse but ' + (feet + 1) + ' in the pattern');
    }

    if (!bad) console.log('OK   ' + label);
  }
}

console.log('\n' + checked + ' quoted verses checked, ' + bad + ' failed');
process.exit(bad ? 1 : 0);
