/*
 * scan_drama.js - which comic metres can a line of Plautus, Terence or
 * Caecilius actually be?
 *
 *   node tools/scan_drama.js <author-slug> [work-id]
 *   node tools/scan_drama.js --all
 *   node tools/scan_drama.js --claim <author-slug> <work-id> <fragment-index> <metre-id>
 *
 * WHAT THIS IS FOR, AND WHAT IT IS NOT FOR
 *
 * The metre label on an excerpt is an assertion, and this project does not
 * assert things it cannot check. For the hexameter authors the check is easy:
 * the metre is the same in every line. Comic verse is the opposite - a scene
 * moves between spoken senarii and recited septenarii, sometimes within a few
 * lines - so before any line can be labelled, something has to establish what
 * that line can and cannot be.
 *
 * This tool does the "cannot". For each verse it works out the syllables, the
 * elisions and every syllable weight that is FIXED by the spelling (a closed
 * syllable, a diphthong), leaves every weight that depends on vowel length
 * UNKNOWN, and then asks, of each candidate metre, whether any assignment of
 * those syllables to that metre's positions exists at all. A metre that admits
 * no assignment is refuted for that line. A metre that admits one is possible,
 * which is a much weaker claim, and the tool says so.
 *
 * It is deliberately biased towards saying "possible". Every uncertainty is
 * resolved in the direction that ADDS candidates:
 *   - a vowel whose length is not fixed by position is UNKNOWN, not guessed;
 *   - final -s before a consonant does not have to make position, because in
 *     early Latin it often does not (`magnu(s) vir`);
 *   - a mute-plus-liquid cluster may or may not close the syllable;
 *   - resolution is allowed wherever the metre allows it.
 * So a REFUTATION is strong and a FIT is not evidence by itself. The one thing
 * it cannot model is brevis brevians, the iambic shortening that pervades
 * Plautus, under which a heavy syllable may count light. A line that fits
 * nothing is therefore a line to look at by hand, not proof of a corrupt text.
 *
 * KNOWN LIMITATION: a text that prints consonantal u as `u` rather than `v`
 * is mis-syllabified - the Atellan fragments write *salueto* and *conuenit*,
 * which are salve-to and con-ve-nit, and the tool reads a vowel where there
 * is a consonant. Those lines come out one or two syllables too long. Check
 * such a line by hand before believing a count.
 *
 * Exit code 1 only in --claim mode, when a claimed metre is refuted.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

/* ==================================================================
   1. From spelling to syllables
 * ================================================================== */

const VOWELS = 'aeiouy';
// ae, au and oe are diphthongs wherever they are written. eu, ei and ui are
// not: *exeuntem* is ex-e-un-tem, *meis* is me-is, *voluit* is vo-lu-it. They
// count as one syllable only in the handful of words listed below, so the
// default here is two syllables, which is the commoner case by far.
const DIPHTHONGS = ['ae', 'au', 'oe'];
const RARE_DIPHTHONG = {
  eu: ['heu', 'eheu', 'seu', 'ceu', 'neu', 'heus', 'eu'],
  ei: ['ei', 'hei', 'deinde', 'dein', 'deinceps'],
  ui: ['cui', 'huic']
};
// A syllable's weight: '-' fixed heavy, 'u' fixed light, '?' not fixed by the
// spelling. Nothing here ever guesses a vowel's nature.
const HEAVY = '-', LIGHT = 'u', OPEN = '?';

// Words whose final vowel is short often enough to matter, and whose weight the
// spelling alone would leave open. Only words that are certain are listed: the
// rest stay OPEN, which costs nothing but a wider candidate set.
// ONLY words whose final vowel is invariably short. The tool refutes a metre by
// finding a short syllable where it needs a long one, so a word listed here
// wrongly refutes sound lines. Everything variable in early Latin is therefore
// left out on purpose: ubi, ibi, tibi, sibi, mihi, nisi and quasi all have a
// final vowel that goes both ways, and mihī long is what made the Saturnian
// colon scan in v1.15.2.
const SHORT_FINAL = new Set([
  'bene', 'male', 'saepe', 'ille', 'ipse', 'iste', 'inde', 'unde', 'ante',
  'atque', 'neque', 'itaque', 'quoque', 'namque', 'nempe', 'quippe', 'sive',
  'modo', 'ita', 'quia', 'eia', 'nam'
]);
// And only words whose final vowel is invariably long. hic is left out (the
// pronoun is short, the adverb long) and so is nam, whose a is short.
const LONG_FINAL = new Set([
  'non', 'cur', 'sic', 'huc', 'quin', 'sin', 'dum', 'cum', 'tum', 'tam', 'quam',
  'te', 'me', 'se', 'de', 'e', 'a', 'o', 'pro', 'qui', 'quo', 'quae'
]);

function words(line) {
  return line
    .replace(/^>\s?/, '')
    .replace(/\*\*[\dIVXLCDM]+\.\*\*/g, ' ')
    // Speaker names belong to the page, not to the verse: a senarius that
    // counts them comes out several syllables too long. They are printed either
    // abbreviated with a stop (SI., BACCH.) or in full in capitals (MERCVRIVS,
    // SOSIA), and the Latin around them is lower case, so two or more capitals
    // in a row is a safe signature.
    .replace(/\b[A-Z][A-Z]+\.?\s*/g, ' ')
    // the apostrophe of `eiu' causa` and `populu' curat` marks a final -s the
    // text itself has already dropped, so it is simply a word end
    .replace(/[‘’]/g, ' ')
    // Ribbeck prints the Atellan fragments with the ictus marked on the vowel
    // (díxin itúrum, Límen superum). That is an editorial mark, not a letter,
    // and a vowel wearing one is still a vowel.
    .replace(/[áàâ]/g, 'a').replace(/[éèê]/g, 'e').replace(/[íìî]/g, 'i')
    .replace(/[óòô]/g, 'o').replace(/[úùû]/g, 'u').replace(/[ýÿ]/g, 'y')
    .replace(/[ÁÀÂ]/g, 'A').replace(/[ÉÈÊ]/g, 'E').replace(/[ÍÌÎ]/g, 'I')
    .replace(/[ÓÒÔ]/g, 'O').replace(/[ÚÙÛ]/g, 'U')
    .replace(/[^A-Za-zÀ-ÿ'\- ]/g, ' ')
    .toLowerCase()
    .split(/[\s'\-]+/)
    .filter(Boolean)
    // Consonantal i, written as a vowel: *iam* is one syllable, not two, and
    // between vowels the letter counts double, which is why the first syllable
    // of *eius* and *maior* is heavy. Rewriting it as j (and jj) lets the
    // syllable rules below stay ignorant of the distinction.
    .map(function (w) {
      // The u of qu- and -ngu- is a glide and must not count as the vowel that
      // makes the next i consonantal: *quia* is qui-a, two syllables, not qujja.
      return w.replace(/qu/g, '\u0001').replace(/ngu/g, '\u0002')
        .replace(/^i(?=[aeiouy])/, 'j').replace(/([aeiouy])i(?=[aeiouy])/g, '$1jj')
        .replace(/\u0001/g, 'qu').replace(/\u0002/g, 'ngu');
    });
}

function isVowel(ch) { return VOWELS.indexOf(ch) >= 0; }

// Split a word into [{nucleus, onsetLen, codaLen, diphthong}] - enough to work
// out weights, not a full phonology.
function syllabify(w) {
  const out = [];
  for (let i = 0; i < w.length; i++) {
    if (!isVowel(w[i])) continue;
    // u after q, and after g/s before another vowel, is a glide, not a nucleus
    // u is a glide, not a syllable, after q (quondam) and in -ngu- (lingua).
    // It is NOT a glide after a plain s: *suo* and *suus* are two syllables.
    if (w[i] === 'u' && i > 0 && isVowel(w[i + 1]) &&
        (w[i - 1] === 'q' || (w[i - 1] === 'g' && w[i - 2] === 'n'))) continue;
    let len = 1, diph = false;
    if (isVowel(w[i + 1])) {
      const pair = w[i] + w[i + 1];
      if (DIPHTHONGS.indexOf(pair) >= 0) { len = 2; diph = true; }
      else if (RARE_DIPHTHONG[pair] && RARE_DIPHTHONG[pair].indexOf(w) >= 0) { len = 2; diph = true; }
    }
    out.push({ at: i, len: len, diph: diph });
    i += len - 1;
  }
  return out;
}

const MUTE = 'pbtdcgf', LIQUID = 'lr';

// The weights of one line, after elision, as a string of '-', 'u' and '?'.
function weigh(line) {
  const ws = words(line);
  const syls = [];                       // {w, idx, diph, code}
  ws.forEach(function (w, wi) {
    syllabify(w).forEach(function (s, si, all) {
      syls.push({ w: w, wi: wi, si: si, last: si === all.length - 1, s: s });
    });
  });

  // Elision: a word ending in a vowel, a diphthong or vowel + m loses its last
  // syllable before a word beginning with a vowel or h + vowel. It is marked
  // rather than applied, because Plautus leaves such a syllable standing often
  // enough - hiatus, especially at a change of speaker or a sense pause - that
  // treating elision as compulsory refutes lines that are perfectly sound. The
  // fitter elides by default and is asked to reconsider only when nothing fits.
  const alive = [];
  for (let i = 0; i < syls.length; i++) {
    const cur = syls[i], w = cur.w;
    cur.elidable = false;
    if (cur.last && cur.wi < ws.length - 1) {
      const nxt = ws[cur.wi + 1];
      const startsVowel = isVowel(nxt[0]) || (nxt[0] === 'h' && isVowel(nxt[1]));
      const endsVowel = isVowel(w[w.length - 1]) ||
        (w[w.length - 1] === 'm' && isVowel(w[w.length - 2]));
      if (startsVowel && endsVowel) cur.elidable = true;
    }
    alive.push(cur);
  }

  const marks = alive.map(function (cur, k) {
    const w = cur.w, s = cur.s;
    if (s.diph) return HEAVY;
    const after = w.slice(s.at + s.len);                 // rest of this word
    const nextWord = (k + 1 < alive.length && alive[k + 1].wi !== cur.wi)
      ? alive[k + 1].w : (cur.wi < 1000 ? (words(line)[cur.wi + 1] || '') : '');
    // consonants between this nucleus and the next one, across the word break
    let cluster = '';
    for (let i = 0; i < after.length && !isVowel(after[i]); i++) cluster += after[i];
    const wordFinal = cluster.length === after.length;
    if (wordFinal) {
      const nw = nextWord || '';
      for (let i = 0; i < nw.length && !isVowel(nw[i]); i++) cluster += nw[i];
    }
    cluster = cluster.replace(/h/g, '');                 // h is not a consonant
    const xz = /[xz]/.test(cluster);
    if (xz) return HEAVY;
    if (cluster.length >= 2) {
      // mute + liquid may or may not close the syllable, and in Plautus usually
      // does not: leave it open
      if (cluster.length === 2 && MUTE.indexOf(cluster[0]) >= 0 && LIQUID.indexOf(cluster[1]) >= 0) return OPEN;
      // final -s before a consonant need not make position in early Latin
      if (wordFinal && after.replace(/h/g, '') === 's') return OPEN;
      return HEAVY;
    }
    if (cluster.length === 1) {
      // A single consonant belongs to the following syllable, so this one stays
      // open - and that holds across a word break too. `illud est` divides
      // il-lu-dest, which is why the -lu- of *illud* is short there although it
      // looks closed on the page. (The cluster is only one consonant long in
      // the first place when the next word begins with a vowel, or with an h,
      // which does not make position either.)
      if (!wordFinal) return vowelWeight(cur, w);
      if (k === alive.length - 1) return OPEN;            // line end: indifferent
      return vowelWeight(cur, w);
    }
    return vowelWeight(cur, w);
  });
  return { marks: marks, elide: alive.map(function (c) { return c.elidable; }) };
}

// The line as it scans with every elision made: the default reading.
function elided(line) {
  const w = weigh(line);
  return w.marks.filter(function (_, i) { return !w.elide[i]; }).join('');
}

function vowelWeight(cur, w) {
  if (cur.last) {
    if (SHORT_FINAL.has(w)) return LIGHT;
    if (LONG_FINAL.has(w)) return HEAVY;
  }
  return OPEN;
}

/* ==================================================================
   2. The metres, as sequences of positions
 * ================================================================== */

// L = longum, may be resolved into two shorts
// A = anceps, long or short, and may be resolved
// S = strictly one short syllable
// X = the final syllable, which is indifferent
//
// A comic senarius is six iambic feet, a septenarius seven feet and a closing
// syllable, an octonarius eight feet. The last foot of an iambic line is a true
// iamb and takes no resolution, which is the one real constraint at the end.
function feet(pattern, n, tail) {
  let out = [];
  for (let i = 0; i < n; i++) out = out.concat(pattern);
  return out.concat(tail);
}
const METRES = {
  'iambic-senarius':      { label: 'ia6', pos: feet(['A', 'L'], 5, ['S', 'X']) },
  'iambic-septenarius':   { label: 'ia7', pos: feet(['A', 'L'], 6, ['S', 'L', 'X']) },
  'iambic-octonarius':    { label: 'ia8', pos: feet(['A', 'L'], 7, ['S', 'X']) },
  'trochaic-septenarius': { label: 'tr7', pos: feet(['L', 'A'], 7, ['X']) },
  'trochaic-octonarius':  { label: 'tr8', pos: feet(['L', 'A'], 7, ['L', 'X']) }
};
// Not modelled, on purpose: the anapaestic lines and the lyric cola of the
// cantica. An anapaestic template is so permissive - anceps at nearly every
// position - that it fits almost any line of the right length and would drown
// the useful answers; the lyric cola are not a fixed length at all. An excerpt
// whose lines refuse every template here is a canticum, and this tool says so
// by failing rather than by guessing.
const NO_RESOLUTION_AT_END = 2;         // the closing foot takes no resolution

/* ==================================================================
   3. Does this line fit that metre?
 * ================================================================== */

function matches(weight, kind) {
  if (kind === 'X') return true;
  if (kind === 'S') return weight !== HEAVY;
  if (kind === 'A') return true;                   // long or short, both legal
  return weight !== LIGHT;                         // L: long, or resolved below
}

// Can positions p.. absorb syllables s..? Memoised depth-first search.
function fits(weights, pos) {
  const memo = new Map();
  function go(p, s) {
    if (p === pos.length) return s === weights.length;
    if (s >= weights.length) return false;
    const key = p * 1000 + s;
    if (memo.has(key)) return memo.get(key);
    const kind = pos[p];
    const light = function (i) { return weights[i] !== HEAVY || mayShorten(weights, i); };
    let ok = false;
    if (matches(weights[s], kind) || (kind === 'S' && light(s))) ok = go(p + 1, s + 1);
    // resolution: a longum or an anceps may be two shorts instead of one long,
    // except in the closing foot
    if (!ok && (kind === 'L' || kind === 'A') && p < pos.length - NO_RESOLUTION_AT_END &&
        s + 1 < weights.length && light(s) && light(s + 1)) {
      ok = go(p + 1, s + 2);
    }
    memo.set(key, ok);
    return ok;
  }
  return go(0, 0);
}

// A line read with every elision made. If that refutes everything, read it
// again allowing hiatus at any of the elisions, and mark the results with a ~
// so a fit bought that way is never mistaken for a clean one.
function candidates(line) {
  const w = elided(line);
  const out = [];
  for (const id of Object.keys(METRES)) if (fits(w, METRES[id].pos)) out.push(METRES[id].label);
  if (out.length) return { weights: w, fits: out, hiatus: false };

  const full = weigh(line);
  const loose = [];
  for (const id of Object.keys(METRES)) {
    if (fitsWithHiatus(full, METRES[id].pos)) loose.push('~' + METRES[id].label);
  }
  return { weights: w, fits: loose, hiatus: true };
}

// BREVIS BREVIANS, the iambic shortening, is the one licence this tool cannot
// model honestly line by line: a heavy syllable may count light when the
// syllable before it is light, which is pervasive in comedy and depends on the
// word accent, something the tool does not know. It is therefore off by default
// and switched on only to answer the question "could shortening explain this?".
// A fit bought with it is reported as such and never counted as a clean one.
let ALLOW_SHORTENING = false;
function mayShorten(marks, s) {
  return ALLOW_SHORTENING && s > 0 && marks[s - 1] !== HEAVY;
}

// The same search, except that an elidable syllable may also be kept.
function fitsWithHiatus(full, pos) {
  const marks = full.marks, elide = full.elide;
  const memo = new Map();
  function go(p, s) {
    if (s === marks.length) return p === pos.length;
    const key = p * 10000 + s;
    if (memo.has(key)) return memo.get(key);
    let ok = false;
    if (elide[s]) ok = go(p, s + 1);                 // elided: no position at all
    if (!ok && p < pos.length) {
      const kind = pos[p];
      if (matches(marks[s], kind)) ok = go(p + 1, s + 1);
      if (!ok && (kind === 'L' || kind === 'A') && p < pos.length - NO_RESOLUTION_AT_END &&
          s + 1 < marks.length && marks[s] !== HEAVY && marks[s + 1] !== HEAVY) {
        ok = go(p + 1, s + 2);
      }
    }
    memo.set(key, ok);
    return ok;
  }
  return go(0, 0);
}

/* ==================================================================
   4. Reporting
 * ================================================================== */

// A verse is a blockquote line. Some excerpts carry an editorial source note
// in the same field - the Atellan fragments, which are on neither of the two
// usual sites - and a paragraph of English prose is not a line of Latin.
function isVerseLine(l) { return /^>\s*\S/.test(l); }

function fragmentsOf(slug, workId) {
  const au = AUTHORS[slug];
  if (!au) throw new Error('no such author: ' + slug);
  const out = [];
  au.works.forEach(function (w) {
    if (workId && w.id !== workId) return;
    w.fragments.forEach(function (f, i) { out.push({ work: w.id, index: i, frag: f }); });
  });
  return out;
}

/* ==================================================================
   4. From line possibilities to an excerpt's structure
 * ================================================================== */

// A scene does not change metre line by line: it runs in one metre and then
// changes, and the change is an event. So the reading to prefer, among all the
// readings each line allows, is the one with the FEWEST changes - and it is
// worth having only if it is the unique one with that few. Where two different
// structures are equally economical the excerpt is ambiguous and gets no
// per-line label at all, which is the whole point of computing this.
// A line the editors have marked as corrupt (a crux, a gap) is evidence about
// nothing: it is allowed to take whatever metre its neighbours have, rather
// than inventing a one-line change of metre. Miles Gloriosus v. 8 is the case
// that made this necessary.
function isCrux(line) { return /~|\[\.\.\.\]|†/.test(line); }

function structure(lineFits) {
  const all = [...new Set([].concat.apply([], lineFits))];
  if (!all.length || lineFits.some(function (f) { return !f.length; })) return null;
  const INF = 1e9;
  let cost = {}, ways = {}, back = [];
  all.forEach(function (m) { cost[m] = lineFits[0].indexOf(m) >= 0 ? 0 : INF; ways[m] = cost[m] ? 0 : 1; });
  for (let i = 1; i < lineFits.length; i++) {
    const nc = {}, nw = {}, bk = {};
    all.forEach(function (m) {
      if (lineFits[i].indexOf(m) < 0) { nc[m] = INF; nw[m] = 0; return; }
      let best = INF, w = 0, from = [];
      all.forEach(function (p) {
        if (cost[p] >= INF) return;
        const c = cost[p] + (p === m ? 0 : 1);
        if (c < best) { best = c; w = ways[p]; from = [p]; }
        else if (c === best) { w += ways[p]; from.push(p); }
      });
      nc[m] = best; nw[m] = w; bk[m] = from;
    });
    cost = nc; ways = nw; back.push(bk);
  }
  let best = INF, total = 0, end = null;
  all.forEach(function (m) {
    if (cost[m] < best) { best = cost[m]; total = ways[m]; end = m; }
    else if (cost[m] === best) { total += ways[m]; }
  });
  if (best >= INF) return null;
  // walk one optimal path back
  const seq = [end];
  for (let i = back.length - 1; i >= 0; i--) seq.unshift(back[i][seq[0]][0]);
  const runs = [];
  seq.forEach(function (m, i) {
    if (!runs.length || runs[runs.length - 1].metre !== m) runs.push({ metre: m, from: i + 1, to: i + 1 });
    else runs[runs.length - 1].to = i + 1;
  });
  return { changes: best, unique: total === 1, runs: runs };
}

function structureLine(st, n) {
  if (!st) return '  => no structure: some line fits nothing (a canticum, or a line to read by hand)';
  const desc = st.runs.map(function (r) {
    return r.metre + ' vv. ' + (r.from === r.to ? r.from : r.from + '-' + r.to);
  }).join(' | ');
  return '  => ' + (st.unique ? 'STRUCTURE' : 'ambiguous') + ' (' + st.changes + ' change' +
    (st.changes === 1 ? '' : 's') + (st.unique ? '' : ', several equally economical') + '): ' + desc;
}

function report(slug, workId) {
  const items = fragmentsOf(slug, workId);
  items.forEach(function (it) {
    const lines = it.frag.latin.split('\n').filter(isVerseLine);
    console.log('\n' + it.work + ' [' + it.index + ']  ' + it.frag.citation);
    const tally = {};
    lines.forEach(function (l, i) {
      const c = candidates(l);
      c.fits.forEach(function (f) { tally[f] = (tally[f] || 0) + 1; });
      console.log('  ' + String(i + 1).padStart(2) + '  ' + (c.fits.join(',') || 'NO FIT').padEnd(24) +
        String(c.weights.length).padStart(2) + '  ' + c.weights.padEnd(22) + '  ' +
        l.replace(/^>\s?/, '').slice(0, 64));
    });
    const common = Object.keys(tally).filter(function (k) { return tally[k] === lines.length; });
    console.log('  => every line admits: ' + (common.join(', ') || 'NOTHING IN COMMON') +
      '   (' + lines.length + ' lines)');
    const ALL = Object.keys(METRES).map(function (k) { return METRES[k].label; });
    console.log(structureLine(structure(lines.map(function (l) {
      if (isCrux(l)) return ALL.slice();
      return candidates(l).fits.map(function (f) { return f.replace('~', ''); });
    })), lines.length));
  });
}

function claim(slug, workId, index, metreId) {
  const m = METRES[metreId];
  if (!m) throw new Error('unknown metre: ' + metreId + ' (have: ' + Object.keys(METRES).join(', ') + ')');
  const it = fragmentsOf(slug, workId)[Number(index)];
  const lines = it.frag.latin.split('\n').filter(isVerseLine);
  let bad = 0;
  lines.forEach(function (l, i) {
    const w = elided(l);
    if (fits(w, m.pos)) return;
    // a line that needs hiatus is not refuted, but it is worth saying so
    if (fitsWithHiatus(weigh(l), m.pos)) {
      console.log('hiatus  line ' + (i + 1) + ': fits ' + metreId + ' only if an elision is left open');
      return;
    }
    bad++;
    console.log('REFUTED line ' + (i + 1) + ': no assignment of ' + w.length + ' syllables to ' +
      metreId + '\n   ' + l.replace(/^>\s?/, '') + '\n   ' + w);
  });
  console.log(lines.length + ' lines, ' + bad + ' that ' + metreId + ' cannot account for');
  process.exit(bad ? 1 : 0);
}

// One line, taken apart: what the tool thinks the words, the elisions and the
// weights are. Every disagreement about a scansion starts here.
function explain(line) {
  const ws = words(line);
  console.log('words   ' + ws.join(' | '));
  console.log('syllab  ' + ws.map(function (w) {
    return syllabify(w).map(function (s) { return w.substr(s.at, s.len); }).join('-');
  }).join(' | '));
  const c = candidates(line);
  console.log("weights " + c.weights + "   (" + c.weights.length + " syllables after elision)");
  console.log('fits    ' + (c.fits.join(', ') || 'NOTHING'));
}

// Check a scansion written by hand: the pattern must have one mark per
// syllable, must agree with every weight the spelling fixes, and must be a
// legal line of the metre claimed. This is what stops a wrong scansion from
// reaching a metre page - the pages are the part a reader checks.
function verify(line, pattern, metreId) {
  const m = METRES[metreId];
  if (!m) { console.log('unknown metre ' + metreId); process.exit(2); }
  const w = elided(line);
  const marks = pattern.split('').filter(function (c) { return '–⏑×'.indexOf(c) >= 0; });
  let bad = 0;
  console.log('weights  ' + w);
  console.log('pattern  ' + marks.join(''));
  if (marks.length !== w.length) {
    console.log('FAIL ' + marks.length + ' marks for ' + w.length + ' syllables');
    bad++;
  } else {
    w.split('').forEach(function (weight, i) {
      const mark = marks[i];
      if (weight === HEAVY && mark === '⏑') { bad++; console.log('FAIL syllable ' + (i + 1) + ': the spelling fixes it long, the scansion marks it short'); }
      if (weight === LIGHT && mark === '–') { bad++; console.log('FAIL syllable ' + (i + 1) + ': the spelling fixes it short, the scansion marks it long'); }
    });
  }
  // and the pattern itself has to be a line of this metre
  const asWeights = marks.map(function (c) { return c === '–' ? HEAVY : (c === '⏑' ? LIGHT : OPEN); }).join('');
  if (!fits(asWeights, m.pos)) { bad++; console.log('FAIL the pattern is not a legal ' + metreId); }
  console.log(bad ? bad + ' problem(s)' : 'OK: a legal ' + metreId + ', consistent with the spelling');
  process.exit(bad ? 1 : 0);
}

const argv = process.argv.slice(2);
if (argv.indexOf('--lax') >= 0) { ALLOW_SHORTENING = true; argv.splice(argv.indexOf('--lax'), 1); }
if (argv[0] === '--verify') verify(argv[1], argv[2], argv[3]);
else if (argv[0] === '--line') explain(argv.slice(1).join(' '));
else if (argv[0] === '--claim') claim(argv[1], argv[2], argv[3], argv[4]);
else if (argv[0] === '--all') {
  ['titus-maccius-plautus', 'publius-terentius-afer', 'caecilius-statius'].forEach(function (s) {
    console.log('\n########## ' + s + ' ##########');
    report(s);
  });
} else report(argv[0], argv[1]);
