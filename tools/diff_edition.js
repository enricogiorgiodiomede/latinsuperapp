/*
 * diff_edition.js - compare a chapter of a cached Latin Library page, word by
 * word, with the numbered edition cached by fetch_sections.js.
 *
 *   node tools/diff_edition.js sall.1 5 phi0631.phi001.5.json
 *   node tools/diff_edition.js sall.2 85 phi0631.phi002.85.json 10-17
 *
 * WHY THIS EXISTS. verify.js proves the app matches the source, not that the
 * source is right, and a pattern scan for misprints missed three in v1.13.3.
 * What finds them is reading the page against a second edition: every word the
 * two disagree on is either a spelling convention, a variant reading or a typo,
 * and only a person can say which. This prints the disagreements; it decides
 * nothing and copies nothing into the app.
 *
 * Words are folded before comparing (lowercase, u/v and i/j merged, pointing
 * dropped) and aligned by longest common subsequence, so a dropped or added
 * word does not throw the rest out of step. The optional range limits the
 * report to those sections of the edition.
 *
 * On a page that prints its own subsection numbers as bare digits (Sallust's
 * Catilina) it also checks that the page and the edition put every section
 * boundary before the same word. A disagreement there is reported, never
 * resolved by hand.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { barePages } = require('./strip');

const [page, chapter, cacheFile, range] = process.argv.slice(2);
if (!page || !chapter || !cacheFile) {
  console.error('usage: node tools/diff_edition.js <cached page> <chapter> <sections cache.json> [from-to]');
  process.exit(1);
}

const fold = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/[^a-z]/g, '').replace(/j/g, 'i').replace(/v/g, 'u');

// The chapter as the page prints it: from its [n] to the next bracketed number.
const text = fs.readFileSync(path.join(__dirname, '.cache', page + '.txt'), 'utf8').replace(/\s+/g, ' ');
const start = text.indexOf('[' + chapter + ']');
if (start < 0) throw new Error('no [' + chapter + '] on ' + page);
const next = text.slice(start + 1).search(/\[\d+\]/);
const body = text.slice(start + chapter.length + 2, next < 0 ? text.length : start + 1 + next);

// Page words, each remembering the bare section digit printed just before it.
const isBare = barePages().has(page + '.txt');
const ours = [];
let pending = null;
for (const tok of body.replace(/(?<![\[\d])(\d+)(?![\]\d])/g, ' $1 ').split(/\s+/)) {
  if (isBare && /^\d+$/.test(tok)) { pending = tok; continue; }
  const f = fold(tok);
  if (!f) continue;
  ours.push({ w: tok, f, sec: pending });
  pending = null;
}

const [lo, hi] = range ? range.split('-').map(Number) : [0, Infinity];
const theirs = [];
for (const s of JSON.parse(fs.readFileSync(path.join(__dirname, '.cache', 'sections', cacheFile), 'utf8')).sections) {
  let first = true;
  for (const tok of s.text.split(/\s+/)) {
    const f = fold(tok);
    if (!f) continue;
    theirs.push({ w: tok, f, sec: first ? s.n : null, n: Number(s.n) });
    first = false;
  }
}

// Longest common subsequence over the folded words.
const n = ours.length, m = theirs.length;
const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
for (let i = n - 1; i >= 0; i--) {
  for (let j = m - 1; j >= 0; j--) {
    L[i][j] = ours[i].f === theirs[j].f ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  }
}

let i = 0, j = 0, diffs = 0, bounds = 0, lastSec = 0;
const inRange = () => lastSec >= lo && lastSec <= hi;
const flush = (a, b, at) => {
  if (!a.length && !b.length) return;
  if (!inRange()) return;
  diffs++;
  const ctx = ours.slice(Math.max(0, at - 3), at).map(x => x.w).join(' ');
  console.log('  §' + lastSec + '  ...' + ctx + '  PAGE [' + a.join(' ') + ']  EDITION [' + b.join(' ') + ']');
};
let a = [], b = [], at = 0;
while (i < n || j < m) {
  if (i < n && j < m && ours[i].f === theirs[j].f) {
    flush(a, b, at); a = []; b = [];
    if (theirs[j].sec) lastSec = theirs[j].n;
    if (isBare && inRange() && ours[i].sec !== theirs[j].sec) {
      bounds++;
      console.log('  BOUNDARY before "' + ours[i].w + '": page ' + (ours[i].sec || 'none') + ', edition ' + (theirs[j].sec || 'none'));
    }
    i++; j++; at = i;
  } else if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) {
    if (theirs[j].sec) lastSec = theirs[j].n;
    b.push(theirs[j].w + (theirs[j].sec ? ' {§' + theirs[j].sec + '}' : '')); j++;
  } else {
    a.push(ours[i].w + (ours[i].sec ? ' {§' + ours[i].sec + '}' : '')); i++;
  }
}
flush(a, b, at);
console.log(page + ' [' + chapter + ']' + (range ? ' §' + range : '') + ': ' + diffs + ' wording differences'
  + (isBare ? ', ' + bounds + ' boundary disagreements' : '') + ' (' + n + ' page words, ' + m + ' edition words)');
