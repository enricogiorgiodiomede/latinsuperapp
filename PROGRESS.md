# PROGRESS - session handoff

A snapshot for continuing in a future session. For full chronological history see
`CHANGELOG.md` and `daily_log.md`; for the practice-passage selections see
`practice_fragments_reference.md`.

Repo: `github.com/enricogiorgiodiomede/latinsuperapp` (branch `main`).

---

## What the project is

A static, **no-build web app** (plain HTML/CSS/vanilla JS, no frameworks) for exploring Roman
(Latin) authors and practising translation. The **Archaic Era** and **Caesar's Age** are both live
(as of v1.0.0, 2026-06-30); the other three eras are placeholders.

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

- `js/data.js` - **era-aware**: an `ERA_CONFIG` registry maps each available era (archaic, caesar)
  to its markdown file, image folder (`images_archaic/` / `images_caesar/`), and slug→portrait
  lookup. Loads + parses the per-era draft (fetch over http, embedded fallback `js/content.js` for
  `file://`, which now holds `__ARCHAIC_MD__` + `__CAESAR_MD__`); **scrubs tier/ranking language**
  from displayed prose; exposes `LatinData` (eras, authors, bio/works/style). To add an era: add an
  `ERA_CONFIG` entry, flip its `ERAS` `available:true`, drop its images in the folder, regenerate
  content.js + content-it.js, add ratings + fragments.
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
   whenever you change a JS/CSS file. **Currently `v=53`.**
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
| Livius Andronicus | Odusia (3) |
| Gnaeus Naevius | Bellum Poenicum (2) + Epitaph (1) |
| Quintus Ennius | Annales (3) |
| **Plautus** *(needsSelection)* | 7 comedies: Pseudolus (3) · Mostellaria (3) · Amphitruo (4) · Aulularia (3) · Miles Gloriosus (3) · Menaechmi (4) · Bacchides (3) |
| Cato the Elder | De Agri Cultura (5) |
| **Caecilius Statius** *(needsSelection)* | Plocium (5) · Other plays (3) |
| **Terence** *(needsSelection)* | Andria (3) · Hecyra (3) · Heautontimorumenos (3) · Eunuchus (3) · Phormio (3) · Adelphoe (3) |
| Pacuvius & Accius | Niptra (1) + Chryses (2) · Atreus (1) + Brutus (2) |
| Gaius Lucilius | Saturae (1) |
| Pomponius & Novius | Fullones (1) + Galli Transalpini (1) + Kalendae Martiae (1) · Maccus Exul (1) + Atellanae (2) |

**Caesar's Age (live as of v1.0.0)** - all `needsSelection:false`, fragments cycle on the practice page:

| Author (slug) | Eval | Fragment(s) |
|---|---|---|
| Marcus Terentius Varro | Manageable | **needsSelection** (work chooser): De Re Rustica (5) · De Lingua Latina (3) · Saturae Menippeae (3) = 11 |
| Cornelius Nepos | Good Exercise | Epaminondas (1) |
| Quintus Hortensius Hortalus | **NA (grey badge, no chart)** | Cicero, Brutus 6 (1) |
| Publius Nigidius Figulus | **NA (grey badge, no chart)** | Gellius, NA X.9 (1) |
| Marcus Tullius Cicero | Very Difficult | In Catilinam I.1-2 · Ad Atticum I.16 · De Amicitia 20 (3) |
| Gaius Julius Caesar | Good Exercise | BG VI.13 Druids · VI.14 Druids · BC I.7 Rubicon speech (3) |
| Aulus Hirtius | Manageable | BG VIII praef. · Bellum Alexandrinum 1 · Bellum Alexandrinum 2 (3) |
| Titus Lucretius Carus | Very Difficult | DRN I.80-101 Iphigenia (1) |
| Gaius Sallustius Crispus | START PRAYING, BOY | Cat. 5 portrait · Iug. 85 Marius (2) |
| Gaius Valerius Catullus | Manageable | carmina 3 · 101 · 64.1-7 (3) |

Caesar images live in `images_caesar/` (Figulus's portrait is Pythagoras - no ancient likeness of
Nigidius survives). Many portraits carry a small **"this image is invented/uncertain" note** shown in
its own column on the right of the hero (`IMAGE_NOTE` in data.js, rendered by author.js as
`.portrait-note`, bilingual; spans both eras - Livius/Naevius/Ennius/Plautus/Terence, Pacuvius+Accius,
Pomponius+Novius, Varro, Nepos, Hortensius, Hirtius, Lucretius, Figulus). Caesar fragments carry no `analysisIt` from the docs (the IT excerpt sections
have only the translation), so Italian analyses were authored fresh during the v1.0.0 build.

## What remains (the plan)

- **Plautus**: DONE - 6 comedies (Pseudolus 3 + Mostellaria 3 + Amphitruo 4 + Aulularia 3 +
  Miles Gloriosus 3 + Menaechmi 4). Menaechmi: prologue, Peniculus, the Act V.1 mistaken-identity
  quarrel (vv.701-752), and the Act V.2 feigned-madness scene (vv.829-852) - the only work with 4.
- **Terence** (agreed: 3 fragments per comedy, 6 plays): **DONE - all 6 of 6** - Andria, Hecyra,
  Heautontimorumenos, Eunuchus, Phormio, Adelphoe (3 each). The user said they'll decide later
  whether to add more than 3 per play.
- **Caecilius**: DONE (extended to 5+3 in v1.1.1, 2026-07-06). `Plocium` now has 5: the 3 Gellius
  passages (NA II.23.10/13/21) plus "Vivas ut possis..." (Donatus, ad Andriam) and "Placere occepit
  graviter, postquam emortuast" (Nonius 314,21). `Other plays` now has 3: old age (*De Senectute* 25),
  *Synephebi* (*Tusc.* I.31), and "Saepe est etiam sub palliolo sordido sapientia" (*Tusc.* III.56).
- **Fragmentary authors**: ALL DONE. Cato (5); Livius (3), Naevius (3), Ennius (3); Pacuvius (3),
  Accius (3), Novius (3), Pomponius (3). The Archaic Era practice bank is complete (3 per author,
  except Cato 5 and the multi-comedy authors Plautus/Terence).
- Optional: mirror the new practice Italians into `italian_translations_archaic.md`.

Per new fragment: verified Latin + source, original IT+EN + IT metadata (titleIt/descriptionIt/
analysisIt, proper accents), short tailored analysis, title, citation; spread across the work;
>=1 famous per comedy; chronological order; bump cache; verify in preview (no console errors);
commit + push; update `CHANGELOG.md`, `practice_fragments_reference.md`, and this file (table +
cache `v=`).

### >>> LIVE at v1.1.1, cache ?v=53 -- IN PROGRESS: EXTEND ARCHAIC + FLESH OUT CAESAR (NOT Augustan) <<<

**Plan set 2026-07-06.** The user does NOT want to start the Augustan Era yet (that draft isn't written).
Instead, extend the Archaic Era practice bank and flesh out Caesar's Age. **Caecilius is DONE (v1.1.1).**

**Per-author update scope (user, 2026-07-06)** - how much each author will still grow:
- **DONE / no more** (enough already): Livius Andronicus, Naevius, Ennius, **Caecilius** (done v1.1.1),
  Pacuvius/Accius, Pomponius/Novius, Hortensius/Figulus.
- **Small** (a few more, for now): **Terence** (a few), **Lucilius** (a few).
- **Large** (main expansion): **Plautus**, **Cato**, **Varro** (more later, not now - already has 11), and
  the rest of Caesar's Age (Nepos, Cicero, Caesar, Hirtius, Lucretius, Sallust, Catullus).

Remaining work items:

- **Plautus**: currently **7 comedies** (Bacchides was the missing 7th). Add 3 more - **Asinaria, Casina,
  Truculentus** = **10 comedies total** (matches the user's "all 10 comedies"). Target (**confirmed
  2026-07-06**): every comedy has **5 fragments** - bring the existing 3-4 up to 5, author the 3 new ones
  at 5 (= +12 to the existing seven, +15 new). Works list **ordered alphabetically**. Alphabetical order of the 10: Amphitruo, Asinaria, Aulularia, **Bacchides**, Casina,
  Menaechmi, Miles Gloriosus, Mostellaria, Pseudolus, Truculentus.
- ~~**Caecilius Statius**: +2 Plocium fragments (3 -> 5) and +1 "Other plays" fragment.~~ **DONE (v1.1.1,
  2026-07-06)**: Plocium 5 (added Donatus "Vivas ut possis" + Nonius "Placere occepit... postquam
  emortuast"); Other plays 3 (added Cicero Tusc. III.56 "Saepe est etiam sub palliolo sordido sapientia").
- **Terence** *(small)*: a few more **for now** (eventual shape +2/comedy -> 5 each, but only a few now).
- **Cato the Elder** *(large)*: +5 De Agri Cultura fragments (5 -> 10), maybe a few from other works.
- **Lucilius** *(small)*: a few **for now** (from: satire manifesto, Lupus/gluttony, myth parody, voyage to
  Capo Colonna / Croton-Lacinium).
- **Caesar's Age flesh-out** *(large)*: Nepos, Cicero, Caesar, Hirtius, Lucretius, Sallust, Catullus.
  Varro later (already 11). Specifics per author TBD by the user.

Per-fragment checklist unchanged (see below). Augustan is deferred until the above is done and the user
gives permission.

**Current state (v1.1.0, 2026-07-05):** Archaic + Caesar's Age both live. Since the v1.0.0 launch:
- **v1.0.1/1.0.2 fixes**: Caesar BG VI split into VI.13/VI.14; Hirtius Bell. Alex. split into 1/2;
  grey "Not Assessable (NA)" badge for Hortensius/Figulus (no chart); Nepos chart lowered; Lucretius
  lexicon maxed; Sallust badge purple + IT "IN BOCCA AL LUPO"; Varro full twelve-gods invocation;
  Sallust BI full Latin; Catullus dup-excerpt removal + "(Liber, Carmen N)" citations; per-portrait
  invented/uncertain-likeness notes (`IMAGE_NOTE`) in a right-hand hero column (Figulus = Pythagoras).
- **v1.1.0 (this line)**: **Varro is now `needsSelection:true`** with a 3-work chooser - De Re Rustica
  (5), De Lingua Latina (3), Saturae Menippeae (3) = 11 fragments (Menippeans from Gellius on TLL,
  editorial "inquit" removed; De Re Rustica 2-5 later extended to ~0.6-1.1k chars each). Per-author IT
  chooser heading via `selectHeadingIt` ("Scegli un'opera di Varrone"). EN grid label fixed ("Authors
  of Caesar's Age", no stray "the"). Chooser footer EN now "Pick a work..." (was "a comedy or text").
- **Caesar's Age now has 29 practice fragments total.** All verified in the browser (EN & IT), verbatim
  Latin validated, no console errors. Committed + pushed (latest: `b5d3369`).

**The Caesar's Age web-app build is DONE**: era-aware `data.js`, the 10-author grid + profiles
(scrubbed bio/works/style + chart + evaluation, EN & IT), images, regenerated content.js/content-it.js,
ratings, changelog through v1.1.0.

**Archaic Era practice bank is complete. Caesar's Era writing was COMPLETE as of 2026-06-29; the app
integration completed 2026-06-30.**

**Caesar's Era draft state (COMPLETE):**

| Entry | Tier | Status |
|---|---|---|
| Era Introduction | -- | Done |
| Marcus Terentius Varro | C | Done |
| Cornelius Nepos | D | Done |
| Quintus Hortensius Hortalus | NC | Done |
| Publius Nigidius Figulus | NC | Done |
| Marcus Tullius Cicero | A Low End | Done (2026-06-28) |
| Gaius Julius Caesar | D | Done (2026-06-28) |
| Aulus Hirtius | C | Done (2026-06-28) |
| Titus Lucretius Carus | A High End | Done (2026-06-29) |
| Gaius Sallustius Crispus | S | Done (2026-06-29) |
| Gaius Valerius Catullus (+ neoteric sidebar) | C | Done (2026-06-29) |

Both `caesar_era_draft.md` (English) and `italian_translations_caesar.md` (Italian) are fully in sync. All legacy sections present. Italian file headers standardised to "Eredità e Impatto" throughout.

**Catullus entry summary (2026-06-29):**
- Three excerpts: carmina 3 (full, 18 lines -- sparrow), carmina 101 (full, 10 lines -- brother's grave), carmina 64.1-7 (epyllion opening, shows carmina docta difficulty).
- Neoteric circle sidebar: Calvus, Bibaculus, Helvius Cinna, Cornificius -- all NC.
- Legacy includes Petrarch's 14th-century study of the *Codex Veronensis* and the Catullan model behind the *Canzoniere*.
- Tier C (Manageable): polymetrics/epigrams D-to-C, carmina docta low B.

**Next step:** the **Archaic extension + Caesar flesh-out** plan above (set 2026-07-06). Do NOT start the
Augustan Era yet - the user hasn't written that draft and has deferred it. (Augustan authors, for later:
Cornelius Gallus, Livy, Virgil, Tibullus, Vitruvius, Propertius, Horace, Ovid; Hyginus, Grattius -
confirm permission before starting per CLAUDE.md.)

**Optional (Archaic bank)**: mirror new practice fragment Italians into `italian_translations_archaic.md`; or add more Plautus/Terence fragments (user deferred this decision).

Sourcing notes worth keeping: some TLL pages are **UTF-16** (Cicero *De Divinatione* / *De Oratore*,
Gellius) - `curl ... -o f.raw` then `tr -d '\000' < f.raw | sed 's/<[^>]*>//g' ...` to read them.
TLL has a `naevius.html` page but NO Pomponius/Novius/Macrobius pages; for Atellan/tragic fragments,
Cicero (De Div / De Off / De Oratore / Tusc) and LacusCurtius Macrobius
(`penelope.uchicago.edu/Thayer/L/Roman/Texts/Macrobius/Saturnalia/N*.html`, plain HTML, curl-able)
are the practical official sources. Edition numbering varies (Naevius Malta = fr. 40 on TLL, fr. 32
elsewhere) - note variants in the analysis. When an entry bundles 2+ distinct fragments, split them
(one fragment per practice entry).

Per-fragment checklist is unchanged (see "What remains" above): verified Latin + source, original
IT+EN, IT metadata (titleIt/descriptionIt/analysisIt, proper accents), short tailored analysis,
title, citation; vary difficulty; >=1 famous passage per comedy; chronological order; bump cache;
verify in preview; commit + push; update CHANGELOG + reference sheet + this file.

## How to run / verify

Double-click `index.html` (works via the embedded fallback) or serve the folder
(`python -m http.server 8000`). In dev, the browser may cache stale assets - append `&cb=<rand>`
to the page URL and/or inject cache-busted scripts when verifying. Check there are no console
errors.
