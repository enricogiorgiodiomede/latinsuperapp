/*
 * verify.js - the self-proofread gate. Every `latin` field in the bank must
 * appear VERBATIM in the Latin Library page it claims to come from.
 *
 *   node tools/verify.js                # check every work listed in sources.json
 *   node tools/verify.js 1.7.0 1.6.7    # only fragments tagged with these versions
 *
 * Needs the text cache: run `node tools/fetch_sources.js` first.
 *
 * Markers ([12], [XII], "12.") are stripped from both sides before comparing,
 * since the app normalises them. A fragment that was trimmed marks the cut with
 * "[...]": each piece must then be verbatim AND appear in source order.
 *
 * A fragment may also carry `emend`: [[sourceReading, appReading], ...], for the
 * rare case where the source has a plain error and the app prints the corrected
 * word. The source's own reading is put back before comparing, so every
 * character except the declared one is still proved verbatim, and an emendation
 * that no longer matches its fragment is reported as a failure.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { normalise } = require('./strip');

const REPO = path.join(__dirname, '..');
const CACHE = path.join(__dirname, '.cache');
const versions = process.argv.slice(2);

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources.json'), 'utf8'));
const SRC = {};
for (const [work, pages] of Object.entries(cfg)) {
  if (work.startsWith('_') || !Array.isArray(pages)) continue;
  SRC[work] = pages.map(p => p.split('/').pop() + '.txt');
}

const flat = {};
for (const files of Object.values(SRC)) {
  for (const f of files) {
    if (flat[f]) continue;
    const p = path.join(CACHE, f);
    if (fs.existsSync(p)) flat[f] = normalise(fs.readFileSync(p, 'utf8'));
  }
}
if (!Object.keys(flat).length) {
  console.error('No cached sources. Run: node tools/fetch_sources.js');
  process.exit(2);
}

global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

let ok = 0, bad = 0, skipped = 0;
for (const author of Object.values(AUTHORS)) {
  for (const w of author.works) {
    if (!SRC[w.id]) continue;                       // work not covered by sources.json
    for (const f of w.fragments) {
      if (versions.length && versions.indexOf(f.version) < 0) { skipped++; continue; }
      // Undo any declared emendation, so the fragment is compared against what
      // the source actually prints.
      let raw = f.latin, stale = null;
      for (const [sourceReading, appReading] of (f.emend || [])) {
        if (raw.indexOf(appReading) < 0) { stale = appReading; break; }
        raw = raw.split(appReading).join(sourceReading);
      }
      if (stale) {
        bad++;
        console.log('FAIL ' + f.citation + '  stale emendation: the fragment no longer contains "' + stale + '"');
        continue;
      }
      const clean = normalise(raw.split('\n').map(l => l.replace(/^>\s?/, '')).join(' '));
      const pieces = clean.split('[...]').map(s => s.trim()).filter(Boolean);
      const files = SRC[w.id].filter(x => flat[x]);
      const hit = files.some(x => {
        let from = 0;
        return pieces.every(p => {
          const at = flat[x].indexOf(p, from);
          if (at < 0) return false;
          from = at + p.length;
          return true;
        });
      });
      if (hit) {
        ok++;
        const notes = [];
        if (pieces.length > 1) notes.push(pieces.length + ' pieces, trimmed');
        if (f.emend) notes.push(f.emend.length + ' emended');
        console.log('OK   ' + f.citation + (notes.length ? '  (' + notes.join(', ') + ')' : ''));
        continue;
      }
      bad++;
      console.log('FAIL ' + f.citation);
      for (const x of files) {                       // show where it first diverges
        const at = flat[x].indexOf(clean.slice(0, 40));
        if (at < 0) continue;
        const src = flat[x].slice(at, at + clean.length + 80);
        let i = 0; while (i < clean.length && clean[i] === src[i]) i++;
        console.log('   diverges at char ' + i);
        console.log('   ours: ...' + clean.slice(Math.max(0, i - 40), i + 40));
        console.log('   src : ...' + src.slice(Math.max(0, i - 40), i + 40));
      }
    }
  }
}
console.log('\n' + ok + ' verbatim, ' + bad + ' mismatched' + (skipped ? ', ' + skipped + ' skipped' : ''));
process.exit(bad ? 1 : 0);
