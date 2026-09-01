/*
 * strip.js - turn a saved Latin Library HTML page into plain text.
 * Shared by fetch_sources.js and verify.js. No dependencies.
 */
'use strict';

function stripHtml(html) {
  return html
    // The Latin Library sets verse with <br> between lines and no whitespace
    // around it (`discidit<br>Vestem` in Pro Caelio 38). Dropping the tag with
    // everything else welded the two words together, so break the line first.
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#151;|&#8212;/g, '--')
    // Accented letters arrive as named entities in a handful of pages - the
    // transliterated Greek of ad Quintum III and ad Brutum I is full of
    // &ocirc; and &ecirc;. Left undecoded they end up in the cache as literal
    // "&ocirc;", which would then have to be reproduced in a fragment or
    // trimmed around for no reason. Decode the accent entities and any
    // numeric one, then anything still unrecognised stays visible as itself.
    .replace(/&([aeiouyAEIOUY])(acute|grave|circ|uml|ring|tilde);/g, function (m, letter, kind) {
      var marks = { acute: '\u0301', grave: '\u0300', circ: '\u0302', uml: '\u0308', ring: '\u030A', tilde: '\u0303' };
      return (letter + marks[kind]).normalize('NFC');
    })
    .replace(/&([cC])cedil;/g, function (m, c) { return c === 'c' ? '\u00E7' : '\u00C7'; })
    .replace(/&([nN])tilde;/g, function (m, c) { return c === 'n' ? '\u00F1' : '\u00D1'; })
    .replace(/&#(\d+);/g, function (m, n) { return String.fromCodePoint(parseInt(n, 10)); })
    .replace(/&#x([0-9a-fA-F]+);/g, function (m, n) { return String.fromCodePoint(parseInt(n, 16)); })
    .split('\n')
    .map(function (l) { return l.replace(/[ \t]+$/, ''); })
    .filter(function (l) { return l.trim().length; })
    .join('\n');
}

// The comparison form used when checking our Latin against the source: one
// long line, with section numbers ([12]), chapter numerals ([XII]) and the
// "12." style markers Pro Milone uses all removed.
function normalise(text) {
  return text
    .replace(/\s+/g, ' ')
    // Caesar and Hirtius carry the standard editorial SUBSECTION numbers as
    // `**1.**`, bold so they cannot be read as numerals in the sentence. The
    // Latin Library prints no subsections at all, so this marker is always the
    // app's own and never the source's. Nothing can be lost by removing it: a
    // pair of asterisks cannot occur in Latin.
    .replace(/\*\*\d+\.\*\*/g, ' ')
    .replace(/\[\d+\]/g, ' ')
    .replace(/\[[IVXLC]+\]/g, ' ')
    .replace(/\b\d+\. /g, ' ')
    // De Re Publica and the Somnium Scipionis are printed with parenthesised
    // section numbers - "(13) Sed quo sis, Africane" - where every other text
    // uses [13] or "13.". Strip that style too, so a fragment can carry the
    // app's usual [n] markers and still match. Both sides get the treatment,
    // so this only ever cancels a marker, never a difference in wording.
    .replace(/\(\d+\)/g, ' ')
    // Spacing around punctuation is typesetting, not text. The Latin Library
    // sets some quoted questions as `" praesidium a nobis postulabatis ?`
    // (Att. I.16), with a space after the opening quote and before the mark.
    // Both sides get the same treatment, so this only ever removes a
    // whitespace difference: no two different sequences of letters can be
    // made to match by it.
    .replace(/\s+([,;:.?!])/g, '$1')
    .replace(/(["'])\s+/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = { stripHtml: stripHtml, normalise: normalise };
