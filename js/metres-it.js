/*
 * metres-it.js - the Italian half of the metre reference.
 *
 * An overlay, not a copy: js/metres.js merges these fields over the English
 * record field by field, so anything missing here falls back to English and
 * the notation is never duplicated. The scheme, the pattern lines, the marked
 * scansion and the Latin itself all stay in js/metres.js - they are not
 * language, and keeping them in one place means they can only be wrong once.
 *
 * Same pattern as js/content.js and js/content-it.js.
 */
(function (global) {
  'use strict';

  global.__METRES_IT__ = {

    'dactylic-hexameter': {
      name: 'Esametro Dattilico',
      tagline: "Il metro dell'epica, della poesia didascalica e della satira, e la forma di verso più longeva della letteratura europea.",
      schemeNote: 'Ciascuno dei primi quattro piedi può essere uno spondeo (– –) invece di un dattilo. Il quinto è quasi sempre un dattilo, e il sesto è sempre di due sillabe.',

      origin: [
        'Il nome descrive la cosa. Un *esametro* è un verso di sei misure, e *dattilico* viene dal greco *daktylos*, dito, che ha una falange lunga e due corte: è la forma del piede, una sillaba lunga seguita da due brevi. A ogni scolaro latino il metro veniva insegnato mostrandogli una mano.',
        'È greco, ed è più antico di qualunque greco possiamo leggere. Omero lo usa già nell\'VIII secolo a.C., del tutto formato, con un repertorio di formule pronte costruite per riempirne le caselle: il segno di un metro che era stato in uso orale per moltissimo tempo prima che qualcuno lo scrivesse. Era anche il verso dell\'oracolo di Delfi, perciò fin dall\'inizio portava con sé autorità oltre che solennità.',
        '**La cosa importante è che misura il tempo, non l\'accento.** La metrica inglese si fonda su quali sillabe si battono più forte; quella greca e latina si fonda su quanto tempo occorre a pronunciare ciascuna sillaba. Una sillaba è *lunga* se ha una vocale lunga o un dittongo, oppure se la sua vocale è seguita da due consonanti; altrimenti è *breve*. Una lunga vale esattamente due brevi, e tutto il sistema è aritmetica.',
        '**Il latino non vi si è adattato facilmente.** Il latino ha più sillabe lunghe del greco e un accento di parola forte che tira contro lo schema metrico, perciò i primi risultati suonano forzati. Roma aveva invece il *saturnio*, il verso italico nativo, che nessuno ha ancora spiegato del tutto: Livio Andronico lo usò per la sua traduzione dell\'Odissea e Nevio per la sua guerra punica, e sono entrambi in questa app.',
        '**Poi Ennio, intorno al 180 a.C., scrisse gli Annales in esametri e chiuse la questione.** Lo fece come programma deliberato, annunciando che l\'anima di Omero era passata in lui, e abbandonò il saturnio così completamente che il poema di Nevio parve antiquato nel giro di una generazione. Ogni epica latina dopo di lui è in esametri, e così ogni poema didascalico, ogni satira da Lucilio in poi e infine tutta la poesia bucolica.',
        'Da lì la storia è una storia di rifinitura. Lucilio gli fa portare la conversazione, Lucrezio il ragionamento, Catullo e i neoterici l\'ornamento alessandrino; e dopo gli autori di questa app diventa il metro dell\'*Eneide*, delle *Metamorfosi* e delle Satire di Orazio. Quei poeti non sono ancora nell\'app: quando ci saranno, verranno aggiunti qui.'
      ],

      build: [
        '**Sei piedi per verso.** Un piede è un **dattilo**, una lunga e due brevi (– ⏑ ⏑), oppure uno **spondeo**, due lunghe (– –). I due sono intercambiabili perché occupano lo stesso tempo: quattro *more*, contando una lunga come due e una breve come una. È questo unico fatto a dare al metro la sua libertà.',
        '**I primi quattro piedi sono liberi.** Ciascuno può essere dattilo o spondeo, in qualunque combinazione: sedici aperture possibili.',
        '**Il quinto piede è quasi sempre un dattilo.** Uno spondeo lì si chiama *spondeiazon*, ed è abbastanza raro perché, quando capita, lo si debba notare: è un manierismo greco, e i neoterici lo usano per suonare dotti.',
        '**Il sesto piede è sempre di due sillabe**, e l\'ultima sillaba conta come lunga che lo sia o no. È la regola detta *brevis in longo*: la pausa di fine verso completa il tempo. La chiusa è dunque – – oppure – ⏑, e in entrambi i casi si sente la stessa cadenza.',
        'Un verso va perciò dalle **dodici sillabe** (tutti spondei) alle **diciassette** (tutti dattili), e in entrambi i casi occupa lo stesso tempo.',
        '**La cesura è la frattura dentro un piede in cui finisce una parola**, ed è ciò che impedisce al verso di spezzarsi in sei blocchi uguali. La più frequente di gran lunga è la **pentemimere**, dopo la prima sillaba del terzo piede: cioè dopo cinque mezzi piedi, che è quel che dice il nome. Le alternative sono la *tritemimere* (dopo la prima sillaba del secondo piede) e l\'*eftemimere* (dopo la prima del quarto). Un verso può averne più di una; quella forte è quella che usa la voce.',
        '**L\'elisione è continua e richiede un po\' di abitudine.** Una parola che finisce in vocale, o in vocale più *m*, perde quella terminazione davanti a una parola che comincia per vocale o per *h*. *Albine est* vale tre sillabe, non quattro. Non si scrive nulla di diverso: semplicemente non si pronuncia la sillaba elisa, e se la si conta il verso non torna.',
        'Due fenomeni minori da conoscere: lo **iato**, quando un\'elisione che dovrebbe avvenire non avviene, di solito a una pausa forte; e la **sinizesi**, quando due vocali dentro una stessa parola si fondono in una sillaba sola: *cui*, in Catullo, è una sillaba e non due.'
      ],

      sound: [
        '**Va letto per durata, non per accento.** L\'errore più comune è battere la prima sillaba di ogni piede come se fosse un metro inglese. Quel che serve è invece tenere le lunghe all\'incirca il doppio delle brevi e lasciare che il ritmo nasca da lì. Un verso di spondei e uno di dattili occupano lo stesso tempo; la differenza è quante sillabe ci stanno dentro.',
        '**L\'andatura cambia perciò di continuo, ed è proprio questo il punto.** Gli spondei rendono il verso pesante e lento; i dattili lo fanno correre. Un poeta che vuole il ritardo scrive spondei, uno che vuole la velocità scrive dattili, e poiché la scelta è libera in quattro piedi su sei questo si può fare verso per verso, o dentro un verso solo.',
        '**Ogni verso finisce allo stesso modo, e anche questo è il punto.** Poiché il quinto piede è un dattilo e il sesto è di due sillabe, le ultime cinque sillabe fanno quasi sempre – ⏑ ⏑ – ×. Quella cadenza fissa è ciò che rende un esametro riconoscibile per quanto vari l\'inizio, ed è il motivo per cui l\'orecchio regge cinque piedi di libertà senza perdersi.',
        '**La cesura è il punto in cui si respira**, e quello in cui l\'accento di parola e il tempo metrico, che si sono contrastati per tutta la parte centrale del verso, tornano ad accordarsi verso la fine. Quella tensione che si scioglie è l\'effetto che ha un esametro latino e non ha un esametro greco, perché il latino ha l\'accento di parola più forte.',
        'Letta ad alta voce, una sequenza di esametri non suona come un tamburo. Suona come un discorso con dentro un\'onda lunga, che arriva ogni volta alla stessa figura di chiusura.'
      ],

      usedIntro: [
        '**Prima l\'epica**, perché era per quella: Ennio, e poi tutto ciò che viene dopo. **La poesia didascalica** lo prende subito dopo, perché un poema che insegna vuole l\'autorità dell\'epica: è Lucrezio. **La satira** lo prende in uno spirito del tutto diverso, con Lucilio che usa la misura epica per chiacchiere, pettegolezzi e insulti, il che fa parte dello scherzo. **L\'epillio**, la piccola epica dotta, lo usa per l\'ornamento invece che per l\'ampiezza: è il carme 64 di Catullo.',
        'I quattro poeti qui sotto sono quelli presenti in questa app, e sono per caso l\'intera storia repubblicana del metro, dall\'anno in cui arrivò in latino all\'anno prima che se ne impadronissero gli augustei.'
      ],

      examples: [
        {
          where: 'Annales, libro IX',
          gloss: 'I primi esametri latini, su Fabio il Temporeggiatore',
          notes: [
            '**Tre spondei di fila, nel secondo, terzo e quarto piede.** Il verso è notoriamente lento, e lo è di proposito: la parola attorno a cui è costruito è *cunctando*, "temporeggiando", e il metro temporeggia con lei. Un uomo solo, indugiando, ci ha restituito lo stato; e il verso se la prende comoda a dirlo.',
            '**L\'esametro di Ennio è ancora visibilmente in costruzione.** Si concede cose che i poeti successivi escludono, ama i versi spondaici e pesanti come questo, e le sue fini di parola coincidono spesso con le fini di piede, il che rende udibili le giunture. Dove un poeta più tardo nasconde il meccanismo, Ennio lo lascia sentire mentre lavora.',
            'L\'unico arcaismo da notare in questo verso è *restituīt*: al perfetto la desinenza *-it* era in origine lunga, ed Ennio usa ancora la quantità antica, che è ciò che permette all\'ultimo piede di chiudersi come si deve.'
          ]
        },
        {
          where: 'Saturae, su che cosa sia la virtù',
          gloss: 'La misura epica piegata alla conversazione',
          notes: [
            '**Lo stesso metro, con il compito opposto.** Qui c\'è un uomo che parla a un amico chiamandolo per nome, con parole ordinarie, di una questione astratta: e lo fa nel verso degli *Annales*. La satira latina comincia prendendo in prestito la misura più solenne disponibile e usandola per una discussione a tavola, e la sproporzione è voluta.',
            '**Due spondei in apertura**, che rallentano il verso in qualcosa di ponderato invece che di grandioso, e poi l\'apostrofe *Albine* messa dove un poeta epico metterebbe un nome proprio per dargli peso. Lucilio ottiene i suoi effetti mettendo un lessico dimesso nelle caselle dell\'epica.',
            '**L\'elisione è la cosa da esercitare qui.** *Albine est* si scrive come quattro sillabe e si legge come tre: la *-e* finale sparisce davanti a *est*. Si stampi *Ālbīn(e)* e il piede viene fuori come uno spondeo pulito.',
            'Lucilio arriva a questo metro solo a metà carriera. Le sue satire più antiche, i libri dal 26 al 29, usano le misure più vecchie - settenari trocaici e senari giambici - e dal libro 30 in poi scrive esametri. Due di quei pezzi trocaici giovanili sono anch\'essi in questa app: lo stesso poeta, prima di avere deciso come dovesse suonare la satira.'
          ]
        },
        {
          where: 'De Rerum Natura I, v. 1',
          gloss: 'La misura costruita per reggere una dimostrazione',
          notes: [
            '**Quattro dattili, e il poema si apre di corsa.** Lucrezio riserva questo all\'inno a Venere dell\'inizio: non è il modo in cui si muove gran parte del poema.',
            '**Nei sei libri il suo verso è nettamente più pesante di quello che verrà dopo.** Usa più spondei degli augustei, elide più spesso e ricorre a forme arcaiche - qui *divom* per *divorum* - che gli tornano utili proprio perché sono lunghe e riempiono un piede. L\'effetto è un verso che suona più antico di quanto sia, e di proposito: sta scrivendo un\'epica didascalica nella tradizione di Ennio, non una poesia moderna.',
            '**Ciò che lo distingue davvero è che scrive per frasi, non per versi.** Un ragionamento lucreziano corre per dieci o quindici versi con la sintassi che passa dritta oltre le fini di verso, e il metro deve dunque reggere una struttura per cui non era stato pensato: subordinate, lessico tecnico, *quod si* e *praeterea* e *nimirum*. Ripete inoltre interi versi alla lettera quando l\'argomentazione li richiede di nuovo, che è un\'abitudine epica messa al servizio di un filosofo.',
            'E se ne lamenta. Due volte dice che l\'*egestas linguae*, la povertà della lingua, lo costringe a coniare parole; e il metro è metà del problema, perché un termine tecnico che non sta in metrica non si può proprio usare.'
          ]
        },
        {
          where: 'Carme 64, v. 1',
          gloss: 'La misura come ornamento, nella piccola epica dotta',
          notes: [
            '**Un nome proprio greco occupa tutto il primo piede e parte del secondo.** *Peliaco*, "del monte Pelio", è esattamente il tipo di aggettivo geografico dotto che i neoterici amavano, e metterlo per primo è un segnale: sarà un poema alessandrino, allusivo e ornamentale, non un\'epica nazionale.',
            '**Tre spondei al centro** rendono grave il verso, e Catullo fa qui ciò che Ennio faceva per istinto, ma per scelta e a fini di effetto.',
            '**Qui, però, il quinto piede è un dattilo normale** - *vērtĭcĕ* - e il verso si chiude come si chiude quasi ogni esametro latino. Il gioco per cui Catullo è famoso è l\'opposto, ed è l\'esempio successivo.',
            '**L\'ordine delle parole è l\'altra metà della tecnica.** *Peliaco ... vertice* avvolge un\'intera proposizione tra un aggettivo e il suo sostantivo, e *prognatae ... pinus* fa di nuovo lo stesso, incastrandosi. È uno schema che il metro incoraggia, perché separare un aggettivo dal suo sostantivo permette di mettere ciascuno dei due dove il ritmo lo richiede.'
          ]
        },
        {
          where: 'Carme 64, v. 3',
          gloss: 'Il quinto piede spondaico, che è la sua firma',
          notes: [
            '**Si guardi il quinto piede: due lunghe, dove il metro vuole un dattilo.** È lo *spondeiazon*, ed è la cosa più riconoscibile dell\'esametro di Catullo. Tutti gli altri tengono dattilico il quinto piede, perché è quel – ⏑ ⏑ – × in corsa a far suonare la fine di un verso come un esametro. Ci si metta uno spondeo e la corsa sparisce: il verso atterra pesante, e lo si sente.',
            '**Non è una cosa che gli hanno fatto le parole: è una scelta.** Il verso finisce su *Aeetaeos*, un nome proprio greco di quattro sillabe, ed è la ricetta abituale: si cerca una parola greca abbastanza lunga da riempire gli ultimi due piedi, così che il ritmo non latino e il lessico non latino arrivino insieme. Dei sette versi di questo poema che l\'app riporta, è questo a farlo.',
            '**E anche tutto ciò che precede è pesante.** Il secondo, il terzo e il quarto piede sono spondei, perciò quando arriva il quinto l\'orecchio non sente un dattilo dal primo piede: sei sillabe del verso sono brevi e le altre sette lunghe. Catullo usa questa chiusa con larghezza nel carme 64 e molto più di qualunque altro poeta latino; Virgilio, al confronto, se la concede solo una manciata di volte in tutta l\'*Eneide*.'
          ]
        },
      ],

      after: 'Il metro non si ferma a questi quattro. Prosegue nell\'*Eneide*, nelle Satire e nelle Epistole di Orazio, nelle *Metamorfosi* di Ovidio e in tutta l\'epica latina successiva; ed esce dal latino, fino ai tentativi inglesi di rifare gli stessi sei piedi. Quei poeti non sono ancora in questa app. Quando verranno aggiunti, i loro esempi compariranno qui.'
    },

    'phalaecian-hendecasyllable': {
      name: 'Endecasillabo Falecio',
      tagline: "Undici sillabe, rapide e inarrestabili: il metro a cui Catullo ricorse più spesso che a ogni altro.",
      schemeNote: 'Le prime due sillabe sono la base eolica, in linea di principio libera; Catullo ne fa quasi sempre uno spondeo (– –).',

      origin: [
        'Il nome è fatto di due nomi. *Endecasillabo* è semplicemente greco per "undici sillabe", che è quel che il verso ha, ogni volta, senza sostituzioni che ne cambino il conto. *Falecio* viene da Faleco, un epigrammista greco del IV o III secolo a.C. che lo usò abbastanza da dargli il nome, benché il metro sia molto più antico di lui e compaia già in Saffo e Anacreonte secoli prima.',
        '**Appartiene alla famiglia eolica**, che funziona in modo assai diverso da quella dattilica. Un metro dattilico conta il *tempo* e lascia scambiare liberamente una lunga con due brevi; un metro eolico fissa uno *schema di sillabe* e non lascia quasi nulla di libero. È per questo che l\'endecasillabo ha sempre undici sillabe, mentre un esametro ne ha da dodici a diciassette.',
        '**In latino è sostanzialmente un\'invenzione di Catullo come forma seria.** Non scrisse i primi endecasillabi latini, ma ne scrisse abbastanza, e abbastanza bene, perché il metro diventasse suo: poco più di quaranta dei componimenti della raccolta sono in questo metro, molti più che in qualunque altro. Quando poi un romano pensava a questo verso, pensava a lui.',
        'Fu il veicolo di un genere di poesia che Roma non aveva davvero avuto prima: breve, personale, d\'occasione, divertente, oscena, rivolta a un amico o a un nemico chiamato per nome. Catullo chiama questi pezzi *nugae*, sciocchezze, che è una posa: il metro fa esattamente ciò che lui vuole.',
        'Dopo di lui passa a Marziale, che lo usa per l\'epigramma, a Stazio nelle *Silvae* e a Plinio il Giovane, che ne scrisse alcuni e se ne scusò in una lettera. Nessuno di questi autori è ancora in questa app: quando ci saranno, verranno aggiunti qui.'
      ],

      build: [
        '**Undici sillabe, in uno schema fisso.** A differenza dell\'esametro, non si può sostituire un piede con un altro per cambiare la lunghezza: il verso ha la stessa forma ogni volta.',
        '**Le prime due sillabe sono la base eolica.** In greco sono davvero libere: due lunghe, o una lunga e una breve nell\'uno o nell\'altro ordine. **Catullo ne fa quasi sempre uno spondeo**, due lunghe, ed è per questo che i suoi endecasillabi hanno un attacco fermo e piantato invece che esitante. Le poche volte in cui usa un giambo o un trocheo sono componimenti giovanili, e la variazione poi scompare.',
        '**Poi un dattilo** (– ⏑ ⏑), in terza, quarta e quinta posizione. È il motore del verso: una lunga seguita da due sillabe rapide, che spinge avanti il ritmo.',
        '**Poi due trochei** (– ⏑, – ⏑), che lo tengono alla stessa velocità.',
        '**Poi una lunga finale, con l\'ultima sillaba ancipite**: lunga o breve, contata come lunga per via della pausa di fine verso, esattamente come nell\'esametro.',
        '**Non c\'è cesura fissa.** È la differenza strutturale che conta di più, ed è facile scivolarci sopra. L\'esametro ha un punto di respiro progettato a metà; l\'endecasillabo non ne ha nessuno, perciò il verso va preso in un fiato solo da un capo all\'altro. Le pause di parola cadono dove le mette la frase.',
        '**L\'elisione funziona come ovunque nella poesia latina**: una vocale finale, o una vocale finale più *m*, sparisce davanti a una parola che comincia per vocale o per *h*. Poiché il conto delle sillabe è fisso e ridotto, qui un\'elisione è molto udibile: è l\'unica cosa che possa far sembrare affollato il verso.'
      ],

      sound: [
        '**Rapido, uniforme e difficile da fermare.** Il dattilo vicino all\'inizio lo mette in corsa e i due trochei ce lo tengono, e senza una cesura che spezzi il verso non c\'è dove fermarsi fino alla fine. A leggerne qualcuno di fila l\'effetto è vicino a una filastrocca o a una conta - ed è proprio per questo che si addice a un poeta che scrive con una voce sbrigativa e parlata.',
        '**È anche molto corto.** Undici sillabe sono circa metà di un esametro, perciò un pensiero deve stare compiuto, o quasi, dentro un verso o due. Questo impone il fraseggio puntuto ed epigrammatico per cui la forma è nota, ed è il motivo per cui il metro passò così naturalmente a Marziale.',
        '**L\'attacco fisso lavora molto.** Poiché le prime due sillabe sono quasi sempre due lunghe, ogni componimento parte dallo stesso appoggio fermo prima che il dattilo lasci andare: una piccola esitazione, poi una corsa. Una volta che l\'orecchio ha preso la forma, è inconfondibile, e Catullo ne approfitta: può cominciare un componimento a metà di una conversazione, perché è il metro a fornire la cornice.',
        '**Ed è inadatto alla solennità, il che è lo scherzo.** Non si può restare gravi a lungo in un verso così rapido. Quando Catullo lo volge a qualcosa di triste, come nel lamento per il passero, l\'effetto nasce dallo scarto tra il ritmo saltellante e l\'argomento, non dal fatto che il metro faccia qualcosa di diverso.'
      ],

      usedIntro: [
        'È il metro dei *polimetri*, i carmi da 1 a 60: dediche, inviti, insulti, poesie d\'amore, poesie su poeti scadenti e tovaglioli rubati. Più tardi è soprattutto il metro dell\'epigramma.',
        'Catullo è l\'unico poeta dell\'app che lo usa, perciò entrambi gli esempi sono suoi, scelti di proposito ai due estremi della sua gamma: una dedica programmatica e un finto lamento.'
      ],

      examples: [
        {
          where: 'Carme 1, v. 1',
          gloss: 'La dedica che apre la raccolta',
          notes: [
            '**La forma da manuale del verso**: spondeo, dattilo, trocheo, trocheo e chiusa di due sillabe. Se si impara a memoria un endecasillabo, si impari questo.',
            '**La prima parola è un tranello.** *Cui* sembra di due sillabe ed è di una: la *u* e la *i* si fondono in un\'unica sillaba lunga, ed è la *sinizesi*. A contarle due il verso ha dodici sillabe e non torna.',
            '**Tre parole leggere in undici sillabe** - *lepidum*, *novum*, *libellum* - e l\'ultima è un diminutivo: non un libro ma un libretto. Il metro e il lessico fanno la stessa cosa, far sembrare esile il componimento di proposito, in una dedica che è in realtà un manifesto.',
            'Si noti come il verso corra dritto senza fratture. Non c\'è punto in cui la voce si fermi naturalmente, ed è questo che significa in pratica l\'assenza di cesura.'
          ]
        },
        {
          where: 'Carme 3, v. 1',
          gloss: 'Il finto lamento per il passero di Lesbia',
          notes: [
            '**Lo stesso schema, con dentro un\'elisione.** *Lugete o* si scrive come quattro sillabe e si legge come tre: la *-e* finale di *Lugete* sparisce davanti a *o*. Quell\'elisione cade proprio sulla giuntura tra la base e il dattilo, perciò il verso accelera una sillaba prima di quanto l\'occhio si aspetti.',
            '**Un imperativo di lutto, in un metro saltellante.** *Lugete* è la parola con cui si aprirebbe un lamento vero, e le divinità plurali invocate sono Veneri e Amorini invece di qualcosa di funebre. Tutto il componimento vive di quello scarto tra il peso della lingua e la leggerezza del verso: è la parodia di un canto funebre e, in qualche modo, anche un canto funebre vero.',
            '**Entrambi i nomi propri sono al plurale**, cosa insolita e parte dell\'effetto: una folla di piccoli dèi dell\'amore convocata a piangere un uccellino. Ciascuno riempie esattamente la sua casella, ed è l\'altro motivo per cui il verso suona così assestato.'
          ]
        }
      ],

      after: 'Gli endecasillabisti latini successivi - Marziale soprattutto, poi Stazio e Plinio il Giovane - non sono ancora in questa app. I loro esempi compariranno qui quando ci saranno.'
    },

    'saturnian': {
      name: 'Saturnio',
      tagline: 'Il verso proprio di Roma, da prima che arrivassero i metri greci; e l\'unico che nessuno sia riuscito a spiegare.',
      schemeNote: 'Sette sillabe, una pausa, poi sei: è la forma del verso classico. I segni di ancipite sono onesti e non pigri: quali di quelle sillabe siano lunghe è esattamente ciò che si discute.',

      origin: [
        'I romani lo chiamavano *Saturnius numerus*, il verso di Saturno: la misura dell\'età dell\'oro, di prima che qualcuno avesse sentito parlare della Grecia. Che sia storia o no, dice come lo sentivano: come cosa loro, e come cosa antica.',
        '**È il metro delle prime due opere della letteratura latina.** Livio Andronico lo usò intorno al 240 a.C. per l\'*Odusia*, la sua traduzione dell\'Odissea, e Nevio per il *Bellum Poenicum*, la prima epica nazionale romana. Entrambi i poeti sono in questa app, ed entrambi gli esempi qui sotto sono loro.',
        '**Non era soltanto un metro letterario.** Le più antiche iscrizioni latine di una certa estensione sono in saturni: gli epitaffi degli Scipioni, incisi nella pietra del sepolcro di famiglia sulla via Appia, e diverse dediche e iscrizioni trionfali. Era dunque il verso che un romano incontrava su un monumento, non solo in un libro, e conviene ricordarlo leggendo l\'epitaffio di Nevio qui sotto.',
        '**Da dove venga, nessuno lo sa.** O è davvero ereditato, una forma di verso italica con dietro, molto lontano, un antenato comune con i metri greci, oppure fu preso in prestito presto e rimodellato al punto da non riconoscersi più. Non c\'è alcuna prova esterna in un senso o nell\'altro, e la discussione va avanti da duecento anni.',
        '**Com\'è morto è molto più chiaro.** Ennio scrisse gli *Annales* in esametri greci intorno al 180 a.C. e ne fece un programma, liquidando il verso dei predecessori come roba da *Fauni vatesque*, fauni e indovini. Funzionò. Nel giro di una generazione il saturnio era arcaico; in due era estinto come metro letterario, e nessun poeta latino vi tornò più.',
        '**Ci restano circa centotrenta versi**, per lo più citati da grammatici tardi che si interessavano a una parola e non al verso, e molti guasti nel testo. È la radice di tutto ciò che si legge in questa pagina: il corpus è troppo piccolo e troppo malconcio per decidere una controversia.'
      ],

      build: [
        '**Si parta da ciò su cui si è d\'accordo, perché non è molto.** Il verso si divide in due parti con una pausa in mezzo; la fine di parola coincide sempre con quella pausa; e la forma classica è sette sillabe e poi sei. Entrambi gli esempi qui sotto sono esattamente 7 e 6.',
        '**Dopo di che il campo si divide.** La scuola *quantitativa* lo tratta come un metro simile a quelli greci, fondato sulla durata delle sillabe, e lo scrive come uno schema di lunghe e ancipiti. La difficoltà è che i versi superstiti non ci stanno tutti, qualunque schema si proponga, e la teoria deve correggere il testo per salvarsi: il che è circolare.',
        '**La scuola accentuativa lo tratta come un verso di battute**, tre nel primo colon e due nel secondo, del tipo familiare dalla poesia allitterativa germanica e dal latino popolare più tardo. Lì la difficoltà è che l\'accento di parola latino del III secolo a.C. è a sua volta ricostruito, e dunque la teoria verifica un\'incertezza con un\'altra.',
        '**Una terza posizione dice che è un verso a conteggio di sillabe**, con una pausa fissa e qualche vincolo su come finisce ciascuna metà, e che questo è semplicemente tutto ciò che si può recuperare. È la posizione di questa pagina, non per convinzione ma perché è l\'unica che non richieda di affermare qualcosa di contestato.',
        '**Ciò che si può osservare senza schierarsi** vale comunque la pena di averlo. La pausa è reale e cade sempre a fine parola. L\'allitterazione è pesantissima e sembra strutturale e non ornamentale: lega le due metà l\'una all\'altra. E le due metà sono spesso parallele nella sintassi, perciò il senso si divide dove si divide il verso.',
        '**Ed è per questo che gli esempi qui sotto non hanno una scansione piede per piede.** Ovunque altrove in questa sezione la scansione è segnata sul verso; qui significherebbe scegliere una teoria e presentarla come un fatto. La pausa è segnata, le sillabe sono contate, e più in là le prove non arrivano.'
      ],

      sound: [
        '**La forma si sente anche senza risolvere la controversia.** Due blocchi, all\'incirca uguali, con una pausa in mezzo. Non scorre come scorre un esametro: viene a coppie, e la seconda metà risponde alla prima.',
        '**L\'allitterazione fa gran parte del lavoro.** In un metro dalle regole lasche, è il gioco dei suoni a dire all\'orecchio che questo è verso: *immortales mortales*, *fas flere*, *flerent*. Si legga ad alta voce l\'epitaffio di Nevio e sono le f a tenere insieme tutto.',
        '**L\'effetto è più vicino a un proverbio o a una formula giuridica che all\'epica.** Il che si accorda perfettamente con i luoghi in cui il metro si trova davvero - sulle tombe, sulle dediche, nel registro pubblico solenne - ed è in parte il motivo per cui non poté sopravvivere al contatto con l\'esametro, che può correre per un intero paragrafo.',
        '**A un romano dell\'età di Cicerone suonava antico e paesano**, come a un lettore del I secolo a.C. sembrava pittoresco tutto ciò che precedeva Ennio. Quel giudizio è rimasto, e vale la pena resistergli un poco: queste sono le prime due poesie in latino, e la seconda è un\'epica su una guerra che il suo autore aveva combattuto.'
      ],

      usedIntro: [
        'Due poemi epici, l\'*Odusia* e il *Bellum Poenicum*; gli epitaffi degli Scipioni; dediche e iscrizioni trionfali. L\'elenco è sostanzialmente tutto qui.',
        'Entrambi i poeti superstiti sono in questa app, perciò entrambi gli esempi sono saturni autentici e non ricostruzioni; presentati, come spiegato sopra, con la sola pausa segnata.'
      ],

      examples: [
        {
          where: 'Odusia, fr. I.1',
          gloss: 'Il primo verso della letteratura latina',
          notes: [
            '**Qui comincia la letteratura latina**, per quanto possiamo vedere: l\'inizio dell\'Odissea, messo in latino per un pubblico romano intorno al 240 a.C. da un uomo che a Roma era probabilmente arrivato come prigioniero di guerra.',
            '**Si guardi che cosa fa del primo verso di Omero.** La Musa diventa *Camena*, una divinità italica delle sorgenti. Non traduce la divinità: la sostituisce con una locale, che è esattamente la stessa decisione dello scrivere il poema nel metro nativo invece che in quello greco. La forma latina e quella greca sono fatte corrispondere a ogni livello tranne che in superficie.',
            '**E poi una parola tira dalla parte opposta.** *Insece*, "racconta", è un imperativo arcaico ed è imparentato con l\'*ennepe* greco che apre il verso di Omero. La frase è dunque romana nel metro e negli dèi e greca nelle ossa, che è una descrizione discreta di tutta la prima letteratura latina.',
            '**La forma: sette sillabe, la pausa sulla virgola, sei.** Qui non è segnata alcuna quantità, per la ragione detta sopra.'
          ]
        },
        {
          where: 'Epitaphium, fr. 67, v. 1',
          gloss: 'L\'epitaffio che si dice abbia scritto per sé',
          notes: [
            '**Di nuovo la stessa forma, 7 e 6**, dall\'altro poeta saturnio superstite; e questo è un epitaffio composto per sé, il metro usato per lo scopo per cui lo si usava sulle lapidi vere.',
            '**La prima metà è una parola sola detta due volte.** *Immortales mortales*: la stessa radice, una volta con il prefisso negativo e una volta senza, immortali e mortali affiancati senza nulla in mezzo. È tutto il pensiero del carme compresso nel primo colon, e funziona perché il metro dà a quel colon un bordo netto.',
            '**La seconda metà passa all\'allitterazione**, *si foret fas flere*, e il suono della f prosegue dritto nel verso successivo, *flerent divae Camenae*. In una forma metrica dalle regole lasche è questo il legante: l\'orecchio è tenuto dal gioco dei suoni là dove un metro greco lo terrebbe con la quantità.',
            'Il vanto che ci sta sotto non è piccolo. Se agli immortali fosse lecito piangere i mortali, dice Nevio, le divine Camene piangerebbero lui; e una volta che fu consegnato al tesoro dell\'Orco, Roma si dimenticò di parlare latino.'
          ]
        }
      ],

      after: 'Nulla di più tardo è scritto in questo metro. Il saturnio è l\'unico metro latino senza alcuna discendenza: non fu sviluppato, fu sostituito, e a sostituirlo fu l\'esametro dattilico.'
    },

    'elegiac-couplets': {
      name: 'Distici Elegiaci',
      tagline: 'Un esametro, e poi un verso più breve che gli ricade sotto. Il metro dell\'epigramma, dell\'epitaffio e della poesia d\'amore romana.',
      schemeNote: 'Il primo verso è un esametro normale, perciò ciascuno dei suoi primi quattro piedi può essere uno spondeo. Nel secondo verso solo la prima metà può contrarsi: dopo la pausa i due dattili sono fissi, e ogni distico latino classico finisce perciò sullo stesso ritmo.',

      origin: [
        '**Il nome viene dalla parola greca** *elegos*, il cui significato originario è perduto e che fu associata presto al lamento e al flauto. L\'associazione è rimasta: "elegia" in italiano indica ancora un componimento di lutto. In greco e in latino indica un componimento in questo metro, e l\'argomento può essere qualunque cosa.',
        '**È antichissimo e non fu mai solo del dolore.** Gli elegiaci greci del VII secolo - Archiloco, Mimnermo, Tirteo, Solone - usano il distico per canti di guerra, argomentazioni politiche, poesie da simposio e consigli. Il lamento è un impiego fra i tanti.',
        '**L\'altra sua sede propria è l\'iscrizione.** Il distico è il metro standard dell\'epitaffio in versi, greco e poi latino: abbastanza breve da incidersi nella pietra e abbastanza chiuso da suonare definitivo. La cosa riguarda direttamente l\'esempio qui sotto: il carme 101 di Catullo è una poesia scritta nella forma di un\'iscrizione tombale e pronunciata davanti a una tomba.',
        '**In latino arriva con l\'epigramma e poi si prende un genere intero.** Catullo lo usa per tutto dal carme 65 in avanti, epigrammi e lettere lunghe comprese; e poi Cornelio Gallo, Tibullo, Properzio e Ovidio vi costruiscono sopra l\'elegia erotica romana, un corpo di poesia senza un vero equivalente greco. Nessuno di quei quattro è ancora in questa app.',
        '**La storia migliore sulla forma la racconta Ovidio.** All\'inizio degli *Amores* dice che stava per scrivere un\'epica in esametri e che Cupido gli rubò un piede da ogni secondo verso: così il poema venne fuori in distici e si trasformò in poesia d\'amore contro la sua volontà. È una battuta sul metro, e spiega il distico meglio di uno schema: il secondo verso è il primo con dentro qualcosa in meno.'
      ],

      build: [
        '**Questo non è un metro ma una coppia, e l\'unità è la coppia.** Un esametro da solo è un verso epico; un esametro seguito da un pentametro è un distico elegiaco. Nessuna delle due metà si incontra da sola.',
        '**Il primo verso è un normale esametro dattilico**, con tutta la libertà che ciò comporta: quattro piedi che possono essere dattili o spondei, un quinto quasi sempre dattilo, una chiusa di due sillabe.',
        '**Il secondo verso ha un nome sbagliato.** "Pentametro" fa pensare a cinque piedi di qualcosa, e non è così. Sono due emistichi, ciascuno di due piedi e mezzo: – ⏑ ⏑ – ⏑ ⏑ –, poi una pausa, poi di nuovo – ⏑ ⏑ – ⏑ ⏑ –. A contare i piedi si ottengono sei metà che fanno cinque: di qui il nome, che inganna gli studenti da duemila anni.',
        '**La pausa centrale è obbligatoria e cade sempre a fine parola.** È la cosa più udibile del verso: si spezza davvero in due, e un poeta può usare quello stacco per opporre una metà all\'altra.',
        '**E adesso la regola che conta di più.** Nella prima metà i due dattili possono contrarsi in spondei, esattamente come nell\'esametro. **Nella seconda metà non possono mai.** Dopo la pausa ogni pentametro latino classico fa – ⏑ ⏑ – ⏑ ⏑ –, senza eccezioni. Non c\'è altra posizione nella metrica latina fissata così saldamente.',
        '**L\'ultimo elemento è una sola lunga, non un piede.** Il verso semplicemente si ferma. Da Ovidio in poi è normale chiudere il pentametro con una parola di due sillabe, il che rende la chiusa ancora più uniforme; Catullo non ha ancora quell\'abitudine, e la differenza si sente.',
        'L\'elisione funziona come in tutta la poesia latina, e in una forma così compressa si sente moltissimo: ci sono due elisioni nei quattro versi citati qui sotto.'
      ],

      sound: [
        '**L\'esametro apre e il pentametro chiude.** È tutto il ritmo della forma, ripetuto per quanto dura il componimento. Il primo verso corre fino in fondo alla sua lunghezza; il secondo è più breve, si spezza a metà e si ferma. La descrizione tradizionale dice che il secondo verso "ricade", ed è esattamente ciò che fa.',
        '**Poiché la seconda metà di ogni pentametro è identica**, la stessa cadenza di sei sillabe arriva alla fine di ogni distico. In un componimento lungo diventa ipnotica; in uno breve diventa uno scatto. È il motivo per cui il distico si è preso l\'epigramma: non si può scrivere una battuta di due versi in un metro che non chiude.',
        '**Il fatto che l\'unità sia di due versi rende la forma argomentativa.** Affermazione, poi svolta; tesi, poi smentita; immagine, poi commento. L\'epigramma latino è costruito su quella figura, e così gran parte dell\'elegia erotica, dove è nel pentametro che atterrano la lamentela o la battuta.',
        '**L\'enjambement oltre il confine del distico è abbastanza raro da essere un effetto.** In un poema in esametri la frase scavalca continuamente la fine del verso; qui di solito no, e perciò quando un poeta lascia che una frase trabocchi nel distico successivo lo si deve sentire.'
      ],

      usedIntro: [
        'Prima l\'epigramma e l\'iscrizione; poi, in latino, un genere intero: l\'elegia erotica di Gallo, Tibullo, Properzio e Ovidio, e dopo di quella la poesia dell\'esilio di Ovidio, il suo calendario e le sue lettere. Diventa il metro ordinario per tutto ciò che non è epica e non è lirica.',
        'Un solo componimento di questa app è in distici, e difficilmente potrebbe essere migliore: il carme 101 di Catullo, scritto nel metro dell\'epitaffio, per una tomba che aveva attraversato il mondo per raggiungere.'
      ],

      examples: [
        {
          where: 'Carme 101, vv. 1-2',
          gloss: 'Il distico iniziale: un esametro che viaggia, un pentametro che arriva',
          notes: [
            '**Il distico fa in due versi ciò che il carme fa in dieci.** L\'esametro è tutto movimento - *multas per gentes et multa per aequora*, per molte genti e per molti mari - e si apre su tre spondei, che rendono il viaggio pesante e lento invece che rapido. Poi arriva il pentametro: *advenio*, giungo, prima parola, e il viaggiare si ferma.',
            '**Si guardi il secondo verso spezzarsi a metà.** *Advenio has miseras* ‖ *frater, ad inferias*: la prima metà è l\'arrivo, la seconda è ciò per cui è arrivato, e la parola *frater* è messa in testa alla seconda metà, dove la pausa le scarica addosso tutto il peso. È il metro a fare il lutto.',
            '**E la seconda metà è quella fissa.** – ⏑ ⏑ – ⏑ ⏑ –, come in ogni pentametro classico, senza sostituzione possibile; la prima metà dello stesso verso ha preso i dattili pieni ma avrebbe potuto contrarli. Il distico finisce sull\'unico ritmo che la forma non varia mai, ed è per questo che atterra così definitivamente.',
            '**Da notare un\'elisione**, ed è proprio all\'inizio: *advenio has* si scrive come cinque sillabe e si legge come quattro, con la *-o* finale che sparisce davanti all\'*h*. Si stampi *ādvĕnĭ(o)* e il primo piede viene fuori come un dattilo pulito.',
            'Il carme si chiude su un altro distico che tutti conoscono, che finisce *atque in perpetuum, frater, ave atque vale*; e anche quell\'ultimo verso è un pentametro, con la stessa cadenza fissa che arriva per l\'ultima volta.'
          ]
        }
      ],

      after: 'Gli elegiaci romani che fecero proprio questo metro - Gallo, Tibullo, Properzio e Ovidio - non sono ancora in questa app. Quando verranno aggiunti, i loro esempi compariranno qui.'
    },

    'trochaic-septenarius': {
      name: 'Settenario Trocaico',
      tagline: 'Sette trochei e mezzo: il verso lungo, dondolante e incalzante della commedia romana, e di Lucilio prima che si fissasse sull\'esametro.',
      schemeNote: 'Sette piedi completi e una sillaba, che è ciò che il "settenario" conta. Quasi ogni lunga può risolversi in due brevi e quasi ogni ancipite può essere riempita da due, perciò un verso di quindici posizioni può portare venti sillabe. La pausa dopo il quarto piede è consueta, non obbligatoria.',

      origin: [
        '**È greco, ed è veloce.** Il tetrametro trocaico catalettico - quattro coppie di piedi con l\'ultima sillaba mancante - è uno dei metri greci più antichi, usato da Archiloco nel VII secolo a.C. e accolto nella tragedia per le scene concitate. Aristotele dice che era il metro originario del dialogo tragico prima che subentrasse il giambo, perché è più vicino alla danza.',
        '**In latino diventa uno dei due metri portanti della commedia.** Plauto e Terenzio costruiscono i loro drammi con il senario giambico e con questo: il senario è parlato, il settenario è *recitativo*, eseguito con l\'accompagnamento del flautista. Una scena che cambia metro è una scena che cambia modo di esecuzione, ed è per questo che il metro si sposta in mezzo a una conversazione.',
        '**Lucilio vi scrisse le sue prime satire.** I libri dal 26 al 29, i primi che pubblicò, usano le misure più antiche - questa e il senario giambico - e solo dal libro 30 in poi scrive gli esametri che la satira conservò in seguito. Entrambe le fasi sono in questa app, il che fa di Lucilio l\'unico autore presente che mostri il passaggio mentre avviene.',
        '**Sopravvive alla letteratura che lo usò.** I canti dei soldati al trionfo di Cesare erano in settenari trocaici, e la forma passa nel latino popolare e poi cristiano: l\'inno medievale *Pange lingua gloriosi* è un tetrametro trocaico catalettico costruito sull\'accento invece che sulla quantità. È l\'unico metro classico che esce dall\'antichità e cammina dritto nel Medioevo.'
      ],

      build: [
        '**Otto posizioni di – ⏓, con l\'ultima troncata.** Sono sette piedi completi più una sillaba sola, da cui il nome: un *septenarius* conta sette.',
        '**La forma discendente è il punto.** Un trocheo è lunga-poi-breve, perciò ogni piede comincia sul suo battere e ricade, e il verso nel suo insieme spinge in avanti. Un verso giambico sale verso il battere; uno trocaico ne scende.',
        '**La sostituzione è ammessa quasi ovunque, ed è questo a rendere utile il metro.** Una lunga può risolversi in due brevi. L\'ancipite può essere una lunga, una breve o due brevi. Perciò un singolo piede può presentarsi come trocheo, spondeo, dattilo, anapesto o tribraco, e le quindici posizioni metriche del verso possono essere riempite da quindici sillabe come da più di venti.',
        '**Di solito c\'è una pausa dopo il quarto piede**, a metà verso, e di solito cade a fine parola. È una tendenza forte più che una regola, ed entrambi gli esempi qui sotto ce l\'hanno.',
        '**E adesso la conseguenza, che è la parte onesta di questa pagina.** Con la sostituzione disponibile in quasi ogni posizione, un dato verso ammette spesso più di un\'analisi, e gli editori di Plauto e Terenzio non concordano su singoli versi. Il metro si piega alla frase invece che la frase al metro: che è esattamente ciò che serve al dialogo, ed esattamente ciò che rende difficile una scansione definitiva.',
        '**È anche il motivo per cui i comici non sono etichettati in questa app.** Una scena di Plauto si muove tra il senario parlato, questo metro e i metri lirici dei *cantica*, a volte nel giro di pochi versi; un unico metro indicato su un intero brano sarebbe spesso sbagliato. Lucilio si può etichettare perché i suoi libri sono coerenti al loro interno.'
      ],

      sound: [
        '**Lungo.** Quindici posizioni e spesso venti sillabe, cioè la metà in più di un esametro come conteggio sillabico. Una pagina di settenari non somiglia per niente a una pagina di epica: i versi attraversano tutto il foglio e proseguono.',
        '**E incalzante, perché il battere va d\'accordo con le parole.** In latino l\'accento di parola tende a cadere sulle stesse sillabe che il battere trocaico vuole, perciò il ritmo è facile da sentire e difficile da perdere: l\'opposto dell\'esametro, dove accento e ictus metrico si contrastano per tutta la parte centrale del verso e si accordano solo alla fine.',
        '**Eseguito con la musica.** Nella commedia è il metro del *recitativum*, cantato o recitato sopra il flauto, più rapido e più insistente del semplice senario parlato. Quando una scena plautina sale nei settenari, sale nella performance.',
        '**La cosa più vicina in italiano è il verso lungo di filastrocca**, o in inglese il verso trocaico disteso di Tennyson: una volta che se ne prende il dondolio, ti porta, ed è molto difficile fermarsi prima della fine del verso.'
      ],

      usedIntro: [
        'La commedia romana soprattutto: Plauto e Terenzio lo usano di continuo, e fra i due danno conto della maggior parte degli esempi latini superstiti. Poi la prima satira di Lucilio, poi i canti di marcia, la poesia popolare e infine l\'inno medievale.',
        'In questa app è etichettato solo Lucilio, per la ragione detta sopra; entrambi gli esempi qui sotto vengono dal libro 26, la satira più antica di cui abbiamo qualcosa.'
      ],

      examples: [
        {
          where: 'Saturae, libro 26, sui suoi lettori',
          gloss: 'Chi vuole che lo legga, e chi no',
          notes: [
            '**La frase più citata della satira romana sul proprio pubblico.** Lucilio non vuole essere letto da Manio Persio, che era notoriamente dotto, e vuole essere letto da Giunio Congo, che non lo era. Colloca l\'opera fra l\'esperto e l\'ignorante, e ogni satirico dopo di lui ripete il gesto.',
            '**Il verso è costruito a specchio, e la pausa metrica cade esattamente sul cardine.** Due nomi in accusativo e un verbo, poi due nomi in accusativo e un verbo; *nolo* alla fine della prima metà, *volo* alla fine della seconda. La pausa dopo il quarto piede cade sulla virgola, perciò il metro si divide dove si divide il senso.',
            '**La seconda metà cade dritta sullo schema.** *Iunium Congum volo* sono sette sillabe per sette posizioni, senza alcuna risoluzione, e viene fuori – ⏑ – – – ⏑ –, che è il nudo – ⏓ – ⏓ – ⏓ – della seconda metà. Vale la pena notare perché: le *-um* di *Iunium* e di *Congum* sono entrambe lunghe, non perché le vocali siano lunghe ma perché ciascuna è chiusa dalla sua *m* davanti alla consonante che segue.',
            '**La prima metà è dove la faccenda si fa interessante.** *Persium haec* elide, e restano undici sillabe per riempire otto posizioni - tre risoluzioni - e più di una distribuzione sta in metrica. **Questa pagina non stampa un\'analisi piede per piede**, perché non c\'è una risposta sola da stampare. È il metro che si comporta normalmente, ed è il motivo per cui Plauto e Terenzio non portano un\'etichetta metrica in questa app.'
          ]
        },
        {
          where: 'Saturae, libro 26, v. 1',
          gloss: 'Rifiutare una carriera, in un verso pieno di latino amministrativo',
          notes: [
            '**Ciò che rifiuta è un patrimonio.** Un *publicanus* appaltava le imposte di una provincia, e il contratto d\'Asia era il più ricco del mondo romano; uno *scripturarius* riscuoteva i canoni sui pascoli pubblici. Lucilio era già ricco e non ne aveva bisogno, e il senso della frase - che prosegue nel verso seguente - è che non avrebbe barattato la propria indipendenza con nulla di tutto ciò.',
            '**Due elisioni in un verso solo**, *vero ut* e *fiam ut*, ed è ciò che rende difficile fissare a colpo d\'occhio il conteggio delle sillabe. È la condizione ordinaria del verso drammatico e satirico romano: il verso scritto e il verso detto hanno lunghezze diverse, e bisogna sentirlo prima di poterlo scandire.',
            '**Si ascolti il lessico.** *Publicanus*, *scripturarius*: sostantivi amministrativi piatti, uno dei due lungo cinque sillabe e piazzato in fine di verso. Un esametro non li reggerebbe; questo metro ha spazio. È in buona parte il motivo per cui la prima satira è scritta così, e in parte ciò a cui Lucilio rinunciò passando all\'esametro nel libro 30.',
            'La pausa cade di nuovo sulla virgola, dopo *fiam*: è la dieresi del quarto piede che fa il suo lavoro consueto.'
          ]
        }
      ],

      after: 'Plauto e Terenzio, che usano questo metro più di chiunque altro in latino, sono in questa app ma non portano alcuna etichetta metrica: una scena comica si muove tra il senario parlato, il settenario recitato e i metri lirici dei cantica, a volte nel giro di pochi versi, perciò una sola etichetta su un intero brano sarebbe spesso sbagliata. Quando quei brani saranno fatti, porteranno un elenco di metri con i versi coperti da ciascuno.'
    }
  };
})(window);
