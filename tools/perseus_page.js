/*
 * perseus_page.js - build a text "page" for verify.js from a PerseusDL XML, for
 * works whose Latin in the app comes from Perseus instead of the Latin Library.
 *
 *   node tools/perseus_page.js phi0631.phi001      # Sallust, Catilina
 *   node tools/perseus_page.js phi0631.phi002      # Sallust, Iugurtha
 *
 * Writes tools/.cache/<work>.txt: one line per chapter, `[ch] **1.** text **2.**
 * text ...`, the same markers the app prints, which normalise() removes from
 * both sides before comparing. sources.json lists the page as
 * `perseus/<work>`; fetch_sources.js skips that prefix, since the page is built
 * here and not downloaded from the Latin Library.
 *
 * Why it exists (v1.16.14): the Latin Library's Iugurtha modernises Sallust's
 * spelling (maxime, libido, vertere, cum), which conflicts with the school
 * editions the user reads (maxume, lubido, vortere, quom). Both monographs now
 * come from Perseus (perseus-lat3, Ahlberg's Teubner text), read through the
 * same section splitter as xml_sections.js. The digitised text has a handful of
 * plain typos (neccessitudinem, postestas, Iurgurthae): the fragment corrects
 * them with `emend`, so every other character is still proved verbatim.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const work = process.argv[2];
if (!work) { console.error('usage: node tools/perseus_page.js <phi0631.phi002>'); process.exit(1); }
const XML_FILE = path.join(__dirname, '.cache', 'xml', work + '.perseus-lat3.xml');
if (!fs.existsSync(XML_FILE)) { console.error('no XML: run tools/xml_sections.js ' + work + ' 1 first'); process.exit(1); }
const xml = fs.readFileSync(XML_FILE, 'utf8');

const CH = /<div[^>]*subtype="chapter"[^>]*n="(\d+)"[^>]*>|<milestone[^>]*unit="chapter"[^>]*n="(\d+)"[^>]*\/>/g;
const marks = [];
let m;
while ((m = CH.exec(xml))) marks.push({ n: m[1] || m[2], at: m.index, end: CH.lastIndex });

const lines = [];
marks.forEach((mk, i) => {
  const body = xml.slice(mk.end, i + 1 < marks.length ? marks[i + 1].at : undefined);
  const parts = body.split(/<milestone[^>]*unit="section"[^>]*n="(\d+)"[^>]*\/>/);
  const secs = [];
  for (let k = 1; k < parts.length; k += 2) {
    // Same cleaning as xml_sections.js: notes and editorial deletions dropped,
    // editorial additions kept and joined to their word.
    const t = parts[k + 1].replace(/<note[\s\S]*?<\/note>/g, '').replace(/<del>[\s\S]*?<\/del>/g, '')
      .replace(/<\/?add>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    secs.push('**' + parts[k] + '.** ' + t);
  }
  if (secs.length) lines.push('[' + mk.n + '] ' + secs.join(' '));
});
const out = path.join(__dirname, '.cache', work + '.txt');
fs.writeFileSync(out, lines.join('\n') + '\n');
console.log('-> ' + path.relative(process.cwd(), out) + '  (' + lines.length + ' chapters)');
