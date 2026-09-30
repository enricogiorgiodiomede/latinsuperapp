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

// Long and short marks, upper and lower case - and the acute, which the
// Saturnian page uses to mark the WORD ACCENT in its accentual reading of a
// line. Both kinds of mark are editorial and both have to come back off before
// the verse can be matched against its source.
const QUANTITY = {
  'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y',
  'ă': 'a', 'ĕ': 'e', 'ĭ': 'i', 'ŏ': 'o', 'ŭ': 'u',
  'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U', 'Ȳ': 'Y',
  'Ă': 'A', 'Ĕ': 'E', 'Ĭ': 'I', 'Ŏ': 'O', 'Ŭ': 'U',
  'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ý': 'y',
  'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ý': 'Y'
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


// The marks on a verse, read left to right, as a sequence of quantities.
//
// Every syllable carries exactly one mark on its vowel, with two exceptions
// that are themselves conventions of the pages: a syllable inside brackets is
// elided and occupies no position at all, and a diphthong is always long and
// is therefore left bare. Anything else unmarked is an omission, and this
// returns null for it rather than guessing.
//
// This exists because of v1.15.2. Both Saturnian lines shipped with a breve on
// a syllable their own pattern called long - the *-um* of *virum*, closed by
// the *m* of *mihi*, and the *-ret* of *foret*, closed before the *f* of *fas*
// - and both errors were the same one: marking the vowel by nature where the
// pattern was recording the weight of the syllable. A reader found them. The
// point of the check below is that the next one will not need to.
var LONG_V = 'āēīōūȳĀĒĪŌŪȲ', SHORT_V = 'ăĕĭŏŭĂĔĬŎŬ', BARE_V = 'aeiouyAEIOUY';
// ei and ui are diphthongs only in a handful of words (cui, huic, deinde);
// they are accepted here because a bare vowel pair can only arise where the
// page has deliberately left a diphthong unmarked.
var DIPHTHONG = ['ae', 'oe', 'au', 'eu', 'ei', 'ui'];

function markSequence(s) {
  var out = [], depth = 0, chars = Array.from(s);
  for (var i = 0; i < chars.length; i++) {
    var ch = chars[i];
    if (ch === '(') { depth++; continue; }
    if (ch === ')') { depth--; continue; }
    if (depth) continue;                             // elided: no position
    if (LONG_V.indexOf(ch) >= 0) { out.push('–'); continue; }
    if (SHORT_V.indexOf(ch) >= 0) { out.push('⏑'); continue; }
    if (BARE_V.indexOf(ch) < 0) continue;
    // u after q, and in -ngu-, is a glide and not a vowel: quondam,
    // aequora, divomque, and the -gui- of languidos. The letters before it
    // are read across the foot bars, because a foot division can fall inside
    // a word and lan|guidos is still one -ngu-.
    var back = [];
    for (var j = i - 1; j >= 0 && back.length < 2; j--) if (/[a-z]/i.test(chars[j])) back.push(chars[j].toLowerCase());
    if ((ch === 'u' || ch === 'U') && (back[0] === 'q' || (back[0] === 'g' && back[1] === 'n'))) continue;
    var pair = (ch + (chars[i + 1] || '')).toLowerCase();
    if (DIPHTHONG.indexOf(pair) >= 0 && BARE_V.indexOf(chars[i + 1]) >= 0) {
      out.push('–');                                 // a diphthong is always long
      i++;
      continue;
    }
    return null;                                     // an unmarked syllable
  }
  return out;
}

// Every verse line in the bank, stripped of the blockquote marker and of the
// "**n.**" verse numbers.
const bankLines = (function () {
  const set = new Set();
  for (const slug of Object.keys(AUTHORS)) {
    for (const w of AUTHORS[slug].works) {
      for (const f of w.fragments) {
        f.latin.split('\n').forEach(l => {
          const t = l.replace(/^>\s?/, '').replace(/\*\*[\dIVXLCDM]+\.\*\*\s*/g, '').trim();
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

const D = '– ⏑ ⏑', S = '– –', TR = '– ⏑', L = '–', CLOSE = ['– ×', '– –', '– ⏑'];
const HEX = { feet: 6, allowed: [[D, S], [D, S], [D, S], [D, S], [D, S], CLOSE] };
// The elegiac pentameter is two half-lines of two-and-a-half feet, and the
// caesura between them falls on a foot boundary rather than inside a foot, so
// it is easier to enumerate the four legal lines outright than to describe them
// foot by foot. The first half may contract its dactyls to spondees; the second
// half never may, which is the rule that makes the couplet's second line sound
// the way it does.
const PENT = { patterns: [
  '– ⏑ ⏑ | – ⏑ ⏑ | – ‖ – ⏑ ⏑ | – ⏑ ⏑ | –',
  '– – | – ⏑ ⏑ | – ‖ – ⏑ ⏑ | – ⏑ ⏑ | –',
  '– ⏑ ⏑ | – – | – ‖ – ⏑ ⏑ | – ⏑ ⏑ | –',
  '– – | – – | – ‖ – ⏑ ⏑ | – ⏑ ⏑ | –'
] };

// A metre with no entry here is not shape-checked: the Saturnian is not agreed
// on, and a Roman trochaic septenarius admits so many substitutions that one
// line often allows several analyses. Both are shown with their break marked
// and no pattern, and both pages say so.
const SHAPE = {
  // six feet: the first five a dactyl or a spondee, the last always two
  // syllables. (The fifth is only CONVENTIONALLY a dactyl - a spondee there is
  // the spondeiazon, which Catullus uses on purpose - so it is allowed here.)
  'dactylic-hexameter': HEX,
  // fixed shape, eleven syllables, nothing substitutable except the base.
  'phalaecian-hendecasyllable': { feet: 5, allowed: [['× ×', S, TR, '⏑ –'], [D], [TR], [TR], CLOSE] },
  // a couplet: one hexameter, then one pentameter.
  'elegiac-couplets': { lines: [HEX, PENT] }
};

let checked = 0, bad = 0;
const fail = (msg) => { bad++; console.log('FAIL ' + msg); };

for (const id of Object.keys(PAGES)) {
  const page = PAGES[id];
  for (const ex of page.examples) {
    const label = id + ' / ' + ex.author + ', ' + ex.where;

    // An example is one line, or several when the metre's unit is several: an
    // elegiac couplet is a hexameter and a pentameter and has to be shown
    // together. `pattern` may be missing entirely, for a metre this project
    // declines to scan foot by foot.
    // `readings` is the SAME verse analysed more than one way (the Saturnian
    // gets a quantitative and an accentual reading). Every reading has to spell
    // the same verse, which is the check that matters: it proves the two
    // markings differ only in their marks.
    const marked = ex.readings ? ex.readings.map(r => r.marked) : [].concat(ex.marked);
    const plains = ex.readings ? ex.readings.map(() => ex.plain) : [].concat(ex.plain);
    const patterns = ex.readings
      ? (ex.readings.every(r => r.pattern) ? ex.readings.map(r => r.pattern) : null)
      : (ex.pattern == null ? null : [].concat(ex.pattern));
    if (marked.length !== plains.length) {
      fail(label + ': ' + marked.length + ' marked lines but ' + plains.length + ' plain ones');
      continue;
    }
    if (patterns && patterns.length !== marked.length) {
      fail(label + ': ' + marked.length + ' marked lines but ' + patterns.length + ' patterns');
      continue;
    }
    const shape = SHAPE[id];
    const lineShapes = shape ? (shape.lines || [shape]) : null;

    let ok = true;
    marked.forEach((markedLine, n) => {
      checked++;
      const where = label + (marked.length > 1
        ? (ex.readings ? ' [' + ex.readings[n].label.split('.').pop() + ' reading]' : ' [line ' + (n + 1) + ']')
        : '');

      // 1. the scansion has to spell the line. BOTH sides are unmarked, because
      //    the source itself can carry editorial marks: Ribbeck prints the
      //    Atellan fragments with the ictus on the vowel, and a macron where
      //    the edition has an acute is the same letter underneath. The verbatim
      //    check below still uses the plain line exactly as the bank holds it.
      const spelled = unmark(markedLine);
      const plain = plains[n].replace(/\s+/g, ' ').trim();
      if (spelled !== unmark(plain)) {
        ok = false;
        return fail(where + ': the marked scansion does not spell the verse' +
          '\n  marked -> ' + JSON.stringify(spelled) +
          '\n  plain  -> ' + JSON.stringify(unmark(plain)));
      }

      // 2. and the line has to be somebody's, verbatim - checked against the
      //    plain line as the bank actually holds it, marks and all
      if (ex.source === 'bank') {
        if (!bankLines.has(plain)) { ok = false; return fail(where + ': not a verbatim line of any excerpt in the bank: ' + JSON.stringify(plain)); }
      } else {
        const lines = cachedLines(ex.source);
        if (!lines) { ok = false; return fail(where + ': no cached page "' + ex.source + '" - run node tools/fetch_sources.js'); }
        if (!lines.has(plain)) { ok = false; return fail(where + ': not a verbatim line of the cached page "' + ex.source + '": ' + JSON.stringify(plain)); }
      }

      if (!patterns) return;   // shown without a foot analysis, on purpose

      // 3. the pattern must have as many feet as the marked line has bars -
      //    unless the verse carries no bars at all, which is deliberate where
      //    the foot joins fall inside elided clusters and bars on the verse
      //    would mislead rather than help. There the pattern line carries the
      //    feet on its own.
      const bars = (markedLine.match(/\|/g) || []).length;
      const feet = (patterns[n].match(/\|/g) || []).length;
      if (bars && bars !== feet) {
        ok = false;
        return fail(where + ': ' + (bars + 1) + ' feet marked on the verse but ' + (feet + 1) + ' in the pattern');
      }

      // 3c. AN ACCENTUAL READING is a different claim and gets a different
      //     check: the beats the pattern claims must be the beats actually
      //     written on the verse, and on the right side of the break. This is
      //     what caught the Naevius line, whose note counts *fas* as a beat
      //     while the verse left the monosyllable unmarked.
      if (patterns[n].indexOf('´') >= 0) {
        var beatsIn = function (s) {
          return (s.match(/[áéíóúýÁÉÍÓÚÝ´]/g) || []).length;
        };
        var mCola = markedLine.split('‖'), pCola = patterns[n].split('‖');
        if (mCola.length !== pCola.length) {
          ok = false;
          return fail(where + ': the verse has ' + mCola.length + ' cola and the pattern ' + pCola.length);
        }
        mCola.forEach(function (colon, k) {
          if (beatsIn(colon) !== beatsIn(pCola[k])) {
            ok = false;
            fail(where + ': colon ' + (k + 1) + ' is written with ' + beatsIn(colon) +
              ' accent(s) but the pattern claims ' + beatsIn(pCola[k]) +
              ' beat(s) - mark every syllable the reading counts, monosyllables included');
          }
        });
        return;
      }
      // 3b. THE MARKS ON THE VERSE MUST AGREE WITH THE PATTERN, position by
      //     position. A pattern is easy to write correctly and a marked verse
      //     is easy to write carelessly, and until v1.15.2 nothing compared
      //     the two. An anceps matches either.
      var seq = markSequence(markedLine);
      var slots = patterns[n].split('').filter(function (c) { return '–⏑×'.indexOf(c) >= 0; });
      if (!seq) {
        ok = false;
        return fail(where + ': a syllable carries no quantity mark (only a diphthong, or an elided syllable in brackets, may be bare)' +
          '\n  marked -> ' + markedLine);
      }
      if (seq.length !== slots.length) {
        ok = false;
        return fail(where + ': ' + seq.length + ' syllables marked on the verse but ' + slots.length + ' positions in the pattern' +
          '\n  marks   -> ' + seq.join(' ') +
          '\n  pattern -> ' + slots.join(' '));
      }
      for (var q = 0; q < seq.length; q++) {
        if (slots[q] !== '×' && slots[q] !== seq[q]) {
          ok = false;
          fail(where + ': syllable ' + (q + 1) + ' is marked ' + seq[q] + ' but the pattern calls it ' + slots[q] +
            ' (a syllable long by POSITION is still marked long: the mark gives the value of the syllable, not of the vowel)');
        }
      }

      // 4. and it has to be a legal line of THIS metre
      const ls = lineShapes && lineShapes[n];
      if (ls && ls.patterns) {
        // whole-line enumeration, for a line whose break sits on a foot join
        const norm = patterns[n].replace(/\s+/g, ' ').trim();
        if (ls.patterns.indexOf(norm) < 0) {
          ok = false;
          return fail(where + ': ' + JSON.stringify(norm) + ' is not one of the legal lines of this metre');
        }
      } else if (ls) {
        const got = footsOf(patterns[n]);
        if (got.length !== ls.feet) {
          ok = false;
          return fail(where + ': ' + got.length + ' feet in the pattern, ' + ls.feet + ' expected here');
        }
        got.forEach((f, i) => {
          if (ls.allowed[i].indexOf(f) < 0) {
            ok = false;
            fail(where + ': foot ' + (i + 1) + ' is ' + JSON.stringify(f) +
              ', which this metre does not allow there (expected ' + ls.allowed[i].join(' or ') + ')');
          }
        });
      }
    });

    // 5. the one prose claim that is mechanically checkable: an example that
    //    talks about the spondaic fifth foot has to BE one. (v1.15.0 shipped
    //    with that note sitting under a line whose fifth foot is an ordinary
    //    dactyl; the user caught it, and this is so it cannot happen again.)
    const prose = (ex.notes || []).join(' ') + ' ' + (ex.gloss || '');
    if (patterns && /spondeiazon|spondaic fifth foot|quinto piede spondaico/i.test(prose)) {
      const got = footsOf(patterns[0]);
      if (got[4] !== '– –') {
        ok = false;
        fail(label + ': the note claims a spondaic fifth foot, but the pattern has ' + JSON.stringify(got[4]));
      }
    }

    if (ok) console.log('OK   ' + label +
      (marked.length > 1 ? '  (' + marked.length + (ex.readings ? ' readings of one verse)' : ' lines)') : '') +
      (patterns ? '' : '  (shown without a foot analysis)'));
  }
}

console.log('\n' + checked + ' quoted verses checked, ' + bad + ' failed');
process.exit(bad ? 1 : 0);
