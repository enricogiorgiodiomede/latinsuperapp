/*
 * strip.js - turn a saved Latin Library HTML page into plain text.
 * Shared by fetch_sources.js and verify.js. No dependencies.
 */
'use strict';

function stripHtml(html) {
  return html
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
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = { stripHtml: stripHtml, normalise: normalise };
