---
# ═════════════════════════════════════════════════════════════
# WORK SAMPLE TEMPLATE
#
# How to use this file:
#   1. Copy this file and rename the copy, using lowercase words joined by
#      hyphens, e.g. "api-quickstart-guide.md". The file name becomes
#      the page address: /work/api-quickstart-guide/
#   2. Fill in the fields below. Lines starting with # are notes for you;
#      they never appear on the site.
#   3. Replace the placeholder text under each heading.
#
# This file starts with "_", so it is never published.
# ═════════════════════════════════════════════════════════════

# REQUIRED ─────────────────────────────────────────────────────
title: Title of the Sample
summary: One or two sentences that appear on the sample's card and at the top of its page.

# Must match a category name in content/pages/work.md exactly:
# Procedures, Resources, Forms, or Presentations.
# (Docs as Code is also listed there, but it's hidden for now. See the
# note in content/pages/work.md to turn it back on.)
category: Procedures

# When you finished the project (YYYY-MM-DD). Newest samples are listed first.
date: 2026-01-15

# Thumbnail image for the card. Put the image in content/work/images/.
# A 4:3 shape works best (for example 1200 × 900 pixels).
cover: ./images/your-image-name.png
coverAlt: Describe the image for people using screen readers.

# OPTIONAL ─────────────────────────────────────────────────────
# To show this sample in "Featured work" on the home page, add its file
# name to the list in content/home/featured.md.

# Set to true to hide the sample from the site while you work on it.
draft: false

role: Lead writer
audience: Who the document is for
tools:
  - Microsoft Word
  - Adobe Acrobat

# THE SAMPLE ITSELF: use a PDF, images, a link, or any combination.
# Delete the ones you don't use. (A missing file stops the build and
# tells you which one, so the live site never shows a broken link.)

# A PDF: put the file in public/files/ and write its path starting with /files/
pdf: /files/your-file-name.pdf

# Images: put them in content/work/images/. Add as many as you like.
images:
  - src: ./images/your-image-name.png
    alt: Describe the image.
    caption: Optional caption shown under the image.

# A button that links somewhere else, such as a live site or GitHub repository.
link:
  label: View the live site
  url: https://example.com
---

## Overview

What is this document, who is it for, and what does it help them do? Two to four sentences.

## My approach

How did you structure and write it, and what decisions made it work for its readers? Two to four
sentences, using only facts you can point to in the document.
