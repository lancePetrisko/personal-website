# CLAUDE.md — Personal Website Project Guide

This file is the persistent reference for Claude sessions working on this codebase.
Read it before making any edits. Follow everything here unless the user explicitly overrides it.

---

## Project Overview

Personal portfolio website for **Lance Petrisko** — an Information Systems student at the
University of Utah, based in Salt Lake City / Seattle. The site is a digital resume and
project showcase intended for employers, recruiters, and anyone interested in his work.

---

## Purpose and Goals

- Present Lance's identity, background, and skills on the index/about page
- Showcase his technical projects and real-world experience on the experience page
- Link out to LinkedIn and subpages for expanded detail on individual entries
- Feel personal and handcrafted, not like a template or corporate portfolio

---

## Tech Stack

- **HTML** — plain semantic HTML5, no templating engine
- **CSS** — single shared stylesheet (`app.css`), no preprocessors, no frameworks
- **JavaScript** — minimal vanilla JS (`app.js`, `last-updated.js`), no libraries
- **Fonts** — `Roboto Mono` loaded from Google Fonts; `Minecraft.ttf` declared but not actively used in UI
- **No build system** — files are served as-is, no npm, no bundler, no compilation step

---

## File and Folder Structure

```
/
├── index.html              # One-page site: About Me + Experience sections
├── app.css                 # Single shared stylesheet for all pages
├── app.js                  # Shared JS: last-updated display, misc utilities
├── last-updated.js         # Sets window.LAST_UPDATED_AT (injected at deploy time)
│
├── morePages/              # Expanded detail pages for individual experience entries
│   ├── homeServer.html     # TrueNAS home server deep-dive
│   └── modelTheU.html      # 3D4E campus model project deep-dive
│
├── Images/
│   ├── indexPictures/      # Photos used on index.html (seniorPicture.JPG)
│   ├── homelabProject/     # Homelab hardware photos
│   ├── modelTheUProject/   # 3D print showcase photos
│   ├── midnightHostingProject/ # Midnight Hosting screenshots
│   ├── esports/            # Esports LAN event photos
│   └── websiteIcons/       # Favicon and social icons (linkedInLogo.jpg, blackSquare.jpeg)
│
├── Fonts/                  # Local font files (Minecraft.ttf — public domain)
├── MP3/                    # Audio files (not currently used on the site)
└── Videos/                 # Video files (not currently used on the site)
```

---

## Navigation Structure

- `index.html` is a one-page site with two in-page anchor sections: `#about` and `#experience`
- Nav has two links: `ABOUT ME` → `#about`, `EXPERIENCE` → `#experience`
- `morePages/` subpages use a single `< BACK` nav link pointing to `../index.html#experience`
- Nav links are uppercase, letter-spaced, no decoration

---

## Design Philosophy

The site is intentionally styled after early 2000s black minimalist web aesthetics.
It should feel handcrafted, understated, and slightly retro — not polished or corporate.

### Core visual rules:
- **Background:** pure black (`rgb(0,0,0)`) on all pages. No gradients, no textures.
- **Text color:** light gray (`rgb(221,221,221)` or `rgb(238,238,238)`). Never pure white.
- **Font:** `Roboto Mono` for everything — headings, body, nav, buttons. Monospace only.
- **Letter spacing:** used liberally on headings and nav for the retro terminal feel
- **Borders:** low-opacity light gray (`rgba(238,238,238,0.2)`) — subtle separators only
- **Hover effects:** simple opacity reduction (`0.75`) or a faint gray background wash
- **Border radius:** 4–6px max, used sparingly. Never large or pill-shaped.
- **Marquee scrolling header:** present on all pages — a signature retro element, keep it

### What this site is NOT:
- Not a modern SPA with animations and transitions
- Not a dark-mode Bootstrap or Tailwind site
- Not a glowing neon / cyberpunk aesthetic
- Not a minimalism-for-minimalism's-sake blank page

---

## UI / UX Rules

- Navigation is always at the top, centered, horizontally laid out, always visible
- Page titles follow the pattern `lancePetrisko/pageName` (lowercase camel for page)
- The scrolling `<marquee>` at the top is intentional — do not remove it
- No JavaScript-driven animations or scroll effects
- No modal dialogs, tooltips, dropdowns, or other interactive UI complexity
- External links (e.g. LinkedIn) open in `target="_blank"` with `rel="noopener noreferrer"`
- The favicon is `Images/websiteIcons/blackSquare.jpeg` on all pages

---

## Reusable Patterns and Components

### Project / Experience card (`.project-card`)
Used in the `#experience` section of `index.html` and `morePages/` subpages. Two-column grid: image on one side,
text content on the other. Add `.reverse` to flip image to the right. Cards alternate sides
for visual rhythm. Separated by a bottom border, last card has none.

```html
<article class="project-card">
  <div class="project-media"><img src="..." alt="..." /></div>
  <div class="project-content">
    <h3>Title <a href="...">[MORE INFO]</a></h3>
    <p>Description</p>
    <p><b>Tools:</b> ...</p>
  </div>
</article>

<article class="project-card reverse"> <!-- image flips to right -->
  ...
</article>
```

### About hero (`.about-hero`)
Used on `index.html`. Flex row: photo on left, intro text (name, tagline, bio, buttons) on right.
Stacks vertically on mobile.

### About cards (`.about-cards`)
Three-column info grid on `index.html`. Each `.about-card` has a `// Heading` style h3 and short p tags.

### CTA buttons (`.about-btn`)
Light gray filled button, dark text. Use `.about-btn--outline` for a ghost variant.
Use `.about-btn--icon` for icon-only buttons (e.g. LinkedIn logo).

### Last updated footer
Only on `index.html`. Reads from `window.LAST_UPDATED_AT` injected by `last-updated.js`.
Displays "local copy" in dev, a formatted date in production.

---

## Code Style Conventions

- Indent with 2 spaces in HTML; match surrounding file style
- CSS class names use kebab-case (`.project-card`, `.about-hero`, `.about-btn--icon`)
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
- **No excessive animation** — the only motion on the site is the marquee scroll
- **No modal popups, sidebars, or complex UI patterns**
- **No auto-playing media** (audio or video)
- **No additional Google Fonts** — Roboto Mono is the only font in use
- **Do not rename or restructure files** without updating every href that references them
- **Do not use `git add -A` or mass-stage files** — stage specific files only

---

## Rules for Future Claude Sessions

1. **Preserve the visual identity.** Black background, Roboto Mono, gray text, low-opacity borders. Do not change this unless Lance explicitly asks.
2. **Reuse existing patterns first.** New experience entries use `.project-card`. New info on the index uses `.about-card`. Do not invent new layout patterns when an existing one fits.
3. **Keep HTML readable.** Indent consistently, use semantic elements (`<article>`, `<section>`, `<nav>`, `<main>`), add meaningful `alt` text to all images.
4. **No speculative improvements.** Only change what was asked. Do not refactor surrounding code, add comments to untouched sections, or "clean up" things that weren't part of the task.
5. **Link hygiene.** Any time a file is renamed or a page is added, search all `.html` files for references and update them. Use Grep to find all occurrences before assuming a change is isolated.
6. **Content is real.** All text on the site describes Lance's actual experience. Do not invent or alter factual content without being told to. Placeholder text should be clearly labeled as such.
7. **Check `app.css` before adding new styles.** Many elements are already styled globally. Avoid duplicating rules.
8. **Mobile responsiveness lives in the `@media (max-width: 900px)` block** at the bottom of `app.css`. Add responsive overrides there, not inline.
9. **Do not commit unless asked.** Lance controls when commits happen.
10. **Do not push to remote unless explicitly instructed.**

---

## Current Experience Entries (as of last update)

| Entry | Section | Has subpage? |
|---|---|---|
| Web Design Projects | `index.html#experience` | Yes — `morePages/webDesign.html` |
| TrueNAS Scale Home Server | `index.html#experience` | Yes — `morePages/homeServer.html` |
| 3D4E UCLA Campus Print Showcase | `index.html#experience` | Yes — `morePages/modelTheU.html` |
| University of Utah Esports — JV Valorant | `index.html#experience` | No |
| Midnight Hosting | `index.html#experience` | No |
