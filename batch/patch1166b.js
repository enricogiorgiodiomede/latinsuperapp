// v1.16.6 follow-up: the user's notes on Iugurtha 1-8, folded into the five
// analyses; the user's correction to Iug. 8 (the three phrases grow LONGER,
// 2-3-4 words); Iug. 5 wired both ways with Cat. 15 (contra ius fasque).
//   node batch/patch1166b.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1166b_sal.json
const fs = require('fs');
const path = require('path');
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });
const swap = (cit, field, find, replace) => ({ cit, field, find, replace });

const sal = [
// ---- correction in 8 ----
swap(I(8), 'analysis', `The phrases get shorter and the last turns on an antithesis,`, `The phrases grow longer - two words, then three, then four - and the last turns on an antithesis,`),
swap(I(8), 'analysisIt', `Le espressioni si accorciano e l'ultima gira su un'antitesi,`, `Le espressioni si allungano - due parole, poi tre, poi quattro - e l'ultima gira su un'antitesi,`),

// ---- 1 ----
after(I(1), 'analysis', `It is not fortune. It is choice.`,
`**Body over mind, and what it costs.** The likeness with the first preface is plain - virtue against pleasure, mind against body (De Coniuratione Catilinae 1) - but here Sallust dwells on the consequences of choosing the body. You lose control of yourself; your time, your talent and your strength drain away into sloth while you chase pleasure; you leave little or no memory behind you; and when you see that everything is ruined, you blame circumstances and bad luck. It is a very modern mechanism, shifting the blame onto something or someone else so as not to blame yourself, and Sallust shows that it is a very ancient one too. He does not treat it as a forgivable weakness. Men keep pursuing useless and dangerous things, and then call their own lack of self-control bad luck.`),
after(I(1), 'analysisIt', `Non è la fortuna. È la scelta.`,
`**Il corpo sopra l'animo, e quanto costa.** La somiglianza con il primo proemio è evidente - la virtù contro il piacere, l'animo contro il corpo (De Coniuratione Catilinae 1) - ma qui Sallustio si sofferma sulle conseguenze della scelta del corpo. Si perde il controllo di sé; il tempo, l'ingegno e le forze colano via nell'indolenza mentre si inseguono i piaceri; si lascia poco o nessun ricordo di sé; e quando ci si accorge che tutto è rovinato, si incolpano le circostanze e la sfortuna. È un meccanismo molto moderno, scaricare la colpa su qualcosa o su qualcuno per non doverla dare a se stessi, e Sallustio mostra che è anche antichissimo. Non lo tratta come una debolezza perdonabile. Gli uomini continuano a inseguire cose inutili e pericolose, e poi chiamano sfortuna la propria mancanza di autocontrollo.`),

// ---- 4 ----
after(I(4), 'analysis', `He is angry, and he wants his reader to be.`,
`**Irony, and the first person.** Section 3 is irony at its sharpest. The men who will accuse Sallust of idleness are the idlest of all, and their idea of industry is greeting the plebs and buying favour with dinners: they have no right to lecture anyone. Section 4 then makes the argument plain. There is no reason to go back into politics when the men now entering the senate are corrupt and the honest ones cannot win office on merit - the preface has just said that honour no longer goes to virtue (chapter 3). History is the one way left to serve the state by merit. And section 9 is unusually blunt. Sallust speaks in the first person elsewhere - about his own career in the Catilina (De Coniuratione Catilinae 3.3-4.5), and once to say that Rome's empire had never seemed to him so pitiable as in 63 BC (chapter 36) - but nowhere else does he say outright that the morals of his time disgust him. Usually he arranges the facts so that the reader feels the anger; here he names it, and it is exactly the reaction he wants from us.`),
after(I(4), 'analysisIt', `È arrabbiato, e vuole che lo sia anche il lettore.`,
`**L'ironia, e la prima persona.** Il paragrafo 3 è ironia allo stato puro. Gli uomini che accuseranno Sallustio di ozio sono i più oziosi di tutti, e la loro idea di operosità è salutare la plebe e comprare favore con i banchetti: non hanno alcun diritto di fare la morale a nessuno. Il paragrafo 4 rende poi esplicito l'argomento. Non c'è ragione di tornare alla politica quando gli uomini che ora entrano in senato sono corrotti e quelli onesti non riescono a ottenere cariche per merito - il proemio ha appena detto che l'onore non va più alla virtù (capitolo 3). La storia è l'unico modo rimasto per servire lo stato con merito. E il paragrafo 9 è insolitamente diretto. Sallustio parla in prima persona anche altrove - della propria carriera nel Catilina (De Coniuratione Catilinae 3.3-4.5), e una volta per dire che l'impero di Roma non gli era mai sembrato così miserevole come nel 63 a.C. (capitolo 36) - ma in nessun altro luogo dice apertamente che i costumi del suo tempo lo disgustano. Di solito dispone i fatti in modo che sia il lettore a provare la rabbia; qui la nomina, ed è proprio la reazione che vuole da noi.`),

// ---- 5 ----
after(I(5), 'analysis', `and the first sentence already tells us that it ended inside Italy.`,
`**Divina et humana.** Notice the phrase *divina et humana cuncta*. In the Catilina it was one man who broke every law human and divine, *contra ius fasque*, and that made him the emblem of the corruption (De Coniuratione Catilinae 15). Here it is a whole contest, a war that threw everything human and divine into confusion and reached an incredible madness, and the cause is the corruption and arrogance of the nobility. The scale has grown from one man to a state, and that is why this war is as emblematic as the conspiracy, if not more so.`),
after(I(5), 'analysisIt', `e la prima frase ci dice già che finì dentro l'Italia.`,
`**Divina et humana.** Si noti l'espressione *divina et humana cuncta*. Nel Catilina era un solo uomo a violare ogni legge umana e divina, *contra ius fasque*, e questo ne faceva l'emblema della corruzione (De Coniuratione Catilinae 15). Qui è un'intera contesa, una guerra che sconvolse ogni cosa umana e divina e giunse a una follia incredibile, e la causa è la corruzione e la superbia della nobiltà. La scala è cresciuta da un uomo a uno stato, ed è per questo che questa guerra è emblematica quanto la congiura, se non di più.`),

// ---- 6 ----
after(I(6), 'analysis', `Numidia produced the virtue; Rome supplied the price list.`,
`**The real culprit.** Before he met Rome, Jugurtha was in effect the ideal Roman of the old days; afterwards he learned that everything at Rome was for sale, and bought senators. That is why Sallust can say, in the chapter before, that the enemy of this book is the corruption and arrogance of the nobility (Bellum Iugurthinum 5). The war is the occasion that exposes the disease, not its cause: without it Rome would have been no healthier. Sallust does not make Jugurtha innocent, though. His ambition is his own, *non mediocrem animum* (8.1), and so will be the murders of his cousins Hiempsal and Adherbal. What Rome did was to make his crimes possible and profitable.`),
after(I(6), 'analysisIt', `La Numidia produsse la virtù; Roma fornì il listino prezzi.`,
`**Il vero colpevole.** Prima di incontrare Roma, Giugurta era di fatto l'ideale del romano dei tempi antichi; dopo, imparò che a Roma tutto era in vendita, e comprò i senatori. Per questo Sallustio può dire, nel capitolo precedente, che il nemico di questo libro è la corruzione e la superbia della nobiltà (Bellum Iugurthinum 5). La guerra è l'occasione che mette a nudo la malattia, non la sua causa: senza di essa Roma non sarebbe stata più sana. Sallustio però non rende innocente Giugurta. La sua ambizione è sua, *non mediocrem animum* (8.1), e così saranno gli assassinii dei cugini Iempsale e Aderbale. Ciò che fece Roma fu rendere i suoi delitti possibili e redditizi.`),

// ---- 8 ----
after(I(8), 'analysis', `His Rome still has good men. They are not the ones who win.`,
`**Ambition turned upside down.** The officers whose fame came before their honour worked on Jugurtha through his ambition, and Sallust shows how easily that quality - the spur to glory in the preface - can be turned into its opposite. Scipio's warning against haste was noble in intent, and it did not save him: a single good man cannot easily defeat corruption, as the Catilina had already shown. And this corruption reaches further than Catiline's. There it ran through one state and every class; here it infects a foreign kingdom that was in good standing with Rome, so that the friendship of Jugurtha and Scipio Aemilianus, like that of Masinissa and Scipio Africanus before it (Bellum Iugurthinum 5), turns sour. The ominous sentence will come back. In 110 BC, ordered out of Rome after having his cousin Massiva murdered in the city, Jugurtha looked back and called it *urbem venalem et mature perituram, si emptorem invenerit*, a city for sale and soon to perish, if it finds a buyer (35.10).`),
after(I(8), 'analysisIt', `La sua Roma ha ancora uomini onesti. Non sono quelli che vincono.`,
`**L'ambizione rovesciata.** Gli ufficiali la cui fama veniva prima dell'onore lavorarono su Giugurta attraverso la sua ambizione, e Sallustio mostra con quanta facilità quella qualità - lo sprone alla gloria nel proemio - possa essere trasformata nel suo contrario. L'avvertimento di Scipione contro la fretta era nobile nelle intenzioni, e non lo salvò: un solo uomo onesto non sconfigge facilmente la corruzione, come il Catilina aveva già mostrato. E questa corruzione arriva più lontano di quella di Catilina. Lì attraversava uno stato e ogni classe; qui infetta un regno straniero che era in buoni rapporti con Roma, così che l'amicizia fra Giugurta e Scipione Emiliano, come quella fra Masinissa e Scipione Africano prima di lei (Bellum Iugurthinum 5), si guasta. La frase sinistra tornerà. Nel 110 a.C., cacciato da Roma dopo aver fatto assassinare in città il cugino Massiva, Giugurta si voltò a guardarla e la chiamò *urbem venalem et mature perituram, si emptorem invenerit*, una città in vendita e destinata a perire presto, se troverà un compratore (35.10).`),

// ---- Cat. 15 back-link ----
after(C(15), 'analysis', `*vultu* for *voltu*.`,
`**From one man to a war.** The Iugurtha opens its story with the same pair: the struggle with the nobility *divina et humana cuncta permiscuit*, threw everything divine and human into confusion (Bellum Iugurthinum 5). There the sacrilege belongs to a whole war, not to one man.`),
after(C(15), 'analysisIt', `*vultu* per *voltu*.`,
`**Da un uomo a una guerra.** Il Bellum Iugurthinum apre il suo racconto con la stessa coppia: la contesa con la nobiltà *divina et humana cuncta permiscuit*, sconvolse ogni cosa divina e umana (Bellum Iugurthinum 5). Lì il sacrilegio appartiene a un'intera guerra, non a un solo uomo.`)
];

fs.writeFileSync(path.join(__dirname, 'patch1166b_sal.json'), JSON.stringify(sal, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags116\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust patches; ' + n + ' batch-file edits');
