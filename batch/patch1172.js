// v1.16.12: the new Iugurtha notes (85.29-37, 86, 91, 93, 95-96) wired both
// ways to the passages they cite.
//   node batch/patch1172.js
//   then patch_fields for each of the four JSON files it writes
const fs = require('fs');
const path = require('path');
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';

const sal = [
// Cat. 5 <- 85.29-37 (the soldier's endurance) and 95-96 (the gift for hiding plans)
join(C(5), 'analysis', `as long as it would win him favour (Bellum Iugurthinum 64).`,
`Two more echoes in the Iugurtha: Marius's boast that he learned to bear winter and summer, hunger and toil is almost Catiline's list of endurance (Bellum Iugurthinum 85.29-37), and Sulla is given Catiline's gift, an unbelievable depth of mind for hiding his plans (Bellum Iugurthinum 95-96).`),
join(C(5), 'analysisIt', `purché gli procurasse favore (Bellum Iugurthinum 64).`,
`Altri due echi nel Bellum Iugurthinum: il vanto di Mario di aver imparato a sopportare l'inverno e l'estate, la fame e la fatica è quasi l'elenco della resistenza di Catilina (Bellum Iugurthinum 85.29-37), e a Silla è dato il dono di Catilina, un'incredibile profondità d'ingegno nel nascondere i propri piani (Bellum Iugurthinum 95-96).`),
// Cat. 11 <- 95-96 (Sulla's portrait)
join(C(11), 'analysis', `bought its bread by the day (Bellum Iugurthinum 44).`,
`Sallust's only full portrait of Sulla, as Marius's young quaestor in Africa, shows the same arts at their start: generous with money, making as many soldiers as possible his debtors (Bellum Iugurthinum 95-96).`),
join(C(11), 'analysisIt', `comprava il pane giorno per giorno (Bellum Iugurthinum 44).`,
`L'unico ritratto completo di Silla in Sallustio, come giovane questore di Mario in Africa, mostra le stesse arti ai loro inizi: generoso di denaro, intento a rendersi debitori quanti più soldati possibile (Bellum Iugurthinum 95-96).`),
// Iug. 1 <- 93 (fortune and virtue)
join(I(1), 'analysis', `how much of that was fortune and how much his own choice.`,
`The book's honest exception comes when Marius, stuck before a fortress, is saved by a Ligurian soldier hunting snails (Bellum Iugurthinum 93).`),
join(I(1), 'analysisIt', `quanto di questo sia stato fortuna e quanto scelta sua.`,
`L'eccezione onesta del libro arriva quando Mario, bloccato davanti a una fortezza, è salvato da un soldato ligure a caccia di lumache (Bellum Iugurthinum 93).`),
// Iug. 4 <- 85.29-37 (the masks)
join(I(4), 'analysis', `they have the masks, he has the deeds (Bellum Iugurthinum 85.10-17).`,
`In the second half of the speech he says it in five words, pointing to his scars: *hae sunt meae imagines*, these are my masks (Bellum Iugurthinum 85.29-37).`),
join(I(4), 'analysisIt', `loro hanno le maschere, lui ha le imprese (Bellum Iugurthinum 85.10-17).`,
`Nella seconda metà del discorso lo dice in cinque parole, indicando le sue cicatrici: *hae sunt meae imagines*, queste sono le mie immagini (Bellum Iugurthinum 85.29-37).`),
// Iug. 85.10-17 <- 85.29-37 (the second half of the speech)
join(I('85.10-17'), 'analysis', `and Sallust has made sure the reader already has it.`,
`The second half of the speech, with the scars as ancestor masks, is in the next excerpt (Bellum Iugurthinum 85.29-37).`),
join(I('85.10-17'), 'analysisIt', `e Sallustio ha fatto in modo che il lettore ce l'abbia già.`,
`La seconda metà del discorso, con le cicatrici come immagini degli antenati, è nel brano successivo (Bellum Iugurthinum 85.29-37).`),
// Iug. 66-67 <- 91 (the same words for another Numidian town)
join(I('66-67'), 'analysis', `tempting even the soldiers of the Roman garrisons.`,
`Sallust uses the same words, *mobile, infidum*, to excuse Marius's destruction of Capsa, a town that had already surrendered (Bellum Iugurthinum 91).`),
join(I('66-67'), 'analysisIt', `che tentava perfino i soldati dei presidi romani.`,
`Sallustio usa le stesse parole, *mobile, infidum*, per giustificare la distruzione di Capsa da parte di Mario, una città che si era già arresa (Bellum Iugurthinum 91).`),
// Iug. 64 <- 95-96 (the dig at Marius)
join(I(64), 'analysis', `the arrogance of the nobles was his theme (Bellum Iugurthinum 85.10-17).`,
`And when Sallust praises Marius's quaestor Sulla, he praises him for not doing what Marius had done here: damaging the reputation of his commander (Bellum Iugurthinum 95-96).`),
join(I(64), 'analysisIt', `la superbia dei nobili fu il suo tema (Bellum Iugurthinum 85.10-17).`,
`E quando Sallustio loda Silla, il questore di Mario, lo loda proprio per non aver fatto ciò che Mario aveva fatto qui: danneggiare la reputazione del suo comandante (Bellum Iugurthinum 95-96).`),
// Iug. 63 <- 93 (try your fortune)
join(I(63), 'analysis', `and the election of 107 shows how it was beaten (Bellum Iugurthinum 73).`,
`The soothsayer's advice to try his fortune is answered, two years later, in the oddest way: by a soldier hunting snails (Bellum Iugurthinum 93).`),
join(I(63), 'analysisIt', `e l'elezione del 107 mostra come fu sconfitto (Bellum Iugurthinum 73).`,
`Il consiglio dell'aruspice di mettere alla prova la fortuna trova risposta, due anni dopo, nel modo più strano: grazie a un soldato a caccia di lumache (Bellum Iugurthinum 93).`)
];

const cic = [
join('(Pro Archia 14)', 'analysis', `but the memory of great deeds (Bellum Iugurthinum 4, in this app).`,
`And Marius, Cicero's fellow townsman from Arpinum, gave the opposite answer to the same snobbery: he never learned Greek, since it had done nothing for the virtue of its teachers, and his scars were his masks (Bellum Iugurthinum 85.29-37, in this app).`),
join('(Pro Archia 14)', 'analysisIt', `ma il ricordo delle grandi imprese (Bellum Iugurthinum 4, in quest'app).`,
`E Mario, concittadino di Cicerone di Arpino, diede la risposta opposta allo stesso snobismo: non imparò mai il greco, perché non aveva giovato alla virtù di chi lo insegnava, e le sue cicatrici erano le sue maschere (Bellum Iugurthinum 85.29-37, in quest'app).`)
];

const cae = [
join('(De Bello Civili I.7)', 'analysis', `which man in this story crossed a line first.`,
`Behind the speech stands an army of a kind Marius had created nearly sixty years earlier, enrolling the propertyless poor who depended on their general for everything (Bellum Iugurthinum 86, in this app).`),
join('(De Bello Civili I.7)', 'analysisIt', `quale dei due uomini abbia oltrepassato per primo un limite.`,
`Dietro il discorso c'è un esercito del tipo che Mario aveva creato quasi sessant'anni prima, arruolando i poveri senza patrimonio che dipendevano in tutto dal loro generale (Bellum Iugurthinum 86, in quest'app).`)
];

const hir = [
join('(De Bello Gallico VIII.44)', 'analysis', `has told you in advance why it was reasonable.`,
`Sallust does the same for Marius at Capsa in 107 BC: he names the act as *contra ius belli*, against the law of war, and then explains why it was not greed or cruelty (Bellum Iugurthinum 91, in this app).`),
join('(De Bello Gallico VIII.44)', 'analysisIt', `vi ha detto in anticipo perché fosse ragionevole.`,
`Sallustio fa lo stesso per Mario a Capsa nel 107 a.C.: chiama l'atto *contra ius belli*, contro il diritto di guerra, e poi spiega perché non fu avidità né crudeltà (Bellum Iugurthinum 91, in quest'app).`)
];

for (const [k, v] of Object.entries({ patch1172_sal: sal, patch1172_cic: cic, patch1172_cae: cae, patch1172_hir: hir })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
let n = 0;
for (const p of sal) {
  const hits = fs.readdirSync(__dirname).filter(f => /^frags11(6|7)\d.*\.js$/.test(f))
    .filter(f => fs.readFileSync(path.join(__dirname, f), 'utf8').split(p.find).length === 2);
  if (hits.length !== 1) { console.log('batch file not updated (' + hits.length + ' hits): ' + p.find.slice(0, 60)); continue; }
  const f = path.join(__dirname, hits[0]);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(p.find, () => p.replace)); n++;
}
console.log(sal.length + ' Sallust, ' + cic.length + ' Cicero, ' + cae.length + ' Caesar, ' + hir.length + ' Hirtius patches; ' + n + ' batch-file edits');
