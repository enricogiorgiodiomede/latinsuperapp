// v1.16.14, job 2: bring the Latin QUOTED in the Sallust notes into line with
// the Perseus text the excerpts now print (lubido, vortere, maxumus, quoius...).
// Uses batch/spellmap1174.json (old page form -> Perseus form, per excerpt,
// built by aligning the two texts; ambiguous words such as cum/quom left out).
// Only words inside *italic* spans change, and never in a sentence or grammar
// item that is ABOUT spelling or readings, which cite both forms on purpose.
//   node batch/respell1174.js            # rewrites js/fragments.js, logs every change
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'js', 'fragments.js');
const MAP = require('./spellmap1174.json');
const PROTECT = /spelling|grafia|some texts|alcuni testi|modern Latin|latino moderno|the manuscripts|i manoscritti|Ahlberg|old form|forme antiche|forma antica|old ending|antica desinenza/i;

let src = fs.readFileSync(FILE, 'utf8');
const crlf = src.includes('\r\n');
const lines = src.replace(/\r\n/g, '\n').split('\n');
const log = [];
let cur = null;
function respellUnit(unit, map, cit, fld) {
  if (PROTECT.test(unit)) return unit;
  return unit.replace(/(?<!\*)\*(?!\*)([^*\n]+?)\*(?!\*)/g, (m, inner) => {
    const out = inner.replace(/[A-Za-z]+/g, (w) => {
      const n = map[w.toLowerCase()];
      if (!n) return w;
      const r = w[0] === w[0].toUpperCase() ? n[0].toUpperCase() + n.slice(1) : n;
      if (r !== w) log.push(cit + ' ' + fld + ': ' + w + ' -> ' + r + '   [*' + inner.slice(0, 70) + '*]');
      return r;
    });
    return '*' + out + '*';
  });
}
for (let i = 0; i < lines.length; i++) {
  const c = lines[i].match(/^\s*"citation": "(.*)",$/);
  if (c) cur = c[1];
  const a = lines[i].match(/^(\s*"(analysis|analysisIt)": )(".*")(,?)$/);
  if (!a || !cur || !MAP[cur]) continue;
  const map = MAP[cur].map;
  const text = JSON.parse(a[3]);
  const paras = text.split('\n\n').map((p) => {
    if (/^\*\*(Grammar notes|Note grammaticali)\.\*\*/.test(p)) {
      // one grammar item per sentence starting with an italic lemma
      return p.split(/(?<=\.) (?=\*[^*])/).map((it) => respellUnit(it, map, cur, a[2])).join(' ');
    }
    return p.split(/(?<=[.!?]) (?=[A-Z*"(])/).map((s) => respellUnit(s, map, cur, a[2])).join(' ');
  });
  lines[i] = a[1] + JSON.stringify(paras.join('\n\n')) + a[4];
}
src = lines.join('\n');
fs.writeFileSync(FILE, crlf ? src.replace(/\n/g, '\r\n') : src);
fs.writeFileSync(path.join(__dirname, 'respell1174_log.txt'), log.join('\n') + '\n');
console.log(log.length + ' words respelled; log in batch/respell1174_log.txt');
