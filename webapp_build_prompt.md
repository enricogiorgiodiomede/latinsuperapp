# Build Prompt: Latin Authors Web App

> Paste everything below the line into Claude Code, run from inside the
> `Latin Authors Tier List` project folder. The prompt is written so Claude Code
> has all the context it needs without further questions.

---

## Role and goal

You are building a small, self-contained educational web app about Roman (Latin)
authors. The app is the interactive front end for an existing writing project. It
must run with no build step and no server: a user should be able to double-click
`index.html` (or serve the folder with any static server) and have everything work.

**Tech stack: plain HTML, CSS, and vanilla JavaScript only.** No frameworks, no
bundlers, no npm. You may use a tiny amount of CDN-loaded JS only if strictly
necessary, but prefer zero external dependencies.

## What already exists in this folder

- `archaic_era_draft.md` — the full written content for the Archaic Era: an era
  introduction plus one section per author (biography, main works, style and
  difficulty, a Latin excerpt with Italian and English translations and analysis,
  and a tier rating). **This file is the single source of truth for Archaic Era
  content. The app must read from it, not from hardcoded copies.**
- `CLAUDE.md` — project instructions and the full author list for all five eras.
- `images/` — author portrait images. The files use numbered, human-readable names
  (with spaces and mixed `.jpg`/`.jpeg` extensions), so map them to authors using the
  explicit table in the **Images** section below rather than guessing. Still degrade
  gracefully if a file is ever missing (styled placeholder, never a broken-image icon).
- `italian_translations_archaic.md`, `daily_log.md`, `progress_notes.md` — ignore
  these for the app; they are working notes.

Do not modify `archaic_era_draft.md` or `CLAUDE.md`. Create new files for the app.

## The five eras

The top menu must contain these five eras, in this order:

1. Archaic Era
2. Caesar's Age
3. Augustus' Age
4. Early Imperial Era
5. Late Imperial Era

Only the **Archaic Era** has real content right now. The other four must show a
clean **"Coming soon"** placeholder when opened.

## Page structure and behavior

### 1. Home page (`index.html`)

- **Top menu bar**: five clickable era buttons, always visible, spanning the top of
  the page.
- **Era description panel**: clicking an era button opens/expands a panel (an
  accordion or dropdown directly under the menu bar) showing a brief description of
  that era from three angles: historical context (kept short), linguistic
  character, and stylistic character. Clicking the same era again collapses it;
  clicking a different era switches to it. The Archaic Era should be open by default
  on load.
  - For the **Archaic Era**, write the description as a concise summary (roughly
    150 to 250 words) distilled from the introduction at the top of
    `archaic_era_draft.md`. Cover: Roman literature beginning as adaptation of Greek
    models; archaic morphology, pre-classical vocabulary, and the Saturnian meter;
    and the shift toward a native Latin voice with Plautus, Terence, Cato, and
    Lucilius. You may either hardcode this summary or parse it from the file
    introduction; parsing and trimming is preferred so the content stays consistent.
  - For the other four eras, the panel shows "Coming soon".
- **Author list (bottom of the page)**: below the era panel, show a responsive grid
  of author cards for the **currently selected era**. Each card shows the author's
  portrait image and name. The whole card is clickable and navigates to that
  author's detail page.
  - For the Archaic Era, populate the grid from the authors found in
    `archaic_era_draft.md` (see parsing notes below). Preserve the order they appear
    in the file.
  - For the other four eras, either hide the grid or show "Coming soon" in its place.

### 2. Author detail page (`author.html?era=archaic&id=<slug>`)

Reached by clicking an author card. Use a single reusable `author.html` that reads
the author identifier from the URL query string and renders the matching content. It
must display, in this order:

- The author's name and portrait (placeholder if the image is missing).
- **Biography**
- **Main Works**
- **Style and Difficulty**
- **Tier rating** (the "Final Rating" content), shown prominently (e.g. a colored
  badge with the tier letter).
- A clear **"Practice translation"** button that links to the training page for
  this author (`practice.html?era=archaic&id=<slug>`).
- A "back" link to the home page.

The Latin excerpt, translations, and analysis from the markdown belong on the
**practice page**, not here (keep the detail page focused on biography, works,
style, and tier). It is fine to also show the analysis on the detail page if it
reads well, but the excerpt + translations must drive the practice page.

### 3. Translation practice page (`practice.html?era=archaic&id=<slug>`)

A self-training tool for translating the author's Latin excerpt. For the selected
author, pull the Latin excerpt, the Italian translation, the English translation,
and the analysis from `archaic_era_draft.md`. The page should:

- Show the **Latin text** prominently.
- Let the user attempt their own translation in a text area (no grading needed).
- Provide **"Show Italian"** and **"Show English"** reveal buttons that are hidden
  by default, so the user can self-check after attempting.
- Optionally show the **analysis** behind a "Show analysis / hints" toggle.
- Show the author name and a back link to the author's detail page.

## How to parse `archaic_era_draft.md`

Because the app is static and must read the markdown at runtime, fetch the file with
`fetch('archaic_era_draft.md')` and parse it in JavaScript. The file uses a
consistent structure you can rely on:

- The document opens with `# THE ARCHAIC ERA ...` followed by intro paragraphs,
  terminated by a `---` horizontal rule. That block is the era introduction.
- Each author entry begins with a level-1 heading `# AUTHOR NAME (dates)`.
  - **Note:** a few headings cover two authors at once (e.g.
    `# MARCUS PACUVIUS AND LUCIUS ACCIUS`, `# POMPONIUS BONONIENSIS AND QUINTUS NOVIUS`).
    Treat each such heading as a single card/entry; do not try to split them.
- Within an entry, sections are level-2 headings whose names vary slightly. Match
  them flexibly (case-insensitive, allow extra words):
  - `## Biography` (or `## Biographies`)
  - `## Main Works` / `## Most Important Works`
  - `## Style and Difficulty` / `## Writing Style and Difficulty` /
    `## Style, Difficulty, ...`
  - `## Latin Excerpt, Translation and Analysis` (or similar) — contains the excerpt
    and translations
  - `## Final Rating` — contains the tier
- Inside the excerpt section, the parts are marked by **bold labels** on their own
  lines, each followed by `>` block-quote lines:
  - `**Latin text** ...` then the Latin in `>` quotes
  - `**Italian translation** (original)` then Italian in `>` quotes
  - `**English translation** (original)` then English in `>` quotes
  - `**Analysis**` then plain paragraphs
- The tier appears in the Final Rating section as `**Tier: X ...**` where X is one of
  `S`, `A`, `B`, `C`, `D`, `NC`. Extract that letter for the badge.

Build a small markdown-to-HTML renderer (or use a minimal approach) good enough for
this content: headings, paragraphs, bold/italic, bullet lists (`- `), and block
quotes. Do **not** pull in a heavy library; a compact custom renderer is fine and
preferred. Render block quotes (the Latin and translations) in a visually distinct
style.

Derive each author's `slug` id from the heading (lowercase, strip dates and
parentheses, replace spaces and punctuation with hyphens), e.g.
`livius_andronicus` or `marcus-pacuvius-and-lucius-accius`. Be consistent so the
detail and practice pages can look authors up by the same slug.

## Images

The images already exist in `images/`, named with clean, space-free slugs (mostly
`.jpg`, two are `.jpeg`). **Ignore the image paths written inside
`archaic_era_draft.md`** (e.g. `./images/livius_andronicus.jpg`); they do not match
the real filenames. Use this explicit mapping from author to file. Define it as a
lookup keyed by author slug in `js/data.js`:

| Author (entry) | Slug | Image file(s) |
|---|---|---|
| Livius Andronicus | `livius-andronicus` | `livius-andronicus.jpg` |
| Gnaeus Naevius | `gnaeus-naevius` | `gnaeus-naevius.jpeg` |
| Quintus Ennius | `quintus-ennius` | `quintus-ennius.jpg` |
| Titus Maccius Plautus | `titus-maccius-plautus` | `titus-maccius-plautus.jpg` |
| Cato the Elder | `marcus-porcius-cato` | `marcus-porcius-cato.jpg` |
| Caecilius Statius | `caecilius-statius` | `caecilius-statius.jpg` |
| Terence | `publius-terentius-afer` | `publius-terentius-afer.jpg` |
| Pacuvius and Accius (combined entry) | `marcus-pacuvius-and-lucius-accius` | `marcus-pacuvius.jpg`, `lucius-accius.jpg` |
| Gaius Lucilius | `gaius-lucilius` | `gaius-lucilius.jpeg` |
| Pomponius and Novius (combined entry) | `pomponius-bononiensis-and-quintus-novius` | `pomponius-bononiensis.jpg`, `quintus-novius.jpeg` |

Notes:

- Slugs above are the canonical ids the home, detail, and practice pages must share.
  Derive matching slugs from the markdown headings, but reconcile them against this
  table (the table wins) so lookups never break.
- Watch the extensions: most files are `.jpg`, but `gnaeus-naevius`, `gaius-lucilius`,
  and `quintus-novius` are `.jpeg`. Store the full filename in the lookup; do not
  assume `.jpg` for everyone.
- The two **combined entries** (Pacuvius + Accius, Pomponius + Novius) have two images
  each. On the author card and detail page, show both portraits side by side.
- Filenames have no spaces, so no URL-encoding is needed.
- Still add an `onerror` fallback to a styled placeholder (tinted box with the
  author's initials) so a future missing file never shows a broken-image icon.

## Design and tone

The audience is an Italian Liceo Scientifico student and a general YouTube audience,
so make it inviting, not academic-dry:

- Clean, readable typography. A classical but legible feel (a serif for Latin
  excerpts works well). Latin text should stand out from the surrounding UI.
- A restrained "ancient Rome" palette (e.g. warm stone, terracotta, deep red,
  muted gold) without becoming a cliché.
- Fully responsive: the author grid should reflow from multiple columns on desktop
  to one or two on mobile.
- Smooth, simple interactions for the era panel (expand/collapse) and the reveal
  buttons. No heavy animation.
- Keep all UI text in **English** (matching the project's language rule). The Latin
  excerpts stay in Latin; the Italian translation is shown only as a reveal on the
  practice page.

## File layout to produce

```
index.html          (home: menu bar, era panel, author grid)
author.html         (reusable author detail page)
practice.html       (reusable translation practice page)
css/styles.css      (shared styles)
js/markdown.js      (minimal markdown parser/renderer)
js/data.js          (fetches + parses archaic_era_draft.md, exposes era/author data)
js/home.js          (home page logic)
js/author.js        (detail page logic)
js/practice.js      (practice page logic)
```

(Adjust file names if you have a cleaner structure, but keep it this simple and
keep everything vanilla.)

## Acceptance checklist

Before you finish, verify:

- [ ] Opening `index.html` shows the five-era menu bar with the Archaic Era panel
      open and its author grid populated from the markdown.
- [ ] Clicking each of the other four eras shows "Coming soon".
- [ ] Every Archaic author card links to a working detail page with biography, main
      works, style/difficulty, and a tier badge.
- [ ] Each detail page has a working "Practice translation" button to the practice
      page, which shows the Latin text and can reveal Italian, English, and analysis.
- [ ] Missing images show a clean placeholder, never a broken icon.
- [ ] No console errors. Everything works opening the files locally (account for the
      `fetch` of the markdown file: if opening via `file://` causes CORS issues,
      either provide a one-line instruction to run `python3 -m http.server`, or embed
      the markdown content as a fallback. State clearly in a short README which
      approach you chose and how to run the app.)
- [ ] Code is vanilla HTML/CSS/JS with no build step.

When done, give me a one-paragraph summary of what you built and the exact command
to view it locally.
