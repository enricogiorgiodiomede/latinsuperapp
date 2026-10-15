// v1.16.1 follow-up (15/10/2026): the user's notes on Catilina 10-14, folded
// into the five analyses, plus the other end of every cross-reference they make
// and of the new De Oratore II.51-54 (batch/frags1161c.js). Template literals;
// run it to write the patch files, then apply them with tools/patch_fields.js.
// The Sallust batch files are kept in step.
//
//   node batch/patch1161c.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1161c_sal.json
//   node tools/patch_fields.js gaius-julius-caesar batch/patch1161c_cae.json
//   node tools/patch_fields.js titus-lucretius-carus batch/patch1161c_luc.json
const fs = require('fs');
const path = require('path');

const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });

const sal = [
// ---- 10: extinction ---------------------------------------------------------
after(C(10), 'analysis', `then a Catiline is not its cause but its worst symptom.`,
`**Sallust described extinction before it had a name.** Modern psychology has a word for the mechanism of this chapter: extinction. A learned behaviour keeps going as long as whatever sustains it is still there; take that away and the behaviour weakens, slowly, and in the end disappears. For Sallust what sustained Roman virtue was *metus hostilis*, the fear of an enemy. Discipline, harmony and indifference to money were learned under the threat of Carthage, and when Carthage was gone they did not vanish overnight. They faded, which is exactly what section 6 describes: *haec primo paulatim crescere, interdum vindicari*, at first the vices grew little by little and were sometimes still punished, and only afterwards came the plague. Sallust set out a theory of how a society loses its good habits two thousand years before anyone ran the experiment.`),
after(C(10), 'analysisIt', `un Catilina non ne è la causa ma il sintomo peggiore.`,
`**Sallustio descrisse l'estinzione prima che avesse un nome.** La psicologia moderna ha una parola per il meccanismo di questo capitolo: estinzione. Un comportamento appreso dura finché c'è ciò che lo sostiene; se lo si toglie, il comportamento si indebolisce, lentamente, e alla fine scompare. Per Sallustio ciò che sosteneva la virtù romana era il *metus hostilis*, la paura del nemico. Disciplina, concordia e indifferenza al denaro erano state apprese sotto la minaccia di Cartagine, e quando Cartagine sparì non svanirono da un giorno all'altro. Sbiadirono, ed è esattamente ciò che descrive il paragrafo 6: *haec primo paulatim crescere, interdum vindicari*, dapprima i vizi crebbero a poco a poco e talvolta venivano ancora puniti, e solo dopo venne la peste. Sallustio formulò una teoria di come una società perde le sue buone abitudini duemila anni prima che qualcuno ne facesse l'esperimento.`),

// ---- 11: Caesar's Pharsalus camp; looting, not admiring; Lucretius --------
after(C(11), 'analysis', `these men never had a chance.`,
`**Caesar saw the same thing in Pompey's camp.** At Pharsalus in 48 BC, storming the enemy's camp, Caesar found garden arbours, tents floored with fresh turf and hung with ivy, and a great weight of silver laid out for dinner, and for once in his whole work the general turns moralist (De Bello Civili III.96, in this app). He never says the word, and he does not need to: an army that furnishes its tents like a dining room has lost before the battle starts. It is Sallust's point seen from the other side of a battlefield. Luxury in a camp was the one luxury the Romans could not forgive, because soldiers were the citizens trained to need least, and *contra morem maiorum* says it in three words: the ancestors did not tolerate it.

**What is wrong is not the admiring.** Read section 6 again in order. Every item on the list is something the soldiers learned because they had already gone soft (*molliverant*, section 5). To admire a statue or a painting is in itself an ordinary thing. What is not ordinary is taking it, and taking it *privatim et publice*, from private owners and from whole communities, and then, once the war was won, from Roman citizens: *nihil reliqui victis fecere*, and the defeated of a civil war are Romans. That is the real scandal of the chapter. The army, whose whole purpose is to protect the people, has turned on the people.

**Lucretius says the same about greed.** In De Rerum Natura III, vv. 59-73, also in this app, *avarities et honorum caeca cupido*, greed and the blind desire for office, drive men across the boundaries of right and into the blood of fellow citizens, piling fortune on fortune. It is Sallust's own pair of vices, and the same conclusion: a desire that has no ceiling, *semper infinita, insatiabilis* (section 3), can never be satisfied, only followed to ruin. The two writers disagree about almost everything else, and here they say the same thing.`),
after(C(11), 'analysisIt', `quegli uomini non avevano scampo.`,
`**Cesare vide la stessa cosa nell'accampamento di Pompeo.** A Farsalo, nel 48 a.C., prendendo d'assalto il campo nemico, Cesare trovò pergolati, tende con il pavimento di zolle fresche e coperte d'edera, e una gran quantità d'argento esposta per la cena, e per una volta in tutta la sua opera il generale si fa moralista (De Bello Civili III.96, in quest'app). Non dice mai la parola, e non ne ha bisogno: un esercito che arreda le tende come una sala da pranzo ha perso prima che la battaglia cominci. È il punto di Sallustio visto dall'altra parte di un campo di battaglia. Il lusso in un accampamento era l'unico lusso che i Romani non potevano perdonare, perché i soldati erano i cittadini addestrati ad avere bisogno del minimo, e *contra morem maiorum* lo dice in tre parole: gli antenati non lo tolleravano.

**Il male non è l'ammirare.** Si rilegga il paragrafo 6 nell'ordine. Ogni voce dell'elenco è qualcosa che i soldati impararono perché si erano già rammolliti (*molliverant*, paragrafo 5). Ammirare una statua o un quadro è di per sé una cosa normale. Non è normale prenderli, e prenderli *privatim et publice*, ai privati e a intere comunità, e poi, vinta la guerra, ai cittadini romani: *nihil reliqui victis fecere*, e i vinti di una guerra civile sono Romani. È questo il vero scandalo del capitolo. L'esercito, il cui unico scopo è proteggere il popolo, si è rivoltato contro il popolo.

**Lucrezio dice lo stesso dell'avidità.** In De Rerum Natura III, vv. 59-73, anch'esso in quest'app, *avarities et honorum caeca cupido*, l'avidità e la cieca brama di cariche, spingono gli uomini oltre i confini del diritto e dentro il sangue dei concittadini, accumulando patrimonio su patrimonio. È la stessa coppia di vizi di Sallustio, e la stessa conclusione: un desiderio senza tetto, *semper infinita, insatiabilis* (paragrafo 3), non può mai essere soddisfatto, solo seguito fino alla rovina. I due scrittori sono in disaccordo su quasi tutto il resto, e qui dicono la stessa cosa.`),

// ---- 12: a personal judgement --------------------------------------------
after(C(12), 'analysis', `This is the reversal that chapter was written to prepare.`,
`**This is not neutral, and it is not meant to be.** In the second half of the chapter Sallust stops reporting and starts judging. *Ignavissumi homines*, *per summum scelus*, and the last clause, *proinde quasi iniuriam facere id demum esset imperio uti*, are verdicts, and they are his own. He had spent more than a decade inside Roman politics, as quaestor, tribune, senator, officer and governor, and he knew from the inside how the governing class worked; that is why, as the author page in this app says of his portrait of Catiline, he can take a mechanism apart with surgical precision. But precision is not detachment. He wants the reader to be indignant, and the choice of evidence shows it: the generation after Sulla is caught taking from the allies what the conquering ancestors had chosen to leave them, so the descendants are worse not only than their fathers but than the conquerors themselves.`),
after(C(12), 'analysisIt', `È il rovesciamento che quel capitolo era stato scritto per preparare.`,
`**Non è neutrale, e non vuole esserlo.** Nella seconda metà del capitolo Sallustio smette di riferire e comincia a giudicare. *Ignavissumi homines*, *per summum scelus*, e l'ultima proposizione, *proinde quasi iniuriam facere id demum esset imperio uti*, sono sentenze, e sono sue. Aveva passato più di un decennio dentro la politica romana, da questore, tribuno, senatore, ufficiale e governatore, e sapeva dall'interno come funzionava la classe dirigente; è per questo che, come dice del suo ritratto di Catilina la pagina dell'autore in quest'app, sa smontare un meccanismo con precisione chirurgica. Ma precisione non è distacco. Vuole che il lettore si indigni, e lo mostra la scelta delle prove: la generazione dopo Silla è colta a togliere agli alleati ciò che gli antenati conquistatori avevano scelto di lasciare loro, così che i discendenti sono peggiori non solo dei padri ma dei conquistatori stessi.`),

// ---- 13: first person; against nature; forward to chapter 15 -------------
after(C(13), 'analysis', `he is the symptom, and this is the disease.`,
`**Twice in the first person.** *Quid ea memorem* and *mihi videntur*: in a chapter of description Sallust speaks in his own voice twice, and both times to pass judgement. Nothing here is neutral. And look at what the judgement is about. Luxury makes these Romans go against nature twice over: against their own nature, eating before they are hungry and sleeping before they are tired, and against nature itself, levelling mountains and building over the sea. Keep the idea in mind. In chapter 15, when the story returns to Catiline's youth, Sallust lists crimes he committed *contra ius fasque*, against human and divine law. The vocabulary is a step stronger, but it is the same crossing of a limit, and it confirms what the whole digression has been showing: Catiline is not an isolated case but the extreme case of a society that had already crossed its own boundaries.`),
after(C(13), 'analysisIt', `lui è il sintomo, e questa è la malattia.`,
`**Due volte in prima persona.** *Quid ea memorem* e *mihi videntur*: in un capitolo di descrizione Sallustio parla due volte con la propria voce, ed entrambe le volte per giudicare. Qui non c'è nulla di neutrale. E si guardi su che cosa verte il giudizio. Il lusso fa andare questi Romani contro natura due volte: contro la loro natura, mangiando prima di avere fame e dormendo prima di essere stanchi, e contro la natura stessa, spianando monti e costruendo sul mare. Si tenga a mente l'idea. Nel capitolo 15, quando il racconto torna alla giovinezza di Catilina, Sallustio elenca delitti da lui commessi *contra ius fasque*, contro il diritto umano e divino. Il lessico è un gradino più forte, ma è lo stesso superamento di un limite, e conferma ciò che tutta la digressione ha mostrato: Catilina non è un caso isolato ma il caso estremo di una società che aveva già oltrepassato i propri confini.`),

// ---- 14: the worst, and the easiest to deceive ---------------------------
after(C(14), 'analysis', `round him the smaller ones gather by themselves.`,
`**Two kinds of follower.** Put shortly, the chapter makes two claims. Catiline was not alone: he was surrounded by the worst people a corrupt city could supply, the most corrupted of all. And the rest were the easiest to deceive, the young, whose minds were *molles etiam et fluxi*. One group came to him already ruined; the other he ruined himself. They are the two ways any conspiracy is recruited, and Sallust's chapter keeps them carefully apart, sections 2 and 3 for the first and sections 5 and 6 for the second.`),
after(C(14), 'analysisIt', `attorno a lui i più piccoli si raccolgono da soli.`,
`**Due tipi di seguace.** In breve, il capitolo afferma due cose. Catilina non era solo: era circondato dalla gente peggiore che una città corrotta potesse fornire, i più corrotti di tutti. E gli altri erano i più facili da ingannare, i giovani, il cui animo era *molles etiam et fluxi*. Un gruppo arrivò da lui già rovinato; l'altro lo rovinò lui. Sono i due modi in cui si recluta qualunque congiura, e il capitolo di Sallustio li tiene accuratamente distinti, i paragrafi 2 e 3 per il primo e i paragrafi 5 e 6 per il secondo.`),

// ---- links to the new De Oratore II.51-54 --------------------------------
{ cit: C('3.3-4.5'), field: 'analysis',
  find: `Coelius Antipater's book on the war with Hannibal some seventy years before,`,
  replace: `Coelius Antipater's book on the war with Hannibal some seventy years before (Cicero gives him exactly that credit in De Oratore II.51-54, in this app),` },
{ cit: C('3.3-4.5'), field: 'analysisIt',
  find: `il libro di Celio Antipatro sulla guerra contro Annibale, di una settantina d'anni prima,`,
  replace: `il libro di Celio Antipatro sulla guerra contro Annibale, di una settantina d'anni prima (Cicerone gli dà proprio questo merito nel De Oratore II.51-54, in quest'app),` },
{ cit: C(1), field: 'analysis',
  find: `and his "immortal speed" (Institutio Oratoria X.1.102).`,
  replace: `and his "immortal speed" (Institutio Oratoria X.1.102). The brevity itself came from Cato, whose bare style Cicero has Antonius dismiss as the one merit known to men who knew no better (De Oratore II.51-54, in this app). Sallust took the thing Cicero despised and made an art of it.` },
{ cit: C(1), field: 'analysisIt',
  find: `e la sua "velocità immortale" (Institutio Oratoria X.1.102).`,
  replace: `e la sua "velocità immortale" (Institutio Oratoria X.1.102). La brevità in sé veniva da Catone, il cui stile spoglio Cicerone fa liquidare ad Antonio come l'unico pregio noto a chi non ne conosceva altri (De Oratore II.51-54, in quest'app). Sallustio prese ciò che Cicerone disprezzava e ne fece un'arte.` }
];

const cae = [
{ cit: '(De Bello Civili III.96)', field: 'analysis',
  find: `a camp furnished like a dinner party on the morning of a battle is an argument that needs no adverb.`,
  replace: `a camp furnished like a dinner party on the morning of a battle is an argument that needs no adverb. Sallust makes the same diagnosis of an earlier army, Sulla's, which went soft in Asia and came home to loot its own country (De Coniuratione Catilinae 11, in this app).` },
{ cit: '(De Bello Civili III.96)', field: 'analysisIt',
  find: `è un argomento che non ha bisogno di avverbi.`,
  replace: `è un argomento che non ha bisogno di avverbi. Sallustio fa la stessa diagnosi di un esercito precedente, quello di Silla, che si rammollì in Asia e tornò a saccheggiare la propria patria (De Coniuratione Catilinae 11, in quest'app).` }
];

const luc = [
{ cit: '(De Rerum Natura III, vv. 59-73)', field: 'analysis',
  find: `were the recent past, and the near future.`,
  replace: `were the recent past, and the near future. Sallust tells the same story in prose, with the same two vices and with Sulla's army at the centre of it (De Coniuratione Catilinae 10 and De Coniuratione Catilinae 11, in this app).` },
{ cit: '(De Rerum Natura III, vv. 59-73)', field: 'analysisIt',
  find: `erano il passato recente, e il futuro prossimo.`,
  replace: `erano il passato recente, e il futuro prossimo. Sallustio racconta la stessa storia in prosa, con gli stessi due vizi e con l'esercito di Silla al centro (De Coniuratione Catilinae 10 e De Coniuratione Catilinae 11, in quest'app).` }
];

fs.writeFileSync(path.join(__dirname, 'patch1161c_sal.json'), JSON.stringify(sal, null, 2));
fs.writeFileSync(path.join(__dirname, 'patch1161c_cae.json'), JSON.stringify(cae, null, 2));
fs.writeFileSync(path.join(__dirname, 'patch1161c_luc.json'), JSON.stringify(luc, null, 2));

const files = ['frags1160a.js', 'frags1161.js'].map(f => path.join(__dirname, f));
const text = files.map(f => fs.readFileSync(f, 'utf8'));
for (const p of sal) {
  const hits = text.map(t => t.split(p.find).length - 1);
  if (hits[0] + hits[1] !== 1) throw new Error('batch files: `find` occurs ' + (hits[0] + hits[1]) + ' times - ' + p.find.slice(0, 60));
  const i = hits[0] ? 0 : 1;
  text[i] = text[i].replace(p.find, () => p.replace);
}
files.forEach((f, i) => fs.writeFileSync(f, text[i]));
console.log(sal.length + ' Sallust, ' + cae.length + ' Caesar, ' + luc.length + ' Lucretius patches written; batch files in step');
