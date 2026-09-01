# Changelog

All notable changes to this project are documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
with simple date-based entries. The app is plain HTML/CSS/vanilla JavaScript with
no build step and no dependencies.

## [1.9.4] - 2026-08-31

**THE PHILOSOPHICAL GROUP IS CLOSED, +6.** De Fato 3 (new work), De Re Publica 4 -> 5, Somnium
Scipionis 4 -> 5, Paradoxa Stoicorum 2 -> 3. Philosophical **10 works / 48**; Cicero **190 across 33
works**; bank **350**. De Fato sits in PHIL_ORDER straight after De Divinatione, whose sequel it is.

### Added
- **De Fato 10-11** Stilpo, and **Zopyrus the physiognomist telling Socrates he is stupid, dull and a
  womaniser** while Alcibiades laughs. Ends on the thesis of the whole book: ***non est id positum in
  naturalibus causis, sed in voluntate, studio, disciplina***. The sequel (Socrates conceding the
  diagnosis and claiming he beat it by reason) is at *Tusc.* IV.80 and is quoted in the analysis.
- **De Fato 28-30** the ***ignava ratio***, the lazy argument, and Chrysippus' answer: some things are
  *simplicia*, some *confatalia*. Milo cannot wrestle without an opponent, and ***tam enim est fatale
  medicum adhibere quam convalescere***. **Carries the Machiavelli cross-reference the user asked
  for**: *Il Principe* XXV opens with the same objection and answers it in the same shape, though
  Chrysippus defends total determinism while Machiavelli denies fortune is total. Trimmed, `[...]`.
- **De Fato 42-43** **the cylinder**, the most influential image in the free-will argument.
  *Volubilitas* - rollability - is the word Cicero has to build: the push is the *visum*, the rolling
  is *adsensio*, and the shape is yours. The quotation runs to its close so Chrysippus' own
  qualification (everything still happens *fato*) is inside the excerpt.
- **De Re Publica II.5-7** Romulus siting Rome away from the sea, and ***inportantur non merces solum
  adventiciae sed etiam mores***. Cross-links to **Cato the Elder**, whose *De Agri Cultura* preface
  is the same ideology. Trimmed, `[...]`, dropping the military half at section 6.
- **De Re Publica VI.15** ***nec iniussu eius ... ex hominum vita migrandum est***. The direct pair to
  **Tusculanae I.74**, twelve years later and in Cicero's own voice, and one of the routes by which
  the classical ban on suicide reached Christian Europe, through Macrobius.
- **Paradoxa Stoicorum 42-43** the sixth paradox, ***Animus oportet tuus se iudicet divitem***. Nine
  questions in a row; the same relocation of a word that **Paradoxa 34** performs on *libertas*.

### Changed
- **`caesar_era_draft.md`: De Fato added to the Main Works bibliography**, where it had been missing.
  Mirrored in `italian_translations_caesar.md` and regenerated with `node build_content_it.js`.
- **NEW `build_content.js`, and js/content.js was 2759 characters stale.** Over http the app fetches
  the era drafts live and `js/content.js` is only the `file://` fallback, so it is invisible during
  browser testing and had silently missed the v1.8.3 four-way split of Cicero's Main Works.
  `__ARCHAIC_MD__` was still byte-identical to its draft, `__CAESAR_MD__` was not. There was a
  generator for the Italian side (`build_content_it.js`) and none for the English; there is now.
  **Run it after editing any `*_era_draft.md`.**
- **Accuracy pass over all 8 pre-existing fragments of the touched works** (De Re Publica 4, Somnium
  4). Nothing needed changing this time.

### Notes on the source
- **`fato` has no non-ASCII characters at all**: the page transliterates its Greek into Latin letters
  (*Peri Dynaton*, *Logike*, *Argos Logos*), so unlike `paradoxa` there is no mojibake to route
  around. Markers are `[n]` and spans are free.
- **The Paradoxa excerpt still starts after a mojibake line.** The Greek running head of Paradox VI
  prints as *ÜOti mÒnow ... ploÊsiow*; the extract begins at *Quae est ista* and never touches it.
- **De Re Publica prints round-bracketed section numbers**, `(5)`, which `normalise()` has stripped
  since v1.9.0. The natural-law passage III.33 and the Ennius *moribus antiquis* of V.1 are **not on
  The Latin Library at all** - it prints only the palimpsest, so the sections quoted by Lactantius
  and Augustine are simply absent. That is why the fifth excerpt comes from book II.
- **Kept and flagged:** *quoi* for *cui* (Parad. 42), *inprimet* (Fat. 43), and the source's unclosed
  single dash at *-obstructas eas partes* (Fat. 10). **No emendations in this release.**

Verification: **191 verbatim, 0 mismatched**; `lint_translations.js` **318 checked, 3 to look at**
(the same three documented in the tool's header). Cache-bust: `?v=109` -> `?v=110`.

## [1.10.2] - 2026-08-31

**THE RHETORICAL GROUP IS FINISHED, AND SO IS CICERO, +7.** De Oratore 5 -> 8, Brutus 3 -> 5,
Orator 3 -> 5. Rhetorical **23 across 5 works**; **Cicero 213 across 38 works** (Speeches 116 /
Letters 26 / Philosophical 48 / Rhetorical 23); bank **373**. Cicero is now **more than a third of
the whole app**.

### Added - De Oratore
- **I.19-20** ***nemo poterit esse omni laude cumulatus orator, nisi erit omnium rerum magnarum atque
  artium scientiam consecutus***, with *ex rerum cognitione efflorescat et redundet oportet oratio* and
  the one-word diagnosis of the alternative, *puerilis*. The thesis Antonius spends book II disputing.
  Needs a **`fix`** to delete the bracketed chapter numeral `[VI]` falling mid-fragment.
- **II.62-63** the laws of history: ***ne quid falsi dicere audeat ... ne quid veri non audeat***, plus
  *gratia* and *simultas*, the two conflicts of interest. **The verb in both laws is *audere***, which
  makes honesty a matter of nerve. Pairs with **II.35-36**, a page earlier in the same speech.
- **III.155-156** metaphor as *inopia* turned into *delectatio*, the clothing analogy, and the examples
  from farmers - *gemmare vitis, luxuriem esse in herbis, laetas segetes*, ***etiam rustici dicunt***.
  Closes on ***hae translationes quasi mutuationes sunt***, a financial word.

### Added - Brutus
- **1-2** the news of Hortensius' death reaching Rhodes in 50 BC, the augural college, and *non ...
  adversarium ... sed socium potius et consortem gloriosi laboris*. **Hortensius is an app author** and
  his single fragment is Brutus §6, four sections later.
- **330** the close: ***orbae eloquentiae quasi tutores relicti sumus*** and ***in hanc rei publicae
  noctem incidisse***. Brutus' consolation - that Cicero's deeds would speak *etiam me tacente* and
  live *mortuo* - reads differently knowing what happened in December 43.

### Added - Orator
- **8-9** ***Phidias*** and the *species pulchritudinis* in the sculptor's own mind. The source text of
  the European theory of the artistic Idea, and the passage **Orator 100-101** refers back to.
- **213-214** ***me stante*** - Cicero in the crowd watching a *contio* erupt at a *dichoreus*, then
  running the experiment by reversing the word order. The reply he gives himself a line later,
  *animo istuc satis est, auribus non satis*, is quoted in the analysis.

### Notes on the source
- **Second use of `fix` to delete a bracketed chapter numeral** (`[VI]` at De Orat. I.20), after
  De Opt. Gen. 13-14 established it in v1.10.1.
- ~~**Orator 213-214 deliberately stops at *Quaero nonne id numerus effecerit?***~~ **SUPERSEDED the
  same day - see the follow-up above.** The misplaced quotation mark was emended after all and the
  excerpt now runs through section 215.
- **No emendations, no mojibake.** All three pages are pure ASCII.

Verification: **214 verbatim, 0 mismatched**; `lint_translations.js` **341 checked, 3 to look at**
(the same three documented in the tool's header). Cache-bust: `?v=113` -> `?v=114`.

## [1.10.3] - 2026-09-01

**TOPICA 2 -> 5, AND CICERO IS DONE, +3.** The user's call: De Optimo Genere Oratorum stays at 3
because it is a genuinely short pamphlet, while the Topica runs to a hundred sections and can carry
five. Rhetorical **26 across 5 works**; **Cicero 216 across 38 works** (Speeches 116 / Letters 26 /
Philosophical 48 / Rhetorical 26); bank **376**.

### Added
- **Topica 26-27** what a definition is, and the split the book rests on: things that *are*, which can
  be seen and touched (*fundum aedes, parietem stillicidium, mancipium pecudem, supellectilem penus* -
  all of them categories Roman law actually litigated, and *stillicidium* one of the oldest servitudes)
  against things *quarum nullum subest corpus* - *usus capio*, *tutela*, *gens*, *agnatio*. Ends on
  ***quam notionem voco***, Cicero coining *notio*. Cross-links to **De Natura Deorum I.18** and
  **Tusculanae III.24** for the same habit, and to **Orator 8-9** for the same stamping metaphor
  (*conformatio insignita et impressa*).
- **Topica 73** the *artis expers* proofs - Aristotle's *atechnos* - and ***testimonium ... omne quod
  ab aliqua re externa sumitur ad faciendam fidem***, the same *fidem facere* as **Topica 7-8**. Then
  the anatomy of authority, closing on ***non recte fortasse, sed vulgi opinio mutari vix potest*** and
  *qui enim rebus his quas dixi excellunt, ipsa virtute videntur excellere*.
- **Topica 100** the last paragraph of the book and of Cicero's rhetorical writing: ***rutis caesis
  receptis*** and ***mancipio dare***, conveyancing terms aimed squarely at the jurist Trebatius. The
  two ends of the same joke, with **Topica 1-5**.

### Notes on the source
- **The Topica mojibake was mapped section by section before anything was picked**, as the reference
  sheet said it would have to be. Of 100 sections, **17 are damaged** - 6, 12, 24, 30, 31, 35, 38, 42,
  45, 48, 49, 55, 56, 79, 83, 93, 95 - each because it contains a Greek term the page cannot set.
  **The clean runs are 1-5, 7-11, 13-23, 25-29, 32-34, 36-37, 39-41, 43-44, 46-47, 50-54, 57-78,
  80-82, 84-92, 94, 96-100.** All three new excerpts sit well inside clean runs.
- **Section 26 opens on a defective word**: TLL prints *quos eui* for *quos exposui*, the same
  dropped-letters corruption as *euissem* for *exposuissem* in section 2. The extract simply starts
  after it, at *Et primum de ipsa definitione dicatur*, so nothing had to be emended.
- **No emendations in this release.**

Verification: **217 verbatim, 0 mismatched**; `lint_translations.js` **344 checked, 3 to look at**
(the same three documented in the tool's header). Accuracy pass over both pre-existing Topica
fragments found nothing to change. Cache-bust: `?v=115` -> `?v=116`.

### Follow-up (same day, no version bump) - Tiro and the shorthand
Two paragraphs added to Cicero's author page at the user's request, one in the biography and one in
Legacy and Impact, in **English and Italian**.

- **Biography**: how he wrote that much that fast. **Marcus Tullius Tiro**, Cicero's slave, freed in
  53 BC, ran the household's literary machinery and is credited with the ***notae Tironianae*** -
  signs standing for whole words and endings rather than letters, which let a writer keep pace with a
  speaking voice. Plutarch has Cicero stationing clerks trained in such signs around the Senate in
  December 63 BC to take down Cato's speech, the earliest recorded use of shorthand at Rome. Cicero
  dictated and Tiro wrote, which is what makes the output of 45-44 BC plausible at all. **Cross-links
  to Ad Familiares XVI**, the file of letters to Tiro, of which the app already carries XVI.1 and
  XVI.8.
- **Legacy and Impact**: what became of the system. Expanded by later hands to some five thousand
  signs (Isidore), the working script of the imperial chancery and then of Merovingian and Carolingian
  scriptoria, dead after the eleventh century once scribes who could not read them began to suspect a
  cipher. **Two fossils survive**: the word ***notarius***, which meant a shorthand writer before it
  meant a man of law, and the **Tironian *et*, ⁊, still printed on Irish road signs** for *agus*.
  Modern shorthand - Bright 1588, Willis 1602, Pitman 1837, Gregg 1888 - is stated as **invented
  afresh rather than inherited**, which is the accurate claim.

Both drafts were edited and both bundles regenerated: `node build_content.js` for the English
`file://` fallback and `node build_content_it.js` for `js/content-it.js`. No excerpts touched, no
Latin touched, no version tag moved. Cache-bust: `?v=116` -> `?v=117`.

### Follow-up (same day, no version bump) - Orator 213-214 becomes 213-215
The user asked why the best line in the book was being left outside the excerpt, and was right to.
**It is now inside it.** TLL opens a quotation before *Comprobavit* and does not close it until after
*dissentio*, which swallows Cicero's own commentary into the specimen he is quoting; the quotation is
only the re-ordered specimen, and Wilkins' OCT and the Loeb both print it that way. **Two `emend`
pairs move the single quotation mark**: `temeritas, iam nihil erit` -> `temeritas", iam nihil erit`
and `a quo dissentio."` -> `a quo dissentio.` This is the same class of manifest punctuation defect as
*navem. suam* at Verr. II.1.46 and the full stop for a comma at Att. I.18.

The excerpt now runs to the end of section 215 and carries the exchange it was previously only quoting
in the analysis: ***"At eadem verba, eadem sententia." Animo istuc satis est, auribus non satis.***
It also now contains the word-order experiment itself and the aside in which Cicero notes that
*temeritas* is the fourth paean, **the foot Aristotle recommends**, and says he disagrees. Both
translations were rewritten to cover the longer passage, and the analysis says plainly that the effect
is unreproducible in English or Italian, since it belongs entirely to Latin word order. Citation
`(Orator 213-214)` -> `(Orator 213-215)`; the fragment keeps its `1.10.2` tag.

Verification: **214 verbatim, 0 mismatched** (the fragment reports `2 emended`); `lint_translations.js`
**341 checked, 3 to look at**, unchanged. Cache-bust: `?v=114` -> `?v=115`.

## [1.10.1] - 2026-08-31

**THE RHETORICAL GROUP IS COMPLETE AS A SET OF FIVE, +5.** De Optimo Genere Oratorum 3, Topica 2 -
the last two work objects the group was missing. Rhetorical **16 across 5 works**; Cicero **206 across
38 works**; bank **366**.

### Added
- **De Optimo Genere Oratorum 1-2** the anti-Atticist opening: poetry has *genera* and mixing them is
  a fault (*in tragoedia comicum vitiosum est et in comoedia turpe tragicum*), but oratory has only
  degrees. *In re enim quid optimum sit quaeritur, in homine dicitur quod est.* **Ends by naming
  Ennius, Pacuvius and Caecilius**, all three app authors; the *fortasse* on Caecilius registers
  Cicero declining to sign Volcacius Sedigitus' ranking.
- **De Optimo Genere Oratorum 5** the three *officia* matched to three qualities of thought
  (*acutae, argutae, graves*), then the five parts of rhetoric closed with a building:
  ***memoria est quasi fundamentum, lumen actio***. Cross-links to **Orator 69** and
  **De Oratore III.213**.
- **De Optimo Genere Oratorum 13-14** ***nec converti ut interpres, sed ut orator*** and ***non verbum
  pro verbo***, closing on *adnumerare* against *appendere* - counting coins against weighing them.
  **Jerome quotes this paragraph** in *Ep.* 57, whose title answers Cicero's. **The two speeches named
  here are the ones De Oratore III.213 tells the Aeschines story about**, and neither translation
  survives.

### Added - Topica
- **1-5** how the book came to exist: Trebatius finding Aristotle's *Topica* on the shelf at Tusculum,
  and ***memoria repetita in ipsa navigatione conscripsi*** - written at sea, from memory, without
  books, July 44 BC, on the voyage Cicero turned back from to deliver the Philippics. Trimmed, `[...]`.
- **7-8** ***licet definire locum esse argumenti sedem, argumentum autem rationem quae rei dubiae
  faciat fidem*** - the origin of the word "topic", and a definition that says *fidem facere*, produce
  belief, not produce truth.

### Changed
- **A TRANSLATION FAULT WAS CAUGHT BY `lint_translations.js` BEFORE RELEASE.** The first cut of
  **Topica 7-8** started the Latin at *Ut igitur earum rerum...*, but both translations rendered the
  preceding sentence (*Nos autem, quoniam in utraque summa utilitas est...*) as well - EN ratio 1.61,
  IT 1.64, against a band of 1.07-1.36. **The Latin was extended to cover it rather than the sentence
  dropped**, because it is the sentence that says which of the two subjects the book starts from.
  This is the third time the tool has paid for itself, and the exact fault it was written for in the
  v1.9.0 follow-up. `js/fragments.js` was reverted to HEAD and the batch rebuilt from scratch rather
  than patched in place.

### Notes on the source
- **`optgen` is pure ASCII and brackets both numerals** (`[I] [1]`, `[V]`), so spans are free. The
  `[V]` chapter numeral falls in the middle of the 13-14 fragment and is removed with a **`fix`**, so
  that the app shows only its own section markers - `normalise()` strips it on both sides, so the
  verification is unaffected. This is the first fragment to need that.
- **`topica` DOES carry mojibake**, unlike the rest of the rhetorical shelf: every Greek term on the
  page is mangled (*dialektikón*, *suzug¤a*, *§tumolog¤an*, *§nyÊmhma* and a dozen more). **Both
  excerpts are sited in the clean stretches**: sections 1-5 run clean up to the first bad byte inside
  section 6, and 7-8 are clean again after it.
- **No emendations in this release.** *Veliam* is a place name, not the capital-V-for-u convention.

Verification: **207 verbatim, 0 mismatched**; `lint_translations.js` **334 checked, 3 to look at**
(the same three documented in the tool's header, after the Topica fault was fixed). Cache-bust:
`?v=112` -> `?v=113`.

## [1.10.0] - 2026-08-31

**THE RHETORICAL GROUP GOES LIVE, +11.** De Oratore 5, Brutus 3, Orator 3 - three new works, and the
last of Cicero's four categories to be filled. Rhetorical **11 across 3 works**; Cicero **201 across
36 works** (Speeches 116 / Letters 26 / Philosophical 48 / **Rhetorical 11**); bank **361**.
All three works were already mapped in `sources.json` and pinned in `RHET_ORDER`; only the work
objects were missing, which is why the category has been invisible since v1.5.0 created it.

### Added - De Oratore (55 BC, dialogue set in 91)
- **I.32-33** *hoc enim uno praestamus vel maxime feris* - speech as the human differentia, then the
  culture-hero question: what else could have gathered the scattered, led them out of the wild and
  laid down ***leges, iudicia, iura***? The foundation text of the *studia humanitatis*.
- **I.150** ***Stilus optimus et praestantissimus dicendi effector ac magister***, with the
  parenthesis that gives it away - *est enim magni laboris, quem plerique fugimus*. Quintilian's
  *Institutio* X is an expansion of this paragraph.
- **II.35-36** ***Historia vero testis temporum, lux veritatis, vita memoriae, magistra vitae, nuntia
  vetustatis*** - **and it is a question, not a statement**, whose subject is *commendatur*, and whose
  point is that history belongs to the orator. Six *quis* questions in 35 build the run-up.
- **II.236** the ancient theory of laughter: *turpitudine et deformitate*, saved by *non turpiter* -
  the joke points at something shameful without being shameful. Then five verbs of damage in
  asyndeton. Cross-links to **Pro Caelio**.
- **III.213** ***Actio, inquam, in dicendo una dominatur***, Demosthenes' first/second/third, and the
  Aeschines anecdote ending ***quanto magis miraremini, si audissetis ipsum!***

### Added - Brutus (46 BC)
- **65** ***Catonem vero quis nostrorum oratorum ... legit?*** and the count: *amplius centum
  quinquaginta* speeches Cicero says he found and read. **Not one survives.** Cross-links to
  **Cato the Elder**, an app author, and to **De Senectute**.
- **262** ***nudi enim sunt, recti et venusti, omni ornatu orationis tamquam veste detracta*** - the
  verdict on **Caesar's** *commentarii*, which this app carries, written while Caesar was dictator.
  The *calamistris inurere* joke is Cicero's standing metaphor for overdressed prose.
- **316** Cicero on his own training with **Molon of Rhodes**, the river metaphor sustained across
  *redundantis / supra fluentis / extra ripas diffluentis*, and ***prope mutatus***.

### Added - Orator (46 BC)
- **69** ***ut probet, ut delectet, ut flectat***, and the mapping of the three *officia* onto the
  three *genera dicendi*. Augustine takes the triad into *De Doctrina Christiana* IV.
- **100-101** ***Nemo is, inquies, umquam fuit. Ne fuerit.*** - the Platonic *idea* of the orator,
  and a joke at the expense of the Antonius of **De Oratore**, who said he never existed.
- **120** ***Nescire autem quid ante quam natus sis acciderit, id est semper esse puerum***, restored
  to its context: item three on a professional syllabus, after civil law, and advertising **Atticus'**
  lost *Liber Annalis*.

### Notes on the source
- **All five rhetorical pages are pure ASCII** - no mojibake anywhere, unlike `paradoxa`.
- **`oratore1`-`oratore3` bracket BOTH numerals** (`[LVI] [213]`), so both are strippable and spans
  are free. **`brut`** brackets its arabic sections. **`orator` does not bracket its roman chapter
  numerals** (`XXI.`, `XXIX.`), which are therefore NOT strippable: `or.69` and `or.100` both start
  immediately after one, and no Orator fragment may cross a chapter break.
- **Two emendations, both declared.** *Vt* -> *Ut* (I.33), the capital-V-for-u convention already met
  in ad Brutum; and *deformitate - quadam continetur* -> *deformitate quadam continetur* (II.236),
  where a stray dash separates a noun from its adjective. The two other dashes in that sentence are a
  genuine parenthesis and are kept.
- **`sources.json` key `brutus` is shared by two authors** - Hortensius' single fragment IS a passage
  of Cicero's Brutus (§6) - and `verify.js` prints a NOTE saying so. The new Cicero fragments are
  §§65, 262 and 316, so there is no overlap with it.

Verification: **202 verbatim, 0 mismatched**; `lint_translations.js` **329 checked, 3 to look at**
(the same three documented in the tool's header). Cache-bust: `?v=111` -> `?v=112`.

### Follow-up (same day, no version bump) - the correlative in Somnium VI.15
The user caught it: the Latin *Quare **et** tibi, Publi, **et** piis omnibus* is a correlative, and the
English had it right as "**both** you, Publius, **and** all dutiful men", but the Italian rendered it
*e tu ... e tutti*, which is a calque of the Latin rather than Italian - a bare *e* after *Perciò*
reads as a stray conjunction. Now *sia tu, Publio, sia tutti gli uomini pii*. **The whole bank was
swept for the same shape** (a lone *e* opening a correlative after a connective) and this was the only
occurrence. No Latin touched, no version tag moved; the fragment stays `1.9.4`. Cache-bust: `?v=110` ->
`?v=111`.

## [1.9.3] - 2026-08-30

**THE PHILOSOPHICAL GROUP IS FINISHED, +8.** Paradoxa Stoicorum 2 (new work), De Amicitia 5 -> 8,
De Senectute 5 -> 8. Philosophical **9 works / 42**; Cicero **184 across 32 works**; bank **344**.
The group now runs in composition order: De Re Publica 4 - Somnium Scipionis 4 - Paradoxa 2 -
Tusculanae 5 - De Natura Deorum 3 - De Divinatione 3 - De Senectute 8 - De Amicitia 8 - De Officiis 5.

### Added
- **Paradoxa Stoicorum 1-3** the preface to Brutus, with **Cato the Younger** holding the Senate with
  philosophy, the Stoic method mocked as *minutis interrogatiunculis quasi punctis*, and the creed of
  the whole rhetorical tradition: ***nihil est tam incredibile, quod non dicendo fiat probabile***.
  Cato had died at Utica months earlier; cross-links to **Tusculanae I.74**.
- **Paradoxa Stoicorum 34** ***Quid est enim libertas? Potestas vivendi, ut velis*** - the shortest
  definition of liberty in Latin, immediately narrowed by seven asyndetic relative clauses into
  "living as you ought", and closed by the tricolon *nihil faciat invitus, nihil dolens, nihil
  coactus*. Published in 46 BC with Caesar dictator. The *sapiens poeta* is usually taken to be
  **Appius Claudius Caecus**.
- **De Amicitia 44** the first law of friendship, drafted as a statute: *sanciatur*, *lex*, and **ten
  jussive subjunctives in a row**. Everything hangs on *honesta*, which is the answer to the Gracchan
  question of sections 36-43.
- **De Amicitia 88** Archytas of Tarentum on climbing to heaven with nobody to tell. **The Somnium
  Scipionis run backwards** (cross-links to De Re Publica VI.16). Grammatically the prize: a past
  contrary-to-fact protasis with a **future infinitive** apodosis inside *oratio obliqua*, followed by
  a plain past unreal condition.
- **De Amicitia 89** *Obsequium amicos, veritas odium parit*, quoted from **Terence**, whom Laelius
  calls *familiaris meus* - a wink at the ancient rumour that Scipio and Laelius wrote the comedies.
  Ends on ***aliter enim cum tyranno, aliter cum amico vivitur***, written months after the Ides.
- **De Senectute 15** the four charges, and therefore the **map of the whole dialogue**: the app's
  other De Senectute excerpts sit one in each of its four blocks. A textbook *partitio*, with
  *unam ... alteram ... tertiam ... quartam* and four subjunctives that concede nothing.
- **De Senectute 39-41** Archytas again, this time against pleasure - *nullam capitaliorem pestem
  quam voluptatem corporis*. **Reported speech from beginning to end**, which is the exercise. Aimed
  at Epicureanism, so it cross-links to **Lucretius**, and to **Tusculanae IV.68-69**.
- **De Senectute 62-63** ***miseram esse senectutem quae se oratione defenderet***, said inside a
  speech defending old age, plus the seven asyndetic passive infinitives of Roman deference
  (*salutari, adpeti, decedi, adsurgi, deduci, reduci, consuli*), three of them impersonal passives of
  intransitives.

### Changed
- **Accuracy pass over all 18 fragments of the two touched works**, new and old. One correction: the
  De Senectute 32 translation read "Milo of Croton", which is right but is not in the Latin, and the
  analysis already identifies him. The gloss was removed from both translations.
- **`tools/apply_batch.js`: `fix` now takes one pair OR an array of pairs.** De Senectute 39-41 spans
  three printed sections and needed two rewrites (`40.` and `41.` into `[40]` and `[41]`); the old
  single-pair form still works unchanged.

### Notes on the source
- **Three different marker styles again, and only one of them is a trap.** `paradoxa` and `amic` print
  `[n]`, so a fragment may span sections freely. `senectute` prints **a bare arabic number followed by
  a period** (`40. Hinc`), which `normalise()` **does** strip, so it may span too - but the printed
  style has to be rewritten to `[n]` with a `fix` pair, or the app would show the source's own
  numbering. Its **roman chapter numerals** (`VI.`, `XVIII.`) are NOT strippable, so no De Senectute
  fragment may cross one; both new spanning fragments were cut to stay clear of them.
- **Mojibake avoided, not emended.** `paradoxa` cannot set Greek: section 4 prints *parãdoja* for
  *paradoxa* and section 41 prints *ploÊsiow* for *plousios*. The preface excerpt stops at the end of
  section 3 and the wealth paradox was not used, so neither is reproduced.
- **Kept and flagged:** *volt* for *vult* (Parad. 34), *volgus* and *inmortalibus* (Parad. 1-3),
  *ecfrenate* and *inlecebris* (Sen. 39-41). All real Latin. **No emendations in this release.**

Verification: **185 verbatim, 0 mismatched**; `lint_translations.js` **312 checked, 3 to look at**
(the same three documented in the tool's header). Cache-bust: `?v=108` -> `?v=109`.

## [1.9.2] - 2026-08-30

**De Natura Deorum and De Divinatione, two new works, +6.** One excerpt per book of the *De Natura
Deorum*, so each school argues in its own voice, and 1 + 2 across the two books of the
*De Divinatione*. Philosophical **8 works / 34**; Cicero **176 across 31 works**; bank **336**.

### Added
- **De Natura Deorum I.18-19** the Epicurean Velleius, introduced *tamquam modo ex deorum concilio et
  ex Epicuri intermundiis descendisset*, takes Plato's craftsman god literally and asks for the
  building site: ***quae molitio, quae ferramenta, qui vectes, quae machinae, qui ministri***. The
  Stoic *Pronoea* is dismissed as *anum fatidicam*. Cross-links to **Tusculanae III.24** for the same
  trick of coining Latin philosophical vocabulary inside a parenthesis.
- **De Natura Deorum II.95** Aristotle's men who had lived their lives underground, quoted by the
  Stoic Balbus. **One sentence**: four pluperfect subjunctives of setting, a chain of *cum* clauses,
  and the main verb held to the last six words. It is a surviving fragment of Aristotle's lost
  *De philosophia* and exists only because Cicero copied it. Cross-links to **Lucretius**
  (*De Rerum Natura* II.1023-1039), who runs the same experiment and concludes the opposite.
- **De Natura Deorum III.5-6** Cotta, Academic sceptic and serving pontifex, on how he holds both
  offices: ***a te enim philosopho rationem accipere debeo religionis, maioribus autem nostris etiam
  nulla ratione reddita credere***. Three Roman *pontifices maximi* set against the first three heads
  of the Stoa. Trimmed, with the middle of section 5 marked `[...]`.
- **De Divinatione I.86** Quintus separates *cur fiat* from *fiat necne fiat* and answers with the
  magnet: nobody can explain it either, and you believe in it. The best argument in book I, and
  Cicero gave it to his brother rather than to a straw man.
- **De Divinatione II.52** the base-rate objection (*quota enim quaeque res evenit praedicta ab
  istis?*) and the coincidence objection in three lines, then Hannibal on *carunculae vitulinae*.
  **Caesar is the second example**, sailing for Africa against the chief haruspex. Cato the Elder's
  joke about two haruspices sits one sentence earlier, at II.51, and is quoted in the analysis.
- **De Divinatione II.148** the close of the last theological dialogue: ***nec vero superstitione
  tollenda religio tollitur***, opened by *explodatur*, a word from the theatre. The etymology of the
  pair is at **De Natura Deorum II.72**, in the same release's other work.

### Notes on the source
- **The two works are marked differently.** `nd1`-`nd3` print `[n]`, so a fragment may span two
  sections (I.18-19, III.5-6). `divinatione1`-`divinatione2` print a **roman chapter numeral plus a
  bare arabic section number** (`XXIV Vetus autem...`, ` 52 Quota enim...`), which `normalise()`
  cannot strip - the same trap as `tusc1` in v1.9.1. **Every De Divinatione fragment therefore stays
  inside one printed section run**, and its marker is supplied by the app. This rules out joining
  I.85-86 or II.51-52, both of which were wanted and both of which were cut back to one section.
- **Kept and flagged, not emended:** *rutundum* for *rotundum* (I.18) and *abundant i, qui* (II.95),
  where *i* is the old nominative plural of *is*. Both are real Latin and are printed as the source
  gives them. Also kept: `" Ain tu?"` at II.52, where The Latin Library sets a space after the
  opening quotation mark. **No emendations in this release.**

Verification: **177 verbatim, 0 mismatched**; `lint_translations.js` **304 checked, 3 to look at**
(the same three documented in the tool's header, none of them new). Cache-bust: `?v=106` -> `?v=107`.

### Follow-up (same day, no version bump) - two external cross-references
The user asked for both. Neither touches any Latin, so the fragments keep their `1.9.2` tags.
- **De Natura Deorum II.95 now points at Plato's cave.** Aristotle spent twenty years in Plato's
  school and the two thought experiments are built the same way - people who have never been outside,
  brought into the daylight - down to the furnishings, since Plato's prisoners watch shadows thrown by
  carried statues and Aristotle's people sit among *signis atque picturis*. They then go opposite ways:
  the cave is deprivation and the ascent leads away from the visible world, while Aristotle's rooms are
  beautiful and lit, nobody is a prisoner, and the sky proves its point by being looked at. **One says
  the world of the senses is the shadow; the other says it is the evidence.**
- **De Divinatione II.148 now points at Lucretius**, who performs the same operation from the opposite
  school and in verse: the *De Rerum Natura* destroys fear-driven cult and keeps its gods, and at
  V.1198-1203 redefines piety as looking on everything with a mind at peace. **The labels are swapped**
  - for Lucretius *religio* is the villain (*tantum religio potuit suadere malorum*) where Cicero
  blames *superstitio* - and it is Cicero's labels the modern languages kept. Noted in the analysis.

**Also fixed: three excerpts were rendering a stray asterisk.** `js/markdown.js` renders bold as
`/\*\*([^*]+?)\*\*/`, and the character class excludes `*`, so **a bold span cannot contain an
italic one**. `***word***` is fine - the engine finds the inner pair and the italic rule wraps it,
which is why the house style works - but `**a *b* c**` matches nothing and leaks a literal `*` onto
the page. Three fragments had been written that way and are now restructured so bold and italic sit
side by side: **De Re Publica I.45** (the Machiavelli note, v1.9.0), **Tusculanae IV.68-69** (the
*Medea Exul* of Ennius, v1.9.1) and the new **De Divinatione II.148** note. The whole bank was then
re-rendered field by field and no leftover asterisk remains anywhere. No Latin was touched and no
version tag moved.

**Also fixed:** the v1.9.2 entry in `js/changelog.js` had gone in with **NFD (decomposed) accents** in
its Italian - 28 combining marks, where every other entry in the file is NFC. It renders identically
and is invisible in a diff, but it breaks string matching against the file, which is how it was found.
The whole file is normalised to NFC; nothing but the v1.9.2 entry changed. Cache-bust: `?v=107` ->
`?v=108`.

## [1.9.1] - 2026-08-30

**Tusculanae Disputationes, new work, +5.** One excerpt from each of four books. Philosophical
**6 works / 28**; Cicero **170 across 29 works**; bank **330**.

### Added
- **I.74** the hardest case for book I's own thesis: if death is no evil, why is suicide forbidden? The
  answer is a legal fiction - *vetat enim dominans ille in nobis deus iniussu hinc nos suo demigrare*,
  but Cato was *evocatus atque emissus*, discharged rather than deserting. Ends on
  ***tota philosophorum vita commentatio mortis est***. **Cato the Younger had died at Utica the year
  before.**
- **II.41** the gladiators, *aut perditi homines aut barbari* - four exclamations and four questions,
  each shorter than the last, arguing that endurance is training and not nature.
- **III.24** ***est igitur causa omnis in opinione***, and Cicero building a Latin vocabulary for Greek
  psychology as he goes (*perturbatio* for *pathos*). Cross-links to **Att. XII.14/XII.15**, written the
  same year, where the man who wrote it is losing a fight with his own weeping.
- **V.61-62** the sword of Damocles. **This passage is the origin of the phrase** - no earlier telling
  survives. Six clauses of inventory, then one detail: *saeta equina*.
- **V.64-66** Cicero as quaestor finding the lost tomb of Archimedes in the brambles, and the closing
  sting *nisi ab homine Arpinate didicisset*.

### Notes on the source
- **The five books are marked three different ways.** `tusc1` uses roman chapter numerals plus **bare
  arabic section digits** (`XXXI. 75`), which `normalise()` cannot strip; `tusc2` has **no markers at
  all**; `tusc3`-`tusc5` use `[n]` - and `tusc3` sometimes prints **`[24 ]` with a space**, which the
  `/\[\d+\]/` rule also misses. Every extraction here therefore starts after any numeral and stays
  inside one printed section run, with the markers supplied by the app.
- **Emended:** *lnmissi* -> *Inmissi* (V.65), a capital I scanned as a lowercase l.

Verification: **171 verbatim, 0 mismatched**; `lint_translations.js` **5 checked, 0 to look at**.
Cache-bust: `?v=104` -> `?v=105`, then `?v=106` with the recomposition below.

### Same-day recomposition - book IV joins, Archimedes steps aside
The user asked why book IV had been skipped while book V supplied two excerpts. The honest answer is
that the five were picked by fame of individual passages rather than by coverage of the work, and the
release notes then described the result as if it had been a plan. Corrected: the five now cover **one
book each**. No net change in count, so this stays **v1.9.1**; cache `?v=105` -> `?v=106`.

- **Added, Tusculanae IV.68-69** - *totus vero iste, qui volgo appellatur amor ... tantae levitatis est*.
  Love is not a divinity but an illness, and Cicero prosecutes it with the poets' own evidence: comedy
  is disqualified as an interested witness (*quae, si haec flagitia non probaremus, nulla esset omnino*)
  and tragedy called instead. **Three of the names in it are authors this app already holds** -
  **Caecilius Statius**, quoted for the view being demolished; **Ennius**, whose *Medea Exul* supplies
  *Tu me amoris magis quam honoris servavisti gratia*; and the same Medea that **Pro Caelio 18** uses
  against Clodia. The analysis also sets the passage against **Lucretius**, *De Rerum Natura*
  IV.1058-1287, at the user's request: two philosophers who agree on almost nothing reach the same
  diagnosis, that love is *morbus* - and **Ad Quintum fratrem II.9** in this app proves Cicero had read
  him. Two emendations: the source prints a digit **0** for *O*, and mojibake for *poeticam*; the excerpt
  also steps over a lacuna inside the Caecilius quotation.
- **Removed, Tusculanae V.64-66** (Archimedes' tomb). **Not scrapped** - recorded as a benched candidate
  in `practice_fragments_reference.md`, with its spec line, prefix, citation, emendation and the commit
  to recover its prose from, to be restored first if the Tusculans are ever expanded past 5.
  **This is the first deliberate deletion of a live fragment in the project**, and the first use of the
  `deleted` bucket in `js/changelog.js`, which had been empty in every release since launch.

Verification: **171 verbatim, 0 mismatched** (unchanged - one out, one in);
`lint_translations.js` **5 checked, 0 to look at**.


## [1.9.0] - 2026-08-29

**THE PHILOSOPHICAL GROUP GOES LIVE, +13.** Three new works: **De Officiis 5**, **De Re Publica 4**,
**Somnium Scipionis 4**. Philosophical now **5 works / 23**; Cicero **165 across 28 works**; bank **325**.

### Added - De Officiis
**I.22** *non nobis solum nati sumus* (one sentence, two *quoniam* premises from two different schools,
and *vindicat* making the self into property with prior liens on it) · **I.77** *cedant arma togae* -
Cicero quoting his own most-mocked verse without naming its author (cross-ref **In Catilinam**,
**Philippica II**) · **I.85** the two Platonic precepts, with *tutela* turning public office into
fiduciary duty, closing on *pauci universorum* · **III.38-39** the ring of Gyges, told fast in a chain
of perfects and then turned on the reader: ***sisne facturus?*** · **III.99** Regulus, where Cicero
gives the wrong answer its best case at length before answering in two words.

### Added - De Re Publica
**I.39** ***res publica res populi***, and the two conditions *iuris consensu et utilitatis communione*
(the sentence Augustine used in *City of God* XIX to argue Rome was never a commonwealth) · **I.45** the
mixed constitution, with three incompatible metaphors piled up · **I.68** *ex hac maxima libertate
tyrannus gignitur*, argued from weather, farming and medicine, and running on five forms of *nimius* ·
**II.1-2** *non unius ingenio sed multorum* - **cut so that the bare *is* opening section 2 keeps its
antecedent**, which is Cato, named in the first piece.

### Added - Somnium Scipionis (its own work, cited De Re Publica VI.n)
**VI.13** the place in heaven for statesmen, and *iure sociati* echoing the definition at I.39 ·
**VI.16** ***quasi punctum*** - the earth from above, with *paenitet* making the reaction shame rather
than wonder · **VI.18-19** the music of the spheres and the deaf villagers at the Nile cataracts ·
**VI.26** ***mens cuiusque is est quisque*** and *deum te igitur scito esse*, with the conditional that
defines the term before applying it.

### Changed
- **`normalise()` learned the parenthesised marker style.** De Officiis uses `[n]`, but De Re Publica
  and the Somnium print `(13)`. The verifier stripped `[13]` and `13.` but not `(13)`, so a fragment
  carrying the app's usual markers would have failed against perfectly good source text. Both sides get
  the treatment, so it can only ever cancel a marker.
- **`create_works.js`** now creates the three works; **Somnium Scipionis is a separate work** at the
  user's request - it is what students are set, and it survived by a different route (quoted whole in
  Macrobius, while books I-V had to be recovered from a palimpsest in 1819). It is still cited
  `De Re Publica VI.n`, and `PHIL_ORDER` pins it straight after `de-re-publica`.

**Cato the Elder keeps surfacing**, and he is an author in the Archaic era of this app: De Re Publica II
credits him with the book's central idea, and he is the speaker of the whole **De Senectute**.

Verification: **166 verbatim, 0 mismatched**. Cache-bust: `?v=102` -> `?v=103`, then `?v=104` with
the follow-up below.

### Same-day follow-up - two translations covered Latin the excerpts did not
Found by the user reading the new excerpts. **A new class of error for this project**, and one neither
existing check could see: `verify.js` proves the Latin is genuine, and the accuracy pass checks that a
translation says what the Latin says - but nothing was checking that a translation covers **exactly** the
Latin present and no more. No new excerpts, so this stays **v1.9.0**; cache `?v=103` -> `?v=104`.

- **De Officiis III.99** was translated with its opening sentence, *Sed omittamus et fabulas et externa;
  ad rem factam nostramque veniamus*, which the extraction had not included. Re-extracted with it.
  The sentence matters: it is Cicero telling his son that Roman history has better arguments in it than
  Greek philosophy, immediately after the Greek fable of Gyges.
- **Somnium Scipionis VI.18-19** was translated with its closing sentence, *Haec ego admirans referebam
  tamen oculos ad terram identidem*, likewise missing from the Latin. Restored - and it is the human
  beat the passage needs, Scipio glancing back down at home while being shown the harmony of the cosmos.

**New tool: `tools/lint_translations.js`.** A translation runs at a fairly stable multiple of its Latin,
so a fragment carrying an extra sentence in one language shows up as a length outlier. Across the bank
the English/Latin ratio has a median of 1.21 and sits inside 1.07-1.36 for ninety per cent of fragments;
**the two faulty ones measured 1.43 and 1.50.** The lint reports anything outside the band, skipping
fragments under 250 characters of Latin (where a four-word line of Ennius can legitimately need three
times its length in English) and ignoring the italic provenance note that unsourced fragments carry
inside their `latin` field. It flags **3 of 293**, all three checked by hand and recorded in the tool's
header as known-good: De Agri Cultura cap. 5, Pro Milone 57 and Philippica I.26 sit near 1.50 because
their Latin is exceptionally terse. A flag is a prompt to look, not a failure.

### Same-day follow-up - two analysis notes added at the user's request
- **De Re Publica I.45** now traces Polybius' **anacyclosis** forward to **Machiavelli**, *Discorsi*
  I.2, who rehearses the cycle and then breaks it: a state will rarely live long enough to complete the
  circuit, because a better-ordered neighbour will conquer it first, so chance and outside force get a
  vote the Greek scheme did not give them. What Machiavelli keeps is what Cicero keeps - the mixed
  constitution, with Rome as the proof.
- **Somnium Scipionis VI.16** now says why the passage matters: it is the earliest sustained description
  in Latin of the earth seen from outside, and the ancestor of the whole European tradition of the
  motif. The Greek precedent is the myth closing Plato's *Phaedo*, which lacks the observer looking down
  at his own empire. **Dante is reading this passage, through Macrobius, when he calls the earth
  *l'aiuola che ci fa tanto feroci* in *Paradiso* XXII.** The note also makes the wider point plainly:
  the philosophical works are why Cicero was read for two thousand years, and none of this sounds like
  the man of the Catilinarians.


## [1.8.4] - 2026-08-29

**De Senectute, new work, +5.** The philosophical group reaches **2 works / 10**. Cicero **152 across
25 works**, bank **312**.

### Added
- **§17** the helmsman: three *alii* clauses of sailors in motion against *ille autem clavum tenens
  quietus sedeat in puppi*, closing on *non viribus ... sed consilio, auctoritate, sententia*.
- **§32-33** Milo of Croton carrying an ox across the stadium at Olympia, set against *Pythagorae vires
  ingeni*, and then ***tempestivitas*** - the ripeness proper to each age.
- **§51-52** farming. The accountancy metaphor (*numquam recusat imperium nec umquam sine usura
  reddit ... maiore cum faenore*) and then twelve lines following a seed to the ear of wheat, one verb
  per stage, with the coinage *herbescentem viriditatem* and the false etymology of *occatio*.
- **§70** *neque sapientibus usque ad 'Plaudite' veniendum est* - the actor who need not stay for the
  curtain line, answered by the farmer's year.
- **§84** the last page: *ex vita ita discedo tamquam ex hospitio, non tamquam e domo*, *O praeclarum
  diem*, and his dead son.

**Cross-references built in.** The speaker is **Marcus Porcius Cato** of the Archaic era, so §51-52
points at the app's ten *De Agri Cultura* excerpts - the same man on the same subject, one in clipped
instructions and one in a twelve-line period. §70's *Plaudite* points at **Plautus** and **Terence**,
whose complete comedies all end on that word. §84 points at **De Amicitia 102**: same year, same frame,
same dedicatee, both ending on a dead man the speaker expects to see again.

### Notes on the source
- **TLL prints this text as `I.1.`, chapter plus section, not `[n]`** - and it **omits the number for
  section 33 entirely**. Every extraction therefore starts at the first Latin word and the markers are
  supplied as a prefix or a join; `normalise()` strips both styles, so verification is unaffected.
- **Emended:** *fcontra* -> *contra* in §52, a stray letter and not a word.
- **Kept as printed:** the editions differ over *ut* / *et* before *ex vita ita discedo* in §84. Both are
  real words and the sense is the same either way, so the source's reading stands and the analysis says
  so - rule 3, not rule 1.

Verification: **153 verbatim, 0 mismatched**. Cache-bust: `?v=101` -> `?v=102`.

## [1.8.3] - 2026-08-29

**The philosophical works begin, +4.** De Amicitia 1 -> 5, and all the structural work for the two
remaining Cicero groups lands in this release so that the eight that follow are pure content. Cicero
**147**, bank **307**.

### Added - De Amicitia 1 -> 5
- **§22** the case for friendship: *quid dulcius quam habere quicum omnia audeas sic loqui ut tecum?*,
  the five-fold *divitiae, ut utare ... valetudo, ut dolore careas* list, and **Ennius quoted by name**
  for *vita vitalis*.
- **§64** *amicus certus in re incerta cernitur* - **the best-known surviving line of Ennius**, dropped
  in as a proverb - inside a much colder argument about why friendship fails in public life.
- **§79** the shortest excerpt in the work, and the coldest: *amicos tamquam pecudes*.
- **§102** the last page, *mihi quidem Scipio ... vivit tamen semperque vivet*.
Both Ennius quotations cross-link to **Quintus Ennius** in the Archaic era; §102 cross-links to
**Ad Familiares V.7** and forward to the **Somnium Scipionis**.

### Changed - the author page now splits the works four ways
- `caesar_era_draft.md` listed Main Works as Orations / Philosophical Works / Letters and **filed
  *De Oratore* under Philosophical Works**, which is wrong: it is a book about oratory, not about how
  to live. There is now a **Rhetorical Works** heading holding De Oratore, Brutus, Orator, De Optimo
  Genere Oratorum and Topica - **three of which the page had never mentioned at all**. The
  philosophical list gains De Officiis, De Divinatione and Paradoxa Stoicorum, and the De Re Publica
  note now explains the palimpsest and why the Somnium Scipionis travelled separately.
- The same edit was made to `italian_translations_caesar.md` and `js/content-it.js` regenerated. The
  sub-headings are bold lines, not `##`, so `classifySection` still sees one section and **no parser
  change was needed**.

### Fixed - two fragments that had never been verified, and one that contradicted itself
- **`de-amicitia` was the last Cicero work missing from `sources.json`**, so `verify.js` had been
  skipping its launch-era §20 since launch. Mapped; **the Latin is exact**. But the accuracy pass found
  the **translations contradicting the app's own analysis**: the analysis correctly calls *haud scio an*
  "a formula introducing a confident claim in polite disguise", while both translations rendered it as
  genuine hesitation ("I am not sure whether"), and both dropped the ablative of comparison *qua*, so
  "nothing better **than friendship**" became just "nothing better". Fixed in EN and IT; **version stays
  1.0.0**. It was also the only Cicero fragment with no `[n]` marker - now `[20]`.
- **Hortensius' single fragment came under verification too, and passes.** It survives only because
  Cicero quotes it, so it lives on `cicero/brut` - mapped today for Cicero's Brutus. That is why the
  verbatim count rose by **six** and not four.

### Changed - tools, all preparation for the eight releases that follow
- **`sources.json`: all 14 philosophical and rhetorical works mapped at once**, so every work is
  covered by `verify.js` from the moment it is created and the count can only go up.
- **`verify.js` now prints a NOTE when one `sources.json` key serves two authors.** The file is keyed by
  work id alone, but work ids are only unique *per author* (`getWork` takes a slug too). Cicero's Brutus
  will collide with Hortensius' work of the same id in v1.10.0. Here that is harmless - both genuinely
  point at `cicero/brut` - but a shared key where the two needed different pages would break one of
  them in silence. Tested by simulating the v1.10.0 state: the NOTE fires.
- **`reorder_works.js`: every bucket now has an explicit order**, not just the speeches. `PHIL_ORDER`
  and `RHET_ORDER` are chronological by composition, with `somnium-scipionis` pinned straight after
  `de-re-publica` because it is its sixth book; `LETTER_ORDER` is manuscript order. Adding a work from
  now on means adding its id to a list.
- **`apply_batch.js`: the book-aware sort key now accepts a range.** `(De Oratore I.16-18)` did not
  match `/([IVXLCDM]+)\.(\d+)([a-z]?)\)$/`, so it fell through to the plain-digits rule and lost the
  book number, which would have put De Oratore III.5 ahead of I.16.

Verification: **148 verbatim, 0 mismatched** (was 142). Cache-bust: `?v=100` -> `?v=101`.

## [1.8.2] - 2026-08-28

**THE LETTERS ARE FINISHED, +5.** **Ad Atticum 5 -> 8** and **Ad Familiares 6 -> 8**, the sizes the user
chose. Letters **26 across 4 works** (Atticum 8, Familiares 8, ad Quintum 5, ad Brutum 5), Cicero **143
across 24 works**, bank **303**.

### Added
- **Ad Atticum IV.1** - the return from exile, September 57. Tullia waiting at Brundisium on her own
  birthday, then the *nomenclator*, the steps of the temples *ab infima plebe*, and the walk up to the
  Capitol. Deliberately the middle panel of three: **Fam. XIV.4** is the journey out of Italy from the
  same town, and **Att. XII.15** is the same daughter dead sixteen years later.
- **Ad Atticum VII.7** - *ego quos tu bonos esse dicas non intellego*, three weeks before the Rubicon.
  Cicero tests the optimates' word for themselves against each order in turn and finds nothing behind
  it, ending on the landowners who will accept a monarchy *dum modo otiosi essent*. Pairs with
  **VII.11**.
- **Ad Atticum XII.14** - 8 March 45, the day before the letter about the wood. *Feci quod profecto ante
  me nemo ut ipse me per litteras consolarer*: the composition record of the lost **Consolatio**. Like
  the Lucretius verdict in **Q.fr. II.9**, a place where the correspondence is the only witness to a
  piece of literary history.
- **Ad Familiares V.2** - the reply to Metellus Celer, January 62. Almost entirely one chain of oratio
  obliqua several layers deep, reconstructing what Cicero says he said in the Senate. Prints the
  **S. T. E. Q. V. B. E. formula written out in full**, where V.7 in the same work has the initials.
- **Ad Familiares V.15** - June 45, to Lucceius. *Dicerem "iucundus," nisi id verbum in omne tempus
  perdidissem.* **Deliberately the same correspondent as V.12, eleven years later**, and it should be
  read straight after it: in 56 he wants his name made immortal, in 45 he reads *non ut ... medicinam
  perpetuam, sed ut exiguam oblivionem doloris petam*.

### Changed
- **`cicero/att4` added to `sources.json` and fetched.** The app had books I, VII and XII, covering
  68-60 and 50-45 BC, so **the exile, the return and the whole first-triumvirate period were
  unreachable**. Book IV closes an eleven-year hole in the middle of the collection.

### Not fixed, deliberately
- **Att. IV.1 cuts one clause** because the source prints *Brundinisorum*, and the texts in circulation
  disagree about what belongs there (*Brundisinorum*, *Brundisiorum*). **Where the witnesses disagree
  the reading is a variant, not a slip**, so the mend-first rule does not apply and the excerpt trims
  past it. Contrast the emendations in v1.8.0-1.8.1, every one of which had exactly one possible reading.
- **Fam. V.2 stops where it does** because the next sentence prints *iuiucunda*, which could stand for
  either *iucunda* or *iniucunda* - opposite meanings, so a place to cut rather than mend.

Verification: **142 verbatim, 0 mismatched**. Cache-bust: `?v=98` -> `?v=99`, then `?v=100` with
the follow-up below.

### Same-day follow-up - the user re-examined the trims, and was right on all three
No new excerpts, so this stays **v1.8.2**; cache `?v=99` -> `?v=100`. **The rule changes:
the test is whether the printed form is a Latin word, not how many sites print it.**

- **Ad Atticum IV.1: *Brundinisorum* -> *Brundisinorum*, and the excerpt now runs whole.** The user
  pointed out that the trim was too cautious and that the third-party *Brundisiorum* is not Latin. Both
  true - and *Brundinisorum* is not Latin either: the town is *Brundisium*, its people are the
  *Brundisini*, so the genitive plural is *Brundisinorum*. **The proof is inside the passage**, which
  prints *Brundisinae coloniae*, *Brundisi* and *a Brundisinis* within a few lines. Only this one form
  has its letters transposed. Internal evidence of that kind outranks any number of websites.
- **Ad Familiares V.2: *iuiucunda* -> *iniucunda*, and the excerpt now runs to the end of the thought.**
  I had claimed the form could stand for either *iucunda* or *iniucunda* and was therefore unresolvable.
  **The context resolves it**, exactly as the user argued: *mediocris quidam est risus consecutus*
  follows immediately, and "the speech seemed not pleasing, and a certain moderate laughter followed"
  contradicts itself. *Non iniucunda*, the litotes Cicero uses constantly, is the reading. An *n* read
  as a *u* is the commonest confusion in a manuscript hand.
- **Ad Brutum I.15: *immicus* -> *inimicus* and *ahenum* -> *alienum*; the fragment is continuous from
  section 3 into section 4.** This is the one that exposes the flaw. I had kept *immicus* on the ground
  that **Perseus prints it too**, and called it a transmitted reading - but **two digital texts descended
  from the same printed edition are not two independent witnesses**, and a form that does not exist in
  the language is a defect however many sites reproduce it. *Ahenum* ("bronze cauldron") in
  *aperire non ahenum puto* falls the same way, so mending it lets the two sections join.

**The revised rule, now in `tools/README.md` and the reference sheet.** (1) Not a Latin word -> defect ->
emend and declare. (2) Where more than one correction is formally possible, the context decides, and
internal evidence from the same passage beats everything. (3) A form that IS real Latin, however odd,
is kept and flagged - *Illias*, *inplevit*, *quom*, *memorabilis*, *paullo*. (4) Trim only where
independent editions genuinely disagree and both readings are real words, or where the text is beyond
restoring - with the standing exception that a trim must never cost the reader an antecedent.


## [1.8.1] - 2026-08-28

**The two short letter collections filled out, +5.** **Ad Quintum fratrem 3 -> 5** and **Ad Brutum
3 -> 5**, the half of the extension plan that needed no decision, plus **Ad Familiares 5 -> 6** with a
letter that is not by Cicero. Letters **21 across 4 works**, Cicero **138**, bank **298**.

### Added
- **Ad Quintum fratrem III.1** - Cicero inspecting his brother's building sites while Quintus is in
  Gaul: the water supply, the stucco, the ceilings he sends back, and *Diphilum Diphilo tardiorem*,
  the contractor who will *aliquando perpendiculo et linea discet uti*. Deliberately the plainest,
  most concrete Latin in the section, and full of building vocabulary.
- **Ad Quintum fratrem III.5** - the **De Re Publica** taken apart and redesigned, on Sallustius'
  advice, because a consular should speak in his own voice rather than hide behind Scipio's circle.
  **The hardest Latin in the Letters by a distance**: one period after the first clause, and its second
  half is oratio obliqua with five infinitives. Cross-links to **Q.fr. II.9** (the same Sallustius) and
  **Fam. V.7** (the Africanus/Laelius pairing).
- **Ad Brutum I.9** - the consolation for Porcia, which is really Cicero returning the letter Brutus
  sent him after Tullia died, telling-off included. *Tibi nunc populo et scaenae, ut dicitur,
  serviendum est.* Cross-links to **Att. XII.15**.
- **Ad Brutum I.15** - sections 3 and 4: Solon's *praemio et poena* answering both of Cicero's critics
  at once, then the verdict on the Ides of March and *instrumentum regni delatum ad Lepidum et
  Antonium*.
- **Ad Familiares XVI.8** - **not by Cicero**: Quintus writes to Tiro, three months after Marcus did in
  XVI.1, quoting Euripides at him about cold and delicate skin. Book XVI keeps what arrived as well as
  what was sent, and the pairing puts the whole household on one page.

### Fixed - two silent cache faults, both of the same family
- **`fetch_sources.js` assumed every page was single-byte.** `cicero/fratrem3` is served as **UTF-16
  with a BOM**, so decoding it as latin1 produced a cache file in which every character was separated
  by a NUL - which `strip.js` then turned into a page of spaced-out single letters. Nothing errored;
  the file was simply unusable, and a fragment sourced from it would have failed verification for no
  visible reason. The fetcher now checks the BOM (LE and BE) before decoding. **Both new Ad Quintum
  excerpts come from that book**, which is why this surfaced now.
- **`strip.js` left named HTML entities undecoded.** `&ocirc;` and `&ecirc;` are all over the
  transliterated Greek of ad Quintum III and ad Brutum I, and `&Ccedil;` appears once; they were being
  cached literally. Accent entities, `&ccedil;`, `&ntilde;` and any numeric entity are now decoded.
- **Every page re-fetched with `--force`** afterwards, and the whole bank re-verified, to prove nothing
  else had been quietly damaged: **0 mismatched** before the new batch, **137 verbatim, 0 mismatched**
  after it.

### Fixed - text and translation
- **Ad Familiares XVI.8's Greek is restored.** The source cannot set Greek on that page: both of
  Quintus' Greek phrases print as runs of stray Latin letters from a symbol font, and **the Euripides
  line is printed twice**. Declared with `emend`: the app prints ἀκίνδυνα μὲν χρονιώτερα δέ and
  ψῦχος δὲ λεπτῷ χρωτὶ πολεμιώτατον, the line once. The decoding was supplied by the user from a text
  that renders the Greek properly. Note the fragment builds its emendation anchors **by slicing the
  extracted passage**, since retyping a run of replacement characters by hand is exactly what the
  pipeline exists to prevent.
- **Ad Quintum fratrem III.5:** *ferris* -> *feriis* and *consulibis* -> *consulibus*, both checked
  against another text of the letter.
- **Ad Brutum I.3a (v1.8.0, tag unchanged):** *nam Pansa fugerat* says Pansa **fled**; both translations
  had softened it to "withdrew", losing a pointedly unkind verb.

### Not fixed, deliberately - where the mend-first rule stops
- **Ad Brutum I.15 prints *immicus* for *inimicus*.** Perseus prints it too, so it is a **transmitted
  reading**, not a slip of our source, and it is kept exactly as it stands and flagged in the analysis -
  the precedent is *Illias* (Arch. 24) and *inplevit* (Phil. II.63).
- **The same letter has a clause between daggers**, `+neque solum ut Solonis dictum usurpem+`, the
  editors' mark for a text nobody could repair. A corruption that cannot be resolved is reported, not
  mended, so the fragment cuts around it - which is why its second piece opens on *is* with Solon named
  only in the omitted words.

Cache-bust: `?v=96` -> `?v=97`, then `?v=98` with the follow-up below.

### Same-day follow-up - the daggered clause goes back into Ad Brutum I.15
The user's catch, and a correction to the call made a few hours earlier. Cutting around the crux also
cut out **Solon's name**, so the excerpt's second piece opened on a bare *is* whose antecedent was
nowhere in the fragment: unusable for anyone actually translating it, unless they happened to already
know the sentence. **A crux is a thing to print and explain, not a thing to hide.** The clause is
restored exactly as the source prints it, `+neque solum ut Solonis dictum usurpem+`, and the analysis
now says in both languages what daggers mean - that editors use them to mark a passage they believe is
damaged and cannot repair, and that the words between them should be read with that warning attached.
The fragment drops from **three pieces to two** and reads continuously through section 3.

The rule this refines: **trimming around an unrepairable reading is right only when the trim costs
nothing the reader needs.** When it removes an antecedent, a subject or anything else the rest of the
passage depends on, print the damaged text with its daggers and explain it instead.

Not changed, for the same reason as before: *ahenum* for *alienum* in the sentence that would join
sections 3 and 4 is printed by Perseus as well as by our source, so it is transmitted rather than a site
typo, and the fragment still cuts before section 4 rather than reproducing it.

No new excerpts, so this stays **v1.8.1** and the NEW! banners do not move. Cache `?v=97` -> `?v=98`.


## [1.8.0] - 2026-08-27

**Cicero's Letters open properly: +15 excerpts, three new works.** The `letters` group went from one
work with one launch-era fragment to **four works and 16 fragments**: Ad Atticum 1 -> **5**,
**Ad Familiares 5**, **Ad Quintum fratrem 3**, **Ad Brutum 3** (weighted by the size of each
collection, agreed with the user: Atticus and Familiares are 16 books each, ad Quintum 3, ad Brutum 2).
Cicero is now **133 across 24 works**; the bank is **293**. All four collections are flat siblings -
four buttons is not clutter, so this group does not need the nested chooser the Speeches got in v1.7.8.

### Added - the passages
- **Ad Atticum** (`att1`, `att7`, `att12`): **I.2** the birth of his son announced one line above the
  plan to defend **Catiline**, his rival for the consulship (cross-links to In Catilinam); **I.18**
  *fucosae amicitiae*, the packed hall and *reperire ex magna turba neminem possumus*; **VII.11**
  *utrum de imperatore populi Romani an de Hannibale loquimur?* and the Pompey dialogue *non est in
  parietibus res publica / at in aris et focis*; **XII.15** the whole letter from Astura after Tullia's
  death, *sed adhuc pares non sumus*.
- **Ad Familiares** (`fam5`, `fam14`, `fam16`): **V.7** the frosty reply to Pompey, opening on the
  abbreviated formula **S. T. E. Q. V. B. E.**; **V.12** *epistula enim non erubescit* to Lucceius;
  **XIV.4** exile at Brundisium; **XIV.20** the four-line bathtub note to the same wife fourteen years
  later, deliberately placed in the same work; **XVI.1** to Tiro, left ill at Patrae.
- **Ad Quintum fratrem** (`fratrem1`, **`fratrem2` - newly fetched for this release**): **I.1** the
  Cyropaedia and *imperium ita datum est ut redderent*; **I.3** *mi frater, mi frater, mi frater* and
  *effigiem spirantis mortui*; **II.9** *epistulae nostrae debent interdum alucinari* + **the Lucretius
  verdict**, *multis luminibus ingenii, multae etiam artis* - the only contemporary judgement on the
  De Rerum Natura that survives, and a forward cross-link to the Lucretius entry.
- **Ad Brutum** (`adbrutum1`): **I.3** *Vtinam tam facile eum florentem ... regere ac tenere possimus
  quam facile adhuc tenuimus!*; **I.3a** Hirtius dead at Mutina (cross-links to the Hirtius entry);
  **I.14** *breves litterae tuae -- breves dico, immo nullae*.

### Fixed - the oldest Cicero fragment, checked for the first time
- **`ad-atticum` was never in `sources.json`**, so its launch-era fragment (Att. I.16, hand-typed in
  v1.0.0 before the pipeline existed) had never been through `verify.js`. Mapping the work exposed it
  immediately: the app printed a comma the source does not (*pleno foro servorum, XXV*). Removed.
- The accuracy pass over the same fragment found **three translation errors**: *promisit, intercessit,
  dedit* is a bribe paid in stages (promised / stood surety / paid), not somebody interceding; and the
  *perire* / *perdere omnia* pairing had been flattened in both languages. Fixed in EN and IT.
  **Its `version` stays 1.0.0** - the tag records first-added, never last-edited.
- **`ad-atticum` and `de-amicitia` had no `labelIt`**, the only two Cicero works without one, so the
  Italian chooser was showing English labels. Added.

### Changed - tools
- **`apply_batch.js` sorts letters by BOOK then letter.** The old key read the last number in the
  citation, so Att. VII.11 sorted between I.2 and I.16. A citation ending `<ROMAN>.<n>` now scores
  `book * 100000 + n * 10`, with `+1` for a manuscript doublet suffix (Ad Brutum **I.3a**). Speech
  citations that end the same way (In Catilinam I.33) all share one book inside their work, so their
  order is untouched.
- **`normalise()` in `strip.js` now ignores whitespace around punctuation.** The Latin Library sets one
  quoted question in Att. I.16 as `" praesidium a nobis postulabatis ?`, with a space after the opening
  quote and before the mark. That is typesetting, not a reading. Both sides of the comparison get the
  same treatment, so this can only ever cancel a whitespace difference - no two different sequences of
  letters can be made to match by it.
- **`sources.json`:** the four letter collections moved out of `_notLive` and are now verified;
  `cicero/fratrem2` added. `_notLive` keeps its comment (and the `ver1` correction) but is now empty.

Verification: **132 verbatim, 0 mismatched** (was 116 - the 15 new fragments plus Att. I.16, now
covered for the first time). Cache-bust: `?v=94` -> `?v=95`, then `?v=96` with the follow-up below.

### Same-day follow-up - mend the source, do not trim past it
The user's call, reversing the older default: where The Latin Library has a plain defect and the right
reading is certain, **correct it and say so** rather than cutting the sentence out. Poesia Latina was
unreachable (connection refused on every attempt, http and https), so each reading was checked against
another text of the letter instead. No new excerpts, so this stays **v1.8.0** and the NEW! banners do
not move; cache `?v=95` -> `?v=96`.

- **Ad Atticum I.18 now starts where the letter starts.** Three declared emendations: *uam* -> *quam*
  and *que* -> *quae* in the opening sentence, and a full stop after *destitutus* where the *ita ... ut*
  construction needs a comma. The excerpt is now **one continuous passage** with no cut at all, and it
  recovers the sentence the letter is famous for (*Nihil mihi nunc scito tam deesse quam hominem eum ...
  nihil fingam, nihil dissimulem, nihil obtegam*), the Greek *aphelestatos*, the Metellus joke
  (*litus atque aer et solitudo mera*) and *mellito Cicerone*, the four-year-old son whose birth is
  announced in Att. I.2.
- **Ad Familiares V.12** recovers *neque tamen ignoro, quam impudenter faciam* (*quani* -> *quam*), the
  third and best of Cicero's self-accusations, which the trim had been throwing away.
- **Ad Quintum fratrem I.1** recovers the sentence that states the principle the whole passage rests on,
  *ut ii, qui erunt in eorum imperio, sint quam beatissimi* (*antiqissimum* -> *antiquissimum*). Also
  now **one continuous passage**, no cut.
- **Ad Brutum I.3: *Vtinam* -> *Utinam*.** Not an error - it is the ancient majuscule convention, which
  The Latin Library keeps for this collection - but it reads as a different word on first sight, so it
  is normalised and declared. `emend` now covers this case as well; see `tools/README.md`.
- **Two Italian translations fixed.** Ad Familiares XIV.4 had *Me rovinato! Me abbattuto!*, a
  word-for-word calque of the Latin exclamatory accusative that is not Italian; it now reads
  *Sono rovinato! Sono abbattuto!*, matching what the English already did. Ad Familiares XVI.1 ended on
  a clipped *Dunque, dei due, il primo* where the English has a full sentence; now
  *Dunque, che sia il primo dei due.*
- Every analysis involved was rewritten: the notes that used to explain a trim now explain the
  emendation. `verify.js` still reports **132 verbatim, 0 mismatched** - an emended fragment has the
  source's own reading put back before comparison, so every other character is still proved.


## [1.7.8] - 2026-08-27

**Housekeeping, no new excerpts.** The Cicero chooser gains a third level so the Speeches menu stops
showing 19 buttons at once, and the "Legacy and Impact" section - present in the drafts all along and
silently dropped by the parser - is restored to the author page. **The NEW! badges stay on the v1.7.7
excerpts**, since `LATEST_VERSION` is computed from fragment tags and nothing was tagged 1.7.8.

### Changed - the chooser nests to any depth
- **Groups may now carry a `parent`.** Three new sub-groups sit inside `speeches`: **`verrines`**
  (In Verrem / Verrine), **`catilinarians`** (In Catilinam / Catilinarie) and **`philippics`**
  (Philippicae / Filippiche), each with its own `heading`/`headingIt`. The 15 affected works simply
  changed `group`; **no fragment, citation or version tag was touched**.
- The Speeches page now shows **7 buttons instead of 19**: In Verrem (7 texts) · In Catilinam (4) ·
  Pro Archia · Pro Caelio · In Pisonem · Pro Milone · Philippicae (4).
- **Chronology is preserved.** `PracticeBank.chooserItems()` merges collections and standalone works
  into one list and orders both by where their works already sit in the works array, so a collection
  appears at the date of its earliest speech rather than being bumped to the front. That is why
  Philippicae comes last and In Verrem first, with the four standalone speeches in between.
- New `PracticeBank` helpers: `directWorks`, `childGroups`, `subtreeWorks`, `groupPath`,
  `chooserItems`. `groups()` is now `childGroups(slug, null)`, so `hasGroups` and every existing
  caller keep working; **authors without a `groups` array are completely unaffected** (Plautus still
  renders its flat 10-button list).
- **Breadcrumb and back link follow the path.** The trail shows every level (Choose / Speeches /
  In Verrem) with all but the last clickable, the back link goes one level up rather than all the
  way out ("← Back to Speeches"), and **"choose another text" from a practice page now returns to the
  work's collection** - `groupOfWork` already returned the nearest group, so that came for free.
- New i18n string `link.backToGroup` in both languages. Collection buttons carry an extra
  `btn-comedy-group` class, available for styling later.
- **`tools/reorder_works.js` buckets by TOP-LEVEL ancestor now.** It previously threw `unknown group
  on <id>` for anything outside `GROUP_ORDER`, so the first batch run after this change would have
  failed; it now resolves each work's group to its root, keeping the speeches run contiguous and
  chronological, which is what the chooser derives collection order from.

### Fixed - the missing "Legacy and Impact" section
- `classifySection()` in `js/data.js` recognised only biography / works / style / excerpt / rating and
  returned `null` for everything else, so **`## Legacy and Impact` was parsed and thrown away**. It is
  now a section of its own, rendered by `js/author.js` immediately **before the difficulty chart** -
  the position it holds in the draft, just ahead of the tier verdict.
- Restored for **all six authors who have one**: Cicero, Caesar, Hirtius, Lucretius, Sallust,
  Catullus. Authors without the section are unaffected, since `addSection` skips empty content.
- **The Italian side needed two fixes.** `build_content_it.js` classified only biography / works /
  style, and its `extractAuthor` return whitelisted the same three fields, so the Italian text was
  being dropped twice over. Both fixed and `js/content-it.js` regenerated: all six authors now carry
  Italian legacy prose, so Italian readers get Italian rather than the English fallback. Note the
  Italian working file heads Cicero's section *Impatto e lascito* while the others use *Eredità e
  Impatto*; the classifier accepts both.
- New i18n string `section.legacy` ("Legacy and Impact" / "Eredità e impatto").

Cache-bust: `?v=93` -> `?v=94`.

## [1.7.7] - 2026-08-26

**The Verrines close at 25 across 7 works** (5 x 5), on the user's call that no part should be left
with one or two excerpts. The five thinner parts go to **3 each** (+7). Speeches **116 across 19
works**, Cicero **118**, the bank **278**.

### Added
- **7 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.7`:
- ***Divinatio*** 2 -> 3, order 1-2 · **19-20** · 40-43: **19-20**, the legal argument that decides
  the hearing (a law made for the allies should be worked *eorum arbitratu*), then **Sicily given a
  voice** - a province filing a formal claim in the court's own language, *quo nomine abs te
  sestertium miliens ex lege repeto*, a hundred million sesterces against a senator's qualification
  of one million. Then the imagined snub to Caecilius, withdrawn because the truth is worse: they do
  know him. The inline chapter numeral is dropped, as in the other Divinatio fragments.
- ***Actio Prima*** 2 -> 3, order ch. I · **ch. XI** · ch. XIV: **ch. XI**, **the hinge of the whole
  prosecution**. Cicero gives up the *perpetua oratio* in open court - *fructum istum laudis ... in
  alia tempora reservemus* - and prosecutes with documents instead, to beat Hortensius's plan of
  running the clock past two sets of games into a friendlier year; *comperendinare* glossed. **The
  five books of the Actio Secunda in this app are the speech being declined here**, written up
  afterwards, which the analysis says outright.
- ***II.1*** 2 -> 3, order **46-47** · 53-54 · 104-105: **46-47**, Delos - the night theft from
  Apollo's temple, the storm, the wreck, the statues found on the beach and put back, told in **five
  historic presents** after a page of perfects; then the apostrophe, and the charge of not knowing
  *litterae* (the *Pro Archia* argument used as an accusation).
- ***II.2*** 1 -> 3, order 2-3 · **86** · **192**: **86**, Scipio restoring Himera's art to the
  Sicilians after Carthage fell - **the exact counterpart to the Segesta Diana in De signis**, and
  the standard the rest of the case measures Verres against; **the shortest excerpt in the Verrines**.
  **192**, the close of the book: *occupatio*, each defence Hortensius might use raised in three words
  and killed in the next clause, the chiastic *magis vir inter mulieres, impura inter viros
  muliercula*, and the Crassi and Antonii who would have refused the brief (**M. Antonius is the
  grandfather held up to Mark Antony in Philippica I**, also in this app).
- ***II.3*** 1 -> 3, order 47 · **120** · **207**: **120**, the registers read out - *Recita tandem*
  is an instruction to the clerk, not a figure - Leontini 84 -> 32, Mutyca 187 -> 86, Herbita 252 ->
  120, **every subtraction in the text checked and correct**; the *lex Hieronica*; and the nouns
  shifting from *aratores* to *patres familias* to *extorres*. **207**, the widest thing in the
  Verrines: *non vim, non arma, non bellum, sed luctum, lacrimas, querimonias*, closing on the
  *deerunt* / *deerit* pivot.

### Changed
- **Accuracy pass over all 15 fragments of the five touched works.** One **real error** found, in a
  note written the previous day (tag **not** bumped): the analysis of II.2.2-3 named ***horreum* and
  *perfugium*** as Cicero's two-noun summary of Sicily's strategic value. **Neither word is in the
  passage** - he writes *subsidium* and *receptaculum*. He does call the island a *horreum*, but
  several sections later in the same book. The note now quotes what is actually there and says where
  the granary line really comes.
- A stray trailing newline was removed from the English of II.3.207 before shipping.

### Notes on sourcing
No new pages; all seven cached since v1.7.5. **Third declared emendation**: The Latin Library prints
*in onerariam navem. suam conicienda curavit* at II.1.46, with a full stop inside the sentence;
Poesia Latina has none and the syntax plainly wants none, so it is emended via `emend` and verify
reports `(1 emended)`. **This slightly widens the emendation policy**, which previously read "only
plain non-words qualify": it now covers **plain errors of any kind confirmed against another
edition** - non-words and manifest punctuation defects - but still **never** variant readings or
classical orthography. Recorded in `tools/README.md`.
**Three passages were rejected outright for source damage** rather than emended, per the standing
trim-first rule: II.2.32 (*practor* for *praetor*, *civirate* for *civitate*, *civi* for *cive* -
three defects in one section), II.2.33 (*ldque* for *Idque*), and the tail of II.3.120 (*++...++* for
dashes and *§jjl* for a numeral, which is why that excerpt stops after Herbita).
Self-proofread; whole bank **116/116 verbatim**.

Cache-bust: `?v=92` -> `?v=93`.

## [1.7.6] - 2026-08-26

**The Verrines are finished.** All five empty works filled (+8), so the corpus stands at **18 across
7 works** - the largest single work in the app. Speeches **109 across 19 works**, Cicero **111**, the
bank **271**.

### Added
- **8 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.6`:
- ***Divinatio in Caecilium*** (2): **1-2**, the exordium - a career *patronus* explaining why he is
  *ad accusandum descendere*, and the Sicilians who came to him *publice* holding him to a promise
  made when he was quaestor at Lilybaeum in 75. **The source's opening word is lowercase `si`**, a
  lost decorated initial. **40-43**, the retort *quid ergo? haec in te sunt omnia?* answered
  *Vtinam quidem essent!*, then *non solum commoveor animo, sed etiam toto corpore perhorresco*, then
  the jab at Caecilius memorising a stock exordium (*Iovem ego optimum maximum* / *vellem, si fieri
  potuisset, iudices*). The source's inline chapter numeral is dropped, since this speech is cited by
  section.
- ***In Verrem I: Actio Prima*** (2), **cited BY CHAPTER**: **ch. I**, *his iudiciis quae nunc sunt,
  pecuniosum hominem, quamvis sit nocens, neminem posse damnari*, reported rather than asserted
  (*inveteravit opinio ... omnium sermone percrebruit*), with the offer to the senatorial juries whose
  monopoly fell within months; keeps the editorial `[reus]` and `[C. Verres]`. **ch. XIV**, the
  three-year budget in reported speech - one year for himself, one *patronis et defensoribus*, the
  third *totum iudicibus* - and then the argument that the provinces would like the extortion court
  abolished, closing on *se avarissimi hominis cupiditati satisfacere posse, nocentissimi victoriae
  non posse*.
- ***II.1 De praetura urbana*** (2): **53-54**, Aspendos stripped bare and the Greek proverb of the
  harpist who *intus canebat*, turned against a man who put the harpist's statue in his innermost
  rooms; then Diana of Perge, and the argument that even a storming army took its spoils to Rome.
  **104-105**, the auspices taken *a Chelidone*, and the Annius Asellus case: the *lex Voconia* did
  not touch an unregistered father, so Verres offered to sell an edict clause to the second heir -
  and then sent quietly to the girl's mother to be paid for **not** issuing it. The same clause sold
  twice in opposite directions.
- ***II.2 De praetura Siciliensi*** (1): **2-3**, why Sicily matters - *princeps ... prima omnium ...
  prima docuit ... sola fuit*, the first foreign nation to come over (263 BC), the first territory
  called a *provincia* (241), and the *horreum* and *perfugium* that brought down Carthage.
- ***II.3 De frumento*** (1): **47**, Cicero returning *quadriennio post* his own quaestorship and
  finding the corn country like a war zone - *ager ipse cultorem desiderare ac lugere dominum
  videretur*, the six named districts, counting owners rather than *iuga*, and *in uberrima Siciliae
  parte Siciliam quaereremus*.

### Changed
- **The Actio Prima is cited by chapter, in Roman numerals.** The Latin Library prints that speech
  divided into 18 units numbered `[1]`-`[18]`; those are **chapters**, not the 56 sections modern
  editions use. Printing `[1]` would read as a section number, so the marker is normalised to `[I]`,
  matching the app's existing convention that Roman numerals mean chapters (as in the *In Pisonem*).
  `verify.js` strips both Arabic and Roman markers from either side, so the fragments still check
  verbatim, and `apply_batch.js` has sorted Roman chapter citations since v1.7.4.
- **Second declared emendation in the bank.** The Latin Library prints *in bis rebus* at II.1.105,
  which is not Latin; the reading *in his rebus* was confirmed against **Poesia Latina**, the
  proofreading-only third source added in v1.7.3. Handled with the `emend` field, so the source's own
  reading is restored before comparison and every other character is still proved verbatim -
  `verify.js` reports it as `OK (In Verrem II.1.104-105) (1 emended)`. The analysis says so in both
  languages. Only *Pro Caelio* 12 and this fragment carry an emendation.

### Notes on sourcing
No new pages: all five were fetched in v1.7.5, when the false note claiming the Actio Prima was
unavailable was corrected. Nothing retyped; built through `tools/`. The verbatim count rose 101 ->
**109**, which is the check that no work is being silently skipped for want of a `sources.json` entry.
Self-proofread; whole bank **109/109 verbatim**.

Cache-bust: `?v=91` -> `?v=92`.

## [1.7.5] - 2026-08-25

**In Verrem split into seven works**, and **De signis (II.4) 2 -> 5** and **De suppliciis (II.5)
1 -> 5** (+7). Speeches reach **101 across 19 works**, Cicero **103**, the bank **263**. The split was
made possible by correcting a false note in this repo - see below.

### Fixed - a false note that cost five texts
- `tools/sources.json` claimed: *"The Verrines actio prima is NOT on TLL at all (verres.1 / verrem
  both 404), which is why In Verrem is sourced from the actio secunda only."* The premise is true;
  the conclusion is wrong. **The slug is `ver1`.** The authoritative index, `cicero/ver.shtml`, lists
  **all seven parts**, every one returning 200: `caecilium` (Divinatio), `ver1` (Actio Prima), and
  `verres.2.1` ... `verres.2.5`. The note has been corrected in place and the five missing pages are
  now fetched and cached. **`ver1` prints 18 CHAPTER numbers as `[1]`-`[18]`, not the 56 sections
  modern editions use** (they sit evenly across the page, and the speech has 18 chapters), so that
  part will be cited by chapter when it lands in v1.7.6.

### Changed - structure
- **`in-verrem` becomes seven sibling works inside the Speeches group**, on the user's decision
  (25/08/2026), superseding the "keep it as one work" call of 2026-08-20 and answering the standing
  "ask before splitting" note. The Verrines are one prosecution in seven speeches, so this follows the
  `in-catilinam-i`...`-iv` precedent from v1.6.0. **Pure data change: no JS, no HTML, no CSS.** New
  ids and labels: `in-verrem-divinatio` (Divinatio in Caecilium) · `in-verrem-i` (In Verrem I: Actio
  Prima) · `in-verrem-ii-1` (De praetura urbana) · `-ii-2` (De praetura Siciliensi) · `-ii-3` (De
  frumento) · `-ii-4` (De signis) · `-ii-5` (De suppliciis), each with a `labelIt`.
- **The three existing fragments were routed by citation** into II.4 and II.5 and **keep their
  `1.5.0` tags** - `version` means first-added, never last-edited - so they still show the papyrus
  "Added in v.1.5.0" badge. `version.html?v=1.5.0` rebuilds their deep links from the bank and
  resolves them to the new works automatically.
- **The five works with no fragments yet are invisible in the chooser** (`PracticeBank.works()`
  filters out zero-fragment works), so the Speeches grid shows **14** buttons, not 19. They appear as
  v1.7.6 fills them.
- `SPEECH_ORDER` in `tools/reorder_works.js` gained the seven ids in canonical order of the case.
  Since all seven are 70 BC, chronology cannot order them among themselves; the comment says so.
- **Accepted cost:** an external bookmark to `...&work=in-verrem` now shows the "no fragment" empty
  state. Verified: it degrades, it does not throw.

### Added
- **7 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.5`:
- ***II.4 De signis***, order 1-2 · **4-5** · 77 · **106-107** · **115**: **4-5**, Heius's shrine at
  Messana - the marble Cupid of Praxiteles, the bronze Hercules of Myron, the two Canephoroe of
  Polyclitus - with *nimirum didici etiam, dum in istum inquiro, artificum nomina* and the staged
  prompt *sed earum artificem--quem? quemnam? recte admones--Polyclitum esse dicebant*; the Mummius
  contrast; closes on the double dative *domus erat non domino magis ornamento quam civitati*.
  **`idiotae` here is the same Greek loanword thrown at Piso in the In Pisonem.** **106-107**, Henna,
  *umbilicus Siciliae*, Ceres and Proserpina - **the plainest Latin in the app**, deliberately, since
  the charge that follows is the theft of the goddess's statue; *peragrasse* syncopated, as
  *complesse* is in the Segesta fragment. **115**, the Marcellus comparison, four *huius ... illius*
  pairs closing on the chiasmus *ab illo qui cepit conditas, ab hoc qui constitutas accepit captas
  dicetis Syracusas*. **Starts mid-section** at *Vnius etiam urbis*; at 599 characters it is the
  shortest fragment in the work.
- ***II.5 De suppliciis***, order **26-27** · **100** · **118-119** · 162-163 · **169-170**:
  **26-27**, the working year - *non modo extra tectum, sed ne extra lectum quidem*, spring beginning
  *cum rosam viderat*, the eight-man litter with the *perlucidus Melitensis* cushion *rosa fartus*,
  and the day closing with the rest of the time owed *Veneri et Libero*. **100**, the pirate
  *myoparo* in the Great Harbour, *praedonum remi respergerent*, the pirates leaving *satietate*;
  keeps the editorial `<omnium>`. **118-119**, the prison door and the executioner's tariff -
  *tantum ... tantum* with the amounts left blank - and *Non vitam liberum, sed mortis celeritatem
  pretio redimere cogebantur parentes*. **169-170**, the cross turned to face Italy, and *facinus est
  vincire civem Romanum, scelus verberare, prope parricidium necare: quid dicam in crucem tollere?*

### Changed - translations
- **Accuracy pass over all 10 fragments of both books.** One correction, to a v1.5.0 fragment whose
  tag is **not** bumped: at II.5.163 the English rendered *o ius eximium nostrae civitatis* as
  "privilege" rather than "right" - the Italian already had *diritto*, and *ius civium* is the thing
  the entire speech is about.

### Fixed - pipeline
- **`create_works.js` and `reorder_works.js` hardened**, both being run for the first time since the
  v1.7.4 incident. Both computed head/tail with `indexOf` and sliced on the result, so under git's
  `core.autocrlf=true` a checkout returns CRLF, `indexOf` gives -1, and `slice(-1)` silently truncates
  the entire bank. They now normalise line endings and assert both markers before writing, matching
  `apply_batch.js`.

### Notes on sourcing
Every part comes from The Latin Library as usual - no second host, no orthography question, no change
to the verifier. Each of the seven works has its own `sources.json` entry, which matters because
`verify.js` **silently skips** any work it cannot map to a page: the verbatim count rising from 94 to
**101** is the proof that nothing dropped out. Editorial marks kept as printed and explained:
`<omnium>` (II.5.100), alongside the existing `<hospitis>` (II.4.2). Self-proofread; whole bank
**101/101 verbatim**.

Cache-bust: `?v=90` -> `?v=91`.

## [1.7.4] - 2026-08-25

***In Pisonem* 3 -> 8.** The Speeches group reaches **94 across 13 works**, Cicero 96, the bank 256.
Two tool fixes came out of building it, one of them a latent way to destroy the whole bank.

### Added
- **5 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.4`. Order I · **VI** · X · **XI** · **XIX**
  · **XXVI** · XXVIII · **XLI**, spread across all 41 chapters:
- **ch. VI** - the morning call. *Meministine, caenum ...*: Piso emerging from a *gurgustium* at the
  fifth hour *involuto capite soleatum*, breathing a *popina* over them, pleading *vinulenta
  medicamina*, and finally *turpissime ructando eiecisti*. Three words for a dive (*gurgustium*,
  *popina*, *ganea*) in five lines. The **shortest fragment in the work at 493 characters**, all one
  question, closing on a *cum ... tum* pair that ranks the belch above the insults.
- **ch. XI** - the Seplasia, Capua's perfume street, taking one look and rejecting a *Campanus
  consul*; the opening tetracolon *magnum nomen est, magna species, magna dignitas, magna maiestas
  consulis* knocked down by five negative clauses; Gabinius's *madentes cincinnorum fimbriae* and
  *purpurissatae buccae*; then the swerve into flattering modern Capua, because Capuans vote.
- **ch. XIX** - **the one serious page.** *Fortunae enim ista tela sunt non culpae; supplicium autem
  est poena peccati*, proved on Regulus, Marius and Marcellus, with four lines of **Ennius's
  *Thyestes*** quoted and simultaneously disowned as moving *volgi animos non sapientium*
  (**cross-links to Ennius**, as Pro Caelio 18 does). Then *quae est igitur poena ...?* answered not
  with a torture but with a job description.
- **ch. XXVI** - ***O tenebrae, o lutum, o sordes, o paterni generis oblite, materni vix memor!***
  Four vocatives, no verb, the first three things rather than people. The Milan auctioneer
  grandfather, Crassus and Cotta hunting the Alps for a triumph, and the Greek loanword *idiotae* in
  quotation marks because it is Piso's own Epicurean vocabulary handed back.
- **ch. XLI** - the close. *Non eventis sed factis cuiusque fortunam ponderari* and *neque in tabellis
  paucorum iudicum sed in sententiis omnium civium*, which the speech needs because Piso was never
  prosecuted; ten groups who have already condemned him; four *qui* clauses ending on *qui se ipse
  condemnet*; then eleven participles describing a man alive and permanently afraid, one word to
  close - *vidi* - and the *sordidum* / *sordidatum* pun.

### Changed
- **Translation-accuracy pass over the whole speech** (5 new + 3 existing = 8 fragments). The speech
  is built on *frons*, and the app rendered it "face" in ch. I's opening line and "forehead" ten words
  later in the same sentence, losing the thread; both now read "brow", which carries the anatomy and
  the effrontery together, as *frons* does. Same fix at ch. XXVIII, and the Italian opening now reads
  *fronte* rather than *faccia*. **Tags not bumped.** Four corrections went into this release's own
  new work before shipping: at ch. XI *agnovissent* had lost its object and *duumvirum* its office,
  and the two adjectives on *buccae* had been merged; at ch. XXVI a *specillum* is a surgical probe,
  not a magnifying glass, which Romans did not have; and at ch. XLI two counts in my own analysis were
  simply wrong (eleven groups for ten, "two words" for the single word *vidi*), both recounted against
  the text.

### Fixed - pipeline
- **`apply_batch.js` could silently truncate the entire fragment bank.** It locates the file's head
  and tail with `indexOf` and slices on the result; with git's `core.autocrlf=true` a `git checkout`
  hands back CRLF, so `tailMark`'s `'\n\n'` stops matching, `indexOf` returns `-1`, and `slice(-1)`
  quietly keeps **one character** instead of the tail. This actually happened mid-build: the written
  file lost `global.PracticeBank` entirely and only `verify.js` failing to parse it gave it away. The
  reader now normalises line endings first, **and both marker lookups are asserted**, so a future
  change to the file's shape fails loudly instead of destroying data.
- **`apply_batch.js` now sorts chapter citations.** `firstSection` parsed only Arabic numerals, so
  every `(In Pisonem, ch. N)` scored 0 and new fragments were simply appended - the trap the roadmap
  had flagged for this release. It now falls back to parsing the Roman numeral, so In Pisonem sorts
  itself like every other work. Verified on the real data: the batch reordered to I · VI · X · XI ·
  XIX · XXVI · XXVIII · XLI with no manual editing.

### Notes on sourcing
`in-pisonem` was already in `tools/sources.json`; no new work, no Latin retyped. Four of the five are
**partial chapters**, which is long-standing practice here (11 other fragments start mid-section):
ch. VI starts at *Meministine*, and XIX, XXVI and XLI stop before their chapters turn to a new topic.
Citations stay **by chapter**, since The Latin Library prints no section numbers for this speech.
Self-proofread; whole bank **94/94 verbatim**.

Cache-bust: `?v=89` -> `?v=90`.

## [1.7.3] - 2026-08-25

***Pro Caelio* 3 -> 8.** Includes the two passages the user asked for by name: the **Palatina Medea**
(18) and the **quadrantaria** joke (62). The Speeches group reaches **89 across 13 works**, Cicero 91,
the bank 251. Also a **fix to the source pipeline** (see below).

### Added
- **5 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.3`. Order 1 · 12 · 18 · 32 · 33-34 ·
  37-38 · 42 · 62:
- **1** - the exordium, one enormous period built as a three-stage machine (*miretur ... nec dubitet*
  / *cum audiat ... non improbet, requirat* / *cum audiat ... non reprehendat, putet, existimet*), in
  which an imagined foreigner revises his verdict downward three times. Seven present subjunctives
  hanging off one *si*. **The hardest Latin in the speech**, deliberately included to widen the range.
  Ends on the leisure joke, *quibus otiosis ne in communi quidem otio liceat esse*.
- **12** - Catiline's virtues *non expressa signa, sed adumbrata [lineamenta]*, a metaphor from
  sculpture (*exprimere* = model in full relief, *adumbrare* = shade in outline), with *maximarum ...
  virtutum* wrapped round *signa*; then four antithetical pairs. **Cross-links to the Catilinarians**
  (32 excerpts in the app). **Trimmed one sentence early** - see sourcing below.
- **18** - **the Palatina Medea (user's request)**. Cicero quotes the opening of **Ennius's *Medea
  Exul*** (*Utinam ne in nemore Pelio--*), breaking off mid-line because the jury could finish it,
  then two lines more ending *Medea animo aegra, amore saevo saucia*, and lands *hanc Palatinam
  Medeam*. **Cross-links to Ennius** in the Archaic era. Clodia is never named anywhere in it.
- **37-38** - **the two comic fathers**. The harsh one quoted three times from **Caecilius Statius**,
  the mild one being Micio from **Terence's *Adelphoe*** (*fores ecfregit, restituentur; discidit
  vestem, resarcietur*). **Cross-links to both**, which are in the Archaic era with 8 and 5 excerpts.
  Archaic forms in the verse: *Egon*, *relicuom*, *dide*, *disice*, *nosti*. *Versura* in 38 glossed
  (borrowing at interest to clear an earlier debt).
- **62** - **the quadrantaria joke (user's request)**. The prosecutor's story told at length in his
  own words, then demolished physically: *calceati et vestiti*, men in togas with nowhere to hide in
  a bathhouse. Closes on *quadrantaria illa permutatione* - a *quadrans* was the bath entry fee, and
  Quintilian records that Caelius coined *quadrantaria Clytaemnestra* for Clodia. Cicero uses the
  coin, not the nickname.

### Changed
- **Pipeline fix in `tools/strip.js`.** The Latin Library sets verse with `<br>` between lines and no
  surrounding whitespace (`discidit<br>Vestem` at *Pro Caelio* 38). `stripHtml` deleted the tag along
  with every other, welding the two words into `disciditVestem`. It now converts `<br>` to a newline
  before stripping tags. **All 25 source pages re-fetched with `--force` and the whole bank
  re-verified: still 0 mismatched**, so nothing regressed. A scan of the rebuilt cache found the
  artefact in only one live page (`cael.txt`) and one not-live one (`att12.txt`); both are now clean.
- **Translation-accuracy pass over the whole speech** (5 new + 3 existing = 8 fragments). **The three
  v1.7.0 fragments (32, 33-34, 42) needed no corrections** - checked clause by clause. Four
  tightenings were made to this release's own new work before shipping: *liceat esse otiosis* had lost
  its infinitive in the English at 1 and read awkwardly in the Italian; *nostras domus* had its noun
  left implied in both languages at 18; and *facis ut nequiquam velim* at 37 was rendered as "make
  worthless" instead of "make me wish in vain".

### Notes on sourcing
`pro-caelio` was already in `tools/sources.json`; no new work. Built through `tools/`, no Latin
retyped. **Section 12 is trimmed one sentence short of its end**: what follows is Catiline as a
*monstrum* compounded of opposites, but the source prints *ex contrarus* for *ex contrariis*, and the
repo policy is to trim past an obvious source typo rather than reproduce or silently mend it. The
analysis says so. Editorial brackets kept as printed and explained: `[Atratini]` at 1 (a name supplied
where the manuscripts lack it) and `[lineamenta]` at 12. **Separately noted for later:** `att1.txt`
carries *ab aLus* for *ab aliis* (Ad Atticum I.9), a genuine source typo that will need handling when
the Letters group is built. Self-proofread; whole bank **89/89 verbatim**.

### Changed - follow-up the same evening (was briefly numbered v1.7.4)
- ***Pro Caelio* 12 now runs to the end of the section.** It had been trimmed one sentence short
  because The Latin Library prints *ex contrarus*, which is not a Latin word. **The user checked the
  speech against [Poesia Latina](http://www.poesialatina.it/index.htm) and confirmed the reading is
  *ex contrariis***, since verified directly. The app now prints the corrected word and the excerpt
  ends on the sentence the paragraph was built for: *Neque ego umquam fuisse tale monstrum in terris
  ullum puto, tam ex contrariis diversisque et inter se pugnantibus naturae studiis cupiditatibusque
  conflatum.* Latin re-extracted through `tools/`, not retyped; English, Italian and both analyses
  extended to match. The analysis closes on *monstrum* as a portent rather than a horror, and on
  **`conflatum`** as a smith's word for melting metals into one mass, so a passage that opened by
  calling Catiline a sketch rather than a statue now ends by calling him an alloy that should not
  have been possible.
- **The `version` tag stays at `1.7.3`**, per the standing rule that `version` means first-added and
  never last-edited, so the "NEW!" badge did not move.

### Added - pipeline
- **`emend` support in `tools/verify.js` and `tools/apply_batch.js`.** A fragment may now carry
  `emend: [[sourceReading, appReading], ...]` for the rare case where the source has a plain error and
  the app prints the corrected word. `apply_batch.js` applies the substitution to the extracted Latin
  and records it on the fragment; `verify.js` **puts the source's own reading back before comparing**,
  so every character except the declared one is still proved verbatim. A stale emendation - one whose
  `appReading` no longer appears in the fragment - is reported as a hard failure, which was tested:
  breaking the word deliberately produced `FAIL (Pro Caelio 12) stale emendation` and `1 mismatched`.
  Successful ones print as `OK (Pro Caelio 12) (1 emended)`.
- This is deliberately distinct from the existing `fix`, which only reconciles source **style** that
  `normalise()` already handles (Pro Milone's `11.` markers) and is not recorded anywhere. An
  emendation changes the text, so it is declared, stored and machine-checked. **`(Pro Caelio 12)` is
  the only emended fragment in the bank.**
- **Third source added, for proofreading only: [Poesia Latina](http://www.poesialatina.it/index.htm)**
  (`_ns/ProsaLat/Cic/<work>.html`). It is **not** a source for the app's Latin, which still comes from
  The Latin Library so that `verify.js` has one text to check against. It is consulted **only when a
  typo is suspected** on The Latin Library or Splash Latino. Note that it prints **classical
  orthography** - consonantal *v* as *u* (*uidetur*, *uitia*, *diuersisque*), and *inl-*/*inr-* for
  *ill-*/*irr-* - which is an editorial convention, **not** a typo, so never "correct" against it on
  those grounds. It also carries real variants: at *Pro Caelio* 12 it has *diversisque **atque** inter
  se pugnantibus* where The Latin Library has *et*. Only plain errors are emended.

Cache-bust: `?v=86` -> `?v=87`, then `?v=87` -> `?v=88` for the follow-up, then `?v=88` -> `?v=89`
when the follow-up was renumbered back into this entry.

## [1.7.2] - 2026-08-24

**The Philippics finished.** *Philippica II* goes 3 -> **8** and *Philippica XIV*, the last speech
Cicero published, goes 3 -> **7**. With v1.7.1 that brings all four Philippics to the sizes the user
set (I 7, II 8, IV 5, XIV 7), and the Speeches group to **84 across 13 works**. Cicero passes 85.

### Added
- **9 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.2`:
- ***Philippica II*** (autumn 44, `cicero/phil2.shtml`), +5, order 1 · **28-29** · **44** · 63 ·
  **67** · **85-86** · **104** · 118-119: **28-29**, Antony's charge that Cicero was behind the
  assassination, answered by widening it - *omnes boni, quantum in ipsis fuit, Caesarem occiderunt;
  aliis consilium, aliis animus, aliis occasio defuit, voluntas nemini* (the verb written once, with
  the third member, understood in the other three); **44** (see below); **67**, *Quae Charybdis tam
  vorax?* and the auction of Pompey's house, ending on the *conchyliata peristromata* spread over
  slaves' bunks, with the potential subjunctive *videres*; **85-86**, the Lupercalia in historic
  presents, *Gemitus toto foro*, the repeated-action imperfects *inponebas* / *reiciebat* against
  *cum plangore populi* / *cum plausu*, closing on the sentence that made the speech unpublishable;
  **104**, Varro's villa at Casinum (**cross-links to Varro**, who has his own entry and 11 excerpts),
  the *hasta Caesaris* / *temeritas tua* contrast, and *Ab hora tertia bibebatur, ludebatur,
  vomebatur*.
- ***Philippica XIV*** (April 43, `cicero/phil14.shtml`), +4, order 1-2 · **6** · **10** · 12 ·
  **23** · **27** · 31-32: **6**, *Imbuti gladii sunt ... vel madefacti potius*, the verbless dilemma
  *si hostium ... si civium*, and *Quousque* quoting the opening of the *First Catilinarian* twenty
  years on; **10**, six *quis* clauses on one verb over the two days Rome believed Antony had won,
  plus *metator* and *decempeda* (Rome already surveyed for distribution); **23**, the historical
  proof that no *supplicatio* was ever voted for a civil war, and *quos voluit, expulit, quos potuit,
  occidit*; **27**, Hirtius carrying the eagle of the Fourth (**cross-links to Hirtius**), the
  forty-word hyperbaton between *hostes nefarios* and *imminentes*, and *O solem ipsum beatissimum*.

### Changed
- ***Philippica II* 44 restored, at the user's explicit instruction (2026-08-24)**, reversing the
  v1.5.0 exclusion. The excerpt runs to the end of 44 and **deliberately stops before 45**, which the
  user confirmed after being shown what 45 contains. The analysis names the technique: four garments
  in a row (*praetexta / virilis / muliebris / stola*), the *lex Roscia theatralis* on where bankrupts
  had to sit, and *collocare in matrimonio* used of the wrong pair of people. No act is described
  anywhere in the section.
- **Translation-accuracy pass over both speeches** (9 new + 6 existing = 15 fragments). Corrections
  to fragments from v1.5.0 and v1.7.0, whose `version` tags are deliberately **not** bumped:
  - *Philippica XIV.12* (EN + IT) - *me ovantem et prope triumphantem* had come out as "almost in
    ovation and almost in triumph" / "quasi in ovazione e quasi in trionfo". *Prope* governs only
    *triumphantem*; doubling it flattens a deliberate gradation. Now "in ovation and almost in
    triumph".
  - *Philippica XIV.31* (EN + IT) - *pro patria ... reddita* read as a dative ("paid to one's
    country" / "alla patria") instead of "for".
  - *Philippica XIV.32* (EN) - *impii* rendered "traitors", which loses the *impii* / *piorum sedem*
    pair the paragraph turns on. Now "impious men".
  - *Philippica II.1* (EN) - *impios civis* had lost its noun ("the wicked" for "disloyal citizens";
    the Italian was already right), and *poenas dare* was unidiomatic.
  - *Philippica II.118-119* - *parturit* softened to "carrying" / "porta in grembo" in a sentence
    whose whole point is the metaphor of labour; and one ungrammatical Italian clause at *de te tu
    videris*.
  - *Philippica II.28-29*, this release's own - *Omnes ergo in culpa* is verbless and third person in
    context; both languages had supplied a first-person plural.

### Notes on sourcing
Both speeches already in `tools/sources.json`; no new work, no `sources.json` edit. Built through
`tools/`, no Latin retyped. **Two source defects found and handled rather than silently corrected:**
The Latin Library prints *quanto verius **non** negabo seni* at II.119 where the sense requires
*nunc* (most editions read *nunc negabo*) - the Latin is kept verbatim, the translation follows the
reading the sentence needs, and a note in the analysis explains the difference. At XIV.23 it prints
*supplicatio [Cinnae} nulla victori*, a square bracket closed with a curly brace; reproduced exactly
and explained in the analysis. Also at II.104 the source marks a chapter division (`[XLI]`) mid-section;
dropped, since the app cites by section for every speech except the *In Pisonem*. Self-proofread;
whole bank **84/84 verbatim**.

Cache-bust: `?v=85` -> `?v=86`.

## [1.7.1] - 2026-08-24

**Two Philippics deepened**, the first of two releases that bring all four up to size: *Philippica I*
goes 3 -> **7** and *Philippica IV*, the shortest of the fourteen, goes 3 -> **5**. Every translation
in both speeches, new and old, was re-checked clause by clause against the Latin.

### Added
- **6 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.1`:
- ***Philippica I*** (2 Sept 44, `cicero/phil1.shtml`), +4, order 1-2 · **7** · **11-12** · **18** ·
  **26** · 33-34 · 38: **7**, the voyage - Brundisium avoided, Syracuse on the Kalends of Sextilis,
  Leucopetra, and *reiectus austro sum in eum ipsum locum, unde conscenderam*; deliberately the
  easiest Latin in the speech, a clean run of `cum` + pluperfect subjunctive; **11-12**, *Hannibal,
  credo, erat ad portas* and Appius Claudius Caecus carried in blind and old (**cross-links to the
  Pro Caelio 33-34 fragment**), then the payoff, Antony saying in the house *cum fabris se domum meam
  venturum esse*; **18**, the *acta Caesaris* argument by induction - *Quaere acta Gracchi; leges
  Semproniae proferentur. Quaere Sullae; Corneliae* - and the *chirographa* trap; **26**, the bronze
  tablet, *CONSULES POPULUM IURE ROGAVERUNT ... POPULUSQUE IURE SCIVIT* dismantled by *Qui populus?
  Quo iure?*, closing on the asyndetic *demonstro vitia; tollite: denuntio vim, arma; removete*.
- ***Philippica IV*** (20 Dec 44, `cicero/phil4.shtml`), +2, order 1-2 · **5** · 8 · **12** · 15:
  **5**, the *legio Martia* judging Antony a public enemy before the Senate did and drawing its name
  *divinitus* from Mars (**cross-links forward to Philippica XIV.31-32**, the monument to its dead),
  plus the gerundive-in-indirect-statement *arbitratur ... honores exquirendos*; **12**, Antony as
  *immani taetraque belua* fallen *in foveam*, and the closing antithesis *agitur enim, non qua
  condicione victuri, sed victurine simus an cum supplicio ignominiaque perituri*.

### Changed
- **Translation-accuracy pass over both speeches** (6 new + 6 existing = 12 fragments, checked clause
  by clause for mood, tense, voice, ellipsis, negation scope and idiom). Corrections to fragments
  added in v1.7.0, whose `version` tags are deliberately **not** bumped:
  - *Philippica I.1-2* (EN) - *omnem memoriam discordiarum* was rendered "all memory of **our**
    discords"; the possessive is not in the Latin. Opening clause restructured in EN and IT, where
    *Antequam de re publica ... dicam ea, quae ...* had been carried over as word order rather than
    as a sentence.
  - *Philippica IV.1-2* (IT) - *maximis senatus laudibus ornatus est* read "onorato **dalle** più alte
    lodi", turning an ablative of means into an agent; now "onorato **con** le più alte lodi".
- Within this release's own new fragments, three renderings were tightened before shipping: *ne meus
  ... adventus suspicionis aliquid afferet* no longer adds "upon them" / "su di loro"; the gloss of
  *supplicatio* moved out of the translation of I.11-12 and into its analysis, where the app puts
  technical terms; and the English of I.26 now keeps *iure* visible ("by right" twice) so the formula
  still rhymes with the *Quo iure?* that destroys it - the Italian already did. The title of I.26
  follows, from "The consuls duly put the question" to **"By what right?"**.

### Notes on sourcing
Both speeches are well preserved and already in `tools/sources.json`; no new work, no `sources.json`
edit. Built entirely through `tools/` (extract -> apply_batch -> verify), so no Latin was retyped.
Editorial marks kept as The Latin Library prints them and explained in the analysis: the bracketed
`[iam]` at IV.12, and I.7's *afferet*, a future indicative in a clause of fearing where most editions
read *adferret*. Self-proofread; whole bank re-checked, **75/75 verbatim**.

Cache-bust: `?v=84` -> `?v=85`.

## [1.7.0] - 2026-08-23

**Five new speeches**, the first new works since v1.5.0: Pro Caelio, In Pisonem and Philippics I, IV
and XIV, three fragments each. The Speeches group goes from 8 works to **13**, and Cicero's practice
bank passes 70 excerpts.

### Added
- **15 new fragments** (verbatim Latin from The Latin Library + original Italian and English +
  analysis, with bilingual metadata), tagged `version: 1.7.0`:
- ***Pro Caelio*** (56 BC, `cicero/cael.shtml`): **32**, the staged slip *cum istius mulieris viro -
  fratre volui dicere; semper hic erro*, and the closing *amicam omnium potius quam cuiusquam
  inimicam*; **33-34**, Appius Claudius Caecus raised from the dead to scold Clodia, chosen because
  *minimum enim dolorem capiet, qui istam non videbit*, ending on the three public works (*ideone ego
  pacem Pyrrhi diremi... ideo aquam adduxi... ideo viam munivi*); **42**, *detur aliquid aetati; sit
  adulescentia liberior*, with the long list of limits that follows.
- ***In Pisonem*** (55 BC, `cicero/piso.shtml`): **ch. I**, the face that won an election and the
  smoke-blackened *imagines* Piso resembles only in colour; **ch. X**, Gabinius dancing naked while
  not fearing *fortunae rotam*, then the definition of a consulship ending in the etymology, *rei
  publicae consulendo*; **ch. XXVIII**, the household Epicurean, the *admissarius* who *adhinnivit*
  at the word *voluptas*, and the lame man with the ball.
- ***Philippica I*** (2 Sept 44, `phil1`): **1-2**, the amnesty in the temple of Tellus (Cicero using
  the Athenian Greek word) and the imperfect-tense portrait of an Antony who still behaved well;
  **33-34**, *libertate esse parem ceteris, principem dignitate* and the *oderint dum metuant* of
  Accius's *Atreus* (**cross-links to the Accius fragment in the Archaic era**); **38**, *mihi fere
  satis est, quod vixi, vel ad aetatem vel ad gloriam*.
- ***Philippica IV*** (20 Dec 44, `phil4`): **1-2**, *hostis... nondum verbo adpellatus, sed re iam
  iudicatus*, plus the praise of the 19-year-old Octavian's privately funded army; **8**, the chiastic
  dilemma *si consul Antonius, Brutus hostis; si conservator rei publicae Brutus, hostis Antonius* -
  at 250 characters, the shortest fragment in the app; **15**, *scelere par est illi, industria
  inferior*, the graded Catiline comparison.
- ***Philippica XIV*** (April 43, `phil14`): **1-2**, the *saga* and the toga, and *confectio autem
  huius belli est D. Bruti salus*; **12**, *hostium dico; ita, inquam, hostium*, and the ovation the
  crowd gave Cicero the day before; **31-32**, the monument to the Martian legion, *O fortunata mors,
  quae naturae debita pro patria est potissimum reddita* and *brevis a natura vita vobis data est, at
  memoria bene redditae vitae sempiterna*.

### Changed
- The Speeches group keeps its chronological order with the new works slotted in: In Verrem (70) ·
  In Catilinam I-IV (63) · Pro Archia (62) · **Pro Caelio (56)** · **In Pisonem (55)** · Pro Milone
  (52) · **Philippica I (Sept 44)** · Philippica II (autumn 44) · **Philippica IV (Dec 44)** ·
  **Philippica XIV (Apr 43)**.

### Notes on sourcing
**The Latin Library prints *In Pisonem* with chapter divisions only, no section numbers**, unlike
every other Cicero speech in the app. Rather than guess at the section numbers most editions use,
these three fragments are cited by chapter (`In Pisonem, ch. I`) and the convention is explained in
the first fragment's analysis. Worth revisiting if a section-numbered text is sourced later.
`verify.js` gained Roman-numeral chapter-marker stripping so those fragments stay machine-checked.
Deliberately excluded, on the standing policy: *Pro Caelio* 36 (explicit) - the Appius Claudius
fragment stops at the end of 34. Self-proofread; whole Speeches group **69/69 verbatim**.

Cache-bust: `?v=83` -> `?v=84`.

## [1.6.7] - 2026-08-23

**Pro Milone goes to 8**, finishing the pair of releases that deepened the two speeches still sitting
at 3. Every work in the Speeches group is now at 7 or more except In Verrem, Philippica II, Pro Caelio
and In Pisonem, which the v1.7.x roadmap covers.

### Added
- **5 new *Pro Milone* fragments** (verbatim Latin from `cicero/milo.shtml` + original Italian and
  English + analysis, with bilingual metadata), tagged `version: 1.6.7`:
  - **28-29** - the *narratio*, and the most famous piece of slanted narrative in Roman oratory. The
    two journeys set side by side (Milo with carriage, cloak, wife and a *magno et impedito et
    muliebri ac delicato* retinue; Clodius *expeditus*, on horseback, no wife), then the ambush in
    short historic presents, then the concession that Milo's slaves killed Clodius, insulated by three
    ablatives absolute: *nec imperante nec sciente nec praesente domino*. Analysis notes that Asconius
    tells it differently.
  - **32** - *illud Cassianum 'cui bono fuerit'*, the rule of thumb of L. Cassius Longinus Ravilla,
    plus the pre-emptive concession *etsi boni nullo emolumento impelluntur in fraudem, improbi saepe
    parvo*.
  - **57** - the shortest fragment in the speech: staccato question and answer (*Occideritne? occidit.
    Iure an iniuria?*) closing on *facti enim in eculeo quaestio est, iuris in iudicio*, with the note
    on Roman procedure (slave evidence taken under torture, freedmen's not) that makes Milo's
    manumissions either a cover-up or a reward.
  - **72** - the hypothetical boast, *Occidi, occidi*, with *mentiri* keeping it technically
    counterfactual; Maelius and Gracchus dismissed as lesser cases, *quorum interfectores impleverunt
    orbem terrarum nominis sui gloria*. Stops at the first item of the catalogue (the Bona Dea
    scandal); the *eum qui* list runs on through 73-74, which is noted in the analysis.
  - **84** - *est, est profecto illa vis*: the argument from analogy (you cannot see your own mind
    either) and the god who does not strike Clodius down but *mentem iniecit*, put the idea in his head.
- Order in the work: 1-2 · 10-11 · 28-29 · 32 · 57 · 72 · 84 · 104-105.

### Notes
Deliberately stopped short of the explicit stretches, as with Phil. II.44 and Cat. II.8: the Pro Milone
72 extract ends before the incest allegation of 73. Self-proofread; whole Speeches group re-checked,
**54/54 verbatim**.

Cache-bust: `?v=82` -> `?v=83`.

## [1.6.6] - 2026-08-23

**Pro Archia goes to 8**, the first of two releases deepening the two speeches that were still at 3.
Cicero's speeches also go back to **chronological order**.

### Added
- **5 new *Pro Archia* fragments** (verbatim Latin from `cicero/arch.shtml` + original Italian and
  English + analysis, with bilingual metadata), tagged `version: 1.6.6`:
  - **1** - the exordium, a triple conditional (*si quid est in me ingeni... aut si qua exercitatio
    dicendi... aut si huiusce rei ratio aliqua*) held in suspense until the credit lands on the
    defendant; then *haec vox... non nullis aliquando saluti fuit*, and the debt turned back on itself
    (*opem et salutem*). Genitive *ingeni*.
  - **18** - Archias improvising finished verse with nothing written down and then redoing it
    *commutatis verbis atque sententiis*, followed by the theory: *poetam natura ipsa valere, et mentis
    viribus excitari, et quasi divino quodam spiritu inflari*, and Ennius calling poets *sancti*.
    The theoretical centre of the speech.
  - **25** - Sulla and the bad poet at the auction, paid out of the lots on the block on condition he
    write nothing more. The technical joke is *tantummodo alternis versibus longiusculis* (the elegiac
    couplet described from the outside, with a sneering diminutive); ironic *credo*.
  - **28** - the confession of *amor gloriae*, the admission that he told Archias to finish the poem
    about his consulship, and *nullam enim virtus aliam mercedem laborum periculorumque desiderat,
    praeter hanc laudis et gloriae*, with the racing metaphor in *vitae curriculo*. `[et tam brevi]` kept.
  - **32** - the four-line close: *pro mea consuetudine* set against *remota a mea iudicialique
    consuetudine*, and the graded verbs *confido* / *spero* / *certo scio*, the last aimed at the
    presiding praetor, who was his brother Quintus.
- Order in the work: 1 · 14 · 16 · 18 · 24 · 25 · 28 · 32.

### Changed
- **Cicero's speeches are back in chronological order of delivery**, reversing the alphabetical sort
  introduced in v1.6.3 at the user's request: In Verrem (70 BC) · In Catilinam I-IV (63) · Pro Archia
  (62) · Pro Milone (52) · Philippica II (44, written and published rather than delivered). The
  reorder script now uses an explicit ordered list rather than a computed year, since BC years count
  downwards and the four Catilinarians share a year while having a fixed internal sequence.

### Notes
Roadmap for the rest of the Speeches group saved in `practice_fragments_reference.md` (v1.6.7 Pro
Milone; v1.7.0 Pro Caelio + In Pisonem + Philippics I/IV/XIV; v1.7.1 more Philippics; v1.7.2-3 deepen
Pro Caelio and In Pisonem; v1.7.4-6 deepen In Verrem, which should end up the largest work of all).
Self-proofread; whole Speeches group re-checked, **49/49 verbatim**.

Cache-bust: `?v=81` -> `?v=82`.

## [1.6.5] - 2026-08-22

Three user-requested additions, plus a caching bug found while verifying them.

### Added
- **In Catilinam IV.10** (tagged `version: 1.6.5`), taking Cat IV to **8** and the Catilinarians to
  **32**. This is the passage flagged in v1.6.4 as the notable omission: the *lex Sempronia*
  argument, *qui autem rei publicae sit hostis, eum civem esse nullo modo posse* - Cicero does not
  deny the law protecting citizens, he defines the prisoners out of it - followed by the observation
  that Gaius Gracchus, who carried that law, was himself killed *iniussu populi*. Also carries the
  jab at the absent unnamed *popularis* and three syncopated perfects in a row (*decrerit*,
  *cogitarit*, *iudicarit*). Placed between IV.7 and IV.11, so the debate now runs 7 · 10 · 11.
- **Two paragraphs on the *mos maiorum* in Cicero's biography**, in `caesar_era_draft.md` and
  mirrored in `italian_translations_caesar.md`, placed after the "decade of the fifties" paragraph
  where the theme of a changing republic is already in play. They cover the unwritten ancestral
  constitution as the core of his politics (with Ennius's *moribus antiquis res stat Romana
  virisque*, quoted in the *De Re Publica*), the structural problem that it was built for a
  self-governing city-state and was now asked to govern an empire, and **the Cato the Elder
  parallel**: another *novus homo* from a country town who made himself the definition of ancestral
  virtue, whom Cicero lists in the *Pro Archia* and later hands the lead role in the *De Senectute*.
  Closes on the irony that the tradition's own protections were used to exile him.

### Changed
- **IV.7's analysis gains a brief nod to Sallust**, *Bellum Catilinae* 51, where Caesar gets a full
  speech of his own: the shared tropes are that death ends suffering rather than inflicting it, that
  perpetual imprisonment is the heavier penalty, and that the danger lies in the precedent. Both
  languages. The fragment's `version` stays `1.6.4` - that field is first-added, not last-edited.

### Fixed
- **`js/data.js` fetched the era drafts with no cache-buster**, so a returning reader could keep
  seeing stale biography prose from the HTTP cache after a draft edit, even though every JS and CSS
  include had been bumped. This was caught in the preview: the new biography paragraphs were in the
  file served over HTTP but not on the rendered page. `loadMarkdown` now appends the same `?v=`,
  read off whichever script tag carries one (new `assetVersion()` helper) rather than hard-coded.

### Notes
Regenerated both offline copies: `js/content.js` (now written from **both** era drafts in one step)
and `js/content-it.js` via `node build_content_it.js`. Speeches group re-checked, **44/44 verbatim**.

Cache-bust: `?v=80` -> `?v=81`.

## [1.6.4] - 2026-08-22

Last of the four Catilinarian batches. *In Catilinam IV* goes to **7** (not the 5 originally planned),
matching II and III; the user's note on the asymmetry: I stands at 10 "simply because it is very long
and has a lot of memorable parts". **The Catilinarians are now complete: 10 + 7 + 7 + 7 = 31 fragments.**

### Added
- **4 new *In Catilinam IV* fragments** (verbatim Latin from `cicero/cat4.shtml` + original Italian and
  English + analysis, with bilingual metadata), tagged `version: 1.6.4`:
  - **IV.3** - five imperatives (*consulite, prospicite, conservate, defendite, desinite*), the maxim
    *neque turpis mors forti viro potest accidere neque immatura consulari nec misera sapienti*, and
    then the household: Quintus in tears, Terentia fainting, Tullia prostrate, the two-year-old Marcus
    whom the republic holds *tamquam obsidem consulatus mei*, and Piso the son-in-law waiting outside.
  - **IV.7** - the two motions summarised in strict *alter... alter* balance: Silanus for death,
    Caesar for confiscation and perpetual chains. Carries Caesar's Epicurean-sounding view reported
    without sarcasm (*mortem... non esse supplicii causa constitutam, sed aut necessitatem naturae aut
    laborum ac miseriarum quietem*), then the practical objection about the Italian towns.
    **Sets up the existing IV.11**, which weighs the two motions. `[, qui populum Romanum]` kept.
  - **IV.15-16** - *concordia ordinum* as a crowd scene, read down the social ladder: knights (after
    years of feuding with the Senate), *tribuni aerarii*, the *scribae* who turned from the morning's
    allotment at the Treasury, the free-born poor, the freedmen who judge this their fatherland
    "which certain men born here, and in the highest station, have judged a city of enemies", and
    finally the slaves, *qui modo tolerabili condicione sit servitutis*. `[hoc]`, `[tantum]` kept.
    Extract starts mid-15 at *Ceteri vero, di inmortales!*.
  - **IV.19** - *habetis ducem memorem vestri, oblitum sui* (chiasmus in four words), then the
    *Cogitate* sentence: three parallel accusatives of what Rome took centuries to build, colliding
    with *una nox paene delerit* (syncopated *delerit* in an indirect question). `[non]` kept.

### Notes
Order inside the speech: 1-2 · 3 · 7 · 11 · 15-16 · 19 · 24. Self-proofread; the whole Speeches group
re-checked against the stripped source pages, **43/43 verbatim**.
Considered and left out: **IV.10**, the *lex Sempronia* argument (an enemy of the state cannot be a
citizen, so the law protecting citizens does not apply) - historically the most consequential passage
in the speech, and the one Clodius would use to exile him. Worth adding if Cat IV is ever extended.

Cache-bust: `?v=79` -> `?v=80`.

## [1.6.3] - 2026-08-22

Third Catilinarian batch, **doubled in size at the user's request**: leaving II, III and IV at 5 while
I stood at 10 felt too thin, so II and III go to **7 each** (+4 apiece) instead of +2. Cicero's
speeches are also **reordered alphabetically**.

### Added
- **8 new fragments** (verbatim Latin from `cicero/cat2.shtml` and `cat3.shtml` + original Italian and
  English + analysis, with bilingual metadata), tagged `version: 1.6.3`.
- ***In Catilinam II* 3 -> 7:**
  - **II.7** - *sentina urbis*, the bilge-water metaphor kept alive by *exhausto*, then fourteen *quis*
    questions sharing one verb (*inveniri potest*): a rogues' gallery by *congeries*. Vocabulary
    showcase (*testamentorum subiector*, *circumscriptor*, *ganeo*, *nepos* = spendthrift).
  - **II.12-13** - the answer to the charge of expelling a citizen without trial: three descending
    courtesies (*appellavit / salutavit / aspexit*) and the benches left *nudam atque inanem*; then
    sarcasm (*ego vehemens ille consul*) and the inventory ending in Marius's silver eagle and its
    household shrine. `[ubi fuisset,]` and `[scelerum]` kept. Pairs with I.8-9 (same scene, other side).
  - **II.25** - the two armies as abstractions: seven *hinc... illinc* pairs with *pugnat* stated once
    and then understood, widening into massed virtues against massed vices, closing on *bona spes* vs
    *omnium rerum desperatione*. The cleanest pure-antithesis exercise in the collection.
  - **II.29** - the peroration: the gods no longer *procul... ab externo hoste* but *hic praesentes*;
    Cicero disclaims his own *prudentia*; the liturgy *precari, venerari, implorare*.
- ***In Catilinam III* 3 -> 7:**
  - **III.9** - the Gauls' testimony, almost entirely *oratio obliqua*: Lentulus convinced by Sibylline
    prophecy that he was the third Cornelius after Cinna and Sulla, and that 63 BC was the fated year
    (tenth after the Vestals' acquittal, twentieth after the Capitol fire). Sets up *fatalis* in IV.2.
  - **III.10** - the seals opened in the Senate; Cethegus's defence that he had always been *bonorum
    ferramentorum studiosus*; Lentulus's signet ring bearing his grandfather's portrait, which
    *etiam muta* should have called him back.
  - **III.15** - the *supplicatio* decreed *meo nomine*, the first ever *togato*; the decree's own
    wording quoted (*quod urbem incendiis, caede civis, Italiam bello liberassem*, with syncopated
    *liberassem*); the closing antithesis *bene gesta* vs *conservata re publica*.
  - **III.20-21** - the statue of Jupiter: the haruspices' specification, the two-year delay
    (*tanta fuit operis tarditas*), and the payoff, *eo ipso tempore*, as the conspirators crossed the
    forum. Closing verbs *illustrata et patefacta* echo the prophecy. `[et senatus et vos]` kept.

### Changed
- **Cicero's speeches are now listed alphabetically** in the chooser, matching how Plautus's comedies
  are ordered: In Catilinam I, II, III, IV · In Verrem · Philippica II · Pro Archia · Pro Milone.
  They had been in order of delivery (Verrines 70 BC first). Groups remain contiguous and in their own
  order; only the Speeches bucket is sorted, by `label`.

### Notes
Self-proofread; whole Speeches group re-checked against the stripped source pages, **39/39 verbatim**.
Fragment order inside each speech is still by paragraph number, applied automatically.

Cache-bust: `?v=78` -> `?v=79`.

## [1.6.2] - 2026-08-22

Second of the four Catilinarian batches. ***In Catilinam I* is now complete at 10 fragments**, the
target the user set for the speech their textbook actually uses.

### Added
- **3 new *In Catilinam I* fragments** (verbatim Latin from `cicero/cat1.shtml` + original Italian and
  English + analysis, with bilingual metadata), tagged `version: 1.6.2`:
  - **I.20-21** - the silence of the Senate read as a verdict. Deliberately started at *Quid est,
    Catilina? ecquid attendis...* rather than at the section break, so it does not repeat the
    *egredere ex urbe* already used in I.10. Climax: the tricolon *cum quiescunt, probant, cum
    patiuntur, decernunt, cum tacent, clamant* (with *decernunt*, the Senate's technical verb for
    passing a decree, doing quiet work in the middle member); the Sestius/Marcellus counterfactual;
    and the closing threat dressed as courtesy, *prosequantur*.
  - **I.27-29 (trimmed)** - the second *prosopopoeia*, the *patria* rounding on Cicero himself
    (*"M. Tulli, quid agis?"*), answering the one at I.17-18 where she addressed Catiline. Built from
    three extracted pieces: the intro plus the challenge, the three objections knocked down with *At*
    (*mosne maiorum? An leges? An invidiam posteritatis times?*), then `[...]`, then the closing
    *invidiae incendio conflagraturum?*. Archaic *existumas* kept.
  - **I.31-32** - the fever simile in full *ut... sic* form (*si aquam gelidam biberunt, primo
    relevari videntur, deinde multo gravius... adflictantur*), *in venis atque in visceribus rei
    publicae*, then the six jussive subjunctives of §32, the four-fold *tantam* anaphora
    (*concordia ordinum* in one sentence) and the asyndetic *patefacta, inlustrata, oppressa,
    vindicata*. `[id]` kept as an editorial supplement.

### Notes
*In Catilinam I* now runs 1-2 · 3 · 5 · 8-9 · 10 · 17-18 · 20-21 · 27-29 · 31-32 · 33.
The batch applier gained support for **composed fragments**: an item may carry `keys` + `joins`
instead of a single `key`, so a trimmed passage is assembled from separately extracted pieces rather
than retyped. `verify.js` was taught to match trimmed fragments by splitting on `[...]` and requiring
every piece to appear verbatim **and in order** in the source. Whole Speeches group: **31/31 verbatim**.

Cache-bust: `?v=77` -> `?v=78`.

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
