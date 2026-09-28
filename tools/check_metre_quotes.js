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

// Split a pattern line into its feet, dropping the caesura mark, which sits
// inside a foot and says nothing about its shape.
function footsOf(pattern) {
  return pattern.split('|').map(f => f.replace(/‖/g, '').replace(/\s+/g, ' ').trim());
}

const D = '– ⏑ ⏑', S = '– –', TR = '– ⏑', CLOSE = ['– ×', '– –', '– ⏑'];
const SHAPE = {
  // six feet: the first five a dactyl or a spondee, the last always two
  // syllables. (The fifth is only CONVENTIONALLY a dactyl - a spondee there is
  // the spondeiazon, which Catullus uses on purpose - so it is allowed here.)
  'dactylic-hexameter': { feet: 6, allowed: [[D, S], [D, S], [D, S], [D, S], [D, S], CLOSE] },
  // fixed shape, eleven syllables, nothing substitutable except the base.
  'phalaecian-hendecasyllable': { feet: 5, allowed: [['× ×', S, TR, '⏑ –'], [D], [TR], [TR], CLOSE] }
};

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

    // 4. the pattern has to be a legal line of THIS metre. Cheap, exact, and it
    //    catches a mistyped foot that reads plausibly.
    const shape = SHAPE[id];
    if (shape) {
      const got = footsOf(ex.pattern);
      if (got.length !== shape.feet) {
        fail(label + ': ' + got.length + ' feet in the pattern, ' + shape.feet + ' expected for this metre');
      } else {
        got.forEach((f, n) => {
          if (shape.allowed[n].indexOf(f) < 0) {
            fail(label + ': foot ' + (n + 1) + ' is ' + JSON.stringify(f) +
              ', which this metre does not allow there (expected ' + shape.allowed[n].join(' or ') + ')');
          }
        });
      }
    }

    // 5. and the prose has to match the pattern where it makes a checkable
    //    claim. Only one claim is checked, because it is the one that went
    //    wrong: an example that talks about the spondaic fifth foot has to BE
    //    one. (v1.15.0 shipped with a note about the spondeiazon sitting under
    //    a line whose fifth foot is an ordinary dactyl; the user caught it.)
    const prose = (ex.notes || []).join(' ') + ' ' + (ex.gloss || '');
    if (/spondeiazon|spondaic fifth foot|quinto piede spondaico/i.test(prose)) {
      const got = footsOf(ex.pattern);
      if (got[4] !== '– –') {
        fail(label + ': the note claims a spondaic fifth foot, but the pattern has ' + JSON.stringify(got[4]));
      }
    }

    if (!bad) console.log('OK   ' + label);
  }
}

console.log('\n' + checked + ' quoted verses checked, ' + bad + ' failed');
process.exit(bad ? 1 : 0);
