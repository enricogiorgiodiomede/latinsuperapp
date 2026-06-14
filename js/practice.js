/*
 * practice.js - translation practice page. For the chosen author it shows
 * each Latin excerpt prominently, a textarea to attempt a translation, and
 * reveal toggles for the Italian, English and analysis. Combined entries
 * (two excerpts) render both blocks stacked.
 */
(function () {
  'use strict';

  var root = document.getElementById('practice-root');
  var crumbEl = document.getElementById('breadcrumb');
  var era = UI.getParam('era') || 'archaic';
  var slug = UI.getParam('id');

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
    document.title = 'Practice: ' + author.name + ' - Latin Authors Tier List';
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

  function render(author) {
    root.innerHTML = '';

    var head = document.createElement('div');
    head.innerHTML =
      '<h2 class="detail-name">' + Markdown.escapeHtml(author.name) + '</h2>' +
      '<p class="detail-dates">Translate the Latin, then reveal the answers to check yourself.</p>';
    root.appendChild(head);

    var excerpts = author.excerpts || [];
    if (excerpts.length === 0) {
      var none = document.createElement('p');
      none.className = 'coming-soon';
      none.textContent = 'No excerpt is available for this author.';
      root.appendChild(none);
    } else {
      excerpts.forEach(function (ex, idx) {
        root.appendChild(buildExcerpt(ex, idx));
      });
    }

    var back = document.createElement('a');
    back.className = 'back-link';
    back.href = 'author.html?era=' + encodeURIComponent(era) +
      '&id=' + encodeURIComponent(author.slug);
    back.innerHTML = '&larr; Back to ' + Markdown.escapeHtml(author.name);
    root.appendChild(back);
  }

  function buildExcerpt(ex, idx) {
    var box = document.createElement('section');
    box.className = 'practice-excerpt';

    if (ex.title) {
      var title = document.createElement('h2');
      title.innerHTML = Markdown.renderInline(ex.title);
      box.appendChild(title);
    }

    // Latin text, prominent.
    var latin = document.createElement('div');
    latin.className = 'latin-text';
    latin.innerHTML = Markdown.render(ex.latin || '');
    box.appendChild(latin);

    // Attempt area.
    var label = document.createElement('label');
    label.className = 'practice-label';
    label.textContent = 'Your translation';
    label.setAttribute('for', 'attempt-' + idx);
    box.appendChild(label);

    var area = document.createElement('textarea');
    area.className = 'practice-area';
    area.id = 'attempt-' + idx;
    area.placeholder = 'Type your translation here...';
    box.appendChild(area);

    // Reveal buttons.
    var row = document.createElement('div');
    row.className = 'reveal-row';
    if (ex.italian) row.appendChild(makeRevealButton('Show Italian', 'Hide Italian'));
    if (ex.english) row.appendChild(makeRevealButton('Show English', 'Hide English'));
    if (ex.analysis) row.appendChild(makeRevealButton('Show analysis / hints', 'Hide analysis / hints'));
    box.appendChild(row);

    // Reveal blocks (hidden by default), wired to the buttons by order.
    var blocks = [];
    if (ex.italian) blocks.push(makeRevealBlock('Italian translation', ex.italian));
    if (ex.english) blocks.push(makeRevealBlock('English translation', ex.english));
    if (ex.analysis) blocks.push(makeRevealBlock('Analysis', ex.analysis));

    blocks.forEach(function (block, i) {
      box.appendChild(block);
      var btn = row.children[i];
      btn.addEventListener('click', function () {
        var hidden = block.classList.toggle('hidden');
        btn.textContent = hidden ? btn.dataset.show : btn.dataset.hide;
      });
    });

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
