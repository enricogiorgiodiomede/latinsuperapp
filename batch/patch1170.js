// v1.16.10: the new Iugurtha notes (41, 42, 44, 51, 63) wired both ways to the
// passages they cite.
//   node batch/patch1170.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1170_sal.json
//   node tools/patch_fields.js marcus-tullius-cicero batch/patch1170_cic.json
const fs = require('fs');
const path = require('path');
const join = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + ' ' + text });
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';

const sal = [
// Cat. 5 <- Iug. 44 (the army that bears neither danger nor toil)
join(C(5), 'analysis', `there the *sed* brings more praise, not the vice (Bellum Iugurthinum 6).`,
`And Catiline's endurance has an exact negative in the Iugurtha: the army Metellus inherited in Africa was *neque periculi neque laboris patiens*, able to bear neither danger nor toil (Bellum Iugurthinum 44).`),
join(C(5), 'analysisIt', `lì il *sed* porta altra lode, non il vizio (Bellum Iugurthinum 6).`,
`E la resistenza di Catilina ha un esatto negativo nel Bellum Iugurthinum: l'esercito che Metello ereditò in Africa era *neque periculi neque laboris patiens*, incapace di sopportare il pericolo e la fatica (Bellum Iugurthinum 44).`),
// Cat. 10 <- Iug. 41 (metus hostilis)
join(C(10), 'analysis', `*Romae omnia venalia esse*, at Rome everything is for sale (Bellum Iugurthinum 8).`,
`And the Iugurtha states the theory behind this chapter in two words, *metus hostilis*: while Carthage stood, fear of the enemy kept Rome in good conduct; once the fear was gone, peace and plenty split the city into two parties (Bellum Iugurthinum 41).`),
join(C(10), 'analysisIt', `*Romae omnia venalia esse*, a Roma tutto è in vendita (Bellum Iugurthinum 8).`,
`E il Bellum Iugurthinum enuncia in due parole la teoria che sta dietro questo capitolo, *metus hostilis*: finché Cartagine era in piedi, la paura del nemico manteneva Roma nelle buone pratiche; scomparsa la paura, la pace e l'abbondanza divisero la città in due partiti (Bellum Iugurthinum 41).`),
// Cat. 11 <- Iug. 44 (the army's decline)
join(C(11), 'analysis', `The two writers disagree about almost everything else, and here they say the same thing.`,
`The army's decline did not begin with Sulla: a generation earlier, in Africa, the consul Metellus took over an army that sold its own grain and bought its bread by the day (Bellum Iugurthinum 44).`),
join(C(11), 'analysisIt', `I due scrittori sono in disaccordo su quasi tutto il resto, e qui dicono la stessa cosa.`,
`La decadenza dell'esercito non cominciò con Silla: una generazione prima, in Africa, il console Metello prese in consegna un esercito che vendeva il proprio grano e comprava il pane giorno per giorno (Bellum Iugurthinum 44).`),
// Cat. 38 <- Iug. 41 (both sides to blame)
join(C(38), 'analysis', `the most visible one, not the only one.`,
`The Iugurtha traces that story to its start: after Carthage fell, the nobility turned its dignity and the people its liberty into licence, and the state between them was torn apart (Bellum Iugurthinum 41).`),
join(C(38), 'analysisIt', `il più visibile, non l'unico.`,
`Il Bellum Iugurthinum risale all'inizio di quella storia: caduta Cartagine, la nobiltà volse in arbitrio la propria dignità e il popolo la propria libertà, e lo stato che stava fra loro fu dilaniato (Bellum Iugurthinum 41).`),
// Cat. 58.8-21 <- Iug. 51 (everything in their arms)
join(C('58.8-21'), 'analysis', `corruption cannot be beaten that way, head on with swords.`,
`The argument that there is nowhere to run is a general's commonplace, and Sallust gives it to the honest Metellus too, in three words at the Muthul: *in armis omnia sita*, everything lay in their arms (Bellum Iugurthinum 51).`),
join(C('58.8-21'), 'analysisIt', `la corruzione non si sconfigge così, di petto, con le spade.`,
`L'argomento che non c'è via di fuga è un luogo comune dei generali, e Sallustio lo dà anche all'onesto Metello, in tre parole al Muthul: *in armis omnia sita*, tutto stava nelle armi (Bellum Iugurthinum 51).`),
// Cat. 60 <- Iug. 51 (the other battle)
join(C(60), 'analysis', `and he shows it against a Roman army.`,
`The Iugurtha's great battle, at the river Muthul, is written in the same style, with the historic infinitives given to Jugurtha going round his men and trying everything (Bellum Iugurthinum 51).`),
join(C(60), 'analysisIt', `e la mostra contro un esercito romano.`,
`La grande battaglia del Bellum Iugurthinum, presso il fiume Muthul, è scritta nello stesso stile, con gli infiniti storici affidati a Giugurta che gira fra i suoi e tenta ogni cosa (Bellum Iugurthinum 51).`),
// Iug. 85.10-17 <- Iug. 63 (the portrait of Marius)
join('(Bellum Iugurthinum 85.10-17)', 'analysis', `the new men who now climbed by robbery (Bellum Iugurthinum 4).`,
`And Sallust had already drawn the man in his own portrait: trained on campaigns, not in Greek eloquence, and shut out of the consulship by a nobility that passed it from hand to hand (Bellum Iugurthinum 63).`),
join('(Bellum Iugurthinum 85.10-17)', 'analysisIt', `gli uomini nuovi che ora salivano rubando (Bellum Iugurthinum 4).`,
`E Sallustio aveva già disegnato l'uomo nel proprio ritratto: formato nelle campagne militari, non nell'eloquenza greca, ed escluso dal consolato da una nobiltà che se lo passava di mano in mano (Bellum Iugurthinum 63).`)
];

const cic = [
// In Cat. I.3 <- Iug. 42 (the Gracchi seen from the other side)
join('(In Catilinam I.3)', 'analysis', `This paragraph is where the trap is set, in his own words.`,
`Sallust saw the same killing from the other side: for him the Gracchi were nobles who put true glory before unjust power, beaten by worse means than their own, and the nobility's victory won it more fear than power (Bellum Iugurthinum 42, in this app).`),
join('(In Catilinam I.3)', 'analysisIt', `È in questo paragrafo che la trappola viene armata, con parole sue.`,
`Sallustio vedeva la stessa uccisione dall'altra parte: per lui i Gracchi erano nobili che anteponevano la vera gloria al potere ingiusto, sconfitti con mezzi peggiori dei loro, e la vittoria della nobiltà le procurò più paura che potere (Bellum Iugurthinum 42, in quest'app).`),
// In Pisonem XIX <- Iug. 63 (Marius before the fall)
join('(In Pisonem, ch. XIX)', 'analysis', `because Cicero wanted to insult a man and disown the insult in the same breath.`,
`Marius was a fellow townsman of Cicero's from Arpinum, and Sallust's portrait of him as a young officer, honest, tireless and shut out of the consulship by the nobles, carries a warning in a parenthesis: later he was driven headlong by ambition (Bellum Iugurthinum 63, in this app).`),
join('(In Pisonem, ch. XIX)', 'analysisIt', `perché Cicerone voleva insultare un uomo e rinnegare l'insulto con lo stesso fiato.`,
`Mario era concittadino di Cicerone, di Arpino, e il ritratto che Sallustio fa di lui da giovane ufficiale, onesto, instancabile ed escluso dal consolato dai nobili, contiene un avvertimento in un inciso: in seguito fu trascinato a precipizio dall'ambizione (Bellum Iugurthinum 63, in quest'app).`)
];

for (const [k, v] of Object.entries({ patch1170_sal: sal, patch1170_cic: cic })) fs.writeFileSync(path.join(__dirname, k + '.json'), JSON.stringify(v, null, 2));
console.log(sal.length + ' Sallust, ' + cic.length + ' Cicero patches');
