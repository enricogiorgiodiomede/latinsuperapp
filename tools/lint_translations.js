/*
 * lint_translations.js - catch a translation that covers MORE or LESS Latin
 * than its fragment actually contains.
 *
 *   node tools/lint_translations.js            # check the whole bank
 *   node tools/lint_translations.js 1.9.0      # only fragments tagged 1.9.0
 *
 * Why this exists. `verify.js` proves the Latin is genuine and the accuracy
 * pass checks that the translation says what the Latin says - but neither
 * notices when the translation renders a sentence the excerpt does not
 * include. That happened twice in v1.9.0: De Officiis III.99 was translated
 * with an opening sentence the extraction had left out, and Somnium VI.18-19
 * with a closing one. The user caught both by reading.
 *
 * The check is crude on purpose: a translation is roughly a fixed multiple of
 * its Latin in length, so a fragment carrying an extra sentence in one language
 * shows up as an outlier. Across the bank the English/Latin ratio has a median
 * near 1.21 and sits inside 1.07-1.36 for ninety per cent of fragments; the two
 * faulty ones were at 1.43 and 1.50.
 *
 * SHORT fragments are skipped. A four-word line of Ennius can legitimately need
 * three times its length in English, and those are all false positives.
 *
 * A flag is a prompt to LOOK, not a failure: read the fragment and check that
 * every sentence of the Latin appears in both translations and nothing else
 * does. Exit code is always 0.
 *
 * Known-good outliers, checked by hand - do not re-litigate. De Agri Cultura
 * cap. 5, Pro Milone 57 and Philippica I.26 all sit near 1.50 because their
 * Latin is exceptionally terse: a list of jussive subjunctives, a run of
 * clipped questions and `ne` clauses, legal formulae plus imperatives. Latin
 * that compressed genuinely needs half as much again in English, and all three
 * end exactly where their Latin ends.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const MIN_LATIN = 250;   // below this the ratio is too noisy to mean anything
const BAND = { en: [0.95, 1.42], it: [0.95, 1.45] };

const versions = process.argv.slice(2);
const REPO = path.join(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

// Strip blockquote marks, section markers and the cut mark, so we compare the
// words alone.
// Also drop a LEADING ITALIC SOURCE NOTE: the handful of fragments with no
// Latin Library page (some Pomponius, Naevius and Ennius) carry their
// provenance as an italic English sentence inside the `latin` field, and
// counting that as Latin made all four of them look like under-translations.
const plain = (s) => String(s || '')
  .replace(/^>\s?/gm, '').replace(/\n>\n/g, ' ')
  .replace(/^\s*\*[^*]*\*\s*/, '')
  .replace(/\[\d+\]|\[\.\.\.\]/g, '')
  .replace(/\s+/g, ' ').trim();

let checked = 0, flagged = 0, skipped = 0;
for (const author of Object.values(AUTHORS)) {
  for (const w of author.works) {
    for (const f of w.fragments) {
      if (versions.length && versions.indexOf(f.version) < 0) continue;
      const L = plain(f.latin).length;
      if (L < MIN_LATIN) { skipped++; continue; }
      checked++;
      const notes = [];
      for (const lang of ['en', 'it']) {
        const text = plain(lang === 'en' ? f.english : f.italian);
        const r = text.length / L;
        const [lo, hi] = BAND[lang];
        if (r < lo) notes.push(lang.toUpperCase() + ' ' + r.toFixed(2) + ' (short - does the translation cover the whole excerpt?)');
        if (r > hi) notes.push(lang.toUpperCase() + ' ' + r.toFixed(2) + ' (long - does it render Latin the excerpt does not contain?)');
      }
      if (notes.length) {
        flagged++;
        console.log('LOOK ' + f.citation + '  [' + f.version + ']  ' + notes.join('; '));
      }
    }
  }
}
console.log('\n' + checked + ' checked, ' + flagged + ' to look at, ' + skipped + ' too short to judge (< ' + MIN_LATIN + ' chars of Latin)');
