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
          : Markdown.escapeHtml(era.name) + ' <span class="lock">' + Markdown.escapeHtml(I18n.t('menu.soon')) + '</span>';
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

  /* ------------------------------------------------- the collapse control
   * The hamburger at the bottom-left of the banner folds the era buttons and
   * the subtitle away, leaving the title bar alone. It matters most on a
   * phone, where the five era buttons wrap onto three rows and the banner is
   * sticky, so they eat the top of every screen.
   *
   * The choice is remembered across pages, because a banner that un-collapses
   * on every navigation would be worse than no control at all. Storage throws
   * in some privacy modes; a failure there just means it starts open.
   */
  var COLLAPSE_KEY = 'latinapp_menu_collapsed';

  function readCollapsed() {
    try { return global.localStorage.getItem(COLLAPSE_KEY) === '1'; } catch (e) { return false; }
  }
  function writeCollapsed(on) {
    try { global.localStorage.setItem(COLLAPSE_KEY, on ? '1' : '0'); } catch (e) { /* ignore */ }
  }

  function applyCollapsed(header, btn, on) {
    header.classList.toggle('is-collapsed', on);
    btn.setAttribute('aria-expanded', on ? 'false' : 'true');
    var label = I18n.t(on ? 'aria.expandMenu' : 'aria.collapseMenu');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  function initCollapse() {
    var btn = document.getElementById('era-collapse');
    var header = document.querySelector('.site-header');
    if (!btn || !header) return;
    var on = readCollapsed();
    applyCollapsed(header, btn, on);
    btn.addEventListener('click', function () {
      on = !on;
      writeCollapsed(on);
      applyCollapsed(header, btn, on);
    });
  }

  global.Menu = { render: render, goToEra: goToEra, initCollapse: initCollapse };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollapse);
  } else {
    initCollapse();
  }
})(window);
