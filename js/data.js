/*
 * data.js - loads and parses the per-era draft markdown, then exposes a small
 * Promise-based API the pages use:
 *
 *   LatinData.getEras()              -> [ { id, name, available }, ... ]
 *   LatinData.getEra(id)            -> era object (with intro + authors when available)
 *   LatinData.getAuthors(eraId)     -> [ author, ... ] in file order
 *   LatinData.getAuthor(era, slug)  -> author | null
 *
 * Each era's markdown file is the single source of truth. When served over http
 * we fetch() it live; when the page is opened from disk (file://) fetch is
 * blocked, so we fall back to the embedded copy in js/content.js
 * (window.__ARCHAIC_MD__ / window.__CAESAR_MD__).
 */
(function (global) {
  'use strict';

  // --- The five eras, in display order. Archaic + Caesar have content today.
  // `nameKey` resolves to the localized display name via I18n at call time. ---
  var ERAS = [
    { id: 'archaic', nameKey: 'era.archaic', available: true },
    { id: 'caesar', nameKey: 'era.caesar', available: true },
    { id: 'augustus', nameKey: 'era.augustus', available: false },
    { id: 'early-imperial', nameKey: 'era.earlyImperial', available: false },
    { id: 'late-imperial', nameKey: 'era.lateImperial', available: false }
  ];

  function eraName(e) { return I18n.t(e.nameKey); }

  // --- Per-era configuration. `imageDir` is the portrait folder; `imageLookup`
  // maps author slug -> real image filename(s) (the table wins over anything
  // derived or written in the markdown; combined entries carry two portraits).
  // `embeddedKey` is the window global holding the offline-fallback markdown. ---
  var ERA_CONFIG = {
    archaic: {
      mdFile: 'archaic_era_draft.md',
      imageDir: 'images_archaic/',
      embeddedKey: '__ARCHAIC_MD__',
      imageLookup: {
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
      }
    },
    caesar: {
      mdFile: 'caesar_era_draft.md',
      imageDir: 'images_caesar/',
      embeddedKey: '__CAESAR_MD__',
      imageLookup: {
        'marcus-terentius-varro': ['marcus-terentius-varro.jpg'],
        'cornelius-nepos': ['cornelius-nepos.png'],
        'quintus-hortensius-hortalus': ['quintus-hortensius-hortalus.png'],
        // Figulus has no ancient portrait; the image is Pythagoras, whose
        // tradition Nigidius tried to revive (see IMAGE_NOTE / the caption).
        'publius-nigidius-figulus': ['publius-nigidius-figulus.jpg'],
        'marcus-tullius-cicero': ['marcus-tullius-cicero.jpeg'],
        'gaius-julius-caesar': ['gaius-julius-caesar.jpg'],
        'aulus-hirtius': ['aulus-hirtius.jpg'],
        'titus-lucretius-carus': ['titus-lucretius-carus.png'],
        'gaius-sallustius-crispus': ['gaius-sallustius-crispus.png'],
        'gaius-valerius-catullus': ['gaius-valerius-catullus.png']
      }
    }
  };

  function isAvailable(id) {
    return !!ERA_CONFIG[id];
  }

  // ------------------------------------------------------------------
  // Loading
  // ------------------------------------------------------------------
  // The era drafts are fetched at runtime, so they need the same ?v= the
  // scripts carry: without it a browser can keep serving stale prose after a
  // draft is edited, even though the JS was cache-busted. Read the version off
  // whichever script tag has one rather than hard-coding it here.
  function assetVersion() {
    try {
      var s = document.querySelector('script[src*="?v="]');
      var m = s && s.getAttribute('src').match(/[?&]v=([^&]+)/);
      return m ? m[1] : null;
    } catch (e) { return null; }
  }

  function loadMarkdown(eraId) {
    var cfg = ERA_CONFIG[eraId];
    var v = assetVersion();
    return fetch(cfg.mdFile + (v ? '?v=' + encodeURIComponent(v) : ''))
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .catch(function () {
        // file:// or fetch unavailable -> use the embedded fallback.
        if (global[cfg.embeddedKey]) return global[cfg.embeddedKey];
        throw new Error(I18n.t('error.loadFailed'));
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

  // Normalize a date range's dash: some drafts write "116--27 BC" (double),
  // others "284-204 BC" (single). Show a single regular dash either way.
  function normalizeDateDash(s) {
    return s.replace(/\s*--\s*/g, '-');
  }

  // Pull a "(dates)" parenthetical out of a heading line, if present.
  function datesFromText(text) {
    var m = text.match(/\(([^)]*\d[^)]*)\)/);
    return m ? normalizeDateDash(m[1].trim()) : '';
  }

  // All date parentheticals (combined entries carry one per author).
  function allDatesFromText(text) {
    var re = /\(([^)]*\d[^)]*)\)/g, m, out = [];
    while ((m = re.exec(text)) !== null) out.push(normalizeDateDash(m[1].trim()));
    return out;
  }

  // Remove embedded image lines and their caption lines so the renderer never
  // sees them. Captions appear as either "*Name *(imaginary reconstruction)**"
  // (Archaic) or "*Name (imaginary reconstruction)*" (Caesar); match both.
  function cleanBody(text) {
    return text
      .split('\n')
      .filter(function (line) {
        if (/^\s*!\[.*\]\(.*\)\s*$/.test(line)) return false; // image
        if (/^\s*\*+.*\(imaginary reconstruction\)\*+\s*$/.test(line)) return false; // caption
        return true;
      })
      .join('\n')
      .replace(/^\n+/, '')
      .replace(/\n+$/, '');
  }

  // Tidy orphan punctuation left behind after callouts / sentences are removed
  // (e.g. "anchoring. ; ; ." -> "anchoring."). Applied per paragraph.
  function tidyPunct(s) {
    return s
      .replace(/\(\s*\)/g, '')                    // empty ()
      .replace(/\(\s*[;,]\s*/g, '(')              // "( ;" -> "("
      .replace(/\s*[;,]\s*(?=[.;,!?])/g, '')      // a ; or , hugging another punctuation mark
      .replace(/([.!?])[\s;,]*(?=[.!?])/g, '$1')  // collapse ".;." / ". ; ." -> "."
      .replace(/\.{2,}/g, '.')                    // ".." -> "."
      .replace(/\s+([.;,!?])/g, '$1')             // space before punctuation
      .replace(/\s{2,}/g, ' ')                    // double spaces
      .replace(/^[\s;,.]+/, '')                   // leading orphan punctuation
      .trim();
  }

  // Strip tier-list / ranking language from displayed prose. The source
  // markdown is never modified; this only affects what the app renders.
  // Removes inline "**Lexicon: HIGH**"-style scoring callouts (plus any score
  // gloss in parentheses right after one), and drops any sentence mentioning a
  // tier, an NC / "Not Comparable" verdict, or an uppercase score word.
  function scrubRanking(text) {
    if (!text) return text;
    // 1) strip bold scoring callouts (+ an immediately following parenthetical gloss).
    var t = text.replace(/\*\*[^*]*\b(?:HIGH|MEDIUM|LOW)\b[^*]*\*\*\s*(?:\([^)]*\))?/g, '');
    // 2) per paragraph, drop sentences that carry ranking markers, then tidy.
    var markerCI = /\btiers?\b|not comparable|GOD PLEASE HELP|START PRAYING/i;
    // Uppercase tier idioms not already covered by "tier" (case-sensitive so
    // ordinary prose like "touch a nerve" is not affected).
    var markerCS = /\bNC\b|\btouch(?:es|ing)?\s+S\b|\bhigh\s+A\b|\bborderline\s+[SAB]\b/;
    var scored = /\b(?:HIGH|MEDIUM|LOW)\b/; // uppercase criterion scores
    var out = t.split(/\n{2,}/).map(function (para) {
      // Leave true structural blocks (lists, quotes, headings) untouched. A
      // bullet needs a marker FOLLOWED BY whitespace, so "**bold**"/"*italic*"
      // lead-ins are still scrubbed.
      if (/^\s*(?:[-*+]\s|\d+\.\s|#{1,6}\s|>)/.test(para.trim())) return para;
      var sentences = para.split(/(?<=[.!?])\s+(?=["'“*A-Z])/);
      var kept = sentences.filter(function (s) {
        return !markerCI.test(s) && !markerCS.test(s) && !scored.test(s);
      });
      return tidyPunct(kept.join(' ').trim());
    }).filter(function (p) { return p.replace(/\s/g, '').length > 0; });
    return out.join('\n\n');
  }

  // Italian counterpart of scrubRanking: the Italian source mirrors the same
  // tier scoring the English app hides (uppercase ALTO/MEDIO/BASSO callouts,
  // "Livello S/A/B/C", "NC", "Non Comparabile/Classificabile"). Keyed only on
  // those unambiguous markers - the ordinary word "livello" is never a trigger.
  function scrubRankingIt(text) {
    if (!text) return text;
    var scoreWords = '(?:ALTO|ALTA|ALTI|ALTE|MEDIO|MEDIA|MEDI|MEDIE|BASSO|BASSA|BASSI|BASSE|HIGH|MEDIUM|LOW)';
    // 1) strip bold scoring callouts (+ a following parenthetical gloss).
    var t = text.replace(new RegExp('\\*\\*[^*]*\\b' + scoreWords + '\\b[^*]*\\*\\*\\s*(?:\\([^)]*\\))?', 'g'), '');
    // 2) per paragraph, drop sentences carrying ranking markers, then tidy.
    var markerCI = /\btiers?\b|non comparabil|non classificabil|GOD PLEASE|START PRAYING|INIZIA A PREGARE/i;
    var markerCS = /\bNC\b|\b[Ll]ivello\s+(?:S|A|B|C|D|NC)\b|soglia del [Ll]ivello|all['’]?\s*[ABCS]\s+alto|toccar\w*\s+(?:l['’]\s*)?[ABCS]\b|toccano?\s+[ABCS]\b/;
    var scored = new RegExp('\\b' + scoreWords + '\\b'); // bare uppercase scores
    var out = t.split(/\n{2,}/).map(function (para) {
      if (/^\s*(?:[-*+]\s|\d+\.\s|#{1,6}\s|>)/.test(para.trim())) return para;
      var sentences = para.split(/(?<=[.!?])\s+(?=["'“*A-Z])/);
      var kept = sentences.filter(function (s) {
        return !markerCI.test(s) && !markerCS.test(s) && !scored.test(s);
      });
      return tidyPunct(kept.join(' ').trim());
    }).filter(function (p) { return p.replace(/\s/g, '').length > 0; });
    return out.join('\n\n');
  }

  // Italian display names, keyed by the app slugs (combined entries carry both).
  var AUTHOR_NAMES_IT = {
    // Archaic Era
    'livius-andronicus': 'Livio Andronico',
    'gnaeus-naevius': 'Gneo Nevio',
    'quintus-ennius': 'Quinto Ennio',
    'titus-maccius-plautus': 'Tito Maccio Plauto',
    'marcus-porcius-cato': 'Marco Porcio Catone - Catone il Vecchio',
    'caecilius-statius': 'Cecilio Stazio',
    'publius-terentius-afer': 'Publio Terenzio Afro - Terenzio',
    'marcus-pacuvius-and-lucius-accius': 'Marco Pacuvio e Lucio Accio',
    'gaius-lucilius': 'Gaio Lucilio',
    'pomponius-bononiensis-and-quintus-novius': 'Pomponio Bononiense e Quinto Novio',
    // Caesar's Age
    'marcus-terentius-varro': 'Marco Terenzio Varrone',
    'cornelius-nepos': 'Cornelio Nepote',
    'quintus-hortensius-hortalus': 'Quinto Ortensio Ortalo',
    'publius-nigidius-figulus': 'Publio Nigidio Figulo',
    'marcus-tullius-cicero': 'Marco Tullio Cicerone',
    'gaius-julius-caesar': 'Gaio Giulio Cesare',
    'aulus-hirtius': 'Aulo Irzio',
    'titus-lucretius-carus': 'Tito Lucrezio Caro',
    'gaius-sallustius-crispus': 'Gaio Sallustio Crispo',
    'gaius-valerius-catullus': 'Gaio Valerio Catullo'
  };

  // Optional caption shown beside an author's portrait (EN + IT), noting when the
  // image is invented, uncertain, or not actually a likeness of the author.
  var NOTE_FICTIONAL = {
    en: 'The portrait is entirely fictional - no ancient bust of him survives.',
    it: 'Il ritratto è del tutto immaginario: non sopravvive alcun busto antico di lui.'
  };
  var NOTE_UNCERTAIN = {
    en: 'The portrait may not be accurate - reliable likenesses of him are hard to trace.',
    it: 'Il ritratto potrebbe non essere fedele: è difficile trovarne tracce attendibili.'
  };
  var NOTE_UNCERTAIN_PAIR = {
    en: 'These portraits may not be accurate - reliable likenesses of these authors are hard to trace.',
    it: 'Questi ritratti potrebbero non essere fedeli: è difficile trovare tracce attendibili di questi autori.'
  };
  var NOTE_NO_BUST = {
    en: 'The portrait is entirely fictional - it is likely that no accurate bust or sculpture of him exists.',
    it: 'Il ritratto è del tutto immaginario: probabilmente non esiste alcun busto o scultura fedele di lui.'
  };
  var IMAGE_NOTE = {
    // Archaic Era - invented likenesses (no ancient bust survives).
    'livius-andronicus': NOTE_FICTIONAL,
    'gnaeus-naevius': NOTE_FICTIONAL,
    'quintus-ennius': NOTE_FICTIONAL,
    'titus-maccius-plautus': NOTE_FICTIONAL,
    'publius-terentius-afer': NOTE_FICTIONAL,
    // Archaic Era - two-author entries, likeness uncertain.
    'marcus-pacuvius-and-lucius-accius': NOTE_UNCERTAIN_PAIR,
    'pomponius-bononiensis-and-quintus-novius': NOTE_UNCERTAIN_PAIR,
    // Caesar's Age - invented likenesses (probably no accurate bust exists).
    'marcus-terentius-varro': NOTE_NO_BUST,
    'cornelius-nepos': NOTE_NO_BUST,
    'quintus-hortensius-hortalus': NOTE_NO_BUST,
    // Caesar's Age - likeness uncertain / hard to trace.
    'aulus-hirtius': NOTE_UNCERTAIN,
    // Caesar's Age - illustration chosen over a real bust.
    'titus-lucretius-carus': {
      en: 'The portrait is entirely fictional - it is an illustration. An accurate bust does exist, but the illustration is nicer.',
      it: 'Il ritratto è del tutto immaginario: è un\'illustrazione. Un busto fedele esiste, ma l\'illustrazione è più bella.'
    },
    // Caesar's Age - the image is actually Pythagoras.
    'publius-nigidius-figulus': {
      en: 'The portrait shown is Pythagoras, not Figulus - no accurate likeness of Nigidius Figulus survives. He is shown here because he tried to revive the Pythagorean tradition in Rome.',
      it: 'Il ritratto raffigura Pitagora, non Figulo - non sopravvive alcuna immagine fedele di Nigidio Figulo. È mostrato qui perché cercò di far rivivere a Roma la tradizione pitagorica.'
    }
  };

  // "BC"/"AD" -> Italian "a.C."/"d.C." in the date strings.
  function localizeDates(dates) {
    if (!dates) return dates;
    return dates.replace(/\bBC\b/g, 'a.C.').replace(/\bAD\b/g, 'd.C.');
  }

  // When the language is Italian, localize the display name and dates, and
  // overlay the Italian biography / works / style (from content-it.js), scrubbing
  // ranking language the same way. Images and excerpts stay as-is.
  function localizeAuthor(a) {
    if (!a || I18n.lang !== 'it') return a;
    var it = (global.__AUTHORS_IT__ || {})[a.slug] || {};
    var pick = function (field) {
      return it[field] && it[field].trim()
        ? scrubRankingIt(cleanBody(it[field]))
        : a[field];
    };
    return Object.assign({}, a, {
      name: AUTHOR_NAMES_IT[a.slug] || a.name,
      dates: localizeDates(a.dates),
      imageNote: (IMAGE_NOTE[a.slug] && IMAGE_NOTE[a.slug].it) || a.imageNote,
      biography: pick('biography'),
      works: pick('works'),
      style: pick('style')
    });
  }

  function localizeIntro(intro, eraId) {
    if (I18n.lang !== 'it') return intro;
    var raw = (global.__ERA_INTRO_IT__ || {})[eraId];
    return raw && raw.trim() ? scrubRankingIt(cleanBody(raw)) : intro;
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
  function parseEra(eraId, markdown) {
    var cfg = ERA_CONFIG[eraId];
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
      var author = parseAuthorBlock(blockLines, cfg);
      if (author) authors.push(author);
    }

    return { intro: intro, authors: authors };
  }

  function parseAuthorBlock(blockLines, cfg) {
    var headingLine = blockLines[0].replace(/^#\s+/, '').trim();
    var slug = slugFromHeading(headingLine);

    // The canonical imageLookup is authoritative for slug + images.
    var images = cfg.imageLookup[slug] || [];

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

    // Some entries (Catullus) place their Latin excerpts as "### Excerpt N:"
    // blocks inside the style section; those are duplicated by the practice
    // page, so drop them from the displayed style prose.
    if (sections.style) {
      sections.style = sections.style.replace(/\n?#{3}\s+Excerpt[\s\S]*$/, '');
    }

    return {
      slug: slug,
      name: name,
      dates: dates,
      imageNote: (IMAGE_NOTE[slug] && IMAGE_NOTE[slug].en) || '',
      images: images.map(function (file) {
        return { src: cfg.imageDir + file };
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
  // Public API (cached single parse per era)
  // ------------------------------------------------------------------
  var _eraPromises = {};

  function getParsedEra(eraId) {
    if (!_eraPromises[eraId]) {
      _eraPromises[eraId] = loadMarkdown(eraId).then(function (md) {
        return parseEra(eraId, md);
      });
    }
    return _eraPromises[eraId];
  }

  function getEras() {
    return Promise.resolve(ERAS.map(function (e) {
      return { id: e.id, name: eraName(e), available: e.available };
    }));
  }

  function getEra(id) {
    var base = ERAS.filter(function (e) { return e.id === id; })[0] || null;
    if (!base) return Promise.resolve(null);
    if (!isAvailable(id)) {
      return Promise.resolve({ id: base.id, name: eraName(base), available: false });
    }
    return getParsedEra(id).then(function (data) {
      return {
        id: base.id,
        name: eraName(base),
        available: true,
        intro: localizeIntro(data.intro, id),
        authors: data.authors.map(localizeAuthor)
      };
    });
  }

  function getAuthors(eraId) {
    if (!isAvailable(eraId)) return Promise.resolve([]);
    return getParsedEra(eraId).then(function (data) { return data.authors.map(localizeAuthor); });
  }

  function getAuthor(eraId, slug) {
    if (!isAvailable(eraId)) return Promise.resolve(null);
    return getParsedEra(eraId).then(function (data) {
      return localizeAuthor(data.authors.filter(function (a) { return a.slug === slug; })[0] || null);
    });
  }

  global.LatinData = {
    getEras: getEras,
    getEra: getEra,
    getAuthors: getAuthors,
    getAuthor: getAuthor
  };
})(window);
