/*
 * number_excerpts.js - what verse number is each line of an excerpt?
 *
 *   node tools/number_excerpts.js                 report every comic excerpt
 *   node tools/number_excerpts.js <author-slug>   one author
 *
 * WHY THIS IS NOT OBVIOUS
 *
 * The metre labels point at verses - "Trochaic Septenarius (vv. 755-760)" -
 * and until v1.15.5 no excerpt printed a verse number, so a reader had no way
 * to find v. 755. Numbering would be trivial if the nth line were the nth
 * verse, and usually it is; but a comic text splits a verse between speakers
 * wherever the speaker changes, the bank sometimes prints two half-verses as
 * one line, and several excerpts skip verses in the middle. Counting lines
 * therefore goes wrong exactly where the answer matters.
 *
 * HOW THE NUMBER IS RECOVERED
 *
 * tools/fetch_plays_perseus.js caches every play as { n, text } per verse, from
 * the TEI editions, where each verse carries its number explicitly. This tool
 * matches each line of the bank against that list by LETTERS ALONE - speaker
 * sigla, punctuation, capitals, u/v and i/j all folded away - and reads the
 * number off. Nothing is ever numbered by counting.
 *
 * A line of the bank may be
 *   - a whole verse            -> matches one verse exactly
 *   - half a verse (antilabe)  -> matches a verse as a prefix or a suffix
 *   - two verses run together  -> matches a pair of consecutive verses
 * and each case is reported, because each means something different when the
 * markers are written: only a line that BEGINS a verse may carry its number.
 *
 * WHAT IT REFUSES TO DO
 *
 * A line that cannot be matched, or that matches in several places, is reported
 * and the excerpt is left alone.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const PLAYS = path.join(__dirname, '.cache', 'plays');

global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

/* ==================================================================
   1. Folding
 * ================================================================== */

// Reduce a line to the letters that matter. Speaker sigla are dropped: the
// bank writes them as PYRG. or MERCVRIVS, and the editions put them in a
// separate field, so they are never part of the verse.
function fold(s) {
  return String(s)
    .replace(/\b[A-Z][A-Z]+\.?/g, ' ')
    .replace(/\b[A-Z][a-z]{0,6}\.(?=\s)/g, ' ')     // Si. Da. Mi. - abbreviated names
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/j/g, 'i').replace(/v/g, 'u');
}

const cache = {};
function play(workId) {
  if (!cache[workId]) {
    const file = path.join(PLAYS, workId + '.json');
    if (!fs.existsSync(file)) return null;
    const raw = JSON.parse(fs.readFileSync(file, 'utf8')).lines;
    cache[workId] = raw.map(function (l) { return { n: l.n, text: l.text, folded: fold(l.text) }; })
      .filter(function (l) { return l.folded.length; });
  }
  return cache[workId];
}

/* ==================================================================
   2. Matching
 * ================================================================== */

const isVerseLine = (l) => /^>\s*\S/.test(l);
const bare = (l) => l.replace(/^>\s?/, '').replace(/\*\*[\dIVXLCDM]+\.\*\*\s*/g, '');

// How alike are two folded lines? The length of their longest common
// subsequence over the length of the longer one, which is tolerant of the
// spelling differences between editions (saeuos/saevus) and intolerant of
// actually different verses.
function similarity(a, b) {
  if (!a.length || !b.length) return 0;
  const prev = new Array(b.length + 1).fill(0);
  const cur = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    cur[0] = 0;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length] / Math.max(a.length, b.length);
}

// A trigram index, so that only a handful of verses are compared in full.
function indexOf(verses) {
  if (verses.index) return verses.index;
  const idx = new Map();
  verses.forEach(function (v, i) {
    for (let k = 0; k + 3 <= v.folded.length; k += 2) {
      const g = v.folded.substr(k, 3);
      if (!idx.has(g)) idx.set(g, []);
      idx.get(g).push(i);
    }
  });
  verses.index = idx;
  return idx;
}

// The verses that look like this line, best first.
function candidates(verses, folded) {
  const idx = indexOf(verses);
  const score = new Map();
  for (let k = 0; k + 3 <= folded.length; k += 2) {
    const hit = idx.get(folded.substr(k, 3));
    if (!hit) continue;
    for (const i of hit) score.set(i, (score.get(i) || 0) + 1);
  }
  return [...score.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).map(e => e[0]);
}

const GOOD = 0.78;          // below this, the line is reported, never guessed

// Place one line: as a whole verse, as part of one, or as two verses joined.
function place(verses, folded, from, lo, hi) {
  let best = null;
  const look = (lo != null)
    ? Array.from({ length: hi - lo + 1 }, (_, k) => lo + k).filter(i => i >= 0 && i < verses.length)
    : candidates(verses, folded);
  for (const i of look) {
    const v = verses[i];
    const whole = similarity(folded, v.folded);
    if (whole > (best ? best.score : (lo != null ? 0.45 : GOOD))) best = { at: i, span: 1, kind: 'verse', score: whole };
    // half a verse: compare against the head and the tail of the verse
    if (folded.length < v.folded.length * 0.8) {
      const head = similarity(folded, v.folded.slice(0, folded.length));
      const tail = similarity(folded, v.folded.slice(-folded.length));
      const part = Math.max(head, tail);
      if (part > (best ? best.score : (lo != null ? 0.45 : GOOD))) {
        best = { at: i, span: 1, kind: 'part', head: head >= tail, score: part };
      }
    }
    // two or three verses printed as one line
    let joined = v.folded;
    for (let k = 1; k <= 2 && i + k < verses.length; k++) {
      joined += verses[i + k].folded;
      const sim = similarity(folded, joined);
      if (sim > (best ? best.score : (lo != null ? 0.45 : GOOD))) best = { at: i, span: k + 1, kind: 'joined', score: sim };
      if (joined.length > folded.length * 1.3) break;
    }
  }
  if (best && from != null && best.at < from - 2) best.backwards = true;
  return best;
}

function numbersFor(workId, frag) {
  const verses = play(workId);
  if (!verses) return { error: 'no cached play for ' + workId };

  const out = [];
  let from = 0;
  for (const raw of frag.latin.split('\n')) {
    if (!isVerseLine(raw)) continue;
    const folded = fold(bare(raw));
    if (!folded) { out.push({ raw: raw, note: 'no letters' }); continue; }

    // Try the verses that come next FIRST. Once a line is placed, the next
    // line is nearly always the next verse, and that is far stronger evidence
    // than resemblance: the two editions sometimes print different words
    // (Adelphoe 869 is *heia autem* here and *Porro autem illis* there), and a
    // line like that will never match well enough on letters alone.
    let hit = null;
    if (from > 0) {
      for (let k = 0; k < 4 && !hit; k++) {
        const near = place(verses, folded, from, from + k, from + k);
        if (near && near.score >= 0.5) hit = near;
      }
    }
    if (!hit) hit = place(verses, folded, from);
    if (!hit) { out.push({ raw: raw, note: 'NOT FOUND' }); continue; }

    const first = verses[hit.at], last = verses[hit.at + hit.span - 1];
    const prev = out[out.length - 1];
    const continues = hit.kind === 'part' && !hit.head && prev && prev.at === hit.at;
    out.push({
      raw: raw, n: first.n, to: hit.span > 1 ? last.n : null,
      at: hit.at, kind: hit.kind, continues: continues,
      score: Math.round(hit.score * 100) / 100
    });
    from = hit.at + (continues ? 1 : hit.span);
  }
  return { lines: out };
}

/* ==================================================================
   3. Report
 * ================================================================== */

const WHO = ['titus-maccius-plautus', 'publius-terentius-afer'];

function report(only) {
  let clean = 0, problems = 0;
  for (const slug of (only ? [only] : WHO)) {
    console.log('\n########## ' + slug);
    for (const w of AUTHORS[slug].works) {
      for (const f of w.fragments) {
        const r = numbersFor(w.id, f);
        if (r.error) { console.log('  ' + r.error); problems++; continue; }
        const bad = r.lines.filter(l => l.note);
        // A line that joins two verses ends at l.to, and a second half-verse
        // repeats the number of the line before it. Both have to be allowed for
        // before a jump in the numbers counts as a gap in the text.
        const placed = r.lines.filter(l => l.n);
        const num = (v) => Number(String(v).replace(/\D.*$/, ''));
        const ns = placed.map(l => num(l.n));
        const ends = placed.map(l => num(l.to || l.n));
        const gaps = [];
        for (let i = 1; i < ns.length; i++) {
          if (placed[i].continues) continue;
          if (ns[i] - ends[i - 1] > 1) gaps.push(ends[i - 1] + '/' + ns[i]);
        }
        const joined = r.lines.filter(l => l.to).length;
        const split = r.lines.filter(l => l.continues).length;
        const cited = (f.citation.match(/vv?\.?\s*(\d+)(?:\s*-\s*(\d+))?/) || []);
        const citedFrom = Number(cited[1] || 0), citedTo = Number(cited[2] || cited[1] || 0);
        const mismatch = ns.length && (ns[0] !== citedFrom || ends[ends.length - 1] !== citedTo);
        if (bad.length) problems++; else clean++;
        console.log('  ' + (bad.length ? 'PROBLEM' : mismatch ? 'CITATION' : 'ok     ') + ' ' +
          f.citation.replace(/^\(|\)$/g, '').padEnd(46) +
          ' text: ' + (ns[0] || '?') + '-' + (ends[ends.length - 1] || '?') +
          (joined ? '  joined:' + joined : '') + (split ? '  split:' + split : '') +
          (gaps.length ? '  gaps: ' + gaps.join(' ') : ''));
        bad.forEach(b => console.log('        ' + b.note + '  ' + b.raw.slice(0, 74)));
      }
    }
  }
  console.log('\n' + clean + ' excerpts placed, ' + problems + ' with a line that could not be placed');
}

module.exports = { numbersFor, fold, play };
if (require.main === module) report(process.argv[2]);
