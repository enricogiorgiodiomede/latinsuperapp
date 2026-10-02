/*
 * build_sitemap.js - regenerate sitemap.xml from the shipped data.
 *
 *   node tools/build_sitemap.js
 *
 * Every page of this site is one of six HTML files plus a query string, and
 * every link to a deep page is built in JavaScript at runtime. A crawler that
 * does not execute JS therefore finds no path from the home page to any author,
 * so the sitemap is the ONLY discovery route Google has. It has to be generated
 * rather than hand-written, or it silently rots the next time an author lands.
 *
 * What goes in, and why only this:
 *
 *   /                            the home page
 *   index.html?era=caesar        the other era listing. NOT ?era=archaic:
 *                                archaic is the default, so that URL and / are
 *                                the same page (js/home.js state.selected).
 *   author.html?era=&id=         one per author, the real reading content
 *   practice-select.html?era=&id= for the authors with needsSelection
 *   metre.html                   the metre index
 *   metre.html?m=                one per metre page
 *
 * Deliberately OUT, for now: the ~544 practice.html?frag= URLs and every
 * version.html?v= URL. The excerpt pages hold the most distinctive content on
 * the site and are its best long-tail asset, but they render only behind ~5.9 MB
 * of blocking JS, and pushing 544 such URLs at a domain with no crawl history
 * tends to produce a wall of "Crawled - currently not indexed" instead of
 * rankings. Confirm the ~40 below index cleanly first, then add them: the
 * fragment loop is a dozen lines (walk PracticeBank works -> fragments).
 *
 * version.html is additionally marked noindex in its own head: it is a
 * per-release excerpt listing, near-identical across ?v= values.
 *
 * No lastmod / changefreq / priority: there is no honest per-page timestamp to
 * report, and Google ignores the other two.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const ORIGIN = 'https://latinsuperapp.com/';
const OUT = path.join(REPO, 'sitemap.xml');

// ---------------------------------------------------------------- the data

// The practice bank gives the author slugs and which of them need a work
// chooser, but it does not know which era an author belongs to.
global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const BANK = global.window.PracticeBank.authors;

// js/metres.js expects an I18n; it only ever reads .lang, and English is the
// base language, so a stub is enough to load the table (as check_metres.js does).
global.I18n = { lang: 'en' };
eval(fs.readFileSync(path.join(REPO, 'js/metres.js'), 'utf8'));
const METRE_IDS = Object.keys(global.window.Metres.PAGES);

// Era membership lives only in ERA_CONFIG's imageLookup tables in js/data.js,
// which is an IIFE and exports nothing, so read it out of the source. The keys
// of each era's imageLookup ARE that era's author slugs, in display order.
function erasFromDataJs() {
  const src = fs.readFileSync(path.join(REPO, 'js/data.js'), 'utf8');
  const start = src.indexOf('var ERA_CONFIG = {');
  if (start === -1) throw new Error('ERA_CONFIG not found in js/data.js');
  const block = src.slice(start, src.indexOf('\n  };', start));

  const eras = [];
  // Each era opens at four spaces of indent, e.g. "    archaic: {".
  const eraRe = /\n {4}([a-z][a-zA-Z]*): \{/g;
  let m;
  const marks = [];
  while ((m = eraRe.exec(block)) !== null) marks.push({ id: m[1], at: m.index });

  marks.forEach(function (mark, i) {
    const chunk = block.slice(mark.at, i + 1 < marks.length ? marks[i + 1].at : block.length);
    const lookupAt = chunk.indexOf('imageLookup: {');
    if (lookupAt === -1) return;
    const slugs = [];
    const slugRe = /'([a-z0-9-]+)': \[/g;
    let s;
    while ((s = slugRe.exec(chunk.slice(lookupAt))) !== null) slugs.push(s[1]);
    if (slugs.length) eras.push({ id: mark.id, slugs: slugs });
  });

  if (!eras.length) throw new Error('no eras parsed out of ERA_CONFIG');
  return eras;
}

const ERAS = erasFromDataJs();

// ---------------------------------------------------------------- the URLs

const urls = [];
function add(loc) {
  if (urls.indexOf(loc) === -1) urls.push(loc);
}

add(ORIGIN);

// Era listings, minus the default era, whose URL duplicates the home page.
const DEFAULT_ERA = 'archaic';
ERAS.forEach(function (era) {
  if (era.id !== DEFAULT_ERA) add(ORIGIN + 'index.html?era=' + era.id);
});

// Authors, and the work chooser for those that have one.
const missing = [];
ERAS.forEach(function (era) {
  era.slugs.forEach(function (slug) {
    add(ORIGIN + 'author.html?era=' + era.id + '&id=' + slug);
    const entry = BANK[slug];
    if (!entry) {
      missing.push(slug);
      return;
    }
    if (entry.needsSelection) {
      add(ORIGIN + 'practice-select.html?era=' + era.id + '&id=' + slug);
    }
  });
});

// Metres.
add(ORIGIN + 'metre.html');
METRE_IDS.forEach(function (id) { add(ORIGIN + 'metre.html?m=' + id); });

// ---------------------------------------------------------------- the file

// & is not legal raw in XML text, and every deep URL here has one.
function xmlEscape(s) {
  return s.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const body = urls.map(function (loc) {
  return '  <url>\n    <loc>' + xmlEscape(loc) + '</loc>\n  </url>';
}).join('\n');

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<!-- Generated by tools/build_sitemap.js - do not edit by hand. -->\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  body + '\n' +
  '</urlset>\n';

fs.writeFileSync(OUT, xml);

// ---------------------------------------------------------------- report

const counts = {
  authors: urls.filter(function (u) { return u.indexOf('author.html') !== -1; }).length,
  selects: urls.filter(function (u) { return u.indexOf('practice-select.html') !== -1; }).length,
  metres: urls.filter(function (u) { return u.indexOf('metre.html?m=') !== -1; }).length,
  eras: urls.filter(function (u) { return u.indexOf('index.html?era=') !== -1; }).length
};

console.log('sitemap.xml written: ' + urls.length + ' URLs');
console.log('  home              1');
console.log('  era listings      ' + counts.eras + '   (of ' + ERAS.length + ' eras; the default era is the home page)');
console.log('  authors           ' + counts.authors);
console.log('  work choosers     ' + counts.selects);
console.log('  metre index       1');
console.log('  metre pages       ' + counts.metres);
ERAS.forEach(function (e) {
  console.log('  era ' + e.id + ': ' + e.slugs.length + ' authors');
});
if (missing.length) {
  console.log('\nNOTE: no practice bank entry for: ' + missing.join(', '));
  console.log('      (their author pages are still listed - an author page does');
  console.log('       not require excerpts)');
}
