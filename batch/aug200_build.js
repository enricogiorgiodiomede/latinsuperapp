/*
 * aug200_build.js - v2.0.0, AUGUSTUS' AGE. Adds the fourteen Augustan authors
 * to js/fragments.js with the 29 excerpts of augustan_era_draft.md (Latin,
 * English, analysis) and italian_translations_augustan.md (Italian), read by
 * batch/aug200_parse.js. Nothing is retyped: the Latin is the draft's, which
 * was copied from the pages listed in tools/sources.json, and tools/verify.js
 * proves it verbatim against those pages afterwards (Gallus excepted: see
 * sources.json `_augustan`).
 *
 *   node batch/aug200_build.js            # refuses if any Augustan author exists
 *
 * Layout. Prose keeps the draft's [n] section markers as paragraphs, the way
 * apply_batch.js lays prose out. Verse follows the line-for-line standard
 * (first verse marked, then every multiple of five, one translation line per
 * verse, identical markers in all three columns); the page's own line numbers
 * at the end of a Latin line are dropped, and a "..." gap in a trimmed excerpt
 * becomes the app's [...] mark, after which the count resumes at the next
 * entry of `from`.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const parse = require('./aug200_parse.js');

const REPO = path.join(__dirname, '..');
const P = path.join(REPO, 'js/fragments.js');
const VERSION = '2.0.0';
const TLL = 'The Latin Library (thelatinlibrary.com)';

// ---------------------------------------------------------------- authors
const AUTHORS_META = [
  { slug: 'augustus', works: [['res-gestae', 'Res Gestae Divi Augusti', 'Res Gestae Divi Augusti']] },
  { slug: 'marcus-vitruvius-pollio', works: [['de-architectura', 'De Architectura', 'De Architectura']] },
  { slug: 'gaius-cornelius-gallus', works: [['gallus-fragmenta', 'Fragments', 'Frammenti']] },
  { slug: 'publius-vergilius-maro', sel: ['Choose a work by Virgil', "Scegli un'opera di Virgilio"],
    works: [['bucolica', 'Bucolica (Eclogues)', 'Bucoliche'], ['georgica', 'Georgica', 'Georgiche'], ['aeneis', 'Aeneis', 'Eneide']] },
  { slug: 'quintus-horatius-flaccus', sel: ['Choose a work by Horace', "Scegli un'opera di Orazio"],
    works: [['horace-carmina', 'Carmina (Odes)', 'Odi'], ['horace-epodi', 'Epodi', 'Epodi'], ['horace-sermones', 'Sermones (Satires)', 'Satire']] },
  { slug: 'titus-livius', works: [['ab-urbe-condita', 'Ab Urbe Condita', 'Ab Urbe Condita']] },
  { slug: 'albius-tibullus', works: [['tibullus-elegiae', 'Elegiae', 'Elegie']] },
  { slug: 'sulpicia', works: [['sulpiciae-elegidia', 'Sulpiciae Elegidia', 'Sulpiciae Elegidia']] },
  { slug: 'sextus-propertius', works: [['propertius-elegiae', 'Elegiae', 'Elegie']] },
  { slug: 'publius-ovidius-naso', sel: ['Choose a work by Ovid', "Scegli un'opera di Ovidio"],
    works: [['amores', 'Amores', 'Amores'], ['ars-amatoria', 'Ars Amatoria', 'Ars Amatoria'], ['metamorphoses', 'Metamorphoses', 'Metamorfosi']] },
  { slug: 'gaius-julius-hyginus', works: [['fabulae', 'Fabulae', 'Fabulae']] },
  { slug: 'grattius', works: [['cynegetica', 'Cynegetica', 'Cynegetica']] },
  { slug: 'pompeius-trogus', works: [['justin-epitome', "Historiae Philippicae (Justin's Epitome)", "Historiae Philippicae (l'epitome di Giustino)"]] },
  { slug: 'marcus-manilius', works: [['astronomica', 'Astronomica', 'Astronomica']] }
];

// ---------------------------------------------------------------- excerpts
// One row per draft excerpt, in file order. `from` (verse only) is the first
// verse, or one entry per piece for a trimmed excerpt.
const X = [
  { a: 'augustus', w: 'res-gestae', cit: '(Res Gestae 1-3)',
    t: 'Nineteen years old, with a private army', ti: 'A diciannove anni, con un esercito privato' },
  { a: 'augustus', w: 'res-gestae', cit: '(Res Gestae 20-21)',
    t: 'The builder of Rome', ti: 'Il costruttore di Roma' },
  { a: 'marcus-vitruvius-pollio', w: 'de-architectura', cit: '(De Architectura I.3.1-2)',
    t: 'Firmitas, utilitas, venustas', ti: 'Firmitas, utilitas, venustas' },
  { a: 'marcus-vitruvius-pollio', w: 'de-architectura', cit: '(De Architectura III.1.2-3)',
    t: 'The Vitruvian Man', ti: "L'uomo vitruviano" },
  { a: 'marcus-vitruvius-pollio', w: 'de-architectura', cit: '(De Architectura IX, Praefatio 9-10)',
    t: 'Eureka! Archimedes and the golden crown', ti: "Eureka! Archimede e la corona d'oro",
    source: "LacusCurtius (penelope.uchicago.edu), F. Krohn's Teubner text (1912)" },
  { a: 'gaius-cornelius-gallus', w: 'gallus-fragmenta', cit: '(Fragment 2, the Qasr Ibrim papyrus)', from: 1,
    t: 'Ten lines from the sand: the Qasr Ibrim papyrus', ti: 'Dieci versi dalla sabbia: il papiro di Qasr Ibrim',
    source: 'Living Poets, Durham University (livingpoets.awh.durham.ac.uk), after Anderson, Parsons and Nisbet (1979)' },
  { a: 'publius-vergilius-maro', w: 'bucolica', cit: '(Bucolica 2, vv. 6-18)', from: 6,
    t: "Corydon's complaint", ti: 'Il lamento di Coridone' },
  { a: 'publius-vergilius-maro', w: 'georgica', cit: '(Georgica IV, vv. 1-24)', from: 1,
    t: 'A home for the bees', ti: 'Una casa per le api' },
  { a: 'publius-vergilius-maro', w: 'aeneis', cit: '(Aeneis III, vv. 655-665)', from: 655,
    t: 'Polyphemus', ti: 'Polifemo' },
  { a: 'quintus-horatius-flaccus', w: 'horace-carmina', cit: '(Carmina II.10)', from: 1,
    t: 'The golden mean', ti: "L'aurea mediocritas" },
  { a: 'quintus-horatius-flaccus', w: 'horace-epodi', cit: '(Epodi 10)', from: 1,
    t: 'A curse on Mevius', ti: 'Una maledizione per Mevio' },
  { a: 'quintus-horatius-flaccus', w: 'horace-sermones', cit: '(Sermones I.5, vv. 1-26)', from: 1,
    t: 'The journey to Brundisium', ti: 'Il viaggio a Brindisi' },
  { a: 'titus-livius', w: 'ab-urbe-condita', cit: '(Ab Urbe Condita XXV.31.4-11)',
    t: 'The fall of Syracuse and the death of Archimedes', ti: 'La caduta di Siracusa e la morte di Archimede' },
  { a: 'titus-livius', w: 'ab-urbe-condita', cit: '(Ab Urbe Condita XXXIX.8.3-8)',
    t: 'The Bacchanalia scandal', ti: 'Lo scandalo dei Baccanali' },
  { a: 'titus-livius', w: 'ab-urbe-condita', cit: '(Ab Urbe Condita CXX, in Seneca the Elder, Suasoriae 6.17, 6.22)',
    t: "The death of Cicero, and Livy's verdict", ti: 'La morte di Cicerone e il giudizio di Livio', gapAfter: 0 },
  { a: 'albius-tibullus', w: 'tibullus-elegiae', cit: '(Elegiae I.3, vv. 1-10, 53-58)', from: [1, 53],
    t: 'Sick on Corfu', ti: 'Malato a Corfù' },
  { a: 'albius-tibullus', w: 'tibullus-elegiae', cit: '(Elegiae I.10, vv. 1-14)', from: 1,
    t: 'Who invented the sword?', ti: 'Chi inventò la spada?' },
  { a: 'sulpicia', w: 'sulpiciae-elegidia', cit: '(Corpus Tibullianum III.13)', from: 1,
    t: 'Love has come at last', ti: "Finalmente è arrivato l'amore" },
  { a: 'sulpicia', w: 'sulpiciae-elegidia', cit: '(Corpus Tibullianum III.18)', from: 1,
    t: 'The apology', ti: 'Le scuse' },
  { a: 'sextus-propertius', w: 'propertius-elegiae', cit: '(Elegiae IV.7, vv. 1-18)', from: 1,
    t: "Cynthia's ghost", ti: 'Il fantasma di Cinzia' },
  { a: 'sextus-propertius', w: 'propertius-elegiae', cit: '(Elegiae IV.8, vv. 49-70)', from: 49,
    t: 'Cynthia returns', ti: 'Cinzia ritorna' },
  { a: 'publius-ovidius-naso', w: 'amores', cit: '(Amores I.9, vv. 1-20)', from: 1,
    t: 'Every lover is a soldier', ti: 'Ogni amante è un soldato' },
  { a: 'publius-ovidius-naso', w: 'ars-amatoria', cit: '(Ars Amatoria I, vv. 135-162)', from: 135,
    t: 'A day at the races', ti: 'Una giornata alle corse' },
  { a: 'publius-ovidius-naso', w: 'metamorphoses', cit: '(Metamorphoses VIII, vv. 823-842, 875-878)', from: [823, 875],
    t: 'The hunger of Erysichthon', ti: 'La fame di Erisittone' },
  { a: 'gaius-julius-hyginus', w: 'fabulae', cit: '(Fabulae 220)',
    t: 'Cura, the goddess who made man', ti: "Cura, la dea che plasmò l'uomo" },
  { a: 'grattius', w: 'cynegetica', cit: '(Cynegetica, vv. 171-181)', from: 171,
    t: 'The dogs of Britain', ti: 'I cani della Britannia' },
  { a: 'pompeius-trogus', w: 'justin-epitome', cit: '(Justin, Epitome XXXVIII.6.7-8)',
    t: 'The sons of the she-wolf', ti: 'I figli della lupa' },
  { a: 'marcus-manilius', w: 'astronomica', cit: '(Astronomica IV, vv. 1-16)', from: 1,
    t: 'Why do we waste our lives?', ti: 'Perché sprechiamo la vita?' },
  { a: 'marcus-manilius', w: 'astronomica', cit: '(Astronomica V, vv. 567-576)', from: 567,
    t: 'Perseus sees Andromeda', ti: 'Perseo vede Andromeda' }
];

// The draft was written as one long document, so a few sentences point at
// "the biography above" or "Excerpt 3". On the practice page each excerpt
// stands alone: name the passage instead. [field, find, replace]
const PATCH = {
  0: [['description', 'Read it with the biography above open beside it,', "Read it with Augustus's biography open beside it,"],
      ['descriptionIt', 'Leggetelo con la biografia qui sopra aperta accanto,', 'Leggetelo con la biografia di Augusto aperta accanto,']],
  2: [['analysis', 'That idea leads straight to Excerpt 2.', 'That idea leads straight to the Vitruvian Man (*De Architectura* III.1.2-3).'],
      ['analysisIt', 'È un\'idea che porta dritta al Brano 2.', 'È un\'idea che porta dritta all\'uomo vitruviano (*De Architectura* III.1.2-3).']],
  6: [['description', 'Keep that Cyclops in mind: he comes back in Excerpt 3.', 'Keep that Cyclops in mind: he comes back in the *Aeneid* (*Aeneis* III, vv. 655-665).'],
      ['descriptionIt', 'Teniamo a mente quel Ciclope: torna nel Brano 3.', "Teniamo a mente quel Ciclope: torna nell'*Eneide* (*Aeneis* III, vv. 655-665)."]],
  8: [['analysis', 'And, if you have read Excerpt 1,', "And, if you have read Corydon's complaint (*Bucolica* 2, vv. 6-18),"],
      ['analysisIt', 'E, se avete letto il Brano 1,', 'E, se avete letto il lamento di Coridone (*Bucolica* 2, vv. 6-18),']]
};

// Declared emendations (verify.js puts the source's reading back before it
// compares), each explained in a closing "About the text" paragraph in both
// languages: two misprints, one missing comma, and five pieces of typesetting
// the draft had already tidied (dashes for brackets, a capital, a space, the
// section number Justin's page prints inside a sentence).
const EMEND = {
  2: { emend: [['tres: aedificatio gnomonice', 'tres: aedificatio, gnomonice'], ['murorum turrimque', 'murorum turriumque'], ['conmoda distrtbutio venustatis', 'conmoda distributio; venustatis']],
       en: 'The Latin Library prints *aedificatio gnomonice, machinatio* without the first comma (the three parts are a list, so the comma is restored), *turrimque* for *turriumque*, "and of towers" (the genitive plural of *turris* is *turrium*), and *distrtbutio venustatis* for *distributio; venustatis*, a misprint with the semicolon lost. The app prints the corrected text.',
       it: 'The Latin Library stampa *aedificatio gnomonice, machinatio* senza la prima virgola (le tre parti sono un elenco, e la virgola è ripristinata), *turrimque* per *turriumque*, "e delle torri" (il genitivo plurale di *turris* è *turrium*), e *distrtbutio venustatis* per *distributio; venustatis*, un refuso che ha perso anche il punto e virgola. L\'app stampa il testo corretto.' },
  3: { emend: [['summum vertices quartae', 'summum verticem quartae'], ['ReIiqua quoque', 'Reliqua quoque'], ['circinique conlocantum', 'circinique conlocatum']],
       en: 'The Latin Library\'s text of this book has three misprints here, all corrected in the app: *ad summum vertices* for *verticem* (*summum* needs a singular, "to the crown of the head"; the same phrase is printed correctly a line earlier), *ReIiqua* with a capital I for *Reliqua*, and *circinique conlocantum centrum* for *conlocatum*: the centre of the compass is "placed" in the navel, and *conlocantum*, "of those placing", makes no sense of the sentence.',
       it: 'Il testo di questo libro su The Latin Library ha qui tre refusi, tutti corretti nell\'app: *ad summum vertices* per *verticem* (*summum* vuole un singolare, "fino alla sommità del capo"; la stessa espressione è stampata correttamente una riga prima), *ReIiqua* con la I maiuscola per *Reliqua*, e *circinique conlocantum centrum* per *conlocatum*: il centro del compasso è "posto" nell\'ombelico, e *conlocantum*, "di coloro che collocano", non dà senso alla frase.' },
  // Not an emendation: Krohn prints sentence openings in lower case, and the
  // excerpt now does too (LOWER below), as the Livy excerpts keep their page's.
  4: { emend: null,
       en: "Krohn's text, as LacusCurtius gives it, does not capitalise the start of a sentence (*nimirum*, *is ad tempus*, *posteaquam*), and the app keeps it that way.",
       it: 'Il testo di Krohn, come lo riporta LacusCurtius, non usa la maiuscola a inizio frase (*nimirum*, *is ad tempus*, *posteaquam*), e l\'app lo mantiene così.' },
  7: { emend: [['aditus--nam', 'aditus (nam'], ['prohibent--neque', 'prohibent) neque']],
       en: 'The Latin Library sets *nam pabula venti / ferre domum prohibent* (vv. 9-10) between dashes; the app prints round brackets, which is what the dashes mean.',
       it: 'The Latin Library mette *nam pabula venti / ferre domum prohibent* (vv. 9-10) tra due trattini; l\'app li rende con le parentesi tonde, che è ciò che significano.' },
  10: { emend: [['trementis ilics;', 'trementis ilices;'], ['carinam ruperit', 'carinam ruperit.']],
       en: 'The Latin Library prints *ilics* in v. 8, a misprint for *ilices*, "holm-oaks", the accusative plural of *ilex*; the app prints *ilices*. It also has no punctuation after *ruperit* at the end of v. 20, where the sentence ends; the full stop is added.',
       it: 'The Latin Library stampa *ilics* al v. 8, refuso per *ilices*, "i lecci", accusativo plurale di *ilex*; l\'app stampa *ilices*. Manca inoltre la punteggiatura dopo *ruperit*, alla fine del v. 20, dove la frase finisce; il punto è aggiunto.' },
  20: { emend: [['Lygdame,nil', 'Lygdame, nil']],
       en: 'The Latin Library prints *Lygdame,nil* with no space after the comma; the space is restored.',
       it: 'The Latin Library stampa *Lygdame,nil* senza spazio dopo la virgola; lo spazio è ripristinato.' },
  21: { emend: [['requiescit uterque--', 'requiescit uterque:']],
       en: 'The Latin Library puts a dash after *uterque*; the app prints a colon, which is what the dash means.',
       it: 'The Latin Library mette un trattino dopo *uterque*; l\'app stampa i due punti, che è ciò che il trattino significa.' },
  23: { emend: [["'Lenis adhuc", 'Lenis adhuc'], ['corpus alebat.--', 'corpus alebat.']],
       en: 'The whole story is told by a character, the river god Achelous, so the Latin Library opens v. 823 with a quotation mark that is closed only later, and ends v. 878 with a dash where Achelous turns from Erysichthon to his own story. Both are left out here, where the excerpt is read on its own.',
       it: 'Tutta la storia è raccontata da un personaggio, il dio fluviale Acheloo, perciò The Latin Library apre il v. 823 con una virgoletta che si chiude solo più avanti, e chiude il v. 878 con un trattino, là dove Acheloo passa da Erisittone alla propria storia. Qui sono omessi entrambi, perché il brano si legge da solo.' },
  26: { emend: [['Superbos; 8 atque', 'Superbos; atque']],
       en: 'The Latin Library prints the section number 8 inside the sentence, after *Superbos*; the app leaves it out, so the sentence reads straight through.',
       it: 'The Latin Library stampa il numero di paragrafo 8 dentro la frase, dopo *Superbos*; l\'app lo omette, così la frase si legge di seguito.' }
};

// Sentence openings Krohn prints in lower case (Vitruvius IX praef.).
const LOWER = { 4: ['Nimirum Hiero', 'Is ad tempus', 'Posteaquam indicium', 'Tunc is cum', 'Idque cum eius', 'Nam currens'] };

// ---------------------------------------------------------------- layout
const isGap = (l) => /^(\.\.\.|…|\[\.\.\.\])$/.test(l.trim());

function verseNums(lines, from) {
  const froms = Array.isArray(from) ? from : [from];
  let pi = 0, vn = 0;
  const nums = lines.map(l => {
    if (isGap(l)) { pi++; vn = 0; if (pi >= froms.length) throw new Error('more gaps than `from` entries'); return null; }
    return froms[pi] + vn++;
  });
  if (pi !== froms.length - 1) throw new Error('`from` has ' + froms.length + ' entries for ' + (pi + 1) + ' pieces');
  return nums;
}
function markVerse(lines, nums) {
  const first = nums[0];
  return lines.map((t, i) => {
    if (nums[i] == null) return '> [...]';
    const n = nums[i];
    return '> ' + ((n === first || n % 5 === 0) ? '**' + n + '.** ' : '') + t;
  }).join('\n');
}
// Prose: each draft line is a paragraph (they open on [n] where the draft
// marks a section); a gap becomes its own [...] paragraph.
function prose(lines) {
  return lines.map(l => '> ' + (isGap(l) ? '[...]' : l)).join('\n>\n');
}

// ---------------------------------------------------------------- build
const ex = parse();
if (ex.length !== X.length) throw new Error('draft has ' + ex.length + ' excerpts, table has ' + X.length);

const src = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const headAt = src.indexOf(headMark), tailAt = src.indexOf(tailMark);
if (headAt < 0 || tailAt < 0) throw new Error('js/fragments.js markers not found - refusing to write');
global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;

for (const m of AUTHORS_META) {
  if (AUTHORS[m.slug]) throw new Error('author already in the bank: ' + m.slug);
  const entry = {};
  if (m.sel) { entry.selectHeading = m.sel[0]; entry.selectHeadingIt = m.sel[1]; }
  entry.needsSelection = !!m.sel;
  entry.works = m.works.map(([id, label, labelIt]) => ({ id, label, labelIt, fragments: [] }));
  AUTHORS[m.slug] = entry;
}

const report = [];
X.forEach((row, i) => {
  const e = ex[i];
  const verse = row.from != null;
  // Verse: the Latin Library prints a line number at the end of every fifth
  // line; it is the page's, not the poet's, and Latin verse holds no digits.
  const latinLines = e.latin.map(l => verse ? l.replace(/\s+\d+[a-z]?$/, '') : l);
  if (verse && (latinLines.length !== e.english.length || latinLines.length !== e.italian.length)) {
    throw new Error(row.cit + ': ' + latinLines.length + ' Latin, ' + e.english.length + ' EN, ' + e.italian.length + ' IT lines');
  }
  let latin, english, italian;
  if (verse) {
    const nums = verseNums(latinLines, row.from);
    if (verseNums(e.english, row.from).join() !== nums.join() || verseNums(e.italian, row.from).join() !== nums.join()) {
      throw new Error(row.cit + ': the gaps are not in the same place in all three columns');
    }
    latin = markVerse(latinLines, nums);
    english = markVerse(e.english, nums);
    italian = markVerse(e.italian, nums);
  } else {
    // Trimmed prose (Livy CXX: Seneca quotes him twice, at 6.17 and 6.22):
    // the two pieces are not contiguous on the page, so the cut is marked.
    const cut = (arr) => row.gapAfter != null ? arr.slice(0, row.gapAfter + 1).concat(['...'], arr.slice(row.gapAfter + 1)) : arr;
    latin = prose(cut(latinLines)); english = prose(cut(e.english)); italian = prose(cut(e.italian));
  }
  const frag = {
    title: row.t, citation: row.cit, source: row.source || TLL,
    description: e.context, latin, italian, english, analysis: e.analysis,
    titleIt: row.ti, descriptionIt: e.contextIt, analysisIt: e.analysisIt,
    version: VERSION
  };
  for (const w of (LOWER[i] || [])) {
    if (frag.latin.split(w).length !== 2) throw new Error(row.cit + ': LOWER word not found once: ' + w);
    frag.latin = frag.latin.replace(w, w.charAt(0).toLowerCase() + w.slice(1));
  }
  if (EMEND[i]) {
    if (EMEND[i].emend) frag.emend = EMEND[i].emend;
    frag.analysis += '\n\n**About the text.** ' + EMEND[i].en;
    frag.analysisIt += '\n\n**Il testo.** ' + EMEND[i].it;
  }
  for (const [field, find, repl] of (PATCH[i] || [])) {
    if (frag[field].split(find).length !== 2) throw new Error(row.cit + ': patch anchor not found once in ' + field + ': ' + find);
    frag[field] = frag[field].replace(find, repl);
  }
  const work = AUTHORS[row.a].works.find(w => w.id === row.w);
  if (!work) throw new Error('no work ' + row.w + ' for ' + row.a);
  work.fragments.push(frag);
  report.push(row.a.padEnd(26) + row.cit);
});

fs.writeFileSync(P, src.slice(0, headAt + headMark.length) + JSON.stringify(AUTHORS, null, 2) + ';' + src.slice(tailAt));
console.log(report.join('\n'));
console.log('\nwritten: ' + AUTHORS_META.length + ' authors, ' + X.length + ' fragments, version ' + VERSION);
