/*
 * metres.js - the metre reference (English), and the table that says which
 * excerpt is in which metre.
 *
 * Two separate things live here on purpose:
 *
 *  1. ASSIGN - which excerpt is in which metre. It is a lookup table rather
 *     than a field on js/fragments.js because that file is 4.8 MB and is
 *     rewritten wholesale by tools/apply_batch.js, which builds new fragments
 *     from an explicit object literal and would silently drop an unknown key.
 *     A table is also the shape the playwrights will need later, where one
 *     excerpt changes metre partway and wants a list of ranges, not a string.
 *     tools/check_metres.js keeps the table honest against the bank.
 *
 *  2. METRES - the reference pages themselves. Italian lives in
 *     js/metres-it.js and is merged in at lookup time, the way js/content.js
 *     and js/content-it.js already work.
 *
 * THE LABELLING RULE (the user, v1.15.0): label an excerpt only where the
 * metre is CERTAIN and the WHOLE excerpt is in ONE metre. Plautus, Terence,
 * Caecilius, the tragedians and the Atellane writers are therefore unlabelled
 * for now: a single scene can change metre partway, so one label would
 * sometimes be false. When they are done they get a list of metres per
 * excerpt, with the verses each one covers.
 *
 * THE EXAMPLE RULE (the user, v1.15.0): a metre page shows example authors
 * WHO ARE IN THE BANK. Virgil, Horace, Ovid and Martial stay out until they
 * are added as authors, however canonical they are for the metre; the history
 * section may mention where the metre goes next, but there is no example and
 * no author entry for anybody the app does not yet carry.
 *
 * Every example verse is verbatim Latin: quoted from js/fragments.js, or from
 * the cached Latin Library page for Catullus 1, which is not an excerpt.
 * tools/check_metre_quotes.js strips the editorial marks back off and proves
 * each one against its source. Latin is never retyped, here either.
 */
(function (global) {
  'use strict';

  /* ==================================================================
     1. Which excerpt is in which metre.

     A value is either a metre id (the whole author), or an object keyed by
     work id, whose value is a metre id (the whole work) or
     { def: <id>, byCitation: { '<citation>': <id> } } when one work mixes.
   * ================================================================== */
  var ASSIGN = {
    // All six books, all sixty excerpts.
    'titus-lucretius-carus': 'dactylic-hexameter',

    // The Annales are the first Latin hexameters; Ennius' other work is not
    // in the bank.
    'quintus-ennius': { 'annales': 'dactylic-hexameter' },

    // The two archaic epics, both in the native Italic verse.
    'livius-andronicus': { 'odusia': 'saturnian' },
    'gnaeus-naevius': { 'bellum-poenicum': 'saturnian', 'epitaphium': 'saturnian' },

    // Lucilius changes metre partway through his career, not partway through
    // an excerpt: Books 26-30 came first and are trochaic, and he settles on
    // the hexameter from Book 1 onwards. Each excerpt is single-metre, so each
    // can be labelled.
    'gaius-lucilius': {
      'saturae': {
        def: 'dactylic-hexameter',
        byCitation: {
          '(Saturae, Book 26, on his readers)': 'trochaic-septenarius',
          '(Saturae, Book 26; Nonius 351,6)': 'trochaic-septenarius'
        }
      }
    },

    // THE TRAGIC AND ATELLAN METRES (v1.15.4). No database covers these: the
    // plays are lost and the verses survive as quotations in Cicero, Macrobius
    // and Nonius. Each label is the metre left standing by tools/scan_drama.js
    // once the vowel quantities the tool leaves open are supplied by hand, and
    // where Ribbeck's text marks the ictus those marks agree with it.
    //
    // Two excerpts are deliberately unlabelled: Accius' *oderint, dum metuant*
    // is seven syllables, the tag as Cicero quotes it and not a whole verse of
    // anything, and the same goes for Novius' *sapiens si algebis, tremes*.
    'marcus-pacuvius-and-lucius-accius': {
      'pacuvius-niptra': 'trochaic-septenarius',
      // Cicero quotes two passages of the Chryses from one section of the De
      // Divinatione, in two different metres, so these are keyed by position:
      // the citation is the same string for both.
      'pacuvius-chryses': { byIndex: { 0: 'iambic-senarius', 1: 'trochaic-septenarius' } },
      'accius-brutus': { byCitation: {
        '(Brutus, in Cicero, De Divinatione I.44)': 'iambic-senarius',
        '(Brutus, in Cicero, De Divinatione I.45)': 'trochaic-septenarius'
      } }
    },

    // The Atellan writers, whose fragments come with Ribbeck's own numbering,
    // which is why two of these labels can name real verse numbers.
    'pomponius-bononiensis-and-quintus-novius': {
      'pomponius-fullones': { byCitation: {
        '(Fullones, fr. 48-50 Ribbeck)': [{ m: 'iambic-senarius', from: 48, to: 49 }, { m: 'trochaic-septenarius', from: 50, to: 50 }]
      } },
      // Macrobius cut the quotation after four syllables of the second verse,
      // so only the first is a whole line. The numerals are the app's, printed
      // on the Latin, as with Caecilius.
      'pomponius-galli-transalpini': { byCitation: {
        '(Galli Transalpini, in Macrobius, Saturnalia VI.9)': [{ m: 'iambic-senarius', from: 'I', to: 'I' }]
      } },
      'pomponius-kalendae-martiae': 'trochaic-septenarius',
      // v. 48 carried an iambic senarius label in v1.15.4 and has lost it:
      // with the quantities the dictionary gives, no assignment of its
      // thirteen syllables to the twelve positions of a senarius exists,
      // with or without the elision, and thirteen syllables is far too few
      // for any of the long lines. Ribbeck's ictus marks say it is iambic,
      // which is why it looked safe; being iambic is not the same as being
      // scannable, and the text as printed may simply be defective.
      'novius-maccus-exul': { byCitation: {
        '(Maccus Exul, fr. 48-50 Ribbeck)': [{ m: 'trochaic-septenarius', from: 49, to: 50 }]
      } },
      'novius-atellanae': { byIndex: { 0: 'trochaic-septenarius' } }
    },

    // THE COMIC METRES (v1.15.3). A comic scene changes metre where the action
    // changes register, so these are assigned excerpt by excerpt, and two of
    // them by verse range within the excerpt. The source is Timothy J. Moore,
    // *The Meters of Roman Comedy* (https://hdwlabs.artsci.wustl.edu/romancomedy/),
    // a database of every metrical unit in Plautus and Terence built on Cesare
    // Questa's work; `tools/comic_metres.js` reads it and writes these entries,
    // and `tools/scan_drama.js` checks them against the syllables independently.
    // An excerpt that contains any lyric metre is labelled `canticum`, because
    // naming its eight metres on a tablet would tell a reader nothing.
    'titus-maccius-plautus': {
      'amphitruo': { byCitation: {
        '(Amphitruo, Prologue, vv. 52-63)': 'iambic-senarius',
        '(Amphitruo, Act I, Scene 1, vv. 343-350)': 'trochaic-septenarius',
        '(Amphitruo, Act I, Scene 1, vv. 427-440)': 'trochaic-septenarius',
        '(Amphitruo, Act II, Scene 2, vv. 839-842)': 'trochaic-septenarius',
        '(Amphitruo, Act V, Scene 1, vv. 1107-1116)': 'trochaic-septenarius'
      } },
      'asinaria': { byCitation: {
        '(Asinaria, Act I, Scene 3, vv. 153-166)': 'trochaic-septenarius',
        '(Asinaria, Act II, Scene 4, vv. 491-503)': 'iambic-septenarius',
        '(Asinaria, Act III, Scene 3, vv. 591-602)': 'iambic-septenarius',
        '(Asinaria, Act IV, Scene 1, vv. 746-755)': 'iambic-senarius',
        '(Asinaria, Act V, Scene 1, vv. 830-841)': 'iambic-octonarius'
      } },
      'aulularia': { byCitation: {
        '(Aulularia, Prologue, vv. 1-12)': 'iambic-senarius',
        '(Aulularia, Act I, Scene 1, vv. 40-51)': 'iambic-senarius',
        '(Aulularia, Act III, Scene 5, vv. 475-484)': 'iambic-senarius',
        '(Aulularia, Act IV, Scene 9, vv. 713-720)': 'canticum',
        '(Aulularia, Act IV, Scene 10, vv. 740-752)': 'trochaic-septenarius'
      } },
      'bacchides': { byCitation: {
        '(Bacchides, Act I, Scene 1, vv. 44-77)': 'trochaic-septenarius',
        '(Bacchides, Act II, Scene 3, vv. 349-362)': 'iambic-senarius',
        '(Bacchides, Act III, Scene 1, vv. 368-381)': 'trochaic-septenarius',
        '(Bacchides, Act IV, Scene 9, vv. 925-945)': 'iambic-octonarius',
        '(Bacchides, Act V, Scene 2, vv. 1121-1126, 1145-1152)': 'canticum'
      } },
      'casina': { byCitation: {
        '(Casina, Act I, vv. 89-103)': 'iambic-senarius',
        '(Casina, Act II, vv. 217-227)': 'canticum',
        '(Casina, Act II, vv. 357-369)': 'trochaic-septenarius',
        '(Casina, Act III, vv. 621-633)': 'canticum',
        '(Casina, Act V, vv. 998-1010)': 'trochaic-septenarius'
      } },
      'menaechmi': { byCitation: {
        '(Menaechmi, Prologue, vv. 17-28)': 'iambic-senarius',
        '(Menaechmi, Act I, Scene 1, vv. 77-95)': 'iambic-senarius',
        '(Menaechmi, Act II, Scene 2, vv. 285-298)': 'iambic-senarius',
        '(Menaechmi, Act V, Scene 1, vv. 701-752)': 'iambic-senarius',
        '(Menaechmi, Act V, Scene 2, vv. 828-837, 840-842, 844-852)': 'trochaic-septenarius'
      } },
      'miles-gloriosus': { byCitation: {
        '(Miles Gloriosus, Act I, Scene 1, vv. 1-18)': 'iambic-senarius',
        '(Miles Gloriosus, Act II, Scene 2, vv. 221-234)': 'trochaic-septenarius',
        '(Miles Gloriosus, Act III, Scene 1, vv. 678-689)': 'trochaic-septenarius',
        '(Miles Gloriosus, Act IV, Scene 2, vv. 991-1004)': 'trochaic-septenarius',
        '(Miles Gloriosus, Act V, Scene 1, vv. 1424-1437)': 'trochaic-septenarius'
      } },
      'mostellaria': { byCitation: {
        '(Mostellaria, Act I, Scene 1, vv. 1-10)': 'iambic-senarius',
        '(Mostellaria, Act I, Scene 2, vv. 84-92)': 'canticum',
        '(Mostellaria, Act II, Scene 1, vv. 348-353)': 'trochaic-septenarius',
        '(Mostellaria, Act II, Scene 2, vv. 493-505)': 'iambic-senarius',
        '(Mostellaria, Act III, Scene 1, vv. 532-543)': 'iambic-senarius'
      } },
      'pseudolus': { byCitation: {
        '(Pseudolus, Act I, Scene 1, vv. 22-36)': 'iambic-senarius',
        '(Pseudolus, Act I, Scene 3, vv. 357-369)': 'trochaic-septenarius',
        '(Pseudolus, Act I, Scene 4, vv. 394-405)': 'iambic-senarius',
        '(Pseudolus, Act IV, Scene 2, vv. 963-977)': 'trochaic-septenarius',
        '(Pseudolus, Act V, Scene 2, vv. 1293-1306)': 'canticum'
      } },
      'truculentus': { byCitation: {
        '(Truculentus, Act I, Scene 1, vv. 22-34)': 'iambic-senarius',
        '(Truculentus, Act II, Scene 2, vv. 256-268)': 'trochaic-septenarius',
        '(Truculentus, Act II, Scene 5, vv. 448-460)': 'canticum',
        '(Truculentus, Act III, Scene 2, vv. 669-678)': 'iambic-senarius',
        '(Truculentus, Act IV, Scene 3, vv. 775-784)': 'trochaic-septenarius'
      } },
    },
    'publius-terentius-afer': {
      'andria': { byCitation: {
        '(Andria, Act I, Scene 1, vv. 115-126)': 'iambic-senarius',
        '(Andria, Act I, Scene 2, vv. 185-195)': 'iambic-octonarius',
        '(Andria, Act III, Scene 2, vv. 471-480)': 'iambic-senarius',
        '(Andria, Act III, Scene 3, vv. 550-555)': 'iambic-senarius',
        '(Andria, Act V, Scene 3, vv. 889-903)': [{ m: 'iambic-senarius', from: 889, to: 895 }, { m: 'trochaic-septenarius', from: 896, to: 903 }]
      } },
      'hecyra': { byCitation: {
        '(Hecyra, Prologue, vv. 33-45)': 'iambic-senarius',
        '(Hecyra, Act I, Scene 1, vv. 58-70)': 'iambic-senarius',
        '(Hecyra, Act IV, Scene 2, vv. 585-594)': 'iambic-octonarius',
        '(Hecyra, Act V, Scene 1, vv. 750-760)': [{ m: 'iambic-octonarius', from: 750, to: 750 }, { m: 'trochaic-septenarius', from: 751, to: 751 }, { m: 'iambic-octonarius', from: 752, to: 754 }, { m: 'trochaic-septenarius', from: 755, to: 760 }],
        '(Hecyra, Act V, Scene 3, vv. 833-840)': 'iambic-septenarius'
      } },
      'heauton-timorumenos': { byCitation: {
        '(Heautontimorumenos, Act I, scene 1, vv. 75-87)': 'iambic-senarius',
        '(Heautontimorumenos, Act I, Scene 1, vv. 93-101)': 'iambic-senarius',
        '(Heautontimorumenos, Act II, Scene 1, vv. 213-219)': 'iambic-octonarius',
        // vv. 668-677 are octonarii; v. 678 is set out by editors as two
        // shorter lines (a catalectic quaternarius and a senarius), so it is
        // left out of the label rather than called something it is not.
        '(Heautontimorumenos, Act IV, Scene 2, vv. 668-678)': [{ m: 'iambic-octonarius', from: 668, to: 677 }],
        '(Heautontimorumenos, Act V, Scene 1, vv. 915-923)': 'iambic-senarius'
      } },
      'eunuchus': { byCitation: {
        '(Eunuchus, Prologue, vv. 23-34)': 'iambic-senarius',
        '(Eunuchus, Act II, Scene 2, vv. 247-254)': 'trochaic-septenarius',
        '(Eunuchus, Act IV, Scene 5, vv. 727-732)': 'iambic-octonarius',
        '(Eunuchus, Act IV, Scene 7, vv. 771-782)': 'iambic-octonarius',
        '(Eunuchus, Act V, Scene 9, vv. 1084-1094)': 'trochaic-septenarius'
      } },
      'phormio': { byCitation: {
        '(Phormio, Prologue, vv. 1-11)': 'iambic-senarius',
        '(Phormio, Act II, Scene 1, vv. 201-206)': 'trochaic-septenarius',
        '(Phormio, Act II, Scene 4, vv. 447-459)': 'iambic-senarius',
        '(Phormio, Act III, Scene 2, vv. 317-328)': 'trochaic-septenarius',
        '(Phormio, Act V, Scene 9, vv. 1040-1055)': 'trochaic-septenarius'
      } },
      'adelphoe': { byCitation: {
        '(Adelphoe, Prologue, vv. 6-21)': 'iambic-senarius',
        '(Adelphoe, Act I, Scene 1, vv. 64-77)': 'iambic-senarius',
        '(Adelphoe, Act I, Scene 2, vv. 112-121)': 'iambic-senarius',
        '(Adelphoe, Act IV, Scene 2, vv. 428-434)': 'iambic-senarius',
        '(Adelphoe, Act V, Scene 4, vv. 866-879)': 'trochaic-septenarius'
      } },
    },
    // Caecilius is not in Moore's database - he survives only in quotations -
    // so these come from the scanner, which leaves one metre standing for every
    // line, and agree with what Gellius says he is doing. Two fragments are
    // left unlabelled on purpose: the long Plocium quotation at II.23.10 turns
    // from trochaic septenarii to senarii partway and has no verse numbers to
    // mark the turn by, and the single line in Tusculanae III.56 is long enough
    // to be any of four metres.
    'caecilius-statius': {
      'plocium': { byCitation: {
        // The monologue turns from the long accompanied line into spoken
        // senarii at its ninth line: lines III, IV and VII cannot be senarii at
        // all, and lines IX to XIV cannot be septenarii, so the change falls
        // between VIII and IX. The ranges are the app's own numerals, printed on
        // the Latin, because Caecilius has no verse numbers of his own.
        '(Plocium, in Gellius, Noctes Atticae II.23.10)': [{ m: 'trochaic-septenarius', from: 'I', to: 'VIII' }, { m: 'iambic-senarius', from: 'IX', to: 'XV' }],
        '(Plocium, in Gellius, Noctes Atticae II.23.13)': 'iambic-senarius',
        '(Plocium, in Gellius, Noctes Atticae II.23.21)': 'iambic-senarius',
        '(Plocium, in Donatus, ad Andriam IV.5.10)': 'iambic-senarius',
        '(Plocium, in Nonius, De Compendiosa Doctrina 314.21)': 'iambic-senarius'
      } },
      'other': { byCitation: {
        '(Incertae fabulae, in Cicero, De Senectute 25)': 'iambic-senarius',
        '(Synephebi, in Cicero, Tusculanae Disputationes I.31)': 'iambic-senarius'
      } }
    },

    // Catullus is polymetric, and each of the three excerpts is a whole poem,
    // so each has one answer.
    'gaius-valerius-catullus': {
      'catullus-carmina': {
        byCitation: {
          '(Liber, Carmen 3)': 'phalaecian-hendecasyllable',
          '(Liber, Carmen 101)': 'elegiac-couplets',
          '(Liber, Carmen 64, vv.1-7)': 'dactylic-hexameter'
        }
      }
    }
  };

  /* ==================================================================
     2. Metres named on excerpts but with no page yet. They render as plain
        text, so a reader can tell at a glance which names lead somewhere.
   * ================================================================== */
  var STUBS = {
    // Empty since v1.15.1: every metre named on an excerpt now has a page.
    // A metre goes in here when it is named on an excerpt before its page is
    // written, so that the tablet can show it as plain text in the meantime.
  };

  /* ==================================================================
     3. The reference pages.
   * ================================================================== */
  var METRES = {

    'dactylic-hexameter': {
      name: 'Dactylic Hexameter',
      tagline: 'The metre of epic, of didactic poetry and of satire, and the longest-lived verse form in European literature.',
      scheme: '– ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – ×',
      schemeNote: 'Any of the first four feet may be a spondee (– –) instead. The fifth is nearly always a dactyl, and the sixth is always two syllables.',

      origin: [
        'The name describes the thing. A *hexameter* is a line of six measures, and *dactylic* comes from the Greek *daktylos*, a finger, which has one long joint and two short ones: that is the shape of the foot, one long syllable followed by two short ones. Every Latin schoolchild was taught the metre by being shown a hand.',
        'It is Greek, and it is older than any Greek we can read. Homer is already using it in the eighth century BC, completely formed, with a system of ready-made phrases built to fit its slots - which is the sign of a metre that had been in oral use for a very long time before anybody wrote it down. It was also the verse of the Delphic oracle, so from the beginning it carried authority as well as grandeur.',
        '**The important thing about it is that it counts time, not stress.** English metre is built on which syllables you hit harder; Greek and Latin metre is built on how long each syllable takes to say. A syllable is *long* if it has a long vowel or a diphthong, or if its vowel is followed by two consonants; otherwise it is *short*. A long counts as two shorts, exactly, and the whole system is arithmetic.',
        '**Latin did not take to it easily.** Latin has more long syllables than Greek and a heavy word accent that pulls against the metrical pattern, so the early results sound forced. What Rome had instead was the *Saturnian*, the native Italic verse, which nobody has fully explained even now: Livius Andronicus used it for his translation of the Odyssey and Naevius for his Punic War, and both of those are in this app.',
        '**Then Ennius, some time around 180 BC, wrote the Annales in hexameters and ended the argument.** He did it as a deliberate programme, announcing that Homer\'s soul had passed into him, and he dropped the Saturnian so completely that Naevius\' epic came to look antique within one generation. Every Latin epic after him is in hexameters, and so is every didactic poem, every satire from Lucilius onwards, and eventually all of pastoral.',
        'From there the story is one of polishing. Lucilius makes it carry conversation, Lucretius makes it carry argument, Catullus and the neoterics make it carry Alexandrian ornament - and after the authors in this app, it goes on to become the metre of the *Aeneid*, of the *Metamorphoses* and of the Satires of Horace. Those poets are not in the app yet; when they are, they will be added here.'
      ],

      build: [
        '**Six feet to the line.** A foot is either a **dactyl**, one long and two shorts (– ⏑ ⏑), or a **spondee**, two longs (– –). The two are interchangeable because they take the same time: four *morae*, counting a long as two and a short as one. That single fact is what gives the metre its freedom.',
        '**The first four feet are free.** Any of them may be a dactyl or a spondee, in any combination, which is sixteen possible openings.',
        '**The fifth foot is almost always a dactyl.** A spondee there is called a *spondeiazon*, and it is rare enough that when it happens you are meant to notice - it is a Greek mannerism, and the neoteric poets use it to sound learned.',
        '**The sixth foot is always two syllables**, and the last syllable counts as long whether it is or not. This is the rule called *brevis in longo*: the pause at the end of the line fills out the time. So the close is – – or – ⏑, and either way it is heard as the same cadence.',
        'A line therefore runs between **twelve syllables** (all spondees) and **seventeen** (all dactyls), and takes the same time to say either way.',
        '**The caesura is the break inside a foot where a word ends**, and it is what stops the line falling into six equal lumps. The commonest by far is the **penthemimeral**, after the first syllable of the third foot - that is, after five half-feet, which is what the name says. The alternatives are the *trithemimeral* (after the first syllable of the second foot) and the *hephthemimeral* (after the first syllable of the fourth). A line can have more than one; the strongest one is the one your voice uses.',
        '**Elision is constant and takes some getting used to.** A word ending in a vowel, or in a vowel plus *m*, loses that ending before a word beginning with a vowel or *h*. *Albine est* is three syllables, not four. Nothing is written differently; you simply do not pronounce the elided syllable, and if you count it the line will not scan.',
        'Two smaller effects worth knowing: **hiatus**, where an elision that should happen does not, usually at a strong pause; and **synizesis**, where two vowels inside one word are run together into a single syllable - *cui* in Catullus is one syllable, not two.'
      ],

      sound: [
        '**Read it for length, not for stress.** The single most common mistake is to thump the first syllable of each foot as though it were an English metre. What you want instead is to hold the long syllables roughly twice as long as the short ones and let the rhythm come out of that. A line of spondees and a line of dactyls occupy the same amount of time; the difference is how many syllables are crammed into it.',
        '**So the pace changes constantly, and that is the point.** Spondees make the line heavy and slow; dactyls make it run. A poet who wants delay writes spondees, and a poet who wants speed writes dactyls, and because the choice is free in four feet out of six this can be done line by line, or within a line.',
        '**Every line ends the same way, and that is also the point.** Because the fifth foot is a dactyl and the sixth two syllables, the last five syllables almost always go – ⏑ ⏑ – ×. That fixed cadence is what makes a hexameter recognisable as one however much the opening varies, and it is why the ear can take five feet of freedom without losing its place.',
        '**The caesura is where you breathe**, and where the word accent and the metrical beat, which have been pulling against each other through the middle of the line, come back into agreement near the end. That tension and release across the line is the effect a Latin hexameter has and a Greek one does not, because Latin has the stronger word accent.',
        'Read aloud, a run of hexameters does not sound like a drumbeat. It sounds like speech with a long swell in it, arriving at the same closing figure every time.'
      ],

      usedIntro: [
        '**Epic first**, because that is what it was for: Ennius, and then everything after him. **Didactic poetry** takes it next, since a poem that teaches wants the authority of epic - that is Lucretius. **Satire** takes it in a quite different spirit, Lucilius using the epic measure for talk, gossip and abuse, which is part of the joke. **The learned short epic**, the *epyllion*, uses it for ornament rather than for scale, which is Catullus 64.',
        'The four poets below are the ones in this app, and they happen to be the whole Republican history of the metre, from the year it arrived in Latin to the year before the Augustans took it over.'
      ],

      examples: [
        {
          author: 'Quintus Ennius',
          slug: 'quintus-ennius', era: 'archaic',
          where: 'Annales, Book IX',
          gloss: 'The first Latin hexameters, on Fabius the Delayer',
          plain: 'Unus homo nobis cunctando restituit rem.',
          source: 'bank',
          marked: 'Ūnŭs hŏ|mō nō|bīs ‖ cūnc|tāndō | rēstĭtŭ|īt rĕm.',
          pattern: '– ⏑ ⏑ | – – | – ‖ – | – – | – ⏑ ⏑ | – ×',
          notes: [
            '**Three spondees in a row, in feet two, three and four.** The line is famously slow, and it is slow on purpose: the word it is built around is *cunctando*, "by delaying", and the metre delays with it. One man, by holding back, restored the state - and the verse takes its time saying so.',
            '**Ennius\' hexameter is still visibly under construction.** He allows himself things later poets rule out, he is fond of heavy spondaic lines like this one, and his word-endings often coincide with his foot-endings, which makes the joints audible. Where a later poet hides the machinery, Ennius lets you hear it working.',
            'The one archaism to watch in this line is *restituīt*: in the perfect the ending *-it* was originally long, and Ennius still uses the old quantity, which is what lets the last foot close properly.'
          ]
        },
        {
          author: 'Gaius Lucilius',
          slug: 'gaius-lucilius', era: 'archaic',
          where: 'Saturae, on what virtue is',
          gloss: 'The epic measure turned to conversation',
          plain: 'Virtus, Albine, est pretium persolvere verum',
          source: 'bank',
          marked: 'Vīrtūs, | Ālbīn(e), | ēst ‖ prĕtĭ|ūm pēr|sōlvĕrĕ | vērŭm',
          pattern: '– – | – – | – ‖ ⏑ ⏑ | – – | – ⏑ ⏑ | – ×',
          notes: [
            '**The same metre, doing the opposite job.** This is a man talking to a friend by name, in ordinary words, about an abstract question - and it is in the verse of the *Annales*. Satire in Latin begins by borrowing the grandest measure available and using it for dinner-table argument, and the mismatch is deliberate.',
            '**Two spondees to open**, which slows the line down into something deliberate rather than grand, and then the address *Albine* placed where an epic poet would put a proper name for weight. Lucilius gets his effects from putting plain vocabulary into the epic slots.',
            '**The elision is the thing to practise here.** *Albine est* is written as four syllables and read as three: the final *-e* disappears before *est*. Print it as *Ālbīn(e)* and the foot comes out as a clean spondee.',
            'Lucilius only arrives at this metre in mid-career. His earliest satires, Books 26 to 29, use the older measures - trochaic septenarii and iambic senarii - and he is writing hexameters from Book 30 onwards. Two of those early trochaic pieces are also in this app: the same poet, before he had decided what satire sounded like.'
          ]
        },
        {
          author: 'Titus Lucretius Carus',
          slug: 'titus-lucretius-carus', era: 'caesar',
          where: 'De Rerum Natura I, v. 1',
          gloss: 'The measure made to carry an argument',
          plain: 'Aeneadum genetrix, hominum divomque voluptas,',
          source: 'bank',
          marked: 'Aenĕă|dūm gĕnĕ|trīx, ‖ hŏmĭ|nūm dī|vōmquĕ vŏ|lūptās,',
          pattern: '– ⏑ ⏑ | – ⏑ ⏑ | – ‖ ⏑ ⏑ | – – | – ⏑ ⏑ | – ×',
          notes: [
            '**Four dactyls, and the poem opens at a run.** Lucretius saves this for the hymn to Venus at the start; it is not how most of his poem moves.',
            '**Across the six books his line is noticeably heavier than what came after him.** He uses more spondees than the Augustans, elides more often, and reaches for archaic forms - *divom* here for *divorum* - which are useful to him precisely because they are long and fill a foot. The effect is a verse that sounds older than it is, and deliberately so: he is writing a didactic epic in the tradition of Ennius, not a modern poem.',
            '**What is really distinctive is that he writes in sentences, not in lines.** A Lucretian argument runs over ten or fifteen verses with the syntax carrying straight across the line-ends, so the metre has to hold together a structure it was never designed for - subordinate clauses, technical vocabulary, *quod si* and *praeterea* and *nimirum*. He also repeats whole lines verbatim when the argument needs them again, which is an epic habit put to a philosopher\'s use.',
            'And he complains about the difficulty. Twice he says the *egestas linguae*, the poverty of the language, forces him to coin words - and the metre is half the problem, because a technical term that will not scan cannot be used at all.'
          ]
        },
        {
          author: 'Gaius Valerius Catullus',
          slug: 'gaius-valerius-catullus', era: 'caesar',
          where: 'Carmen 64, v. 1',
          gloss: 'The measure as ornament, in the learned short epic',
          plain: 'Peliaco quondam prognatae vertice pinus',
          source: 'bank',
          marked: 'Pēlĭă|cō quōn|dām ‖ prō|gnātae | vērtĭcĕ | pīnŭs',
          pattern: '– ⏑ ⏑ | – – | – ‖ – | – – | – ⏑ ⏑ | – ×',
          notes: [
            '**A Greek proper name takes up the whole first foot and part of the second.** *Peliaco* - "of Mount Pelion" - is exactly the sort of learned geographical adjective the neoterics loved, and placing it first is a signal: this is going to be an Alexandrian poem, allusive and ornamental, not a national epic.',
            '**Three spondees in the middle** make the line grave, and Catullus is doing here what Ennius did by instinct, but by choice and for effect.',
            '**The fifth foot here, though, is an ordinary dactyl** - *vērtĭcĕ* - and the line closes the way almost every Latin hexameter closes. The trick Catullus is famous for is the opposite of that, and it is the next example.',
            '**The word order is the other half of the technique.** *Peliaco ... vertice* wraps a whole clause between an adjective and its noun, and *prognatae ... pinus* does the same again, interlocking. That is a pattern the metre encourages, because separating an adjective from its noun lets you put each one where the rhythm wants it.'
          ]
        },
        {
          author: 'Gaius Valerius Catullus',
          slug: 'gaius-valerius-catullus', era: 'caesar',
          where: 'Carmen 64, v. 3',
          gloss: 'The spondaic fifth foot, which is his signature',
          plain: 'Phasidos ad fluctus et fines Aeetaeos,',
          source: 'bank',
          marked: 'Phāsĭdŏs | ād flūc|tūs ‖ ēt | fīnēs | Aeē|taeōs,',
          pattern: '– ⏑ ⏑ | – – | – ‖ – | – – | – – | – ×',
          notes: [
            '**Look at the fifth foot: two longs, where the metre wants a dactyl.** This is the *spondeiazon*, and it is the single most recognisable thing about Catullus\' hexameter. Everybody else keeps the fifth foot dactylic, because that running – ⏑ ⏑ – × is what makes the end of a line sound like a hexameter at all. Put a spondee there and the run is taken out of it: the verse lands heavily, and you notice.',
            '**It is not something the words did to him; it is chosen.** The line ends on *Aeetaeos*, a four-syllable Greek proper name, and that is the usual recipe - reach for a Greek word long enough to fill the last two feet, so that the un-Latin rhythm and the un-Latin vocabulary arrive together. Of the seven verses of this poem the app carries, this is the one that does it.',
            '**And everything before it is heavy too.** Feet two, three and four are all spondees, so by the time the fifth arrives the ear has not had a dactyl since the first foot: six syllables of the line are short and the other seven are long. Catullus uses this close freely in Carmen 64 and far more often than any other Latin poet; Virgil, by comparison, allows himself it only a handful of times in the whole *Aeneid*.'
          ]
        },
      ],

      after: 'The metre does not stop with these four. It goes on to the *Aeneid*, to Horace\'s Satires and Epistles, to Ovid\'s *Metamorphoses* and to every later Latin epic - and out of Latin into English, where Longfellow\'s *Evangeline* and Clough\'s *Bothie* are attempts at the same six feet. Those poets are not in this app yet. When they are added, their examples will be added here.'
    },

    'phalaecian-hendecasyllable': {
      name: 'Phalaecian Hendecasyllable',
      tagline: 'Eleven syllables, quick and unstoppable: the metre Catullus reached for more often than any other.',
      scheme: '× × | – ⏑ ⏑ | – ⏑ | – ⏑ | – ×',
      schemeNote: 'The first two syllables are the aeolic base, free in principle; Catullus makes them a spondee (– –) almost every time.',

      origin: [
        'The name is two names. *Hendecasyllable* is simply Greek for "eleven syllables", which is what the line has, every time, with no substitutions allowed to change the count. *Phalaecian* is after Phalaecus, a Greek epigrammatist of the fourth or third century BC who used it often enough to get it named after him - though the metre is much older than he is, and turns up in Sappho and Anacreon centuries earlier.',
        '**It belongs to the aeolic family**, which works quite differently from the dactylic one. A dactylic metre counts *time* and lets you swap a long for two shorts freely; an aeolic metre fixes a *pattern of syllables* and leaves almost nothing free. That is why the hendecasyllable is always eleven syllables, where a hexameter is anywhere between twelve and seventeen.',
        '**In Latin it is essentially Catullus\' invention as a serious form.** He did not write the first Latin hendecasyllables, but he wrote enough of them, and well enough, that the metre became his: something over forty of the poems in the collection are in it, far more than in anything else he used. When a Roman thought of the metre afterwards, they thought of him.',
        'It was the vehicle for the kind of poem Rome had not really had before - short, personal, occasional, funny, obscene, addressed to a named friend or enemy. Catullus calls these pieces *nugae*, trifles, which is a pose: the metre is doing exactly what he wants it to do.',
        'After him it passes to Martial, who uses it for epigram, to Statius in the *Silvae*, and to the younger Pliny, who wrote some and apologised for them in a letter. None of those authors is in this app yet; when they are, they will be added here.'
      ],

      build: [
        '**Eleven syllables, in a fixed pattern.** Unlike the hexameter, you cannot substitute one foot for another to change the length: the line is the same shape every time.',
        '**The first two syllables are the aeolic base.** In Greek they are genuinely free - two longs, or a long and a short either way round. **Catullus almost always makes them a spondee**, two longs, which is why his hendecasyllables have a firm, planted opening rather than a hesitant one. The handful of places where he uses an iamb or a trochee instead are early poems, and the variation disappears.',
        '**Then a dactyl** (– ⏑ ⏑), in the third, fourth and fifth positions. This is the engine of the line: one long followed by two quick syllables, which throws the rhythm forward.',
        '**Then two trochees** (– ⏑, – ⏑), which keep it going at the same speed.',
        '**Then a final long, with the last syllable anceps** - long or short, counted as long because of the line-end pause, exactly as in the hexameter.',
        '**There is no fixed caesura.** This is the structural difference that matters most, and it is easy to skip over. A hexameter has a designed breathing point in the middle; the hendecasyllable has none, so the line is meant to be taken in one breath from end to end. Word-breaks fall wherever the sentence puts them.',
        '**Elision works as it does everywhere else in Latin verse**: a final vowel, or a final vowel plus *m*, disappears before a word beginning with a vowel or *h*. Because the syllable count is fixed and small, an elision is very audible here - it is the one thing that can make the line feel crowded.'
      ],

      sound: [
        '**Fast, level, and hard to stop.** The dactyl near the beginning sets it running and the two trochees keep it running, and with no caesura to break the line there is nowhere to pause until the end. Read a few in a row and the effect is close to a nursery rhyme or a skipping song - which is precisely why it suits a poet writing in an offhand, talking voice.',
        '**It is also very short.** Eleven syllables is about half a hexameter, so a thought has to be complete, or nearly complete, inside one line or two. That forces the pointed, epigrammatic phrasing the form is known for, and it is why the metre travelled so naturally to Martial.',
        '**The fixed opening does a lot of work.** Because the first two syllables are nearly always two longs, every poem starts on the same firm footing before the dactyl lets go - a small hesitation, then a run. Once your ear has the shape it is unmistakable, and Catullus exploits that: he can begin a poem mid-conversation and the metre supplies the frame.',
        '**And it is unsuited to grandeur, which is the joke.** You cannot be solemn for long in a line this quick. When Catullus does turn it to something sad, as in the lament for the sparrow, the effect comes from the mismatch between the skipping rhythm and the subject, not from the metre doing anything different.'
      ],

      usedIntro: [
        'It is the metre of the *polymetrics*, Catullus 1 to 60: dedications, invitations, insults, love poems, poems about bad poets and stolen napkins. Later it is above all the metre of epigram.',
        'Catullus is the only poet in the app who uses it, so both examples are his - deliberately chosen from the two ends of his range, a programmatic dedication and a mock-lament.'
      ],

      examples: [
        {
          author: 'Gaius Valerius Catullus',
          slug: 'gaius-valerius-catullus', era: 'caesar',
          where: 'Carmen 1, v. 1',
          gloss: 'The dedication that opens the collection',
          plain: 'Cui dono lepidum novum libellum',
          source: 'catullus',
          marked: 'Cui dō|nō lĕpĭ|dūm nŏ|vūm lĭ|bēllŭm',
          pattern: '– – | – ⏑ ⏑ | – ⏑ | – ⏑ | – ×',
          notes: [
            '**The textbook shape of the line**: spondee, dactyl, trochee, trochee, and a two-syllable close. If you learn one hendecasyllable by heart, learn this one.',
            '**The first word is a trap.** *Cui* looks like two syllables and is one: the *u* and the *i* run together into a single long syllable, which is *synizesis*. Count it as two and the line has twelve syllables and does not scan.',
            '**Three light words in eleven syllables** - *lepidum*, *novum*, *libellum* - and the last of them is a diminutive: not a book but a little book. The metre and the vocabulary are doing the same thing, making the poem sound slight on purpose, in a dedication that is actually a manifesto.',
            'Notice how the line runs straight through without a break. There is nowhere in it where the voice naturally stops, which is what the absence of a caesura means in practice.'
          ]
        },
        {
          author: 'Gaius Valerius Catullus',
          slug: 'gaius-valerius-catullus', era: 'caesar',
          where: 'Carmen 3, v. 1',
          gloss: 'The mock-lament for Lesbia\'s sparrow',
          plain: 'Lugete, o Veneres Cupidinesque,',
          source: 'bank',
          marked: 'Lūgē|t(e), ō Vĕnĕ|rēs Cŭ|pīdĭ|nēsquĕ,',
          pattern: '– – | – ⏑ ⏑ | – ⏑ | – ⏑ | – ×',
          notes: [
            '**The same pattern, with an elision in it.** *Lugete o* is written as four syllables and read as three: the final *-e* of *Lugete* disappears before *o*. That elision falls right on the join between the base and the dactyl, so the line accelerates a syllable earlier than the eye expects.',
            '**An imperative of mourning, in a skipping metre.** *Lugete* is the word you would use to open a real lament, and the plural gods invoked are the Venuses and Cupids rather than anything funerary. The whole poem depends on that gap between the weight of the language and the lightness of the verse: it is a parody of a funeral song, and also, somehow, a real one.',
            '**Both proper nouns are plural**, which is unusual and part of the effect - a crowd of little love-gods summoned to mourn a bird. Each fills its slot exactly, which is the other reason the line sounds so settled.'
          ]
        }
      ],

      after: 'The later Latin hendecasyllabists - Martial above all, then Statius and the younger Pliny - are not yet in this app. Their examples will be added here when they are.'
    },

    'saturnian': {
      name: 'Saturnian',
      tagline: 'Rome\'s own verse, from before the Greek metres arrived - and the one nobody has managed to explain.',
      scheme: '× × × × × × × ‖ × × × × × ×',
      schemeNote: 'Seven syllables, a break, then six: that is the shape of the classic line. The anceps marks are honest rather than lazy - which of those syllables are long is exactly what is in dispute.',

      origin: [
        'The Romans called it the *Saturnius numerus*, the verse of Saturn: the measure of the golden age, from before anybody had heard of Greece. Whether or not that is history, it tells you how they thought of it - as theirs, and as old.',
        '**It is the metre of the first two works of Latin literature.** Livius Andronicus used it around 240 BC for the *Odusia*, his translation of the Odyssey, and Naevius used it for the *Bellum Poenicum*, the first Roman national epic. Both poets are in this app, and both examples below are theirs.',
        '**It was not only a literary metre.** The oldest substantial Latin inscriptions are in it: the epitaphs of the Scipios, cut into the stone of the family tomb on the Via Appia, and a number of dedications and triumphal notices. So this was the verse a Roman would meet on a monument, not only in a book - which is worth remembering when you read the Naevius epitaph below.',
        '**Where it came from, nobody knows.** Either it is genuinely inherited, an Italic verse form with a distant common ancestor somewhere behind it and the Greek metres, or it was borrowed early and reshaped beyond recognition. There is no external evidence either way, and the argument has run for two hundred years.',
        '**How it died is much clearer.** Ennius wrote the *Annales* in Greek hexameters around 180 BC and made a programme of it, dismissing his predecessors\' verse as the stuff of *Fauni vatesque*, fauns and soothsayers. It worked. Within a generation the Saturnian was archaic; within two it was extinct as a literary metre, and no Latin poet ever went back to it.',
        '**About a hundred and thirty lines survive**, most of them quoted by late grammarians who were interested in a word rather than in the verse, and many of them textually damaged. That is the root of everything on this page: the corpus is too small and too battered to settle an argument with.'
      ],

      build: [
        '**Start with what is agreed, because it is not much.** The line falls into two parts with a break between them; word-end always coincides with that break; and the classic shape is seven syllables and then six. Both examples below are exactly 7 and 6.',
        '**After that the field divides.** The *quantitative* school treats it as a metre like the Greek ones, built on syllable length, and writes it as a schema of longs and ancipitia. The difficulty is that the surviving lines will not all fit whatever schema is proposed, and the theory has to emend the text to rescue itself - which is circular.',
        '**The accentual school treats it as a verse of beats**, three in the first colon and two in the second, of the kind familiar from Germanic alliterative verse and from later popular Latin. The difficulty there is that the Latin word accent of the third century BC is itself reconstructed, so the theory is testing one uncertainty against another.',
        '**A third position says it is a syllable-counting verse** with a fixed break and some constraint on how each half ends, and that this is simply all that can be recovered. That is the position this page takes, not out of conviction but because it is the only one that does not require asserting something disputed.',
        '**What can be observed without taking a side** is worth having. The break is real and always falls at a word end. Alliteration is extremely heavy and looks structural rather than decorative - it binds the two halves to each other. And the halves are very often syntactically parallel, so the sense divides where the line divides.',
        '**Which is why each example below is given twice.** Once read for quantity, with the syllable lengths marked exactly as they would be in a hexameter, and once read for stress, with the ordinary Latin word accent marked. Neither is offered as the answer. Set side by side they show, in two lines, why two centuries of argument have not produced one - and they are more instructive than either reading alone, because they do not agree with each other. The short version, before you read them: the Livius line comes out well formed on both readings, and the Naevius line on neither.'
      ],

      sound: [
        '**You can hear the shape without resolving the argument.** Two blocks, roughly equal, with a pause between them. It does not flow the way a hexameter flows; it comes in pairs, and the second half answers the first.',
        '**The alliteration does a great deal of the work.** In a metre whose rules are loose, sound-patterning is what tells the ear that this is verse: *immortales mortales*, *fas flere*, *flerent*. Read the Naevius epitaph aloud and the f-sounds hold the whole thing together.',
        '**The effect is closer to a proverb or a legal formula than to epic.** That is entirely consistent with where the metre is actually found - on tombs, on dedications, in the solemn public register - and it is part of why it could not survive contact with the hexameter, which can run on for a paragraph.',
        '**To a Roman of Cicero\'s day it sounded antique and countrified**, the way a Latin reader of the first century BC found everything before Ennius quaint. That judgement has stuck, and it is worth resisting a little: these are the first two poems in Latin, and the second of them is an epic about a war its author had fought in.'
      ],

      usedIntro: [
        'Two epics, the *Odusia* and the *Bellum Poenicum*; the epitaphs of the Scipios; dedications and triumphal inscriptions. That is essentially the whole list.',
        'Both surviving poets are in this app, so both examples are genuine Saturnians rather than reconstructions. Each is given twice over, once by quantity and once by stress, so that the two competing readings of the same line can be compared directly.'
      ],

      examples: [
        {
          author: 'Livius Andronicus',
          slug: 'livius-andronicus', era: 'archaic',
          where: 'Odusia, fr. I.1',
          gloss: 'The first line of Latin literature, read both ways',
          plain: 'Virum mihi, Camena, insece versutum.',
          source: 'bank',
          readings: [
            {
              label: 'metre.reading.quantitative',
              marked: 'Vĭrūm mĭhī, Cămēnă, ‖ īnsĕcĕ vērsūtŭm.',
              pattern: '⏑ – ⏑ – ⏑ – ⏑ ‖ – ⏑ ⏑ – – ×',
              note: 'Marked for length, exactly as a hexameter would be marked, the first half comes out **⏑ – ⏑ – ⏑ – ⏑**: a clean alternation, three iambs and one syllable over, which is very close to what the quantitative school says a Saturnian colon ought to look like. Two of those longs repay a second look. The *-um* of *virum* is long **by position**, because the *m* of *mihi* closes the syllable and not because the *u* is long; and the final *-i* of *mihi* is one of those early Latin vowels that goes both ways, long by origin and short by the iambic shortening already at work in Plautus. Take it long and the colon is a textbook line. Take it short and the alternation falls apart. **So the best evidence for the theory here sits on a syllable the theory would like to be able to choose.** The second half does not alternate at all. Note also the **hiatus** at the break: *Camena, insece* would elide anywhere else in Latin verse and here does not, which is normal in Saturnians and is itself an argument that the break is a real structural boundary.'
            },
            {
              label: 'metre.reading.accentual',
              marked: 'Vírum míhi, Caména, ‖ ínsece versútum.',
              pattern: '´ ´ ´ ‖ ´ ´',
              note: 'Marked for stress instead - accent the second-last syllable if it is heavy, otherwise the third-last, and a word of two syllables on its first - the line gives **three beats and then two**. That is precisely the 3 ‖ 2 the accentual theory predicts, and read aloud that way it does sound like verse rather than like a sentence. This is why the theory has never gone away. **But look at where the beats fall.** *Vírum* and *míhi* are stressed on syllables the quantitative reading counts short, so of the three beats in the first half only *Caména* lands on a long. Both readings give a well-formed line and they agree about almost nothing, which is the difficulty of this metre in a single verse.'
            }
          ],
          notes: [
            '**This is where Latin literature begins**, as far as we can see it: the opening of the Odyssey, put into Latin for a Roman audience around 240 BC by a man who had probably arrived in Rome as a prisoner of war.',
            '**Look at what he does with Homer\'s first line.** The Muse becomes *Camena*, an Italian spring-goddess. He is not translating the divinity, he is replacing it with a local one - which is exactly the same decision as writing the poem in the native metre instead of the Greek one. The Latin and the Greek forms are made to match each other at every level except the surface.',
            '**And then one word pulls the other way.** *Insece*, "tell", is an archaic imperative and it is cognate with the Greek *ennepe* that opens Homer\'s line. So the sentence is Roman in its metre and its gods and Greek in its bones, which is a fair description of the whole of early Latin literature.'
          ]
        },
        {
          author: 'Gnaeus Naevius',
          slug: 'gnaeus-naevius', era: 'archaic',
          where: 'Epitaphium, fr. 67, v. I',
          gloss: 'The epitaph he is said to have written for himself - and the line that breaks both theories',
          plain: 'immortales mortales si foret fas flere,',
          source: 'bank',
          readings: [
            {
              label: 'metre.reading.quantitative',
              marked: 'īmmōrtālēs mōrtālēs ‖ sī fŏrēt fās flērĕ,',
              pattern: '– – – – – – – ‖ – ⏑ – – – ×',
              note: '**Seven long syllables in a row**, and then a second colon nearly as heavy: two short syllables in the whole line of thirteen. The number looks like a slip, so it is worth taking apart. Four of the seven are long **by nature**, the *-a-* and the *-es* of *mortales*, counted twice because the word is said twice; the other three are long **by position** only, *im-* closed by its own double *m* and each *mor-* closed by its *r*. Saying the same word twice is what builds the block. In the second half only *fo-* is short: *-ret* is long by position before the *f* of *fas*, which is easy to miss. And then the point stands. Nothing in Greek or Latin quantitative metre produces a line like this, and if the Saturnian is a quantitative measure its schema has to be loose enough to accept very nearly anything - which is the central objection to the quantitative case, made here by a single verse.'
            },
            {
              label: 'metre.reading.accentual',
              marked: 'immortáles mortáles ‖ si fóret fás flére,',
              pattern: '´ ´ ‖ ´ ´ ´',
              note: 'By stress the same line gives **two beats and then three** - the exact reverse of the Livius line, where the identical rule gave three and then two. The theory that worked a moment ago does not work here. And the count itself rests on a decision you should watch being made: *fóret*, *fas* and *flére* are taken as three beats, with *si* left unstressed as the proclitic conjunction it is. Count *si* too and the second half has four. **The accentual theory has to rule on monosyllables before it can count at all**, and nothing in the evidence makes that ruling for it. Two lines are not a sample, but they are a fair demonstration of the difficulty: **every reading of the Saturnian works somewhere and fails somewhere else**, and there is not enough surviving verse to decide between them.'
            }
          ],
          notes: [
            '**The same 7 and 6 as the Livius line**, from the other surviving Saturnian poet - and this one is a self-composed epitaph, the metre used for exactly the purpose it was used for on real tombstones.',
            '**The first half is one word said twice.** *Immortales mortales*: the same stem, once with the negative prefix and once without, immortals and mortals set side by side with nothing between them. It is the whole thought of the poem compressed into the first colon, and it is also why that colon is seven longs deep - the repetition builds it out of heavy syllables.',
            '**The second half turns to alliteration**, *si foret fas flere*, and the f-sound carries straight over into the line that follows, *flerent divae Camenae*. In a verse form whose rules nobody can state, this is the binding: the ear is held by sound-patterning where a Greek metre would hold it by quantity.',
            'The boast underneath is not small. If it were right for immortals to weep for mortals, says Naevius, the divine Camenae would weep for him - and once he had been handed over to the treasury of Orcus, Rome forgot how to speak Latin.'
          ]
        }
      ],
      after: 'Nothing later is written in it. The Saturnian is the one Latin metre with no afterlife at all: it was not developed, it was replaced, and what replaced it is the dactylic hexameter.'
    },


    'iambic-senarius': {
      name: 'Iambic Senarius',
      tagline: 'The spoken line of Roman comedy, and the closest thing Latin verse ever gets to ordinary talk.',
      scheme: '× – | × – | × – | × – | × – | ⏑ ×',
      schemeNote: 'Six feet. The second half of each foot is long, the first half is free, and only the eleventh syllable is fixed short. Any long may be broken into two shorts, so the line runs from twelve syllables to about eighteen.',

      origin: [
        '**It is Greek, and it was already the voice of dialogue when Rome met it.** The Athenian dramatists used the iambic trimeter for everything their characters said to each other, keeping the lyric metres for the chorus. Aristotle explains why in the *Poetics*: of all the metres this one is closest to the rhythm of speech, and people fall into it by accident while talking. That is a remarkable thing to say about a verse form, and it is the whole reason this metre exists.',
        '**The name records a disagreement about arithmetic.** A Greek counted this line as three *metra*, each metron a pair of feet, and called it a trimeter. A Roman counted the feet and called it a senarius, a thing of six. Same line, different unit, and the difference is not pedantry: the Greek pairing keeps the odd positions subordinate, and Latin, as you will see below, stopped treating them that way at all.',
        '**Before the theatre it was the metre of abuse.** *Iambos* in Greek meant invective: Archilochus used it in the seventh century BC to destroy his enemies in public, and the name of the metre and the name of the genre are the same word. Comedy inherits a form with that history attached, which is convenient for a genre in which slaves insult their owners for a living.',
        '**In Latin it arrives with the theatre itself** and never leaves. Livius Andronicus, Naevius and Ennius use it for the dialogue of tragedy; Plautus and Terence build comedy on it; and long after the stage has finished with it, it is still the line of Phaedrus\'s fables and of Seneca\'s tragedies, which were written to be read.',
        '**By volume it is the most important metre in early Latin.** Rather more than a third of Plautus and about half of Terence is in senarii, and the forty-six excerpts in this app that carry this label are the largest group here after the hexameter. If you are reading early Latin verse at all, you are mostly reading this line.'
      ],

      build: [
        '**Twelve positions, in six feet of two.** The even position of each foot is a longum. The odd position is an *anceps*, free to be long or short. The last foot is the exception and the anchor: it has to be a true iamb, short and then the final syllable, which is why **the eleventh syllable of a senarius is the one place you can always predict.**',
        '**This is where Latin parted company with Greek.** The Greek trimeter fixes the third syllable of each metron short, so the line keeps an audible ⏑ – ⏑ – lilt all the way through. Latin freed it. Every odd position in a Latin senarius may be long, and a great many are, because Latin is full of heavy syllables and its words do not fall naturally into alternating lights and longs. The result is a line that can be almost all spondees, and Caecilius wrote one: it is the second example below.',
        '**Resolution is everywhere.** Any longum, and any anceps taken long, may be replaced by two short syllables, except in the closing foot. That is what lets a comic poet get *familiaris* or *obsignatas* into a verse at all, and it is why a senarius of eighteen syllables is still a senarius of twelve positions.',
        '**The break comes after the fifth or the seventh half-foot.** In practice: a word ends in the middle of the third foot, or in the middle of the fourth. Plautus is freer about it than Terence, and a line with no break at either point sounds, to an ear trained on these plays, like a line that has run on.',
        '**How to scan one from cold.** Count the syllables after elision. Twelve means one syllable to a position and no resolutions, so the shape is fixed before you start. More than twelve means that many resolutions to place, and you find them by looking for pairs of adjacent light syllables. Then check the eleventh position: if it is not short, you have gone wrong somewhere earlier.'
      ],

      sound: [
        '**This is the metre that was spoken, not sung.** A Roman comedy alternates *diverbium*, spoken dialogue, with passages recited or sung to the *tibia*, the double pipe. The senarius is the diverbium: no music, no accompaniment, an actor simply talking in verse. The manuscripts of Plautus still mark those passages DV in the margin.',
        '**So it carries the plain business of the play.** Prologues, expositions, the scene where somebody explains what has happened: senarii. **When a scene stops being in senarii the temperature has gone up**, and that is worth watching for, because it is very nearly the only stage direction Roman comedy gives you.',
        '**To the ear it is loose and quick.** Twelve syllables at its tightest and eighteen at its most crowded, with substitutions free enough that no two consecutive lines need sound alike. It is verse that does not insist on being verse, which is exactly what dialogue needs.',
        '**And the word accent works against the metre, productively.** The stress of the Latin words need not fall on the longa, and in comedy it often does not. Read the quantities and let the accents fall where they fall: the friction between the two is not a defect but the thing that stops the line sounding like a nursery rhyme.'
      ],

      usedIntro: [
        'Spoken dialogue in comedy and in tragedy; the fables of Phaedrus; the tragedies of Seneca. All three comic playwrights in this app use it, and the three examples below are one each, in the order they lived.',
        'The metre is identical in all three, so what differs is the hand, and the difference is audible.'
      ],

      examples: [
        {
          author: 'Titus Maccius Plautus',
          slug: 'titus-maccius-plautus', era: 'archaic',
          where: 'Aulularia, Prologue, v. 2',
          gloss: 'The household god introduces himself, resolving three feet as he goes',
          plain: 'ego Lar sum familiaris ex hac familia',
          source: 'bank',
          marked: 'ĕgŏ Lār | sūm fămĭ|lĭā|rĭs ēx | hāc fămĭ|lĭă',
          pattern: '⏑ ⏑ – | – ⏑ ⏑ | ⏑ – | ⏑ – | – ⏑ ⏑ | ⏑ ×',
          notes: [
            '**Fifteen syllables in twelve positions**, so three resolutions, and you can hear every one of them: *ego* at the start, the *-mili-* of *familiaris*, and the *-mili-* of *familia* again. A line that runs like this is what people mean when they call Plautine verse colloquial.',
            '**The repetition is the joke, and the metre carries it.** The Lar says he is the god of the household and then names the household, *familiaris ... familia*, and the same three light syllables do the same metrical work both times.',
            'Watch the eleventh position, the *-li-* of the second *familia*: short, as it has to be, with the indifferent syllable after it. Every senarius on this page ends that way.'
          ]
        },
        {
          author: 'Caecilius Statius',
          slug: 'caecilius-statius', era: 'archaic',
          where: 'Plocium, in Donatus, ad Andriam IV.5.10',
          gloss: 'Ten longs in a row, and then the one short the metre insists on',
          plain: 'Vivas ut possis, quando nec quis ut velis.',
          source: 'bank',
          marked: 'Vīvās | ūt pōs|sīs, quān|dō nēc | quīs ūt | vĕlīs.',
          pattern: '– – | – – | – – | – – | – – | ⏑ ×',
          notes: [
            '**Live as you can, since you cannot live as you would like.** Twelve syllables for twelve positions, so nothing is resolved and nothing is in doubt: this is the senarius at its most transparent, and the best line in the app for seeing the shape whole.',
            '**Ten long syllables, and then a short.** Every anceps is taken long, which the Greek trimeter would not permit, and the effect is a line of granite with a single hinge in it. The hinge is the *ve-* of *velis*, the eleventh position, the one syllable a senarius cannot make long. **The rule that looked arbitrary a moment ago is audible here.**',
            'The sentence is built like the verse: two halves that balance, *ut possis* against *ut velis*, turning at the break in the middle of the third foot.'
          ]
        },
        {
          author: 'Publius Terentius Afer',
          slug: 'publius-terentius-afer', era: 'archaic',
          where: 'Adelphoe, Act IV, Scene 2, v. 430',
          gloss: 'The same metre in a quieter hand',
          plain: 'inepta haec esse, nos quae facimus, sentio;',
          source: 'bank',
          marked: 'ĭnēp|t(a) haec ēs|sĕ, nōs | quae făcĭ|mūs, sēn|tĭō;',
          pattern: '⏑ – | – – | ⏑ – | – ⏑ ⏑ | – – | ⏑ ×',
          notes: [
            '**One elision and one resolution in thirteen syllables**, against Plautus\' three resolutions in fifteen. That ratio is the difference between the two poets in miniature: Terence keeps the line nearer its skeleton, and the effect is smoother and less like overheard speech.',
            '**The word order is doing what the metre allows.** The judgement comes first, the relative clause sits inside it, and the verb arrives last, so the sentence closes exactly where the line does.',
            'Syrus is admitting that the things he does are silly. The one resolution in the line falls on *facimus*, the only word in it that is about doing rather than thinking.'
          ]
        },
        {
          author: 'Marcus Pacuvius',
          slug: 'marcus-pacuvius-and-lucius-accius', era: 'archaic',
          where: 'Chryses, in Cicero, De Divinatione I.131',
          gloss: 'Tragedy arguing rather than declaiming, and one resolution at the head of the line',
          plain: 'magis audiendum quam auscultandum censeo.',
          source: 'bank',
          marked: 'măgĭs au|dĭēn|dūm (quam) aus|cūltān|dūm cēn|sĕō.',
          pattern: '⏑ ⏑ – | ⏑ – | – – | – – | – – | ⏑ ×',
          notes: [
            '**Worth hearing rather than heeding, in my view.** A character is dismissing the diviners: you may listen to them, but do not do what they say. The joke is in the pair *audiendum* and *auscultandum*, two gerundives from two verbs for hearing, and the metre sets them in the same place in successive feet so that the ear catches the parallel before the mind does.',
            '**The one resolution is the first thing in the line.** *Magis* fills a single anceps with two short syllables, so the verse starts at a run and then settles into four spondees. Tragedy does this at the head of a line far more readily than in the middle, where it would blur the shape.',
            'The elision swallows *quam* entirely, which is why the two gerundives end up adjacent in the verse although a whole word stands between them on the page.'
          ]
        },
        {
          author: 'Lucius Accius',
          slug: 'marcus-pacuvius-and-lucius-accius', era: 'archaic',
          where: 'Brutus, in Cicero, De Divinatione I.44',
          gloss: 'The same line in tragedy, where nothing is resolved at all',
          plain: 'dedi, sopore placans artus languidos,',
          source: 'bank',
          marked: 'dĕdī, | sŏpō|rĕ plā|cāns ār|tūs lān|guĭdōs,',
          pattern: '⏑ – | ⏑ – | ⏑ – | – – | – – | ⏑ ×',
          notes: [
            '**Twelve syllables for twelve positions, and not one resolution.** Set this beside the Plautus above, which needed three: the difference is not the metre, which is identical, but the register. Tragedy keeps the line close to its skeleton because the diction is grand and the pace is slow.',
            '**Three iambs, then two spondees, then the close.** The verse gets heavier as it goes, and the heaviness arrives exactly on *artus languidos*, the weary limbs. That is the whole trick of tragic senarii: the metre is the same one the slaves are joking in, and the difference in effect comes from what is put into it.',
            'Tarquin is describing the night he dreamt of the ram: he has just lain down. The line is a single ablative absolute in everything but form, and the verb that governs it sits at the head of the verse, where a comic poet would not have put it.'
          ]
        },
        {
          author: 'Pomponius Bononiensis',
          slug: 'pomponius-bononiensis-and-quintus-novius', era: 'archaic',
          where: 'Galli Transalpini, in Macrobius, Saturnalia VI.9',
          gloss: 'And the same line in Atellan farce, resolved three times',
          plain: 'Mars, tibi voveo facturum, si unquam rediero,',
          source: 'bank',
          marked: 'Mārs, tĭbĭ | vŏvĕō | fāctū|rūm, (si) ūn|quām rĕdĭ|ĕrō,',
          pattern: '– ⏑ ⏑ | ⏑ ⏑ – | – – | – – | – ⏑ ⏑ | ⏑ ×',
          notes: [
            '**Three resolutions in fifteen syllables**, which is Plautine freedom in a poet writing two generations later, and it tells you what register Atellan farce sits in: this is the popular end of the theatre, not the literary one.',
            '**Mars, I vow to you that I will sacrifice, if ever I come home, a two-year-old boar.** It is a soldier\'s vow in the form the real ones took, and the joke is in what got cut: Macrobius stops after four syllables of the next verse, which is why the label on that excerpt covers the first line only.',
            'Note the shape of the ending, *rediero*: two shorts, then the obligatory short of the eleventh position, then the close. A senarius can end with a rush like this, and a tragic one rarely does.'
          ]
        }
      ],
      after: 'The senarius outlived the theatre. Phaedrus wrote his fables in it in the first century AD, and Seneca used it for the dialogue of tragedies meant to be read rather than staged, by which time two hundred years of comedy had made it simply the Latin verse for people talking. Neither poet is in this app yet.'
    },

    'iambic-septenarius': {
      name: 'Iambic Septenarius',
      tagline: 'The long iambic line of comedy, played to the pipe, and the one the Romans associated with being pleased about something.',
      scheme: '× – | × – | × – | × – ‖ × – | × – | ⏑ – | ×',
      schemeNote: 'Seven feet and a syllable, with a break in the middle that normally falls at the end of the fourth foot. The rules are the senarius rules, extended by one foot and a half.',

      origin: [
        '**It is the senarius made longer, and the extra length changes what it is for.** The Greek trimeter was the metre of dialogue; the catalectic iambic tetrameter, seven feet and a closing syllable, belonged to comedy and to lively popular verse, and Rome took it with those associations attached.',
        '**Roman writers connect it with cheerfulness.** It appears in comedy at moments of pleasure, relief and mischief often enough that the later grammarians treated it as the metre of good news. That is a generalisation with exceptions, but the tendency is real and worth listening for: Plautus does not often give this line to somebody having a bad time.',
        '**It had a life outside the theatre too.** The iambic septenarius is the metre of the soldiers\' songs chanted at a triumph, the ones that insulted the general to his face while he rode in procession, and of a quantity of popular verse that has not survived. Of all the metres of Roman comedy this is the one with the closest links to what ordinary people actually sang.',
        '**Plautus uses it constantly; Terence hardly at all.** That is one of the clearest metrical differences between them, and it is part of a larger one: Plautus wrote a musical and Terence wrote a play.'
      ],

      build: [
        '**Fifteen positions: seven iambic feet and a final syllable.** Everything the senarius allows, this allows. Odd positions are free, even positions are long, resolution is available almost everywhere, and the seventh foot is a true iamb, short then long, exactly as the sixth foot of a senarius is.',
        '**The middle break is the thing to listen for.** A word normally ends at the close of the fourth foot, splitting the line into eight positions and seven. When it does, the two halves answer each other and the verse falls into two phrases; when a poet avoids the break, the line runs straight through and you notice.',
        '**Because it is long, it holds a whole thought.** A senarius usually needs a partner to finish a sentence; a septenarius often does not. In practice that makes it the line for a self-contained remark, a joke with its setup and its point inside one verse.',
        '**Do not confuse it with the trochaic septenarius**, which has the same number of positions and an entirely different rhythm: the trochaic line starts on a longum and swings, the iambic one starts on a free syllable and runs. If you are unsure which you are reading, look at the end. An iambic line closes ⏑ – ×; a trochaic one closes – ⏑ ×.'
      ],

      sound: [
        '**It was performed to music.** This is one of the accompanied metres, played to the *tibia*, unlike the spoken senarius. A scene that moves out of senarii into septenarii has just turned the music on.',
        '**The pace is quick and the shape is symmetrical.** Two halves of roughly equal weight, a clear hinge in the middle, and an iambic run to the close. Read aloud, it has a swing that the senarius refuses to have.',
        '**Its natural register is comic**, though not slapstick: the tone is enjoyment, and it suits a character who is pleased with himself. Both examples below are somebody being pleased with himself.'
      ],

      usedIntro: [
        'Comedy, above all Plautine comedy; the songs sung at triumphs; popular verse generally. Three excerpts in this app are in it, two from Plautus and one from Terence, which is roughly the proportion in the surviving plays.'
      ],

      examples: [
        {
          author: 'Titus Maccius Plautus',
          slug: 'titus-maccius-plautus', era: 'archaic',
          where: 'Asinaria, Act III, Scene 3, v. 599',
          gloss: 'A young man is called a Solon, during office hours',
          plain: 'negotiosum interdius videlicet Solonem,',
          source: 'bank',
          marked: 'nĕgō|tĭō(sum) | īntēr|dĭūs | vĭdē|lĭcēt | Sŏlō|nĕm,',
          pattern: '⏑ – | ⏑ – | – – | ⏑ – | ⏑ – | ⏑ – | ⏑ – | ×',
          notes: [
            '**Six iambs in a row after the third foot**, which is about as regular as a Latin iambic line ever gets, and the regularity is part of the joke: the verse marches along like the busy respectable citizen it is describing.',
            '**A Solon, in office hours.** *Videlicet* is sarcastic, Solon is the Athenian lawgiver, and *interdius* means during the working day: a model of Athenian wisdom by daylight and something else entirely at night. Parking the Greek lawgiver at the end of a Latin comic line is the kind of joke this metre exists for.',
            'The elision in the second foot is what keeps the line to fifteen syllables. Written out in full, *negotiosum interdius* would need sixteen, and there is no room.'
          ]
        },
        {
          author: 'Publius Terentius Afer',
          slug: 'publius-terentius-afer', era: 'archaic',
          where: 'Hecyra, Act V, Scene 3, v. 838',
          gloss: 'Three spondees, and then the metre finds its feet',
          plain: 'haec tot propter me gaudia illi contigisse laetor:',
          source: 'bank',
          marked: 'haec tōt | prōptēr | mē gau|dĭ(a) īl|lī cōn|tĭgīs|sĕ lae|tōr:',
          pattern: '– – | – – | – – | ⏑ – | – – | ⏑ – | ⏑ – | ×',
          notes: [
            '**The line is built in two halves and you can hear the join.** Three heavy feet, all spondees, carry *haec tot propter me*; from the elision onwards it runs in pure iambs to the end. The turn falls exactly where the sense turns, from what she has done to what he feels about it.',
            '**Terence using the metre for its traditional purpose**, which is pleasure: Pamphilus is glad. It is also, characteristically, a quieter gladness than Plautus would have written, and the three opening spondees are what make it quieter.',
            'Terence has very few iambic septenarii in all. When one appears it tends to be at a moment like this, where a character is relieved rather than triumphant.'
          ]
        }
      ],
      after: 'The metre dies with the comic stage. Its last real life is in the marching songs of the legions, quoted by the historians and never written down as literature; after that Latin poetry keeps the iambic trimeter for drama and lets this one go.'
    },


    'iambic-octonarius': {
      name: 'Iambic Octonarius',
      tagline: 'The longest regular line in Roman comedy, and the one a character reaches for when he has lost his composure.',
      scheme: '× – | × – | × – | × – ‖ × – | × – | × – | ⏑ ×',
      schemeNote: 'Eight full feet, sixteen positions, with no catalexis: the line runs to the end of its last foot instead of stopping a syllable short.',

      origin: [
        '**It is the iambic line taken as far as it will go.** Four full metra, eight feet, sixteen positions. The Greeks had the form and used it sparingly; the Romans took it up with enthusiasm, and it is one of the places where Latin comedy is demonstrably not just Greek comedy in translation.',
        '**Terence is its great user.** The proportions are striking: iambic octonarii account for a substantial part of Terence and a small part of Plautus, which is the opposite of what people expect from the poet usually described as the more sober of the two. Plautus had the whole lyric repertory to reach for when a scene needed lifting; Terence, who almost never writes lyric, does that work with this line instead.',
        '**So the metre is a solution to a problem Terence set himself.** If you will not stop the play for a song, you need a verse that can carry emotional pressure while remaining speech. Sixteen positions of iambic movement, accompanied by the pipe, is that verse.'
      ],

      build: [
        '**Sixteen positions in eight feet, and the familiar rules.** Odd positions free, even positions long, resolution available except at the close, and the eighth foot a true iamb: short, then the final indifferent syllable.',
        '**A break usually falls after the fourth foot**, splitting the line into two halves of eight positions. That is the same hinge as the septenarius has, but here both halves are the same length, so the symmetry is exact and the line can be built as a pair of matched clauses.',
        '**The extra foot is not decoration.** Two syllables more than a septenarius means room for one more phrase, and in practice that is what the metre is for: the character says the thing, and then says the bit he could not fit in.',
        '**Watch for resolutions rather than counting syllables.** An octonarius with several resolutions can reach twenty syllables or more, at which point it stops being obvious that you are looking at a line of verse at all. Find the eight longa and the shape reappears.'
      ],

      sound: [
        '**It is accompanied, and it is fast.** The senarius is spoken, the octonarius is performed to the *tibia*, and a scene that steps up from senarii to octonarii has changed gear audibly.',
        '**The register is agitation.** Not song, and not calm speech: this is the metre of the monologue delivered at speed by somebody who has just had news, or drunk too much, or realised what he has done. Both examples below are exactly that.',
        '**Long lines are hard to keep moving**, and the poets know it. The commonest way of keeping this one alive is a run of spondees followed by a sudden pair of shorts, which is why an octonarius so often sounds as if it were accelerating towards its last foot.'
      ],

      usedIntro: [
        'Comedy, and chiefly Terence. Ten excerpts in this app are in it, which makes it the third most common metre here after the senarius and the trochaic septenarius.',
        'The two examples are a Plautine slave with a letter in his hand and a Terentian gentleman who has been drinking, and the metre suits both of them for the same reason.'
      ],

      examples: [
        {
          author: 'Titus Maccius Plautus',
          slug: 'titus-maccius-plautus', era: 'archaic',
          where: 'Bacchides, Act IV, Scene 9, v. 925',
          gloss: 'Twelve long syllables in a row, and a letter that will not open itself',
          plain: 'nam ego has tabellas obsignatas consignatas quas fero',
          source: 'bank',
          marked: '(nam) ĕ(go) hās | tăbēl|lās ōb|sīgnā|tās cōn|sīgnā|tās quās | fĕrō',
          pattern: '⏑ – | ⏑ – | – – | – – | – – | – – | – – | ⏑ ×',
          notes: [
            '**Sixteen syllables for sixteen positions**, so nothing is resolved: every position takes one syllable, and the line is as slow as the metre can be made.',
            '**Two elisions at the start and then a wall.** *Nam ego has* collapses into two syllables of running start, and after that come twelve consecutive longs: *obsignatas consignatas* is a pair of five-syllable participles that mean almost the same thing, sealed and countersealed, and the verse simply stops sounding like speech and starts sounding like an official document. Chrysalus is carrying a letter and the metre is carrying its seals.',
            '**Then the last foot releases it**, *fero*, short and long, the one light syllable in the second half of the line. Plautus does this repeatedly: a heavy line with the verb dropped lightly at the end.'
          ]
        },
        {
          author: 'Publius Terentius Afer',
          slug: 'publius-terentius-afer', era: 'archaic',
          where: 'Eunuchus, Act IV, Scene 5, v. 729',
          gloss: 'A gentleman discovers that he was not as sober as he thought',
          plain: 'at dum accubabam quam videbar mi esse pulchre sobrius!',
          source: 'bank',
          marked: 'āt (dum) āc|cŭbā|bām quām | vĭdē|bār (mi) ēs|sĕ pūl|chrĕ sō|brĭŭs!',
          pattern: '– – | ⏑ – | – – | ⏑ – | – – | ⏑ – | ⏑ – | ⏑ ×',
          notes: [
            '**Five short syllables, and every one of them in the same place: the free first half of a foot.** Feet 1, 3 and 5 are spondees and the feet between them are iambs, so the line alternates heavy and light for its first five feet; then feet 6, 7 and 8 are all iambs, the alternation gives way to a run, and the verse hurries into its close. It walks carefully for most of its length and then does not, which is more or less what its speaker is doing.',
            '**This is Terence using the octonarius where Plautus would have written a song.** Chremes has been at dinner; he is explaining, at length and in order, that the wine has caught up with him. The metre is long enough to hold the whole self-observation in one verse, which is the joke.',
            'Note *pulchre* in the seventh foot: an adverb that normally means beautifully, used here to mean thoroughly, and sitting on the light syllable of the foot so that it goes past almost unnoticed.'
          ]
        }
      ],
      after: 'Like the septenarius, the octonarius belongs to the stage and does not survive it. What survives is the discovery behind it, that a long iambic line can carry feeling without turning into song, and that is a discovery Latin poetry made twice more, in Horace\'s epodes and in the dialogue of Senecan tragedy.'
    },

    'canticum': {
      name: 'Canticum',
      tagline: 'The sung parts of Roman comedy: not one metre but a dozen, changing from verse to verse, and the most original thing Plautus ever did.',
      scheme: [
        '⏑ – –   bacchius',
        '– ⏑ –   creticus',
        '⏑ ⏑ –   anapaest'
      ],
      schemeNote: 'These are feet, not lines. A canticum is built by repeating and mixing them, four to the line and then three, changing metre when the singer changes thought, so there is no single scheme to give.',

      origin: [
        '**A Roman comedy is partly a musical**, and this is the part that is sung. The ancient distinction is between *diverbium*, spoken dialogue in senarii, and *canticum*, performed to the *tibia*. The manuscripts of Plautus still carry the marks: DV against the spoken passages, C against the sung ones.',
        '**Greek New Comedy did not work like this.** Menander wrote dialogue, with choral interludes between the acts which are not even copied into the manuscripts, because they were not part of the text. Plautus removed the chorus and put the singing inside the action, given to the characters themselves. **That is his own invention, and it changes what comedy is**: a Plautine slave does not merely scheme, he performs an aria about scheming.',
        '**The proportions are remarkable.** Something like two thirds of Plautus is accompanied in one way or another, and a substantial part of that is genuine polymetric song. Terence went the other way and wrote almost none: of the thirty Terentian excerpts in this app not one is a canticum, and of the fifty Plautine ones eight are.',
        '**Where the music went, nobody knows.** Not a note of the *tibia* parts survives. What survives is the metre, which is the shadow the music left on the words, and it is the only evidence we have of what these scenes sounded like.'
      ],

      build: [
        '**Three feet do most of the work.** The *bacchius* (⏑ – –), the *creticus* (– ⏑ –) and the anapaest (⏑ ⏑ –). Each is used in fours and threes to make a line, so a bacchiac tetrameter is four bacchii, a cretic tetrameter four cretics, and so on. Compared with the iambic and trochaic lines these are heavy feet, two longs to one short, and they move slowly.',
        '**And then the poet mixes them.** A canticum is a sequence of metrical units, each a few verses long, and the metre changes at the joins. The units have names of their own where they recur - the *versus reizianus*, the *colon reizianum*, the *wilamowitzianum* - and some are simply marked *incertum*, uncertain, by the scholars who have tried to sort them out.',
        '**This is why eight excerpts in this app carry no metre name at all, only the label canticum.** Naming the metre of such a passage means naming ten of them, one per verse or two, and a label that long tells a reader nothing. The one below is a fair specimen: it is thirteen verses of Pseudolus and it changes metre nine times.',
        '**The reconstruction is modern and it is hard.** The manuscripts give no metrical marks beyond C and DV; everything else has been worked out from the words, chiefly by Cesare Questa, and the app takes its assignments from the database built on that work by Timothy J. Moore.'
      ],

      sound: [
        '**Heavy, slow and formal, and then suddenly not.** Bacchiacs and cretics have twice as much long as short in them, which makes them sound weighty in a way no iambic line does. Used for a slave\'s complaint about his life, that weight is funny, because the form is far too grand for the subject.',
        '**The changes of metre are the structure.** A canticum has no stanza and no refrain; what shapes it is the turn from one metre into another, which falls where the thought turns. Reading one, you can find the joints without knowing any of the metres by name, simply by noticing where the line length changes.',
        '**And it was staged.** Somebody stood on a wooden stage in a mask and sang this, with a piper beside him, in a language whose accent we reconstruct and to music we have entirely lost. Everything above is an attempt to hear a shadow.'
      ],

      usedIntro: [
        'Plautus, overwhelmingly. Eight of the fifty Plautine excerpts here are cantica: Aulularia IV.9, Bacchides V.2, Casina II and III, Mostellaria I.2, Pseudolus V.2 and Truculentus II.5.',
        'One verse is scanned below, because bacchiacs are worth hearing once; after it comes the shape of a whole canticum, which is the thing this page really exists to show.'
      ],

      examples: [
        {
          author: 'Titus Maccius Plautus',
          slug: 'titus-maccius-plautus', era: 'archaic',
          where: 'Mostellaria, Act I, Scene 2, v. 84',
          gloss: 'A bacchiac tetrameter: four feet, eight longs, four shorts',
          plain: 'Recordatus multum et diu cogitavi',
          source: 'bank',
          marked: 'Rĕcōrdā|tŭs mūlt(um) ēt | dĭū cō|gĭtāvī',
          pattern: '⏑ – – | ⏑ – – | ⏑ – – | ⏑ – –',
          notes: [
            '**Four bacchii, exactly.** Short, long, long, four times over, with one elision to keep the count right. Nothing is resolved and nothing is substituted, which makes this the clearest bacchiac line in the app.',
            '**Listen to how slow it is.** Eight long syllables out of twelve, and the three-syllable foot means the beat falls further apart than in any iambic line. Read it aloud next to a senarius and the difference is not subtle.',
            '**And then consider what he is saying.** Philolaches is announcing that he has thought long and hard, and is about to compare a young man to a new house. The metre is the metre of high emotion, and it is being spent on a builder\'s analogy: **that gap between the grandeur of the form and the banality of the content is the joke**, and it is a joke that only works if the audience knows what the form is for.'
          ]
        }
      ],
      after: 'Nothing later in Latin is built this way. When the theatre dies, the polymetric canticum dies with it, and Latin poetry keeps the metres it borrowed from Greek lyric for Horace to use one at a time, stanza by stanza, on the page. What Plautus had, briefly, was a form in which the metre could change whenever the singer changed his mind - and the only reason we can say so is that somebody wrote the words down and the words remember the tune.'
    },

    'elegiac-couplets': {
      name: 'Elegiac Couplets',
      tagline: 'A hexameter, and then a shorter line that falls away underneath it. The metre of the epigram, of the epitaph, and of Roman love poetry.',
      scheme: [
        '– ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – ×',
        '– ⏑ ⏑ | – ⏑ ⏑ | – ‖ – ⏑ ⏑ | – ⏑ ⏑ | –'
      ],
      schemeNote: 'The first line is an ordinary hexameter, so any of its first four feet may be a spondee. In the second line only the first half may contract: after the break the two dactyls are fixed, and every couplet in classical Latin therefore ends on the same rhythm.',

      origin: [
        '**The name comes from the Greek word** *elegos*, whose original meaning is lost and which was associated early with lament and with the flute. That association has stuck: "elegy" in English still means a poem of mourning. In Greek and Latin it means a poem in this metre, and the subject can be anything at all.',
        '**It is very old and it was never only for grief.** The seventh-century Greek elegists - Archilochus, Mimnermus, Tyrtaeus, Solon - use the couplet for war songs, political argument, drinking poems and advice. Lament is one use among many.',
        '**Its other native home is the inscription.** The couplet is the standard metre of the Greek and then the Latin verse epitaph, short enough to cut into stone and closed enough to sound final. That is directly relevant to the example below: Catullus 101 is a poem written in the shape of a grave inscription and spoken at a grave.',
        '**In Latin it arrives with the epigram and then takes over a genre.** Catullus uses it for everything from poem 65 onwards, including the epigrams and the longer letters; and then Cornelius Gallus, Tibullus, Propertius and Ovid build Roman love elegy on it, a body of poetry with no real Greek equivalent. None of those four is in this app yet.',
        '**Ovid tells the best story about the shape.** At the start of the *Amores* he says he was setting out to write epic in hexameters, and Cupid stole one foot from every second line - so the poem came out in elegiacs and turned into love poetry against his will. It is a joke about metre, and it explains the couplet better than a diagram: the second line is the first line with something taken out of it.'
      ],

      build: [
        '**This is not one metre but a pair, and the pair is the unit.** The hexameter, of course, is met on its own everywhere - it is the line of epic, of didactic poetry, of satire and of pastoral. **The pentameter is the one that never stands alone.** There is no poem in Latin written in pentameters; the line exists only as the second half of a couplet, and a couplet is what a poet composes in.',
        '**The first line is an ordinary dactylic hexameter**, with all the freedom that implies: four feet that may be dactyls or spondees, a fifth that is almost always a dactyl, a two-syllable close.',
        '**The second line can be read two ways, and both are worth having.** The practical way is as two half-lines, each of two and a half feet: – ⏑ ⏑ – ⏑ ⏑ –, a break, then – ⏑ ⏑ – ⏑ ⏑ – again. That is how you scan it. **But the name is not the blunder it looks.** Add the two half-feet back together - the single long before the break and the single long at the very end - and they make one complete spondee, split in half by the caesura and set at the two ends of the line. Two whole feet, two whole feet, and that divided fifth: **five feet, which is exactly what the name claims.** The fifth foot is there; it has simply been cut in two and hung at either end.',
        '**The break in the middle is obligatory and always falls at a word end.** That is the single most audible thing about the line: it really does come in two pieces, and a poet can use the gap to set one half against the other.',
        '**And now the rule that matters most.** In the first half the two dactyls may contract into spondees, exactly as in the hexameter. **In the second half they never may.** After the break, every pentameter in classical Latin runs – ⏑ ⏑ – ⏑ ⏑ –, without exception. There is no other position in Latin metre that is fixed so hard.',
        '**Nothing about this changes after Catullus.** The same construction is still there in Tibullus, in Propertius and all through Ovid, who wrote more of these couplets than anybody: the fixed second half, the obligatory break, the split fifth foot at the two ends. What Ovid does add is a refinement of habit rather than of structure - from him onwards it becomes normal to end the pentameter on a word of two syllables, which makes the close even more uniform. Catullus has not adopted that yet, and you can hear the difference.',
        'Elision works as it does everywhere in Latin verse, and in a form this compressed it is very audible: there are two elisions in the four lines quoted below.'
      ],

      sound: [
        '**The hexameter opens and the pentameter closes.** That is the whole rhythm of the form, repeated for as long as the poem lasts. The first line runs out to its full length; the second is shorter, breaks in the middle, and stops. The traditional description is that the second line "falls away", and that is exactly what it does.',
        '**Because the second half of every pentameter is identical**, the same six-syllable cadence arrives at the end of every couplet. Over a long poem this becomes hypnotic - and over a short one it becomes a snap. It is the reason the couplet took over the epigram: you cannot write a two-line joke in a metre that does not close.',
        '**The unit being two lines makes the form argumentative.** Statement, then turn; claim, then undercut; image, then comment. Latin epigram is built on that shape, and so is a great deal of love elegy, where the pentameter is where the complaint or the joke lands.',
        '**Enjambment across the couplet boundary is rare enough to be an effect.** In a hexameter poem the sentence runs over the line-end constantly; here it usually does not, so when a poet lets a sentence spill into the next couplet you are meant to feel it.'
      ],

      usedIntro: [
        'Epigram and inscription first; then, in Latin, an entire genre - the love elegy of Gallus, Tibullus, Propertius and Ovid, and after that Ovid\'s exile poetry, his calendar and his letters. It becomes the ordinary metre for anything that is not epic and not lyric.',
        'One poem in this app is in elegiacs, and it could hardly be a better one: Catullus 101, written in the metre of the epitaph, for a grave he had travelled across the world to reach.'
      ],

      examples: [
        {
          author: 'Gaius Valerius Catullus',
          slug: 'gaius-valerius-catullus', era: 'caesar',
          where: 'Carmen 101, vv. 1-2',
          gloss: 'The opening couplet: a hexameter that travels, a pentameter that arrives',
          plain: [
            'Multas per gentes et multa per aequora vectus',
            'advenio has miseras, frater, ad inferias,'
          ],
          source: 'bank',
          marked: [
            'Mūltās | pēr gēn|tēs ‖ ēt | mūltă pĕr | aequŏră | vēctŭs',
            'ādvĕnĭ(o) | hās mĭsĕ|rās, ‖ frātĕr, ăd | īnfĕrĭ|ās,'
          ],
          pattern: [
            '– – | – – | – ‖ – | – ⏑ ⏑ | – ⏑ ⏑ | – ×',
            '– ⏑ ⏑ | – ⏑ ⏑ | – ‖ – ⏑ ⏑ | – ⏑ ⏑ | –'
          ],
          notes: [
            '**The couplet does in two lines what the poem does in ten.** The hexameter is all movement - *multas per gentes et multa per aequora*, through many nations and over many seas - and it opens on three spondees, which makes the journey heavy and slow rather than swift. Then the pentameter arrives: *advenio*, I come, first word, and the travelling stops.',
            '**Watch the second line break in the middle.** *Advenio has miseras* ‖ *frater, ad inferias*: the first half is the arrival, the second half is what he has arrived for, and the word *frater* is placed at the head of the second half where the break throws all the weight onto it. The metre is doing the grief.',
            '**And the second half is the fixed one.** – ⏑ ⏑ – ⏑ ⏑ –, as in every classical pentameter, with no substitution possible; the first half of the same line has taken its dactyls straight but could have contracted them. The couplet ends on the one rhythm the form never varies, which is why it lands so finally.',
            '**One elision to note**, and it is at the very start: *advenio has* is written as five syllables and read as four, the final *-o* disappearing before the *h*. Print it as *ādvĕnĭ(o)* and the first foot comes out as a clean dactyl.',
            'The poem closes on another couplet everybody knows, ending *atque in perpetuum, frater, ave atque vale* - and that last line is a pentameter too, with the same fixed cadence arriving for the last time.'
          ]
        }
      ],

      after: 'The Roman elegists who made this metre their own - Gallus, Tibullus, Propertius and Ovid - are not in this app yet. When they are added, their examples will be added here.'
    },

    'trochaic-septenarius': {
      name: 'Trochaic Septenarius',
      tagline: 'Seven and a half trochees: the long, swinging, driving line of Roman comedy, and of Lucilius before he settled on the hexameter.',
      scheme: '– ⏓ | – ⏓ | – ⏓ | – ⏓ ‖ – ⏓ | – ⏓ | – ⏓ | –',
      schemeNote: 'Seven complete feet and one syllable, which is what "septenarius" counts. Almost every long may be resolved into two shorts and almost every anceps filled by two, so a line with fifteen positions can carry twenty syllables. The break after the fourth foot is usual, not compulsory.',

      origin: [
        '**It is Greek, and it is fast.** The trochaic tetrameter catalectic - four pairs of feet with the last syllable missing - is one of the oldest Greek metres, used by Archilochus in the seventh century BC and taken into tragedy for scenes of excitement and argument. Aristotle says it was the original metre of tragic dialogue before the iambic took over, because it is closer to dancing.',
        '**In Latin it becomes one of the two staple metres of comedy.** Plautus and Terence build their plays out of the iambic senarius and this: the senarius is spoken, and the septenarius is *recitative*, delivered to the accompaniment of a piper. A scene that changes metre is a scene that changes mode of performance, which is why the metre shifts in the middle of a conversation.',
        '**Lucilius wrote his earliest satires in it.** Books 26 to 29, the first he published, use the older measures - this one and the iambic senarius - and only from Book 30 onwards does he write the hexameters that satire kept afterwards. Both stages are in this app, which makes Lucilius the one author here who shows the change happening.',
        '**It outlives the literature that used it.** The soldiers\' songs at Caesar\'s triumph were in trochaic septenarii, and the form survives into popular and then Christian Latin: the medieval hymn *Pange lingua gloriosi* is a trochaic tetrameter catalectic built on stress instead of quantity. It is the one classical metre that walks straight out of antiquity into the Middle Ages.'
      ],

      build: [
        '**Eight positions of – ⏓, with the last one truncated.** That is seven complete feet plus a single syllable, which is where the name comes from: a *septenarius* counts seven.',
        '**The falling shape is the point.** A trochee is long-then-short, so each foot begins on its beat and falls away, and the line as a whole pushes forward. An iambic line rises into its beat; a trochaic one drops out of it.',
        '**Substitution is allowed almost everywhere, and this is what makes the metre useful.** A long may be resolved into two shorts. The anceps may be a long, a short, or two shorts. So a single foot may appear as a trochee, a spondee, a dactyl, an anapaest or a tribrach, and the fifteen metrical positions of the line can be filled by anything from fifteen syllables to well over twenty.',
        '**There is usually a break after the fourth foot**, at the halfway point, and it usually falls at a word end. It is a strong tendency rather than a rule, and both examples below have it.',
        '**Scanning one is a mechanical job, and worth doing once by hand.** Look each word up and mark the vowels that are long by nature. Then apply position: a syllable is heavy if its vowel is followed by two consonants, including across a word boundary, which is why the *-um* of *Iunium* and the *-us* of *publicanus* come out long. Then strike out the elisions - a final vowel, or a final vowel plus *m*, before a word beginning with a vowel or *h*. What is left is a string of longs and shorts, and the job is to lay it against the fifteen positions. The example below is done that way, line by line.',
        '**The one real difficulty is that you cannot count your way in.** In a hexameter the syllable count narrows the possibilities at once; here resolution means fifteen positions may be filled by anything from fifteen syllables to twenty or more, so you have to fit rather than count, and a line with several resolutions can occasionally be laid out in more than one way. Both lines below have exactly one resolution each and come out unambiguous.',
            '**The comic poets are still not labelled in this app, and that is a separate matter.** It is not that a Plautine line cannot be scanned; it is that a Plautine *scene* moves between the spoken senarius, this metre and the lyric metres of the *cantica*, sometimes within a few lines, so one metre named on a whole excerpt would often be wrong. Lucilius can be labelled because each of his books is consistent within itself.'
      ],

      sound: [
        '**Long.** Fifteen positions and often twenty syllables, which is half as long again as a hexameter by syllable count. A page of septenarii looks and sounds nothing like a page of epic: the lines run right across and keep going.',
        '**And driving, because the beat agrees with the words.** In Latin the word accent tends to fall on the same syllables the trochaic beat wants, so the rhythm is easy to hear and hard to lose - the opposite of the hexameter, where accent and metrical ictus pull against each other through the middle of the line and only agree at the end.',
        '**Delivered to music.** In comedy this is the metre of the *recitativum*, chanted or sung over a pipe, faster and more insistent than the plain spoken senarius. When a Plautine scene lifts into septenarii it is lifting into performance.',
        '**The nearest thing in English is the long trochaic line** of Tennyson\'s *Locksley Hall*, or of a nursery rhyme stretched out: once you have the swing of it, it carries you, and it is very hard to stop before the end of the line.'
      ],

      usedIntro: [
        'Roman comedy above all - Plautus and Terence use it constantly, and between them they account for most of the surviving examples in Latin. Then tragedy, where Pacuvius and Accius use it for the heightened scenes; then Atellan farce; then Lucilius\' earliest satire; then marching songs, popular verse, and eventually the medieval hymn.',
        'The three examples below are the three uses in one page: satire, Plautine performance and Terentian dialogue. The first is from Lucilius, Book 26, the earliest satire we have any of - the same book that carries the most quoted sentence in Roman satire about its own audience, where Lucilius says he does not want Manius Persius, who was famously learned, to read him, and does want Iunius Congus, who was not. That line survives only inside the preface to Pliny\'s Natural History rather than as transmitted verse, so it is left out of the scansion below.'
      ],

      examples: [
        {
          author: 'Gaius Lucilius',
          slug: 'gaius-lucilius', era: 'archaic',
          where: 'Saturae, Book 26, vv. I-II',
          gloss: 'Refusing the richest contract in the Roman world, scanned line by line',
          plain: [
            'publicanus vero ut Asiae fiam, ut scripturarius,',
            'pro Lucilio, id ego nolo, et uno hoc non muto omnia'
          ],
          source: 'bank',
          marked: [
            'pūblĭcānūs vēr(o) ŭt Ăsĭae ‖ fī(am), ūt scrīptūrārĭŭs,',
            'prō Lūcīlĭ(o), ĭd ĕgŏ nōl(o), ĕt ‖ ūn(o) hōc nōn mūt(o) ōmnĭă'
          ],
          pattern: [
            '– ⏑ | – – | – ⏑ | ⏑ ⏑ – ‖ – – | – – | – ⏑ | ×',
            '– – | – ⏑ | ⏑ ⏑ ⏑ | – ⏑ ‖ – – | – – | – ⏑ | ×'
          ],
          notes: [
            '**What he is refusing is a fortune.** A *publicanus* farmed the taxes of a province and the Asian contract was the richest in the Roman world; a *scripturarius* collected the dues on public pasture. Lucilius was rich already, and the sentence runs on to say that he would not swap his one thing - his independence - for all of it.',
            '**Both lines have exactly one resolution, and you can see where.** In the first it is in the fourth foot, where *-t A-si-* fills a longum with two shorts; in the second it is in the third, where *id e-* does the same. Everywhere else a position takes one syllable, which is why these two come out unambiguous where a heavily resolved line might not.',
            '**Watch the elisions**, because they are what makes the count look wrong on the page. *Vero ut* is four written syllables and three spoken; *fiam ut* likewise; and the second line elides four times - *Lucilio id*, *nolo et*, *uno hoc*, *muto omnia*. Sixteen syllables are left in each line to fill fifteen positions.',
            '**And watch position doing its work.** The *-us* of *publicanus* is short by nature and long here because the *s* is followed by the *v* of *vero*; the *-am* of *fiam* would be long the same way, except that it elides instead. Almost every long in the second half of the first line is a long vowel, which is why that half is so heavy: *fī(am) ŭt scrīptūrārĭŭs* is five longs out of seven.',
            '**The break falls after Asiae in the first line and after et in the second** - the fourth-foot diaeresis, in both cases at a word end, and in neither case where the editor has put the comma. Punctuation is a modern convenience; the break is a fact about the verse.',
            '**Listen to the vocabulary.** *Publicanus*, *scripturarius* - flat administrative nouns, one of them five syllables long and sitting at the end of the line. A hexameter could not take them; this metre has room, and that is a large part of why early satire is written in it.'
          ]
        },
        {
          author: 'Titus Maccius Plautus',
          slug: 'titus-maccius-plautus', era: 'archaic',
          where: 'Miles Gloriosus, Act II, Scene 2, v. 226',
          gloss: 'A slave is instructed to unsee what he has seen',
          plain: 'quae hic sunt visa ut visa ne sint, facta ut facta ne sient.',
          source: 'bank',
          marked: '(quae) hīc sūnt | vī(sa) ūt | vīsă | nē sīnt, | fāc(ta) ūt | fāctă | nē sĭ|ēnt.',
          pattern: '– – | – – | – ⏑ | – – | – – | – ⏑ | – ⏑ | ×',
          notes: [
            '**The metre is doing the same thing the sentence is doing.** *Visa ut visa ne sint, facta ut facta ne sient*: the same word twice, then its own negation, twice over, in two halves that mirror each other across the break. The trochaic septenarius is built as two blocks, and Plautus has put one half of the paradox in each.',
            '**Three elisions**, one of them across the opening: *quae hic* loses the *quae*, and each *visa ut* and *facta ut* loses a syllable too. This is what a Plautine line looks like at speed.',
            'The fourth-foot break falls after *ne sint*, exactly where the thought turns from what was seen to what was done.'
          ]
        },
        {
          author: 'Publius Terentius Afer',
          slug: 'publius-terentius-afer', era: 'archaic',
          where: 'Eunuchus, Act II, Scene 2, v. 253',
          gloss: 'A professional flatterer explains his trade',
          plain: 'omnia adsentari. is quaestu’ nunc est multo uberrimus.',
          source: 'bank',
          marked: 'ōmnĭ|(a) ādsēn|tār(i). ĭs | quaestŭ’ | nūnc ēst | mūl(to) ū|bērrĭ|mŭs.',
          pattern: '– ⏑ | – – | – ⏑ | – ⏑ | – – | – – | – ⏑ | ×',
          notes: [
            '**Agree with everything: that is by far the most profitable trade now.** Gnatho is describing the parasite\'s profession, and Terence gives him the long recited line rather than the spoken senarius, which is how you can tell this is a set piece and not conversation.',
            '**Three elisions again, and a dropped s.** *Quaestu’* for *quaestus* is the colloquial clipping that both playwrights use constantly and that editors print with an apostrophe; it is also the reason the syllable can stay short.',
            'Terence uses this metre about as often as he uses the senarius. Where Plautus has it competing with a dozen lyric metres, in Terence it is simply the other half of the play.'
          ]
        },
        {
          author: 'Marcus Pacuvius',
          slug: 'marcus-pacuvius-and-lucius-accius', era: 'archaic',
          where: 'Niptra, in Cicero, Tusculanae Disputationes II.50',
          gloss: 'Tragedy in the same metre, and almost nothing but longs',
          plain: 'Conqueri fortunam adversam, non lamentari decet.',
          source: 'bank',
          marked: 'Cōnquĕ|rī fōr|tū(nam) ād|vērsām, | nōn lā|mēntā|rī dĕ|cēt.',
          pattern: '– ⏑ | – – | – – | – – | – – | – – | – ⏑ | ×',
          notes: [
            '**Two short syllables in fifteen.** Every anceps is taken long, so the line is a wall of spondees with one light syllable near each end, and it moves at about half the speed of the comic examples above. The metre has not changed; the poet has.',
            '**To complain of bad fortune is right; to wail about it is not.** Ulysses is dying of the wound his own son gave him, and Cicero quotes the line twice in the Tusculans as the model of how a man should take pain. The weight of the verse is the argument: a septenarius this slow sounds like something being endured rather than performed.',
            'The single elision, *fortunam adversam*, is what keeps the count to fifteen, and the break falls after it, dividing the line between the thing to be done and the thing not to be done.'
          ]
        },
        {
          author: 'Lucius Accius',
          slug: 'marcus-pacuvius-and-lucius-accius', era: 'archaic',
          where: 'Brutus, in Cicero, De Divinatione I.45',
          gloss: 'The same metre carrying a prophecy about Rome',
          plain: 'auguratum est rem Romanam publicam summam fore.',
          source: 'bank',
          marked: 'augŭ|rā(tum) ēst | rēm Rō|mānām | pūblĭ|cām sūm|mām fŏ|rē.',
          pattern: '– ⏑ | – – | – – | – – | – ⏑ | – – | – ⏑ | ×',
          notes: [
            '**Twelve longs out of fifteen**, and the three shorts are spaced almost evenly: one in the first foot, one in the fifth, one in the seventh. The line is heavy without being inert, which is what a prophecy in tragedy needs.',
            '**It was prophesied that the Roman state would be supreme.** This is the interpretation of Tarquin\'s dream, and the last line of the passage Cicero quotes; the long line is what Roman tragedy keeps for a speech that gathers weight as it goes. Set it beside the Accius senarius on the Iambic Senarius page, which is the narrative of the same dream: the same poet, the same play, the shorter line for telling and the longer one for pronouncing.',
            'The one elision, *auguratum est*, does what elision usually does in this metre: it keeps a four-syllable word from spilling over the foot it belongs in.'
          ]
        },
        {
          author: 'Pomponius Bononiensis',
          slug: 'pomponius-bononiensis-and-quintus-novius', era: 'archaic',
          where: 'Kalendae Martiae, in Macrobius, Saturnalia VI.4',
          gloss: 'And the same metre in Atellan farce, with two resolutions in a row',
          plain: 'Vocem deducas oportet, ut mulieris videantur.',
          source: 'bank',
          marked: 'Vōcēm | dēdū|cās ŏ|pōrtēt, | ūt mŭ|lĭĕrīs | vĭdĕān|tūr.',
          pattern: '– – | – – | – ⏑ | – – | – ⏑ | ⏑ ⏑ – | ⏑ ⏑ – | ×',
          notes: [
            '**Two resolutions, back to back, in the sixth and seventh feet.** *Mulieris* and *videantur* are exactly the kind of word this metre exists to accommodate: four light-heavy syllables that no shorter line could take without breaking. Seventeen syllables in fifteen positions, and the last third of the verse runs.',
            '**You must lower your voice, so they will pass for a woman\'s.** An actor is being coached to play a woman, which in Atellan farce is a man in a mask, and Macrobius quotes the line not for the joke but for the idiom *vocem deducere*. The metre is the same one Accius has just used for a prophecy about the destiny of Rome.',
'**This is how the label on that excerpt was arrived at**, incidentally. The verse fits no other long line: an iambic septenarius would need a short in the thirteenth position, where *-an-* of *videantur* is closed and long, and a trochaic octonarius leaves a longum standing on the short *vi-*. Only this reading survives, and Ribbeck\'s text of Novius, which marks the beat on the vowel, agrees with the scansion of its own trochaic lines in the same way.'
          ]
        },
        {
          author: 'Quintus Novius',
          slug: 'pomponius-bononiensis-and-quintus-novius', era: 'archaic',
          where: 'Maccus Exul, fr. 49 Ribbeck',
          gloss: 'The one verse in the app whose editor marked the beat himself',
          plain: 'Límen superum, quód mei misero saépe confregít caput,',
          source: 'bank',
          marked: 'Līmēn | sŭpĕrūm, | quōd mei | mĭsĕrō | saepĕ | cōnfrē|gīt că|pŭt,',
          pattern: '– – | ⏑ ⏑ – | – – | ⏑ ⏑ – | – ⏑ | – – | – ⏑ | ×',
          notes: [
            '**The acutes are in the text, and they are not accents.** Ribbeck prints this fragment with the beat marked on the vowel, and you can tell it is the beat rather than the word accent because of *confregít*: Latin would stress that word on its first syllable, never its last. **All four marks fall on long positions of the septenarius**, which is a nineteenth-century editor and this app\'s scanner agreeing about a verse neither could see whole.',
            '**The lintel above, which has often broken my head, poor me.** Maccus, the greedy fool of Atellan farce, is complaining about a doorway; the next verse does the same for the threshold below and his toes. The metre is the long comic line, used exactly as Plautus would use it, by a poet writing for a rougher stage.',
            '**One word has to be read as a single syllable**, *mei*, which is why this verse is worth showing. Two shorts resolve in the second foot and two more in the fourth, and with *mei* taken as two syllables instead of one the verse has eighteen and fits nothing at all. Synizesis is not a licence a scanner can guess at; it is something you hear.'
          ]
        }
      ],
      after: 'This is the second commonest metre in the app after the iambic senarius, and since v1.15.4 it turns up in every kind of drama here: comedy above all, but also the tragedies of Pacuvius and Accius, the Atellan farces of Pomponius and Novius, and Lucilius\' earliest satire. It outlives the stage in an unexpected place: the trochaic rhythm, no longer counted by quantity but by stress, is the shape of a great deal of medieval Latin verse, from marching songs to hymns, and it is still audible in the *Pange lingua*.'
    }
  };

  /* ==================================================================
     Lookup
   * ================================================================== */

  // Merge the Italian overlay in at lookup time (js/metres-it.js loads after
  // this file, and nothing is read until a controller asks).
  function localised(id, rec) {
    var it = (I18n.lang === 'it' && global.__METRES_IT__) ? global.__METRES_IT__[id] : null;
    if (!it) return rec;
    var out = {};
    Object.keys(rec).forEach(function (k) { out[k] = (it[k] != null) ? it[k] : rec[k]; });
    // examples are merged one by one, so the Italian file only carries prose
    // and never repeats the Latin, the scansion or the pattern.
    if (it.examples) {
      out.examples = rec.examples.map(function (ex, i) {
        var o = {}, src = it.examples[i] || {};
        Object.keys(ex).forEach(function (k) { o[k] = (src[k] != null) ? src[k] : ex[k]; });
        // `readings` has to be merged reading by reading for the same reason
        // the examples are: the Italian file carries only the prose, so taking
        // its array wholesale would throw away the label, the marked verse and
        // the pattern, which exist once in English and are not language.
        if (ex.readings) {
          o.readings = ex.readings.map(function (r, j) {
            var ro = {}, rsrc = (src.readings || [])[j] || {};
            Object.keys(r).forEach(function (k) { ro[k] = (rsrc[k] != null) ? rsrc[k] : r[k]; });
            return ro;
          });
        }
        return o;
      });
    }
    return out;
  }

  // The display name of a metre in the current language, page or stub alike.
  function nameOf(id) {
    var it = (I18n.lang === 'it' && global.__METRES_IT__) ? global.__METRES_IT__[id] : null;
    if (it && it.name) return it.name;
    if (METRES[id]) return METRES[id].name;
    return STUBS[id] || id;
  }

  // Resolve one excerpt. Returns { id, name, hasPage } or null when the
  // excerpt has no label yet - which is most of the bank, and is correct.
  // `index` is the fragment's position in its work, and it is needed only
  // where one work has two fragments with the SAME citation in different
  // metres: Cicero quotes two passages of Pacuvius' Chryses from the same
  // section of the De Divinatione, one in senarii and one in septenarii.
  // `frag` is the fragment object itself. It is what settles which work an
  // excerpt belongs to and where in that work it sits, and both matter: an
  // author with needsSelection: false is pooled across its works, so the
  // practice page has no ?work= to give us, and two fragments of Pacuvius'
  // Chryses carry the SAME citation in two different metres, so a citation is
  // not an identifier either. Identity settles both without guessing.
  function forFragment(slug, workId, citation, frag) {
    var node = ASSIGN[slug];
    if (!node) return null;
    if (typeof node === 'string') return record(node);

    var bank = (global.PracticeBank && global.PracticeBank.authors[slug]) || null;
    var index = null;
    if (bank) {
      for (var i = 0; i < bank.works.length; i++) {
        var work = bank.works[i];
        if (workId && work.id !== workId) continue;
        var at = frag ? work.fragments.indexOf(frag) : -1;
        if (at < 0) {
          // no object to match (a tool passing citations, say): fall back on
          // the first fragment with this citation
          for (var j = 0; j < work.fragments.length; j++) {
            if (work.fragments[j].citation === citation) { at = j; break; }
          }
        }
        if (at >= 0) { workId = work.id; index = at; break; }
      }
    }

    var w = node[workId];
    if (!w) return null;
    if (typeof w === 'string') return record(w);
    var byIdx = (w.byIndex && index != null) ? w.byIndex[index] : null;
    var byCit = byIdx || (w.byCitation && w.byCitation[citation]) || w.def || null;
    return byCit ? record(byCit) : null;
  }

  // A metre id, or a list of them with the verses each covers. The list form is
  // what a comic scene needs: Terence turns from senarii to septenarii inside a
  // single excerpt, and the label has to say where.
  function record(value) {
    if (typeof value === 'string') return { id: value, name: nameOf(value), hasPage: !!METRES[value] };
    return {
      id: value[0].m,
      name: nameOf(value[0].m),
      hasPage: !!METRES[value[0].m],
      parts: value.map(function (p) {
        return { id: p.m, name: nameOf(p.m), hasPage: !!METRES[p.m], from: p.from, to: p.to };
      })
    };
  }

  // One metre's page, in the current language.
  function get(id) {
    if (!METRES[id]) return null;
    var rec = localised(id, METRES[id]);
    rec.id = id;
    return rec;
  }

  // Every metre that has a page, for the index.
  function list() {
    return Object.keys(METRES).map(function (id) {
      var r = get(id);
      return { id: id, name: r.name, tagline: r.tagline };
    });
  }

  global.Metres = {
    forFragment: forFragment,
    get: get,
    list: list,
    nameOf: nameOf,
    ASSIGN: ASSIGN,
    STUBS: STUBS,
    PAGES: METRES
  };
})(window);
