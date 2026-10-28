---
# Example work sample. See _TEMPLATE.md in this folder for what each field does.
# This sample combines images with a link button.
title: Docs-as-Code Migration
summary: Moved a team's scattered documentation into Markdown and Git, with automatic publishing and peer review built into the workflow.
category: Docs as Code
date: 2026-09-02
cover: ./images/docs-site-migration-cover.png
coverAlt: Preview of a code editor showing a Markdown file next to the published web page.
featured: true
role: Project lead and writer
audience: Product team and internal users
tools:
  - Markdown
  - Git and GitHub
  - Astro
  - GitHub Actions
images:
  - src: ./images/docs-site-migration-editor.png
    alt: A Markdown file open in a code editor.
    caption: Every page is a Markdown file stored alongside the product's code.
  - src: ./images/docs-site-migration-site.png
    alt: The published documentation page with navigation and search.
    caption: Merging a change publishes the updated page automatically.
link:
  label: View the source repository
  url: https://github.com/Deepo333/Portfolio
---

## Overview

A migration of a product team's documentation from shared drives and a wiki into a docs-as-code workflow: Markdown files in Git, changes reviewed in pull requests, and a site published automatically with GitHub Actions.

## The problem

Documentation lived in four places, and nobody was sure which version was current. Engineers rarely updated docs because the tools were separate from their daily workflow, so content drifted out of date with every release.

## My approach

- **Audited the existing content**, then merged duplicates and archived what was obsolete.
- **Converted the remaining pages to Markdown** and organized them in a structure that matched how users look for information.
- **Set up a pull request workflow** so engineers could suggest changes and I could review them before publishing.
- **Automated publishing** with GitHub Actions, so the site updates every time a change is merged.
- **Wrote a contributor guide** so anyone on the team could make their first edit in minutes.

## The result

Docs now ship in the same pull request as the features they describe. Engineers contribute directly, outdated pages are caught in review, and the team has one trusted source of truth.
