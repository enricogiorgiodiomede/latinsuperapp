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

  // Alt text for an author's portrait. Normally "Portrait of X" - true even of
  // the invented likenesses, and the visible caption beside the picture already
  // carries that caveat. The exception is a picture that is not of this author
  // at all (imageNotLikeness: the Nigidius Figulus image is Pythagoras), where
  // naming him as the sitter would be false, so the note itself is the alt.
  function portraitAlt(author) {
    if (!author) return '';
    if (author.imageNotLikeness && author.imageNote) return author.imageNote;
    return I18n.t('alt.portrait', { name: author.name });
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
    renderBreadcrumbJsonLd(items);
  }

  // ------------------------------------------------------------- SEO / head
  // Every page is one HTML file serving many URLs (author.html?era=&id=), so
  // its <head> can only become specific once the controller knows which author
  // or excerpt it is showing. These write the per-entity tags a crawler reads
  // after rendering. The static HTML deliberately ships no canonical on those
  // pages: a canonical of the bare path would collapse all 20 authors into one.

  var ORIGIN = 'https://latinsuperapp.com/';

  // Absolute production form of a relative URL. Always the real origin, never
  // location.href - a canonical pointing at localhost or file:// during local
  // testing would be worse than no canonical at all.
  function absoluteUrl(relative) {
    var path = relative;
    if (!path) path = location.pathname.split('/').pop() + location.search;
    if (path.indexOf('http') === 0) return path;
    if (path.indexOf('./') === 0) path = path.slice(2);
    while (path.charAt(0) === '/') path = path.slice(1);
    // Bare index.html IS the home page, so it collapses to the origin and
    // matches the home canonical. index.html?era=... is a real distinct URL
    // and is left alone.
    if (path === 'index.html') path = '';
    return ORIGIN + path;
  }

  // Find a tag in <head> by one identifying attribute, creating it if absent.
  function headTag(tag, attr, name) {
    var el = document.head.querySelector(tag + '[' + attr + '="' + name + '"]');
    if (!el) {
      el = document.createElement(tag);
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    return el;
  }

  // setMeta({title, description, canonical}) - canonical is relative, e.g.
  // 'author.html?era=caesar&id=marcus-tullius-cicero'. Omit it to self-
  // canonicalise the current URL. Always sets canonical and og:url together.
  function setMeta(opts) {
    opts = opts || {};
    if (opts.title) {
      document.title = opts.title;
      headTag('meta', 'property', 'og:title').setAttribute('content', opts.title);
      headTag('meta', 'name', 'twitter:title').setAttribute('content', opts.title);
    }
    if (opts.description) {
      headTag('meta', 'name', 'description').setAttribute('content', opts.description);
      headTag('meta', 'property', 'og:description').setAttribute('content', opts.description);
      headTag('meta', 'name', 'twitter:description').setAttribute('content', opts.description);
    }
    var url = absoluteUrl(opts.canonical);
    headTag('link', 'rel', 'canonical').setAttribute('href', url);
    headTag('meta', 'property', 'og:url').setAttribute('content', url);
  }

  // The breadcrumb items double as a BreadcrumbList, so the trail a reader
  // sees is the trail Google sees. Emitted from renderBreadcrumb rather than
  // from the five call sites, which all already build the same items array.
  function renderBreadcrumbJsonLd(items) {
    var payload = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map(function (item, idx) {
        var entry = { '@type': 'ListItem', position: idx + 1, name: item.label };
        // The current page is the last crumb and carries no href; schema.org
        // allows a trailing ListItem with a name and no item.
        if (item.href) entry.item = absoluteUrl(item.href);
        return entry;
      })
    };
    var el = document.getElementById('breadcrumb-jsonld');
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = 'breadcrumb-jsonld';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(payload);
  }

  global.UI = {
    getParam: getParam,
    buildPortrait: buildPortrait,
    renderPortraits: renderPortraits,
    initialsFromSrc: initialsFromSrc,
    showError: showError,
    renderBreadcrumb: renderBreadcrumb,
    portraitAlt: portraitAlt,
    setMeta: setMeta,
    absoluteUrl: absoluteUrl
  };
})(window);
