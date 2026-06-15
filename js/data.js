/*
 * data.js - loads and parses archaic_era_draft.md, then exposes a small
 * Promise-based API the pages use:
 *
 *   LatinData.getEras()                -> [ { id, name, available }, ... ]
 *   LatinData.getEra(id)               -> era object (with intro + authors for archaic)
 *   LatinData.getAuthors('archaic')    -> [ author, ... ] in file order
 *   LatinData.getAuthor(era, slug)     -> author | null
 *
 * The markdown file is the single source of truth. When served over http
 * we fetch() it live; when the page is opened from disk (file://) fetch is
 * blocked, so we fall back to the embedded copy in js/content.js
 * (window.__ARCHAIC_MD__).
 */
(function (global) {
  'use strict';

  // --- The five eras, in display order. Only Archaic has content today. ---
  var ERAS = [
    { id: 'archaic', name: 'Archaic Era', available: true },
    { id: 'caesar', name: "Caesar's Age", available: false },
    { id: 'augustus', name: "Augustus' Age", available: false },
    { id: 'early-imperial', name: 'Early Imperial Era', available: false },
    { id: 'late-imperial', name: 'Late Imperial Era', available: false }
  ];

  // --- Explicit author-slug -> real image filename(s) lookup (the table
  // wins over anything derived or written in the markdown). Mind the three
  // .jpeg files. Combined entries carry two portraits. ---
  var IMAGE_LOOKUP = {
    'livius-andronicus': ['livius-andronicus.jpg'],
    'gnaeus-naevius': ['gnaeus-naevius.jpeg'],
    'quintus-ennius': ['quintus-ennius.jpg'],
    'titus-maccius-plautus': ['titus-maccius-plautus.jpg'],
    'marcus-porcius-cato': ['marcus-porcius-cato.jpg'],
    'caecilius-statius': ['caecilius-statius.jpg'],
    'publius-terentius-afer': ['publius-terentius-afer.jpg'],
    'marcus-pacuvius-and-lucius-accius': ['marcus-pacuvius.jpg', 'lucius-accius.jpg'],
    'gaius-lucilius': ['gaius-lucilius.jpeg'],
    'pomponius-bononiensis-and-quintus-novius': ['pomponius-bononiensis.jpg', 'quintus-novius.jpeg']
  };

  // ------------------------------------------------------------------
  // Loading
  // ------------------------------------------------------------------
  function loadArchaicMarkdown() {
    return fetch('archaic_era_draft.md')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .catch(function () {
        // file:// or fetch unavailable -> use the embedded fallback.
        if (global.__ARCHAIC_MD__) return global.__ARCHAIC_MD__;
        throw new Error(
          'Could not load archaic_era_draft.md. Open the app through a local ' +
          'server, or make sure js/content.js is present.'
        );
      });
  }

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Derive the canonical slug from an H1 heading. Strip the date
  // parenthetical, keep the part before " -- " (the Latin name), slugify.
  function slugFromHeading(heading) {
    var name = heading.replace(/\([^)]*\)/g, '');
    if (name.indexOf(' -- ') !== -1) {
      name = name.split(' -- ')[0];
    }
    return slugify(name);
  }

  // A clean display name: drop the date parenthetical, Title Case it but
  // keep the Latin name intact (small words stay lower except first word).
  function displayNameFromHeading(heading) {
    var name = heading.replace(/\([^)]*\)/g, '').trim();
    name = name.replace(/\s*--\s*/g, ' - '); // collapse "--" to a single dash
    var small = { the: 1, and: 1, of: 1, an: 1, a: 1 };
    return name
      .toLowerCase()
      .split(/\b/)
      .map(function (part, idx) {
        if (!/[a-z]/.test(part)) return part;
        if (idx !== 0 && small[part]) return part;
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  }

  // Pull a "(dates)" parenthetical out of a heading line, if present.
  function datesFromText(text) {
    var m = text.match(/\(([^)]*\d[^)]*)\)/);
    return m ? m[1].trim() : '';
  }

  // All date parentheticals (combined entries carry one per author).
  function allDatesFromText(text) {
    var re = /\(([^)]*\d[^)]*)\)/g, m, out = [];
    while ((m = re.exec(text)) !== null) out.push(m[1].trim());
    return out;
  }

  // Remove embedded image lines and their malformed caption lines so the
  // renderer never sees them.
  function cleanBody(text) {
    return text
      .split('\n')
      .filter(function (line) {
        if (/^\s*!\[.*\]\(.*\)\s*$/.test(line)) return false; // image
        if (/^\s*\*.*\(imaginary reconstruction\)\*\*\s*$/.test(line)) return false; // caption
        return true;
      })
      .join('\n')
      .replace(/^\n+/, '')
      .replace(/\n+$/, '');
  }

  // Strip tier-list / ranking language from displayed prose. The source
  // markdown is never modified; this only affects what the app renders.
  // Removes inline "**Lexicon: HIGH**"-style scoring callouts, and drops any
  // sentence mentioning a tier, an NC / "Not Comparable" verdict, or an
  // uppercase HIGH/MEDIUM/LOW criterion score.
  function scrubRanking(text) {
    if (!text) return text;
    // 1) strip bold scoring callouts that contain HIGH/MEDIUM/LOW.
    var t = text.replace(/\s*\*\*[^*]*\b(?:HIGH|MEDIUM|LOW)\b[^*]*\*\*/g, '');
    // 2) per paragraph, drop sentences that carry ranking markers.
    var markerCI = /\btiers?\b|not comparable|GOD PLEASE HELP|START PRAYING/i;
    // Uppercase tier idioms not already covered by "tier" (case-sensitive so
    // ordinary prose like "touch a nerve" is not affected).
    var markerCS = /\bNC\b|\btouch(?:es|ing)?\s+S\b|\bhigh\s+A\b|\bborderline\s+[SAB]\b/;
    var scored = /\b(?:HIGH|MEDIUM|LOW)\b/; // uppercase criterion scores
    var out = t.split(/\n{2,}/).map(function (para) {
      // Leave structural blocks (lists, quotes, headings) untouched.
      if (/^\s*(?:[-*>#]|\d+\.)/.test(para.trim())) return para;
      var sentences = para.split(/(?<=[.!?])\s+(?=["'“*A-Z])/);
      var kept = sentences.filter(function (s) {
        return !markerCI.test(s) && !markerCS.test(s) && !scored.test(s);
      });
      return kept.join(' ').trim();
    }).filter(function (p) { return p.replace(/\s/g, '').length > 0; });
    return out.join('\n\n');
  }

  // ------------------------------------------------------------------
  // Section classification
  // ------------------------------------------------------------------
  function classifySection(title) {
    var t = title.toLowerCase();
    if (/\bbiograph/.test(t)) return 'biography';
    if (/\bwork/.test(t)) return 'works';
    if (/\bstyle\b/.test(t)) return 'style';
    if (/latin excerpt/.test(t)) return 'excerpt';
    if (/final rating/.test(t)) return 'rating';
    return null;
  }

  // ------------------------------------------------------------------
  // Excerpt parsing (returns a list of groups; combined entries have two)
  // ------------------------------------------------------------------
  function parseExcerpts(body) {
    var lines = body.split('\n');
    var groups = [];
    var current = null;
    var field = null; // 'latin' | 'italian' | 'english' | 'analysis'

    function startGroup(title) {
      current = { title: title || null, latin: '', italian: '', english: '', analysis: '' };
      groups.push(current);
      field = null;
    }

    function append(text) {
      if (!current || !field) return;
      current[field] += (current[field] ? '\n' : '') + text;
    }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // A "### Author -- *Work*" subhead begins a new excerpt group.
      var sub = line.match(/^###\s+(.*)$/);
      if (sub) {
        startGroup(sub[1].trim());
        continue;
      }

      // Bold labels switch the active field.
      if (/^\s*\*\*Latin text\*\*/i.test(line)) {
        if (!current) startGroup(null);
        field = 'latin';
        continue;
      }
      if (/^\s*\*\*Italian translation\*\*/i.test(line)) {
        if (!current) startGroup(null);
        field = 'italian';
        continue;
      }
      if (/^\s*\*\*English translation\*\*/i.test(line)) {
        if (!current) startGroup(null);
        field = 'english';
        continue;
      }
      if (/^\s*\*\*Analysis\*\*/i.test(line)) {
        if (!current) startGroup(null);
        field = 'analysis';
        continue;
      }

      // Internal "---" between two excerpts in a combined entry: ignore.
      if (/^\s*---\s*$/.test(line)) {
        continue;
      }

      append(line);
    }

    // Trim each collected field.
    groups.forEach(function (g) {
      ['latin', 'italian', 'english', 'analysis'].forEach(function (k) {
        g[k] = g[k].replace(/^\n+/, '').replace(/\n+$/, '');
      });
    });

    return groups;
  }

  // ------------------------------------------------------------------
  // Top-level parse
  // ------------------------------------------------------------------
  function parseArchaic(markdown) {
    var text = markdown.replace(/\r\n/g, '\n');
    var lines = text.split('\n');

    // Indices of every H1 line ("# ..." but not "## ...").
    var h1 = [];
    for (var i = 0; i < lines.length; i++) {
      if (/^#\s+\S/.test(lines[i])) h1.push(i);
    }

    // Era intro: body after the title H1 up to the first '---'.
    var intro = '';
    if (h1.length > 0) {
      var start = h1[0] + 1;
      var introLines = [];
      for (var j = start; j < lines.length; j++) {
        if (/^\s*---\s*$/.test(lines[j])) break;
        introLines.push(lines[j]);
      }
      intro = scrubRanking(cleanBody(introLines.join('\n')));
    }

    // Author blocks: each subsequent H1 to the next H1 (or EOF).
    var authors = [];
    for (var k = 1; k < h1.length; k++) {
      var blockStart = h1[k];
      var blockEnd = k + 1 < h1.length ? h1[k + 1] : lines.length;
      var blockLines = lines.slice(blockStart, blockEnd);
      var author = parseAuthorBlock(blockLines);
      if (author) authors.push(author);
    }

    return { intro: intro, authors: authors };
  }

  function parseAuthorBlock(blockLines) {
    var headingLine = blockLines[0].replace(/^#\s+/, '').trim();
    var slug = slugFromHeading(headingLine);

    // The canonical IMAGE_LOOKUP is authoritative for slug + images.
    var images = IMAGE_LOOKUP[slug] || [];

    var name = displayNameFromHeading(headingLine);
    var dates = datesFromText(headingLine);

    // Walk the block, splitting on "## " section headings.
    var sections = {};
    var current = null;
    var buffer = [];
    var subheadLine = ''; // an "### ..." right after the H1 (combined entries)

    function flush() {
      if (current) {
        sections[current] = (sections[current] || '') +
          (sections[current] ? '\n' : '') + buffer.join('\n');
      }
      buffer = [];
    }

    for (var i = 1; i < blockLines.length; i++) {
      var line = blockLines[i];
      var h2 = line.match(/^##\s+(.*)$/);
      if (h2) {
        flush();
        current = classifySection(h2[1].trim());
        continue;
      }
      if (current === null) {
        // Pre-section material: capture an "### ..." date subhead, then the
        // intro paragraph that some combined entries place before "## ".
        var pre = line.match(/^###\s+(.*)$/);
        if (pre) subheadLine = pre[1].trim();
        continue;
      }
      buffer.push(line);
    }
    flush();

    // Combined entries: dates live on the "### ..." line, not the H1, and
    // carry one parenthetical per author.
    if (images.length > 1 && subheadLine) {
      var all = allDatesFromText(subheadLine);
      dates = all.length ? all.join('  ·  ') : datesFromText(subheadLine);
    } else if (!dates && subheadLine) {
      dates = datesFromText(subheadLine);
    }

    return {
      slug: slug,
      name: name,
      dates: dates,
      images: images.map(function (file) {
        return { src: 'images/' + file };
      }),
      combined: images.length > 1,
      biography: scrubRanking(cleanBody(sections.biography || '')),
      works: scrubRanking(cleanBody(sections.works || '')),
      style: scrubRanking(cleanBody(sections.style || '')),
      excerpts: parseExcerpts(cleanBody(sections.excerpt || '')).map(function (g) {
        g.analysis = scrubRanking(g.analysis);
        return g;
      })
    };
  }

  // ------------------------------------------------------------------
  // Public API (cached single parse)
  // ------------------------------------------------------------------
  var _archaicPromise = null;

  function getArchaic() {
    if (!_archaicPromise) {
      _archaicPromise = loadArchaicMarkdown().then(parseArchaic);
    }
    return _archaicPromise;
  }

  function getEras() {
    return Promise.resolve(ERAS.map(function (e) {
      return { id: e.id, name: e.name, available: e.available };
    }));
  }

  function getEra(id) {
    var base = ERAS.filter(function (e) { return e.id === id; })[0] || null;
    if (!base) return Promise.resolve(null);
    if (id !== 'archaic') {
      return Promise.resolve({ id: base.id, name: base.name, available: false });
    }
    return getArchaic().then(function (data) {
      return {
        id: base.id,
        name: base.name,
        available: true,
        intro: data.intro,
        authors: data.authors
      };
    });
  }

  function getAuthors(eraId) {
    if (eraId !== 'archaic') return Promise.resolve([]);
    return getArchaic().then(function (data) { return data.authors; });
  }

  function getAuthor(eraId, slug) {
    if (eraId !== 'archaic') return Promise.resolve(null);
    return getArchaic().then(function (data) {
      return data.authors.filter(function (a) { return a.slug === slug; })[0] || null;
    });
  }

  global.LatinData = {
    getEras: getEras,
    getEra: getEra,
    getAuthors: getAuthors,
    getAuthor: getAuthor
  };
})(window);
