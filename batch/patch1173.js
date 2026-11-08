// v1.16.13: the last four Iugurtha notes (101, 102, 113, 114) wired both ways to
// the passages they cite.
//   node batch/patch1173.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1173_sal.json
const fs = require('fs');
const path = require('path');
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';

const sal = [
// Cat. 61 <- 101 and 114 (the other field; the other ending)
join(C(61), 'analysis', `for preferring a shameful life to a clean name (Bellum Iugurthinum 66-67).`,
`The Iugurtha has its own field of the dead, strewn with arms and corpses and soaked in blood, but without the mourning (Bellum Iugurthinum 101); and it ends not on a battlefield but on a triumph, with no epilogue at all (Bellum Iugurthinum 114).`),
join(C(61), 'analysisIt', `per aver preferito una vita vergognosa a un nome pulito (Bellum Iugurthinum 66-67).`,
`Anche il Bellum Iugurthinum ha il suo campo di morti, coperto di armi e cadaveri e intriso di sangue, ma senza il lutto (Bellum Iugurthinum 101); e finisce non su un campo di battaglia ma su un trionfo, senza alcun epilogo (Bellum Iugurthinum 114).`),
// Cat. 15 <- 113 (the body betrays the mind)
join(C(15), 'analysis', `though there the cause is *formido*, fear, not conscience (Bellum Iugurthinum 71-72).`,
`And on the last night before he betrays Jugurtha, Bocchus's face, colour and movements give away the struggle he will not put into words (Bellum Iugurthinum 113).`),
join(C(15), 'analysisIt', `anche se lì la causa è la *formido*, la paura, non la coscienza (Bellum Iugurthinum 71-72).`,
`E nell'ultima notte prima di tradire Giugurta, il volto, il colorito e i movimenti di Bocco tradiscono la lotta che non vuole mettere in parole (Bellum Iugurthinum 113).`),
// Cat. 55 <- 114 (Jugurtha in the Tullianum)
join(C(55), 'analysis', `starved to death after Marius's triumph in 104 BC.`,
`The Iugurtha ends with that triumph and says nothing of what followed (Bellum Iugurthinum 114).`),
join(C(55), 'analysisIt', `lasciato morire di fame dopo il trionfo di Mario del 104 a.C.`,
`Il Bellum Iugurthinum finisce con quel trionfo e non dice nulla di ciò che seguì (Bellum Iugurthinum 114).`),
// Iug. 5 <- 114 (the bookend)
join(I(5), 'analysis', `that is why this war is as emblematic as the conspiracy, if not more so.`,
`The book's last sentence answers this one: the war ends with the hope and strength of the state resting on a single man (Bellum Iugurthinum 114).`),
join(I(5), 'analysisIt', `ed è per questo che questa guerra è emblematica quanto la congiura, se non di più.`,
`L'ultima frase del libro risponde a questa: la guerra finisce con la speranza e la forza dello stato che poggiano su un solo uomo (Bellum Iugurthinum 114).`),
// Iug. 8 <- 101 and 114 (Numantia; the city for sale)
join(I(8), 'analysis', `*urbem venalem et mature perituram, si emptorem invenerit* (Bellum Iugurthinum 35).`,
`Numantia gave him one more weapon: the Latin he shouts at the Roman infantry, years later, to make them believe Marius is dead (Bellum Iugurthinum 101). And the book that begins its story here ends with the hope of the state resting on one man (Bellum Iugurthinum 114).`),
join(I(8), 'analysisIt', `*urbem venalem et mature perituram, si emptorem invenerit* (Bellum Iugurthinum 35).`,
`Numanzia gli diede un'arma in più: il latino che grida alla fanteria romana, anni dopo, per farle credere che Mario sia morto (Bellum Iugurthinum 101). E il libro che qui comincia la sua storia finisce con la speranza dello stato che poggia su un solo uomo (Bellum Iugurthinum 114).`),
// Iug. 12 <- 113 (treachery repaid)
join(I(12), 'analysis', `That is how quickly ambition, once it has seen what can be bought, turns into crime.`,
`The method comes back to him at the end: Jugurtha is taken by an ambush laid by his own father-in-law, at a peace conference he attended unarmed (Bellum Iugurthinum 113).`),
join(I(12), 'analysisIt', `Ecco con quale rapidità l'ambizione, una volta che ha visto che cosa si può comprare, diventa delitto.`,
`Il metodo gli si ritorce contro alla fine: Giugurta è preso in un'imboscata tesa dal proprio suocero, a un colloquio di pace a cui era venuto disarmato (Bellum Iugurthinum 113).`),
// Iug. 26-27 <- 102 (Rome's friendship)
join(I('26-27'), 'analysis', `Sallust's heroes rarely have happy endings.`,
`When Sulla later tells King Bocchus that Rome always prefers friends to slaves, the reader remembers what Rome's friendship was worth to Adherbal (Bellum Iugurthinum 102).`),
join(I('26-27'), 'analysisIt', `Gli eroi di Sallustio raramente hanno un lieto fine.`,
`Quando più avanti Silla dice al re Bocco che Roma preferisce sempre gli amici agli schiavi, il lettore ricorda quanto valesse per Aderbale l'amicizia di Roma (Bellum Iugurthinum 102).`),
// Iug. 63 <- 114 (the warning comes true)
join(I(63), 'analysis', `in the oddest way: by a soldier hunting snails (Bellum Iugurthinum 93).`,
`And the book ends with the hope of the state resting on him, which is where the warning in the parenthesis begins to come true (Bellum Iugurthinum 114).`),
join(I(63), 'analysisIt', `nel modo più strano: grazie a un soldato a caccia di lumache (Bellum Iugurthinum 93).`,
`E il libro finisce con la speranza dello stato che poggia su di lui, ed è lì che l'avvertimento dell'inciso comincia ad avverarsi (Bellum Iugurthinum 114).`),
// Iug. 86 <- 114 (the general on whom everything rests)
join(I(86), 'analysis', `Sallust does not draw the line himself in this chapter; for his readers he did not need to.`,
`The last sentence of the book draws it for him: the hope and strength of the state rested on one general (Bellum Iugurthinum 114).`),
join(I(86), 'analysisIt', `Sallustio non traccia lui stesso la linea in questo capitolo; per i suoi lettori non ce n'era bisogno.`,
`L'ultima frase del libro la traccia per lui: la speranza e la forza dello stato poggiavano su un solo generale (Bellum Iugurthinum 114).`),
// Iug. 95-96 <- 101, 102, 113 (Sulla in action)
join(I('95-96'), 'analysis', `but he puts Sulla's example at the origin of the conspiracy.`,
`The rest of the book shows the arts at work: Sulla saves the battle near Cirta (Bellum Iugurthinum 101), speaks for Rome to King Bocchus (Bellum Iugurthinum 102), and receives Jugurtha in chains (Bellum Iugurthinum 113).`),
join(I('95-96'), 'analysisIt', `ma colloca l'esempio di Silla all'origine della congiura.`,
`Il resto del libro mostra queste arti all'opera: Silla salva la battaglia presso Cirta (Bellum Iugurthinum 101), parla a nome di Roma al re Bocco (Bellum Iugurthinum 102), e riceve Giugurta in catene (Bellum Iugurthinum 113).`)
];

fs.writeFileSync(path.join(__dirname, 'patch1173_sal.json'), JSON.stringify(sal, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags11(6|7)\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust patches; ' + n + ' batch-file edits');
