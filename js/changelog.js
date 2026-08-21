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
