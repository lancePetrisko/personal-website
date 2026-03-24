# MEMORY.md — Observed Project State

This file records what Claude has actually observed in the codebase across sessions.
It supplements `CLAUDE.md` with ground-truth details, drift notes, and session findings.
Update entries as the project evolves. Do not duplicate rules already in `CLAUDE.md`.

---

## Actual File Structure (Observed)

```
/
├── index.html              # About Me / landing page — includes terminal splash + marquee
├── myExperience.html       # Experience + projects listing
├── app.css                 # Single shared stylesheet (all pages)
├── app.js                  # Last-updated footer + unused alertButton()
├── last-updated.js         # Injects window.LAST_UPDATED_AT at deploy time
├── CLAUDE.md               # Project guide for Claude sessions
├── memory/
│   └── MEMORY.md           # This file
│
├── morePages/
│   ├── homeServer.html     # TrueNAS home server detail page
│   ├── modelTheU.html      # 3D4E UCLA campus model detail page
│   ├── midnightHosting.html # Midnight Hosting detail page (newer — not yet in CLAUDE.md)
│   └── resume.html         # Resume page (linked from index.html — not yet in CLAUDE.md)
│
├── Images/
│   ├── indexPictures/      # seniorPicture.JPG
│   ├── homelabProject/
│   ├── modelTheUProject/
│   ├── midnightHostingProject/
│   ├── esports/
│   └── websiteIcons/       # linkedInLogo.jpg, blackSquare.jpeg (favicon)
│
├── Fonts/                  # Minecraft.ttf (declared in CSS, not actively used in UI)
├── MP3/                    # Audio files (not used)
└── Videos/                 # Video files (not used)
```

---

## Drift from CLAUDE.md (Things That Have Changed)

- **Midnight Hosting now has a subpage** — `morePages/midnightHosting.html` exists.
  CLAUDE.md table still marks it as "No subpage". Update CLAUDE.md when confirmed stable.

- **Resume page exists** — `morePages/resume.html` is live and linked from `index.html`
  as `<a href="morePages/resume.html" class="about-btn about-btn--outline">View Resume</a>`.
  Not listed anywhere in CLAUDE.md.

- **Terminal splash screen on `index.html`** — a `.exp-splash` block runs a JS typewriter
  animation (`visitor@lance:~$`) before the main page content appears. This is JS-driven
  animation, which CLAUDE.md says to avoid — but it's intentional and already shipped.
  Do not remove it. Do not add more JS animation elsewhere.

- **Marquee is now CSS-based** — the deprecated `<marquee>` HTML element was replaced with:
  - `.marquee-wrapper` (overflow: hidden)
  - `.marquee-track` (inline-flex, `animation: marquee-scroll 30s linear infinite`)
  - Duplicate `<h1 aria-hidden="true">` for seamless loop
  - `@keyframes marquee-scroll` — translateX(0) → translateX(-50%)
    This lives at the top of `app.css` (lines ~14–33).

---

## Key Landmarks in app.css

- **Marquee animation** — top of file, before global `h1` rule (~line 14)
- **Global `h1`** — color, font, letter-spacing applied to all h1s (~line 33)
- **`.navbar`** — nav bar styles
- **`.about-hero`** — flex row layout for index.html hero section
- **`.about-cards`** — three-column grid for index.html info cards
- **`.about-btn` / `.about-btn--outline` / `.about-btn--icon`** — CTA button variants
- **`.project-card`** — two-column card used on myExperience.html and morePages/
- **`@media (max-width: 900px)`** — all responsive overrides at the bottom of the file

---

## index.html Structure (Current)

1. Terminal splash screen (`.exp-splash`) — JS typewriter, fades out before page loads
2. Marquee scroll header (`.marquee-wrapper`) — "BE HAPPY, HAVE FUN" in 9 languages
3. Nav bar — ABOUT ME (`index.html`) | EXPERIENCE (`myExperience.html`)
4. `.about-hero` — photo left, intro text right (name, tagline, bio, 3 buttons)
5. `.about-cards` — 3 cards: `// Education`, `// Skills`, `// Currently`
6. Last-updated footer

---

## Buttons on index.html (Current)

| Button             | Class                           | Destination                                             |
| ------------------ | ------------------------------- | ------------------------------------------------------- |
| View My Experience | `.about-btn`                    | `myExperience.html`                                     |
| View Resume        | `.about-btn about-btn--outline` | `morePages/resume.html`                                 |
| LinkedIn icon      | `.about-btn--icon`              | `https://www.linkedin.com/in/lance-petrisko-b9994036a/` |

---

## Experience Entries (Observed)

| Entry                                    | Page              | Subpage                          |
| ---------------------------------------- | ----------------- | -------------------------------- |
| TrueNAS Scale Home Server                | myExperience.html | `morePages/homeServer.html`      |
| 3D4E UCLA Campus Print Showcase          | myExperience.html | `morePages/modelTheU.html`       |
| University of Utah Esports — JV Valorant | myExperience.html | None confirmed                   |
| Midnight Hosting                         | myExperience.html | `morePages/midnightHosting.html` |

---

## Conventions Observed in Practice

- `h3` headings inside `.about-card` use `// Heading` style (double-slash prefix)
- Page `<title>` pattern: `lancePetrisko/pageName` (camelCase page name)
- Favicon: `<link rel="icon" type="image/jpeg" href="Images/websiteIcons/blackSquare.jpeg" />`
- Google Fonts preconnect links always appear before `<title>` in `<head>`
- External links always have `target="_blank" rel="noopener noreferrer"`
- Nav link to current page uses `index.html` (not `./` or omitted)
