# Latin Authors: Explore & Translate - Web App

A small, self-contained educational web app for exploring Roman (Latin) authors and
practising translating them. It is the interactive front end for the writing project
in this folder: it reads `archaic_era_draft.md` and turns it into a browsable site with
an era menu, an author grid, per-author detail pages (with a per-criterion difficulty
chart and an overall evaluation), and a translation practice tool.

Built with **plain HTML, CSS and vanilla JavaScript** - no frameworks, no build step,
no npm, no external dependencies.

## How to run it

### Easiest: just double-click
Open `index.html` in your browser (double-click it). It works out of the box.

Because browsers block `fetch()` for pages opened from disk (`file://`), the app falls
back to an **embedded copy** of the markdown bundled in `js/content.js`. So everything
renders with zero setup.

### Optional: run a tiny local server (live markdown)
If you want the app to read `archaic_era_draft.md` **live** (so edits to the markdown
show up on refresh, without regenerating anything), serve the folder with any static
server, for example:

```
python -m http.server 8000
```

Then open <http://localhost:8000>. When served over http, the app fetches the real
markdown file directly and ignores the embedded fallback.

## How the content is loaded

`archaic_era_draft.md` is the **single source of truth**. The app parses it at runtime:

- Served over http -> it `fetch()`es the file live.
- Opened via `file://` -> it uses the embedded copy in `js/content.js`.

### `js/content.js` is generated
`js/content.js` is an auto-generated, JSON-encoded copy of `archaic_era_draft.md`. If
you change the markdown, regenerate it so the double-click (file://) mode stays in sync:

```
node -e "const fs=require('fs');fs.writeFileSync('js/content.js','window.__ARCHAIC_MD__='+JSON.stringify(fs.readFileSync('archaic_era_draft.md','utf8'))+';')"
```

(If you only ever use the local-server mode above, you can ignore this - the file is
only the offline fallback.)

## Pages

- `index.html` - home: five-era menu bar, an expandable era description panel (Archaic
  open by default; the other four eras show "Coming soon"), and a responsive author grid.
- `author.html?era=archaic&id=<slug>` - author detail: portrait(s), biography, main
  works, style & difficulty, a per-criterion difficulty bar chart (Lexicon / Syntax /
  Style / Density) and an overall evaluation, with a "Practice translation" button.
- `practice.html?era=archaic&id=<slug>` - practice: the Latin excerpt with a textarea to
  attempt a translation and reveal buttons for the Italian, English, and analysis.

Only the **Archaic Era** has content today; the other four eras are placeholders.

## File layout

```
index.html        author.html       practice.html
css/styles.css
js/content.js     (generated offline fallback copy of the markdown)
js/markdown.js    (minimal Markdown -> HTML renderer)
js/ui.js          (shared DOM helpers: portraits, placeholders, query params, breadcrumb)
js/menu.js        (shared era menu bar)
js/data.js        (loads + parses archaic_era_draft.md; scrubs ranking language; data API)
js/ratings.js     (per-author difficulty data + evaluation scale)
js/chart.js       (renders the criteria bar chart as inline SVG)
js/home.js  js/author.js  js/practice.js   (per-page logic)
```

`archaic_era_draft.md`, `CLAUDE.md`, and the `images/` folder are existing project files
the app reads but never modifies.
