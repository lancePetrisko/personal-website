# Personal Portfolio Website

A static personal portfolio site built with plain HTML, CSS, and minimal JavaScript — no frameworks, no build tools, no dependencies. Deployed via GitHub Pages.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Single shared CSS file (`app.css`) |
| JavaScript | Vanilla JS (28 lines total) |
| Font | [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) via Google Fonts |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (`.github/workflows/static.yml`) |

No npm, no bundler, no preprocessors — files are served as-is.

## Project Structure

```
/
├── index.html                  # Landing / About Me page
├── myExperience.html           # Experience & projects listing
├── app.css                     # Shared stylesheet (all pages)
├── app.js                      # Shared JS utilities
├── last-updated.js             # Deploy-time timestamp (overwritten by CI/CD)
│
├── morePages/                  # Detail pages for individual projects
│   ├── homeServer.html
│   ├── modelTheU.html
│   ├── midnightHosting.html
│   └── resume.html             # Embedded PDF resume viewer
│
├── Images/
│   ├── indexPictures/          # Landing page photos
│   ├── homelabProject/         # Homelab hardware photos
│   ├── modelTheUProject/       # 3D print project photos
│   ├── midnightHostingProject/ # Hosting platform screenshots
│   ├── esports/                # Esports event photos
│   └── websiteIcons/           # Favicon and social icons
│
├── Fonts/                      # Local font files
├── Resume/                     # PDF resume file
└── .github/workflows/          # GitHub Actions deployment workflow
```

## Key Features

- **No-build static site** — plain HTML/CSS/JS served directly, zero compilation
- **Retro terminal aesthetic** — monospace font, black background, gray text, liberal letter-spacing
- **Scrolling marquee headers** — intentional early-2000s design element on every page
- **Alternating project cards** — two-column grid layout that flips image placement using a `.reverse` CSS class
- **Deploy-time timestamp** — GitHub Actions injects the last commit date into `last-updated.js` at deploy, displayed on the landing page
- **Responsive layout** — single CSS breakpoint at 900px collapses grids to single-column
- **Embedded resume viewer** — PDF embed with download button

## How It Works

### Page Architecture

The site has two top-level pages (`index.html`, `myExperience.html`) sharing a common nav bar. Detail pages live in `morePages/` and use a single "BACK" nav link. All pages share one stylesheet (`app.css`) and optionally load `app.js`.

### Styling

All styles live in `app.css` (≈320 lines), organized into sections:

- **Global reset & base typography** — black background, Roboto Mono, gray text
- **Navigation** — flexbox centered, hover effects via opacity/background wash
- **Project cards** — CSS Grid two-column layout with `.reverse` modifier for alternating sides
- **About section** — hero (flexbox row), info cards (3-column grid), CTA buttons
- **Responsive overrides** — `@media (max-width: 900px)` block at the bottom

### Deployment Pipeline

On every push to `main`, GitHub Actions:

1. Checks out the repository
2. Reads the last commit timestamp via `git log -1 --format=%cI`
3. Writes it into `last-updated.js` as `window.LAST_UPDATED_AT = "<ISO 8601 date>"`
4. Uploads and deploys the entire directory to GitHub Pages

In local development, `last-updated.js` contains `null`, so the footer displays "local copy" instead of a date.

### JavaScript

Minimal — a single IIFE in `app.js` that:

1. Looks for the `#last-updated-value` element (only present on `index.html`)
2. Reads `window.LAST_UPDATED_AT` set by `last-updated.js`
3. Formats and displays the deploy timestamp, falling back to "local copy" in dev

## Running Locally

No build step required. Serve the root directory with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .

# Or just open index.html directly in a browser
```

The "Last updated" footer will show "local copy" since the deploy timestamp isn't injected locally.

## Layout Patterns

### Project Card

Two-column grid used on the experience page and detail subpages. Add `.reverse` to flip the image to the right side:

```html
<article class="project-card">
  <div class="project-media"><img src="..." alt="..." /></div>
  <div class="project-content">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</article>

<article class="project-card reverse">
  <!-- image appears on the right -->
</article>
```

### About Cards

Three-column info grid on the landing page:

```html
<section class="about-cards">
  <div class="about-card">
    <h3>// Heading</h3>
    <p>Content</p>
  </div>
  <!-- repeat -->
</section>
```

## License

See [LICENSE](LICENSE) for details.
