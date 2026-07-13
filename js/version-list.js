/*
 * version-list.js - controller for version.html. Lists every practice excerpt
 * added in one app version (?v=X), sorted alphabetically by author name and then
 * by work/subject (for Cornelius Nepos, whose excerpts all sit under one work, the
 * "subject" is the character parsed from the citation). Reached by clicking an
 * excerpt's version badge on the practice page: the red "NEW!" VIP banner links to
 * the newest version, each papyrus tag to its own version. Prev/next arrows step
 * between the versions that actually added excerpts.
 */
(function () {
  'use strict';

  var root = document.getElementById('version-root');
  var crumbEl = document.getElementById('breadcrumb');
  var AUTHORS = (window.PracticeBank && PracticeBank.authors) || {};

  // semver-ish compare of "x.y.z"
  function cmpVersion(a, b) {
    var pa = String(a).split('.'), pb = String(b).split('.');
    for (var i = 0; i < 3; i++) {
      var x = parseInt(pa[i], 10) || 0, y = parseInt(pb[i], 10) || 0;
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  }

  // Every distinct fragment version, ascending. Versions that added no excerpts
  // (e.g. 0.9.14, 1.2.1) never appear here, so the prev/next arrows naturally walk
  // only the updates that actually added excerpts.
  var versionsWithExcerpts = (function () {
    var set = {};
    Object.keys(AUTHORS).forEach(function (slug) {
      (AUTHORS[slug].works || []).forEach(function (w) {
        (w.fragments || []).forEach(function (f) { if (f.version) set[f.version] = true; });
      });
    });
    return Object.keys(set).sort(cmpVersion);
  })();
  var LATEST_VERSION = versionsWithExcerpts[versionsWithExcerpts.length - 1] || '1.0.0';

  var target = UI.getParam('v') || LATEST_VERSION;

  Menu.render(document.getElementById('era-menu'), { activeEra: null, onClick: Menu.goToEra });

  UI.renderBreadcrumb(crumbEl, [
    { label: I18n.t('crumb.home'), href: 'index.html' },
    { label: I18n.t('whatsNew.title'), href: 'index.html' },
    { label: 'v' + target }
  ]);

  document.title = I18n.t('title.versionNamed', { version: target });

  if (versionsWithExcerpts.indexOf(target) === -1) {
    UI.showError(root, I18n.t('version.notFound'));
    return;
  }

  // Collect the excerpts of the target version, remembering each one's pool index
  // so we can deep-link straight to it on the practice page (?frag=N, 1-based).
  var items = (function () {
    var out = [], ord = 0;
    Object.keys(AUTHORS).forEach(function (slug) {
      var a = AUTHORS[slug];
      var needsSel = !!a.needsSelection;
      var flatIdx = 0; // running index within allFragments (non-needsSelection pool)
      (a.works || []).forEach(function (w) {
        (w.fragments || []).forEach(function (f, iInWork) {
          if (f.version === target) {
            out.push({
              slug: slug, needsSel: needsSel, workId: w.id, work: w, frag: f,
              poolIdx: needsSel ? iInWork : flatIdx, ord: ord++
            });
          }
          flatIdx++;
        });
      });
    });
    return out;
  })();

  // Author display names + era come from LatinData (async, both live eras).
  Promise.all([LatinData.getAuthors('archaic'), LatinData.getAuthors('caesar')]).then(function (res) {
    var map = {};
    [['archaic', res[0]], ['caesar', res[1]]].forEach(function (pair) {
      (pair[1] || []).forEach(function (au) { map[au.slug] = { era: pair[0], name: au.name }; });
    });
    render(map);
  });

  function workLabel(w) { return (I18n.lang === 'it' && w.labelIt) ? w.labelIt : w.label; }
  function fragTitle(f) { return (I18n.lang === 'it' && f.titleIt) ? f.titleIt : f.title; }
  function subjectFor(it) {
    // Nepos's De Viris Illustribus is one work of many Lives; sort/label by the character.
    if (it.workId === 'de-viris-illustribus') {
      var m = /De Viris Illustribus,\s*([A-Za-z]+)/.exec(it.frag.citation || '');
      if (m) return m[1];
    }
    return workLabel(it.work);
  }

  function render(map) {
    root.innerHTML = '';

    items.forEach(function (it) {
      var info = map[it.slug] || { era: 'archaic', name: it.slug };
      it.authorName = info.name;
      it.era = info.era;
      it.subject = subjectFor(it);
      it.titleText = fragTitle(it.frag);
    });
    items.sort(function (a, b) {
      return a.authorName.localeCompare(b.authorName) ||
             a.subject.localeCompare(b.subject) ||
             (a.ord - b.ord);
    });

    var h = document.createElement('h2');
    h.className = 'version-heading';
    h.textContent = I18n.t('version.heading', { version: target });
    if (target === LATEST_VERSION) {
      h.appendChild(document.createTextNode(' '));
      var note = document.createElement('span');
      note.className = 'version-latest-note';
      note.textContent = I18n.t('version.latestNote');
      h.appendChild(note);
    }
    root.appendChild(h);

    var count = document.createElement('p');
    count.className = 'version-count';
    count.textContent = I18n.t('version.count', { n: items.length });
    root.appendChild(count);

    root.appendChild(buildNav());

    if (!items.length) {
      var empty = document.createElement('p');
      empty.className = 'coming-soon';
      empty.textContent = I18n.t('version.empty');
      root.appendChild(empty);
      return;
    }
    var ul = document.createElement('ul');
    ul.className = 'version-list';
    items.forEach(function (it) { ul.appendChild(buildItem(it)); });
    root.appendChild(ul);
  }

  function buildNav() {
    var nav = document.createElement('div');
    nav.className = 'version-nav';
    var i = versionsWithExcerpts.indexOf(target);
    nav.appendChild(navLink(i > 0 ? versionsWithExcerpts[i - 1] : null, 'prev'));
    nav.appendChild(navLink(i < versionsWithExcerpts.length - 1 ? versionsWithExcerpts[i + 1] : null, 'next'));
    return nav;
  }
  function navLink(ver, dir) {
    var isPrev = dir === 'prev';
    var label = I18n.t(isPrev ? 'version.prev' : 'version.next');
    if (ver) {
      var a = document.createElement('a');
      a.className = isPrev ? 'nav-prev' : 'nav-next';
      a.href = 'version.html?v=' + encodeURIComponent(ver);
      a.setAttribute('aria-label', label + ' (v' + ver + ')');
      a.textContent = isPrev ? ('← v' + ver) : ('v' + ver + ' →');
      return a;
    }
    var span = document.createElement('span');
    span.className = (isPrev ? 'nav-prev' : 'nav-next') + ' nav-disabled';
    span.textContent = isPrev ? ('← ' + label) : (label + ' →');
    return span;
  }

  function buildItem(it) {
    var a = document.createElement('a');
    a.className = 'version-item';
    var url = 'practice.html?era=' + encodeURIComponent(it.era) + '&id=' + encodeURIComponent(it.slug);
    if (it.needsSel) url += '&work=' + encodeURIComponent(it.workId);
    url += '&frag=' + (it.poolIdx + 1);
    a.href = url;

    var head = document.createElement('div');
    head.className = 'vi-head';
    var au = document.createElement('span');
    au.className = 'vi-author';
    au.textContent = it.authorName;
    var subj = document.createElement('span');
    subj.className = 'vi-subject';
    subj.textContent = it.subject;
    head.appendChild(au);
    head.appendChild(subj);

    var title = document.createElement('span');
    title.className = 'vi-title';
    title.textContent = it.titleText;

    a.appendChild(head);
    a.appendChild(title);
    return a;
  }
})();
