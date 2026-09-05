/*
 * lint_register.js - catch a translation that has drifted into legalese.
 *
 *   node tools/lint_register.js            # every translation in the bank
 *   node tools/lint_register.js 1.12.0     # only fragments tagged 1.12.0
 *   node tools/lint_register.js --list     # print the whole word list
 *
 * Why this exists. The app is for a Liceo Scientifico reader, and the target
 * register for the two translations is **intermediate with some formality
 * allowed** - not the sort of English that turns up in a statute. Translating
 * Latin pulls hard in the other direction: an impersonal passive invites
 * "recourse is had", a gerundive invites "is to be", an ablative absolute
 * invites "the thing having been done". Each one is defensible on its own and
 * the accumulation is unreadable. In v1.12.0 the user found three in ten
 * excerpts by reading - *recourse is had to*, *when it grew light*, *to be got
 * ready* - and nothing in the pipeline was looking.
 *
 * The check is a word list, and a word list is a blunt instrument on purpose.
 * It knows nothing about context: it finds a phrase and says what a plainer one
 * would be. **Every hit is a prompt to look, not a failure**, and some hits are
 * the right word - a chapter about a senatorial decree may legitimately need
 * *decree*, and the two entries that flag *shall* will fire on a genuine legal
 * formula. Exit code is always 0.
 *
 * What it does NOT check: the Latin (which is the source's and untouchable),
 * the analysis or the description. Those are commentary, they are allowed a
 * wider register, and the user's note was about the translations. Pass --prose
 * to include description and analysis anyway.
 *
 * TWO RULES THAT WERE TRIED AND REMOVED, recorded so they are not added back.
 * **`codesto`** looks archaic and is not: it is the second-person demonstrative,
 * and it is the standard Italian for Latin `iste`. Every hit in the bank was
 * Cicero addressing Verres, Piso or Antony, or a Terence character addressing
 * another, and in every one `codesto` was the right word - `quello` would have
 * lost the sneer. **`inquire`** was flagged as formal, but `inquire into` is
 * ordinary English and the rule never fired on anything else.
 *
 * Keep the list short and specific. A list that flags every long word teaches
 * nothing and gets ignored; these are all phrases with a plainer equivalent
 * that means exactly the same thing.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');

// [pattern, what to use instead, why it is on the list]
// Patterns are matched case-insensitively against the rendered text.
const EN = [
  [/\brecourse is had\b/, 'it comes down to / they fall back on', 'the most formal way to render an impersonal passive'],
  [/\bto be got ready\b/, 'to be prepared / to get ready', 'awkward passive of "get"'],
  [/\bit grew light\b/, 'day came / it got light', 'reads as translationese'],
  [/\bwhereupon\b/, 'then / at which point', 'legal-narrative connective'],
  [/\bthereupon\b/, 'then', 'legal-narrative connective'],
  [/\bthereafter\b/, 'after that / from then on', 'legal-narrative connective'],
  [/\bhitherto\b/, 'until then / so far', 'archaic'],
  [/\bheretofore\b/, 'until then', 'archaic'],
  [/\bthenceforth\b/, 'from then on', 'archaic'],
  [/\bhenceforth\b/, 'from now on', 'archaic'],
  [/\baforesaid\b/, 'the one just mentioned', 'legalese'],
  [/\bthe same\b(?= (?:was|were|is|are) )/, 'it / them', 'legalese "the same" as a pronoun'],
  [/\bit behove[sd]\b/, 'had to / ought to', 'archaic'],
  [/\bwas wont to\b/, 'used to', 'archaic'],
  [/\bwere wont to\b/, 'used to', 'archaic'],
  [/\bendeavour(?:ed|s)?\b/, 'try / tried', 'formal for no gain'],
  [/\bcommence(?:d|s)?\b/, 'begin / began', 'formal for no gain'],
  [/\bascertain(?:ed|s)?\b/, 'find out / learn', 'formal for no gain'],
  [/\butilis[ez](?:ed|es)?\b/, 'use', 'formal for no gain'],
  [/\bperuse[ds]?\b/, 'read', 'formal for no gain'],
  [/\bsundry\b/, 'various', 'archaic'],
  [/\bdivers\b(?!e)/, 'several', 'archaic'],
  [/\balbeit\b/, 'though', 'formal connective'],
  [/\bnotwithstanding\b/, 'despite / even so', 'formal connective'],
  [/\binsofar as\b/, 'as far as', 'formal connective'],
  [/\bin order that\b/, 'so that', 'formal connective'],
  [/\bwith a view to\b/, 'to / in order to', 'formal connective'],
  [/\bby reason of\b/, 'because of', 'formal connective'],
  [/\binasmuch as\b/, 'since', 'formal connective'],
  [/\binsomuch\b/, 'so much so', 'archaic'],
  [/\binsooth\b|\bforsooth\b/, 'cut it', 'archaic'],
  [/\binstant(?:ly)? upon\b/, 'as soon as', 'archaic'],
  [/\bmake good (?:his|their|its) escape\b/, 'get away', 'padded'],
  [/\bproceed(?:ed|s)? to\b/, 'went on to / then', 'padded'],
  [/\bin the event that\b/, 'if', 'padded'],
  [/\bprior to\b/, 'before', 'padded'],
  [/\bsubsequent to\b/, 'after', 'padded']
];

const IT = [
  [/\ballorquando\b/, 'quando', 'arcaico'],
  [/\bteste'\b|\btesté\b/, 'poco fa', 'arcaico'],
  [/\bvieppiù\b/, 'sempre più', 'arcaico'],
  [/\borbene\b/, 'ebbene / dunque', 'arcaico'],
  [/\bimperocché\b|\bimperciocché\b/, 'perché', 'arcaico'],
  [/\bavvegnaché\b/, 'benché', 'arcaico'],
  [/\bdimodoché\b/, 'così che', 'burocratico'],
  [/\ball'uopo\b/, 'per questo', 'burocratico'],
  [/\bal fine di\b/, 'per', 'burocratico'],
  [/\bnel mentre\b/, 'mentre', 'burocratico'],
  [/\bfaceva d'uopo\b/, 'bisognava', 'arcaico'],
  [/\bebbe a dire\b/, 'disse', 'burocratico'],
  [/\bpose in essere\b/, 'fece', 'burocratico'],
  [/\bsuccitat[oaie]\b|\bsuddett[oaie]\b/, 'quello appena detto', 'burocratico'],
  [/\bde quo\b/, 'in questione', 'burocratico']
];

// Read and judged right where they stand. Key is `citation | lang | phrase`.
const CLEARED = {};

function render(t) {
  return String(t || '').replace(/\*\*(\d+)\.\*\*/g, ' ').replace(/[*_>]/g, ' ');
}

const argv = process.argv.slice(2);
if (argv.indexOf('--list') !== -1) {
  console.log('English (' + EN.length + '):');
  EN.forEach(function (r) { console.log('  ' + String(r[0]) + '  ->  ' + r[1] + '   (' + r[2] + ')'); });
  console.log('\nItalian (' + IT.length + '):');
  IT.forEach(function (r) { console.log('  ' + String(r[0]) + '  ->  ' + r[1] + '   (' + r[2] + ')'); });
  process.exit(0);
}
const prose = argv.indexOf('--prose') !== -1;
const only = argv.filter(function (a) { return a.charAt(0) !== '-'; })[0] || null;

global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

let checked = 0, flagged = 0, cleared = 0;
const notes = [];

for (const slug of Object.keys(AUTHORS)) {
  for (const work of AUTHORS[slug].works) {
    for (const f of work.fragments || []) {
      if (only && f.version !== only) continue;
      checked++;
      const fields = prose
        ? [['english', f.english], ['italian', f.italian], ['analysis', f.analysis],
           ['analysisIt', f.analysisIt], ['description', f.description], ['descriptionIt', f.descriptionIt]]
        : [['english', f.english], ['italian', f.italian]];
      const bad = [];
      for (const [name, raw] of fields) {
        if (!raw) continue;
        const text = render(raw);
        const list = /It$|^italian$/.test(name) ? IT : EN;
        for (const [re, better, why] of list) {
          const m = text.match(new RegExp(re.source, 'i'));
          if (!m) continue;
          if (CLEARED[f.citation + ' | ' + name + ' | ' + m[0].toLowerCase()]) { cleared++; continue; }
          const at = text.toLowerCase().indexOf(m[0].toLowerCase());
          bad.push('  ' + name + ': "' + m[0] + '" -> ' + better + '  (' + why + ')'
            + '\n      ...' + text.slice(Math.max(0, at - 45), at + m[0].length + 45).replace(/\s+/g, ' ').trim() + '...');
        }
      }
      if (bad.length) {
        flagged++;
        notes.push(f.citation + '  [' + slug + '/' + work.id + ']\n' + bad.join('\n'));
      }
    }
  }
}

if (notes.length) console.log(notes.join('\n\n') + '\n');
console.log(checked + ' fragment' + (checked === 1 ? '' : 's') + ' checked for register, '
  + flagged + ' to look at' + (cleared ? ', ' + cleared + ' cleared' : '') + '.');
