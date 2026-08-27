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

- Present Lance's identity, background, and skills on the index/about page
- Showcase professional and academic work in the `#experience` grid on `index.html`
- Showcase personal / hobby projects and interests on `play.html`
- Link out to LinkedIn, GitHub, and `morePages/` subpages for expanded detail on individual entries
- Feel personal and handcrafted, not like a template or corporate portfolio

---

## Tech Stack

- **HTML** — plain semantic HTML5, no templating engine
- **CSS** — single shared stylesheet (`app.css`), no preprocessors, no frameworks
- **JavaScript** — vanilla only. `app.js` (shared nav behavior), `last-updated.js` (deploy timestamp),
  plus inline `<script>` blocks at the bottom of `index.html` and `play.html` for the card overlay
  tap behavior and the music player. No libraries.
- **Fonts** — `Roboto Mono` loaded from Google Fonts. Note: `app.css` line 1 has an `@font-face`
  rule pointing at `/personalWebsite/Fonts/Minecraft.ttf`, but that file no longer exists and the
  font is not used anywhere. Treat it as dead code.
- **No build system** — files are served as-is, no npm, no bundler, no compilation step

---

## File and Folder Structure

```
/
├── index.html              # Home: About Me (#about) + Work grid (#experience)
├── play.html               # Play page: coding-music shelf/player + personal project grid
├── app.css                 # Single shared stylesheet for all pages
├── app.js                  # Shared JS: active nav link highlighting
├── last-updated.js         # Sets window.LAST_UPDATED_AT (regenerated at deploy time)
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

Top-level pages (`index.html`, `play.html`) share one `.navbar`:

- `ME` (`.nav-name`) → `#about` on index, `index.html` from play
- `Work` → `index.html#experience`
- `Play` → `play.html`
- `Resume` (`.nav-right`) → `morePages/resume.html`

`app.js` adds `.nav-active` to the link matching the current page, and on click for anchor links.

`morePages/` subpages use a stripped-down nav: a single `< BACK` link styled as
`.about-btn .about-btn--outline`, pointing at `../index.html#experience`.

Page titles: `index.html` uses `Lance Petrisko - Portfolio`; every other page uses the terminal
pattern `lancePetrisko/pageName` (lowercase camel for the page name).

---

## Design Philosophy

The site is intentionally styled after early 2000s black minimalist web aesthetics, with a
terminal/CLI flavor. It should feel handcrafted, understated, and slightly retro — not polished
or corporate.

### Core visual rules:
- **Background:** pure black (`rgb(0,0,0)`) on all pages. No gradients, no textures.
- **Text color:** light gray (`rgb(221,221,221)` or `rgb(238,238,238)`). Never pure white.
- **Font:** `Roboto Mono` for everything — headings, body, nav, buttons. Monospace only.
- **Letter spacing:** used liberally on headings and nav for the retro terminal feel
- **Borders:** low-opacity light gray (`rgba(238,238,238,0.1–0.2)`) — subtle separators only
- **Hover effects:** opacity reduction, a faint gray background wash, or the image-card overlay
- **Border radius:** 4–6px max, used sparingly. Never large or pill-shaped.
- **Section headings:** rendered as a shell prompt — `visitor@lance:~$ ls work/` via
  `.exp-section-heading` + `.exp-prompt` + `.exp-typed`. Reuse this for any new section.

### What this site is NOT:
- Not a modern SPA with animations and transitions
- Not a dark-mode Bootstrap or Tailwind site
- Not a glowing neon / cyberpunk aesthetic
- Not a minimalism-for-minimalism's-sake blank page

---

## UI / UX Rules

- Navigation is always at the top, horizontally laid out, always visible
- No JavaScript-driven scroll effects
- No modal dialogs, tooltips, or dropdowns. The music player panel on `play.html` is the one
  expanding-UI exception and already exists — don't add more.
- External links open in `target="_blank"` with `rel="noopener noreferrer"`
- The favicon is `Images/websiteIcons/blackSquare.jpeg` on all pages
- Audio on `play.html` never autoplays — it starts only from the `[ PLAY ]` button

---

## Reusable Patterns and Components

### Image card grid (`.exp-grid` + `.exp-img-card`) — the primary card pattern
Used for the work grid on `index.html#experience` and the project grid on `play.html`.
A 4:3 image with an overlay that reveals the title, tags, and a call to action on hover.
On mobile (`max-width: 900px`) the first tap reveals the overlay and the second navigates —
handled by the inline script at the bottom of each page.

```html
<a class="exp-img-card" href="morePages/thing.html">
  <img src="Images/.../thing.png" alt="Thing" />
  <div class="exp-img-overlay">
    <div class="exp-img-meta">
      <h3>Thing</h3>
      <div class="exp-tags">
        <span class="exp-tag">tag</span>
        <span class="exp-tag">tag</span>
      </div>
      <span class="exp-img-more">[ CLICK FOR MORE INFO ]</span>
    </div>
  </div>
</a>
```

Add `.exp-img-card--left` to anchor the image crop to the left edge (used for wide screenshots).

**Placeholder cards** — for a project with no subpage and no screenshot yet, use a `<div>`
instead of an `<a>` (CSS already gives non-anchor cards `cursor: default`), point the `<img>` at
`Gifs/underConstructionGif.gif`, and use `[ COMING SOON ]` in place of `[ CLICK FOR MORE INFO ]`.
Convert it to an `<a>` once the subpage exists.

### Expanded subpage timeline (`.exp-timeline` / `.exp-entry` / `.exp-card`)
The layout used inside `morePages/` subpages: a numbered `.exp-index` ("01") beside an
`.exp-card` holding a header, tags, prose, and image sections. Clone an existing subpage
(`homeServer.html` is the fullest example) rather than inventing a new layout.

### About hero (`.about-hero`)
On `index.html`. Flex row: photo on left, intro text (name, tagline, bio, buttons) on right.
Stacks vertically on mobile.

### About cards (`.about-cards`)
Three-column info grid on `index.html` (Education / Skills / Currently). Each `.about-card`
has a `// Heading` style h3 and short p tags.

### CTA buttons (`.about-btn`)
Light gray filled button, dark text. `.about-btn--outline` for the ghost variant (also used for
the subpage `< BACK` link). `.about-btn--icon` for icon-only buttons (LinkedIn, GitHub).

### Music shelf and player (`.music-section`, `.music-shelf`, `.music-player`)
`play.html` only. A horizontal album shelf; clicking an album opens the `.music-player` panel
with Spotify embed / track list. Driven by the `TRACKS` array in the inline script at the bottom
of `play.html` — add albums there, with art in `Images/albumCovers/`.

### Last updated footer
On `index.html` and `play.html`. Reads `window.LAST_UPDATED_AT` from `last-updated.js`, which is
regenerated at deploy time. It is `null` locally, which displays as a local-copy message.

### `.project-card`
Legacy pattern. Styles still live in `app.css` but no page uses it. Do not use it for new work —
use `.exp-img-card` instead.

---

## Code Style Conventions

- Indent with 2 spaces in HTML; match surrounding file style (`index.html` is less consistent
  than the others — match whatever block you are editing)
- CSS class names use kebab-case (`.exp-img-card`, `.about-hero`, `.about-btn--icon`)
- One shared `app.css` for all pages — do not create page-specific stylesheets
- Comments in CSS use `/* ── Section name ─── */` style headers for sections
- Do not use inline styles unless unavoidable
- Keep selectors simple and flat — avoid deep nesting or specificity wars
- JavaScript is minimal: only add JS if HTML/CSS cannot accomplish the goal

---

## Things to Avoid

- **No CSS frameworks** (Bootstrap, Tailwind, etc.)
- **No JavaScript frameworks** (React, Vue, etc.)
- **No background gradients or color washes** — the background is black, period
- **No glowing, pulsing, or neon effects**
- **No excessive animation**
- **No modal popups, sidebars, or complex UI patterns**
- **No auto-playing media** (audio or video)
- **No additional Google Fonts** — Roboto Mono is the only font in use
- **Do not rename or restructure files** without updating every href that references them
- **Do not use `git add -A` or mass-stage files** — stage specific files only

---

## Rules for Future Claude Sessions

1. **Preserve the visual identity.** Black background, Roboto Mono, gray text, low-opacity borders. Do not change this unless Lance explicitly asks.
2. **Reuse existing patterns first.** New work or play entries use `.exp-img-card` in the page's `.exp-grid`. New subpages clone an existing `morePages/` file. New info on the index uses `.about-card`. Do not invent new layout patterns when an existing one fits.
3. **Keep HTML readable.** Indent consistently, use semantic elements (`<article>`, `<section>`, `<nav>`, `<main>`), add meaningful `alt` text to all images.
4. **No speculative improvements.** Only change what was asked. Do not refactor surrounding code, add comments to untouched sections, or "clean up" things that weren't part of the task.
5. **Link hygiene.** Any time a file is renamed or a page is added, search all `.html` files for references and update them. Use Grep to find all occurrences before assuming a change is isolated.
6. **Content is real.** All text on the site describes Lance's actual experience. Do not invent or alter factual content without being told to. Placeholder text should be clearly labeled as such.
7. **Check `app.css` before adding new styles.** Many elements are already styled globally. Avoid duplicating rules.
8. **Mobile responsiveness lives in the `@media (max-width: 900px)` block** at the bottom of `app.css`. Add responsive overrides there, not inline.
9. **Do not commit unless asked.** Lance controls when commits happen.
10. **Do not push to remote unless explicitly instructed.**

---

## Current Entries (as of 2026-08-27)

### `index.html#experience` — Work
| Entry | Links to |
|---|---|
| UGC Creator Website | `https://ethanle.us/` (external) |
| Lawfirm Website | `https://karemlaw.com/` (external) |
| 3D4E UCLA Campus Print Showcase | `morePages/modelTheU.html` |
| AI Comp 2026 | `morePages/aiComp2026.html` |
| IS Competition | `morePages/isComp.html` |

### `play.html` — Play
| Entry | Links to |
|---|---|
| TrueNAS Scale Home Server | `morePages/homeServer.html` |
| YTDown (YouTube to MP4) | `morePages/ytDown.html` |
| Midnight Hosting | `morePages/midnightHosting.html` |
| University of Utah Esports Valorant | `morePages/esports.html` |
| ICBM Basics (Minecraft Mod) | placeholder — no subpage yet |
| Bored Cube (Browser Stim Game) | placeholder — no subpage yet |

`play.html` also has the coding-music shelf section above the grid.

### Known loose ends
- `morePages/webDesign.html` exists but nothing links to it
- `sitemap.xml` is missing `play.html` and most `morePages/` files
- `app.css` still carries the unused `@font-face` for a missing `Minecraft.ttf` and the unused `.project-card` rules
