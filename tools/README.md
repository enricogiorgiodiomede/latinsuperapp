# tools/ - the practice-fragment pipeline

Everything needed to add a batch of practice excerpts to `js/fragments.js` and prove the Latin is
genuine. Plain Node, no dependencies, no build step. These scripts were extracted from the throwaway
scripts used for v1.5.0 through v1.7.0, which had been living in a temp folder and did not survive
between sessions.

## The five-minute version

```bash
node tools/fetch_sources.js                                  # 1. cache the source texts
node tools/extract.js batch/spec.json batch/passages.json    # 2. pull passages verbatim
node tools/apply_batch.js batch/passages.json batch/frags.js 1.7.1   # 3. write them into the bank
node tools/verify.js                                         # 4. prove every Latin field is verbatim
node tools/lint_translations.js                              # 5. and that each translation covers exactly it
node tools/check_sections.js                                 # 6. and divides it into the same subsections
node tools/lint_markdown.js                                  # 7. and that no emphasis marker leaks through
```

Then bump the cache-buster, check it in the browser, and commit. See PROGRESS.md for the release
checklist (CHANGELOG, in-app What's New, reference sheet, memory).

## The scripts

| Script | What it does |
|---|---|
| `fetch_sources.js` | Downloads every Latin Library page in `sources.json`, strips the HTML, caches it in `tools/.cache/` (gitignored). `--force` re-downloads. |
| `extract.js` | Cuts passages out of the cache by start/end text. **Never retype Latin** - this is what makes the verifier meaningful. |
| `apply_batch.js` | Adds a batch to `js/fragments.js`, tags each fragment with the release version, re-sorts each touched work by section number. |
| `create_works.js` | Adds new (empty) works before a batch that introduces them. Edit the `NEW` array first. |
| `reorder_works.js` | Re-sorts Cicero's speeches into chronological order of delivery. Edit `SPEECH_ORDER` when a work is added. |
| `verify.js` | The gate: every `latin` field must appear verbatim in its source page. Run it before every commit. |
| `lint_translations.js` | Catches a translation that covers MORE or LESS Latin than its fragment contains, by length ratio. Run it before every commit too. Flags are a prompt to look, not failures. |
| `check_sections.js` | Compares how the Latin of an excerpt divides into `**n.**` subsections with how each translation divides. **Run it whenever an excerpt with subsection markers is added or touched.** Catches a boundary put a period too early, which is invisible to every other check and skews the rest of the excerpt. `--sigs` prints signatures for the cleared list. |
| `lint_markdown.js` | Renders every emphasis-bearing line exactly as `js/markdown.js` does and fails if a literal asterisk survives. A bold span cannot contain an italic one. |
| `fetch_sections.js` | Fetches an edition's subsection boundaries for one chapter from Perseus CTS, into `tools/.cache/sections/`. |
| `fetch_sections_phi.js` | The same against PHI/packhum, for the Bellum Alexandrinum, which Perseus does not carry. |
| `mark_sections.js` | Inserts the `**n.**` subsection markers, anchoring on the shortest prefix of a section that occurs exactly once. Ambiguity is a hard error; it never guesses. |
| `strip.js` | Shared HTML-to-text and marker-normalising helpers. |

## Conventions the scripts assume

- **`sources.json` is the map** from a work id to its Latin Library page(s). A work with no entry is
  simply skipped by the verifier, so add the entry when you create the work.
- **Latin is verbatim.** Editorial brackets (`[oratori]`, `<hospitis>`, `[id]`) are kept as the source
  prints them and explained in the analysis. Where the source has an obvious typo, trim the passage to
  avoid it rather than reproducing or silently correcting it.
- **Section markers** are normalised to `[n]`. `apply_batch.js` turns ` [n] ` into a blockquote break;
  a `fix` pair on a fragment rewrites the source's own style (Pro Milone prints `11.`) into that form.
- **Poesia Latina is the proofreading third source, and nothing else.** The app's Latin comes from
  The Latin Library, because `verify.js` needs one text to check against and `sources.json` maps to
  that host only. When a word on The Latin Library (or Splash Latino) looks like a typo, check it at
  `http://www.poesialatina.it/index.htm` - Cicero lives at `_ns/ProsaLat/Cic/<work>.html`, e.g.
  `OrProCael.html`, `OrInPison.html`. **It prints classical orthography**: consonantal *v* written *u*
  (*uidetur*, *uitia*, *diuersisque*) and *inl-*/*inr-* for *ill-*/*irr-*. That is an editorial
  convention, **not** a typo, and neither are its genuine variant readings (*Pro Caelio* 12 has
  *diversisque **atque** inter se* where The Latin Library has *et*). Only plain non-words qualify.
- **Emendations are declared, never silent. THE TEST IS WHETHER THE PRINTED FORM IS A LATIN WORD**
  (rule settled in the v1.8.2 follow-up, after the user corrected an earlier and worse version of it).
  Work through it in this order:
  1. **Is the printed form a Latin word at all?** If it is not - *uam*, *que*, *quani*, *antiqissimum*,
    *ferris*, *consulibis*, *iuiucunda*, *ahenum*, *immicus*, *Brundinisorum* - it is a **defect**, and
    the number of websites reproducing it is irrelevant. **Two digital texts descended from the same
    printed edition are not two witnesses.** I once kept *immicus* because Perseus printed it too; that
    was wrong, and the user caught it.
  2. **Is the correction settled?** Usually the language settles it (there is only one word *quam* can
    be). Where more than one correction is formally possible, **the context decides**: *iuiucunda* could
    be *iucunda* or *iniucunda*, and *mediocris quidam est risus consecutus* in the next clause rules out
    "not pleasing", so *non iniucunda* it is. **Internal evidence is the strongest kind**: Att. IV.1
    prints *Brundisinae*, *Brundisi* and *Brundisinis* within a few lines of *Brundinisorum*, which
    settles the stem beyond argument.
  3. **Then MEND, and say so in the analysis, in both languages.** Do not lose a good passage to a
    one-letter misprint. Check a second text where you can - **Poesia Latina first, though it has been
    unreachable from this tooling (ECONNRESET) since v1.8.0** - and if none can be found, correct it
    anyway and flag it as unconfirmed. Several emendations in one fragment are fine when each is
    separately certain: Att. I.18 carries **three**.
  - **KEEP AND FLAG** a form that **is** real Latin, however odd it looks: *Illias* (Arch. 24),
    *inplevit* (Phil. II.63), *quom* for *cum*, *memorabilis* for *memorabiles*, *paullo*. These are
    spelling variants and archaisms, not errors.
  - **TRIM** only where **independent editions genuinely disagree and both readings are real words**, or
    where the text is so damaged that nobody can restore it (Verr. II.2.32-33, the tail of II.3.120).
    **Exception:** if the trim would remove an antecedent or a subject the rest of the passage needs,
    **print the damaged text with its daggers `+...+` and explain them** instead - that is what
    Ad Brutum I.15 does with `+neque solum ut Solonis dictum usurpem+`, after the first attempt cut
    Solon's name out and left a bare *is* pointing at nothing.
  - **A declared orthographic normalisation also uses `emend`**: The Latin Library sets ad Brutum with a
    capital V for the vowel u, and *Vtinam* is printed *Utinam* in the app and declared.
  - A fragment carries `emend: [[sourceReading, appReading], ...]`; since v1.7.7 that covers plain errors
    of any kind, including a manifest punctuation defect (*navem. suam* at Verr. II.1.46, and the full
    stop for a comma at Att. I.18).
  `apply_batch.js` applies it to the extracted Latin and stores it on the fragment, and
  `verify.js` puts the source's own reading back before comparing, so every other character is still
  proved verbatim; a stale emendation is a hard failure. This is *not*
  `fix`, which only reconciles source style that `normalise()` already handles and is not recorded.
- **Trimmed fragments** mark the cut with `[...]` and are built from several extracted pieces via
  `keys` + `joins`. The verifier checks each piece separately and in source order.
- **`version` means first-added, never last-edited.** Editing an old fragment does not bump its tag;
  record the edit in the release's CHANGELOG and in-app What's New instead. Bumping it would move the
  "NEW!" badge onto old content.
- **Letters are cited by book and letter** (`Ad Familiares XIV.20`), not by section: The Latin Library
  prints most of these collections with no section numbers at all. Where a book does have them, they go
  inside the Latin as `[n]` markers. `apply_batch.js` sorts such citations on `book * 100000 + letter *
  10`, plus 1 for a manuscript doublet suffix (`Ad Brutum I.3a`).
- **`normalise()` ignores whitespace around punctuation** (since v1.8.0). TLL sets one quoted question
  in Att. I.16 as `" praesidium a nobis postulabatis ?`. Both sides of the comparison are treated the
  same way, so it can only cancel a whitespace difference, never make two different words match.
- **In Pisonem is cited by chapter** (`In Pisonem, ch. X`) because the Latin Library prints that
  speech with chapter divisions only, no section numbers. Every other speech is cited by section.

## Batch file shapes

`spec.json` for the extractor:

```json
{
  "cat1.33": ["cat1", "Hisce ominibus, Catilina", "vivos mortuosque mactabis."]
}
```

`frags.js` for the applier (one object per fragment; the Latin comes from the passage key):

```js
module.exports = [{
  work: 'in-catilinam-i', key: 'cat1.33', prefix: '[33] ',
  // trimmed instead: keys: ['a','b'], joins: [' [...] '],
  // source style differs instead: fix: [' 11. Silent', ' [11] Silent'],
  title: '...', citation: '(In Catilinam I.33)', description: '...',
  italian: '> [33] ...', english: '> [33] ...', analysis: '...',
  titleIt: '...', descriptionIt: '...', analysisIt: '...'
}];
```

Every fragment needs both languages: `titleIt`, `descriptionIt` and `analysisIt` are required, with
proper accents. `source` and `version` are filled in by the applier.
