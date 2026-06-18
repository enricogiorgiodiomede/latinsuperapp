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
in `js/fragments.js` (shown in IT mode; practice.js falls back to English). Citations localize
at render time (`Act/Scene`->`Atto/Scena`, Roman numerals, `Prologue`->`Prologo`). All Italian
uses **proper accents** (the apostrophe-style `e'`/`piu'`/`virtu'` was normalized this session;
`build_content_it.js` does it for author prose, fragment IT fields are authored with accents).
The full Italian translation pass is **DONE**.

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
   whenever you change a JS/CSS file. **Currently `v=29`.**
3. **Practice fragment bank** (`js/fragments.js`), `PracticeBank.authors[slug]`:
   `{ needsSelection, selectHeading, works: [ { id, label, labelIt?, fragments: [...] } ] }`.
   Each fragment: `{ title, citation, source, description, latin, italian, english, analysis,
   titleIt, descriptionIt, analysisIt }`. **The site is now bilingual: every new fragment MUST
   carry titleIt/descriptionIt/analysisIt** (proper accents è/à/ù/é/ò, never apostrophe-style;
   Italianize character names in the IT prose only - e.g. Davo, Cremete, Gnatone, Formione - and
   keep Latin excerpts + English + the speaker labels untouched).
   - `latin`/`italian`/`english` are `>`-prefixed (render as blockquotes); `analysis`/`*It` plain prose.
   - **`source`** = the website/edition the Latin came from (REQUIRED on every fragment).
   - `labelIt` (optional, per work) = Italian chooser/counter label; only set when the title is
     Italianized (Plautus: Amphitruo->Anfitrione, Pseudolus->Pseudolo). Latin play titles stay as
     `label` for both languages. Short IT chooser names (Plauto/Terenzio) live in `select.js`'s
     `IT_SHORT` map.
   - **Citations localize automatically**: `practice.js` `localizeCitation()` turns
     `Act N, Scene N` into `Atto N, Scena <Roman>` and Prologue->Prologo in IT mode. Keep the play
     title Latin in the citation. Write citations in English; do NOT pre-translate them.
   - To add fragments, write a tiny Node build script (window-shim + `eval` the file, push
     works/fragments, re-emit `before + 'var AUTHORS = ' + JSON.stringify(authors,null,2)... + after`),
     run it, delete it. Recent examples in git history: `add_miles.js`, `add_andria.js`,
     `add_phormio.js`. For multi-work authors, **reorder works chronologically** after pushing:
     `ter.works.sort((a,b)=>ORDER.indexOf(a.id)-ORDER.indexOf(b.id))`.
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
   (`thelatinlibrary.com/plautus/<play>.shtml`; Terence `ter.<play>.html`; Cato; fragmentary
   authors via Attalus / PHI). **Best method (used for Miles/Pseudolus/Terence): `curl` the whole
   play page**, then `sed`-strip the HTML tags and `&nbsp;`/`&amp;`/`&#151;` entities, then `grep`
   for the famous line and read the surrounding lines. Most pages carry line numbers (every ~5
   lines) and act/scene markers; a few don't (Phormio uses `{Sp.}` speaker braces and no act
   markers; **Adelphoe `ter.adel.html` has NO line numbers and no inline act/scene markers** - use
   canonical numbering and flag for proofread). Normalize editorial marks (`<...>` supplements,
   `(h)`/`(e)` optional letters) into clean text; keep TLL orthography (archaic spellings, elision
   apostrophes like `eiu'`, `Davo'`). **Flag all new Latin for the user's final proofread.**
   (WebFetch also works but refuses long continuous quotes; curl is far easier.)

## Current content state (fragment bank)

| Author (slug) | Works (fragment count) |
|---|---|
| Livius Andronicus | Odusia (1) |
| Gnaeus Naevius | Bellum Poenicum (1) + Epitaph (1) |
| Quintus Ennius | Annales (1) |
| **Plautus** *(needsSelection)* | Pseudolus (3) · Mostellaria (3) · Amphitruo (4) · Aulularia (3) · Miles Gloriosus (3) |
| Cato the Elder | De Agri Cultura (1) |
| **Caecilius Statius** *(needsSelection)* | Plocium (1) [+ empty "Other"] |
| **Terence** *(needsSelection)* | Andria (3) · Hecyra (3) · Heautontimorumenos (3) · Eunuchus (3) · Phormio (3) · Adelphoe (3) |
| Pacuvius & Accius | Niptra (1) + Atreus (1) |
| Gaius Lucilius | Saturae (1) |
| Pomponius & Novius | Fullones (1) + Maccus Exul (1) |

## What remains (the plan)

- **Plautus**: DONE (Pseudolus 3 + Mostellaria 3 + Amphitruo 4 + Aulularia 3 + Miles Gloriosus 3).
- **Terence** (agreed: 3 fragments per comedy, 6 plays): **DONE - all 6 of 6** - Andria, Hecyra,
  Heautontimorumenos, Eunuchus, Phormio, Adelphoe (3 each). The user said they'll decide later
  whether to add more than 3 per play.
- **Caecilius**: split `Plocium` into the 3 passages Gellius quotes (NA II.23); fill `Other` with
  1-2 fragments from his other plays.
- **Fragmentary authors**: Livius +1-2 (Odusia), Naevius +3-4 (Bellum Poenicum), Ennius +3-4
  (Annales), Cato +4-5 (other De Agri Cultura chapters), Pacuvius / Accius / Pomponius / Novius
  +1-2 each.
- Optional: mirror the new practice Italians into `italian_translations_archaic.md`.

Per new fragment: verified Latin + source, original IT+EN + IT metadata (titleIt/descriptionIt/
analysisIt, proper accents), short tailored analysis, title, citation; spread across the work;
>=1 famous per comedy; chronological order; bump cache; verify in preview (no console errors);
commit + push; update `CHANGELOG.md`, `practice_fragments_reference.md`, and this file (table +
cache `v=`).

### >>> RESUME HERE: Caecilius split + fragmentary authors <<<

Terence is **DONE** (all 6 comedies, 3 fragments each). The remaining content work, in priority order:

1. **Caecilius** (`needsSelection`): currently `Plocium (1)` + an empty `Other`. Split the migrated
   *Plocium* monologue into the **3 separate passages Gellius quotes side by side** (Noctes Atticae
   II.23, comparing Caecilius's *Plocium* with Menander's original); then fill the `Other` work with
   1-2 fragments from his other plays (titles survive via Ribbeck; pull Latin from PHI / Ribbeck like
   Pomponius/Novius were). Empty works are hidden in the chooser, so `Other` must get >=1 fragment or
   be removed.
2. **Fragmentary authors** (single-work, non-needsSelection): Livius +1-2 (Odusia), Naevius +3-4
   (Bellum Poenicum), Ennius +3-4 (Annales), Cato +4-5 (other De Agri Cultura chapters),
   Pacuvius / Accius / Pomponius / Novius +1-2 each. Latin from TLL for Cato; PHI / Ribbeck for the
   verse fragmentists (see the Pomponius/Novius entries for the source-note format used when neither
   TLL nor Splash has a page).

Per-fragment checklist is unchanged (see "What remains" above): verified Latin + source, original
IT+EN, IT metadata (titleIt/descriptionIt/analysisIt, proper accents), short tailored analysis,
title, citation; vary difficulty; >=1 famous passage per comedy; chronological order; bump cache;
verify in preview; commit + push; update CHANGELOG + reference sheet + this file.

## How to run / verify

Double-click `index.html` (works via the embedded fallback) or serve the folder
(`python -m http.server 8000`). In dev, the browser may cache stale assets - append `&cb=<rand>`
to the page URL and/or inject cache-busted scripts when verifying. Check there are no console
errors.
