# PROGRESS - session handoff

A snapshot for continuing in a future session. For full chronological history see
`CHANGELOG.md` and `daily_log.md`; for the practice-passage selections see
`practice_fragments_reference.md`.

Repo: `github.com/enricogiorgiodiomede/latinsuperapp` (branch `main`).

---

## What the project is

A static, **no-build web app** (plain HTML/CSS/vanilla JS, no frameworks) for exploring Roman
(Latin) authors and practising translation. Only the **Archaic Era** has content so far.

Pages:
- `index.html` - home: 5-era menu (only Archaic live), era intro panel, author grid.
- `author.html` - author detail: portrait(s), biography, main works, style, a **per-criterion
  difficulty bar chart** + an **overall evaluation** badge, and a "Practice translation" button.
- `practice.html` - practice: **one fragment at a time** + a **"Next fragment ->"** button.
- `practice-select.html` - comedy/text chooser (only for Plautus, Terence, Caecilius).

**Languages:** a **flag toggle** in the red header switches the whole interface EN<->IT
(persisted in `localStorage`, applied on reload; Latin excerpts never translated). Author
biography/works/style + era intro switch too (from `italian_translations_archaic.md`). Author
**names** switch to Italian forms and dates show **"a.C."** (data.js `AUTHOR_NAMES_IT` +
`localizeDates`). Every practice fragment now also has `titleIt`/`descriptionIt`/`analysisIt`
in `js/fragments.js` (shown in IT mode; practice.js falls back to English). The full Italian
translation pass is **DONE**.

## Architecture / where things live

- `js/data.js` - loads + parses `archaic_era_draft.md` (fetch over http, embedded fallback
  `js/content.js` for `file://`); **scrubs tier/ranking language** from displayed prose; exposes
  `LatinData` (eras, authors, bio/works/style).
- `js/content.js` - GENERATED embedded copy of the draft (regenerate when the draft changes; see
  README for the node one-liner).
- `js/ratings.js` - per-author difficulty data (4 criteria + overall evaluation). `js/chart.js` -
  the SVG bar chart.
- **`js/fragments.js` - THE PRACTICE FRAGMENT BANK (`window.PracticeBank`). Single source for
  practice content. This is the active work area.**
- `js/markdown.js`, `js/ui.js` (DOM helpers + breadcrumb), `js/menu.js` (era menu), `js/home.js`,
  `js/author.js`, `js/practice.js`, `js/select.js`. `css/styles.css` - all styles.
- **`js/i18n.js` (`window.I18n`) - the EN/IT string dictionary, persisted language state, `t()`
  lookup (English fallback), and the header flag toggle. Every module pulls user-facing strings
  from `I18n.t(...)`; the HTML pages tag static text with `data-i18n`.** `js/content-it.js` -
  GENERATED Italian biography/works/style + era intro (run `node build_content_it.js` to
  regenerate from the Italian working file; `data.js` overlays + scrubs it via `scrubRankingIt`
  when lang=it).
- `archaic_era_draft.md` - the long-form reference doc (the user edits this to add prose/excerpts
  and asks me to wire it up; don't reformat it unprompted). `italian_translations_archaic.md` -
  the user's Italian working file. `practice_fragments_reference.md` - record of selected
  practice passages (source, line refs, proofread status).

## Conventions / decisions - FOLLOW THESE

1. **Commit + push every change immediately** (don't wait to be asked). Date `CHANGELOG.md` by the
   REAL day (check `git log`). `daily_log.md` is auto-updated nightly by the `daily-log-updater`
   scheduled task (~23:51 local).
2. **Cache-busting**: every JS/CSS include in the 4 HTML files carries `?v=N`. **Bump N**
   (`sed -i 's/?v=OLD/?v=NEW/g' index.html author.html practice.html practice-select.html`)
   whenever you change a JS/CSS file. **Currently `v=27`.**
3. **Practice fragment bank** (`js/fragments.js`), `PracticeBank.authors[slug]`:
   `{ needsSelection, selectHeading, works: [ { id, label, fragments: [...] } ] }`.
   Each fragment: `{ title, citation, source, description, latin, italian, english, analysis }`.
   - `latin`/`italian`/`english` are `>`-prefixed (render as blockquotes); `analysis` is plain prose.
   - **`source`** = the website/edition the Latin came from (REQUIRED on every fragment; shown as
     "Latin text from ...").
   - To add fragments, write a tiny Node build script (window-shim + `eval` the file, push
     works/fragments, re-emit header + `JSON.stringify(authors)` + the API block), run it, delete
     it. Examples in git history: `add_plautus.js`, `rework_amphitruo.js`, `add_aulularia.js`.
4. **Practice UX**: one fragment at a time; "Next fragment ->" steps **sequentially** (1/N -> 2/N
   -> wrap). Order fragments within a work chronologically (by line number). `needsSelection`
   authors route through `practice-select.html` first; works with 0 fragments are hidden there.
5. **Citations**: comedy fragments use **"(Comedy, Act N, Scene N, vv. start-end)"** (the Prologue
   is the one exception). `citation` is the scholarly reference; `source` is where the text was got.
6. **User's content guidance**:
   - Each comedy's fragments must come from **different parts of the play** (not clustered) and
     include **at least one famous passage** (others famous or lesser-known-but-interesting).
   - **Vary difficulty** within each text (some passages harder).
   - **Analyses short**, tailored to the passage's length and how much hidden meaning it carries.
   - Every fragment: original Italian + English (never copied), analysis, title, citation, source.
7. **Sourcing ("draft + proofread", agreed)**: Latin from The Latin Library
   (`thelatinlibrary.com/plautus/<play>.shtml`; Terence `ter*.shtml`/`ter.html`; Cato; fragmentary
   authors via Attalus / PHI). The WebFetch tool **refuses long continuous quotes** (over-cautious
   copyright guard on public-domain text) but returns short verbatim chunks - fetch 2-3 lines at a
   time and reassemble; cross-check famous lines. Get exact play filenames from
   `thelatinlibrary.com/plautus.html`. **Flag all new Latin for the user's final proofread.**

## Current content state (fragment bank)

| Author (slug) | Works (fragment count) |
|---|---|
| Livius Andronicus | Odusia (1) |
| Gnaeus Naevius | Bellum Poenicum (1) + Epitaph (1) |
| Quintus Ennius | Annales (1) |
| **Plautus** *(needsSelection)* | Pseudolus (3) · Mostellaria (3) · Amphitruo (4) · Aulularia (3) · Miles Gloriosus (3) |
| Cato the Elder | De Agri Cultura (1) |
| **Caecilius Statius** *(needsSelection)* | Plocium (1) [+ empty "Other"] |
| **Terence** *(needsSelection)* | Andria (3) · Hecyra (3) · Heautontimorumenos (3) · Eunuchus (3) |
| Pacuvius & Accius | Niptra (1) + Atreus (1) |
| Gaius Lucilius | Saturae (1) |
| Pomponius & Novius | Fullones (1) + Maccus Exul (1) |

## What remains (the plan)

- **Plautus**: Miles Gloriosus (>=3, across acts) and **Pseudolus +2**. (Mostellaria / Amphitruo /
  Aulularia DONE.)
- **Terence**: all 6 plays x >=3 each - Andria, Hecyra, Heauton Timorumenos (+2), Eunuchus,
  Phormio, Adelphoe. Add the works so the chooser lists them.
- **Caecilius**: split `Plocium` into the 3 passages Gellius quotes (NA II.23); fill `Other` with
  1-2 fragments from his other plays.
- **Fragmentary authors**: Livius +1-2 (Odusia), Naevius +3-4 (Bellum Poenicum), Ennius +3-4
  (Annales), Cato +4-5 (other De Agri Cultura chapters), Pacuvius / Accius / Pomponius / Novius
  +1-2 each.
- Optional: mirror the new practice Italians into `italian_translations_archaic.md` (the bank
  already holds them; the user said the bank is sufficient but may want the mirror).

Per new fragment: verified Latin + source, original IT+EN, short tailored analysis, title,
Act/Scene (or fragment) citation; spread across the work; >=1 famous per comedy; sequential order;
bump the cache version; verify in preview (no console errors); commit + push; update `CHANGELOG.md`
and `practice_fragments_reference.md`.

## How to run / verify

Double-click `index.html` (works via the embedded fallback) or serve the folder
(`python -m http.server 8000`). In dev, the browser may cache stale assets - append `&cb=<rand>`
to the page URL and/or inject cache-busted scripts when verifying. Check there are no console
errors.
