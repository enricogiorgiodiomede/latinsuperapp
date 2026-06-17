/*
 * practice.js - translation practice. Shows ONE fragment at a time from the
 * PracticeBank, optionally scoped to a chosen work via ?work=<id>. A
 * "Try another fragment" button swaps in a different random fragment from the
 * same pool. Reveal buttons show the Italian, English, and analysis.
 */
(function () {
  'use strict';

  var root = document.getElementById('practice-root');
  var crumbEl = document.getElementById('breadcrumb');
  var era = UI.getParam('era') || 'archaic';
  var slug = UI.getParam('id');
  var workId = UI.getParam('work');

  // The era menu is always present; clicking an era jumps to its home listing.
  Menu.render(document.getElementById('era-menu'), { activeEra: era, onClick: Menu.goToEra });

  if (!slug) {
    UI.showError(root, I18n.t('error.noAuthor'));
    renderBreadcrumb(era, null);
    return;
  }

  LatinData.getAuthor(era, slug).then(function (author) {
    renderBreadcrumb(era, author);
    if (!author) {
      root.innerHTML =
        '<div class="error-box">' + Markdown.escapeHtml(I18n.t('error.authorNotFound')) + '</div>' +
        '<a class="back-link" href="index.html">' + Markdown.escapeHtml(I18n.t('link.backAuthors')) + '</a>';
      return;
    }
    document.title = I18n.t('title.practiceNamed', { name: author.name });
    render(author);
  }).catch(function (err) {
    UI.showError(root, err.message);
  });

  // Breadcrumb: Home / <Era> / <Author> / Practice
  function renderBreadcrumb(eraId, author) {
    LatinData.getEras().then(function (eras) {
      var match = eras.filter(function (e) { return e.id === eraId; })[0];
      var items = [
        { label: I18n.t('crumb.home'), href: 'index.html' },
        { label: match ? match.name : eraId, href: 'index.html?era=' + encodeURIComponent(eraId) }
      ];
      if (author) {
        items.push({
          label: author.name,
          href: 'author.html?era=' + encodeURIComponent(eraId) + '&id=' + encodeURIComponent(author.slug)
        });
        items.push({ label: I18n.t('crumb.practice') });
      }
      UI.renderBreadcrumb(crumbEl, items);
    });
  }

  // The fragment pool: a chosen work, or the author's whole set.
  function poolFor(slug, workId) {
    if (workId) {
      var w = PracticeBank.getWork(slug, workId);
      return { fragments: (w && w.fragments) || [], workLabel: w ? w.label : null };
    }
    return { fragments: PracticeBank.allFragments(slug), workLabel: null };
  }

  function render(author) {
    root.innerHTML = '';

    var pool = poolFor(author.slug, workId);
    var fragments = pool.fragments;

    var head = document.createElement('div');
    head.innerHTML =
      '<h2 class="detail-name">' + Markdown.escapeHtml(author.name) + '</h2>' +
      '<p class="detail-dates">' + Markdown.escapeHtml(I18n.t('practice.instruction')) + '</p>';
    root.appendChild(head);

    // For selection authors, offer a link back to the comedy/text chooser.
    if (PracticeBank.needsSelection(author.slug)) {
      var choose = document.createElement('a');
      choose.className = 'back-link choose-link';
      choose.href = 'practice-select.html?era=' + encodeURIComponent(era) +
        '&id=' + encodeURIComponent(author.slug);
      choose.textContent = I18n.t('link.chooseAnother');
      root.appendChild(choose);
    }

    if (!fragments.length) {
      var none = document.createElement('p');
      none.className = 'coming-soon';
      none.textContent = I18n.t('practice.noFragment');
      root.appendChild(none);
    } else {
      var holder = document.createElement('div');
      root.appendChild(holder);
      var state = { idx: 0 };
      var show = function () {
        holder.innerHTML = '';
        holder.appendChild(buildFragment(fragments[state.idx], pool.workLabel, state.idx, fragments.length, function () {
          state.idx = (state.idx + 1) % fragments.length; // step in order, wrap around
          show();
          holder.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }));
      };
      show();
    }

    var back = document.createElement('a');
    back.className = 'back-link';
    back.href = 'author.html?era=' + encodeURIComponent(era) +
      '&id=' + encodeURIComponent(author.slug);
    back.textContent = I18n.t('link.backTo', { name: author.name });
    root.appendChild(back);
  }

  // Pick the Italian variant of a fragment field when the site is in Italian
  // (titleIt / descriptionIt / analysisIt), falling back to English.
  function L(frag, field) {
    var key = field + 'It';
    return (I18n.lang === 'it' && frag[key]) ? frag[key] : frag[field];
  }

  function buildFragment(frag, workLabel, idx, total, onAnother) {
    var box = document.createElement('section');
    box.className = 'practice-excerpt';

    var counter = document.createElement('p');
    counter.className = 'fragment-counter';
    counter.textContent = I18n.t('practice.counter', { n: idx + 1, total: total }) +
      (workLabel ? '  ·  ' + workLabel : '');
    box.appendChild(counter);

    var fTitle = L(frag, 'title');
    if (fTitle) {
      var title = document.createElement('h2');
      title.innerHTML = Markdown.renderInline(fTitle);
      box.appendChild(title);
    }
    if (frag.citation) {
      var cite = document.createElement('p');
      cite.className = 'excerpt-citation';
      cite.textContent = frag.citation;
      box.appendChild(cite);
    }
    var fDesc = L(frag, 'description');
    if (fDesc) {
      var desc = document.createElement('p');
      desc.className = 'excerpt-description';
      desc.textContent = fDesc;
      box.appendChild(desc);
    }

    var latin = document.createElement('div');
    latin.className = 'latin-text';
    latin.innerHTML = Markdown.render(frag.latin || '');
    box.appendChild(latin);

    if (frag.source) {
      var src = document.createElement('p');
      src.className = 'fragment-source';
      src.textContent = I18n.t('practice.latinFrom', { source: frag.source });
      box.appendChild(src);
    }

    var label = document.createElement('label');
    label.className = 'practice-label';
    label.textContent = I18n.t('practice.yourTranslation');
    box.appendChild(label);

    var area = document.createElement('textarea');
    area.className = 'practice-area';
    area.placeholder = I18n.t('practice.placeholder');
    box.appendChild(area);

    var row = document.createElement('div');
    row.className = 'reveal-row';
    var defs = [];
    if (frag.italian) defs.push([I18n.t('reveal.showItalian'), I18n.t('reveal.hideItalian'), I18n.t('reveal.italianHeading'), frag.italian]);
    if (frag.english) defs.push([I18n.t('reveal.showEnglish'), I18n.t('reveal.hideEnglish'), I18n.t('reveal.englishHeading'), frag.english]);
    if (frag.analysis) defs.push([I18n.t('reveal.showAnalysis'), I18n.t('reveal.hideAnalysis'), I18n.t('reveal.analysisHeading'), L(frag, 'analysis')]);
    defs.forEach(function (d) { row.appendChild(makeRevealButton(d[0], d[1])); });
    box.appendChild(row);

    defs.forEach(function (d, i) {
      var block = makeRevealBlock(d[2], d[3]);
      box.appendChild(block);
      var btn = row.children[i];
      btn.addEventListener('click', function () {
        var hidden = block.classList.toggle('hidden');
        btn.textContent = hidden ? btn.dataset.show : btn.dataset.hide;
      });
    });

    if (total > 1) {
      var another = document.createElement('button');
      another.type = 'button';
      another.className = 'btn btn-primary try-another';
      another.textContent = I18n.t('practice.next');
      another.addEventListener('click', onAnother);
      box.appendChild(another);
    }

    return box;
  }

  function makeRevealButton(showText, hideText) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost';
    btn.textContent = showText;
    btn.dataset.show = showText;
    btn.dataset.hide = hideText;
    return btn;
  }

  function makeRevealBlock(heading, markdown) {
    var block = document.createElement('div');
    block.className = 'reveal-block hidden';
    block.innerHTML = '<h3>' + Markdown.escapeHtml(heading) + '</h3>' + Markdown.render(markdown);
    return block;
  }
})();
