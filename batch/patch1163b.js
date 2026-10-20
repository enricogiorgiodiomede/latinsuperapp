// v1.16.3 follow-up (21/10/2026): the user's notes on Catilina 25-37, folded
// into the five analyses, plus the comparison of Sallust's and Cicero's
// accounts of 8 November 63 BC, wired both ways with In Catilinam II.12-13.
//   node batch/patch1163b.js
//   node tools/patch_fields.js gaius-sallustius-crispus batch/patch1163b_sal.json
//   node tools/patch_fields.js marcus-tullius-cicero batch/patch1163b_cic.json
const fs = require('fs');
const path = require('path');
const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const after = (cit, field, anchor, text) => ({ cit, field, find: anchor, replace: anchor + '\n\n' + text });

const sal = [
// ---- 25 ----
after(C(25), 'analysis', `Sallust condemns her, and he cannot help being impressed.`,
`**A type more than a person.** Sempronia does almost nothing in the story, and the portrait is more general than particular. Its first job is to show that the conspiracy reached the women of Rome too (chapter 24 has just said so), and to give that fact a face. She is drawn as the typical Roman matron gone wrong: her gifts are greater than the role a Roman man expected of a matron, and her vices are mostly men's vices - daring, debt, perjury, complicity in murder. That is why she is dangerous, even though her part in the plot is marginal. *Nimis alta*, things too high, was what Catiline always wanted (chapter 5); Sempronia has abilities too great for the place her society gave her. She is the female counterpart of Catiline, on a smaller scale.`),
after(C(25), 'analysisIt', `Sallustio la condanna, e non può fare a meno di esserne colpito.`,
`**Un tipo più che una persona.** Sempronia nel racconto non fa quasi nulla, e il ritratto è più generale che particolare. Il suo primo compito è mostrare che la congiura arrivò anche alle donne di Roma (lo ha appena detto il capitolo 24), e dare un volto a questo fatto. È disegnata come la tipica matrona romana deviata: le sue doti sono più grandi del ruolo che un uomo romano si aspettava da una matrona, e i suoi vizi sono per lo più vizi da uomo - audacia, debiti, spergiuro, complicità in un omicidio. Ecco perché è pericolosa, anche se la sua parte nella congiura è marginale. *Nimis alta*, cose troppo alte, era ciò che Catilina desiderava sempre (capitolo 5); Sempronia ha capacità troppo grandi per il posto che la sua società le assegnava. È la controparte femminile di Catilina, in scala ridotta.`),

// ---- 31.4-9 ----
after(C('31.4-9'), 'analysis', `which is the background against which the debate of chapters 51 and 52 will be remarkable.`,
`**Attack the man, not the charge.** Look at what Catiline does not do: he does not answer a single accusation. He answers Cicero's class. A patrician of an ancient house against a *homo novus* from a country town: why would you believe a word from a man like that? It is the snobbery of chapter 23 used as a defence. And the threat at the end is pure Catiline. Chapter 5 said his boundless spirit always craved *nimis alta*, things too high; when he is cornered, he does not think of escape or compromise but of bringing the whole city down to put out his own fire. The man who wanted too much wants, at the last, to destroy everything.

**Two accounts of the same morning.** Cicero told the people his version the very next day, in the Second Catilinarian (In Catilinam II.12-13, in this app). There Catiline walks in and no senator greets him; the leading men leave the benches around him empty; and when the consul asks him whether he was at Laeca's house that night, he falls silent, *conscientia convictus*, convicted by his own conscience. In Cicero's account Catiline barely speaks. In Sallust's he speaks at length, pleads, insults the consul's birth, is shouted down and leaves with a threat. Each version serves its author. Cicero, the consul, needed Catiline isolated and speechless, a man who fled from the truth; Sallust, the historian, gives the enemy a voice, so that we can see how he worked on people and why he was dangerous. The truth is probably somewhere between: the threat about the fire, at least, Catiline really did make, because Cicero himself quotes it in another speech.`),
after(C('31.4-9'), 'analysisIt', `ed è lo sfondo su cui risulterà notevole il dibattito dei capitoli 51 e 52.`,
`**Attaccare l'uomo, non l'accusa.** Si guardi che cosa Catilina non fa: non risponde a nessuna accusa. Risponde alla classe sociale di Cicerone. Un patrizio di antica casata contro un *homo novus* di una cittadina di provincia: perché credere a una sola parola di un uomo così? È lo snobismo del capitolo 23 usato come difesa. E la minaccia finale è Catilina allo stato puro. Il capitolo 5 diceva che il suo animo smisurato desiderava sempre *nimis alta*, cose troppo alte; messo alle strette, non pensa alla fuga o al compromesso ma a far crollare l'intera città per spegnere il proprio incendio. L'uomo che voleva troppo vuole, alla fine, distruggere tutto.

**Due racconti della stessa mattina.** Cicerone raccontò al popolo la sua versione il giorno dopo, nella Seconda Catilinaria (In Catilinam II.12-13, in quest'app). Lì Catilina entra e nessun senatore lo saluta; i maggiorenti lasciano vuoti i banchi intorno a lui; e quando il console gli chiede se quella notte fosse in casa di Leca, ammutolisce, *conscientia convictus*, smascherato dalla propria coscienza. Nel racconto di Cicerone Catilina parla appena. In quello di Sallustio parla a lungo, supplica, insulta la nascita del console, viene zittito dalle grida ed esce con una minaccia. Ogni versione serve il suo autore. A Cicerone, il console, serviva un Catilina isolato e muto, un uomo che fuggiva davanti alla verità; Sallustio, lo storico, dà voce al nemico, perché si veda come agiva sulla gente e perché era pericoloso. La verità sta probabilmente nel mezzo: la minaccia dell'incendio, almeno, Catilina la fece davvero, perché la cita lo stesso Cicerone in un'altra orazione.`),

// ---- 33 ----
after(C(33), 'analysis', `this is the army he meant.`,
`**Good men with the wrong method?** Once again the rebels say they are fighting for freedom, freedom from a state corrupted by moneylenders and bought courts, and once again Sallust lets them look like the injured party who chose the wrong means. That tells us about the men themselves. Manlius and his soldiers are like Catiline on a smaller scale: real grievances, a language of liberty and dignity, and a readiness to burn everything if they do not get their way. It also tells us why they were dangerous. A rebellion of criminals can be crushed and forgotten; a rebellion of men with a case gathers followers.`),
after(C(33), 'analysisIt', `è questo l'esercito di cui parlava.`,
`**Brava gente con il metodo sbagliato?** Ancora una volta i ribelli dicono di combattere per la libertà, la libertà da uno stato corrotto dagli usurai e dai tribunali comprati, e ancora una volta Sallustio lascia che sembrino la parte offesa che ha scelto i mezzi sbagliati. Questo ci dice qualcosa degli uomini stessi. Manlio e i suoi soldati sono come Catilina in scala ridotta: rimostranze vere, un linguaggio di libertà e di dignità, e la disponibilità a bruciare tutto se non ottengono ciò che vogliono. Ci dice anche perché erano pericolosi. Una rivolta di criminali si schiaccia e si dimentica; una rivolta di uomini che hanno delle ragioni raccoglie seguaci.`),

// ---- 35 ----
after(C(35), 'analysis', `the deed - a march on Rome at the head of an army - disappears behind them.`,
`**Catiline as he saw himself.** This is Catiline at his most human, and the letter is written within hours of the First Catilinarian, which explains its target. He presents the whole conspiracy as the defence of wounded pride: unworthy men are showered with honours and run the state, while worthy ones are kept out. The unworthy man he cannot stand is Cicero, the *homo novus*, an equestrian from Arpinum governing patricians, the same man he had just called a lodger in the senate (De Coniuratione Catilinae 31.4-9). Read on its own terms, the letter makes him a hero who tried to cure the corruption of Rome. One way to put the result is that the intent was noble and the method monstrous. Sallust lets us take Catiline at his word for exactly one page, and the rest of the book is there to show us what the word was worth.`),
after(C(35), 'analysisIt', `l'azione - una marcia su Roma alla testa di un esercito - sparisce dietro di esse.`,
`**Catilina come vedeva se stesso.** È Catilina nel suo momento più umano, e la lettera è scritta poche ore dopo la Prima Catilinaria, il che spiega il suo bersaglio. Presenta l'intera congiura come la difesa di un orgoglio ferito: uomini indegni sono coperti di onori e governano lo stato, mentre quelli degni ne sono esclusi. L'uomo indegno che non riesce a sopportare è Cicerone, l'*homo novus*, un cavaliere di Arpino che governa dei patrizi, lo stesso uomo che aveva appena chiamato inquilino in senato (De Coniuratione Catilinae 31.4-9). Presa alla lettera, la lettera ne fa un eroe che tentò di guarire la corruzione di Roma. Si potrebbe dire che l'intenzione era nobile e il metodo mostruoso. Sallustio ci lascia credere a Catilina sulla parola per una sola pagina, e il resto del libro serve a mostrarci quanto valesse quella parola.`),

// ---- 37 ----
after(C(37), 'analysis', `They had ruined themselves already.`,
`**Sulla's long shadow, and a city far gone.** This digression says outright what the first one began to say: Sulla's victory was enough, by itself, to corrupt the city and push a part of its citizens towards Catiline. Count the appearances. Sulla's tyranny gave Catiline his ambition (chapter 5); Sulla's army learned looting in Asia (chapter 11); and here Sulla's veterans dream of another civil war and the children of his victims wait for revenge (sections 6 and 9). And remember the fact this chapter was written to explain: not one conspirator betrayed the plot for the reward, not one deserted Catiline's camp. When the whole city is sick and nobody deserts the man promising to burn it, Rome is in a desperate state.`),
after(C(37), 'analysisIt', `Si erano già rovinati.`,
`**La lunga ombra di Silla, e una città allo stremo.** Questa digressione dice apertamente ciò che la prima aveva cominciato a dire: la vittoria di Silla bastò da sola a corrompere la città e a spingere una parte dei suoi cittadini verso Catilina. Si contino le comparse. La tirannide di Silla diede a Catilina la sua ambizione (capitolo 5); l'esercito di Silla imparò il saccheggio in Asia (capitolo 11); e qui i veterani di Silla sognano un'altra guerra civile e i figli delle sue vittime aspettano la rivincita (paragrafi 6 e 9). E si ricordi il fatto che questo capitolo era stato scritto per spiegare: nessun congiurato tradì il piano per la ricompensa, nessuno disertò il campo di Catilina. Quando tutta la città è malata e nessuno abbandona l'uomo che promette di bruciarla, Roma è ridotta allo stremo.`)
];

const cic = [
{ cit: '(In Catilinam II.12-13)', field: 'analysis',
  find: `This is the same confrontation described from the other side in the first speech at 8-9.`,
  replace: `This is the same confrontation described from the other side in the first speech at 8-9. Sallust tells the session differently: in his version Catiline does not fall silent but answers back, sneers at the consul as a lodger in Rome and walks out threatening ruin (De Coniuratione Catilinae 31.4-9, in this app).` },
{ cit: '(In Catilinam II.12-13)', field: 'analysisIt',
  find: `È lo stesso confronto descritto dall'altro lato nella prima orazione, ai paragrafi 8-9.`,
  replace: `È lo stesso confronto descritto dall'altro lato nella prima orazione, ai paragrafi 8-9. Sallustio racconta la seduta in un altro modo: nella sua versione Catilina non ammutolisce ma ribatte, schernisce il console come inquilino di Roma ed esce minacciando la rovina (De Coniuratione Catilinae 31.4-9, in quest'app).` }
];

fs.writeFileSync(path.join(__dirname, 'patch1163b_sal.json'), JSON.stringify(sal, null, 2));
fs.writeFileSync(path.join(__dirname, 'patch1163b_cic.json'), JSON.stringify(cic, null, 2));
const f = path.join(__dirname, 'frags1163.js');
let s = fs.readFileSync(f, 'utf8');
for (const p of sal) { if (s.split(p.find).length !== 2) throw new Error('frags1163.js: ' + p.find.slice(0, 50)); s = s.replace(p.find, () => p.replace); }
fs.writeFileSync(f, s);
console.log(sal.length + ' Sallust and ' + cic.length + ' Cicero patches; batch file in step');
