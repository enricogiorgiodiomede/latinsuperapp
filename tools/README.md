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
- **Emendations are declared, never silent.** Default policy is unchanged: where the source has an
  obvious typo, trim the passage to avoid it. **Only when the correct reading has been confirmed
  against another edition** may a fragment carry `emend: [[sourceReading, appReading], ...]`.
  `apply_batch.js` then applies it to the extracted Latin and stores it on the fragment, and
  `verify.js` puts the source's own reading back before comparing, so every other character is still
  proved verbatim; a stale emendation is a hard failure. Say so in the analysis too. This is *not*
  `fix`, which only reconciles source style that `normalise()` already handles and is not recorded.
- **Trimmed fragments** mark the cut with `[...]` and are built from several extracted pieces via
  `keys` + `joins`. The verifier checks each piece separately and in source order.
- **`version` means first-added, never last-edited.** Editing an old fragment does not bump its tag;
  record the edit in the release's CHANGELOG and in-app What's New instead. Bumping it would move the
  "NEW!" badge onto old content.
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
