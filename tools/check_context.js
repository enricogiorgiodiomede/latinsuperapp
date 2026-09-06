/*
 * check_context.js - catch an excerpt that assumes knowledge it never supplies.
 *
 *   node tools/check_context.js            # every fragment in the bank
 *   node tools/check_context.js 1.12.0     # only fragments tagged 1.12.0
 *
 * Why this exists. Every excerpt in this app is opened COLD. The reader has not
 * read the chapter before it, does not know who the people are, and cannot look
 * anything up without leaving the page. The description and the analysis are the
 * only orientation there is, and when they assume a fact the reader has not got,
 * the excerpt stops working - not because the Latin is hard but because nobody
 * said where we are. The user found this across most of v1.12.0 by reading:
 * Corfinium with no explanation of why Caesar was besieging it, a chapter that
 * turns on Domitius raising armies without saying who he was, two analyses that
 * hang an argument on a chapter which is not in the app, and a whole batch that
 * assumes the reader knows what happened in Gaul in 50 BC.
 *
 * Three passes, none of which can decide anything on its own:
 *
 *   1. DANGLING CROSS-REFERENCES. An analysis that argues from `I.75` when
 *      `I.75` is not an excerpt in the bank has sent the reader somewhere they
 *      cannot go. Ranges count as covering their span (`II.27-28` answers a
 *      reference to `II.28`) and an explicit work name overrides the fragment's
 *      own work. A dangling reference is fine ONLY when the sentence around it
 *      says what is there; the tool cannot read, so it reports and you judge.
 *
 *   2. UNGLOSSED NAMES. A proper name that appears in the Latin and NOWHERE in
 *      the fragment's own description or analysis, in either language, has been
 *      left for the reader to recognise. Sometimes that is fine (a place named
 *      once in a list). Sometimes it is Saturninus and the Gracchi carrying the
 *      whole argument of a speech.
 *
 *   3. NO DATE ANYWHERE. For a historical author, an excerpt whose commentary
 *      never says when it happens is a cold open by definition. Poetry and
 *      philosophy are exempt - `DATED_AUTHORS` lists who this applies to.
 *
 * Every pass reports candidates for a human to judge, CLEARED holds the ones
 * already judged, and the exit code is always 0.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

const argv = process.argv.slice(2);
const harvest = argv.indexOf('--sigs') !== -1;
const only = argv.filter(function (a) { return a.charAt(0) !== '-'; })[0] || null;

// Authors whose excerpts narrate a datable event, where an excerpt that never
// says WHEN is a cold open by definition. A Plautus scene does not need a year
// and neither does a page of Cicero on friendship; a chapter of the civil war
// does. Cicero was in this list and came out: two thirds of the date flags in
// the whole bank were his philosophical works, where the year is beside the
// point, and his speeches carry their date in the description already.
const DATED_AUTHORS = {
  'gaius-julius-caesar': 1, 'aulus-hirtius': 1, 'cornelius-nepos': 1
};

// Names the reader is not owed a gloss for: they are either the author, the
// subject of the whole app, or so common in Latin prose that glossing them
// everywhere would be noise.
const COMMON = new Set(('caesar caesaris caesarem caesari roma romae romam romanus romani romanorum romanos '
  + 'romanum romana romanae italia italiae italiam gallia galliae galliam gallis galli gallorum gallos '
  + 'germani germanorum germanis hispania hispaniae hispaniam deus dei di iuppiter senatus populus populi '
  + 'quirites kalendas idus nonas ianuarias').split(/\s+/));

const ROMAN = /^[IVXLCDM]+$/;

function romanOk(w) { return ROMAN.test(w); }

// Strip the chapter marker and the subsection numbers; what is left is Latin.
function bareLatin(f) {
  return String(f.latin || '').replace(/\*\*\d+\.\*\*/g, ' ').replace(/^>?\s*\[[^\]]*\]/, ' ');
}

// WHICH CAPITALISED WORDS ARE NAMES? Latin capitalises the first word of every
// sentence, so `Itaque`, `Milites` and `Edicunt` look exactly like `Domitius`
// at the start of a period. Rather than guess from the shape of the word, let
// the bank answer: a word is a name if it appears capitalised somewhere in the
// bank's Latin in a position that is NOT sentence-initial. `Pompeius` does,
// hundreds of times; `Itaque` never does. Built once over the whole bank.
// The second half of the rule does the heavy lifting: a name NEVER appears in
// lower case. `Quae`, `Itaque`, `Deinde`, `Cuius` and `Milites` all turn up
// capitalised mid-sentence often enough to pass the first test, and all of them
// appear thousands of times in lower case, which no proper name does. The two
// tests together leave personal and place names and almost nothing else.
function nameVocabulary() {
  const capped = new Set(), lower = new Set();
  for (const slug of Object.keys(AUTHORS)) {
    for (const work of AUTHORS[slug].works) {
      for (const f of work.fragments || []) {
        const t = bareLatin(f);
        const re = /([^\s])\s+([A-Za-z][a-zA-Z]{3,})\b/g;
        let m;
        while ((m = re.exec(t))) {
          const w = m[2];
          if (romanOk(w)) continue;
          if (w[0] === w[0].toLowerCase()) { lower.add(w.toLowerCase()); continue; }
          if (/[.?!:;]/.test(m[1])) continue;      // sentence-initial, proves nothing
          capped.add(w.toLowerCase());
        }
      }
    }
  }
  const names = new Set();
  for (const w of capped) if (!lower.has(w)) names.add(w);
  return names;
}

// Every chapter the bank actually holds, as `Work N.M`, with ranges expanded.
function ownedChapters() {
  const own = new Set();
  for (const slug of Object.keys(AUTHORS)) {
    for (const work of AUTHORS[slug].works) {
      for (const f of work.fragments || []) {
        const m = f.citation.match(/^\(([^)]*?)\s+([IVXLCDM]+)\.(\d+)(?:-(\d+))?/);
        if (!m) continue;
        const from = parseInt(m[3], 10), to = m[4] ? parseInt(m[4], 10) : from;
        for (let n = from; n <= to; n++) own.add(m[1] + ' ' + m[2] + '.' + n);
      }
    }
  }
  return own;
}

function workOf(citation) {
  const m = citation.match(/^\(([^)]*?)\s+[IVXLCDM]+\./);
  return m ? m[1] : null;
}

const OWN = ownedChapters();
const VOCAB = nameVocabulary();

// Read and judged. Key is `citation | kind | detail`. A dangling reference
// belongs here once the sentence around it has been made to carry its own
// summary, so that the reader who cannot open that chapter is not left short.
const CLEARED = {
  '(De Bello Civili I.28) | ref | De Bello Civili I.15': 1,   // summarised in the "Where we are"
  '(De Bello Civili I.28) | ref | De Bello Civili I.27': 1,   // Pompey's barricades, given in full
  '(De Bello Civili I.76) | ref | De Bello Civili I.75': 1,   // Petreius' first strike, given in full
  // II.28's closing note deliberately walks the reader through the three
  // chapters in which Curio answers Quintilius, and summarises each. **If
  // II.31, II.32 or II.33 is ever added as an excerpt, shrink or delete that
  // note and remove the matching line here** - the user's instruction.
  '(De Bello Civili II.28) | ref | De Bello Civili II.31': 1,
  '(De Bello Civili II.28) | ref | De Bello Civili II.32': 1,
  '(De Bello Civili II.28) | ref | De Bello Civili II.33': 1
};

let checked = 0, flagged = 0, cleared = 0;
const notes = [], sigs = [];

for (const slug of Object.keys(AUTHORS)) {
  for (const work of AUTHORS[slug].works) {
    for (const f of work.fragments || []) {
      if (only && f.version !== only) continue;
      checked++;
      const prose = [f.description, f.descriptionIt, f.analysis, f.analysisIt].join('\n');
      const bad = [];

      // ---- 1. dangling cross-references
      const mine = workOf(f.citation);
      const seen = new Set();
      // A work named just before the numeral wins over the fragment's own. The
      // list has to include the works actually cited across the bank, or a
      // cross-reference to `Ad Atticum VII.11` is read as chapter VII.11 of
      // whatever work the fragment belongs to and reported as dangling.
      const re = /(?:[`*]?(De Bello Gallico|De Bello Civili|Bellum Alexandrinum|Ad Atticum|Ad Familiares|Ad Quintum Fratrem|Ad Brutum|De Divinatione|De Officiis|De Re Publica|Tusculanae|Agricola)[`*]?[, ]\s*)?\b([IVXLCDM]{1,5})\.(\d+)\b/g;
      let m;
      while ((m = re.exec(prose))) {
        if (!romanOk(m[2])) continue;
        const w = m[1] || mine;
        if (!w) continue;
        const key = w + ' ' + m[2] + '.' + m[3];
        if (OWN.has(key) || seen.has(key)) continue;
        seen.add(key);
        // A reference to another AUTHOR's work is a citation, not a pointer
        // into this app, and is only reported when that work is in the bank.
        const ck = f.citation + ' | ref | ' + key;
        if (CLEARED[ck]) { cleared++; continue; }
        bad.push('  points at ' + key + ', which is not an excerpt in the bank');
        sigs.push(ck);
      }

      // ---- 2. names in the Latin that the commentary never mentions
      const latin = bareLatin(f);
      const names = new Set();
      for (const w of latin.match(/\b[A-Z][a-zA-Z]{3,}\b/g) || []) {
        const low = w.toLowerCase();
        if (COMMON.has(low) || romanOk(w) || !VOCAB.has(low)) continue;
        names.add(w);
      }
      const proseLow = prose.toLowerCase();
      for (const n of names) {
        // Compare on a five-letter prefix. Latin declines and the commentary
        // uses the English or Italian form, so neither the ending nor the whole
        // word will match: `Pompeius` has to answer to `Pompey` and `Pompeo`,
        // `Brundisini` to `Brundisium`, `Gracchorum` to `the Gracchi`.
        // Five letters is right for most names and one too many for short
        // ones: `Asiae` would not answer to `Asia`. Never take the whole word,
        // or the case ending is back in the comparison.
        const stem = n.toLowerCase().slice(0, Math.max(4, Math.min(5, n.length - 1)));
        if (proseLow.indexOf(stem) !== -1) continue;
        const ck = f.citation + ' | name | ' + n;
        if (CLEARED[ck]) { cleared++; continue; }
        bad.push('  the Latin names ' + n + ', which the commentary never mentions');
        sigs.push(ck);
      }

      // ---- 3. no date anywhere, for authors who narrate datable events
      if (DATED_AUTHORS[slug] && !/\b\d{1,4}\s*(?:BC|AD|a\.C\.|d\.C\.)/.test(prose)) {
        const ck = f.citation + ' | date | -';
        if (CLEARED[ck]) cleared++;
        else { bad.push('  neither description nor analysis gives a year'); sigs.push(ck); }
      }

      if (bad.length) {
        flagged++;
        notes.push(f.citation + '  [' + slug + '/' + work.id + ']\n' + bad.join('\n'));
      }
    }
  }
}

if (harvest) {
  sigs.forEach(function (k) { console.log('  ' + JSON.stringify(k) + ': 1,'); });
  process.exit(0);
}
if (notes.length) console.log(notes.join('\n\n') + '\n');
console.log(checked + ' fragment' + (checked === 1 ? '' : 's') + ' checked for context, '
  + flagged + ' to look at' + (cleared ? ', ' + cleared + ' cleared' : '') + '.');
if (!only && flagged > 40) {
  console.log('\nThat is the whole bank, most of which was written before this check existed.\n'
    + 'Pass a version to scope it to one release: node tools/check_context.js 1.12.0');
}
