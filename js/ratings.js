/*
 * ratings.js - per-author difficulty data for the criteria bar chart and the
 * overall evaluation. These are app-specific assessments (not parsed from the
 * markdown). Values are on a 1-4 scale matching the four difficulty levels:
 *
 *   1 = Straightforward   2 = Manageable   3 = Challenging   4 = Complex
 *
 * Fractional values are intentional: bars sit a little above/below the level
 * lines rather than snapping to them. Authored with the latin-tier-list rubric
 * (Lexicon, Syntax, Style, Density) and mirroring the project's existing tiers;
 * fragmentary authors get the difficulty of translating their surviving
 * fragments rather than a "not comparable" note.
 */
(function (global) {
  'use strict';

  // The four y-axis difficulty levels, low to high, with their band colours.
  var DIFFICULTY_LEVELS = [
    { level: 1, label: 'Straightforward', color: '#5f8a3a' }, // green
    { level: 2, label: 'Manageable',      color: '#d6a328' }, // yellow
    { level: 3, label: 'Challenging',     color: '#cf6a2a' }, // orange
    { level: 4, label: 'Complex',         color: '#b22f2a' }  // red
  ];

  // The four bar criteria, in display order, with short explanations.
  var CRITERIA = [
    { key: 'lexicon', label: 'Lexicon', blurb: 'Vocabulary load: archaic, rare or hapax forms, technical terms.' },
    { key: 'syntax',  label: 'Syntax',  blurb: 'Sentence structure: concinnitas, brevitas, word order. Poetry is usually harder.' },
    { key: 'style',   label: 'Style',   blurb: 'Figures of speech and rhetorical texture.' },
    { key: 'density', label: 'Density', blurb: 'How packed the meaning is (e.g. philosophy, or Virgilian compression).' }
  ];

  // Overall evaluation scale. Mirrors the old tiers (S/A/B/C/D) but reframed,
  // with the maximum renamed. Colours align with the bar bands.
  var EVALUATIONS = {
    'praying':        { label: 'START PRAYING, BOY', color: '#6e1414', rank: 5 }, // was S
    'very-difficult': { label: 'Very Difficult',     color: '#b22f2a', rank: 4 }, // was A
    'difficult':      { label: 'Difficult',          color: '#cf6a2a', rank: 3 }, // was B
    'manageable':     { label: 'Manageable',         color: '#d6a328', rank: 2 }, // was C
    'good-exercise':  { label: 'Good Exercise',      color: '#5f8a3a', rank: 1 }  // was D
  };

  // Per-author ratings, keyed by the same slugs the rest of the app uses.
  var AUTHOR_RATINGS = {
    'livius-andronicus': {
      lexicon: 3.7, syntax: 2.9, style: 2.6, density: 2.7,
      evaluation: 'very-difficult', fragments: true
    },
    'gnaeus-naevius': {
      lexicon: 3.1, syntax: 2.8, style: 2.6, density: 2.7,
      evaluation: 'difficult', fragments: false
    },
    'quintus-ennius': {
      lexicon: 3.3, syntax: 3.1, style: 3.0, density: 3.0,
      evaluation: 'difficult', fragments: false
    },
    'titus-maccius-plautus': {
      lexicon: 3.8, syntax: 2.3, style: 3.4, density: 2.1,
      evaluation: 'very-difficult', fragments: false
    },
    'marcus-porcius-cato': {
      lexicon: 2.3, syntax: 1.6, style: 1.4, density: 1.6,
      evaluation: 'manageable', fragments: false
    },
    'caecilius-statius': {
      lexicon: 3.4, syntax: 2.5, style: 2.8, density: 2.3,
      evaluation: 'very-difficult', fragments: true
    },
    'publius-terentius-afer': {
      lexicon: 2.4, syntax: 2.5, style: 2.7, density: 2.8,
      evaluation: 'difficult', fragments: false
    },
    'marcus-pacuvius-and-lucius-accius': {
      lexicon: 3.6, syntax: 3.3, style: 3.4, density: 3.3,
      evaluation: 'very-difficult', fragments: true
    },
    'gaius-lucilius': {
      lexicon: 3.5, syntax: 2.9, style: 3.1, density: 3.2,
      evaluation: 'very-difficult', fragments: false
    },
    'pomponius-bononiensis-and-quintus-novius': {
      lexicon: 3.2, syntax: 2.1, style: 2.2, density: 1.9,
      evaluation: 'difficult', fragments: true
    }
  };

  // Colour for a value, by the difficulty band it reaches (nearest level).
  function bandColor(value) {
    if (value < 1.5) return DIFFICULTY_LEVELS[0].color;
    if (value < 2.5) return DIFFICULTY_LEVELS[1].color;
    if (value < 3.5) return DIFFICULTY_LEVELS[2].color;
    return DIFFICULTY_LEVELS[3].color;
  }

  global.Ratings = {
    DIFFICULTY_LEVELS: DIFFICULTY_LEVELS,
    CRITERIA: CRITERIA,
    EVALUATIONS: EVALUATIONS,
    bandColor: bandColor,
    forAuthor: function (slug) { return AUTHOR_RATINGS[slug] || null; },
    evaluation: function (key) { return EVALUATIONS[key] || null; }
  };
})(window);
