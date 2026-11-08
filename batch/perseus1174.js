// v1.16.14: rebuild the Latin of every Sallust excerpt from the Perseus text
// (perseus-lat3, Ahlberg), so the app prints Sallust's archaic spellings
// (maxumus, lubido, vorto, quom, quoius) as the critical editions do.
//   node tools/xml_sections.js phi0631.phi001 <chapters> / phi0631.phi002 <chapters>
//   node batch/perseus1174.js            # writes batch/perseus1174.json + a report
// Each excerpt is rebuilt from the section files by its citation; TRIM holds the
// excerpts that stop inside a section.
const fs = require('fs');
const path = require('path');
global.window = {};
eval(fs.readFileSync(path.join(__dirname, '..', 'js/fragments.js'), 'utf8'));
const A = window.PracticeBank.authors['gaius-sallustius-crispus'];
const SEC = path.join(__dirname, '..', 'tools', '.cache', 'sections');
const WORK = { 'De Coniuratione Catilinae': 'phi0631.phi001', 'Bellum Iugurthinum': 'phi0631.phi002' };

// Excerpts that end inside a section: cut after this text (inclusive).
const TRIM = {
  '(Bellum Iugurthinum 73)': 'frequens Marium iussit.'
};
// Perseus starts its chapter 32 in the middle of Catiline's last sentence; the
// excerpt keeps the usual citation and runs on to the end of the sentence.
const EXTEND = {
  '(De Coniuratione Catilinae 31.4-9)': " incendium meum ruina restinguam.'"
};
// Plain typos of the digitised Perseus text: [Perseus reading, correct reading].
const EMEND = {
  '(De Coniuratione Catilinae 33)': [['neccessitudinem', 'necessitudinem']],
  '(De Coniuratione Catilinae 37)': [['Id ad eo malum', 'Id adeo malum']],
  '(De Coniuratione Catilinae 38)': [['postestas', 'potestas']],
  '(De Coniuratione Catilinae 51.20-31)': [['quon eam', 'quom eam']],
  '(Bellum Iugurthinum 5)': [['victora', 'victoria']],
  '(Bellum Iugurthinum 12)': [['mulieries', 'mulieres']],
  '(Bellum Iugurthinum 14.20-25)': [['defessus malls', 'defessus malis']],
  '(Bellum Iugurthinum 17)': [['surit', 'sunt']],
  '(Bellum Iugurthinum 26-27)': [['oppidum Iurgurthae', 'oppidum Iugurthae']],
  '(Bellum Iugurthinum 29)': [['belli redimebat', 'belli moram redimebat'], ['pax agitabantur', 'pax agitabatur']],
  '(Bellum Iugurthinum 31.9-16)': [['maistas', 'maiestas']],
  '(Bellum Iugurthinum 33-34)': [['intellegat popolus', 'intellegat populus'], ['dementia', 'clementia']],
  '(Bellum Iugurthinum 35)': [['ventus', 'veritus']],
  '(Bellum Iugurthinum 42)': [['Cracchus', 'Gracchus']],
  '(Bellum Iugurthinum 64)': [['multitude', 'multitudo']],
  '(Bellum Iugurthinum 73)': [['tribune', 'tribuno']],
  '(Bellum Iugurthinum 79)': [['accident', 'acciderit']],
  '(Bellum Iugurthinum 102)': [['Cirtam,quo', 'Cirtam, quo']],
  '(Bellum Iugurthinum 113)': [['necesariis', 'necessariis']]
};
// Perseus prints sentences in lower case (Teubner style); the app capitalises
// every sentence opening, never a word after an abbreviated praenomen.
const ABBR = /^(?:[A-Z]|Cn|Sp|Ti|Ser|Mam|Kal|Ap)\.$/;
function capitalise(latin) {
  let cap = true;
  return latin.replace(/\*\*\d+\.\*\*|\[\d+\]|[A-Za-z]+\.?|[.?!]/g, (tok) => {
    if (/^\*\*|^\[/.test(tok)) return tok;
    if (/^[.?!]$/.test(tok)) { cap = true; return tok; }
    let out = tok;
    if (cap && /^[a-z]/.test(tok)) out = tok[0].toUpperCase() + tok.slice(1);
    cap = /[.?!]$/.test(tok) && !ABBR.test(tok);
    return out;
  });
}

function sections(work, ch) {
  return JSON.parse(fs.readFileSync(path.join(SEC, work + '.' + ch + '.json'), 'utf8')).sections;
}
function parse(cit) {
  const m = cit.match(/^\((.+?) ([\d.\-]+)\)$/);
  const [a, b] = m[2].split('-');
  const [c1, s1] = a.split('.').map(Number);
  let c2, s2;
  if (b === undefined) { c2 = c1; s2 = s1; }
  else if (b.includes('.')) { [c2, s2] = b.split('.').map(Number); }
  else if (s1 !== undefined) { c2 = c1; s2 = Number(b); }
  else { c2 = Number(b); s2 = undefined; }
  return { work: WORK[m[1]], c1, s1, c2, s2 };
}
function build(cit) {
  const p = parse(cit);
  const paras = [];
  for (let ch = p.c1; ch <= p.c2; ch++) {
    let secs = sections(p.work, ch);
    if (ch === p.c1 && p.s1 !== undefined) secs = secs.filter(s => +s.n >= p.s1);
    if (ch === p.c2 && p.s2 !== undefined) secs = secs.filter(s => +s.n <= p.s2);
    const text = secs.map(s => '**' + s.n + '.** ' + s.text).join(' ');
    paras.push('> [' + ch + '] ' + text);
  }
  let latin = paras.join('\n>\n');
  if (TRIM[cit]) {
    const i = latin.indexOf(TRIM[cit]);
    if (i < 0) throw new Error('trim anchor missing: ' + cit);
    latin = latin.slice(0, i + TRIM[cit].length);
  }
  if (EXTEND[cit]) latin += EXTEND[cit];
  latin = capitalise(latin);
  // An excerpt cut from inside a speech carries only one of the speech's two
  // quotation marks: drop the unmatched one at its edge (the rest stays verbatim).
  if ((latin.match(/'/g) || []).length % 2) {
    if (/^> \[\d+\] \*\*\d+\.\*\* '/.test(latin)) latin = latin.replace(/^(> \[\d+\] \*\*\d+\.\*\* )'/, '$1');
    else if (latin.endsWith("'")) latin = latin.slice(0, -1);
    else throw new Error('unmatched quote inside ' + cit);
  }
  for (const [src, app] of EMEND[cit] || []) {
    if (latin.split(src).length !== 2) throw new Error('emend anchor ' + src + ' in ' + cit);
    latin = latin.replace(src, () => app);
  }
  return latin;
}
// Compare old and new, ignoring markers, case, punctuation and the usual
// orthographic pairs, so only real differences of wording are reported.
const ORTH = [[/v/g, 'u'], [/j/g, 'i'], [/\bquom\b/g, 'cum'], [/\bquoi/g, 'cui'], [/\bquoiu/g, 'cuiu'],
  [/umu/g, 'imu'], [/uma\b/g, 'ima'], [/uma(e|m|s)\b/g, 'ima$1'], [/umo(s|rum)?\b/g, 'imo$1'], [/umi(s)?\b/g, 'imi$1'],
  [/und(u|a|i|o)/g, 'end$1'], [/uort/g, 'uert'], [/uolt/g, 'uult'], [/conm/g, 'comm'], [/conp/g, 'comp'],
  [/inp/g, 'imp'], [/inm/g, 'imm'], [/adl/g, 'all'], [/adc/g, 'acc'], [/adf/g, 'aff'], [/adt/g, 'att'], [/adp/g, 'app'],
  [/adr/g, 'arr'], [/ads/g, 'ass'], [/obp/g, 'opp'], [/lubid/g, 'libid'], [/lubet/g, 'libet'], [/maxum/g, 'maxim'],
  [/optum/g, 'optim'], [/pessum/g, 'pessim'], [/is\b/g, 'es']];
function words(latin) {
  let t = latin.replace(/\*\*\d+\.\*\*/g, ' ').replace(/\[\d+\]/g, ' ').replace(/[>"'“”‘’()\[\]†+]/g, ' ')
    .replace(/—|--/g, ' ').toLowerCase().replace(/[^a-z\s]/g, ' ');
  for (const [r, s] of ORTH) t = t.replace(r, s);
  return t.split(/\s+/).filter(Boolean);
}
function diff(a, b) {
  // word-level LCS, report the unmatched runs
  const n = a.length, m = b.length, L = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out = []; let i = 0, j = 0, da = [], db = [];
  const flush = () => { if (da.length || db.length) out.push('OLD [' + da.join(' ') + ']  NEW [' + db.join(' ') + ']'); da = []; db = []; };
  while (i < n && j < m) {
    if (a[i] === b[j]) { flush(); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) da.push(a[i++]); else db.push(b[j++]);
  }
  while (i < n) da.push(a[i++]); while (j < m) db.push(b[j++]); flush();
  return out;
}
const out = {}; const emend = EMEND;
let report = '';
for (const w of A.works) for (const f of w.fragments) {
  const latin = build(f.citation);
  out[f.citation] = latin;
  const d = diff(words(f.latin), words(latin));
  report += '\n=== ' + f.citation + '  (' + d.length + ' real differences)\n' + d.map(x => '   ' + x).join('\n');
}
fs.writeFileSync(path.join(__dirname, 'perseus1174.json'), JSON.stringify({ latin: out, emend }, null, 2));
fs.writeFileSync(path.join(__dirname, 'perseus1174_report.txt'), report);
console.log(Object.keys(out).length + ' excerpts rebuilt; report in batch/perseus1174_report.txt');
