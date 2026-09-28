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
    'saturnian': 'Saturnian',
    'trochaic-septenarius': 'Trochaic Septenarius',
    'elegiac-couplets': 'Elegiac Couplets'
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
          marked: 'Aēnĕă|dūm gĕnĕ|trīx, ‖ hŏmĭ|nūm dī|vōmquĕ vŏ|lūptās,',
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
  function forFragment(slug, workId, citation) {
    var node = ASSIGN[slug];
    if (!node) return null;
    if (typeof node === 'string') return record(node);
    if (!workId) {
      // Authors with needsSelection: false are pooled across every work, so
      // the practice page has no ?work= to give us. Find the work that holds
      // this citation instead.
      var bank = (global.PracticeBank && PracticeBank.authors[slug]) || null;
      if (bank) {
        for (var i = 0; i < bank.works.length; i++) {
          if (bank.works[i].fragments.some(function (f) { return f.citation === citation; })) {
            workId = bank.works[i].id;
            break;
          }
        }
      }
    }
    var w = node[workId];
    if (!w) return null;
    if (typeof w === 'string') return record(w);
    var byCit = (w.byCitation && w.byCitation[citation]) || w.def || null;
    return byCit ? record(byCit) : null;
  }

  function record(id) {
    return { id: id, name: nameOf(id), hasPage: !!METRES[id] };
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
