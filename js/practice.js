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
    UI.showError(root, 'No author specified.');
    renderBreadcrumb(era, null);
    return;
  }

  LatinData.getAuthor(era, slug).then(function (author) {
    renderBreadcrumb(era, author);
    if (!author) {
      root.innerHTML =
        '<div class="error-box">Author not found in this era.</div>' +
        '<a class="back-link" href="index.html">&larr; Back to all authors</a>';
      return;
    }
    document.title = 'Practice: ' + author.name + ' - Latin Authors: Explore & Translate';
    render(author);
  }).catch(function (err) {
    UI.showError(root, err.message);
  });

  // Breadcrumb: Home / <Era> / <Author> / Practice
  function renderBreadcrumb(eraId, author) {
    LatinData.getEras().then(function (eras) {
      var match = eras.filter(function (e) { return e.id === eraId; })[0];
      var items = [
        { label: 'Home', href: 'index.html' },
        { label: match ? match.name : eraId, href: 'index.html?era=' + encodeURIComponent(eraId) }
      ];
      if (author) {
        items.push({
          label: author.name,
          href: 'author.html?era=' + encodeURIComponent(eraId) + '&id=' + encodeURIComponent(author.slug)
        });
        items.push({ label: 'Practice' });
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
      '<p class="detail-dates">Translate the Latin, then reveal the answers to check yourself.</p>';
    root.appendChild(head);

    // For selection authors, offer a link back to the comedy/text chooser.
    if (PracticeBank.needsSelection(author.slug)) {
      var choose = document.createElement('a');
      choose.className = 'back-link choose-link';
      choose.href = 'practice-select.html?era=' + encodeURIComponent(era) +
        '&id=' + encodeURIComponent(author.slug);
      choose.innerHTML = '&larr; Choose another text';
      root.appendChild(choose);
    }

    if (!fragments.length) {
      var none = document.createElement('p');
      none.className = 'coming-soon';
      none.textContent = 'No fragment is available here yet.';
      root.appendChild(none);
    } else {
      var holder = document.createElement('div');
      root.appendChild(holder);
      var state = { idx: Math.floor(Math.random() * fragments.length) };
      var show = function () {
        holder.innerHTML = '';
        holder.appendChild(buildFragment(fragments[state.idx], pool.workLabel, state.idx, fragments.length, function () {
          if (fragments.length < 2) return;
          var n = state.idx;
          while (n === state.idx) n = Math.floor(Math.random() * fragments.length);
          state.idx = n;
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
    back.innerHTML = '&larr; Back to ' + Markdown.escapeHtml(author.name);
    root.appendChild(back);
  }

  function buildFragment(frag, workLabel, idx, total, onAnother) {
    var box = document.createElement('section');
    box.className = 'practice-excerpt';

    var counter = document.createElement('p');
    counter.className = 'fragment-counter';
    counter.textContent = 'Fragment ' + (idx + 1) + ' of ' + total + (workLabel ? '  ·  ' + workLabel : '');
    box.appendChild(counter);

    if (frag.title) {
      var title = document.createElement('h2');
      title.innerHTML = Markdown.renderInline(frag.title);
      box.appendChild(title);
    }
    if (frag.citation) {
      var cite = document.createElement('p');
      cite.className = 'excerpt-citation';
      cite.textContent = frag.citation;
      box.appendChild(cite);
    }
    if (frag.description) {
      var desc = document.createElement('p');
      desc.className = 'excerpt-description';
      desc.textContent = frag.description;
      box.appendChild(desc);
    }

    var latin = document.createElement('div');
    latin.className = 'latin-text';
    latin.innerHTML = Markdown.render(frag.latin || '');
    box.appendChild(latin);

    if (frag.source) {
      var src = document.createElement('p');
      src.className = 'fragment-source';
      src.textContent = 'Latin text from ' + frag.source;
      box.appendChild(src);
    }

    var label = document.createElement('label');
    label.className = 'practice-label';
    label.textContent = 'Your translation';
    box.appendChild(label);

    var area = document.createElement('textarea');
    area.className = 'practice-area';
    area.placeholder = 'Type your translation here...';
    box.appendChild(area);

    var row = document.createElement('div');
    row.className = 'reveal-row';
    var defs = [];
    if (frag.italian) defs.push(['Show Italian', 'Hide Italian', 'Italian translation', frag.italian]);
    if (frag.english) defs.push(['Show English', 'Hide English', 'English translation', frag.english]);
    if (frag.analysis) defs.push(['Show analysis / hints', 'Hide analysis / hints', 'Analysis', frag.analysis]);
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
      another.textContent = 'Try another fragment';
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
