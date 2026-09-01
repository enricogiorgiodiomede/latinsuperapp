/*
 * fetch_sections_phi.js - the same job as fetch_sections.js, for the one work
 * Perseus does not carry: the Bellum Alexandrinum.
 *
 *   node tools/fetch_sections_phi.js 428 0     # PHI author 428, page 0
 *
 * PHI prints the text in fixed-width lines with a reference in the right-hand
 * column. `N.1` in that column means "section N begins on this line"; a bare
 * number is just a line counter. The section's first word is not necessarily
 * the line's first word, so this tool records the LINE, and the caller decides
 * which word starts the section - always the first word after a sentence end,
 * which is unambiguous in practice and is printed here for checking.
 *
 * As with fetch_sections.js, PHI is consulted only for where the boundaries
 * fall. The Latin in the app is and stays the Latin Library's.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CACHE = path.join(__dirname, '.cache', 'sections');

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.setTimeout(20000, () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

function unescape_(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
}

function rows(html) {
  const body = html.slice(html.indexOf('<div id="loctext">'));
  const out = [];
  const rx = /<tr[^>]*>\s*<td>\s*([\s\S]*?)\s*<\/td>\s*<td>\s*([\s\S]*?)\s*<\/td>/g;
  let m;
  while ((m = rx.exec(body))) {
    const text = unescape_(m[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    const cit = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    out.push({ text, cit });
  }
  return out;
}

async function main() {
  const [author, page] = process.argv.slice(2);
  if (!author) { console.error('usage: node tools/fetch_sections_phi.js <phi-author-id> [page]'); process.exit(1); }
  const url = 'https://latin.packhum.org/loc/' + author + '/1/' + (page || '0');
  const data = rows(await get(url));
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, 'phi' + author + '.' + (page || '0') + '.json');
  fs.writeFileSync(file, JSON.stringify({ url, rows: data }, null, 2), 'utf8');
  data.forEach(r => {
    const mark = /^(\d+)\.1$|^(\d+)\.(\d+)\.1$/.test(r.cit) ? ' <== SECTION ' + r.cit : (r.cit ? '   [' + r.cit + ']' : '');
    console.log(r.text + mark);
  });
  console.log('-> ' + path.relative(process.cwd(), file));
}

main().catch(e => { console.error(e.message); process.exit(1); });
