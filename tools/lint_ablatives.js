/*
 * lint_ablatives.js - catch the translation of an ablative absolute that is
 * left grammatically unattached to the sentence around it.
 *
 *   node tools/lint_ablatives.js            # every fragment in the bank
 *   node tools/lint_ablatives.js 1.13.1     # only fragments tagged 1.13.1
 *   node tools/lint_ablatives.js --sigs     # harvest signatures for CLEARED
 *
 * Why this exists. The user's instruction, v1.13.1: an ablative absolute must
 * be rendered so that it HANGS OFF the main clause, not so that it sits beside
 * it. Latin needs no connective, because the ablative case is the connective;
 * English and Italian have no case to do that work, so the relation has to be
 * spelled with a word. Two of the nine excerpts in that batch shipped without
 * one:
 *
 *   VIII.43.3  fine proeli facto  ->  "So our men, the battle over, quickly..."
 *   VIII.49.3  condicione parendi meliore
 *                                 ->  "..., the terms of obedience now being
 *                                     better."
 *
 * Neither is ungrammatical, exactly; both read as if a phrase had been set
 * down next to the sentence rather than joined to it. The fix in both cases
 * was one word - "with the battle over", "with the terms of obedience now
 * being better" - and the point of this file is that the one word is never
 * again left out by accident.
 *
 * What is actually tested. The Latin is NOT parsed: finding an ablative
 * absolute reliably would mean tagging every ablative in the bank, and the
 * fault is visible on the translation side anyway. Each rule looks for a
 * bare absolute phrase sitting at a clause boundary - the start of the field,
 * or just after `.` `;` `:` `,` or a dash - because a boundary is exactly
 * where a linking word would have gone. A phrase already introduced by
 * `with`, `since`, `after`, `once`, `now that`, `because`, `dato che`,
 * `dopo che`, `poiché` and the rest never reaches the boundary test, so a
 * corrected passage goes quiet on its own.
 *
 *   ENGLISH 1. `the <noun phrase> over,` / `finished,` / `done,` / `dead,` -
 *              a verbless absolute. This is the VIII.43 shape.
 *   ENGLISH 2. `the <noun phrase> being <X>` / `having been <X>` - the
 *              participial absolute. This is the VIII.49 shape.
 *   ITALIAN 1. `il/la <noun phrase> essendo ...` - noun before gerund, which
 *              is the word order of the English calque and not of Italian.
 *   ITALIAN 2. `il/la <noun phrase> finito/conclusa/...,` - noun before
 *              participle, same calque.
 *
 * The Italian rules are deliberately narrower than the English ones, and this
 * is the important asymmetry: **the bare participial absolute is idiomatic
 * Italian and must not be flagged.** "Finita la battaglia, i nostri spengono
 * l'incendio" is correct, ordinary, and exactly how a translator should render
 * `fine proeli facto`; it needs no connective because the participle comes
 * first, which is what marks the construction. What is wrong in Italian is the
 * English order - subject first, verb-form second - so that is what is caught.
 *
 * RULES TRIED AND REMOVED, so they are not tried again:
 *   - Flagging every Italian clause-initial past participle (`Battuti i popoli
 *     più bellicosi,`). That is the correct rendering of an ablative absolute
 *     and fired on most of the Caesar bank. Removed as soon as it was run.
 *   - Flagging a sentence-final Italian gerund clause (`, essendo ormai
 *     migliori le condizioni`). Stiff at worst, and standard in written
 *     Italian; it fired on Cicero constantly and taught nothing.
 *   - Flagging English `-ing` phrases after a comma (`, leaving two thousand
 *     armed men`). Those are conjunct participles agreeing with the subject,
 *     not absolutes, and they are already attached.
 *
 * A flag is not automatically a fault; it is a phrase to read. Exit code is
 * always 0. CLEARED holds the ones already read and judged, each with the
 * exact set of flags it produced: reword the passage and the signature stops
 * matching, and the fragment is reported in full again.
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

// A clause boundary: the start of the text, or a mark that closes a clause.
// A linking word occupies this slot in a corrected passage, which is why the
// boundary is the whole test.
const B = '(?:^|[.;:,]\\s+|\\s-\\s+)';
// Determiners an absolute phrase starts with. Bare plurals ("Roman citizens
// gone, ...") are not matched: too many false positives for too rare a shape.
// Written with both cases per word rather than with the `i` flag, because the
// noun-phrase body below must stay lower-case only: making the whole rule
// case-insensitive would swallow the proper-noun rule and flag every capital
// at the start of a sentence. An absolute that opens a sentence has a capital
// determiner - "The chance being given, he is sent out of the town" - and was
// missed on the first run for exactly this reason.
const DET = '(?:[Tt]he|[Aa]n?|[Hh]is|[Hh]er|[Tt]heir|[Ii]ts|[Oo]ur|[Tt]his|[Tt]hat|[Tt]hese|[Tt]hose)';
// The body of the noun phrase. Kept short on purpose - an absolute is a phrase,
// not a clause - and stopped at any verb-like word that would make it a real
// sentence.
const NP = "[a-z][a-z'’-]*(?:\\s+(?:of|the|a|an|his|her|their|its|our)?\\s*[a-z][a-z'’-]*){0,4}";

// An absolute has no finite verb and no pronoun subject. Anything that does is
// an ordinary clause that happens to start with a determiner - "that they were
// being stirred up", "una fu uccisa", "la prova l'ho fatta" - and every one of
// those was a false positive on the first run.
const EN_NOT_NP = /\b(?:were|was|are|is|am|be|to|had|have|has|would|will|shall|did|does|do|seem|seems|seemed|appear|appears|appeared|they|he|she|it|we|you|who|which|that)\b/i;
const IT_NOT_NP = /\b(?:ho|hai|ha|abbiamo|avete|hanno|sono|sei|è|siamo|siete|era|erano|fu|furono|sarà|lo|la|li|le|mi|ti|ci|vi|ne|che|volta)\b/i;

const EN_RULES = [
  { name: 'verbless absolute', bad: EN_NOT_NP,
    re: new RegExp(B + '(' + DET + '\\s+)(' + NP + ')(\\s+(?:over|done|finished|complete|completed|past|gone|dead|lost|ended))\\s*,', 'g') },
  { name: 'participial absolute', bad: EN_NOT_NP,
    re: new RegExp(B + '(' + DET + '\\s+)(' + NP + ')(\\s+(?:now\\s+|then\\s+|already\\s+)?(?:being|having been)\\s+[a-z])', 'g') },
  // A proper name takes no determiner, so the two rules above cannot see
  // `Himera deleta` -> "Himera having been destroyed, those citizens...".
  // That one was in the bank from v1.7.7 and was found by reading the
  // neighbourhood of a flag, not by the check. Hence this third rule.
  { name: 'proper-noun absolute', bad: EN_NOT_NP,
    re: new RegExp(B + '()([A-Z][a-z]{2,}(?:\\s+[A-Z][a-z]{2,})?)(\\s+(?:being|having been)\\s+[a-z])', 'g') }
];

const IT_DET = '(?:il|lo|la|i|gli|le|un|uno|una|questo|questa|questi|queste|suo|sua|suoi|sue|loro)';
const IT_NP = "[a-zàèéìòù][a-zàèéìòù'’-]*(?:\\s+(?:di|del|della|dei|delle|degli|dell'|il|la|i|le|un|una)?\\s*[a-zàèéìòù][a-zàèéìòù'’-]*){0,4}";
const IT_PART = '(?:finito|finita|finiti|finite|concluso|conclusa|conclusi|concluse|terminato|terminata|terminati|terminate|compiuto|compiuta|compiuti|compiute|fatto|fatta|fatti|fatte|preso|presa|presi|prese|ucciso|uccisa|uccisi|uccise|morto|morta|morti|morte|perduto|perduta|perduti|perdute)';

const IT_RULES = [
  { name: 'gerund after its subject (English order)', bad: IT_NOT_NP,
    re: new RegExp(B + '(' + IT_DET + '\\s+)(' + IT_NP + ')(\\s+essendo\\s+[a-zàèéìòù])', 'gi') },
  { name: 'participle after its subject (English order)', bad: IT_NOT_NP,
    re: new RegExp(B + '(' + IT_DET + '\\s+)(' + IT_NP + ')(\\s+' + IT_PART + ')\\s*,', 'gi') }
];

// Emphasis, the chapter heading and the subsection markers are not part of the
// prose and would otherwise create boundaries of their own.
function prose(text) {
  if (!text) return '';
  return text
    .replace(/^>\s*(?:\[[^\]]*\]\s*)?/, '')
    .replace(/\*\*\d+\.\*\*/g, ' ')
    .replace(/\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Read and judged by hand. Key is the citation; `sig` is the exact set of
// flags the fragment produced when it was read.
const CLEARED = {};

let checked = 0, flagged = 0, cleared = 0;
const notes = [], quiet = [];

for (const slug of Object.keys(AUTHORS)) {
  for (const work of AUTHORS[slug].works) {
    for (const f of work.fragments || []) {
      if (only && f.version !== only) continue;
      checked++;
      const bad = [];
      const langs = [['english', f.english, EN_RULES], ['italian', f.italian, IT_RULES]];
      for (const [lang, field, rules] of langs) {
        const t = prose(field);
        if (!t) continue;
        for (const rule of rules) {
          rule.re.lastIndex = 0;
          let m;
          while ((m = rule.re.exec(t))) {
            if (rule.bad.test(m[2])) { rule.re.lastIndex = m.index + m[0].length - 1; continue; }
            bad.push('  ' + lang + ' (' + rule.name + '): "' + (m[1] + m[2] + m[3]).trim() + '"'
              + '\n      ...' + t.slice(Math.max(0, m.index - 45), m.index + m[0].length + 55).trim() + '...');
            // Step back one character so overlapping boundaries are still seen.
            rule.re.lastIndex = m.index + m[0].length - 1;
          }
        }
      }
      if (!bad.length) continue;
      const sig = bad.map(function (b) { return b.split('\n')[0].trim(); }).join(' | ');
      if (harvest) {
        console.log('  ' + JSON.stringify(f.citation) + ': { why: \'\', sig: ' + JSON.stringify(sig) + ' },');
        continue;
      }
      const ok = CLEARED[f.citation];
      if (!ok) {
        flagged++;
        notes.push(f.citation + '  [' + slug + '/' + work.id + ']\n' + bad.join('\n'));
      } else if (ok.sig !== sig) {
        flagged++;
        notes.push(f.citation + '  [' + slug + '/' + work.id + ']  ON THE CLEARED LIST, BUT ITS FLAGS HAVE CHANGED'
          + '\n  was: ' + ok.sig + '\n  now: ' + sig + '\n' + bad.join('\n'));
      } else {
        cleared++;
        quiet.push('  ' + f.citation + ' - ' + ok.why);
      }
    }
  }
}

if (harvest) process.exit(0);
if (notes.length) console.log(notes.join('\n\n') + '\n');
console.log(checked + ' fragment' + (checked === 1 ? '' : 's') + ' checked for unattached absolutes, '
  + flagged + ' to look at'
  + (cleared ? ', ' + cleared + ' already read and cleared:' : '.'));
if (cleared) console.log(quiet.join('\n'));
