// v1.16.7 - the other end of the cross-references made by the new Iugurtha
// notes: Iug. 6 and 8 and Cat. 54 point forward, De Amicitia 64 points back.
//   node batch/patch1167.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1167_sal.json
//   node tools/patch_fields.js marcus-tullius-cicero batch/patch1167_cic.json
const fs = require('fs');
const path = require('path');
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });

const sal = [
join(I(6), 'analysis', `What Rome did was to make his crimes possible and profitable.`,
`The first of them follows soon, and it is the very thing Micipsa feared, a killing by treachery: Hiempsal murdered at night in a borrowed house (Bellum Iugurthinum 12).`),
join(I(6), 'analysisIt', `Ciò che fece Roma fu rendere i suoi delitti possibili e redditizi.`,
`Il primo arriva presto, ed è proprio ciò che Micipsa temeva, un'uccisione con l'inganno: Iempsale assassinato di notte in una casa presa in prestito (Bellum Iugurthinum 12).`),
after(I(8), 'analysis', `a city for sale and soon to perish, if it finds a buyer (35.10).`,
`**The lesson comes back.** Scipio's warning echoes through the chapters that follow. The dying Micipsa tells Jugurtha that friends can be bought neither with arms nor with gold (Bellum Iugurthinum 10); Adherbal fears that *privata amicitia* with Jugurtha will lead the senators astray (Bellum Iugurthinum 14.20-25); and the senate that answers him is the mirror image of the officers at Numantia, a few *quibus bonum et aequum divitiis carius erat* against the many who preferred money (Bellum Iugurthinum 15).`),
after(I(8), 'analysisIt', `se troverà un compratore (35.10).`,
`**La lezione ritorna.** L'avvertimento di Scipione risuona nei capitoli seguenti. Micipsa morente dice a Giugurta che gli amici non si comprano né con le armi né con l'oro (Bellum Iugurthinum 10); Aderbale teme che la *privata amicitia* con Giugurta porti fuori strada i senatori (Bellum Iugurthinum 14.20-25); e il senato che gli risponde è l'immagine allo specchio degli ufficiali di Numanzia, pochi *quibus bonum et aequum divitiis carius erat* contro i molti che preferivano il denaro (Bellum Iugurthinum 15).`),
join(C(54), 'analysis', `which Sallust has already let the younger man speak with (De Coniuratione Catilinae 52.19-23).`,
`The Iugurtha supplies the opposite type: Aemilius Scaurus, leader of the senate, *vitia sua callide occultans*, a man who preferred to seem good (Bellum Iugurthinum 15).`),
join(C(54), 'analysisIt', `con la cui voce Sallustio ha già fatto parlare il giovane (De Coniuratione Catilinae 52.19-23).`,
`Il Bellum Iugurthinum fornisce il tipo opposto: Emilio Scauro, capo del senato, *vitia sua callide occultans*, un uomo che preferiva sembrare buono (Bellum Iugurthinum 15).`)
];

const cic = [
join('(De Amicitia 64)', 'analysis', `because passing only one half of it is easy.`,
`Sallust's dying Micipsa states the royal version of the same creed - friends, not armies or treasure, are a kingdom's defence, and they cannot be bought with gold - and the rest of the Iugurtha shows how little it was worth in Roman politics (Bellum Iugurthinum 10, in this app).`),
join('(De Amicitia 64)', 'analysisIt', `perché superarne una metà sola è facile.`,
`Il Micipsa morente di Sallustio enuncia la versione regale dello stesso credo - sono gli amici, non gli eserciti o i tesori, la difesa di un regno, e non si comprano con l'oro - e il resto del Bellum Iugurthinum mostra quanto poco valesse nella politica romana (Bellum Iugurthinum 10, in quest'app).`)
];

for (const [k, v] of Object.entries({ patch1167_sal: sal, patch1167_cic: cic })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags116\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust, ' + cic.length + ' Cicero patches; ' + n + ' batch-file edits');
