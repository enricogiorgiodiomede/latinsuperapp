/*
 * author.js - author detail page. Reads ?era= & ?id= from the URL and
 * renders biography, main works, style/difficulty and a tier badge, plus a
 * "Practice translation" button. The excerpt itself lives on practice.html.
 */
(function () {
  'use strict';

  var root = document.getElementById('author-root');
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
    document.title = author.name + ' - Latin Authors Tier List';
    render(author);
  }).catch(function (err) {
    UI.showError(root, err.message);
  });

  // Breadcrumb: Home / <Era> / <Author>
  function renderBreadcrumb(eraId, author) {
    LatinData.getEras().then(function (eras) {
      var match = eras.filter(function (e) { return e.id === eraId; })[0];
      var items = [
        { label: 'Home', href: 'index.html' },
        { label: match ? match.name : eraId, href: 'index.html?era=' + encodeURIComponent(eraId) }
      ];
      if (author) items.push({ label: author.name });
      UI.renderBreadcrumb(crumbEl, items);
    });
  }

  function render(author) {
    root.innerHTML = '';

    // --- Hero: portrait(s), name, dates, tier badge, actions ---
    var hero = document.createElement('section');
    hero.className = 'detail-hero';

    var portraits = document.createElement('div');
    portraits.className = 'detail-portraits';
    UI.renderPortraits(portraits, author.images, author.name);
    hero.appendChild(portraits);

    var heading = document.createElement('div');
    heading.className = 'detail-heading';

    var name = document.createElement('h2');
    name.className = 'detail-name';
    name.textContent = author.name;
    heading.appendChild(name);

    if (author.dates) {
      var dates = document.createElement('p');
      dates.className = 'detail-dates';
      dates.textContent = author.dates;
      heading.appendChild(dates);
    }

    if (author.tier && author.tier.letter) {
      heading.appendChild(buildTierBadge(author.tier));
    }

    var actions = document.createElement('div');
    actions.className = 'detail-actions';
    var practiceBtn = document.createElement('a');
    practiceBtn.className = 'btn btn-primary';
    practiceBtn.href = 'practice.html?era=' + encodeURIComponent(era) +
      '&id=' + encodeURIComponent(author.slug);
    practiceBtn.textContent = 'Practice translation';
    actions.appendChild(practiceBtn);
    heading.appendChild(actions);

    hero.appendChild(heading);
    root.appendChild(hero);

    // --- Content sections ---
    addSection('Biography', author.biography);
    addSection('Main Works', author.works);
    addSection('Style and Difficulty', author.style);

    // --- Tier rationale (the Final Rating prose, minus the tier line) ---
    if (author.tierRationale) {
      addSection('Why this tier', author.tierRationale);
    }

    var back = document.createElement('a');
    back.className = 'back-link';
    back.href = 'index.html';
    back.innerHTML = '&larr; Back to all authors';
    root.appendChild(back);
  }

  function addSection(title, markdown) {
    if (!markdown || !markdown.trim()) return;
    var sec = document.createElement('section');
    sec.className = 'content-section';
    var h = document.createElement('h2');
    h.textContent = title;
    sec.appendChild(h);
    var body = document.createElement('div');
    body.innerHTML = Markdown.render(markdown);
    sec.appendChild(body);
    root.appendChild(sec);
  }

  function buildTierBadge(tier) {
    var badge = document.createElement('div');
    badge.className = 'tier-badge tier-' + tier.letter;
    var letter = document.createElement('span');
    letter.className = 'tier-letter';
    letter.textContent = tier.letter;
    var label = document.createElement('span');
    label.className = 'tier-label';
    label.textContent = tier.label || '';
    badge.appendChild(letter);
    badge.appendChild(label);
    return badge;
  }
})();
