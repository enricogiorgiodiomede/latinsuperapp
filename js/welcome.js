/*
 * welcome.js - the "how to use the app" panel, shown over everything else the
 * first time the app is opened.
 *
 * WHEN IT SHOWS. Once per browser session, which is what "every time you open
 * the app" means for a site made of six separate pages: walking from the home
 * page to an author to a practice page must not reopen it three times. A tick
 * box turns it off for good.
 *
 *   localStorage  latinapp_welcome_hidden = '1'   never again, on this browser
 *   sessionStorage latinapp_welcome_seen  = '1'   already shown, this session
 *
 * Both reads and writes are wrapped, because storage throws in some privacy
 * modes; a failure there means the panel simply shows again, which is the safe
 * way round.
 *
 * IT SITS ABOVE THE CONSENT BAR on purpose (z-index 200 against its 60), so a
 * brand-new visitor reads how the app works first and finds the cookie
 * question waiting underneath when the panel closes. Neither knows about the
 * other.
 */
(function (global) {
  'use strict';

  var HIDE_KEY = 'latinapp_welcome_hidden';
  var SEEN_KEY = 'latinapp_welcome_seen';
  var doc = global.document;
  var overlay = null;
  var lastFocus = null;

  function readFlag(store, key) {
    try { return global[store].getItem(key) === '1'; } catch (e) { return false; }
  }
  function writeFlag(store, key) {
    try { global[store].setItem(key, '1'); } catch (e) { /* ignore */ }
  }

  // i18n.js runs before this file, but fall back to English if it is missing.
  function t(key, fallback) {
    if (global.I18n && typeof global.I18n.t === 'function') {
      var s = global.I18n.t(key);
      if (s && s !== key) return s;
    }
    return fallback;
  }

  function close(never) {
    if (never) writeFlag('localStorage', HIDE_KEY);
    writeFlag('sessionStorage', SEEN_KEY);
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
    doc.body.classList.remove('welcome-open');
    doc.removeEventListener('keydown', onKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (!overlay) return;
    if (e.key === 'Escape') { e.preventDefault(); close(false); return; }
    // A light focus trap: the panel is the only thing the user can reach while
    // it covers the page, so Tab must not wander into the page behind it.
    if (e.key !== 'Tab') return;
    var items = overlay.querySelectorAll('input, button');
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function build() {
    overlay = doc.createElement('div');
    overlay.className = 'welcome-overlay';
    // No click-to-dismiss on the scrim. The panel is a short set of
    // instructions meant to be read, and a stray click outside it closing the
    // one thing that explains the app is a bad trade for the convenience.
    // OK closes it, and so does Escape.

    var panel = doc.createElement('div');
    panel.className = 'welcome-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', t('aria.welcome', 'How to use the app'));

    var h = doc.createElement('h2');
    h.className = 'welcome-title';
    h.textContent = t('welcome.title', 'HOW TO USE THE APP:');
    panel.appendChild(h);

    var list = doc.createElement('ul');
    list.className = 'welcome-steps';
    ['welcome.step1', 'welcome.step2', 'welcome.step3', 'welcome.step4'].forEach(function (key) {
      var li = doc.createElement('li');
      li.textContent = t(key, '');
      if (li.textContent) list.appendChild(li);
    });
    panel.appendChild(list);

    var footer = doc.createElement('div');
    footer.className = 'welcome-footer';

    var label = doc.createElement('label');
    label.className = 'welcome-never';
    var box = doc.createElement('input');
    box.type = 'checkbox';
    box.id = 'welcome-never';
    label.appendChild(box);
    var span = doc.createElement('span');
    span.textContent = t('welcome.never', 'Never show me this again');
    label.appendChild(span);
    footer.appendChild(label);

    var ok = doc.createElement('button');
    ok.type = 'button';
    ok.className = 'welcome-ok';
    ok.textContent = t('welcome.ok', 'OK');
    ok.addEventListener('click', function () { close(box.checked); });
    footer.appendChild(ok);

    panel.appendChild(footer);
    overlay.appendChild(panel);
    doc.body.appendChild(overlay);
    doc.body.classList.add('welcome-open');
    doc.addEventListener('keydown', onKey, true);

    lastFocus = doc.activeElement;
    ok.focus();
  }

  function boot() {
    if (readFlag('localStorage', HIDE_KEY)) return;
    if (readFlag('sessionStorage', SEEN_KEY)) return;
    build();
  }

  // Exposed so a future "show me the instructions again" control has something
  // to call; it ignores both flags on purpose.
  function show() {
    if (overlay) return;
    build();
  }

  global.Welcome = { show: show };

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
