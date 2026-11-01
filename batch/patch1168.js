// v1.16.8 - the other end of the cross-references made by the new notes:
// De Bello Gallico VI.11 points to Iug. 17; Iug. 15 and 14.20-25 point forward
// to 29 and 26-27.
//   node batch/patch1168.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1168_sal.json
//   node tools/patch_fields.js gaius-julius-caesar batch/patch1168_cae.json
const fs = require('fs');
const path = require('path');
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const swap = (cit, field, find, replace) => ({ cit, field, find, replace });
const before = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: text + '\n\n' + anchor });

const sal = [
swap(I(15), 'analysis', `he takes the money (chapter 29).`, `he takes the money (Bellum Iugurthinum 29).`),
swap(I(15), 'analysisIt', `prende il denaro (capitolo 29).`, `prende il denaro (Bellum Iugurthinum 29).`),
join(I('14.20-25'), 'analysis', `but the good name of Rome.`,
`Adherbal's own end came four years later at Cirta, tortured to death after a surrender the Italian traders had urged on him, trusting in the greatness of Rome (Bellum Iugurthinum 26-27).`),
join(I('14.20-25'), 'analysisIt', `ma il buon nome di Roma.`,
`La fine di Aderbale arrivò quattro anni dopo a Cirta, ucciso fra le torture dopo una resa che i mercanti italici gli avevano consigliato, fidando nella grandezza di Roma (Bellum Iugurthinum 26-27).`)
];

const cae = [
before('(De Bello Gallico VI.11)', 'analysis', `**Textual note:** the Latin Library prints *contra potentio rem`,
`**The same formula in Sallust.** Caesar's opening, *non alienum esse videtur ... proponere*, is the standard way a Roman historian announced a digression on a foreign land, and Sallust uses it a few years later for Africa: *res postulare videtur Africae situm paucis exponere*, the subject seems to call for a brief account of Africa (Bellum Iugurthinum 17, in this app). Both present the excursus as something the material demands, and both promise to keep it short.`),
before('(De Bello Gallico VI.11)', 'analysisIt', `**Nota testuale:** The Latin Library stampa *contra potentio rem`,
`**La stessa formula in Sallustio.** L'apertura di Cesare, *non alienum esse videtur ... proponere*, era il modo consueto con cui uno storico romano annunciava una digressione su una terra straniera, e Sallustio la usa pochi anni dopo per l'Africa: *res postulare videtur Africae situm paucis exponere*, l'argomento sembra richiedere un breve resoconto dell'Africa (Bellum Iugurthinum 17, in quest'app). Entrambi presentano l'excursus come qualcosa che la materia richiede, ed entrambi promettono di essere brevi.`)
];

for (const [k, v] of Object.entries({ patch1168_sal: sal, patch1168_cae: cae })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags116\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust, ' + cae.length + ' Caesar patches; ' + n + ' batch-file edits');
