/*
 * chart.js - renders the per-author criteria bar chart as inline SVG.
 *
 *   Chart.renderCriteria(container, ratings)
 *
 * Four bars (Lexicon, Syntax, Style, Density). The y-axis is labelled with the
 * four difficulty levels (Straightforward / Manageable / Challenging / Complex),
 * equally spaced; bars may sit slightly above or below a level line. Each bar is
 * coloured by the band it reaches (green / yellow / orange / red).
 */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  // Geometry (viewBox units).
  var W = 540, H = 300;
  var M = { top: 24, right: 18, bottom: 48, left: 124 };
  var plotLeft = M.left, plotRight = W - M.right;
  var plotTop = M.top, plotBottom = H - M.bottom;
  var BOT_VAL = 0.5, TOP_VAL = 4.5; // headroom above/below the labelled levels

  function yFor(value) {
    var frac = (value - BOT_VAL) / (TOP_VAL - BOT_VAL);
    return plotBottom - frac * (plotBottom - plotTop);
  }

  function el(name, attrs, text) {
    var node = document.createElementNS(NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (text != null) node.textContent = text;
    return node;
  }

  function renderCriteria(container, ratings) {
    container.innerHTML = '';
    var levels = Ratings.DIFFICULTY_LEVELS;
    var criteria = Ratings.CRITERIA;

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      class: 'criteria-chart',
      role: 'img',
      'aria-label': 'Difficulty by criterion: lexicon, syntax, style, density'
    });

    // Horizontal gridlines + y-axis difficulty labels.
    levels.forEach(function (lvl) {
      var y = yFor(lvl.level);
      svg.appendChild(el('line', {
        x1: plotLeft, y1: y, x2: plotRight, y2: y,
        class: 'chart-gridline'
      }));
      svg.appendChild(el('text', {
        x: plotLeft - 12, y: y + 4,
        class: 'chart-ylabel', 'text-anchor': 'end'
      }, lvl.label));
      // a small colour swatch by each level label
      svg.appendChild(el('rect', {
        x: plotLeft - 8, y: y - 4, width: 6, height: 8, rx: 1,
        fill: lvl.color, class: 'chart-swatch'
      }));
    });

    // Baseline axis.
    svg.appendChild(el('line', {
      x1: plotLeft, y1: plotBottom, x2: plotRight, y2: plotBottom,
      class: 'chart-axis'
    }));

    // Bars.
    var slot = (plotRight - plotLeft) / criteria.length;
    var barW = slot * 0.46;
    criteria.forEach(function (crit, i) {
      var value = ratings[crit.key];
      if (typeof value !== 'number') return;
      var cx = plotLeft + slot * (i + 0.5);
      var x = cx - barW / 2;
      var yTop = yFor(value);
      var color = Ratings.bandColor(value);

      var g = el('g', { class: 'chart-bar' });
      g.appendChild(el('title', {}, crit.label + ': ' + crit.blurb));
      g.appendChild(el('rect', {
        x: x, y: yTop, width: barW, height: Math.max(0, plotBottom - yTop),
        rx: 4, fill: color, class: 'chart-bar-rect'
      }));
      // Criterion label under the bar.
      g.appendChild(el('text', {
        x: cx, y: plotBottom + 22,
        class: 'chart-xlabel', 'text-anchor': 'middle'
      }, crit.label));
      svg.appendChild(g);
    });

    container.appendChild(svg);
  }

  global.Chart = { renderCriteria: renderCriteria };
})(window);
