/*
 * metre-page.js - controller for metre.html, the metre reference.
 *
 *   metre.html?m=dactylic-hexameter&era=caesar&id=titus-lucretius-carus&work=drn-i&frag=1
 *
 * `m` names the metre. The other four are the excerpt the reader came from,
 * carried through untouched so the page can walk back to it - the breadcrumb's
 * "Practice" crumb and the button at the foot both rebuild that URL with the
 * same recipe js/version-list.js uses for its deep links. With no `m` the page
 * lists the metres instead, so it is not a dead end for anyone arriving
 * without a referrer.
 *
 * js/fragments.js is deliberately NOT loaded by this page: the return link
 * needs four query strings, not the 4.8 MB bank. Author and era names come
 * from js/data.js.
 */
(function () {
  'use strict';

  var root = document.getElementById('metre-root');
  var crumbEl = document.getElementById('breadcrumb');

  var metreId = UI.getParam('m');
  var era = UI.getParam('era');
  var slug = UI.getParam('id');
  var workId = UI.getParam('work');
  var fragNo = UI.getParam('frag');

  Menu.render(document.getElementById('era-menu'), { activeEra: era || null, onClick: Menu.goToEra });

  // The excerpt to go back to, when we know one.
  function excerptHref() {
    if (!era || !slug) return null;
    var url = 'practice.html?era=' + encodeURIComponent(era) + '&id=' + encodeURIComponent(slug);
    if (workId) url += '&work=' + encodeURIComponent(workId);
    if (fragNo) url += '&frag=' + encodeURIComponent(fragNo);
    return url;
  }

  function para(text, cls) {
    var p = document.createElement('p');
    if (cls) p.className = cls;
    p.innerHTML = Markdown.renderInline(text);
    return p;
  }

  function section(key, paragraphs) {
    var wrap = document.createElement('section');
    wrap.className = 'metre-section';
    var h = document.createElement('h2');
    h.textContent = I18n.t(key);
    wrap.appendChild(h);
    paragraphs.forEach(function (t) { wrap.appendChild(para(t)); });
    return wrap;
  }

  // ---------------------------------------------------------------- index
  function renderIndex() {
    document.title = I18n.t('title.metres');
    UI.renderBreadcrumb(crumbEl, [
      { label: I18n.t('crumb.home'), href: 'index.html' },
      { label: I18n.t('crumb.metres') }
    ]);
    root.innerHTML = '';

    var h = document.createElement('h2');
    h.className = 'metre-index-heading';
    h.textContent = I18n.t('metre.indexHeading');
    root.appendChild(h);
    root.appendChild(para(I18n.t('metre.indexLead'), 'metre-lead'));

    Metres.list().forEach(function (m) {
      var a = document.createElement('a');
      a.className = 'metre-item';
      a.href = 'metre.html?m=' + encodeURIComponent(m.id);
      var name = document.createElement('span');
      name.className = 'mi-name';
      name.textContent = m.name;
      var tag = document.createElement('span');
      tag.className = 'mi-tagline';
      tag.textContent = m.tagline;
      a.appendChild(name);
      a.appendChild(tag);
      root.appendChild(a);
    });
  }

  // ------------------------------------------------------------- one metre
  function renderMetre(m) {
    document.title = I18n.t('title.metreNamed', { name: m.name });
    root.innerHTML = '';

    // Breadcrumb: the full trail when we know where the reader came from,
    // otherwise Home / Metres / <name>.
    var backHref = excerptHref();
    if (backHref && era) {
      LatinData.getEras().then(function (eras) {
        var match = eras.filter(function (e) { return e.id === era; })[0];
        var items = [
          { label: I18n.t('crumb.home'), href: 'index.html' },
          { label: match ? match.name : era, href: 'index.html?era=' + encodeURIComponent(era) }
        ];
        LatinData.getAuthor(era, slug).then(function (author) {
          if (author) {
            items.push({
              label: author.name,
              href: 'author.html?era=' + encodeURIComponent(era) + '&id=' + encodeURIComponent(author.slug)
            });
          }
          items.push({ label: I18n.t('crumb.practice'), href: backHref });
          items.push({ label: m.name });
          UI.renderBreadcrumb(crumbEl, items);
        });
      });
    } else {
      UI.renderBreadcrumb(crumbEl, [
        { label: I18n.t('crumb.home'), href: 'index.html' },
        { label: I18n.t('crumb.metres'), href: 'metre.html' },
        { label: m.name }
      ]);
    }

    // --- title block
    var h1 = document.createElement('h2');
    h1.className = 'metre-title';
    h1.textContent = m.name;
    root.appendChild(h1);
    root.appendChild(para(m.tagline, 'metre-tagline'));

    // --- the scheme, up front: the one thing a reader might have come for
    var schemeBox = document.createElement('div');
    schemeBox.className = 'metre-scheme';
    var sLab = document.createElement('span');
    sLab.className = 'ms-label';
    sLab.textContent = I18n.t('metre.scheme');
    schemeBox.appendChild(sLab);
    // An array when the metre's unit is more than one line: an elegiac couplet
    // is a hexameter and a pentameter, and its scheme has to be shown as two.
    var lines = [].concat(m.scheme);
    if (lines.length > 1) schemeBox.className += ' is-stacked';
    lines.forEach(function (line) {
      var sVal = document.createElement('span');
      sVal.className = 'ms-value';
      sVal.textContent = line;
      schemeBox.appendChild(sVal);
    });
    root.appendChild(schemeBox);
    if (m.schemeNote) root.appendChild(para(m.schemeNote, 'metre-scheme-note'));

    root.appendChild(legend());

    // --- the four sections
    root.appendChild(section('metre.sec.origin', m.origin));
    root.appendChild(section('metre.sec.build', m.build));
    root.appendChild(section('metre.sec.sound', m.sound));

    var used = section('metre.sec.used', m.usedIntro);
    m.examples.forEach(function (ex) { used.appendChild(buildExample(ex)); });
    if (m.after) used.appendChild(para(m.after, 'metre-after'));
    root.appendChild(used);

    // --- back to where we came from
    if (backHref) {
      var back = document.createElement('a');
      back.className = 'back-link';
      back.href = backHref;
      back.textContent = I18n.t('metre.backToExcerpt');
      root.appendChild(back);
    }
  }

  // The four symbols, spelled out once per page.
  function legend() {
    var box = document.createElement('div');
    box.className = 'metre-legend';
    [['–', 'metre.legend.long'], ['⏑', 'metre.legend.short'], ['×', 'metre.legend.anceps'],
     ['|', 'metre.legend.foot'], ['‖', 'metre.legend.caesura']].forEach(function (pair) {
      var item = document.createElement('span');
      item.className = 'ml-item';
      var sym = document.createElement('span');
      sym.className = 'ml-sym';
      sym.textContent = pair[0];
      var txt = document.createElement('span');
      txt.className = 'ml-text';
      txt.textContent = I18n.t(pair[1]);
      item.appendChild(sym);
      item.appendChild(txt);
      box.appendChild(item);
    });
    return box;
  }

  function buildExample(ex) {
    var box = document.createElement('div');
    box.className = 'metre-example';

    var head = document.createElement('p');
    head.className = 'me-head';
    var who = document.createElement('span');
    who.className = 'me-author';
    // Link the author when we can place them in an era.
    if (ex.slug && ex.era) {
      var a = document.createElement('a');
      a.href = 'author.html?era=' + encodeURIComponent(ex.era) + '&id=' + encodeURIComponent(ex.slug);
      a.textContent = ex.author;
      who.appendChild(a);
    } else {
      who.textContent = ex.author;
    }
    var where = document.createElement('span');
    where.className = 'me-where';
    where.textContent = ex.where;
    head.appendChild(who);
    head.appendChild(where);
    box.appendChild(head);

    if (ex.gloss) box.appendChild(para(ex.gloss, 'me-gloss'));

    // Three shapes, in increasing awkwardness:
    //
    //  - `marked` + `pattern` as strings: one verse, one analysis.
    //  - both as ARRAYS: one example that is several verses, because the
    //    metre's unit is several - an elegiac couplet is a hexameter and a
    //    pentameter and makes no sense shown singly.
    //  - `readings`: the SAME verse analysed more than one way, for a metre
    //    where the analysis is what is in dispute. The Saturnian gets a
    //    quantitative and an accentual reading side by side, which is the only
    //    honest way to show a line nobody has explained.
    if (ex.readings) {
      ex.readings.forEach(function (r) {
        var head = document.createElement('p');
        head.className = 'me-reading-label';
        head.textContent = I18n.t(r.label);
        box.appendChild(head);
        var v = document.createElement('p');
        v.className = 'me-verse';
        v.textContent = r.marked;
        box.appendChild(v);
        if (r.pattern) {
          var p = document.createElement('p');
          p.className = 'me-pattern';
          p.textContent = r.pattern;
          box.appendChild(p);
        }
        if (r.note) box.appendChild(para(r.note, 'me-reading-note'));
      });
    } else {
      var marked = [].concat(ex.marked);
      var pattern = ex.pattern == null ? [] : [].concat(ex.pattern);
      marked.forEach(function (line, n) {
        var verse = document.createElement('p');
        verse.className = 'me-verse';
        if (marked.length > 1) verse.className += ' me-verse-' + (n + 1);
        verse.textContent = line;
        box.appendChild(verse);
        if (pattern[n]) {
          var pat = document.createElement('p');
          pat.className = 'me-pattern';
          pat.textContent = pattern[n];
          box.appendChild(pat);
        }
      });
    }

    (ex.notes || []).forEach(function (t) { box.appendChild(para(t, 'me-note')); });
    return box;
  }

  // -------------------------------------------------------------- dispatch
  if (!metreId) {
    renderIndex();
  } else {
    var rec = Metres.get(metreId);
    if (!rec) {
      UI.renderBreadcrumb(crumbEl, [
        { label: I18n.t('crumb.home'), href: 'index.html' },
        { label: I18n.t('crumb.metres'), href: 'metre.html' }
      ]);
      UI.showError(root, I18n.t('metre.notFound'));
    } else {
      renderMetre(rec);
    }
  }
})();
