/*
 * fetch_sections_perseus_verse.js - verse numbers from the Perseus TEI editions,
 * where every line is <l n="..."> inside a book (or poem) div. Lucretius, De
 * Rerum Natura (phi0550.phi001, perseus-lat1), and since v2.1.0 Virgil: the
 * Eclogues (phi0690.phi001, one div per POEM), Georgics (phi002) and Aeneid
 * (phi003), all perseus-lat2.
 *
 *   node tools/fetch_sections_perseus_verse.js              # every work in WORKS
 *   node tools/fetch_sections_perseus_verse.js ecl aen      # only these
 *   node tools/fetch_sections_perseus_verse.js --force      # re-download the XML
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
 * Output: tools/.cache/sections/<prefix>.<n>.json = { urn, source, lines: [{ n, text, del?, gap? }] }
 * with prefix drn, ecl, georg or aen. extract_verse.js maps a Latin Library page
 * to its file (lucretius3 -> drn.3, ec2 -> ecl.2, geo4 -> georg.4, aen3 -> aen.3).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = 'https://raw.githubusercontent.com/PerseusDL/canonical-latinLit/master/data/';
const WORKS = {
  drn: { urn: 'phi0550.phi001.perseus-lat1', path: 'phi0550/phi001/phi0550.phi001.perseus-lat1.xml', xml: 'perseus-drn.xml' },
  ecl: { urn: 'phi0690.phi001.perseus-lat2', path: 'phi0690/phi001/phi0690.phi001.perseus-lat2.xml', xml: 'perseus-verg-phi001.xml' },
  georg: { urn: 'phi0690.phi002.perseus-lat2', path: 'phi0690/phi002/phi0690.phi002.perseus-lat2.xml', xml: 'perseus-verg-phi002.xml' },
  aen: { urn: 'phi0690.phi003.perseus-lat2', path: 'phi0690/phi003/phi0690.phi003.perseus-lat2.xml', xml: 'perseus-verg-phi003.xml' }
};
const CACHE = path.join(__dirname, '.cache', 'sections');

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

// Lines the Perseus file prints that the standard numbering leaves out. Ecl.
// 1.17a, "saepe sinistra cava praedixit ab ilice cornix", is copied in from
// Ecl. 9.15 in some manuscripts; Perseus numbers it 18 and so runs one ahead
// for the rest of the poem, while every modern citation (and the Latin Library)
// has 83 verses, "Urbem quam dicunt Romam" at 19. Dropped, and the rest
// renumbered, so the app cites Ecl. 1 the way readers' books do.
const DROP = { 'ecl.1': ['saepe sinistra cava praedixit ab ilice cornix.'] };

// A book or poem div, whichever order its attributes come in (the Aeneid file
// puts n= first).
const DIV = /<div\b(?=[^>]*\btype="textpart")(?=[^>]*\bsubtype="(?:book|poem)")[^>]*\bn="(\d+)"[^>]*>/g;

async function split(prefix) {
  const w = WORKS[prefix];
  const xmlFile = path.join(CACHE, w.xml);
  if (!fs.existsSync(xmlFile) || process.argv.includes('--force')) {
    fs.writeFileSync(xmlFile, await get(BASE + w.path), 'utf8');
  }
  const src = fs.readFileSync(xmlFile, 'utf8');
  const marks = [];
  let d;
  DIV.lastIndex = 0;
  while ((d = DIV.exec(src))) marks.push({ n: d[1], at: d.index });
  let total = 0;
  marks.forEach((mk, i) => {
    const chunk = src.slice(mk.at, i + 1 < marks.length ? marks[i + 1].at : src.length);
    const lines = [];
    // Virgil's lines carry other attributes too (<l n="1" rend="indent">).
    const re = /<l n="([^"]+)"[^>]*>([\s\S]*?)<\/l>/g;
    let m;
    while ((m = re.exec(chunk))) {
      const entry = { n: m[1], text: lineText(m[2]) };
      if (/^\s*<del>[\s\S]*<\/del>\s*$/.test(m[2])) entry.del = true;
      if (/<gap\b/.test(m[2])) entry.gap = true;
      lines.push(entry);
    }
    for (const text of (DROP[prefix + '.' + mk.n] || [])) {
      const at = lines.findIndex(l => l.text === text);
      if (at < 0) throw new Error(prefix + '.' + mk.n + ': DROP line not found: ' + text);
      lines.splice(at, 1);
      for (let k = at; k < lines.length; k++) {
        if (/^\d+$/.test(lines[k].n)) lines[k].n = String(parseInt(lines[k].n, 10) - 1);
      }
      console.log(prefix + '.' + mk.n + ': dropped the interpolated line at ' + (at + 1) + ', renumbered after it');
    }
    fs.writeFileSync(path.join(CACHE, prefix + '.' + mk.n + '.json'),
      JSON.stringify({ urn: 'urn:cts:latinLit:' + w.urn + ':' + mk.n, source: BASE + w.path, lines }, null, 2), 'utf8');
    console.log(prefix + '.' + mk.n + ': ' + lines.length + ' lines, last n=' + (lines.length ? lines[lines.length - 1].n : '-'));
    total += lines.length;
  });
  console.log(total + ' lines -> tools/.cache/sections/' + prefix + '.<n>.json');
}

async function main() {
  fs.mkdirSync(CACHE, { recursive: true });
  const want = process.argv.slice(2).filter(a => !a.startsWith('--'));
  for (const prefix of (want.length ? want : Object.keys(WORKS))) {
    if (!WORKS[prefix]) throw new Error('unknown work ' + prefix + ' (known: ' + Object.keys(WORKS).join(', ') + ')');
    await split(prefix);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
