// v1.16.14, job 1: the paragraphs and sentences added to the Sallust notes after
// their release (the user's notes, folded in as follow-ups, and the
// cross-references wired in by later releases) had all been appended just before
// the Grammar notes. This moves each one to where it belongs in the order of the
// analysed text: a paragraph after the paragraph on the same sections, a
// cross-reference sentence into the paragraph it comments on. English and
// Italian notes have the same paragraphs in the same order, so the same
// permutation is applied to both; a sentence is found in each language by the
// citation it carries.
//   node batch/reorder1174.js
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'js', 'fragments.js');

const C = (n) => '(De Coniuratione Catilinae ' + n + ')';
const I = (n) => '(Bellum Iugurthinum ' + n + ')';
const SAL = 'gaius-sallustius-crispus';
// [paragraph to move, paragraph it goes after] - English bold titles (prefixes)
const ORDER = {
  [C(5)]: [['Where the portrait ends', 'The first clause sets the pattern']],
  [C(7)]: [['When did this Rome end?', 'The claim is that freedom']],
  [C(9)]: [['Read it with chapter 7', 'What it says']],
  [C(10)]: [['Sallust described extinction', 'The thesis is that Rome'], ['A note on the text', 'Two vices, and each one teaches'], ['Exported', 'Was 146 BC really the year?']],
  [C(11)]: [['Lucretius says the same about greed', 'Greed is a poison'], ['What is wrong is not the admiring', 'The army that learned to admire'], ["Caesar saw the same thing in Pompey's camp", 'What is wrong is not the admiring']],
  [C(12)]: [['This is not neutral', 'A walk through Rome']],
  [C(13)]: [['Twice in the first person', 'Mountains and seas']],
  [C(14)]: [['Two kinds of follower', 'How the young were caught']],
  [C(15)]: [['The most prominent symptom', 'Against human and divine law'], ['From one man to a war', 'The most prominent symptom']],
  [C(22)]: [['An initiation, in the right order', 'A rumour reported']],
  [C(25)]: [['A type more than a person', 'Where we are']],
  [C('31.4-9')]: [['Attack the man, not the charge', "Catiline's reply is the portrait in action"], ['Two accounts of the same morning', 'Then the mask slips']],
  [C(35)]: [['Catiline as he saw himself', 'The language of wounded honour']],
  [C(37)]: [["Sulla's long shadow", 'A bilge']],
  [C(38)]: [['From shared values to private gain', 'Bonum publicum simulantes']],
  [C('51.1-8')]: [['Decide with a cool head', 'A speech that opens with philosophy'], ['The consequence came', 'What happened next']],
  [C('51.20-31')]: [['Why the questions to Silanus matter', "A lawyer's dilemma"], ['So what does Caesar propose?', 'Sulla again']],
  [C('52.7-12')]: [['The contrast could not be greater', 'Sint sane']],
  [C('52.19-23')]: [['Back to the ancestors', 'Neque mirum']],
  [C(54)]: [['A portrait by a man who owed Caesar everything', 'What the praise does not hide']],
  [C(55)]: [["Cicero's due, without the boasting", 'What Cicero said']],
  [C('58.8-21')]: [['Catiline and Sallust', 'The last order']],
  [C(60)]: [['The reckoning', 'The end.']],
  [C(61)]: [['The toll, and the difference from Cicero', 'A victory without joy']],
  [I(1)]: [['Body over mind', 'The other road']],
  [I(4)]: [['Irony, and the first person', 'A sharp edge']],
  [I(5)]: [['Divina et humana', 'A struggle that ended in civil war']],
  [I(6)]: [['The real culprit', 'An old Roman in Africa']],
  [I(8)]: [['Ambition turned upside down', 'Romae omnia venalia esse'], ['The lesson comes back', "Scipio's warning"]],
  [I(10)]: [['The advice, and why it stands', 'Concordia parvae res crescunt']],
  [I(12)]: [['How fast it went wrong', "Jugurtha's first crime"]],
  [I('14.1-6')]: [['No money in a city', 'Fides, the word that matters']],
  [I('14.20-25')]: [['Public friendship and private friendship', 'Privata amicitia'], ['A prophecy, of a kind', 'Do the gods care?']],
  [I(15)]: [['Money against loyalty', 'Paucis respondent']],
  [I(17)]: [['Dying of old age', 'A landscape in lists']],
  [I(19)]: [['Why the map matters', 'The map of the war']],
  [I('26-27')]: [['Memmius, one of the heroes', 'Memmius.']],
  [I(29)]: [['Two payments', 'Thirty elephants']],
  [I('31.9-16')]: [['Sallust and Cicero agree', 'Eadem cupere']],
  [I('31.21-29')]: [['Why it has to be stopped now', 'Res publica venalis']],
  [I('33-34')]: [['Memmius was right', 'Vicit tamen']],
  [I(35)]: [['The one time money fails', 'Urbem venalem']],
  [I(38)]: [['Even the army', 'The army bought from within']],
  [I(41)]: [['The road to oligarchy', 'But not equally to blame']],
  [I(42)]: [['Honest men edged out', 'The victory that bred fear']],
  [I(44)]: [['Virtues turned into vices', 'The cure.']],
  [I(51)]: [['Brevity at its peak', 'A battle in one sentence'], ['The first real fight', 'Metellus and Jugurtha']],
  [I(63)]: [['A pattern of new men', 'The new man.']],
  [I(64)]: [['Desire, anger and a joke', 'The sneer.']],
  [I('66-67')]: [['Hospitality betrayed', 'The massacre.']],
  [I('71-72')]: [['A scene from Plautus', 'The plotter caught']],
  [I(73)]: [['The tables turned', 'The new man and the war']],
  [I(79)]: [['A hidden moral', 'Why tell it here']],
  [I('85.10-17')]: [['The right order and the wrong one', 'The argument.'], ['The man behind the speech', 'The right order and the wrong one'], ["Sallust's spelling", 'The corruption theme']],
  [I('85.29-37')]: [['Nobility earned, then inherited', 'Scars as masks'], ['A jab that does not land', 'Master or commander']],
  [I(86)]: [['Armies of generals', 'What it led to']],
  [I(91)]: [['Plunder forbidden, then shared', 'Burned anyway']],
  [I(93)]: [['Mind first, then luck', 'Fortune and virtue']],
  [I('95-96')]: [['Catiline, had he won', 'The portrait.']],
  [I(101)]: [['The two battles near Cirta', 'Sulla saves the day']],
  [I(102)]: [['Friends, not slaves', "A diplomat's speech"], ['Decided in battle, ended by a sale', 'Bocchus answers']],
  [I(113)]: [['The seller sold', 'The trap.']],
  [I(114)]: [['A dark ending', 'An ending without an epilogue']]
};
// [author, citation, paragraph it is in, citation the sentence carries, paragraph it goes to]
// A paragraph is named by its bold title or, for notes without titles, by its opening words.
const SENT = [
  [SAL, C(5), 'Where the portrait ends', '(Bellum Iugurthinum 64)', 'Sections 6 to 8 move'],
  [SAL, C(10), 'Exported', '(Bellum Iugurthinum 41)', 'The thesis is that Rome'],
  [SAL, C(11), 'Lucretius says the same about greed', '(Bellum Iugurthinum 44)', 'The corruption theme: how an army changes owner'],
  [SAL, C(11), 'Lucretius says the same about greed', '(Bellum Iugurthinum 95-96)', 'The corruption theme: how an army changes owner'],
  [SAL, C(11), 'Lucretius says the same about greed', '(Bellum Iugurthinum 113)', 'The corruption theme: how an army changes owner'],
  [SAL, C(15), 'From one man to a war', '(Bellum Iugurthinum 71-72)', 'A mind written on a body'],
  [SAL, C(15), 'From one man to a war', '(Bellum Iugurthinum 113)', 'A mind written on a body'],
  [SAL, C('20.2-8'), 'The style', '(Bellum Iugurthinum 31.9-16)', 'Friendship as complicity'],
  [SAL, C('20.9-17'), 'The style', '(De Coniuratione Catilinae 58.8-21)', "The saviour's speech"],
  [SAL, C(33), 'The style', '(De Coniuratione Catilinae 60)', 'Good men with the wrong method?'],
  [SAL, C('51.20-31'), 'So what does Caesar propose?', '(Bellum Iugurthinum 73)', 'Omnia mala exempla'],
  [SAL, C(60), 'The reckoning', '(Bellum Iugurthinum 51)', 'The battle in three moves'],
  [SAL, C(61), 'The toll, and the difference from Cicero', '(Bellum Iugurthinum 66-67)', 'Catiline among the enemy'],
  [SAL, C(61), 'The toll, and the difference from Cicero', '(Bellum Iugurthinum 101)', 'Why end here'],
  ['gaius-julius-caesar', '(De Bello Civili I.7)', 'And the sharpest move is the one about the veto', '(Bellum Iugurthinum 86', 'Where we are'],
  ['marcus-tullius-cicero', '(Pro Caelio 49-50)', 'It worked.', '(De Coniuratione Catilinae 25', 'Section 50 turns']
];

const SPLIT = /(?<=[.!?])\s+(?=[\p{Lu}*(])/u;
const named = (paras, t) => {
  const hits = paras.map((p, i) => [p, i]).filter(([p]) => p.startsWith('**' + t) || p.startsWith(t));
  if (hits.length !== 1) throw new Error('paragraph "' + t + '": ' + hits.length + ' matches');
  return hits[0][1];
};

let src = fs.readFileSync(FILE, 'utf8');
const crlf = src.includes('\r\n');
const lines = src.replace(/\r\n/g, '\n').split('\n');
// locate the analysis / analysisIt lines of each fragment, by author and citation
let author = null, cit = null;
const at = {};
for (let i = 0; i < lines.length; i++) {
  const a = lines[i].match(/^  "([a-z]+(?:-[a-z]+)+)": \{$/);
  if (a) author = a[1];
  const c = lines[i].match(/^\s*"citation": "(.*)",$/);
  if (c) cit = c[1];
  const f = lines[i].match(/^\s*"(analysis|analysisIt)": /);
  if (f && author && cit) at[author + '|' + cit + '|' + f[1]] = i;
}
const get = (k) => { const m = lines[at[k]].match(/^(\s*"(?:analysis|analysisIt)": )(".*")(,?)$/); return [m[1], JSON.parse(m[2]), m[3]]; };
const put = (k, pre, text, post) => { lines[at[k]] = pre + JSON.stringify(text) + post; };

let moved = 0, sentences = 0;
// 1. sentences first, while every paragraph is still where the plan saw it
for (const [au, c, from, key, to] of SENT) {
  const en = get(au + '|' + c + '|analysis'), it = get(au + '|' + c + '|analysisIt');
  const pe = en[1].split('\n\n'), pi = it[1].split('\n\n');
  const f = named(pe, from), t = named(pe, to);
  for (const [P, which] of [[pe, 'en'], [pi, 'it']]) {
    const s = P[f].split(SPLIT);
    const k = s.filter((x) => x.includes(key));
    if (k.length !== 1) throw new Error(c + ' ' + which + ': sentence with ' + key + ': ' + k.length);
    P[f] = s.filter((x) => x !== k[0]).join(' ');
    P[t] = P[t] + ' ' + k[0];
  }
  put(au + '|' + c + '|analysis', en[0], pe.join('\n\n'), en[2]);
  put(au + '|' + c + '|analysisIt', it[0], pi.join('\n\n'), it[2]);
  sentences++;
}
// 2. paragraphs
for (const [c, ops] of Object.entries(ORDER)) {
  const en = get(SAL + '|' + c + '|analysis'), it = get(SAL + '|' + c + '|analysisIt');
  let pe = en[1].split('\n\n'), pi = it[1].split('\n\n');
  if (pe.length !== pi.length) throw new Error(c + ': paragraph count differs');
  for (const [m, after] of ops) {
    const a = named(pe, m);
    const em = pe.splice(a, 1)[0], im = pi.splice(a, 1)[0];
    const b = named(pe, after);
    pe.splice(b + 1, 0, em); pi.splice(b + 1, 0, im);
    moved++;
  }
  put(SAL + '|' + c + '|analysis', en[0], pe.join('\n\n'), en[2]);
  put(SAL + '|' + c + '|analysisIt', it[0], pi.join('\n\n'), it[2]);
}
src = lines.join('\n');
fs.writeFileSync(FILE, crlf ? src.replace(/\n/g, '\r\n') : src);
console.log(moved + ' paragraphs and ' + sentences + ' sentences moved');
