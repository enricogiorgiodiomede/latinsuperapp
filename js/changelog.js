/*
 * changelog.js - the user-facing "What's New" history (window.ChangeLog).
 * Plain data, no logic. Each version, newest first, carries a release date
 * (ISO), a release time (HH:MM, 24h) and a timezone label (tz, e.g. CEST/EEST) -
 * rendered as "DD/MM/YYYY, HH:MM TZ" by whatsnew.js - and, in BOTH languages,
 * three ordered buckets: added / changed / deleted. An empty bucket renders
 * as "Nothing was added/changed/deleted." This is written for readers, not
 * developers - the dry technical notes live in CHANGELOG.md.
 */
(function (global) {
  'use strict';

  var VERSIONS = [
    {
      v: '1.10.3', date: 'TBD', time: 'TBC', tz: 'CEST',
      en: {
        added: [
          'Three more excerpts for the Topica, which was the one rhetorical work left looking thin. De Optimo Genere Oratorum stays at 3 because it is a genuinely short pamphlet; the Topica is a hundred sections long and can carry five. Rhetorical works 26 across five texts; Cicero 216 across 38 works. This is the last Cicero update for a good while.',
          'First, what a definition is, and the distinction the rest of the book rests on: some things exist and can be seen and touched - a farm, a house, a wall, the drip of rainwater off a roof, a slave, a beast, the furniture - and some things cannot be touched or pointed at at all, but can still be grasped by the mind. Usucapion. Guardianship. A clan. Kinship through the male line. Things with no body underneath them, which is to say most of what a legal system is made of. Cicero calls the mental shape of one of those a notion, and the word stuck: it is the ancestor of our "notion" (26-27).',
          'Then the arguments you do not make but simply hand over - documents, contracts, people - and a short, cold analysis of where authority actually comes from. Nature gives it through virtue; circumstance gives it through talent, money, age, luck, skill, experience, necessity, and sometimes just a coincidence. People believe the clever, the rich and the old, says Cicero: perhaps wrongly, but the crowd\'s opinion can hardly be shifted, and judges steer by it like everyone else. The closing line explains exactly why it works - those who stand out in such things look as though they stood out in virtue itself (73).',
          'And the last paragraph of the book, which is also the last paragraph of everything Cicero wrote about rhetoric. He signs off to his lawyer friend with a joke in the man\'s own technical vocabulary: when generous sellers hand over a house or a farm with the fixtures held back, they still leave the buyer something that looks well placed where it stands. So with what he owed Trebatius by formal conveyance, he says, he wanted to add some ornaments that were not owed (100).'
        ],
        changed: [
          'Cicero is finished at 216 excerpts across 38 works, and will now be left alone for a good while: Speeches 116, Letters 26, Philosophical works 48, Rhetorical works 26. He runs from the Verrines of 70 BC to the last sentence of the Topica, and he is well over a third of everything in this app.',
          'The Topica now has five excerpts covering the shape of the whole book: how it came to be written, what a "place" and an argument are, what a definition is, how proof from outside the case works, and the closing joke. The first and the last are the two ends of the same conversation with Trebatius.',
          'A note on how these three were chosen. The page this Latin comes from cannot set Greek, and mangles every Greek word in the book - so before picking anything, all hundred sections were checked and the damaged ones mapped: seventeen of them are unusable without repair, and the other eighty-three are clean. All three new excerpts sit well inside clean stretches. One of them also starts a sentence late, because the sentence before it contains a word the site has dropped letters from.',
          'Next in this app: the rest of Caesar\'s Age - Caesar himself, Hirtius, Lucretius, Sallust and Catullus.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Tre brani in più per i Topica, che erano l’unica opera retorica rimasta un po’ magra. Il De Optimo Genere Oratorum resta a 3 perché è davvero un opuscolo breve; i Topica sono lunghi cento paragrafi e ne reggono cinque. Opere retoriche 26 su cinque testi; Cicerone 216 su 38 opere. Questo è l’ultimo aggiornamento su Cicerone per un bel pezzo.',
          'Prima, che cosa sia una definizione, e la distinzione su cui poggia tutto il resto del libro: certe cose esistono e si possono vedere e toccare - un fondo, una casa, un muro, lo stillicidio dell’acqua dal tetto, uno schiavo, una bestia, la suppellettile - e certe altre non si possono toccare né indicare affatto, eppure si possono afferrare con la mente. L’usucapione. La tutela. La gente. La parentela per linea maschile. Cose sotto le quali non c’è alcun corpo, cioè quasi tutto ciò di cui è fatto un ordinamento giuridico. Cicerone chiama nozione la figura mentale di una di esse, e la parola è rimasta (26-27).',
          'Poi gli argomenti che non si costruiscono ma si consegnano e basta - documenti, contratti, persone - e una breve, fredda analisi di dove venga davvero l’autorevolezza. La natura la dà attraverso la virtù; la circostanza attraverso l’ingegno, il denaro, l’età, la fortuna, la competenza, l’esperienza, la necessità e talvolta un puro caso. Si crede agli ingegnosi, ai ricchi e ai vecchi, dice Cicerone: forse a torto, ma l’opinione del volgo si smuove a fatica, e i giudici si regolano su di essa come tutti gli altri. L’ultima frase spiega esattamente perché funzioni: chi spicca in quelle cose sembra spiccare nella virtù stessa (73).',
          'E l’ultimo paragrafo del libro, che è anche l’ultimo di tutto ciò che Cicerone scrisse sulla retorica. Si congeda dall’amico giurista con una battuta nel lessico tecnico di lui: quando i venditori generosi consegnano una casa o un fondo con riserva degli infissi, lasciano comunque al compratore qualcosa che sembri messa bene dov’è. Così, dice, a ciò che a Trebazio doveva per mancipazione ha voluto aggiungere qualche ornamento che non era dovuto (100).'
        ],
        changed: [
          'Cicerone è concluso a 216 brani su 38 opere, e da ora sarà lasciato in pace per un bel pezzo: Orazioni 116, Lettere 26, Opere filosofiche 48, Opere retoriche 26. Va dalle Verrine del 70 a.C. all’ultima frase dei Topica, ed è ben più di un terzo di tutto ciò che questa app contiene.',
          'I Topica hanno ora cinque brani che coprono la forma dell’intero libro: come nacque, che cosa siano un "luogo" e un argomento, che cosa sia una definizione, come funzioni la prova che viene da fuori della causa, e la battuta finale. Il primo e l’ultimo sono i due capi della stessa conversazione con Trebazio.',
          'Una nota su come sono stati scelti questi tre. La pagina da cui viene questo latino non riesce a comporre il greco e storpia ogni parola greca del libro: perciò, prima di scegliere alcunché, sono stati controllati tutti e cento i paragrafi e mappati quelli danneggiati - diciassette sono inutilizzabili senza riparazioni, gli altri ottantatré sono puliti. Tutti e tre i nuovi brani stanno ben dentro tratti puliti. Uno di essi comincia inoltre una frase più avanti, perché quella precedente contiene una parola a cui il sito ha mangiato delle lettere.',
          'Prossimo passo di questa app: il resto dell’età di Cesare, cioè Cesare stesso, Irzio, Lucrezio, Sallustio e Catullo.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.10.2', date: '2026-08-31', time: '22:28', tz: 'CEST',
      en: {
        added: [
          'Cicero is finished. The three big rhetorical works fill out to 8, 5 and 5, the rhetorical section closes at 23 excerpts across five texts, and the largest author in this app comes to rest at 213 excerpts across 38 works. Speeches 116, Letters 26, Philosophical works 48, Rhetorical works 23.',
          'De Oratore, 5 to 8. First, the claim the whole dialogue is built on and that the second book spends its length disputing: nobody will ever be a complete orator without the knowledge of every great thing and every art, because speech ought to flower and overflow out of understanding the subject. Without that, what you get is empty and, in Cicero\'s word, childish. It is the most demanding definition of an educated person that antiquity produced, and the direct ancestor of what Europe later meant by a liberal education (I.19-20).',
          'Then the laws of history, which are still the laws and are still the ones that get broken. Do not dare to say anything false; do not fail to dare to say anything true; let there be no suspicion of favour in the writing, and none of a grudge. The verb in both of the first two is "dare", which quietly makes honesty a matter of courage rather than of accuracy - anyone can avoid lying, but not everyone will print what they know (II.62-63).',
          'And Cicero on metaphor, which turns out to be an economic story before it is a literary one. It began in poverty: there was no word, so one was borrowed from elsewhere, and only later did people keep doing it for pleasure - exactly as clothes were invented against the cold and then became a way of showing who you are. His examples are not from poetry either. The vine buds, there is riot in the grass, the crops are glad: even farmers talk like this. Ordinary language is already made of metaphor (III.155-156).',
          'Brutus, 3 to 5, and now the app has both ends of the book. It opens with Cicero coming home from his province in 50 BC and hearing at Rhodes that Hortensius is dead - a man everyone assumed was his rival, and whom he calls instead a partner and a sharer in a glorious labour. Hortensius has his own entry in this app, and his single excerpt is a passage of this very book four sections later (1-2).',
          'And it closes four hundred years of Roman oratory with the two of them left as guardians of an orphaned eloquence, to be kept indoors and away from unsuitable suitors. In the middle of it comes the sentence the book exists for: he came onto the road a little late, and before the journey was finished he fell into this night of the republic. He had a little over three years left (330).',
          'Orator, 3 to 5. How do you describe a perfect orator nobody has ever met? With a sculptor. There is nothing so beautiful in any kind that something more beautiful cannot still be conceived - and when Phidias made his Zeus he was not copying any man he had seen, but had in his own mind an outstanding appearance of beauty and worked his hand towards that. This paragraph is where the European theory of the artistic ideal begins (8-9).',
          'And then, in the middle of the driest subject in the book, a piece of evidence. Cicero was standing in the crowd when a tribune ended a sentence on a particular rhythm, and the meeting erupted. He names the man, quotes the words, and then runs the experiment: change the word order and there will be nothing. Same words, same sense, no roar. He answers the objection himself a line later - that is enough for the mind, not enough for the ears (213-214).'
        ],
        changed: [
          'The rhetorical section is complete: De Oratore 8, Brutus 5, Orator 5, De Optimo Genere Oratorum 3, Topica 2. With it, Cicero is done, and he is by a long way the largest thing in the app - 213 excerpts, more than a third of the whole collection, across 38 separate works from the Verrines of 70 BC to the Philippics.',
          'The new excerpts tie the two halves of Cicero together. De Oratore now has both its claim that the orator must know everything and the two laws of history that follow from it, alongside the famous line about history as the teacher of life already here. Brutus opens and closes on the death of Hortensius, who is an author here in his own right. Orator now carries both the Platonic form of the perfect speaker and the passage where Cicero admits nobody has ever been one.',
          'Next in this app is the rest of Caesar\'s Age: Caesar himself, Hirtius, Lucretius, Sallust and Catullus.',
          'One excerpt was extended a few hours after release, on a reader\'s question. The Orator passage about the crowd roaring at a rhythm stopped just short of the best line in the book - Cicero raising the obvious objection against himself and answering it: but it is the same words and the same sense; that is enough for the mind, not enough for the ears. It had been left out because the site the Latin comes from puts a closing quotation mark in the wrong place, fourteen words too late, so that Cicero\'s own commentary ends up inside the sentence he is quoting. The mark has now been moved to where every printed edition puts it, the correction is noted on the page, and the excerpt runs to the end of the exchange.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Cicerone è finito. Le tre grandi opere retoriche salgono a 8, 5 e 5, la sezione retorica si chiude a 23 brani su cinque testi, e l’autore più grande di questa app si ferma a 213 brani su 38 opere. Orazioni 116, Lettere 26, Opere filosofiche 48, Opere retoriche 23.',
          'De Oratore, da 5 a 8. Prima la tesi su cui è costruito tutto il dialogo e che il secondo libro passa la propria lunghezza a contestare: nessuno sarà mai un oratore compiuto senza la conoscenza di ogni cosa grande e di ogni arte, perché il discorso deve fiorire e traboccare dalla comprensione della materia. Senza quella, ciò che resta è vuoto e, con la parola di Cicerone, puerile. È la definizione più esigente di uomo colto che l’antichità abbia prodotto, e l’antenata diretta di ciò che l’Europa avrebbe poi chiamato educazione liberale (I.19-20).',
          'Poi le leggi della storia, che sono ancora quelle e sono ancora quelle che si infrangono. Non osare dire nulla di falso; non tralasciare di osare nulla di vero; non ci sia nello scrivere sospetto di favore, né di rancore. Il verbo delle prime due è "osare", il che fa sommessamente dell’onestà una questione di coraggio più che di esattezza: non mentire riesce a chiunque, ma pubblicare ciò che si sa, no (II.62-63).',
          'E Cicerone sulla metafora, che si rivela una storia economica prima che letteraria. Cominciò nella povertà: mancava la parola, e allora se ne prese una in prestito altrove, e solo dopo si continuò a farlo per piacere, esattamente come i vestiti furono inventati contro il freddo e poi diventarono un modo di mostrare chi si è. E nemmeno i suoi esempi vengono dalla poesia. La vite gemma, c’è rigoglio nell’erba, le messi sono liete: così parlano perfino i contadini. La lingua comune è già fatta di metafore (III.155-156).',
          'Brutus, da 3 a 5, e ora l’app ha entrambi i capi del libro. Si apre con Cicerone che torna dalla provincia nel 50 a.C. e apprende a Rodi che Ortensio è morto: un uomo che tutti davano per suo rivale e che lui chiama invece socio e compagno in una fatica gloriosa. Ortensio ha una scheda propria in questa app, e il suo unico brano è un passo di questo stesso libro, quattro paragrafi più avanti (1-2).',
          'E chiude quattrocento anni di oratoria romana con loro due rimasti tutori di un’eloquenza orfana, da tenere in casa e lontana da pretendenti sconvenienti. Nel mezzo arriva la frase per cui il libro esiste: è entrato nella strada un poco tardi, e prima che il cammino fosse finito è caduto in questa notte della repubblica. Gli restavano poco più di tre anni (330).',
          'Orator, da 3 a 5. Come si descrive un oratore perfetto che nessuno ha mai incontrato? Con uno scultore. Non c’è nulla, in nessun genere, di tanto bello che non se ne possa concepire uno più bello; e quando Fidia fece il suo Zeus non copiava nessun uomo che avesse visto, ma aveva nella propria mente un’eccellente immagine della bellezza e vi indirizzava la mano. È da questo paragrafo che comincia la teoria europea dell’ideale artistico (8-9).',
          'E poi, nel bel mezzo dell’argomento più arido del libro, una prova. Cicerone era in mezzo alla folla quando un tribuno chiuse una frase su un certo ritmo, e l’assemblea esplose. Nomina l’uomo, cita le parole e poi conduce l’esperimento: cambia l’ordine delle parole e non resterà nulla. Stesse parole, stesso senso, nessun boato. E l’obiezione se la fa da solo una riga dopo: questo basta alla mente, non basta alle orecchie (213-214).'
        ],
        changed: [
          'La sezione retorica è completa: De Oratore 8, Brutus 5, Orator 5, De Optimo Genere Oratorum 3, Topica 2. Con essa Cicerone è concluso, ed è di gran lunga la cosa più grande dell’app: 213 brani, più di un terzo dell’intera raccolta, su 38 opere distinte, dalle Verrine del 70 a.C. alle Filippiche.',
          'I nuovi brani legano fra loro le due metà di Cicerone. Il De Oratore ha ora sia la tesi che l’oratore debba sapere tutto sia le due leggi della storia che ne discendono, accanto alla celebre frase sulla storia maestra di vita già presente. Il Brutus si apre e si chiude sulla morte di Ortensio, che qui è autore a pieno titolo. L’Orator porta ora sia la forma platonica dell’oratore perfetto sia il passo in cui Cicerone ammette che nessuno lo è mai stato.',
          'Il prossimo passo di questa app è il resto dell’età di Cesare: Cesare stesso, Irzio, Lucrezio, Sallustio e Catullo.',
          'Un brano è stato esteso poche ore dopo l’uscita, su domanda di un lettore. Il passo dell’Orator sulla folla che ruggisce per un ritmo si fermava un attimo prima della battuta migliore del libro: Cicerone che si fa da solo l’obiezione ovvia e le risponde, cioè che sono le stesse parole e lo stesso senso, e che questo basta alla mente ma non alle orecchie. Era rimasta fuori perché il sito da cui viene il latino mette una virgoletta di chiusura nel posto sbagliato, quattordici parole più in là, sicché il commento di Cicerone finisce dentro la frase che sta citando. Ora la virgoletta è stata spostata dove la mettono tutte le edizioni a stampa, la correzione è segnalata nella pagina, e il brano arriva fino alla fine dello scambio.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.10.1', date: '2026-08-31', time: '21:12', tz: 'CEST',
      en: {
        added: [
          'The last two rhetorical works join, and the category is complete at five texts and 16 excerpts. Both are short, both are odd, and both were written in a hurry in the last two years of Cicero\'s life.',
          'De Optimo Genere Oratorum, 3. It is a preface to a translation that may never have been finished, and its target is the Atticists - a group of younger Roman orators who held that the only correct Latin was plain, spare and short, and that Cicero\'s was not it. He opens by taking their premise away: poetry really does come in kinds, and mixing them is a fault, but oratory does not. Grand, plain and middle are not different species, only different degrees of one thing. The paragraph ends by naming the best epic, tragic and comic poets at Rome - Ennius, Pacuvius and Caecilius, all three of whom have their own entries in this app (1-2).',
          'Then the whole theory of speaking in a single paragraph, closing on a building: of the five parts of rhetoric, memory is the foundation and delivery is the light. Memory is what the thing stands on and nobody sees once it is finished; delivery is what lets you see it at all (5).',
          'And the reason the pamphlet exists. Cicero translated the two most famous speeches in Greek - the pair that Aeschines and Demosthenes fought the case of the crown with - and explains how: not as an interpreter but as an orator, not word for word, keeping the whole force of the words. "I did not think I should count them out to the reader, but as it were weigh them." Jerome quoted this paragraph four centuries later to defend translating the Bible by sense, and between them the two texts settled how Europe thought about translation for the next thousand years. This app follows the same rule on every page (13-14).',
          'Topica, 2. A handbook on where to find arguments, and the story of how it came to exist is better than the handbook. A lawyer friend pulled a book of Aristotle off the shelf in Cicero\'s library at Tusculum, could not make head or tail of it, and asked. Cicero told him to read it himself or find a professional teacher - and the great rhetorician, asked about Aristotle, said he had never heard of him. So Cicero wrote it out himself: at sea, from memory, without his books, and sent it back from the journey (1-5).',
          'And the definition the whole book rests on, which is also where the word "topic" comes from. A topic was not originally a subject. It was an address: a place where arguments of a particular shape are kept, so that a speaker who needs one knows which drawer to open. Then the definition of an argument itself, and the choice of words is a lawyer\'s: a reasoning that makes a doubtful thing believed - not that makes it true (7-8).'
        ],
        changed: [
          'The rhetorical works are finished as a set of five: De Oratore 5, Brutus 3, Orator 3, De Optimo Genere Oratorum 3, Topica 2. Cicero now stands at 206 excerpts across 38 works and the app\'s bank at 366.',
          'The three books shipped last time and the two shipped now talk to each other. The speeches Cicero says here that he translated are the same two the De Oratore excerpt tells the Aeschines story about - and neither translation survives. The five parts of rhetoric listed in one line of De Optimo Genere are what the Topica is a manual for the first of. And the Topica was written on the voyage Cicero turned back from to deliver the First Philippic, which is also in this app.',
          'A translation fault was caught by the length check before release and fixed. The English and Italian of the Topica definition were rendering an opening sentence that the Latin excerpt did not actually contain; the Latin was extended to cover it, rather than the sentence being dropped, because it is the sentence that says which of two subjects the book is starting from.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Entrano le ultime due opere retoriche, e la categoria è completa a cinque testi e 16 brani. Sono entrambe brevi, entrambe curiose, ed entrambe scritte in fretta negli ultimi due anni di vita di Cicerone.',
          'De Optimo Genere Oratorum, 3. È la prefazione a una traduzione che forse non fu mai terminata, e il suo bersaglio sono gli atticisti, un gruppo di oratori romani più giovani secondo i quali l’unico latino corretto era quello sobrio, scarno e breve, e quello di Cicerone non lo era. Lui esordisce togliendo loro la premessa: la poesia ha davvero dei generi, e mescolarli è un difetto, ma l’oratoria no. Grande, semplice e medio non sono specie diverse, ma solo gradi diversi di una cosa sola. Il paragrafo si chiude nominando i migliori poeti epico, tragico e comico di Roma: Ennio, Pacuvio e Cecilio, che hanno tutti e tre una scheda propria in questa app (1-2).',
          'Poi tutta la teoria del dire in un solo paragrafo, che si chiude su un edificio: delle cinque parti della retorica, la memoria è le fondamenta e l’azione è la luce. La memoria è ciò su cui la cosa poggia e che nessuno vede una volta finita; l’azione è ciò che permette di vederla (5).',
          'E la ragione per cui l’opuscolo esiste. Cicerone tradusse le due più celebri orazioni greche, quelle con cui Eschine e Demostene si combatterono il processo della corona, e spiega come: non da interprete ma da oratore, non parola per parola, conservando tutta la forza delle parole. "Non ho creduto di doverle contare al lettore, ma per così dire di doverle pesare." Girolamo citò questo paragrafo quattro secoli dopo per difendere la traduzione a senso della Bibbia, e insieme i due testi hanno stabilito come l’Europa avrebbe pensato la traduzione per i mille anni successivi. Questa app segue la stessa regola in ogni pagina (13-14).',
          'Topica, 2. Un manuale su dove trovare gli argomenti, e la storia di come nacque è migliore del manuale. Un amico giurista tirò giù dallo scaffale della biblioteca di Cicerone a Tuscolo un libro di Aristotele, non ci capì nulla e chiese aiuto. Cicerone gli disse di leggerselo da sé o di rivolgersi a un professionista, e il grande retore, interrogato su Aristotele, rispose che non ne aveva mai sentito parlare. Così Cicerone glielo scrisse lui: per mare, a memoria, senza i suoi libri, e glielo spedì dal viaggio (1-5).',
          'E la definizione su cui poggia tutto il libro, che è anche l’origine della parola "topico". Un topos non era in origine un tema. Era un indirizzo: un posto dove si tengono gli argomenti di una certa forma, così che chi ne abbia bisogno sappia quale cassetto aprire. Poi la definizione dell’argomento stesso, e la scelta delle parole è quella di un avvocato: un ragionamento che fa credere una cosa dubbia, non che la rende vera (7-8).'
        ],
        changed: [
          'Le opere retoriche sono concluse come insieme di cinque: De Oratore 5, Brutus 3, Orator 3, De Optimo Genere Oratorum 3, Topica 2. Cicerone arriva così a 206 brani su 38 opere e la raccolta dell’app a 366.',
          'I tre libri usciti la volta scorsa e i due di adesso si parlano. Le orazioni che qui Cicerone dice di aver tradotto sono le stesse due di cui il brano del De Oratore racconta la storia di Eschine, e nessuna delle due traduzioni ci è giunta. Le cinque parti della retorica elencate in una riga del De Optimo Genere sono quelle di cui i Topica sono il manuale della prima. E i Topica furono scritti durante il viaggio da cui Cicerone tornò indietro per pronunciare la Prima Filippica, anch’essa in questa app.',
          'Un errore di traduzione è stato intercettato dal controllo di lunghezza prima dell’uscita e corretto. L’inglese e l’italiano della definizione dei Topica rendevano una frase iniziale che il brano latino non conteneva; si è preferito estendere il latino perché la comprendesse, invece di togliere la frase, perché è quella che dice da quale dei due argomenti il libro stia partendo.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.10.0', date: '2026-08-31', time: '19:29', tz: 'CEST',
      en: {
        added: [
          'The rhetorical works are open. This is the last of Cicero\'s four categories and the only one that had never had anything in it, so the button has been sitting there greyed out since the chooser was built. It now holds 11 excerpts across three texts: De Oratore, Brutus and Orator - Cicero writing about the thing he was actually best at.',
          'De Oratore, 5. Written in 55 BC and set in 91, days before its host died and Italy went to war with Rome. It opens with the claim the whole of European humanism was later built on: speech is what separates us from animals, so excelling at speech is excelling at being human - and what else, Crassus asks, could ever have gathered scattered men into one place, brought them out of the wild, and given them laws and courts? (I.32-33).',
          'Then the least glamorous advice in the book, and the only piece of it that has never gone out of date: the chief exercise is the one we all avoid, which is to write as much as possible. The pen is the best teacher of speaking. Quintilian took the whole paragraph over a century later, and it is why "write, then write again" is still the only advice anybody gives (I.150).',
          'And the most quoted phrase in the book, which nearly everyone quotes wrongly: history, the witness of the ages, the light of truth, the life of memory, the teacher of life, the herald of antiquity. It is not a statement about history - it is a question about oratory, and the whole point is that only an orator can keep history alive. Read the six hammering questions that lead up to it and the sentence lands very differently (II.35-36).',
          'The longest ancient discussion of humour that survives is also in this book, and it is unsparing: we laugh at ugliness and deformity - but the joke has to point at something shameful without itself being shameful, which is the entire difference between wit and abuse. Then the reason an orator should bother: five verbs, all of them about damage (II.236).',
          'And the last thing the book teaches, which Cicero ranks above all the rest. Asked what mattered most in speaking, Demosthenes said delivery; asked what came second, delivery; third, delivery. Better still is the story of Aeschines, who lost the greatest case in Athenian history to Demosthenes, went into exile, and was asked to read both speeches aloud - and when the room marvelled at the one that had beaten him, told them they had heard nothing, because they had not heard the man deliver it (III.213).',
          'Brutus, 3. A history of Roman oratory written in 46 BC, just after a dictatorship had made public speech pointless. Cicero stops to be angry that nobody reads Cato any more, and counts his speeches: more than a hundred and fifty, which he says he has personally tracked down and read. Not one of them survives. This paragraph is the catalogue of a library that no longer exists, written by the last man known to have read it (65).',
          'Then, unprompted, the most influential sentence ever written about Latin prose. Caesar has written some notes on his own campaigns; they are naked, straight and beautiful, with the ornament stripped off like a garment, and fools will want to curl them with hot irons. Caesar is in this app, and those notes are the Gallic War excerpts you can read here. Cicero wrote this while the man was dictator and his own art had just been made useless, and the judgement has held for two thousand years (262).',
          'And Cicero on himself, which is rarer. He left Rome at twenty-seven with a voice he was wrecking and a style nobody could stop, and spent two years in Greece with a teacher whose job was to build banks around a river in flood. "I came home two years later not only better trained but almost changed" (316).',
          'Orator, 3. The definition European rhetoric taught for the next fifteen hundred years: the eloquent man is the one who speaks so as to prove, to delight, and to sway. Proof is a matter of necessity, delight of charm, swaying of victory - and the three duties map onto the three styles, so that plain, middle and grand stop being flavours and become tools (69).',
          'Then the moment Cicero admits what he is doing. He has been describing the perfect orator; you will say nobody was ever like that; so be it. He is arguing about what he wants, not what he has seen, and the model is Plato: a form nobody has ever met and everyone can hold in mind. It is not a portrait, it is a specification - which is exactly why it could be aimed at for the next fifteen centuries (100-101).',
          'And the sentence that is carved on library walls, restored to the syllabus it actually belongs to: not to know what happened before you were born is to be always a child. The line everyone drops is the one that explains it - what is a human life, unless it is woven into the lives that came before it by the memory of old things? (120).'
        ],
        changed: [
          'All four of Cicero\'s categories now have material in them: Speeches 116, Letters 26, Philosophical works 48, Rhetorical works 11. That is 201 excerpts across 36 works by one author, and the app\'s bank passes 361.',
          'The three new texts talk to the rest of the app constantly, and the notes follow the threads. Brutus judges Cato the Elder and Caesar, both of whom have their own entries here, so you can go and check both verdicts against the actual excerpts. Orator points back at De Oratore nine years earlier, and De Oratore\'s grand claim about history reappears in Orator as a flat professional instruction. Brutus 316, on being taught restraint in Rhodes, is Cicero taking his own advice from De Oratore.',
          'Two small repairs to the source text, both declared in the notes. In one place The Latin Library sets a capital V where the word is Ut, and in another it drops a stray dash between a noun and the adjective agreeing with it. Everything else is reproduced exactly as printed.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Le opere retoriche sono aperte. È l’ultima delle quattro categorie di Cicerone e l’unica che non avesse mai contenuto nulla, sicché il pulsante è rimasto lì spento da quando il menu è stato costruito. Ora contiene 11 brani su tre testi: De Oratore, Brutus e Orator, cioè Cicerone che scrive della cosa in cui era davvero il più bravo.',
          'De Oratore, 5. Scritto nel 55 a.C. e ambientato nel 91, pochi giorni prima che il padrone di casa morisse e l’Italia entrasse in guerra con Roma. Si apre con la tesi su cui sarebbe stato poi costruito tutto l’umanesimo europeo: la parola è ciò che ci separa dagli animali, e dunque eccellere nella parola è eccellere nell’essere uomini. E che altro, chiede Crasso, avrebbe mai potuto radunare in un solo luogo uomini dispersi, tirarli fuori dalla vita selvaggia e dare loro leggi e tribunali? (I.32-33).',
          'Poi il consiglio meno affascinante del libro, e l’unico che non sia mai passato di moda: l’esercizio principale è quello che tutti evitiamo, cioè scrivere il più possibile. La penna è il miglior maestro del dire. Quintiliano si prese il paragrafo per intero un secolo dopo, ed è il motivo per cui "scrivi, e poi riscrivi" resta l’unico consiglio che chiunque dia (I.150).',
          'E la frase più citata del libro, che quasi tutti citano male: la storia, testimone dei tempi, luce della verità, vita della memoria, maestra di vita, messaggera dell’antichità. Non è un’affermazione sulla storia: è una domanda sull’oratoria, e il punto è che solo un oratore può tenere viva la storia. Si leggano le sei domande martellanti che la precedono e la frase suona molto diversa (II.35-36).',
          'In questo libro sta anche la più lunga trattazione antica del comico che ci sia giunta, ed è spietata: si ride della bruttezza e della deformità, ma la battuta deve additare qualcosa di turpe senza essere turpe essa stessa, ed è tutta qui la differenza fra arguzia e insulto. Poi il motivo per cui un oratore dovrebbe occuparsene: cinque verbi, tutti di danno (II.236).',
          'E l’ultima cosa che il libro insegna, quella che Cicerone mette sopra tutte le altre. Richiesto di che cosa contasse di più nel dire, Demostene rispose l’azione; richiesto che cosa venisse secondo, l’azione; terzo, l’azione. Meglio ancora è la storia di Eschine, che perse contro Demostene il più grande processo della storia ateniese, andò in esilio e fu pregato di leggere ad alta voce entrambe le orazioni: e quando la sala si meravigliò di quella che lo aveva battuto, disse che non avevano sentito niente, perché non avevano sentito lui pronunciarla (III.213).',
          'Brutus, 3. Una storia dell’oratoria romana scritta nel 46 a.C., subito dopo che una dittatura aveva reso inutile la parola pubblica. Cicerone si ferma ad arrabbiarsi perché nessuno legge più Catone, e ne conta le orazioni: più di centocinquanta, che dice di avere personalmente cercato e letto. Non una ce n’è giunta. Quel paragrafo è il catalogo di una biblioteca che non esiste più, scritto dall’ultimo uomo di cui si sappia che la lesse (65).',
          'Poi, senza che nessuno gliel’abbia chiesto, la frase più influente mai scritta sulla prosa latina. Cesare ha scritto certi appunti sulle proprie campagne: sono nudi, diritti e belli, spogliati dell’ornamento come di una veste, e gli sciocchi vorranno arricciarli col ferro caldo. Cesare è in questa app, e quegli appunti sono i brani della guerra gallica che potete leggere qui. Cicerone lo scrisse mentre quell’uomo era dittatore e la sua stessa arte era appena stata resa inutile, e il giudizio ha retto duemila anni (262).',
          'E Cicerone su se stesso, cosa più rara. Lasciò Roma a ventisette anni con una voce che si stava rovinando e uno stile che nessuno riusciva a fermare, e passò due anni in Grecia con un maestro il cui compito era costruire argini attorno a un fiume in piena. "Tornai due anni dopo non solo più esercitato, ma quasi cambiato" (316).',
          'Orator, 3. La definizione che la retorica europea avrebbe insegnato per i quindici secoli seguenti: eloquente è colui che parla in modo da provare, dilettare e commuovere. Provare è cosa di necessità, dilettare di piacevolezza, commuovere di vittoria; e i tre compiti corrispondono ai tre stili, sicché il semplice, il medio e il sublime smettono di essere gusti e diventano strumenti (69).',
          'Poi il momento in cui Cicerone ammette che cosa stia facendo. Ha descritto l’oratore perfetto; dirai che nessuno fu mai così; e sia. Discute di ciò che desidera, non di ciò che ha visto, e il modello è Platone: una forma che nessuno ha mai incontrato e che tutti possono tenere nella mente. Non è un ritratto, è una specifica, ed è esattamente per questo che per quindici secoli ci si è potuti mirare (100-101).',
          'E la frase incisa sui muri delle biblioteche, restituita al programma di studi a cui appartiene davvero: ignorare che cosa sia accaduto prima che tu nascessi significa restare sempre bambini. La riga che tutti tralasciano è quella che la spiega: che cos’è la vita di un uomo, se non è intessuta con quelle che l’hanno preceduta attraverso la memoria delle cose antiche? (120).'
        ],
        changed: [
          'Tutte e quattro le categorie di Cicerone hanno ora del materiale: Orazioni 116, Lettere 26, Opere filosofiche 48, Opere retoriche 11. Sono 201 brani su 36 opere di un solo autore, e la raccolta dell’app supera i 361.',
          'I tre nuovi testi dialogano di continuo con il resto dell’app, e le note seguono i fili. Il Brutus giudica Catone il Censore e Cesare, che qui hanno una scheda ciascuno, così si può andare a verificare entrambi i verdetti sui brani veri. L’Orator rimanda al De Oratore di nove anni prima, e la solenne affermazione del De Oratore sulla storia riappare nell’Orator come piatta istruzione professionale. Il Brutus 316, sull’imparare la misura a Rodi, è Cicerone che segue il consiglio che aveva dato nel De Oratore.',
          'Due piccole riparazioni al testo della fonte, entrambe dichiarate nelle note. In un punto The Latin Library stampa una V maiuscola dove la parola è Ut, e in un altro lascia cadere un trattino spurio fra un sostantivo e l’aggettivo che gli concorda. Tutto il resto è riprodotto esattamente come stampato.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.9.4', date: '2026-08-31', time: '18:19', tz: 'CEST',
      en: {
        added: [
          'A last pass over the philosophical works before the rhetorical ones begin: one more excerpt each for On the Commonwealth, the Dream of Scipio and the Stoic Paradoxes, and one new text. The section now holds 48 excerpts across 10 works, and it is finished.',
          'De Fato, 3, new. It is the third panel of a trilogy - On the Nature of the Gods, then On Divination, then this - and it asks the question the other two were circling: if everything has a cause, is anything up to us? The book is damaged at both ends, and the man Cicero is arguing with is Aulus Hirtius, consul designate, who has his own entry in this app. They are at Puteoli in the summer of 44 BC, spending their days trying to work out how to stop another civil war. Within eighteen months Hirtius was dead at Mutina and Cicero was on Antony\'s proscription list.',
          'It opens with a physiognomist called Zopyrus, who inspected Socrates\' face and announced that the man was stupid, dull and a womaniser - at which Alcibiades, who was present, burst out laughing. The point is serious: what you are born with is a starting condition and not a verdict, and the passage ends on the sentence the whole book turns on, that removing a vice lies not in natural causes but in will, effort and training (10-11).',
          'Then the oldest objection to fatalism that people still make. If it is fated that you recover, you will recover whether or not you call a doctor; so why call the doctor? The Greeks called it the lazy argument, and Chrysippus answered it by inventing a category: some things are fated on their own, and some are fated together with the things that bring them about. You cannot say Milo will wrestle at Olympia whatever happens, because wrestling has an opponent built into it - and calling the doctor is just as much fated as getting better. The notes set this against chapter XXV of Machiavelli\'s Prince, which opens with the same objection and answers it in a strikingly similar shape (28-30).',
          'And the most famous image in Stoic philosophy: the cylinder. Whoever shoved it gave it the start of its motion, but did not give it its ability to roll - that came with being a cylinder. So too an impression arrives from outside and stamps itself on your mind, but what you do with it comes from the kind of thing you are. Push a cone instead and it goes in a circle; push a cube and it does not move at all. Your character is the shape (42-43).',
          'De Re Publica, 4 to 5: Romulus choosing where to put Rome, and the argument that a coastline is a liability. A city on the sea can be attacked by an enemy nobody saw coming, and worse, it is corrupted by its own harbour, because what gets imported is not only foreign goods but foreign habits (II.5-7).',
          'The Dream of Scipio, 4 to 5. Having been shown where the dead go and how good it is there, Scipio asks why he should wait, and his dead father tells him he may not leave his post: men are sentries set to guard the earth, and going without orders is desertion. Read it beside the Tusculans in this app, where twelve years later Cicero uses almost the same words about Cato\'s suicide. Through Macrobius\' commentary, which was one of the most copied books of the Middle Ages, this passage is one of the main routes by which the classical ban on suicide reached Christian Europe (VI.15).',
          'The Stoic Paradoxes, 2 to 3: the sixth and last paradox, that only the wise man is rich, aimed at an unnamed show-off usually taken to be Crassus. It is the same trick as the paradox on freedom already here - take a word everyone uses for an external fact and move it inside the person - and it does not ask you to be poor, only to stop wanting (42-43).'
        ],
        changed: [
          'The philosophical section is complete at 48 excerpts across 10 works, in the order the works were written: On the Commonwealth, the Dream of Scipio, the Stoic Paradoxes, the Tusculans, On the Nature of the Gods, On Divination, On Fate, On Old Age, On Friendship, On Duties.',
          'Cicero\'s list of works on his author page now includes De Fato, which had been missing from it.',
          'A quiet repair behind the scenes. The app normally loads the era texts live, but when the site is opened straight from a folder rather than through a web address, browsers block that and it falls back to an embedded copy instead. That embedded copy had silently fallen behind by about 2,700 characters, so anyone opening the files from disk was seeing an older version of Cicero\'s page. It is back in step, and there is now a script that rebuilds it, so it cannot drift again unnoticed.',
          'A correction to the Italian, spotted by a reader. In the new Dream of Scipio excerpt the Latin pairs two things together - you, Publius, and all dutiful men - with a construction Italian renders as \'sia ... sia\', not as a plain \'e ... e\'. The English had it right; the Italian had followed the Latin word for word. Every other Italian translation in the app was checked for the same slip, and there was none.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Un ultimo giro sulle opere filosofiche prima che comincino quelle retoriche: un brano in più a testa per Lo stato, il Sogno di Scipione e i Paradossi stoici, e un testo nuovo. La sezione conta ora 48 brani su 10 opere, ed è finita.',
          'De Fato, 3, nuovo. È il terzo pannello di una trilogia - La natura degli dèi, poi La divinazione, poi questo - e pone la domanda attorno a cui giravano gli altri due: se tutto ha una causa, c’è qualcosa che dipende da noi? Il libro è mutilo all’inizio e alla fine, e l’uomo con cui Cicerone discute è Aulo Irzio, console designato, che ha una scheda propria in questa app. Sono a Pozzuoli nell’estate del 44 a.C. e passano le giornate a cercare il modo di evitare un’altra guerra civile. Nel giro di diciotto mesi Irzio era morto a Modena e Cicerone era nelle liste di proscrizione di Antonio.',
          'Si apre con un fisiognomo di nome Zopiro, che esaminò il volto di Socrate e annunciò che quell’uomo era stupido, ottuso e donnaiolo, al che Alcibiade, che era presente, scoppiò a ridere. Il punto è serio: ciò con cui si nasce è una condizione di partenza, non una sentenza, e il passo si chiude sulla frase su cui ruota tutto il libro, e cioè che togliersi un vizio non sta nelle cause naturali ma nella volontà, nell’impegno e nella disciplina (10-11).',
          'Poi l’obiezione più antica al fatalismo fra quelle che si fanno ancora. Se è destino che tu guarisca, guarirai che tu chiami o non chiami il medico; e allora perché chiamarlo? I greci la chiamavano argomentazione pigra, e Crisippo rispose inventando una categoria: certe cose sono fatali da sole, altre sono fatali insieme a ciò che le produce. Non si può dire che Milone lotterà a Olimpia qualunque cosa accada, perché nella lotta è compreso un avversario; e chiamare il medico è tanto fatale quanto guarire. Le note mettono tutto questo a confronto con il capitolo XXV del Principe di Machiavelli, che si apre sulla stessa obiezione e le risponde in una forma sorprendentemente simile (28-30).',
          'E l’immagine più celebre della filosofia stoica: il cilindro. Chi lo ha spinto gli ha dato l’inizio del movimento, ma non gli ha dato la capacità di rotolare: quella gli viene dall’essere un cilindro. Allo stesso modo un’immagine arriva da fuori e si imprime nella tua mente, ma quello che ne fai viene dal tipo di cosa che sei. Spingi invece un cono e gira in tondo; spingi un cubo e non si muove affatto. Il tuo carattere è la forma (42-43).',
          'De Re Publica, da 4 a 5: Romolo che sceglie dove mettere Roma, e la tesi che una costa sia un rischio. Una città sul mare può essere assalita da un nemico che nessuno ha visto arrivare e, quel che è peggio, viene corrotta dal proprio porto, perché ciò che si importa non sono soltanto merci straniere ma anche costumi stranieri (II.5-7).',
          'Il Sogno di Scipione, da 4 a 5. Dopo che gli è stato mostrato dove vanno i morti e quanto vi si stia bene, Scipione chiede perché mai dovrebbe aspettare, e il padre morto gli risponde che non gli è lecito lasciare il suo posto: gli uomini sono sentinelle poste a guardia della terra, e andarsene senza ordini è diserzione. Da leggere accanto alle Tusculanae presenti in questa app, dove dodici anni dopo Cicerone usa quasi le stesse parole a proposito del suicidio di Catone. Attraverso il commento di Macrobio, uno dei libri più copiati del Medioevo, questo passo è una delle vie principali per cui il divieto classico del suicidio è arrivato all’Europa cristiana (VI.15).',
          'I Paradossi stoici, da 2 a 3: il sesto e ultimo paradosso, che solo il sapiente è ricco, rivolto a un ostentatore mai nominato che di solito si identifica con Crasso. È lo stesso trucco del paradosso sulla libertà già presente qui - prendere una parola che tutti usano per un fatto esterno e spostarla dentro la persona - e non chiede di essere poveri, ma solo di smettere di volere (42-43).'
        ],
        changed: [
          'La sezione filosofica è completa a 48 brani su 10 opere, nell’ordine in cui le opere furono scritte: Lo stato, il Sogno di Scipione, i Paradossi stoici, le Tusculanae, La natura degli dèi, La divinazione, Il fato, La vecchiaia, L’amicizia, I doveri.',
          'L’elenco delle opere di Cicerone nella sua scheda d’autore comprende ora anche il De Fato, che vi mancava.',
          'Una riparazione silenziosa dietro le quinte. Di norma l’app carica i testi delle epoche dal vivo, ma quando il sito viene aperto direttamente da una cartella invece che tramite un indirizzo web i browser lo impediscono, e allora si ripiega su una copia incorporata. Quella copia era rimasta indietro di circa 2.700 caratteri senza che nessuno se ne accorgesse, sicché chi apriva i file da disco vedeva una versione vecchia della scheda di Cicerone. Ora è di nuovo allineata, e c’è uno script che la ricostruisce, così non potrà più sfasarsi di nascosto.',
          'Una correzione all’italiano, segnalata da un lettore. Nel nuovo brano del Sogno di Scipione il latino accosta due termini - te, Publio, e tutti gli uomini pii - con un costrutto che in italiano si rende con \'sia ... sia\' e non con un semplice \'e ... e\'. L’inglese era corretto; l’italiano aveva seguito il latino parola per parola. Tutte le altre traduzioni italiane dell’app sono state controllate per la stessa svista, e non ce n’erano.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.9.3', date: '2026-08-30', time: '21:37', tz: 'CEST',
      en: {
        added: [
          'Cicero\'s philosophical works are finished: 8 new excerpts, and the section now holds 42 across 9 texts. One new work joins, and the two shortest and warmest of the dialogues, on friendship and on old age, grow from 5 excerpts each to 8.',
          'Paradoxa Stoicorum, 2, the odd one out and by a distance the easiest philosophical Latin Cicero wrote. It takes six Stoic slogans - the sort of thing nobody outside a lecture room would accept - and argues them as if in court, for fun. The preface explains where the idea came from: Cicero had watched Brutus\'s uncle Cato hold the Senate with philosophy, and decided he could go further. It contains the sentence that is the creed of the whole Roman rhetorical tradition, and is rather alarming if you sit with it: nothing is so incredible that speaking cannot make it plausible (1-3).',
          'And the fifth paradox, that only the wise man is free and every fool a slave, which opens with the shortest definition of liberty in Latin: what is freedom? The power to live as you wish. Then he spends the rest of the paragraph taking it back, because it turns out that living as you wish means living as you ought. He published this in 46 BC, the year Caesar became dictator for the third time (34).',
          'De Amicitia, 5 to 8. The first law of friendship, written out like an actual statute, with ten commands in a row and everything hanging on one word - we may ask honourable things of our friends, and nothing else (44). Then the answer to why anyone needs friends at all: a saying passed down from old men to older men, that if you climbed up to heaven and saw the whole universe and the beauty of the stars, the wonder would taste of nothing if there were nobody to tell. Read it beside the Dream of Scipio in this app, where a man really is taken up and really does look down (88).',
          'And the problem with the advice-giving: nobody enjoys being told the truth. Cicero has Laelius quote a line of Terence - who also has an entry here - and call the playwright a personal friend, which is a wink at the old rumour that Terence\'s comedies were really written by Laelius and Scipio. It ends on a definition of tyranny that lands hard in 44 BC: with a tyrant you live one way, with a friend another (89).',
          'De Senectute, 5 to 8. The plan of the whole dialogue in one paragraph: the four charges against old age, which Cato then answers one at a time for the rest of the book. The app\'s other excerpts from the work sit one in each of the four blocks, so this is the map for them (15).',
          'The answer to the third charge, that old age takes away pleasure, is to thank it for that. Cato reports a speech he heard second-hand at Tarentum from Archytas - the same Pythagorean quoted in De Amicitia, and both passages arrived in this update together - arguing that bodily pleasure is the deadliest thing nature gave us, and that treason, revolution and dealing with the enemy all come out of it. The whole thing is reported speech from beginning to end, which makes it an unusually good exercise (39-41).',
          'And the condition the entire book depends on, added near the end almost in passing: he is not praising old age, he is praising an old age that was built earlier. Grey hair cannot snatch authority all of a sudden. What follows is a list of what respect actually looked like in Rome, and it is startlingly small and daily - being greeted, being made way for, having people stand up, being walked to the forum and walked home, being asked (62-63).'
        ],
        changed: [
          'The philosophical section is now complete and sits in the order the works were written: De Re Publica, the Dream of Scipio, Paradoxa Stoicorum, the Tusculans, On the Nature of the Gods, On Divination, On Old Age, On Friendship, On Duties. Nine texts, 42 excerpts, from 54 BC to the last months of Cicero\'s life.',
          'Every excerpt already in On Friendship and On Old Age was re-read against its Latin, as always happens when a text gets new material. One small thing came out of it: the translation of the Milo passage called him "Milo of Croton", which is true and helpful but is not what the Latin says, so the identification has moved into the notes where it belongs.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Le opere filosofiche di Cicerone sono finite: 8 nuovi brani, e la sezione ne conta ora 42 su 9 testi. Entra un’opera nuova, e i due dialoghi più brevi e più affettuosi, sull’amicizia e sulla vecchiaia, passano da 5 brani ciascuno a 8.',
          'Paradoxa Stoicorum, 2, la mosca bianca del gruppo e di gran lunga il latino filosofico più facile che Cicerone abbia scritto. Prende sei slogan stoici - il genere di tesi che nessuno accetterebbe fuori da un’aula - e li argomenta come in tribunale, per divertimento. La prefazione spiega da dove venne l’idea: Cicerone aveva visto lo zio di Bruto, Catone, tenere il Senato con la filosofia, e decise di poter fare di più. Contiene la frase che è il credo di tutta la tradizione retorica romana, e che a pensarci bene inquieta parecchio: nulla è tanto incredibile che il parlare non possa renderlo plausibile (1-3).',
          'E il quinto paradosso, che solo il sapiente è libero e ogni stolto è schiavo, che si apre con la più breve definizione di libertà in latino: che cos’è la libertà? Il potere di vivere come vuoi. Poi passa il resto del paragrafo a riprendersela, perché si scopre che vivere come vuoi significa vivere come devi. Lo pubblicò nel 46 a.C., l’anno in cui Cesare divenne dittatore per la terza volta (34).',
          'De Amicitia, da 5 a 8. La prima legge dell’amicizia, redatta come una legge vera, con dieci comandi di fila e tutto appeso a una parola sola: agli amici possiamo chiedere cose oneste, e nient’altro (44). Poi la risposta alla domanda sul perché si abbia bisogno di amici: un detto tramandato da vecchi a vecchi più anziani, secondo cui se salissi in cielo e vedessi l’universo intero e la bellezza degli astri, la meraviglia non saprebbe di nulla se non ci fosse nessuno a cui raccontarla. Da leggere accanto al Sogno di Scipione in questa app, dove un uomo viene davvero portato lassù e davvero guarda in basso (88).',
          'E il problema dei consigli: a nessuno piace sentirsi dire la verità. Cicerone fa citare a Lelio un verso di Terenzio - che ha una scheda anche lui qui - e gli fa chiamare il commediografo un amico personale, il che è una strizzata d’occhio alla vecchia diceria secondo cui le commedie di Terenzio le avrebbero scritte in realtà Lelio e Scipione. Si chiude su una definizione di tirannide che nel 44 a.C. pesa parecchio: con un tiranno si vive in un modo, con un amico in un altro (89).',
          'De Senectute, da 5 a 8. Il piano dell’intero dialogo in un paragrafo: le quattro accuse contro la vecchiaia, a cui Catone risponde una per una per tutto il resto del libro. Gli altri brani dell’opera presenti nell’app stanno uno per ciascuno dei quattro blocchi, e questo ne è dunque la mappa (15).',
          'La risposta alla terza accusa, che la vecchiaia toglie i piaceri, consiste nel ringraziarla. Catone riferisce un discorso che aveva sentito di seconda mano a Taranto da Archita - lo stesso pitagorico citato nel De Amicitia, e i due passi sono arrivati insieme in questo aggiornamento - secondo cui il piacere del corpo è la cosa più letale che la natura ci abbia dato, e che da esso nascono tradimenti, rivoluzioni e intese con il nemico. Il tutto è discorso indiretto dall’inizio alla fine, il che ne fa un esercizio particolarmente utile (39-41).',
          'E la condizione da cui dipende tutto il libro, aggiunta verso la fine quasi di sfuggita: non sta lodando la vecchiaia, sta lodando una vecchiaia costruita prima. I capelli bianchi non afferrano l’autorità all’improvviso. Segue l’elenco di che cosa fosse davvero il rispetto a Roma, ed è sorprendentemente piccolo e quotidiano: essere salutati, che ci si faccia da parte al proprio passaggio, che ci si alzi in piedi, essere accompagnati al foro e ricondotti a casa, essere consultati (62-63).'
        ],
        changed: [
          'La sezione filosofica è ora completa e si presenta nell’ordine in cui le opere furono scritte: De Re Publica, il Sogno di Scipione, i Paradoxa Stoicorum, le Tusculanae, La natura degli dèi, La divinazione, La vecchiaia, L’amicizia, I doveri. Nove testi, 42 brani, dal 54 a.C. agli ultimi mesi di vita di Cicerone.',
          'Ogni brano già presente nell’Amicizia e nella Vecchiaia è stato riletto sul latino, come avviene sempre quando un testo riceve materiale nuovo. Ne è uscita una piccola cosa: la traduzione del passo su Milone lo chiamava “Milone di Crotone”, il che è vero e utile ma non è quello che dice il latino, e l’identificazione si è spostata nelle note, dove le compete.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.9.2', date: '2026-08-30', time: '20:39', tz: 'CEST',
      en: {
        added: [
          'Two new philosophical works, 6 excerpts, and between them they are the closest thing Rome produced to a public inquiry into its own religion. De Natura Deorum gives one book to each school and lets them tear each other apart; De Divinatione is its sequel, and this time the two speakers are Cicero and his own brother.',
          'De Natura Deorum, 3, one per book, so each of the three schools speaks in its own voice. Book I is the Epicurean Velleius, introduced as a man who has never doubted anything in his life and who walks on as if he had just come down from a council of the gods. His attack on the idea of a god who builds the world is to take the metaphor literally and ask for the paperwork: what were the tools, the crowbars, the cranes, and who were the labourers? (I.18-19).',
          'Book II is the Stoic Balbus, who proves the gods exist by telling a story he got from Aristotle, and which survives only because he told it. Imagine people who had lived their whole lives underground in beautiful lit rooms, who had heard rumours that gods exist but had never once been outside; then the earth opens and they walk out, and see the sea, and the sun, and then night, and the stars. The whole thing is one sentence, and the verdict waits until the last six words (II.95).',
          'Book III is Cotta the sceptic, who is also a serving priest of the Roman state, and who explains before he starts how he holds both jobs at once. From a philosopher he demands an argument; from his ancestors he accepts the whole of Roman religion with no argument at all. It is not evasion, it is an accurate description of how Roman religion worked, and it is the sentence to take away from the entire dialogue (III.5-6).',
          'De Divinatione, 3. Book I is Quintus making the case for reading the future in livers and birds and dreams, and Cicero gave his brother the strongest argument in the book: you are asking why it happens, and the question is whether it happens. Nobody can explain the magnet either, and you believe in the magnet (I.86).',
          'Book II is Cicero taking it apart, and enjoying it. How many of these predictions actually come true, and if one does, how do you rule out coincidence? Then Hannibal, old and in exile, listening to a king refuse battle because the entrails said no: would you rather trust a scrap of veal than a veteran general? The example that follows is Caesar sailing for Africa against the chief soothsayer\'s advice and winning the war (II.52).',
          'And the last page of the last of these dialogues, where Cicero says exactly how far the demolition goes. Superstition has to be pulled up by the roots; religion is not pulled up with it. That distinction is still in English, Italian, French and German, and this is the sentence that carried it (II.148).'
        ],
        changed: [
          'The two works cross-reference each other and the app now shows it. De Divinatione names De Natura Deorum out loud in its closing page; the etymology behind superstition and religion is explained in De Natura Deorum II; and Cotta refusing to let a philosopher appeal to the ancestors is answered, in Cicero\'s own voice, by the ending of De Divinatione. Outside Cicero, the notes point to Lucretius, who runs Aristotle\'s thought experiment about the sky and draws the opposite conclusion from it, to Caesar, and to Cato the Elder, whose joke about two soothsayers being unable to look at each other without laughing sits one sentence away from the veal.',
          'A note on the source, for anyone comparing with a printed text. De Natura Deorum marks its sections in brackets, but De Divinatione marks them with a chapter numeral in roman and a bare number for the section, which the app cannot tell apart from a number inside the Latin. Every De Divinatione excerpt therefore stays inside a single numbered section, and the numbers you see are the app\'s own.',
          'Two notes added to the excerpts on request, both pointing outside Cicero. Aristotle\'s people who had never seen the sky are set beside Plato\'s cave, which they closely resemble and completely contradict: Plato\'s prisoners are deprived and the climb leads away from the visible world, while Aristotle\'s live in beautiful lit rooms and the sky proves its point simply by being looked at. And the closing page of De Divinatione is set beside Lucretius, who pulls up superstition and leaves the gods standing exactly as Cicero does, from the opposite school and in verse - with the labels swapped, since for Lucretius it is religio that is the villain.',
          'A small display fault fixed while those notes were going in: three excerpts were showing a stray asterisk in their notes, because the site\'s text formatter cannot handle an italic phrase inside a bold one. The three - the Machiavelli note on De Re Publica, the Ennius note on the Tusculans, and the new Lucretius note - have been rephrased so they display properly, and every excerpt in the app was checked for the same fault.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Due nuove opere filosofiche, 6 brani, e insieme sono la cosa più simile a un’inchiesta pubblica che Roma abbia prodotto sulla propria religione. Il De Natura Deorum assegna un libro a ciascuna scuola e le lascia sbranarsi a vicenda; il De Divinatione ne è il seguito, e questa volta i due interlocutori sono Cicerone e suo fratello.',
          'De Natura Deorum, 3, uno per libro, così che ciascuna delle tre scuole parli con la propria voce. Il libro I è l’epicureo Velleio, presentato come un uomo che non ha mai dubitato di nulla in vita sua e che entra in scena come se fosse appena sceso da un consiglio degli dèi. Il suo attacco all’idea di un dio che costruisce il mondo consiste nel prendere la metafora alla lettera e chiedere i documenti del cantiere: quali erano gli attrezzi, le leve, le gru, e chi erano i manovali? (I.18-19).',
          'Il libro II è lo stoico Balbo, che dimostra l’esistenza degli dèi raccontando una storia presa da Aristotele, e che sopravvive solo perché lui la raccontò. Immaginate uomini vissuti da sempre sotto terra in belle stanze illuminate, che degli dèi avessero solo sentito dire, senza essere mai usciti una volta; poi la terra si apre, escono, e vedono il mare, e il sole, e poi la notte, e le stelle. Il tutto è una sola frase, e il verdetto aspetta le ultime sei parole (II.95).',
          'Il libro III è lo scettico Cotta, che è anche un sacerdote in carica dello stato romano, e che prima di cominciare spiega come tenga insieme le due cose. A un filosofo chiede un ragionamento; dai suoi antenati accetta tutta la religione romana senza alcun ragionamento. Non è una scappatoia: è una descrizione esatta di come funzionava la religione romana, ed è la frase da portarsi via dall’intero dialogo (III.5-6).',
          'De Divinatione, 3. Il libro I è Quinto che sostiene la causa di chi legge il futuro nei fegati, negli uccelli e nei sogni, e Cicerone ha dato al fratello l’argomento più forte del libro: tu chiedi perché accada, e la domanda è se accada. Nessuno sa spiegare nemmeno la calamita, e alla calamita tu credi (I.86).',
          'Il libro II è Cicerone che smonta tutto, e si diverte. Quante di queste previsioni si avverano davvero, e se una si avvera, come si esclude la coincidenza? Poi Annibale, vecchio e in esilio, che ascolta un re rifiutare la battaglia perché le viscere dicono di no: preferisci credere a un pezzetto di vitello piuttosto che a un vecchio generale? L’esempio che segue è Cesare che salpa per l’Africa contro il parere del sommo aruspice e vince la guerra (II.52).',
          'E l’ultima pagina dell’ultimo di questi dialoghi, dove Cicerone dice fin dove esattamente arrivi la demolizione. La superstizione va sradicata; la religione non viene sradicata con essa. Quella distinzione è ancora nell’italiano, nell’inglese, nel francese e nel tedesco, e questa è la frase che l’ha trasportata (II.148).'
        ],
        changed: [
          'Le due opere si citano a vicenda e ora l’app lo mostra. Il De Divinatione nomina apertamente il De Natura Deorum nella sua pagina finale; l’etimologia di superstizione e religione è spiegata nel De Natura Deorum II; e il rifiuto di Cotta di lasciare che un filosofo si appelli agli antenati riceve risposta, a nome di Cicerone stesso, nel finale del De Divinatione. Fuori da Cicerone, le note rimandano a Lucrezio, che conduce l’esperimento mentale di Aristotele sul cielo e ne trae la conclusione opposta, a Cesare, e a Catone il Censore, la cui battuta sui due aruspici che non riescono a guardarsi senza ridere si trova a una frase di distanza dal vitello.',
          'Una nota sulla fonte, per chi confronti con un testo a stampa. Il De Natura Deorum segna le sezioni fra parentesi quadre, mentre il De Divinatione le segna con un numerale romano di capitolo e una cifra nuda per la sezione, che l’app non riesce a distinguere da un numero interno al latino. Ogni brano del De Divinatione resta perciò dentro una sola sezione numerata, e i numeri che si vedono sono quelli dell’app.',
          'Due note aggiunte ai brani su richiesta, entrambe rivolte fuori da Cicerone. Gli uomini di Aristotele che non avevano mai visto il cielo sono messi accanto al mito della caverna di Platone, a cui somigliano moltissimo e che contraddicono del tutto: i prigionieri di Platone sono in stato di privazione e la salita porta via dal mondo visibile, mentre quelli di Aristotele vivono in belle stanze illuminate e il cielo dimostra la sua tesi semplicemente facendosi guardare. E l’ultima pagina del De Divinatione viene accostata a Lucrezio, che sradica la superstizione lasciando in piedi gli dèi esattamente come fa Cicerone, dalla scuola opposta e in versi, con le etichette invertite: per Lucrezio il colpevole è la religio.',
          'Corretto un piccolo difetto di visualizzazione emerso mentre si aggiungevano quelle note: tre brani mostravano un asterisco vagante nei commenti, perché il formattatore di testo del sito non gestisce una frase in corsivo dentro una in grassetto. I tre - la nota su Machiavelli nel De Re Publica, quella su Ennio nelle Tusculanae e la nuova nota su Lucrezio - sono stati riformulati perché si vedano correttamente, e tutti i brani dell’app sono stati controllati per lo stesso difetto.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.9.1', date: '2026-08-30', time: '18:01', tz: 'CEST',
      en: {
        added: [
          'The Tusculan Disputations join the philosophical works with 5 excerpts, one from each of four books. Cicero wrote all five books in a few months of 45 BC, in the year his daughter died, and each one takes a question and argues it out: is death an evil, is pain an evil, what is grief, what are the passions, is virtue enough to be happy.',
          'Book I, on death. The hardest case for Cicero\'s own argument: if death is no evil, why is suicide forbidden? The answer is a legal fiction - the god inside us forbids leaving our post without orders, but Cato was not a deserter, he was discharged. Cato the Younger had killed himself the year before Cicero wrote this (I.74).',
          'Book II, on pain, reaches for the example every Roman reader had actually watched: gladiators, "either ruined men or barbarians", and what blows they take without so much as changing expression. The argument is that endurance is training, not nature; the passage also tells you a great deal about what Romans thought was normal (II.41).',
          'Book III, on distress, states the diagnosis the whole cure depends on: the cause lies entirely in the opinion. What makes us wretched is not what happened but the judgement we made about it - which means it can be argued away. Read it beside the letters from Astura that Cicero was writing the same year, where the man who wrote that is hiding in a wood and losing a fight with his own weeping (III.24).',
          'And Book V gives two men from the same city. Damocles, who told the tyrant of Syracuse how happy he must be and was invited to try the throne for an evening, with a sword hanging over the couch by a single horsehair - this passage is where the phrase comes from, and no earlier version of the story survives (V.61-62). And Archimedes, whose grave the Syracusans had forgotten and denied the existence of, until a thirty-year-old Roman quaestor went looking for it in the brambles because he had memorised the verses that were carved on it (V.64-66).',
          'Book IV joins, so the five Tusculan excerpts now cover one book each. Book IV works through the passions one by one and reaches the one everybody has: love, which Cicero says is not a god but an illness, and which he prosecutes using the poets\' own evidence. Comedy is thrown out as an interested witness - it would not exist at all, he points out, if we disapproved of what it puts on stage - and tragedy is called instead. Two of the poets he quotes have their own entries here, Caecilius Statius and Ennius, and the Medea he ends on is the same one he uses to destroy Clodia in the Pro Caelio. The notes set the whole passage against Lucretius, who attacks love at length in the De Rerum Natura and reaches exactly the same verdict from the opposite philosophical school.'
        ],
        changed: [
          'A note on the source, for anyone comparing with a printed text. The five books are numbered inconsistently on the site they come from: book I marks its sections with bare numerals, book II does not mark them at all, and books III to V use brackets. Every excerpt here begins after whatever numbering there was, and the section numbers you see are the app\'s own.'
        ],
        deleted: [
          'The excerpt on the tomb of Archimedes has been taken out again, a few hours after it went in. It was one of two excerpts from book V, which left book IV with none, and one per book is the better shape for a work in five books. It is not gone for good: the passage is written up in the project notes as the first thing to restore if the Tusculans are ever given more room.'
        ]
      },
      it: {
        added: [
          'Le Tusculanae entrano fra le opere filosofiche con 5 brani, uno per ciascuno di quattro libri. Cicerone scrisse tutti e cinque i libri in pochi mesi del 45 a.C., nell’anno in cui gli morì la figlia, e ognuno prende una domanda e la discute fino in fondo: se la morte sia un male, se lo sia il dolore, che cosa sia l’afflizione, quali siano le passioni, se la virtù basti a essere felici.',
          'Libro I, sulla morte. Il caso più difficile per la tesi di Cicerone stesso: se la morte non è un male, perché il suicidio è vietato? La risposta è una finzione giuridica: il dio che è in noi ci vieta di lasciare il nostro posto senza ordini, ma Catone non fu un disertore, fu congedato. Catone Uticense si era ucciso l’anno prima che Cicerone scrivesse queste righe (I.74).',
          'Il libro II, sul dolore, ricorre all’esempio che ogni lettore romano aveva davvero visto: i gladiatori, "o uomini perduti o barbari", e i colpi che si prendono senza nemmeno cambiare espressione. La tesi è che la sopportazione sia addestramento e non natura; il passo dice anche moltissimo su che cosa i romani considerassero normale (II.41).',
          'Il libro III, sull’afflizione, enuncia la diagnosi da cui dipende tutta la cura: la causa sta tutta nell’opinione. Ciò che ci rende infelici non è quel che è accaduto ma il giudizio che ne abbiamo dato, e dunque lo si può smontare ragionando. Da leggere accanto alle lettere da Astura che Cicerone scriveva nello stesso anno, dove l’uomo che scrive questo è nascosto in un bosco e sta perdendo una lotta contro il proprio pianto (III.24).',
          'E il libro V mette in scena due uomini della stessa città. Damocle, che disse al tiranno di Siracusa quanto dovesse essere felice e fu invitato a provare il trono per una sera, con una spada sospesa sul letto a un solo crine di cavallo: è da questo passo che viene l’espressione, e non sopravvive alcuna versione anteriore della storia (V.61-62). E Archimede, la cui tomba i Siracusani avevano dimenticato e di cui negavano l’esistenza, finché un questore romano di trent’anni non andò a cercarla fra i rovi, perché ne aveva imparato a memoria i versi incisi (V.64-66).',
          'Entra il libro IV, e i cinque brani delle Tusculanae coprono ora un libro ciascuno. Il quarto libro passa in rassegna le passioni una a una e arriva a quella che hanno tutti: l’amore, che secondo Cicerone non è un dio ma una malattia, e che mette sotto processo usando le prove fornite dai poeti stessi. La commedia viene ricusata come teste interessato - non esisterebbe affatto, osserva, se disapprovassimo ciò che mette in scena - e al suo posto viene chiamata la tragedia. Due dei poeti citati hanno una scheda propria qui, Cecilio Stazio ed Ennio, e la Medea su cui si chiude è la stessa con cui distrugge Clodia nella Pro Caelio. Le note mettono tutto il passo a confronto con Lucrezio, che nel De Rerum Natura attacca a lungo l’amore e arriva esattamente allo stesso verdetto partendo dalla scuola filosofica opposta.'
        ],
        changed: [
          'Una nota sulla fonte, per chi confronti con un testo a stampa. I cinque libri sono numerati in modo incoerente sul sito da cui provengono: il libro I segna le sezioni con cifre nude, il libro II non le segna affatto, e i libri dal III al V usano le parentesi quadre. Ogni brano qui comincia dopo qualsiasi numerazione ci fosse, e i numeri di sezione che si vedono sono quelli dell’app.'
        ],
        deleted: [
          'Il brano sulla tomba di Archimede è stato tolto poche ore dopo essere entrato. Era uno dei due brani tratti dal libro V, il che lasciava il libro IV senza nulla, e per un’opera in cinque libri uno per libro è la forma migliore. Non è perduto: il passo è annotato nella documentazione del progetto come la prima cosa da ripristinare se alle Tusculanae verrà dato più spazio.'
        ]
      }
    },
    {
      v: '1.9.0', date: '2026-08-29', time: '21:02', tz: 'CEST',
      en: {
        added: [
          'The philosophical works are properly open: 13 new excerpts across three new texts, and the section now holds 5 works and 23 excerpts. De Officiis, De Re Publica, and the Dream of Scipio, which gets its own place because it is the part people are actually set to read.',
          'De Officiis, 5. Cicero wrote it for his son, a twenty-one-year-old in Athens who was drinking more than he was studying, and finished it while Antony was destroying him; it went on to become the ethics textbook of Europe. We are not born for ourselves alone - our country claims a share of us and our friends claim a share (I.22). His own most-mocked line of poetry, quoted approvingly and without saying who wrote it: let arms yield to the toga (I.77). Two rules for anyone running a state, the second being to look after the whole body of it and not one part, because doing otherwise brings in the most ruinous thing there is (I.85). Plato\'s ring of invisibility, told as a story and then turned on the reader: if nobody would ever know, not gods and not men, would you do it? (III.38-39). And Regulus, sent home on parole to argue for a prisoner exchange, arguing against it, and going back to Carthage (III.99).',
          'De Re Publica, 4. The definition the whole work rests on - a commonwealth is the property of a people, and a people is not just any crowd but a crowd held together by agreement about law and shared advantage (I.39). Why no simple constitution lasts and the best state is a mixture of all three (I.45). How too much liberty turns into slavery and a tyrant is born out of it, argued by way of weather, farming and medicine (I.68). And the claim that makes Rome different: every Greek state had a founder with a name, ours was made by many men over several lifetimes, because no mind is big enough and no committee is either (II.1-2).',
          'Somnium Scipionis, 4, as its own text. There is a place in heaven set aside for people who served their country, because nothing on earth pleases god more than a state (VI.13). Then Scipio is allowed to look down, and the earth is so small that he is ashamed of the empire - the first time anyone in European literature saw the planet from outside and used it to make a point (VI.16). The spheres make a sound too large to hear, the way the people living beside the Nile cataracts have simply gone deaf (VI.18-19). And you are not your body: the mind is the man, and know then that you are a god (VI.26).'
        ],
        changed: [
          'Cato the Elder keeps turning up. He is an author in this app\'s Archaic era, and De Re Publica II credits him with its central idea - that Rome was not designed by anybody - which is the same Cato who speaks the whole of De Senectute. The Dream cross-links to the definition of a state four books earlier, and De Officiis I.77 links to the Catilinarians it is boasting about.',
          'The reader was taught to expect a third way of numbering sections. De Officiis marks them the usual way, but De Re Publica and the Dream use round brackets - (13) instead of [13] - and the checker did not know that style, so it would have rejected perfectly good text. It does now.',
          'Two excerpts were missing a sentence of Latin that their translations already had. In De Officiis III.99 it was the opening line, where Cicero tells his son to leave the Greek fables aside and come to a real Roman case - which is the whole reason Regulus follows the story of the magic ring. In the Dream of Scipio it was the closing line, where Scipio, having just been shown the harmony of the entire cosmos, keeps glancing back down at the earth. Both restored. There is now a check that compares the length of each translation against its Latin and reports anything that looks like it covers too much or too little, which is how this kind of mistake will be caught in future.',
          'De Re Publica I.45 now follows its idea forward fifteen centuries. The cycle of constitutions Cicero compresses into one clause - each form of government decaying into its own worst version, round and round - is Polybius\'s, and Machiavelli takes it up again in the Discourses. He rehearses the cycle and then breaks it: a state will hardly ever last long enough to go round the whole circle, because a better-organised neighbour will conquer it first. Chance gets a vote that the Greek theory never gave it. What he keeps is what Cicero keeps, that the answer is a mixed constitution.',
          'And the Dream of Scipio now says why its view of the earth is remarkable. It is the earliest sustained description in Latin of the planet seen from outside, and it is accurate within its own astronomy: the moon lowest and shining with borrowed light, the stars larger than the earth, the inhabited world a dot. Everything in the European tradition of that image descends from it - Dante is reading this passage when he looks down from the stars and calls the earth the little threshing-floor that makes us so fierce. The note also says the obvious thing plainly: the philosophical works are why Cicero was read for two thousand years, and nothing in them sounds like the man who could not stop talking about his consulship.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le opere filosofiche sono aperte sul serio: 13 nuovi brani su tre testi nuovi, e la sezione conta ora 5 opere e 23 brani. De Officiis, De Re Publica e il Sogno di Scipione, che ha un posto suo perché è la parte che davvero viene assegnata da leggere.',
          'De Officiis, 5. Cicerone lo scrisse per il figlio, un ventunenne ad Atene che beveva più di quanto studiasse, e lo terminò mentre Antonio lo distruggeva; sarebbe diventato il manuale di etica dell’Europa. Non siamo nati per noi soli: una parte di noi la rivendica la patria e una parte gli amici (I.22). Il suo verso più deriso, citato con approvazione e senza dire chi l’avesse scritto: cedano le armi alla toga (I.77). Due regole per chi governa uno Stato, la seconda delle quali è occuparsi di tutto il corpo dello Stato e non di una sua parte, perché fare altrimenti vi introduce la cosa più rovinosa che ci sia (I.85). L’anello dell’invisibilità di Platone, raccontato come una storia e poi rivolto al lettore: se nessuno dovesse mai saperlo, né gli dèi né gli uomini, lo faresti? (III.38-39). E Regolo, rimandato a casa sulla parola per perorare uno scambio di prigionieri, che perora contro e torna a Cartagine (III.99).',
          'De Re Publica, 4. La definizione su cui poggia tutta l’opera: la repubblica è cosa del popolo, e il popolo non è una folla qualsiasi ma una folla tenuta insieme dall’accordo sul diritto e dalla condivisione dell’utile (I.39). Perché nessuna costituzione semplice duri, e perché lo Stato migliore sia una mescolanza di tutte e tre (I.45). Come la troppa libertà si rovesci in schiavitù e ne nasca un tiranno, argomentato attraverso il clima, l’agricoltura e la medicina (I.68). E la tesi che rende Roma diversa: ogni Stato greco ebbe un fondatore con un nome, il nostro fu fatto da molti uomini in più generazioni, perché nessuna mente è abbastanza grande e nemmeno un’assemblea lo è (II.1-2).',
          'Somnium Scipionis, 4, come testo a sé. C’è in cielo un posto riservato a chi ha servito la patria, perché nulla sulla terra piace a dio più di uno Stato (VI.13). Poi a Scipione è concesso di guardare in basso, e la terra è così piccola che si vergogna dell’impero: è la prima volta che qualcuno, nella letteratura europea, vede il pianeta da fuori e se ne serve per argomentare (VI.16). Le sfere producono un suono troppo grande per essere udito, come la gente che vive accanto alle cateratte del Nilo è semplicemente diventata sorda (VI.18-19). E tu non sei il tuo corpo: la mente è l’uomo, e sappi dunque che sei un dio (VI.26).'
        ],
        changed: [
          'Catone il Censore continua a spuntare fuori. È un autore dell’età arcaica di quest’app, e il secondo libro del De Re Publica gli attribuisce la propria idea centrale, che Roma non l’abbia progettata nessuno: è lo stesso Catone che parla per tutto il De Senectute. Il Sogno rimanda alla definizione di Stato di quattro libri prima, e il De Officiis I.77 rimanda alle Catilinarie di cui si sta vantando.',
          'Il programma di controllo ha imparato un terzo modo di numerare le sezioni. Il De Officiis le segna nel modo consueto, ma il De Re Publica e il Sogno usano le parentesi tonde - (13) invece di [13] - e il verificatore non conosceva quello stile: avrebbe rifiutato testo perfettamente corretto. Ora lo conosce.',
          'A due brani mancava una frase di latino che le loro traduzioni avevano già. Nel De Officiis III.99 era la frase iniziale, dove Cicerone dice al figlio di lasciar perdere le favole greche e di venire a un caso romano vero: che è poi la ragione per cui Regolo segue la storia dell’anello magico. Nel Sogno di Scipione era la frase finale, dove Scipione, cui è appena stata mostrata l’armonia dell’intero cosmo, continua a voltarsi a guardare in giù verso la terra. Entrambe ripristinate. Ora c’è un controllo che confronta la lunghezza di ogni traduzione con il suo latino e segnala tutto ciò che sembra coprirne troppo o troppo poco: è così che d’ora in poi questo tipo di errore verrà intercettato.',
          'Il De Re Publica I.45 ora segue la propria idea in avanti di quindici secoli. Il ciclo delle costituzioni che Cicerone comprime in una sola proposizione - ogni forma di governo che degenera nella propria versione peggiore, e da capo - è di Polibio, e Machiavelli lo riprende nei Discorsi. Ripercorre il ciclo e poi lo spezza: uno Stato non durerà quasi mai abbastanza da compiere tutto il giro, perché un vicino meglio organizzato lo conquisterà prima. Il caso ottiene un peso che la teoria greca non gli aveva mai dato. Ciò che conserva è ciò che conserva Cicerone: che la risposta sia una costituzione mista.',
          'E il Sogno di Scipione ora spiega perché la sua visione della terra sia straordinaria. È la più antica descrizione estesa in latino del pianeta visto da fuori, ed è accurata all’interno della propria astronomia: la luna più in basso di tutte e splendente di luce presa a prestito, le stelle più grandi della terra, il mondo abitato ridotto a un punto. Tutto ciò che nella tradizione europea riguarda quell’immagine discende di qui: è questo il passo che Dante sta leggendo quando dalle stelle guarda in giù e chiama la terra l’aiuola che ci fa tanto feroci. La nota dice anche la cosa ovvia con chiarezza: le opere filosofiche sono la ragione per cui Cicerone è stato letto per duemila anni, e niente in esse suona come l’uomo che non riusciva a smettere di parlare del proprio consolato.'
        ],
        deleted: []
      }
    },
    {
      v: '1.8.4', date: '2026-08-29', time: '19:51', tz: 'CEST',
      en: {
        added: [
          'De Senectute joins the philosophical works with 5 excerpts. Cicero wrote it in 44 BC and put the whole thing in the mouth of Cato the Elder at eighty-four - which means the speaker is an author this app already covers, back in the Archaic era, and the difference between the real Cato and Cicero\'s Cato is one of the more interesting things in it.',
          'Old age cannot get anything done? A helmsman does nothing either, while the crew climb the masts and bail the bilge and he sits at the stern holding the tiller - and great things are done by judgement and authority, not by speed (17). Old age weakens the body? Milo of Croton once carried an ox across the stadium at Olympia; would you rather have his strength or Pythagoras\'s mind? Each part of life has its own ripeness (32-33). And then farming, which is the part Cato was born to talk about: the earth never refuses an order and never pays back a loan without interest, and then twelve lines that follow a seed from the soil to the ear of wheat, one verb per stage (51-52).',
          'The last two are about dying. An actor does not have to stay on stage until the closing line - Roman comedies end by asking the audience to applaud, and the wise man need not wait for it; a short life is long enough, the way a farmer does not mourn spring when summer comes (70). And the final page, where Cato says he leaves life as one leaves an inn rather than a home, and looks forward to seeing his son again - the son whose body he had burned himself, when it should have been the other way round (84).'
        ],
        changed: [
          'The excerpts point at each other and at Cato\'s own book. The farming passage links to the ten excerpts of Cato\'s De Agri Cultura in the Archaic era: same subject, same man, one written in clipped instructions and the other in a sentence that takes twelve lines to grow a stalk of wheat. The actor passage links to Plautus and Terence, whose surviving comedies all end on the very word it quotes. And the last page links to the end of De Amicitia, written the same year, with the same frame and the same dedicatee.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Il De Senectute entra fra le opere filosofiche con 5 brani. Cicerone lo scrisse nel 44 a.C. e lo mise tutto in bocca a Catone il Censore, a ottantaquattro anni: chi parla è dunque un autore che quest’app già copre, nell’età arcaica, e la differenza fra il Catone vero e il Catone di Cicerone è una delle cose più interessanti del testo.',
          'La vecchiaia non combina più nulla? Nemmeno il timoniere fa niente, mentre l’equipaggio si arrampica sugli alberi e svuota la sentina e lui sta seduto a poppa con il timone in mano: e le grandi imprese si compiono con il giudizio e l’autorevolezza, non con la velocità (17). La vecchiaia indebolisce il corpo? Milone di Crotone una volta attraversò lo stadio di Olimpia con un bue in spalla; preferiresti la sua forza o l’ingegno di Pitagora? Ogni parte della vita ha la sua stagione (32-33). E poi l’agricoltura, la parte per cui Catone era nato: la terra non rifiuta mai un ordine e non restituisce mai un prestito senza interessi, e poi dodici righe che seguono un seme dal suolo alla spiga, un verbo per ogni fase (51-52).',
          'Gli ultimi due riguardano il morire. All’attore non serve restare in scena fino all’ultima battuta: le commedie romane finiscono chiedendo l’applauso al pubblico, e il saggio non è tenuto ad aspettarlo; una vita breve è abbastanza lunga, come il contadino non piange la primavera quando arriva l’estate (70). E l’ultima pagina, dove Catone dice che lascia la vita come si lascia una locanda, non una casa, e attende di rivedere suo figlio: il figlio di cui aveva bruciato lui stesso il corpo, quando sarebbe stato giusto il contrario (84).'
        ],
        changed: [
          'I brani rimandano l’uno all’altro e al libro vero di Catone. Il passo agricolo rimanda ai dieci brani del De Agri Cultura di Catone nell’età arcaica: stesso argomento, stesso uomo, uno scritto in istruzioni secche e l’altro in una frase che impiega dodici righe a far crescere uno stelo di grano. Il passo sull’attore rimanda a Plauto e a Terenzio, le cui commedie superstiti finiscono tutte proprio sulla parola che cita. E l’ultima pagina rimanda alla fine del De Amicitia, scritto lo stesso anno, con la stessa cornice e lo stesso dedicatario.'
        ],
        deleted: []
      }
    },
    {
      v: '1.8.3', date: '2026-08-29', time: '19:12', tz: 'CEST',
      en: {
        added: [
          'The philosophical works begin. De Amicitia goes from 1 excerpt to 5, and it is the right place to start: Cicero\'s dialogue on friendship is the text a Latin student is most likely to be handed, and it is his clearest prose. What friendship is actually for, and the answer that it is having someone you would dare say anything to (22). Why true friendship is hardest to find among politicians, with the most famous line Ennius ever wrote dropped in as a proverb everybody knows - a sure friend is seen in an unsure thing (64). Four sentences on people who pick friends the way a farmer picks livestock, for the yield (79). And the last page of the dialogue, where Laelius says that Scipio is dead and still alive, because what he loved was the man\'s excellence and that has not gone out (102).',
          'Two of the four quote Ennius by name, and he has his own entry back in the Archaic era, so the excerpts link across to him.'
        ],
        changed: [
          'Cicero\'s list of works on his own page is now split four ways, not three. It used to read Orations / Philosophical Works / Letters, with De Oratore filed under philosophy - which is wrong, since it is a book about how to be an orator, not about how to live. There is now a Rhetorical Works heading holding De Oratore, Brutus, Orator, De Optimo Genere Oratorum and Topica, three of which the page had never mentioned at all. The philosophical list gains De Officiis, De Divinatione and Paradoxa Stoicorum, and the note on De Re Publica now explains how the text survived: scraped off a manuscript and rewritten with a commentary on the Psalms, except its last book, which came down whole inside somebody else\'s commentary. In both languages.',
          'The oldest excerpt in this work was checked for the first time, and its translations disagreed with its own notes. De Amicitia 20 has been in the app since launch, and the work had never been mapped to its source page, so it had never been proved word for word - it is now, and the Latin is exact. But the analysis correctly explained that "haud scio an" is a polite way of stating something confidently, while the English and Italian both rendered it as real hesitation, "I am not sure whether"; and both dropped the little word that makes the sentence a comparison, so that "nothing better than friendship" became just "nothing better". Both translations fixed. Its NEW! date does not change.',
          'One more excerpt quietly came under checking. Hortensius, in the Lesser Known part of this era, is represented by a single fragment that survives only because Cicero quotes him - and it lives on the same source page as Cicero\'s Brutus, which was mapped for the first time today. It passes.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cominciano le opere filosofiche. Il De Amicitia passa da 1 brano a 5, ed è il punto giusto da cui partire: il dialogo di Cicerone sull’amicizia è il testo che più probabilmente viene messo in mano a uno studente di latino, ed è la sua prosa più limpida. A che cosa serva davvero l’amicizia, e la risposta che è avere qualcuno a cui oseresti dire qualsiasi cosa (22). Perché l’amicizia vera sia più difficile da trovare fra i politici, con il verso più celebre che Ennio abbia mai scritto lasciato cadere come un proverbio che tutti conoscono: l’amico sicuro si vede nella sorte incerta (64). Quattro frasi su chi sceglie gli amici come un allevatore sceglie il bestiame, per la resa (79). E l’ultima pagina del dialogo, dove Lelio dice che Scipione è morto ed è ancora vivo, perché ciò che ha amato era la virtù di quell’uomo, e quella non si è spenta (102).',
          'Due dei quattro citano Ennio per nome, e lui ha una sua scheda nell’età arcaica: i brani rimandano a lui.'
        ],
        changed: [
          'L’elenco delle opere di Cicerone, sulla sua pagina, è ora diviso in quattro parti e non in tre. Prima si leggeva Orazioni / Opere filosofiche / Lettere, con il De Oratore archiviato sotto la filosofia: il che è sbagliato, perché è un libro su come si diventa oratori, non su come si vive. Ora c’è una sezione Opere retoriche che contiene De Oratore, Brutus, Orator, De Optimo Genere Oratorum e Topica, tre dei quali la pagina non aveva mai nemmeno nominato. L’elenco filosofico guadagna De Officiis, De Divinatione e Paradoxa Stoicorum, e la nota sul De Re Publica spiega ora come il testo si sia salvato: raschiato via da un manoscritto e riscritto con un commento ai Salmi, tranne l’ultimo libro, giunto intero dentro il commento di qualcun altro. In entrambe le lingue.',
          'Il brano più vecchio di quest’opera è stato controllato per la prima volta, e le sue traduzioni contraddicevano le sue stesse note. Il De Amicitia 20 è nell’app dal lancio, e l’opera non era mai stata associata alla pagina di origine: non era quindi mai stata provata parola per parola. Ora lo è, e il latino è esatto. Ma l’analisi spiegava correttamente che "haud scio an" è un modo cortese di affermare con sicurezza, mentre l’inglese e l’italiano lo rendevano come esitazione vera, "non so se"; ed entrambe lasciavano cadere la paroletta che rende la frase un paragone, così che "nulla di meglio dell’amicizia" diventava soltanto "nulla di meglio". Corrette entrambe. La sua data NEW! non cambia.',
          'Un altro brano è entrato in silenzio sotto verifica. Ortensio, fra i Meno noti di quest’età, è rappresentato da un unico frammento che sopravvive solo perché Cicerone lo cita, e sta sulla stessa pagina di origine del Brutus ciceroniano, mappata oggi per la prima volta. Risulta corretto.'
        ],
        deleted: []
      }
    },
    {
      v: '1.8.2', date: '2026-08-28', time: '19:45', tz: 'CEST',
      en: {
        added: [
          'Cicero\'s Letters are finished: 5 new excerpts, and all four collections now sit at 8 apiece except the two smaller ones at 5. Twenty-six letters in all, running from a man canvassing for office in 65 BC to a man who has stopped wanting anything in 45.',
          'Ad Atticum, 5 to 8, and the eleven-year hole in the middle is closed. The journey back from exile in 57 - his daughter waiting for him at Brundisium on her own birthday, and then the steps of every temple on the road to the Capitol packed with people (IV.1). Three weeks before the civil war, Atticus writes that none of "the good men" doubts what Cicero will do, and Cicero takes the phrase apart: which good men? the Senate? the tax collectors? the landowners, who will accept a king quite happily as long as nobody disturbs them? (VII.7). And the day before he wrote about hiding in the wood at Astura, the letter where he mentions that he has read every consolation ever written, in Atticus\'s own library, and has now done the thing nobody had done before: written one for himself (XII.14). That book is lost; this letter is the record of it being written.',
          'Ad Familiares, 6 to 8. A furious proconsul has accused Cicero of making a fool of him in the Senate, and gets back a minutely reconstructed account of what Cicero says he actually said - the clearest example in the collection of a letter doing political work rather than feeling something (V.2). And then the one to put beside the shameless letter of eleven years earlier: the same correspondent, the same man writing, and now "I would call it pleasant, if I had not lost that word for all time." He reads all day, he says, not for a cure but for a small forgetting of the pain (V.15).'
        ],
        changed: [
          'A fourth book of the Atticus letters was downloaded to make this possible. The app had books I, VII and XII, which between them cover 68 to 60 BC and then 50 to 45 - so the whole of the exile, the return and the years of the first triumvirate were simply unreachable. Book IV fills it.',
          'One passage stops mid-letter on purpose. In the account of the return from exile the source spells the name of the townspeople of Brundisium in a way no other text does, and the texts that do print it disagree with each other as well. Where the witnesses disagree, the reading is a genuine variant rather than a slip, and the rule here is to cut past it rather than pick a side - unlike a plain misprint, which gets corrected and flagged.',
          'Three excerpts that stopped short now run whole. Each of them was cut around a misspelling on the source site that I had judged unfixable, and in all three cases that judgement was wrong. The people of Brundisium get their name back in the letter about the return from exile - the same page spells it correctly three more times a few lines away, which settles it. The reply to the angry proconsul runs on to its ending, where the speech "seemed not unpleasing, and a certain moderate laughter followed" - the laughter is what proves which of the two possible readings is right. And the long letter to Brutus now runs straight through from one section to the next.',
          'The rule behind those three has changed, and it is simpler: the test is whether the printed form is a Latin word. If it is not, it is a mistake, and it gets corrected and flagged, no matter how many websites reproduce it - two digital texts copied from the same printed edition are not two independent witnesses, which is the mistake that had left one of these three uncorrected. Forms that are genuinely old or unusual spellings, rather than errors, are still printed exactly as they stand.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le Lettere di Cicerone sono complete: 5 nuovi brani, e tutte e quattro le raccolte stanno ora a 8 ciascuna, tranne le due più piccole a 5. Ventisei lettere in tutto, da un uomo in campagna elettorale nel 65 a.C. a un uomo che nel 45 ha smesso di volere qualsiasi cosa.',
          'Ad Attico, da 5 a 8, e il buco di undici anni nel mezzo è chiuso. Il viaggio di ritorno dall’esilio nel 57: la figlia che lo aspetta a Brindisi nel giorno del suo compleanno, e poi i gradini di ogni tempio sulla strada del Campidoglio gremiti di gente (IV.1). Tre settimane prima della guerra civile, Attico scrive che nessuno dei "buoni" dubita di ciò che Cicerone farà, e Cicerone smonta l’espressione: quali buoni? il senato? gli esattori? i proprietari terrieri, che un re se lo prenderanno volentieri purché nessuno li disturbi? (VII.7). E il giorno prima di scrivere del bosco di Astura, la lettera in cui racconta di aver letto ogni consolazione mai scritta, nella biblioteca di Attico, e di aver fatto ora ciò che nessuno aveva fatto prima: scriverne una per se stesso (XII.14). Quel libro è perduto; questa lettera ne è il verbale di composizione.',
          'Ai familiari, da 6 a 8. Un proconsole furioso ha accusato Cicerone di averlo messo in ridicolo in senato, e si vede tornare indietro una ricostruzione minuziosa di ciò che Cicerone sostiene di aver detto davvero: l’esempio più chiaro della raccolta di una lettera che fa lavoro politico invece di provare qualcosa (V.2). E poi quella da mettere accanto alla lettera spudorata di undici anni prima: stesso destinatario, stesso uomo che scrive, e adesso "direi piacevole, se non avessi perduto quella parola per sempre". Legge tutto il giorno, dice, non per una cura ma per un piccolo oblio del dolore (V.15).'
        ],
        changed: [
          'Per rendere possibile tutto questo è stato scaricato un quarto libro delle lettere ad Attico. L’app aveva i libri I, VII e XII, che insieme coprono dal 68 al 60 a.C. e poi dal 50 al 45: tutto l’esilio, il ritorno e gli anni del primo triumvirato erano semplicemente irraggiungibili. Il libro IV colma il vuoto.',
          'Un passo si interrompe a metà lettera di proposito. Nel racconto del ritorno dall’esilio la fonte scrive il nome degli abitanti di Brindisi in un modo che nessun altro testo usa, e i testi che lo stampano non concordano nemmeno fra loro. Quando i testimoni discordano, la lezione è una vera variante e non una svista, e qui la regola è tagliare oltre invece di schierarsi, a differenza di un refuso evidente, che viene corretto e dichiarato.',
          'Tre brani che si interrompevano prima del tempo ora corrono interi. Ciascuno era stato tagliato attorno a una parola sbagliata del sito di origine che avevo giudicato non correggibile, e in tutti e tre i casi il giudizio era errato. Gli abitanti di Brindisi riprendono il loro nome nella lettera sul ritorno dall’esilio: la stessa pagina lo scrive correttamente altre tre volte poche righe più in là, il che chiude la questione. La risposta al proconsole irritato prosegue fino alla fine, dove il discorso "non parve sgradevole, e ne seguì una certa moderata risata": è la risata a dimostrare quale delle due letture possibili sia quella giusta. E la lunga lettera a Bruto ora passa senza interruzioni da una sezione all’altra.',
          'La regola dietro a tutto questo è cambiata, ed è più semplice: il criterio è se la forma stampata sia una parola latina. Se non lo è, è un errore, e viene corretta e dichiarata, per quanti siti la riproducano: due testi digitali copiati dalla stessa edizione a stampa non sono due testimoni indipendenti, ed è proprio questo l’equivoco che aveva lasciato una delle tre senza correzione. Le forme che sono davvero grafie antiche o insolite, e non errori, continuano a essere stampate esattamente come stanno.'
        ],
        deleted: []
      }
    },
    {
      v: '1.8.1', date: '2026-08-28', time: '18:09', tz: 'CEST',
      en: {
        added: [
          'The two short letter collections are filled out: 5 new excerpts, and Ad Quintum fratrem and Ad Brutum both go from 3 to 5. Ad Familiares picks up a sixth on the way.',
          'Ad Quintum fratrem, 3 to 5. Cicero as clerk of works: with his brother away in Gaul he tours the family building sites and reports back on the water supply, the plasterwork and the contractor, who is "Diphilus slower than Diphilus" and who will one day, Cicero hopes, learn to use a plumb-line (III.1). And then the strangest letter in the collection - Cicero explaining that he has torn up the De Re Publica and started again, because a friend listening to it read aloud told him the argument would carry more weight if he stopped hiding behind a cast of dead statesmen and spoke in his own voice (III.5). It is the fullest account anybody in antiquity left of a book being redesigned halfway through, and it is by a distance the hardest Latin in this section.',
          'Ad Brutum, 3 to 5. Brutus\'s wife has died, and Cicero writes the letter he owes: two years earlier Brutus had consoled him for Tullia and then told him off for grieving too openly, and Cicero now hands that back, gently, with the observation that a commander no longer grieves for himself but "for the public and, as they say, for the stage" (I.9). And the letter where he answers Brutus\'s one criticism of him with Solon - a state stands on reward and punishment - before delivering the most famous verdict in the collection on what the assassins of Caesar did and did not finish: a great plague driven off, a great stain wiped away, and the machinery of one-man rule left lying about for Antony to pick up (I.15).',
          'One letter that is not by Cicero at all. Book XVI of the Ad Familiares is Tiro\'s book, and it keeps what arrived as well as what was sent; this one is from Cicero\'s brother Quintus, writing to the same sick freedman three months after Cicero did, quoting a line of Euripides at him about cold being the enemy of a delicate skin, and begging him not to attempt a winter crossing (XVI.8). Read it straight after XVI.1 and you get the whole household at once.'
        ],
        changed: [
          'The Greek in that letter is readable again. The source site cannot print Greek on this page: both of Quintus\'s Greek phrases come out as strings of stray Latin letters, and the line of Euripides is printed twice by mistake. The app now shows the actual Greek, once, and says so in the notes. The reading was supplied by the user from a text that renders it properly.',
          'A whole book of letters had been sitting in the cache unreadable. Ad Quintum fratrem III is stored on the source site in a different text encoding from every other page, and the downloader had been assuming there was only one, so the copy on disk was a page of single letters spaced apart - unusable, and silently so. Both of this update\'s Ad Quintum excerpts come from that book. While fixing it, accented letters that were arriving as raw codes rather than characters were fixed too, and every page was downloaded again from scratch to confirm nothing else had been quietly damaged.',
          'Ad Brutum I.3a says Pansa fled. The consul died of his wounds after Mutina, and Cicero uses a pointedly unkind verb about how he left the field; both translations had softened it to "withdrew".',
          'Ad Brutum I.15 gets its missing name back. The excerpt used to skip a clause the editions print between daggers - the mark scholars use for a passage they believe is damaged and cannot repair - and Solon\'s name went out of the excerpt with it, so the sentence after it opened on a bare "he said" with nothing to say who. The clause is back, daggers and all, with a note explaining what they are. Printing a crux and warning about it is more use to somebody translating than pretending the words were never there.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le due raccolte di lettere più corte vengono completate: 5 nuovi brani, e sia le Lettere al fratello Quinto sia quelle a Bruto passano da 3 a 5. Le Lettere ai familiari, per strada, ne guadagnano una sesta.',
          'Al fratello Quinto, da 3 a 5. Cicerone come capocantiere: con il fratello lontano in Gallia, gira per i cantieri di famiglia e manda un rapporto sull’acqua, sugli intonaci e sull’impresario, che è "Difilo più lento di Difilo" e che un giorno, spera Cicerone, imparerà a usare il filo a piombo (III.1). E poi la lettera più strana della raccolta: Cicerone che spiega di aver fatto a pezzi il De Re Publica e di aver ricominciato, perché un amico, ascoltandolo leggere ad alta voce, gli aveva detto che il ragionamento avrebbe avuto più peso se avesse smesso di nascondersi dietro un cast di statisti morti e avesse parlato con la propria voce (III.5). È il resoconto più ampio che l’antichità ci abbia lasciato di un libro riprogettato a metà strada, ed è di gran lunga il latino più difficile di questa sezione.',
          'A Bruto, da 3 a 5. È morta la moglie di Bruto, e Cicerone scrive la lettera che deve: due anni prima Bruto lo aveva consolato per Tullia e poi rimproverato di manifestare troppo il dolore, e Cicerone ora glielo restituisce, con delicatezza, osservando che un comandante non piange più per sé ma "per il pubblico e, come si dice, per la scena" (I.9). E la lettera in cui risponde con Solone all’unica critica che Bruto gli muove - uno stato si regge sul premio e sulla pena - prima di pronunciare il giudizio più celebre della raccolta su ciò che i cesaricidi fecero e non finirono: una grande peste scacciata, una grande macchia cancellata, e gli strumenti del potere personale lasciati in giro perché Antonio li raccogliesse (I.15).',
          'Una lettera che non è affatto di Cicerone. Il libro XVI delle Ad Familiares è il libro di Tirone, e conserva ciò che arrivava non meno di ciò che partiva; questa è di Quinto, il fratello di Cicerone, che scrive allo stesso liberto malato tre mesi dopo di lui, gli cita un verso di Euripide sul freddo nemico della carne delicata e lo supplica di non tentare una traversata invernale (XVI.8). Letta subito dopo la XVI.1, restituisce tutta la casa in una volta.'
        ],
        changed: [
          'Il greco di quella lettera torna leggibile. Il sito di origine non riesce a stampare il greco in questa pagina: entrambe le frasi greche di Quinto escono come sequenze di lettere latine sballate, e il verso di Euripide è stampato due volte per errore. L’app ora mostra il greco vero, una volta sola, e lo dichiara nelle note. La lezione è stata fornita dall’utente a partire da un testo che lo rende correttamente.',
          'Un intero libro di lettere giaceva illeggibile nella cache. Le Lettere al fratello Quinto III sono salvate sul sito di origine con una codifica diversa da tutte le altre pagine, e il programma di scaricamento dava per scontato che ce ne fosse una sola: la copia su disco era una pagina di lettere singole distanziate, inutilizzabile, e senza che nulla lo segnalasse. Entrambi i brani di Ad Quintum di questo aggiornamento vengono da quel libro. Nel sistemare la cosa sono state corrette anche le lettere accentate che arrivavano come codici invece che come caratteri, e ogni pagina è stata riscaricata da zero per verificare che nient’altro fosse rovinato in silenzio.',
          'In A Bruto I.3a Pansa fugge. Il console morì per le ferite dopo Modena, e Cicerone usa un verbo volutamente sgarbato su come lasciò il campo; entrambe le traduzioni lo avevano addolcito in "si era ritirato".',
          'Ad Brutum I.15 riprende il nome che le mancava. Il brano saltava una proposizione che le edizioni stampano fra cruces - il segno con cui gli studiosi marcano un passo che ritengono guasto e che non sanno sanare - e con essa usciva dal brano il nome di Solone, tanto che la frase successiva si apriva su un nudo "egli disse" senza modo di sapere chi. La proposizione è tornata, cruces comprese, con una nota che spiega che cosa siano. Stampare una crux e segnalarla serve di più, a chi traduce, che fingere che quelle parole non ci fossero mai state.'
        ],
        deleted: []
      }
    },
    {
      v: '1.8.0', date: '2026-08-27', time: '19:32', tz: 'CEST',
      en: {
        added: [
          'Cicero writes to his friends: 15 new practice excerpts, and the Letters section finally opens properly. Four collections instead of one - Ad Atticum (5), Ad Familiares (5), Ad Quintum fratrem (3) and Ad Brutum (3), 16 excerpts in all. This is the other Cicero, the one who is not performing: no periods, no clausulae, sentences of three words, Greek dropped in mid-line when a Greek word fits better, and an unbroken run of forty years from the ambitious lawyer of 65 BC to the man being hunted in 43.',
          'Ad Atticum, 1 to 5. Cicero announces the birth of his son and, in the next line, mentions that he is thinking of defending Catiline, who happens to be his rival for the consulship (I.2). He stands in a hall packed with well-wishers every morning and cannot find one person to talk to (I.18). Caesar has crossed the Rubicon, Pompey has abandoned Rome without a fight, and Cicero asks whether they are discussing a Roman general or Hannibal (VII.11). And after his daughter Tullia dies, one four-sentence letter from Astura that begins with an errand and ends with him losing a fight against his own weeping (XII.15).',
          'Ad Familiares, a new work with 5. The passive-aggressive masterpiece to Pompey, whose letter of congratulation contained no congratulation (V.7). The request to a historian to write him up early and lay it on thicker than the truth allows, which contains the most useful excuse ever written down: a letter does not blush (V.12). And the two letters to Terentia that should be read one after the other - from exile at Brundisium, wanting to die in her arms (XIV.4), and fourteen years later, four lines asking her to make sure there is a tub in the bathroom (XIV.20). Plus the letter to Tiro, left behind ill in Greece by a governor who cannot stop worrying about whether he has eaten (XVI.1).',
          'Ad Quintum fratrem, a new work with 3. What a Roman province was supposed to be, in the letter Cicero sent his brother about governing Asia - power handed over on the condition that it is handed back (I.1). The letter from exile that begins "my brother, my brother, my brother" and calls the writer a breathing corpse (I.3). And the one sentence about Lucretius written by somebody who knew him: many flashes of genius, and a great deal of craft as well (II.9). It is the only contemporary verdict on the De Rerum Natura that survives.',
          'Ad Brutum, a new work with 3. Cicero on the nineteen-year-old Octavian: a remarkable boy, and let us hope we can keep holding him as easily as we have held him so far (I.3). Six days later, both consuls of the year are dead and the dispatch reporting it takes eleven words for Hirtius, who has his own entry in this era (I.3a). And the complaint every one of us has wanted to send: three lines? At a time like this? (I.14)'
        ],
        changed: [
          'The oldest Cicero excerpt in the app was checked for the first time. Ad Atticum I.16 has been here since launch, typed out by hand before the checking tools existed, and the Letters had never been mapped to their source pages - so it had never been proved word for word against The Latin Library. It has now. It carried a comma the source does not print, and re-reading it against the Latin turned up three translation slips as well: promisit, intercessit, dedit is a bribe being paid in stages (promised, stood surety, paid), not somebody interceding, and perire / perdere is a deliberate pairing that both translations had flattened. Fixed in Latin, English and Italian. Its NEW! date does not change: version tags record when an excerpt arrived, not when it was last touched.',
          'Two Cicero works had no Italian title. The Letters and De Amicitia buttons were showing their English labels to Italian readers; they now read Lettere ad Attico and De Amicitia, alongside the three new ones.',
          'Four excerpts now print what Cicero actually wrote. Three of them had been cut short to dodge a misprint on the source site, which is a bad trade: the rule from now on is to check the reading against another text and correct it, saying so in the notes, rather than throwing away a sentence over one wrong letter. Ad Atticum I.18 gets its opening back, and it is the sentence the letter is famous for - there is nothing I need so much as one person I can say anything to, without inventing, disguising or holding back - along with the joke about Metellus being "shore and air and sheer emptiness" and the four-year-old son, honey-sweet Cicero, who is the only rest his father gets. Ad Familiares V.12 gets back the best of its three confessions of shamelessness. Ad Quintum fratrem I.1 gets back the sentence stating the principle the rest of the passage stands on: that the people under a governor should be as happy as possible. Both of those excerpts are now unbroken, with no gap in the middle.',
          'Utinam, not Vtinam. The Latin Library sets the letters to Brutus with a capital V wherever the vowel u appears, which is how the Romans carved it and how nobody reads it now. It is spelled the ordinary way in the app, and the note under the excerpt says so.',
          'Two Italian translations repaired. "O me perditum! O afflictum!" in the letter to Terentia from exile had been rendered "Me rovinato! Me abbattuto!", which copies the Latin construction word for word and is not Italian; it now reads "Sono rovinato! Sono abbattuto!", the way the English already handled it. And the letter to Tiro ended on a clipped half-sentence in Italian where the English has a whole one.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cicerone scrive agli amici: 15 nuovi brani di esercizio, e la sezione delle Lettere si apre finalmente sul serio. Quattro raccolte invece di una - Ad Attico (5), Ai familiari (5), Al fratello Quinto (3) e A Bruto (3), 16 brani in tutto. Questo è l’altro Cicerone, quello che non recita: niente periodi, niente clausole, frasi di tre parole, il greco infilato a metà riga quando una parola greca calza meglio, e una corsa ininterrotta di quarant’anni dall’avvocato ambizioso del 65 a.C. all’uomo braccato del 43.',
          'Ad Attico, da 1 a 5. Cicerone annuncia la nascita del figlio e, nella riga successiva, accenna al fatto che sta pensando di difendere Catilina, che per inciso è il suo concorrente al consolato (I.2). Ogni mattina sta in un atrio pieno di ammiratori e non trova una sola persona con cui parlare (I.18). Cesare ha passato il Rubicone, Pompeo ha abbandonato Roma senza combattere, e Cicerone si chiede se si stia parlando di un generale romano o di Annibale (VII.11). E dopo la morte della figlia Tullia, una lettera di quattro frasi da Astura che comincia con una commissione e finisce con lui che perde una lotta contro il proprio pianto (XII.15).',
          'Ai familiari, opera nuova con 5 brani. Il capolavoro passivo-aggressivo indirizzato a Pompeo, la cui lettera di congratulazioni non conteneva congratulazioni (V.7). La richiesta a uno storico di scrivere di lui in anticipo e di calcare la mano più di quanto la verità consenta, che contiene la scusa più utile mai messa per iscritto: una lettera non arrossisce (V.12). E le due lettere a Terenzia che vanno lette una dopo l’altra - dall’esilio di Brindisi, con il desiderio di morirle fra le braccia (XIV.4), e quattordici anni dopo, quattro righe per chiederle di controllare che nel bagno ci sia la vasca (XIV.20). In più la lettera a Tirone, lasciato malato in Grecia da un governatore che non riesce a smettere di preoccuparsi se abbia mangiato (XVI.1).',
          'Al fratello Quinto, opera nuova con 3 brani. Che cosa doveva essere una provincia romana, nella lettera che Cicerone mandò al fratello sul governo dell’Asia: un potere consegnato a condizione che venga restituito (I.1). La lettera dall’esilio che comincia con "fratello mio, fratello mio, fratello mio" e definisce chi scrive un morto che respira (I.3). E l’unica frase su Lucrezio scritta da qualcuno che lo conobbe: molti lampi d’ingegno, e anche molta arte (II.9). È l’unico giudizio contemporaneo sul De Rerum Natura che ci sia rimasto.',
          'A Bruto, opera nuova con 3 brani. Cicerone sul diciannovenne Ottaviano: un ragazzo straordinario, e speriamo di riuscire a tenerlo con la stessa facilità con cui l’abbiamo tenuto finora (I.3). Sei giorni dopo entrambi i consoli dell’anno sono morti, e il dispaccio che lo riferisce dedica undici parole a Irzio, che in questa età ha una sua scheda (I.3a). E la lamentela che tutti abbiamo desiderato mandare: tre righe? In un momento come questo? (I.14)'
        ],
        changed: [
          'Il brano ciceroniano più vecchio dell’app è stato controllato per la prima volta. Ad Attico I.16 è qui dal lancio, trascritto a mano prima che esistessero gli strumenti di verifica, e le Lettere non erano mai state associate alle loro pagine di origine: non era quindi mai stato provato parola per parola contro The Latin Library. Ora lo è. Conteneva una virgola che la fonte non stampa, e la rilettura sul latino ha fatto emergere anche tre imprecisioni di traduzione: promisit, intercessit, dedit è una tangente pagata per gradi (promise, fece da garante, pagò), non qualcuno che intercede, e la coppia perire / perdere era stata appiattita in entrambe le lingue. Corretto in latino, inglese e italiano. La sua data NEW! non cambia: le versioni registrano quando un brano è arrivato, non quando è stato toccato l’ultima volta.',
          'Due opere di Cicerone non avevano un titolo italiano. I pulsanti delle Lettere e del De Amicitia mostravano l’etichetta inglese ai lettori italiani; ora si leggono Lettere ad Attico e De Amicitia, accanto ai tre nuovi.',
          'Quattro brani ora stampano ciò che Cicerone ha davvero scritto. Tre di essi erano stati accorciati per evitare un refuso del sito di origine, e non è un buon affare: d’ora in poi la regola è controllare la lezione su un altro testo e correggerla, dicendolo nelle note, invece di buttare via una frase per una lettera sbagliata. Ad Attico I.18 riprende il suo inizio, che è poi la frase per cui la lettera è famosa - non c’è nulla di cui io senta la mancanza quanto di una persona sola a cui poter dire tutto, senza fingere, dissimulare o nascondere - insieme alla battuta su Metello che è "spiaggia e aria e pura desolazione" e al figlio di quattro anni, il dolcissimo Cicerone, unico riposo di suo padre. Ai familiari V.12 riprende la migliore delle sue tre confessioni di sfacciataggine. Al fratello Quinto I.1 riprende la frase che enuncia il principio su cui poggia tutto il resto del passo: che chi sta sotto un governatore debba essere il più felice possibile. Quei due brani ora sono continui, senza più alcuno stacco nel mezzo.',
          'Utinam, non Vtinam. The Latin Library compone le lettere a Bruto con la V maiuscola ovunque compaia la vocale u, che è come la incidevano i romani e come non la legge più nessuno. Nell’app è scritta nel modo consueto, e la nota sotto il brano lo dichiara.',
          'Due traduzioni italiane sistemate. "O me perditum! O afflictum!" nella lettera a Terenzia dall’esilio era reso con "Me rovinato! Me abbattuto!", che ricalca la costruzione latina parola per parola e non è italiano; ora si legge "Sono rovinato! Sono abbattuto!", come l’inglese già faceva. E la lettera a Tirone finiva in italiano su una mezza frase tronca dove l’inglese ne ha una intera.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.8', date: '2026-08-27', time: '00:06', tz: 'CEST',
      en: {
        added: [
          'Cicero\'s legacy is back on his page. The reference document has always carried a section on what each author left behind - what happened to their work after they died, who rescued it, who copied it, what it turned into - and the app was quietly dropping it. It is now shown for the six authors who have one, just before the difficulty chart, in both languages. For Cicero that means the letters his freedman published after his execution, the prose rhythm that became the model for two thousand years, and the philosophical vocabulary he had to invent because Latin did not have it yet.',
          'Nothing was added to the practice bank, so the NEW! banners stay where they were, on the excerpts from the last update.'
        ],
        changed: [
          'The Speeches menu no longer throws nineteen buttons at you. The Verrines, the Catilinarians and the Philippics are each one prosecution or one campaign rather than a pile of separate speeches, so each now sits behind a single button that opens into its own list - Speeches, then In Verrem, then the seven parts of the case. Seven buttons instead of nineteen, and the four standalone speeches stay where they are.',
          'The order is unchanged: the collections appear at the date of their earliest speech, so the Speeches list still runs chronologically, from the Verrines in 70 BC through to the Philippics. The trail at the top of the page shows every level and each one is clickable, and "choose another text" from inside a speech now returns you to its collection rather than all the way out.'
        ],
        deleted: []
      },
      it: {
        added: [
          'L\'eredità di Cicerone è tornata sulla sua scheda. Il documento di riferimento ha sempre avuto, per ogni autore, una sezione su ciò che ha lasciato dietro di sé - che cosa sia successo alla sua opera dopo la morte, chi l\'abbia salvata, chi l\'abbia copiata, in che cosa si sia trasformata - e l\'app la stava silenziosamente scartando. Ora viene mostrata per i sei autori che ne hanno una, subito prima del grafico di difficoltà, in entrambe le lingue. Per Cicerone significa le lettere che il suo liberto pubblicò dopo l\'esecuzione, il ritmo della prosa che divenne il modello per duemila anni, e il lessico filosofico che dovette inventare perché il latino non ce l\'aveva ancora.',
          'Alla raccolta di esercizi non è stato aggiunto nulla, quindi le fascette NUOVO! restano dov\'erano, sui brani dell\'aggiornamento precedente.'
        ],
        changed: [
          'Il menu delle orazioni non ti scaraventa più addosso diciannove pulsanti. Le Verrine, le Catilinarie e le Filippiche sono ciascuna un solo processo o una sola campagna, non un mucchio di orazioni separate, e quindi ognuna sta ora dietro a un unico pulsante che si apre sul proprio elenco: Orazioni, poi Verrine, poi le sette parti della causa. Sette pulsanti invece di diciannove, e le quattro orazioni singole restano dove sono.',
          'L\'ordine non cambia: ogni raccolta compare alla data della sua orazione più antica, e così l\'elenco delle orazioni resta cronologico, dalle Verrine del 70 a.C. fino alle Filippiche. Il percorso in cima alla pagina mostra tutti i livelli e ognuno è cliccabile, e "scegli un altro testo" da dentro un\'orazione ora ti riporta alla sua raccolta invece che fuori del tutto.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.7', date: '2026-08-26', time: '18:43', tz: 'CEST',
      en: {
        added: [
          'The Verrines close at 25 excerpts. The five thinner parts come up to three each, so no part of the case is left with only one or two, and the whole prosecution now stands at twenty-five across seven texts.',
          'From the preliminary hearing, the argument that decides it: the extortion law was made for the allies, so the allies should choose who uses it - and then Cicero lets the island speak, a whole province delivering its own claim in the technical language of the court and asking Verres for a hundred million sesterces. Then the imagined snub to his rival, "we do not know you, we have never seen you before", withdrawn at once because the truth is worse: they know him perfectly well, since he was Verres\'s own quaestor (19-20).',
          'From the opening day, the moment that explains everything else in this collection. Cicero was entitled to a long set speech, and his opponent wanted him to use every minute of it, because the calendar was full of festivals and the case could be pushed into a year with friendlier judges. So he gave it up in open court: keep the speech for another time, and prosecute instead with documents and witnesses. It worked - Verres left for exile before the second hearing - which means the five enormous books of evidence in this app are the speech he is declining to make here, written up afterwards and published (ch. XI).',
          'And four more from the books of evidence: the night robbery of Apollo\'s temple on Delos, followed by the storm that wrecked the ship and washed the statues back onto the beach, where the governor had them put back (II.1); the general who did the opposite, Scipio returning to the Sicilians the art Carthage had taken from them, so that the survivors felt they had recovered their fathers\' standing (II.2); the demolition of every defence his opponent could possibly offer, ending with the two great advocates of the previous generation, who would simply have refused the case (II.2); the official registers read out in court, eighty-four farmers on one plain falling to thirty-two, with every subtraction correct, so that what looks like a lament turns out to be an audit (II.3); and the widest thing Cicero says anywhere in these speeches, that Rome can no longer bear from the nations not their violence, not their arms, not their war, but their grief, their tears and their complaints (II.3).'
        ],
        changed: [
          'Every excerpt in the five parts was re-checked against the Latin. One real error turned up in a note added yesterday: it named two words as Cicero\'s summary of why Sicily mattered strategically, and neither is in the passage. He uses two different ones there, and does call the island a granary, but several sections later. The note now quotes what he actually wrote.',
          'A third corrected word. The source site prints a full stop in the middle of a sentence about loading the stolen statues aboard ship; the text at Poesia Latina has none, and the sentence plainly does not want one. As always the correction is recorded on the excerpt itself, so the automatic check still runs letter by letter over everything else.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le Verrine si chiudono a venticinque brani. Le cinque parti più magre salgono a tre ciascuna, così che nessuna parte della causa resta con uno o due soli, e l\'intero processo conta ora venticinque brani su sette testi.',
          'Dall\'udienza preliminare, l\'argomento che la decide: la legge sulle concussioni fu fatta per gli alleati, e quindi devono essere gli alleati a scegliere chi la usa; e poi Cicerone lascia parlare l\'isola, un\'intera provincia che presenta la propria richiesta nel linguaggio tecnico del tribunale e chiede a Verre cento milioni di sesterzi. Poi lo sgarbo immaginario al rivale, "non ti conosciamo, non ti abbiamo mai visto prima", ritirato subito perché la verità è peggiore: lo conoscono benissimo, dato che era stato questore proprio di Verre (19-20).',
          'Dalla giornata di apertura, il momento che spiega tutto il resto di questa raccolta. Cicerone aveva diritto a una lunga arringa, e l\'avversario voleva che ne consumasse ogni minuto, perché il calendario era pieno di feste e la causa poteva slittare a un anno con giudici più accomodanti. E allora vi rinunciò in piena aula: il discorso teniamolo per un\'altra volta, e accusiamo invece con documenti e testimoni. Funzionò - Verre partì per l\'esilio prima della seconda udienza - il che significa che i cinque enormi libri di prove presenti in quest\'app sono il discorso a cui qui rinuncia, scritto dopo e pubblicato (cap. XI).',
          'E altri quattro dai libri di prove: il furto notturno nel tempio di Apollo a Delo, seguito dalla tempesta che sfasciò la nave e riportò le statue sulla spiaggia, dove il governatore le fece rimettere a posto (II.1); il generale che fece l\'opposto, Scipione che restituisce ai Siciliani le opere che Cartagine aveva loro tolto, così che i superstiti sentirono di riavere la dignità dei padri (II.2); la demolizione di ogni difesa che l\'avversario potesse tentare, che si chiude sui due grandi avvocati della generazione precedente, i quali la causa l\'avrebbero semplicemente rifiutata (II.2); i registri ufficiali letti in aula, ottantaquattro agricoltori in una piana che scendono a trentadue, con tutte le sottrazioni esatte, così che quello che sembra un lamento si rivela una verifica contabile (II.3); e la cosa più ampia che Cicerone dica in tutte queste orazioni, cioè che Roma non riesce più a sostenere delle nazioni non la violenza, non le armi, non la guerra, ma il lutto, le lacrime e i lamenti (II.3).'
        ],
        changed: [
          'Tutti i brani delle cinque parti sono stati ricontrollati sul latino. È emerso un errore vero in una nota aggiunta ieri: indicava due parole come il riassunto ciceroniano del perché la Sicilia contasse dal punto di vista strategico, e nessuna delle due si trova nel passo. Lì Cicerone ne usa altre due, e l\'isola la chiama sì granaio, ma parecchi paragrafi più avanti. La nota ora cita ciò che ha scritto davvero.',
          'Una terza parola corretta. Il sito di partenza stampa un punto fermo in mezzo a una frase sul caricare a bordo le statue rubate; il testo di Poesia Latina non ne ha alcuno, e la frase evidentemente non lo vuole. Come sempre la correzione è registrata sul brano stesso, così che il controllo automatico continui a girare lettera per lettera su tutto il resto.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.6', date: '2026-08-26', time: '17:47', tz: 'CEST',
      en: {
        added: [
          'The Verrines are complete. All seven parts of the case now have excerpts, so the whole prosecution is there to read in order, from the argument over who should conduct it through to the last book. Eighteen excerpts in total, which makes it the largest single work in the app.',
          'Eight new excerpts fill the five parts that were empty. From the preliminary hearing that decided who would prosecute: Cicero explaining why a man who has spent his career defending is suddenly asking to accuse, and being pressed into it by the Sicilians he had governed as a young quaestor (1-2); and his answer to the obvious retort, do you have all these qualities yourself - "I only wish I did" - followed by the admission that the thought of standing up in a great case still makes him shake from head to foot, and then a very unkind joke about his rival, who prepares by memorising an opening line out of somebody else\'s old speech (40-43).',
          'From the opening day of the trial: the sentence about the courts that everyone in Rome was repeating, that with the juries as they now are no rich man can be convicted however guilty he is (ch. I); and the arithmetic Verres was heard doing out loud in Sicily, that he had divided his three years as governor so that the first year\'s takings were for himself, the second year\'s for his lawyers, and the third and richest year was kept entirely for the jury. Cicero then adds that the provinces would now like the extortion court abolished, because one greedy governor can be satisfied but a governor plus his lawyers plus his jury cannot (ch. XIV).',
          'And from the three books of evidence that had no excerpts before: the Greek proverb about the harpist of Aspendos who played it all indoors, turned against a man who stole the harpist\'s statue and put it in his innermost rooms (II.1); the praetor\'s edict at Rome offered for sale to a girl\'s rival heir, and then quietly offered to the girl\'s mother as well, so that the same clause was sold twice in opposite directions (II.1); the case for why Sicily mattered, the first foreign nation to come over to Rome and the granary that made the defeat of Carthage possible (II.2); and Cicero going back to the island four years after his own service there and finding the corn country empty, where the field itself seemed to be waiting for its farmer and mourning its owner (II.3).'
        ],
        changed: [
          'The opening action of the case is printed on the source site divided into eighteen numbered parts, and those are chapters, not the paragraph numbers modern editions use - that speech has eighteen chapters and fifty-six paragraphs. Its two excerpts are therefore numbered by chapter, and shown in Roman numerals so that they cannot be mistaken for paragraph numbers, which is the same thing the app already does for the In Pisonem.',
          'One more corrected word. The site prints a phrase in the book about the praetorship at Rome that is not Latin at all; the correct reading was confirmed against Poesia Latina, and as before the app prints the corrected word and records the correction on the excerpt itself, so the automatic check still runs letter by letter over everything else. That makes two corrected words in the whole collection.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le Verrine sono complete. Tutte e sette le parti della causa hanno ora dei brani, e così l\'intero processo si può leggere in ordine, dalla disputa su chi dovesse sostenerlo fino all\'ultimo libro. Diciotto brani in tutto, il che ne fa l\'opera singola più ampia dell\'app.',
          'Otto nuovi brani riempiono le cinque parti che erano vuote. Dall\'udienza preliminare che decideva chi avrebbe accusato: Cicerone che spiega perché un uomo il quale ha passato la carriera a difendere chieda all\'improvviso di accusare, spintovi dai Siciliani che aveva amministrato da giovane questore (1-2); e la sua risposta all\'obiezione ovvia, e tu le hai tutte queste doti - "magari le avessi!" - seguita dall\'ammissione che il pensiero di alzarsi a parlare in un grande processo lo fa ancora tremare da capo a piedi, e poi da una battuta molto cattiva sul rivale, che si prepara imparando a memoria un esordio preso dal vecchio discorso di qualcun altro (40-43).',
          'Dalla giornata di apertura del processo: la frase sui tribunali che a Roma ripetevano tutti, e cioè che con le giurie di adesso nessun uomo ricco può essere condannato, per quanto colpevole sia (cap. I); e i conti che Verre fu sentito fare ad alta voce in Sicilia, secondo cui aveva diviso i suoi tre anni di governo in modo che il ricavato del primo anno fosse per sé, quello del secondo per i suoi avvocati, e il terzo, il più ricco, restasse tutto per i giudici. Cicerone aggiunge poi che ormai le province vorrebbero l\'abolizione del tribunale per le concussioni, perché a un governatore avido si può far fronte, ma a un governatore più i suoi avvocati più la sua giuria no (cap. XIV).',
          'E dai tre libri di prove che prima non avevano brani: il proverbio greco sul citaredo di Aspendo che suonava tutto per sé, rivolto contro un uomo che ne rubò la statua e la mise nelle stanze più interne di casa propria (II.1); l\'editto del pretore a Roma messo in vendita all\'erede rivale di una ragazza, e poi offerto sottobanco anche alla madre della ragazza, così che la stessa clausola fu venduta due volte in direzioni opposte (II.1); le ragioni per cui la Sicilia contava, prima nazione straniera a passare dalla parte di Roma e granaio che rese possibile la sconfitta di Cartagine (II.2); e Cicerone che torna sull\'isola quattro anni dopo esservi stato in carica e trova vuoto il paese del grano, dove il campo stesso sembrava aspettare il proprio contadino e piangere il proprio padrone (II.3).'
        ],
        changed: [
          'La prima azione della causa è stampata sul sito di partenza divisa in diciotto parti numerate, e sono capitoli, non i numeri di paragrafo usati dalle edizioni moderne: quell\'orazione ha diciotto capitoli e cinquantasei paragrafi. I suoi due brani sono perciò numerati per capitolo, e mostrati in cifre romane perché non si possano scambiare per numeri di paragrafo, esattamente come l\'app già fa per l\'In Pisonem.',
          'Un\'altra parola corretta. Il sito stampa, nel libro sulla pretura a Roma, una locuzione che in latino non esiste; la lezione giusta è stata confermata su Poesia Latina, e come già in passato l\'app stampa la parola corretta registrando la correzione sul brano stesso, così che il controllo automatico continui a girare lettera per lettera su tutto il resto. Le parole corrette in tutta la raccolta sono così due.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.5', date: '2026-08-25', time: '22:32', tz: 'CEST',
      en: {
        added: [
          'The Verrines are now seven texts instead of one. Cicero\'s case against Verres was not a speech but a whole prosecution - the argument over who should conduct it, the opening action, and then five enormous books of evidence - and the practice menu now shows it that way, in the order the case was actually fought. Two of the seven are filled in this update; the rest follow in the next one, and stay hidden until they have something in them.',
          'Seven new excerpts, five in each of the two books that schools actually read. From De signis, the book about stolen art: the private shrine of Heius at Messana, with its Cupid by Praxiteles, its bronze Hercules by Myron and its two Canephoroe by Polyclitus, where Cicero pretends to have picked up the sculptors\' names by accident and pretends to be prompted from the floor when he cannot remember one (4-5).',
          'Also from De signis: the description of Henna, the town called the navel of Sicily, where Proserpina was carried off - the plainest and easiest Latin in the whole app, written that way on purpose, because the charge Cicero is about to bring is that Verres stole the goddess\'s statue from her own temple (106-107); and the comparison with the general who stormed Syracuse in the Hannibalic war, ending on the sentence that says you will call the city founded by the man who captured it and captured by the man who inherited it founded (115).',
          'And from De suppliciis, the book about punishments: the governor who reckoned spring had begun when he saw a rose, and travelled in a litter carried by eight men on a see-through Maltese cushion stuffed with rose petals (26-27); the pirate ship that sailed into the harbour of Syracuse and rowed close enough to splash the praetor\'s eyes (100); the parents outside the prison, buying from the executioner the promise of a single clean stroke of the axe (118-119); and the end of the Gavius story, with the cross deliberately turned to face Italy so that a Roman citizen could see his own home while dying on it, and the sentence that runs out of language: it is an outrage to bind a Roman citizen, a crime to flog him, all but parricide to kill him - what am I to call crucifying him? (169-170)'
        ],
        changed: [
          'The three excerpts that were already here have moved into their proper books and kept their original badges, so they still read Added in v.1.5.0. Every translation in both books was re-checked against the Latin, clause by clause; one word needed correcting, where the English called a citizen\'s ius a privilege rather than a right, which is the very thing the speech is about.',
          'A note in the project files claimed for months that the opening action of the case was not available online, which is why only two of the seven books were ever used. It was wrong - the page exists under a different name - and correcting it is what made this update possible. All seven are now in place.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le Verrine sono ora sette testi invece di uno. Il processo di Cicerone contro Verre non fu un\'orazione ma un\'intera causa - la disputa su chi dovesse sostenerla, la prima azione e poi cinque libri enormi di prove - e il menu degli esercizi ora la mostra così, nell\'ordine in cui la causa fu davvero combattuta. Due dei sette vengono riempiti con questo aggiornamento; gli altri seguiranno nel prossimo, e restano nascosti finché non avranno qualcosa dentro.',
          'Sette nuovi brani, cinque per ciascuno dei due libri che si leggono davvero a scuola. Dal De signis, il libro sulle opere d\'arte rubate: il sacrario privato di Eio a Messina, con il suo Cupido di Prassitele, il suo Ercole di bronzo di Mirone e le due Canefore di Policleto, dove Cicerone finge di aver imparato per caso i nomi degli scultori e finge di farsi suggerire dall\'aula quello che non ricorda (4-5).',
          'Sempre dal De signis: la descrizione di Enna, la città chiamata l\'ombelico della Sicilia, dove fu rapita Proserpina - il latino più piano e più facile di tutta l\'app, scritto così di proposito, perché l\'accusa che Cicerone sta per formulare è che Verre rubò la statua della dea dal suo stesso tempio (106-107); e il confronto con il generale che espugnò Siracusa nella guerra annibalica, che si chiude sulla frase secondo cui direte che la città fu fondata da chi la prese e presa da chi la ricevette fondata (115).',
          'E dal De suppliciis, il libro sui supplizi: il governatore che riteneva cominciata la primavera quando vedeva una rosa, e viaggiava in una lettiga portata da otto uomini su un cuscino maltese trasparente imbottito di petali di rosa (26-27); la nave pirata che entrò nel porto di Siracusa e passò tanto vicino da schizzare negli occhi del pretore (100); i genitori davanti al carcere, che comprano dal boia la promessa di un solo colpo netto di scure (118-119); e la fine della vicenda di Gavio, con la croce girata apposta verso l\'Italia perché un cittadino romano potesse vedere casa propria mentre vi moriva, e la frase a cui finisce la lingua: è un misfatto incatenare un cittadino romano, un delitto frustarlo, quasi un parricidio ucciderlo; che nome dare al metterlo in croce? (169-170)'
        ],
        changed: [
          'I tre brani che c\'erano già si sono spostati nei rispettivi libri e hanno conservato le loro etichette originali, quindi continuano a recitare Aggiunto in v.1.5.0. Tutte le traduzioni dei due libri sono state ricontrollate sul latino, frase per frase; una sola parola andava corretta, dove l\'inglese rendeva lo ius di un cittadino come un privilegio invece che come un diritto, che è esattamente ciò di cui parla l\'orazione.',
          'Una nota nei file di progetto sosteneva da mesi che la prima azione della causa non fosse disponibile online, ed è per questo che di sette libri se ne erano sempre usati due soltanto. Era sbagliata - la pagina esiste sotto un altro nome - e correggerla è ciò che ha reso possibile questo aggiornamento. Ora ci sono tutti e sette.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.4', date: '2026-08-25', time: '20:51', tz: 'CEST',
      en: {
        added: [
          'Five new excerpts from the In Pisonem, which goes from three to eight. This is the speech Cicero wrote to destroy a man he could not take to court, and it is the nastiest thing he ever published.',
          'The centrepiece is the morning call. Cicero and a relative of Piso\'s went round to see him, and Cicero tells the Senate what they found, with Piso sitting there listening: an ex-consul coming out of a dive at about eleven in the morning with his head wrapped up and his indoor slippers on, breathing a cookshop over them, pleading ill health and explaining that his treatment involves certain wine-based remedies. They stood in the smoke for a while out of politeness, and he got rid of them by belching (VI).',
          'And the famous four words the speech is remembered for: "O darkness, o mud, o filth" - Cicero does not call Piso dark, muddy and filthy, he addresses him as darkness, mud and filth, and only the fourth thing he calls him admits that he is a person at all, so that it can take his ancestry away from him (XXVI).',
          'Also: the perfume sellers of Capua, who took one look at the new consul and refused to believe in him, followed by a portrait of his colleague\'s oiled ringlets and rouged cheeks (XI); the one serious page, where Cicero distinguishes between suffering and punishment - Regulus with his eyelids cut off was not being punished, because misfortune is not a penalty - and then names the punishment he actually wants for Piso, which is that he should keep his titles and remain too frightened of his own record to write home (XIX); and the end of the speech, where he explains that a reputation is a verdict passed by everyone all the time, and says plainly that he never wanted Piso dead, only permanently afraid: "and I have seen it" (XLI).'
        ],
        changed: [
          'Every translation in this speech was re-checked against the Latin, clause by clause. The word the speech is built on is frons, a forehead, and the app had been rendering it "face" in the opening line and "forehead" ten words later, which loses the thread; both now read "brow", which carries the anatomy and the insolence together, as the Latin does. Four more corrections were made to the new excerpts before they shipped, including two places where a count in a note was simply wrong, and one where a Roman surgical probe had turned into a magnifying glass.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cinque nuovi brani dell\'In Pisonem, che passa da tre a otto. È l\'orazione che Cicerone scrisse per distruggere un uomo che non poteva portare in tribunale, ed è la cosa più feroce che abbia mai pubblicato.',
          'Il pezzo forte è la visita del mattino. Cicerone e un parente di Pisone andarono a trovarlo, e Cicerone racconta al senato che cosa trovarono, con Pisone lì seduto ad ascoltare: un ex console che esce da una bettola verso le undici del mattino con la testa avvolta e le pantofole di casa ai piedi, che gli alita addosso un\'osteria, che si giustifica con la salute e spiega che la sua cura prevede certi rimedi a base di vino. Per educazione restarono un poco in quel fumo, e lui se ne liberò ruttando (VI).',
          'E le quattro parole celebri per cui l\'orazione è ricordata: "O tenebre, o fango, o lordura". Cicerone non dice che Pisone è tenebroso, fangoso e sordido: lo chiama tenebre, fango e lordura, e solo la quarta cosa che gli dice ammette che sia una persona, e lo fa per potergli togliere gli antenati (XXVI).',
          'Inoltre: i profumieri di Capua, che diedero un\'occhiata sola al nuovo console e si rifiutarono di crederci, seguiti dal ritratto dei riccioli unti e delle guance imbellettate del collega (XI); l\'unica pagina seria, dove Cicerone distingue fra sofferenza e castigo - Regolo, con le palpebre recise, non stava subendo un castigo, perché la sventura non è una pena - e poi dice qual è il castigo che vuole davvero per Pisone, cioè che conservi i suoi titoli e resti troppo spaventato dalla propria fedina per scrivere a casa (XIX); e la fine dell\'orazione, dove spiega che la reputazione è un verdetto pronunciato da tutti in ogni momento, e dice chiaramente che non ha mai voluto Pisone morto, ma soltanto per sempre spaventato: "e l\'ho visto" (XLI).'
        ],
        changed: [
          'Tutte le traduzioni di quest\'orazione sono state ricontrollate sul latino, frase per frase. La parola su cui l\'orazione è costruita è frons, la fronte, e l\'app la rendeva "faccia" nella prima riga e "fronte" dieci parole dopo, perdendo il filo; ora in italiano è "fronte" in entrambi i punti. Sui brani nuovi sono state fatte altre quattro correzioni prima della pubblicazione, fra cui due conteggi sbagliati in una nota e una sonda chirurgica romana diventata una lente d\'ingrandimento.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.3', date: '2026-08-25', time: '19:27', tz: 'CEST',
      en: {
        added: [
          'Five new excerpts from the Pro Caelio, which goes from three to eight. Cicero is defending a young friend accused of borrowing gold and buying poison, and the real opponent in the case is the woman behind the prosecution, whom he never once names.',
          'The centrepiece is the moment he stops arguing and quotes tragedy instead. The prosecution said the trouble began when Caelius rented a flat on the Palatine; Cicero agrees that it did, and then borrows a line of Ennius that everyone in court could finish - "would that in the grove of Pelion" - to introduce the neighbour as "this Palatine Medea". Medea abandoned her family, followed a young man abroad, and killed by poison, which is the charge in this trial. The Ennius he quotes is already in this app, among the archaic poets (18).',
          'Also the quarter-of-an-as joke you asked for. The prosecution claimed friends were hidden in a public bathhouse to catch Caelius handing over the poison, and Cicero simply asks where men in togas were supposed to hide in a bathhouse - unless, of course, the lady had made friends with the attendant through "that quarter-as transaction of hers". A quarter of an as was the entry fee at the baths, and it was also the going nickname for what Clodia was worth. He never uses the nickname; he uses the coin (62).',
          'And three more: the opening, one enormous sentence in which an imaginary foreigner wanders into the courtroom and revises his opinion of the case downwards three times until a national emergency has shrunk into a family quarrel (1); the most sympathetic portrait of Catiline anybody wrote, by the man who had him declared a public enemy - his virtues were real but "not carved out in full relief, only sketched in" (12); and the scene where Cicero offers to play the defendant\'s father and then cannot decide which stock father from Roman comedy to imitate, quoting Caecilius for the harsh one and Terence for the mild one, both of whom are also in this app (37-38).'
        ],
        changed: [
          'A bug in the tool that turns the source website into plain text: the site sets verse with a line break between the lines and no space, and the tool was deleting the break without putting anything in its place, so two words in a quotation from Terence had been welded into one. Fixed, and every source page was downloaded again and re-checked. It affected exactly one line in the material used so far.',
          'Every translation in this speech was re-checked against the Latin, clause by clause, as with the Philippics. The three excerpts added last week needed no corrections; four small tightenings were made to the new ones before they shipped.',
          'Later the same evening, a follow-up: the Catiline portrait was proofread and extended. It now runs to the end of the section, which had been cut short, and finishes on the sentence the whole paragraph was building towards - Cicero doubts there was ever such a monster on earth, welded together out of natural impulses so opposed and so much at war with one another. The word for welded is what a smith does when he melts metals into a single mass, so a passage that began by calling Catiline a sketch rather than a statue now ends by calling him an alloy that should not have been possible.',
          'That sentence had been left out because the site the Latin comes from prints one word in it that is not a Latin word at all. A reader checked the speech against Poesia Latina, which has the correct reading, so the app now prints the corrected word. The correction is recorded on the excerpt itself, which means the automatic check that proves every excerpt letter by letter against its source still runs over every other character of the passage, and would complain at once if the two ever drifted apart. It is the only corrected word in the whole collection, and a note at the end of the excerpt explains it.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cinque nuovi brani della Pro Caelio, che passa da tre a otto. Cicerone difende un giovane amico accusato di essersi fatto prestare dell\'oro e di aver comprato del veleno, e la vera avversaria del processo è la donna che sta dietro all\'accusa, che lui non nomina mai una sola volta.',
          'Il pezzo forte è il momento in cui smette di argomentare e cita la tragedia. L\'accusa sosteneva che i guai fossero cominciati quando Celio prese in affitto un appartamento sul Palatino; Cicerone concede che sia così, e poi prende in prestito un verso di Ennio che chiunque in aula sapeva completare - "oh, se nel bosco del Pelio" - per presentare la vicina di casa come "questa Medea del Palatino". Medea abbandonò la famiglia, seguì all\'estero un giovane e uccise con il veleno, che è l\'accusa di questo processo. L\'Ennio che cita è già in quest\'app, fra i poeti arcaici (18).',
          'E anche la battuta sul quadrante che avevi chiesto. L\'accusa sosteneva che degli amici fossero stati nascosti in terme pubbliche per cogliere Celio mentre consegnava il veleno, e Cicerone si limita a chiedere dove avrebbero dovuto nascondersi, dentro delle terme, degli uomini in toga; a meno che, certo, la signora non si fosse fatta amica del custode con "quella sua transazione da un quadrante". Un quarto di asse era il prezzo d\'ingresso alle terme, ed era anche il soprannome corrente per quanto valeva Clodia. Il soprannome non lo usa mai: usa la moneta (62).',
          'E altri tre: l\'esordio, un\'unica enorme frase in cui uno straniero immaginario entra in aula e per tre volte abbassa il proprio giudizio sulla causa, finché un\'emergenza nazionale si riduce a una lite di famiglia (1); il ritratto più benevolo di Catilina che qualcuno abbia scritto, opera dell\'uomo che lo fece dichiarare nemico pubblico: le sue virtù erano reali ma "non scolpite a rilievo, soltanto abbozzate" (12); e la scena in cui Cicerone si offre di fare il padre dell\'imputato e poi non riesce a decidere quale padre da commedia imitare, citando Cecilio per quello severo e Terenzio per quello mite, entrambi presenti in quest\'app (37-38).'
        ],
        changed: [
          'Un difetto dello strumento che trasforma il sito di partenza in testo semplice: il sito manda a capo i versi senza spazio, e lo strumento cancellava l\'a capo senza metterci nulla al posto, saldando in una sola parola due parole di una citazione da Terenzio. Corretto, e tutte le pagine di partenza sono state riscaricate e ricontrollate. Riguardava esattamente una riga del materiale usato finora.',
          'Tutte le traduzioni di quest\'orazione sono state ricontrollate sul latino, frase per frase, come per le Filippiche. I tre brani aggiunti la settimana scorsa non hanno richiesto correzioni; sui nuovi sono state fatte quattro piccole messe a punto prima della pubblicazione.',
          'In serata, un aggiornamento successivo: il ritratto di Catilina è stato corretto ed esteso. Ora arriva fino alla fine del paragrafo, che era stato troncato, e si chiude sulla frase verso cui tutto tendeva: Cicerone dubita che sia mai esistito al mondo un mostro simile, fuso insieme da inclinazioni naturali tanto contrarie e tanto in lotta fra loro. Il verbo che vale "fuso insieme" è quello del fabbro che scioglie più metalli in un\'unica massa: così un passo che era cominciato definendo Catilina uno schizzo e non una statua finisce col definirlo una lega che non sarebbe dovuta essere possibile.',
          'Quella frase era stata esclusa perché il sito da cui proviene il latino vi stampa una parola che in latino non esiste. Un lettore ha controllato l\'orazione su Poesia Latina, che ha la lezione corretta, e così l\'app ora stampa la parola giusta. La correzione è registrata sul brano stesso: il controllo automatico che verifica lettera per lettera ogni brano sulla sua fonte continua quindi a girare su tutti gli altri caratteri del passo, e protesterebbe subito se i due testi divergessero. È l\'unica parola corretta di tutta la raccolta, e una nota in fondo al brano lo spiega.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.2', date: '2026-08-24', time: '21:33', tz: 'CEST',
      en: {
        added: [
          'Nine new excerpts from Cicero, finishing the Philippics: the second goes from three to eight, and the fourteenth, the last speech he ever published, from three to seven. All four Philippics in the app are now at full size.',
          'From the Second Philippic, the speech he wrote but never dared deliver: his answer to the charge of being behind Caesar\'s murder, which he meets not by denying it but by widening it until it covers the whole Senate - "all good men, so far as it lay in them, killed Caesar: some lacked the plan, some the courage, some the opportunity; none of them lacked the will" (28-29); the auction of the dead Pompey\'s house, where actors carry off the storerooms and the slaves\' beds are made up with Pompey\'s purple coverlets (67); the Lupercalia, where Antony offered Caesar a crown in front of the whole city, and the sentence that made the speech unpublishable in Rome (85-86); and the villa of Varro, another author in this app, turned into a drinking den - "from the third hour there was drinking, there was gaming, there was vomiting" (104).',
          'Also from the Second Philippic, at the reader\'s request, the section on Antony\'s adolescence that had been left out of the app until now (44). It is the most notorious page of the speech and the attack is built entirely out of clothing: the boy\'s purple-bordered gown he managed to go bankrupt in, the adult gown he took up and immediately exchanged for a woman\'s, and the matron\'s robe his friend Curio is imagined handing over. Not one act is described anywhere in it.',
          'And from the Fourteenth, delivered days before the consul Hirtius was killed: the swords of the legions "dipped, or rather drenched", and the question of whether that was enemy blood or citizens\' (6); the two days when Rome believed Antony had won, and nobody could look at his own children without weeping (10); the proof from history that Rome had never once voted thanks to the gods for winning a civil war (23); and Hirtius himself carrying the eagle of the Fourth Legion into the line, followed by a farewell to the setting sun for having stayed up to watch Antony run (27).'
        ],
        changed: [
          'Every translation in these two speeches was re-checked against the Latin, clause by clause, as was done last time for the other two. Six renderings in older excerpts were corrected. The largest: yesterday\'s procession had been described as "almost in ovation and almost in triumph" when Cicero says the first happened and only the second nearly did; and the soldiers\' death at Mutina was "paid to" their country rather than for it.',
          'One note was added about the source text, at the end of the Second Philippic. The online edition the app quotes has a word there that reverses Cicero\'s meaning, almost certainly a slip for a very similar one. The Latin is left exactly as the source prints it, the translation follows the reading the sentence needs, and the note now explains the difference.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Nove nuovi brani di Cicerone, che completano le Filippiche: la seconda passa da tre a otto brani, e la quattordicesima, l\'ultima orazione che abbia pubblicato, da tre a sette. Tutte e quattro le Filippiche presenti nell\'app hanno ora la loro dimensione piena.',
          'Dalla Seconda Filippica, l\'orazione che scrisse ma non osò mai pronunciare: la risposta all\'accusa di essere dietro l\'assassinio di Cesare, che non nega ma allarga finché non copre l\'intero senato - "tutti gli onesti, per quanto stette in loro, hanno ucciso Cesare: ad alcuni mancò il piano, ad altri il coraggio, ad altri l\'occasione; a nessuno la volontà" (28-29); l\'asta della casa di Pompeo ormai morto, con gli attori che si portano via i magazzini e i letti degli schiavi rifatti con le coperte di porpora di Pompeo (67); i Lupercali, dove Antonio offrì a Cesare una corona davanti a tutta la città, e la frase che rese l\'orazione impubblicabile a Roma (85-86); e la villa di Varrone, un altro autore di quest\'app, ridotta a bettola - "dall\'ora terza si beveva, si giocava, si vomitava" (104).',
          'Sempre dalla Seconda Filippica, su richiesta del lettore, il paragrafo sull\'adolescenza di Antonio che fino a oggi era rimasto fuori dall\'app (44). È la pagina più famigerata dell\'orazione, e l\'attacco è costruito interamente sui vestiti: la toga orlata di porpora del fanciullo, con la quale riuscì a fallire, la toga virile che prese e subito scambiò per una da donna, e la stola da matrona che l\'amico Curione viene immaginato mentre gliela consegna. Non vi è descritto un solo atto.',
          'E dalla Quattordicesima, pronunciata pochi giorni prima che il console Irzio venisse ucciso: le spade delle legioni "intinte, anzi inzuppate", e la domanda se quello fosse sangue di nemici o di cittadini (6); i due giorni in cui Roma credette che Antonio avesse vinto, e nessuno riusciva a guardare i propri figli senza piangere (10); la prova storica che Roma non aveva mai votato un ringraziamento agli dèi per aver vinto una guerra civile (23); e Irzio in persona che porta l\'aquila della Quarta legione nella mischia, seguito da un saluto al sole al tramonto per essere rimasto in cielo a guardare Antonio scappare (27).'
        ],
        changed: [
          'Tutte le traduzioni di queste due orazioni sono state ricontrollate sul latino, frase per frase, come si era fatto la volta scorsa per le altre due. Sei rese in brani più vecchi sono state corrette. La più rilevante: il corteo del giorno prima era descritto come "quasi in ovazione e quasi in trionfo", mentre Cicerone dice che la prima cosa avvenne davvero e solo la seconda fu sfiorata; e la morte dei soldati a Modena risultava pagata "alla" patria invece che "per" la patria.',
          'È stata aggiunta una nota sul testo della fonte, alla fine della Seconda Filippica. L\'edizione online che l\'app cita ha lì una parola che rovescia il senso di Cicerone, quasi certamente un refuso per un\'altra molto simile. Il latino resta esattamente come lo stampa la fonte, la traduzione segue la lezione di cui la frase ha bisogno, e la nota ora spiega la differenza.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.1', date: '2026-08-24', time: '20:12', tz: 'CEST',
      en: {
        added: [
          'Six new excerpts from Cicero, deepening two of the Philippics: the first goes from three to seven, and the fourth, the shortest of the fourteen, from three to five.',
          'The centrepiece is the day Antony threatened to demolish Cicero\'s house. Cicero had missed a routine sitting of the Senate, and Antony announced in the house that he would come round with builders. Cicero\'s reply runs through the emergencies that might have justified summoning a sick man - "Hannibal, I suppose, was at the gates" - and ends with the blind old censor Appius Claudius, who really did have himself carried in to stop the peace with Pyrrhus, and who turns up in this app twice (I.11-12).',
          'Also from the first Philippic: the sea voyage that nearly took Cicero out of the story altogether, sailing for Greece and being blown straight back to the Italian coast by the south wind, told in the plainest Latin in the speech (7); the argument that a statesman\'s acts are his laws and nothing else - "ask for the acts of Gracchus: the Sempronian laws will be produced" (18); and the formula that would have been cut into the bronze tablet, "the consuls put the question to the people by right", read aloud with two questions inserted into it that bring it down (26).',
          'And from the fourth: the legion that judged Antony a public enemy before the Senate did, and that Cicero says drew its name from Mars himself, four months before it was cut to pieces at Mutina (5); and the close of the speech, where Antony stops being a criminal and becomes a beast fallen into a hunting pit, followed by the sentence that states what the war is actually about - not on what terms we shall live, but whether we shall live at all (12).'
        ],
        changed: [
          'Every translation in these two speeches was re-checked against the Latin, clause by clause. A few renderings in the excerpts added last time were tightened: two places where the English said slightly more than the Latin does, one Italian phrase that turned an instrument into an agent, and the wording of the bronze-tablet formula, where the English had lost the repeated word that the joke depends on.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Sei nuovi brani di Cicerone, che approfondiscono due Filippiche: la prima passa da tre a sette brani, e la quarta, la più breve delle quattordici, da tre a cinque.',
          'Il pezzo forte è il giorno in cui Antonio minacciò di demolire la casa di Cicerone. Cicerone aveva saltato una seduta ordinaria del senato, e Antonio annunciò in aula che sarebbe passato con i muratori. La replica di Cicerone passa in rassegna le emergenze che avrebbero potuto giustificare la convocazione di un malato - "Annibale, immagino, era alle porte" - e finisce sul vecchio censore cieco Appio Claudio, che davvero si fece portare in senato per impedire la pace con Pirro, e che in quest\'app compare due volte (I.11-12).',
          'Sempre dalla prima Filippica: il viaggio per mare che per poco non tolse Cicerone dalla storia, la partenza per la Grecia e il ritorno immediato sulla costa italiana spinto dall\'austro, raccontato nel latino più semplice dell\'orazione (7); la tesi che gli atti di un uomo di Stato sono le sue leggi e nient\'altro - "chiedi gli atti di Gracco: ti verranno prodotte le leggi Sempronie" (18); e la formula che sarebbe stata incisa sulla tavola di bronzo, "i consoli hanno interrogato il popolo secondo il diritto", letta ad alta voce con due domande infilate dentro che la fanno crollare (26).',
          'E dalla quarta: la legione che giudicò Antonio nemico pubblico prima ancora del senato, e che secondo Cicerone trasse il nome da Marte in persona, quattro mesi prima di essere fatta a pezzi a Modena (5); e la chiusa dell\'orazione, dove Antonio smette di essere un criminale e diventa una bestia caduta in una fossa da caccia, seguita dalla frase che dice di che cosa tratti davvero la guerra: non a quali condizioni vivremo, ma se vivremo (12).'
        ],
        changed: [
          'Tutte le traduzioni di queste due orazioni sono state ricontrollate sul latino, frase per frase. Qualche resa dei brani aggiunti la volta scorsa è stata corretta: due punti in cui l\'inglese diceva un po\' più di quanto dica il latino, una frase italiana che trasformava un mezzo in un agente, e la formulazione della tavola di bronzo, dove l\'inglese aveva perso la parola ripetuta su cui si regge la battuta.'
        ],
        deleted: []
      }
    },
    {
      v: '1.7.0', date: '2026-08-23', time: '20:29', tz: 'CEST',
      en: {
        added: [
          'Five new speeches by Cicero, with three excerpts each: the Pro Caelio, the In Pisonem, and the first, fourth and fourteenth Philippics. His practice menu now holds thirteen speeches.',
          'From the Pro Caelio, the defence of a young man accused by the most powerful woman in Rome: the famous slip of the tongue, "that woman\'s husband - brother, I meant to say; I always make that mistake"; the dead censor Appius Claudius the Blind called up from the grave to scold his own descendant, chosen for the job because being blind he will not have to look at her; and the passage where Cicero argues that a young man who takes no pleasure in anything is a freak, and then lists exactly which pleasures are allowed.',
          'From the In Pisonem, pure invective: the consul whose face got him elected and who resembles his smoke-blackened ancestral portraits in nothing but the colour; a party where his colleague dances naked without fearing fortune\'s wheel, followed by a definition of what a consul actually is; and the young Piso hearing an Epicurean praise pleasure and deciding, like a stallion, that he had found not a teacher of virtue but a licence.',
          'And from the Philippics, the arc of Cicero\'s last year: the amnesty after Caesar\'s murder and a portrait of an Antony who was still behaving well (I); the road to glory, with a line from an old Roman tragedy already in this app quoted back at Antony as a warning (I); the sentence that ends the first speech, "what I have lived is almost enough, whether for age or for glory"; the deadlock reduced to one line, "if Antonius is consul, Brutus is a public enemy" (IV); and, from the last speech he ever published, the monument to the soldiers who died at Mutina - "nature gave you a short life, but the memory of a life well given back is everlasting" (XIV).'
        ],
        changed: [
          'The new speeches slot into the chronological order: Pro Caelio and In Pisonem sit between Pro Archia and Pro Milone, and the three new Philippics around the second one.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cinque nuove orazioni di Cicerone, con tre brani ciascuna: la Pro Caelio, l\'In Pisonem e la prima, la quarta e la quattordicesima Filippica. Il suo menu di esercizi conta ora tredici orazioni.',
          'Dalla Pro Caelio, la difesa di un giovane accusato dalla donna più potente di Roma: il celebre lapsus, "il marito di quella donna, anzi il fratello, volevo dire; sbaglio sempre su questo punto"; il censore morto Appio Claudio il Cieco richiamato dalla tomba per rimproverare la propria discendente, scelto per l\'incarico perché, essendo cieco, non dovrà guardarla; e il passo in cui Cicerone sostiene che un giovane che non prova piacere per nulla è un fenomeno da baraccone, e poi elenca esattamente quali piaceri siano ammessi.',
          'Dall\'In Pisonem, invettiva pura: il console che è stato eletto grazie alla faccia e che somiglia ai ritratti anneriti dei suoi antenati soltanto nel colore; una festa in cui il collega balla nudo senza temere la ruota della fortuna, seguita dalla definizione di che cosa sia davvero un console; e il giovane Pisone che, sentendo un epicureo lodare il piacere, decide, come uno stallone, di aver trovato non un maestro di virtù ma un permesso.',
          'E dalle Filippiche, l\'arco dell\'ultimo anno di Cicerone: l\'amnistia dopo l\'assassinio di Cesare e il ritratto di un Antonio che si comportava ancora bene (I); la via della gloria, con un verso di un\'antica tragedia romana già presente in quest\'app, citato ad Antonio come avvertimento (I); la frase che chiude la prima orazione, "quello che ho vissuto mi basta quasi, sia per l\'età sia per la gloria"; lo stallo ridotto a una riga, "se Antonio è console, Bruto è un nemico pubblico" (IV); e, dall\'ultima orazione che abbia pubblicato, il monumento ai soldati caduti a Modena: "breve è la vita che vi ha dato la natura, ma eterna la memoria di una vita ben restituita" (XIV).'
        ],
        changed: [
          'Le nuove orazioni si inseriscono nell\'ordine cronologico: Pro Caelio e In Pisonem stanno fra Pro Archia e Pro Milone, e le tre nuove Filippiche attorno alla seconda.'
        ],
        deleted: []
      }
    },
    {
      v: '1.6.7', date: '2026-08-23', time: '19:32', tz: 'CEST',
      en: {
        added: [
          'Five new excerpts from the Pro Milone, which goes from three to eight. Milo was on trial for killing Clodius on the Appian Way, and Cicero had the difficult job of arguing self-defence for a man whose slaves had finished the job.',
          'The centrepiece is Cicero\'s account of the journey itself, where he never says who attacked first and instead lists what each man was carrying: Milo in a carriage with his wife, a travelling cloak and a slow retinue of maids and boys; Clodius on horseback with nothing at all. He then admits, openly, that Milo\'s slaves did the killing, and insists their master neither ordered it, knew of it, nor was there (28-29).',
          'Also: "who stood to gain", the question a famously severe old judge always asked, here turned into the whole logic of the defence (32); a four-sentence answer to the charge that Milo freed his slaves to keep them from being tortured, ending "the rack investigates the fact, the court the law" (57); the imaginary boast Cicero puts in Milo\'s mouth, "I killed him, I killed him", so that he can say what a defence lawyer cannot (72); and the argument that a divine power destroyed Clodius by putting into his head the idea of attacking the one man who could beat him (84).'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Cinque nuovi brani dalla Pro Milone, che passa da tre a otto. Milone era sotto processo per aver ucciso Clodio sulla via Appia, e Cicerone aveva il compito difficile di sostenere la legittima difesa per un uomo i cui servi avevano portato a termine il lavoro.',
          'Il pezzo centrale è il racconto ciceroniano del viaggio, in cui non dice mai chi abbia attaccato per primo e si limita a elencare che cosa portasse con sé ciascuno dei due: Milone in carrozza con la moglie, il mantello da viaggio e un lento seguito di ancelle e ragazzi; Clodio a cavallo, senza nulla. Poi ammette apertamente che a uccidere furono i servi di Milone, e insiste che il padrone non lo ordinò, non lo seppe e non era presente (28-29).',
          'Inoltre: "a chi ha giovato", la domanda che un vecchio giudice famoso per la severità poneva sempre, qui trasformata nell\'intera logica della difesa (32); una risposta di quattro frasi all\'accusa di aver affrancato i servi per sottrarli alla tortura, che si chiude con "sul cavalletto si indaga il fatto, in tribunale il diritto" (57); il vanto immaginario che Cicerone mette in bocca a Milone, "l\'ho ucciso, l\'ho ucciso", per poter dire ciò che un difensore non può dire (72); e la tesi che una potenza divina abbia distrutto Clodio mettendogli in testa l\'idea di aggredire l\'unico uomo capace di batterlo (84).'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.6.6', date: '2026-08-23', time: '18:38', tz: 'CEST',
      en: {
        added: [
          'Five new excerpts from the Pro Archia, which goes from three to eight. It is the speech in which Cicero, defending a Greek poet against a technicality about his citizenship, spends most of his time arguing about why literature matters at all.',
          'He opens by telling the court that whatever ability they are listening to belongs to the man on trial, who taught him as a boy (1). He describes Archias improvising polished verse on the events of the day with nothing written down, and then produces the oldest theory of poetry in Europe: everything else can be taught, but a poet works by nature and is breathed into by something divine (18). He recalls Sulla paying off a bad poet at an auction on condition that he never write again (25). He confesses, in open court, that he loves glory and encouraged Archias to finish a poem about his own consulship, then argues that praise is the only wage courage ever gets (28). And he signs off by admitting the whole speech was a digression, adding that he is quite sure the presiding magistrate enjoyed it, who happened to be his brother (32).'
        ],
        changed: [
          'Cicero\'s speeches are back in the order he delivered them, rather than alphabetical: In Verrem, then the four Catilinarians, then Pro Archia, Pro Milone and the Second Philippic.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cinque nuovi brani dalla Pro Archia, che passa da tre a otto. È l\'orazione in cui Cicerone, difendendo un poeta greco da un cavillo sulla cittadinanza, passa la maggior parte del tempo a sostenere perché la letteratura conti qualcosa.',
          'Apre dicendo alla corte che qualunque capacità stiano ascoltando appartiene all\'uomo sotto processo, che gli fu maestro da ragazzo (1). Descrive Archia mentre improvvisa versi levigati sui fatti del giorno senza nulla di scritto, e poi formula la più antica teoria della poesia d\'Europa: tutto il resto si può insegnare, ma il poeta vale per natura ed è ispirato da un soffio divino (18). Ricorda Silla che liquida un cattivo poeta a un\'asta a patto che non scriva mai più (25). Confessa, in pubblica udienza, di amare la gloria e di aver incoraggiato Archia a finire un poema sul proprio consolato, e sostiene poi che la lode è l\'unico salario che il valore riceva (28). E si congeda ammettendo che tutta l\'orazione è stata una digressione, aggiungendo di essere certo che al magistrato che presiedeva sia piaciuta: era suo fratello (32).'
        ],
        changed: [
          'Le orazioni di Cicerone sono tornate nell\'ordine in cui furono pronunciate, invece che in ordine alfabetico: Verrine, poi le quattro Catilinarie, poi Pro Archia, Pro Milone e Seconda Filippica.'
        ],
        deleted: []
      }
    },
    {
      v: '1.6.5', date: '2026-08-22', time: '23:10', tz: 'CEST',
      en: {
        added: [
          'One more excerpt from the fourth Catilinarian, which goes to eight: the legal argument that made the executions possible. A law carried by Gaius Gracchus forbade putting a Roman citizen to death without a vote of the people, and Cicero gets around it by definition rather than by denial - a man who is an enemy of the state cannot be a citizen at all, so the protection never applied to him. He then points out that Gracchus himself was killed without any vote of the people (10).',
          'Cicero\'s biography gains a passage on the idea he built his whole career on: that Rome was held together not by written law but by the custom of the ancestors, an unwritten constitution designed for a small self-governing city and now being asked to run an empire. It includes his model, Cato the Elder, another outsider from a country town who turned himself into the definition of ancestral virtue - and the irony that the tradition\'s own safeguards were eventually used to drive Cicero out of Italy.'
        ],
        changed: [
          'The notes on the excerpt about Caesar\'s motion (IV.7) now point to Sallust, who rewrote the same Senate debate a generation later and gave Caesar a speech of his own, with much the same arguments.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Un altro brano dalla quarta Catilinaria, che sale a otto: l\'argomento giuridico che rese possibili le esecuzioni. Una legge fatta approvare da Gaio Gracco vietava di mettere a morte un cittadino romano senza un voto del popolo, e Cicerone la aggira per definizione invece che negandola: chi è nemico dello Stato non può essere affatto cittadino, quindi quella tutela non lo ha mai riguardato. Poi fa notare che Gracco stesso fu ucciso senza alcun voto del popolo (10).',
          'La biografia di Cicerone si arricchisce di un passaggio sull\'idea su cui costruì tutta la sua carriera: che Roma fosse tenuta insieme non dalla legge scritta ma dal costume degli antenati, una costituzione non scritta pensata per una piccola città che governava se stessa e ora chiamata a reggere un impero. Comprende il suo modello, Catone il Vecchio, un altro uomo venuto da fuori, da una cittadina di provincia, che fece di se stesso la definizione della virtù avita; e l\'ironia che le garanzie di quella stessa tradizione furono infine usate per cacciare Cicerone dall\'Italia.'
        ],
        changed: [
          'Le note al brano sulla mozione di Cesare (IV.7) rimandano ora a Sallustio, che riscrisse lo stesso dibattito in senato una generazione più tardi e diede a Cesare un discorso tutto suo, con argomenti molto simili.'
        ],
        deleted: []
      }
    },
    {
      v: '1.6.4', date: '2026-08-22', time: '20:48', tz: 'CEST',
      en: {
        added: [
          'Four excerpts from the fourth Catilinarian, which goes to seven. With this the four speeches against Catiline are finished: thirty-one passages in all, and the first speech alone holds ten.',
          'Cicero tells the Senate to stop worrying about what this vote will cost him, and then lists everyone waiting on the outcome: his brother in tears beside him, his wife fainting, his daughter prostrate with fear, and his two-year-old son, whom the republic seems to be holding in its arms as a hostage for his consulship (3).',
          'He lays out the two motions with scrupulous fairness: Silanus wants the death penalty, Caesar wants everything confiscated and the men held in chains for ever, on the grounds that death is not a punishment at all but either nature taking its course or a rest from trouble (7). He then walks through the crowd outside, from the knights down to the slaves, to show a city that agrees for once (15-16). And he sums the whole thing up: an empire built over centuries, a liberty held by courage, a prosperity heaped up by the gods, and a single night that came close to wiping out all three (19).'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Quattro brani dalla quarta Catilinaria, che sale a sette. Con questo le quattro orazioni contro Catilina sono complete: trentuno passi in tutto, e la sola prima orazione ne contiene dieci.',
          'Cicerone dice al senato di smettere di preoccuparsi di quanto quel voto costerà a lui, e poi elenca tutti quelli che ne aspettano l\'esito: il fratello in lacrime accanto a lui, la moglie svenuta, la figlia prostrata dal terrore e il figlio di due anni, che la repubblica sembra tenere in braccio come ostaggio del suo consolato (3).',
          'Espone le due mozioni con scrupolosa correttezza: Silano chiede la pena di morte, Cesare chiede la confisca di tutto e le catene a vita, sostenendo che la morte non è affatto una pena ma o il corso della natura o un riposo dalle fatiche (7). Poi attraversa la folla che sta fuori, dai cavalieri fino agli schiavi, per mostrare una città che per una volta è d\'accordo (15-16). E infine tira le somme: un impero costruito in secoli, una libertà tenuta in piedi dal valore, una prosperità accumulata dagli dèi, e una sola notte che ha rischiato di cancellare tutte e tre le cose (19).'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.6.3', date: '2026-08-22', time: '19:38', tz: 'CEST',
      en: {
        added: [
          'Eight new excerpts: the second and third Catilinarian go from three to seven each. Between them the four speeches now hold twenty-seven passages.',
          'From the second speech: Catiline as the bilge-water of the city, followed by a roll-call of every kind of criminal who turns out to have been a close friend of his (7); the answer to the people who said Cicero had exiled a citizen illegally, with the senators quietly standing up and leaving empty the whole row he had sat down in (12-13); the two sides drawn up as abstract armies, modesty against shamelessness, good faith against fraud (25); and the closing promise that the gods are no longer defending Rome from far away but standing inside their own temples (29).',
          'From the third speech: the Gauls testify that Lentulus believed prophecy had marked him out as the third Cornelius to rule Rome, after Cinna and Sulla (9); the sealed letters are opened in front of their authors, and Cethegus explains the swords found at his house by saying he had always been keen on good ironmongery (10); the thanksgiving voted in Cicero\'s name, the first ever for a man in a toga rather than in armour (15); and the statue of Jupiter, ordered two years earlier and delayed by slow builders, which was finally hoisted into place at the exact hour the conspirators were marched across the forum (20-21).'
        ],
        changed: [
          'Cicero\'s speeches are now listed alphabetically in the menu, the way Plautus\'s comedies are: In Catilinam I, II, III and IV, then In Verrem, Philippica II, Pro Archia and Pro Milone. They used to be in the order he delivered them.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Otto nuovi brani: la seconda e la terza Catilinaria passano da tre a sette ciascuna. Fra tutte, le quattro orazioni contengono ora ventisette passi.',
          'Dalla seconda orazione: Catilina come la sentina della città, seguito dall\'appello di ogni specie di criminale che si scopre essere stato suo intimo amico (7); la risposta a chi diceva che Cicerone avesse esiliato illegalmente un cittadino, con i senatori che si alzano in silenzio e lasciano vuota tutta la fila in cui si era seduto (12-13); i due schieramenti disposti come eserciti di astrazioni, il pudore contro l\'insolenza, la lealtà contro la frode (25); e la promessa finale che gli dèi non difendono più Roma da lontano, ma stanno dentro i propri templi (29).',
          'Dalla terza orazione: i Galli testimoniano che Lentulo credeva di essere, per profezia, il terzo Cornelio destinato a dominare Roma dopo Cinna e Silla (9); le lettere sigillate vengono aperte davanti ai loro autori, e Cetego spiega le spade trovate in casa sua dicendo di essere sempre stato un appassionato di buoni ferri (10); il rendimento di grazie votato a nome di Cicerone, il primo mai concesso a un uomo in toga anziché in armatura (15); e la statua di Giove, ordinata due anni prima e ritardata da lavori lentissimi, issata al suo posto proprio nell\'ora in cui i congiurati venivano condotti attraverso il foro (20-21).'
        ],
        changed: [
          'Le orazioni di Cicerone sono ora elencate in ordine alfabetico nel menu, come le commedie di Plauto: Prima, Seconda, Terza e Quarta Catilinaria, poi Verrine, Seconda Filippica, Pro Archia e Pro Milone. Prima erano nell\'ordine in cui le pronunciò.'
        ],
        deleted: []
      }
    },
    {
      v: '1.6.2', date: '2026-08-22', time: '18:58', tz: 'CEST',
      en: {
        added: [
          'Three more excerpts from the first Catilinarian, which is now complete at ten. It is far and away the most thoroughly covered text in the app.',
          'The Senate has sat in dead silence through the whole speech, and Cicero turns that silence into a verdict: "when they keep still they approve, when they let it pass they decree, when they say nothing they shout" (20-21). Then the fatherland, who earlier rounded on Catiline, turns on Cicero instead and demands to know why he is letting the man walk out alive - and warns him that if Italy burns, he will burn with it (27-29). And he admits something a politician rarely admits: getting rid of Catiline will fix nothing, because the conspiracy is a fever already in the bloodstream, and killing one man is the cold drink that brings relief and then a worse relapse (31-32).'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Altri tre brani dalla prima Catilinaria, che è ora completa a quota dieci. È di gran lunga il testo più approfondito di tutta l\'app.',
          'Il senato è rimasto in silenzio assoluto per tutta l\'orazione, e Cicerone trasforma quel silenzio in una sentenza: "quando stanno fermi approvano, quando lasciano fare decretano, quando tacciono gridano" (20-21). Poi la patria, che prima si era rivoltata contro Catilina, si rivolta invece contro Cicerone e pretende di sapere perché stia lasciando uscire vivo quell\'uomo, avvertendolo che se l\'Italia brucerà, brucerà anche lui (27-29). E ammette una cosa che un politico ammette di rado: sbarazzarsi di Catilina non risolverà nulla, perché la congiura è una febbre ormai entrata nel sangue, e uccidere un uomo solo è quel sorso d\'acqua fredda che dà sollievo e poi una ricaduta peggiore (31-32).'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.6.1', date: '2026-08-21', time: '20:30', tz: 'CEST',
      en: {
        added: [
          'Four more excerpts from the first Catilinarian, which now has seven. They were picked to follow the speech as it actually unfolds, and they sit in paragraph order alongside the ones already there.',
          'Cicero digs up two old cases of Romans killing dangerous citizens on their own initiative, and turns them into an accusation against himself: "we have the decree; the ones who are missing are the consuls" (3). He points out that there is an enemy camp in Etruria whose general is sitting in the Senate listening to him (5). He walks Catiline through the previous night at Laeca\'s house, street name and all, down to the two knights who offered to come round at dawn and kill him in his bed - and breaks off to ask what city he is living in (8-9). And he holds the door open: the gates are open, take as many of your people as you like, just put a wall between us (10).'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Altri quattro brani dalla prima Catilinaria, che ora ne ha sette. Sono stati scelti per seguire l\'orazione così come si svolge davvero, e si collocano in ordine di paragrafo accanto a quelli già presenti.',
          'Cicerone tira fuori due vecchi casi di Romani che uccisero di loro iniziativa cittadini pericolosi, e li trasforma in un\'accusa contro se stesso: "abbiamo il decreto; a mancare siamo noi consoli" (3). Fa notare che c\'è un accampamento nemico in Etruria il cui comandante siede in senato ad ascoltarlo (5). Ripercorre con Catilina la notte precedente in casa di Leca, con tanto di nome della via, fino ai due cavalieri che si erano offerti di passare all\'alba e ucciderlo nel suo letto, e si interrompe per chiedersi in quale città stia vivendo (8-9). E gli tiene la porta aperta: le porte sono aperte, portati via quanti dei tuoi vuoi, basta che fra noi ci sia un muro (10).'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.6.0', date: '2026-08-20', time: '21:20', tz: 'CEST',
      en: {
        added: [
          'The four Catilinarian speeches are now four separate texts in the menu, one for each speech, and each has three excerpts. Nine new passages join the three that were already there.',
          'Highlights: the fatherland herself standing up to tell Catiline to leave and take her fear with him, and the closing prayer to Jupiter the Stayer (first speech); "inside are the plots, inside is the enemy", and the parade of Catiline\'s perfumed young men who have learned to dance, to sing and to scatter poison (second); the night ambush at the Mulvian Bridge, and Cicero asking for no reward but that the day be remembered (third); the consul who has nowhere safe left to stand, the vision of Rome falling in a single fire, and the final "you have a consul who will carry it out" (fourth).'
        ],
        changed: [
          'In Catilinam is no longer one entry in the chooser: it is In Catilinam I, II, III and IV, in the order Cicero delivered them between 8 November and 5 December 63 BC.',
          'The opening excerpt of the first speech now carries three words in square brackets, "quam tu in nos [omnes iam diu] machinaris", which the source text prints and our version had left out. The translations were adjusted to match, and the notes explain what the brackets mean: words that editors keep but are not certain about.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le quattro Catilinarie sono ora quattro testi distinti nel menu, uno per orazione, e ciascuna ha tre brani. Nove nuovi passi si aggiungono ai tre che c\'erano già.',
          'Tra i pezzi forti: la patria in persona che si alza per dire a Catilina di andarsene e di portarsi via la sua paura, e la preghiera finale a Giove Statore (prima orazione); "dentro sono le insidie, dentro è il nemico", e la sfilata dei giovani profumati di Catilina che hanno imparato a ballare, a cantare e a spargere veleni (seconda); l\'agguato notturno al ponte Milvio, e Cicerone che non chiede altro premio se non che quel giorno sia ricordato (terza); il console che non ha più un posto sicuro dove stare, la visione di Roma che crolla in un solo incendio, e il conclusivo "avete un console che lo farà" (quarta).'
        ],
        changed: [
          'In Catilinam non è più una sola voce nel menu: sono Prima, Seconda, Terza e Quarta Catilinaria, nell\'ordine in cui Cicerone le pronunciò fra l\'8 novembre e il 5 dicembre del 63 a.C.',
          'Il brano d\'apertura della prima orazione porta ora tre parole fra parentesi quadre, "quam tu in nos [omnes iam diu] machinaris", che il testo di riferimento stampa e che nella nostra versione mancavano. Le traduzioni sono state adeguate, e le note spiegano che cosa significano le parentesi quadre: parole che gli editori conservano ma di cui non sono certi.'
        ],
        deleted: []
      }
    },
    {
      v: '1.5.0', date: '2026-08-18', time: '12:48', tz: 'CEST',
      en: {
        added: [
          'Cicero gets a proper practice bank. His speeches now hold five works with three excerpts each (15 in total): In Verrem, In Catilinam, Pro Archia, Pro Milone and the Second Philippic.',
          'Highlights: Verres pretending art theft is a hobby, and the flogging of Gavius crying "civis Romanus sum"; Catiline gone in four words ("abiit, excessit, evasit, erupit") and Rome handed back to its people; the anthem to reading ("these studies feed the young and delight the old") and Alexander weeping at Achilles’ tomb; "the laws fall silent among weapons"; and Antony being sick on the speaker’s platform, answered a hundred sections later by Cicero’s own epitaph, "I defended the republic as a young man; I shall not desert it as an old one".',
          'Because Cicero wrote so much, and in such different registers, his practice menu now has two steps: first pick a kind of text (Speeches, Letters, Philosophical works, Rhetorical works), then pick the work inside it. Letters and the philosophical and rhetorical works are next in line.'
        ],
        changed: [
          'The chooser page can now show categories before works. Authors with a single kind of output (Plautus, Terence, Caecilius, Varro) are unchanged.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cicerone ha finalmente una vera raccolta di esercizi. Le sue orazioni contano ora cinque opere con tre brani ciascuna (15 in tutto): Verrine, Catilinarie, Pro Archia, Pro Milone e la Seconda Filippica.',
          'Tra i pezzi forti: Verre che spaccia il furto d’arte per una passione, e la fustigazione di Gavio che grida "civis Romanus sum"; Catilina liquidato in quattro parole ("abiit, excessit, evasit, erupit") e Roma restituita al suo popolo; l’inno alla lettura ("questi studi nutrono la giovinezza e allietano la vecchiaia") e Alessandro in lacrime davanti alla tomba di Achille; "le leggi tacciono in mezzo alle armi"; e Antonio che vomita sul palco degli oratori, a cui risponde cento paragrafi dopo l’autoepitaffio di Cicerone, "ho difeso la repubblica da giovane, non l’abbandonerò da vecchio".',
          'Poiché Cicerone ha scritto moltissimo, e in registri molto diversi, il suo menu di esercizi ha ora due passaggi: prima si sceglie il tipo di testo (Orazioni, Lettere, Opere filosofiche, Opere retoriche), poi l’opera al suo interno. Le lettere e le opere filosofiche e retoriche sono le prossime in arrivo.'
        ],
        changed: [
          'La pagina di scelta può ora mostrare le categorie prima delle opere. Gli autori con un solo tipo di produzione (Plauto, Terenzio, Cecilio, Varrone) restano invariati.'
        ],
        deleted: []
      }
    },
    {
      v: '1.4.0', date: '2026-08-13', time: '20:25', tz: 'CEST',
      en: {
        added: [
          'Plautus is complete: all ten comedies now have five practice excerpts each (50 in total). The older seven gained twelve new passages, spread across their acts.',
          'Highlights: Mercury gaslighting poor Sosia out of his own name (Amphitruo); the old man drilling his slave like a general, with a sly dig at the jailed poet Naevius (Miles Gloriosus); Pseudolus vowing to conjure money from nothing "like a poet", and the pimp Ballio proudly claiming every insult as his own name (Pseudolus); the household god revealing the buried gold and the great two-crimes-one-confession scene (Aulularia); the slave Tranio inventing a ghost on the spot to keep his master out of the house (Mostellaria); Chrysalus gloating over his gold-trick, and the tutor Lydus recoiling from the "Bacchants" (Bacchides); and the cook who greets the wrong twin (Menaechmi).'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Plauto è completo: tutte e dieci le commedie hanno ora cinque brani di esercizio ciascuna (50 in tutto). Le sette più vecchie hanno guadagnato dodici nuovi passi, distribuiti tra i loro atti.',
          'Tra i pezzi forti: Mercurio che con l’inganno priva il povero Sosia del suo stesso nome (Anfitrione); il vecchio che addestra il suo schiavo come un generale, con una frecciata al poeta imprigionato Nevio (Miles Gloriosus); Pseudolo che giura di far comparire il denaro dal nulla "come un poeta", e il lenone Ballione che rivendica fiero ogni insulto come il proprio nome (Pseudolo); il dio di casa che rivela l’oro sepolto e la grande scena dei due delitti in una sola confessione (Aulularia); lo schiavo Tranione che inventa lì per lì un fantasma per tenere il padrone fuori di casa (Mostellaria); Crisalo che si vanta del suo trucco dell’oro, e il precettore Lido che indietreggia inorridito davanti alle "baccanti" (Bacchides); e il cuoco che saluta il gemello sbagliato (Menecmi).'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.3.0', date: '2026-07-20', time: '12:25', tz: 'CEST',
      en: {
        added: [
          'Three new Plautus comedies join the practice bank, five excerpts each: the Asinaria (a father and son bidding against each other for the same girl), the Casina (a lecherous old man scheming to bed a slave-girl, foiled by his wife), and the Truculentus (a mercenary courtesan fleecing three lovers, and the boorish slave who gives the play its name).',
          'Highlights: the "man is a wolf to man" line (Asinaria); the father and son forced to share a dinner-couch and a mistress; old Lysidamus’s ridiculous love-song and the lot-drawing for the "bride"; the surly Truculentus who, one scene later, is "not Truculentus any more"; and Phronesium stage-managing a borrowed baby to squeeze gifts out of a soldier.',
          'Plautus now has all ten of his best-known comedies in the chooser, listed alphabetically.'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Tre nuove commedie di Plauto entrano nella raccolta di esercizi, cinque brani ciascuna: l’Asinaria (un padre e un figlio che rilanciano l’uno contro l’altro per la stessa ragazza), la Casina (un vecchio libidinoso che trama per portarsi a letto una schiava, sventato dalla moglie) e il Truculentus (una cortigiana mercenaria che spenna tre amanti, e il servo rozzo che dà il nome alla commedia).',
          'Tra i pezzi forti: il verso "l’uomo è un lupo per l’uomo" (Asinaria); il padre e il figlio costretti a spartirsi il triclinio e l’amante; la ridicola canzone d’amore del vecchio Lisidamo e il sorteggio della "sposa"; il rissoso Truculento che, una scena dopo, "non è più Truculento"; e Fronesio che mette in scena un bambino preso in prestito per spremere regali a un soldato.',
          'Plauto ha ora nel menu tutte e dieci le sue commedie più note, elencate in ordine alfabetico.'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.2.2', date: '2026-07-14', time: '00:24', tz: 'EEST',
      en: {
        added: [
          'The version badges on each practice excerpt are now clickable. The red "NEW!" banner and the little "Added in v.X" papyrus tags open a new page listing every excerpt from that update, sorted alphabetically by author (and, for Cornelius Nepos, by the character each excerpt is about).',
          'That page has arrows to step to the previous and next update that added excerpts, and every excerpt in the list links straight to its own practice card.'
        ],
        changed: [
          'The "What’s New" log now shows the release time (24-hour clock) next to the date, so the timezone finally has a time to sit beside. This update is stamped EEST (I am travelling in Greece); every earlier update keeps its CEST time.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Le etichette di versione su ogni brano di esercizio ora sono cliccabili. Lo stendardo rosso "NUOVO!" e le piccole pergamene "Aggiunto in v.X" aprono una nuova pagina che elenca tutti i brani di quell’aggiornamento, ordinati alfabeticamente per autore (e, per Cornelio Nepote, in base al personaggio di cui parla ciascun brano).',
          'Quella pagina ha delle frecce per passare all’aggiornamento precedente e successivo che ha aggiunto brani, e ogni brano dell’elenco rimanda direttamente alla propria scheda di esercizio.'
        ],
        changed: [
          'Il registro delle "Novità" ora mostra l’orario di pubblicazione (formato 24 ore) accanto alla data, così il fuso orario ha finalmente un orario accanto a cui stare. Questo aggiornamento è marcato EEST (sono in viaggio in Grecia); ogni aggiornamento precedente mantiene il suo orario CEST.'
        ],
        deleted: []
      }
    },
    {
      v: '1.2.1', date: '2026-07-09', time: '20:57', tz: 'CEST',
      en: {
        added: [],
        changed: [
          'Fixed the "Added in v.X" tags. The little papyrus tag on each practice passage was showing v.1.0.0 for everything older than that; now every passage shows the version it was really first added in - so the earliest fragments correctly read v.0.1.0, the first Plautus batches v.0.6.0, and so on.',
          'Gave the red "NEW!" banner a fresh coat: a brighter, more vivid red, with the faint diagonal stripes removed, and pulled up so its golden top just touches the top edge of the passage card.'
        ],
        deleted: []
      },
      it: {
        added: [],
        changed: [
          'Corrette le etichette "Aggiunto in v.X". La piccola pergamena su ogni brano di esercizio segnava v.1.0.0 per tutto ciò che era più vecchio; ora ogni brano mostra la versione in cui è stato davvero introdotto la prima volta - così i frammenti più antichi indicano correttamente v.0.1.0, le prime infornate di Plauto v.0.6.0, e così via.',
          'Nuova veste per lo stendardo rosso "NUOVO!": un rosso più acceso e vivido, senza le tenui righe diagonali, e spostato in alto in modo che la sua cima dorata sfiori il bordo superiore della scheda del brano.'
        ],
        deleted: []
      }
    },
    {
      v: '1.2.0', date: '2026-07-09', time: '01:09', tz: 'CEST',
      en: {
        added: [
          'Cornelius Nepos, the pocket-biographer of Caesar’s Age, grows from a single practice passage to eight - the first big step in fleshing out the authors around Varro.',
          'Highlights: his preface to Atticus arguing that Greeks should be judged by Greek standards; Themistocles tricking Xerxes into the trap at Salamis; the dazzling-and-dissolute character sketch of Alcibiades; the liberation of Thebes ("serious business I put off till tomorrow"); the nine-year-old Hannibal swearing eternal enmity to Rome at his father’s altar; Cato the polymath and his lost first history of Rome; and Atticus keeping clear of the civil wars.',
          'New: every practice excerpt now carries a little "Added in v.X" tag on a papyrus scroll (top-right), so you can see when it was added. The very newest batch of excerpts wears a red "NEW!" banner instead - right now, the seven new Nepos passages.'
        ],
        changed: [
          'Fixed the citation on the existing Epaminondas passage to the fuller "De Viris Illustribus, Epaminondas IX.3-4, X.1-2" form, now used for all the Nepos excerpts.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Cornelio Nepote, il biografo tascabile dell’età di Cesare, passa da un solo brano di esercizio a otto - il primo grande passo nell’arricchire gli autori attorno a Varrone.',
          'Tra i pezzi forti: la prefazione ad Attico, in cui sostiene che i Greci vanno giudicati con il metro dei Greci; Temistocle che inganna Serse e lo trascina nella trappola di Salamina; il ritratto abbagliante e dissoluto di Alcibiade; la liberazione di Tebe ("le cose serie le rimando a domani"); Annibale bambino che a nove anni giura eterna inimicizia a Roma sull’altare del padre; Catone poligrafo e la sua perduta prima storia di Roma; e Attico che si tiene fuori dalle guerre civili.',
          'Novità: ogni brano di esercizio porta ora una piccola etichetta "Aggiunto in v.X" su una pergamena (in alto a destra), così vedi quando è stato aggiunto. Il gruppo di brani più recente sfoggia invece uno stendardo rosso "NUOVO!" - in questo momento, i sette nuovi brani di Nepote.'
        ],
        changed: [
          'Corretta la citazione del brano già presente di Epaminonda nella forma più completa "De Viris Illustribus, Epaminondas IX.3-4, X.1-2", ora usata per tutti i brani di Nepote.'
        ],
        deleted: []
      }
    },
    {
      v: '1.1.5', date: '2026-07-08', time: '17:34', tz: 'CEST',
      en: {
        added: [
          'Cato the Elder grows from 5 practice passages to 10, all showing off his blunt "do this, do that" style and the farm vocabulary his manual runs on. The new ones: the duties of the housekeeper (paired with the overseer); how to build a lime-kiln; how to bring in the olive harvest; a real, followable recipe for placenta cake (cheese and honey); and the watered-down winter wine brewed for the household slaves.'
        ],
        changed: [
          'Tuned Cato’s difficulty chart: the "density" bar is lowered and turned green (his writing is not dense at all), and the "lexicon" bar is nudged up a little (vocabulary really is the main hurdle with Cato).'
        ],
        deleted: []
      },
      it: {
        added: [
          'Catone il Censore passa da 5 brani di esercizio a 10, tutti a mostrare il suo stile secco da "fai questo, fai quello" e il lessico agricolo su cui gira il suo manuale. I nuovi: i doveri della fattoressa (in coppia con il fattore); come costruire una fornace da calce; come portare a casa il raccolto delle olive; una ricetta vera e seguibile della placenta (torta di formaggio e miele); e il vinello annacquato preparato per la servitù durante l’inverno.'
        ],
        changed: [
          'Ritoccato il grafico di difficoltà di Catone: la barra della "densità" è abbassata e diventa verde (la sua scrittura non è affatto densa), e quella del "lessico" è alzata un po’ (con Catone il vero scoglio è proprio il vocabolario).'
        ],
        deleted: []
      }
    },
    {
      v: '1.1.4', date: '2026-07-07', time: '23:34', tz: 'CEST',
      en: {
        added: [
          'The council-of-the-gods fragment is fleshed out: the gods size up the glutton Lupus’s hideous face, one of them plots to stuff him to death with a fish banquet (tuna-bellies, acarna-heads), and it ends with the gleeful death-sentence, the salt-fish and sheatfish stews will be the end of him (a joke sharpened by Lupus sharing his name with a greedy fish).',
          'The travel-satire gains Lucilius grumbling about the food: no oysters, no shellfish, not even asparagus; out in the backwaters a grimy cup and a bitter sprig of rue pass for honey, and the meal comes back up in sour belches.',
          'And an eighth Lucilius passage joins the set: a proud refusal to give up poetry, he would not trade being Lucilius to become the richest tax-farmer in the province of Asia.'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Il frammento del concilio degli dèi si arricchisce: gli dèi squadrano la faccia orribile del ghiottone Lupo, uno di loro trama di rimpinzarlo a morte con un banchetto di pesce (ventri di tonno, teste di acarna), e il tutto si chiude con la beffarda condanna a morte, le sardelle salate e gli intingoli di siluro saranno la sua fine (una battuta resa più pungente dal fatto che Lupus è anche il nome di un pesce vorace).',
          'La satira di viaggio guadagna Lucilio che si lamenta del cibo: niente ostriche, niente frutti di mare, nemmeno asparagi; in quei posti sperduti una tazza sudicia e un amaro rametto di ruta valgono quanto il miele, e il pasto torna su in rutti acidi.',
          'E un ottavo brano di Lucilio si aggiunge alla raccolta: un fiero rifiuto di rinunciare alla poesia, non baratterebbe l’essere Lucilio per diventare il più ricco pubblicano della provincia d’Asia.'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.1.3', date: '2026-07-07', time: '13:46', tz: 'CEST',
      en: {
        added: [
          'Lucilius, the inventor of Roman satire, grows from a single practice passage to seven. The new ones show off his whole range.',
          'Highlights: his tongue-in-cheek "manifesto" on who he wants reading him; a mock council of the gods condemning a gluttonous senator; the very first travel-satire (the model for Horace’s famous journey poem); a Roman snob who wanted to be Greek and gets mockingly greeted in Greek; a send-up of Homer’s two-hundred-foot Cyclops and of childish bogeymen; and a bleak snapshot of Rome as a rat-race of greed and deceit.'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Lucilio, l’inventore della satira romana, passa da un solo brano di esercizio a sette. I nuovi mostrano tutta la sua gamma.',
          'Tra i pezzi forti: il suo ironico "manifesto" su chi vuole come lettore; un finto concilio degli dèi che condanna un senatore ghiottone; la primissima satira di viaggio (il modello del celebre poemetto di viaggio di Orazio); uno snob romano che voleva essere greco e viene salutato per scherzo in greco; una parodia del Ciclope di Omero alto duecento piedi e degli spauracchi da bambini; e un’istantanea cupa di Roma come una corsa al denaro fatta di avidità e inganni.'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.1.2', date: '2026-07-07', time: '12:44', tz: 'CEST',
      en: {
        added: [
          'Terence doubles up: every one of his six comedies gains two new practice passages, growing from three to five each (twelve new in all).',
          'Highlights include the three prologues where Terence fights his critics - accused of a "thin" style (Phormio), of plagiarism (Eunuchus), and of both "contamination" and getting secret help from noblemen (Adelphoe) - plus the braggart soldier laying siege to a house with a cook armed only with a sponge (Eunuchus), the proverb "fortune favours the brave" (Phormio), and a courtesan who chooses honour over profit (Hecyra).'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Terenzio raddoppia: ognuna delle sue sei commedie guadagna due nuovi brani di esercizio, passando da tre a cinque ciascuna (dodici nuovi in tutto).',
          'Tra i pezzi forti: i tre prologhi in cui Terenzio si difende dai critici - accusato di uno stile "esile" (Phormio), di plagio (Eunuchus), e insieme di "contaminazione" e di farsi aiutare di nascosto da nobili (Adelphoe) - oltre al soldato spaccone che assedia una casa con un cuoco armato solo di spugna (Eunuchus), il proverbio "la fortuna aiuta gli audaci" (Phormio) e una cortigiana che sceglie l\'onore invece del guadagno (Hecyra).'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.1.1', date: '2026-07-06', time: '23:19', tz: 'CEST',
      en: {
        added: [
          'Caecilius Statius gains three new practice passages, all famous one-liners the ancients kept quoting. His Plocium (“The Necklace”) now runs to five: added are “live as you can, since you cannot as you would wish” and a pitch-black joke about a woman who only became dear once she was dead.',
          'His “other plays” section gains the proverb people still repeat without knowing whose it is: “there is often wisdom even under a shabby cloak” - preserved for us by Cicero.'
        ],
        changed: [],
        deleted: []
      },
      it: {
        added: [
          'Cecilio Stazio guadagna tre nuovi brani di esercizio, tutti celebri massime che gli antichi continuavano a citare. Il suo Plocium (“La collana”) arriva ora a cinque: si aggiungono “vivi come puoi, dato che non puoi come vorresti” e una battuta nerissima su una donna che divenne cara soltanto da morta.',
          'La sua sezione “altre commedie” guadagna il proverbio che la gente ripete ancora senza sapere di chi sia: “spesso c’è saggezza anche sotto un mantello liso” - conservato per noi da Cicerone.'
        ],
        changed: [],
        deleted: []
      }
    },
    {
      v: '1.1.0', date: '2026-07-05', time: '22:53', tz: 'CEST',
      en: {
        added: [
          'Varro now has a “pick a work” menu like Plautus and Terence: his practice grows from one passage to eleven, spread across his three surviving works - the farming manual De Re Rustica (5), the language treatise De Lingua Latina (3), and the Menippean satires (3).',
          'Highlights among the new passages: Italy praised as one giant orchard, bees described as a little republic with a king, why a “month” is named after the moon, and Varro’s rules for a good dinner party (never invite a crowd).'
        ],
        changed: [
          'Small wording fix: the author list now reads “Authors of Caesar’s Age” instead of “Authors of the Caesar’s Age”.',
          'On the work-chooser page, the footer now says “Pick a work…” instead of “Pick a comedy or text…”, matching the Italian.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Varrone ha ora un menu “scegli un’opera” come Plauto e Terenzio: i suoi esercizi passano da un solo brano a undici, distribuiti sulle tre opere superstiti - il manuale di agricoltura De Re Rustica (5), il trattato sulla lingua De Lingua Latina (3) e le satire menippee (3).',
          'Tra i nuovi brani: l’Italia lodata come un unico immenso frutteto, le api descritte come una piccola repubblica con un re, perché il “mese” prende nome dalla luna, e le regole di Varrone per una buona cena (mai invitare una folla).'
        ],
        changed: [
          'Piccola rifinitura all’etichetta della lista degli autori (in inglese), ora più corretta.',
          'Nella pagina di scelta dell’opera, l’invito in inglese ora parla di “opera” (come già in italiano) invece di “commedia o testo”.'
        ],
        deleted: []
      }
    },
    {
      v: '1.0.2', date: '2026-07-01', time: '23:36', tz: 'CEST',
      en: {
        added: [
          'Small honesty notes next to the author portraits, telling you when a likeness is invented, uncertain, or (for Figulus) actually someone else - because most of these authors left no real bust behind.'
        ],
        changed: [
          'Those notes sit in the open space to the right of each entry, so the portrait and title keep their usual size.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Piccole note di sincerità accanto ai ritratti degli autori, che segnalano quando un’immagine è inventata, incerta o (per Figulo) in realtà di qualcun altro - perché la maggior parte di questi autori non ha lasciato alcun busto autentico.'
        ],
        changed: [
          'Quelle note stanno nello spazio libero a destra di ogni scheda, così il ritratto e il titolo mantengono le loro dimensioni abituali.'
        ],
        deleted: []
      }
    },
    {
      v: '1.0.1', date: '2026-07-01', time: '22:49', tz: 'CEST',
      en: {
        added: [
          'Caesar’s account of the Druids and Hirtius’s siege of Alexandria are each now split into two shorter passages with fuller notes, so there’s more to practise on.',
          'Authors whose work barely survives (Hortensius, Figulus) now carry a clear grey “Not Assessable” badge, and Figulus’s portrait is labelled as Pythagoras.'
        ],
        changed: [
          'Restored the missing pieces of Varro’s prayer to the twelve farming gods and of Sallust’s speech of Marius, which had been cut short.',
          'Tuned the difficulty charts (Nepos gentler, Lucretius’s vocabulary maxed out) and gave Sallust’s top-tier badge a new purple look.',
          'Polished some Catullus and Cicero details - citations, one Italian line, and a duplicate on Catullus’s page.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Il racconto di Cesare sui Druidi e l’assedio di Alessandria di Irzio sono ora divisi ciascuno in due brani più brevi con note più ampie, così c’è più materiale su cui esercitarsi.',
          'Gli autori di cui resta pochissimo (Ortensio, Figulo) portano ora una chiara etichetta grigia “Non Valutabile”, e il ritratto di Figulo è indicato come Pitagora.'
        ],
        changed: [
          'Ripristinate le parti mancanti della preghiera di Varrone ai dodici dèi dei campi e del discorso di Mario in Sallustio, che erano state troncate.',
          'Ritarati i grafici di difficoltà (Nepote più mite, il lessico di Lucrezio al massimo) e dato un nuovo aspetto viola all’etichetta di massima difficoltà di Sallustio.',
          'Rifiniti alcuni dettagli di Catullo e Cicerone - citazioni, una riga in italiano e un doppione nella pagina di Catullo.'
        ],
        deleted: []
      }
    },
    {
      v: '1.0.0', date: '2026-06-30', time: '19:38', tz: 'CEST',
      en: {
        added: [
          'Caesar’s Age is here - a whole new era to explore, with ten author profiles, from Varro and Cicero to Caesar, Lucretius, Sallust and Catullus.',
          'Seventeen new passages to practise on, each with the Latin, an Italian and an English translation, and a short analysis - among them Cicero facing down Catiline, Caesar on the edge of the Rubicon, and Catullus’s little sparrow.'
        ],
        changed: [
          'The app now holds two eras side by side, so the era menu finally opens a second door.'
        ],
        deleted: []
      },
      it: {
        added: [
          'È arrivata l’Età di Cesare - un’intera nuova epoca da esplorare, con dieci profili d’autore, da Varrone e Cicerone a Cesare, Lucrezio, Sallustio e Catullo.',
          'Diciassette nuovi brani su cui esercitarsi, ognuno con il latino, una traduzione italiana e una inglese e una breve analisi - tra cui Cicerone che affronta Catilina, Cesare sul ciglio del Rubicone e il passerotto di Catullo.'
        ],
        changed: [
          'L’app ora contiene due epoche affiancate, così il menu delle epoche apre finalmente una seconda porta.'
        ],
        deleted: []
      }
    },
    {
      v: '0.9.15', date: '2026-06-29', time: '20:22', tz: 'CEST',
      en: {
        added: [
          'Plautus gains a seventh comedy, the Bacchides, with three scenes - the two scheming sisters who lay a honeyed trap for a young man in the opening, a slave who brags about his swindle as if he had sacked Troy, and a finale where the sisters fleece two old fathers like sheep.'
        ],
        changed: [
          'Fixed the author portraits: the real photos are back on the author cards (and profile pages), replacing the orange initials placeholders that had crept in.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Plauto guadagna una settima commedia, le Bacchidi, con tre scene: le due sorelle intriganti che tendono una trappola melliflua a un giovane nell’apertura, uno schiavo che si vanta della sua truffa come se avesse saccheggiato Troia, e un finale in cui le sorelle tosano due vecchi padri come pecore.'
        ],
        changed: [
          'Sistemati i ritratti degli autori: le foto vere sono tornate sulle schede degli autori (e sulle pagine dei profili), al posto dei segnaposto arancioni con le iniziali che erano comparsi.'
        ],
        deleted: []
      }
    },
    {
      v: '0.9.14', date: '2026-06-29', time: '18:45', tz: 'CEST',
      en: {
        added: [
          'A brand-new "What’s New" scroll, right here on the home page, so you can always see what just changed.',
          'A "see previous versions" button that unrolls the full story of the site, all the way back to day one.'
        ],
        changed: [
          'The home page now puts that empty space beside the Archaic intro to good use, sharing it with the scroll.'
        ],
        deleted: []
      },
      it: {
        added: [
          'Una nuovissima pergamena "Novità", proprio qui nella home, così puoi sempre vedere cos’è appena cambiato.',
          'Un pulsante "vedi le versioni precedenti" che srotola tutta la storia del sito, fino al primo giorno.'
        ],
        changed: [
          'La home page ora sfrutta lo spazio vuoto accanto all’introduzione dell’Età arcaica, condividendolo con la pergamena.'
        ],
        deleted: []
      }
    },
    {
      v: '0.9.13', date: '2026-06-27', time: '19:27', tz: 'CEST',
      en: { added: ['A fourth scene for the Menaechmi: the visiting twin fakes a fit of madness and drags the gods Bacchus and Apollo into the joke.'], changed: [], deleted: [] },
      it: { added: ['Una quarta scena per i Menecmi: il gemello in visita finge un attacco di follia e trascina nello scherzo gli dèi Bacco e Apollo.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.12', date: '2026-06-27', time: '19:20', tz: 'CEST',
      en: { added: [], changed: ['Swapped one Menaechmi scene for a funnier one: the wife mistakes the wrong twin for her husband and buries him in insults while he plays dumb.'], deleted: [] },
      it: { added: [], changed: ['Sostituita una scena dei Menecmi con una più divertente: la moglie scambia il gemello sbagliato per il marito e lo sommerge di insulti mentre lui fa il finto tonto.'], deleted: [] }
    },
    {
      v: '0.9.11', date: '2026-06-27', time: '19:08', tz: 'CEST',
      en: { added: ['Plautus’s Menaechmi joins the line-up as a sixth comedy, with three scenes built on the famous identical-twins mix-up.'], changed: [], deleted: [] },
      it: { added: ['I Menecmi di Plauto si aggiungono come sesta commedia, con tre scene costruite sul celebre equivoco dei gemelli identici.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.10', date: '2026-06-26', time: '21:52', tz: 'CEST',
      en: { added: ['A third Pomponius fragment: a man being coached to fake a woman’s voice for a festival.'], changed: [], deleted: [] },
      it: { added: ['Un terzo frammento di Pomponio: un uomo a cui si insegna a contraffare la voce di donna per una festa.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.9', date: '2026-06-26', time: '21:45', tz: 'CEST',
      en: { added: ['Rounded out the last lesser-known authors – Pacuvius, Accius, Novius and Pomponius now have several passages each. The Archaic-era practice set is complete!'], changed: [], deleted: [] },
      it: { added: ['Completati gli ultimi autori meno noti – Pacuvio, Accio, Novio e Pomponio ora hanno più brani ciascuno. La raccolta di esercizi dell’Età arcaica è completa!'], changed: [], deleted: [] }
    },
    {
      v: '0.9.8', date: '2026-06-26', time: '21:13', tz: 'CEST',
      en: { added: ['The three giants of early Latin poetry – Livius Andronicus, Naevius and Ennius – each get three passages, including Ennius’s haunting dream of Ilia.'], changed: [], deleted: [] },
      it: { added: ['I tre giganti della poesia latina arcaica – Livio Andronico, Nevio ed Ennio – ricevono tre brani ciascuno, compreso il suggestivo sogno di Ilia di Ennio.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.7', date: '2026-06-19', time: '07:55', tz: 'CEST',
      en: { added: ['Cato the Elder grows from one passage to five – from how to buy a farm to a prayer over a triple animal sacrifice, plus a cabbage cure for hangovers.'], changed: [], deleted: [] },
      it: { added: ['Catone il Vecchio passa da un brano a cinque – da come comprare un podere a una preghiera su un triplice sacrificio, più un rimedio al cavolo contro la sbornia.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.6', date: '2026-06-19', time: '00:34', tz: 'CEST',
      en: { added: ['Caecilius Statius expands from one fragment to five, including the three passages an ancient critic set side by side with the Greek original.'], changed: [], deleted: [] },
      it: { added: ['Cecilio Stazio passa da uno a cinque frammenti, tra cui i tre passi che un critico antico mise a confronto con l’originale greco.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.5', date: '2026-06-18', time: '23:48', tz: 'CEST',
      en: { added: ['Adelphoe completes Terence – all six of his comedies now have three practice scenes each.'], changed: [], deleted: [] },
      it: { added: ['Gli Adelphoe completano Terenzio – tutte e sei le sue commedie hanno ora tre scene di esercizio ciascuna.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.4', date: '2026-06-18', time: '19:34', tz: 'CEST',
      en: { added: ['Terence’s Phormio arrives, starring a fast-talking schemer and the line "so many men, so many opinions".'], changed: [], deleted: [] },
      it: { added: ['Arriva il Phormio di Terenzio, con un imbroglione dalla lingua sciolta e la battuta "quanti uomini, tante opinioni".'], changed: [], deleted: [] }
    },
    {
      v: '0.9.3', date: '2026-06-18', time: '19:26', tz: 'CEST',
      en: { added: ['Terence’s Eunuchus joins in, with a parasite’s masterclass in flattery.'], changed: [], deleted: [] },
      it: { added: ['Si aggiunge l’Eunuchus di Terenzio, con la lezione magistrale di adulazione di un parassita.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.2', date: '2026-06-18', time: '19:20', tz: 'CEST',
      en: { added: ['Two more scenes for Heautontimorumenos, paying off its famous "I am human, nothing human is foreign to me".'], changed: [], deleted: [] },
      it: { added: ['Due scene in più per l’Heautontimorumenos, che ripagano il celebre "sono un uomo, nulla di umano mi è estraneo".'], changed: [], deleted: [] }
    },
    {
      v: '0.9.1', date: '2026-06-18', time: '19:15', tz: 'CEST',
      en: { added: ['Terence’s Hecyra arrives, including a courtesan’s surprisingly noble oath that untangles the plot.'], changed: [], deleted: [] },
      it: { added: ['Arriva l’Hecyra di Terenzio, compreso il giuramento sorprendentemente nobile di una cortigiana che scioglie la trama.'], changed: [], deleted: [] }
    },
    {
      v: '0.9.0', date: '2026-06-18', time: '19:08', tz: 'CEST',
      en: { added: ['Terence makes his debut with Andria and its three scenes – the start of a full sweep through his comedies.'], changed: [], deleted: [] },
      it: { added: ['Terenzio debutta con l’Andria e le sue tre scene – l’inizio di una panoramica completa delle sue commedie.'], changed: [], deleted: [] }
    },
    {
      v: '0.8.4', date: '2026-06-18', time: '18:45', tz: 'CEST',
      en: { added: [], changed: ['Tidied the Italian comedy-picker to use short author names (Plauto, Terenzio).'], deleted: [] },
      it: { added: [], changed: ['Sistemato il selettore di commedie in italiano per usare i nomi brevi degli autori (Plauto, Terenzio).'], deleted: [] }
    },
    {
      v: '0.8.3', date: '2026-06-18', time: '18:39', tz: 'CEST',
      en: { added: [], changed: ['The "choose a text" screen now says "choose a comedy" for every comic author.'], deleted: [] },
      it: { added: [], changed: ['La schermata di scelta ora dice "scegli una commedia" per ogni autore comico.'], deleted: [] }
    },
    {
      v: '0.8.2', date: '2026-06-18', time: '18:04', tz: 'CEST',
      en: { added: [], changed: ['A small proofreading fix to a Miles Gloriosus line, with a note explaining a quirk of the metre.'], deleted: [] },
      it: { added: [], changed: ['Una piccola correzione di bozze a un verso del Miles Gloriosus, con una nota che spiega una particolarità del metro.'], deleted: [] }
    },
    {
      v: '0.8.1', date: '2026-06-18', time: '01:38', tz: 'CEST',
      en: { added: ['Two more Pseudolus scenes – a riotous insult-contest with a shameless pimp, and a drunken finale.'], changed: [], deleted: [] },
      it: { added: ['Due scene in più dallo Pseudolo – una scatenata gara di insulti con un lenone sfacciato e un finale ubriaco.'], changed: [], deleted: [] }
    },
    {
      v: '0.8.0', date: '2026-06-18', time: '01:23', tz: 'CEST',
      en: { added: ['Plautus’s Miles Gloriosus joins, led by a swaggering braggart soldier and his fawning flatterer.'], changed: [], deleted: [] },
      it: { added: ['Si aggiunge il Miles Gloriosus di Plauto, guidato da un soldato fanfarone e dal suo adulatore servile.'], changed: [], deleted: [] }
    },
    {
      v: '0.7.6', date: '2026-06-18', time: '00:56', tz: 'CEST',
      en: { added: [], changed: ['Fixed a typo in Caecilius’s biography.'], deleted: [] },
      it: { added: [], changed: ['Corretto un refuso nella biografia di Cecilio.'], deleted: [] }
    },
    {
      v: '0.7.5', date: '2026-06-18', time: '00:50', tz: 'CEST',
      en: { added: [], changed: ['Polished all the Italian text to use proper accented letters (è, à, ù, é, ò) everywhere.'], deleted: [] },
      it: { added: [], changed: ['Rifinito tutto il testo italiano con le lettere accentate corrette (è, à, ù, é, ò) ovunque.'], deleted: [] }
    },
    {
      v: '0.7.4', date: '2026-06-18', time: '00:28', tz: 'CEST',
      en: { added: [], changed: ['A couple of small Italian wording fixes on the practice page.'], deleted: [] },
      it: { added: [], changed: ['Un paio di piccole correzioni alle frasi italiane della pagina di esercizio.'], deleted: [] }
    },
    {
      v: '0.7.3', date: '2026-06-17', time: '23:53', tz: 'CEST',
      en: { added: [], changed: ['A big Italian polish: smoother buttons and menus, and Italianised character and comedy names (Anfitrione, Pseudolo, and more).'], deleted: [] },
      it: { added: [], changed: ['Una grande rifinitura dell’italiano: pulsanti e menu più scorrevoli, e nomi di personaggi e commedie italianizzati (Anfitrione, Pseudolo e altri).'], deleted: [] }
    },
    {
      v: '0.7.2', date: '2026-06-17', time: '02:14', tz: 'CEST',
      en: { added: ['In Italian, the passage citations now translate too (Act becomes Atto, Scene becomes Scena, with Roman numerals).'], changed: [], deleted: [] },
      it: { added: ['In italiano, anche le citazioni dei brani ora si traducono (Act diventa Atto, Scene diventa Scena, con i numeri romani).'], changed: [], deleted: [] }
    },
    {
      v: '0.7.1', date: '2026-06-17', time: '02:08', tz: 'CEST',
      en: { added: ['The Italian translation is now complete: author names, dates (a.C.) and every practice fragment switch language too.'], changed: [], deleted: [] },
      it: { added: ['La traduzione italiana è ora completa: nomi degli autori, date (a.C.) e ogni frammento di esercizio cambiano lingua.'], changed: [], deleted: [] }
    },
    {
      v: '0.7.0', date: '2026-06-17', time: '01:22', tz: 'CEST',
      en: {
        added: ['The whole site now speaks two languages – tap the flag in the corner to switch between English and Italian!'],
        changed: ['Author biographies, works and the era introduction all follow the language you pick.'],
        deleted: []
      },
      it: {
        added: ['Tutto il sito ora parla due lingue – tocca la bandiera nell’angolo per passare tra inglese e italiano!'],
        changed: ['Biografie degli autori, opere e introduzione all’epoca seguono tutte la lingua che scegli.'],
        deleted: []
      }
    },
    {
      v: '0.6.3', date: '2026-06-16', time: '22:07', tz: 'CEST',
      en: { added: [], changed: ['Proofread and extended the Aulularia "I’m ruined!" meltdown, where the panicking miser even accuses the audience.'], deleted: [] },
      it: { added: [], changed: ['Corretta ed estesa la disperazione "Sono rovinato!" dell’Aulularia, dove l’avaro in preda al panico accusa perfino il pubblico.'], deleted: [] }
    },
    {
      v: '0.6.2', date: '2026-06-16', time: '19:01', tz: 'CEST',
      en: { added: ['Plautus’s Aulularia joins, starring the famous miser whose meltdown Molière later borrowed for Harpagon.'], changed: [], deleted: [] },
      it: { added: ['Si aggiunge l’Aulularia di Plauto, con il celebre avaro la cui disperazione Molière riprese poi per Arpagone.'], changed: [], deleted: [] }
    },
    {
      v: '0.6.1', date: '2026-06-16', time: '18:40', tz: 'CEST',
      en: { added: [], changed: ['The practice button became "Next fragment" and now steps through passages in order; passage citations were tidied up.'], deleted: [] },
      it: { added: [], changed: ['Il pulsante di esercizio è diventato "Frammento successivo" e ora scorre i brani in ordine; sistemate le citazioni dei brani.'], deleted: [] }
    },
    {
      v: '0.6.0', date: '2026-06-16', time: '18:04', tz: 'CEST',
      en: { added: ['First big batch of new practice scenes: three each from Plautus’s Mostellaria and Amphitruo, with the difficulty deliberately varied.'], changed: [], deleted: [] },
      it: { added: ['Primo grande lotto di nuove scene: tre ciascuna dalla Mostellaria e dall’Amphitruo di Plauto, con difficoltà volutamente variata.'], changed: [], deleted: [] }
    },
    {
      v: '0.5.2', date: '2026-06-16', time: '17:51', tz: 'CEST',
      en: { added: [], changed: ['A behind-the-scenes fix so your browser always loads the freshest version of the site.'], deleted: [] },
      it: { added: [], changed: ['Una correzione dietro le quinte affinché il browser carichi sempre la versione più aggiornata del sito.'], deleted: [] }
    },
    {
      v: '0.5.1', date: '2026-06-16', time: '17:44', tz: 'CEST',
      en: { added: ['Every practice passage now shows where its Latin text came from.'], changed: [], deleted: [] },
      it: { added: ['Ogni brano di esercizio ora mostra da dove proviene il suo testo latino.'], changed: [], deleted: [] }
    },
    {
      v: '0.5.0', date: '2026-06-16', time: '17:20', tz: 'CEST',
      en: {
        added: ['The practice page became a proper trainer: one passage at a time with a counter, plus a new screen for picking which comedy to study.'],
        changed: ['Authors with several works now send you to a chooser first.'],
        deleted: []
      },
      it: {
        added: ['La pagina di esercizio è diventata un vero allenatore: un brano alla volta con un contatore, più una nuova schermata per scegliere quale commedia studiare.'],
        changed: ['Gli autori con più opere ora ti portano prima a un selettore.'],
        deleted: []
      }
    },
    {
      v: '0.4.2', date: '2026-06-16', time: '15:40', tz: 'CEST',
      en: { added: ['A new paragraph in Plautus’s biography on the topsy-turvy world of the Saturnalia festival.'], changed: [], deleted: [] },
      it: { added: ['Un nuovo paragrafo nella biografia di Plauto sul mondo alla rovescia della festa dei Saturnali.'], changed: [], deleted: [] }
    },
    {
      v: '0.4.1', date: '2026-06-16', time: '13:33', tz: 'CEST',
      en: { added: ['A second Naevius passage: the Trojan wives slipping out of the burning city by night.'], changed: [], deleted: [] },
      it: { added: ['Un secondo brano di Nevio: le donne troiane che fuggono di notte dalla città in fiamme.'], changed: [], deleted: [] }
    },
    {
      v: '0.4.0', date: '2026-06-16', time: '02:18', tz: 'CEST',
      en: { added: ['Each practice passage now opens with a title, a citation and a short "what’s this about" note.'], changed: [], deleted: [] },
      it: { added: ['Ogni brano di esercizio ora si apre con un titolo, una citazione e una breve nota "di cosa parla".'], changed: [], deleted: [] }
    },
    {
      v: '0.3.2', date: '2026-06-16', time: '02:03', tz: 'CEST',
      en: { added: ['A note on fragmentary authors explaining that missing context can make their lines trickier than the difficulty bars alone suggest.'], changed: [], deleted: [] },
      it: { added: ['Una nota sugli autori frammentari che spiega come la mancanza di contesto possa rendere i loro versi più ardui di quanto suggeriscano le sole barre.'], changed: [], deleted: [] }
    },
    {
      v: '0.3.1', date: '2026-06-16', time: '01:53', tz: 'CEST',
      en: { added: [], changed: ['Re-tuned the difficulty ratings for authors who survive only in scraps.'], deleted: [] },
      it: { added: [], changed: ['Ritarata la difficoltà per gli autori che sopravvivono solo in frammenti.'], deleted: [] }
    },
    {
      v: '0.3.0', date: '2026-06-16', time: '01:29', tz: 'CEST',
      en: {
        added: ['A colourful difficulty chart and an overall rating on every author page.'],
        changed: ['The site was reborn as a tool to explore authors and practise translating, and renamed "Latin Authors: Explore & Translate".'],
        deleted: ['The old tier-list rankings and badges were removed.']
      },
      it: {
        added: ['Un grafico di difficoltà colorato e una valutazione complessiva su ogni pagina d’autore.'],
        changed: ['Il sito è rinato come strumento per esplorare gli autori ed esercitarsi nella traduzione, e ribattezzato "Autori latini: esplora e traduci".'],
        deleted: ['Le vecchie classifiche a livelli e i distintivi sono stati rimossi.']
      }
    },
    {
      v: '0.2.0', date: '2026-06-14', time: '15:43', tz: 'CEST',
      en: {
        added: ['A sticky era menu on every page, breadcrumbs to find your way, and shareable links that open straight to an era.'],
        changed: ['Combined-author pages now show both authors’ dates, with small tidy-ups for narrow screens.'],
        deleted: []
      },
      it: {
        added: ['Un menu delle epoche sempre visibile su ogni pagina, le briciole di pane per orientarsi e link condivisibili che aprono direttamente un’epoca.'],
        changed: ['Le pagine ad autori combinati ora mostrano le date di entrambi, con piccoli ritocchi per gli schermi stretti.'],
        deleted: []
      }
    },
    {
      v: '0.1.0', date: '2026-06-14', time: '15:42', tz: 'CEST',
      en: { added: ['The very first version of the site: a home page with the five eras, author pages with biographies and excerpts, and a translation-practice page.'], changed: [], deleted: [] },
      it: { added: ['La primissima versione del sito: una home con le cinque epoche, pagine d’autore con biografie ed estratti, e una pagina di esercizio sulla traduzione.'], changed: [], deleted: [] }
    }
  ];

  global.ChangeLog = { versions: VERSIONS };
})(window);
