/*
 * comic_metres.js - what metre is each comic excerpt in, verse by verse?
 *
 *   node tools/comic_metres.js            report every excerpt
 *   node tools/comic_metres.js --assign   print the ASSIGN entries for metres.js
 *   node tools/comic_metres.js --check    corroborate against tools/scan_drama.js
 *
 * WHERE THE ANSWER COMES FROM
 *
 * Timothy J. Moore, *The Meters of Roman Comedy* (Washington University in St
 * Louis, https://hdwlabs.artsci.wustl.edu/romancomedy/), a database of every
 * metrical unit in the surviving plays of Plautus and Terence, built on Cesare
 * Questa's work. The site publishes itself as one TSV, which this tool reads
 * from tools/.cache/moore-meters.tsv, and the fields it uses are the play, the
 * first and last verse of each metrical unit, and its metre.
 *
 * Nothing here is derived from the text: the metre of a verse of Plautus is a
 * scholarly result, not something to be guessed at from the spelling, and this
 * project does not assert what it cannot source. `tools/scan_drama.js` is the
 * second opinion, not the first: it works from the syllables alone and can say
 * that a metre is impossible for a line, which is a useful thing to hear from
 * something that has never seen the database.
 *
 * WHAT IT DOES NOT COVER
 *
 * Caecilius Statius, who survives only in quotations and is not in the database
 * at all. His five Plocium fragments are labelled from Gellius, who quotes them
 * precisely in order to compare Caecilius' metre with Menander's, and they are
 * listed here as exceptions with that provenance.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const TSV = path.join(__dirname, '.cache', 'moore-meters.tsv');

global.window = {};
eval(fs.readFileSync(path.join(REPO, 'js/fragments.js'), 'utf8'));
const AUTHORS = window.PracticeBank.authors;

// bank work id -> the play as the database names it
const PLAY = {
  amphitruo: 'Amphitruo', asinaria: 'Asinaria', aulularia: 'Aulularia',
  bacchides: 'Bacchides', casina: 'Casina', menaechmi: 'Menaechmi',
  'miles-gloriosus': 'Miles Gloriosus', mostellaria: 'Mostellaria',
  pseudolus: 'Pseudolus', truculentus: 'Truculentus',
  andria: 'Andria', hecyra: 'Hecyra', 'heauton-timorumenos': 'Heauton',
  eunuchus: 'Eunuchus', phormio: 'Phormio', adelphoe: 'Adelphoe'
};

// the database's metre codes, for the metres this app has pages for
const NAMES = {
  ia6: 'iambic-senarius', ia7: 'iambic-septenarius', ia8: 'iambic-octonarius',
  tr7: 'trochaic-septenarius', tr8: 'trochaic-octonarius'
};

function units() {
  if (!fs.existsSync(TSV)) {
    console.error('missing ' + TSV + '\n  fetch it from https://hdwlabs.artsci.wustl.edu/romancomedy/tsv/current.tsv');
    process.exit(2);
  }
  const rows = fs.readFileSync(TSV, 'utf8').split('\n').filter(Boolean).map(function (l) { return l.split('\t'); });
  const h = rows.shift().map(function (s) { return s.trim(); });
  const F = h.indexOf('line_number_first_label'), L = h.indexOf('line_number_last_label'),
    M = h.indexOf('meter'), P = h.indexOf('fabulae');
  // The database has one row per character per metrical unit, so the same unit
  // appears several times; they collapse to a set of (play, first, last, metre).
  const seen = new Set(), out = [];
  // A label is a verse number, sometimes with a letter (0611a). Some rows label
  // a quoted fragment instead ("frag. 4, line 1"), which is not a place in the
  // play at all: stripping its digits would turn it into verse 41.
  const num = function (s) {
    const t = String(s).trim();
    if (!/^\d+[a-z]?$/i.test(t)) return null;
    return parseInt(t, 10);
  };
  rows.forEach(function (r) {
    const key = r[P] + '|' + r[F] + '|' + r[L] + '|' + r[M];
    if (seen.has(key)) return;
    seen.add(key);
    const from = num(r[F]), to = num(r[L]);
    if (from == null || to == null) return;          // a quoted fragment, not a verse
    out.push({ play: r[P], from: from, to: to, metre: (r[M] || '').trim() });
  });
  return out;
}

const UNITS = units();

// The metre of every verse in [a, b] of one play, as runs.
function runsFor(play, a, b) {
  const hits = UNITS.filter(function (u) { return u.play === play && u.to >= a && u.from <= b; })
    .sort(function (x, y) { return x.from - y.from; });
  const runs = [];
  hits.forEach(function (u) {
    const from = Math.max(u.from, a), to = Math.min(u.to, b);
    if (to < from) return;
    const last = runs[runs.length - 1];
    if (last && last.metre === u.metre && from <= last.to + 1) last.to = Math.max(last.to, to);
    else runs.push({ metre: u.metre, from: from, to: to });
  });
  return runs;
}

function rangeOf(citation) {
  const m = citation.match(/vv?\.\s*(\d+)(?:\s*-\s*(\d+))?/);
  if (!m) return null;
  return { a: Number(m[1]), b: Number(m[2] || m[1]) };
}

function excerpts(slug) {
  const out = [];
  AUTHORS[slug].works.forEach(function (w) {
    w.fragments.forEach(function (f, i) { out.push({ work: w.id, index: i, frag: f }); });
  });
  return out;
}

const COMIC = ['titus-maccius-plautus', 'publius-terentius-afer'];

function analyse() {
  const rows = [];
  COMIC.forEach(function (slug) {
    excerpts(slug).forEach(function (it) {
      const play = PLAY[it.work], r = rangeOf(it.frag.citation);
      const runs = (play && r) ? runsFor(play, r.a, r.b) : [];
      rows.push({ slug: slug, work: it.work, index: it.index, citation: it.frag.citation,
        a: r && r.a, b: r && r.b, runs: runs });
    });
  });
  return rows;
}

function describe(runs) {
  return runs.map(function (r) {
    return r.metre + ' ' + (r.from === r.to ? r.from : r.from + '-' + r.to);
  }).join(' | ');
}

const rows = analyse();
const arg = process.argv[2];

if (arg === '--assign') {
  // ASSIGN entries, keyed by citation, ready for js/metres.js
  const byAuthor = {};
  rows.forEach(function (row) {
    if (!row.runs.length) return;
    // An excerpt that contains even one lyric metre is a canticum, and is
    // labelled as one: naming eight metres on a tablet would tell a reader
    // nothing, and the cantica page exists to explain the whole species.
    const known = row.runs.every(function (r) { return NAMES[r.metre]; });
    if (!known) {
      byAuthor[row.slug] = byAuthor[row.slug] || {};
      byAuthor[row.slug][row.work] = byAuthor[row.slug][row.work] || [];
      byAuthor[row.slug][row.work].push("        '" + row.citation + "': 'canticum'");
      return;
    }
    const single = row.runs.length === 1;
    const value = single
      ? "'" + NAMES[row.runs[0].metre] + "'"
      : '[' + row.runs.map(function (r) {
        return "{ m: '" + NAMES[r.metre] + "', from: " + r.from + ", to: " + r.to + ' }';
      }).join(', ') + ']';
    byAuthor[row.slug] = byAuthor[row.slug] || {};
    byAuthor[row.slug][row.work] = byAuthor[row.slug][row.work] || [];
    byAuthor[row.slug][row.work].push("        '" + row.citation + "': " + value);
  });
  Object.keys(byAuthor).forEach(function (slug) {
    console.log("    '" + slug + "': {");
    Object.keys(byAuthor[slug]).forEach(function (work) {
      console.log("      '" + work + "': { byCitation: {");
      console.log(byAuthor[slug][work].join(',\n'));
      console.log('      } },');
    });
    console.log('    },');
  });
} else if (arg === '--check') {
  // Second opinion: does the syllable scanner allow what the database says?
  // The scanner reads one text line as one verse, so it can only be asked about
  // an excerpt that is printed one verse to a line. Where a verse is split
  // between two speakers - which the text does at every change of speaker - the
  // halves are not verses and would be refuted whatever their metre is.
  let agree = 0, refused = 0, skipped = 0, split = 0;
  rows.forEach(function (row) {
    if (row.runs.length !== 1 || !NAMES[row.runs[0].metre]) { skipped++; return; }
    const frag = excerpts(row.slug).filter(function (e) { return e.work === row.work; })[row.index].frag;
    const lines = frag.latin.split('\n').filter(function (l) { return l.replace(/^>\s?/, '').trim(); }).length;
    if (lines !== row.b - row.a + 1) { split++; return; }
    let out;
    try {
      out = execSync('node "' + path.join(__dirname, 'scan_drama.js') + '"' +
        (process.argv.indexOf('--lax') >= 0 ? ' --lax' : '') + ' --claim ' +
        row.slug + ' ' + row.work + ' ' + row.index + ' ' + NAMES[row.runs[0].metre],
      { encoding: 'utf8' });
    } catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
    const bad = (out.match(/^REFUTED/gm) || []).length;
    if (bad) { refused++; console.log('scanner refuses ' + row.runs[0].metre + ' in ' + bad +
      ' line(s) of ' + row.citation); }
    else agree++;
  });
  console.log('\n' + agree + ' excerpts where the scanner allows the database\'s metre, ' +
    refused + ' where it refuses at least one line, ' + split + ' printed with verses split between speakers, ' + skipped + ' not single-metre');
} else {
  let single = 0, mixed = 0, canticum = 0;
  rows.forEach(function (row) {
    const known = row.runs.length && row.runs.every(function (r) { return NAMES[r.metre]; });
    const kind = !row.runs.length ? 'NO DATA' : (!known ? 'canticum' : (row.runs.length === 1 ? 'single' : 'MIXED'));
    if (kind === 'single') single++; else if (kind === 'MIXED') mixed++; else canticum++;
    console.log(kind.padEnd(9) + row.citation.replace(/^\(|\)$/g, '').padEnd(46) + ' ' + describe(row.runs));
  });
  console.log('\n' + single + ' in one metre, ' + mixed + ' in more than one, ' +
    canticum + ' with at least one metre this app has no page for');
}
