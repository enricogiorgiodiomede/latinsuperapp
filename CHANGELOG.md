# Changelog

All notable changes to this project are documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
with simple date-based entries. The app is plain HTML/CSS/vanilla JavaScript with
no build step and no dependencies.

## [0.3.2] - 2026-06-16

### Added
- A note on fragmentary authors' detail pages explaining that, beyond their small
  quantity, the surviving fragments are often cut off from their original context,
  which can make passages harder to understand than the difficulty bars suggest (for
  Lucilius, with the example of his lines on Lentulus's gluttony).

### Changed
- Marked Lucilius as fragmentary (it survives only in fragments) while keeping its
  **Very Difficult** evaluation. Introduced a separate `scaledDown` flag so the "scaled
  to the sparse surviving fragments" badge note only appears on authors whose rating was
  actually lowered for sparsity, not on Lucilius.

## [0.3.1] - 2026-06-16

Recalibrated difficulty for fragmentary authors.

### Changed
- Lowered the overall evaluation of the fragmentary authors, since translating a
  handful of short, isolated fragments is a far smaller task than translating a
  complete continuous text:
  - Livius Andronicus, Gnaeus Naevius, Quintus Ennius, and Pacuvius & Accius: now
    **Manageable** (were Very Difficult / Difficult).
  - Pomponius & Novius: now **Good Exercise** (was Difficult).
  - Caecilius Statius: lowered only to **Difficult** (was Very Difficult), thanks to
    the one long continuous fragment from the *Plocium*.
- Scaled each lowered author's criteria bars down to match the new evaluation.
- Marked Naevius and Ennius as fragmentary (they were flagged as complete-text), so
  their evaluation now carries the "scaled to the sparse surviving fragments" note.
- Kept Lucilius at **Very Difficult**: his satire also survives only in fragments, but
  the surviving body is comparatively large and the Latin stays genuinely hard (the
  *Virtus* excerpt is one of the easier passages).

## [0.3.0] - 2026-06-16

Repurposed the site from a tier-list reflection into a tool for exploring authors
and practising translation.

### Added
- **Per-criterion difficulty bar chart** on each author page (`js/chart.js`, inline
  SVG): four bars - Lexicon, Syntax, Style, Density - against equally spaced difficulty
  levels (Straightforward / Manageable / Challenging / Complex). Bars are coloured by the
  level they reach (green / yellow / orange / red) and may sit slightly above or below a
  level line.
- **Overall evaluation** badge derived from the criteria, replacing the tier badge. It
  mirrors the old tiers but reframed, with the maximum renamed to "START PRAYING, BOY".
  Fragmentary authors now get the difficulty of translating their surviving fragments
  instead of a "Not Comparable" verdict (noted on the badge).
- **`js/ratings.js`**: per-author difficulty data, the four-criteria definitions, the
  difficulty levels, and the evaluation scale.

### Changed
- Renamed the site to **"Latin Authors: Explore & Translate"** (title, header, page
  titles) and updated the home subtitle to match the new purpose.
- Author pages now show a "Difficulty profile" section (chart + a short criteria legend)
  in place of the tier badge and the "Why this tier" section.

### Removed
- All tier-list ranking from the app: the tier badge, the tier rationale section, and the
  tier parsing in `js/data.js`.
- Tier / ranking language is now stripped from displayed prose at render time (a scrubber
  in `js/data.js`): inline "**Lexicon: HIGH**"-style scoring callouts and any sentence
  mentioning a tier, an NC / "Not Comparable" verdict, or an uppercase HIGH/MEDIUM/LOW
  score. The source `archaic_era_draft.md` is never modified.

## [0.2.0] - 2026-06-14

Navigation pass: make the app browsable from anywhere, not just the home page.

### Added
- **Persistent era menu** in the header on every page (home, author detail, practice),
  extracted into a shared `js/menu.js` module so all pages reuse the same buttons.
- **Sticky header**: the whole header stays pinned to the top of the viewport while
  scrolling, so the era navigation is always reachable.
- **Breadcrumbs** on the inner pages, via a new `UI.renderBreadcrumb()` helper in `js/ui.js`:
  - Author detail: `Home / <Era> / <Author>`.
  - Practice: `Home / <Era> / <Author> / Practice` (the author segment links back to the
    detail page).
- **Deep-linkable eras**: the home page now reads `?era=<id>` from the URL, so clicking an
  era from any inner page opens that era's listing on the home page.

### Changed
- Moved the era-button rendering out of `js/home.js` into the shared `js/menu.js`.
- Combined-author detail pages now show both authors' dates
  (e.g. `c. 220-130 BC · 170-86 BC`) instead of only the first.
- The author detail tier section ("Why this tier") no longer repeats the tier line that is
  already shown in the badge.
- Author/work display names render a single dash instead of `--`.
- On narrow screens the header subtitle is hidden and padding trimmed so the pinned bar
  stays compact.

## [0.1.0] - 2026-06-14

Initial build of the Latin Authors Tier List web app.

### Added
- **Home page** (`index.html`): a five-era menu bar, an expandable era-description panel
  (Archaic open by default; the other four eras show "Coming soon"), and a responsive
  author-card grid populated from `archaic_era_draft.md`, preserving the file's order.
- **Author detail page** (`author.html`): portrait(s), Biography, Main Works, Style and
  Difficulty, a colored tier badge (S / A / B / C / D / NC), and a "Practice translation"
  button.
- **Translation practice page** (`practice.html`): the Latin excerpt shown prominently, a
  textarea to attempt a translation (no grading), and hidden-by-default
  "Show Italian / Show English / Show analysis" reveal toggles.
- **`js/data.js`**: loads and parses `archaic_era_draft.md` at runtime and exposes an
  era/author API. Handles combined entries (two authors → two portraits and two excerpts),
  varying section headings, stripping of embedded image/caption lines, and tier extraction.
- **`js/markdown.js`**: a compact Markdown-to-HTML renderer (headings, paragraphs,
  bold/italic, bullet lists, block quotes).
- **`js/ui.js`**: shared DOM helpers, including portrait rendering with a styled initials
  placeholder fallback (so a missing image never shows a broken icon) and query-string parsing.
- **Image lookup**: maps each author slug to the real portrait filename(s) in `images/`
  (handling the `.jpg`/`.jpeg` mix and the two combined entries with two portraits each).
- **`js/content.js`** (generated): an embedded copy of the markdown so the app works when
  opened directly via `file://` (where `fetch` is blocked). When served over http, the app
  fetches the live `archaic_era_draft.md` instead, keeping it the single source of truth.
- **Styling** (`css/styles.css`): a restrained ancient-Rome palette (warm stone, terracotta,
  deep red, muted gold) with a serif for Latin excerpts and a fully responsive layout.
- **`README.md`**: how to run the app (double-click, or serve with `python -m http.server`)
  and how `js/content.js` is regenerated.

### Notes
- Only the **Archaic Era** has content so far; the other four eras are placeholders.
- The app reads `archaic_era_draft.md` as the single source of truth and does not hardcode
  author content.
