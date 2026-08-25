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
      v: '1.7.3', date: '2026-08-25', time: '00:00', tz: 'CEST',
      en: {
        added: [
          'Five new excerpts from the Pro Caelio, which goes from three to eight. Cicero is defending a young friend accused of borrowing gold and buying poison, and the real opponent in the case is the woman behind the prosecution, whom he never once names.',
          'The centrepiece is the moment he stops arguing and quotes tragedy instead. The prosecution said the trouble began when Caelius rented a flat on the Palatine; Cicero agrees that it did, and then borrows a line of Ennius that everyone in court could finish - "would that in the grove of Pelion" - to introduce the neighbour as "this Palatine Medea". Medea abandoned her family, followed a young man abroad, and killed by poison, which is the charge in this trial. The Ennius he quotes is already in this app, among the archaic poets (18).',
          'Also the quarter-of-an-as joke you asked for. The prosecution claimed friends were hidden in a public bathhouse to catch Caelius handing over the poison, and Cicero simply asks where men in togas were supposed to hide in a bathhouse - unless, of course, the lady had made friends with the attendant through "that quarter-as transaction of hers". A quarter of an as was the entry fee at the baths, and it was also the going nickname for what Clodia was worth. He never uses the nickname; he uses the coin (62).',
          'And three more: the opening, one enormous sentence in which an imaginary foreigner wanders into the courtroom and revises his opinion of the case downwards three times until a national emergency has shrunk into a family quarrel (1); the most sympathetic portrait of Catiline anybody wrote, by the man who had him declared a public enemy - his virtues were real but "not carved out in full relief, only sketched in" (12); and the scene where Cicero offers to play the defendant\'s father and then cannot decide which stock father from Roman comedy to imitate, quoting Caecilius for the harsh one and Terence for the mild one, both of whom are also in this app (37-38).'
        ],
        changed: [
          'A bug in the tool that turns the source website into plain text: the site sets verse with a line break between the lines and no space, and the tool was deleting the break without putting anything in its place, so two words in a quotation from Terence had been welded into one. Fixed, and every source page was downloaded again and re-checked. It affected exactly one line in the material used so far.',
          'Every translation in this speech was re-checked against the Latin, clause by clause, as with the Philippics. The three excerpts added last week needed no corrections; four small tightenings were made to the new ones before they shipped.'
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
          'Tutte le traduzioni di quest\'orazione sono state ricontrollate sul latino, frase per frase, come per le Filippiche. I tre brani aggiunti la settimana scorsa non hanno richiesto correzioni; sui nuovi sono state fatte quattro piccole messe a punto prima della pubblicazione.'
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
