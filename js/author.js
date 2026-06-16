/*
 * author.js - author detail page. Reads ?era= & ?id= from the URL and renders
 * biography, main works, style, a per-criterion difficulty bar chart, and an
 * overall evaluation, plus a "Practice translation" button. The Latin excerpt
 * itself lives on practice.html.
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
    document.title = author.name + ' - Latin Authors: Explore & Translate';
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
    var rating = Ratings.forAuthor(author.slug);

    // --- Hero: portrait(s), name, dates, overall evaluation, actions ---
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

    if (rating) {
      heading.appendChild(buildEvaluation(rating));
    }

    var actions = document.createElement('div');
    actions.className = 'detail-actions';
    var practiceBtn = document.createElement('a');
    practiceBtn.className = 'btn btn-primary';
    // Authors with several works (Plautus, Terence, Caecilius) choose a text first.
    var needsSelection = (typeof PracticeBank !== 'undefined') && PracticeBank.needsSelection(author.slug);
    practiceBtn.href = (needsSelection ? 'practice-select.html?era=' : 'practice.html?era=') +
      encodeURIComponent(era) + '&id=' + encodeURIComponent(author.slug);
    practiceBtn.textContent = 'Practice translation';
    actions.appendChild(practiceBtn);
    heading.appendChild(actions);

    hero.appendChild(heading);
    root.appendChild(hero);

    // --- Content sections ---
    addSection('Biography', author.biography);
    addSection('Main Works', author.works);
    addSection('Style and Difficulty', author.style);

    // --- Difficulty profile: the criteria bar chart ---
    if (rating) {
      root.appendChild(buildDifficultyProfile(rating));
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

  // The overall evaluation, shown as a coloured badge (with a note for
  // authors known only from fragments).
  function buildEvaluation(rating) {
    var evalDef = Ratings.evaluation(rating.evaluation);
    var wrap = document.createElement('div');
    wrap.className = 'eval-wrap';

    var label = document.createElement('span');
    label.className = 'eval-caption';
    label.textContent = 'Overall difficulty';
    wrap.appendChild(label);

    var badge = document.createElement('div');
    badge.className = 'eval-badge';
    badge.style.backgroundColor = evalDef.color;
    badge.style.color = rating.evaluation === 'manageable' ? '#2b2622' : '#fff';
    badge.textContent = evalDef.label;
    wrap.appendChild(badge);

    if (rating.scaledDown) {
      var note = document.createElement('span');
      note.className = 'eval-note';
      note.textContent = 'scaled to the sparse surviving fragments';
      wrap.appendChild(note);
    }
    return wrap;
  }

  // The "Difficulty profile" section: the bar chart plus a short legend.
  function buildDifficultyProfile(rating) {
    var sec = document.createElement('section');
    sec.className = 'content-section';

    var h = document.createElement('h2');
    h.textContent = 'Difficulty profile';
    sec.appendChild(h);

    var lead = document.createElement('p');
    lead.className = 'profile-lead';
    lead.textContent = 'How hard each aspect is to translate. Bars are coloured by the level they reach.';
    sec.appendChild(lead);

    var chartWrap = document.createElement('div');
    chartWrap.className = 'chart-wrap';
    Chart.renderCriteria(chartWrap, rating);
    sec.appendChild(chartWrap);

    var legend = document.createElement('ul');
    legend.className = 'criteria-legend';
    Ratings.CRITERIA.forEach(function (c) {
      var li = document.createElement('li');
      li.innerHTML = '<strong>' + Markdown.escapeHtml(c.label) + '</strong> ' +
        Markdown.escapeHtml(c.blurb);
      legend.appendChild(li);
    });
    sec.appendChild(legend);

    // Caveat for fragmentary authors: lost context adds difficulty regardless of
    // how much survives (this is partly why Lucilius stays Very Difficult).
    if (rating.fragments) {
      var caveat = document.createElement('p');
      caveat.className = 'fragment-caveat';
      var text = 'Only fragments of this author survive. Beyond their small quantity, the ' +
        'surviving text is often cut off from its original context, which can make ' +
        'individual passages harder to understand than the bars alone suggest.';
      if (rating.fragmentExample) text += ' ' + rating.fragmentExample;
      caveat.textContent = text;
      sec.appendChild(caveat);
    }

    return sec;
  }
})();
