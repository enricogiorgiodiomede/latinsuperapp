/*
 * fetch_plays_perseus.js - the verse numbers of the sixteen comedies this app
 * quotes, from the Perseus TEI editions, where every verse is <l n="...">.
 *
 *   node tools/fetch_plays_perseus.js           # fetch what is not cached
 *   node tools/fetch_plays_perseus.js --force   # re-download
 *
 * Why not the Latin Library, which is where the Latin itself comes from: it
 * prints a number only every fifth verse, and its pages wrap a long verse onto
 * a second physical line, so counting lines between two printed numbers does
 * not give the verse number. On the Terence pages barely one line in thirty
 * carries a number that can be trusted this way. The TEI numbers every line
 * explicitly, so nothing has to be counted at all.
 *
 * As with the Lucretius sections, the edition is consulted for NUMBERING only.
 * The Latin in the app stays the Latin Library's, word for word; these files
 * are used to say which verse number a line already in the bank carries, and
 * `tools/number_excerpts.js` matches by folded letters so that the two
 * editions' spelling and punctuation cannot matter.
 *
 * Output: tools/.cache/plays/<work-id>.json = { urn, source, lines: [{ n, text }] }
 * keyed by the app's own work id, so number_excerpts.js can look a play up
 * without knowing anything about Perseus.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT = path.join(__dirname, '.cache', 'plays');
const RAW = 'https://raw.githubusercontent.com/PerseusDL/canonical-latinLit/master/data/';

// the app's work id -> [group, work] in canonical-latinLit
const WORKS = {
  amphitruo: ['phi0119', 'phi001'],
  asinaria: ['phi0119', 'phi002'],
  aulularia: ['phi0119', 'phi003'],
  bacchides: ['phi0119', 'phi004'],
  casina: ['phi0119', 'phi006'],
  menaechmi: ['phi0119', 'phi010'],
  'miles-gloriosus': ['phi0119', 'phi012'],
  mostellaria: ['phi0119', 'phi013'],
  pseudolus: ['phi0119', 'phi016'],
  truculentus: ['phi0119', 'phi020'],
  andria: ['phi0134', 'phi001'],
  'heauton-timorumenos': ['phi0134', 'phi002'],
  eunuchus: ['phi0134', 'phi003'],
  phormio: ['phi0134', 'phi004'],
  hecyra: ['phi0134', 'phi005'],
  adelphoe: ['phi0134', 'phi006'],
  // Catullus is not a play, but his excerpts need verse numbers the same way
  'catullus-carmina': ['phi0472', 'phi001']
};

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'latinsuperapp-play-fetch/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        res.resume(); return get(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

// The text of one <l>: tags dropped, entities resolved, whitespace collapsed.
// An editor's supplement inside <add> or <supplied> is kept, because it is part
// of the line as the edition prints it; the app matches by letters anyway.
function lineText(xml) {
  return xml
    .replace(/<note[\s\S]*?<\/note>/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

(async function () {
  const force = process.argv.includes('--force');
  fs.mkdirSync(OUT, { recursive: true });
  for (const work of Object.keys(WORKS)) {
    const dest = path.join(OUT, work + '.json');
    if (!force && fs.existsSync(dest)) { console.log('cached  ' + work); continue; }
    const [group, id] = WORKS[work];
    const url = RAW + group + '/' + id + '/' + group + '.' + id + '.perseus-lat2.xml';
    try {
      const xml = await get(url);
      // <l> carries xml:base before n, so the attribute cannot be assumed first
      const re = /<l\b[^>]*\bn="([^"]+)"[^>]*>([\s\S]*?)<\/l>/g;
      const lines = [];
      let m;
      while ((m = re.exec(xml))) {
        const text = lineText(m[2]);
        if (text) lines.push({ n: m[1], text: text });
      }
      if (!lines.length) throw new Error('no <l n="..."> found');
      fs.writeFileSync(dest, JSON.stringify({
        urn: 'urn:cts:latinLit:' + group + '.' + id + '.perseus-lat2',
        source: url,
        lines: lines
      }, null, 1), 'utf8');
      console.log('fetched ' + work.padEnd(22) + lines.length + ' verses  (' +
        lines[0].n + '-' + lines[lines.length - 1].n + ')');
    } catch (e) {
      console.log('FAILED  ' + work.padEnd(22) + e.message);
    }
  }
})();
