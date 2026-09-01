/*
 * mark_sections.js - insert the app's bold subsection markers `**n.**` into a
 * fragment's Latin, at the boundaries a numbered edition puts them.
 *
 *   node tools/mark_sections.js batch/marks.json          # preview
 *   node tools/mark_sections.js batch/marks.json --apply  # write js/fragments.js
 *
 * The spec is { "<citation>": { author, work, sections, english, italian } }.
 * `sections` is either the basename of a tools/.cache/sections/*.json produced
 * by fetch_sections.js - in which case the boundaries are derived from Perseus
 * automatically - or an explicit array of anchor strings, for the one work
 * Perseus does not carry.
 *
 * `english` and `italian` are arrays of anchors into the two translations, one
 * per section, in order, so the same numbers appear in all three texts and a
 * reader can line section 4 of the Latin up against section 4 of the English.
 * They have to be written by hand: only a person can say where a translation
 * turns the corner that the Latin turns. Their length must match the number of
 * sections being marked, and every anchor is located the same unforgiving way.
 *
 * Matching is on a normalised word stream (lowercase, u/v and i/j folded,
 * punctuation dropped), so an edition's spelling and pointing do not have to
 * agree with the Latin Library's - only the wording does. An anchor that is not
 * found, or found more than once, is a hard error: this tool never guesses.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const CACHE = path.join(__dirname, '.cache', 'sections');
const BANK = path.join(__dirname, '..', 'js', 'fragments.js');
const HEAD = '  var AUTHORS = ';
const TAIL = '\n\n  global.PracticeBank';

// One word as the matcher sees it. Anything that is not a letter goes, which
// takes care of pointing, daggers, brackets and the apostrophes Italian is full
// of. For Latin, u/j are folded onto v/i as well: the language was written
// without them and editions disagree about which to print.
function fold(word, latin) {
  const base = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '');
  return latin ? base.replace(/j/g, 'i').replace(/v/g, 'u') : base;
}

// Split text into words, remembering where each one starts.
function words(text, latin) {
  const out = [];
  const rx = /\S+/g;
  let m;
  while ((m = rx.exec(text))) {
    const f = fold(m[0], latin);
    if (f) out.push({ at: m.index, f });
  }
  return out;
}

function hitsFor(stream, needle) {
  const out = [];
  for (let i = 0; i + needle.length <= stream.length; i++) {
    let ok = true;
    for (let k = 0; k < needle.length; k++) if (stream[i + k].f !== needle[k]) { ok = false; break; }
    if (ok) out.push(stream[i].at);
  }
  return out;
}

// Find the single place where `anchor` begins in `stream`, using the SHORTEST
// prefix of it that occurs exactly once. Growing from three words matters: the
// numbered edition and the Latin Library are different editions, so a long
// anchor can straddle a textual variant and match nothing - BC I.7.4 opens
// `Pompeium, qui amissa restituisse videatur bona` in Perseus and `... videatur,
// dona` here. A short anchor is safe because a second match is an error, not a
// guess: this tool never picks between candidates.
function locate(stream, anchor, label, latin) {
  const needle = words(anchor, latin).map(w => w.f);
  if (!needle.length) throw new Error(label + ': empty anchor');
  let hits = [];
  for (let len = Math.min(3, needle.length); len <= needle.length; len++) {
    hits = hitsFor(stream, needle.slice(0, len));
    if (hits.length === 1) return hits[0];
    if (hits.length === 0) {
      throw new Error(label + ': the first ' + len + ' words of the anchor are not in the Latin Library text'
        + ' (a variant reading?) - ' + anchor.slice(0, 60));
    }
  }
  throw new Error(label + ': anchor is ambiguous, ' + hits.length + ' matches - ' + anchor.slice(0, 60));
}

function anchorsFor(spec, label) {
  let all;
  if (Array.isArray(spec.sections)) {
    all = spec.sections.map((a, i) => ({ n: String(i + 1), anchor: a }));
  } else {
    const file = path.join(CACHE, spec.sections);
    if (!fs.existsSync(file)) throw new Error(label + ': no section cache ' + spec.sections);
    // Six words is comfortably past any repetition inside a single chapter; the
    // matcher shortens the anchor by itself when an edition varies later on.
    all = JSON.parse(fs.readFileSync(file, 'utf8')).sections
      .map(s => ({ n: s.n, anchor: s.text.split(/\s+/).slice(0, 6).join(' ') }));
  }
  // An excerpt rarely runs to the end of a chapter, and the sections it stops
  // short of must be dropped explicitly - silently ignoring an anchor that does
  // not match would be exactly the guess this tool exists to refuse.
  if (!spec.range) return all;
  const [lo, hi] = String(spec.range).split('-').map(Number);
  const kept = all.filter(s => Number(s.n) >= lo && Number(s.n) <= (hi || lo));
  if (!kept.length) throw new Error(label + ': range ' + spec.range + ' selects no section');
  return kept;
}

function markUp(text, marks, label, isLatin) {
  const stream = words(text, isLatin);
  const points = marks.map(m => ({ n: m.n, at: locate(stream, m.anchor, label + ' §' + m.n, isLatin) }));
  for (let i = 1; i < points.length; i++) {
    if (points[i].at <= points[i - 1].at) {
      throw new Error(label + ': §' + points[i].n + ' lands at or before §' + points[i - 1].n);
    }
  }
  let out = text;
  for (let i = points.length - 1; i >= 0; i--) {
    out = out.slice(0, points[i].at) + '**' + points[i].n + '.** ' + out.slice(points[i].at);
  }
  return out;
}

function main() {
  const argv = process.argv.slice(2);
  const apply = argv.includes('--apply');
  const specFile = argv.filter(a => !a.startsWith('--'))[0];
  if (!specFile) { console.error('usage: node tools/mark_sections.js <spec.json> [--apply]'); process.exit(1); }
  const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));

  const src = fs.readFileSync(BANK, 'utf8').replace(/\r\n/g, '\n');
  const h = src.indexOf(HEAD) + HEAD.length;
  const t = src.indexOf(TAIL);
  const data = JSON.parse(src.slice(h, t).trim().replace(/;$/, ''));

  let changed = 0;
  for (const [citation, item] of Object.entries(spec)) {
    if (citation.startsWith('_')) continue;
    const work = (data[item.author].works || []).filter(w => w.id === item.work)[0];
    if (!work) throw new Error(citation + ': no work ' + item.work);
    const frag = work.fragments.filter(f => f.citation === citation)[0];
    if (!frag) throw new Error('no fragment ' + citation + ' in ' + item.work);
    const marks = anchorsFor(item, citation);
    console.log('\n=== ' + citation + '  (' + marks.length + ' sections)');

    // The Latin's boundaries come from the numbered edition; the translations'
    // are supplied by hand, one anchor per section, in the same order.
    const fields = [['latin', marks, true]];
    for (const [field, key] of [['english', 'english'], ['italian', 'italian']]) {
      if (!item[key]) continue;
      if (item[key].length !== marks.length) {
        throw new Error(citation + ': ' + key + ' has ' + item[key].length
          + ' anchors but ' + marks.length + ' sections are being marked');
      }
      fields.push([field, marks.map((m, i) => ({ n: m.n, anchor: item[key][i] })), false]);
    }

    let touched = false;
    for (const [field, list, isLatin] of fields) {
      if (/\*\*\d+\.\*\*/.test(frag[field])) { console.log('  SKIP ' + field + ' - already marked'); continue; }
      const marked = markUp(frag[field], list, citation + ' [' + field + ']', isLatin);
      console.log('  --' + field + '--');
      console.log('  ' + marked.replace(/(\*\*\d+\.\*\*)/g, '\n    $1').slice(0, 700));
      frag[field] = marked;
      touched = true;
    }
    if (touched) changed++;
  }

  if (!apply) { console.log('\n(preview only - pass --apply to write)'); return; }
  fs.writeFileSync(BANK, src.slice(0, h) + JSON.stringify(data, null, 2) + ';' + src.slice(t), 'utf8');
  console.log('\nmarked ' + changed + ' fragments');
}

main();
