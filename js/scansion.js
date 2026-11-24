/*
 * scansion.js - the metre engine behind the "Advanced settings" menu on verse
 * excerpts (window.Scansion; also require()-able from tools/, which is how
 * tools/build_scansion.js checks it against the scanned edition).
 *
 * The engine does the parts that follow from spelling alone: it splits a verse
 * into words and syllables (consonantal i and u, the digraphs, muta cum
 * liquida), finds the synaloephas and the syllables that are long by position
 * or by diphthong. What spelling cannot tell - which open syllables have a
 * long vowel - comes from js/scansion-data.js, one code per syllable for every
 * verse (L long, S short, E elided), built and cross-checked by
 * tools/build_scansion.js. From the codes it derives the feet, the caesurae,
 * and the two readings (accentual = ictus on the first long of each foot;
 * quantitative = long syllables written with a doubled vowel), both in the
 * ecclesiastical pronunciation (ae, oe read as one e).
 *
 * Plain ES5, no dependencies; every function is pure.
 */
(function (root) {
  'use strict';

  var VOWELS = 'aeiouy';
  var MUTE = { b: 1, c: 1, d: 1, g: 1, p: 1, t: 1, ch: 1, ph: 1, th: 1, f: 1 };
  var LIQUID = { l: 1, r: 1 };

  // Words whose initial i + vowel is a VOWEL (Greek names), not a consonant.
  var INITIAL_I_VOWEL = /^(iol|iul|iacch|ion|ia$)/;
  // Words where u after l/r before a vowel is a vowel (vo-lu-it), not v.
  var LU_VOWEL = /^(uol|vol|mal|nol|mer|col|al|val|dol|tim|hor)u(i|it|isti|imus|istis|erunt|ere|eram|erat|isse|isset|issem)$/;
  // ae / oe that are NOT diphthongs.
  var NOT_DIPH = /^(poe[mt]|coe[gio]|phaeth|danae|pasipha[eë]|aeri[aeou])/;
  // Words where eu / ui is one syllable.
  var EU_DIPH = /^(heu|eheu|ceu|neu|seu|orpheus|peleus|theseus|nereus|tereus|prometheus)$/;
  // Synizesis: two vowels read as one syllable in these words: [word, index of the first vowel].
  var SYNIZ = [[/^dein/, 1], [/^proin/, 2], [/^deer/, 1], [/^orphe[io]$/, 4], [/^reic/, 1], [/^scio$/, 2], [/^eod/, 0]];
  var UI_DIPH = /^(cui|huic)$/;
  // Monosyllabic prepositions never take a caesura after them (they lean on their noun).
  var PROCLITIC = { a: 1, ab: 1, ad: 1, de: 1, e: 1, ex: 1, in: 1, per: 1, pro: 1, sub: 1 };

  function isVowelChar(c) { return !!c && c.length === 1 && VOWELS.indexOf(c) >= 0; }

  // ---- 1. Letters -> units (vowel nuclei and consonant units) ------------------
  // A unit: { t: 'V'|'C'|'H', s: start, e: end (exclusive), w: positional weight }
  // 'H' is h, which takes no part in position. A consonantal i between vowels
  // ("maior", "cuius") weighs 2, like x and z.
  function units(lw) {
    var out = [];
    var n = lw.length;
    var i = 0;
    var consumed = {};
    function prevUnit() { return out.length ? out[out.length - 1] : null; }
    while (i < n) {
      var c = lw.charAt(i), nx = lw.charAt(i + 1), nx2 = lw.charAt(i + 2);
      if (isVowelChar(c)) {
        var syn = null;
        SYNIZ.forEach(function (p) { if (p[1] === i && p[0].test(lw)) syn = p; });
        if (syn) { out.push({ t: 'V', s: i, e: i + 2, diph: 'syn' }); i += 2; continue; }
        // Consonantal i / u?
        if (c === 'i' || c === 'u') {
          var pv = prevUnit();
          var prevIsV = pv && pv.t === 'V';
          var nextIsV = isVowelChar(nx);
          var cons = false;
          if (c === 'i') {
            if (i === 0 && nextIsV && !INITIAL_I_VOWEL.test(lw)) cons = true;
            else if (prevIsV && nextIsV) cons = true;
            else if (i > 0 && nextIsV && /^(con|in|ad|ab|ob|sub|dis)iu/.test(lw.slice(0, i + 2)) && lw.slice(0, i).length >= 2) cons = true;
          } else {
            if (nx === 'u') {
              // "uu": initial -> v+u; followed by a vowel -> u+v; else -> v+u after l/r or a vowel
              if (isVowelChar(nx2)) cons = prevIsV; // uuae = u-vae, nouus, fluuius // nouus: o-u(v)-u ; fluuius: l-u-u(v)-i
              else cons = i === 0 || prevIsV || (pv && /[lr]/.test(lw.charAt(i - 1))); // uultus, seruus
            } else if (i === 0 && nextIsV) cons = true;
            else if (prevIsV && nextIsV) cons = true;
            else if (nextIsV && /[lr]/.test(lw.charAt(i - 1)) && isVowelChar(lw.charAt(i - 2)) && !LU_VOWEL.test(lw)) cons = true; // sil-va, ar-va; not flu-ant, me-ru-it
            else if (nextIsV && /^(con|in|ad|sub|ob)$/.test(lw.slice(0, i))) cons = true; // con-vivia, ad-vena, in-vitus
          }
          if (cons) {
            var heavy = c === 'i' && prevIsV && i > 0;
            out.push({ t: 'C', s: i, e: i + 1, w: heavy ? 2 : 1, cons: c });
            i++;
            continue;
          }
        }
        // Diphthongs
        var two = c + nx;
        if ((two === 'ae' || two === 'oe') && !NOT_DIPH.test(lw)) { out.push({ t: 'V', s: i, e: i + 2, diph: two }); i += 2; continue; }
        if (two === 'au' && !isVowelChar(nx2)) { out.push({ t: 'V', s: i, e: i + 2, diph: two }); i += 2; continue; }
        if (two === 'eu' && EU_DIPH.test(lw)) { out.push({ t: 'V', s: i, e: i + 2, diph: two }); i += 2; continue; }
        if (two === 'ui' && UI_DIPH.test(lw)) { out.push({ t: 'V', s: i, e: i + 2, diph: two }); i += 2; continue; }
        out.push({ t: 'V', s: i, e: i + 1 });
        i++;
        continue;
      }
      // consonants
      if (c === 'h') { out.push({ t: 'H', s: i, e: i + 1, w: 0 }); i++; continue; }
      if (c === 'q' && nx === 'u') { out.push({ t: 'C', s: i, e: i + 2, w: 1, q: 'qu' }); i += 2; continue; }
      if (c === 'g' && nx === 'u' && lw.charAt(i - 1) === 'n' && isVowelChar(nx2)) { out.push({ t: 'C', s: i, e: i + 2, w: 1, q: 'gu' }); i += 2; continue; }
      if (c === 's' && nx === 'u' && /^su(av|ad|esc|et)/.test(lw.slice(i)) && (i === 0 || /^(in|con|man|per|as)$/.test(lw.slice(0, i)))) { out.push({ t: 'C', s: i, e: i + 1, w: 1 }); out.push({ t: 'C', s: i + 1, e: i + 2, w: 1, cons: 'u' }); i += 2; continue; }
      if ((c === 'c' || c === 'p' || c === 't' || c === 'r' || c === 'k') && nx === 'h') { out.push({ t: 'C', s: i, e: i + 2, w: 1, dg: c + 'h' }); i += 2; continue; }
      out.push({ t: 'C', s: i, e: i + 1, w: (c === 'x' || c === 'z') ? 2 : 1 });
      i++;
    }
    return out;
  }

  function unitKey(lw, u) { return u.dg || lw.slice(u.s, u.e); }
  function isMCL(lw, a, b) { return a && b && a.t === 'C' && b.t === 'C' && MUTE[unitKey(lw, a)] && LIQUID[unitKey(lw, b)]; }

  // ---- 2. A word -> syllables ---------------------------------------------------
  // Each syllable: { s, e, nuc: [s,e], diph, closedBy: weight of consonants after
  // the nucleus inside the word (for position), mcl: true if those are a muta cum
  // liquida pair, vBefore: nucleus directly followed by another nucleus }.
  function syllabify(word) {
    var lw = word.toLowerCase();
    var us = units(lw);
    var nucIdx = [];
    us.forEach(function (u, k) { if (u.t === 'V') nucIdx.push(k); });
    if (!nucIdx.length) return [{ s: 0, e: word.length, nuc: null }];
    var cuts = []; // start index (in letters) of syllables 2..n
    for (var k = 0; k < nucIdx.length - 1; k++) {
      var a = nucIdx[k], b = nucIdx[k + 1];
      var mid = us.slice(a + 1, b);
      var cons = mid.filter(function (u) { return u.t === 'C'; });
      var cut;
      if (!cons.length) {
        cut = us[a].e; // h (if any) goes to the next syllable
      } else if (cons.length === 1) {
        cut = cons[0].s;
        // an h before the consonant? keep it with the onset too
        if (mid[0].t === 'H') cut = mid[0].s;
        // x goes with the next syllable (di-xit) - same rule
      } else {
        var last = cons[cons.length - 1], prev = cons[cons.length - 2];
        cut = isMCL(lw, prev, last) ? prev.s : last.s;
      }
      cuts.push(cut);
    }
    var syl = [];
    var starts = [0].concat(cuts), ends = cuts.concat([word.length]);
    for (var j = 0; j < nucIdx.length; j++) {
      var nu = us[nucIdx[j]];
      var after = us.slice(nucIdx[j] + 1, j + 1 < nucIdx.length ? nucIdx[j + 1] : us.length);
      var cons2 = after.filter(function (u) { return u.t === 'C'; });
      var weight = 0;
      cons2.forEach(function (u) { weight += u.w; });
      var mcl = cons2.length === 2 && isMCL(lw, cons2[0], cons2[1]) && j + 1 < nucIdx.length;
      var vBefore = j + 1 < nucIdx.length && cons2.length === 0;
      syl.push({
        s: starts[j], e: ends[j], nuc: [nu.s, nu.e], diph: nu.diph || null,
        weight: weight, mcl: mcl, vBefore: vBefore,
        endsInVowel: j === nucIdx.length - 1 && cons2.length === 0,
        endsInM: j === nucIdx.length - 1 && cons2.length === 1 && lw.charAt(word.length - 1) === 'm' && after.every(function (u) { return u.t !== 'H'; }),
        // the first unit of the word, for elision by the previous word
        firstUnit: j === 0 ? us[0] : null
      });
    }
    // Consonantal u / i letters, so the readings can write v
    syl.consLetters = us.filter(function (u) { return u.cons; }).map(function (u) { return u.s; });
    syl.firstIsVowelLike = us[0].t === 'V' || (us[0].t === 'H' && us[1] && us[1].t === 'V');
    syl.firstConsWeight = (function () {
      var w = 0, list = [];
      for (var q = 0; q < us.length && us[q].t !== 'V'; q++) if (us[q].t === 'C') { w += us[q].w; list.push(us[q]); }
      return { w: w, mcl: list.length === 2 && isMCL(lw, list[0], list[1]) };
    })();
    return syl;
  }

  // ---- 3. A verse -> tokens, words, syllables -----------------------------------
  var WORD_RE = /[A-Za-zÀ-ÿ]+/g;
  function parseVerse(text) {
    var tokens = [];
    var last = 0, m;
    WORD_RE.lastIndex = 0;
    while ((m = WORD_RE.exec(text))) {
      if (m.index > last) tokens.push({ sep: text.slice(last, m.index) });
      tokens.push({ word: m[0] });
      last = m.index + m[0].length;
    }
    if (last < text.length) tokens.push({ sep: text.slice(last) });
    var words = [], sylls = [];
    tokens.forEach(function (t) {
      if (!t.word) return;
      var sy = syllabify(t.word);
      t.wi = words.length;
      t.sylls = sy;
      words.push(t);
      sy.forEach(function (s, k) {
        sylls.push({ wi: t.wi, k: k, last: k === sy.length - 1, text: t.word.slice(s.s, s.e), info: s });
      });
    });
    // Synaloepha: a word ending in a vowel or vowel + m before a word starting with
    // a vowel or h + vowel.
    words.forEach(function (w, i) {
      var nxt = words[i + 1];
      if (!nxt) return;
      var lastS = w.sylls[w.sylls.length - 1];
      if ((lastS.endsInVowel || lastS.endsInM) && nxt.sylls.firstIsVowelLike) w.elides = true;
    });
    // Position and diphthong, for the checker: 'L' certain long, 'S' probably
    // short (a vowel before a vowel), '?' unknown.
    var g = 0;
    words.forEach(function (w, i) {
      var nxt = words[i + 1];
      w.sylls.forEach(function (s, k) {
        var q = '?';
        var isLast = k === w.sylls.length - 1;
        if (s.diph) q = 'L';
        if (!isLast) {
          if (s.weight >= 2 && !s.mcl) q = 'L';
          else if (s.vBefore && !s.diph) q = 'S';
        } else if (nxt && !w.elides) {
          var fw = nxt.sylls.firstConsWeight;
          var tot = s.weight + fw.w;
          if (tot >= 2 && !(s.weight === 0 && fw.mcl)) q = 'L';
        } else if (!nxt) {
          q = 'X'; // final anceps
        }
        sylls[g].pos = q;
        sylls[g].elided = isLast && !!w.elides;
        g++;
      });
    });
    return { tokens: tokens, words: words, sylls: sylls };
  }

  // ---- 4. Codes -> feet and caesurae ----------------------------------------------
  // codes: one letter per syllable, L / S / E. Returns null if they do not make a
  // hexameter.
  function hexFeet(codes) {
    var live = [];
    for (var i = 0; i < codes.length; i++) if (codes.charAt(i) !== 'E') live.push(i);
    var feet = [];
    var p = 0;
    for (var f = 0; f < 6; f++) {
      if (p >= live.length) return null;
      var a = live[p];
      if (codes.charAt(a) !== 'L') return null;
      if (f === 5) {
        if (p + 2 !== live.length) return null;
        feet.push({ type: 'F', sylls: [a, live[p + 1]] });
        p += 2;
        break;
      }
      var b = live[p + 1], c = live[p + 2];
      if (codes.charAt(b) === 'S') {
        if (codes.charAt(c) !== 'S') return null;
        feet.push({ type: 'D', sylls: [a, b, c] });
        p += 3;
      } else {
        feet.push({ type: 'S', sylls: [a, b] });
        p += 2;
      }
    }
    return feet;
  }

  function caesurae(parsed, codes, feet) {
    if (!feet) return [];
    var sylls = parsed.sylls;
    // word end after syllable index g (a non-elided syllable that is the last of
    // its word), or at an elision (the elided syllable is the last of its word)
    function wordEndAfter(g) {
      var s = sylls[g];
      if (!s || !s.last) return false;
      if (codes.charAt(g) === 'E') return false; // a word end inside a synaloepha is not a caesura
      var w = parsed.words[s.wi];
      if (PROCLITIC[w.word.toLowerCase()]) return false;
      return true;
    }
    var out = [];
    function mark(g, kind, main) { out.push({ after: g, kind: kind, main: main }); }
    var long2 = feet[1].sylls[0], long3 = feet[2].sylls[0], long4 = feet[3].sylls[0];
    var penth = wordEndAfter(long3);
    var tri = wordEndAfter(long2);
    var hepth = wordEndAfter(long4);
    var troch = feet[2].type === 'D' && wordEndAfter(feet[2].sylls[1]);
    var buc = wordEndAfter(feet[3].sylls[feet[3].sylls.length - 1]);
    var main = penth ? 'penth' : troch ? 'troch' : hepth ? 'hepth' : null;
    if (penth) mark(long3, 'penth', main === 'penth');
    if (troch) mark(feet[2].sylls[1], 'troch', main === 'troch');
    if (tri) mark(long2, 'tri', false);
    if (hepth) mark(long4, 'hepth', main === 'hepth');
    if (buc) mark(feet[3].sylls[feet[3].sylls.length - 1], 'buc', false);
    return out;
  }

  // ---- 5. Readings -------------------------------------------------------------------
  // The text of one syllable for the readings: consonantal u written v, ae/oe as e.
  function readingParts(word, syl, consLetters) {
    var nuc = syl.nuc;
    function fix(str, offset) {
      var r = '';
      for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);
        if ((ch === 'u' || ch === 'U') && consLetters.indexOf(offset + i) >= 0) ch = ch === 'u' ? 'v' : 'V';
        r += ch;
      }
      return r;
    }
    var pre = fix(word.slice(syl.s, nuc ? nuc[0] : syl.e), syl.s);
    var v = nuc ? word.slice(nuc[0], nuc[1]) : '';
    if (syl.diph === 'ae' || syl.diph === 'oe') v = (v.charAt(0) === v.charAt(0).toUpperCase() && v.charAt(0) !== v.charAt(0).toLowerCase()) ? 'E' : 'e';
    var post = nuc ? fix(word.slice(nuc[1], syl.e), nuc[1]) : '';
    return { pre: pre, v: v, post: post, syn: syl.diph === 'syn' };
  }

  var ACUTE = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', y: 'ý', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', Y: 'Ý' };

  function stressText(p) {
    var v = p.v;
    // accent the first vowel of the nucleus
    var first = ACUTE[v.charAt(0).toLowerCase()] ? ACUTE[v.charAt(0).toLowerCase()] : v.charAt(0);
    return (p.pre + first + v.slice(1) + p.post).toUpperCase();
  }
  function longText(p) {
    var v = p.v;
    // synizesis: scio, eodem -> the second vowel carries the length (scioo, eoo-dem);
    // deinde, reice -> the first (deein-de); deerrare already reads long
    if (p.syn && v.length === 2) {
      if (v.charAt(0).toLowerCase() === v.charAt(1)) return p.pre + v + p.post;
      if (/^[ie][aou]$/i.test(v)) return p.pre + v + v.charAt(1) + p.post;
    }
    return p.pre + v.charAt(0) + v.charAt(0).toLowerCase() + v.slice(1) + p.post;
  }

  root.Scansion = {
    syllabify: syllabify,
    parseVerse: parseVerse,
    hexFeet: hexFeet,
    caesurae: caesurae,
    readingParts: readingParts,
    stressText: stressText,
    longText: longText
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.Scansion;
})(typeof window !== 'undefined' ? window : this);
