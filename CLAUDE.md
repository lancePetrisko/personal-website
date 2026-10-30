# CLAUDE.md — Personal Website Project Guide

This file is the persistent reference for Claude sessions working on this codebase.
Read it before making any edits. Follow everything here unless the user explicitly overrides it.

---

## Project Overview

Personal portfolio website for **Lance Petrisko** — an Information Systems student at the
University of Utah, based in Salt Lake City / Seattle. The site is a digital resume and
project showcase intended for employers, recruiters, and anyone interested in his work.

Live at `https://lancepetrisko.com/`, deployed on Cloudflare (see `wrangler.jsonc` — the whole
repo root is served as static assets, no build step).

---

## Purpose and Goals

- `index.html` is a one-pager: hero, `#work` list, `#about`, `#contact`, footer
- `play.html` is the second page: personal / hobby projects
- Link out to LinkedIn, GitHub, and `morePages/` subpages for expanded detail on individual entries
- Feel personal and handcrafted, not like a template or corporate portfolio

---

## Tech Stack

- **HTML**: plain semantic HTML5, no templating engine
- **CSS**: single shared stylesheet (`app.css`), no preprocessors, no frameworks
- **JavaScript**: vanilla only. `app.js` handles nav highlighting (current page + section in view),
  the scroll reveal observer, and the last-updated footer. `last-updated.js` sets the deploy timestamp.
  Each top-level page has a one-line inline `<script>` in `<head>` that adds `.js` to `<html>`
  (so `.reveal` content only hides when JS is running). No libraries.
- **Fonts**: `Geist` (400/500) for headings and body, `Roboto Mono` (400) for labels, tags, nav,
  timestamps. Both loaded from Google Fonts with one link on every page.
- **No build system**: files are served as-is, no npm, no bundler, no compilation step

---

## File and Folder Structure

```
/
├── index.html              # One-pager: hero, #work, #about, #contact
├── play.html               # Play page: personal project list
├── app.css                 # Single shared stylesheet for all pages
├── app.js                  # Shared JS: nav highlighting, scroll reveal, last updated
├── last-updated.js         # Sets window.LAST_UPDATED_AT (regenerated at deploy time)
├── backgrounds/            # Saved alternative backgrounds (not loaded by any page)
├── wrangler.jsonc          # Cloudflare static-asset config
├── sitemap.xml             # Stale — only lists index, homeServer, modelTheU, webDesign
├── robots.txt
├── site.webmanifest
├── todo.txt                # Lance's own scratch notes, not instructions for Claude
├── coding-music-playlist-links.txt
│
├── morePages/              # Expanded detail pages, one per experience/play entry
│   ├── aiComp2026.html
│   ├── esports.html
│   ├── homeServer.html
│   ├── isComp.html
│   ├── midnightHosting.html
│   ├── modelTheU.html
│   ├── resume.html         # Embedded resume page, linked from the nav
│   ├── webDesign.html      # Currently orphaned — no page links to it
│   └── ytDown.html
│
├── Images/
│   ├── indexPictures/      # seniorPicture.JPG
│   ├── albumCovers/        # Album art for the play.html music shelf
│   ├── homelabProject/     # Homelab hardware photos
│   ├── modelTheUProject/   # 3D print showcase photos
│   ├── midnightHostingProject/
│   ├── ytDownProject/
│   ├── IS-Competition/
│   ├── webDesign/          # Client site screenshots + language logos
│   ├── esports/
│   ├── websiteIcons/       # Favicon and social icons
│   └── aicomp2026-admin-dash.png
│
├── Gifs/                   # underConstructionGif.gif — placeholder art for unbuilt cards
├── Fonts/                  # info.txt only; Minecraft.ttf was removed
├── Resume/                 # Lance_Petrisko_Resume.pdf
├── MP3/                    # Empty
└── Videos/modelTheU/       # modelTheU_Printing.mov (not currently embedded)
```

---

## Navigation Structure

Top-level pages (`index.html`, `play.html`) share one `.site-header`:

- `lance_` (`.brand`, blinking accent cursor) links to top of index
- `.site-nav`: `work` and `about` (anchors on index), `play`, `resume` (`morePages/resume.html`)

`app.js` adds `.is-active` to the link for the current page, and on the one-pager to the link
whose section is in view.

`morePages/` subpages use a stripped-down sticky `.navbar` with a single `< BACK` link styled as
`.about-btn .about-btn--outline`. Work subpages point at `../index.html#work`, play subpages at
`../play.html`.

Page titles: `index.html` uses `Lance Petrisko - Portfolio`; every other page uses the terminal
pattern `lancePetrisko/pageName` (lowercase camel for the page name).

---

## Design Philosophy

Dark minimalist with a light terminal flavor. Clean, quiet, personal. Typography and spacing
carry the design, not decoration.

### Core visual rules:
- **Tokens** live on `:root` in `app.css`: `--bg #0a0a0a`, `--fg`, `--muted`, `--faint`, `--line`,
  `--line-strong`, `--accent #d4a259` (muted amber). Use tokens, not raw colors.
- **Accent** is used sparingly: active nav, section numbers, link hover, focus ring, cursor,
  `soon` status. Everything else is grayscale.
- **Type:** Geist for headings and prose, Roboto Mono for small labels. Headings use tight negative
  letter spacing.
- **Borders:** hairline `--line` dividers between sections and rows.
- **Border radius:** 3 to 4px max.
- **Section labels:** mono `01 / work` (`.section-label`, number in a `<span>` for accent). Hero
  kicker keeps the shell prompt (`visitor@lance:~$ whoami`).
- **Copy:** no emojis, no em dashes, no AI-sounding filler. Use commas, colons, or slashes instead.

### Motion:
- `.load-in` on hero elements: staggered fade + rise on page load
- `.reveal` on sections/rows: fades in on scroll via `IntersectionObserver` in `app.js`
- Row hover (desktop only): title nudges right, arrow slides in, thumbnail preview fades in
- `body::before` in `app.css` draws the background: a fixed CSS dot grid (14px spacing) masked by a
  circular radial fade centered just above the middle of the viewport, dissolving toward the edges.
  Tune dot alpha, spacing, or the mask there.
- `pressureDotGrid()` in `app.js` (mouse + no reduced motion only) swaps the CSS grid for a canvas
  copy and makes dots within ~90px of the cursor shrink, dim, and slide inward, like a pressed plate.
  Its spacing / radius / alpha / mask constants must stay in sync with `body::before`.
- `backgrounds/` holds saved alternative backgrounds (`dotGrid.css` + `dotGrid.js` is a backup copy of the
  live dot grid) with restore notes at the top of each file.
- Everything is disabled under `prefers-reduced-motion`. Keep motion subtle and short.

### What this site is NOT:
- Not a framework/template site (no Bootstrap, Tailwind)
- Not a glowing neon / cyberpunk aesthetic, no color gradients (the dot grid mask is the only gradient)
- No splash or loading screen

---

## UI / UX Rules

- Header is sticky at the top and horizontal on every width (no hamburger)
- Mobile first: base styles target phones, desktop overrides live in `@media (min-width: 760px)`
- No modal dialogs, tooltips, or dropdowns
- External links open in `target="_blank"` with `rel="noopener noreferrer"` and use the `&nearr;` arrow;
  internal links use `&rarr;`
- The favicon is `Images/websiteIcons/blackSquare.jpeg` on all pages
- No auto-playing media

---

## Reusable Patterns and Components

### Index rows (`.rows` + `.row`): the primary list pattern
Used for `#work` on `index.html` and the project list on `play.html`. Numbered row with title,
mono tags, and a thumbnail. On mobile the thumbnail sits on the right; on desktop it is hidden and
fades in on hover next to an arrow.

```html
<li class="reveal">
  <a class="row" href="morePages/thing.html">
    <span class="row-index">01</span>
    <div>
      <h3 class="row-title">Thing</h3>
      <div class="row-tags"><span>tag</span><span>tag</span></div>
    </div>
    <img class="row-thumb" src="Images/.../thing.png" alt="Thing" loading="lazy" />
    <span class="row-arrow" aria-hidden="true">&rarr;</span>
  </a>
</li>
```

**Unbuilt entries:** use `<div class="row row--soon">` with no thumb or arrow and
`<span class="row-status">soon</span>` in their place. Convert to an `<a class="row">` once the
subpage exists. Renumber `.row-index` values when adding or removing rows.

### Sections (`.section` + `.section-grid`)
Each one-pager section: `<section class="section" id="...">`, inner `.wrap.section-grid` with a
`.section-label` and a content `<div>`. Label sits in a left column on desktop, above on mobile.

### Hero (`.hero`)
Kicker, `.hero-name`, `.hero-lead`, `.hero-meta` list (`.is-live` gives the accent dot), `.link-row`
of `.text-link`s, and the portrait `.hero-photo` (grayscale, color on hover).

### About (`.about-bio`, `.about-cols`, `.about-col`)
Large bio paragraph, then three label + list columns (education / skills / currently).

### Text links (`.text-link`) and buttons (`.about-btn`)
`.text-link` is the default link style (mono, accent underline grows on hover). `.about-btn` /
`.about-btn--outline` remain for subpages (`< BACK`, visit/repo buttons).

### Expanded subpage layout (`.exp-timeline` / `.exp-entry` / `.exp-card`)
Used inside `morePages/`: `.exp-index` number, large `h3` title, `.exp-tags`, prose with `.exp-label`
subheads, `.project-media` images (`.exp-media-float` floats right on desktop), and `.exp-tools`
footer line. Clone an existing subpage (`homeServer.html` is the fullest example).

**External visit/repo button placement (Play subpages):** put it top-right of the first (`01`)
card's header using `.exp-card-header--with-link` and `.exp-card-header-link` (see `ytDown.html`
or `boredCube.html`). Only one such button per subpage, on the first card.

### Last updated footer
In `.site-footer` on `index.html` and `play.html`. Reads `window.LAST_UPDATED_AT` from
`last-updated.js`, regenerated by `.github/workflows/static.yml` at deploy time. It is `null`
locally, which displays as "local copy".

---

## Code Style Conventions

- Indent with 2 spaces in HTML; match surrounding file style (`index.html` is less consistent
  than the others — match whatever block you are editing)
- CSS class names use kebab-case (`.row-title`, `.section-label`, `.about-btn--outline`)
- One shared `app.css` for all pages — do not create page-specific stylesheets
- Comments in CSS use `/* ── Section name ─── */` style headers for sections
- Do not use inline styles unless unavoidable
- Keep selectors simple and flat — avoid deep nesting or specificity wars
- JavaScript is minimal: only add JS if HTML/CSS cannot accomplish the goal

---

## Things to Avoid

- **No CSS frameworks** (Bootstrap, Tailwind, etc.)
- **No JavaScript frameworks** (React, Vue, etc.)
- **No background gradients or color washes**
- **No glowing, pulsing, or neon effects**
- **No excessive animation**: stick to the existing `.load-in` / `.reveal` / row hover motion
- **No modal popups, sidebars, or complex UI patterns**
- **No auto-playing media** (audio or video)
- **No additional Google Fonts**: Geist and Roboto Mono only
- **Do not rename or restructure files** without updating every href that references them
- **Do not use `git add -A` or mass-stage files** — stage specific files only

---

## Rules for Future Claude Sessions

1. **Preserve the visual identity.** Near-black background, Geist + Roboto Mono, grayscale with one amber accent, hairline borders. Do not change this unless Lance explicitly asks.
2. **Reuse existing patterns first.** New work or play entries are `.row`s in the page's `.rows` list. New subpages clone an existing `morePages/` file. New info on the index goes in an existing `.section` or a new one using the same `.section-grid` structure. Do not invent new layout patterns when an existing one fits.
3. **Keep HTML readable.** Indent consistently, use semantic elements (`<article>`, `<section>`, `<nav>`, `<main>`), add meaningful `alt` text to all images.
4. **No speculative improvements.** Only change what was asked. Do not refactor surrounding code, add comments to untouched sections, or "clean up" things that weren't part of the task.
5. **Link hygiene.** Any time a file is renamed or a page is added, search all `.html` files for references and update them. Use Grep to find all occurrences before assuming a change is isolated.
6. **Content is real.** All text on the site describes Lance's actual experience. Do not invent or alter factual content without being told to. Placeholder text should be clearly labeled as such.
7. **Check `app.css` before adding new styles.** Many elements are already styled globally. Avoid duplicating rules.
8. **Mobile first.** Base styles are for phones; desktop overrides live in the `@media (min-width: 760px)` block near the bottom of `app.css`.
9. **Do not commit unless asked.** Lance controls when commits happen.
10. **Do not push to remote unless explicitly instructed.**

---

## Current Entries (as of 2026-10-29)

### `index.html#work`
| Entry | Links to |
|---|---|
| UGC Creator Website | `https://ethanle.us/` (external) |
| Lawfirm Website | `https://karemlaw.com/` (external) |
| 3D4E UCLA Campus Print Showcase | `morePages/modelTheU.html` |
| AI Comp 2026 | `morePages/aiComp2026.html` |
| IS Competition | `morePages/isComp.html` |

### `play.html`
| Entry | Links to |
|---|---|
| TrueNAS Scale Home Server | `morePages/homeServer.html` |
| YTDown (YouTube to MP4) | `morePages/ytDown.html` |
| Bored Cube (Browser Game) | `morePages/boredCube.html` |
| University of Utah Esports Valorant | `morePages/esports.html` |
| ICBM Basics (Minecraft Mod) | `soon` row, no subpage yet |
| Personal Labor Tracker | `soon` row, no subpage yet |

### Known loose ends
- `morePages/webDesign.html` and `morePages/midnightHosting.html` exist but nothing links to them
- `sitemap.xml` is missing `play.html` and most `morePages/` files
- Most `morePages/` files carry a leftover typing-animation script that targets elements that no longer exist (throws a harmless console error)
- `Images/albumCovers/` and `coding-music-playlist-links.txt` are unused since the music section was removed
