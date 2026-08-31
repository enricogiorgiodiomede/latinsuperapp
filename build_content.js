/*
 * build_content.js - generator. Embeds the per-era ENGLISH working files into
 * js/content.js as window.__<ERA>_MD__ string literals.
 *
 * Why this exists: over http the app fetches the .md files live (see the header
 * of js/data.js), and js/content.js is only the fallback used when the page is
 * opened from disk, where fetch() is blocked by the file:// origin. Because the
 * fallback is invisible during normal browser testing, it drifts silently - it
 * was 2759 characters behind caesar_era_draft.md when this script was written in
 * v1.9.4, having missed the four-way split of Cicero's Main Works in v1.8.3.
 *
 * Run it after editing ANY *_era_draft.md, exactly as build_content_it.js is run
 * after editing an italian_translations_*.md file.
 *
 *   node build_content.js
 */
'use strict';
var fs = require('fs');

var OUT = 'js/content.js';

// One entry per era: the source file and the global the app looks for.
var ERAS = [
  { key: '__ARCHAIC_MD__', src: 'archaic_era_draft.md' },
  { key: '__CAESAR_MD__', src: 'caesar_era_draft.md' }
];

var out = '';
ERAS.forEach(function (era) {
  // Normalise line endings: with git's core.autocrlf=true a checkout hands back
  // CRLF, and embedding that would make the fallback differ from the fetched
  // copy by a carriage return on every line.
  var md = fs.readFileSync(era.src, 'utf8').replace(/\r\n/g, '\n');
  out += 'window.' + era.key + '=' + JSON.stringify(md) + ';\n';
  console.log(era.key.padEnd(16) + era.src.padEnd(26) + md.length + ' chars');
});

fs.writeFileSync(OUT, out);
console.log('written ' + OUT);
