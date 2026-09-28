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

    // The metres that are named on an excerpt but have no page yet. They need
    // an Italian name and nothing else: without these the tablet came out as
    // "METRO Saturnian", half translated.
    'saturnian': { name: 'Saturnio' },
    'trochaic-septenarius': { name: 'Settenario Trocaico' },
    'elegiac-couplets': { name: 'Distici Elegiaci' },

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
    }
  };
})(window);
