// v1.6.6: order Cicero's Speeches CHRONOLOGICALLY by delivery, restoring the
// order used before v1.6.3 alphabetised them (user's request). Groups stay
// contiguous and in their own order; only the speeches bucket is sorted.
//
// An explicit list rather than a computed BC year: years count downwards, and
// the four Catilinarians share a year but have a fixed internal order, so a
// numeric sort is easy to get backwards.
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'js', 'fragments.js');
const GROUP_ORDER = ['speeches', 'letters', 'philosophical', 'rhetorical'];
const SPEECH_ORDER = [
  'in-verrem',        // 70 BC
  'in-catilinam-i',   // 63 BC, 8 November
  'in-catilinam-ii',  // 63 BC, 9 November
  'in-catilinam-iii', // 63 BC, 3 December
  'in-catilinam-iv',  // 63 BC, 5 December
  'pro-archia',       // 62 BC
  'pro-caelio',       // 56 BC, April
  'in-pisonem',       // 55 BC
  'pro-milone',       // 52 BC
  'philippica-i',     // 44 BC, 2 September
  'philippica-ii',    // 44 BC, autumn (written, never delivered)
  'philippica-iv',    // 44 BC, 20 December
  'philippica-xiv'    // 43 BC, April
];

const src = fs.readFileSync(P, 'utf8');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const head = src.slice(0, src.indexOf(headMark) + headMark.length);
const tail = src.slice(src.indexOf(tailMark));

global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;
const cic = AUTHORS['marcus-tullius-cicero'];

const before = cic.works.map(w => w.id);
const buckets = new Map(GROUP_ORDER.map(g => [g, []]));
for (const w of cic.works) {
  if (!buckets.has(w.group)) throw new Error('unknown group on ' + w.id + ': ' + w.group);
  buckets.get(w.group).push(w);
}
const speeches = buckets.get('speeches');
for (const w of speeches) {
  if (SPEECH_ORDER.indexOf(w.id) < 0) throw new Error('no chronological slot for ' + w.id);
}
speeches.sort((a, b) => SPEECH_ORDER.indexOf(a.id) - SPEECH_ORDER.indexOf(b.id));
cic.works = GROUP_ORDER.flatMap(g => buckets.get(g));

if (cic.works.length !== before.length) throw new Error('lost a work in the reorder');
fs.writeFileSync(P, head + JSON.stringify(AUTHORS, null, 2) + ';' + tail);
console.log('before: ' + before.join(', '));
console.log('after : ' + cic.works.map(w => w.id).join(', '));
console.log('\nSpeeches, chronological (earliest first):');
speeches.forEach(w => console.log('  ' + w.label.padEnd(18) + w.fragments.length));
