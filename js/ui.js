/*
 * ui.js - small DOM helpers shared by every page (loaded on all three).
 * Keeps portrait rendering, the broken-image placeholder, query-string
 * reading, and loading/error states in one place.
 */
(function (global) {
  'use strict';

  function getParam(name) {
    return new URLSearchParams(global.location.search).get(name);
  }

  // Two-letter initials derived from an image filename, e.g.
  // "images/marcus-pacuvius.jpg" -> "MP".
  function initialsFromSrc(src) {
    var file = src.split('/').pop().replace(/\.[^.]+$/, '');
    var parts = file.split('-').filter(Boolean);
    var letters = parts.slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); });
    return letters.join('') || '?';
  }

  // Build a portrait <div> containing an <img> that falls back to a styled
  // initials placeholder if the file is missing (never a broken-image icon).
  function buildPortrait(image, altName, extraClass) {
    var wrap = document.createElement('div');
    wrap.className = 'portrait' + (extraClass ? ' ' + extraClass : '');

    if (!image || !image.src) {
      wrap.appendChild(makePlaceholder(altName ? altName.slice(0, 2).toUpperCase() : '?'));
      return wrap;
    }

    var img = document.createElement('img');
    img.src = image.src;
    img.alt = altName || '';
    img.loading = 'lazy';
    var initials = initialsFromSrc(image.src);
    img.addEventListener('error', function () {
      wrap.innerHTML = '';
      wrap.appendChild(makePlaceholder(initials));
    });
    wrap.appendChild(img);
    return wrap;
  }

  function makePlaceholder(text) {
    var ph = document.createElement('div');
    ph.className = 'placeholder';
    ph.textContent = text;
    return ph;
  }

  // Append one or more portraits into a container element.
  function renderPortraits(container, images, altName, perPortraitClass) {
    container.innerHTML = '';
    if (!images || images.length === 0) {
      container.appendChild(buildPortrait(null, altName, perPortraitClass));
      return;
    }
    images.forEach(function (img) {
      container.appendChild(buildPortrait(img, altName, perPortraitClass));
    });
  }

  function showError(container, message) {
    container.innerHTML = '<div class="error-box">' + Markdown.escapeHtml(message) + '</div>';
  }

  // Render a breadcrumb trail. items = [{ label, href? }, ...]; items with an
  // href become links, the final item (or any without href) is the current page.
  function renderBreadcrumb(container, items) {
    container.innerHTML = '';
    items.forEach(function (item, idx) {
      if (idx > 0) {
        var sep = document.createElement('span');
        sep.className = 'crumb-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '/';
        container.appendChild(sep);
      }
      var isLast = idx === items.length - 1;
      var node;
      if (item.href && !isLast) {
        node = document.createElement('a');
        node.className = 'crumb';
        node.href = item.href;
      } else {
        node = document.createElement('span');
        node.className = 'crumb crumb-current';
        node.setAttribute('aria-current', 'page');
      }
      node.textContent = item.label;
      container.appendChild(node);
    });
  }

  global.UI = {
    getParam: getParam,
    buildPortrait: buildPortrait,
    renderPortraits: renderPortraits,
    initialsFromSrc: initialsFromSrc,
    showError: showError,
    renderBreadcrumb: renderBreadcrumb
  };
})(window);
