# Changelog

All notable changes to this project are documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
with simple date-based entries. The app is plain HTML/CSS/vanilla JavaScript with
no build step and no dependencies.

## [1.6.1] - 2026-08-21

First of four small batches deepening the Catilinarians before v1.7.0. The user's textbook takes its
Cicero excerpts only from the **first** speech, so *In Catilinam I* gets the bulk of the new material
(3 -> 10 across v1.6.1 and v1.6.2); II, III and IV go to 5 each afterwards. Passages 1-6 for Cat I were
named by the user; the seventh (I.20-21) was chosen from a shortlist.

### Added
- **4 new *In Catilinam I* fragments** (verbatim Latin from The Latin Library `cicero/cat1.shtml` +
  original Italian and English + analysis, with bilingual metadata), tagged `version: 1.6.1`, so the
  speech now holds 7:
  - **I.3** - the Scipio/Gracchus and Ahala/Maelius exempla (argument from the smaller case), the
    geminatio *Fuit, fuit ista quondam... virtus*, and the closing confession-as-threat
    *nos, nos, dico aperte, consules desumus*, with the *senatus consultum ultimum* of 21 October
    already in Cicero's hand.
  - **I.5** - *Castra sunt in Italia contra populum Romanum in Etruriae faucibus conlocata*: the camp,
    the growing numbers, and its general sitting *intra moenia atque adeo in senatu*; then the defence
    of the delay, *serius* weighed against *crudelius*, and the bare future *interficiere*.
  - **I.8-9** - the night at Laeca's house *inter falcarios*: the parenthesis *non agam obscure*, the
    four unanswered questions of §9 (*ubinam gentium sumus? in qua urbe vivimus?*), *hic, hic*, the
    sword/word paradox, and the six-verb asyndetic charge-sheet ending with the two knights who
    promised to kill Cicero *in meo lectulo*. The longest of the four (~1280 chars). `[esse]` kept.
  - **I.10** - five imperatives (*perge, egredere, proficiscere, educ, purga*) around *patent portae*,
    the taunt of *Manliana castra*, and the tricolon *non feram, non patiar, non sinam*.

### Notes
Fragments inside each speech sort by paragraph number automatically (the applier parses the trailing
number out of the citation), so the new ones slot in between the existing I.1-2, I.17-18 and I.33.
Self-proofread; the whole Speeches group was re-checked against the stripped source pages, now
**28/28 verbatim** (the I.1-2 harmonisation of v1.6.0 brought the last outlier into scope).

Cache-bust: `?v=76` -> `?v=77`.

## [1.6.0] - 2026-08-20

Cicero, part two. **In Catilinam is split into its four speeches**, each a separate work in the
chooser, and each topped up to three fragments. User's reasoning: four speeches delivered to two
different audiences over four weeks should not sit behind one menu entry.

### Added
- **9 new Cicero practice fragments** (verbatim Latin from The Latin Library + original Italian and
  English + analysis, with bilingual metadata), tagged `version: 1.6.0`:
  - **In Catilinam I** (+2): 17-18 - the *prosopopoeia*, the *patria* speaking as a mother
    (*discede atque hunc mihi timorem eripe*); 33 - the closing prayer to Jupiter Stator, with the
    *Stator* = "the one who makes things stand" pun and the future indicatives *arcebis... mactabis*.
  - **In Catilinam II** (+2): 11 - *intus insidiae sunt, intus inclusum periculum est, intus est
    hostis*, plus the unnamed *unius virtute* (Pompey) and the medical *sanare*/*resecanda* metaphor;
    22-23 - the sixth class of conspirators, *seminarium Catilinarum*, ending on the naked-dancing joke.
  - **In Catilinam III** (+2): 6 - the Mulvian Bridge sting, historic presents, *integris signis*,
    and the deadpan line about Lentulus staying up late to write letters (the easiest Latin of the set);
    26 - *nullum praemium... praeterquam huius diei memoriam sempiternam* and the *duos civis* pairing
    of Cicero with Pompey.
  - **In Catilinam IV** (3, new work): 1-2 - six *non* phrases before *fuit*, and Lentulus's *fatale*
    name turned into Cicero's *prope fatalem* consulship; 11 - the Silanus/Caesar debate and the
    *evidentia* vision (*videor videre* / *cerno animo* / *versatur ante oculos*); 24 - nine phrases
    hanging on *decernite*, then *habetis eum consulem, qui...*.

### Changed
- **`in-catilinam` split into `in-catilinam-i` / `-ii` / `-iii` / `-iv`** (labels "In Catilinam I-IV",
  labelIt "Prima/Seconda/Terza/Quarta Catilinaria"). The three existing fragments were routed by
  citation into their own speech and keep their version tags (I.1-2 = 1.0.0; II.1 and III.1-2 = 1.5.0).
  Fragments inside each speech are ordered by section number; the works sit in delivery order inside
  the Speeches group, between In Verrem and Pro Archia.
- **In Catilinam I.1-2 harmonised with the Latin Library text.** That fragment came from the era draft
  and omitted the bracketed supplement the site prints: it now reads *quam tu in nos [omnes iam diu]
  machinaris*. Its Italian and English were re-rendered to match ("against us all, and for a long time
  now"), and the analysis gained a closing note on what the square brackets mean. Its `version` field
  stays `1.0.0` - that field records when an excerpt was first added, not when it was edited, so the
  "NEW!" banner is unaffected. With this, **all 24 Speeches fragments match the source verbatim (24/24)**.

### Notes on sourcing
Self-proofread verbatim from `cicero/cat1.shtml`-`cat4.shtml`; the whole Speeches group was
re-checked programmatically against the stripped pages (**23/23 exact**). Editorial brackets kept as
printed and flagged in the analyses: `[aris]` and `[omnium]` (Cat. I.33), `[sella curulis]` (Cat. IV.2).
Archaic spellings kept: `Hisce`, `volneras`, `inberbis`, `inpuri`, `inmanitate`.

Cache-bust: `?v=74` -> `?v=76` (v75 shipped the split; v76 the I.1-2 harmonisation).

## [1.5.0] - 2026-08-18

The Caesar's-Age flesh-out resumes with Cicero. First half of the batch: the **Speeches** category,
five works at three fragments each. The practice chooser gains a **second level** (category -> work)
so an author with a huge, many-shaped corpus does not have to sit behind one flat list.

### Added
- **14 new Cicero practice fragments** (verbatim Latin from The Latin Library + original Italian and
  English + analysis, with bilingual metadata), tagged `version: 1.5.0`:
  - **In Verrem** (3, new work): II.4.1-2 - the three names for Verres's habit (*studium* / *morbus et
    insania* / *latrocinium*) and the sweeping *nego* catalogue; II.4.77 - Segesta's women escorting
    the stolen Diana out of town, built on the *tum... nunc* antithesis (Scipio restored the statue,
    Verres takes it); II.5.162-163 - the flogging of Gavius, *civis Romanus sum* and *crux, crux inquam*.
  - **In Catilinam** (+2, now 3): II.1 - *Abiit, excessit, evasit, erupit* and the three-way hedge on
    whether Cicero actually expelled him; III.1-2 - the single fifty-word period ending in *videtis*,
    and Cicero installing himself beside Romulus.
  - **Pro Archia** (3, new work): 14 - the past-unreal period and *pleni omnes sunt libri*; 16 - the
    nine-verb asyndeton *haec studia adulescentiam alunt...*; 24 - Alexander at Achilles's tomb, ending
    in the nudge about Pompey and Theophanes.
  - **Pro Milone** (3, new work): 1-2 - the exordium in an armed forum (*ne non timere quidem sine
    aliquo timore possimus*); 10-11 - *non scripta, sed nata lex* and *silent enim leges inter arma*;
    104-105 - the peroration, *O terram illam beatam* and the break-off for tears.
  - **Philippica II** (3, new work): 1 - *Quonam meo fato* and the praeteritio; 63 - Antony vomiting on
    the tribunal; 118-119 - *Defendi rem publicam adulescens, non deseram senex*.
- **Nested practice chooser.** A bank author may now carry a `groups` array; each work names its
  `group`. `practice-select.html` lists the categories first, and `?group=<id>` lists the works inside
  one. New `PracticeBank` helpers: `groups`, `hasGroups`, `getGroup`, `groupOfWork`,
  `groupFragmentCount`; `works(slug, groupId)` filters by group. New i18n keys `select.leadGroups`,
  `select.worksCount`, `link.backCategories` (EN + IT).

### Changed
- **Cicero is now `needsSelection`** with four groups: Speeches, Letters, Philosophical works,
  Rhetorical works. The three pre-existing fragments moved into `in-catilinam`, `ad-atticum` and
  `de-amicitia` and keep their historical `1.0.0` version tags, so the "NEW!" banner sits only on the
  new batch. Work order inside Speeches is chronological by delivery (Verrines 70 BC, Catilinarians 63,
  Pro Archia 62, Pro Milone 52, Philippic II 44).
- `practice.js`: the "choose another text" link returns to the work's own category, not the top level.
- Typo fix in the Italian of the existing *In Catilinam* I.1-2 fragment (*schiviam* -> *schiviamo*).

### Notes on sourcing
All five speeches are well-preserved -> **self-proofread verbatim, no user proofread**. Each new Latin
field was checked programmatically against the stripped Latin Library page (14/14 exact). Editorial
marks kept as printed and flagged in the analyses: `<hospitis>` (Verr. II.4.2), `[oratori]` (Mil. 1).
Two Latin Library slips were sidestepped by trimming rather than reproduced: *cognitatione* for
*cogitatione* (Arch. 14, last sentence dropped) and *non minis* for *non hominis* (Mil. 11, fragment
ends at *quam iusta repetenda*). *Illias* (Arch. 24) and *inplevit* (Phil. II.63) are kept and noted.

Cache-bust: `?v=72` -> `?v=74`.

## [1.4.0] - 2026-08-13

Plautus is complete: the older seven comedies are topped up so every one of the ten has five practice
fragments (50 in all).

### Added
- **12 new Plautus practice fragments** (verbatim Latin from The Latin Library + original Italian and
  English + analysis, with bilingual metadata), spread across acts, so each of the seven older comedies
  reaches 5:
  - **Amphitruo** (+1): I.1 vv. 427-440 - Mercury "proves" he is Sosia (the wine he secretly drank) and
    gaslights him (*Vbi ego Sosia nolim esse, tu esto sane Sosia*).
  - **Miles Gloriosus** (+2): II.2 vv. 221-234 - the old man drilling Palaestrio in mock-military terms
    (the analysis notes the veiled Naevius allusion at vv. 210-212); and IV.2 vv. 991-1004 - Milphidippa's
    staged flattery reeling in the vain braggart.
  - **Pseudolus** (+2): I.4 vv. 394-405 - the *quasi poeta* monologue (trimmed to keep the poet conceit);
    and IV.2 vv. 963-977 - the con where Simia baits Ballio, who claims every insult as his own name.
  - **Aulularia** (+2): the Prologue (vv. 1-12, the Lar Familiaris and the buried gold); and IV.10 vv.
    740-752 - the cross-purposes confession (Euclio hears theft, Lyconides means the daughter).
  - **Mostellaria** (+2): II.2 vv. 493-505 - Tranio invents the haunted-house ghost *Diapontius*; and
    III.1 vv. 532-543 - the *danista* (moneylender) comes to collect.
  - **Bacchides** (+2): II.3 vv. 349-362 - Chrysalus gloats over the Ephesus-gold trick
    (*Crucisalum me ex Chrysalo*); and III.1 vv. 368-381 - the tutor Lydus recoiling from the "Bacchants".
  - **Menaechmi** (+1): II.2 vv. 285-298 - the cook Cylindrus greets the wrong (Syracusan) twin.
- Plautus now has **10 comedies / 50 fragments**, each comedy's list ordered by verse (play order). All 12
  tagged `version: 1.4.0`, so the "NEW!" VIP badge and `version.html?v=1.4.0` cover this batch.

### Changed
- Cache-busting bumped to `?v=72`.

### Notes
- All well-preserved Plautus - **self-proofread verbatim, no user proofread**. Editorial marks are kept as
  The Latin Library prints them and flagged in the relevant analyses: bracketed suspect lines (Miles
  vv. 226-228, Pseudolus v. 398, Bacchides vv. 377-378), angle-bracket supplements (Mostellaria danista
  vv. 537-538, ghost scene), and a small transmitted gap in the Mostellaria ghost passage (marked `[...]`;
  its line numbers can wander a verse or two around it).

## [1.3.0] - 2026-07-20

Plautus's practice bank completes to all ten of his best-known comedies: Asinaria, Casina and
Truculentus join, five excerpts each.

### Added
- **15 new Plautus practice fragments** (verbatim Latin from The Latin Library + original Italian and
  English + analysis, with bilingual metadata), five per comedy, spread across the acts with varied
  difficulty and at least one famous passage each:
  - **Asinaria** (5): Cleareta the bawd on courtesan-economics (I.3); *lupus est homo homini* (II.4); the
    lovers' teasing farewell (III.3); the mock exclusivity *syngraphus* read aloud (IV.1); and the
    father-son dinner-couch rivalry over Philaenium (V.1).
  - **Casina** (5): the two slaves' rivalry, "like a shadow" (I); Lysidamus's *senex libidinosus*
    love-song (II) and the *sortitio* lot-drawing (II); Pardalisca's mock-tragic panic canticum (III);
    and Olympio's wedding-night narration (V).
  - **Truculentus** (5): Diniarchus's programmatic love-as-bankruptcy opening (I.1); Truculentus berating
    Astaphium (II.2); Phronesium's borrowed-baby scheming (II.5); the reformed "not-Truculentus" reversal
    (III.2); and Callicles' menacing interrogation (IV.3).
- The Plautus `works` array is **reordered alphabetically** (the chooser renders array order), so the
  comedy list now reads: Amphitruo, Asinaria, Aulularia, Bacchides, Casina, Menaechmi, Miles Gloriosus,
  Mostellaria, Pseudolus, Truculentus. Plautus now has **10 comedies / 38 fragments**.
- All 15 new fragments are tagged `version: 1.3.0`, so the red "NEW!" VIP badge (and the
  `version.html?v=1.3.0` list) now cover this batch.

### Changed
- **Casina** fragments now carry a short in-app note (in each analysis, bilingual): The Latin Library's
  Casina prints no line numbers, so the verse references are approximate, following the standard edition.
- **Lengthened the seven new excerpts that were under 10 verses** to 11-15 (at the user's request):
  Asinaria II.4 (`491-498` -> `491-503`, the full *Fortasse* refrain + Periphanes name-drop); Casina I
  (`89-96` -> `89-103`, the town/country slanging match + "go and be hanged"); Casina II sortitio
  (`357-364` -> `357-369`, adding Lysidamus's give-away slip *Casina ut uxor mihi daretur*); Casina III
  Pardalisca (`621-629` -> `621-633`, the *Perii!* volley); Truculentus I.1 (`22-30` -> `22-34`, the
  courtesan's *merces annua* / *bolus*); Truculentus II.2 (`256-263` -> `256-268`, the *truncum lentum*
  name-pun). Translations and analyses extended to match.
- **Replaced Casina V** (Olympio's wedding-night narration, only 8 clean verses before the play's text
  collapses into lacunae) with the clean Act V **forgiveness finale** (`vv. 998-1010`): the exposed old
  lecher blaming his lust on love and grovelling for pardon - the exact payoff to his Act II love-song.
- Cache-busting bumped to `?v=71`.

### Fixed
- **Truculentus proofread corrections (user):** fixed the citations on three excerpts and restored two
  editorial marks; the now-redundant "flagged for proofreading" line was dropped from the Phronesium
  analysis (cache `?v=70`):
  - II.5 (Phronesium): citation `447-460` -> **`448-460`**; restored the two em-dashes (`nimio -- minus`,
    `dolorem -- dolus`), moved `dolorem` onto its own verse (matching Splash Latino / The Latin Library),
    and put the conjectural `<nunc>` (v.458) back in angle brackets, now flagged in the analysis as an
    editor's fill.
  - III.2 (reformed Truculentus): citation `668-677` -> **`669-678`**; restored the angle-bracketed
    editorial supplements `<ego>` (v.674) and `qui<d metuam>?` (v.675), now noted in the analysis.
  - IV.3 (Callicles): citation `770-779` -> **`775-784`** (text unchanged).

### Notes
- **Asinaria** and **Casina** are well-preserved - self-proofread verbatim, no user proofread needed
  (Casina's verse *numbers* are the only approximation, now noted in-app). **Truculentus** is a
  notoriously lacunose play; the chosen windows sit in cleaner stretches, with a couple of editorial
  supplements accepted (`<ego>`, `<quid metuam>`, `<nunc>`) and one crux normalized. **The user has
  proofread all of Truculentus**, including this round's extension lines (I.1 vv. 31-34 and II.2 vv.
  264-268), and confirmed everything is correct. The extended Asinaria and Casina passages were
  self-proofread verbatim. The user also confirmed the new **Casina V** finale is preferable to the old
  (lacunose) Olympio-narration window it replaced. All three new comedies are now final.

## [1.2.2] - 2026-07-14

Makes the per-excerpt version badges clickable (a new version-list page), and adds release times to
the What's New log.

### Added
- **New page `version.html?v=<version>` + `js/version-list.js`.** Lists every practice excerpt of one
  app version, sorted alphabetically by author name, then by work/subject. For Cornelius Nepos (whose
  8 excerpts sit under the single work *De Viris Illustribus*) the sub-sort/label is the **character**,
  parsed from the citation (Alcibiades, Atticus, Cato, ...). Each row deep-links to that exact excerpt
  on the practice page. Prev/next arrows step between the versions that actually added excerpts (built
  from the distinct fragment `version`s, so no-content releases like 0.9.14 / 1.2.1 / 1.2.2 are skipped).
  The page has breadcrumbs (Home / What's New / v{X}) and the standard header/era menu; it is bilingual.
- **The excerpt version badges are now links.** In `js/practice.js` `makeVersionBadge` builds an `<a>`
  (was an inert `<div>`) pointing to `version.html?v=<that excerpt's version>` - so the red "NEW!" VIP
  banner opens the newest version's list and each papyrus "Added in v.X" tag opens its own version's
  list. `aria-hidden` dropped for an `aria-label`; `css/styles.css` restores `pointer-events` and adds a
  hover lift. Version-list page styles (`.version-nav`, `.version-item`, ...) added.
- **`?frag=<N>` deep-link on the practice page** (`js/practice.js`): a 1-based index into the current
  fragment pool, so the version-list rows can open a specific excerpt rather than always fragment 1.

### Changed
- **The What's New log now shows a release time** (24-hour) beside the date. Every entry in
  `js/changelog.js` gains a `time` (HH:MM) and `tz` field; `js/whatsnew.js` `dateLabel` passes them into
  the `whatsNew.released` template, now "Released {date}, {time} {tz}" (was a hardcoded "... CEST").
  Times are the git commit time that shipped each version (CEST for all historical releases); **v1.2.2 is
  stamped EEST** (author travelling in Greece).
- **Corrected six changelog dates.** The retroactively-documented entries 0.9.8-0.9.10 (dated 2026-06-19)
  were actually committed **2026-06-26**, and 0.9.11-0.9.13 were committed **2026-06-27**; their dates now
  match their real commits, so the What's New history reads in true chronological order.
- Cache-busting bumped to `?v=66`.

## [1.2.1] - 2026-07-09

Corrects the per-excerpt version tags and restyles the "NEW!" VIP banner.

### Changed
- **Corrected the `version` field on every Archaic-era practice fragment.** The version tracker was
  introduced in v1.2.0 and its back-fill script had tagged all pre-1.0.0 fragments as `1.0.0`, so their
  papyrus badges wrongly read "Added in v.1.0.0". Each fragment now carries the app version it was really
  first added in, traced through the release history: the 14 launch originals -> `0.1.0`; Naevius's Trojan
  wives -> `0.4.1`; the Plautus batches -> `0.6.0` (Mostellaria + Amphitruo), `0.6.2` (Aulularia), `0.8.0`
  (Miles Gloriosus), `0.8.1` (the 2 extra Pseudolus), `0.9.11`/`0.9.12`/`0.9.13` (Menaechmi), `0.9.15`
  (Bacchides); the Terence originals -> `0.9.0`-`0.9.5`; Caecilius +4 -> `0.9.6`; Cato +4 -> `0.9.7`;
  the split "big three" poets -> `0.9.8`; the remaining fragmentists -> `0.9.9`/`0.9.10`. 73 fragments
  re-tagged in `js/fragments.js`; Caesar's-Age fragments (`1.0.0`+) were already correct and are unchanged.
  The newest version site-wide is still `1.2.0`, so the VIP banner stays on the seven Nepos excerpts.
- **Restyled the red "NEW!" VIP banner** (`css/styles.css`): the cloth is now a brighter, more saturated
  red (`#f01818` -> `#e60f0f`) with the diagonal light/dark stripe overlay removed (flat bright red, no dark
  red); and the banner is nudged up (`top` 6px -> 4px) so its golden top roller touches the top edge of the
  excerpt card.
- Cache-busting bumped to `?v=64`.

## [1.2.0] - 2026-07-09

Cornelius Nepos grows from 1 practice fragment to 8 - the first author of the Caesar's-Age flesh-out.

### Added
- **7 new Cornelius Nepos fragments** from the *De Viris Illustribus* (verbatim Latin from The Latin
  Library, self-proofread; original Italian and English + analysis, with bilingual metadata). Ordered as
  in the book, Praefatio first:
  - **Praefatio 1-3** - the preface to Atticus defending his method (Greeks judged by Greek standards,
    *omnia maiorum institutis iudicari*).
  - **Themistocles IV.1-5** - the ruse that lured Xerxes into battle at Salamis.
  - **Alcibiades I.1-4** - the famous character sketch of nature's experiment in extremes.
  - **Pelopidas III.1-3** - the liberation of Thebes and Archias's *"in crastinum differo res severas."*
  - **Hannibal II.3-6** - the boyhood oath at the altar, *numquam me in amicitia cum Romanis fore.*
  - **Cato III.1-3** - Cato's *industria* and the *Origines* (a companion to our *De Agri Cultura* work).
  - **Atticus VI.1-3** - Atticus's principled neutrality, *neque se civilibus fluctibus committeret.*
- Nepos's `De Viris Illustribus` now has 8 fragments.
- **Per-excerpt version tracker** on the practice page. Every fragment in `js/fragments.js` now carries a
  `version` field (the app version it was first added in). On the practice card, a top-right badge shows
  it: a CSS-drawn **papyrus scroll** reading "Added in v.X" (text in the What's-New deep-red) for older
  excerpts, and a CSS-drawn red **"NEW!" VIP banner** (golden text) for the single newest version
  site-wide. The newest version is computed from the data (`practice.js`), so the VIP banner shifts to the
  next batch automatically on every future update; right now it marks the 7 new Nepos excerpts (v1.2.0).
  Adds `badge.addedIn` / `badge.new` i18n strings and the badge styles in `css/styles.css`.

### Changed
- **Fixed the Epaminondas citation** to the fuller form **"(De Viris Illustribus, Epaminondas IX.3-4,
  X.1-2)"**, now the citation style for all Nepos excerpts (chapter in Roman numerals, sections in arabic).
- Cache-busting bumped to `?v=63`.

## [1.1.5] - 2026-07-08

Cato the Elder's *De Agri Cultura* grows from 5 practice fragments to 10, plus a difficulty-chart tweak.

### Added
- **5 new Cato *De Agri Cultura* fragments** (verbatim Latin from The Latin Library + original Italian
  and English + analysis, with bilingual metadata):
  - **cap. 143** - the duties of the *vilica* (housekeeper), placed immediately after the *vilicus*
    (overseer) chapter it mirrors.
  - **cap. 38** - how to build and fire a lime-kiln (*fornax calcaria*).
  - **cap. 64** - how to bring in the olive harvest for good oil.
  - **cap. 76, 3-4** - the recipe for *placenta*, a layered cheese-and-honey cake.
  - **cap. 104** - the doctored winter wine brewed for the *familia* (household slaves).
  - The furnace and wine analyses tie back to the bio's "agricultural cheat-sheet" joke. Cato's
    `De Agri Cultura` now has 10 fragments.
- **Extended three Cato excerpts** (verbatim, self-proofread): the **villicus** (cap. 5) now includes the
  overseer's personal-conduct duties (no wandering, always sober, no rites except the Compitalia), so it
  matches the length of the villica chapter it pairs with; the **olive** excerpt (cap. 64) now runs the
  whole chapter, ending on drawing off the oil twice a day and getting it clear of the *amurca* and
  *fraces*; the **lime-kiln** (cap. 38) gains the good-white-stone, steep-flue and siting instructions.
  Translations and analyses extended to match.

### Changed
- **Cato's difficulty chart** (`js/ratings.js`): density lowered `1.6 -> 1.2` (now green - his prose is
  not dense) and lexicon raised `2.3 -> 2.4` (still yellow - vocabulary is the real hurdle). Syntax,
  style and the overall evaluation unchanged.
- Cache-busting bumped to `?v=61`.

## [1.1.4] - 2026-07-07

Two of the new Lucilius fragments gain extra verbatim lines (at the user's request; user-supplied text).

### Added
- **Concilium Deorum / Lupus** fragment, three added lines building the gluttony narrative:
  - the gods sizing up the culprit, **"quae facies, qui vultus viro? / vultus item ut facies, mors cetera,
    morbus, venenum"** (vv.43-44);
  - a god's plot to gorge him, **"ad cenam adducam, et primum hisce abdomina tunni / advenientibus priva
    dabo cephalaeaque acarnae"** (vv.49-50, tuna-bellies and acarna-heads);
  - the death-sentence punchline **"Occidunt, Lupe, saperdae te et iura siluri!"** (Varro, *de Lingua
    Latina* VI.47, a pun on *lupus* the sea-bass). Order follows sense, not verse-number.
- **Iter Siculum voyage** fragment, the food complaint:
  - **"ostrea nulla fuit, non purpura, nulla peloris / asparagi nulli"** (vv.127-8, no oysters/shellfish/
    asparagus);
  - **"nam mel regionibus illis / incrustatus calix rutai caulis habetur"** (a grimy cup and a stalk of
    rue pass for honey) and **"exhalas tum acidos ex pectore ructus"** (sour belches), from Charisius and
    Nonius. Analysis ties the wretched provincial food to Horace's gritty bread in *Satires* I.5.
- **An 8th Lucilius fragment** (his `Saturae` now has 8): **"publicanus vero ut Asiae fiam, ut
  scripturarius, / pro Lucilio, id ego nolo, et uno hoc non muto omnia"** (Book 26; Nonius 351,6 =
  Warmington frr. 650-1 = vv. 627-8 Terzaghi-Mariotti) - Lucilius's proud refusal to trade being a poet
  for the riches of a tax-farmer of Asia. Placed second, right after the manifesto (both Book 26,
  trochaic septenarii). Bilingual, user-supplied Latin, flagged for proofread.
- All lines sourced verbatim from Warmington *ROL* III (Books 1, 3 and 26); reassembled scattered
  fragments with gaps marked by ellipses. Flagged for the user's proofread.

### Changed
- **Proofread corrections (user)** to two Lucilius fragments: voyage now reads `susque et deque` (not
  `susque haec deque`) and is reordered to the standard edition's sequence (propempticon, then the
  mantica + *susque* block, then the road, then the food); a side-note on the Greek *αἰγίλιποι* added.
  Lupus: `amphitapi` -> `amphitapae` (agrees with *psilae*/*molles*; commonest transmitted reading), and
  the ellipsis style normalized (a standalone `...` for skipped lines rather than leading `...` glued to
  a verse).
- Cache-busting bumped to `?v=59`.

## [1.1.3] - 2026-07-07

Lucilius, the founder of Roman verse satire, grows from 1 practice fragment to 7.

### Added
- **6 new Lucilius practice fragments** (verbatim Latin + original Italian and English + analysis, with
  bilingual metadata). Sourced from Cicero and Pliny on The Latin Library and from Warmington's *Remains
  of Old Latin* vol. III (which reconstructs the fragments from Nonius, Servius, Gellius, Lactantius, etc.):
  - **The manifesto on his readers** (Book 26): *Manium Persium haec legere nolo, Iunium Congum volo*
    (Pliny, *NH* praef. 7; cf. Cicero *De Or.* II.25, *De Fin.* I.7).
  - **The Council of the Gods / Concilium Deorum** (Book 1): the gods condemning the gluttonous Lupus
    (Servius, Nonius) - the model for Seneca's *Apocolocyntosis*.
  - **The voyage / *Iter Siculum*** (Book 3): the first Roman journey-satire and the model for Horace,
    *Satires* I.5 (Nonius, Gellius XVI.9, Porphyrio, Probus).
  - **Albucius greeted in Greek**: *chaere, Tite!* (Cicero, *De Finibus* I.9).
  - **The myth parody** (Book 15): Homer's 200-foot Cyclops + the Lamiae bogeymen (Nonius; Lactantius,
    *Div. Inst.* I.22).
  - **Rome as a rat-race of greed** (Lactantius, *Div. Inst.* V.9).
- Lucilius's `Saturae` now has 7 fragments (the six above plus the existing *virtus* passage).

### Changed
- Cache-busting bumped to `?v=55`.

## [1.1.2] - 2026-07-07

Terence's practice bank doubles: two new fragments for each of his six comedies (3 -> 5 each, 12 new).

### Added
- **12 new Terence practice fragments** (verbatim Latin from The Latin Library + original Italian and
  English + analysis, with bilingual metadata). Two per comedy, inserted in line order:
  - *Andria*: the Act III "fake birth" scene (Simo dismisses Glycerium's real labour-cry as a trick,
    vv.471-480) and the Act V father-son reconciliation, Chremes closing with *pro peccato magno paullum
    supplici satis est patri* (vv.889-905).
  - *Eunuchus*: the **prologue** answering the *furtum* (plagiarism) charge (vv.23-34) and Thraso's
    mock-siege of Thais's house (vv.771-782).
  - *Phormio*: the **prologue** answering the "thin style" charge (vv.1-11) and *fortis fortuna adiuvat*
    (vv.201-206).
  - *Adelphoe*: the **prologue** answering the *contaminatio* + noble-help charges (vv.6-21) and the drunk
    slave Syrus's cookery-school parody, *tamquam in speculum in patinas* (canonical vv.428-434).
  - *Hecyra*: Syra's cynical opening advice to a courtesan (vv.58-70) and Bacchis's Act V
    honour-over-profit monologue (vv.833-840).
  - *Heautontimorumenos*: Menedemus's self-torment confession *immo habui* (vv.93-101) and Clitipho on
    the injustice of fathers (vv.213-219).
- Each comedy now has 5 practice fragments; Terence's practice bank goes from 18 to 30.

### Changed
- Cache-busting bumped to `?v=54`.

## [1.1.1] - 2026-07-06

Caecilius Statius gains three more practice fragments: two for the *Plocium* and one for his
"other plays".

### Added
- **3 new Caecilius Statius practice fragments** (verbatim Latin + original Italian and English +
  analysis, with bilingual metadata):
  - *Plocium*: **"Vivas ut possis, quando nec quis ut velis"** (preserved by Donatus, *Commentum ad
    Andriam* IV.5) and **"Placere occepit graviter, postquam emortuast"** (preserved by Nonius
    Marcellus 314,21). The *Plocium* now has 5 fragments.
  - *Incertae fabulae*: **"Saepe est etiam sub palliolo sordido sapientia"** (Cicero, *Tusculanae
    Disputationes* III.56, via The Latin Library). The "Other plays" work now has 3 fragments.

### Changed
- Cache-busting bumped to `?v=53`.

### Fixed
- Corrected the word counts in two of the new analyses: the *Plocium* "Vivas ut possis..." note now
  says **eight** words (not six), and the "Saepe est etiam sub palliolo sordido sapientia" note now
  says **seven** (not eight), in both English and Italian.

## [1.1.0] - 2026-07-05

Varro grows from one practice fragment to eleven, across his three surviving works, with a
pick-a-work chooser.

### Added
- **Varro now has a work chooser** (like Plautus and Terence): the "Practice translation" button opens
  a menu of his three works, each with its own fragments - *De Re Rustica* (5), *De Lingua Latina* (3),
  *Saturae Menippeae* (3), 11 in all. `marcus-terentius-varro` is now `needsSelection: true`.
- **10 new bilingual Varro fragments** (verbatim Latin + original Italian and English + analysis):
  - *De Re Rustica*: Italy praised as one great orchard (I.2), the ancestors ranking country above
    city (II praef.), the three branches of villa husbandry (III.3), and bees as a little republic
    (III.16) - alongside the existing dedication (I.1).
  - *De Lingua Latina*: the five kinds of land and their etymologies (V.33), why a month is *mensis*
    (VI.10), and the analogy-vs-usage debate (VIII.26).
  - *Saturae Menippeae* (Menippean satires, preserved by Gellius): a wife's fault "removed or endured"
    (NA I.17), and two pieces of the dinner-party satire *Nescis quid vesper serus vehat* - how many
    guests, and the four ingredients of a perfect dinner (NA XIII.11).

### Changed
- **Fixed the English author-grid label**: it now reads "Authors of Caesar's Age" (the stray "the" is
  dropped for possessive era names; "Authors of the Archaic Era" is unchanged).
- The work-chooser heading is now per-author (`selectHeadingIt` in `js/fragments.js`, read by
  `js/select.js`), so Varro's reads "Choose a work by Varro" / "Scegli un'opera di Varrone" rather
  than the comedy-specific wording kept for Plautus/Terence.
- The chooser page's English footer now reads "Pick a work, then practise translating its fragments"
  (was "Pick a comedy or text..."), mirroring the Italian's "un'opera".
- Cache version bumped v47 → v51 (Varro fragment extensions + this wording tweak).

## [1.0.2] - 2026-07-01

Small additions: portrait honesty notes.

### Added
- **Portrait notes** beside the author image, in the space to the right of the heading, flagging when
  a likeness is invented or uncertain (bilingual EN/IT, driven by `IMAGE_NOTE` in `js/data.js`):
  - Entirely fictional, no ancient bust survives: Livius Andronicus, Naevius, Ennius, Plautus, Terence.
  - Entirely fictional, probably no accurate bust/sculpture exists: Varro, Nepos, Hortensius.
  - May not be accurate, hard to trace: Pacuvius & Accius, Pomponius & Novius, Hirtius.
  - Lucretius: a fictional illustration chosen over the real bust (which exists, but the illustration
    is nicer).
  - Figulus's existing Pythagoras note joins the set.

### Changed
- The portrait note is now its **own column filling the empty space on the right** of the hero (in
  v1.0.1 it had briefly sat under the heading), so the portrait and heading keep their usual size; on
  narrow screens it wraps below.
- Cache version bumped v46 → v47.

## [1.0.1] - 2026-07-01

Fixes and refinements to Caesar's Age, from a user review pass.

### Added
- Caesar's *De Bello Gallico* VI is now **two separate practice fragments** - VI.13 (the druids'
  judicial power) and VI.14 (oral learning and the transmigration of souls) - each with a longer,
  grammar-focused analysis. Caesar now has 3 fragments.
- Hirtius's *Bellum Alexandrinum* is likewise **split into two fragments** (chapters 1 and 2), each
  with a longer analysis. Hirtius now has 3 fragments.
- A grey **"Not Assessable (NA)"** evaluation badge (`not-assessable` in `js/ratings.js`) for authors
  with no rankable surviving text; Hortensius and Figulus now show it (and still no difficulty chart).
- A portrait caption (`.portrait-note`, via `IMAGE_NOTE` in `js/data.js`) noting that Figulus's image
  is Pythagoras, since no likeness of Nigidius survives.

### Changed
- **Varro** excerpt: restored the full invocation of the twelve Consentes gods (Latin + Italian +
  English), which had been truncated after Jupiter and Tellus.
- **Sallust** *Bellum Iugurthinum* 85: restored the full Latin (it had been cut to the final section
  only); the *De Coniuratione Catilinae* citation now reads "5.1-8" (section 9 is omitted).
- **Nepos** difficulty chart: style and density lowered into the green (plain prose, no tricks);
  lexicon and syntax kept a low yellow.
- **Lucretius** difficulty chart: lexicon raised to the maximum (Complex) for its technical/archaic
  vocabulary, old Greek names (*Iphianassa*), and coined words.
- **Sallust** overall-difficulty badge is now purple; its Italian label is "IN BOCCA AL LUPO".
- **Cicero** *In Catilinam*: the Italian of "O tempora, o mores!" is now "Che tempi, che costumi!".
- **Catullus** carmina citations now name the collection - "Liber, Carmen 3 / 101 / 64, vv.1-7"
  (singular *Carmen*); the author page no longer duplicates the three carmina (they had rendered
  inside the style section as well as on the practice page).
- Replaced the Caesar and Hortensius portraits with re-cropped versions (`.jpeg`->`.jpg`,
  `.jpg`->`.png`; `IMAGE_LOOKUP` updated).
- The Figulus portrait caption moved into the heading column (with the name/dates/badge), so the
  portrait keeps its normal size and the entry matches the layout of every other author page.
- Cache version bumped v44 → v46.

## [1.0.0] - 2026-06-30

Caesar's Age goes live - the app's second era, and the milestone v1.0.0 release that the
v1.0.0 version number was being held back for.

### Added
- **Caesar's Age (100-44 BC)** is now a fully browsable era: an era intro, a 10-author grid, and
  per-author profiles (biography, main works, style & difficulty, plus the difficulty bar chart and
  overall evaluation). Authors and their ratings: Marcus Terentius Varro (Manageable), Cornelius
  Nepos (Good Exercise), Quintus Hortensius Hortalus (NC - no chart), Publius Nigidius Figulus
  (NC - no chart), Marcus Tullius Cicero (Very Difficult), Gaius Julius Caesar (Good Exercise),
  Aulus Hirtius (Manageable), Titus Lucretius Carus (Very Difficult), Gaius Sallustius Crispus
  (START PRAYING, BOY), Gaius Valerius Catullus (Manageable).
- **17 practice fragments** across the 10 authors, each fully bilingual (verbatim Latin + original
  Italian + original English + analysis, with Italian title/description/analysis): Varro 1 (*De Re
  Rustica* I.1), Nepos 1 (Epaminondas), Hortensius 1 (Cicero, *Brutus* 6), Figulus 1 (Gellius,
  *Noctes Atticae* X.9), Cicero 3 (*In Catilinam* I.1-2; *Ad Atticum* I.16; *De Amicitia* 20),
  Caesar 2 (*De Bello Gallico* VI.13-14, the Druids; *De Bello Civili* I.7, the Rubicon speech),
  Hirtius 2 (*De Bello Gallico* VIII praef.; *Bellum Alexandrinum* 1-2), Lucretius 1 (*De Rerum
  Natura* I.80-101, Iphigenia), Sallust 2 (*De Coniuratione Catilinae* 5; *Bellum Iugurthinum* 85,
  Marius), Catullus 3 (carmina 3, 101, 64.1-7).
- `js/data.js` is now **era-aware**: an `ERA_CONFIG` registry drives the per-era markdown file,
  image folder (`images_caesar/`), and slug→portrait lookup; `getEra`/`getAuthors`/`getAuthor`
  work for any configured era. `js/home.js` renders any *available* era (not just Archaic).
- Per-author ratings for the 8 rankable Caesar authors added to `js/ratings.js`. The two NC authors
  (Hortensius, Figulus) deliberately have no rating entry, so their profiles show no chart or badge.

### Changed
- Tier-list language is scrubbed from the displayed Caesar prose exactly as for the Archaic era.
  The scrubber (`scrubRanking`/`scrubRankingIt`) was improved to also drop the parenthetical gloss
  after a score callout, tidy the orphaned punctuation that leaves behind, and stop skipping
  paragraphs that merely open with `**bold:**` or `*italic*` (so `NC`/score sentences in those
  paragraphs are now removed too). Benefits both eras.
- `js/content.js` now embeds **both** era drafts (`__ARCHAIC_MD__` + `__CAESAR_MD__`) for the
  offline `file://` fallback; `build_content_it.js` + `js/content-it.js` now cover both eras.
- Author dates display with a single dash ("106-43 BC") regardless of the draft's dash style.
- The Figulus portrait is Pythagoras (no ancient likeness of Nigidius survives; he tried to revive
  the Pythagorean tradition) - noted in `js/data.js`.
- Cache version bumped v41 → v44.

## [0.9.15] - 2026-06-29

### Added
- **Bacchides** added to the Plautus chooser as the seventh comedy (3 fragments, Latin from The
  Latin Library; "Le Bacchidi" in Italian mode), each fully bilingual:
  - Act I, Sc. 1 (vv. 44-77) - the opening scene: the two Bacchis sisters set their trap for
    Pistoclerus. Analysis highlights the sisters as malicious, unscrupulous and seductive, and the
    cluster of metaphors (bird-lime / one dove, the bacchae pun, "mala bestia", the barbed-words
    tricolon, and the palaestra catalogue ending in "scortum pro scuto"). It runs through the
    sister's intervention ("Malacissandus es") to Bacchis's demand for an embrace when the soldier
    comes. Trimmed from the full vv. 35-93 to ~33 continuous lines (proofread against Splash Latino;
    tilde kept at v.51 to mark the metrical pause; two editorially suspect lines retained).
  - Act IV, Sc. 9 (vv. 925-945) - Chrysalus's mock-epic "Troy" canticum (the letter-tablets as the
    wooden horse, the old man renamed Ilium, the arx/arca pun), abridged with [...].
  - Act V, Sc. 2 (vv. 1121-1151) - the finale: the sisters mock the two old fathers as "sheep" and
    coolly split them to lure them inside, abridged with [...].
- A v0.9.15 entry in the in-app "What's New" scroll.

### Changed
- **Fixed the author portraits.** The archaic-era images had been moved from `images/` to
  `images_archaic/`, so the author cards and profile pages were falling back to the orange
  initials placeholder. `js/data.js` now resolves portraits from `images_archaic/` (via a new
  `IMAGE_DIR` constant), and that folder is committed; the obsolete `images/` copies are removed.
- Cache version bumped v39 → v41.

## [0.9.14] - 2026-06-29

The site gains its first in-app, reader-friendly changelog. (v1.0.0 is being held back to mark the
launch of Caesar's Age.)

### Added
- **"What's New" parchment panel** on the home page. A CSS-drawn parchment scroll (warm aged
  texture + wooden roller caps, no image assets) fills the previously empty band beside the
  Archaic-era intro on desktop and stacks below it on narrow screens. It features the current
  release: title, version, then Added / Changed / Deleted in that fixed order (with a
  "Nothing was added/changed/deleted." fallback), and the release date as DD/MM/YYYY CEST.
- **Full version history modal** behind a "See previous versions" button: a scrollable parchment
  sheet listing every release from the current one back to v0.1.0, each rewritten in plain, friendly,
  non-technical language. Closes via the × button, a backdrop click, or the Esc key.
- Both the panel and the modal are fully bilingual (EN/IT) and follow the flag toggle.
- New `js/changelog.js` (bilingual version data) and `js/whatsnew.js` (renders the panel + modal);
  new `whatsNew.*` strings added to `js/i18n.js`.

### Changed
- The home page now wraps the era intro and the new scroll in a two-column layout on desktop
  (`.home-two-column`, switching to a single column below 880px); the author grid stays full-width
  below. The existing 560px breakpoint is untouched.
- Cache version bumped v37 → v39.

## [0.9.13] - 2026-06-19

### Added
- Re-added the **Menaechmi** Act V, Sc. 2 feigned-madness scene (vv. 829-852) as a 4th fragment, so
  it sits right after the V.1 quarrel it continues: the wife fetches her father, and the cornered
  visiting twin escalates to feigned divine possession, turning Bacchus and Apollo into punch-lines
  (Apollo "orders" him to burn out the wife's eyes). Menaechmi now has 4 fragments. The analysis
  cross-references the V.1 scene. Cache version bumped v36 → v37.

## [0.9.12] - 2026-06-19

### Changed
- Replaced the third **Menaechmi** fragment: swapped the Act V.2 feigned-madness scene for the
  Act V, Sc. 1 quarrel (vv. 701-752, abridged with [...]) - the scene originally intended. The
  resident Menaechmus's wife mistakes his visiting twin for her husband and rails at him over the
  stolen mantle, while he, a baffled stranger, answers with mythological jabs: Hecuba the abuse-
  hurling "dog", and knowing her and her father "as well as Porthaon / Calchas" (i.e. not at all).
  A purer example of the look-alike confusion and of Plautine mythology-as-punchline. Fully bilingual.
- Cache version bumped v35 → v36.

## [0.9.11] - 2026-06-19

### Added
- **Menaechmi** added to the Plautus chooser as the sixth comedy, with 3 practice fragments (Latin
  from The Latin Library), each fully bilingual ("Menecmi" in Italian mode):
  - Prologue (vv. 17-28) - the premise: identical twin boys so alike not even their mother could
    tell them apart, the setup for the whole mistaken-identity machine (Shakespeare's Comedy of Errors).
  - Act I, Sc. 1 (vv. 77-95) - the parasite Peniculus on why food, not chains, is the surest way to
    keep a man from running off ("tie his snout to a full table").
  - Act V, Sc. 2 (vv. 829-852) - the long set-piece: the traveling twin, cornered by his brother's
    wife and her father who take him for the husband, feigns madness, turning Bacchus and Apollo into
    punch-lines (Apollo "orders" him to burn out the wife's eyes). Showcases Plautine style and
    mythological references turned into jokes; one textually corrupt line is omitted, marked [...].
- Cache version bumped v34 → v35.

## [0.9.10] - 2026-06-19

### Added
- **Pomponius** gains a 3rd fragment, bringing every Archaic author to 3 (except where corpus is
  thinner): the *Kalendae Martiae* line "Vocem deducas oportet, ut mulieris videantur" - a man
  coached to soften his voice to pass for a woman, fitting a farce named for the Matronalia
  (the women's festival). Preserved by Macrobius (*Saturnalia* VI.4), text from the LacusCurtius
  edition; fully bilingual with original IT + EN, analysis, and IT metadata.
- Cache version bumped v33 → v34.

## [0.9.9] - 2026-06-19

### Added
- **The remaining lesser-known fragmentists** expanded (Latin from The Latin Library unless noted):
  - **Pacuvius** now has 3: Niptra (existing) + two from the *Chryses* (both in Cicero, *De Div.*
    I.131) - the rationalist mockery of bird-diviners ("magis audiendum quam auscultandum") and the
    grand cosmic-principle fragment ("Quidquid est hoc, omnia animat... omniumque idemst pater").
  - **Accius** now has 3: Atreus (existing, "oderint dum metuant") + two from the *Brutus*
    (Cicero, *De Div.* I.44-45) - Tarquinius Superbus's dream (the sun reversing course) and the
    soothsayer's reply foretelling the king's fall and "rem Romanam publicam summam fore".
  - **Novius** now has 3: Maccus Exul (existing) + two Atellan jokes Cicero quotes in *De Oratore*
    II - the gallows-humour "Mirum ni cantem: condemnatus sum" (II.279) and the Stoic-puncturing
    "sapiens si algebis, tremes" (II.285).
  - **Pomponius** now has 2: Fullones (existing) + the *Galli Transalpini* soldier's vow to Mars
    ("Mars, tibi voveo facturum, si unquam rediero, bidente verre"), preserved by Macrobius
    (*Saturnalia* VI.9), text from the LacusCurtius edition.
- Each new fragment is fully bilingual (original IT + EN, analysis, IT metadata) with source.
- Cache version bumped v32 → v33. **This completes the Archaic Era practice bank.**

## [0.9.8] - 2026-06-19

### Added
- **The "big three" archaic poets** now have 3 fragments each (Latin from The Latin Library):
  - **Livius Andronicus** - the bundled Odusia entry was split into its two separate verses
    (the Odyssey opening "Virum mihi, Camena, insece versutum"; the Charybdis fear "Igitur demum
    Ulixi cor frixit prae pavore"), and a third added: the "Morta" line on fated death
    (in Gellius, NA III.16.11).
  - **Gnaeus Naevius** - added the **Malta raid** (Bellum Poenicum fr. 40): the Roman army crosses
    to Malta and burns, plunders, lays waste, "rem hostium concinnat" (3 lines). Joins the
    Trojan-wives fragment and the self-epitaph.
  - **Quintus Ennius** - the bundled Annales entry was split into the Cunctator fragment (Book IX)
    and the Rudiae self-portrait (Book XVIII), and **Ilia's dream** (Annales Book I, 17 lines,
    quoted by Cicero in De Divinatione I.40-41) was added as the centrepiece.
- Each new fragment is fully bilingual (original IT + EN, analysis, IT metadata) with source.
- Cache version bumped v31 → v32.

### Notes
- The Naevius Malta fragment is numbered **40** on the source (The Latin Library, matching the
  existing "fr. 8" numbering); it appears as **fr. 32** in some editions. Flagged in the analysis.

## [0.9.7] - 2026-06-19

### Added
- **Cato the Elder** expanded from 1 *De Agri Cultura* fragment to **5**, chosen to show the range
  of his philosophy and his terse, imperative style (Latin from The Latin Library):
  - **cap. 1** - how to choose a farm: don't buy in haste, inspect repeatedly, judge by the
    neighbors, and buy land whose former owners regret selling ("eos pigeat vendidisse").
  - **cap. 5** - the duties of the overseer (vilicus): discipline, keep the holidays, a household
    neither cold nor hungry but kept hard at work; accountability flows down to the master.
  - **cap. 141** - the **suovetaurilia**: the field-lustration prayer to Mars (pig, sheep, bull led
    around the land), one of the oldest Roman prayers, in full carmen style with archaic forms
    (sies, prohibessis, averruncesque, duonam).
  - **cap. 156** - in praise of cabbage: Cato's wonder-drug, complete with the ancient
    eat-cabbage-before-the-party hangover hack.
  - Each new fragment is fully bilingual (original IT + EN, short analysis, IT metadata) with source.
- Cache version bumped v30 → v31.

## [0.9.6] - 2026-06-19

### Added
- **Caecilius Statius** expanded from 1 fragment to 5, across both chooser entries:
  - **Plocium** now has all **3** passages Gellius quotes side by side with Menander's original in
    *Noctes Atticae* II.23: the husband's monologue on his rich wife (§10, already present, citation
    tightened); the "fasting-breath kiss" dialogue, where the wife kisses him to smell whether he has
    been drinking (§13); and the slave's lines on how a poor man's troubles cannot be hidden (§21).
  - **"Other plays"** (was an empty "Other") now has **2** fragments from his other comedies, both
    preserved by Cicero: Caecilius's grimmest lines on old age (*De Senectute* 25, which Cicero quotes
    in order to refute), and the famous *Synephebi* line "serit arbores, quae alteri saeclo prosint"
    ("he plants trees for another age", *Tusculanae* I.31). The work is relabelled "Other plays" /
    "Altre commedie" so it appears in the chooser (empty works are hidden).
  - Each new fragment is fully bilingual (original IT + EN, short analysis, IT metadata) and records
    its source. A through-line surfaces across the set: we have Caecilius almost only because Gellius
    and Cicero quoted him to disagree with him.
- Cache version bumped v29 → v30.

## [0.9.5] - 2026-06-18

### Added
- **Adelphoe** added to the Terence chooser with 3 practice fragments (Latin from The Latin
  Library), each fully bilingual. This completes Terence: all 6 comedies now have 3 fragments each.
  - Act I, Sc. 1 (vv. 64-77) - Micio's lenient-fatherhood philosophy: bind a son with affection,
    not fear ("hoc pater ac dominus interest"). The play's thesis and a manifesto of humanitas.
  - Act I, Sc. 2 (vv. 112-121) - the strict-vs-lenient clash: Demea storms in over Aeschinus's
    latest outrage and Micio coolly defends ("siquid peccat, mihi peccat ... de meo").
  - Act V, Sc. 4 (vv. 866-879) - Demea's volte-face soliloquy: the six-adjective self-portrait
    ("ego ille agrestis saeuos tristis parcus truculentus tenax") and the turn to charm
    ("age age nunc porro experiamur contra"); trochaic septenarii.
- Cache version bumped v28 → v29.

### Notes
- The Adelphoe source page (`ter.adel.html`) has no line numbers and no inline act/scene markers.
  The verse numbers were derived from canonical numbering (anchored on Micio's monologue, vv. 26-81,
  so Act I Scene 2 begins at v. 82, and Demea's soliloquy at v. 855). A stray transcription artifact
  in the source (a leading "o " on v. 65, "o et errat longe...") was normalized to "et errat longe...".
  All Adelphoe Latin is flagged for the user's final proofread against a printed edition.

## [0.9.4] - 2026-06-18

### Added
- **Phormio** added to the Terence chooser with 3 practice fragments (Latin verified against The
  Latin Library), each fully bilingual:
  - Act II, Sc. 4 (vv. 447-459) - the council of legal advisors: "quot homines tot sententiae".
  - Act III, Sc. 2 (vv. 317-328) - the parasite Phormio psyching himself up for the con.
  - Act V, Sc. 9 (vv. 1040-1055) - the triumphant finale: Nausistrata learns of Chremes's second
    wife ("one girlfriend for the son, two wives for the father").
- Cache version bumped v27 → v28.

## [0.9.3] - 2026-06-18

### Added
- **Eunuchus** added to the Terence chooser with 3 practice fragments (Latin verified against The
  Latin Library), each fully bilingual:
  - Act II, Sc. 2 (vv. 247-254) - Gnatho the parasite's manifesto on the art of flattery (the
    "Gnathonici").
  - Act IV, Sc. 5 (vv. 727-732) - the tipsy Chremes: "sine Cerere et Libero friget Venus".
  - Act V, Sc. 9 (vv. 1084-1094) - the cynical finale: keeping the braggart Thraso around to
    fleece him, ending on "plaudite".
- Cache version bumped v26 → v27.

## [0.9.2] - 2026-06-18

### Added
- **Heautontimorumenos** gains 2 more practice fragments (now 3), joining the migrated "homo sum"
  exchange (Latin verified against The Latin Library), each fully bilingual:
  - Act IV, Sc. 2 (vv. 668-678) - the clever slave Syrus thinking up a new scheme out loud:
    "nil tam difficilest quin quaerendo investigari possiet".
  - Act V, Sc. 1 (vv. 915-923) - the great reversal: Menedemus hands Chremes's own wisdom back
    ("foris sapere, tibi non posse te auxiliarier"), paying off the "homo sum" scene.
- Cache version bumped v25 → v26.

## [0.9.1] - 2026-06-18

### Added
- **Hecyra** added to the Terence chooser with 3 practice fragments (Latin verified against The
  Latin Library), each with original Italian + English, a short analysis, and full Italian metadata:
  - Prologue (vv. 33-45) - Ambivius Turpio on the play's twice-failed premieres (boxers, a
    tightrope-walker, then a rumour of gladiators emptied the seats).
  - Act IV, Sc. 2 (vv. 585-595) - Sostrata, the blameless mother-in-law, offers to retire to the
    country so her daughter-in-law can return.
  - Act V, Sc. 1 (vv. 750-760) - Bacchis the courtesan's noble oath that untangles the plot.
- Cache version bumped v24 → v25.

## [0.9.0] - 2026-06-18

### Added
- Began **Terence**: **Andria** added to the Terence chooser with 3 practice fragments across
  acts (Latin verified against The Latin Library), each with original Italian + English, a short
  analysis, and full Italian metadata:
  - Act I, Sc. 1 (vv. 115-126) - the funeral narration ending in "hinc illae lacrumae".
  - Act I, Sc. 2 (vv. 185-195) - the Simo/Davus duel: "Davus sum, non Oedipus".
  - Act III, Sc. 3 (vv. 550-555) - "amantium irae amoris integratiost".
  The Terence comedies in the chooser are now ordered chronologically.
- Cache version bumped v23 → v24.

## [0.8.4] - 2026-06-18

### Changed
- Shortened the Italian comedy-chooser heading for Plautus and Terence to use the short author
  name: "Scegli una commedia di **Plauto**" and "...di **Terenzio**" (instead of the full
  "Tito Maccio Plauto" / "Publio Terenzio Afro - Terenzio"). Caecilius is unchanged. Cache v22 → v23.

## [0.8.3] - 2026-06-18

### Changed
- The comedy-chooser heading now references "comedy" for all three comedy authors (Plautus,
  Caecilius, Terence): English **"Choose a comedy by [Author]"** (Caecilius previously read
  "...a text by...") and Italian **"Scegli una commedia di [Autore]"** (previously "Scegli un
  testo di..."). Cache v21 → v22.

## [0.8.2] - 2026-06-18

### Changed
- Proofread fix (Miles Gloriosus I.i, v. 8): restored the line as transmitted,
  "quae misera gestit ~ et fartem facere ex hostibus", and reframed the analysis note (EN + IT)
  to explain that the tilde marks a pause kept for the rhythm of the metre, not a textual error.
  Cache v20 → v21.

## [0.8.1] - 2026-06-18

### Added
- **Pseudolus** gains 2 more practice fragments (now 3), spread across the play (Latin verified
  against The Latin Library), each with original Italian + English, a short analysis, and full
  Italian metadata:
  - Act I, Sc. 3 (vv. 357-369) - the famous insult-litany: Calidorus and Pseudolus pelt the pimp
    Ballio with abuse and he gleefully tops every one ("Sacrilege!" "I confess.").
  - Act V, Sc. 2 (vv. 1293-1306) - the drunken finale: Pseudolus reels in garlanded and belches
    in old Simo's face.
- Cache version bumped v19 → v20.

## [0.8.0] - 2026-06-18

### Added
- **Miles Gloriosus** added to the Plautus chooser with 3 practice fragments spread across the
  play (Latin verified against The Latin Library), each with original Italian + English
  translations, a short analysis, and full Italian metadata:
  - Act I, Sc. 1 (vv. 1-18) - the braggart Pyrgopolynices and his flatterer Artotrogus (the
    shield brighter than the sun; legions blown away "like wind through leaves"; the fantasy
    general Bumbomachides Clutomistaridysarchides).
  - Act III, Sc. 1 (vv. 678-689) - Periplectomenus's comic defence of bachelorhood
    ("liberae sunt aedis, liber sum").
  - Act V, Sc. 1 (vv. 1424-1437) - the humiliating finale (the `carebis testibus` castration
    pun and the closing moral, ending on `plaudite`).
  - The title "Miles Gloriosus" is kept untranslated in Italian (as agreed for that one).
- Cache version bumped v18 → v19.

## [0.7.6] - 2026-06-18

### Fixed
- Corrected a source typo in the Caecilius biography: "si sette' a confrontare" →
  "si sedette a confrontare" (Gellius sat down to compare the *Plocium* with Menander).
  Regenerated `js/content-it.js`; cache v17 → v18.

## [0.7.5] - 2026-06-18

### Changed
- **Italian accent normalization.** Converted the apostrophe-style accents (a trailing
  apostrophe standing in for a final accent) to proper accented letters throughout the
  displayed Italian: `e'` → è, `perche'` → perché, `virtu'` → virtù, `citta'` → città,
  `piu'` → più, and the many passato-remoto verbs (`mando'` → mandò, morì, continuò, ...).
  Applied to the practice-fragment Italian fields (excerpt translation / title /
  description / analysis) and to the author biography / works / style + era intro. Latin
  text and quotations (e.g. `*usu'*`, `*opu'*`), English text, elisions (`l'`, `d'`,
  `cos'è`) and truncated imperatives (`fa'`, `va'`, `po'`) are left unchanged. The
  normalization is built into `build_content_it.js`, so future regenerations of
  `js/content-it.js` stay accented.
- Cache version bumped v16 → v17.

### Notes
- One source phrase ("si sette' a confrontare", in the Caecilius bio) looks like a typo
  for "si sedé / sedette" and was left unchanged pending confirmation.
- The working file `italian_translations_archaic.md` keeps its apostrophe style; the
  accents are applied when the embedded `content-it.js` is generated from it.

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
