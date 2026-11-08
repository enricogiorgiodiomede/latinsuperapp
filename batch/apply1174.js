// v1.16.14: write the Perseus Latin (batch/perseus1174.json) into the 70 Sallust
// excerpts of js/fragments.js, with the new `source` and the `emend` pairs for
// the typos of the digitised text. Translations and notes are not touched here.
//   node batch/apply1174.js
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'js', 'fragments.js');
const J = require('./perseus1174.json');
const SOURCE = "Perseus Digital Library (Ahlberg, Teubner 1919)";

let src = fs.readFileSync(FILE, 'utf8');
const crlf = src.includes('\r\n');
const lines = src.replace(/\r\n/g, '\n').split('\n');
let done = 0;
for (const [cit, latin] of Object.entries(J.latin)) {
  const c = lines.findIndex(l => l.trim() === '"citation": "' + cit + '",');
  if (c < 0) throw new Error('citation not found: ' + cit);
  // the object runs from the `{` above the citation to the matching `}` below
  let s = c; while (lines[s].trim() !== '{') s--;
  const indent = lines[s].match(/^\s*/)[0];
  let e = c; while (!(lines[e].startsWith(indent + '}') && lines[e].trim().replace(',', '') === '}')) e++;
  const pad = indent + '  ';
  for (let i = s; i <= e; i++) {
    if (lines[i].startsWith(pad + '"latin": ')) lines[i] = pad + '"latin": ' + JSON.stringify(latin) + ',';
    if (lines[i].startsWith(pad + '"source": ')) lines[i] = pad + '"source": ' + JSON.stringify(SOURCE) + ',';
  }
  // drop any old emend block, then add the new one (if any) after the citation
  for (let i = s; i <= e; i++) {
    if (lines[i].startsWith(pad + '"emend": [')) {
      let j = i; let depth = 0;
      do { depth += (lines[j].match(/\[/g) || []).length - (lines[j].match(/\]/g) || []).length; j++; } while (depth > 0);
      // the property may be the last one (no trailing comma): fix the previous line
      const last = lines[j - 1].trim().endsWith(']');
      lines.splice(i, j - i);
      e -= (j - i);
      if (last && lines[i - 1].endsWith(',') && lines[i].trim().startsWith('}')) lines[i - 1] = lines[i - 1].slice(0, -1);
      break;
    }
  }
  const em = (J.emend || {})[cit];
  if (em && em.length) lines.splice(c + 1, 0, pad + '"emend": ' + JSON.stringify(em) + ',');
  done++;
}
src = lines.join('\n');
fs.writeFileSync(FILE, crlf ? src.replace(/\n/g, '\r\n') : src);
console.log(done + ' Sallust excerpts rewritten from Perseus');
