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
        '**Which is why each example below is given twice.** Once read for quantity, with the syllable lengths marked exactly as they would be in a hexameter, and once read for stress, with the ordinary Latin word accent marked. Neither is offered as the answer. Set side by side they show, in two lines, why two centuries of argument have not produced one - and they are more instructive than either reading alone, because they do not agree with each other.'
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
              marked: 'Vĭrŭm mĭhĭ, Cămēnă, ‖ īnsĕcĕ vērsūtŭm.',
              pattern: '⏑ – ⏑ ⏑ ⏑ – ⏑ ‖ – ⏑ ⏑ – – ×',
              note: 'Marked for length, exactly as a hexameter would be marked, the line comes out with **one long in its first seven syllables and three in its last six**. That is not a shape any Greek metre produces, and a quantitative schema can be fitted to it only by allowing so many substitutions that it stops predicting anything. Note also the **hiatus** at the break: *Camena, insece* would elide anywhere else in Latin verse and here does not, which is normal in Saturnians and is itself an argument that the break is a real structural boundary.'
            },
            {
              label: 'metre.reading.accentual',
              marked: 'Vírum míhi, Caména, ‖ ínsece versútum.',
              pattern: '´ ´ ´ ‖ ´ ´',
              note: 'Marked for stress instead - accent the second-last syllable if it is heavy, otherwise the third-last, and a word of two syllables on its first - the line gives **three beats and then two**. That is precisely the 3 ‖ 2 the accentual theory predicts, and read aloud that way it does sound like verse rather than like a sentence. This is why the theory has never gone away.'
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
          where: 'Epitaphium, fr. 67, v. 1',
          gloss: 'The epitaph he is said to have written for himself - and the line that breaks both theories',
          plain: 'immortales mortales si foret fas flere,',
          source: 'bank',
          readings: [
            {
              label: 'metre.reading.quantitative',
              marked: 'īmmōrtālēs mōrtālēs ‖ sī fŏrĕt fās flērĕ,',
              pattern: '– – – – – – – ‖ – ⏑ – – – ×',
              note: '**Seven long syllables in a row**, and then a second colon nearly as heavy: two short syllables in the whole line of thirteen. Nothing in Greek or Latin quantitative metre produces a line like this. If the Saturnian is a quantitative measure, then its schema has to be loose enough to accept very nearly anything - which is the central objection to the quantitative case, made here by a single verse.'
            },
            {
              label: 'metre.reading.accentual',
              marked: 'immortáles mortáles ‖ si fóret fas flére,',
              pattern: '´ ´ ‖ ´ ´ ´',
              note: 'By stress the same line gives **two beats and then three** - the exact reverse of the Livius line, where the identical rule gave three and then two. The theory that worked a moment ago does not work here. Two lines are not a sample, but they are a fair demonstration of the difficulty: **every reading of the Saturnian works somewhere and fails somewhere else**, and there is not enough surviving verse to decide between them.'
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
        'Roman comedy above all - Plautus and Terence use it constantly, and between them they account for most of the surviving examples in Latin. Then Lucilius\' earliest satire, then marching songs, popular verse, and eventually the medieval hymn.',
        'Only Lucilius is labelled with it in this app, for the reason given above. The example below is from Book 26, the earliest satire we have any of - the same book that carries the most quoted sentence in Roman satire about its own audience, where Lucilius says he does not want Manius Persius, who was famously learned, to read him, and does want Iunius Congus, who was not. That line survives only inside the preface to Pliny\'s Natural History rather than as transmitted verse, so it is left out of the scansion below.'
      ],

      examples: [
        {
          author: 'Gaius Lucilius',
          slug: 'gaius-lucilius', era: 'archaic',
          where: 'Saturae, Book 26, vv. 1-2',
          gloss: 'Refusing the richest contract in the Roman world, scanned line by line',
          plain: [
            'publicanus vero ut Asiae fiam, ut scripturarius,',
            'pro Lucilio, id ego nolo, et uno hoc non muto omnia'
          ],
          source: 'bank',
          marked: [
            'pūblĭcānŭs vēr(o) ŭt Ăsĭae ‖ fī(am), ŭt scrīptūrārĭŭs,',
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
        }
      ],
      after: 'Plautus and Terence, who use this metre more than anyone else in Latin, are in this app but carry no metre label: a comic scene moves between the spoken senarius, the recited septenarius and the lyric metres of the cantica, sometimes within a few lines, so one label on a whole excerpt would often be wrong. When those excerpts are done they will carry a list of metres with the verses each one covers.'
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
