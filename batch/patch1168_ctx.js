// v1.16.8 - check_context: name the Latin's proper names in the notes and give
// 18 and 19 a year. Run, then patch_fields with batch/patch1168_ctx.json.
const fs = require('fs');
const path = require('path');
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const add = (cit, field, end, more) => ({ cit, field, find: end, replace: end + ' ' + more });
const swap = (cit, field, find, replace) => ({ cit, field, find, replace });
const p = [
add(I(17), 'analysis', `*Penes auctores*: in the hands of the authorities.`,
`*Oceani*: the Ocean, the Atlantic beyond the strait. *Catabathmon*: a Greek accusative, the Catabathmos, "the descent", on the borders of Egypt.`),
add(I(17), 'analysisIt', `*Penes auctores*: nelle mani delle fonti.`,
`*Oceani*: l'Oceano, l'Atlantico oltre lo stretto. *Catabathmon*: accusativo greco, il Catabatmo, "la discesa", ai confini dell'Egitto.`),
swap(I(18), 'analysis', `The second chapter of the African excursus (Bellum Iugurthinum 17).`, `The second chapter of the African excursus, which pauses the story in 116 BC (Bellum Iugurthinum 17).`),
swap(I(18), 'analysisIt', `Il secondo capitolo dell'excursus africano (Bellum Iugurthinum 17).`, `Il secondo capitolo dell'excursus africano, che sospende il racconto nel 116 a.C. (Bellum Iugurthinum 17).`),
add(I(18), 'analysis', `*In gentem nomenque ... concessere*: passed into the race and name.`,
`*Libyes, Persae, Hispani*: Libyans, Persians, Spaniards, with *Persarum* the genitive plural. *Intra Oceanum magis*: further towards the Ocean, the Atlantic side.`),
add(I(18), 'analysisIt', `*In gentem nomenque ... concessere*: passarono nella stirpe e nel nome.`,
`*Libyes, Persae, Hispani*: Libi, Persiani, Spagnoli, con *Persarum* genitivo plurale. *Intra Oceanum magis*: più verso l'Oceano, il lato atlantico.`),
swap(I(19), 'analysis', `The last chapter of the African excursus (Bellum Iugurthinum 17 and 18).`, `The last chapter of the African excursus, which pauses the story in 116 BC (Bellum Iugurthinum 17 and 18).`),
swap(I(19), 'analysisIt', `L'ultimo capitolo dell'excursus africano (Bellum Iugurthinum 17 e 18).`, `L'ultimo capitolo dell'excursus africano, che sospende il racconto nel 116 a.C. (Bellum Iugurthinum 17 e 18).`),
add(I(19), 'analysis', `*Ad necessitudinem rei*: for the needs of the subject.`,
`*Ad Catabathmon*: Greek accusative of *Catabathmos*. *Usque ad Mauretaniam*: as far as Mauretania, the country of the Moors.`),
add(I(19), 'analysisIt', `*Ad necessitudinem rei*: per le necessità dell'argomento.`,
`*Ad Catabathmon*: accusativo greco di *Catabathmos*. *Usque ad Mauretaniam*: fino alla Mauretania, il paese dei Mauri.`),
swap(I('26-27'), 'analysis', `the consuls of 111 drew lots; Numidia went to Lucius Calpurnius Bestia.`,
`the consuls of 111, Publius Scipio Nasica and Lucius Calpurnius Bestia, drew lots; Numidia went to Bestia, Italy to Scipio.`),
swap(I('26-27'), 'analysisIt', `i consoli del 111 le tirano a sorte; la Numidia tocca a Lucio Calpurnio Bestia.`,
`i consoli del 111, Publio Scipione Nasica e Lucio Calpurnio Bestia, le tirano a sorte; la Numidia tocca a Bestia, l'Italia a Scipione.`),
add(I('26-27'), 'analysis', `*Quae bello usui forent*: double dative, useful for the war.`,
`*In Africam portaretur*: *in* with the accusative of motion, to be shipped to Africa.`),
add(I('26-27'), 'analysisIt', `*Quae bello usui forent*: doppio dativo, utili alla guerra.`,
`*In Africam portaretur*: *in* con l'accusativo di moto, da trasportare in Africa.`)
];
fs.writeFileSync(path.join(__dirname, 'patch1168_ctx.json'), JSON.stringify(p, null, 2));
let n = 0;
for (const x of p) {
  const hits = ['frags1168a.js', 'frags1168b.js'].filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(x.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + '): ' + x.find.slice(0, 50)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(x.find, () => x.replace)); n++;
}
console.log(p.length + ' patches; ' + n + ' batch-file edits');
