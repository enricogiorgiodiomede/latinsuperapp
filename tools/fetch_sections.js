/*
 * fetch_sections.js - ask Perseus where the editorial SUBSECTIONS of a chapter
 * begin, and cache the answer in tools/.cache/sections/.
 *
 *   node tools/fetch_sections.js phi0448.phi001 6.13
 *   node tools/fetch_sections.js phi0448.phi002 1.7
 *   node tools/fetch_sections.js phi0448.phi001 8.0      # the Book VIII preface
 *
 * WHY THIS EXISTS. The Latin Library prints bracketed chapter numbers `[n]` and
 * nothing else - no subsection numbering of any kind. Standard editions divide
 * each chapter into numbered sections (BG 6.13.1, 6.13.2 ...) and that is how
 * every textbook cites Caesar, so the app supplies those numbers the same way it
 * already supplies the chapter markers.
 *
 * The Latin still comes from the Latin Library and is still what verify.js
 * checks. Perseus is consulted ONLY for the position of the boundaries; not one
 * word of its text is copied into the app.
 *
 * NOTE: Perseus carries the Bellum Gallicum (all eight books, the preface as
 * 8.0) and the Bellum Civile. It does NOT carry the Bellum Alexandrinum.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const API = 'https://cts.perseids.org/api/cts/?request=GetPassage&urn=';
const CACHE = path.join(__dirname, '.cache', 'sections');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'latinsuperapp-section-fetch/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return get(new URL(res.headers.location, url).href).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (d) => { body += d; });
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

// Pull <div subtype="section" n="N"> ... </div> in document order. The text may
// carry <gap/>, <del>, <add> and the like; we only ever use the words, so all
// tags are simply dropped.
function sections(xml) {
  const out = [];
  const rx = /<div[^>]*subtype="section"[^>]*\bn="([^"]+)"[^>]*>([\s\S]*?)(?=<div[^>]*subtype="section"|<\/div><\/div><\/div>)/g;
  let m;
  while ((m = rx.exec(xml))) {
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) out.push({ n: m[1], text });
  }
  return out;
}

async function main() {
  const [work, ref] = process.argv.slice(2);
  if (!work || !ref) {
    console.error('usage: node tools/fetch_sections.js <textgroup.work> <book.chapter>');
    process.exit(1);
  }
  const urn = 'urn:cts:latinLit:' + work + '.perseus-lat2:' + ref;
  const xml = await get(API + encodeURIComponent(urn));
  const secs = sections(xml);
  if (!secs.length) throw new Error('no sections found for ' + urn);
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, (work + '.' + ref).replace(/[^\w.]/g, '_') + '.json');
  fs.writeFileSync(file, JSON.stringify({ urn, sections: secs }, null, 2), 'utf8');
  console.log(urn);
  secs.forEach(s => console.log('  ' + s.n + '  ' + s.text.slice(0, 70)));
  console.log('-> ' + path.relative(process.cwd(), file));
}

main().catch(e => { console.error(e.message); process.exit(1); });
