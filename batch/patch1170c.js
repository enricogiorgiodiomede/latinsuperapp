// v1.16.10 follow-up: the user's notes on Iugurtha 41-63, folded into the five
// analyses; 42 wired both ways with Iug. 4 (ad inceptum redeo), 63 with Cat. 23
// (quasi pollui) and Cat. 31.4-9 (inquilinus civis).
//   node batch/patch1170c.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1170c_sal.json
const fs = require('fs');
const path = require('path');
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });

const sal = [
// ---- 41 ----
after(I(41), 'analysis', `when the people won, it behaved no better.`,
`**The road to oligarchy.** The mechanism is the one the Catilina had already described: Carthage falls, the fear goes, and the virtues the fear protected die out (De Coniuratione Catilinae 10). What chapter 41 adds is the political result, and section 7 is in effect the description of an oligarchy: war and peace decided *paucorum arbitrio*, at the will of a few, and the treasury, the provinces, the offices and the triumphs *penes eosdem*, in the same hands. The people are not innocent - they too turned liberty into licence, and the Mamilian court shows what they did when they won - but the blame is not shared equally. The nobility was the stronger party, organised and in possession of the state, and so it carries the larger share.`),
after(I(41), 'analysisIt', `quando il popolo vinse, non si comportò meglio.`,
`**La strada verso l'oligarchia.** Il meccanismo è quello che il Catilina aveva già descritto: Cartagine cade, la paura se ne va, e le virtù che la paura proteggeva si estinguono (De Coniuratione Catilinae 10). Ciò che il capitolo 41 aggiunge è il risultato politico, e il paragrafo 7 è di fatto la descrizione di un'oligarchia: la guerra e la pace decise *paucorum arbitrio*, ad arbitrio di pochi, e l'erario, le province, le cariche e i trionfi *penes eosdem*, nelle stesse mani. Il popolo non è innocente - anch'esso volse la libertà in arbitrio, e il tribunale di Mamilio mostra che cosa fece quando vinse - ma la colpa non è divisa in parti uguali. La nobiltà era la parte più forte, organizzata e padrona dello stato, e per questo porta la parte maggiore.`),

// ---- 42 ----
after(I(42), 'analysis', `and the fear passes to the next generation along with the habit of killing.`,
`**Honest men edged out.** The Gracchi are the historical case of what the Catilina's preface says about Sallust's own career, and the biography on his author page puts it in one line: honest political participation is impossible; virtuous men are edged out by the unscrupulous. The Gracchi put true glory before unjust power, and a nobility frightened of being exposed, *noxia atque eo perculsa*, answered with the sword. And the chapter closes the digression with the formula Sallust had used in the Iugurtha's preface, *ad inceptum redeo*, I return to my undertaking (Bellum Iugurthinum 4). But the reason has turned around. In chapter 4 he goes back because he has said too much, carried away by his disgust at the city's morals; here he goes back because he could never say enough - time would run out before the material.`),
after(I(42), 'analysisIt', `e la paura passa alla generazione successiva insieme all'abitudine di uccidere.`,
`**Gli onesti messi da parte.** I Gracchi sono il caso storico di ciò che il proemio del Catilina dice della carriera dello stesso Sallustio, e la biografia nella sua pagina d'autore lo riassume in una riga: una partecipazione politica onesta è impossibile; gli uomini virtuosi vengono messi da parte dagli spregiudicati. I Gracchi anteposero la vera gloria al potere ingiusto, e una nobiltà che temeva di essere smascherata, *noxia atque eo perculsa*, rispose con la spada. E il capitolo chiude la digressione con la formula che Sallustio aveva usato nel proemio del Bellum Iugurthinum, *ad inceptum redeo*, torno al mio proposito (Bellum Iugurthinum 4). Ma la ragione si è capovolta. Nel capitolo 4 torna indietro perché ha detto troppo, trascinato dal disgusto per i costumi della città; qui torna indietro perché non potrebbe mai dire abbastanza - gli mancherebbe il tempo prima della materia.`),

// ---- 44 ----
after(I(44), 'analysis', `by one commander who cannot be bought.`,
`**Virtues turned into vices.** The army was the one institution that should have been corrupted least, and chapter 44 shows every soldierly virtue turned into its opposite: endurance into idleness, discipline into wandering, courage into talk, protection of the allies into plunder of their farms, a soldier's self-sufficiency into bread bought from a baker. Militarily, the lowest point of the war was the yoke at Suthul (Bellum Iugurthinum 38); morally, it is this chapter, which shows the habits behind the yoke - an army robbing its own allies and robbed by the enemy. The one saving grace is that the disease can be cured, and the cure is work. Metellus does not punish the army into shape: he takes away the props of idleness and makes the soldiers march, dig and keep watch every day, and in a short time the army is fit to fight again (chapter 45).`),
after(I(44), 'analysisIt', `grazie a un solo comandante che non si lascia comprare.`,
`**Le virtù diventate vizi.** L'esercito era l'unica istituzione che avrebbe dovuto corrompersi meno di tutte, e il capitolo 44 mostra ogni virtù del soldato trasformata nel suo contrario: la resistenza in ignavia, la disciplina in vagabondaggio, il coraggio in chiacchiere, la protezione degli alleati nel saccheggio dei loro campi, l'autosufficienza del soldato nel pane comprato dal fornaio. Sul piano militare il punto più basso della guerra fu il giogo a Sutul (Bellum Iugurthinum 38); sul piano morale è questo capitolo, che mostra le abitudini che stanno dietro al giogo - un esercito che deruba i propri alleati ed è derubato dal nemico. L'unica nota positiva è che la malattia si può curare, e la cura è il lavoro. Metello non rimette in riga l'esercito a forza di punizioni: toglie i sostegni dell'ignavia e fa marciare, scavare e montare la guardia ai soldati ogni giorno, e in breve tempo l'esercito è di nuovo in grado di combattere (capitolo 45).`),

// ---- 51 ----
after(I(51), 'analysis', `Metellus is the first Roman in the book who cannot be bribed, so the king has to fight.`,
`**Brevity at its peak.** Section 1 is Sallust's compression at its most extreme: verbs without subjects, pairs of nouns without verbs, subjects that do not match (*pars ... alii*), and not one subordinate clause to slow the reader down. The form imitates the content - a battle too fast and too confused to be told in order, ruled by chance.

**The first real fight.** It is also the first time in the book that Jugurtha meets a Roman army in a pitched battle he cannot buy his way out of. He had fought Adherbal, and he had beaten Aulus at Suthul with bribes rather than swords (Bellum Iugurthinum 38); here Metellus had already turned the king's own weapon against him by trying to bribe his envoys (chapters 46-47), and the discipline restored in chapter 44 is what holds the line. And Jugurtha does not only come close to losing: by evening his infantry had scattered, and Rutilius had routed Bomilcar and his elephants by the river (chapters 52-53). Metellus won the battle, but not the war - the king escaped and went back to raids and ambushes.`),
after(I(51), 'analysisIt', `Metello è il primo romano del libro che non si lascia corrompere, e il re deve combattere.`,
`**La brevitas al suo culmine.** Il paragrafo 1 è la compressione sallustiana nella sua forma più estrema: verbi senza soggetto, coppie di sostantivi senza verbo, soggetti che non si corrispondono (*pars ... alii*), e nemmeno una subordinata che rallenti il lettore. La forma imita il contenuto - una battaglia troppo rapida e troppo confusa per essere raccontata in ordine, governata dal caso.

**Il primo vero scontro.** È anche la prima volta nel libro che Giugurta affronta un esercito romano in una battaglia campale da cui non può uscire comprando. Aveva combattuto contro Aderbale, e aveva battuto Aulo a Sutul con il denaro più che con le spade (Bellum Iugurthinum 38); qui Metello gli aveva già ritorto contro la sua stessa arma cercando di corrompere i suoi ambasciatori (capitoli 46-47), e la disciplina ristabilita nel capitolo 44 è ciò che tiene la linea. E Giugurta non si limita a sfiorare la sconfitta: a sera la sua fanteria si era dispersa, e Rutilio aveva messo in fuga Bomilcare con i suoi elefanti presso il fiume (capitoli 52-53). Metello vinse la battaglia, ma non la guerra - il re si salvò e tornò alle incursioni e alle imboscate.`),

// ---- 63 ----
after(I(63), 'analysis', `And Sallust, himself a new man from Amiternum, knew the feeling from the inside.`,
`**A pattern of new men.** Marius is not alone. A *homo novus* had no consular ancestors to vouch for him; he could rely only on himself and his skills, and the nobles who passed the consulship among themselves treated him less as a danger than as a defilement. Sallust had used the same image in the Catilina: the nobility thought the consulship *quasi pollui*, as good as defiled, if a new man held it, however outstanding (De Coniuratione Catilinae 23). The pattern runs through the people of both books. Cicero, also from Arpinum, reached the consulship in 63 BC, and Catiline answered him in the senate by calling him *inquilinus civis urbis Romae*, a lodger in the city of Rome, against his own patrician birth (De Coniuratione Catilinae 31.4-9). Sallust, from Amiternum in the Sabine hills, never became consul: he reached the praetorship, and in 46 BC Caesar made him the first governor of the new province of Africa Nova - Jugurtha's old kingdom. One distinction is worth keeping: the barrier was *nobilitas*, consular ancestors, not patrician blood. Metellus's family was plebeian but noble; Catiline's jibe uses the older and narrower snobbery of the patricians.`),
after(I(63), 'analysisIt', `E Sallustio, anch'egli uomo nuovo, di Amiterno, conosceva quel sentimento dall'interno.`,
`**Uno schema di uomini nuovi.** Mario non è solo. Un *homo novus* non aveva antenati consolari che garantissero per lui; poteva contare solo su se stesso e sulle proprie capacità, e i nobili che si passavano il consolato lo trattavano non tanto come un pericolo quanto come una profanazione. Sallustio aveva usato la stessa immagine nel Catilina: la nobiltà riteneva il consolato *quasi pollui*, quasi contaminato, se lo avesse ricoperto un uomo nuovo, per quanto eccellente (De Coniuratione Catilinae 23). Lo schema attraversa i personaggi di entrambi i libri. Cicerone, anch'egli di Arpino, raggiunse il consolato nel 63 a.C., e Catilina gli rispose in senato chiamandolo *inquilinus civis urbis Romae*, un inquilino della città di Roma, contrapponendolo alla propria nascita patrizia (De Coniuratione Catilinae 31.4-9). Sallustio, di Amiterno, nella Sabina, non divenne mai console: arrivò alla pretura, e nel 46 a.C. Cesare lo fece primo governatore della nuova provincia dell'Africa Nova - l'antico regno di Giugurta. Vale la pena di tenere una distinzione: la barriera era la *nobilitas*, gli antenati consolari, non il sangue patrizio. La famiglia di Metello era plebea ma nobile; la battuta di Catilina usa lo snobismo più antico e più ristretto dei patrizi.`),

// ---- reciprocal links ----
join(I(4), 'analysis', `He is angry, and he wants his reader to be.`,
`He uses the same formula to close the digression on the parties, but for the opposite reason: there he has not said too much, he could never say enough (Bellum Iugurthinum 42).`),
join(I(4), 'analysisIt', `È arrabbiato, e vuole che lo sia anche il lettore.`,
`Usa la stessa formula per chiudere la digressione sui partiti, ma per la ragione opposta: lì non ha detto troppo, non potrebbe mai dire abbastanza (Bellum Iugurthinum 42).`),
join(C(23), 'analysis', `where every noble house is reminded that it was once founded by a new man.`,
`And in his portrait of the young Marius he uses the same image for the same prejudice: a new man, however famous, was held *quasi pollutus*, as if polluted (Bellum Iugurthinum 63).`),
join(C(23), 'analysisIt', `dove si ricorda a ogni casata nobile che anch'essa fu fondata un tempo da un uomo nuovo.`,
`E nel ritratto del giovane Mario usa la stessa immagine per lo stesso pregiudizio: un uomo nuovo, per quanto famoso, era ritenuto *quasi pollutus*, come contaminato (Bellum Iugurthinum 63).`),
join(C('31.4-9'), 'analysis', `because Cicero himself quotes it in another speech.`,
`The sneer at the new man from Arpinum is part of a pattern: in the Iugurtha the nobles treat Marius, Cicero's fellow townsman, as if the consulship would be polluted by him (Bellum Iugurthinum 63).`),
join(C('31.4-9'), 'analysisIt', `perché la cita lo stesso Cicerone in un'altra orazione.`,
`Il disprezzo per l'uomo nuovo di Arpino fa parte di uno schema: nel Bellum Iugurthinum i nobili trattano Mario, concittadino di Cicerone, come se il consolato potesse esserne contaminato (Bellum Iugurthinum 63).`)
];

fs.writeFileSync(path.join(__dirname, 'patch1170c_sal.json'), JSON.stringify(sal, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags11(6|7)\d.*\.js$/.test(f) && !/^frags11(6|7)\d\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust patches; ' + n + ' batch-file edits');
