/*
 * home.js - home page: era menu bar, expandable era description panel,
 * and the author-card grid for the selected era.
 */
(function () {
  'use strict';

  var menuEl = document.getElementById('era-menu');
  var panelEl = document.getElementById('era-panel');
  var panelTitleEl = document.getElementById('era-panel-title');
  var panelBodyEl = document.getElementById('era-panel-body');
  var panelToggleEl = document.getElementById('era-panel-toggle');
  var gridLabelEl = document.getElementById('grid-label');
  var gridEl = document.getElementById('author-grid');

  var state = { eras: [], selected: 'archaic', expanded: true };

  function init() {
    LatinData.getEras().then(function (eras) {
      state.eras = eras;
      return Menu.render(menuEl, { onClick: onEraClick });
    }).then(function () {
      // Honor ?era=<id> so menu clicks from inner pages land on the right era.
      var requested = UI.getParam('era');
      var valid = state.eras.some(function (e) { return e.id === requested; });
      var initial = valid ? requested : 'archaic';
      selectEra(initial, true);
    });
  }

  function updateActiveButton() {
    Array.prototype.forEach.call(menuEl.children, function (btn) {
      btn.classList.toggle('active', btn.dataset.era === state.selected && state.expanded);
    });
  }

  function onEraClick(eraId) {
    if (eraId === state.selected) {
      // Same era -> toggle the panel open/closed.
      state.expanded = !state.expanded;
      applyPanelState();
      updateActiveButton();
    } else {
      selectEra(eraId, true);
    }
  }

  function selectEra(eraId, expand) {
    state.selected = eraId;
    state.expanded = expand;
    var era = state.eras.filter(function (e) { return e.id === eraId; })[0];
    panelTitleEl.textContent = era ? era.name : '';
    applyPanelState();
    updateActiveButton();
    renderPanelBody(eraId);
    renderGrid(eraId);
  }

  function applyPanelState() {
    panelEl.classList.toggle('collapsed', !state.expanded);
    panelToggleEl.innerHTML = state.expanded ? '&minus;' : '+';
  }

  function renderPanelBody(eraId) {
    if (eraId !== 'archaic') {
      panelBodyEl.innerHTML =
        '<p class="coming-soon">Coming soon<small>This era has not been written yet. Check back later.</small></p>';
      return;
    }
    panelBodyEl.innerHTML = '<div class="loading">Loading...</div>';
    LatinData.getEra('archaic').then(function (era) {
      panelBodyEl.innerHTML = Markdown.render(era.intro);
    }).catch(function (err) {
      UI.showError(panelBodyEl, err.message);
    });
  }

  function renderGrid(eraId) {
    if (eraId !== 'archaic') {
      gridLabelEl.style.display = 'none';
      gridEl.innerHTML =
        '<p class="coming-soon" style="grid-column:1/-1">Coming soon<small>Authors for this era will appear here once written.</small></p>';
      return;
    }
    gridLabelEl.style.display = '';
    gridLabelEl.textContent = 'Authors of the Archaic Era';
    gridEl.innerHTML = '<div class="loading" style="grid-column:1/-1">Loading authors...</div>';

    LatinData.getAuthors('archaic').then(function (authors) {
      gridEl.innerHTML = '';
      authors.forEach(function (author) {
        gridEl.appendChild(buildCard(author));
      });
    }).catch(function (err) {
      UI.showError(gridEl, err.message);
    });
  }

  function buildCard(author) {
    var card = document.createElement('a');
    card.className = 'author-card';
    card.href = 'author.html?era=archaic&id=' + encodeURIComponent(author.slug);

    var portraits = document.createElement('div');
    portraits.className = 'card-portraits';
    UI.renderPortraits(portraits, author.images, author.name);
    card.appendChild(portraits);

    var body = document.createElement('div');
    body.className = 'card-body';
    var name = document.createElement('p');
    name.className = 'card-name';
    name.textContent = author.name;
    body.appendChild(name);
    if (author.dates) {
      var dates = document.createElement('p');
      dates.className = 'card-dates';
      dates.textContent = author.dates;
      body.appendChild(dates);
    }
    card.appendChild(body);
    return card;
  }

  init();
})();
