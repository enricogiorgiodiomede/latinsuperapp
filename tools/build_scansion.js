#!/usr/bin/env node
/*
 * build_scansion.js - builds js/scansion-data.js for the verse excerpts that get
 * the "Advanced settings" menu (Virgil's Eclogues and, from v2.1.4, Georgics), and checks it.
 *
 *   node tools/build_scansion.js <dir with hypotactic eclogueN.html pages> [--write]
 *
 * The pages are not kept in the repo; fetch them into an empty folder first:
 *   for i in 1 2 3 4 5 6 7 8 9 10; do curl -s -o <dir>/eclogue$i.html \
 *     https://hypotactic.com/latin/eclogue$i.html; sleep 1; done
 * Rules learnt on the first run (v2.1.3 follow-up), all now in js/scansion.js:
 * uuae = u-vae but uultus = vul-tus; con-/in-/ad-/sub-/ob- + u + vowel = v;
 * u after l/r is v only after a vowel (sil-va, but flu-ant), except perfects in
 * -ui (me-ru-is-set); in-sue-tus; synizesis in deinde, Orphei, scio, eodem,
 * deerraverat, reice; Orpheus has eu; aeria is a-e-ri-a. Hiatus and the short
 * "o Alexi" are taken from the scanned text (codes without E).
 *
 * How the codes are made. js/scansion.js splits each verse of the bank's Latin
 * into syllables, marks the synaloephas and the syllables long by position or
 * diphthong. The vowel lengths spelling cannot show are taken from the scanned
 * text of the Eclogues at hypotactic.com (one page per eclogue, saved locally),
 * matched to our verse by its letters. A verse is accepted only if
 *   - both split it into the same number of syllables, word by word;
 *   - every syllable the engine knows is long (position, diphthong) is long there;
 *   - the codes make a hexameter (js/scansion.js hexFeet).
 * Anything else is printed and must be settled in OVERRIDES below, by hand, with
 * the reason - never silently.
 *
 * Output: window.ScansionData = { slug: { workId: { verse: codes } } }, where
 * codes has one letter per syllable of the bank's own text: L long, S short,
 * E elided.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..');
const Scansion = require(path.join(REPO, 'js/scansion.js'));

const HYP_DIR = process.argv[2];
const WRITE = process.argv.includes('--write');
if (!HYP_DIR) throw new Error('usage: build_scansion.js <hypotactic dir> [--write]');

// Hand-settled verses: workId -> verse -> codes (one per syllable of OUR text),
// each with the reason. Filled from the mismatches the run reports.
const OVERRIDES = {
  'georgica-i': {
    // hiatus: Atho aut, the long o of the Greek accusative shortened before a vowel
    // (correptio), not elided; hypotactic marks it short without a hiatus flag.
    332: { codes: 'LSSLSSLLLSSLSSLL' }
  },
  'georgica-iv': {
    // hypotactic's text of Book IV leaves out v. 563, the poet's signature line;
    // scanned by hand: Il-lo | Ver-gi-li | um me | tem-po-re | dul-cis a | le-bat.
    563: { codes: 'LLLSSLLLSSLSSLL' }
  }
};

global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const V = window.PracticeBank.authors['publius-vergilius-maro'];

function norm(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/j/g, 'i').replace(/v/g, 'u').replace(/[^a-z]/g, '');
}

function readHyp(page) {
  const html = fs.readFileSync(path.join(HYP_DIR, page + '.html'), 'utf8');
  const parts = html.split('<div class="line">').slice(1);
  return parts.map(p => {
    p = p.split('</div>')[0];
    const words = [];
    p.replace(/<span class="word[^"]*">([\s\S]*?)<\/span><\/span>/g, (m) => {
      const sy = [];
      m.replace(/<span class="syll ([^"]*)">([^<]*)<\/span>/g, (_, cls, txt) => { sy.push({ cls, txt }); });
      if (sy.length) words.push(sy);
    });
    const flat = [].concat(...words);
    return { words, flat, text: norm(flat.map(s => s.txt).join('')) };
  });
}

// share of letter bigrams in common (0-1), to match a verse spelt differently
function similarity(a, b) {
  const bg = s => { const m = {}; for (let i = 0; i < s.length - 1; i++) { const k = s.slice(i, i + 2); m[k] = (m[k] || 0) + 1; } return m; };
  const A = bg(a), B = bg(b); let common = 0, tot = 0;
  for (const k in A) { common += Math.min(A[k], B[k] || 0); tot += A[k]; }
  for (const k in B) tot += B[k];
  return tot ? 2 * common / tot : 0;
}

function code(cls) {
  if (/elided/.test(cls)) return 'E';
  if (/long/.test(cls)) return 'L';
  if (/short/.test(cls)) return 'S';
  return '?';
}

// Which hypotactic page scans each work (v2.1.4: the Georgics join the Eclogues).
const ROMAN = { i: 1, ii: 2, iii: 3, iv: 4 };
function hypPage(id) {
  let m = /^bucolica-(\d+)$/.exec(id);
  if (m) return 'eclogue' + m[1];
  m = /^georgica-(i|ii|iii|iv)$/.exec(id);
  if (m) return 'geo' + ROMAN[m[1]];
  return null;
}

const out = {};
let ok = 0, bad = 0, total = 0;
const problems = [];

for (const work of V.works) {
  const page = hypPage(work.id);
  if (!page || !work.fragments.length) continue;
  const hyp = readHyp(page);
  out[work.id] = out[work.id] || {};
  for (const f of work.fragments) {
    const cm = /vv\. (\d+)-(\d+)/.exec(f.citation);
    const from = +cm[1];
    f.latin.split('\n').forEach((raw, i) => {
      total++;
      const verse = from + i;
      const text = raw.replace(/^>\s*/, '').replace(/^\*\*\d+\.\*\*\s*/, '').replace(/^[A-Z]{2}\.\s+/, '');
      const parsed = Scansion.parseVerse(text);
      const ours = parsed.sylls;
      const key = work.id + ' ' + verse;
      if (OVERRIDES[work.id] && OVERRIDES[work.id][verse]) {
        const c = OVERRIDES[work.id][verse].codes;
        if (c.length !== ours.length || !Scansion.hexFeet(c)) { bad++; problems.push(key + ': OVERRIDE does not fit (' + c.length + ' codes, ' + ours.length + ' syllables)'); return; }
        out[work.id][verse] = c; ok++; return;
      }
      // find the hypotactic verse: same number first, then nearby
      const want = norm(text);
      let h = hyp[verse - 1];
      let note = '';
      if (!h || h.text !== want) {
        // the same letters nearby, else the nearby verse most like ours (spelling variants)
        let near = hyp.findIndex((x, k) => Math.abs(k - (verse - 1)) <= 4 && x.text === want);
        if (near < 0) {
          let best = -1, bestScore = 0;
          hyp.forEach((x, k) => { if (Math.abs(k - (verse - 1)) <= 4) { const sc = similarity(x.text, want); if (sc > bestScore) { bestScore = sc; best = k; } } });
          if (bestScore >= 0.8) near = best;
        }
        if (near >= 0) h = hyp[near];
        else note = ' [TEXT DIFFERS: ' + (h ? h.flat.map(s => s.txt).join('') : '-') + ']';
      }
      if (!h) { bad++; problems.push(key + ': no scanned verse'); return; }
      // word-by-word syllable counts
      const ourCounts = parsed.words.map(w => w.sylls.length);
      const hypCounts = h.words.map(w => w.length);
      if (ourCounts.join() !== hypCounts.join()) {
        bad++;
        problems.push(key + ': syllables differ' + note + '\n    ours ' + parsed.words.map(w => w.sylls.map(s => w.word.slice(s.s, s.e)).join('-')).join(' ') +
          '\n    hyp  ' + h.words.map(w => w.map(s => s.txt + '(' + code(s.cls) + ')').join('-')).join(' '));
        return;
      }
      const codes = h.flat.map(s => code(s.cls)).join('');
      // the engine's certainties must agree
      const clash = [];
      ours.forEach((s, k) => {
        const c = codes.charAt(k);
        const hcls = h.flat[k].cls;
        if (s.elided && c !== 'E' && !/hiatus/.test(hcls)) clash.push(s.text + ': engine elides, scan has ' + c);
        if (!s.elided && c === 'E') clash.push(s.text + ': scan elides, engine does not');
        // a long vowel or diphthong left unelided before a vowel may be shortened (semihiatus, correptio)
        if (s.pos === 'L' && c === 'S' && !/hiatus/.test(hcls)) clash.push(s.text + ': long by position/diphthong, scan short');
      });
      const feet = Scansion.hexFeet(codes);
      if (!feet) clash.push('codes ' + codes + ' are not a hexameter');
      const flags = h.flat.filter(s => /hiatus|synizesis|diastole|semihiatus/.test(s.cls)).map(s => s.txt + ' ' + s.cls.replace(/syll |long |short /g, ''));
      if (clash.length) {
        bad++;
        problems.push(key + ': ' + clash.join('; ') + note + (flags.length ? ' {' + flags.join(', ') + '}' : '') + '\n    codes ' + codes + '  ' + ours.map(s => s.text).join('.'));
        return;
      }
      if (note) problems.push(key + ': accepted, but' + note);
      out[work.id][verse] = codes;
      ok++;
    });
  }
}

console.log(problems.join('\n'));
console.log('\n' + total + ' verses: ' + ok + ' scanned, ' + bad + ' to settle');

if (WRITE) {
  if (bad) { console.error('Not written: settle the verses above first.'); process.exit(1); }
  const header = '/*\n * scansion-data.js - GENERATED by tools/build_scansion.js; do not edit by hand.\n' +
    ' * One code per syllable of the bank\'s own text of each verse (L long, S short,\n' +
    ' * E elided), read by js/scansion.js. Quantities cross-checked against the\n' +
    ' * scanned Eclogues and Georgics at hypotactic.com; hand-settled verses are listed in the tool.\n */\n';
  const body = '(function (global) {\n  \'use strict\';\n  global.ScansionData = ' +
    JSON.stringify({ 'publius-vergilius-maro': out }, null, 1).replace(/\n/g, '\n  ') + ';\n})(window);\n';
  fs.writeFileSync(path.join(REPO, 'js/scansion-data.js'), header + body);
  console.log('wrote js/scansion-data.js');
}
