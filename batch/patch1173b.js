// v1.16.13 follow-up: the user's notes on Iugurtha 101-114, folded into the four
// analyses - the last notes of the Sallust expansion. 101 and 102 now cite each
// other; 113 <-> Cat. 11.
//   node batch/patch1173b.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1173b_sal.json
const fs = require('fs');
const path = require('path');
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });

const sal = [
// ---- 101 ----
after(I(101), 'analysis', `The next chapters turn from the battlefield back to the market.`,
`**The two battles near Cirta.** The war was decided in two battles in late 106 BC. In the first, Jugurtha and Bocchus surprised the army on the march at dusk - Sallust does not name the place, and modern guesses differ - and Marius was nearly overwhelmed until a dawn counter-attack saved him (chapters 97-99). In the second, here, the danger came from a different source: the infantry was on the point of running because it half-believed Marius was dead, and Sulla's return turned the day. After two defeats Bocchus began to look for a way out (Bellum Iugurthinum 102), and the alliance of the two kings started to come apart. Militarily, then, the war was won here, by courage and discipline against bribery and trickery; the bargain that delivered Jugurtha came later, and it was possible only because these battles had been won.`),
after(I(101), 'analysisIt', `I capitoli successivi tornano dal campo di battaglia al mercato.`,
`**Le due battaglie presso Cirta.** La guerra fu decisa in due battaglie alla fine del 106 a.C. Nella prima, Giugurta e Bocco sorpresero l'esercito in marcia al tramonto - Sallustio non nomina il luogo, e le ipotesi moderne divergono - e Mario fu quasi sopraffatto finché un contrattacco all'alba non lo salvò (capitoli 97-99). Nella seconda, questa, il pericolo venne da un'altra parte: la fanteria stava per fuggire perché credeva a metà che Mario fosse morto, e il ritorno di Silla capovolse la giornata. Dopo due sconfitte Bocco cominciò a cercare una via d'uscita (Bellum Iugurthinum 102), e l'alleanza dei due re cominciò a sfaldarsi. Sul piano militare, dunque, la guerra fu vinta qui, dal coraggio e dalla disciplina contro la corruzione e l'inganno; l'accordo che consegnò Giugurta venne dopo, e fu possibile solo perché queste battaglie erano state vinte.`),

// ---- 102 ----
after(I(102), 'analysis', `In the end the war is not won by kindness, but by an auction.`,
`**Friends, not slaves - what Sulla meant.** Sulla's description of Roman policy is not empty. Rome built its power through *amicitia*: kings and cities became *socii et amici populi Romani*, allies and friends of the Roman people, kept their own rulers and laws, sent troops when asked, and were protected in return - Masinissa's Numidia was exactly such a friend kingdom (Bellum Iugurthinum 5). Enemies who surrendered were often spared and turned into allies, as the Latins and the Italians had been. Cicero, in the second book of the De Officiis, called Rome's rule in its good days a patronage of the world rather than an empire, held together by benefits, not injuries - and dated its decline to Sulla's victory. But the friendship was unequal, the friendship of a patron with clients, and within a generation of Jugurtha's birth the same Rome had destroyed Carthage, Corinth and Numantia. Sulla speaks of Rome at its best; the book has shown how far the Rome of this war had fallen from it, starting with the friend it let Jugurtha murder.

**Decided in battle, ended by a sale.** The order matters. Bocchus is ready to forget the past and send envoys to the senate; Jugurtha at once sends gifts to keep him; and in the end Rome outbids him. The war formally ended with that sale, but it had been decided before, by Roman arms, in the two battles near Cirta (Bellum Iugurthinum 101). The auction was possible because the war had already been won.`),
after(I(102), 'analysisIt', `Alla fine la guerra non la vince la benevolenza, ma un'asta.`,
`**Amici, non schiavi - che cosa intendeva Silla.** La descrizione che Silla fa della politica romana non è vuota. Roma costruì la sua potenza attraverso l'*amicitia*: re e città diventavano *socii et amici populi Romani*, alleati e amici del popolo romano, conservavano i propri sovrani e le proprie leggi, mandavano truppe quando richiesto, e in cambio erano protetti - la Numidia di Massinissa era proprio un regno amico di questo tipo (Bellum Iugurthinum 5). I nemici che si arrendevano venivano spesso risparmiati e trasformati in alleati, come era accaduto ai Latini e agli Italici. Cicerone, nel secondo libro del De Officiis, chiamava il dominio di Roma nei suoi tempi migliori un patrocinio del mondo più che un impero, tenuto insieme dai benefici, non dalle offese - e datava la sua decadenza alla vittoria di Silla. Ma l'amicizia era diseguale, quella di un patrono con i suoi clienti, e nel giro di una generazione dalla nascita di Giugurta la stessa Roma aveva distrutto Cartagine, Corinto e Numanzia. Silla parla della Roma migliore; il libro ha mostrato quanto la Roma di questa guerra se ne fosse allontanata, a cominciare dall'amico che lasciò assassinare da Giugurta.

**Decisa in battaglia, chiusa da una vendita.** L'ordine conta. Bocco è pronto a dimenticare il passato e a mandare ambasciatori al senato; Giugurta manda subito doni per trattenerlo; e alla fine Roma offre di più. La guerra si chiuse formalmente con quella vendita, ma era stata decisa prima, dalle armi romane, nelle due battaglie presso Cirta (Bellum Iugurthinum 101). L'asta fu possibile perché la guerra era già vinta.`),

// ---- 113 ----
after(I(113), 'analysis', `The bought peace does not last; the bought war ends only when someone pays more.`,
`**The seller sold.** The irony could not be greater. Jugurtha learned at Numantia that everything at Rome was for sale (Bellum Iugurthinum 8), and spent half the book buying senators, tribunes and generals; in the end he loses because his own ally has been bought, and he is handed over like merchandise at the agreed place. And the lesson passes on. The man who received him in chains learned it too: Sulla bought the loyalty of his soldiers with indulgence and money, as Sallust says of his army in Asia (De Coniuratione Catilinae 11), and with that army took the state by force. Jugurtha bought Rome piece by piece; Sulla took it whole.`),
after(I(113), 'analysisIt', `La pace comprata non dura; la guerra comprata finisce solo quando qualcuno paga di più.`,
`**Il venditore venduto.** L'ironia non potrebbe essere più grande. Giugurta imparò a Numanzia che a Roma tutto era in vendita (Bellum Iugurthinum 8), e passò metà del libro a comprare senatori, tribuni e generali; alla fine perde perché il suo stesso alleato è stato comprato, e viene consegnato come una merce nel luogo convenuto. E la lezione passa ad altri. L'uomo che lo ricevette in catene la imparò a sua volta: Silla comprò la fedeltà dei suoi soldati con l'indulgenza e con il denaro, come Sallustio dice del suo esercito in Asia (De Coniuratione Catilinae 11), e con quell'esercito prese lo stato con la forza. Giugurta comprò Roma pezzo per pezzo; Silla la prese tutta intera.`),

// ---- 114 ----
after(I(114), 'analysis', `It is the bitterest possible conclusion to a story about how a city for sale finally found its buyer.`,
`**A dark ending.** The silence at the end is the darkest thing in the book. Sallust has taught the reader that everything in Rome, the city included, was for sale; he has shown one man buying it bit by bit and then losing everything by his own trick; and he ends with the hope of the state resting on one man, a general whose army is loyal to him. He lets the fact sink in and says no more. Every reader knew what came next. In 88 BC Sulla, the quaestor who had taken Jugurtha, marched his army on Rome against Marius; in 87 Marius and Cinna took the city back with a massacre, and Marius died in his seventh consulship early in 86; in 83 Sulla returned, won the civil war against the Marians, and made himself dictator - one man master of the state in every sense. Caesar came after him, but the road had been opened long before, and the Iugurtha shows where it began.`),
after(I(114), 'analysisIt', `È la conclusione più amara possibile per una storia su come una città in vendita trovò infine il suo compratore.`,
`**Una fine cupa.** Il silenzio finale è la cosa più cupa del libro. Sallustio ha insegnato al lettore che tutto a Roma, compresa la città stessa, era in vendita; gli ha mostrato un uomo che la comprava pezzo per pezzo e poi perdeva tutto per il suo stesso trucco; e finisce con la speranza dello stato che poggia su un solo uomo, un generale il cui esercito è fedele a lui. Lascia che il fatto si depositi e non aggiunge altro. Ogni lettore sapeva che cosa veniva dopo. Nell'88 a.C. Silla, il questore che aveva catturato Giugurta, marciò con il suo esercito su Roma contro Mario; nell'87 Mario e Cinna ripresero la città con un massacro, e Mario morì durante il settimo consolato all'inizio dell'86; nell'83 Silla tornò, vinse la guerra civile contro i mariani e si fece dittatore - un solo uomo padrone dello stato in ogni senso. Dopo di lui venne Cesare, ma la strada era stata aperta molto prima, e il Bellum Iugurthinum mostra dove cominciò.`),

// ---- reciprocal: Cat. 11 <- 113 ----
join(C(11), 'analysis', `making as many soldiers as possible his debtors (Bellum Iugurthinum 95-96).`,
`It is Sulla who receives Jugurtha in chains at the end of that war - the man who had bought Rome piece by piece, handed to the man who would take it whole (Bellum Iugurthinum 113).`),
join(C(11), 'analysisIt', `intento a rendersi debitori quanti più soldati possibile (Bellum Iugurthinum 95-96).`,
`Ed è Silla a ricevere Giugurta in catene alla fine di quella guerra - l'uomo che aveva comprato Roma pezzo per pezzo, consegnato all'uomo che l'avrebbe presa tutta intera (Bellum Iugurthinum 113).`)
];

fs.writeFileSync(path.join(__dirname, 'patch1173b_sal.json'), JSON.stringify(sal, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags11(6|7)\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust patches; ' + n + ' batch-file edits');
