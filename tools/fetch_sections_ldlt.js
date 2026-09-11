/*
 * fetch_sections_ldlt.js - subsection boundaries for the Bellum Alexandrinum,
 * from the Library of Digital Latin Texts edition (ed. Cynthia Damon et al.,
 * CC BY-SA 4.0): https://github.com/Library-of-Digital-Latin-Texts/balex
 *
 *   node tools/fetch_sections_ldlt.js            # fetch (if not cached) and split all 78 chapters
 *   node tools/fetch_sections_ldlt.js --force    # re-download the XML
 *
 * Why this exists. Perseus does not publish the Bellum Alexandrinum at all, and
 * PHI - where the markers for chapters 1 and 2 were hand-read at launch - is now
 * behind a bot challenge. v1.13.2 shipped twelve chapters with no markers
 * because no reachable edition could be found. This one is better than either:
 * a current critical edition, encoded in TEI, with every section numbered.
 *
 * The encoding: each chapter is <p n="N">, each section <seg n="M">, and the
 * apparatus sits inline as <app><lem>edited reading</lem><rdg>variant</rdg>
 * <note>...</note></app>. The text of a section is the seg with every <rdg>
 * and <note> removed and the <lem> kept - i.e. the edited text.
 *
 * As with fetch_sections.js and the Perseus files, this edition is consulted
 * ONLY for where the boundaries fall. The Latin in the app is and stays the
 * Latin Library's; mark_sections.js anchors on the opening words of each
 * section, and where the two editions spell or read differently at a boundary
 * it stops rather than guess, and the difference is resolved by an override.
 *
 * Output: tools/.cache/sections/ldlt-balex.<N>.json, in the same shape as the
 * Perseus files: { urn, sections: [{ n, text }] }.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const URL = 'https://raw.githubusercontent.com/Library-of-Digital-Latin-Texts/balex/main/ldlt-balex.xml';
const CACHE = path.join(__dirname, '.cache', 'sections');
const XML = path.join(CACHE, 'ldlt-balex.xml');

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

// The edited text of a fragment of TEI: variants and notes out, lemmata in,
// comments and every remaining tag stripped, whitespace collapsed.
function editedText(xml) {
  return xml
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<rdg\b[\s\S]*?<\/rdg>/g, '')
    .replace(/<rdg\b[^>]*\/>/g, '')
    .replace(/<note\b[\s\S]*?<\/note>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    // The edition sets em-dashes closed up (`sustinebimus—neque`). The matcher
    // splits on whitespace and drops non-letters, so a closed dash welds two
    // words into one (`sustinebimusneque`) and an anchor straddling it matches
    // nothing. Open the dashes out; the matcher then discards them.
    .replace(/\s*[—–]\s*/g, ' — ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:?!])/g, '$1')
    .trim();
}

async function main() {
  fs.mkdirSync(CACHE, { recursive: true });
  if (!fs.existsSync(XML) || process.argv.includes('--force')) {
    fs.writeFileSync(XML, await get(URL), 'utf8');
  }
  const src = fs.readFileSync(XML, 'utf8');
  // Only the edition, not the commentary divs that follow it. The end has to be
  // found as a <div type="commentary">: the apparatus also carries inline
  // <note type="commentary"> pointers INSIDE the edition, and cutting at the
  // first `type="commentary"` string stopped the parse after chapter 1.
  const ed = src.slice(src.indexOf('type="edition"'));
  const end = ed.search(/<div\b[^>]*type="commentary"/);
  const body = end > 0 ? ed.slice(0, end) : ed;

  const chapRe = /<p\b[^>]*\bn="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
  let m, chapters = 0, sections = 0;
  while ((m = chapRe.exec(body))) {
    const n = m[1];
    const segs = [];
    const segRe = /<seg\b[^>]*\bn="(\d+)"[^>]*>([\s\S]*?)<\/seg>/g;
    let s;
    while ((s = segRe.exec(m[2]))) segs.push({ n: s[1], text: editedText(s[2]) });
    if (!segs.length) continue;
    fs.writeFileSync(path.join(CACHE, 'ldlt-balex.' + n + '.json'),
      JSON.stringify({ urn: 'ldlt:balex:' + n, source: URL, sections: segs }, null, 2), 'utf8');
    chapters++; sections += segs.length;
  }
  console.log(chapters + ' chapters, ' + sections + ' sections -> tools/.cache/sections/ldlt-balex.<N>.json');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
