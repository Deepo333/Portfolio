# Portfolio

My technical writing portfolio, built with [Astro](https://astro.build) using a docs-as-code workflow.
Every page is written in Markdown. When a change is merged into `main`, GitHub Actions rebuilds
the site and publishes it to GitHub Pages automatically.

**Live site:** https://deepo333.github.io/DP-Portfolio-/

---

## Which file controls which page

Everything you'll normally edit is in the **`content/`** folder (words and images) or the
**`public/files/`** folder (PDFs). You shouldn't need to touch anything in `src/`.

| Page | Address | File to edit |
| --- | --- | --- |
| Your name, email, LinkedIn (shown on every page) | — | `content/settings.md` |
| Home (one file per section, listed below) | `/` | `content/home/` |
| Work Samples hub, including the category names and descriptions | `/work/` | `content/pages/work.md` |
| Each work sample's detail page | `/work/<file-name>/` | `content/work/<file-name>.md` |
| About | `/about/` | `content/pages/about.md` |
| Résumé | `/resume/` | `content/pages/resume.md`, plus the PDF at `public/files/resume.pdf` |
| Contact | `/contact/` | `content/pages/contact.md` |

### The home page, section by section

Each section of the home page has its own file in `content/home/`, in the order they appear:

| Section | File | What you edit there |
| --- | --- | --- |
| Hero | `content/home/intro.md` | Headline, intro paragraph, and the two button labels |
| Stats bar | `content/home/stats.md` | The four numbers and their labels (see "Replace the placeholder stats" below) |
| Featured work | `content/home/featured.md` | Section heading and intro. The cards are the work samples marked `featured: true` |
| Core capabilities | `content/home/capabilities.md` | Each capability's name, icon, and description |
| Tools & technologies | `content/home/tools.md` | Each tool's name and icon |
| My process | `content/home/process.md` | Each step's name and description (numbered automatically) |
| Let's work together | `content/home/closing.md` | Heading, text, and link labels. Email and LinkedIn come from `content/settings.md` |

Your name comes from `content/settings.md` and your photo from `content/pages/about.md`,
so you only set them once.

**Icons:** capabilities and tools each have an `icon:` line. The comment at the top of
`capabilities.md` and `tools.md` lists every icon name you can use (for example `procedure`,
`form`, `code`, `document`, `pdf`, `git`, `slides`).

### How a Markdown file is organized

Each file has two parts:

```markdown
---
title: About me            ← The top part, between the --- lines, is "frontmatter":
headshot: ./images/me.jpg     labeled settings, one per line, in the form  label: value
---

I'm a technical writer...  ← Everything below is the page text, written in normal Markdown.
```

Lines in the frontmatter that start with `#` are notes to you. They never appear on the site.

### Where files go

| What | Where to put it | How to refer to it |
| --- | --- | --- |
| Images for work samples | `content/work/images/` | `./images/my-picture.png` |
| Your headshot (used on Home and About) | `content/pages/images/` | `./images/headshot.jpg` |
| PDFs (samples and résumé) | `public/files/` | `/files/my-document.pdf` |

### Linking to other pages

In Markdown, link to another page on your site by starting the address with `/`, for example
`[see my résumé](/resume/)` or `[the calibration SOP](/work/equipment-calibration-sop/)`.
The site adjusts these links automatically so they work on GitHub Pages.

---

## How to add a new work sample

1. **Add your files.**
   - Put a cover image in `content/work/images/`. Landscape works best (for example, 1600 × 1000 pixels).
   - If the sample is a PDF, put it in `public/files/`.
   - If the sample is a set of images (like slides), put them in `content/work/images/` too.
2. **Copy the template.** In `content/work/`, make a copy of `_TEMPLATE.md` and rename it.
   Use lowercase words joined by hyphens, like `api-quickstart-guide.md`. The file name becomes the
   page address: `/work/api-quickstart-guide/`.
3. **Fill in the frontmatter.** The template explains every field. The important ones:
   - `category` must match one of the names in `content/pages/work.md` exactly
     (`Procedures`, `Resources`, `Forms`, `Presentations`, or `Docs as Code`).
   - `cover` and `coverAlt` set the card image and its description for screen readers.
   - `pdf`, `images`, and `link` control what appears in **The sample** section. Delete the ones you don't use.
   - `featured: true` also shows the sample on the home page.
   - `draft: true` hides the sample until you're ready.
4. **Write the case study.** Replace the text under the four headings:
   **Overview**, **The problem**, **My approach**, and **The result**.
5. **Publish it** (see the next section).

The sample appears automatically on the Work Samples page under its category, and its detail page
gets a "Previous / Next" link to the other samples. Samples are listed newest first, based on `date`.

Tip: the five example samples in `content/work/` each show a different pattern:

| Example file | Shows how to |
| --- | --- |
| `equipment-calibration-sop.md` | Embed a PDF |
| `onboarding-quick-reference.md` | Embed a PDF |
| `incident-report-form.md` | Embed a fillable PDF form |
| `change-management-training-deck.md` | Show a gallery of images with captions |
| `docs-site-migration.md` | Combine images with a link button |

To remove an example, delete its `.md` file and the files it uses in `content/work/images/` and `public/files/`.

---

## How publishing works

1. Make your changes on a new branch (in the GitHub website, choose **Create a new branch** when you commit).
2. Open a **pull request** into `main`. GitHub Actions builds the site to check for mistakes. A green
   check means the build succeeded; a red X means something needs fixing (see below).
3. **Merge** the pull request. About a minute later, the live site is updated.

You can also commit directly to `main` for quick fixes. The site publishes the same way.

You can watch progress on the repository's **Actions** tab. To republish without changing anything,
open **Actions → Build and publish site → Run workflow**.

The finished website is stored on a branch called `gh-pages`, which GitHub Pages serves. The workflow
regenerates that branch on every publish, so never edit it by hand. All your work happens on `main`.

### If the build fails

Open the failed run on the **Actions** tab and read the error. The site checks your content before
publishing, so most errors name the file and the problem, for example:

- `content/work/my-sample.md has category "Procedure"...`: the category doesn't match the list
  in `content/pages/work.md`. Check the spelling, including capital letters.
- `...links to "/files/report.pdf", but there is no file at public/files/report.pdf`: the PDF
  is missing or its name is spelled differently.
- `Could not find requested image ./images/cover.png`: the image is missing from the `images` folder,
  or its name is spelled differently.
- `title: Required` (or another field name): a required field is missing from the frontmatter.
- `items.0.icon: Invalid option: expected one of "procedure"|"form"|...`: an icon name is misspelled.
  Use one of the listed names. Items are counted from 0, so `items.0` is the first item in the list.

Because the build stops on errors, a mistake never reaches your live site. The last good version stays up.

---

## Common changes

- **Change your name, email, or LinkedIn:** edit `content/settings.md`.
- **Change the home page headline or intro:** edit `content/home/intro.md`.
- **Replace the placeholder stats:** in `content/home/stats.md`, change each `"00"` to your real
  number (keep the quotes, for example `"45+"`), then delete that stat's `placeholder: true` line
  so the "Placeholder" tag disappears.
- **Add, remove, or reorder capabilities, tools, or process steps:** edit the list in the matching
  file in `content/home/`. Copy an existing item (all of its lines, starting with `- name:`) to add one.
- **Replace your résumé:** upload your new PDF to `public/files/` as `resume.pdf` (replacing the old one),
  then update `updated:` in `content/pages/resume.md`.
- **Change your headshot:** replace `content/pages/images/headshot.jpg` with your new photo, keeping
  the same file name. It appears on the Home and About pages. Use a high-quality JPG with your face
  near the center; the arch-shaped frame trims the edges, never the middle.
- **Change the colors:** edit the lines at the top of `src/styles/global.css`. Each line gives the
  light-mode color first and the dark-mode color second, for example
  `--primary: light-dark(#1f2a44, #b9c4e0);` for the navy buttons and links.
- **Change the top navigation:** edit the `links` list in `src/components/Header.astro`.

### Renaming the repository (for example, to `portfolio`)

The site's address follows the repository's name, so renaming is safe:

1. On GitHub, open **Settings → General**, change **Repository name** to `portfolio`, and select **Rename**.
2. Open **Actions → Build and publish site → Run workflow** to republish at the new address:
   `https://deepo333.github.io/portfolio/`.
3. Update the old address where it appears: the **Live site** line at the top of this file,
   `sourceCode` in `content/settings.md`, and the `link` in `content/work/docs-site-migration.md`.

---

## Preview the site on your computer (optional)

You don't need this to publish, but it lets you see changes before pushing them.

1. Install [Node.js](https://nodejs.org) version 24 (the "LTS" version).
2. In a terminal, open this folder and run `npm install` (only needed once).
3. Run `npm run dev`, then open http://localhost:4321 in your browser.
   The page refreshes automatically as you save files. Press `Ctrl + C` to stop.

---

## Behind the scenes

| File or folder | What it does |
| --- | --- |
| `src/pages/` | One template per page type. `src/pages/work/[id].astro` is the work sample detail template. |
| `src/components/` | Reusable pieces: header, footer, sample cards, the arch-framed portrait, icons, PDF viewer. |
| `src/lib/icons.ts` | The thin-line icons you can pick with `icon:` in Markdown. |
| `src/styles/global.css` | Colors, fonts (Fraunces for headings, Inter for text), spacing, and light/dark mode. |
| `src/content.config.ts` | The list of fields each Markdown file can have, and which are required. |
| `src/lib/content.ts` | Loads the content and produces the friendly error messages. |
| `.github/workflows/deploy.yml` | The GitHub Actions workflow that builds and publishes the site. |
| `astro.config.mjs` | Astro settings. The site's address is filled in automatically during publishing. |
