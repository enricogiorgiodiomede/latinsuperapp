# Changelog

All notable changes to this project are documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
with simple date-based entries. The app is plain HTML/CSS/vanilla JavaScript with
no build step and no dependencies.

## [0.7.4] - 2026-06-18

### Changed
- Two more Italian fixes from proofreading:
  - Reworded the practice-page footer to "Prova prima a tradurre il latino da solo, poi
    rivela la traduzione e confrontala con la tua versione."
  - In Lucilius's *virtus* fragment, translated the repeated "virtus" in the Italian
    **excerpt translation** to "(la) virtu'" (all six occurrences). The Latin text and the
    analyses, which discuss *virtus* as a term, are left unchanged.
- Cache version bumped v15 → v16.

## [0.7.3] - 2026-06-17

### Changed
- **Italian polish pass** (Italian mode only unless noted):
  - Reworded several interface phrases for naturalness: the practice button
    ("Esercitati a tradurre"), the chooser subtitle/lead/footer, the on-passage
    instruction ("Traduci il testo in latino, poi confronta la tua traduzione con quella
    proposta"), and the locked-era message ("Non disponibile", "Torna in un momento
    successivo"). The locked-era button badge is now "(N.D.)".
  - Italianized character names in the fragment descriptions and analyses where they read
    more naturally: Mostellaria (Grumione, Tranione, Filolachete, Teopropide), Pseudolus
    (Pseudolo, Calidoro), and the Novius/Pomponius stock clown (Macco). Latin excerpts,
    English text, and Latin play titles/quotations (e.g. *Maccus Exul*, *periit Tranio*)
    are left unchanged.
  - Italianized the Plautus comedy titles **Amphitruo → Anfitrione**, **Pseudolus →
    Pseudolo** and **Menaechmi → Menecmi** in Italian mode only (the Main Works list and
    the chooser buttons; "Miles Gloriosus" is kept). English is unchanged.
  - Fixed the Italian Cato title to "Perché l'agricoltura batte il commercio e l'usura"
    (added the missing articles).
- Compacted **Heauton Timorumenos → Heautontimorumenos** (Terence) everywhere, in **both**
  languages: the Main Works lists, the chooser/counter, the citation, and the description.
- Cache version bumped v14 → v15; regenerated js/content.js and js/content-it.js.

## [0.7.2] - 2026-06-17

### Added
- In Italian mode the practice-fragment **citations** are now localized too: the structural
  words translate (Act -> Atto, Scene -> Scena, Prologue -> Prologo, Book(s) -> Libro/Libri,
  fragment -> frammento, "in Cicero/Gellius" -> "in Cicerone/Gellio", "and" -> "e"), and the
  scene number is shown as a Roman numeral to match the act (e.g. `(Aulularia, Act I, Scene 1,
  vv. 40-51)` -> `(Aulularia, Atto I, Scena I, vv. 40-51)`). Latin work titles and scholarly
  tags (`fr.`, `vv.`, `Krenkel`, `Ribbeck`, `Praefatio`) are left untouched. Done as a
  render-time transform in `js/practice.js`. Cache bumped v13 -> v14.

## [0.7.1] - 2026-06-17

### Added
- **Completed the Italian translation** (the follow-up promised in 0.7.0):
  - **Author names** now switch to their Italian forms in Italian mode (Livio Andronico,
    Gneo Nevio, Tito Maccio Plauto, Cecilio Stazio, Publio Terenzio Afro - Terenzio,
    Marco Pacuvio e Lucio Accio, Pomponio Bononiense e Quinto Novio, ...), everywhere they
    appear (author grid, detail pages, breadcrumbs, page titles, practice pages).
  - **Every practice fragment** now carries Italian `titleIt` / `descriptionIt` /
    `analysisIt` (all 23 fragments), shown in Italian mode; `practice.js` falls back to the
    English field if a variant is missing. The Latin excerpts and the existing Italian/English
    self-check reveals are unchanged.

### Changed
- In Italian mode the author dates render **"a.C."** (avanti Cristo) instead of "BC"
  (and "d.C." for "AD"), via a small transform in `js/data.js`.
- Cache version bumped v12 -> v13.

## [0.7.0] - 2026-06-17

### Added
- **English/Italian language toggle.** A flag control now sits in the top-right of the red
  header (inline-SVG flags - a Union Flag for English, the tricolore for Italian - because
  regional-indicator emoji do not render as flags on Windows). Clicking a flag persists the
  choice in `localStorage` and reloads the page in that language. The whole interface switches:
  header title/subtitle, era menu and era names, breadcrumbs, buttons, the practice page
  (instruction, counter, the Show/Hide Italian·English·analysis reveal labels - **both reveals
  are kept** in either language - and "Next fragment"), the comedy/text chooser, error and
  empty states, and the difficulty vocabulary (criteria, levels, and the evaluation badges,
  e.g. `START PRAYING, BOY` becomes `INIZIA A PREGARE, RAGAZZO`).
- The author **biography, main works, and style** sections and the **era introduction** also
  switch to Italian, reusing the prose already in `italian_translations_archaic.md`.
- New `js/i18n.js` (`window.I18n`): the full English/Italian string dictionary, the persisted
  language state, a `t()` lookup with English fallback, and the flag toggle.
- New `js/content-it.js` (generated by `build_content_it.js` from the Italian working file):
  the Italian biography/works/style + era intro, keyed by the same author slugs.

### Changed
- `js/data.js` now serves localized era names and, in Italian, overlays the Italian
  biography/works/style and era intro. It scrubs ranking language from the Italian prose the
  same way it already does for English (a new `scrubRankingIt` keyed on the Italian markers -
  uppercase ALTO/MEDIO/BASSO callouts, "Livello S/A/B/C", "NC", "Non Comparabile") so the tier
  scoring stays hidden in both languages.
- The user-facing strings in `menu.js`, `home.js`, `author.js`, `practice.js`, `select.js`,
  `chart.js`, and `ratings.js` (criteria/level/evaluation labels) now come from `I18n.t(...)`;
  the 4 HTML pages carry `data-i18n` attributes for their static text. The Latin excerpts are
  never translated. Cache version bumped v10 -> v11.

## [0.6.3] - 2026-06-16

### Fixed
- Proofreading corrections to the **Aulularia** practice fragments (re-verified against The
  Latin Library):
  - Fragment 1 (Act I, Sc. 1): v.48 `stimulum in manu` corrected to `stimulum in manum`.
  - Fragment 3 (the "Perii! interii!" meltdown): the citation was numbered one verse too high
    (the passage is vv. 713-720, not 714-717), and v.715 `obsecro ego vos` is corrected to the
    transmitted word order `obsecro vos ego`.

### Changed
- Extended the **Aulularia** "Perii! interii!" fragment from vv. 713-716 to **vv. 713-720**,
  carrying Euclio's breakdown through to its end: he breaks the fourth wall, rounds on the
  spectators ("quid ridetis?"), and accuses the well-dressed members of the audience of being
  the thieves who took his gold. The Italian, English, description, and analysis were extended
  to match.

## [0.6.2] - 2026-06-16

### Added
- **Aulularia** added to the Plautus chooser with 3 fragments drawn from different acts:
  Euclio driving out the slave Staphyla (Act I), Megadorus's "rich men should wed poor brides"
  speech (Act III), and the famous "Perii! interii!" miser's meltdown that Molière reworked for
  Harpagon (Act IV). Verbatim Latin verified against The Latin Library, with original IT + EN,
  short tailored analyses, Act/Scene citations, and source.

## [0.6.1] - 2026-06-16

### Changed
- The "Try another fragment" button is now **"Next fragment →"** and steps through a text's
  fragments **in order** (1/N → 2/N → … → wrap), instead of jumping at random.
- Every comedy fragment citation now uses the format **"[Comedy], Act N, Scene N, vv. start-end"**
  (the Prologue is the one exception). Fixed the Mostellaria fragments and standardised Pseudolus.
- Reworked the **Amphitruo** set to spread across the play: the *tragicomoedia* (Prologue), the
  Mercury-as-Sosia identity dispute (Act I), Alcmena's "my dowry is my virtue" (Act II), and
  Bromia's report of the infant Hercules and the serpents (Act V) - replacing the earlier
  beginning-heavy passages.

## [0.6.0] - 2026-06-16

### Added
- First batch of new practice fragments: Plautus's **Mostellaria** (3) and **Amphitruo** (3),
  each with original Italian + English, a short analysis tailored to the passage, and a title,
  citation, and source. Difficulty is varied within each comedy (e.g. the colloquial door-quarrel
  vs. the harder house-metaphor monologue in Mostellaria; the long periodic prologue sentence vs.
  the snappier passages in Amphitruo). The comedy-selection page now lists Pseudolus, Mostellaria,
  and Amphitruo.
- New `practice_fragments_reference.md` - a working record of every selected passage (source URL,
  line references, notes) to guide selection and future expansion.

## [0.5.2] - 2026-06-16

### Fixed
- Added cache-busting `?v=` query strings to all JS/CSS includes so a freshly loaded page
  never runs a stale, mismatched script. This resolves the transient "ExcerptMeta is not
  defined" error that could appear from a browser tab cached before `excerpts-meta.js` was
  retired (no live code references it).

## [0.5.1] - 2026-06-16

### Added
- Each practice fragment now records a **`source`** field in `js/fragments.js` (the
  website/edition the Latin was taken from), shown on the practice page as a small
  "Latin text from …" attribution line. Backfilled for the existing fragments and required
  for every new one.

## [0.5.0] - 2026-06-16

Reworked the practice page into a fragment trainer (system; content batches follow).

### Added
- The practice page now shows **one fragment at a time** with a **"Try another fragment"**
  button that pulls a different random fragment from the same text (no immediate repeats) and a
  "fragment N of M" counter.
- A new **comedy/text selection page** (`practice-select.html`): authors with several works
  (Plautus, Terence, Caecilius) route through it first, picking a text via **deep-red buttons**
  (the header hue) before practising; everyone else goes straight to practice.
- New **`js/fragments.js`** practice bank (`window.PracticeBank`) - the single source for
  practice fragments, grouped by author and work. The existing ~13 fragments were migrated in.

### Changed
- `js/practice.js` reads from the bank (with an optional `?work=` scope) instead of the draft +
  `excerpts-meta.js`. Retired `js/excerpts-meta.js` (its data moved into the bank).
- The author detail "Practice translation" button routes to the selection page for
  multi-work authors.

## [0.4.2] - 2026-06-16

### Added
- Expanded the Plautus biography with a paragraph on the **Saturnalia**, framing Plautine
  comedy and the *servus callidus* as a licensed, temporary inversion of the Roman social
  order. Added to `archaic_era_draft.md` and `italian_translations_archaic.md`; the embedded
  markdown copy (`js/content.js`) was regenerated.

## [0.4.1] - 2026-06-16

### Added
- A second practice excerpt for Gnaeus Naevius: the *Bellum Poenicum* fragment (Book I,
  fr. 8) on the Trojan wives leaving Troy by night, shown before the existing self-epitaph.
  The Latin, Italian, English, and analysis were added to `archaic_era_draft.md` and
  `italian_translations_archaic.md`; its title / citation / context were added to
  `js/excerpts-meta.js`, and the embedded markdown copy (`js/content.js`) was regenerated.

## [0.4.0] - 2026-06-16

Began revamping the translation practice page.

### Added
- Each excerpt on the practice page now opens with context shown before the Latin:
  - an authored **title** summarizing the passage,
  - a **citation** in the form `(Work, location, verses/fragments)` — e.g.
    `(Pseudolus, Act I, scene 1, vv. 22-36)`; fragmentary works that survive only
    through a later author cite that preserving source,
  - a short **"This paragraph/fragment is about…"** blurb on what the passage is about.
- New `js/excerpts-meta.js` holding this per-excerpt metadata (title / citation /
  description) for all 12 Archaic excerpts, keyed by author slug and excerpt order.

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
