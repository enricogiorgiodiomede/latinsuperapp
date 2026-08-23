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
  `js/author.js`, `js/practice.js`, `js/select.js`, `js/version-list.js` (the `version.html?v=X`
  excerpt-list page). `css/styles.css` - all styles.
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
   whenever you change a JS/CSS file. **Currently `v=82`.**
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
| **Plautus** *(needsSelection)* | **DONE: 10 comedies, 5 each = 50 frags** (v1.4.0): Amphitruo · Asinaria · Aulularia · Bacchides · Casina · Menaechmi · Miles Gloriosus · Mostellaria · Pseudolus · Truculentus (all alphabetical, all 5) |
| Cato the Elder | De Agri Cultura (10) |
| **Caecilius Statius** *(needsSelection)* | Plocium (5) · Other plays (3) |
| **Terence** *(needsSelection)* | Andria (5) · Hecyra (5) · Heautontimorumenos (5) · Eunuchus (5) · Phormio (5) · Adelphoe (5) |
| Pacuvius & Accius | Niptra (1) + Chryses (2) · Atreus (1) + Brutus (2) |
| Gaius Lucilius | Saturae (8) |
| Pomponius & Novius | Fullones (1) + Galli Transalpini (1) + Kalendae Martiae (1) · Maccus Exul (1) + Atellanae (2) |

**Caesar's Age (live as of v1.0.0)** - all `needsSelection:false`, fragments cycle on the practice page:

| Author (slug) | Eval | Fragment(s) |
|---|---|---|
| Marcus Terentius Varro | Manageable | **needsSelection** (work chooser): De Re Rustica (5) · De Lingua Latina (3) · Saturae Menippeae (3) = 11 |
| Cornelius Nepos | Good Exercise | **De Viris Illustribus (8)**: Praefatio, Themistocles, Alcibiades, Epaminondas, Pelopidas, Hannibal, Cato, Atticus |
| Quintus Hortensius Hortalus | **NA (grey badge, no chart)** | Cicero, Brutus 6 (1) |
| Publius Nigidius Figulus | **NA (grey badge, no chart)** | Gellius, NA X.9 (1) |
| **Marcus Tullius Cicero** *(needsSelection, NESTED chooser)* | Very Difficult | **Speeches (49, v1.5.0-v1.6.6), works CHRONOLOGICAL again**: In Verrem 3 · **In Catilinam I 10 · II 7 · III 7 · IV 8 = 32, COMPLETE** · **Pro Archia 8** · Pro Milone 3 · Philippica II 3. **Letters**: Ad Atticum 1. **Philosophical works**: De Amicitia 1. (51 total) |
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
- **Terence** (6 plays): **DONE - now 5 fragments per comedy** (was 3; +2 each in v1.1.2, 2026-07-07) -
  Andria, Hecyra, Heautontimorumenos, Eunuchus, Phormio, Adelphoe (5 each = 30 total). See the v1.1.2
  entry below for the added passages.
- **Caecilius**: DONE (extended to 5+3 in v1.1.1, 2026-07-06). `Plocium` now has 5: the 3 Gellius
  passages (NA II.23.10/13/21) plus "Vivas ut possis..." (Donatus, ad Andriam) and "Placere occepit
  graviter, postquam emortuast" (Nonius 314,21). `Other plays` now has 3: old age (*De Senectute* 25),
  *Synephebi* (*Tusc.* I.31), and "Saepe est etiam sub palliolo sordido sapientia" (*Tusc.* III.56).
- **Fragmentary authors**: ALL DONE. Cato (10, v1.1.5); Livius (3), Naevius (3), Ennius (3); Pacuvius (3),
  Accius (3), Novius (3), Pomponius (3). The Archaic Era practice bank is complete (3 per author,
  except Cato 10, Lucilius 8, and the multi-comedy authors Plautus/Terence).
- Optional: mirror the new practice Italians into `italian_translations_archaic.md`.

Per new fragment: verified Latin + source, original IT+EN + IT metadata (titleIt/descriptionIt/
analysisIt, proper accents), short tailored analysis, title, citation; spread across the work;
>=1 famous per comedy; chronological order; bump cache; verify in preview (no console errors);
commit + push; update `CHANGELOG.md`, `practice_fragments_reference.md`, and this file (table +
cache `v=`).

### >>> LIVE at v1.4.0, cache ?v=72 -- IN PROGRESS: FLESH OUT CAESAR'S AGE (Archaic done; NOT Augustan) <<<

**v1.3.0 (2026-07-20, CEST): the big Plautus job (new comedies).** Added 3 comedies at 5 excerpts each -
**Asinaria, Casina, Truculentus** (15 new fragments, all tagged `version: 1.3.0`, so the VIP badge now
sits on them) - and **reordered the Plautus `works` array alphabetically** (the chooser renders array
order; ORDER = Amphitruo, Asinaria, Aulularia, Bacchides, Casina, Menaechmi, Miles Gloriosus, Mostellaria,
Pseudolus, Truculentus). Plautus is now **10 comedies / 38 fragments**. Built with a throwaway Node script
(`add_plautus.js`: window-shim + eval, push 3 works, sort by ORDER, re-emit `head + JSON.stringify + tail`).
**Scope note (user, 2026-07-20):** this round was **new comedies only**; the existing 7 comedies were NOT
topped up to 5 (Amphitruo & Menaechmi stay 4, the other five stay 3) - that top-up is a **future task**.
**Proofread status (user, 2026-07-20):** **Asinaria + Casina are well-preserved -> self-proofread, NO user
proofread.** Casina's verse *numbers* are the only approximation (TLL prints none); each Casina fragment now
carries an in-app note saying so, appended to its `analysis`/`analysisIt` (added v1.3.0 follow-up, cache
v68). **Truculentus PROOFREAD by the user (2026-07-20, cache v69):** fixes applied - II.5 citation 447->**448**-460
(+ restored em-dashes `nimio -- minus` / `dolorem -- dolus`, moved `dolorem` to its own verse, `<nunc>` v.458
back in brackets + noted as an editor's fill); III.2 citation 668->**669**-678 (+ restored `<ego>` v.674 and
`qui<d metuam>?` v.675, noted); IV.3 citation 770-779 -> **775-784** (text unchanged). Frags 1-2 were already
fine. **All three new comedies now proofread/confirmed.** Citations: Casina uses "(Casina, Act N, vv. X-Y)"
with no scene number (TLL doesn't number Casina scenes).

**v1.2.2 (2026-07-14, EEST):** the version badges are now **clickable links** (`makeVersionBadge` builds an
`<a href="version.html?v=<version>">`; CSS restores `pointer-events` + hover). New page **`version.html` +
`js/version-list.js`**: lists every excerpt of one version (`?v=X`), sorted by author name then work/subject
(Nepos sub-sorted by the character parsed from the citation), each row deep-linking to the exact excerpt via
a new **`?frag=N`** param on `practice.js` (1-based pool index); prev/next arrows walk the versions that
actually added excerpts (distinct fragment versions). VIP badge -> newest version, papyrus -> its own. The
**What's New log now shows a release time**: every `js/changelog.js` entry has `time` (HH:MM, from the git
commit that shipped it) + `tz`; `whatsNew.released` template is now "Released {date}, {time} {tz}". Historical
= CEST, v1.2.2 = EEST (user in Greece). Also corrected six changelog dates to their real commit days
(0.9.8-0.9.10 -> 2026-06-26, 0.9.11-0.9.13 -> 2026-06-27; they had been bunched at 06-19).


**Version tracker (v1.2.0 addition; tags corrected in v1.2.1, cache v64):** every fragment in
`js/fragments.js` has a `version` field (app version it was first added in). `practice.js` computes the
newest version site-wide (max over fragment `version` fields, floor 1.0.0 - NOT the release number) and
shows a top-right badge per excerpt: **papyrus scroll** "Added in v.X" (deep-red text) for older ones,
**red "NEW!" VIP banner** (golden text) for the newest version's fragments. Self-maintaining: the VIP
moves to the next batch automatically when newer excerpts get a higher version. Badge markup in
`practice.js` (`makeVersionBadge` + `LATEST_VERSION`), styles in `css/styles.css`
(`.excerpt-version-badge.is-papyrus` / `.is-vip`, both CSS-drawn, no images), i18n `badge.addedIn`/
`badge.new`. Current VIP set = the 7 Nepos excerpts (v1.2.0, the max). **When adding a new excerpt batch:
tag the new fragments with the new version** (the version-tracker floor is `1.0.0`, so anything you leave
untagged shows as 1.0.0 - always set it).
**v1.2.1 correction:** the v1.2.0 back-fill script had wrongly tagged ALL pre-1.0.0 fragments as `1.0.0`.
Every Archaic fragment is now tagged with its real historical version, traced through the CHANGELOG:
launch originals=**0.1.0** (the 14 first fragments), Naevius Trojan wives=0.4.1, Plautus
Mostellaria+Amphitruo=0.6.0 / Aulularia=0.6.2 / Miles=0.8.0 / +2 Pseudolus=0.8.1 /
Menaechmi=0.9.11-0.9.13 / Bacchides=0.9.15, Terence originals=0.9.0-0.9.5, Caecilius +4=0.9.6, Cato
+4=0.9.7, split big-three poets=0.9.8, rest of fragmentists=0.9.9-0.9.10; Caesar's-Age (1.0.0+),
Varro-new=1.1.0, Caecilius-new=1.1.1, Terence-new=1.1.2, Lucilius=1.1.3/1.1.4, Cato-new=1.1.5,
Nepos-new=1.2.0 were already correct. Re-tag done by a scratch Node script (walk AUTHORS, set `version`,
re-emit via `head + JSON.stringify(AUTHORS,null,2) + ';' + tail` - the file round-trips byte-identical, so
the diff is only the changed version lines). Also v1.2.1: **VIP banner restyle** (brighter flat red
`#f01818->#e60f0f`, stripes removed, `top: -1px` so the gold roller straddles the card's top edge).

**Plan set 2026-07-06.** The user does NOT want to start the Augustan Era yet (that draft isn't written).
Instead, extend the Archaic Era practice bank and flesh out Caesar's Age. **Caecilius is DONE (v1.1.1).**

**Per-author update scope (user, 2026-07-06)** - how much each author will still grow:
- **DONE / no more** (enough already): Livius Andronicus, Naevius, Ennius, **Caecilius** (done v1.1.1),
  Pacuvius/Accius, Pomponius/Novius, Hortensius/Figulus.
- **Small** (a few more, for now): ~~**Terence**~~ **DONE v1.1.2 (5/comedy)**, ~~**Lucilius**~~ **DONE v1.1.3 (now 7)**.
- **Large** (main expansion): ~~**Plautus**~~ **DONE v1.4.0**, ~~Cato~~ **DONE v1.1.5**, **Varro** (more later,
  not now - already has 11), and the rest of Caesar's Age: ~~Nepos~~ **DONE v1.2.0**; **Cicero IN PROGRESS
  (Speeches done v1.5.0; Letters + Philosophical + Rhetorical still to build)**; still to do =
  **Caesar, Hirtius, Lucretius, Sallust, Catullus**.

**=== SESSION HANDOFF (updated 2026-08-20) ===**
Current: **v1.6.6, cache ?v=82**, pushed. Archaic is complete (Plautus 10 comedies / 50 frags since v1.4.0).
Caesar's-Age flesh-out in progress: **Nepos done (1->8, v1.2.0)**; **Cicero IN PROGRESS: Speeches now
8 works x 3 = 24 fragments** (v1.5.0 built the category; **v1.6.0 split In Catilinam into its four
speeches** and topped each to 3).
**ROADMAP for the rest of the Speeches group (saved on the user's instruction, 2026-08-22).** Same
rules as the v1.6.x batches: 3-5 excerpts per patch release, self-proofread, tagged with the release
version, **pause for review after each**.
- ~~**v1.6.6**~~ DONE 23/08: **Pro Archia 3 -> 8** (1, 18, 25, 28, 32).
- **v1.6.7 (NEXT): Pro Milone 3 -> 7/8** (+4/5).
- **v1.7.0:** **Pro Caelio** (3) + **In Pisonem** (3) + **Philippics I, IV, XIV** (3 each) = +15.
  Sources confirmed live: `cicero/cael.shtml`, `cicero/piso.shtml`, `phil1/phil4/phil14.shtml`.
- **v1.7.1:** more Philippics (deepen those from 1.7.0 and/or add further speeches of the 14).
- **v1.7.2 / v1.7.3:** deepen **Pro Caelio** and **In Pisonem** to 7-8 each.
- **v1.7.4 / .5 / (.6):** deepen **In Verrem**. User's note: it should end up the **longest of them
  all**, since it is 7 speeches and each book of the *actio secunda* runs to 100+ sections.
  **In Verrem is currently ONE work** (user's call, 2026-08-20); if it grows past ~8, revisit the
  De signis (II.4) / De suppliciis (II.5) split, but **ask first**.
Per-passage candidates are in `practice_fragments_reference.md` under "ROADMAP" and "Still to build".
**AFTER that:** Cicero's Letters + Philosophical works + Rhetorical works (same 3-per-work shape), then
**Caesar, Hirtius, Lucretius, Sallust, Catullus** (Varro later, already 11).
**NEW STRUCTURE (v1.5.0): the chooser can nest.** An author entry may carry a `groups` array
(`{id,label,labelIt,heading,headingIt}`) and each work a `group` id; `practice-select.html` then shows
categories first and `&group=<id>` shows that category's works. Only Cicero uses it so far; every other
`needsSelection` author is unchanged. Helpers: `PracticeBank.groups/hasGroups/getGroup/groupOfWork/
groupFragmentCount`, and `works(slug, groupId)`.
Always confirm which author + how many fragments before a batch. Per-batch workflow: source verbatim
(well-preserved -> self-proofread, no user proofread; fragment-only -> flag + ask user); **tag new
fragments with the new app version** (version-tracker); bilingual IT+EN + analysis + IT metadata; bump
cache; verify in browser; commit+push; update CHANGELOG + in-app What's New + this file +
practice_fragments_reference.md + memory.
**=== end handoff ===**

Remaining work items:

- ~~**Plautus**: 10 comedies, 5 each.~~ **FULLY DONE.** v1.3.0 added the 3 new comedies (Asinaria, Casina,
  Truculentus, alphabetized); **v1.4.0 (2026-08-13) topped up the older 7 to 5 each (+12)** = **50 frags**.
  The +12: Amphitruo I.1 (427-440, wine-cask/gaslighting); Miles II.2 (221-234, mil-commands, Naevius note
  in analysis) + IV.2 (991-1004, Milphidippa's flattery); Pseudolus I.4 (394-405, quasi poeta) + IV.2
  (963-977, Simia baits Ballio); Aulularia Prologue (1-12, Lar) + IV.10 (740-752, cross-purposes
  confession); Mostellaria II.2 (493-505, ghost) + III.1 (532-543, danista); Bacchides II.3 (349-362,
  Chrysalus gloat) + III.1 (368-381, Lydus/Bacchae); Menaechmi II.2 (285-298, Cylindrus). Self-proofread
  (well-preserved); editorial marks kept + flagged (Miles 226-228, Pseud 398, Bacch 377-378 bracketed;
  Most danista/ghost angle-brackets; Most ghost `[...]` gap). Fragments in each work re-sorted by verse.
- ~~**Caecilius Statius**: +2 Plocium fragments (3 -> 5) and +1 "Other plays" fragment.~~ **DONE (v1.1.1,
  2026-07-06)**: Plocium 5 (added Donatus "Vivas ut possis" + Nonius "Placere occepit... postquam
  emortuast"); Other plays 3 (added Cicero Tusc. III.56 "Saepe est etiam sub palliolo sordido sapientia").
- ~~**Terence** *(small)*: a few more for now.~~ **DONE (v1.1.2, 2026-07-07)**: +2 to each of the 6
  comedies -> **5 each** (reached the eventual target early). New: Andria (III.2 "fake birth" 471-480,
  V.3 reconciliation 889-905); Eunuchus (prologue furtum 23-34, Thraso siege 771-782); Phormio (prologue
  1-11, "fortis fortuna adiuvat" 201-206); Adelphoe (prologue 6-21, Syrus "patinas" 428-434); Hecyra
  (Syra 58-70, Bacchis 833-840); Heauton (Menedemus 93-101, Clitipho 213-219). Line refs/act-scene
  flagged for proofread (Adelphoe has no TLL line numbers; Andria/Phormio/Hecyra act-scene to confirm).
- ~~**Cato the Elder** *(large)*: +5 De Agri Cultura fragments (5 -> 10).~~ **DONE (v1.1.5, 2026-07-08):
  10 total.** New: villica (cap.143, placed right after the villicus cap.5), lime-kiln (cap.38), olive
  harvest (cap.64), placenta cake (cap.76,3-4), winter wine for the slaves (cap.104). Verbatim from TLL,
  self-proofread (well-preserved). Also **tuned Cato's chart**: density 1.6->1.2 (green), lexicon
  2.3->2.4 (still yellow). Cato's other works (Origines/Orationes) are fragment-only -> would need user
  proofread if ever added. **Also (still v1.1.5, cache v61):** extended 3 excerpts - villicus (cap.5,
  +personal-conduct duties to match villica length), olive (cap.64, now the full chapter incl. "bis in die
  depleto" + amurca/fraces), lime-kiln (cap.38, +white-stone/flue/siting).
- ~~**Lucilius** *(small)*: a few for now.~~ **DONE (v1.1.3 -> 8 total).** Manifesto
  (Book 26, Iunius Congus line), Concilium Deorum / Lupus (Book 1), Iter Siculum voyage (Book 3, = first
  journey satire, cf. Horace Sat. I.5), Albucius "chaere Tite" (Cic. De Fin. I.9), myth parody
  (Book 15: Cyclops + Lamiae), Roman rat-race (Lactantius). NOTE: surviving Iter frags do NOT name Capo
  Colonna/Lacinium (they run to the Sicilian strait - Messana/Rhegium); the Scipio/lower-classes manifesto
  bit is only Cicero's paraphrase, so it lives in the analysis, not the translatable Latin. All flagged for
  proofread (esp. the reassembled Book-1 and Book-15 fragments).
  **v1.1.4 (same day, user-supplied verbatim lines):** fleshed out the two fragments. Lupus/Concilium
  now runs luxury -> gods sizing up Lupus's face ("quae facies, qui vultus viro? / vultus item ut facies,
  mors cetera, morbus, venenum", vv.43-44) -> a god's dinner-plot ("ad cenam adducam, et primum hisce
  abdomina tunni / advenientibus priva dabo cephalaeaque acarnae", vv.49-50) -> death punchline ("Occidunt,
  Lupe, saperdae te et iura siluri!", Varro L.L. VI.47; pun on lupus the sea-bass). Order follows sense,
  not verse-number. Voyage gained the "no delicacies" line ("ostrea nulla fuit, non purpura, nulla peloris
  / asparagi nulli", vv.127-8) before the honey verses, plus the earlier "nam mel..." + "exhalas... ructus"
  (Charisius/Nonius, Book 3). All from Warmington ROL III; scattered, gaps marked "...". Cache -> v57.
  Also added an **8th fragment** (kept under v1.1.4): poetic pride, "publicanus vero ut Asiae fiam, ut
  scripturarius, / pro Lucilio, id ego nolo, et uno hoc non muto omnia" (Book 26; Nonius 351,6 = Warmington
  650-1 = vv.627-8 T-M) - refuses to trade being a poet for a tax-farmer's riches; placed 2nd, after the
  manifesto (both Book 26). Cache -> v58. Lucilius `Saturae` now = 8.
  **Proofread fixes (v1.1.4, cache v59):** voyage -> `susque et deque` (not `susque haec deque`) +
  reordered to the standard edition (propempticon, then mantica+`susque`, then road, then food) + a
  side-note on the Greek `αἰγίλιποι`; Lupus `amphitapi` -> `amphitapae` (agrees with psilae/molles) +
  ellipsis style normalized (standalone `...` lines for skipped verses, no leading `...` glued to a line).
- **Caesar's Age flesh-out** *(large)*: ~~Nepos~~ **DONE (v1.2.0, 1->8)**; still to do: Cicero, Caesar,
  Hirtius, Lucretius, Sallust, Catullus. Varro later (already 11). Specifics per author TBD by the user.
  - **Nepos (v1.2.0, 2026-07-09):** De Viris Illustribus 1->8. Order (book order, Praefatio first):
    Praefatio 1-3, Themistocles IV.1-5, Alcibiades I.1-4, Epaminondas (existing, citation fixed),
    Pelopidas III.1-3, Hannibal II.3-6, Cato III.1-3, Atticus VI.1-3. Verbatim from TLL `nepos/nepos.*.shtml`,
    self-proofread (well-preserved). **Citation style fixed** to "(De Viris Illustribus, [Name]
    [chapter-Roman].[section]-[section], ...)" - chapter in Roman numerals, sections arabic; Epaminondas
    corrected to "IX.3-4, X.1-2". Sentence-per-line blockquotes.

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
