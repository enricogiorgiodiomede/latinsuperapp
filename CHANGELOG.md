# Changelog

All notable changes to this project are documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
with simple date-based entries. The app is plain HTML/CSS/vanilla JavaScript with
no build step and no dependencies.

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
