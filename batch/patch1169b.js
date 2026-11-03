// v1.16.9 follow-up: the user's notes on Iugurtha 31-38, folded into the five
// analyses; the cryptic "bidding" sentence in 35 rewritten at the user's
// question; Iug. 31.9-16 wired both ways with De Amicitia 64.
//   node batch/patch1169b.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1169b_sal.json
//   node tools/patch_fields.js marcus-tullius-cicero batch/patch1169b_cic.json
const fs = require('fs');
const path = require('path');
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const swap = (cit, field, find, replace) => ({ cit, field, find, replace });

const sal = [
// ---- 31.9-16 ----
after(I('31.9-16'), 'analysis', `the speech is Sallust's, and it is the closest the Iugurtha comes to a manifesto.`,
`**Sallust and Cicero agree.** On friendship the two writers, who agreed on little else, say the same thing. Cicero's Laelius holds that friendship can exist only among good men, *nisi in bonis amicitiam esse non posse*, and that it rests on goodwill, not on advantage; and he observes that true friendships are hardest of all to find among men in public life, who put their own advancement before their friends (De Amicitia 64, in this app). Memmius's sentence implies the same: the bond of shared desires is friendship only *inter bonos*; among the powerful it is a *factio*, an alliance of interest. And the conclusion of section 16 follows from it: the state is in the hands of the men who should least have power, *non optimos, sed audacissimos*, not the best but the most reckless.`),
after(I('31.9-16'), 'analysisIt', `ed è la cosa più vicina a un manifesto che il Bellum Iugurthinum contenga.`,
`**Sallustio e Cicerone d'accordo.** Sull'amicizia i due scrittori, che su poco altro andavano d'accordo, dicono la stessa cosa. Il Lelio di Cicerone sostiene che l'amicizia può esistere solo fra i buoni, *nisi in bonis amicitiam esse non posse*, e che si fonda sulla benevolenza, non sull'utile; e osserva che le vere amicizie sono le più difficili da trovare fra chi fa politica, perché antepone la propria carriera agli amici (De Amicitia 64, in quest'app). La frase di Memmio implica lo stesso: il legame dei desideri comuni è amicizia solo *inter bonos*; fra i potenti è una *factio*, un'alleanza d'interessi. E la conclusione del paragrafo 16 ne discende: lo stato è nelle mani di chi meno dovrebbe avere il potere, *non optimos, sed audacissimos*, non i migliori ma i più sfrontati.`),

// ---- 31.21-29 ----
after(I('31.21-29'), 'analysis', `Sallust does not tell us the speech worked. He tells us it was right.`,
`**Why it has to be stopped now.** The bitterest detail in the speech is a parenthesis: embezzlement and extortion from the allies are *consuetudine iam pro nihilo*, counted as nothing by habit. That single phrase tells you how far the Republic has fallen - crimes that should end careers have become the background noise of politics. And Memmius's logic is the logic of impunity: a wrongdoer who learns that he will not be punished learns that he can go on, and the longer it goes unchecked, the harder it is to stop. The tragedy of the next chapters is that even the law does not work at first: the inquiry Memmius asks for is blocked by a bought tribune (Bellum Iugurthinum 33-34). When a special court was finally set up in 109 BC, it convicted several of the guilty, but Sallust says it was run harshly and violently, on rumour and the passion of the plebs (chapter 40). The cure, too, was partisan.`),
after(I('31.21-29'), 'analysisIt', `Sallustio non ci dice che il discorso funzionò. Ci dice che aveva ragione.`,
`**Perché bisogna fermarli adesso.** Il dettaglio più amaro del discorso è un inciso: il peculato e le estorsioni agli alleati sono *consuetudine iam pro nihilo*, per l'abitudine ormai non contano nulla. Quella sola espressione dice quanto sia caduta la repubblica - delitti che dovrebbero stroncare una carriera sono diventati il rumore di fondo della politica. E la logica di Memmio è la logica dell'impunità: un malfattore che scopre di non essere punito scopre di poter continuare, e quanto più a lungo la cosa resta impunita, tanto più è difficile fermarla. La tragedia dei capitoli seguenti è che all'inizio nemmeno la legge funziona: l'inchiesta che Memmio chiede viene bloccata da un tribuno comprato (Bellum Iugurthinum 33-34). Quando infine nel 109 a.C. fu istituito un tribunale speciale, condannò parecchi colpevoli, ma Sallustio dice che fu condotto con durezza e violenza, sulla base delle voci e della passione della plebe (capitolo 40). Anche la cura fu di parte.`),

// ---- 33-34 ----
after(I('33-34'), 'analysis', `the guilty are safest when they have done the worst (Bellum Iugurthinum 31.9-16).`,
`**Memmius was right.** What he had said about the state of Rome happened, literally, in his own assembly. For a moment it looked as if Jugurtha was finished: brought to Rome, surrounded by a furious crowd, asked to name names. Memmius did everything right and lost, because he did not have the money and Jugurtha did. And the consequence is exactly the one Memmius had warned of in his speech (Bellum Iugurthinum 31.21-29): the guilty get away with it, *animi augescunt*, and grow bolder, having learned that they can go on without being punished.`),
after(I('33-34'), 'analysisIt', `i colpevoli sono più al sicuro quando hanno fatto il peggio (Bellum Iugurthinum 31.9-16).`,
`**Memmio aveva ragione.** Ciò che aveva detto sulle condizioni di Roma accadde, alla lettera, nella sua stessa assemblea. Per un momento sembrò che Giugurta fosse spacciato: portato a Roma, circondato da una folla furiosa, invitato a fare i nomi. Memmio fece tutto bene e perse, perché non aveva il denaro e Giugurta sì. E la conseguenza è esattamente quella che Memmio aveva annunciato nel suo discorso (Bellum Iugurthinum 31.21-29): i colpevoli la fanno franca, *animi augescunt*, e diventano più audaci, avendo imparato che possono continuare senza essere puniti.`),

// ---- 35: the sentence the user asked about, rewritten ----
swap(I(35), 'analysis', `Seventy years later, Sallust's readers had watched the bidding.`,
`By the time Sallust wrote, some seventy years later, his readers had seen the prophecy come true in its own way: the great men of the civil wars bought armies, voters and courts on a scale Jugurtha never dreamed of, and the Republic did perish.`),
swap(I(35), 'analysisIt', `Settant'anni dopo, i lettori di Sallustio avevano assistito all'asta.`,
`Quando Sallustio scriveva, circa settant'anni dopo, i suoi lettori avevano visto la profezia avverarsi a suo modo: i grandi uomini delle guerre civili comprarono eserciti, elettori e tribunali su una scala che Giugurta non aveva mai sognato, e la repubblica perì davvero.`),
after(I(35), 'analysis', `(Bellum Iugurthinum 31.21-29): *res publica venalis fuit*.`,
`**The one time money fails.** It is the one moment in the book when money does not buy everything - the odium of a murder in Rome is too great - and Jugurtha still gets away, smuggling out his agent and leaving under orders but alive. And his parting judgement confirms what he was told at Numantia (Bellum Iugurthinum 8). After years of buying senators, tribunes and officers, he has proved it himself: everything at Rome is for sale, and if one buyer were rich enough to buy it all, the city would be finished.`),
after(I(35), 'analysisIt', `(Bellum Iugurthinum 31.21-29): *res publica venalis fuit*.`,
`**L'unica volta in cui il denaro fallisce.** È l'unico momento del libro in cui il denaro non compra tutto - l'odio per un assassinio a Roma è troppo grande - e Giugurta se la cava comunque, facendo fuggire il suo agente e partendo per ordine del senato ma vivo. E il suo giudizio d'addio conferma ciò che gli era stato detto a Numanzia (Bellum Iugurthinum 8). Dopo anni passati a comprare senatori, tribuni e ufficiali, lo ha dimostrato lui stesso: a Roma tutto è in vendita, e se un compratore fosse abbastanza ricco da comprarla tutta, la città sarebbe finita.`),

// ---- 38 ----
after(I(38), 'analysis', `buys, in the end, a Roman army's honour (Bellum Iugurthinum 8).`,
`**Even the army.** The army was the one institution that was supposed to stay steadfast, and the Catilina had already shown that it was not: Sulla's soldiers learned looting and luxury in Asia (De Coniuratione Catilinae 11). Here Jugurtha bribes it outright - mostly auxiliaries, the Ligurian cohort and the Thracian horse, but also a chief centurion, the most senior soldier of a legion. He wins this easily because the legate was vain and inexperienced, and he used both weaknesses. It is tempting to say that Jugurtha had infinite money and could buy anything; the joke has a point. It shows how dangerous he was, and how corrupt the Rome he was dealing with had become.`),
after(I(38), 'analysisIt', `compra, alla fine, l'onore di un esercito romano (Bellum Iugurthinum 8).`,
`**Perfino l'esercito.** L'esercito era l'unica istituzione che avrebbe dovuto restare salda, e il Catilina aveva già mostrato che non lo era: i soldati di Silla impararono il saccheggio e il lusso in Asia (De Coniuratione Catilinae 11). Qui Giugurta lo corrompe apertamente - per lo più ausiliari, la coorte ligure e i cavalieri traci, ma anche un centurione primipilo, il soldato più alto in grado di una legione. Vince con facilità perché il legato era vanitoso e inesperto, e lui sfruttò entrambe le debolezze. Si è tentati di dire che Giugurta avesse denaro infinito e potesse comprare qualunque cosa; la battuta coglie nel segno. Mostra quanto fosse pericoloso, e quanto fosse diventata corrotta la Roma con cui aveva a che fare.`)
];

const cic = [
join('(De Amicitia 64)', 'analysis', `(Bellum Iugurthinum 10, in this app).`,
`And Sallust's tribune Memmius draws the political consequence: the bond of shared interests is friendship only among good men; among the powerful it is faction (Bellum Iugurthinum 31.9-16, in this app).`),
join('(De Amicitia 64)', 'analysisIt', `(Bellum Iugurthinum 10, in quest'app).`,
`E il tribuno Memmio di Sallustio ne trae la conseguenza politica: il legame degli interessi comuni è amicizia solo fra i buoni; fra i potenti è fazione (Bellum Iugurthinum 31.9-16, in quest'app).`)
];

for (const [k, v] of Object.entries({ patch1169b_sal: sal, patch1169b_cic: cic })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags116\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust, ' + cic.length + ' Cicero patches; ' + n + ' batch-file edits');
