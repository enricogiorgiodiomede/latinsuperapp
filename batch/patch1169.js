// v1.16.9 - the other end of the cross-references made by the new notes.
//   node batch/patch1169.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1169_sal.json
//   node tools/patch_fields.js marcus-tullius-cicero batch/patch1169_cic.json
//   node tools/patch_fields.js gaius-julius-caesar batch/patch1169_cae.json
const fs = require('fs');
const path = require('path');
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });
const swap = (cit, field, find, replace) => ({ cit, field, find, replace });

const sal = [
join(C('20.2-8'), 'analysis', `which the second half (De Coniuratione Catilinae 20.9-17, the next excerpt) will push to its limit.`,
`In the Iugurtha the tribune Memmius takes the same formula and turns it against the nobility: wanting, hating and fearing the same things is friendship among good men, but among bad men it is faction (Bellum Iugurthinum 31.9-16).`),
join(C('20.2-8'), 'analysisIt', `che la seconda metà (De Coniuratione Catilinae 20.9-17, il brano successivo) spingerà fino al limite.`,
`Nel Bellum Iugurthinum il tribuno Memmio riprende la stessa formula e la rivolge contro la nobiltà: desiderare, odiare e temere le stesse cose è amicizia fra i buoni, ma fra i malvagi è fazione (Bellum Iugurthinum 31.9-16).`),
join(C('52.7-12'), 'analysis', `For all its words, his speech is a call to stop talking and act.`,
`Sallust gives the same words to the other side of Roman politics: the tribune Memmius warns the people not to go on *ignoscendo malis bonos perditum eatis*, to ruin the good by forgiving the bad (Bellum Iugurthinum 31.21-29).`),
join(C('52.7-12'), 'analysisIt', `il suo discorso è un invito a smettere di parlare e ad agire.`,
`Sallustio dà le stesse parole all'altra parte della politica romana: il tribuno Memmio avverte il popolo di non andare *ignoscendo malis bonos perditum eatis*, a mandare in rovina i buoni perdonando i malvagi (Bellum Iugurthinum 31.21-29).`),
swap(I('26-27'), 'analysis', `blocked by a tribune Jugurtha has bought (chapter 34)`, `blocked by a tribune Jugurtha has bought (Bellum Iugurthinum 33-34)`),
swap(I('26-27'), 'analysisIt', `bloccata da un tribuno comprato da Giugurta (capitolo 34)`, `bloccata da un tribuno comprato da Giugurta (Bellum Iugurthinum 33-34)`),
join(I(8), 'analysis', `against the many who preferred money (Bellum Iugurthinum 15).`,
`And the sentence returns in Jugurtha's own mouth, as he leaves Rome in 110 BC: *urbem venalem et mature perituram, si emptorem invenerit* (Bellum Iugurthinum 35).`),
join(I(8), 'analysisIt', `contro i molti che preferivano il denaro (Bellum Iugurthinum 15).`,
`E la frase ritorna in bocca a Giugurta stesso, mentre lascia Roma nel 110 a.C.: *urbem venalem et mature perituram, si emptorem invenerit* (Bellum Iugurthinum 35).`)
];

const cic = [
join('(De Amicitia 20)', 'analysis', `which is friendship reduced to complicity (De Coniuratione Catilinae 20.2-8, in this app).`,
`In the Iugurtha the tribune Memmius draws the line explicitly: the same bond, wanting, hating and fearing the same things, *inter bonos amicitia, inter malos factio est*, is friendship among good men and faction among bad (Bellum Iugurthinum 31.9-16, in this app).`),
join('(De Amicitia 20)', 'analysisIt', `cioè l'amicizia ridotta a complicità (De Coniuratione Catilinae 20.2-8, in quest'app).`,
`Nel Bellum Iugurthinum il tribuno Memmio traccia esplicitamente il confine: lo stesso legame, desiderare, odiare e temere le stesse cose, *inter bonos amicitia, inter malos factio est*, è amicizia fra i buoni e fazione fra i malvagi (Bellum Iugurthinum 31.9-16, in quest'app).`)
];

const cae = [
after('(De Bello Civili II.42)', 'analysis', `Mercy is a policy that can be undone by an error, and this is the chapter where it is.`,
`**Aulus's choice.** Sixty years earlier another Roman army was trapped in Africa by a Numidian king, and its commander chose the other way. In 110 BC Aulus Albinus, his camp betrayed by bribed centurions, accepted Jugurtha's terms and sent his army under the yoke to save their lives (Bellum Iugurthinum 38, in this app). Curio would not survive his army. The two scenes are worth reading side by side.`),
after('(De Bello Civili II.42)', 'analysisIt', `La clemenza è una politica che un errore può disfare, e questo è il capitolo in cui la disfa.`,
`**La scelta di Aulo.** Sessant'anni prima un altro esercito romano fu intrappolato in Africa da un re numida, e il suo comandante scelse l'altra strada. Nel 110 a.C. Aulo Albino, con il campo tradito da centurioni corrotti, accettò le condizioni di Giugurta e mandò il suo esercito sotto il giogo per salvargli la vita (Bellum Iugurthinum 38, in quest'app). Curione non volle sopravvivere al suo esercito. Vale la pena leggere le due scene una accanto all'altra.`)
];

for (const [k, v] of Object.entries({ patch1169_sal: sal, patch1169_cic: cic, patch1169_cae: cae })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags116\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust, ' + cic.length + ' Cicero, ' + cae.length + ' Caesar patches; ' + n + ' batch-file edits');
