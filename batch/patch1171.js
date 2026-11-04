// v1.16.11: the new Iugurtha notes (64, 66-67, 71-72, 73, 79) wired both ways
// to the passages they cite.
//   node batch/patch1171.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1171_sal.json
//   node tools/patch_fields.js marcus-tullius-cicero batch/patch1171_cic.json
const fs = require('fs');
const path = require('path');
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';

const sal = [
// Cat. 15 <- Iug. 71-72 (the sleepless mind)
join(C(15), 'analysis', `There the sacrilege belongs to a whole war, not to one man.`,
`And the Iugurtha paints Jugurtha after the plot of Bomilcar with the same symptoms - no quiet day or night, starting at every noise, changing his bed, driven by fear as if by madness - though there the cause is *formido*, fear, not conscience (Bellum Iugurthinum 71-72).`),
join(C(15), 'analysisIt', `Lì il sacrilegio appartiene a un'intera guerra, non a un solo uomo.`,
`E il Bellum Iugurthinum dipinge Giugurta, dopo la congiura di Bomilcare, con gli stessi sintomi - nessun giorno né notte tranquilli, il sussulto a ogni rumore, il letto cambiato ogni notte, la paura che lo agita come una follia - anche se lì la causa è la *formido*, la paura, non la coscienza (Bellum Iugurthinum 71-72).`),
// Cat. 61 <- Iug. 66-67 (the commander who outlived his men)
join(C(61), 'analysis', `in a war against your own people, nobody really wins.`,
`The Iugurtha has the opposite case: after the massacre at Vaga the one man who escaped untouched was the Roman commander, and Sallust calls him worthless and infamous for preferring a shameful life to a clean name (Bellum Iugurthinum 66-67).`),
join(C(61), 'analysisIt', `in una guerra contro il proprio popolo, nessuno vince davvero.`,
`Il Bellum Iugurthinum ha il caso opposto: dopo il massacro di Vaga l'unico uomo che fuggì illeso fu il comandante romano, e Sallustio lo chiama spregevole e infame per aver preferito una vita vergognosa a un nome pulito (Bellum Iugurthinum 66-67).`),
// Iug. 19 <- Iug. 79 (the Altars of the Philaeni)
join(I(19), 'analysis', `The map ends where knowledge ends.`,
`One name on the route, *Philaenon arae*, the Altars of the Philaeni, gets its own story later in the book (Bellum Iugurthinum 79).`),
join(I(19), 'analysisIt', `La carta finisce dove finisce il sapere.`,
`Un nome sul percorso, *Philaenon arae*, gli Altari dei Fileni, avrà una storia tutta sua più avanti nel libro (Bellum Iugurthinum 79).`),
// Iug. 42 <- Iug. 79 (the closing formula)
join(I(42), 'analysis', `time would run out before the material.`,
`When he stops the war once more, for the Philaeni, he closes with *nunc ad rem redeo* (Bellum Iugurthinum 79).`),
join(I(42), 'analysisIt', `gli mancherebbe il tempo prima della materia.`,
`Quando ferma la guerra un'altra volta, per i Fileni, chiude con *nunc ad rem redeo* (Bellum Iugurthinum 79).`),
// Iug. 44 <- Iug. 64 (the discipline relaxed)
join(I(44), 'analysis', `in a short time the army is fit to fight again (chapter 45).`,
`The cure did not survive ambition: a year later Metellus's own legate Marius relaxed the discipline of the men under him to win their votes (Bellum Iugurthinum 64).`),
join(I(44), 'analysisIt', `in breve tempo l'esercito è di nuovo in grado di combattere (capitolo 45).`,
`La cura non sopravvisse all'ambizione: un anno dopo il legato dello stesso Metello, Mario, allentò la disciplina dei suoi uomini per guadagnarne i voti (Bellum Iugurthinum 64).`),
// Iug. 63 <- Iug. 64 and 73 (the snobbery, and how it was beaten)
join(I(63), 'analysis', `Catiline's jibe uses the older and narrower snobbery of the patricians.`,
`Metellus's answer to Marius's request shows the nobles' snobbery from the inside (Bellum Iugurthinum 64), and the election of 107 shows how it was beaten (Bellum Iugurthinum 73).`),
join(I(63), 'analysisIt', `la battuta di Catilina usa lo snobismo più antico e più ristretto dei patrizi.`,
`La risposta di Metello alla richiesta di Mario mostra lo snobismo dei nobili dall'interno (Bellum Iugurthinum 64), e l'elezione del 107 mostra come fu sconfitto (Bellum Iugurthinum 73).`)
];

const cic = [
// In Verrem II.5.162-163 <- Iug. 66-67 (flogged because he was a Latin)
join('(In Verrem II.5.162-163)', 'analysis', `this passage doing duty as foreign policy nineteen centuries later.`,
`The protection had a hard edge: Sallust tells of a Roman garrison commander at Vaga in Africa who was flogged and beheaded, *nam is civis ex Latio erat*, because he was only a Latin (Bellum Iugurthinum 66-67, in this app).`),
join('(In Verrem II.5.162-163)', 'analysisIt', `questo passo che fa da politica estera diciannove secoli dopo.`,
`La protezione aveva un limite netto: Sallustio racconta di un comandante di presidio romano a Vaga, in Africa, che fu fustigato e decapitato, *nam is civis ex Latio erat*, perché era soltanto un latino (Bellum Iugurthinum 66-67, in quest'app).`)
];

for (const [k, v] of Object.entries({ patch1171_sal: sal, patch1171_cic: cic })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags11(6|7)\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust, ' + cic.length + ' Cicero patches; ' + n + ' batch-file edits');
