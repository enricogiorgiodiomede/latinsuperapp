/*
 * select.js - the "choose a comedy/text" page for authors with many works
 * (Plautus, Terence, Caecilius). Renders one red button per work; each button
 * leads to practice.html scoped to that work.
 */
(function () {
  'use strict';

  var root = document.getElementById('select-root');
  var crumbEl = document.getElementById('breadcrumb');
  var era = UI.getParam('era') || 'archaic';
  var slug = UI.getParam('id');

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
    document.title = I18n.t('title.selectNamed', { name: author.name });
    render(author);
  }).catch(function (err) {
    UI.showError(root, err.message);
  });

  // Breadcrumb: Home / <Era> / <Author> / Choose
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
        items.push({ label: I18n.t('crumb.choose') });
      }
      UI.renderBreadcrumb(crumbEl, items);
    });
  }

  function render(author) {
    root.innerHTML = '';

    var heading = document.createElement('h2');
    heading.className = 'detail-name';
    // English keeps the bank's nicely specific heading ("Choose a comedy by
    // Plautus"); Italian uses a generic template.
    heading.textContent = I18n.lang === 'it'
      ? I18n.t('select.heading', { author: author.name })
      : PracticeBank.selectHeading(author.slug);
    root.appendChild(heading);

    var lead = document.createElement('p');
    lead.className = 'detail-dates';
    lead.textContent = I18n.t('select.lead');
    root.appendChild(lead);

    var works = PracticeBank.works(author.slug);
    if (!works.length) {
      var none = document.createElement('p');
      none.className = 'coming-soon';
      none.textContent = I18n.t('select.noTexts');
      root.appendChild(none);
    } else {
      var grid = document.createElement('div');
      grid.className = 'select-grid';
      works.forEach(function (w) {
        var btn = document.createElement('a');
        btn.className = 'btn-comedy';
        btn.href = 'practice.html?era=' + encodeURIComponent(era) +
          '&id=' + encodeURIComponent(author.slug) + '&work=' + encodeURIComponent(w.id);
        btn.innerHTML = Markdown.renderInline(w.label) +
          '<span class="btn-comedy-count">' +
          Markdown.escapeHtml(I18n.t('select.fragmentsCount', { n: w.fragments.length })) + '</span>';
        grid.appendChild(btn);
      });
      root.appendChild(grid);
    }

    var back = document.createElement('a');
    back.className = 'back-link';
    back.href = 'author.html?era=' + encodeURIComponent(era) +
      '&id=' + encodeURIComponent(author.slug);
    back.textContent = I18n.t('link.backTo', { name: author.name });
    root.appendChild(back);
  }
})();
