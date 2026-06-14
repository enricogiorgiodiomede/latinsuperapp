/*
 * markdown.js - a deliberately small Markdown -> HTML renderer.
 *
 * It only needs to handle the subset of Markdown that appears in
 * archaic_era_draft.md: headings (### level used inside excerpts),
 * paragraphs, bold, italic, bullet lists, block quotes and horizontal
 * rules. No external library, no build step.
 *
 * Image lines and the malformed "(imaginary reconstruction)**" caption
 * lines are stripped by the parser in data.js before any text reaches
 * this renderer, so we never have to cope with unbalanced asterisks.
 */
(function (global) {
  'use strict';

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Inline formatting: bold first, then italic. Both non-greedy.
  function renderInline(text) {
    var html = escapeHtml(text);
    html = html.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
    return html;
  }

  // Render a full Markdown string to an HTML string.
  function render(markdown) {
    if (!markdown) return '';

    var lines = markdown.replace(/\r\n/g, '\n').split('\n');
    var out = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      // Blank line -> separates blocks, nothing to emit.
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Horizontal rule.
      if (/^\s*---\s*$/.test(line)) {
        out.push('<hr>');
        i++;
        continue;
      }

      // Headings (we only expect ### inside excerpt sections, but
      // handle ## and # defensively too).
      var heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        var level = Math.min(heading[1].length, 6);
        out.push('<h' + level + '>' + renderInline(heading[2].trim()) + '</h' + level + '>');
        i++;
        continue;
      }

      // Block quote: gather consecutive '>' lines.
      if (/^\s*>/.test(line)) {
        var quoteLines = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) {
          var q = lines[i].replace(/^\s*>\s?/, '');
          quoteLines.push(q);
          i++;
        }
        // Empty quote lines act as paragraph breaks inside the quote.
        var pieces = quoteLines
          .map(function (q) { return q.trim() === '' ? '' : renderInline(q); })
          .join('<br>')
          .replace(/(<br>)+$/g, '')
          .replace(/^(<br>)+/g, '');
        out.push('<blockquote>' + pieces + '</blockquote>');
        continue;
      }

      // Bullet list: gather consecutive '- ' lines.
      if (/^\s*[-*]\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          var item = lines[i].replace(/^\s*[-*]\s+/, '');
          items.push('<li>' + renderInline(item) + '</li>');
          i++;
        }
        out.push('<ul>' + items.join('') + '</ul>');
        continue;
      }

      // Otherwise: a paragraph (gather until blank line / block start).
      var paraLines = [];
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        !/^\s*>/.test(lines[i]) &&
        !/^\s*[-*]\s+/.test(lines[i]) &&
        !/^\s*---\s*$/.test(lines[i]) &&
        !/^#{1,6}\s+/.test(lines[i])
      ) {
        paraLines.push(lines[i].trim());
        i++;
      }
      out.push('<p>' + renderInline(paraLines.join(' ')) + '</p>');
    }

    return out.join('\n');
  }

  global.Markdown = { render: render, renderInline: renderInline, escapeHtml: escapeHtml };
})(window);
