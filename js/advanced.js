/*
 * advanced.js - the "Advanced settings" menu on verse excerpts (window.AdvancedSettings).
 *
 * Shown only on an excerpt whose every verse has scansion codes in
 * js/scansion-data.js (for now: Virgil's Eclogues). The menu has two groups:
 *   METRE   - highlight syllables (quantities and feet), caesurae, synaloephas,
 *             drawn on the Latin text itself;
 *   READING - an accentual reading (the ictus on the first long of each foot,
 *             capitalised with an accent) and a quantitative reading (long
 *             syllables written with a doubled vowel), each in its own panel
 *             below the Latin, in the ecclesiastical pronunciation (ae, oe = e).
 * The three metre switches are remembered for the visitor (localStorage, when
 * it is available); the readings open per excerpt.
 */
(function (global) {
  'use strict';

  var STORE = 'latinapp_adv';

  function loadPrefs() {
    try { return JSON.parse(global.localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; }
  }
  function savePrefs(p) {
    try { global.localStorage.setItem(STORE, JSON.stringify(p)); } catch (e) { /* private mode: not remembered */ }
  }

  function esc(s) { return global.Markdown ? global.Markdown.escapeHtml(s) : String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function t(key) { return global.I18n ? global.I18n.t(key) : key; }

  // ---- the verses of an excerpt, with their codes -------------------------------
  function model(frag, slug, workId) {
    var data = global.ScansionData && global.ScansionData[slug] && global.ScansionData[slug][workId];
    if (!data || !global.Scansion || !frag.latin) return null;
    var cm = /vv\. (\d+)-(\d+)/.exec(frag.citation || '');
    if (!cm) return null;
    var from = +cm[1];
    var lines = frag.latin.replace(/\r\n/g, '\n').split('\n');
    var out = [];
    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i].replace(/^\s*>\s?/, '');
      var num = null, tag = '';
      var nm = /^\*\*(\d+)\.\*\*\s*/.exec(raw);
      if (nm) { num = nm[1]; raw = raw.slice(nm[0].length); }
      var tm = /^([A-Z]{2}\.)\s+/.exec(raw);
      if (tm) { tag = tm[1]; raw = raw.slice(tm[0].length); }
      var codes = data[from + i];
      if (!codes) return null;
      var parsed = global.Scansion.parseVerse(raw);
      if (parsed.sylls.length !== codes.length) return null; // text changed since the data was built
      var feet = global.Scansion.hexFeet(codes);
      if (!feet) return null;
      out.push({ num: num, tag: tag, text: raw, parsed: parsed, codes: codes, feet: feet, caes: global.Scansion.caesurae(parsed, codes, feet) });
    }
    return out;
  }

  // syllable index -> { foot number, type, first-of-foot }
  function footIndex(v) {
    var map = {};
    v.feet.forEach(function (f, n) {
      f.sylls.forEach(function (g, k) { map[g] = { n: n, type: f.type, first: k === 0 }; });
    });
    return map;
  }

  // ---- the Latin text with marks ------------------------------------------------------
  function renderVerse(v) {
    var fi = footIndex(v);
    var caesAfter = {};
    v.caes.forEach(function (c) { caesAfter[c.after] = c; });
    // a foot that starts right after an elided syllable: the bar goes before the elided one
    var barBefore = {};
    v.feet.forEach(function (f, n) {
      if (!n) return;
      var g = f.sylls[0];
      while (g > 0 && v.codes.charAt(g - 1) === 'E') g--;
      barBefore[g] = true;
    });
    var html = '';
    var g = 0;
    var pendingCaes = null, pendingSyn = false;
    v.parsed.tokens.forEach(function (tok) {
      if (tok.sep != null) {
        var sep = esc(tok.sep);
        if (pendingCaes) {
          sep = sep.replace(/(\s*)$/, '<span class="sc-caes' + (pendingCaes.main ? ' is-main' : '') + '" title="' +
            esc(t('adv.caes.' + pendingCaes.kind)) + '">' + (pendingCaes.main ? '‖' : '|') + '</span>$1');
          pendingCaes = null;
        }
        if (pendingSyn) { sep = sep.replace(/\s+$/, '<span class="sc-tie">‿</span>'); pendingSyn = false; }
        html += sep;
        return;
      }
      var w = tok.word;
      tok.sylls.forEach(function (s, k) {
        var code = v.codes.charAt(g);
        var f = fi[g];
        var cls = ['sc-syl'];
        if (code === 'E') cls.push('q-E');
        else cls.push(code === 'L' ? 'q-L' : 'q-S');
        if (f) cls.push('ft-' + f.type, 'ft-n' + (f.n % 2));
        if (barBefore[g]) cls.push('ft-start');
        // synaloepha: the elided syllable and the one it melts into
        if (code === 'E' || (g > 0 && v.codes.charAt(g - 1) === 'E' && k === 0)) cls.push('syn');
        html += '<span class="' + cls.join(' ') + '">' + esc(w.slice(s.s, s.e)) + '</span>';
        if (k === tok.sylls.length - 1) {
          if (caesAfter[g]) pendingCaes = caesAfter[g];
          if (code === 'E') pendingSyn = true;
        }
        g++;
      });
    });
    if (pendingCaes) html += ''; // never at the line end
    return html;
  }

  function renderLatin(model) {
    return '<blockquote class="sc-verses">' + model.map(function (v) {
      return '<span class="sc-line">' + (v.num ? '<strong>' + v.num + '.</strong> ' : '') +
        (v.tag ? '<span class="sc-tag">' + esc(v.tag) + '</span> ' : '') + renderVerse(v) + '</span>';
    }).join('<br>') + '</blockquote>';
  }

  // ---- the two readings ------------------------------------------------------------
  function renderReading(v, kind) {
    var fi = footIndex(v);
    var out = '';
    var g = 0;
    var tie = false;
    v.parsed.tokens.forEach(function (tok) {
      if (tok.sep != null) {
        // keep the punctuation, drop quotes and brackets, and tie a synaloepha
        var sep = tok.sep.replace(/["“”()]/g, '');
        if (tie) { sep = sep.replace(/\s+/g, '') + '‿'; tie = false; }
        out += esc(sep);
        return;
      }
      var w = tok.word;
      var parts = [];
      tok.sylls.forEach(function (s, k) {
        var code = v.codes.charAt(g);
        var p = global.Scansion.readingParts(w, s, tok.sylls.consLetters || []);
        var txt;
        if (code === 'E') {
          txt = '<s class="rd-elided">' + esc(p.pre + p.v + p.post) + '</s>';
          if (k === tok.sylls.length - 1) tie = true;
        } else if (kind === 'accent') {
          txt = fi[g] && fi[g].first ? '<b class="rd-ictus">' + esc(global.Scansion.stressText(p)) + '</b>' : esc(p.pre + p.v + p.post);
        } else {
          txt = code === 'L' ? '<span class="rd-long">' + esc(global.Scansion.longText(p)) + '</span>' : esc(p.pre + p.v + p.post);
        }
        parts.push(txt);
        g++;
      });
      out += parts.join('-');
    });
    return out;
  }

  function readingPanel(model, kind) {
    var panel = document.createElement('div');
    panel.className = 'reading-panel';
    var h = document.createElement('h3');
    h.textContent = t(kind === 'accent' ? 'adv.read.accent.title' : 'adv.read.quant.title');
    panel.appendChild(h);
    var p = document.createElement('p');
    p.className = 'reading-note';
    p.textContent = t(kind === 'accent' ? 'adv.read.accent.note' : 'adv.read.quant.note');
    panel.appendChild(p);
    var body = document.createElement('div');
    body.className = 'reading-text';
    body.innerHTML = model.map(function (v) {
      return '<span class="rd-line">' + (v.num ? '<strong>' + v.num + '.</strong> ' : '') +
        (v.tag ? '<span class="sc-tag">' + esc(v.tag) + '</span> ' : '') + renderReading(v, kind) + '</span>';
    }).join('<br>');
    panel.appendChild(body);
    return panel;
  }

  // ---- the menu ------------------------------------------------------------------------
  function attach(opts) {
    var m = model(opts.frag, opts.slug, opts.workId);
    if (!m) return;
    var latin = opts.latin;
    var plainHtml = latin.innerHTML;
    var scannedHtml = null;
    var prefs = loadPrefs();
    var panels = {};

    var row = document.createElement('div');
    row.className = 'adv-row';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost adv-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-haspopup', 'true');
    btn.innerHTML = '<span aria-hidden="true">⚙</span> ' + esc(t('adv.button')) + ' <span class="adv-caret" aria-hidden="true">▾</span>';
    row.appendChild(btn);

    var menu = document.createElement('div');
    menu.className = 'adv-menu';
    menu.hidden = true;
    menu.setAttribute('role', 'group');
    menu.setAttribute('aria-label', t('adv.button'));
    row.appendChild(menu);

    var legend = document.createElement('p');
    legend.className = 'sc-legend';
    legend.hidden = true;

    function group(title, items) {
      var sec = document.createElement('div');
      sec.className = 'adv-group';
      var h = document.createElement('p');
      h.className = 'adv-group-title';
      h.textContent = title;
      sec.appendChild(h);
      items.forEach(function (it) {
        var lab = document.createElement('label');
        lab.className = 'adv-item';
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!it.checked;
        cb.addEventListener('change', function () { it.onChange(cb.checked); });
        lab.appendChild(cb);
        var span = document.createElement('span');
        span.innerHTML = '<span class="adv-item-name">' + esc(it.name) + '</span><span class="adv-item-hint">' + esc(it.hint) + '</span>';
        lab.appendChild(span);
        sec.appendChild(lab);
      });
      return sec;
    }

    function applyMetre() {
      var on = prefs.syl || prefs.caes || prefs.syn;
      if (on) {
        if (!scannedHtml) scannedHtml = renderLatin(m);
        latin.innerHTML = scannedHtml;
      } else {
        latin.innerHTML = plainHtml;
      }
      latin.classList.toggle('sc-syl-on', !!prefs.syl);
      latin.classList.toggle('sc-caes-on', !!prefs.caes);
      latin.classList.toggle('sc-syn-on', !!prefs.syn);
      var bits = [];
      if (prefs.syl) bits.push(t('adv.legend.syl'));
      if (prefs.caes) bits.push(t('adv.legend.caes'));
      if (prefs.syn) bits.push(t('adv.legend.syn'));
      if (bits.length) bits.push(t('adv.legend.source'));
      legend.textContent = bits.join(' · ');
      legend.hidden = !bits.length;
    }

    function setMetre(key) {
      return function (on) {
        prefs = loadPrefs();
        prefs[key] = on;
        savePrefs(prefs);
        applyMetre();
      };
    }

    function setReading(kind) {
      return function (on) {
        if (on) {
          if (!panels[kind]) panels[kind] = readingPanel(m, kind);
          var anchor = legend.nextSibling;
          // accentual first, then quantitative, both right under the Latin
          if (kind === 'quant' && panels.accent && panels.accent.parentNode) anchor = panels.accent.nextSibling;
          latin.parentNode.insertBefore(panels[kind], anchor);
        } else if (panels[kind] && panels[kind].parentNode) {
          panels[kind].parentNode.removeChild(panels[kind]);
        }
      };
    }

    menu.appendChild(group(t('adv.metre'), [
      { name: t('adv.syl'), hint: t('adv.syl.hint'), checked: prefs.syl, onChange: setMetre('syl') },
      { name: t('adv.caes'), hint: t('adv.caes.hint'), checked: prefs.caes, onChange: setMetre('caes') },
      { name: t('adv.syn'), hint: t('adv.syn.hint'), checked: prefs.syn, onChange: setMetre('syn') }
    ]));
    menu.appendChild(group(t('adv.reading'), [
      { name: t('adv.read.accent'), hint: t('adv.read.accent.hint'), checked: false, onChange: setReading('accent') },
      { name: t('adv.read.quant'), hint: t('adv.read.quant.hint'), checked: false, onChange: setReading('quant') }
    ]));

    function close() { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); row.classList.remove('is-open'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      row.classList.toggle('is-open', open);
    });
    document.addEventListener('click', function (e) { if (!row.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { close(); btn.focus(); } });

    latin.parentNode.insertBefore(row, latin);
    latin.parentNode.insertBefore(legend, latin.nextSibling);
    applyMetre();
  }

  global.AdvancedSettings = { attach: attach, _model: model, _renderReading: renderReading };
})(window);
