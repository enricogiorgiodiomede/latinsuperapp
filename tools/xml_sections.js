/*
 * xml_sections.js - build a tools/.cache/sections/<work>.<chapter>.json file
 * straight from the PerseusDL source XML on GitHub, for the chapters the CTS
 * API (tools/fetch_sections.js) cannot serve.
 *
 *   node tools/xml_sections.js phi0631.phi002 4 5 6 8      # Sallust, Iugurtha
 *   node tools/xml_sections.js phi0631.phi001 54           # Sallust, Catilina
 *
 * Why it exists: in the perseus-lat3 XML of both Sallust monographs many
 * chapters are not their own <div> but a <milestone unit="chapter"/> inside the
 * previous chapter's <div> (Catilina 54; 47 chapters of the Iugurtha, starting
 * with 4 and 5). The API then answers HTTP 500 for the milestone chapter, and
 * for the chapter BEFORE it returns a file that silently runs on into the next
 * one (Iugurtha 6 came back with chapter 7's sections attached, 8 with 9's).
 * So for Sallust use this tool for every chapter, not only the ones that fail:
 * it splits on both kinds of chapter marker and cannot overrun.
 *
 * Same edition (perseus-lat3), same JSON shape as fetch_sections.js, so
 * diff_edition.js and mark_sections.js read the output unchanged. The XML is
 * downloaded once into tools/.cache/xml/.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const [work, ...chapters] = process.argv.slice(2);
if (!work || !chapters.length) {
  console.error('usage: node tools/xml_sections.js <phi0631.phi002> <chapter> [chapter ...]');
  process.exit(1);
}
const [author, text] = work.split('.');
const URL = 'https://raw.githubusercontent.com/PerseusDL/canonical-latinLit/master/data/'
  + author + '/' + text + '/' + work + '.perseus-lat3.xml';
const XML_DIR = path.join(__dirname, '.cache', 'xml');
const OUT_DIR = path.join(__dirname, '.cache', 'sections');
const XML_FILE = path.join(XML_DIR, work + '.perseus-lat3.xml');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'latinsuperapp-xml-sections/1.0' } }, (res) => {
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode + ' for ' + url)); res.resume(); return; }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { body += c; });
      res.on('end', () => { fs.writeFileSync(dest, body); resolve(body); });
    }).on('error', reject);
  });
}

function sectionsOf(xml, ch) {
  const CH = /<div[^>]*subtype="chapter"[^>]*n="(\d+)"[^>]*>|<milestone[^>]*unit="chapter"[^>]*n="(\d+)"[^>]*\/>/g;
  const marks = [];
  let m;
  while ((m = CH.exec(xml))) marks.push({ n: m[1] || m[2], at: m.index, end: CH.lastIndex });
  const i = marks.findIndex((x) => x.n === String(ch));
  if (i < 0) throw new Error('chapter ' + ch + ' not found in ' + work);
  const body = xml.slice(marks[i].end, i + 1 < marks.length ? marks[i + 1].at : undefined);
  const parts = body.split(/<milestone[^>]*unit="section"[^>]*n="(\d+)"[^>]*\/>/);
  const out = [];
  for (let k = 1; k < parts.length; k += 2) {
    // <del> is an editor's deletion (Catilina 54.6 <del>ad</del>sequebatur):
    // dropped, so the text reads as the edition prints it.
    const t = parts[k + 1].replace(/<note[\s\S]*?<\/note>/g, '').replace(/<del>[\s\S]*?<\/del>/g, '')
      .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    out.push({ n: parts[k], text: t });
  }
  return out;
}

(async () => {
  fs.mkdirSync(XML_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const xml = fs.existsSync(XML_FILE) ? fs.readFileSync(XML_FILE, 'utf8') : await download(URL, XML_FILE);
  for (const ch of chapters) {
    const sections = sectionsOf(xml, ch);
    const file = path.join(OUT_DIR, work + '.' + ch + '.json');
    fs.writeFileSync(file, JSON.stringify({ urn: 'urn:cts:latinLit:' + work + '.perseus-lat3:' + ch, source: 'PerseusDL canonical-latinLit XML (GitHub)', sections }, null, 2));
    console.log('-> ' + path.relative(process.cwd(), file) + '  (' + sections.length + ' sections)');
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
