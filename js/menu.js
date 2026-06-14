/*
 * menu.js - shared era menu bar, rendered into the header on every page.
 *
 *   Menu.render(navEl, { activeEra, onClick })  -> Promise
 *
 * Builds the five era buttons (reusing the .era-btn markup/classes). On the
 * home page the click handler toggles/switches the description panel; on the
 * inner pages it navigates to the home listing for that era.
 */
(function (global) {
  'use strict';

  function render(navEl, opts) {
    opts = opts || {};
    return LatinData.getEras().then(function (eras) {
      navEl.innerHTML = '';
      eras.forEach(function (era) {
        var btn = document.createElement('button');
        btn.className = 'era-btn';
        btn.type = 'button';
        btn.dataset.era = era.id;
        btn.innerHTML = era.available
          ? Markdown.escapeHtml(era.name)
          : Markdown.escapeHtml(era.name) + ' <span class="lock">(soon)</span>';
        if (opts.activeEra && era.id === opts.activeEra) {
          btn.classList.add('active');
        }
        btn.addEventListener('click', function () {
          if (typeof opts.onClick === 'function') opts.onClick(era.id, era);
        });
        navEl.appendChild(btn);
      });
      return navEl;
    });
  }

  // Convenience handler for inner pages: jump to the home listing for an era.
  function goToEra(eraId) {
    global.location.href = 'index.html?era=' + encodeURIComponent(eraId);
  }

  global.Menu = { render: render, goToEra: goToEra };
})(window);
