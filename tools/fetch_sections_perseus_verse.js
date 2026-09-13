/*
 * fetch_sections_perseus_verse.js - verse numbers for Lucretius, De Rerum
 * Natura, from the Perseus TEI edition (canonical-latinLit phi0550.phi001,
 * perseus-lat1), where every line is <l n="..."> inside a book div.
 *
 *   node tools/fetch_sections_perseus_verse.js           # fetch (if not cached) and split the six books
 *   node tools/fetch_sections_perseus_verse.js --force   # re-download the XML
 *
 * Why this exists. The Latin Library prints a number only every five verses and
 * reorders a passage (Book I vv. 50-61 after v. 135), so counting lines on its
 * page is not enough to cite a verse. extract_verse.js resolves ranges through
 * the printed numbers and then checks every verse it takes against this file,
 * word for word, so a wrong count or a source typo is reported, not shipped.
 *
 * As with the other section files, the edition is consulted for NUMBERING and
 * for the typo check only. The Latin in the app stays the Latin Library's.
 *
 * The encoding, and what is kept:
 *   <add>x</add>          an editor's supplement - kept, it is part of the text.
 *   <del>line</del>       a line editors bracket as spurious - kept, flagged `del`.
 *   <choice><reg>aer</reg><orig>aër</orig></choice> - the <orig> is kept.
 *   <gap reason="lost"/>  a lost line - kept as an empty line flagged `gap`.
 *   <milestone/>          Loeb card numbers - ignored.
 *
 * Output: tools/.cache/sections/drn.<book>.json = { urn, source, lines: [{ n, text, del?, gap? }] }
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const URL = 'https://raw.githubusercontent.com/PerseusDL/canonical-latinLit/master/data/phi0550/phi001/phi0550.phi001.perseus-lat1.xml';
const CACHE = path.join(__dirname, '.cache', 'sections');
const XML = path.join(CACHE, 'perseus-drn.xml');

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
    .replace(/<reg>[\s\S]*?<\/reg>/g, '')
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
  const books = src.split(/<div type="textpart" subtype="book" n="/).slice(1);
  let total = 0;
  for (const chunk of books) {
    const book = chunk.match(/^(\d+)"/)[1];
    const lines = [];
    const re = /<l n="([^"]+)">([\s\S]*?)<\/l>/g;
    let m;
    while ((m = re.exec(chunk))) {
      const entry = { n: m[1], text: lineText(m[2]) };
      if (/^\s*<del>[\s\S]*<\/del>\s*$/.test(m[2])) entry.del = true;
      if (/<gap\b/.test(m[2])) entry.gap = true;
      lines.push(entry);
    }
    fs.writeFileSync(path.join(CACHE, 'drn.' + book + '.json'),
      JSON.stringify({ urn: 'urn:cts:latinLit:phi0550.phi001.perseus-lat1:' + book, source: URL, lines }, null, 2), 'utf8');
    console.log('book ' + book + ': ' + lines.length + ' lines, last n=' + lines[lines.length - 1].n);
    total += lines.length;
  }
  console.log(total + ' lines -> tools/.cache/sections/drn.<book>.json');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
