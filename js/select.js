/*
 * select.js - the "choose a comedy/text" page for authors with many works
 * (Plautus, Terence, Caecilius, Varro). Renders one red button per work; each
 * button leads to practice.html scoped to that work.
 *
 * Authors whose bank entry carries a "groups" array (Cicero) get a SECOND
 * level: the page first shows one button per category (Speeches, Letters,
 * Philosophical works, Rhetorical works), and ?group=<id> then shows the works
 * inside that category. Everyone else keeps the single-level chooser.
 */
(function () {
  'use strict';

  var root = document.getElementById('select-root');
  var crumbEl = document.getElementById('breadcrumb');
  var era = UI.getParam('era') || 'archaic';
  var slug = UI.getParam('id');
  var groupId = UI.getParam('group');

  Menu.render(document.getElementById('era-menu'), { activeEra: era, onClick: Menu.goToEra });

  if (!slug) {
    UI.showError(root, I18n.t('error.noAuthor'));
    renderBreadcrumb(era, null);
    return;
  }

  // Italian short names for the generic chooser heading (the full display name
  // is too long here).
  var IT_SHORT = {
    'titus-maccius-plautus': 'Plauto',
    'publius-terentius-afer': 'Terenzio',
    'marcus-tullius-cicero': 'Cicerone'
  };

  LatinData.getAuthor(era, slug).then(function (author) {
    if (!author) {
      renderBreadcrumb(era, null);
      root.innerHTML =
        '<div class="error-box">' + Markdown.escapeHtml(I18n.t('error.authorNotFound')) + '</div>' +
        '<a class="back-link" href="index.html">' + Markdown.escapeHtml(I18n.t('link.backAuthors')) + '</a>';
      return;
    }
    // An unknown ?group= falls back to the top level.
    var group = groupId ? PracticeBank.getGroup(author.slug, groupId) : null;
    if (!group) groupId = null;
    renderBreadcrumb(era, author, group);
    document.title = I18n.t('title.selectNamed', { name: author.name });
    render(author, group);
  }).catch(function (err) {
    UI.showError(root, err.message);
  });

  function labelOf(item) {
    return (I18n.lang === 'it' && item.labelIt) ? item.labelIt : item.label;
  }

  // Breadcrumb: Home / <Era> / <Author> / Choose [ / <Category> ]
  function renderBreadcrumb(eraId, author, group) {
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
        if (group) {
          items.push({
            label: I18n.t('crumb.choose'),
            href: 'practice-select.html?era=' + encodeURIComponent(eraId) +
              '&id=' + encodeURIComponent(author.slug)
          });
          items.push({ label: labelOf(group) });
        } else {
          items.push({ label: I18n.t('crumb.choose') });
        }
      }
      UI.renderBreadcrumb(crumbEl, items);
    });
  }

  function render(author, group) {
    root.innerHTML = '';

    var bankAuthor = PracticeBank.forAuthor(author.slug) || {};
    var showGroups = !group && PracticeBank.hasGroups(author.slug);

    var heading = document.createElement('h2');
    heading.className = 'detail-name';
    // Inside a category the heading is the category's own ("Choose a speech by
    // Cicero"); at the top level English keeps the bank's specific heading
    // ("Choose a comedy by Plautus") while Italian uses selectHeadingIt when the
    // bank supplies one - needed for non-comedy authors like Varro ("opera", not
    // "commedia") - else the generic template with a short author name.
    if (group) {
      heading.textContent = (I18n.lang === 'it' && group.headingIt)
        ? group.headingIt
        : (group.heading || labelOf(group));
    } else {
      heading.textContent = I18n.lang === 'it'
        ? (bankAuthor.selectHeadingIt || I18n.t('select.heading', { author: IT_SHORT[author.slug] || author.name }))
        : PracticeBank.selectHeading(author.slug);
    }
    root.appendChild(heading);

    var lead = document.createElement('p');
    lead.className = 'detail-dates';
    lead.textContent = showGroups ? I18n.t('select.leadGroups') : I18n.t('select.lead');
    root.appendChild(lead);

    var items = showGroups
      ? PracticeBank.groups(author.slug)
      : PracticeBank.works(author.slug, group ? group.id : null);

    if (!items.length) {
      var none = document.createElement('p');
      none.className = 'coming-soon';
      none.textContent = I18n.t('select.noTexts');
      root.appendChild(none);
    } else {
      var grid = document.createElement('div');
      grid.className = 'select-grid';
      items.forEach(function (item) {
        var btn = document.createElement('a');
        btn.className = 'btn-comedy';
        var count;
        if (showGroups) {
          btn.href = 'practice-select.html?era=' + encodeURIComponent(era) +
            '&id=' + encodeURIComponent(author.slug) + '&group=' + encodeURIComponent(item.id);
          count = I18n.t('select.worksCount', { n: PracticeBank.works(author.slug, item.id).length });
        } else {
          btn.href = 'practice.html?era=' + encodeURIComponent(era) +
            '&id=' + encodeURIComponent(author.slug) + '&work=' + encodeURIComponent(item.id);
          count = I18n.t('select.fragmentsCount', { n: item.fragments.length });
        }
        btn.innerHTML = Markdown.renderInline(labelOf(item)) +
          '<span class="btn-comedy-count">' + Markdown.escapeHtml(count) + '</span>';
        grid.appendChild(btn);
      });
      root.appendChild(grid);
    }

    var back = document.createElement('a');
    back.className = 'back-link';
    if (group) {
      back.href = 'practice-select.html?era=' + encodeURIComponent(era) +
        '&id=' + encodeURIComponent(author.slug);
      back.textContent = I18n.t('link.backCategories');
    } else {
      back.href = 'author.html?era=' + encodeURIComponent(era) +
        '&id=' + encodeURIComponent(author.slug);
      back.textContent = I18n.t('link.backTo', { name: author.name });
    }
    root.appendChild(back);
  }
})();
