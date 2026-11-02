// v1.16.8 follow-up: the user's notes on Iugurtha 17-29, folded into the five
// analyses.
//   node batch/patch1168b.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1168b_sal.json
const fs = require('fs');
const path = require('path');
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });

const sal = [
// ---- 17 ----
after(I(17), 'analysis', `an army that should be fighting in the desert is fighting over bribes.`,
`**Dying of old age.** The claim that most Africans die of old age looks extraordinary, and Sallust is careful about what he says: they die *ferro aut bestiis*, by the sword or by wild beasts, because *morbus haud saepe quemquam superat*, disease seldom gets the better of anyone. It is partly a commonplace of ethnography - Herodotus had already called the Libyans the healthiest people he knew (Herodotus IV.187) - and partly a fair point. Ancient life expectancy at birth was very low, mostly because so many children died; but a Roman who survived childhood could expect to reach his fifties or sixties, and many lived into their seventies. Sallust's Africans are that survivor, generalised into a people.`),
after(I(17), 'analysisIt', `un esercito che dovrebbe combattere nel deserto combatte per le tangenti.`,
`**Morire di vecchiaia.** L'affermazione che la maggior parte degli Africani muoia di vecchiaia sembra straordinaria, e Sallustio sta attento a ciò che dice: muoiono *ferro aut bestiis*, di spada o per le belve, perché *morbus haud saepe quemquam superat*, la malattia raramente ha la meglio su qualcuno. È in parte un luogo comune dell'etnografia - Erodoto aveva già definito i Libici il popolo più sano che conoscesse (Erodoto IV.187) - e in parte un'osservazione giusta. La speranza di vita alla nascita, nell'antichità, era bassissima, soprattutto perché morivano moltissimi bambini; ma un romano che superava l'infanzia poteva aspettarsi di arrivare ai cinquanta o ai sessant'anni, e molti vivevano oltre i settanta. Gli Africani di Sallustio sono quel sopravvissuto, generalizzato in un popolo.`),

// ---- 18 ----
after(I(18), 'analysis', `- and, he will show, the corruption that follows.`,
`**Not only a Roman disease.** The beginnings of the Numidians are like those of the Romans and of every primitive people; what differs is what happens next, and in Sallust what happens next is very often corruption. He states it as a general law at the start of the Catilina: power always passes from the less good to the best, and when idleness replaces effort and greed replaces restraint, fortune changes with morals (chapter 2). So corruption is not Rome's problem alone. But in this book the Numidians' own decline has a Roman cause. Jugurtha learned at Numantia that everything in Rome had a price (Bellum Iugurthinum 8), and the bribes that run through the war flow from Africa to Rome and back.`),
after(I(18), 'analysisIt', `- e, mostrerà, la corruzione che segue.`,
`**Non solo una malattia romana.** Gli inizi dei Numidi somigliano a quelli dei Romani e di ogni popolo primitivo; ciò che cambia è quello che viene dopo, e in Sallustio quello che viene dopo è molto spesso la corruzione. Lo enuncia come legge generale all'inizio del Catilina: il potere passa sempre dai meno buoni ai migliori, e quando l'ozio prende il posto dell'impegno e l'avidità quello della moderazione, la fortuna cambia insieme ai costumi (capitolo 2). Dunque la corruzione non è un problema soltanto di Roma. Ma in questo libro la decadenza dei Numidi ha una causa romana. Giugurta imparò a Numanzia che a Roma tutto aveva un prezzo (Bellum Iugurthinum 8), e le tangenti che attraversano la guerra viaggiano dall'Africa a Roma e ritorno.`),

// ---- 19 ----
after(I(19), 'analysis', `from what his friends at Numantia had told him, that *omnia Romae venalia esse* (Bellum Iugurthinum 8).`,
`**Why the map matters.** The chapter is easy to skip and should not be. The war that follows moves across exactly these territories - the Roman province on the coast, Jugurtha's Numidia inland as far as the river Muluccha, and Bocchus's Mauretania beyond it - and without the map the campaigns, the sieges and the final betrayal are hard to follow. The corruption that follows is mapped onto it too: the province is where Roman armies wait and Roman commanders are bought, Numidia is where the war is fought, and Mauretania is where it will be decided.`),
after(I(19), 'analysisIt', `da ciò che gli avevano detto i suoi amici a Numanzia, che *omnia Romae venalia esse* (Bellum Iugurthinum 8).`,
`**Perché la carta conta.** Il capitolo è facile da saltare e non dovrebbe esserlo. La guerra che segue si muove proprio su questi territori - la provincia romana sulla costa, la Numidia di Giugurta all'interno fino al fiume Muluccha, e la Mauretania di Bocco al di là - e senza la carta le campagne, gli assedi e il tradimento finale sono difficili da seguire. Anche la corruzione che segue si dispone su questa carta: la provincia è il luogo dove gli eserciti romani aspettano e i comandanti romani vengono comprati, la Numidia è dove si combatte la guerra, e la Mauretania è dove si deciderà.`),

// ---- 26-27 ----
after(I('26-27'), 'analysis', `will be fought, at first, by the wrong men (Bellum Iugurthinum 29).`,
`**Memmius, one of the heroes.** Sallust introduces Memmius as one of the heroes of the book, and the two qualities he gives him in four words are the ones that matter: *acer*, energetic, a man who wants to act, and *infestus potentiae nobilitatis*, hostile to the power of the nobility. The second is the point. The true antagonist of the Iugurtha is not Jugurtha but the corruption of the Roman nobility (Bellum Iugurthinum 5), and Memmius is the first man in the book to fight it openly. He will not win alone: his summons of Jugurtha to Rome is blocked by a tribune Jugurtha has bought (chapter 34), and twelve years later, standing for the consulship in 100 BC, he was beaten to death in the forum by the gangs of another popular politician, Saturninus. Sallust's heroes rarely have happy endings.`),
after(I('26-27'), 'analysisIt', `dagli uomini sbagliati (Bellum Iugurthinum 29).`,
`**Memmio, uno degli eroi.** Sallustio presenta Memmio come uno degli eroi del libro, e le due qualità che gli dà in quattro parole sono quelle che contano: *acer*, energico, un uomo che vuole agire, e *infestus potentiae nobilitatis*, ostile al potere della nobiltà. La seconda è il punto. Il vero antagonista del Bellum Iugurthinum non è Giugurta ma la corruzione della nobiltà romana (Bellum Iugurthinum 5), e Memmio è il primo uomo del libro a combatterla apertamente. Da solo non vincerà: la sua convocazione di Giugurta a Roma verrà bloccata da un tribuno comprato da Giugurta (capitolo 34), e dodici anni dopo, candidato al consolato nel 100 a.C., fu ucciso a bastonate nel foro dalle bande di un altro politico popolare, Saturnino. Gli eroi di Sallustio raramente hanno un lieto fine.`),

// ---- 29 ----
after(I(29), 'analysis', `because its commanders have been paid not to.`,
`**Two payments, one public and one secret.** It is worth being precise about who received what. The thirty elephants, the cattle, the horses and the silver were the official price of surrender, handed to the quaestor because he was the state's financial officer: they went, at least on paper, to the Roman treasury. The bribes were the other payment, made in secret to Bestia and Scaurus, and Sallust never says how large they were - only that the size of the sum was enough to drag Scaurus into wickedness. The irony is in the contrast: a pittance for Rome, a fortune for its commanders. It is astonishing how easily they were bought, and most of all Scaurus, the man who had stood up to Jugurtha in the senate, whose greed had only been hidden. And Sallust's last sentence says what the reader should think of the result: a peace bought with bribes is not a real peace, and it will not last. It did not: within a year the war had begun again, under a new consul.`),
after(I(29), 'analysisIt', `perché i suoi comandanti sono stati pagati per non fare nulla.`,
`**Due pagamenti, uno pubblico e uno segreto.** Conviene essere precisi su chi ricevette che cosa. I trenta elefanti, il bestiame, i cavalli e l'argento erano il prezzo ufficiale della resa, consegnati al questore perché era il magistrato delle finanze dello stato: andavano, almeno sulla carta, all'erario romano. Le tangenti erano l'altro pagamento, fatto in segreto a Bestia e a Scauro, e Sallustio non dice mai a quanto ammontassero - solo che la grandezza della somma bastò a trascinare Scauro nel male. L'ironia sta nel contrasto: una miseria per Roma, una fortuna per i suoi comandanti. È sorprendente con quanta facilità vennero comprati, e soprattutto Scauro, l'uomo che aveva tenuto testa a Giugurta in senato, la cui avidità era soltanto nascosta. E l'ultima frase di Sallustio dice che cosa il lettore deve pensare del risultato: una pace comprata con le tangenti non è una vera pace, e non durerà. Non durò: nel giro di un anno la guerra era ricominciata, sotto un nuovo console.`)
];

fs.writeFileSync(path.join(__dirname, 'patch1168b_sal.json'), JSON.stringify(sal, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags116\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust patches; ' + n + ' batch-file edits');
