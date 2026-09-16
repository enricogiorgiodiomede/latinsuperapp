/*
 * analytics.js - Google Analytics 4, behind consent.
 *
 * Nothing of Google's is fetched and nothing is sent until the visitor accepts:
 * gtag.js is injected only on "granted", so a visitor who rejects, or who never
 * answers, never contacts Google at all. The answer is remembered in
 * localStorage so the bar appears once, and a footer link reopens it, because a
 * consent that cannot be withdrawn is not a consent.
 *
 * Accepting covers the advertising signals too, which is what Google Signals
 * needs for demographics and cross-device reporting; the bar text says so in
 * both languages, because consent to something unsaid is not consent.
 *
 * The bar renders only when MEASUREMENT_ID is set, so an empty ID disables the
 * whole feature rather than asking for consent to nothing.
 */
(function (global) {
  'use strict';

  var MEASUREMENT_ID = 'G-TR2K9JH9ZE';
  var STORAGE_KEY = 'latinapp_analytics_consent';
  var doc = global.document;
  var loaded = false;
  var bar = null;

  // localStorage throws in some privacy modes; treat any failure as "no answer".
  function readChoice() {
    try { return global.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function writeChoice(value) {
    try { global.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  // i18n.js runs before this file, but fall back to English if it is missing.
  function t(key, fallback) {
    if (global.I18n && typeof global.I18n.t === 'function') {
      var s = global.I18n.t(key);
      if (s && s !== key) return s;
    }
    return fallback;
  }

  function loadGA() {
    if (loaded || !MEASUREMENT_ID) return;
    loaded = true;
    global.dataLayer = global.dataLayer || [];
    function gtag() { global.dataLayer.push(arguments); }
    global.gtag = gtag;
    // Everything is granted here because this runs only after Accept, and the
    // bar says plainly that advertising profiling is part of what is accepted.
    // The advertising signals are what Google Signals needs for the demographic
    // and cross-device reports; without them that switch collects nothing.
    gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID);
    var s = doc.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    doc.head.appendChild(s);
  }

  function closeBar() {
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
    bar = null;
  }

  function answer(choice) {
    writeChoice(choice);
    closeBar();
    if (choice === 'granted') loadGA();
  }

  function button(label, cls, choice) {
    var b = doc.createElement('button');
    b.type = 'button';
    b.className = 'consent-btn ' + cls;
    b.textContent = label;
    b.addEventListener('click', function () { answer(choice); });
    return b;
  }

  function showBar() {
    if (bar || !MEASUREMENT_ID) return;
    bar = doc.createElement('div');
    bar.className = 'consent-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', t('consent.aria', 'Analytics consent'));

    var text = doc.createElement('p');
    text.className = 'consent-text';
    text.textContent = t('consent.text', 'This site can use Google Analytics to count visits.');

    var actions = doc.createElement('div');
    actions.className = 'consent-actions';
    actions.appendChild(button(t('consent.reject', 'Reject'), 'consent-reject', 'denied'));
    actions.appendChild(button(t('consent.accept', 'Accept'), 'consent-accept', 'granted'));

    bar.appendChild(text);
    bar.appendChild(actions);
    doc.body.appendChild(bar);
  }

  // A footer control to reopen the bar and change a previous answer.
  function addFooterLink() {
    if (!MEASUREMENT_ID) return;
    var footer = doc.querySelector('.site-footer .container');
    if (!footer) return;
    var link = doc.createElement('button');
    link.type = 'button';
    link.className = 'consent-link';
    link.textContent = t('consent.manage', 'Cookies and analytics');
    link.addEventListener('click', function () { showBar(); });
    footer.appendChild(doc.createTextNode(' '));
    footer.appendChild(link);
  }

  function boot() {
    var choice = readChoice();
    if (choice === 'granted') loadGA();
    else if (choice !== 'denied') showBar();
    addFooterLink();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
