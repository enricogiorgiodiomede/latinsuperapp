/*
 * fetch_sources.js - download the Latin Library pages listed in sources.json
 * and cache them as plain text in tools/.cache/. Run this once in a fresh
 * session; verify.js needs the cache, and so do you when picking passages.
 *
 *   node tools/fetch_sources.js              # everything missing from the cache
 *   node tools/fetch_sources.js cicero/cael  # just one page
 *   node tools/fetch_sources.js --force      # re-download everything
 *
 * No dependencies. The cache is gitignored: it is a copy of someone else's
 * text, and it is one command to rebuild.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const { stripHtml } = require('./strip');

const HOST = 'https://thelatinlibrary.com/';
const CACHE = path.join(__dirname, '.cache');

function pagesFromConfig() {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources.json'), 'utf8'));
  const out = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) node.forEach(p => out.add(p));
    else if (node && typeof node === 'object') Object.values(node).forEach(walk);
  };
  Object.entries(cfg).forEach(([k, v]) => { if (k !== '_comment') walk(v); });
  return [...out];
}

// Most of the library is single-byte, but a few pages are saved as UTF-16 with
// a byte-order mark - cicero/fratrem3 is one. Decoding those as latin1 gives a
// file where every character is separated by a NUL, which strip.js then turns
// into a page of single letters spaced out by whitespace. Nothing errors: the
// cache just quietly becomes unusable, and a fragment sourced from it would
// fail verification for no visible reason. Check the BOM before decoding.
function decode(buf) {
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) return buf.toString('utf16le', 2);
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) return buf.swap16().toString('utf16le', 2);
  return buf.toString('latin1');
}

function get(url) {
  return new Promise((resolve, reject) => {
    // thelatinlibrary.com answers 465 to requests with no User-Agent.
    const opts = { headers: { 'User-Agent': 'latinsuperapp-source-fetch/1.0' } };
    https.get(url, opts, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(decode(Buffer.concat(chunks))));
    }).on('error', reject);
  });
}

(async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const only = args.filter(a => !a.startsWith('--'));
  const pages = only.length ? only : pagesFromConfig();

  fs.mkdirSync(CACHE, { recursive: true });
  for (const page of pages) {
    const name = page.split('/').pop() + '.txt';
    const dest = path.join(CACHE, name);
    if (!force && fs.existsSync(dest)) { console.log('cached  ' + name); continue; }
    try {
      const text = stripHtml(await get(HOST + page + '.shtml'));
      fs.writeFileSync(dest, text);
      console.log('fetched ' + name.padEnd(18) + text.length + ' chars');
    } catch (e) {
      console.log('FAILED  ' + name.padEnd(18) + e.message);
    }
  }
})();
