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
      v: '1.15.8', date: '07/10/2026', time: 'TBD', tz: 'CEST',
      en: {
        added: [
          'VERSE NUMBERS FOR THE TRAGEDIANS AND THE ATELLAN FARCE, which finishes the job: every multi-verse poem in the app now prints them. Twelve more excerpts got them - Pacuvius, Accius, Naevius and Ennius in editorial Roman numerals, by the rule set in v1.15.6, the first verse and then every fifth.',
          'Two of the twelve are not ours at all, and that is the more interesting half. Pomponius\'s Fullones and Novius\'s Maccus Exul are cited as "fr. 48-50 Ribbeck" and print exactly three lines, so each line IS a separately numbered fragment of the play: 48, 49, 50. Those are Ribbeck\'s numbers, the metre labels have pointed at them since v1.15.4, and putting I, II, III over them would have hidden a real citation behind an invented one. They carry 48 and 50, by the same first-and-every-fifth rule.',
          'That turned up a disagreement inside one excerpt. The Fullones note numbered its own lines 1, 2 and 3 while the metre label directly above it said "vv. 48-49". The note now says 48, 49 and 50, and agrees with the label, with Ribbeck, and with the numbers printed beside it.',
          'THE VERRINES, FIRST INSTALMENT. Six Cicero notes rewritten at length - the three from the Divinatio in Caecilium and the three from the actio prima - each about two and a half times what it was. The pattern is the one used for the Catilinarians: the existing analysis kept whole, a paragraph of history or aftermath added, and a paragraph of grammar at the end.',
          'Some of what the new paragraphs carry: the hundred and ten days the court gave Cicero to gather evidence in Sicily and the fifty he actually took; praevaricatio, the Roman crime of prosecuting in order to lose, which is what Verres was buying; the bribery scandal of 74 BC that is the reason everyone already believed the juries were for sale, and the law that split them three ways within months of this speech; the festival calendar Hortensius was trying to run the clock into; and the three Metelli - one consul, one president of this very court, one governor of Sicily - who are what Verres meant when he said he had a powerful man behind him.'
        ],
        changed: [
          'Two citations on the metre pages were still counting in Arabic where the excerpt beside them had gone Roman in v1.15.6. The Lucilius example from Book 26 now cites vv. I-II, and the Naevius epitaph v. I.',
          'The numbering checker reads a "fr. 48-50" citation as well as a "vv. 829-852" one, so the two Ribbeck excerpts are checked as strictly as everything else: the first number has to be the one the citation names, and the lines in between have to account for the difference. Tested by breaking it on purpose.',
          '59 of Cicero\'s notes still carry the short early form, and they are concentrated in three places: the rest of the Verrines, the Philippics and the In Pisonem. They go on being done a work at a time.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'I NUMERI DEI VERSI PER I TRAGICI E PER L\'ATELLANA, il che chiude il lavoro: ogni componimento in versi dell\'app che abbia più di un verso ora li stampa. Altri dodici estratti li hanno ricevuti: Pacuvio, Accio, Nevio ed Ennio in numeri romani editoriali, secondo la regola fissata nella v1.15.6, il primo verso e poi ogni quinto.',
          'Due dei dodici non sono affatto nostri, ed è la metà più interessante. I Fullones di Pomponio e il Maccus Exul di Novio sono citati come "fr. 48-50 Ribbeck" e stampano esattamente tre righe: ogni riga È un frammento della commedia numerato a sé, 48, 49, 50. Sono i numeri di Ribbeck, le etichette metriche li indicano dalla v1.15.4, e metterci sopra I, II, III avrebbe nascosto una citazione vera dietro una inventata. Portano 48 e 50, secondo la stessa regola del primo e ogni quinto.',
          'La cosa ha fatto emergere una discordanza dentro un estratto. La nota dei Fullones numerava le proprie righe 1, 2 e 3 mentre l\'etichetta metrica appena sopra diceva "vv. 48-49". Ora la nota dice 48, 49 e 50, e concorda con l\'etichetta, con Ribbeck e con i numeri stampati accanto.',
          'LE VERRINE, PRIMA PUNTATA. Sei note di Cicerone riscritte per esteso - le tre della Divinatio in Caecilium e le tre della actio prima - ciascuna lunga circa due volte e mezzo la precedente. Lo schema è quello usato per le Catilinarie: l\'analisi esistente conservata per intero, un paragrafo di storia o di seguito aggiunto, e un paragrafo di grammatica in chiusura.',
          'Qualcosa di ciò che i nuovi paragrafi contengono: i centodieci giorni che il tribunale concesse a Cicerone per raccogliere le prove in Sicilia e i cinquanta che gli bastarono; la praevaricatio, il reato romano di accusare per perdere, che è ciò che Verre stava comprando; lo scandalo di corruzione del 74 a.C. per cui tutti già credevano che le giurie fossero in vendita, e la legge che le divise in tre pochi mesi dopo questa orazione; il calendario delle feste in cui Ortensio cercava di far scivolare il processo; e i tre Metelli - un console, un presidente di questo stesso tribunale, un governatore della Sicilia - che sono ciò che Verre intendeva dicendo di avere alle spalle un uomo potente.'
        ],
        changed: [
          'Due citazioni nelle pagine dei metri contavano ancora in cifre arabe là dove l\'estratto accanto era passato ai numeri romani nella v1.15.6. L\'esempio di Lucilio dal libro 26 cita ora i vv. I-II, e l\'epitaffio di Nevio il v. I.',
          'Il controllore della numerazione legge una citazione "fr. 48-50" come legge una "vv. 829-852", e così i due estratti di Ribbeck sono controllati con lo stesso rigore di tutti gli altri: il primo numero deve essere quello indicato dalla citazione, e le righe in mezzo devono rendere conto della differenza. Provato rompendolo di proposito.',
          '59 note di Cicerone portano ancora la forma breve delle origini, e sono concentrate in tre punti: il resto delle Verrine, le Filippiche e l\'In Pisonem. Si continua a farle un\'opera per volta.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.7', date: '07/10/2026', time: '00:05', tz: 'CEST',
      en: {
        added: [
          'GOOGLE CAN FIND THE SITE NOW. Until today latinsuperapp.com had no robots.txt and no sitemap, and asking for https://latinsuperapp.com/robots.txt simply answered "not found". That matters more here than it would on most sites, because every link on this one is built by JavaScript as the page loads: a search engine that reads only the delivered HTML arrives at the home page and finds a page with no links on it at all. There is now a sitemap listing forty addresses - the home page, the Caesar\'s Age listing, all twenty authors, the eight work choosers, the metre index and the nine metre pages - and that list is the only route by which any of them can be discovered.',
          'EVERY PAGE NOW SAYS WHAT IT IS. All six pages used to send search engines the same single sentence of description and the same heading - the site title - so from the outside they looked like six copies of one page. Each page now carries its own description, and the heading at the top is the thing the page is actually about: the author\'s name on an author page, the excerpt\'s title on a practice page, the metre\'s name on a metre page. On an author page the description is written for that author, in whichever of the two languages you are reading.',
          'A FAVICON. The site had none at all: no little icon in the browser tab, and none beside the address in a list of search results. There is one now, a gold-edged L on deep red.',
          'A NOT-FOUND PAGE OF OUR OWN. A mistyped address used to land on GitHub\'s grey error page. It now lands on a page in the site\'s own colours, with links back to the author list and to the metres.'
        ],
        changed: [
          'THE PORTRAITS ARE 83% LIGHTER. Together they weighed 11.2 MB, with six of them over a megabyte each - Lucretius alone was 2.1 MB, for a picture never shown larger than a postcard. They weigh 1.9 MB now, Lucretius 317 KB and Cicero 105 KB, and they look the same: each was resized to twice the largest size the site ever draws it at, so it stays sharp on high-resolution screens. Pages with portraits load noticeably faster on a phone, and page speed is one of the things search engines rank by. Caesar\'s portrait was already small and was left exactly as it was.',
          'Addresses that show the same thing now admit it. A metre page can be reached carrying four extra notes about the excerpt you came from - metre.html?m=saturnian plus era, author, work and excerpt number - and every combination of those was, to a search engine, a separate page with identical text on it. They all now point at the single address metre.html?m=saturnian. The home page does the same in reverse: index.html?era=archaic shows exactly what the bare address shows, because archaic is the era the home page opens on, so it defers to the bare one.',
          'The trail at the top of each page - Home / Caesar\'s Age / Cicero - is now published in the form search engines read, so it can appear under a result instead of a bare address.',
          'The portraits describe themselves properly. The alt text of a picture is what a screen reader speaks aloud and what a search engine reads, and here it had only ever been the author\'s bare name. It now reads "Portrait of ...", with one deliberate exception: on the Figulus page the picture is actually Pythagoras, so there the alt text says that, rather than naming a man it does not show.',
          'The update pages now ask not to be listed in search results. They are near-identical to one another by design, and they are meant to be reached from the What\'s New panel rather than from a search.',
          'THE FAVICON IS PROPERLY GOLD. The L in the little icon was nearly white and its gold edge a muted brown-gold, so at the size a browser tab draws it the icon read as red and white. Both are now one warmer, fully saturated gold, the same on the L and the edge; the red and the shape are unchanged. Browsers hold on to favicons stubbornly, so the icon now carries the same version number as the rest of the site, and the new one replaces the old on the next visit.',
          'Cache-bust: ?v=193 -> ?v=196.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'ORA GOOGLE PUÒ TROVARE IL SITO. Fino a oggi latinsuperapp.com non aveva né un robots.txt né una sitemap, e chiedere https://latinsuperapp.com/robots.txt rispondeva semplicemente "non trovato". Qui la cosa pesa più che altrove, perché ogni collegamento di questo sito viene costruito da JavaScript mentre la pagina si carica: un motore di ricerca che legge solo l\'HTML consegnato arriva alla home e trova una pagina senza alcun collegamento. Ora esiste una sitemap che elenca quaranta indirizzi - la home, la pagina dell\'età di Cesare, tutti e venti gli autori, gli otto selettori di opere, l\'indice dei metri e le nove pagine dei metri - ed è l\'unica via per cui possano essere scoperti.',
          'ORA OGNI PAGINA DICE CHE COS\'È. Tutte e sei le pagine mandavano ai motori di ricerca la stessa unica frase di descrizione e lo stesso titolo - il nome del sito - così da fuori sembravano sei copie della stessa pagina. Ora ciascuna porta la propria descrizione, e il titolo in cima è ciò di cui la pagina parla davvero: il nome dell\'autore su una pagina d\'autore, il titolo del brano su una pagina di pratica, il nome del metro su una pagina di metrica. Sulla pagina di un autore la descrizione è scritta per quell\'autore, nella lingua in cui stai leggendo.',
          'UNA FAVICON. Il sito non ne aveva nessuna: nessuna iconcina nella scheda del browser, e nessuna accanto all\'indirizzo in un elenco di risultati. Ora c\'è: una L bordata d\'oro su rosso scuro.',
          'UNA PAGINA DI ERRORE NOSTRA. Un indirizzo sbagliato finiva sulla pagina grigia di errore di GitHub. Ora finisce su una pagina nei colori del sito, con i collegamenti per tornare all\'elenco degli autori e ai metri.'
        ],
        changed: [
          'I RITRATTI PESANO L\'83% IN MENO. Insieme pesavano 11,2 MB, e sei superavano il megabyte ciascuno - il solo Lucrezio ne pesava 2,1, per un\'immagine mai mostrata più grande di una cartolina. Ora pesano 1,9 MB, Lucrezio 317 KB e Cicerone 105 KB, e hanno lo stesso aspetto: ognuno è stato ridimensionato al doppio della misura massima a cui il sito lo disegna, così resta nitido anche sugli schermi ad alta risoluzione. Le pagine con i ritratti si caricano sensibilmente più in fretta su un telefono, e la velocità delle pagine è uno dei criteri con cui i motori di ricerca ordinano i risultati. Il ritratto di Cesare era già leggero ed è rimasto esattamente com\'era.',
          'Gli indirizzi che mostrano la stessa cosa ora lo dichiarano. Una pagina di metrica può essere raggiunta portandosi dietro quattro indicazioni sul brano da cui vieni - metre.html?m=saturnian più età, autore, opera e numero del brano - e ogni combinazione era, per un motore di ricerca, una pagina distinta con dentro lo stesso testo. Ora puntano tutte a un solo indirizzo, metre.html?m=saturnian. La home fa lo stesso al contrario: index.html?era=archaic mostra esattamente ciò che mostra l\'indirizzo nudo, perché arcaica è l\'età da cui la home parte, e quindi cede il passo a quello.',
          'Il percorso in cima a ogni pagina - Home / Età di Cesare / Cicerone - viene ora pubblicato anche nella forma che i motori di ricerca leggono, così può comparire sotto un risultato al posto di un indirizzo nudo.',
          'I ritratti ora si descrivono come si deve. Il testo alternativo di un\'immagine è ciò che uno screen reader pronuncia e ciò che un motore di ricerca legge, e qui era sempre stato soltanto il nome dell\'autore. Ora dice "Ritratto di ...", con un\'eccezione voluta: nella pagina di Figulo il ritratto raffigura in realtà Pitagora, e lì il testo alternativo lo dice, invece di nominare un uomo che non mostra.',
          'Le pagine degli aggiornamenti ora chiedono di non comparire nei risultati di ricerca. Sono quasi identiche tra loro per costruzione, e si raggiungono dal pannello Novità, non da una ricerca.',
          'LA FAVICON È DAVVERO D\'ORO. La L della piccola icona era quasi bianca e il suo bordo d\'oro un bruno-oro spento, così alla misura con cui la disegna una scheda del browser l\'icona sembrava rossa e bianca. Ora entrambi sono un unico oro più caldo e pieno, lo stesso sulla L e sul bordo; il rosso e la forma restano identici. I browser si tengono strette le favicon, perciò l\'icona porta ora lo stesso numero di versione del resto del sito, e la nuova sostituisce la vecchia alla visita successiva.',
          'Cache-bust: ?v=193 -> ?v=196.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.6', date: '02/10/2026', time: '01:06', tz: 'CEST',
      en: {
        added: [
          'PREVIOUS EXCERPT. Every practice page now has a Previous excerpt button, sitting to the left of the Next one and mirroring it: the arrow points left and the text follows it. Both wrap around, so stepping back from the first excerpt lands on the last one, and forward from the last one returns to the first. The other button is called Next excerpt now, which is the nicer word.',
          'VERSE NUMBERS FOR CAECILIUS AND LUCILIUS. Eleven more excerpts print them, and these ones are Roman numerals, because neither poet has verse numbers of his own. Both survive only in quotation: nobody can say which verse of which comedy or which book any of these lines once was. So the numerals are this app\'s own count of the verses printed here, the first and then every fifth, and every one of those analyses now says as much.',
          'The interesting part is what happens at a gap. These excerpts are strings of clusters with lost verses in between, and the count runs straight through them: I, II, III, then after the jump IV, V. The numbers describe the verses actually on the page rather than pretending to know how many are missing, and a line of dots takes no numeral and does not advance the count.',
          'Two more translations have been re-divided so that they run line for line with the Latin: the husband\'s monologue from the Plocium, whose fifteen verses had fourteen lines of translation, and Lucilius\'s definition of virtue, which was one block of prose standing for thirteen verses. It is thirteen lines against thirteen verses now, and the numerals fall on the same lines in all three languages.'
        ],
        changed: [
          'The counter above each excerpt still said "Fragment 1 of 5" while the button under it said "Next excerpt". It says "Excerpt 1 of 5" now, and so do the three other places that meant the same thing: the work cards that count them, the line above those cards, and the message shown when a text has none yet. Where fragment means what actually survives of a lost author, as in the warning above an author\'s difficulty bars, the word stays, because there it is the right one.',
          'The numbering checker has been taught to read Roman numerals, and it found something straight away: the Pomponius fragment, numbered back in v1.15.4, carried its numerals on the Latin only, so there was nothing for the English and the Italian to line up against. They carry them now. The checker also allows two things it used to refuse, both of them correct: an excerpt may OPEN with a gap, in which case the first numeral belongs on the first verse and not on the first line, and a very short editorial excerpt may number every verse, since with two verses "the first and then every fifth" has nothing to say and the analysis needs to be able to point at the second one.',
          'Lucilius\'s definition of virtue refers to its own verses, and those references were still in Arabic numerals while the text beside them had turned Roman. The structure it describes is vv. I-V, vv. VI-VIII and vv. IX-XIII now, and the archaic genitive patriai is at v. XII.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'ESTRATTO PRECEDENTE. Ogni pagina di pratica ha ora un pulsante Estratto precedente, alla sinistra di quello Successivo e speculare a esso: la freccia punta a sinistra e il testo la segue. Entrambi girano in tondo, perciò tornando indietro dal primo estratto si arriva all\'ultimo, e andando avanti dall\'ultimo si torna al primo. L\'altro pulsante ora si chiama Estratto successivo, che suona meglio.',
          'I NUMERI DEI VERSI PER CECILIO E LUCILIO. Altri undici estratti li stampano, e questi sono numeri romani, perché nessuno dei due poeti ha numeri di verso propri. Entrambi sopravvivono solo in citazione: nessuno può dire quale verso di quale commedia o di quale libro sia stata ciascuna di queste righe. I numerali sono dunque il conteggio di questa app dei versi qui stampati, il primo e poi ogni quinto, e ognuna di quelle analisi ora lo dichiara.',
          'La parte interessante è ciò che succede a un salto. Questi estratti sono catene di gruppi con versi perduti in mezzo, e il conteggio ci passa dritto attraverso: I, II, III, e dopo il salto IV, V. I numeri descrivono i versi che stanno davvero nella pagina, invece di far finta di sapere quanti ne manchino, e una riga di puntini non prende numerale e non fa avanzare il conto.',
          'Altre due traduzioni sono state ridivise perché corressero riga per riga con il latino: il monologo del marito nel Plocium, i cui quindici versi avevano quattordici righe di traduzione, e la definizione della virtù di Lucilio, che era un unico blocco di prosa per tredici versi. Ora sono tredici righe contro tredici versi, e i numerali cadono sulle stesse righe in tutte e tre le lingue.'
        ],
        changed: [
          'Il contatore sopra ogni estratto diceva ancora "Frammento 1 di 5" mentre il pulsante sotto diceva "Estratto successivo". Ora dice "Estratto 1 di 5", e lo stesso vale per gli altri tre punti che intendevano la stessa cosa: le schede delle opere che li contano, la riga sopra quelle schede e il messaggio di quando un testo non ne ha ancora. Dove frammento indica ciò che davvero sopravvive di un autore perduto, come nell\'avviso sopra le barre di difficoltà, la parola resta, perché lì è quella giusta.',
          'Il controllore della numerazione ha imparato a leggere i numeri romani, e ha trovato subito qualcosa: il frammento di Pomponio, numerato nella v1.15.4, portava i numerali solo sul latino, e inglese e italiano non avevano nulla con cui allinearsi. Ora li portano. Il controllore accetta anche due cose che prima rifiutava, entrambe corrette: un estratto può APRIRSI con un salto, e in quel caso il primo numerale va sul primo verso e non sulla prima riga; e un estratto editoriale molto breve può numerare ogni verso, dato che con due versi "il primo e poi ogni quinto" non ha nulla da dire e l\'analisi deve poter indicare il secondo.',
          'La definizione della virtù di Lucilio rimanda ai propri versi, e quei rimandi erano ancora in numeri arabi mentre il testo accanto era passato ai romani. La struttura che descrive è ora vv. I-V, vv. VI-VIII e vv. IX-XIII, e il genitivo arcaico patriai sta al v. XII.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.5', date: '02/10/2026', time: '00:16', tz: 'CEST',
      en: {
        added: [
          'The seven are fixed, so every excerpt that can carry verse numbers now does: eighty-four of them. Six citations were wrong and are corrected, and the seventh excerpt needed the half-verses understood rather than the citation changed.',
          'What made the last one solvable was noticing how the page prints its numbers. The Menaechmi page puts them on lines of their own rather than at the end of a verse, which is why reading it by machine had failed; read properly it gives the whole answer, including a verse printed as one line that holds two, and a line the editors bracket as spurious which the excerpt silently drops. That excerpt now cites vv. 828-837, 840-842, 844-852 and marks both cuts.',
          'VERSE NUMBERS. Seventy-seven excerpts now print them: all of Plautus and Terence but seven, and all three of Catullus. The first verse is numbered and then every fifth, the way a printed edition numbers a page, and the same numbers appear on the same lines of the English and the Italian. The metre labels have been pointing at verses since v1.15.3 - Trochaic Septenarius (vv. 755-760) - and until now there was no way to find v. 755 on the page.',
          'Counting lines would have got this wrong, and in the places that matter most. A comic text splits a verse between two speakers wherever the speaker changes, prints two half-verses as one line, and sometimes skips verses in the middle; roughly one comic excerpt in five is not simply its nth line being its nth verse. So where the line count matches the citation the numbers come straight from the citation, and where it does not they come from matching every line against the Perseus edition of the play, which numbers each verse explicitly, and reading the shape off that.',
          'Four translations have been re-divided so that they run line for line with the Latin again. In each of them one line of the translation had quietly come to carry two verses, which is invisible until you try to put a number on it and discover there is nowhere to put it. They read better beside the Latin now, which is the whole point of a line-for-line translation.'
        ],
        changed: [
          'Seven excerpts are left unnumbered on purpose, and they are a list of things to fix rather than a limitation of the method. In each one the text and the citation disagree: the Amphitruo prologue prints twelve verses where its citation claims fourteen, the Andria excerpt ends two verses before its citation says, and three others are trimmed passages whose citations do not record the cut. Numbering them would mean printing a number that contradicts the citation above it, so they wait for the citations to be corrected.',
          'A new tool checks the numbering rather than trusting it: that the first number is the verse the citation names, that the rest are multiples of five in order, that the lines between two numbers account for the difference where one line is one verse, and that the English and the Italian carry the same numbers on the same lines. That last one is also a standing check that the translations are still line-for-line.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'I sette sono sistemati, e ora ogni estratto che possa portare i numeri di verso li porta: ottantaquattro. Sei citazioni erano sbagliate e sono corrette, e il settimo estratto aveva bisogno che si capissero i mezzi versi, non che si cambiasse la citazione.',
          'A rendere risolvibile l\'ultimo è stato accorgersi di come la pagina stampi i suoi numeri. La pagina dei Menaechmi li mette su righe a sé invece che in fondo al verso, ed è per questo che leggerla a macchina non aveva funzionato; letta bene dà tutta la risposta, compreso un verso stampato come una riga sola che ne contiene due e una riga che gli editori racchiudono fra parentesi quadre come spuria e che l\'estratto taglia senza dirlo. Quell\'estratto cita ora i vv. 828-837, 840-842, 844-852 e segna entrambi i tagli.',
          'I NUMERI DEI VERSI. Settantasette estratti ora li stampano: tutto Plauto e Terenzio tranne sette, e tutti e tre i Catulli. È numerato il primo verso e poi ogni quinto, come fa un\'edizione a stampa sulla pagina, e gli stessi numeri compaiono sulle stesse righe dell\'inglese e dell\'italiano. Le etichette metriche indicano versi dalla v1.15.3 - Settenario Trocaico (vv. 755-760) - e fino a ora non c\'era modo di trovare il v. 755 nella pagina.',
          'Contare le righe avrebbe dato risultati sbagliati, e proprio dove conta di più. Un testo comico spezza un verso fra due personaggi ogni volta che cambia chi parla, stampa due mezzi versi come una riga sola e qualche volta salta versi per strada: circa un estratto comico su cinque non ha semplicemente l\'ennesima riga uguale all\'ennesimo verso. Perciò dove il numero di righe coincide con la citazione i numeri vengono dalla citazione, e dove non coincide vengono dal confronto di ogni riga con l\'edizione Perseo della commedia, che numera ogni verso esplicitamente.',
          'Quattro traduzioni sono state ridivise perché tornassero a correre riga per riga con il latino. In ciascuna una riga della traduzione aveva finito per portare due versi, cosa che non si vede finché non si prova a metterci un numero e ci si accorge che non c\'è dove metterlo. Ora si leggono meglio accanto al latino, che è tutto il senso di una traduzione riga per riga.'
        ],
        changed: [
          'Sette estratti restano di proposito senza numeri, e sono un elenco di cose da correggere più che un limite del metodo. In ciascuno il testo e la citazione non concordano: il prologo dell\'Amphitruo stampa dodici versi dove la citazione ne dichiara quattordici, l\'estratto dell\'Andria finisce due versi prima di quanto dica la citazione, e altri tre sono passi tagliati la cui citazione non registra il taglio. Numerarli vorrebbe dire stampare un numero che contraddice la citazione sopra di esso, perciò aspettano che le citazioni siano corrette.',
          'Un nuovo strumento controlla la numerazione invece di fidarsene: che il primo numero sia il verso indicato dalla citazione, che gli altri siano multipli di cinque in ordine, che le righe fra due numeri rendano conto della differenza dove una riga è un verso, e che inglese e italiano portino gli stessi numeri sulle stesse righe. Quest\'ultimo è anche un controllo permanente che le traduzioni siano ancora riga per riga.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.4', date: '01/10/2026', time: '00:11', tz: 'CEST',
      en: {
        added: [
          'Pacuvius and Pomponius join the Iambic Senarius page, and Novius the Trochaic Septenarius page. Both pages now show every author in the app who writes in that metre. The Novius verse is the best of the new ones: Ribbeck printed it with the beat marked on the vowel, and all four of his marks fall on long positions of the septenarius, which is a nineteenth-century editor and this app\'s scanner agreeing about a verse neither of them could see whole.',
          'Novius does not appear on the Iambic Senarius page, and the reason is a correction. His one candidate senarius, the first verse of the Maccus Exul fragment, will not scan: thirteen syllables cannot be fitted to the twelve positions of a senarius with the quantities its words actually have, with or without the elision, and thirteen is far too few for any longer line. It was labelled a senarius yesterday on weaker evidence than that, and the label is withdrawn. The excerpt now says trochaic septenarii for its last two verses, and the analysis explains why the first is left bare.',
          'Two of the new labels were not showing, and a third excerpt was showing the wrong one. The cause was the same for all three: Pacuvius and the Atellan writers share a page with a second poet, and for authors like that the practice page pools every work together, so the position it handed the metre lookup was the position in the pool and not the position in the work. The lookup now takes the excerpt itself rather than a number, which settles both which work it belongs to and where in that work it sits.',
          'Accius and Pomponius join the Trochaic Septenarius page, which now shows the metre doing all four of its jobs on one page: satire in Lucilius, comedy in Plautus and Terence, tragedy in Pacuvius and Accius, and Atellan farce in Pomponius. Their absence was not a decision, just a stopping point.',
          'THE TRAGIC AND ATELLAN METRES. Ten more excerpts say what metre they are in: three of Pacuvius, two of Accius, three of Pomponius and two of Novius. That is nearly all of the tragedy and farce in the app, and it brings the total to a hundred and seventy-seven.',
          'These had no database behind them. Plautus and Terence have one, because their plays survive whole; Pacuvius, Accius, Pomponius and Novius survive as quotations in Cicero, Macrobius and Nonius, a few lines at a time. So each label here was worked out from the verses themselves: the app\'s scanner rules out the metres a line cannot be, and the vowel quantities that the scanner deliberately leaves open were then supplied by hand until one metre was left standing.',
          'Two of the Atellan fragments settle the question by themselves. Ribbeck\'s text of Novius marks the beat on the vowel, and those marks fall exactly on the long positions of the metre the scanner had arrived at independently. When a nineteenth-century editor and a piece of software agree about a verse neither of them could see whole, the answer is probably right.',
          'Two new examples on the metre pages, both tragic, both chosen to be read against the comic ones already there. Accius gives a senarius of twelve syllables in twelve positions with nothing resolved at all, where the Plautus above it needed three resolutions in fifteen; and Pacuvius gives a trochaic septenarius with two short syllables in fifteen, which moves at about half the speed of the comic examples. The metre is identical in each pair. What differs is the register, and you can hear it.'
        ],
        changed: [
          'Three more analyses named the wrong metre and are corrected. The two lines of Pacuvius\' Niptra that Cicero quotes were called iambic senarii and are trochaic septenarii; the cosmological passage of the Chryses hedged between the two long lines and is septenarii; and the dream interpretation in Accius\' Brutus was called iambic and trochaic when it is trochaic throughout.',
          'The Iambic Senarius page claimed its excerpts were the largest single group in the bank. They are not: the dactylic hexameter has seventy and the senarius has forty-six. It now says what is true, that it is the largest group after the hexameter.',
          'Two fragments stay unlabelled on purpose. Accius\' oderint, dum metuant is seven syllables, the tag as Cicero quotes it rather than a whole verse of anything, and Novius\' sapiens si algebis, tremes is eight. A metre cannot be read off a piece of a line.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Pacuvio e Pomponio entrano nella pagina del Senario Giambico, e Novio in quella del Settenario Trocaico. Entrambe le pagine mostrano ora tutti gli autori dell\'app che scrivono in quel metro. Il verso di Novio è il migliore fra i nuovi: Ribbeck lo stampò con il tempo forte segnato sulla vocale, e tutti e quattro i suoi segni cadono su posizioni lunghe del settenario: un editore dell\'Ottocento e lo scandiglio di questa app che concordano su un verso che nessuno dei due poteva vedere per intero.',
          'Novio non compare nella pagina del Senario Giambico, e la ragione è una correzione. Il suo unico candidato senario, il primo verso del frammento del Maccus Exul, non scandisce: tredici sillabe non si lasciano disporre nelle dodici posizioni di un senario con le quantità che le sue parole hanno davvero, con o senza l\'elisione, e tredici sono troppo poche per qualunque verso più lungo. Ieri era stato etichettato come senario su basi più deboli di così, e l\'etichetta è ritirata. L\'estratto dice ora settenari trocaici per i suoi ultimi due versi, e l\'analisi spiega perché il primo resti senza.',
          'Due delle nuove etichette non comparivano, e un terzo estratto ne mostrava una sbagliata. La causa era la stessa per tutti e tre: Pacuvio e gli autori atellani condividono la pagina con un secondo poeta, e per autori del genere la pagina di pratica mette insieme tutte le opere, perciò la posizione che passava alla ricerca del metro era quella nell\'insieme e non quella nell\'opera. Ora la ricerca riceve l\'estratto stesso invece di un numero, e questo stabilisce sia a quale opera appartenga sia dove stia dentro quell\'opera.',
          'Accio e Pomponio entrano nella pagina del Settenario Trocaico, che ora mostra il metro in tutti e quattro i suoi impieghi su una pagina sola: la satira in Lucilio, la commedia in Plauto e Terenzio, la tragedia in Pacuvio e Accio e l\'atellana in Pomponio. La loro assenza non era una decisione, solo un punto in cui mi ero fermato.',
          'I METRI DELLA TRAGEDIA E DELL\'ATELLANA. Dieci estratti in più dicono in che metro sono: tre di Pacuvio, due di Accio, tre di Pomponio e due di Novio. È quasi tutta la tragedia e la farsa presenti nell\'app, e porta il totale a centosettantasette.',
          'Dietro questi non c\'era nessuna banca dati. Plauto e Terenzio ne hanno una perché le loro commedie ci sono arrivate intere; Pacuvio, Accio, Pomponio e Novio sopravvivono come citazioni in Cicerone, Macrobio e Nonio, pochi versi alla volta. Ogni etichetta è stata dunque ricavata dai versi stessi: lo scandiglio dell\'app esclude i metri che un verso non può essere, e le quantità vocaliche che lo strumento lascia di proposito aperte sono state fornite a mano finché non è rimasto un metro solo.',
          'Due dei frammenti atellani risolvono la questione da soli. Il testo di Ribbeck per Novio segna il tempo forte sulla vocale, e quei segni cadono esattamente sulle posizioni lunghe del metro a cui lo scandiglio era arrivato per conto suo. Quando un editore dell\'Ottocento e un programma concordano su un verso che nessuno dei due poteva vedere per intero, la risposta è probabilmente giusta.',
          'Due nuovi esempi nelle pagine di metrica, entrambi tragici, scelti per essere letti accanto a quelli comici già presenti. Accio dà un senario di dodici sillabe in dodici posizioni senza nessuna soluzione, dove il Plauto che lo precede ne chiedeva tre in quindici; e Pacuvio dà un settenario trocaico con due sillabe brevi su quindici, che si muove a circa metà della velocità degli esempi comici. Il metro è identico in ciascuna coppia. Cambia il registro, e si sente.'
        ],
        changed: [
          'Altre tre analisi indicavano il metro sbagliato e sono corrette. I due versi della Niptra di Pacuvio citati da Cicerone erano detti senari giambici e sono settenari trocaici; il passo cosmologico del Chryses oscillava fra i due versi lunghi ed è in settenari; e l\'interpretazione del sogno nel Brutus di Accio era detta giambica e trocaica mentre è trocaica dall\'inizio alla fine.',
          'La pagina del Senario Giambico sosteneva che i suoi estratti fossero il gruppo più numeroso della banca dati. Non lo sono: l\'esametro dattilico ne ha settanta e il senario quarantasei. Ora dice il vero, cioè che è il gruppo più numeroso dopo l\'esametro.',
          'Due frammenti restano di proposito senza etichetta. L\'oderint, dum metuant di Accio conta sette sillabe, la battuta così come la cita Cicerone e non un verso intero di alcunché, e il sapiens si algebis, tremes di Novio ne conta otto. Da un pezzo di verso il metro non si ricava.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.3', date: '29/09/2026', time: '21:32', tz: 'CEST',
      en: {
        added: [
          'A metre is now named once on the tablet, with all of its verses after it, instead of once per run. The last scene of Hecyra alternates four times in eleven verses, which used to print as four separate labels and was hard to read; it now says Iambic Octonarius (v. 750, vv. 752-754), Trochaic Septenarius (v. 751, vv. 755-760), and fits on one line.',
          'Caecilius\' long Plocium monologue is labelled after all. It changes metre partway through, and until now it had no way of saying where, because Caecilius survives only in quotation and his lines have no numbers of their own. The fifteen lines therefore carry editorial numerals, I to XV, printed on the Latin: verses I to VIII are trochaic septenarii and from IX the passage drops into spoken senarii. The analysis says in as many words that those numbers are the app\'s and not the play\'s.',
          'The note on the Terence octonarius said four short syllables, evenly spaced. There are five, and they are not evenly spaced: the line alternates heavy and light for five feet and then runs out in three iambs together, hurrying into its close. The scansion itself was right; the sentence describing it was not.',
          'While correcting that excerpt, one more wrong metre statement turned up in the bank: the analysis of the Plocium monologue said the trochaic septenarius ran from beginning to end, which is exactly the thing the new label contradicts.',
          'THE COMIC METRES. Every excerpt of Plautus, Terence and Caecilius now says what metre it is in, which is eighty-six excerpts that carried no label at all before, and the total in the app goes from eighty to a hundred and sixty-six. Roman comedy is the hard case: a scene moves between spoken senarii, the long recited lines and the sung cantica, so the label could not simply be copied off the author.',
          'Four new metre pages: the Iambic Senarius, the spoken line that carries a third of Plautus and half of Terence; the Iambic Septenarius, which the Romans associated with being pleased about something; the Iambic Octonarius, the longest regular line in comedy and the one Terence uses where Plautus would have written a song; and Canticum, on the sung parts, which are not one metre but a dozen changing from verse to verse. Each has three or two scanned examples with the quantities, the elisions and the feet marked, and the scansions are from this app, not from an edition.',
          'Two excerpts carry more than one metre and say so, verse by verse. Terence turns from senarii to trochaic septenarii in the middle of Andria V.3, and the last scene of Hecyra alternates between two metres four times in eleven verses. The label now reads, for instance, Iambic Octonarius (v. 750), Trochaic Septenarius (v. 751), and so on, keyed to the play\'s own verse numbers rather than to the lines on the page.',
          'The Trochaic Septenarius page has waited since v1.15.1 for its comic examples, since twenty-eight of the thirty excerpts in that metre are comic. It has them now: Plautus ordering a slave to unsee what he has seen, and Terence\'s professional flatterer explaining that agreeing with everything is the most profitable trade going.'
        ],
        changed: [
          'Seven analyses named the wrong metre and are corrected. The one that matters most is Miles Gloriosus III.1, described as iambic senarii when it is in fact the long accompanied line: Periplectomenus is performing, not chatting. Two Terentian scenes called senarii are octonarii, two called trochaic septenarii are iambic, and one is neither.',
          'Where the metres come from, since this is the kind of claim that should say: Timothy J. Moore\'s database of the metres of Roman comedy, built on Cesare Questa\'s work, which records the metre of every metrical unit in Plautus and Terence. Caecilius is not in it, because he survives only in quotations, so his six labels come from the app\'s own scansion and agree with what Gellius says he is doing. Two Caecilius fragments are deliberately left unlabelled: the long Plocium quotation turns from trochaic septenarii to senarii partway and has no verse numbers to mark the turn by, and a single line quoted by Cicero is long enough to be any of four metres.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Un metro è ora nominato una volta sola sulla tavoletta, con tutti i suoi versi di seguito, invece di una volta per ogni tratto. L\'ultima scena dell\'Hecyra alterna quattro volte in undici versi, cosa che prima si stampava come quattro etichette separate ed era faticosa da leggere; adesso dice Ottonario Giambico (v. 750, vv. 752-754), Settenario Trocaico (v. 751, vv. 755-760), e sta su una riga.',
          'Il lungo monologo del Plocium di Cecilio ha finalmente un\'etichetta. Cambia metro a metà strada, e fino a ora non aveva modo di dire dove, perché Cecilio sopravvive solo in citazione e i suoi versi non hanno numeri propri. Le quindici righe portano dunque numerali editoriali, da I a XV, stampati sul latino: i versi da I a VIII sono settenari trocaici e dal IX il passo scende ai senari parlati. L\'analisi dice a chiare lettere che quei numeri sono dell\'app e non della commedia.',
          'La nota sull\'ottonario di Terenzio diceva quattro sillabe brevi, distribuite regolarmente. Sono cinque, e non sono distribuite regolarmente: il verso alterna pesante e leggero per cinque piedi e poi finisce in tre giambi di fila, affrettandosi verso la chiusa. La scansione era giusta; la frase che la descriveva no.',
          'Correggendo quell\'estratto è saltata fuori un\'altra indicazione metrica sbagliata nella banca dati: l\'analisi del monologo del Plocium diceva che il settenario trocaico correva dall\'inizio alla fine, che è esattamente ciò che la nuova etichetta smentisce.',
          'I METRI COMICI. Ogni estratto di Plauto, Terenzio e Cecilio dice ora in che metro è: ottantasei estratti che prima non portavano alcuna etichetta, e il totale dell\'app passa da ottanta a centosessantasei. La commedia romana è il caso difficile: una scena si muove fra i senari parlati, i lunghi versi recitati e i cantici cantati, perciò l\'etichetta non si poteva semplicemente copiare dall\'autore.',
          'Quattro nuove pagine di metrica: il Senario Giambico, il verso parlato che regge un terzo di Plauto e metà di Terenzio; il Settenario Giambico, che i romani associavano alla contentezza; l\'Ottonario Giambico, il verso regolare più lungo della commedia, quello che Terenzio usa dove Plauto avrebbe scritto un canto; e il Cantico, sulle parti cantate, che non sono un metro ma una dozzina, cambiando di verso in verso. Ciascuna ha tre o due esempi scanditi con quantità, elisioni e piedi segnati, e le scansioni sono di questa app, non riprese da un\'edizione.',
          'Due estratti portano più di un metro e lo dicono, verso per verso. Terenzio passa dai senari ai settenari trocaici in mezzo ad Andria V.3, e l\'ultima scena dell\'Hecyra alterna due metri quattro volte in undici versi. L\'etichetta ora recita, per esempio, Ottonario Giambico (v. 750), Settenario Trocaico (v. 751), e così via, ancorata ai numeri di verso della commedia e non alle righe della pagina.',
          'La pagina del Settenario Trocaico aspettava dalla v1.15.1 i suoi esempi comici, dato che ventotto dei trenta estratti in quel metro sono comici. Adesso li ha: Plauto che ordina a uno schiavo di non aver visto ciò che ha visto, e l\'adulatore di professione di Terenzio che spiega come dire di sì a tutto sia il mestiere più redditizio in circolazione.'
        ],
        changed: [
          'Sette analisi indicavano il metro sbagliato e sono corrette. La più importante è Miles Gloriosus III.1, descritta come senari giambici mentre è il lungo verso accompagnato: Periplectomeno sta recitando un pezzo, non chiacchierando. Due scene terenziane dette senari sono ottonari, due dette settenari trocaici sono giambiche, e una non è né l\'una né l\'altra.',
          'Da dove vengono i metri, visto che è il genere di affermazione che va dichiarata: dalla banca dati di Timothy J. Moore sui metri della commedia romana, costruita sul lavoro di Cesare Questa, che registra il metro di ogni unità metrica di Plauto e Terenzio. Cecilio non c\'è, perché sopravvive solo in citazioni, e le sue sei etichette vengono dalla scansione dell\'app e concordano con ciò che dice Gellio. Due frammenti di Cecilio restano di proposito senza etichetta: la lunga citazione del Plocium passa dai settenari trocaici ai senari a metà strada e non ha numeri di verso con cui segnare il passaggio, e un verso citato da Cicerone è abbastanza lungo da poter essere uno di quattro metri.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.2', date: '28/09/2026', time: '23:33', tz: 'CEST',
      en: {
        added: [
          'The Saturnian page now gives each of its two lines TWICE - once read by quantity and once read by stress - so the two rival theories can be compared on the same verse instead of being described in the abstract. It turns out to be the best argument the page could make. By stress, Livius comes out three beats then two, which is exactly what the accentual theory predicts; by the same rule Naevius comes out two then three, which is not. By quantity, Naevius gives seven long syllables in a row, which no Greek or Latin metre produces. Every reading works somewhere and fails somewhere else, and now you can see it happen rather than take it on trust.',
          'The Trochaic Septenarius page now scans, properly and in full. The Nonius fragment is marked line by line, with the quantities, the elisions and the fourth-foot break, and the page explains how the job is done: look the vowels up, apply position, strike out the elisions, then fit what is left to the fifteen positions. Both lines have exactly one resolution each and come out unambiguous.'
        ],
        changed: [
          'A reader checked the new Saturnian scansion and found two syllables marked short where the line\'s own pattern called them long. Both were long by position rather than by nature: the -um of virum, closed by the m of mihi, and the -ret of foret, closed before the f of fas. Behind them sat a worse muddle, which is that two of the metre pages were marking the syllable and one was marking the vowel. Every page now marks the syllable, long by nature and long by position alike, and the legend says so in both languages. One consequence is worth reading for itself: with virum corrected and the final -i of mihi taken long, as early Latin allows, the first half of the Livius line comes out three iambs and a syllable over, which is a textbook quantitative colon. So that line now works on both readings while the Naevius line still works on neither, which is a sharper version of the same argument. The seven long syllables survived the recount, four of them long by nature and three by position, and the page now says which are which.',
          'The checker now does mechanically what the reader did by eye. It reads the marks off the verse and compares them with the pattern syllable by syllable, and for a reading marked by stress it compares the beats written on the verse with the beats the pattern claims, colon by colon. That second check found a third error nobody had reported: the note on the Naevius line counts fas as one of its three beats and the verse had left the monosyllable unmarked.',
          'Two errors on the Elegiac Couplets page, both pointed out by a reader. The page said you never meet either half of the couplet on its own, which is plainly untrue of the hexameter - it is the pentameter that never stands alone, and that is now what it says. And it called "pentameter" a misleading name, which it is not: put the two half-feet back together, the long before the break and the long at the end, and they make one spondee split by the caesura and hung at the two ends of the line. Two whole feet, two whole feet and that divided fifth - five, exactly as the name claims. The page now explains both ways of reading the line, and says that the construction is unchanged in Tibullus, Propertius and Ovid.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'La pagina del Saturnio dà ora ciascuno dei suoi due versi DUE volte - una letta per quantità e una letta per accento - così che le due teorie rivali si possano confrontare sullo stesso verso invece che essere descritte in astratto. Si rivela l\'argomento migliore che la pagina potesse portare. Per accento Livio dà tre battute e poi due, che è esattamente ciò che la teoria accentuativa prevede; con la stessa regola Nevio dà due e poi tre, che non lo è. Per quantità Nevio dà sette sillabe lunghe di fila, cosa che nessun metro greco o latino produce. Ogni lettura funziona da qualche parte e fallisce da qualche altra, e adesso lo si vede accadere invece di doverlo credere sulla parola.',
          'La pagina del Settenario Trocaico adesso scandisce, per davvero e per intero. Il frammento di Nonio è segnato verso per verso, con le quantità, le elisioni e la pausa del quarto piede, e la pagina spiega come si fa il lavoro: cercare le vocali, applicare la posizione, cancellare le elisioni e poi far combaciare ciò che resta con le quindici posizioni. Entrambi i versi hanno esattamente una risoluzione ciascuno e risultano univoci.'
        ],
        changed: [
          'Un lettore ha controllato la nuova scansione del saturnio e ha trovato due sillabe segnate brevi là dove lo schema dello stesso verso le dava lunghe. Erano lunghe per posizione e non per natura: il -um di virum, chiuso dalla m di mihi, e il -ret di foret, chiuso davanti alla f di fas. Dietro c\'era un pasticcio peggiore, e cioè che due pagine di metrica segnavano la sillaba e una segnava la vocale. Ora ogni pagina segna la sillaba, lunga per natura o per posizione che sia, e la legenda lo dice in entrambe le lingue. Una conseguenza merita da sola la lettura: corretto virum e presa lunga la -i finale di mihi, come il latino arcaico consente, la prima metà del verso di Livio risulta tre giambi e una sillaba di avanzo, cioè un colon quantitativo da manuale. Quel verso funziona dunque in entrambe le letture, mentre quello di Nevio continua a non funzionare in nessuna: che è una versione più netta dello stesso argomento. Le sette sillabe lunghe hanno retto al ricontrollo, quattro lunghe per natura e tre per posizione, e la pagina ora dice quali sono quali.',
          'Il controllo automatico fa ora a macchina ciò che il lettore ha fatto a occhio. Legge i segni sul verso e li confronta con lo schema sillaba per sillaba, e per una lettura segnata per accento confronta le battute scritte sul verso con quelle che lo schema dichiara, colon per colon. Il secondo controllo ha trovato un terzo errore che nessuno aveva segnalato: la nota al verso di Nevio conta fas come una delle sue tre battute, e il verso lasciava il monosillabo senza segno.',
          'Due errori nella pagina dei Distici Elegiaci, entrambi segnalati da un lettore. La pagina diceva che nessuna delle due metà del distico si incontra da sola, cosa palesemente falsa per l\'esametro: è il pentametro a non stare mai da solo, ed è questo che ora dice. E definiva "pentametro" un nome fuorviante, cosa che non è: si rimettano insieme i due mezzi piedi, la lunga prima della pausa e la lunga in fine di verso, e formano uno spondeo spezzato dalla cesura e appeso ai due estremi. Due piedi interi, due piedi interi e quel quinto diviso: cinque, esattamente come il nome dichiara. La pagina spiega ora entrambi i modi di leggere il verso, e dice che la costruzione resta invariata in Tibullo, Properzio e Ovidio.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.1', date: '28/09/2026', time: '18:35', tz: 'CEST',
      en: {
        added: [
          'The three remaining metres now have pages of their own, so every metre named on an excerpt is a link: the Saturnian, Elegiac Couplets and the Trochaic Septenarius. All eighty labelled excerpts lead somewhere.',
          'The Saturnian is the interesting one, and the page is honest about why. It is Rome\'s own verse, from before the Greek metres arrived - the metre of the first two works of Latin literature and of the epitaphs of the Scipios - and nobody has ever managed to explain how it works. The page sets out the two rival theories and why neither settles it, then shows Livius Andronicus and Naevius with the break marked, the syllables counted, and no foot-by-foot scansion, because printing one would mean picking a side and calling it a fact.',
          'Elegiac Couplets: a hexameter and then a pentameter that falls away under it, shown as a pair because the pair is the unit. The page explains why \'pentameter\' is a misleading name, and the one rule that matters - the second half of every pentameter is fixed, which is why each couplet closes so finally. The example is the opening of Catullus 101, both lines scanned, and it is a poem written in the metre of the gravestone for a grave its author had crossed the world to reach.',
          'The Trochaic Septenarius: the long swinging line of Roman comedy, and the metre Lucilius used for his earliest satires before he settled on the hexameter. Both are in the app, so Lucilius is the one author here who shows the change happening. This page too declines to print a full scansion, and says why: substitution is allowed in almost every position, so one line often permits several analyses - which is exactly why Plautus and Terence carry no metre label yet.'
        ],
        changed: [
          'An example on a metre page can now be more than one line, which an elegiac couplet has to be, and can be shown with no foot-by-foot pattern at all, which the Saturnian and the septenarius are. The checker understands both, and knows the four legal shapes of an elegiac pentameter.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'I tre metri rimasti hanno ora una pagina propria, perciò ogni metro indicato su un brano è un collegamento: il Saturnio, i Distici Elegiaci e il Settenario Trocaico. Tutti e ottanta i brani etichettati portano da qualche parte.',
          'Il Saturnio è il più interessante, e la pagina è onesta sul perché. È il verso proprio di Roma, da prima che arrivassero i metri greci - il metro delle prime due opere della letteratura latina e degli epitaffi degli Scipioni - e nessuno è mai riuscito a spiegare come funzioni. La pagina espone le due teorie rivali e perché nessuna chiuda la questione, poi mostra Livio Andronico e Nevio con la pausa segnata, le sillabe contate e nessuna scansione piede per piede, perché stamparne una significherebbe scegliere una parte e chiamarla un fatto.',
          'Distici Elegiaci: un esametro e poi un pentametro che gli ricade sotto, mostrati come coppia perché l\'unità è la coppia. La pagina spiega perché "pentametro" sia un nome fuorviante e qual è l\'unica regola che conta davvero: la seconda metà di ogni pentametro è fissa, ed è per questo che ogni distico chiude in modo così definitivo. L\'esempio è l\'inizio del carme 101 di Catullo, con entrambi i versi scanditi: un componimento scritto nel metro delle lapidi per una tomba che il suo autore aveva attraversato il mondo per raggiungere.',
          'Il Settenario Trocaico: il verso lungo e dondolante della commedia romana, e il metro che Lucilio usò per le sue prime satire prima di fissarsi sull\'esametro. Entrambe le fasi sono nell\'app, e Lucilio è perciò l\'unico autore qui che mostri il passaggio mentre avviene. Anche questa pagina rinuncia a stampare una scansione completa, e dice perché: la sostituzione è ammessa in quasi ogni posizione, perciò un verso ammette spesso più analisi, ed è esattamente il motivo per cui Plauto e Terenzio non portano ancora un\'etichetta metrica.'
        ],
        changed: [
          'Un esempio su una pagina metrica può ora essere di più di un verso, come deve essere un distico elegiaco, e può essere mostrato senza alcuno schema piede per piede, come accade per il saturnio e per il settenario. Il controllo automatico capisce entrambi i casi e conosce le quattro forme legittime del pentametro elegiaco.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.15.0', date: '28/09/2026', time: '17:55', tz: 'CEST',
      en: {
        added: [
          'Verse excerpts now say what metre they are in. A small tablet sits beside the excerpt\'s title reading, for instance, METRE - Dactylic Hexameter, and where the metre has a reference page the name is a link.',
          'Two of those pages arrive with it. The Dactylic Hexameter, the metre of epic, didactic poetry and satire, and the Phalaecian Hendecasyllable, the eleven-syllable line Catullus reached for more often than any other. Each one explains where the metre came from, how it is built foot by foot, how it actually sounds when you read it aloud, and who used it.',
          'The last of those sections is the interesting one. It takes the poets in the app who wrote in that metre - Ennius, Lucilius, Lucretius and Catullus for the hexameter - and prints one line of each with its scansion marked on it, foot by foot, with the caesura shown, followed by what that poet in particular does with the measure: why the Ennius line is famously slow, why Lucretius is heavier than the poets who came after him, why Catullus keeps putting a spondee where everyone else puts a dactyl.',
          'Eighty excerpts carry a metre so far, seventy-one of them linked. Only excerpts whose metre is certain and single are labelled: a scene of Plautus can change metre partway through, so the playwrights are left for later, when they will get a list of metres with the verses each one covers.'
        ],
        changed: [
          'Nothing about the excerpts themselves changed. No Latin was touched, no translation and no analysis: this update only adds the labels and the pages they point to.',
          'Corrected after a first read-through: the metre tablet now lines up exactly with the papyrus above it, the Dactylic Hexameter page gained a fifth example - Catullus 64, verse 3 - because the note about his spondaic fifth foot was sitting under a line that does not have one, and two smaller slips are fixed (lepidum and novum are not diminutives, only libellum is; and Lucilius writes his early satires in the older metres up to Book 29, not Book 30). The checker now tests this kind of claim against the scansion, so it cannot drift again.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'I brani in versi dicono ora in che metro sono. Una piccola targhetta accanto al titolo del brano riporta, per esempio, METRO - Esametro Dattilico, e dove il metro ha una pagina di riferimento il nome è un collegamento.',
          'Due di quelle pagine arrivano insieme alla targhetta. L\'Esametro Dattilico, il metro dell\'epica, della poesia didascalica e della satira, e l\'Endecasillabo Falecio, il verso di undici sillabe a cui Catullo ricorse più che a ogni altro. Ciascuna spiega da dove viene il metro, com\'è costruito piede per piede, come suona davvero a leggerlo ad alta voce e chi lo ha usato.',
          'L\'ultima di quelle sezioni è la più interessante. Prende i poeti dell\'app che hanno scritto in quel metro - Ennio, Lucilio, Lucrezio e Catullo per l\'esametro - e stampa un verso di ciascuno con la scansione segnata sopra, piede per piede e con la cesura indicata, seguito da ciò che quel poeta in particolare fa con quella misura: perché il verso di Ennio sia notoriamente lento, perché Lucrezio sia più pesante dei poeti venuti dopo, perché Catullo continui a mettere uno spondeo dove tutti gli altri mettono un dattilo.',
          'Finora ottanta brani portano un metro, settantuno dei quali con collegamento. Vengono etichettati solo i brani il cui metro è certo e unico: una scena di Plauto può cambiare metro a metà, perciò i commediografi restano per dopo, quando avranno un elenco di metri con i versi coperti da ciascuno.'
        ],
        changed: [
          'Nulla è cambiato nei brani stessi. Non è stato toccato nessun testo latino, nessuna traduzione e nessuna analisi: questo aggiornamento aggiunge soltanto le etichette e le pagine a cui rimandano.',
          'Corretto dopo una prima lettura: la targhetta del metro si allinea ora esattamente con il papiro che le sta sopra, la pagina dell\'Esametro Dattilico ha guadagnato un quinto esempio - Catullo 64, verso 3 - perché la nota sul suo quinto piede spondaico stava sotto un verso che non ne ha uno, e sono corrette due sviste minori (lepidum e novum non sono diminutivi, lo è solo libellum; e Lucilio scrive le satire giovanili nei metri più antichi fino al libro 29, non fino al 30). Il controllo automatico verifica ora questo tipo di affermazione contro la scansione, così non può più scivolare.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.10', date: '27/09/2026', time: '16:38', tz: 'CEST',
      en: {
        added: [
          'Lucretius is finished. The last five excerpts are the plague of Athens, which is how the De Rerum Natura ends, and they take him to sixty - the largest body of work in the app after Plautus and Cicero, and the whole of the original plan.',
          'The disease rises in Egypt, crosses the sea and settles on Athens in 430 BC. Lucretius is translating Thucydides, who caught it himself and survived, and the symptoms go down through the body in the order the sickness takes it: the head, the eyes, the throat, the tongue running with blood, the chest, and the bars of life giving way. What he adds to the medicine is the anguish, listed among the symptoms as though it were one of them.',
          'Then the sign nobody would have invented - the skin is cool to the touch while the inside burns like a furnace - and the sufferers throwing themselves into rivers and falling into wells with their mouths already open, and five words about the doctors: medicine muttered in silent fear.',
          'The hardest passage is the one about the survivors. Men went on living with their genitals cut off, without hands or feet, without eyes, and Lucretius gives the reason in a single line: so fiercely had the fear of death got into them. Six books have argued that death is nothing to us; this is the bill for the belief they argue against. Others forgot everything, including who they were.',
          'And then the end. Despair kills people outright; contagion makes staying away as fatal as helping, so the best die first; the temples fill with corpses; the gods stop being worth anything, not because anyone was argued out of them but because the pain was louder; the custom of burial breaks down, and people fight at the pyres rather than leave a body unburnt. Then the poem stops, with no conclusion at all, and the note discusses whether that was the ending Lucretius wanted.'
        ],
        changed: [
          'The Pro Milone gets its notes rewritten at length, the sixth instalment of the pass through Cicero\'s older excerpts. All eight now carry the history as well as the rhetoric: the burning of the Senate House with Clodius\'s body inside it, which is why Pompey was sole consul and why there were troops around the court; the water-clock that gave Cicero three hours; Asconius, who had the records and tells the story of the Appian Way differently; the severe old judge behind cui bono, and what the phrase actually means; why freeing the slaves put them beyond the torturer, and the two Roman rules about slave evidence that made it work; the Bona Dea scandal that started the feud ten years earlier; Cicero using an argument from design in court that he would take apart in his own philosophy seven years later; and the verdict, thirty-eight to thirteen, followed by Marseilles and a stone thrown from a town wall.',
          'And the plague excerpts grow, following a reader\'s study of them. Why this plague and not a mythical one, since the Iliad and the Oedipus both come with a god attached and Athens came with an eyewitness instead, so that the choice of example is already the argument. How the hopelessness is built rather than felt - every remedy an Athenian had is named and then shown to fail - and how the city comes apart from the specialist inwards, medicine first, then the household, then the gods. That the fear of death is doing this alongside plain ignorance, which is the same pair the poem blames for superstition; and that keeping away from the bodies was the one correct thing anybody did, since the animals that tasted them died. That the dilemma of the fourth excerpt has an Epicurean answer the poem never supplies - survive and the pain stops, die and death is nothing to us, and the stretch between is what the fourth Principal Doctrine is for - so the plague reads like a final examination, with the awkward fact that the text never says so. And that the ending is a ring: Venus and the spring at one end, corpses and men fighting over fire at the other, Love and Strife, which is Empedocles, the predecessor Lucretius praises by name. Two fixes as well. Every block now opens a verse: three markers in these excerpts sat inside a line, and so did seven older ones scattered through Books I to III, so all ten have been merged into the block before them and no verse excerpt in the app has a number in the middle of a line any more. And the Italian no longer renders edere vitam as giving life back.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Lucrezio è finito. Gli ultimi cinque brani sono la peste di Atene, che è il modo in cui il De Rerum Natura si chiude, e lo portano a sessanta: il corpus più ampio dell\'app dopo Plauto e Cicerone, e l\'intero piano iniziale.',
          'La malattia nasce in Egitto, attraversa il mare e si posa su Atene nel 430 a.C. Lucrezio sta traducendo Tucidide, che la contrasse e sopravvisse, e i sintomi scendono attraverso il corpo nell\'ordine in cui il male lo prende: il capo, gli occhi, le fauci, la lingua che cola sangue, il petto, e le sbarre della vita che cedono. Ciò che aggiunge alla medicina è l\'angoscia, messa tra i sintomi come se fosse uno di essi.',
          'Poi il segno che nessuno avrebbe inventato - la pelle è fresca al tatto mentre dentro si brucia come in una fornace - e i malati che si gettano nei fiumi e cadono nei pozzi con la bocca già spalancata, e cinque parole sui medici: la medicina mormorava in un timore muto.',
          'Il brano più duro è quello sui sopravvissuti. Alcuni continuarono a vivere con i genitali tagliati via, senza mani né piedi, senza occhi, e Lucrezio ne dà la ragione in un verso solo: a tal punto era entrata in loro acuta la paura della morte. Sei libri hanno sostenuto che la morte non è nulla per noi; questo è il conto della credenza contro cui argomentano. Altri dimenticarono ogni cosa, compreso chi fossero.',
          'E poi la fine. La disperazione uccide da sola; il contagio rende lo stare lontani letale quanto l\'aiutare, e così muoiono per primi i migliori; i templi si riempiono di cadaveri; gli dèi smettono di valere qualcosa, non perché qualcuno sia stato convinto a parole ma perché il dolore era più forte; l\'uso della sepoltura si spezza, e la gente si azzuffa presso i roghi piuttosto che lasciare un corpo senza bruciare. Poi il poema si interrompe, senza alcuna conclusione, e la nota discute se fosse questa la fine che Lucrezio voleva.'
        ],
        changed: [
          'La Pro Milone riceve note riscritte per esteso, sesto capitolo della revisione dei brani più vecchi di Cicerone. Tutte e otto portano ora la storia oltre alla retorica: l\'incendio della Curia con dentro il corpo di Clodio, che è il motivo per cui Pompeo fu console unico e per cui c\'erano truppe attorno al tribunale; la clessidra che diede a Cicerone tre ore; Asconio, che aveva gli atti e racconta la vicenda della via Appia in modo diverso; il vecchio giudice severo dietro il cui bono, e che cosa significhi davvero quella formula; perché affrancare i servi li mettesse fuori dalla portata del torturatore, e le due regole romane sulla testimonianza servile che lo rendevano possibile; lo scandalo della Bona Dea che aveva aperto la faida dieci anni prima; Cicerone che in aula usa un argomento dal disegno del mondo che sette anni dopo smonterà nella propria filosofia; e il verdetto, trentotto contro tredici, seguito da Marsiglia e da una pietra scagliata dalle mura di una città.',
          'E i brani della peste si arricchiscono, seguendo lo studio di un lettore. Perché questa peste e non una mitica, dato che l\'Iliade e l\'Edipo arrivano entrambi con un dio attaccato e Atene arrivava invece con un testimone oculare, così che la scelta dell\'esempio è già l\'argomento. Come la disperazione sia costruita e non sentita - ogni rimedio che un ateniese avesse viene nominato e poi mostrato mentre fallisce - e come la città si disfi partendo dallo specialista e andando verso l\'interno: prima la medicina, poi la casa, poi gli dèi. Che a muovere tutto questo sia la paura della morte insieme alla semplice ignoranza, che è la stessa coppia a cui il poema attribuisce la superstizione; e che tenersi lontani dai corpi sia stata l\'unica cosa giusta che qualcuno abbia fatto, dato che gli animali che li assaggiarono ne morirono. Che il dilemma del quarto brano abbia una risposta epicurea che il poema non fornisce mai - sopravvivi e il dolore finisce, muori e la morte non è nulla per noi, e il tratto in mezzo è ciò per cui esiste la quarta Massima Capitale - così che la peste si legga come un esame finale, con il fatto scomodo che il testo non lo dice mai. E che la fine sia un anello: Venere e la primavera a un capo, i cadaveri e gli uomini che si contendono il fuoco all\'altro, Amore e Discordia, cioè Empedocle, il predecessore che Lucrezio loda per nome. Anche due correzioni. Ogni blocco apre ora un verso: tre indicatori di questi brani stavano dentro una riga, e così altri sette sparsi per i libri I-III, perciò tutti e dieci sono stati fusi con il blocco precedente e nessun brano in versi dell\'app ha più un numero a metà riga. E l\'italiano non rende più edere vitam come restituire la vita.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.9', date: '26/09/2026', time: '23:13', tz: 'CEST',
      en: {
        added: [
          'Lucretius opens Book VI, the last book of the poem: five excerpts, taking him to fifty-five, and five to go.',
          'It begins with the diagnosis the whole school rests on. Epicurus looked at people who had everything a body needs - rich, honoured, praised, proud of their children - and who were still miserable at home, and found the fault in the container rather than the contents: a vessel that leaks, so that nothing ever fills it, and that sours whatever it does hold.',
          'Then the sharpest attack on religion in the poem, and it is made of questions. If Jupiter throws the lightning, why is it the innocent who burn while the guilty walk away? Why do most bolts fall in empty country - is he exercising his arm? Why does he let his own weapon blunt itself in the ground? Then six verses of instructions: before you are amazed at anything, get the scale right, because the whole sky is a smaller part of the universe than one man is of the earth.',
          'And then two famous puzzles, handled as physics rather than as omens. The lakes that kill any bird flying over them, which everyone knew were the entrance to the underworld and which Lucretius explains as bad air - modern volcanology agrees, and the gas is still killing people. And the magnet, with its chain of iron rings hanging in the air, which he refuses to leave as a marvel because a world where one thing can act on another at a distance, by sympathy, would be a world his physics cannot describe.'
        ],
        changed: [
          'Pro Archia gets its notes rewritten at length, the fifth instalment of the pass through Cicero\'s older excerpts and the first speech outside the Catilinarians. All eight now carry the history as well as the rhetoric: who Archias actually was and what the charge actually was, with the burnt registers that made the case turn on witnesses; the wax masks of ancestors that Cicero did not have and the books he says replaced them; what a working poet did for a living, improvising finished verse at dinners; Sulla paying a bad poet out of confiscated property on condition that he stop writing; the poem about the consulship that Cicero admits, in court, to having encouraged; and the fact that the speech survived because of the digression rather than the case - Petrarch found it in 1333 and the humanists built a programme on it.',
          'And Book VI grows on the way past. Two of the five excerpts turned out to be too short for their own arguments and have been extended. The six verses on scale now run to the end of the sentence they were building towards - through the fever and the toothache that nobody reads as an omen, because everybody already grants that the earth holds seeds enough for them, and out to the list of what the infinite supplies to the sky: enough to shake the ground, drive a whirlwind, make Etna overflow and set the sky alight, which is the table of contents of the book. And the deadly lakes now run as far as the sentence that says it outright: there is no door of Orcus there, and nobody is being hauled down to Acheron. All five also carry a reader\'s notes - the fourth and last eulogy of Epicurus, and what the leaking vessel is a picture of; why the attack on Jupiter is built entirely of questions that are never answered, and how the bolt landing in empty country closes every exit at once; and, for the magnet, a footnote setting out the Epicurean premises that make a wrong answer the only answer the system allows.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Lucrezio apre il sesto libro, l\'ultimo del poema: cinque brani, che lo portano a cinquantacinque, e cinque ne restano.',
          'Si comincia dalla diagnosi su cui poggia tutta la scuola. Epicuro guardò persone che avevano tutto ciò che serve a un corpo - ricche, onorate, lodate, fiere dei figli - e che in casa erano ugualmente infelici, e trovò il difetto nel contenitore invece che nel contenuto: un vaso che perde, così che nulla lo riempia mai, e che inacidisce ciò che pure trattiene.',
          'Poi l\'attacco più tagliente del poema alla religione, ed è fatto di domande. Se è Giove a scagliare il fulmine, perché a bruciare sono gli innocenti mentre i colpevoli se ne vanno? Perché la maggior parte dei fulmini cade in aperta campagna: si sta allenando il braccio? Perché lascia che la propria arma si smussi nella terra? Poi sei versi di istruzioni: prima di stupirti di qualcosa, regola la scala, perché il cielo intero è una parte dell\'universo più piccola di quanto un uomo lo sia della terra.',
          'E infine due enigmi celebri, trattati da fisica e non da presagi. I laghi che uccidono qualunque uccello vi passi sopra, che tutti sapevano essere l\'ingresso dell\'oltretomba e che Lucrezio spiega con l\'aria cattiva - la vulcanologia moderna gli dà ragione, e quel gas uccide ancora. E la calamita, con la sua catena di anelli di ferro sospesi in aria, che si rifiuta di lasciare tra le meraviglie, perché un mondo in cui una cosa può agire su un\'altra a distanza, per simpatia, sarebbe un mondo che la sua fisica non può descrivere.'
        ],
        changed: [
          'La Pro Archia riceve note riscritte per esteso, quinto capitolo della revisione dei brani più vecchi di Cicerone e prima orazione fuori dalle Catilinarie. Tutte e otto portano ora la storia oltre alla retorica: chi fosse davvero Archia e quale fosse davvero l\'accusa, con i registri bruciati che fecero dipendere la causa dai testimoni; le maschere di cera degli antenati che Cicerone non aveva e i libri che dice di avervi sostituito; che mestiere facesse davvero un poeta, improvvisando versi compiuti nei banchetti; Silla che paga un cattivo poeta con beni confiscati a patto che smetta di scrivere; il poema sul consolato che Cicerone ammette in aula di avere incoraggiato; e il fatto che l\'orazione sia sopravvissuta grazie alla digressione e non alla causa - Petrarca la ritrovò nel 1333 e gli umanisti ci costruirono sopra un programma.',
          'E il sesto libro cresce strada facendo. Due dei cinque brani si sono rivelati troppo corti per le loro stesse argomentazioni e sono stati allungati. I sei versi sulla scala arrivano ora in fondo alla frase verso cui puntavano: passando per la febbre e il mal di denti che nessuno legge come presagio, perché tutti ammettono già che la terra contenga semi a sufficienza per produrli, e fino all\'elenco di ciò che l\'infinito fornisce al cielo - abbastanza per scuotere il suolo, spingere un turbine, far traboccare l\'Etna e incendiare il cielo, che è l\'indice del libro. E i laghi mortiferi arrivano ora fino alla frase che lo dice apertamente: lì non c\'è nessuna porta dell\'Orco, e nessuno viene trascinato giù verso l\'Acheronte. Tutti e cinque portano inoltre le note di un lettore: il quarto e ultimo elogio di Epicuro, e di che cosa sia immagine il vaso che perde; perché l\'attacco a Giove sia fatto tutto di domande che non ricevono mai risposta, e come il fulmine che cade in aperta campagna chiuda ogni uscita in una volta sola; e, per la calamita, una nota a margine che espone le premesse epicuree per cui una risposta sbagliata è l\'unica che il sistema consenta.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.8', date: '25/09/2026', time: '22:25', tz: 'CEST',
      en: {
        added: [
          'Book V of Lucretius is finished: five more excerpts, taking him to fifty, and the poem has one book left.',
          'First the pursuit of office and money, which people take up so that their lives will finally be safe, and which is exactly what makes them unsafe: envy strikes the summit like lightning, and the wanting itself was learned from other people\'s mouths rather than from anything the body needs.',
          'Then the most dangerous passage in the poem: an explanation of where the gods came from. People saw splendid faces awake and vaster ones in dreams, and step by step gave them sensation, immortality and perfect happiness - and then, because they could not explain the seasons or the storms, handed the running of the sky over to them as well. What it cost comes next, and so does a definition of piety with no ritual in it at all: not the veiled head, not the blood on the altars, but being able to look at everything with a mind at peace.',
          'Then the proof that the fear is still here - a thunderstorm, and proud kings pull in their limbs; an admiral prays to the winds and drowns anyway - and finally the last ten verses of the book, on where ships and farming and laws and songs actually came from: no god and no hero, but need, practice and a mind that will not sit still, teaching one thing at a time to people feeling their way forward in the dark.'
        ],
        changed: [
          'The fourth Catilinarian gets its notes rewritten at length, and with it all four speeches against Catiline are done. The new material includes the temple of Concord and why meeting there to vote on executions was a dark joke; Cicero\'s whole family, named one by one, and what became of each of them; the two motions on the table and the thirty-seven-year-old Caesar behind one of them; the knights and the senators standing in one crowd, an alliance that lasted about four years; and the promise in the last sentence of the last speech, that he would answer for the day as long as he lived, which is exactly what happened to him five years later.',
          'And the notes for the five Book V excerpts grow, following a reader\'s study of them: the hill the ambitious climb is the one Sisyphus is already pushing his rock up, and the two mistakes underneath it - a security tied to a desire with no ceiling, and a competition whose envy is what throws you off the top; how the gods got handed the weather in the verses immediately after the dream-images, which is the step where superstition actually starts; the last line read against the opening of Book II, where a sheltered mind looks out at a storm, so that piety turns out to be an act of looking and the cure for fear turns out to be knowledge; the drowning admiral set out as a dilemma that Book VI will collect on, since a god who drowns an innocent man cannot be the untroubled god the school describes; and the closing list read twice, once as proof that nobody handed us any of it, and once as a warning about what else the arts went on to make.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Il quinto libro di Lucrezio è finito: altri cinque brani, che lo portano a cinquanta, e al poema resta un libro solo.',
          'Prima la corsa alle cariche e al denaro, che si intraprende perché la vita sia finalmente al sicuro e che è proprio ciò che toglie ogni sicurezza: l\'invidia colpisce le cime come un fulmine, e quel desiderio è stato imparato dalla bocca degli altri, non da qualcosa di cui il corpo abbia bisogno.',
          'Poi il passo più pericoloso del poema: la spiegazione di da dove vengano gli dèi. La gente vedeva volti splendidi da sveglia e ancora più grandi nei sogni, e passo dopo passo attribuì loro sensibilità, immortalità e felicità perfetta; e poi, non sapendo spiegare le stagioni né le tempeste, consegnò loro anche il governo del cielo. Quanto sia costato viene subito dopo, e con esso una definizione della pietà in cui non c\'è un solo rito: non il capo velato, non il sangue sugli altari, ma poter guardare ogni cosa con animo tranquillo.',
          'Poi la prova che quella paura è ancora qui - un temporale, e i re superbi si rattrappiscono; un ammiraglio prega i venti e affoga lo stesso - e infine gli ultimi dieci versi del libro, su da dove vengano davvero le navi, l\'agricoltura, le leggi e i canti: nessun dio e nessun eroe, ma il bisogno, la pratica e una mente che non sta ferma, che insegnano una cosa alla volta a chi avanza a tentoni nel buio.'
        ],
        changed: [
          'La quarta Catilinaria riceve note riscritte per esteso, e con essa sono concluse tutte e quattro le orazioni contro Catilina. Tra il materiale nuovo: il tempio della Concordia e perché riunirsi lì per votare delle esecuzioni fosse uno scherzo cupo; tutta la famiglia di Cicerone, nominata una per una, e che cosa sia stato di ciascuno; le due proposte sul tavolo e il Cesare trentasettenne dietro una di esse; i cavalieri e i senatori in una sola folla, un\'alleanza durata circa quattro anni; e la promessa nell\'ultima frase dell\'ultimo discorso, che avrebbe risposto di quella giornata finché fosse vissuto, che è esattamente ciò che gli accadde cinque anni dopo.',
          'E le note dei cinque brani del quinto libro si arricchiscono, seguendo lo studio di un lettore: la collina che scalano gli ambiziosi è la stessa su cui Sisifo spinge già il suo masso, e sotto ci sono due errori - una sicurezza legata a un desiderio senza tetto e una competizione la cui invidia è proprio ciò che ti butta giù dalla cima; come agli dèi sia stato consegnato il tempo atmosferico nei versi immediatamente successivi alle immagini dei sogni, che è il passo in cui la superstizione comincia davvero; l\'ultimo verso letto insieme all\'inizio del secondo libro, dove una mente al riparo guarda la tempesta, così che la pietà si rivela un atto del guardare e la cura della paura si rivela la conoscenza; l\'ammiraglio che affoga messo in forma di dilemma che il sesto libro riscuoterà, dato che un dio che affoga un innocente non può essere il dio imperturbato della scuola; e l\'elenco finale letto due volte, una come prova che nessuno ci ha regalato nulla, una come avvertimento su che cos\'altro le arti siano andate a produrre.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.7', date: '22/09/2026', time: '22:28', tz: 'CEST',
      en: {
        added: [
          'Lucretius opens Book V, the history of the world: five excerpts, taking him to forty-five.',
          'It begins with the boldest thing he ever says about his teacher - he was a god, a god - on the grounds that the old gods were called divine for giving us grain and wine, while Epicurus took away the fear that ruins a life. Then the proof that the world was not built for us: a newborn lies on the ground like a sailor thrown ashore by a storm, naked and helpless and crying, while every animal grows up needing no rattles, no nurses, no clothes and no walls.',
          'Then the creatures the young earth tried to make and failed: things with no feet, no hands, no mouth, no face, which could not feed themselves or mate, and so were never heard of again. Then the first human beings - bigger-boned and harder to kill than us, wandering without farming or iron, living on acorns and arbutus berries, in a world that is neither a golden age nor a fall.',
          'And finally the moment society begins: huts, skins, fire, a couple, children, and then neighbours agreeing not to harm one another and asking that the weak be pitied, stammering it out in gestures because words had not been invented yet. Lucretius adds, drily, that the agreement never held for everyone - only for enough of them, or none of us would be here.'
        ],
        changed: [
          'The note on the lovers\' euphemisms in Book IV now explains what its sharpest line means: they never look at their own troubles, which are the worst of all. Everyone in that scene is in love and can see it perfectly in somebody else, which is a trap laid for the reader who has just been laughing. The Epicureans had a practical answer - frank speech between friends, because nobody can audit their own mind - and modern psychology has a name for the same asymmetry.',
          'The third Catilinarian gets its notes rewritten at length, the third instalment of the pass through Cicero\'s older excerpts. All seven now carry the history as well as the rhetoric: the title of father of the fatherland, voted two days later, and the line of self-praise that was quoted against him for centuries; who the Allobroges were and why they informed; Lentulus, an expelled ex-consul who believed a prophecy had named him; how a sealed letter worked as evidence; what a public thanksgiving meant and why one for a man in a toga was unheard of; how much of the famous coincidence with the statue of Jupiter was probably arranged; and the fact that the memory he asked for was preserved by the one thing he called insufficient.',
          'And the notes for the five Book V excerpts grow, following a reader\'s study of them. The poem named in the first line turns out to be this one and not Epicurus\'s own book, which was prose and is now nearly lost; the passage on the newborn is where the idea of nature as a stepmother enters European literature, and the line runs from Pliny to Leopardi; the young earth is a workshop where failure comes before mastery, except that nothing here is learning anything; the Golden Age is refused by asking item by item what would make it golden; and the reason for telling any of it is that a world which built itself needs no gods, which is why the people who could not explain thunder invented them.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Lucrezio apre il quinto libro, la storia del mondo: cinque brani, che lo portano a quarantacinque.',
          'Si comincia con la cosa più audace che abbia mai detto del suo maestro - fu un dio, un dio - con questa ragione: gli dèi antichi furono detti divini per averci dato il grano e il vino, mentre Epicuro ha tolto la paura che rovina una vita. Poi la prova che il mondo non è stato costruito per noi: un neonato giace a terra come un marinaio gettato a riva dalla tempesta, nudo, inerme e in lacrime, mentre ogni animale cresce senza bisogno di sonagli, di balie, di vestiti e di mura.',
          'Poi le creature che la terra giovane provò a fare e sbagliò: esseri senza piedi, senza mani, senza bocca, senza volto, incapaci di nutrirsi o di accoppiarsi, e perciò mai più visti. Poi i primi esseri umani: ossa più grandi e più difficili da abbattere delle nostre, erranti senza agricoltura né ferro, nutriti di ghiande e corbezzoli, in un mondo che non è né un\'età dell\'oro né una caduta.',
          'E infine il momento in cui nasce la società: capanne, pelli, fuoco, una coppia, dei figli, e poi dei vicini che si accordano per non farsi del male e chiedono che si abbia pietà dei deboli, dicendolo a gesti e balbettando perché le parole non erano ancora state inventate. Lucrezio aggiunge, asciutto, che quell\'accordo non fu mai rispettato da tutti: solo da abbastanza di loro, altrimenti nessuno di noi sarebbe qui.'
        ],
        changed: [
          'La nota sui vezzeggiativi degli innamorati nel quarto libro spiega ora che cosa significhi il suo verso più tagliente: non guardano mai ai propri guai, che sono i peggiori di tutti. Nella scena sono innamorati tutti e ognuno lo vede benissimo nell\'altro, il che è una trappola tesa al lettore che ha appena riso. Gli epicurei avevano una risposta pratica - la franchezza tra amici, perché nessuno può fare la revisione della propria mente - e la psicologia moderna ha un nome per la stessa asimmetria.',
          'La terza Catilinaria riceve note riscritte per esteso, terzo capitolo della revisione dei brani più vecchi di Cicerone. Tutte e sette portano ora la storia oltre alla retorica: il titolo di padre della patria, votato due giorni dopo, e il verso di autoelogio che gli fu rinfacciato per secoli; chi erano gli Allobrogi e perché denunciarono; Lentulo, ex console espulso dal senato, convinto che una profezia lo avesse designato; come una lettera sigillata funzionava da prova; che cosa fosse un ringraziamento pubblico e perché fosse inaudito per un uomo in toga; quanto della famosa coincidenza con la statua di Giove fosse probabilmente organizzato; e il fatto che la memoria da lui richiesta sia stata conservata dall\'unica cosa che aveva dichiarato insufficiente.',
          'E le note dei cinque brani del quinto libro si arricchiscono, seguendo lo studio di un lettore. Il poema nominato nel primo verso si rivela essere questo e non il libro di Epicuro, che era in prosa ed è ormai quasi perduto; il passo sul neonato è il punto in cui l\'idea della natura come matrigna entra nella letteratura europea, e la linea va da Plinio a Leopardi; la terra giovane è un\'officina in cui il fallimento precede la maestria, salvo che qui non c\'è nessuno che impari; l\'età dell\'oro viene rifiutata chiedendosi voce per voce che cosa la renderebbe d\'oro; e la ragione per raccontare tutto questo è che un mondo che si è costruito da sé non ha bisogno di dèi, ed è per questo che chi non sapeva spiegare il tuono li ha inventati.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.6', date: '18/09/2026', time: '18:42', tz: 'CEST',
      en: {
        added: [
          'Book IV of Lucretius is finished: five more excerpts, all of them the long attack on love that closes the book, bringing Lucretius to forty.',
          'It begins with the drop of Venus\'s sweetness that falls into the heart and the cold anxiety that follows it at once, with the warning that being apart does not help, because the images of the person keep arriving anyway. Lucretius calls love a sore that comes alive by being fed, and prescribes a cure almost no reader accepts.',
          'Then the bill: strength spent, duties neglected, a father\'s fortune turning into Babylonian perfume and transparent silk from Cos - and in the middle of it the most quoted line of the poem, that out of the very fountain of delights something bitter rises. Then the catalogue of what lovers call each other, the funniest and the cruellest page in the poem, where the filthy woman is "unadorned" and the skeletal one "a slender darling".',
          'Then, twenty lines later, the passage that complicates all of it: a woman\'s desire is real and the pleasure belongs to both, proved from animals and from two dogs at a crossroads who cannot get apart. And the book ends quietly, with no arrows and no goddess: love is put together by habit, the way water dripping on a stone bores through it in the end.'
        ],
        changed: [
          'The note on the oars and the moving stars now ends with a long footnote on the ships (IV, vv. 387-396), a passage that is not one of the app\'s excerpts: Lucretius\'s own version of the two trains at a platform, with the hills that seem to flee towards the stern and the stars that look nailed to the sky. It is there to keep two things apart that are easily confused - the relativity of motion, which is a fact and deceives nobody, and the decision perception makes on top of it, which is where the error lives.',
          'The second Catilinarian gets its notes rewritten at length, the second instalment of the pass through Cicero\'s older excerpts. All seven now carry the history as well as the rhetoric: what Catiline actually did the night he left Rome; the debtors and ruined veterans behind the parade of grotesques; Pompey, unnamed, standing behind "the courage of one man"; the charge of expelling a citizen without trial, which cost Cicero his house five years later; the sleeved tunic that was thrown at Julius Caesar too; why recasting a civil war as a war between virtues and vices has had such a long career; and the statue of Jupiter that was put up, by chance, on the very day the conspirators\' letters were read out.',
          'And the notes for the five Book IV excerpts grow, following a reader\'s study of them: the four different jobs the word Venus does in twenty verses, and which Venus this is not - not the one the poem opens with; how love ruins more than the lover, taking the duties owed to other people and the family property with it, and how the whole luxury inventory answers no need the body actually has; where the line falls between seeing somebody generously and calling what is ugly beautiful; the door the book leaves open, since an Epicurean is asked to give up the obsession and not the pleasure; and the two different things called love in this book, one that happens to you and one that gets made slowly, which is the one you can live inside.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Il quarto libro di Lucrezio è finito: altri cinque brani, tutti tratti dal lungo attacco all\'amore che chiude il libro, e Lucrezio arriva a quaranta.',
          'Si comincia dalla goccia di dolcezza di Venere che cade nel cuore e dalla gelida inquietudine che la segue subito, con l\'avvertimento che stare lontani non serve, perché i simulacri della persona continuano ad arrivare lo stesso. Lucrezio chiama l\'amore un\'ulcera che si ravviva se la nutri, e prescrive una cura che quasi nessun lettore accetta.',
          'Poi il conto: le forze consumate, i doveri trascurati, il patrimonio del padre che si trasforma in profumo di Babilonia e seta trasparente di Cos - e in mezzo il verso più citato del poema, che dal mezzo stesso della fonte dei piaceri sale qualcosa di amaro. Poi il catalogo di come si chiamano tra loro gli innamorati, la pagina più divertente e più crudele del poema, dove la donna sporca è "senza artifici" e quella scheletrica "un\'amante sottile".',
          'Poi, venti versi più avanti, il passo che complica tutto: il desiderio della donna è reale e il piacere è di tutti e due, dimostrato con gli animali e con due cani a un crocicchio che non riescono a staccarsi. E il libro finisce in silenzio, senza frecce e senza dee: l\'amore lo mette insieme l\'abitudine, come l\'acqua che gocciola su una pietra alla fine la fora.'
        ],
        changed: [
          'La nota sui remi e sulle stelle che si muovono si chiude ora con una lunga nota a margine sulle navi (IV, vv. 387-396), un passo che non è tra i brani dell\'app: la versione di Lucrezio stesso dei due treni sul binario, con i colli che sembrano fuggire verso la poppa e le stelle che paiono inchiodate al cielo. Serve a tenere distinte due cose che si confondono facilmente: la relatività del movimento, che è un fatto e non inganna nessuno, e la decisione che la percezione ci costruisce sopra, dove invece l\'errore abita.',
          'La seconda Catilinaria riceve note riscritte per esteso, secondo capitolo della revisione dei brani più vecchi di Cicerone. Tutte e sette portano ora la storia oltre alla retorica: che cosa fece davvero Catilina la notte in cui lasciò Roma; gli indebitati e i veterani rovinati dietro la sfilata di grotteschi; Pompeo, non nominato, dietro "il valore di un uomo solo"; l\'accusa di aver espulso un cittadino senza processo, che cinque anni dopo costò a Cicerone la casa; la tunica con le maniche che fu rinfacciata anche a Giulio Cesare; perché trasformare una guerra civile in una guerra tra virtù e vizi abbia avuto una carriera così lunga; e la statua di Giove che fu innalzata, per caso, proprio il giorno in cui furono lette le lettere dei congiurati.',
          'E le note dei cinque brani del quarto libro si arricchiscono, seguendo lo studio di un lettore: i quattro mestieri diversi che la parola Venere svolge in venti versi, e quale Venere non sia questa - non quella con cui il poema si apre; come l\'amore rovini più del solo innamorato, portandosi via i doveri verso gli altri e il patrimonio di famiglia, e come l\'intero inventario del lusso non risponda a nessun bisogno reale del corpo; dove cada il confine tra guardare qualcuno con generosità e chiamare bello ciò che è brutto; la porta che il libro lascia aperta, dato che a un epicureo si chiede di rinunciare all\'ossessione e non al piacere; e le due cose diverse chiamate amore in questo libro, una che ti capita e una che si costruisce lentamente, che è poi quella in cui si può abitare.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.5', date: '17/09/2026', time: '22:42', tz: 'CEST',
      en: {
        added: [
          'Lucretius opens Book IV, the book about how we know anything at all: five excerpts, taking him to thirty-five.',
          'It starts with the illusions. A square tower seen from far away looks round, because the film of atoms that left it has had its corners knocked off on the way; an oar looks broken where it enters the water; and on a windy night the stars seem to sail the wrong way across the sky. In every case, Lucretius argues, the eye reports exactly what reaches it, and the mistake is added afterwards, by the mind.',
          'Then the answer to the sceptics, which is still the first thing anyone says to them: if you know that nothing can be known, you have contradicted yourself, and if you do not, where did you get the idea of truth from in the first place?',
          'Then twenty lines against the idea that the body was designed: eyes were not given to us so that we could see, because seeing did not exist before eyes did, and the tongue is older than speech. What is born creates its own use. And finally dreams, where lawyers plead in their sleep, sailors go on fighting the wind, Lucretius goes on writing this poem, and anyone who has spent days at the games keeps seeing the dancers for days afterwards.'
        ],
        changed: [
          'The first Catilinarian gets its notes rewritten at length, the first instalment of a job that will work through Cicero\'s older excerpts a speech at a time. All ten now carry the history as well as the rhetoric: the temple Cicero chose because it could be guarded and the empty benches around Catiline; the informer\'s mistress who was selling the plot to the consul; the two precedents for killing a citizen that half of Rome regarded as murders; the debt crisis that was the conspiracy\'s real base; the punishment for parricide, which is the word the fatherland uses; what the executions of 5 December cost Cicero five years later; and how Catiline was found after the battle, far in front of his own line. Each note also ends with a paragraph of grammar.',
          'And the notes for the five Book IV excerpts grow, following a reader\'s study of them: how little the atomic theory has to invent to explain sight, and how the same account then covers every other sense; the train at the platform explained properly, as the relativity of motion plus a decision the brain makes about which thing to call still - with Lucretius\'s own version of it, two ships in a harbour, which he wrote forty-eight lines earlier; the attack on the sceptics set out as a dilemma with no way out, and why their more careful heirs stopped making the claim at all; a sharper account of what the anti-design argument denies, and the one modern idea it stops short of; and the mechanism behind dreams, a mind with nothing to do re-reading the same images, which is the shape of what memory research now calls replay, with atoms where we would put neurons.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Lucrezio apre il quarto libro, quello su come facciamo a sapere qualcosa: cinque brani, che lo portano a trentacinque.',
          'Si comincia dalle illusioni. Una torre quadrata vista da lontano sembra rotonda, perché alla pellicola di atomi che ne è partita sono stati smussati gli angoli lungo il tragitto; un remo sembra spezzato dove entra nell\'acqua; e in una notte ventosa le stelle sembrano navigare nel verso sbagliato attraverso il cielo. In ogni caso, sostiene Lucrezio, l\'occhio riferisce esattamente ciò che gli arriva, e lo sbaglio viene aggiunto dopo, dalla mente.',
          'Poi la risposta agli scettici, che è ancora oggi la prima cosa che si dice loro: se sai che non si può sapere nulla, ti sei contraddetto, e se non lo sai, da dove ti è venuta l\'idea stessa di verità?',
          'Poi venti versi contro l\'idea che il corpo sia stato progettato: gli occhi non ci sono stati dati perché vedessimo, dal momento che il vedere non esisteva prima degli occhi, e la lingua è più antica della parola. Ciò che nasce crea il proprio uso. E infine i sogni, dove gli avvocati arringano nel sonno, i marinai continuano a lottare con il vento, Lucrezio continua a scrivere questo poema, e chi ha passato giornate ai giochi continua a vedere i danzatori per giorni.'
        ],
        changed: [
          'La prima Catilinaria riceve note riscritte per esteso, primo capitolo di un lavoro che riprenderà i brani più vecchi di Cicerone un\'orazione alla volta. Tutte e dieci portano ora la storia oltre alla retorica: il tempio scelto perché si poteva sorvegliare e i banchi vuoti intorno a Catilina; l\'amante dell\'informatore che vendeva la congiura al console; i due precedenti sull\'uccisione di un cittadino che mezza Roma considerava delitti; la crisi dei debiti che era la vera base della congiura; la pena per il parricidio, che è la parola usata dalla patria; quanto costarono a Cicerone, cinque anni dopo, le esecuzioni del 5 dicembre; e come fu ritrovato Catilina dopo la battaglia, molto avanti rispetto ai suoi. Ogni nota si chiude inoltre con un paragrafo di grammatica.',
          'E le note dei cinque brani del quarto libro si arricchiscono, seguendo lo studio di un lettore: quanto poco la teoria atomica debba inventare per spiegare la vista, e come lo stesso discorso copra poi ogni altro senso; il treno sul binario spiegato per davvero, come relatività del movimento più una decisione che il cervello prende su che cosa chiamare fermo - con la versione che ne dà Lucrezio stesso, due navi in un porto, scritta quarantotto versi prima; l\'attacco agli scettici messo in forma di dilemma senza vie d\'uscita, e perché i loro eredi più prudenti smisero del tutto di fare quell\'affermazione; un resoconto più preciso di ciò che l\'argomento contro il progetto nega, e dell\'unica idea moderna a cui non arriva; e il meccanismo dei sogni, una mente senza nulla da fare che rilegge le stesse immagini, che è la forma di ciò che la ricerca sulla memoria chiama oggi replay, con gli atomi dove noi metteremmo i neuroni.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.4', date: '16/09/2026', time: '21:38', tz: 'CEST',
      en: {
        added: [
          'Book III of Lucretius is finished: five more excerpts, the whole end of the book, bringing Lucretius to thirty.',
          'First the things people say at a funeral - no happy house will welcome you, no wife, no children running to snatch a kiss - quoted in full and then answered with the one line the mourners never add: that there is nobody left to miss any of it.',
          'Then Lucretius stops arguing in his own voice and lets Nature speak. She puts a dilemma to the man who weeps at dying: if life pleased you, leave the table like a guest who has eaten his fill; if it did not, why ask for more of the same? And to an old man who complains she is much ruder, before making the argument that answers the whole book: the past before we were born was nothing to us, and that is the mirror of what comes after.',
          'Then Sisyphus, who turns out to be a politician: the candidate who asks the people for the rods and the axes, loses, and starts pushing the same stone up the same hill. And finally the closing lines of the book, the restless rich man who leaves the house, races to his villa as though it were on fire, yawns on the doorstep and drives straight back to the city - running from himself, which is the one thing he cannot leave behind.'
        ],
        changed: [
          'In the note on the earlier excerpt where death is called nothing to us, the mention of Nature\'s speech is now a link to the two excerpts that carry it.',
          'And the notes for the five Book III excerpts grow, following a reader\'s study of them: how the last part of the book works, with every objection quoted in its own voice and then quietly taken apart; why grieving is allowed as long as it ends, which is not the same as being told to feel nothing; death read as a release, with the modern argument about living for ever on the other side of it; the old man in Nature\'s speech identified as the Roman chasing power and money, set against Epicurus\'s three kinds of desire and the one that can never be filled, with The Lorax as an unexpected companion piece; the politician whose stone rolls back whether he wins or loses; and the name for the restlessness that closes the book, taedium vitae, the weariness of a man who is bored the moment he arrives.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Il terzo libro di Lucrezio è finito: altri cinque brani, tutta la parte finale del libro, che portano Lucrezio a trenta.',
          'Prima le cose che si dicono a un funerale - non ti accoglierà più una casa festosa, né la moglie, né i figli che corrono a strapparti un bacio - citate per intero e poi ribattute con l\'unica frase che chi piange non aggiunge mai: che non è rimasto nessuno a sentirne la mancanza.',
          'Poi Lucrezio smette di argomentare con la propria voce e lascia parlare la Natura. Pone un dilemma a chi piange davanti alla morte: se la vita ti è piaciuta, alzati da tavola come un convitato che ha mangiato a sazietà; se non ti è piaciuta, perché chiederne ancora dello stesso? E a un vecchio che si lamenta risponde molto più sgarbatamente, prima di fare il ragionamento che risponde a tutto il libro: il tempo prima che nascessimo non è stato nulla per noi, ed è lo specchio di ciò che verrà dopo.',
          'Poi Sisifo, che si scopre essere un politico: il candidato che chiede al popolo i fasci e le scuri, perde, e ricomincia a spingere lo stesso masso su per la stessa salita. E infine i versi conclusivi del libro, il ricco inquieto che esce di casa, corre alla villa come se fosse in fiamme, sbadiglia sulla soglia e torna subito in città - in fuga da se stesso, l\'unica cosa che non riesce a seminare.'
        ],
        changed: [
          'Nella nota del brano precedente in cui la morte è detta nulla per noi, il rimando al discorso della Natura è ora un collegamento ai due brani che lo contengono.',
          'E le note dei cinque brani del terzo libro si arricchiscono, seguendo lo studio di un lettore: come funziona l\'ultima parte del libro, con ogni obiezione citata con la voce di chi la fa e poi smontata con calma; perché è lecito soffrire purché il dolore finisca, che non è come dire di non provare nulla; la morte letta come una liberazione, con dall\'altra parte il dibattito moderno sul vivere per sempre; il vecchio del discorso della Natura riconosciuto come il romano che insegue potere e denaro, messo a confronto con le tre specie di desideri di Epicuro e con quella che non si può mai riempire, e con The Lorax come compagno inatteso; il politico il cui masso rotola giù sia che vinca sia che perda; e il nome dell\'inquietudine con cui il libro si chiude, taedium vitae, la noia di chi si annoia appena arriva.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.3', date: '16/09/2026', time: '18:32', tz: 'CEST',
      en: {
        added: [
          'Book III of Lucretius begins, the book on the soul and on death: five excerpts, bringing Lucretius to twenty-five.',
          'It opens with the second praise of Epicurus - the man who raised a light out of such great darkness - whom Lucretius follows the way a swallow follows swans, feeding on his words as bees feed on flowers. Then the vision that follows: the terrors of the mind scatter, the walls of the world open, the quiet homes of the gods appear, and where the underworld should be there is nothing at all. The sight brings him a godlike pleasure and a shudder at once.',
          'Then the diagnosis the whole book rests on: greed and ambition, the crimes people commit for money and office, are fed by the fear of death, because poverty feels like standing at the gates of death. Then fear seen from inside the body - sweat, pallor, a stammering tongue, ringing ears, legs giving way - used as proof that mind and body are one thing. And finally the sentence the book exists for: death is nothing to us, no more than the war with Hannibal was, which raged before we were born and never troubled us at all.'
        ],
        changed: [
          'The oldest notes in the app get their turn. Every excerpt of Varro (eleven) and of Cornelius Nepos (eight) still carried the short commentary written when the app was young; all nineteen are rewritten at full length, in English and in Italian, each opening by saying where in the work you are. Varro now comes with the proscription he survived, the twelve farming gods and their festivals, the bird-named speakers of his dialogue on aviaries, the hexagon of the honeycomb and how long it took to prove, and the great ancient quarrel over whether language should follow rules or usage. Nepos comes with the Athens that burned before Salamis, the boy Hannibal at the altar, the letter pushed unread under a cushion at Thebes, the spearhead a dying general would not pull out, and the friend of Cicero who stayed friends with every side in the civil wars. Catullus and Sallust are deliberately left for later.',
          'Visits to the site are now counted, so it is possible to see which authors people actually open. A small bar asks first: nothing is sent to Google, and none of Google\'s code is even downloaded, unless you accept it. Rejecting is one click, the answer is remembered, and a link in the footer changes it later. Accepting also allows the age, interests and rough location of readers to be estimated, which is the part Google works out by recognising signed-in Google accounts, so the bar now says that plainly.',
          'And the notes for the five Book III excerpts grow, following a reader\'s study of them: the praise of Epicurus read beside the opening hymn to Venus, both of them reciting the deeds of their subject the way Greek hymns recited the deeds of a god - Venus the mother who makes the world, Epicurus the father who makes it understandable; the vision of the open universe as a summary of the whole doctrine, and its shudder explained as the shock of seeing how small you are in it, which is the reason Book III has to answer for death; the fear of death shown to be the strongest fear of all, strong enough to pull a society apart; the proof that the soul is atoms and therefore mortal; and the reassurance that follows from it, with Nature\'s own speech held in reserve for anyone still unconvinced.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Comincia il terzo libro di Lucrezio, il libro sull\'anima e sulla morte: cinque brani, che portano Lucrezio a venticinque.',
          'Si apre con il secondo elogio di Epicuro - l\'uomo che innalzò una luce da tenebre così grandi - che Lucrezio segue come una rondine segue i cigni, nutrendosi delle sue parole come le api si nutrono dei fiori. Poi la visione che ne segue: i terrori dell\'animo si dileguano, le mura del mondo si aprono, appaiono le dimore tranquille degli dèi, e dove dovrebbe esserci l\'oltretomba non c\'è nulla. Lo spettacolo gli dà insieme un piacere divino e un brivido.',
          'Poi la diagnosi su cui poggia tutto il libro: l\'avidità e l\'ambizione, i delitti che si commettono per il denaro e per le cariche, si nutrono della paura della morte, perché la povertà sembra stare davanti alle porte della morte. Poi la paura vista da dentro il corpo - sudore, pallore, lingua che s\'inceppa, orecchie che ronzano, gambe che cedono - usata come prova che mente e corpo sono una cosa sola. E infine la frase per cui il libro esiste: la morte non è nulla per noi, non più di quanto lo fosse la guerra contro Annibale, che infuriò prima che nascessimo e non ci turbò affatto.'
        ],
        changed: [
          'Tocca alle note più vecchie dell\'app. Ogni brano di Varrone (undici) e di Cornelio Nepote (otto) portava ancora il commento breve scritto quando l\'app era agli inizi; tutti e diciannove sono riscritti per esteso, in italiano e in inglese, e ognuno si apre dicendo in che punto dell\'opera ci si trova. Varrone arriva ora con la proscrizione a cui sopravvisse, i dodici dèi dell\'agricoltura e le loro feste, gli interlocutori con nomi di uccelli del suo dialogo sulle uccelliere, l\'esagono del favo e quanto tempo ci volle per dimostrarlo, e la grande disputa antica se la lingua debba seguire le regole o l\'uso. Nepote arriva con l\'Atene che brucia prima di Salamina, il piccolo Annibale all\'altare, la lettera infilata non letta sotto un cuscino a Tebe, la punta di lancia che un generale morente non volle estrarre, e l\'amico di Cicerone che restò amico di tutte le parti nelle guerre civili. Catullo e Sallustio sono lasciati per dopo, di proposito.',
          'Le visite al sito ora vengono contate, così si può vedere quali autori vengono aperti davvero. Una piccola barra lo chiede prima: senza il tuo consenso non viene inviato nulla a Google, e il codice di Google non viene nemmeno scaricato. Rifiutare è questione di un clic, la risposta viene ricordata, e un link nel fondo pagina permette di cambiarla. Accettando si consente anche di stimare età, interessi e provenienza di chi legge, la parte che Google ricava riconoscendo gli account Google con cui si naviga, e la barra ora lo dice chiaramente.',
          'E le note dei cinque brani del terzo libro si arricchiscono, seguendo lo studio di un lettore: l\'elogio di Epicuro letto accanto all\'inno a Venere dell\'inizio, entrambi costruiti come il racconto delle imprese del loro protagonista, allo stesso modo degli inni greci per un dio - Venere la madre che crea il mondo, Epicuro il padre che lo rende comprensibile; la visione dell\'universo aperto come riassunto dell\'intera dottrina, e il brivido spiegato come la scossa di accorgersi di quanto si sia piccoli al suo interno, che è la ragione per cui il terzo libro deve rispondere della morte; la paura della morte mostrata come la più forte di tutte, tanto forte da smontare una società; la prova che l\'anima è fatta di atomi e dunque mortale; e la rassicurazione che ne deriva, con il discorso della Natura tenuto in serbo per chi non fosse ancora convinto.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.2', date: '15/09/2026', time: '17:52', tz: 'CEST',
      en: {
        added: [
          'Book II of Lucretius is finished: five more excerpts close it at ten, and bring Lucretius to twenty.',
          'A calf is sacrificed at a temple, and its mother searches the woods and returns to the empty stall again and again, and nothing in nature can comfort her - the most moving page of the book, and an argument that no two atoms, like no two animals, are the same. Then the gods who want nothing from us and the earth that feels nothing, with a surprising tolerance: call the sea Neptune and bread Ceres if you like, as long as your mind is free of superstition.',
          'Then the sky as our father and the earth as our mother, and death as the breaking up of a combination rather than the end of matter; the sky imagined as seen for the first time, and the habit that stops anyone looking up - Lucretius preparing his reader for the idea that ours is not the only world; and the last lines of the book, an old farmer who thinks the gods have abandoned him, when in fact the world itself is growing old.'
        ],
        changed: [
          'On the era pages, every author button now has a coloured outline round the whole card: red for the mainstream authors and gold for the secondary ones. In the Archaic Era, Livius Andronicus, Naevius, Ennius, Plautus, Cato, Terence and Lucilius are mainstream, and Caecilius Statius, Pacuvius and Accius, and Pomponius and Novius are secondary. In Caesar\'s Age, Cicero, Caesar, Lucretius, Sallust and Catullus are mainstream, and Varro, Nepos, Hortensius, Nigidius Figulus and Hirtius are secondary.',
          'And the notes for the five new Book II excerpts grow, following a reader\'s study of them: the cow\'s grief as a two-thousand-year-early insight that no two creatures are exact copies, and superstition\'s animal victims; naming the gods as harmless and sacrifice as the real impiety; the frightening thought that we are only temporary gatherings of atoms, which Book III will answer; why the thought experiment about the sky waits for the infinite worlds, and what the next lines of the poem say; and the old farmer\'s ageing world - cosmology anticipated, soil science not, and a sour ending that may never have been revised.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Il secondo libro di Lucrezio è completo: altri cinque brani lo chiudono a dieci, e portano Lucrezio a venti.',
          'Un vitello viene sacrificato davanti a un tempio, e sua madre lo cerca per i boschi e torna più e più volte alla stalla vuota, e nulla nella natura riesce a consolarla: la pagina più commovente del libro, e un argomento sul fatto che non esistono due atomi uguali, come non esistono due animali uguali. Poi gli dèi che non vogliono nulla da noi e la terra che non sente nulla, con una tolleranza sorprendente: chiamate pure il mare Nettuno e il pane Cerere, purché la mente sia libera dalla superstizione.',
          'Poi il cielo come nostro padre e la terra come nostra madre, e la morte come lo scioglimento di una combinazione e non la fine della materia; il cielo immaginato come visto per la prima volta, e l\'abitudine che impedisce a chiunque di alzare lo sguardo - Lucrezio che prepara il lettore all\'idea che il nostro non sia l\'unico mondo; e gli ultimi versi del libro, un vecchio contadino convinto che gli dèi lo abbiano abbandonato, quando in realtà è il mondo stesso a invecchiare.'
        ],
        changed: [
          'Nelle pagine delle epoche, ogni pulsante di autore ha ora un bordo colorato attorno all\'intera scheda: rosso per gli autori principali e oro per quelli secondari. Nell\'Età arcaica sono principali Livio Andronico, Nevio, Ennio, Plauto, Catone, Terenzio e Lucilio, e secondari Cecilio Stazio, Pacuvio e Accio, e Pomponio e Novio. Nell\'Età di Cesare sono principali Cicerone, Cesare, Lucrezio, Sallustio e Catullo, e secondari Varrone, Nepote, Ortensio, Nigidio Figulo e Irzio.',
          'E le note dei cinque nuovi brani del secondo libro si arricchiscono, seguendo lo studio di un lettore: il dolore della vacca come intuizione, con duemila anni di anticipo, che non esistono due creature identiche, e le vittime animali della superstizione; dare nomi agli dèi come cosa innocua e il sacrificio come vera empietà; il pensiero spaventoso di essere soltanto aggregati temporanei di atomi, a cui risponderà il terzo libro; perché l\'esperimento mentale sul cielo aspetta i mondi infiniti, e che cosa dicono i versi successivi del poema; e il mondo che invecchia del vecchio contadino - la cosmologia anticipata, la scienza del suolo no, e un finale amaro che forse non fu mai rivisto.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.1', date: '14/09/2026', time: '15:35', tz: 'CEST',
      en: {
        added: [
          'Book II of Lucretius begins: five more excerpts from De Rerum Natura, the first half of the book, bringing Lucretius to fifteen.',
          'The opening of the book, one of the most quoted passages in Latin: it is sweet to watch a shipwreck from the shore - not because anyone suffers, but because you see what you are free from - and sweetest of all to look down from the calm heights of philosophy on people exhausting themselves for money and power. Then the pity that follows: all nature asks for is a body without pain and a mind without fear, and golden statues holding lamps at a banquet add nothing to a picnic on the grass by a stream.',
          'Then the physics of motion: dust swirling in a beam of sunlight as a model of atoms at war forever, the idea behind the way atoms were finally proved real two thousand years later; the swerve, the tiny unpredictable sidestep without which no atom would ever meet another; and free will, a will wrested from fate, argued in a single question ten verses long.'
        ],
        changed: [
          'The Catullus page now shows two sections that had never appeared in the app: the Neoteroi, the young poets who wrote about everything, and brief notes on the other poets of his circle - Calvus, Bibaculus, Cinna and Cornificius - in English and in Italian.',
          'And the notes for the five new excerpts of Book II grow, following a reader\'s close study of the passages: the three kinds of desire and why power, riches and glory are to be avoided; what the picnic on the grass shows you need, and the luxuries show you don\'t; why atoms fight like armies; the swerve as a chain reaction and a natural property of atoms rather than a patch, with Lucretius arriving at Galileo\'s law of falling bodies some seventeen centuries early; and free will as the difference between an atom\'s swerve and ours.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Comincia il secondo libro di Lucrezio: altri cinque brani dal De Rerum Natura, la prima metà del libro, che portano Lucrezio a quindici.',
          'L\'inizio del libro, uno dei passi più citati della letteratura latina: è dolce guardare un naufragio dalla riva - non perché qualcuno soffra, ma perché si vede da che cosa si è liberi - e dolcissimo guardare dalle altezze serene della filosofia la gente che si consuma per il denaro e il potere. Poi la pietà che segue: la natura chiede solo un corpo senza dolore e una mente senza paura, e le statue d\'oro che reggono lampade a un banchetto non aggiungono nulla a un pranzo sull\'erba accanto a un ruscello.',
          'Poi la fisica del movimento: la polvere che turbina in un raggio di sole come modello di atomi in guerra per sempre, l\'idea su cui duemila anni dopo si dimostrò che gli atomi esistono; la deviazione, il minimo spostamento imprevedibile senza il quale nessun atomo ne incontrerebbe mai un altro; e il libero arbitrio, una volontà strappata al fato, argomentato in un\'unica domanda lunga dieci versi.'
        ],
        changed: [
          'La pagina di Catullo mostra ora due sezioni che nell\'app non erano mai comparse: i Neoteroi, i giovani poeti che scrivevano di tutto, e brevi note sugli altri poeti della sua cerchia - Calvo, Bibaculo, Cinna e Cornificio - in italiano e in inglese.',
          'E le note dei cinque nuovi brani del secondo libro si arricchiscono, seguendo lo studio attento di un lettore: i tre tipi di desiderio e perché potere, ricchezza e gloria vanno evitati; ciò di cui il pranzo sull\'erba mostra che si ha bisogno, e ciò di cui i lussi mostrano che non si ha bisogno; perché gli atomi combattono come eserciti; la deviazione come reazione a catena e proprietà naturale degli atomi invece che una toppa, con Lucrezio che arriva alla legge di Galileo sulla caduta dei gravi circa diciassette secoli prima; e il libero arbitrio come differenza tra la deviazione di un atomo e la nostra.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.14.0', date: '13/09/2026', time: '16:43', tz: 'CEST',
      en: {
        added: [
          'Lucretius arrives: ten excerpts from De Rerum Natura, the whole of Book I - the first step of a plan to carry sixty passages across the poem\'s six books, ten from each. The poem is chosen book by book, the way Caesar is.',
          'The book opens as the poem does, with the hymn to Venus in two parts: the goddess who makes the winds drop and every animal on earth follow her, and then Venus holding Mars, the god of war, in her lap, asked for peace for a Rome at war with itself.',
          'Then the twelve lines most websites leave out: Lucretius telling Memmius to clear his mind, promising to explain the whole universe, and giving five different Latin names for the atom, because Latin had no word for it. The Latin Library prints them further down the page than they belong, and Splash Latino skips them.',
          'Then the Greek who looked up - Epicurus, never named, raising his eyes against a Religion leaning down from the sky and marching out beyond the flaming walls of the world - and the girl sacrificed for a fleet, with the line people have quoted for two thousand years: so great were the evils religion could persuade men to.',
          'And the rest of the book: why Latin is too poor a language for Greek philosophy, and why he writes it anyway; nothing comes from nothing; the ring on your finger that gets thinner every year, and the bronze hands of statues worn away by people touching them as they pass; honey smeared on the rim of a cup of bitter medicine, the image Tasso borrowed for the opening of the Gerusalemme liberata; and a spear thrown from the edge of the universe.'
        ],
        changed: [
          'Poetry now carries numbers as well. The Latin stays one line per verse, and each sentence opens with the number of the verse it begins on, in the Latin and in both translations, so you can find your place in the English or the Italian as easily as in a chapter of Caesar.',
          'Iphigenia at Aulis, the one passage of Lucretius the app had carried since the beginning, is rebuilt in the same way: numbered, translated again against the Latin, and with a longer note.',
          'Where the editors have moved a line of Lucretius out of its manuscript position, the excerpt says so, and prints the verse numbers in the order you actually read them.',
          'Lucretius is cited as the poetry he is: book and verses, as in De Rerum Natura I, vv. 1-20, and the notes now speak of verses wherever they had spoken of sections - including the notes on Cicero that point to the poem.',
          'Two verse numbers in Book I are corrected: the herds of the hymn to Venus start on verse 14 and the two promises of nothing comes from nothing on verse 155, counting the verses in the order you read them, as printed editions do. A new check confirms that every number sits on its verse and that every line matches the Latin text exactly.',
          'In the translations of Lucretius, each block now shows the verses it covers - 1-9, 10-13, 14-16 - so you can see at a glance how much Latin each paragraph of English or Italian translates.',
          'The notes now say what religio means for Lucretius - not religion as we use the word, but superstition - and add much more to all ten excerpts: Venus as the force that joins atoms and pleasure as the Epicurean goal; Mars as Strife, and the plague that ends the poem; Botticelli; why an Epicurean asks a politician to act; the new language Latin had to invent; Livius Andronicus; Democritus; the irony of a poem written to be easy; and the verses lost at the end of Book I.',
          'The Lucretius page gets back its section on the myth of Lucretian pessimism, which had never been shown in English.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Arriva Lucrezio: dieci brani dal De Rerum Natura, tutto il primo libro, il primo passo di un piano che prevede sessanta brani nei sei libri del poema, dieci per libro. Il poema si sceglie libro per libro, come Cesare.',
          'Il libro si apre come il poema, con l\'inno a Venere in due parti: la dea che fa cadere i venti e si fa seguire da ogni animale della terra, e poi Venere che tiene in grembo Marte, il dio della guerra, e a cui si chiede la pace per una Roma in guerra con se stessa.',
          'Poi i dodici versi che quasi tutti i siti tralasciano: Lucrezio che dice a Memmio di sgombrare la mente, promette di spiegare l\'intero universo, e dà cinque nomi latini diversi per l\'atomo, perché il latino non aveva una parola per dirlo. The Latin Library li stampa più in basso nella pagina di dove dovrebbero stare, e Splash Latino li salta.',
          'Poi il Greco che alzò lo sguardo - Epicuro, mai nominato, che leva gli occhi contro una Religione affacciata dal cielo e marcia oltre le mura fiammeggianti del mondo - e la fanciulla sacrificata per una flotta, con il verso che si cita da duemila anni: a tanto male poté indurre la religione.',
          'E il resto del libro: perché il latino è una lingua troppo povera per la filosofia greca, e perché Lucrezio la scrive comunque; nulla nasce dal nulla; l\'anello al dito che si assottiglia ogni anno, e le mani di bronzo delle statue consumate da chi le tocca passando; il miele spalmato sull\'orlo di un bicchiere di medicina amara, l\'immagine che Tasso riprese all\'inizio della Gerusalemme liberata; e una lancia scagliata dal confine dell\'universo.'
        ],
        changed: [
          'Anche la poesia ora ha i suoi numeri. Il latino resta un verso per riga, e ogni frase si apre con il numero del verso da cui comincia, nel latino e in entrambe le traduzioni, così si ritrova il punto nell\'italiano o nell\'inglese con la stessa facilità che in un capitolo di Cesare.',
          'Ifigenia ad Aulide, l\'unico passo di Lucrezio che l\'app portava fin dall\'inizio, è ricostruito allo stesso modo: numerato, tradotto di nuovo sul latino, e con una nota più lunga.',
          'Dove gli editori hanno spostato un verso di Lucrezio dalla sua posizione nei manoscritti, il brano lo dice, e stampa i numeri dei versi nell\'ordine in cui li si legge davvero.',
          'Lucrezio è citato come la poesia che è: libro e versi, come in De Rerum Natura I, vv. 1-20, e le note ora parlano di versi dovunque parlavano di sezioni, comprese le note su Cicerone che rimandano al poema.',
          'Corretti due numeri di verso nel primo libro: le greggi dell\'inno a Venere cominciano al verso 14 e le due promesse del nulla nasce dal nulla al verso 155, contando i versi nell\'ordine in cui si leggono, come fanno le edizioni a stampa. Un nuovo controllo conferma che ogni numero sta sul suo verso e che ogni riga corrisponde esattamente al testo latino.',
          'Nelle traduzioni di Lucrezio ogni blocco ora indica i versi che copre - 1-9, 10-13, 14-16 - così si vede subito quanto latino traduce ogni paragrafo in italiano o in inglese.',
          'Le note ora spiegano che cosa significa religio per Lucrezio - non la religione come intendiamo noi la parola, ma la superstizione - e si arricchiscono in tutti e dieci i brani: Venere come la forza che unisce gli atomi e il piacere come fine epicureo; Marte come la Contesa, e la peste che chiude il poema; Botticelli; perché un epicureo chiede a un politico di agire; la lingua nuova che il latino dovette inventare; Livio Andronico; Democrito; l\'ironia di un poema scritto per essere facile; e i versi perduti alla fine del primo libro.',
          'La pagina di Lucrezio ritrova, in inglese, la sezione sul mito del pessimismo lucreziano, che non era mai stata mostrata.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.13.3', date: '12/09/2026', time: '23:03', tz: 'CEST',
      en: {
        added: [
          'Eleven more excerpts from the Bellum Alexandrinum, which finish it at twenty-five - and finish Hirtius at forty-five, the whole of his eighth book of the Gallic War and the whole of the Alexandrian War. With them the Corpus Caesarianum is complete, as far as this app goes: everything Caesar wrote, and everything written to finish it that the app is going to carry.',
          'The book leaves Egypt for the rest of the Roman east, where the son of Mithridates had used the civil war to take back his father\'s kingdom. His envoys bring gifts and are sent away; his ambush in a mountain pass is built to work whether the Roman general arrives as a friend or as an enemy; and at Nicopolis - Victory City, founded by Pompey on the spot where he beat Mithridates - a Caesarian army is beaten, and its one Roman legion closes into a ring and walks backwards to the mountains.',
          'Then the Dalmatian coast: a former consul who marches in midwinter with no supplies and no loyal province and is ground down by a war he cannot choose - with three possible reasons for his mistake, and no attempt to pick one - and then a fleet of rowing boats that wins by ramming the enemy flagship and turning a sea battle into a fight between soldiers, while the enemy admiral escapes by swimming, exactly as Caesar had at Alexandria a few months before.',
          'Then Spain, and a governor Caesar himself appointed. He is hated by his province and buys the love of his army instead; he is knifed in the basilica at Corduba by a man pretending to hand him a petition, in words Suetonius would use almost exactly for the Ides of March; he is sorry to hear of Pharsalus, because the end of the war means the end of his licence; he cancels his debts by ordering his creditors to write them off; and he sails for home out of season with his plunder and drowns at the mouth of the Ebro - his reasons for sailing given three times: as he told it, as his friends told it, and as everyone else believed.',
          'And last, Zela. The king of Pontus leads his whole army down a ravine and up the hill where Caesar\'s men are digging, and Caesar laughs at it until it arrives. Caught unprepared, he calls his men from the work with the same list of orders he had written about his own worst morning in Gaul, and the narrator gives the victory to the gods, where planning had failed. The next day Caesar is filled with incredible joy at the speed of it - and, more quietly, at having come through it. It is the morning behind I came, I saw, I conquered, which is not in the text.',
          'The notes follow the rules the last batch taught. Hirtius is named as the author, with the Spanish chapters flagged as the ones most likely to rest on other men\'s reports. Every excerpt opens with where and when you are. And the comparison with Caesar is made where the difference is largest: the lists of possible motives Caesar never offers, a moral portrait of one of his own governors in the manner of Sallust, Caesar shown laughing at an attack that was real, and a victory handed to the gods.'
        ],
        changed: [
          'Three faults in the source text are corrected and recorded - a letter missing, a letter doubled, a letter dropped. This time they were found by comparing every chosen chapter word by word with the new critical edition of the book, rather than by guessing where typos might be.',
          'All eleven carry the subsection numbers from the start, from the same critical edition as the last batch.',
          'When you share a link to the app - in a chat, on social media, in an email - it now shows a proper preview card with the app\'s own picture, a title and a one-line description, instead of a bare address.',
          'Translation fixes from a proofread and a full grammar pass over all eleven: a preposition in the Italian of the stabbing at Corduba; a he that could have meant either general, now named; an Italian verb that meant to outflank where it should have meant to move about; a relative clause that had drifted away from its noun; a current that stopped the ship turning, not one it was turned against; the king\'s soldiers, not Caesar\'s, crowding into the ravine at Zela; and a sentence about slaves mistaken for soldiers put back into an order you can follow.',
          'And the notes for all eleven: why a perfect trap fails against a general who will not move blindly; whom the defeat at Nicopolis is blamed on, and why it was still a real disaster; a winter march as a blunder, and courage turning into overconfidence; a victory won on one throw, with Machiavelli on fortune; why buying an army cannot save a hated governor; the two men named Quintus Cassius in the same chapter, told apart at last; greed written to be despised; a death that is the result of a decision, not of bad luck, beside the career of Sallust himself; the longest sentence in the book; the gods as a tactful way of explaining a late order; and the criticism hidden inside Caesar\'s relief.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Altri undici brani dal Bellum Alexandrinum, che lo concludono a venticinque, e concludono Irzio a quarantacinque: tutto il suo ottavo libro della guerra gallica e tutta la guerra alessandrina. Con loro il Corpus Caesarianum è completo, per quanto riguarda quest\'app: tutto ciò che Cesare scrisse, e tutto ciò che fu scritto per completarlo e che l\'app porterà.',
          'Il libro lascia l\'Egitto per il resto dell\'oriente romano, dove il figlio di Mitridate aveva approfittato della guerra civile per riprendersi il regno del padre. I suoi ambasciatori portano doni e vengono rimandati indietro; il suo agguato in un passo di montagna è costruito per funzionare sia che il generale romano arrivi da amico sia che arrivi da nemico; e a Nicopoli - la Città della Vittoria, fondata da Pompeo nel luogo in cui aveva battuto Mitridate - un esercito cesariano viene sconfitto, e la sua unica legione romana si chiude in cerchio e arretra fino ai monti.',
          'Poi la costa dalmata: un ex console che marcia in pieno inverno senza rifornimenti e senza una provincia fedele e viene logorato da una guerra che non può scegliere - con tre ragioni possibili del suo errore, e nessun tentativo di sceglierne una - e poi una flotta di barche a remi che vince speronando l\'ammiraglia nemica e trasformando una battaglia navale in uno scontro fra soldati, mentre l\'ammiraglio nemico si salva a nuoto, esattamente come aveva fatto Cesare ad Alessandria pochi mesi prima.',
          'Poi la Spagna, e un governatore nominato da Cesare in persona. È odiato dalla sua provincia e si compra invece l\'affetto dell\'esercito; viene pugnalato nella basilica di Cordova da un uomo che finge di consegnargli una supplica, con parole che Svetonio userà quasi identiche per le Idi di marzo; è dispiaciuto per la notizia di Farsalo, perché la fine della guerra è la fine della sua licenza; cancella i propri debiti ordinando ai creditori di registrarli come restituiti; e salpa per casa fuori stagione con il suo bottino e annega alla foce dell\'Ebro, con le ragioni del viaggio date tre volte: come le raccontava lui, come le raccontavano gli amici, e come le credevano tutti gli altri.',
          'E infine Zela. Il re del Ponto porta tutto il suo esercito giù per una gola e su per il colle dove gli uomini di Cesare stanno scavando, e Cesare ne ride finché non gli arriva addosso. Colto impreparato, richiama i suoi dal lavoro con lo stesso elenco di ordini che aveva scritto per la sua peggiore mattina in Gallia, e il narratore attribuisce la vittoria agli dèi, là dove la pianificazione era fallita. Il giorno dopo Cesare è preso da una gioia incredibile per la rapidità della cosa, e, più in silenzio, per esserne uscito. È la mattina che sta dietro a venni, vidi, vinsi, che nel testo non c\'è.',
          'Le note seguono le regole insegnate dal gruppo precedente. Irzio è nominato come autore, e i capitoli spagnoli sono segnalati come quelli che più probabilmente poggiano su resoconti altrui. Ogni brano si apre dicendo dove e quando ci si trova. E il confronto con Cesare è fatto dove la differenza è maggiore: gli elenchi di moventi possibili che Cesare non offre mai, il ritratto morale di uno dei suoi governatori alla maniera di Sallustio, Cesare mostrato mentre ride di un attacco che era vero, e una vittoria attribuita agli dèi.'
        ],
        changed: [
          'Tre errori del testo di partenza sono corretti e registrati: una lettera mancante, una raddoppiata, una caduta. Questa volta sono stati trovati confrontando parola per parola ogni capitolo scelto con la nuova edizione critica del libro, invece di tirare a indovinare dove potessero essere i refusi.',
          'Tutti e undici portano fin dall\'inizio i numeri di paragrafo, dalla stessa edizione critica del gruppo precedente.',
          'Quando condividi un link all\'app, in una chat, sui social o in una email, ora compare una vera anteprima con l\'immagine dell\'app, un titolo e una descrizione di una riga, invece del semplice indirizzo.',
          'Correzioni di traduzione da una rilettura e da un controllo grammaticale completo di tutti e undici: una preposizione nell\'italiano delle pugnalate di Cordova; un egli che poteva indicare l\'uno o l\'altro generale, ora chiamato per nome; un verbo che voleva dire aggirare dove doveva dire circolare; una relativa scivolata lontano dal suo nome; una corrente che impediva di girare la nave, non una contro cui girarla; i soldati del re, e non di Cesare, ammassati nella gola di Zela; e una frase sugli schiavi scambiati per soldati rimessa in un ordine che si segue.',
          'E le note per tutti e undici: perché una trappola perfetta fallisce contro un generale che non si muove alla cieca; a chi viene attribuita la sconfitta di Nicopoli, e perché fu comunque un disastro vero; una marcia d\'inverno come errore, e il coraggio che diventa presunzione; una vittoria vinta su un solo tiro, con Machiavelli sulla fortuna; perché comprarsi un esercito non salva un governatore odiato; i due Quinto Cassio dello stesso capitolo, finalmente distinti; un\'avidità scritta per essere disprezzata; una morte che è l\'esito di una decisione e non della sfortuna, accanto alla carriera di Sallustio stesso; la frase più lunga del libro; gli dèi come modo discreto di spiegare un ordine dato in ritardo; e la critica nascosta nel sollievo di Cesare.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.13.2', date: '10/09/2026', time: '18:57', tz: 'CEST',
      en: {
        added: [
          'Twelve excerpts from the Bellum Alexandrinum, the account of the six months Caesar spent besieged inside Alexandria. It is the third of the four books other men wrote to finish his work, and probably the same hand that wrote the eighth book of the Gallic War. Two chapters of it have been in the app since launch; these twelve cover the Egyptian war proper, and the rest of the book follows in the next release.',
          'It opens with a fact about the city. Alexandria has no spring anywhere in it: the whole place drinks Nile water piped into cellars, where it stands until the mud settles out, and the poor drink it muddy and get sick. An enemy engineer works out what that means, blocks the channels, and starts pumping sea water uphill into the Roman quarter with wheels and machinery. What follows is the best-observed scene in the book - the soldiers notice a taste before they understand anything, do not quite believe themselves, and go round the streets tasting each other\'s water to work out what is happening to them.',
          'Then the panic, and the argument that ends it. Half the army wants to run for the ships; the other half is more frightened, because you cannot evacuate secretly with the enemy that close. Caesar answers with geology - every coast has fresh water under it, dig - and then with arithmetic: flight is the more dangerous choice even for a man who cares about nothing except staying alive, because boarding takes time and the enemy knows every street. They dug, and found water in one night.',
          'Then the sea fight, and a Rhodian admiral who asks to take four ships into the shallows first and hold the whole enemy fleet until the rest can form up - and who gets a paragraph of direct speech, which almost nobody in ten books of Caesar does. The whole city, both sides, climbs onto the roofs to watch. And the chapter after it says the quiet thing: the two fleets were not playing for the same stakes, and it was a wretched business that a few men should decide the survival of everybody, while their friends who had chosen them stood on the beach and could do nothing.',
          'Then the worst day. The attack on the causeway collapses, Caesar holds the line until everyone else has gone, gets into his boat, sees that it is about to be swamped, throws himself out and swims to the ships - and then sends small boats back and saves a number of men. Four hundred legionaries died there, and rather more sailors and rowers, who are not counted as carefully.',
          'Then the Alexandrians ask for their fifteen-year-old king back. Caesar hands him over knowing it is probably a trick, because fighting a king is more honourable than fighting a mob; the boy weeps and begs not to be sent away, is sent, and makes war at once. Caesar\'s own officers were pleased he had been made a fool of. And then the last battle, in the delta, where the defenders came down off their strongest position partly to fight and partly to watch, and lost it; the king drowned; and the city came out to meet Caesar wearing the clothes it kept for begging mercy from its own kings.',
          'It ends with the settlement: the throne to Cleopatra and her surviving brother, the other sister deported so that nobody can rule in her name, and an occupying army left behind for a reason stated without any embarrassment at all - if the rulers stay loyal the garrisons protect them, and if they turn ungrateful the same garrisons can hold them down.'
        ],
        changed: [
          'Three faults in the source text are corrected and recorded, and two of them turned out to be part of a pattern. The mirror this app takes its Latin from silently drops the letter-sequence xpos: it prints eceret where the text reads exposceret and euerat where it reads exposuerat, and the same fault appears twenty-seven times across the cached Caesar and Cicero. The third is a plain typo, Caerari for Caesari.',
          'All twelve now carry the bold subsection numbers, in the Latin and in both translations. When the batch first went out they had none, because no reachable edition seemed to divide this book - but the newest critical edition of the Bellum Alexandrinum, edited by Cynthia Damon and published openly online, numbers every section, and it agrees exactly with the old markers of the first two chapters. Its notes on the text now also explain what the daggers and brackets in the Latin are doing.',
          'The author is now named. The Bellum Alexandrinum carries no author\'s name and has been argued over since antiquity, but it is most likely Hirtius\'s, and very close in style to the eighth book of the Gallic War - so every note now calls the author Hirtius. One paragraph, on the first chapter, says plainly that this is the likeliest attribution rather than a proven one, and the chapters that sound least like him say so. And the eighth book of the Gallic War, which is certainly his, is no longer referred to as the work of a continuator.',
          'Translation fixes: should where modern English says would; race rather than breed for people; a word in the scene with the weeping boy king that meant restrained but read like nothing at all; a phrase about the Alexandrians being arrogant in victory that had been construed the wrong way round; Caesar\'s state of mind, which is now his hesitation, as every repair of the damaged Latin requires; and one more ablative absolute that had been left standing beside its sentence.',
          'And the notes for all twelve: the city\'s drinking water as a map of its inequality; the enemy engineer who nearly beat Caesar with water, and a poisoning slow enough that nobody could notice it in time; why Caesar never reports his own soldiers accusing him of dithering; the speech as a chain of fallbacks with every exit sealed; a Greek admiral praised in Roman terms; a victory with zero Roman losses that deserves a raised eyebrow; Pompey leaving his line at Pharsalus against Caesar staying in his; six hostile words for the Alexandrians in a single chapter; the one chapter that sounds least like Hirtius; a war lost by men who went down to watch; a compliment Caesar could never have paid himself; and the only place in the corpus where Roman policy is justified by the dignity of our empire.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Dodici brani dal Bellum Alexandrinum, il racconto dei sei mesi che Cesare passò assediato dentro Alessandria. È il terzo dei quattro libri che altri scrissero per finire la sua opera, e probabilmente della stessa mano dell\'ottavo libro della guerra gallica. Due suoi capitoli sono nell\'app fin dall\'inizio; questi dodici coprono la guerra egiziana vera e propria, e il resto del libro arriva nella prossima versione.',
          'Si apre con un dato sulla città. Alessandria non ha una sola sorgente: tutta la città beve acqua del Nilo incanalata nelle cisterne, dove riposa finché il fango non si deposita, e i poveri la bevono torbida e si ammalano. Un ingegnere nemico capisce che cosa questo comporti, sbarra i condotti e comincia a pompare acqua di mare in salita nel quartiere romano con ruote e macchinari. Quel che segue è la scena meglio osservata del libro: i soldati notano un sapore prima di capire alcunché, non credono bene a se stessi, e vanno per le strade ad assaggiare l\'acqua gli uni degli altri per capire che cosa stia succedendo loro.',
          'Poi il panico, e l\'argomento che lo chiude. Metà dell\'esercito vuole correre alle navi; l\'altra metà ha più paura, perché non si evacua di nascosto con il nemico così vicino. Cesare risponde con la geologia - ogni costa ha acqua dolce sotto, scavate - e poi con l\'aritmetica: la fuga è la scelta più pericolosa perfino per chi non pensa ad altro che a restare vivo, perché imbarcarsi richiede tempo e il nemico conosce ogni strada. Scavarono, e in una notte trovarono acqua.',
          'Poi lo scontro navale, e un ammiraglio rodio che chiede di entrare per primo nei bassifondi con quattro navi e di tenere l\'intera flotta nemica finché le altre non si schierino; e che ottiene un intero paragrafo di discorso diretto, cosa che in dieci libri di Cesare non tocca quasi a nessuno. Tutta la città, da entrambe le parti, sale sui tetti a guardare. E il capitolo successivo dice la cosa che di solito si tace: le due flotte non giocavano per la stessa posta, ed era cosa penosa che pochi decidessero della sopravvivenza di tutti, mentre gli amici che li avevano scelti stavano sulla spiaggia senza poter fare nulla.',
          'Poi la giornata peggiore. L\'attacco all\'argine crolla, Cesare tiene la linea finché tutti gli altri non se ne sono andati, sale sulla propria imbarcazione, capisce che sta per essere sommersa, si getta fuori e raggiunge a nuoto le navi; e poi rimanda indietro delle scialuppe e salva parecchi uomini. Lì morirono quattrocento legionari, e un po\' di più fra marinai e rematori, che non vengono contati con altrettanta cura.',
          'Poi gli Alessandrini chiedono indietro il loro re quindicenne. Cesare glielo consegna sapendo che è probabilmente un inganno, perché combattere un re è più onorevole che combattere una masnada; il ragazzo piange e supplica di non essere mandato via, viene mandato, e subito fa la guerra. Gli ufficiali di Cesare furono contenti che si fosse fatto gabbare. E poi l\'ultima battaglia, nel delta, dove i difensori scesero dalla loro posizione più forte in parte per combattere e in parte per guardare, e la persero; il re annegò; e la città uscì incontro a Cesare con gli abiti che teneva per implorare pietà dai propri re.',
          'Finisce con la sistemazione: il trono a Cleopatra e al fratello superstite, l\'altra sorella deportata perché nessuno possa regnare nel suo nome, e un esercito d\'occupazione lasciato lì per una ragione detta senza il minimo imbarazzo: se i sovrani restano fedeli i presidi li proteggono, e se si mostrano ingrati quegli stessi presidi possono tenerli a freno.'
        ],
        changed: [
          'Tre errori del testo di partenza sono corretti e registrati, e due si sono rivelati parte di uno schema. Il mirror da cui quest\'app prende il latino perde in silenzio la sequenza di lettere xpos: stampa eceret dove il testo ha exposceret ed euerat dove ha exposuerat, e lo stesso difetto compare ventisette volte in tutto il Cesare e il Cicerone in cache. Il terzo è un semplice refuso, Caerari per Caesari.',
          'Tutti e dodici portano ora i numeri di paragrafo in grassetto, nel latino e in entrambe le traduzioni. Quando il gruppo è uscito non ne avevano, perché nessuna edizione raggiungibile sembrava dividere questo libro; ma la più recente edizione critica del Bellum Alexandrinum, curata da Cynthia Damon e pubblicata liberamente in rete, numera ogni paragrafo, e coincide esattamente con i vecchi segni dei primi due capitoli. Le sue note al testo spiegano ora anche che cosa facciano le croci e le parentesi nel latino.',
          'L\'autore ora ha un nome. Il Bellum Alexandrinum non porta il nome di un autore e se ne discute fin dall\'antichità, ma è molto probabilmente di Irzio, e molto vicino nello stile all\'ottavo libro della guerra gallica: perciò ogni nota chiama ora l\'autore Irzio. Un paragrafo, sul primo capitolo, dice chiaramente che è l\'attribuzione più probabile e non una dimostrata, e i capitoli che gli somigliano meno lo dicono. E l\'ottavo libro della guerra gallica, che è certamente suo, non viene più presentato come opera di un continuatore.',
          'Correzioni di traduzione nell\'inglese e nell\'italiano: un condizionale reso alla vecchia maniera; razza al posto di un termine che si usa per gli animali; una parola, nella scena del re bambino in lacrime, che non si capiva; un\'espressione sugli Alessandrini arroganti nella vittoria costruita al contrario; lo stato d\'animo di Cesare, che ora è la sua esitazione, come richiede ogni correzione del latino guasto; e un altro ablativo assoluto lasciato accanto alla sua frase.',
          'E le note per tutti e dodici: l\'acqua della città come mappa della sua disuguaglianza; l\'ingegnere nemico che per poco non batté Cesare con l\'acqua, e un avvelenamento abbastanza lento da non poter essere notato in tempo; perché Cesare non riferisca mai i suoi soldati che lo accusano di tentennare; il discorso come catena di ripieghi con ogni uscita sigillata; un ammiraglio greco lodato con parole romane; una vittoria senza alcuna perdita romana che merita un sopracciglio alzato; Pompeo che abbandona la linea a Farsalo e Cesare che resta nella sua; sei parole ostili per gli Alessandrini in un solo capitolo; l\'unico capitolo che somiglia poco a Irzio; una guerra persa da uomini scesi a guardare; un complimento che Cesare non avrebbe mai potuto farsi da solo; e l\'unico punto del corpus in cui una politica romana è giustificata con la dignità del nostro impero.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.13.1', date: '09/09/2026', time: '21:23', tz: 'CEST',
      en: {
        added: [
          'Nine more excerpts from the eighth book of the Gallic War, which finishes it. Twenty from Hirtius\'s book are now in the app, and the whole of the Gallic War - Caesar\'s seven books and the eighth that is not his - stands at sixty.',
          'It ends the campaign against the last serious enemy Gaul had. An ambush that the Romans already know about, and a clear explanation of why an ambush somebody is expecting is worse than no ambush at all: it spends its whole value in the first instant, and after that it is a smaller army fighting in bad ground. The Roman cavalry fight harder than they need to because the legions are coming up and they do not want to share the credit. And at the end of it the Gallic commander will not leave the field and will not surrender when he is invited to, and fights on until the men who have already beaten him are angry enough to kill him.',
          'Then his people ask for terms and blame the war on the men who died in it - and get told, in one sentence, that the dead are the easiest people in the world to blame. What follows is stranger: Caesar tells a Gallic nation that nobody can start a war against the will of its leading men, with its senate resisting and all its good citizens opposed. That is Roman constitutional language, and it is the exact argument his own enemies were making about him in Rome that same year.',
          'Then the administrative page that says the conquest is over: nobody is preparing to resist any more, they are just moving out of the towns to get away from the government. Caesar breaks the army into detachments and goes after the one man he has never caught, the king who destroyed fifteen Roman cohorts three years earlier - and since he cannot have him, decides to strip his country of people, buildings and cattle so thoroughly that there will be nothing to come back to. The reason given is his own standing. It did not work: the man was never taken, and simply walks out of the record.',
          'Then the last siege, from the inside. The town lays in grain before the ring can close, on the advice of the one man in Gaul who had been inside Alesia and knew what a Roman ring becomes. Then the defenders roll burning barrels of tallow and pitch down onto the siege works, which catch and hold them and burn - and the Roman soldiers fighting the fire make themselves as conspicuous as they can, on purpose, because the whole army is watching and courage that nobody sees is wasted. Then the tunnels reach the spring, the water fails in a day, and a town that can see the ramp and the tower but not the mines concludes that a spring which has never failed can only have been stopped by the gods.',
          'And then a year with no fighting in it at all. A winter spent making sure no war is left behind for the next governor, on the theory that a conquest is not finished when resistance stops but when it can survive the conqueror leaving. Caesar leaving winter quarters early and marching down Italy at top speed to canvass for a friend\'s priesthood - learning on the road that the friend has already won, and going anyway, to thank the towns and be seen by them a year before he needs their votes. And then the senate voting one legion each from Pompey and from Caesar for a war in the east, with Pompey supplying his by asking back the legion he had lent, so that both come out of the same army. Caesar hands over two legions and obeys the decree to the letter. The book\'s last movement is three words: he set out for Italy.',
          'And the notes. Why the fight goes on with Mars level and what that idiom is doing there. Why a chapter of staff postings names the men it does - one of them the officer who will be on the other side within two years. Why the sentence about destroying a country puts the people first in the list of things to be removed, and hangs the whole reasoning on the general\'s prestige. What the memory of Alesia is doing in a council of war, and why the one place in the whole war where a Gallic town learns from a previous siege is still not saved by it. Why courage performed for an audience is worth stopping over, and how the same word turns up two chapters later attached to a mutilation. And why the phrase against the faction and the power of a few, in a chapter about an election, is the thesis of the entire Civil War written nine months early.'
        ],
        changed: [
          'A fault in the source text is corrected and recorded: one word in the account of the ambush is printed in a form that leaves the sentence with no construction at all.',
          'And the closing note of the excerpt about the siege engineering is shortened. It had been summarising what happened when the tunnels reached the spring, because that chapter was not in the app. It is now an excerpt of its own, so the summary is no longer needed.',
          'The three oldest Hirtius excerpts have much longer notes now. The preface and the two opening chapters of the Alexandrian War were written when the app launched, before every excerpt began with a paragraph telling you where you are, and they were visibly shorter than everything added since. The preface now says who Balbus was, how this page dates itself - Caesar dead, the war not over, and the author with a year to live - which of the four books other men wrote are actually his, and what the word commentarii meant to a Roman: notes, raw material, the thing a real historian was supposed to work up afterwards. The joke being that nobody dared. The Alexandrian chapters now say how Caesar came to be besieged in a palace with four thousand men, who the Nabataean king and the eastern provinces he sends to actually are, why the whole plan is about water and fodder rather than walls, why a city built without timber cannot be burned - and, on the other side, why an enemy that manufactures its own weapons and keeps a reserve of veterans in the main square is the frightening kind.',
          'Translation fixes from a proofread. In the Italian, Roman ranks now come before the name and take an article, the way Italian says them. In the English they are set off with commas instead of run together. Gallia Togata keeps its Latin name in both, because rendering it as toga-wearing Gaul is a literal translation of a proper name and reads absurdly - the note explains what it was. And three ablative absolutes that had been rendered as phrases standing beside the sentence are now joined to it by a word: with the battle over, with the terms being better, and a because of this in place of a bare at this.',
          'And the notes for all nine. Why a Roman cavalryman fought harder to avoid being rescued, and what it cost an army to pay for courage that way. What punishment the Bellovaci had actually suffered before Caesar told them he would be content with it, and why demolishing their excuse and then imposing nothing is one policy and not two. Why laying waste a country is revenge for a disaster three years earlier, and what Gallia Togata was. How a competent legate reached for the answer that worked at Alesia and could not finish it, and what Caesar did instead - and that the man who advised getting the grain in had solved the previous siege perfectly, which was not the siege he was about to have. What the ten-storey tower was really for, and the feint that let the fires be put out. What the peace settlement was buying and from whom, and the law that gave Cisalpine Gaul full citizenship two years later. Why a friend\'s priesthood was the perfect reason to tour the towns whose votes were wanted next year. And why Caesar handed over two legions he knew were being taken from him alone - because the one thing he could not afford to lose was the record of having obeyed.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Altri nove brani dall\'ottavo libro della guerra gallica, che lo concludono. I brani del libro di Irzio nell\'app sono ora venti, e l\'intera guerra gallica - i sette libri di Cesare e l\'ottavo che non è suo - arriva a sessanta.',
          'Si chiude la campagna contro l\'ultimo nemico serio che la Gallia abbia avuto. Un\'imboscata che i Romani già conoscono, e una spiegazione limpida del perché un\'imboscata attesa sia peggio di nessuna imboscata: spende tutto il suo valore nel primo istante, e dopo di che è un esercito più piccolo che combatte in terreno cattivo. La cavalleria romana combatte più del necessario perché stanno arrivando le legioni e non vuole dividere il merito. E alla fine il comandante gallico non lascia il campo e non si arrende quando lo invitano, e continua a combattere finché quelli che lo hanno già battuto non sono abbastanza furiosi da ucciderlo.',
          'Poi i suoi chiedono condizioni e danno la colpa della guerra a chi ci è morto, e si sentono rispondere, in una frase, che i morti sono le persone più facili del mondo da incolpare. Quel che segue è più strano: Cesare dice a una nazione gallica che nessuno può iniziare una guerra contro la volontà dei suoi maggiorenti, con il suo senato che si oppone e tutti i suoi buoni cittadini contrari. È lessico costituzionale romano, ed è esattamente l\'argomento che quello stesso anno i suoi nemici usavano contro di lui a Roma.',
          'Poi la pagina amministrativa che dichiara finita la conquista: nessuno prepara più la resistenza, la gente si limita ad andarsene dalle città per sfuggire al governo. Cesare divide l\'esercito in distaccamenti e va a cercare l\'unico uomo che non ha mai preso, il re che tre anni prima aveva distrutto quindici coorti romane; e non potendo avere lui, decide di spogliare il suo paese di uomini, edifici e bestiame tanto a fondo che non ci sia più nulla a cui tornare. La ragione addotta è il proprio prestigio. Non funzionò: quell\'uomo non fu mai preso, ed esce semplicemente dal racconto.',
          'Poi l\'ultimo assedio, visto da dentro. La città fa scorta di grano prima che l\'anello si chiuda, su consiglio dell\'unico uomo in Gallia che fosse stato dentro Alesia e sapesse che cosa diventa un anello romano. Poi i difensori rotolano sulle opere d\'assedio botti ardenti di sego e pece, che le opere trattengono e che bruciano proprio ciò che le ha fermate; e i soldati romani che combattono l\'incendio si rendono il più visibili possibile, di proposito, perché tutto l\'esercito guarda e un coraggio che nessuno vede è sprecato. Poi i cunicoli raggiungono la sorgente, l\'acqua viene meno in un giorno, e una città che vede il terrapieno e la torre ma non le gallerie conclude che una sorgente mai venuta meno può essere stata fermata solo dagli dèi.',
          'E poi un anno senza un solo combattimento. Un inverno passato a fare in modo che al governatore successivo non resti dietro alcuna guerra, sulla teoria che una conquista non è finita quando cessa la resistenza, ma quando sopravvive alla partenza del conquistatore. Cesare che lascia in anticipo i quartieri d\'inverno e scende per l\'Italia a marce forzate a fare campagna per il sacerdozio di un amico; che per strada apprende che l\'amico ha già vinto, e va lo stesso, a ringraziare le città e a farsi vedere un anno prima di averne bisogno dei voti. E poi il senato che vota una legione da Pompeo e una da Cesare per una guerra in oriente, con Pompeo che fornisce la sua richiedendo la legione che aveva prestato, sicché escono entrambe dallo stesso esercito. Cesare consegna due legioni e obbedisce al decreto alla lettera. L\'ultimo movimento del libro sta in tre parole: partì per l\'Italia.',
          'E le note. Perché lo scontro proceda con Marte pari e che cosa ci faccia lì quell\'idioma. Perché un capitolo di assegnazioni di comando nomini proprio quegli uomini, uno dei quali entro due anni sarà dall\'altra parte. Perché la frase sulla distruzione di un paese metta le persone al primo posto nell\'elenco delle cose da togliere, e agganci tutto il ragionamento al prestigio del generale. Che cosa faccia il ricordo di Alesia in un consiglio di guerra, e perché l\'unico luogo di tutta la guerra in cui una città gallica impara da un assedio precedente non ne sia comunque salvato. Perché valga la pena fermarsi sul coraggio recitato davanti a un pubblico, e come la stessa parola ritorni due capitoli dopo attaccata a una mutilazione. E perché l\'espressione contro la fazione e il potere di pochi, in un capitolo di campagna elettorale, sia la tesi di tutta la guerra civile scritta nove mesi prima.'
        ],
        changed: [
          'Un errore del testo di partenza è corretto e registrato: nel racconto dell\'imboscata una parola è stampata in una forma che lascia la frase senza alcuna costruzione.',
          'E la nota finale del brano sull\'ingegneria dell\'assedio è accorciata. Riassumeva ciò che accadde quando i cunicoli raggiunsero la sorgente, perché quel capitolo non era nell\'app. Ora è un brano a sé, e il riassunto non serve più.',
          'I tre brani di Irzio più vecchi hanno ora note molto più lunghe. La prefazione e i due capitoli iniziali della guerra alessandrina furono scritti quando l\'app nacque, prima che ogni brano cominciasse con un paragrafo che dice dove ci si trova, ed erano visibilmente più corti di tutto ciò che è stato aggiunto dopo. La prefazione ora dice chi fosse Balbo, come quella pagina si dati da sé - Cesare morto, la guerra non finita e l\'autore con un anno di vita davanti - quali dei quattro libri scritti da altri siano davvero suoi, e che cosa significasse per un Romano la parola commentarii: appunti, materiale grezzo, ciò che un vero storico avrebbe poi dovuto rielaborare. Con la battuta che nessuno osò. I capitoli alessandrini ora dicono come Cesare sia finito assediato in un palazzo con quattromila uomini, chi siano davvero il re nabateo e le province orientali a cui manda a chiedere aiuto, perché tutto il piano riguardi l\'acqua e il foraggio e non le mura, perché una città costruita senza legno non si possa bruciare, e, dall\'altra parte, perché un nemico che si fabbrica le armi e tiene una riserva di veterani nella piazza principale sia il tipo di nemico che fa paura.',
          'Correzioni di traduzione da una rilettura. In italiano i gradi romani ora precedono il nome e prendono l\'articolo, come si dice in italiano. In inglese sono isolati fra virgole invece che appiccicati al nome. Gallia Togata resta in latino in entrambe le lingue, perché renderla come Gallia in toga è la traduzione letterale di un nome proprio e suona assurda: che cosa fosse lo spiega la nota. E tre ablativi assoluti che erano resi come sintagmi posati accanto alla frase ora le sono legati da una parola.',
          'E le note per tutti e nove. Perché un cavaliere romano combattesse più duramente pur di non farsi soccorrere, e che cosa costasse a un esercito pagare il coraggio in quel modo. Quale punizione i Bellovaci avessero davvero subito prima che Cesare dicesse loro che se ne sarebbe accontentato, e perché demolire la loro scusa e poi non imporre nulla sia una politica sola e non due. Perché devastare un paese sia la vendetta per un disastro di tre anni prima, e che cosa fosse la Gallia Togata. Come un legato capace abbia ripreso la soluzione che aveva funzionato ad Alesia senza riuscire a finirla, e che cosa abbia fatto Cesare al suo posto; e che l\'uomo che consigliò di far entrare il grano aveva risolto perfettamente l\'assedio precedente, che non era l\'assedio che stava per avere. A che cosa servisse davvero la torre di dieci piani, e la finta che permise di spegnere gli incendi. Che cosa stesse comprando la pacificazione e da chi, e la legge che due anni dopo diede la piena cittadinanza alla Gallia Cisalpina. Perché il sacerdozio di un amico fosse la ragione perfetta per girare le città di cui l\'anno seguente sarebbero serviti i voti. E perché Cesare abbia consegnato due legioni che sapeva benissimo di essere l\'unico a perdere: perché l\'unica cosa che non poteva permettersi di perdere era il verbale di aver obbedito.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.13.0', date: '08/09/2026', time: '19:33', tz: 'CEST',
      en: {
        added: [
          'Ten excerpts from the eighth book of the Gallic War - the book Caesar did not write. He was murdered with the work unfinished, seven books covering 58 to 52 BC and nothing on the two years after, and one of his officers, Aulus Hirtius, wrote the missing volume afterwards to close the gap between Caesar\'s last book and the Civil War. He was killed in battle himself the following year, before he could finish the rest.',
          'And because he is a different man writing in a dead man\'s manner, this batch does something the app has not done before: it compares the two, in the excerpts where the difference is largest. Hirtius says "I". Caesar never does - he refers to himself in the third person for ten books and writes "as was shown above" where Hirtius writes "as I showed". Hirtius explains why Caesar acted as he did, before saying what he did. He calls a reception incredible and a friend a very great friend. He tells you what an officer was feeling. And once, in the middle of a cavalry action, he stops the war entirely to explain how he has decided to organise his own book.',
          'The story starts the year after Alesia, with Gaul conquered and rising again, and the reasoning behind it laid out in the first paragraph: nobody can beat the Roman army, but everybody at once can exhaust it, and a state that is destroyed buys time for the rest. Then Caesar marching in midwinter and forbidding his men to burn anything, because a burning farm is how a country learns an army has arrived. Then two hundred sesterces a man for the march, eighteen days of rest, and out again.',
          'Then the worst thing in the book and the worst thing recorded of Caesar anywhere. Labienus, his senior officer, decides that a Gallic king\'s disloyalty can be put down "without any treachery", invites him to a parley, and posts centurions to kill him at it with the handshake as the signal. The centurion hesitates, and the man survives with a sword-cut to the head and a decision never to come into the sight of a Roman again. Twenty-five chapters later the same Roman officer hunts him down, and he rides at him and puts a lance through his thigh - and then asks to surrender on one condition, that he never has to appear before a Roman. It is granted, on the grounds that his fear is reasonable.',
          'And then the end of the war, at a hill town with one spring. Caesar builds a sixty-foot ramp and a ten-storey tower to shoot at the water, tunnels under the spring, and takes it away. When the town gives in he has the hands cut off every man who carried a weapon and lets them live, so that the punishment can be seen - and Hirtius explains, before he reports it, that this was not cruelty. Then Italy, where every town on the road comes out with its children to meet him; then Rome, where a consul tries to have his provinces taken early, loses the vote, and concludes that what is needed is a way to make the senate agree; and then the last chapter, in which two legions are handed to Pompey. The Gallic War ends on a single word with no sentence around it.',
          'And the notes this book needed. Why the Gaulish plan in the first chapter is the right one and also a crude one - they had done far better against Caesar before, with a fake warning and an ambush that destroyed fifteen cohorts. Why the third chapter is the answer to the first: a plan that depends on everybody rising together is destroyed by a man who reaches each of them before the next one has heard anything. Why Labienus can say there will be no treachery and then arrange a murder without contradicting himself, and why the centurion sent to do it hesitated anyway. What the strange numerals are - and that they are not a quirk of this author, since Caesar writes them the same way. Why the engineering at the last siege is aimed at a spring rather than at a town, and what happened when the tunnels reached the water. And, in the chapter about the hands, a sentence that starts with one subject, piles up three levels of subordination around it, and then abandons it and starts again with a different one.',
        ],
        changed: [
          'Two faults in the source text of Book VIII are corrected and recorded: a Gallic chief is spelled one way seven times and another way once, and the book ends with no full stop at all.',
          'Two words in one English translation are toned down to match the Italian: projectiles rather than missiles, and consumed rather than destroyed.',
          'And a rendering fault that had been accumulating quietly for weeks. Chapter references in the notes had been written inside backticks, which this app\'s text renderer has no rule for - so 306 of them were reaching the page as visible backticks, across twenty-eight excerpts. All removed, and the check that watches for stray asterisks now watches for these as well.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Dieci brani dall\'ottavo libro della guerra gallica, il libro che Cesare non scrisse. Fu assassinato con l\'opera incompiuta - sette libri dal 58 al 52 a.C. e nulla sui due anni successivi - e uno dei suoi ufficiali, Aulo Irzio, scrisse in seguito il volume mancante per chiudere il vuoto fra l\'ultimo libro di Cesare e la guerra civile. L\'anno dopo fu ucciso lui stesso in battaglia, prima di poter finire il resto.',
          'E poiché è un altro uomo che scrive alla maniera di un morto, questo gruppo fa una cosa che l\'app non aveva ancora fatto: mette a confronto i due, nei brani in cui la differenza è più grande. Irzio dice "io". Cesare non lo fa mai: parla di sé in terza persona per dieci libri e scrive "come si è mostrato sopra" dove Irzio scrive "come ho mostrato". Irzio spiega perché Cesare abbia agito così, prima di dire che cosa abbia fatto. Definisce incredibile un\'accoglienza e grandissimo amico un amico. Vi dice che cosa provava un ufficiale. E una volta, in mezzo a un\'azione di cavalleria, ferma del tutto la guerra per spiegare come ha deciso di organizzare il proprio libro.',
          'La storia comincia l\'anno dopo Alesia, con la Gallia conquistata che si risolleva, e il ragionamento che c\'è dietro esposto nel primo paragrafo: nessuno può battere l\'esercito romano, ma tutti insieme possono sfiancarlo, e una nazione che viene distrutta compra tempo per le altre. Poi Cesare che marcia in pieno inverno e vieta ai suoi di bruciare qualsiasi cosa, perché una fattoria che brucia è il modo in cui un paese apprende che è arrivato un esercito. Poi duecento sesterzi a testa per la marcia, diciotto giorni di riposo, e di nuovo fuori.',
          'Poi la cosa peggiore del libro e la cosa peggiore che si registri di Cesare in qualunque luogo. Labieno, il suo ufficiale anziano, decide che la slealtà di un re gallico si può reprimere "senza alcun tradimento", lo invita a un colloquio e vi appòsta dei centurioni per ucciderlo, con la stretta di mano come segnale. Il centurione esita, e l\'uomo sopravvive con un colpo di spada alla testa e la decisione di non comparire mai più davanti a un Romano. Venticinque capitoli dopo lo stesso ufficiale romano gli dà la caccia, e lui lo carica e gli conficca una lancia nella coscia; e poi chiede di arrendersi a una sola condizione, di non dover mai comparire davanti a un Romano. Gli viene concessa, con la motivazione che la sua paura è ragionevole.',
          'E poi la fine della guerra, in una città d\'altura con una sola sorgente. Cesare costruisce un terrapieno di sessanta piedi e una torre di dieci piani per tirare sull\'acqua, scava cunicoli sotto la fonte e gliela porta via. Quando la città cede, fa tagliare le mani a ogni uomo che avesse portato le armi e li lascia vivere, perché la punizione si veda; e Irzio spiega, prima di riferirlo, che non fu crudeltà. Poi l\'Italia, dove ogni città lungo la strada gli va incontro con i figli; poi Roma, dove un console tenta di fargli togliere in anticipo le province, perde il voto e conclude che serve un modo per costringere il senato ad acconsentire; e poi l\'ultimo capitolo, in cui due legioni vengono consegnate a Pompeo. La guerra gallica finisce su una sola parola senza una frase attorno.',
          'E le note di cui questo libro aveva bisogno. Perché il piano gallico del primo capitolo sia quello giusto e insieme rozzo: contro Cesare avevano fatto molto meglio, con un falso allarme e un\'imboscata che distrusse quindici coorti. Perché il terzo capitolo sia la risposta al primo: un piano che dipende dall\'insorgere tutti insieme viene distrutto da un uomo che raggiunge ciascuno prima che il successivo abbia saputo qualcosa. Perché Labieno possa dire che non ci sarà alcun tradimento e subito dopo organizzare un assassinio senza contraddirsi, e perché il centurione mandato a farlo abbia comunque esitato. Che cosa siano quei numerali strani, e che non sono un vezzo di questo autore, perché Cesare li scrive allo stesso modo. Perché l\'ingegneria dell\'ultimo assedio punti a una sorgente e non a una città, e che cosa accadde quando i cunicoli raggiunsero l\'acqua. E, nel capitolo delle mani, una frase che comincia con un soggetto, gli accumula attorno tre livelli di subordinazione e poi lo abbandona e ricomincia con un altro.',
        ],
        changed: [
          'Due errori del testo di partenza del libro VIII sono corretti e registrati: il nome di un capo gallico è scritto in un modo sette volte e in un altro una volta sola, e il libro finisce senza alcun punto fermo.',
          'Due parole di una traduzione inglese sono attenuate per allinearle all\'italiano: proiettili invece di missili, e consumati invece di distrutti.',
          'E un difetto di resa che si accumulava da settimane in silenzio. I rimandi ai capitoli nelle note erano stati scritti fra apici inversi, per i quali il renderer di testo di quest\'app non ha alcuna regola: 306 di essi arrivavano sulla pagina come apici visibili, in ventotto brani. Tolti tutti, e il controllo che sorveglia gli asterischi vaganti ora sorveglia anche questi.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.12.2', date: '06/09/2026', time: '19:41', tz: 'CEST',
      en: {
        added: [
          'Thirteen excerpts from Book III, and with them the Bellum Civile is finished. Caesar\'s own writings are now complete in the app - all seven books of the Gallic War and all three of the Civil War, seventy excerpts - and the only thing left in the Corpus is the four books other men wrote after he died.',
          'It opens with two armies camped either side of a river whose soldiers have been talking to each other daily under a truce they arranged themselves. An envoy walks to the bank and asks, loudly, whether citizens may send envoys to citizens about peace, when runaway slaves and pirates had been allowed to. Both armies listen in silence. The next day the parley is broken up by javelins thrown from every side at once, and Labienus - who had been Caesar\'s best officer in Gaul for nine years - ends it with the only sentence Caesar ever quotes him saying: there can be no peace for us unless Caesar\'s head is brought back.',
          'Then Dyrrachium, where Caesar besieged an army bigger than his own and starved while doing it. His men find a root they can grind into something like bread, and when the enemy jeer at them about the famine they throw the loaves at them. In one fort not a single soldier is unwounded and four centurions of one cohort lose their eyes; the men count out thirty thousand spent arrows as proof, and bring their centurion\'s shield, which has a hundred and twenty holes in it. Then Caesar loses the battle, and explains why he was not destroyed with it: Pompey, who had never expected to win, did not believe he had. Small things, he says, have great weight in both directions.',
          'Then Pharsalus. Three chapters before it, the winning side is dividing the spoils: three men quarrelling in public over which of them gets Caesar\'s priesthood, a general being prosecuted, and a proposal for three voting tablets with which to try, after the victory, every senator who stayed neutral - acquittal, a fine, or death. Then Pompey explains to his council that the cavalry will roll up Caesar\'s open flank before a javelin is thrown, which is the right plan. Caesar, seeing the horsemen stacked on one wing, quietly pulls one cohort out of each legion, hides them behind his right, and tells them the day is theirs.',
          'And then the battle, and a veteran called Crastinus who turns to the men he used to command, tells them that when this is over their general gets back his standing and they get back their freedom, promises Caesar he will act so as to be thanked alive or dead, and runs. The fourth line does what it was built for. Pompey watches the part he trusted most break, rides to camp, tells the guards loudly to look after it because he is going round the other gates, and sits down in his tent to wait. Caesar\'s men walk into that camp and find garden arbours, silver laid out and tents roofed with ivy. Afterwards he counts: two hundred of his own dead and thirty centurions, and he goes back eight chapters to record that Crastinus was killed with a sword in the front of his face, and that what he had promised was not false.',
          'The work ends off the coast of Egypt. Pompey asks a thirteen-year-old king for asylum; the men running the kingdom answer generously in public and privately send two officers to kill him. He gets into their boat because he recognises one of them - a centurion who had served under him in the pirate war twenty years before. Caesar gives the death five words and no adjective, and eight chapters later the Bellum Civile stops in mid-sentence, unfinished.',
          'And the notes this book turned out to need. Why the failed parley is an alibi rather than a scene, and who in it chose to break something. The compliment buried in the story of the bread, which was invented by men who happened to be off work detail. Why the judgement of Pompey starts at Dyrrachium rather than at Pharsalus, and why the famous line about a general who knows how to win but not how to use a victory is not about him at all - it is Maharbal to Hannibal, in Livy. Why Caesar says nothing at all about the men dividing the spoils three days early, and how that silence sets up the one chapter where he does say it. What was actually wrong with Pompey\'s battle plan, which was the right plan. Why the lie at the camp gate is a lie, and why the saddest sentence in the book is two participles. And the exact join at the end: the Bellum Civile stops on the words these were the beginnings of the Alexandrian War, and the next book, by another hand, starts with the Alexandrian war having flared up.'
        ],
        changed: [
          'Two faults in the source text of Book III are corrected and recorded: one chapter ends with no full stop, and one prints Pornpeiana for Pompeiana.',
          'Punctuation in two translations: a connective in the middle of a clause needs commas on both sides, and one at the head of a sentence needs one after it. And an abbreviation that had been left standing since the launch-era Caesar entry is now written out - the senatus consultum ultimum, which had been appearing as three letters with no explanation.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Tredici brani dal libro III, e con essi il Bellum Civile è finito. Gli scritti di Cesare sono ora completi nell\'app - tutti e sette i libri della guerra gallica e tutti e tre della guerra civile, settanta brani - e del Corpus restano solo i quattro libri che altri scrissero dopo la sua morte.',
          'Si apre con due eserciti accampati sulle due rive di un fiume, i cui soldati si parlano ogni giorno grazie a una tregua che si sono organizzati da soli. Un ambasciatore va sulla riva e chiede, ad alta voce, se sia lecito che dei cittadini mandino ambasciatori a dei cittadini per la pace, quando lo si era concesso a schiavi fuggiaschi e a pirati. I due eserciti ascoltano in silenzio. Il giorno dopo il colloquio viene interrotto da giavellotti lanciati da ogni parte insieme, e Labieno - che per nove anni era stato il miglior ufficiale di Cesare in Gallia - lo chiude con l\'unica frase che Cesare gli metta mai in bocca: per noi non ci può essere pace se non riportando la testa di Cesare.',
          'Poi Durazzo, dove Cesare assediò un esercito più grande del suo e intanto patì la fame. I suoi trovano una radice da macinare in qualcosa di simile al pane, e quando i nemici li deridono per la carestia gli tirano addosso le pagnotte. In un forte non c\'è un solo soldato illeso e quattro centurioni di una coorte perdono gli occhi; gli uomini contano trentamila frecce scagliate come prova, e portano lo scudo del loro centurione, che ha centoventi fori. Poi Cesare perde la battaglia, e spiega perché non sia stato distrutto insieme a essa: Pompeo, che non si era mai aspettato di vincere, non credette di aver vinto. Le piccole cose, dice, hanno grande peso in entrambe le direzioni.',
          'Poi Farsalo. Tre capitoli prima, la parte vincente si spartisce il bottino: tre uomini che litigano in pubblico su chi avrà il sacerdozio di Cesare, un generale sotto accusa, e la proposta di tre tavolette di voto con cui processare, dopo la vittoria, ogni senatore rimasto neutrale: assoluzione, multa o morte. Poi Pompeo spiega al suo consiglio che la cavalleria arrotolerà il fianco scoperto di Cesare prima che sia lanciato un giavellotto, ed è il piano giusto. Cesare, vedendo i cavalieri ammassati su un\'ala, ritira in silenzio una coorte per legione, le nasconde dietro la propria destra e dice loro che la giornata è la loro.',
          'E poi la battaglia, e un veterano di nome Crastino che si volta verso gli uomini che comandava un tempo, dice loro che quando sarà finita il generale riavrà il suo prestigio e loro la loro libertà, promette a Cesare che farà in modo di essere ringraziato da vivo o da morto, e parte di corsa. La quarta linea fa ciò per cui era stata creata. Pompeo vede cedere la parte di cui più si fidava, torna al campo, dice ad alta voce alle guardie di badarci perché lui va a fare il giro delle altre porte, e si siede nella tenda ad aspettare. Gli uomini di Cesare entrano in quell\'accampamento e vi trovano pergolati, argenteria in mostra e tende coperte d\'edera. Dopo lui conta: duecento morti dei suoi e trenta centurioni, e torna indietro di otto capitoli per registrare che Crastino fu ucciso da una spada in pieno viso, e che ciò che aveva promesso non fu falso.',
          'L\'opera finisce al largo dell\'Egitto. Pompeo chiede asilo a un re di tredici anni; gli uomini che reggono il regno rispondono con generosità in pubblico e in privato mandano due ufficiali a ucciderlo. Sale sulla loro barca perché ne riconosce uno: un centurione che aveva servito ai suoi ordini nella guerra contro i pirati vent\'anni prima. Cesare dà alla morte cinque parole e nessun aggettivo, e otto capitoli dopo il Bellum Civile si interrompe a metà, incompiuto.',
          'E le note di cui questo libro aveva bisogno. Perché il colloquio fallito sia un alibi e non una scena, e chi al suo interno abbia scelto di rompere qualcosa. Il complimento nascosto nella storia del pane, inventato da uomini che quel giorno erano liberi dai lavori. Perché il giudizio su Pompeo cominci a Durazzo e non a Farsalo, e perché la frase celebre sul generale che sa vincere ma non sa usare la vittoria non lo riguardi affatto: è Maarbale ad Annibale, in Livio. Perché Cesare non dica assolutamente nulla sugli uomini che si spartiscono il bottino tre giorni prima, e come quel silenzio prepari l\'unico capitolo in cui invece lo dice. Che cosa ci fosse davvero di sbagliato nel piano di battaglia di Pompeo, che era il piano giusto. Perché la frase alla porta dell\'accampamento sia una bugia, e perché la frase più triste del libro siano due participi. E la saldatura esatta della fine: il Bellum Civile si ferma sulle parole questi furono gli inizi della guerra alessandrina, e il libro successivo, di un\'altra mano, comincia con scoppiata la guerra alessandrina.'
        ],
        changed: [
          'Due errori del testo di partenza del libro III sono corretti e registrati: un capitolo finisce senza punto e uno stampa Pornpeiana invece di Pompeiana.',
          'Punteggiatura in due traduzioni: una congiunzione in mezzo alla frase vuole le virgole da entrambe le parti, e una a inizio di frase ne vuole una dopo. E una sigla rimasta lì dai tempi del lancio ora è scritta per esteso: il senatus consultum ultimum, che compariva come tre lettere senza spiegazione.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.12.1', date: '05/09/2026', time: '23:42', tz: 'CEST',
      en: {
        added: [
          'Six excerpts from Book II of the Bellum Civile, which closes it. Half of them are the siege of Massilia - the Greek city that is now Marseille, an independent republic and a Roman ally for four hundred years, which shut its gates on Caesar and paid for it. The other half is the worst thing that happened to Caesar in 49 BC, and it happened in Africa to somebody else.',
          'Massilia first. A sixty-foot covered gallery, built to walk the siege up to the wall without anybody being hit, described layer by layer: bricks and clay against fire, hides over the bricks against the water poured down to dissolve the clay, quilts over the hides against the fire and stones meant to destroy them. Each layer is there because the one underneath it has a weakness. The soldiers called the thing a mouse.',
          'Then the Massiliots ask for a truce and get one, wait for a windy afternoon when the Roman weapons are stacked and covered, and burn the entire siege works to the ground - months of building gone, in Caesar\'s phrase, in a point of time. They try exactly the same thing the next day and are beaten off with heavy losses, because the same trick works once. And then the surrender, six months in: starving on the old millet the city had stored against a siege two hundred years before it came, sick from the diet, walls down, fleet gone. Caesar spares them, and says in as many words that he is doing it for the city\'s name and age rather than for anything it has done to deserve it. Then he takes every weapon, every ship and the contents of the treasury, and leaves two legions in it.',
          'And Africa. Curio - thirty-five, one of the great speakers of his generation, so far in debt that Caesar had paid it off, and the man whose vetoes had held the political line in the senate through 50 - has crossed from Sicily with two legions to take the province. They are the legions that surrendered at Corfinium and were spared. An officer rides out of the enemy line to talk to them and turns out to be their own quaestor from Corfinium, one of the fifty men Caesar released; he reminds them of the oath they swore to him, and asks which of their two oaths counts. The app records their answer, which is silence.',
          'Then Curio is told by deserters that the king of Numidia has gone home and only a lieutenant is nearby. It is not true, and Caesar tells you so immediately - the king was six miles behind with everything he had. What makes Curio believe it is named in four words, and every one of them is a virtue: his youth, his high spirit, his run of success, his confidence. Four chapters later two Roman legions are surrounded in open sand. Offered a horse and an escort out, Curio says he will not go back into Caesar\'s sight having lost an army he was given on trust, and is killed fighting. The last four words of the chapter are that the soldiers were killed to the last man.',
          'And the notes these six chapters needed. Why an army answers a question like that with silence rather than a shout - it is torn between two oaths, ashamed that one of them is already broken, and afraid, because to declare yourself out loud in the ranks is to declare yourself to the man beside you. Why there are two different men called Varus in the same sentence, and which of them Caesar had captured and let go. What the first oath was, and the one clause in Book I that cancelled it. Why the gallery at Massilia has left no trace at all when the works at Alesia are still in the ground. Why Caesar writes one Ciceronian sentence and only one. Why the emergency grain store that was supposed to save the city is quietly a scandal. And why sparing Massilia may be the one case in the whole work where the mercy did more damage than a sack would have.'
        ],
        changed: [
          'The Civil War was labelled De Bello Civile on the chooser screen. Civilis is a third-declension adjective, so the ablative is civili, agreeing with bello. Corrected.',
          'One fault in the source text of Book II is corrected and recorded: two sentences run together with no stop between them in the description of the gallery.',
          'And a grammar fix in the English of the chapter about the burning of the siege works: the enemy was taking plural verbs in one place and reading as a singular in another. It is singular throughout now, and the sentence about the pursuit says who was being stopped.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Sei brani dal libro II del Bellum Civile, che lo chiudono. Metà sono l\'assedio di Massilia, la città greca che oggi è Marsiglia, repubblica indipendente e alleata di Roma da quattrocento anni, che chiuse le porte a Cesare e la pagò. L\'altra metà è la cosa peggiore che sia capitata a Cesare nel 49 a.C., e capitò in Africa a qualcun altro.',
          'Prima Marsiglia. Una galleria coperta di sessanta piedi, costruita per portare l\'assedio fino al muro senza che nessuno venga colpito, descritta strato per strato: mattoni e argilla contro il fuoco, pelli sopra i mattoni contro l\'acqua fatta scorrere per sciogliere l\'argilla, trapunte sopra le pelli contro il fuoco e le pietre che dovrebbero rovinarle. Ogni strato c\'è perché quello sotto ha un punto debole. I soldati chiamavano quell\'aggeggio topo.',
          'Poi i Marsiliesi chiedono una tregua e la ottengono, aspettano un pomeriggio ventoso con le armi romane accatastate e coperte, e bruciano tutte le opere d\'assedio: mesi di lavoro andati, nella frase di Cesare, in un punto di tempo. Riprovano esattamente la stessa cosa il giorno dopo e vengono respinti con gravi perdite, perché lo stesso trucco funziona una volta sola. E poi la resa, dopo sei mesi: affamati sul miglio vecchio che la città aveva messo da parte per un assedio duecento anni prima che arrivasse, malati per la dieta, mura abbattute, flotta perduta. Cesare li risparmia, e dice a chiare lettere di farlo per il nome e l\'antichità della città e non per meriti che possa vantare. Poi si prende ogni arma, ogni nave e il contenuto dell\'erario, e ci lascia due legioni.',
          'E l\'Africa. Curione - trentacinque anni, uno dei grandi oratori della sua generazione, indebitato al punto che Cesare gli aveva saldato i debiti, e l\'uomo i cui veti avevano tenuto la linea politica in senato per tutto il 50 - è passato dalla Sicilia con due legioni per prendere la provincia. Sono le legioni che si arresero a Corfinio e furono risparmiate. Dalla linea nemica esce a cavallo un ufficiale per parlare loro, e si scopre essere il loro stesso questore di Corfinio, uno dei cinquanta uomini liberati da Cesare; ricorda loro il giuramento che gli avevano prestato e chiede quale dei due giuramenti conti. L\'app registra la loro risposta, che è il silenzio.',
          'Poi a Curione dei disertori dicono che il re di Numidia è tornato a casa e che nelle vicinanze c\'è solo un luogotenente. Non è vero, e Cesare ve lo dice subito: il re era sei miglia dietro con tutto ciò che aveva. Ciò che fa credere a Curione è nominato in quattro parole, e ognuna è una virtù: la giovinezza, l\'ardore, la serie di successi, la fiducia. Quattro capitoli dopo due legioni romane sono circondate nella sabbia aperta. Quando gli offrono un cavallo e una scorta per uscirne, Curione dice che non tornerà davanti a Cesare dopo aver perduto un esercito ricevuto in affidamento, e viene ucciso combattendo. Le ultime quattro parole del capitolo dicono che i soldati furono uccisi fino all\'ultimo.',
          'E le note di cui questi sei capitoli avevano bisogno. Perché un esercito risponda a una domanda del genere con il silenzio invece che con un grido: è diviso fra due giuramenti, si vergogna perché uno dei due è già rotto, e ha paura, perché dichiararsi ad alta voce nei ranghi significa dichiararsi all\'uomo che ti sta accanto. Perché nella stessa frase ci siano due uomini diversi di nome Varo, e quale dei due Cesare avesse catturato e lasciato andare. Che cosa fosse il primo giuramento, e quale singola proposizione del libro I lo abbia annullato. Perché della galleria di Marsiglia non resti alcuna traccia mentre le opere di Alesia sono ancora nel terreno. Perché Cesare scriva una frase ciceroniana e una sola. Perché il deposito di grano d\'emergenza che doveva salvare la città sia sottovoce uno scandalo. E perché risparmiare Marsiglia sia forse l\'unico caso di tutta l\'opera in cui la clemenza abbia fatto più danno di un saccheggio.'
        ],
        changed: [
          'La guerra civile era intitolata De Bello Civile nella schermata di scelta. Civilis è un aggettivo della seconda classe, quindi l\'ablativo è civili, concordato con bello. Corretto.',
          'Un errore del testo di partenza del libro II è corretto e registrato: nella descrizione della galleria due frasi corrono insieme senza punto fra loro.',
          'E una correzione grammaticale nell\'inglese del capitolo sull\'incendio delle opere d\'assedio: il nemico prendeva verbi plurali in un punto e si leggeva come singolare in un altro. Ora è singolare dappertutto, e la frase sull\'inseguimento dice chi veniva fermato.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.12.0', date: '04/09/2026', time: '19:22', tz: 'CEST',
      en: {
        added: [
          'The Civil War begins. Ten excerpts from Book I of the Bellum Civile, joining the one that has been in the app since launch, so Caesar now has eleven of them and fifty-one in all. This is the other Caesar: the same clipped prose, turned on his own countrymen, and used to argue that the war was somebody else\'s fault.',
          'It opens four chapters before the fighting, with a list of the men on the other side and the reason each of them wanted a war - debt, a lost election, fear of prosecution, and, for Pompey, the plain refusal to let anybody be considered his equal. Then the emergency decree of the senate, quoted word for word and dated to the day, and the tribunes running out of Rome to reach Caesar at Ravenna.',
          'Then the march. At Corfinium a former consul comes out of a besieged town at four in the morning to beg for his life, and gets as far as reminding Caesar of the favours he owes him before Caesar cuts him off and states his war aims in three clauses. The next morning fifty captured officers are brought out, protected from the soldiers, told off briefly for ingratitude, and let go - and the six million sesterces of Pompey\'s pay chest is handed back to the enemy commander, so that Caesar should not seem stingier with money than with lives.',
          'Then Pompey slips out of Brundisium by night, and the war leaves Italy. The townspeople, who have had enough of his garrison, wave from their roofs to say he is going and then shout down which streets are mined. And then Rome, in a chapter that is short for a reason: the senate is too frightened to send envoys anywhere, a tribune gets in Caesar\'s way, and Caesar leaves the city "without doing what he had meant to do". What he actually did - break into the reserve treasury in the temple of Saturn - is in Plutarch, in Appian, in Dio and in Lucan, and is not in this chapter.',
          'And then Spain, and the strangest thing in the whole Corpus Caesarianum. With the enemy cut off from their grain, Caesar refuses a battle he expects to win, because the men he would kill are citizens - and his own soldiers say out loud that if he wants one now he can have it without them. Two chapters later the two armies walk out and start looking for their relatives, thank each other for not killing each other the day before, and send senior centurions to negotiate a peace nobody\'s general has authorised. One camp made out of two. Then Petreius arrives with his bodyguard, makes the whole army swear an oath, and has every one of Caesar\'s soldiers found in the camp killed in the open - except the ones their hosts hid and let out over the rampart in the dark, which Caesar also records.',
          'And the context all eleven of these chapters were assuming you already had. Every excerpt in this app is opened cold, and Book I of the civil war turns out to be the hardest thing here to open cold: it names a consul without saying he is the consul, besieges a town without saying why, and hangs its whole legal case on institutions a Roman knew from childhood. So each chapter now opens by saying where you are. What Caesar and his enemies were actually arguing about in January 49 - not Gaul, but the few months between his command ending and his consulship starting, during which he could be prosecuted. Who the two silenced tribunes were: Mark Antony and Quintus Cassius. Who Saturninus and the Gracchi were, and why three dead politicians decide the argument of a speech. Why Caesar was outside Corfinium at all, who the man begging on the wall was, and what the frightened men inside were being driven to do (Domitius had already asked his doctor for poison and drunk it). Who Afranius and Petreius were, and how a campaign in Spain reached the point where one Roman army could refuse to fight another.',
        ],
        changed: [
          'The Italian chooser used to offer to let you "choose a comedy by" whichever author you had opened, including Julius Caesar. It only ever fitted the three comic poets it was written for; every author with more than one text now carries a proper heading in both languages, and the generic one is neutral.',
          'One fault in the source text of Book I is corrected and recorded: a people east of the Marrucini are printed as the Frentrani, who never existed. They are the Frentani.',
          'Three phrases in the English translations were more formal than this app wants to be - "recourse is had", "when it grew light", "to be got ready" - and one Italian one was missing a small word. The target register for both translations is ordinary careful prose with some formality allowed, not the language of a statute, and there is now a check that watches for the drift.',
          'And a mistake in the notes, corrected. The analysis of the chapter about Caesar\'s standing quoted the Corfinium speech as saying he had left his province to restore himself to his own position. What the Latin says is that he left it to restore the tribunes to theirs. The argument it was supporting survives on the two clauses that really do say it, and has been rewritten to use those.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Comincia la guerra civile. Dieci brani dal libro I del Bellum Civile, che si aggiungono a quello presente nell\'app fin dal lancio: Cesare ne ha ora undici e cinquantuno in tutto. È l\'altro Cesare: la stessa prosa asciutta, rivolta contro i suoi concittadini, e usata per sostenere che la guerra è colpa di qualcun altro.',
          'Si apre quattro capitoli prima dei combattimenti, con l\'elenco degli uomini dell\'altra parte e della ragione per cui ciascuno voleva la guerra: i debiti, una sconfitta elettorale, la paura dei processi e, per Pompeo, il semplice rifiuto di lasciare che qualcuno fosse considerato suo pari. Poi il decreto d\'emergenza del senato, citato parola per parola e datato al giorno, e i tribuni che fuggono da Roma per raggiungere Cesare a Ravenna.',
          'Poi la marcia. A Corfinio un ex console esce da una città assediata alle quattro del mattino per implorare la vita, e arriva a ricordare a Cesare i favori che gli deve prima che Cesare lo interrompa ed enunci in tre proposizioni i propri scopi di guerra. La mattina dopo cinquanta ufficiali catturati vengono condotti fuori, protetti dai soldati, rimproverati brevemente per l\'ingratitudine e lasciati andare; e i sei milioni di sesterzi della cassa di Pompeo vengono restituiti al comandante nemico, perché Cesare non sembri più avaro con il denaro che con la vita.',
          'Poi Pompeo sguscia via da Brindisi di notte, e la guerra lascia l\'Italia. I cittadini, che della sua guarnigione ne hanno abbastanza, fanno segno dai tetti che sta partendo e poi gridano quali strade sono minate. E poi Roma, in un capitolo che è breve per una ragione: il senato ha troppa paura per mandare ambasciatori, un tribuno si mette di traverso e Cesare lascia la città "senza aver fatto ciò che si era proposto di fare". Quello che fece davvero, cioè forzare la riserva del tempio di Saturno, sta in Plutarco, in Appiano, in Dione e in Lucano, e non sta in questo capitolo.',
          'E poi la Spagna, e la cosa più strana di tutto il Corpus Caesarianum. Con il nemico tagliato fuori dal grano, Cesare rifiuta una battaglia che si aspetta di vincere, perché gli uomini che ucciderebbe sono cittadini; e i suoi soldati dicono ad alta voce che se ora ne vuole una se la faccia senza di loro. Due capitoli dopo i due eserciti escono allo scoperto e cominciano a cercarsi i parenti, si ringraziano a vicenda per non essersi uccisi il giorno prima e mandano centurioni anziani a trattare una pace che nessun generale ha autorizzato. Un accampamento solo fatto di due. Poi arriva Petreio con la sua scorta, fa giurare tutto l\'esercito e fa uccidere allo scoperto ogni soldato di Cesare trovato nel campo, tranne quelli che i loro ospiti nascosero e fecero uscire oltre il vallo col buio, cosa che pure Cesare registra.',
          'E il contesto che tutti e undici questi capitoli davano per scontato. Ogni brano di quest\'app si apre a freddo, e il libro I della guerra civile è la cosa più difficile da aprire a freddo che ci sia qui: nomina un console senza dire che è il console, assedia una città senza dire perché, e fonda tutta la sua causa giuridica su istituzioni che un Romano conosceva da bambino. Così ora ogni capitolo si apre dicendo dove siete. Su che cosa Cesare e i suoi nemici stessero davvero litigando nel gennaio del 49: non la Gallia, ma i pochi mesi fra la fine del comando e l\'inizio del consolato, durante i quali poteva essere processato. Chi fossero i due tribuni messi a tacere: Marco Antonio e Quinto Cassio. Chi fossero Saturnino e i Gracchi, e perché tre politici morti decidano l\'argomentazione di un discorso. Perché Cesare fosse davanti a Corfinio, chi fosse l\'uomo che supplicava sulle mura, e a che cosa fossero spinti gli uomini atterriti là dentro (Domizio aveva già chiesto il veleno al medico e lo aveva bevuto). Chi fossero Afranio e Petreio, e come una campagna in Spagna sia arrivata al punto in cui un esercito romano poteva rifiutarsi di combatterne un altro.',
        ],
        changed: [
          'Il selettore italiano invitava a "scegliere una commedia di" qualunque autore si fosse aperto, Giulio Cesare compreso. Andava bene solo per i tre comici per cui era stato scritto; ora ogni autore con più di un testo ha un\'intestazione propria in entrambe le lingue, e quella generica è neutra.',
          'Un errore del testo di partenza del libro I è corretto e registrato: un popolo a est dei Marrucini è stampato come Frentrani, che non sono mai esistiti. Sono i Frentani.',
          'Tre espressioni delle traduzioni inglesi erano più formali di quanto quest\'app voglia essere, e a una italiana mancava una paroletta. Il registro di riferimento per entrambe le traduzioni è la prosa curata di tutti i giorni, con qualche formalità concessa ma non la lingua di un codice, e ora c\'è un controllo che sorveglia lo scivolamento.',
          'E un errore nelle note, corretto. L\'analisi del capitolo sul prestigio di Cesare citava il discorso di Corfinio come se dicesse che era uscito dalla provincia per restituire se stesso al proprio rango. Quello che il latino dice è che ne era uscito per restituire i tribuni al loro. L\'argomento che sosteneva regge sulle due proposizioni che lo dicono davvero, ed è stato riscritto su quelle.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.11.5', date: '03/09/2026', time: '21:28', tz: 'CEST',
      en: {
        added: [
          'Nine excerpts from Book VII, and with them the Gallic War is finished: all seven books are in, forty excerpts, and Caesar is the second-largest author in the app.',
          'Book VII is the great revolt of 52 BC and it is the best of the seven. It opens with the murder of the Roman traders at Cenabum and the news of it crossing a hundred and sixty miles before nightfall, relayed by men shouting to each other across fields. Then the only real portrait of an enemy commander in the whole work: Vercingetorix, thrown out of his own town by his uncle, raising an army out of the destitute, marching back, being made king, and holding his coalition together by burning men alive and sending others home with an eye put out.',
          'Then the strategy that nearly won it. Vercingetorix tells a council that the Romans must be starved rather than fought, and that this means burning their own country: more than twenty towns go up in a single day. The Bituriges beg on their knees to keep one of them, the beautiful city of Avaricum. He argues against it and gives way - the one argument he loses - and thirteen chapters later the Romans take Avaricum and kill everyone in it. Of forty thousand people, eight hundred got out.',
          'Then the two sieges. After Gergovia, the one battle Caesar clearly lost in Gaul, he calls the army together and explains that the defeat was theirs. At Alesia he builds twenty-five kilometres of works in a month, and the excerpt here is about the traps in front of them, which the soldiers who dug them nicknamed tombstones, lilies and goads. Inside the town, a starving council listens to a man propose that they eat the old - and then deliver the sharpest attack on Roman imperialism anywhere in Latin. It is the only enemy speech Caesar ever quotes in full, and he tells you in advance that he is printing it because of its wicked cruelty.',
          'And then the surrender, in five sections with no adjectives at all: Caesar sits down in front of the camp, the commanders are brought out, Vercingetorix is handed over, the weapons are thrown down. The famous scene with the armour and the horse is Plutarch\'s, written a century and a half later. The man who was there did not think it worth a sentence.',
          'Notes the chapters take for granted. Why the killing of the Roman traders at Cenabum is reported the way it is, and what it is worth twenty-five chapters later when the Romans take Avaricum. Why Vercingetorix would have read to a Roman senator as Catiline if Catiline had won, and how the short sentences make a year of work look like an afternoon of it. Why the plan to starve the Romans out is Roman thinking, and why the answer to it had to be twenty-five kilometres of ditch instead of a battle. What the traps at Alesia actually did on the day, and why three pieces of army slang exist in Latin at all. Where the cannibal speech meets Tacitus, who a century and a half later hands the same case against Rome to an enemy and does not take it back. And what happens in the last chapter of the book, once everyone has gone home.'
        ],
        changed: [
          'Three faults in the source text of Book VII are corrected and recorded: one word had lost its beginning, and two others are printed with the ancient capital V for U, which the app now spells with a U as it does elsewhere.',
          'Six excerpts had their numbered paragraphs in the right order but in the wrong places in the translations. The Latin would close a paragraph after two sentences where the English and the Italian closed it after one, so everything from there on sat a sentence out of step - which is the exact thing the numbers are there to prevent. Four are in Book VII and two are older, in Book V. All six are fixed, and there is now a check that compares how the Latin divides an excerpt against how each translation divides it, so it cannot happen again without somebody noticing.',
          'Book VII.15 is told in the present tense in the Latin and in the Italian, and the English now matches it. And the speech of Critognatus, which begins nine paragraphs in, now opens with a quotation mark instead of only closing with one.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Nove brani dal libro VII, e con essi la guerra gallica è finita: ci sono tutti e sette i libri, quaranta brani, e Cesare è il secondo autore dell\'app per numero di passi.',
          'Il libro VII è la grande rivolta del 52 a.C. ed è il migliore dei sette. Si apre con l\'uccisione dei mercanti romani a Cenabum e con la notizia che percorre centosessanta miglia prima di sera, trasmessa da uomini che si gridano l\'un l\'altro attraverso i campi. Poi l\'unico vero ritratto di un comandante nemico in tutta l\'opera: Vercingetorige, cacciato dalla sua stessa città dallo zio, che raduna un esercito fra i disperati, torna indietro, viene fatto re e tiene insieme la coalizione bruciando vivi gli uomini e rimandandone a casa altri con un occhio cavato.',
          'Poi la strategia che per poco non vinse. Vercingetorige spiega a un consiglio che i Romani vanno affamati e non affrontati, e che questo significa bruciare il proprio paese: più di venti città vanno a fuoco in un giorno solo. I Biturigi supplicano in ginocchio di risparmiarne una, la bellissima Avarico. Lui è contrario e cede - l\'unica discussione che perde - e tredici capitoli dopo i Romani prendono Avarico e uccidono tutti. Di quarantamila persone, ne uscirono ottocento.',
          'Poi i due assedi. Dopo Gergovia, l\'unica battaglia che in Gallia Cesare abbia chiaramente perso, riunisce l\'esercito e spiega che la sconfitta è dei soldati. Ad Alesia costruisce venticinque chilometri di opere in un mese, e il brano qui riguarda le trappole poste davanti, che i soldati che le scavarono soprannominarono cippi, gigli e pungoli. Dentro la città un consiglio affamato ascolta un uomo proporre di mangiare i vecchi, e poi pronunciare l\'attacco più tagliente all\'imperialismo romano che esista in latino. È l\'unico discorso nemico che Cesare citi per intero, e vi premette che lo stampa per la sua scellerata crudeltà.',
          'E poi la resa, in cinque paragrafi senza un solo aggettivo: Cesare siede davanti all\'accampamento, i comandanti vengono condotti fuori, Vercingetorige viene consegnato, le armi vengono gettate. La scena celebre con l\'armatura e il cavallo è di Plutarco, scritta un secolo e mezzo dopo. Chi era presente non la ritenne degna di una frase.',
          'Note che i capitoli danno per scontate. Perché l\'uccisione dei mercanti romani a Cenabum è raccontata così, e quanto vale venticinque capitoli dopo, quando i Romani prendono Avarico. Perché a un senatore romano Vercingetorige sarebbe sembrato Catilina se Catilina avesse vinto, e come le frasi brevi facciano sembrare un anno di lavoro il lavoro di un pomeriggio. Perché il piano di affamare i Romani è un ragionamento romano, e perché la risposta doveva essere venticinque chilometri di fossato invece di una battaglia. Che cosa fecero davvero le trappole di Alesia il giorno della battaglia, e perché tre parole del gergo dei soldati esistono in latino. Dove il discorso del cannibale incontra Tacito, che un secolo e mezzo dopo mette la stessa accusa contro Roma in bocca a un nemico e non la ritira. E che cosa accade nell\'ultimo capitolo del libro, quando tutti sono tornati a casa.'
        ],
        changed: [
          'Tre difetti del testo di partenza del libro VII sono corretti e registrati: una parola aveva perso l\'inizio, e altre due sono stampate con l\'antica V maiuscola al posto della U, che l\'app ora scrive con la U come fa altrove.',
          'Sei brani avevano i paragrafi numerati nell\'ordine giusto ma nei punti sbagliati delle traduzioni. Il latino chiudeva un paragrafo dopo due frasi dove l\'inglese e l\'italiano lo chiudevano dopo una, e da lì in poi tutto restava sfasato di una frase: esattamente la cosa che i numeri servono a evitare. Quattro sono nel libro VII e due sono più vecchi, nel libro V. Tutti e sei sono stati corretti, e ora c\'è un controllo che confronta come il latino divide un brano con come lo divide ciascuna traduzione, così non può più succedere senza che qualcuno se ne accorga.',
          'Il libro VII.15 è raccontato al presente in latino e in italiano, e ora anche l\'inglese lo segue. E il discorso di Critognato, che comincia nove paragrafi dentro, ora apre con una virgoletta invece di limitarsi a chiuderne una.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.11.4', date: '03/09/2026', time: '21:05', tz: 'CEST',
      en: {
        added: [
          'Nine more excerpts from the Gallic War: seven from Book V and the last two of Book VI, which is now complete. Caesar is up to 32, and only Book VII is left.',
          'Book V is the bad year. It opens with Caesar killing an allied Gaulish noble who is shouting that he is a free man of a free state - the only time in seven books a Gaul is allowed to say what the war looks like from the other side. Then Britain, the woad and the shared wives. Then the winter, and the only disaster Caesar ever had to report: a chieftain talking a Roman legate into leaving his camp, the two commanding officers shouting at each other in front of the troops, and fifteen cohorts destroyed, with the eagle thrown back inside the rampart by a standard-bearer who then turned round to die.',
          'And two things from the same winter that are not disasters. Two centurions who had spent years competing for the same promotion and spent one afternoon saving each other\'s lives, told in the present tense like a piece of film. And a letter to a besieged camp, written in Latin but in Greek characters so that an intercepted copy would be useless, tied to a javelin and thrown over the wall - where it stuck in a tower and nobody noticed it for two days.',
          'Book VI closes with the two chapters that frame its great digression: the factions that split every state and almost every household in Gaul, and the aurochs of the Hercynian forest, a little smaller than an elephant, whose horns were rimmed with silver and drunk from at feasts. That last chapter is the only one in the seven books with no Roman in it anywhere.',
          'Context for the men Book V assumes you already know. Dumnorix, the Aeduan noble killed in the first excerpt, was the richest man in the state that was Rome\'s oldest ally in Gaul, brother of Caesar\'s most useful friend there, and had been caught helping the enemy once already and forgiven. He did not leave at random: Caesar was shipping the leading men of Gaul to Britain so that nobody could organise a rising while he was away, and Dumnorix spent weeks trying to get out of it before simply riding off. And Ambiorix, whose speech takes up the longest excerpt, was a small king who owed Caesar two personal favours and had just attacked him, which is why the speech has to begin with gratitude.',
          'Three notes on the disaster. The officer who died worst had, seven chapters earlier, made a loud speech about who would answer for what if things went wrong - so the man who cast himself as the realist is the one who walks unarmed into a parley and is killed mid-sentence, while the colleague he overruled dies fighting and the bravest man present holds no command at all. Caesar never mentions that the legions were wintering apart because he had put them there. And he did not let it go: the following year was given over to destroying the people responsible, with the neighbouring tribes invited in to do the plundering.',
          'A note on the relief of the besieged camp: the people besieging it are the Nervii, the same people Caesar had spared five years earlier when they were down to three senators out of six hundred - so the mercy of Book II has a bill, and this is where it is presented. And a note on the great digression: Gaul is divided into three at the start of the work because Caesar divides it, and into two everywhere in Book VI because the Gauls had already divided themselves. The second division is the useful one. It is divide and rule with the first half done for him.',
        ],
        changed: [
          'The two druid excerpts, which have been in the app since it launched, had two paragraphs of analysis each and both were about grammar. They now have four more between them, on the history: that almost everything anyone knows about the druids comes from these two chapters, that the Gaul Caesar describes has a priesthood, a knightly order and a commons and therefore looks suspiciously like Rome, that the refusal to write anything down is the reason no druidic literature exists, and that Rome eventually banned the whole institution. There is also a connection worth having - Caesar\'s own closest Gaulish ally was a druid, and we know it from Cicero rather than from Caesar.',
          'The first excerpt of Book V now says who Dumnorix was and why he ran; the Ambiorix speech now says who he was, and identifies the Cicero he mentions as Quintus, the orator\'s younger brother, who is the man besieged three excerpts later. The council of war now says what was actually being argued about: whether to believe Ambiorix, on the strength of that speech and nothing else. And the chapter on Gallic factions now explains who the Aedui were.',
          'The description of the Ambiorix speech said almost none of it was true while the analysis said the opposite. Both have been rewritten to the same, more useful answer: the parts Sabinus could check were true, and that is exactly what buys belief for the two that were invented - the German army and the safe conduct.',
          'In the aurochs excerpt, one sentence about trapping them in pits had drifted into the wrong numbered section in both translations. It is back where the Latin has it.',
          'The Latin Library prints the first word of the British marriage customs as Vxores, with a capital V, because the Roman alphabet had no letter U. The app now prints Uxores, which is what every modern edition does; the old spelling is still recorded as a declared correction so the text can be checked against the source.',
          'Two Italian corrections. A purpose clause was being rendered perche apparisse aver usato misericordia, which is missing a word and could also be read as a causal; it is now affinche apparisse di aver usato misericordia, in the translation and in the three analyses that quote it. The same fault turned up in a Catilinarian excerpt and was fixed there too.',
          'A claim that had to be withdrawn: the analysis of the second druid excerpt said that Cicero\'s description of a real druid, at De Divinatione I.90, was already in this app. It is not. The reference stands, the claim about the app is gone.',
          'A note on the aurochs excerpt for anyone translating it: three of its verbs have no subject written anywhere in the passage, and the subject of all three is the Germans, carried over from several chapters earlier. Latin is happy to leave that to the reader; English and Italian are not, so the translations have to put somebody back in.',
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Altri nove brani dalla guerra gallica: sette dal libro V e gli ultimi due del libro VI, che ora è completo. Cesare arriva a 32, e resta soltanto il libro VII.',
          'Il libro V è l\'anno brutto. Si apre con Cesare che fa uccidere un nobile gallo alleato mentre grida di essere un uomo libero di una città libera: l\'unica volta in sette libri in cui a un Gallo sia concesso di dire che aspetto abbia la guerra vista dall\'altra parte. Poi la Britannia, il guado e le mogli in comune. Poi l\'inverno, e l\'unico disastro che Cesare abbia mai dovuto riferire: un capo che convince un legato romano ad abbandonare l\'accampamento, i due comandanti che si urlano addosso davanti alla truppa, e quindici coorti distrutte, con l\'aquila rilanciata dentro il vallo da un portainsegne che poi si volta a morire.',
          'E dallo stesso inverno due cose che disastri non sono. Due centurioni che avevano passato anni a contendersi la stessa promozione e passarono un pomeriggio a salvarsi la vita a vicenda, raccontati al presente come una sequenza di film. E una lettera a un accampamento assediato, scritta in latino ma con caratteri greci perché una copia intercettata risultasse inutile, legata a un giavellotto e scagliata oltre il muro, dove si conficcò in una torre e per due giorni nessuno la vide.',
          'Il libro VI si chiude con i due capitoli che incorniciano la sua grande digressione: le fazioni che dividono ogni nazione e quasi ogni casa della Gallia, e l\'uro della selva Ercinia, poco più piccolo di un elefante, le cui corna venivano rivestite d\'argento e usate per bere nei banchetti. Quest\'ultimo capitolo è l\'unico dei sette libri in cui non compaia un Romano da nessuna parte.',
          'Contesto sugli uomini che il libro V dà per noti. Dumnorige, il nobile eduo ucciso nel primo brano, era l\'uomo più ricco della nazione che era la più antica alleata di Roma in Gallia, fratello dell\'amico più utile che Cesare avesse laggiù, ed era già stato colto ad aiutare il nemico una volta e perdonato. Non se ne andò a caso: Cesare stava imbarcando per la Britannia i capi della Gallia perché nessuno potesse organizzare una rivolta in sua assenza, e Dumnorige passò settimane a cercare di sottrarsi prima di andarsene e basta. E Ambiorige, il cui discorso occupa il brano più lungo, era un piccolo re che doveva a Cesare due favori personali e lo aveva appena attaccato: ecco perché il discorso deve cominciare dalla gratitudine.',
          'Tre note sul disastro. L\'ufficiale che muore peggio aveva fatto, sette capitoli prima, un discorso a voce alta su chi avrebbe risposto di che cosa se le cose fossero andate male: e così l\'uomo che si era presentato come il realista è quello che entra disarmato in un colloquio e viene ucciso a metà frase, mentre il collega che aveva messo in minoranza muore combattendo e il più coraggioso dei presenti non ha alcun comando. Cesare non ricorda mai che le legioni svernavano separate perché ce le aveva messe lui. E non lasciò correre: l\'anno successivo fu dedicato a distruggere il popolo responsabile, con le tribù vicine invitate a partecipare al saccheggio.',
          'Una nota sulla liberazione dell\'accampamento assediato: chi lo assedia sono i Nervi, lo stesso popolo che Cesare aveva risparmiato cinque anni prima quando era ridotto a tre senatori su seicento; la clemenza del libro II ha dunque un conto da pagare, ed è qui che viene presentato. E una nota sulla grande digressione: la Gallia è divisa in tre all\'inizio dell\'opera perché la divide Cesare, ed è divisa in due dappertutto nel libro VI perché i Galli si erano già divisi da soli. È la seconda divisione quella utile. È un divide et impera con la prima metà già fatta.',
        ],
        changed: [
          'I due brani sui druidi, presenti nell\'app fin dal lancio, avevano due paragrafi di analisi ciascuno ed entrambi parlavano di grammatica. Ora ne hanno quattro in più fra tutti e due, sulla storia: che quasi tutto ciò che si sa dei druidi viene da questi due capitoli; che la Gallia descritta da Cesare ha un sacerdozio, un ordine equestre e un popolo e somiglia dunque in modo sospetto a Roma; che il rifiuto di mettere per iscritto qualsiasi cosa è il motivo per cui non esiste una letteratura druidica; e che Roma finì per proibire l\'intera istituzione. C\'è anche un collegamento che vale la pena avere: il più stretto alleato gallo di Cesare era un druido, e lo sappiamo da Cicerone e non da Cesare.',
          'Il primo brano del libro V dice ora chi fosse Dumnorige e perché fuggì; il discorso di Ambiorige dice ora chi fosse lui, e identifica il Cicerone che nomina come Quinto, il fratello minore dell\'oratore, che è l\'uomo assediato tre brani più avanti. Il consiglio di guerra dice ora su che cosa si stesse davvero discutendo: se credere ad Ambiorige, sulla base di quel discorso e di nient\'altro. E il capitolo sulle fazioni galliche spiega ora chi fossero gli Edui.',
          'La descrizione del discorso di Ambiorige diceva che quasi nulla in esso fosse vero, mentre l\'analisi diceva il contrario. Entrambe sono state riscritte con la stessa risposta, più utile: le parti che Sabino poteva verificare erano vere, ed è proprio questo a comprare fiducia per le due inventate, l\'esercito germanico e il salvacondotto.',
          'Nel brano sull\'uro, una frase sulla cattura con le fosse era scivolata nel paragrafo numerato sbagliato in entrambe le traduzioni. È tornata dove la mette il latino.',
          'The Latin Library stampa la prima parola sugli usi matrimoniali britannici come Vxores, con la V maiuscola, perché l\'alfabeto romano non aveva la lettera U. L\'app stampa ora Uxores, come fanno tutte le edizioni moderne; la vecchia grafia resta registrata come correzione dichiarata, così il testo si può ancora confrontare con la fonte.',
          'Due correzioni italiane. Una proposizione finale era resa con perché apparisse aver usato misericordia, a cui manca una parola e che si potrebbe leggere anche come causale; ora è affinché apparisse di aver usato misericordia, nella traduzione e nelle tre analisi che la citano. Lo stesso errore è saltato fuori in un brano delle Catilinarie ed è stato corretto anche lì.',
          'Un\'affermazione da ritirare: l\'analisi del secondo brano sui druidi diceva che la descrizione ciceroniana di un druido reale, in De Divinatione I.90, fosse già in quest\'app. Non lo è. Il rimando resta, l\'affermazione sull\'app è tolta.',
          'Una nota sul brano dell\'uro per chi lo traduce: tre dei suoi verbi non hanno alcun soggetto scritto nel passo, e il soggetto di tutti e tre sono i Germani, ripresi da diversi capitoli prima. Al latino va bene lasciarlo al lettore; all\'inglese e all\'italiano no, e quindi le traduzioni devono rimettercelo.',
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.11.3', date: '01/09/2026', time: '22:52', tz: 'CEST',
      en: {
        added: [
          'Ten more excerpts from the Gallic War. Book III and Book IV are now complete, and Book VI has grown from two to four. Caesar is up to 23.',
          'Book III is the sea war against the Veneti, and it is three chapters of one story. First the enemy ships, described plank by plank, in a passage that quietly admits the Roman navy was outclassed on the Atlantic. Then the battle, won with a siege hook lashed to a pole and fought in front of the whole army seated on the hills. Then the reprisal: the entire Venetic senate executed and everyone else sold, with the reason given as coolly as a clerk would give it.',
          'Book IV runs from the Rhine to Britain. The Gauls who stop travellers on the road to squeeze them for news, and then decide great questions on what they hear. The destruction of two German peoples, four hundred and thirty thousand of them, without a single Roman killed - the episode for which Cato proposed in the Senate that Caesar be handed to the Germans. The bridge over the Rhine, described so exactly that engineers have rebuilt it from this chapter alone, and built because crossing by boat was beneath Rome\'s dignity. The eagle-bearer of the Tenth who jumps into the sea off the coast of Britain, in the only speech in this batch that Caesar reports in the man\'s own words. And the British war chariot, explained from scratch because nobody in the Mediterranean had used one for centuries.',
          'Book VI gains the two chapters that belong beside the druids already there: the Gallic sacrifices, with the enormous wicker figures filled with living men, and the Germans, who have no druids, no interest in sacrifice, and no gods they cannot see.',
          'Eight new notes in the analyses, most of them about the argument the book never makes out loud. On the Gauls who decide great questions from market gossip: if a people cannot govern themselves, somebody has to do it for them, and there is already a Roman army in the country - Caesar supplies the premises and lets the reader finish it. On the human sacrifices: the same trick, and probably the strongest justification in the whole work precisely because he adds nothing to it. Rome had outlawed human sacrifice by decree in 97 BC, forty years before, so his readers had just legislated against exactly what he is describing.',
          'On the Veneti: the stronger the enemy looks, the larger the victory over him, which is why Caesar spends nine sections admiring enemy shipbuilding - and why the hooked pole in the next excerpt lands like a machine lowered onto a stage, a problem declared insoluble and then solved from outside it by a piece of siege equipment.',
          'On the Germans released after the massacre of their people: mercy placed where it will be read, exactly as with the Nervii. On the Rhine bridge: what Roman engineering could actually do, and a note on the one first-person verb in the chapter, since the author of these books otherwise calls himself Caesar and never says I. On the eagle-bearer: the Tenth Legion, the only favourite Caesar ever admits to, living up in public to the description he gave it. And on the British chariots: this paragraph and the digressions of Book VI are very nearly all anyone knows about these peoples, the only comparable document being Tacitus\'s Germania - which is itself partly built on Caesar.',
        ],
        changed: [
          'An excerpt that does not cover a whole chapter now says so in its citation. Three do not, and they now read De Bello Gallico I.1.1-4, I.40.10-15 and I.53.1-7 instead of naming the chapter alone. Every other Caesar excerpt covers its chapter from the first section to the last, and was checked against the numbered edition to make sure of it.',
          'In the chariot passage, tela is now rendered projectiles rather than missiles, along with three other places where the same word had been translated the same way.',
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Altri dieci brani dalla guerra gallica. I libri III e IV sono ora completi, e il libro VI è passato da due a quattro. Cesare arriva a 23.',
          'Il libro III è la guerra navale contro i Veneti, e sono tre capitoli di una sola storia. Prima le navi nemiche, descritte tavola per tavola, in un passo che ammette senza clamore che sull\'Atlantico la marina romana era inferiore. Poi la battaglia, vinta con una falce da assedio legata a una pertica e combattuta davanti a tutto l\'esercito seduto sulle colline. Poi la rappresaglia: l\'intero senato veneto giustiziato e tutti gli altri venduti, con la motivazione esposta con la freddezza di un impiegato.',
          'Il libro IV va dal Reno alla Britannia. I Galli che fermano i viandanti sulla strada per spremerne notizie, e poi decidono grandi questioni in base a ciò che sentono. La distruzione di due popoli germanici, quattrocentotrentamila persone, senza un solo morto romano: l\'episodio per cui Catone propose in Senato che Cesare fosse consegnato ai Germani. Il ponte sul Reno, descritto con tanta esattezza che degli ingegneri lo hanno ricostruito basandosi solo su quel capitolo, e costruito perché passare in barca sarebbe stato indegno di Roma. L\'aquilifero della Decima che si getta in mare davanti alla costa britannica, nell\'unico discorso di questo gruppo che Cesare riferisce con le parole stesse di chi lo pronuncia. E il carro da guerra britannico, spiegato da zero perché nel Mediterraneo nessuno ne usava più da secoli.',
          'Il libro VI guadagna i due capitoli che stanno accanto ai druidi già presenti: i sacrifici gallici, con gli enormi simulacri di vimini riempiti di uomini vivi, e i Germani, che non hanno druidi, non si curano dei sacrifici e non hanno dèi che non si possano vedere.',
          'Otto nuove note nelle analisi, quasi tutte sull\'argomento che il libro non formula mai apertamente. Sui Galli che decidono le grandi questioni in base alle chiacchiere di mercato: se un popolo non sa governarsi, qualcuno deve farlo al posto suo, e in quel paese c\'è già un esercito romano; Cesare fornisce le premesse e lascia che sia il lettore a concludere. Sui sacrifici umani: lo stesso meccanismo, ed è probabilmente la giustificazione più forte di tutta l\'opera proprio perché non vi aggiunge nulla. Roma aveva proibito per decreto il sacrificio umano nel 97 a.C., quarant\'anni prima: i suoi lettori avevano appena legiferato esattamente contro ciò che sta descrivendo.',
          'Sui Veneti: quanto più forte appare il nemico, tanto più grande è la vittoria su di lui, ed è per questo che Cesare spende nove paragrafi ad ammirare la cantieristica nemica; ed è per questo che la falce su pertica del brano successivo arriva come una macchina calata sul palcoscenico, con un problema dichiarato insolubile e poi risolto dall\'esterno da un attrezzo d\'assedio.',
          'Sui Germani liberati dopo il massacro del loro popolo: la clemenza messa dove verrà letta, esattamente come con i Nervi. Sul ponte sul Reno: che cosa sapesse fare davvero l\'ingegneria romana, e una nota sull\'unico verbo in prima persona del capitolo, dato che l\'autore di questi libri per il resto si chiama Cesare e non dice mai io. Sull\'aquilifero: la Decima legione, l\'unica preferenza che Cesare ammetta, che si mette in pubblico all\'altezza della descrizione che le aveva dato. E sui carri britannici: questo paragrafo e le digressioni del libro VI sono quasi tutto ciò che si sa di questi popoli, e l\'unico documento paragonabile è la Germania di Tacito, che a sua volta è in parte costruita su Cesare.',
        ],
        changed: [
          'Un brano che non copre un capitolo intero ora lo dichiara nella citazione. Tre non lo coprono, e si leggono ora De Bello Gallico I.1.1-4, I.40.10-15 e I.53.1-7 invece di nominare il solo capitolo. Ogni altro brano di Cesare copre il proprio capitolo dal primo paragrafo all\'ultimo, ed è stato verificato sull\'edizione numerata per esserne certi.',
          'Nel passo sui carri, tela è ora reso con proiettili invece che con missili, insieme ad altri tre punti in cui la stessa parola era stata tradotta allo stesso modo.',
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.11.2', date: '01/09/2026', time: '22:36', tz: 'CEST',
      en: {
        added: [
          'Ten new excerpts from the Gallic War: six from Book I and four from Book II. Caesar had three in the whole app before today.',
          'Book I follows the year 58 BC from end to end. The opening sentence every Latin student meets first; the Helvetian envoy Divico, who fifty years earlier had commanded the army that destroyed a Roman consul, warning Caesar to think carefully about place-names; the captured tablets on which the Helvetii had written down every person who left home, and the number who came back; the night the whole army heard what Germans look like and started sealing its wills; Caesar\'s answer to that panic, ending on the promise to go with the Tenth Legion alone; and the rescue of one friend in chains, which Caesar says pleased him no less than winning.',
          'Book II is the Belgic campaign. Why a province revolts, in four ranked reasons; the general\'s to-do list written as seven things that all had to happen at once; the moment Caesar takes a shield off a man in the back rank and walks into the front line; and the Nervii fighting from a mound built out of their own dead, followed by the arithmetic of what was left of them.',
          'The chapter number is back at the head of the English and the Italian, so each translation now opens the way its Latin does and the two spans that cross a chapter boundary break in the same place in all three texts.',
          'Two notes on the Nervii excerpt about what the Gallic War actually was. The chapter records a people brought almost to extinction - sixty thousand fighting men reduced to five hundred - and the striking thing is that you can read that sentence without the ground moving. That is the achievement of the book, and the note names it as one: Caesar never announces a decision to conquer Gaul, every war in the seven books arrives as a response to somebody else, and the killing always turns up as the consequence of a choice made by the other side. Cato proposed in the Senate that Caesar be handed over to the Germans for attacking them during a truce, and was voted down; at the end of this same book the Senate voted the longest public thanksgiving ever granted to anyone.',
          'A note on courage, on both sides. The Roman wounded prop themselves on their shields and start again, the unarmed camp servants charge armed men, the cavalry come back to wipe out the disgrace of running; the Nervii climb onto the corpses of their own front rank in order to keep throwing. One word covers both. But the two are caused differently: Roman courage in these books is switched back on by an arrival, while Gallic courage needs no trigger and simply is.',
          'A note on the same theme in the excerpt where Caesar takes a shield off a man in the back rank. No reserve arrives; the text says flatly there was none. All that arrives is Caesar, and the enemy charge slows. Each man wants to do his utmost *in the sight of his commander*, and in his own final extremity - four Latin words carrying a whole military philosophy.'
        ],
        changed: [
          'The tool that adds the subsection numbers can now handle an excerpt that runs across two chapters, where the count starts again from one after the new chapter number, and an excerpt that covers only part of a chapter, which now has to say so explicitly rather than being quietly trimmed.',
          'In the excerpt where the army starts sealing its wills, the English and Italian now name Caesar in the opening clause instead of opening on a bare "he". The Latin verb is singular and its subject is Caesar, carried over from the end of the previous chapter, while the army appears later as the object; but the excerpt began cold on a pronoun with nothing to attach it to, which is a fault this app tries not to commit. The analysis now explains the grammar, because the whole chapter turns on it: one man is held up on supply business, and everybody around him falls apart.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Dieci nuovi brani dalla guerra gallica: sei dal libro I e quattro dal libro II. Prima di oggi Cesare ne aveva tre in tutta l\'app.',
          'Il libro I segue il 58 a.C. da un capo all\'altro. La frase d\'apertura che ogni studente di latino incontra per prima; l\'ambasciatore elvetico Divicone, che cinquant\'anni prima aveva comandato l\'esercito che annientò un console romano, mentre avverte Cesare di riflettere bene sui nomi dei luoghi; le tavolette catturate su cui gli Elvezi avevano annotato ogni persona partita da casa, e il numero di quelle tornate; la notte in cui tutto l\'esercito sentì raccontare come sono fatti i Germani e cominciò a sigillare testamenti; la risposta di Cesare a quel panico, che si chiude sulla promessa di andare con la sola Decima legione; e il recupero di un amico in catene, che a Cesare, dice lui, fece piacere non meno della vittoria.',
          'Il libro II è la campagna belgica. Perché una provincia si ribella, in quattro motivi ordinati; la lista di cose da fare del comandante scritta come sette cose che dovevano accadere tutte insieme; il momento in cui Cesare toglie lo scudo a un soldato delle ultime file ed entra in prima linea; e i Nervi che combattono da un cumulo costruito con i loro stessi morti, seguiti dall\'aritmetica di quanto ne restava.',
          'Il numero di capitolo è tornato in testa all\'inglese e all\'italiano, così ogni traduzione si apre come si apre il suo latino, e i due brani che attraversano un confine di capitolo vanno a capo nello stesso punto in tutti e tre i testi.',
          'Due note al brano sui Nervi su che cosa sia stata davvero la guerra gallica. Il capitolo registra un popolo ridotto quasi all\'estinzione - sessantamila uomini in armi ridotti a cinquecento - e la cosa impressionante è che si può leggere quella frase senza che il terreno si muova. È questa l\'impresa del libro, e la nota la chiama impresa: Cesare non annuncia mai la decisione di conquistare la Gallia, ogni guerra dei sette libri arriva come risposta a qualcun altro, e la strage compare sempre come conseguenza di una scelta altrui. Catone propose in Senato che Cesare fosse consegnato ai Germani per averli attaccati durante una tregua, e fu messo in minoranza; alla fine di questo stesso libro il Senato votò il più lungo ringraziamento pubblico mai concesso a chiunque.',
          'Una nota sul coraggio, da entrambe le parti. I feriti romani si puntellano sugli scudi e ricominciano, gli attendenti disarmati caricano uomini armati, i cavalieri tornano a cancellare l\'onta della fuga; i Nervi salgono sui cadaveri della propria prima fila per continuare a lanciare. Una sola parola copre entrambi. Ma i due valori vengono innescati in modo diverso: in questi libri il coraggio romano viene riacceso da un arrivo, mentre quello gallico non ha bisogno di alcun innesco e semplicemente c\'è.',
          'Una nota sullo stesso tema nel brano in cui Cesare toglie lo scudo a un soldato delle ultime file. Nessuna riserva arriva: il testo dice seccamente che non ce n\'erano. L\'unica cosa che arriva è Cesare, e l\'assalto nemico rallenta. Ciascuno vuole dare il meglio *sotto gli occhi del comandante*, e nella propria estrema rovina: quattro parole latine che portano un\'intera filosofia militare.'
        ],
        changed: [
          'Lo strumento che inserisce i numeri di paragrafo regge ora un brano che corre su due capitoli, dove il conteggio riparte da uno dopo il nuovo numero di capitolo, e un brano che copre solo una parte di un capitolo, il quale ora deve dichiararlo esplicitamente invece di essere tagliato in silenzio.',
          'Nel brano in cui l\'esercito comincia a sigillare testamenti, l\'inglese e l\'italiano nominano ora Cesare nella proposizione d\'apertura invece di aprirsi su un pronome sottinteso. Il verbo latino è singolare e il suo soggetto è Cesare, ripreso dalla fine del capitolo precedente, mentre l\'esercito compare dopo come oggetto; ma il brano cominciava di colpo su un pronome senza nulla a cui agganciarlo, ed è un difetto che questa app cerca di non commettere. L\'analisi ora spiega la grammatica, perché è su quella che gira tutto il capitolo: un uomo solo è trattenuto da questioni di rifornimento, e tutti intorno a lui vanno in pezzi.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.11.1', date: '2026-09-01', time: '19:08', tz: 'CEST',
      en: {
        added: [
          'Nothing was added. This is a one-line repair to a display fault on two Italian pages.'
        ],
        changed: [
          'On the Italian pages for Pacuvius and Accius, and for Pomponius and Novius, the biography opened with a line of stray asterisks and the words "ricostruzione immaginaria" - the caption belonging to a portrait, printed as text instead of sitting under the picture. The second author of each pair carried the same line further down.',
          'The app strips those captions out before it draws the page, but it only knew the English wording, "imaginary reconstruction". It now recognises the Italian one too, and both captions disappear from both entries.',
          'Only these two pages were affected, and only in Italian. They are the two entries covering a pair of authors, so they carry two portraits each; on the single-portrait pages the caption was already being caught by the rule that removes the picture itself.'
        ],
        deleted: [
          'Nothing was deleted.'
        ]
      },
      it: {
        added: [
          'Non è stato aggiunto nulla. Questa è una correzione di una riga a un difetto di visualizzazione su due pagine italiane.'
        ],
        changed: [
          'Nelle pagine italiane di Pacuvio e Accio, e di Pomponio e Novio, la biografia si apriva con una riga di asterischi sparsi e le parole "ricostruzione immaginaria": la didascalia di un ritratto, stampata come testo invece di stare sotto l’immagine. Il secondo autore di ciascuna coppia portava la stessa riga più in basso.',
          'L’app toglie quelle didascalie prima di disegnare la pagina, ma conosceva soltanto la dicitura inglese, "imaginary reconstruction". Ora riconosce anche quella italiana, ed entrambe le didascalie spariscono da entrambe le voci.',
          'Erano interessate solo queste due pagine, e solo in italiano. Sono le due voci che trattano una coppia di autori, quindi portano due ritratti ciascuna; nelle pagine con un solo ritratto la didascalia veniva già intercettata dalla regola che elimina l’immagine stessa.'
        ],
        deleted: [
          'Non è stato eliminato nulla.'
        ]
      }
    },
    {
      v: '1.11.0', date: '01/09/2026', time: '19:07', tz: 'CEST',
      en: {
        added: [
          'Those subsection numbers now run through the translations as well, so section 4 of the Latin sits opposite section 4 of the English and section 4 of the Italian. If a translation ever drifts from the Latin, this is what makes it show.',
          'Caesar\'s and Hirtius\'s excerpts now carry the small bold numbers that mark the subsections inside each chapter - the ones a textbook means when it cites "Gallic War 6.13.4". The Latin Library prints the chapter number and nothing else, so these come from a numbered edition and are supplied by the app, exactly as the chapter numbers in square brackets already were. The preface to Gallic War VIII turns out to have seven of them.',
          'Caesar and Hirtius are opened up. No new excerpts yet - this release is the scaffolding for the next twelve, and the first time either author has been checked against his source at all.',
          'Caesar now has a two-level chooser, like Cicero\'s Verrines: first the Gallic War or the Civil War, then the book. Ten books are in place, waiting to be filled. Hirtius has a simpler one: De Bello Gallico VIII and the Bellum Alexandrinum side by side.',
          'All twelve source texts are now downloaded and mapped - the seven books of the Gallic War, the three of the Civil War, Hirtius\'s eighth book, and the Alexandrian War. That is roughly 700 chapters of Latin available to draw on.'
        ],
        changed: [
          'The two Alexandrian War translations were carrying the chapter number at the front, which the other four were not. It is gone: the citation above the excerpt already says which chapter this is, and what a reader needs to line up is the small numbers inside.',
          'On Hirtius\'s page, the line naming De Bello Gallico, Book VIII was showing its asterisks instead of coming out in bold, in both languages. The renderer cannot cope with an italic title sitting inside a bold phrase; three more lines on Caesar\'s page had the same fault. All four are fixed, and there is now a check that will catch the next one.',
          'The six excerpts these two authors already had have been checked against the original for the first time, and three of them were wrong. They were typed out by hand when the app was built, from a working draft rather than from the source, and nobody had ever been able to check them, because neither author was connected to the checker. All six have been replaced with text taken straight from the source.',
          'The Civil War excerpt had a capital letter the source does not have. The preface to Gallic War VIII had two invented numbers in it, and a section marker that does not exist on the page. And the first excerpt of the Alexandrian War had quietly dropped a pair of daggers.',
          'Those daggers are worth explaining, and the excerpt now does. They are an editor\'s way of saying "the manuscripts give this word, and it cannot be right, and nobody can fix it". The Alexandrian War has thirteen of them, more than any other text in this app, which tells you something about how roughly it survived. The app prints them rather than silently choosing somebody\'s guess.',
          'The Alexandrian War excerpts are now cited under that name rather than De Bello Alexandrino, which is the title modern editions use.',
          'Behind the scenes, the tool that adds excerpts could only ever work on Cicero - it had his name written into it. It now takes any author, which is what made all of the above possible.'
        ],
        deleted: [
          'Nothing was deleted. The two old catch-all containers that held these six excerpts are gone, but every excerpt moved into its proper book.'
        ]
      },
      it: {
        added: [
          'Quei numeri di paragrafo attraversano ora anche le traduzioni, cosicché il paragrafo 4 del latino stia di fronte al paragrafo 4 dell\'inglese e al paragrafo 4 dell\'italiano. Se una traduzione dovesse allontanarsi dal latino, è questo che lo fa vedere.',
          'I brani di Cesare e Irzio portano ora i piccoli numeri in grassetto che segnano i paragrafi interni a ogni capitolo: quelli a cui si riferisce un manuale quando cita "guerra gallica 6.13.4". The Latin Library stampa il numero del capitolo e nulla più, quindi questi vengono da un\'edizione numerata e sono forniti dall\'app, esattamente come già accadeva per i numeri di capitolo tra parentesi quadre. La prefazione all\'ottavo libro della guerra gallica ne ha sette.',
          'Cesare e Irzio vengono aperti. Ancora nessun brano nuovo: questa uscita è l’impalcatura per le dodici successive, ed è la prima volta che l’uno o l’altro autore venga confrontato con la propria fonte.',
          'Cesare ha ora un menu a due livelli, come le Verrine di Cicerone: prima la guerra gallica o la guerra civile, poi il libro. I dieci libri sono pronti, in attesa di essere riempiti. Irzio ne ha uno più semplice: De Bello Gallico VIII e Bellum Alexandrinum affiancati.',
          'Tutti e dodici i testi di riferimento sono ora scaricati e mappati: i sette libri della guerra gallica, i tre della guerra civile, l’ottavo libro di Irzio e la guerra alessandrina. Sono circa settecento capitoli di latino a disposizione.'
        ],
        changed: [
          'Le due traduzioni della guerra alessandrina portavano il numero di capitolo in testa, cosa che le altre quattro non facevano. È stato tolto: la citazione sopra il brano dice già di quale capitolo si tratti, e ciò che serve al lettore per allineare i testi sono i numeretti interni.',
          'Nella pagina di Irzio la riga che nomina il De Bello Gallico, libro VIII mostrava gli asterischi invece di comparire in grassetto, in entrambe le lingue. Il compositore del testo non regge un titolo in corsivo dentro una frase in grassetto; altre tre righe nella pagina di Cesare avevano lo stesso difetto. Tutte e quattro sono corrette, e ora c\'è un controllo che intercetta la prossima.',
          'I sei brani che questi due autori già avevano sono stati confrontati con l’originale per la prima volta, e tre erano sbagliati. Erano stati trascritti a mano quando l’app fu costruita, da una bozza di lavoro e non dalla fonte, e nessuno aveva mai potuto controllarli, perché nessuno dei due autori era collegato al controllo. Tutti e sei sono stati sostituiti con il testo preso direttamente dalla fonte.',
          'Il brano della guerra civile aveva una maiuscola che la fonte non ha. La prefazione all’ottavo libro della guerra gallica conteneva due numeri inventati e un segno di paragrafo che sulla pagina non esiste. E il primo brano della guerra alessandrina aveva perso per strada una coppia di croci.',
          'Quelle croci meritano una spiegazione, e ora il brano la dà. Sono il modo in cui un editore dice "i manoscritti danno questa parola, non può essere giusta, e nessuno sa correggerla". Il Bellum Alexandrinum ne ha tredici, più di ogni altro testo dell’app, il che dice qualcosa su quanto malamente sia sopravvissuto. L’app le stampa invece di scegliere in silenzio la congettura di qualcuno.',
          'I brani della guerra alessandrina sono ora citati con quel nome invece che come De Bello Alexandrino, che è il titolo usato dalle edizioni moderne.',
          'Dietro le quinte, lo strumento che aggiunge i brani poteva funzionare soltanto su Cicerone: aveva il suo nome scritto dentro. Ora accetta qualsiasi autore, ed è ciò che ha reso possibile tutto il resto.'
        ],
        deleted: [
          'Non è stato eliminato nulla. I due vecchi contenitori generici che ospitavano questi sei brani sono spariti, ma ogni brano è passato nel proprio libro.'
        ]
      }
    },
    {
      v: '1.10.3', date: '2026-09-01', time: '00:31', tz: 'CEST',
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
          'Next in this app: the rest of Caesar\'s Age - Caesar himself, Hirtius, Lucretius, Sallust and Catullus.',
          'Cicero\'s page has gained a small curiosity, asked for by a reader: how one man wrote that much that fast. The answer is his slave and then freedman Tiro, who ran the household\'s writing, took dictation, and is credited with inventing shorthand - signs that stood for whole words rather than letters, fast enough to keep up with a speaking voice. Plutarch says Cicero put clerks trained in them around the Senate in 63 BC to take down a speech of Cato\'s, which is the first time anyone in Rome is recorded doing it. The biography now says so, and the legacy section follows the system afterwards: it outlived the empire in the imperial chancery and the medieval scriptorium, died out in the eleventh century when scribes stopped being able to read it, and left two things behind that are still in use - the word notary, which once meant a shorthand writer, and one surviving sign, still printed on Irish road signs today in place of the word for and.'
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
          'Prossimo passo di questa app: il resto dell’età di Cesare, cioè Cesare stesso, Irzio, Lucrezio, Sallustio e Catullo.',
          'La scheda di Cicerone si è arricchita di una piccola curiosità, richiesta da un lettore: come abbia fatto un uomo solo a scrivere tanto e così in fretta. La risposta è il suo schiavo e poi liberto Tirone, che mandava avanti la scrittura di casa, prendeva sotto dettatura e a cui si attribuisce l’invenzione della stenografia: segni che stavano per parole intere e non per lettere, abbastanza rapidi da tenere il passo di una voce che parla. Plutarco racconta che nel 63 a.C. Cicerone dispose per il Senato scrivani addestrati a quei segni per prendere un discorso di Catone, ed è la prima volta che a Roma risulti fatto. Ora la biografia lo dice, e la sezione sul lascito segue il sistema nel tempo: sopravvisse all’impero nella cancelleria imperiale e negli scriptoria medievali, si spense nell’XI secolo quando gli scribi smisero di saperlo leggere, e lasciò dietro di sé due cose ancora in uso: la parola notaio, che un tempo indicava uno stenografo, e un solo segno superstite, che ancora oggi si stampa sui cartelli stradali irlandesi al posto della parola che vuol dire e.'
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
