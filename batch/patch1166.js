// v1.16.6 - the other end of the cross-references made by the first Iugurtha
// notes: Catilina 1, 3.3-4.5, 5, 10 and Iugurtha 85.10-17 point forward, and
// Pro Archia 14, De Amicitia 102 and De Rerum Natura III 830-842 point back.
//   node batch/patch1166.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1166_sal.json
//   node tools/patch_fields.js marcus-tullius-cicero batch/patch1166_cic.json
//   node tools/patch_fields.js titus-lucretius-carus batch/patch1166_luc.json
const fs = require('fs');
const path = require('path');
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });

const sal = [
join(C(1), 'analysis', `and has put both to work for appetite.`,
`The Iugurtha opens on the same idea a few years later, with the mind as *dux atque imperator vitae*, the leader and commander of life (Bellum Iugurthinum 1).`),
join(C(1), 'analysisIt', `e ha messo l'una e l'altra al servizio dell'appetito.`,
`Il Bellum Iugurthinum si apre sulla stessa idea pochi anni dopo, con l'animo come *dux atque imperator vitae*, guida e comandante della vita (Bellum Iugurthinum 1).`),
join(C('3.3-4.5'), 'analysis', `but that he has had the disease and walked away from it.`,
`He makes the same defence of his retirement at the start of the Iugurtha, against critics who call it idleness (Bellum Iugurthinum 4), and there too he explains why he chose his subject (Bellum Iugurthinum 5).`),
join(C('3.3-4.5'), 'analysisIt', `ma perché la malattia l'ha avuta e se ne è allontanato.`,
`Fa la stessa difesa del suo ritiro all'inizio del Bellum Iugurthinum, contro i critici che lo chiamano ozio (Bellum Iugurthinum 4), e anche lì spiega perché ha scelto il suo argomento (Bellum Iugurthinum 5).`),
join(C(5), 'analysis', `with the old fierceness still on his face (De Coniuratione Catilinae 61).`,
`The Iugurtha's first portrait of its hero is built on the same frame and turns the other way: there the *sed* brings more praise, not the vice (Bellum Iugurthinum 6).`),
join(C(5), 'analysisIt', `con l'antica fierezza ancora sul volto (De Coniuratione Catilinae 61).`,
`Il primo ritratto del protagonista del Bellum Iugurthinum è costruito sulla stessa struttura e gira nell'altro senso: lì il *sed* porta altra lode, non il vizio (Bellum Iugurthinum 6).`),
after(C(10), 'analysis', `a school edition may print the manuscripts' order.`,
`**Exported.** Thirteen years after Carthage fell, at Numantia, Roman officers taught the young Jugurtha the same lesson in four words, *Romae omnia venalia esse*, at Rome everything is for sale (Bellum Iugurthinum 8).`),
after(C(10), 'analysisIt', `un'edizione scolastica può stampare l'ordine dei manoscritti.`,
`**Esportata.** Tredici anni dopo la caduta di Cartagine, a Numanzia, ufficiali romani insegnarono al giovane Giugurta la stessa lezione in quattro parole, *Romae omnia venalia esse*, a Roma tutto è in vendita (Bellum Iugurthinum 8).`),
join(I('85.10-17'), 'analysis', `and only fear overcame it (De Coniuratione Catilinae 23, in this app).`,
`Sallust had made the same point in his own voice in the preface, with the ancestor masks that set the old nobles on fire for virtue and the new men who now climbed by robbery (Bellum Iugurthinum 4).`),
join(I('85.10-17'), 'analysisIt', `e solo la paura lo vinse (De Coniuratione Catilinae 23, in quest'app).`,
`Sallustio aveva detto la stessa cosa con la propria voce nel proemio, con le maschere degli antenati che accendevano alla virtù i nobili di un tempo e gli uomini nuovi che ora salivano rubando (Bellum Iugurthinum 4).`)
];

const cic = [
join('(Pro Archia 14)', 'analysis', `produced from memory at the moment they are needed.`,
`Twenty years later Sallust made the same argument for history with the wax masks of the ancestors: it was not the wax that set great men on fire for virtue, but the memory of great deeds (Bellum Iugurthinum 4, in this app).`),
join('(Pro Archia 14)', 'analysisIt', `tirati fuori a memoria nel momento in cui servono.`,
`Vent'anni dopo Sallustio fece lo stesso ragionamento per la storia con le maschere di cera degli antenati: non era la cera ad accendere alla virtù i grandi uomini, ma il ricordo delle grandi imprese (Bellum Iugurthinum 4, in quest'app).`),
join('(De Amicitia 102)', 'analysis', `a way of writing about his own hope of being remembered.`,
`Sallust shows the same Scipio in 133 BC, after Numantia, taking the young Jugurtha aside to warn him against buying private friends at Rome (Bellum Iugurthinum 8, in this app).`),
join('(De Amicitia 102)', 'analysisIt', `un modo di scrivere della propria speranza di essere ricordato.`,
`Sallustio mostra lo stesso Scipione nel 133 a.C., dopo Numanzia, mentre prende in disparte il giovane Giugurta per metterlo in guardia contro l'acquisto di amici privati a Roma (Bellum Iugurthinum 8, in quest'app).`)
];

const luc = [
join('(De Rerum Natura III, vv. 830-842)', 'analysis', `the pontifex maximus said it aloud to the Roman senate.`,
`Sallust, writing a few years after Lucretius, gave the Roman answer to the same fear: not indifference to the end but the hope that glory makes mortals eternal (Bellum Iugurthinum 1, in this app).`),
join('(De Rerum Natura III, vv. 830-842)', 'analysisIt', `il pontefice massimo la pronunciò ad alta voce davanti al senato di Roma.`,
`Sallustio, scrivendo pochi anni dopo Lucrezio, diede alla stessa paura la risposta romana: non l'indifferenza verso la fine, ma la speranza che la gloria renda eterni i mortali (Bellum Iugurthinum 1, in quest'app).`)
];

for (const [k, v] of Object.entries({ patch1166_sal: sal, patch1166_cic: cic, patch1166_luc: luc })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags116\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust, ' + cic.length + ' Cicero, ' + luc.length + ' Lucretius patches; ' + n + ' batch-file edits');
