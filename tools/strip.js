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
    .replace(/\[\d+\]/g, ' ')
    .replace(/\[[IVXLC]+\]/g, ' ')
    .replace(/\b\d+\. /g, ' ')
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
