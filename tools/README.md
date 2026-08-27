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
- **Emendations are declared, never silent. POLICY CHANGED IN THE v1.8.0 FOLLOW-UP (the user's
  instruction): MEND FIRST, TRIM ONLY AS A LAST RESORT.** Where the source has a plain defect and the
  correct reading is not in doubt, **check it against a second text and then correct it in the app,
  saying so in the analysis** - do not silently drop the sentence, and do not lose a good passage to a
  one-letter misprint. **Poesia Latina is the first place to look**, but if it cannot be reached or does
  not carry the work, any other reputable text of the passage will do, and if none can be found the
  correction may still be made and flagged as unconfirmed. Several defects in one passage are fine when
  each is separately certain: Att. I.18 carries **three**. The old rule (trim past the defect, drop the
  passage if it has several) now applies only where the right reading is genuinely open - that is why
  Verr. II.2.32-33 and the tail of II.3.120 stay rejected. **A declared orthographic normalisation also
  uses `emend`**: The Latin Library sets ad Brutum with a capital V for the vowel u, and *Vtinam* is
  printed *Utinam* in the app and declared. It never covers variant readings. A fragment carries
  `emend: [[sourceReading, appReading], ...]`. Since v1.7.7 that covers **plain errors of any kind**,
  not only non-words: a manifest punctuation defect qualifies too (*navem. suam* at Verr. II.1.46).
  It never covers variant readings or classical orthography.
  `apply_batch.js` then applies it to the extracted Latin and stores it on the fragment, and
  `verify.js` puts the source's own reading back before comparing, so every other character is still
  proved verbatim; a stale emendation is a hard failure. Say so in the analysis too. This is *not*
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
