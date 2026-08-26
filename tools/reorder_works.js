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
  // The Verrines, 70 BC. All seven parts belong to one prosecution, so
  // chronology cannot order them among themselves: this is the canonical
  // sequence of the case (v1.7.5, which split them out of a single work).
  'in-verrem-divinatio', // who gets to prosecute
  'in-verrem-i',         // actio prima
  'in-verrem-ii-1',      // actio secunda I: de praetura urbana
  'in-verrem-ii-2',      // actio secunda II: de praetura Siciliensi
  'in-verrem-ii-3',      // actio secunda III: de frumento
  'in-verrem-ii-4',      // actio secunda IV: de signis
  'in-verrem-ii-5',      // actio secunda V: de suppliciis
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

// Same guard as apply_batch.js: with git's core.autocrlf=true a checkout hands
// back CRLF, the '\n\n' in tailMark stops matching, indexOf returns -1, and
// slice(-1) would quietly truncate the whole bank to its last character.
const src = fs.readFileSync(P, 'utf8').replace(/\r\n/g, '\n');
const headMark = '  var AUTHORS = ';
const tailMark = '\n\n  global.PracticeBank';
const headAt = src.indexOf(headMark);
const tailAt = src.indexOf(tailMark);
if (headAt < 0 || tailAt < 0) throw new Error('js/fragments.js markers not found (head ' + headAt + ', tail ' + tailAt + ') - refusing to write');
const head = src.slice(0, headAt + headMark.length);
const tail = src.slice(tailAt);

global.window = {};
eval(src);
const AUTHORS = window.PracticeBank.authors;
const cic = AUTHORS['marcus-tullius-cicero'];

const before = cic.works.map(w => w.id);
// Since v1.7.8 a group may carry a `parent` (the Verrines, Catilinarians and
// Philippics are collections inside Speeches), so bucket by the TOP-LEVEL
// ancestor: the works array stays one contiguous, chronological speeches run,
// which is what the chooser derives collection order from.
const rootGroup = (id) => {
  const groups = cic.groups || [];
  let g = groups.filter(x => x.id === id)[0], seen = {};
  while (g && g.parent && !seen[g.id]) { seen[g.id] = 1; g = groups.filter(x => x.id === g.parent)[0]; }
  return g ? g.id : id;
};
const buckets = new Map(GROUP_ORDER.map(g => [g, []]));
for (const w of cic.works) {
  const root = rootGroup(w.group);
  if (!buckets.has(root)) throw new Error('unknown group on ' + w.id + ': ' + w.group + ' (root ' + root + ')');
  buckets.get(root).push(w);
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
