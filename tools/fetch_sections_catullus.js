/*
 * fetch_sections_catullus.js - verse numbers for Catullus from the Perseus TEI
 * edition (canonical-latinLit phi0472.phi001, perseus-lat2), where every poem
 * is a <div subtype="poem" n="..."> and every line an <l n="...">.
 *
 *   node tools/fetch_sections_catullus.js           # fetch (if not cached) and split
 *   node tools/fetch_sections_catullus.js --force   # re-download the XML
 *
 * Why this exists (v1.17.0). The Latin Library prints Catullus with a Roman
 * heading per poem and NO line numbers at all, so a verse can only be numbered
 * by counting inside the poem - and a count is only safe if something checks
 * it. tools/extract_poem.js counts, then compares every verse it takes with the
 * same number here, word for word. As with Lucretius, the edition is consulted
 * for NUMBERING and the typo check only: the Latin in the app stays the Latin
 * Library's.
 *
 * Kept: the text of each <l>; a line that holds only a <gap> is kept as an
 * empty line flagged `gap` (Perseus marks lost verses that way, 2.10a). <note>
 * and <milestone> are dropped. The metre each poem carries as
 * <milestone unit="meter" n="..."/> is kept as `meter` (Perseus's own label,
 * for reference only - js/metres.js decides what the app prints).
 *
 * Output: tools/.cache/sections/catullus.<poem>.json = { urn, source, meter, lines: [{ n, text, gap? }] }
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const URL = 'https://raw.githubusercontent.com/PerseusDL/canonical-latinLit/master/data/phi0472/phi001/phi0472.phi001.perseus-lat2.xml';
const CACHE = path.join(__dirname, '.cache', 'sections');
const XML = path.join(CACHE, 'perseus-catullus.xml');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'latinsuperapp-section-fetch/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume(); return get(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      let d = ''; res.setEncoding('utf8');
      res.on('data', (c) => { d += c; });
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

function lineText(xml) {
  return xml
    .replace(/<note[\s\S]*?<\/note>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  fs.mkdirSync(CACHE, { recursive: true });
  if (!fs.existsSync(XML) || process.argv.includes('--force')) {
    fs.writeFileSync(XML, await get(URL), 'utf8');
  }
  const src = fs.readFileSync(XML, 'utf8');
  const poems = src.split(/<div type="textpart" subtype="poem"[^>]*? n="/).slice(1);
  let total = 0;
  for (const chunk of poems) {
    const poem = chunk.match(/^([^"]+)"/)[1];
    const body = chunk.split(/<\/div>/)[0];
    const meter = (body.match(/<milestone unit="meter" n="([^"]+)"/) || [])[1] || null;
    const lines = [];
    const re = /<l\b[^>]*? n="([^"]+)"[^>]*>([\s\S]*?)<\/l>/g;
    let m;
    while ((m = re.exec(body))) {
      const text = lineText(m[2]);
      const entry = { n: m[1], text };
      if (!text && /<gap\b/.test(m[2])) entry.gap = true;
      lines.push(entry);
    }
    fs.writeFileSync(path.join(CACHE, 'catullus.' + poem + '.json'),
      JSON.stringify({ urn: 'urn:cts:latinLit:phi0472.phi001.perseus-lat2:' + poem, source: URL, meter, lines }, null, 2), 'utf8');
    total += lines.length;
  }
  console.log(poems.length + ' poems, ' + total + ' lines -> tools/.cache/sections/catullus.<poem>.json');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
