// v1.16.0 follow-up (12/10/2026): the user's notes on the first Sallust batch,
// folded into the five Catilina notes, plus the Lucretius side of the new
// cross-reference. Template literals, so the prose needs no escaping; run it to
// write batch/patch1160c.json (Sallust) and batch/patch1160c_lucr.json
// (Lucretius), which tools/patch_fields.js applies. It also makes the same
// edits in batch/frags1160a.js and frags1160b.js, so they stay the record of
// what the notes say.
//
//   node batch/patch1160c.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1160c.json
//   node tools/patch_fields.js titus-lucretius-carus batch/patch1160c_lucr.json
const fs = require('fs');
const path = require('path');

const C1 = '(De Coniuratione Catilinae 1)';
const C3 = '(De Coniuratione Catilinae 3.3-4.5)';
const C5 = '(De Coniuratione Catilinae 5)';
const C7 = '(De Coniuratione Catilinae 7)';
const C9 = '(De Coniuratione Catilinae 9)';

const sallust = [
// ---- Cat. 1: why the book opens with philosophy --------------------------
{ cit: C1, field: 'analysis',
  find: `What is new is the use Sallust makes of it: this is the first move of a man explaining why he now writes history instead of making it, which he will say outright in chapters 3 and 4.`,
  replace: `What is new is the use Sallust makes of it.

**Why a history book opens like this.** The chapter is a foundation, laid so that a decision can stand on it. If power and riches do not last (4), then politics, which is the pursuit of both, is not the best thing a man can do with his life. What lasts is what the mind produces: fame, and above all the fame that writing earns. For Sallust that means history. It is work done with the intellect, it wins the *memoria quam maxume longa* of section 3, and in a state as corrupt as the one he is about to describe it is, on his account, the one way left to serve it dutifully: by setting down what happened for those who come after. He says so outright in chapters 3 and 4, where the man who left politics explains himself; this page is there so that the explanation will sound like a conclusion and not like an excuse. Even the philosophy has a pedigree beyond Plato. Mind shared with the gods, body shared with the beasts: man stands between the two, which is close to the definition the tradition took from Aristotle, the human being as the animal that has reason.` },
{ cit: C1, field: 'analysisIt',
  find: `Nuovo è l'uso che ne fa Sallustio: è la prima mossa di un uomo che spiega perché adesso la storia la scrive invece di farla, e lo dirà apertamente nei capitoli 3 e 4.`,
  replace: `Nuovo è l'uso che ne fa Sallustio.

**Perché un libro di storia comincia così.** Il capitolo è un fondamento, gettato perché una decisione possa poggiarvi sopra. Se il potere e le ricchezze non durano (4), allora la politica, che è la ricerca dell'uno e delle altre, non è il modo migliore di spendere la vita. Dura quello che produce l'animo: la fama, e soprattutto quella che viene dalla scrittura. Per Sallustio questo significa la storia. È un'attività dell'intelletto, procura la *memoria quam maxume longa* del paragrafo 3, e in uno stato corrotto come quello che sta per descrivere è, a suo giudizio, l'unico modo rimasto di servirlo con senso del dovere: fissare ciò che è accaduto per chi verrà dopo. Lo dice apertamente nei capitoli 3 e 4, dove l'uomo che ha lasciato la politica si spiega; questa pagina esiste perché quella spiegazione suoni come una conclusione e non come una scusa. Anche la filosofia ha una genealogia che va oltre Platone. L'animo in comune con gli dèi, il corpo in comune con le bestie: l'uomo sta in mezzo, ed è vicino alla definizione che la tradizione ha preso da Aristotele, l'essere umano come animale dotato di ragione.` },

// ---- Cat. 3.3-4.5: the man who backed away; the monograph; the hand-over --
{ cit: C3, field: 'analysis',
  find: `The picture is of a decent seedling in a bad garden. Antiquity was not convinced: Cassius Dio (43.9) remarks that the governor did precisely the things the writer condemns in others.`,
  replace: `The picture is of a decent seedling in a bad garden. But notice what the passage does not do. It does not deny that he was caught, and it does not argue that he was right. What matters is the next step: he got out. Sallust presents himself as the man who tasted corruption and backed away from it, which is what almost nobody else in his book manages to do. Antiquity was not wholly convinced, all the same: Cassius Dio (43.9) remarks that the governor did precisely the things the writer condemns in others.` },
{ cit: C3, field: 'analysisIt',
  find: `L'immagine è quella di una piantina sana in un giardino cattivo. L'antichità non ci credette: Cassio Dione (43.9) osserva che il governatore fece esattamente le cose che lo scrittore rimprovera agli altri.`,
  replace: `L'immagine è quella di una piantina sana in un giardino cattivo. Ma si noti che cosa il passo non fa. Non nega di essere stato preso, e non sostiene di aver avuto ragione. Conta il passo successivo: ne è uscito. Sallustio si presenta come l'uomo che ha assaggiato la corruzione e se ne è tirato indietro, cioè quello che quasi nessun altro nel suo libro riesce a fare. L'antichità, comunque, non ne fu del tutto convinta: Cassio Dione (43.9) osserva che il governatore fece esattamente le cose che lo scrittore rimprovera agli altri.` },
{ cit: C3, field: 'analysis',
  find: `had written that farmers make the bravest men and the toughest soldiers, and`,
  replace: `had written that farmers make the bravest men and the toughest soldiers (De Agri Cultura, Praefatio, which this app carries), and` },
{ cit: C3, field: 'analysisIt',
  find: `aveva scritto che dai contadini nascono gli uomini più forti e i soldati più valorosi, e`,
  replace: `aveva scritto che dai contadini nascono gli uomini più forti e i soldati più valorosi (De Agri Cultura, Praefatio, che quest'app contiene), e` },
{ cit: C3, field: 'analysis',
  find: `not Rome year by year from Romulus, but single episodes, the monograph. *Ut quaeque memoria digna videbantur*: he will do the choosing.`,
  replace: `not Rome year by year from Romulus, as the annalists wrote it, but single episodes. This is the historical monograph, and Sallust is the writer who brought it to Rome: one earlier attempt is known, Coelius Antipater's book on the war with Hannibal some seventy years before, but it is with the Catilina that the form becomes a real alternative to the annals. *Ut quaeque memoria digna videbantur*: he will do the choosing, and what he chooses is telling. A plot of bankrupt nobles, and after it a war dragged out by bribery: both episodes are picked because they show Rome's corruption at work.` },
{ cit: C3, field: 'analysisIt',
  find: `non Roma anno per anno a partire da Romolo, ma singoli fatti, la monografia. *Ut quaeque memoria digna videbantur*: sarà lui a scegliere.`,
  replace: `non Roma anno per anno a partire da Romolo, come la scrivevano gli annalisti, ma singoli fatti. È la monografia storica, e Sallustio è lo scrittore che l'ha portata a Roma: si conosce un solo tentativo precedente, il libro di Celio Antipatro sulla guerra contro Annibale, di una settantina d'anni prima, ma è con il Catilina che il genere diventa una vera alternativa agli annali. *Ut quaeque memoria digna videbantur*: sarà lui a scegliere, e ciò che sceglie è rivelatore. Una congiura di nobili in bancarotta, e dopo una guerra trascinata per le lunghe dalla corruzione: entrambi gli episodi sono scelti perché mostrano la corruzione di Roma all'opera.` },
{ cit: C3, field: 'analysis',
  find: `because nothing like it had been tried.`,
  replace: `because nothing like it had been tried. And the last clause, *de cuius hominis moribus pauca prius explananda sunt*, hands straight over to chapter 5: the conspiracy cannot be told without first describing Catiline.` },
{ cit: C3, field: 'analysisIt',
  find: `perché nulla di simile era mai stato tentato.`,
  replace: `perché nulla di simile era mai stato tentato. E l'ultima frase, *de cuius hominis moribus pauca prius explananda sunt*, passa direttamente la parola al capitolo 5: la congiura non si può raccontare senza prima descrivere Catilina.` },
{ cit: C3, field: 'analysis',
  find: `not that his hands are clean but that he has had the disease.`,
  replace: `not that his hands are clean but that he has had the disease and walked away from it.` },
{ cit: C3, field: 'analysisIt',
  find: `non perché ha le mani pulite ma perché la malattia l'ha avuta.`,
  replace: `non perché ha le mani pulite ma perché la malattia l'ha avuta e se ne è allontanato.` },

// ---- Cat. 5: gifts spent the wrong way; readable, unlike Tacitus ---------
{ cit: C5, field: 'analysis',
  find: `he is a formidable one whose strength serves the wrong ends.`,
  replace: `he is a formidable one whose strength serves the wrong ends. The portrait is built this way on purpose. Everything Catiline has, birth, a body that endures anything, force of mind, even a share of eloquence, could have been spent for the republic, and he spends it against her, pushed partly by the vices of his time and partly by troubles of his own, the debts and the bad conscience of section 7.` },
{ cit: C5, field: 'analysisIt',
  find: `è un uomo formidabile la cui forza serve i fini sbagliati.`,
  replace: `è un uomo formidabile la cui forza serve i fini sbagliati. Il ritratto è costruito così di proposito. Tutto ciò che Catilina possiede, la nascita, un corpo che sopporta qualsiasi cosa, la forza d'animo, perfino una parte di eloquenza, avrebbe potuto spenderlo per la repubblica, e lo spende contro di lei, spinto in parte dai vizi del suo tempo e in parte da guai suoi, i debiti e la cattiva coscienza del paragrafo 7.` },
{ cit: C5, field: 'analysis',
  find: `An appetite that size is an emptiness.`,
  replace: `An appetite that size is an emptiness.

**And yet the chapter can be read.** Count what has been done to the syntax: verbs dropped, connectives removed, every pair knocked off balance. A reader who has prepared the vocabulary still gets through it without much of a struggle, because each fragment is short, complete in sense, and set down in the order in which it is needed. That is the difference between Sallust and his greatest pupil. Tacitus, a century and a half later, takes the same three habits, *brevitas*, *inconcinnitas* and asyndeton, to their absolute limit, and a page of the *Annals* resists the reader in a way this chapter never does.` },
{ cit: C5, field: 'analysisIt',
  find: `Un appetito di quelle dimensioni è un vuoto.`,
  replace: `Un appetito di quelle dimensioni è un vuoto.

**Eppure il capitolo si legge.** Si conti quello che è stato fatto alla sintassi: verbi caduti, congiunzioni tolte, ogni coppia messa fuori equilibrio. Un lettore che abbia preparato il lessico ci passa attraverso lo stesso senza faticare troppo, perché ogni frammento è breve, compiuto nel senso, e messo nell'ordine in cui serve. È la differenza fra Sallustio e il suo più grande allievo. Tacito, un secolo e mezzo dopo, porta le stesse tre abitudini, *brevitas*, *inconcinnitas* e asindeto, al loro limite assoluto, e una pagina degli *Annales* resiste al lettore come questo capitolo non fa mai.` },

// ---- Cat. 7: when the good days ended; Cato; Lucretius -------------------
{ cit: C7, field: 'analysis',
  find: `Catiline is not the opposite of these young men. He is what they turn into.`,
  replace: `Catiline is not the opposite of these young men. He is what they turn into.

**When did this Rome end?** Sallust gives the answer in chapter 10: when the Punic wars were won. Those wars made Rome a sea power, which it had never been, ended with Carthage destroyed in 146 BC, and left the Mediterranean with a single master. Two things followed. The fear of an enemy, which had kept the city in training, was gone, and wealth came in along the new trade routes. Between them they rewrote the values of this chapter: where these Romans compete for glory, their descendants compete for money and power. The Elder Cato had drawn the same line more than a century before Sallust, in the preface to the *De Agri Cultura* (De Agri Cultura, Praefatio, in this app): the farmer makes the bravest man and the best soldier, while the trader's profit is a risky and ruinous thing. Chapter 9, the next excerpt, is the last page of the good days and belongs with this one.

**Lucretius tells the same story the other way up.** In De Rerum Natura V, vv. 925-944 the first human beings are harder than we are, and in De Rerum Natura V, vv. 1011-1027 huts, fire and family make the race *mollescere*, grow soft. The pattern is the one Sallust uses: strength first, comfort afterwards, and something lost on the way. But for Lucretius the trade is worth making, because the softened humans are the first to feel pity and to make pacts with their neighbours. For Sallust the softening is loss, in every respect.` },
{ cit: C7, field: 'analysisIt',
  find: `Catilina non è il contrario di questi giovani. È quello che diventano.`,
  replace: `Catilina non è il contrario di questi giovani. È quello che diventano.

**Quando è finita questa Roma?** Sallustio risponde nel capitolo 10: quando furono vinte le guerre puniche. Quelle guerre fecero di Roma una potenza navale, cosa che non era mai stata, si chiusero con la distruzione di Cartagine nel 146 a.C., e lasciarono al Mediterraneo un solo padrone. Ne seguirono due cose. La paura di un nemico, che aveva tenuto la città in allenamento, sparì, e lungo le nuove rotte commerciali arrivò la ricchezza. Insieme riscrissero i valori di questo capitolo: dove questi Romani gareggiano per la gloria, i loro discendenti gareggiano per il denaro e per il potere. Catone il Vecchio aveva tracciato la stessa linea più di un secolo prima di Sallustio, nella prefazione del *De Agri Cultura* (De Agri Cultura, Praefatio, in quest'app): dal contadino nasce l'uomo più forte e il soldato migliore, mentre il guadagno del mercante è cosa rischiosa e rovinosa. Il capitolo 9, l'estratto successivo, è l'ultima pagina dei tempi buoni e va letto insieme a questo.

**Lucrezio racconta la stessa storia capovolta.** In De Rerum Natura V, vv. 925-944 i primi esseri umani sono più duri di noi, e in De Rerum Natura V, vv. 1011-1027 capanne, fuoco e famiglia fanno *mollescere* la specie, la rendono molle. Lo schema è quello di Sallustio: prima la forza, poi la comodità, e qualcosa che si perde per strada. Ma per Lucrezio lo scambio conviene, perché gli uomini ammorbiditi sono i primi a provare pietà e a stringere patti con i vicini. Per Sallustio l'ammorbidimento è una perdita, sotto ogni aspetto.` },

// ---- Cat. 9: the last page; read with 7; Lucretius again -----------------
{ cit: C9, field: 'analysis',
  find: `And the only vice the chapter names, sitting in the "least" position, is *avaritia*. It is the seed.`,
  replace: `And the only vice the chapter names, sitting in the "least" position, is *avaritia*. It is the seed. That is what this page is for: it stands immediately before everything goes wrong, and it lists each good quality so that the next four chapters can turn every one of them into its opposite.

**Read it with chapter 7.** The two excerpts are one argument in two parts. Chapter 7 shows where the old virtue came from, the competition for glory that liberty released; this chapter shows it at full height. The cause of the turn is the same for both, the end of the fear of Carthage and the wealth that followed the Punic wars, which the note on chapter 7 sets out. And the comparison with Lucretius made there holds here too. In De Rerum Natura V, vv. 1011-1027 the human race grows soft once it has fire and houses, and gains pity and the first pacts in exchange; Lucretius counts the bargain a good one. Sallust sees the same softening in his own city and counts it as pure loss.` },
{ cit: C9, field: 'analysisIt',
  find: `E l'unico vizio che il capitolo nomina, messo nella posizione del "minimo", è l'*avaritia*. È il seme.`,
  replace: `E l'unico vizio che il capitolo nomina, messo nella posizione del "minimo", è l'*avaritia*. È il seme. È a questo che serve la pagina: sta immediatamente prima che tutto vada male, ed elenca ogni qualità buona perché i quattro capitoli successivi possano rovesciarle una per una nel loro contrario.

**Va letto con il capitolo 7.** I due estratti sono un solo ragionamento in due parti. Il capitolo 7 mostra da dove veniva l'antica virtù, la gara per la gloria liberata dalla libertà; questo capitolo la mostra al suo culmine. La causa della svolta è la stessa per entrambi, la fine della paura di Cartagine e la ricchezza seguita alle guerre puniche, che la nota al capitolo 7 espone. E il confronto con Lucrezio fatto lì vale anche qui. In De Rerum Natura V, vv. 1011-1027 la specie umana si ammorbidisce una volta che ha il fuoco e le case, e in cambio guadagna la pietà e i primi patti; Lucrezio giudica buono lo scambio. Sallustio vede lo stesso ammorbidimento nella propria città e lo conta come pura perdita.` }
];

// The other end of the cross-reference. Lucretius's note follows the house
// style of that author, a bold lead and then the sentence.
const lucretius = [
{ cit: '(De Rerum Natura V, vv. 1011-1027)', field: 'analysis',
  find: `which is the point where an Epicurean is asked to get off.`,
  replace: `which is the point where an Epicurean is asked to get off. **Sallust read the same two curves the other way.** In his sketch of early Rome (De Coniuratione Catilinae 7 and De Coniuratione Catilinae 9, both in this app) the hard first generations are the good ones, and the softening that comes with wealth and safety is loss and nothing else.` },
{ cit: '(De Rerum Natura V, vv. 1011-1027)', field: 'analysisIt',
  find: `ed è il punto in cui a un epicureo si chiede di scendere.`,
  replace: `ed è il punto in cui a un epicureo si chiede di scendere. **Sallustio lesse le stesse due curve al contrario.** Nel suo abbozzo della Roma delle origini (De Coniuratione Catilinae 7 e De Coniuratione Catilinae 9, entrambi in quest'app) le prime generazioni, dure, sono quelle buone, e l'ammorbidimento che arriva con la ricchezza e la sicurezza è una perdita e nient'altro.` }
];

fs.writeFileSync(path.join(__dirname, 'patch1160c.json'), JSON.stringify(sallust, null, 2));
fs.writeFileSync(path.join(__dirname, 'patch1160c_lucr.json'), JSON.stringify(lucretius, null, 2));

// Keep the batch files in step. Each `find` must occur exactly once across the
// two of them.
const files = ['frags1160a.js', 'frags1160b.js'].map(f => path.join(__dirname, f));
const text = files.map(f => fs.readFileSync(f, 'utf8'));
for (const p of sallust) {
  const hits = text.map(t => t.split(p.find).length - 1);
  const total = hits[0] + hits[1];
  if (total === 0 && text.some(t => t.includes(p.replace))) continue;     // already applied
  if (total !== 1) throw new Error('batch files: `find` occurs ' + total + ' times - ' + p.find.slice(0, 60));
  const i = hits[0] ? 0 : 1;
  text[i] = text[i].replace(p.find, () => p.replace);
}
files.forEach((f, i) => fs.writeFileSync(f, text[i]));
console.log(sallust.length + ' Sallust patches and ' + lucretius.length + ' Lucretius patches written; batch files in step');
