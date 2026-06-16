/*
 * fragments.js - the practice fragment bank: the single source for the
 * translation practice page. Each author has one or more "works"; each work
 * holds fragments with { title, citation, source, description, latin, italian,
 * english, analysis }. "source" records the website/edition the Latin was taken
 * from (shown as attribution on the practice page). needsSelection:true authors
 * (Plautus, Terence, Caecilius) route through practice-select.html first so the
 * reader picks a comedy/text.
 *
 * Plain <script> include - works under file:// with no fetch. To add fragments,
 * edit the AUTHORS object below (keep the field shape).
 */
(function (global) {
  'use strict';

  var AUTHORS = {
    "livius-andronicus": {
      "needsSelection": false,
      "works": [
        {
          "fragments": [
            {
              "title": "Homer’s Odyssey opening, remade in Latin",
              "citation": "(Odusia, frr. I.1 and V.297)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This fragment is about the very birth of Latin literature: Livius remaking Homer line by line. The first verse is the Odyssey’s opening invocation, asking the Muse (here the Italic Camena) to tell of Odysseus, the man of many turns; the second catches Odysseus alone at sea, his heart freezing with dread as Charybdis opens before him.",
              "latin": "> Virum mihi, Camena, insece versutum\n> *(Odusia I, 1 -- rendering of Odyssey 1.1)*\n\n> Igitur demum Ulixi cor frixit prae pavore.\n> *(Odusia V, 297 -- rendering of Odyssey 5.297)*",
              "italian": "> Raccontami, o Camena, dell'uomo dall'ingegno molteplice.\n\n> E allora, finalmente, il cuore di Ulisse si gelò di terrore.",
              "english": "> Tell me, O Camena, of the man of manifold cunning.\n\n> And then at last the heart of Ulysses froze with dread.",
              "analysis": "The first line is the heart of the Odusia: Livius's rendering of Homer's immortal opening (*\"Ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον\"*). Every word repays attention.\n\n*Virum* translates *ἄνδρα*, though in Latin the emphatic force of Homer's opening is slightly diluted -- in Greek, \"the man\" is the absolute first word of the poem, thrown at the reader immediately. *Camena* replaces the Greek Muse: the Camenae were Italic water divinities, and the substitution is a deliberate act of cultural translation, not a failure of imagination. *Insece* is an archaic imperative form of *insequor* (narrate, follow); it was already obscure in the classical period. *Versutum* renders *πολύτροπον* (\"of many turns, of many wiles\"): a happy choice, since *versutus* carries exactly the right connotation of slippery, fox-like intelligence.\n\nThe second line corresponds to the moment when Odysseus, alone at sea, sees the whirlpool of Charybdis open before him. *Cor frixit* (\"his heart froze\") is a vivid archaic expression -- *frigesco* applied to the heart to indicate terror. The construction *prae pavore* (cause expressed with *prae* + ablative) is fully classical syntax; one of the moments where Livius anticipates rather than lags behind the norm."
            }
          ],
          "id": "odusia",
          "label": "Odusia"
        }
      ]
    },
    "gnaeus-naevius": {
      "needsSelection": false,
      "works": [
        {
          "fragments": [
            {
              "title": "Veiled and weeping, the Trojan wives flee by night",
              "citation": "(Bellum Poenicum, Book I, fr. 8)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This fragment is about the flight from Troy in Naevius’s Bellum Poenicum, the first Latin epic. By night, with veiled heads and many tears, the wives of Aeneas and Anchises slip out of the fallen city. It is Naevius’s mythological prelude to the war with Carthage, written two centuries before Virgil’s Aeneid told the same story.",
              "latin": "> amborum uxores\n> noctu Troiad exibant capitibus opertis,\n> flentes ambae, abeuntes lacrimis cum multis.\n\n*(Bellum Poenicum, Liber I, fragment 8)*",
              "italian": "> Le mogli di entrambi\n> uscivano di notte da Troia col capo velato,\n> piangendo entrambe, partendo tra molte lacrime.",
              "english": "> The wives of both\n> went out from Troy at night with covered heads,\n> both weeping, departing with many tears.",
              "analysis": "This fragment comes from Book I of the *Bellum Poenicum*, where Naevius connected the Punic War narrative back to the fall of Troy and the departure of Aeneas -- an innovation that shaped all subsequent Roman epic, and that Virgil would develop into the *Aeneid*. The subject of *amborum* (of both) is disputed: most scholars read it as the wives of Anchises and Aeneas, departing together from the burning city.\n\nWhat is striking is how much Naevius achieves in three short lines. The midnight departure (*noctu*), the covered heads (*capitibus opertis* -- a Roman mourning gesture any contemporary audience would recognize), and the careful doubling of *amborum* / *ambae* (both/both) across the passage create a quietly devastating effect. This is not the heroic register of departure: it is the register of grief and displacement, and it belongs to the women left to walk out while the men steer the ships. It is also the most cinematic moment in archaic Latin epic.\n\nMetrically, this is Saturnian verse. The archaic form *Troiad* (from Troy -- an old ablative construction) and the adverb *noctu* (at night) are characteristic of the register; *capitibus opertis* is an ablative absolute. The syntax is clean and paratactic: three images in sequence, no subordination. This is Naevius at his most direct, and his most human."
            }
          ],
          "id": "bellum-poenicum",
          "label": "Bellum Poenicum"
        },
        {
          "fragments": [
            {
              "title": "Naevius writes his own epitaph",
              "citation": "(Epitaphium Naevii, fr. 67)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This fragment is about Naevius himself, in a gloriously arrogant self-epitaph. It claims that if the gods were allowed to weep for mortals, the divine Camenae would weep for the poet Naevius, and that ever since he died, Rome has forgotten how to speak the Latin tongue.",
              "latin": "> immortales mortales si foret fas flere,\n> flerent divae Camenae Naevium poetam.\n> itaque postquam est Orcho traditus thesauro,\n> obliti sunt Romae loquier lingua Latina.\n\n*(Epitaphium Naevii -- fragment 67)*",
              "italian": "> Se fosse lecito agli immortali piangere i mortali,\n> le divine Camenae piangerebbero il poeta Nevio.\n> Dacché fu consegnato al tesoro di Orco,\n> a Roma hanno dimenticato di parlare in lingua latina.",
              "english": "> If it were right for immortals to weep for mortals,\n> the divine Camenae would weep for the poet Naevius.\n> And so, since he was handed over to the treasury of Orcus,\n> Rome has forgotten how to speak the Latin tongue.",
              "analysis": "This epitaph -- either written by Naevius himself (which would be entirely in character) or by admirers shortly after his death -- is one of the most striking self-assessments in all of Latin literature. The arrogance is magnificent and entirely deliberate.\n\nThe opening conditional, *\"si foret fas\"*, sets up a reversal of the cosmic order: it is not the mortals who mourn, but the immortals. The *Camenae* -- the same Roman divinities Livius used to translate Homer's Muse -- weep for a poet, elevating him to the status of a loss felt by the divine. *Orcho traditus thesauro* is the striking expression for death: Orcus (the underworld) treated as a treasure vault that has received a deposit. The word *thesauro* implies that Naevius was a treasure, not a casualty. Then the closing blow: since his death, Rome has forgotten how to speak Latin. Not just how to write it -- how to speak it.\n\nMetrically, this is Saturnian verse, but relatively regular by the standards of the meter. The four lines show characteristic features: the heavy end-weight of each line, the slightly irregular stress pattern, and the paratactic flow (conjunctions do the work, subordination is minimal). *Loquier* is the archaic infinitive form for *loqui*, a useful reminder that even in this relatively polished piece the archaic surface is always present."
            }
          ],
          "id": "epitaphium",
          "label": "Epitaph"
        }
      ]
    },
    "quintus-ennius": {
      "needsSelection": false,
      "works": [
        {
          "fragments": [
            {
              "title": "Fabius the Delayer, and Ennius on himself",
              "citation": "(Annales, Books IX and XVIII)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This fragment is about Rome’s rescue and the poet’s own identity. The first lines praise Fabius Maximus ‘the Delayer’, who saved the state by patient tactics against Hannibal, refusing to put rumour before Rome’s safety; the closing line is Ennius reflecting that he, once a man of Rudiae, has become a Roman.",
              "latin": "> Unus homo nobis cunctando restituit rem.\n> Non enim rumores ponebat ante salutem.\n> Ergo postque magisque viri nunc gloria claret.\n>\n> *(Annales IX -- on Fabius Maximus Cunctator)*\n\n> Nos sumus Romani qui fuimus ante Rudini.\n>\n> *(Annales XVIII -- de se ipso)*",
              "italian": "> Un solo uomo, con il suo indugiare, ci ha restituito la patria.\n> Non anteponeva le voci di popolo alla salvezza.\n> E così la gloria di quell'uomo ora splende sempre di più.\n\n> Noi siamo Romani, noi che fummo un tempo di Rudiae.",
              "english": "> One man by his delaying restored our fortunes.\n> He did not put rumor before the safety of the state.\n> And so, more and more, that man's glory shines.\n\n> We are Romans now, we who were once men of Rudiae.",
              "analysis": "The three-line passage on Fabius Maximus -- the dictator who famously refused open battle with Hannibal during the Second Punic War, earning the nickname *Cunctator* (the Delayer) and the contempt of the Roman public until his strategy was eventually proved correct -- is one of the most quoted fragments of Latin literature. Its power lies in compression.\n\n*Unus homo*: one single man, emphasis on the individual against the mass. *Cunctando*: the ablative gerund embeds the strategy itself into the syntax. *Restituit rem*: three words that contain the entire achievement -- *res* is not just \"the situation\" but the Roman state, Roman reality, the thing that matters. The second line wraps a moral judgment in an antithesis: *rumores* (popular noise) against *salutem* (survival). In the third line *postque magisque* -- an archaic double construction for \"more and more afterward\" -- gives historical validation its cumulative rhythm.\n\nThe single autobiographical line *de se ipso* rewards attention: \"We are Romans now, we who were once men of Rudiae.\" Ennius writes it near the end of his life, looking back at his journey from a Calabrian town where nobody had heard of Latin poetry. He has spent his career making Rome great in verse. He has also, in doing so, become Roman. The line says both things at once.\n\nMetrically, these are the first lines in this document where the dactylic hexameter can be scanned with reasonable confidence. Notice the spondaic weight in *Unus homo nobis cunctando restituit rem*: the rhythm itself delays."
            }
          ],
          "id": "annales",
          "label": "Annales"
        }
      ]
    },
    "titus-maccius-plautus": {
      "needsSelection": true,
      "selectHeading": "Choose a comedy by Plautus",
      "works": [
        {
          "fragments": [
            {
              "title": "A love-letter only a chicken could have written",
              "citation": "(Pseudolus, Act I, scene 1, vv. 22-36)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This paragraph is about the opening of Pseudolus, where the sharp-tongued slave Pseudolus needles his lovesick young master Calidorus. Calidorus weeps over a wax tablet, a letter from his sweetheart, who has just been sold to a soldier. Pseudolus grabs it and mocks the ghastly handwriting, joking that a chicken must have written it and only the Sibyl could read it.",
              "latin": "> PSEVDOLVS: Mos tibi geretur. sed quid hoc, quaeso?\n> CALIDORVS: Quid est?\n> PS: Vt opinor, quaerunt litterae hae sibi liberos:\n> alia aliam scandit.\n> CAL: Ludis iam ludo tuo?\n> PS: Has quidem pol credo nisi Sibulla legerit,\n> interpretari alium posse neminem.\n> CAL: Cur inclementer dicis lepidis litteris\n> lepidis tabellis lepida conscriptis manu?\n> PS: An, opsecro hercle, habent quas gallinae manus?\n> nam has quidem gallina scripsit.\n> CAL: Odiosus mihi es.\n> lege vel tabellas redde.\n> PS: Immo enim pellegam.\n> advortito animum.\n> CAL: Non adest.\n> PS: At tu cita.\n> CAL: Immo ego tacebo, tu istinc ex cera cita;\n> nam istic meus animus nunc est, non in pectore.\n> PS: Tuam amicam video, Calidore.\n> CAL: Vbi ea est, opsecro?\n> PS: Eccam in tabellis porrectam: in cera cubat.\n>\n> *(Pseudolus I.i, vv. 22-36)*",
              "italian": "> PSEUDOLO: Come vuoi. Ma cos'e' questo, di grazia?\n> CALIDORO: Cosa c'e'?\n> PS: A mio parere, queste lettere cercano dei figli:\n> l'una si arrampica sull'altra.\n> CAL: Gia' a fare il tuo solito gioco?\n> PS: Per Polluce, ci credo: se non e' la Sibilla a leggerle,\n> nessun altro ci riuscirebbe.\n> CAL: Come puoi parlare cosi' male di belle lettere,\n> scritte su belle tavolette da una bella mano?\n> PS: Ma, per Ercole, le galline hanno forse le mani?\n> Perche' questa l'ha scritta una gallina.\n> CAL: Sei insopportabile.\n> Leggile o ridammele.\n> PS: No, no, le leggo fino in fondo.\n> Fa' attenzione.\n> CAL: Non ci sono.\n> PS: Allora sforzati.\n> CAL: No, sto' zitto io; tirala fuori tu dalla cera;\n> perche' il mio animo e' la', non nel petto.\n> PS: Vedo la tua amica, Calidoro.\n> CAL: Dov'e'? Ti prego.\n> PS: Eccola, distesa sulle tavolette: giace nella cera.",
              "english": "> PSEUDOLUS: As you wish. But what in the world is this?\n> CALIDORUS: What is it?\n> PS: As I see it, these letters are looking to have children:\n> one is climbing on top of another.\n> CAL: Starting with your usual games already?\n> PS: By Pollux, I truly believe that unless the Sibyl were to read them,\n> nobody else could make any sense of them.\n> CAL: How can you speak so harshly of beautiful letters\n> written on a beautiful tablet in a beautiful hand?\n> PS: By Hercules, do chickens have hands?\n> Because a chicken wrote this.\n> CAL: You are insufferable.\n> Read it or give it back.\n> PS: No, no, I will read it all the way through.\n> Pay attention.\n> CAL: I am not here.\n> PS: Then make an effort.\n> CAL: No, I will be quiet; you call her out of the wax;\n> because my soul is there right now, not in my chest.\n> PS: I can see your girlfriend, Calidorus.\n> CAL: Where is she? Please.\n> PS: There she is, stretched out on the tablet: she is lying in the wax.",
              "analysis": "This passage is from the opening scene of *Pseudolus* -- the first extended exchange between the clever slave Pseudolus and his lovesick young master Calidorus. Calidorus has been walking around for days clutching a wax tablet (a letter from his beloved Phoenicium, sold by a pimp to a soldier) and weeping over it. Pseudolus finally takes the tablet and attempts to read it.\n\nMetrically, these lines are iambic senarii -- the dialogue register of Roman comedy, relatively approachable by the standards of Latin verse. The meter here does not fight the reader. Everything else does.\n\nThe first joke operates on two levels simultaneously. *Quaerunt litterae hae sibi liberos: alia aliam scandit* -- \"these letters are looking to have children: one is climbing on top of another.\" The surface meaning is visual: the handwriting is so cramped and tangled that individual letters appear to be piled on top of each other. But *scandere* is the technical verb for scanning verse -- \"to climb\" a meter. Plautus is making a self-referential joke about his own written text. The letters of the love letter cannot be scanned; the letters of the play you are watching can. Whether this is deliberate or incidental is, with Plautus, the wrong question.\n\n*Sibulla* is the archaic spelling of *Sibylla*, the prophetess of Cumae. Pseudolus is comparing illegible handwriting to prophetic inscription -- the Sibyl's oracles were famously written on leaves, scattered by the wind, and notoriously difficult to reassemble. It is also a joke about the grandiosity of calling in divine interpreters for a teenage love letter.\n\nThe gallina joke -- *An, opsecro hercle, habent quas gallinae manus?* -- is structured as a rhetorical question followed by a concluding blow: *nam has quidem gallina scripsit*. The oath *opsecro hercle* (\"by Hercules, I beg you\") is pure Plautine verbal tic: *opsecro* (archaic for *obsecro*) and *hercle* appear dozens of times across the comedies as conversational filler and emphasis markers. They are the Roman equivalent of \"I mean, come on.\"\n\n*Pellegam* (for *perlegam*, \"I will read through\") and *advortito* (for *advertito*, \"pay attention\") are further archaic forms, unremarkable in Plautus but invisible in school Latin.\n\nThe emotional high point of the exchange is *nam istic meus animus nunc est, non in pectore*: \"my soul is there right now, not in my chest.\" Calidorus is saying that his whole being has followed Phoenicium into the wax tablet she wrote. It is a genuinely touching line -- a real moment of feeling in a comic scene. Pseudolus immediately punctures it: *Eccam in tabellis porrectam: in cera cubat* -- \"there she is, stretched out on the tablet: she is lying in the wax.\" *Porrectam* (from *porrigo*, \"to stretch out\") carries the additional connotation of a corpse laid out for viewing. Pseudolus is being simultaneously affectionate and brutal, which is his entire character in a single line.\n\nNote what is happening structurally: four different registers of humor -- physical (the chicken), intellectual (the Sibyl), metatextual (scanning verse), and emotional (the soul in the wax) -- appear in fourteen lines of dialogue. This density is not unusual for Plautus. It is the baseline."
            }
          ],
          "id": "pseudolus",
          "label": "Pseudolus"
        }
      ]
    },
    "marcus-porcius-cato": {
      "needsSelection": false,
      "works": [
        {
          "fragments": [
            {
              "title": "Why farming beats trade and usury",
              "citation": "(De Agri Cultura, Praefatio)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This paragraph is about Cato’s moral case for agriculture, the one moment in his farming manual where he pauses to argue values. He sets commerce and moneylending, which the ancestors punished harshly, against farming, which he says produces the toughest men and best soldiers and the most honest, secure, and least resented profit of all.",
              "latin": "> Est interdum praestare mercaturis rem quaerere, nisi tam periculosum sit, et item foenerari, si tam honestum. Maiores nostri sic habuerunt et ita in legibus posiverunt: furem dupli condemnari, foeneratorem quadrupli. Quanto peiorem civem existimarint foeneratorem quam furem, hinc licet existimare. Et virum bonum quom laudabant, ita laudabant: bonum agricolam bonumque colonum; amplissime laudari existimabatur qui ita laudabatur. Mercatorem autem strenuum studiosumque rei quaerendae existimo, verum, ut supra dixi, periculosum et calamitosum. At ex agricolis et viri fortissimi et milites strenuissimi gignuntur, maximeque pius quaestus stabilissimusque consequitur minimeque invidiosus, minimeque male cogitantes sunt qui in eo studio occupati sunt.\n>\n> *(De Agri Cultura, Praefatio)*",
              "italian": "> A volte conviene guadagnarsi da vivere col commercio, se non fosse tanto rischioso; e col prestito a interesse, se non fosse tanto disonorevole. I nostri antenati la pensavano cosi' e cosi' l'hanno messo per legge: il ladro si condanna al doppio, il prestatore al quadruplo. Quanto considerassero peggiore il prestatore del ladro, lo si puo' capire da questo. E quando lodavano un uomo virtuoso, lo lodavano cosi': buon agricoltore e buon coltivatore; chi veniva lodato in questi termini era considerato il piu' elogiato di tutti. Il mercante lo considero anch'io attivo e dedito al guadagno, ma, come ho gia' detto, e' una vita rischiosa e soggetta a disgrazie. Dagli agricoltori nascono invece gli uomini piu' forti e i soldati piu' tenaci; il guadagno che ne viene e' il piu' onesto, il piu' stabile, il meno invidiato; e chi si dedica a questa occupazione e' il meno portato a pensare male.",
              "english": "> Sometimes it pays better to seek profit through trade -- if only the life were not so risky -- or through lending at interest, if that were not so dishonorable. Our ancestors thought as much, and wrote it into law: a thief to be fined double, a moneylender fourfold. How much worse they judged a moneylender than a thief, you can judge from this. And when they praised a virtuous man, they praised him thus: good farmer and good tiller of the soil; whoever was praised in those terms was held to be praised in the highest possible way. I consider the merchant vigorous and keen in pursuit of profit -- but, as I said above, the life is risky and prone to ruin. From farmers come the strongest men and the most capable soldiers; the profit earned from the land is the most honorable, the most stable, the least resented; and those devoted to this pursuit are the least inclined to think ill.",
              "analysis": "This is the only passage in *De Agri Cultura* where Cato steps back from practical instruction and makes something like a moral argument. It is worth reading carefully, because it reveals how the whole book is meant to be understood: not merely as a technical handbook, but as a statement of Roman values.\n\nThe structure is characteristically Catonian: three short declarative sentences establishing the case against commerce and moneylending; then the law cited as authority. Note *posiverunt* (archaic for *posuerunt*) and *foeneratorem* -- the archaic surface appears immediately, in the very first paragraph. Then the clinching observation is delivered as an invitation rather than a declaration: *hinc licet existimare*, \"from this one may judge.\" Cato does not spell out the conclusion. He lets the argument do its work.\n\n*Quom laudabant, ita laudabant* -- \"when they praised, they praised thus\" -- is the rhetorical high point: a doubled construction that mimics the weight of inherited habit. The superlative chain that closes the passage -- *fortissimi... strenuissimi... stabilissimusque... minimeque invidiosus... minimeque male cogitantes* -- is almost the only extended flourish in the prologue, and it is earned. Cato has been building toward it with short sentences. When the superlatives arrive, they land with cumulative force precisely because everything before them was so compressed.\n\nSyntactically, this is as accessible as archaic Latin gets. The sentences are self-contained, the logic is sequential, and the vocabulary, while including archaic forms (*quom*, *posiverunt*, *foenerari*), makes no technical demands beyond agricultural context. A student with a glossary and an afternoon of preparation can read this passage without difficulty. What they get out of it is, as with all of Cato, something they were not necessarily expecting."
            }
          ],
          "id": "de-agri-cultura",
          "label": "De Agri Cultura"
        }
      ]
    },
    "caecilius-statius": {
      "needsSelection": true,
      "selectHeading": "Choose a text by Caecilius",
      "works": [
        {
          "fragments": [
            {
              "title": "Shackled to a rich and domineering wife",
              "citation": "(Plocium, fragment in Gellius, Noctes Atticae II.23)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This paragraph is about a henpecked husband’s lament from Caecilius’s comedy Plocium. Married to a wealthy, overbearing wife whose dowry rules him, the speaker grumbles that he lives like a prisoner of war waiting for her to die, and that her nagging made him sell off a slave girl she suspected him with, which she then bragged about to all her friends.",
              "latin": "> is demum miser est, qui aerumnam suam nescit occultare\n> ferre: ita me uxor forma et factis facit, si taceam, tamen indicium.\n> Quae nisi dotem, omnia, quae nolis, habet: qui sapiet, de me discet,\n> qui quasi ad hostes captus liber servio salva urbe atque arce.\n> Quae mihi, quidquid placet, eo privatu vim me servatum.\n> Dum ego eius mortem inhio, egomet vivo mortuus inter vivos.\n> Ea me clam se cum mea ancilla ait consuetum, id me arguit,\n> ita plorando, orando, instando atque obiurgando me obtudit,\n> eam uti venderem; nunc credo inter suas\n> aequalis et cognatas sermonem serit:\n> \"quis vestrarum fuit integra aetatula,\n> quae hoc idem a viro\n> impetrarit suo, quod ego anus modo\n> effeci, paelice ut meum privarem virum?\"\n> haec erunt concilia hodie, differor sermone miser.",
              "italian": "> Davvero infelice e' colui che non sa tenere nascosta la propria miseria:\n> mia moglie, con il suo aspetto e i suoi modi, mi denuncia anche quando taccio.\n> Salvo la dote, ha tutto cio' che non vorresti: chi e' saggio impara da me,\n> io che, uomo libero, servo come un prigioniero di guerra mentre citta' e rocca sono salve.\n> Qualunque cosa mi piaccia, lei me ne priva con la forza, nel mio interesse.\n> Mentre aspetto bramosamente la sua morte, io stesso vivo da morto in mezzo ai vivi.\n> Ha detto che avevo un'intesa segreta con la mia schiava, mi ha accusato,\n> e mi ha tanto logorato con pianti, suppliche, insistenze e rimproveri\n> che l'ho venduta. Ora immagino che stia riferendo alle sue coetanee\n> e parenti: \"quale di voi, nel fiore degli anni,\n> ha mai ottenuto dal proprio marito\n> cio' che io, vecchia com'ero, sono riuscita a ottenere --\n> privare mio marito della sua concubina?\"\n> Questi saranno i discorsi di oggi, e io, povero me, sono fatto a pezzi dai pettegolezzi.",
              "english": "> Truly wretched is the man who cannot keep his misery hidden:\n> my wife, by her looks and behavior, denounces me even when I say nothing.\n> Apart from her dowry, she has everything you would not want: let the wise man learn from my example --\n> I, a free man, serving like a prisoner of war while the city and citadel stand safe.\n> Whatever pleases me, she deprives me of by force, for my own good.\n> While I eagerly wait for her death, I myself live as a dead man among the living.\n> She accused me of carrying on in secret with my slave girl,\n> and wore me down with weeping, begging, nagging, and scolding until I sold her.\n> Now, I imagine, she is spreading word among her friends\n> and relations of the same age: \"which of you, in the prime of your youth,\n> ever managed to get from her husband\n> what I, old woman that I am, just managed to get --\n> depriving my husband of his mistress?\"\n> That will be the talk today, and I, poor wretch, am being torn apart by gossip.",
              "analysis": "This passage is the husband's monologue from Caecilius's *Plocium*, quoted in full by Gellius in *Noctes Atticae* II.23, immediately alongside the corresponding section of Menander's Greek original. Gellius prefers Menander. A reader encountering Caecilius alone, without the comparison, may find themselves less disappointed than Gellius.\n\nThe opening line -- *is demum miser est, qui aerumnam suam nescit occultare* -- circulated in antiquity as a standalone maxim and was quoted independently for its compression and accuracy. \"He alone is truly wretched who cannot conceal his wretchedness\" is both a moral observation and a piece of practical advice for surviving a bad marriage.\n\nThe imagery escalates into comic hyperbole that brushes against something real. *Quasi ad hostes captus liber servio salva urbe atque arce* -- \"I serve like a prisoner of war while the city and citadel stand safe\" -- describes the domestic condition of a Roman man married to a wealthy woman whose dowry gives her leverage he cannot match. Caecilius makes this explicit: *Quae nisi dotem, omnia, quae nolis, habet* -- \"apart from the dowry, she has everything you would not want.\" The *dos* is the trap.\n\n*Dum ego eius mortem inhio, egomet vivo mortuus inter vivos* -- \"while I eagerly await her death, I myself live as a dead man among the living\" -- is probably the best single line in surviving Caecilius. The reversal is clean: the man waiting for his wife to die has, in the waiting, already died first.\n\nNote the fifth line -- *Quae mihi, quidquid placet, eo privatu vim me servatum* -- which is metrically and syntactically troubled. Editors have proposed emendations; the transmitted text is likely corrupt. This is not unusual for fragmentary authors transmitted through quotation, and it is a reminder of the conditions under which we read Caecilius: through a narrow window of other people's books, on a text that has accumulated damage over centuries of copying.\n\nThe metrical form throughout is the trochaic septenarius -- the seven-foot trochaic line Plautus and Caecilius both used for heightened emotional scenes. The rhythm is rapid and insistent, appropriate to the husband's frantic internal inventory of his domestic situation."
            }
          ],
          "id": "plocium",
          "label": "Plocium"
        },
        {
          "fragments": [],
          "id": "other",
          "label": "Other"
        }
      ]
    },
    "publius-terentius-afer": {
      "needsSelection": true,
      "selectHeading": "Choose a comedy by Terence",
      "works": [
        {
          "fragments": [
            {
              "title": "‘I am human: nothing human is foreign to me’",
              "citation": "(Heauton Timorumenos, Act I, scene 1, vv. 75-87)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This paragraph is about the opening of Terence’s Heauton Timorumenos, where Chremes pries into why his rich old neighbour Menedemus is punishing himself with brutal farm work. Told to mind his own business, Chremes answers with the famous homo sum, humani nil a me alienum puto, ‘I am human; I think nothing human foreign to me’, and gently coaxes his neighbour to share his grief.",
              "latin": "> ME. Chreme, tantumne ab re tuast oti tibi\n> aliena ut cures ea quae nil ad te attinent?\n> CH. homo sum: humani nil a me alienum puto.\n> vel me monere hoc vel percontari puta:\n> rectumst ego ut faciam; non est te ut deterream.\n> ME. mihi sic est usu'; tibi ut opu' factost face.\n> CH. an quoiquamst usus homini se ut cruciet? ME. mihi.\n> CH. si quid laborist nollem. sed quid istuc malist?\n> quaeso, quid de te tantum meruisti? ME. eheu!\n> CH. ne lacruma atque istuc, quidquid est, fac me ut sciam:\n> ne retice, ne verere, crede inquam mihi:\n> aut consolando aut consilio aut re iuvero.\n> ME. scire hoc vis? CH. hac quidem causa qua dixi tibi.",
              "italian": "> ME. Chreme, hai davvero cosi' tanto tempo libero da occuparti delle faccende altrui, che non ti riguardano per niente?\n> CH. Sono un uomo: non considero nulla di umano estraneo a me.\n> Prendila come un avvertimento o come una semplice curiosita':\n> fare questa cosa e' giusto per me; non e' che voglia dissuaderti.\n> ME. Le mie abitudini sono queste; tu fa' come ti conviene.\n> CH. Ma esiste qualcuno a cui faccia bene tormentarsi cosi'? ME. A me.\n> CH. Se c'e' qualche dolore, ne sono dispiaciuto. Ma qual e' questo male?\n> Dimmi, cos'hai fatto di tanto grave a te stesso? ME. Ahime'!\n> CH. Non piangere -- qualunque cosa sia, fammi sapere:\n> non stare in silenzio, non aver paura, credimi:\n> ti aiutero' con parole di conforto, con un consiglio, o con i fatti.\n> ME. Vuoi davvero saperlo? CH. Per il motivo che ti ho detto.",
              "english": "> ME. Chremes, have you really got so much free time that you concern yourself with other people's affairs, things that have nothing to do with you?\n> CH. I am human: I consider nothing human foreign to me.\n> Take it as advice or as simple curiosity on my part:\n> it is right for me to do this; I am not trying to put you off.\n> ME. My ways are my own; you do as you see fit.\n> CH. Is there anyone for whom tormenting himself is a good idea? ME. For me.\n> CH. I am sorry if there is something painful. But what is this trouble?\n> Tell me, what have you done to deserve this from yourself? ME. Oh.\n> CH. Do not weep -- whatever it is, let me know:\n> do not stay silent, do not be afraid, trust me:\n> I will help you with comfort, with counsel, or with something concrete.\n> ME. Do you really want to know? CH. For the reason I already told you.",
              "analysis": "The scene opens with Menedemus -- a neighbor Chremes barely knows -- performing hard manual labor in his fields despite being a wealthy old man of sixty. Chremes cannot leave it alone. His justification, when Menedemus asks why he is meddling: *homo sum: humani nil a me alienum puto.*\n\nThe line is iambic senarius -- the workhorse meter of Terentian dialogue, which mimics the natural stress patterns of spoken Latin well enough that Cicero cited Terence as evidence that good prose and good iambic verse share the same rhythmic instincts. The syntax is clean and direct. There is no difficult vocabulary, no hyperbaton, no ellipsis. Even the compressed *nil* for *nihil* is standard colloquial Latin, not an archaic form. This is, by the standards of the archaic period, exceptionally readable Latin.\n\nThe content, however, is doing philosophical work. *Humani nil a me alienum puto* is not just an expression of nosiness. It is a claim about the scope of moral attention: everything a human being experiences is, by virtue of that shared humanity, also something I am capable of understanding and therefore something I have some obligation to engage with. The Stoic underpinning -- that all humans share a common rational nature that makes them mutually intelligible and mutually responsible -- was already circulating in the Roman Hellenism of the Scipionic circle. Terence puts it in the mouth of a comedy character justifying why he is pestering a man he met last week.\n\nNote that Menedemus's answer is not a refutation. He simply says *mihi sic est usu'* -- \"those are my ways.\" He is not arguing that Chremes is wrong to care; he is asserting the right to privacy. The comedy that follows -- his story of driving his son away and punishing himself for it by working like a slave -- proves Chremes right to ask. The *humanitas* principle wins.\n\nThe scene also models Terentian dialogue: two voices, each grammatically complete, trading control of the conversation in short exchanges. This is not the voluble verbal flooding of Plautus. It is measured, almost Socratic. The effect is that the characters feel like people thinking in real time rather than performers delivering prepared material."
            }
          ],
          "id": "heauton-timorumenos",
          "label": "Heauton Timorumenos"
        }
      ]
    },
    "marcus-pacuvius-and-lucius-accius": {
      "needsSelection": false,
      "works": [
        {
          "fragments": [
            {
              "title": "Pacuvius: complain of fortune, but do not weep",
              "citation": "(Niptra, fragment in Cicero, Tusculanae Disputationes II.50)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This fragment is about the wounded Ulysses in Pacuvius’s tragedy Niptra, struck down by a spear thrown by his own son. The two lines state a stern Roman ideal: it is fitting to voice complaint against cruel fortune but not to wail over it, for measured protest is a man’s duty while tears belong to a woman’s nature.",
              "latin": "> Conqueri fortunam adversam, non lamentari decet.\n> Id viri est officium, fletus muliebri ingenio additus.",
              "italian": "> Lamentarsi della sorte avversa e' lecito; piangere su di essa, no.\n> Questo e' il compito di un uomo; le lacrime appartengono all'animo femminile.",
              "english": "> To complain of adverse fortune is fitting; to lament it is not.\n> That is a man's duty; weeping belongs to a woman's nature.",
              "analysis": "These two lines close the *Niptra* -- \"The Washing\" or \"The Foot-Washing,\" the name referring to the scene in which Ulysses, wounded by a spear thrown by his own son Telegonus (who did not know his father's identity), is being carried by attendants. The play adapted a story from the lost Greek epic tradition. Cicero quotes the passage in *Tusculanae Disputationes* II to illustrate the proper philosophical response to pain: not stoic silence, not theatrical weeping, but the controlled articulation of complaint without collapse into grief.\n\nThe lines are in iambic senarii. The syntax is clean -- a parallel construction (*conqueri... non lamentari*) resolved by two defining statements. The language is unambiguous, almost aphoristic. This is precisely why Cicero found them quotable: they state a Roman moral position in Roman dramatic verse with complete economy.\n\nThe gendered framing -- weeping as feminine, controlled complaint as masculine -- is entirely conventional for the period and for Roman tragedy generally. What is Pacuvian is the precision: *conqueri* (to complain, to voice grievance) is explicitly permitted; *lamentari* (to lament, to give way to grief) is not. The distinction is fine enough to be philosophically interesting rather than merely macho."
            }
          ],
          "id": "pacuvius-niptra",
          "label": "Pacuvius - Niptra"
        },
        {
          "fragments": [
            {
              "title": "Accius: ‘Let them hate, so long as they fear’",
              "citation": "(Atreus, fragment in Cicero, De Officiis I.97)",
              "source": "The Latin Library (thelatinlibrary.com)",
              "description": "This fragment is about tyranny in three words. Spoken by Atreus, who murdered his brother’s children and served them at a feast, oderint, dum metuant (‘let them hate, so long as they fear’) became the proverbial motto of the tyrant. Cicero cites it as the mark of illegitimate power, and the emperor Caligula later made it his favourite saying.",
              "latin": "> oderint, dum metuant.",
              "italian": "> Mi odino pure, purche' mi temano.",
              "english": "> Let them hate, so long as they fear.",
              "analysis": "Three words. One of the most consequential three-word phrases in Latin literature.\n\nCicero quotes it in *De Officiis* I.97 while discussing theatrical decorum: it would be outrageous, he says, to hear a just ruler like Aeacus or Minos say this. But spoken by Atreus -- the murderer of his brother's children, who cooked them and served them at a feast -- it is exactly right. The line fits the character, which is what Accius intended. Tragedy is not obliged to put good thoughts in the mouths of evil people.\n\nThe line became famous long before Caligula. It circulated as the definition of tyrannical government throughout the late Republic. Cicero treats it as self-evidently wrong: a ruler who governs through fear rather than love has already failed as a political figure and as a human being. The Stoic argument is that *metuant* produces compliance, not loyalty, and that compliance based on fear collapses the moment the fear source is removed. *Oderint, dum metuant* is not a governing philosophy; it is a confession that you have no legitimacy.\n\nThen, approximately two centuries after Accius wrote it, Caligula made it his favorite saying. Suetonius records this in *Caligula* 30. The joke that history kept playing -- that the most explicit theatrical statement of what a tyrant sounds like would be adopted enthusiastically by an actual Roman emperor -- would probably not have surprised Accius. He had, after all, refused to stand up for a magistrate. He understood exactly what kind of men ended up in positions of power."
            }
          ],
          "id": "accius-atreus",
          "label": "Accius - Atreus"
        }
      ]
    },
    "gaius-lucilius": {
      "needsSelection": false,
      "works": [
        {
          "fragments": [
            {
              "title": "What virtue really is, and where loyalty is owed",
              "citation": "(Saturae, frr. 1342-1354 Krenkel)",
              "source": "Lactantius, Divinae Institutiones VI.5 (Krenkel numbering)",
              "description": "This paragraph is about the meaning of virtue, the most philosophical surviving piece of Lucilius’s satire, addressed to a friend named Albinus. Pounding on the word virtus, it defines true worth as knowing right from wrong, living honestly, and serving the community, and it ranks our duties: fatherland first, then parents, and ourselves only last.",
              "latin": "> Virtus, Albine, est pretium persolvere verum\n> quis in versamur, quis vivimus rebus, potesse,\n> virtus est homini scire id quod quaeque habeat res,\n> virtus scire homini rectum, utile quid sit, honestum,\n> quae bona, quae mala item quid inutile, turpe, inhonestum,\n> virtus quaerendae finem re scire modumque,\n> virtus divitiis pretium persolvere posse,\n> virtus id dare quod re ipsa debetur honori,\n> hostem esse atque inimicum hominum morumque malorum\n> contra defensorem hominum morumque bonorum,\n> hos magni facere, his bene velle, his vivere amicum,\n> commoda praeterea patriai prima putare,\n> deinde parentum, tertia iam postremaque nostra.",
              "italian": "> Virtus, Albino, e' poter pagare il giusto prezzo nelle cose in cui ci muoviamo, nelle cose in cui viviamo; virtus e' per l'uomo conoscere cio' che ogni cosa ha in se stessa; virtus e' conoscere per l'uomo cio' che e' retto, utile, onesto; quali cose siano buone, quali parimenti malvagie, inutili, turpi, disoneste; virtus e' conoscere il fine e la misura del cercare; virtus e' poter dare il giusto valore alle ricchezze; virtus e' dare cio' che in realta' e' dovuto all'onore; essere nemico e avversario degli uomini e dei costumi malvagi, e al contrario difensore degli uomini e dei costumi buoni; tenere costoro in grande stima, voler loro bene, vivere come loro amico; e poi ritenere i vantaggi della patria al primo posto, poi quelli dei genitori, e al terzo posto, infine, i nostri.",
              "english": "> Virtue, Albinus, is being able to pay the fair price in the things we deal in, the things we live by; virtue is knowing for a man what each thing contains within itself; virtue is knowing what is right, useful, and honourable; what things are good and what are equally bad, useless, base, dishonourable; virtue is knowing the limit and measure of what is sought; virtue is being able to give wealth its proper value; virtue is giving what is in truth owed to honour; being enemy and adversary to bad men and bad customs, and on the contrary defender of good men and good customs; holding these in high regard, wishing them well, living as their friend; and moreover putting the advantages of the fatherland first, then those of our parents, and our own interests third and last.",
              "analysis": "This is the virtus fragment -- the most philosophically substantial passage to survive from Lucilius's thirty books, and one of the most discussed texts in all of archaic Latin. It is preserved by Lactantius in his *Divinae Institutiones* (VI.5), who quotes it as a model pagan definition of virtue before arguing that it falls short of the Christian one. That Lactantius kept it is the reason we have it at all. Neither The Latin Library nor Splash Latino carries a dedicated Lucilius page; the text here follows the standard scholarly edition of Krenkel (1970), which reconstructs the fragments from their ancient sources.\n\nThe fragment opens with a direct address to \"Albine\" -- almost certainly a friend or associate of Lucilius, possibly a member of the Scipionic circle. The conversational frame is characteristic: satire as dinner-table philosophy between equals, not public oration. We are in the middle of an argument, not at a lectern.\n\nThe dominant rhetorical figure is anaphora: *virtus* repeated six times, each instance opening a new clause in what becomes a catalogue definition. The structure is broadly tripartite: *virtus* as practical knowledge (lines 1-5), *virtus* as practical conduct (lines 6-8), and *virtus* as social and civic duty (lines 9-13).\n\nThe syntax of the opening lines is an immediate index of the difficulty. Line 2 -- *quis in versamur, quis vivimus rebus, potesse* -- is one of the most compressed in the fragment: *quis* here is the locative/dative plural of the relative pronoun (equivalent to *in quibus*), and *potesse* is the archaic infinitive of *posse*. The clause means \"being able [to pay the fair price] in the things in which we move, in the things by which we live\" -- but reaching that reading requires recognizing the archaic infinitive form, resolving the ellipsis carried over from line 1, and understanding *versamur* in its idiomatic sense of \"to be engaged in, to move in a sphere.\" None of these is individually fatal; all at once, in two lines, without surrounding context, this is representative of what the rest of the fragments will do to you.\n\n*Patriai* in line 12 is the archaic genitive of *patria* (-ai for -ae), inherited from the oldest Latin declension patterns and shared with Lucretius. It is a deliberate register marker: old-fashioned, solemn, Roman in the deepest sense of the word.\n\nThe closing three lines deliver the climax. After the long catalogue of intellectual and social virtues, Lucilius ends with a priority ranking: the fatherland first (*patriai prima*), then parents (*parentum*), our own interests last (*postremaque nostra*). The compression of the final line -- *tertia iam postremaque nostra* -- lands with unusual force. *Iam* is idiomatic here (\"and in fact,\" \"yes, and\"), and *postremaque* (last of all) doubles the weight of *tertia* (third). Lucilius is not inventing a new ethics; he is articulating, with remarkable precision, the inherited Roman hierarchy of obligations -- and making absolutely clear where the individual stands in relation to it."
            }
          ],
          "id": "saturae",
          "label": "Saturae"
        }
      ]
    },
    "pomponius-bononiensis-and-quintus-novius": {
      "needsSelection": false,
      "works": [
        {
          "fragments": [
            {
              "title": "Pomponius: a mix-up in the fullers’ workshop",
              "citation": "(Fullones, fr. 48-50 Ribbeck)",
              "source": "PHI Latin Texts, phi0618.phi001 (Ribbeck ed.)",
              "description": "This fragment is about a scene from Pomponius’s Atellan farce Fullones, set among the cloth-fullers. A prompter tells two characters to embrace and greet each other, but one hails the other as ‘brother’ and gets ‘sister’ back, hinting at a disguise, before the scene snaps into brisk workshop orders to stoke the fire, feed the wood, and grind the grain.",
              "latin": "*Source note: Neither The Latin Library nor Splash Latino has a dedicated Pomponius Bononiensis page. The text is drawn from PHI Latin Texts (phi0618.phi001), which uses the Ribbeck edition as its base text. The ancient source is Nonius Marcellus, the 4th-century AD grammarian, who preserves this passage under his entry for the word* conplectite *in* De Compendiosa Doctrina.\n\n> Quin ergo, quando conuenit, conplectite?\n> Mi frater, salueto! -- O soror, salue, mea!\n> Facite ut ignis feruat, ligna insipite, far concidite.",
              "italian": "> Su allora, visto che e' il momento, abbracciatevi!\n> Fratello mio, salve! -- Oh sorella mia, salve!\n> Fate in modo che il fuoco bolla, mettete dentro i legni, tritate il farro.",
              "english": "> Come on then, since it is the right moment, go ahead and embrace!\n> My brother, hello! -- Oh my sister, hello!\n> Make sure the fire boils, feed in the wood, chop up the grain.",
              "analysis": "The play is the *Fullones* -- the Cloth-Fullers. A *fullo* was a laundry worker who cleaned and finished woolen cloth by treading it in large vats filled with water, clay, and stale urine (the ammonia content being essential to the process). Roman fulling workshops were a fixture of city life; the fullers of Pompeii were famous enough to paint political campaign slogans on walls. Choosing them as the subject of an Atellan farce is characteristic: this is comedy from the world of physical, smelly, manual labor, the exact milieu where Maccus and Bucco would feel most at home.\n\nThe fragment was preserved because Nonius Marcellus needed to cite the imperative form *conplectite* -- second-person plural present of *complecti* (to embrace). It was saved not as a literary monument but as a grammar example.\n\nLine 1: *Quin ergo, quando conuenit, conplectite?* The particle *quin* with a direct imperative is an urgent colloquial construction -- \"come on then,\" \"why not go ahead and.\" *Quando conuenit* means \"when it is fitting\" -- someone is prompting two characters to greet each other, as though watching from outside the scene.\n\nLine 2: The greeting is the joke. One character says *mi frater, salueto* (\"my brother, hello\"), using the archaic salutation form *salueto* (more old-fashioned than simple *salue*). The other responds *o soror, salue, mea* (\"oh my sister, hello\"). One says \"brother\"; the other says \"sister.\" This asymmetry is the comic kernel. In Atellan comedy, gender confusion points almost certainly to a disguise scenario -- *Maccus Virgo* is an entire play -- or to the kind of willful absurdity that the genre treats as a feature rather than a bug.\n\nLine 3: The comedy lands back in the workshop: *facite ut ignis feruat* (see to it that the fire boils), *ligna insipite* (feed in the wood), *far concidite* (chop up the grain). Three imperatives in rapid sequence, no explanatory framing. The spelt grain is surprising for a fulling workshop -- it is food, not part of the process -- suggesting the scene may take place partly in a kitchen, or that Pomponius is simply enjoying the incongruity. The line ends and the scene continues somewhere we cannot follow."
            }
          ],
          "id": "pomponius-fullones",
          "label": "Pomponius - Fullones"
        },
        {
          "fragments": [
            {
              "title": "Novius: Maccus the fool and the head-cracking doorway",
              "citation": "(Maccus Exul, fr. 48-50 Ribbeck)",
              "source": "PHI Latin Texts, phi0592.phi001 (Ribbeck ed.)",
              "description": "This fragment is about the stock clown Maccus driven into exile in Novius’s Atellan farce Maccus Exul. The speaker crows that he predicted the fellow would gallop off to Tuscany, then launches into a litany of woe about a doorway whose lintel keeps cracking his skull and whose threshold keeps smashing his toes, the repeated injuries being the whole joke.",
              "latin": "*Source note: Neither The Latin Library nor Splash Latino has a dedicated Novius page. The text is drawn from PHI Latin Texts (phi0592.phi001), which uses the Ribbeck edition as its base text. The ancient source is Nonius Marcellus, who preserves these lines under his entry for the demonstrative particle* em *in* De Compendiosa Doctrina.\n\n> Em: díxin itúrum hominem in Túscos tolútim?\n> Límen superum, quód mei misero saépe confregít caput,\n> Ínferum autem, dígitos omnis úbi ego diffregí meos.",
              "italian": "> Eccolo! Non l'avevo detto che quell'uomo se ne sarebbe andato in Toscana di gran carriera?\n> La soglia di sopra, che mi ha cosi' spesso sfondato la testa, povero me,\n> e quella di sotto, dove mi sono rotto tutte le dita dei piedi.",
              "english": "> There! Did I not say that man would be off to Tuscany at a gallop?\n> The top threshold, which has so often smashed this wretch's head in,\n> and the bottom one, where I have broken all my toes.",
              "analysis": "The play is *Maccus Exul* -- Maccus the Exile. The title suggests a scenario in which Maccus has been driven out of somewhere, presumably following the kind of comprehensive disaster that defines his character. Exile -- from home, city, or household -- was a standard comic starting point, placing the fool in an unfamiliar situation with no safety net.\n\nLine 48: *Em: díxin itúrum hominem in Túscos tolútim?* The fragment opens with the demonstrative particle *em* -- \"there!\" or \"look!\" -- which is what Nonius Marcellus was citing it to illustrate. *Dixin* is a syncopated form of *dixine* (= *dixistine*, \"did I not say...?\"), a colloquial contraction found elsewhere in Plautus. *Tolutim* means moving at a trot or gallop, borrowed from the vocabulary of horse-gaits and used here to describe a rapid and undignified departure. Tuscany -- Etruria -- carried associations of provincial foreignness in the Roman comic imagination. Whether the destination is funny in itself, or whether the speed of the departure is the joke, depends on context we no longer have.\n\nLines 49-50: The scene shifts to a monologue of physical complaint. *Limen superum* is the top threshold -- the lintel above a doorway, at head height for a tall man and slightly above it for anyone moving at speed. *Limen inferum* is the raised stone at the base of the doorframe, where feet trip. Maccus's relationship with this doorway is characterized by one word: *saepe* -- often. He has often hit his head on the top threshold. He has broken all his toes on the bottom one. This is not a one-time accident; it is a pattern. The comedy is precisely in the *saepe*: Maccus is a man who, after multiple encounters with the same doorway, has still not learned to duck or step carefully. The exaggerated mask of the fool, with its large features, would have made the image immediately visible to any audience familiar with the character.\n\nThe fragment was preserved not for the image or the joke but because Nonius needed a citation for *em*. Maccus's chronic battle with his own doorframe survived two thousand years as a footnote to a particle. That is Atellan comedy's version of literary immortality."
            }
          ],
          "id": "novius-maccus-exul",
          "label": "Novius - Maccus Exul"
        }
      ]
    }
  };

  global.PracticeBank = {
    authors: AUTHORS,
    forAuthor: function (slug) { return AUTHORS[slug] || null; },
    needsSelection: function (slug) {
      var a = AUTHORS[slug];
      return !!(a && a.needsSelection);
    },
    // Works that actually have fragments (used by the selection page).
    works: function (slug) {
      var a = AUTHORS[slug];
      if (!a) return [];
      return a.works.filter(function (w) { return w.fragments && w.fragments.length; });
    },
    getWork: function (slug, workId) {
      var a = AUTHORS[slug];
      if (!a) return null;
      return a.works.filter(function (w) { return w.id === workId; })[0] || null;
    },
    // Flat list of every fragment for an author (across works).
    allFragments: function (slug) {
      var a = AUTHORS[slug];
      if (!a) return [];
      return a.works.reduce(function (acc, w) { return acc.concat(w.fragments || []); }, []);
    },
    selectHeading: function (slug) {
      var a = AUTHORS[slug];
      return (a && a.selectHeading) || 'Choose a text';
    }
  };
})(window);
