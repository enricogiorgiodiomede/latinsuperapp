/*
 * whatsnew.js - renders the "What's New" parchment scroll on the home page
 * (the #changelog-panel beside the era intro) and the "previous versions"
 * modal. Reads version data from window.ChangeLog and UI labels from I18n.
 * Home page only: it no-ops if #changelog-panel is absent. Language is read
 * once from I18n.lang; switching language reloads the page, so there is no
 * live re-render. Content is inserted with textContent (no HTML injection).
 */
(function (global) {
  'use strict';

  var doc = global.document;
  var overlayEl = null;

  function el(tag, cls, text) {
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // ISO "2026-06-29" -> "29/06/2026". The timezone label (CEST) is baked into
  // the i18n "released" template (all dates fall in summer time).
  function fmtDate(iso) {
    var p = String(iso).split('-');
    if (p.length !== 3) return iso;
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  var CATS = ['added', 'changed', 'deleted'];

  // Fill `container` with the three ordered buckets for one version entry.
  function renderBuckets(container, entry, lang) {
    var data = entry[lang] || entry.en;
    CATS.forEach(function (cat) {
      var sec = el('div', 'cl-section cl-' + cat);
      sec.appendChild(el('p', 'cl-cat', global.I18n.t('whatsNew.cat.' + cat)));
      var items = (data && data[cat]) || [];
      if (!items.length) {
        sec.appendChild(el('p', 'cl-empty', global.I18n.t('whatsNew.nothing.' + cat)));
      } else {
        var ul = el('ul', 'cl-list');
        items.forEach(function (txt) { ul.appendChild(el('li', 'cl-item', txt)); });
        sec.appendChild(ul);
      }
      container.appendChild(sec);
    });
  }

  function versionLabel(entry) {
    return global.I18n.t('whatsNew.version', { version: entry.v });
  }
  function dateLabel(entry) {
    return global.I18n.t('whatsNew.released', { date: fmtDate(entry.date) });
  }

  // ---- the side parchment (latest version) ----
  function renderFeatured(panel, entry, lang) {
    panel.textContent = '';
    var inner = el('div', 'cl-inner');
    inner.appendChild(el('h2', 'cl-title', global.I18n.t('whatsNew.title')));
    inner.appendChild(el('p', 'cl-version', versionLabel(entry)));
    var body = el('div', 'cl-body');
    renderBuckets(body, entry, lang);
    inner.appendChild(body);
    inner.appendChild(el('p', 'cl-date', dateLabel(entry)));
    var btn = el('button', 'cl-more-btn', global.I18n.t('whatsNew.seePrevious'));
    btn.type = 'button';
    btn.addEventListener('click', openModal);
    inner.appendChild(btn);
    panel.appendChild(inner);
  }

  // ---- the full-history modal ----
  function buildModal(lang) {
    var overlay = el('div', 'cl-modal-overlay');
    var modal = el('div', 'cl-modal');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', global.I18n.t('whatsNew.historyTitle'));

    var head = el('div', 'cl-modal-head');
    head.appendChild(el('h2', 'cl-modal-title', global.I18n.t('whatsNew.historyTitle')));
    var close = el('button', 'cl-modal-close');
    close.type = 'button';
    close.setAttribute('aria-label', global.I18n.t('whatsNew.close'));
    close.innerHTML = '&times;';
    close.addEventListener('click', closeModal);
    head.appendChild(close);
    modal.appendChild(head);

    var list = el('div', 'cl-modal-list');
    global.ChangeLog.versions.forEach(function (entry) {
      var block = el('section', 'cl-modal-entry');
      block.appendChild(el('h3', 'cl-version', versionLabel(entry)));
      block.appendChild(el('p', 'cl-date', dateLabel(entry)));
      var body = el('div', 'cl-body');
      renderBuckets(body, entry, lang);
      block.appendChild(body);
      list.appendChild(block);
    });
    modal.appendChild(list);

    overlay.appendChild(modal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    doc.body.appendChild(overlay);
    return overlay;
  }

  function openModal() {
    if (!overlayEl) return;
    overlayEl.classList.add('is-open');
    doc.body.classList.add('cl-modal-open');
    var c = overlayEl.querySelector('.cl-modal-close');
    if (c) c.focus();
  }
  function closeModal() {
    if (!overlayEl) return;
    overlayEl.classList.remove('is-open');
    doc.body.classList.remove('cl-modal-open');
  }

  function init() {
    var panel = doc.getElementById('changelog-panel');
    if (!panel || !global.I18n || !global.ChangeLog || !global.ChangeLog.versions.length) return;
    var lang = global.I18n.lang || 'en';
    renderFeatured(panel, global.ChangeLog.versions[0], lang);
    overlayEl = buildModal(lang);
    doc.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && overlayEl.classList.contains('is-open')) closeModal();
    });
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
