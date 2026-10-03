---
name: house-style
description: >-
  Danny's default visual style: brand, colour palette, typefaces, starter CSS, components and
  worked examples. Use when starting a new web page, tool, small app, slide, social image,
  diagram or other visual thing that has no brand of its own, when Danny asks for something in
  his own style or brand, or when another skill needs his colours or fonts.
---

# House style

Danny's default look for things that don't have one of their own: quick tools, single-page apps, slides, social images, diagrams. It gives you a brand to work within, a palette and type system with the reasoning behind them, starter CSS, a set of small components, and worked examples.

**It is a starting point, not a rulebook.** A project's own brand always wins, and so does anything Danny asks for. When he says to ignore the defaults, drop them completely. Within the style, you're free to invent: a new kind of card or switch built from the tokens is often better than forcing one of the components here to fit.

## The brand in brief

Friendly, plain and a bit playful. It should feel made by a person.

- **Coral `#ff7369` is the only accent**, used sparingly: one word in a headline, the primary button.
- **Dark, cool neutrals:** a Charcoal `#191919` page with Slate `#2f3437` surfaces. Slides and images are dark; on the web, build light and dark and follow the system setting.
- **Heavy, tight headlines in Geist;** everything else in Figtree.
- **Flat:** solid fills, hairline borders, small radii, almost no shadows.
- **Two registers:** calm for interfaces, playful (blobs, big emoji, handwriting) for slides and images.

`references/brand.md` is the full version, and the one file worth reading every time.

## How much to take

Pick the lightest level that does the job.

1. **Absorb the look.** Read `references/brand.md`, look at the two screenshots listed under "See it" below, and write your own CSS. Often this is enough.
2. **Take the foundation.** Copy `css/reset.css`, `css/tokens.css` and `css/base.css` into the project and link them in that order (plus `css/utilities.css` for layout helpers). Plain HTML then looks right with no classes. `references/web.md` has the snippet and the conventions.
3. **Take components.** Copy individual files from `css/components/`. Each one's header comment shows its markup.
4. **Start from an example.** Copy a page from `pages/examples/` along with the CSS files it links, and fix the paths. The slides and social examples also need `pages/examples/canvas.css`.

Copy files into the project; don't link to this skill's directory. Once copied they belong to the project, so change them freely.

**For a single self-contained HTML file**, don't paste the whole foundation: it's about 40KB. Paste `tokens.css` whole, then only the parts of `reset.css` and `base.css` the page uses (both are divided by banner comments), inside the same `@layer` blocks. Or go to level 1 and write a small stylesheet of your own from the tokens.

**In a project that already has its own CSS or Tailwind**, take the tokens and the look, not the class names: `references/web.md` lists what would clash.

## What's here

| Path | What it is | Read it when |
| --- | --- | --- |
| `references/brand.md` | The brand: what makes it recognisable, the two registers, voice, what it isn't | Always |
| `references/colour.md` | How the palette works and how to use each colour | Choosing or using colour, in any medium |
| `references/typography.md` | The typefaces, the rules for using them, Google Fonts URLs | Setting type, in any medium |
| `references/web.md` | How the CSS is organised, its conventions, how to extend it | Building anything for the web |
| `css/tokens.css` | Every value: palette hex codes, semantic colours, type, space, shape | You need an exact value or token name |
| `css/reset.css`, `base.css`, `utilities.css` | The rest of the foundation | Taking the foundation |
| `css/components/*.css` | One optional component per file | You want that component, or a reference for your own |
| `pages/*.html` | Reference pages: `foundations`, `elements`, `components` | You want to see markup in use |
| `pages/examples/*.html` | Worked examples: `dashboard`, `form`, `slides`, `social` | Starting something similar |
| `pages/examples/canvas.css` | Example styles for slides and social images, sized relative to the canvas | Making slides or images as HTML |
| `images/avatar.jpg` | Danny's photo | An end card, a byline, an avatar |
| `screenshots/*.png` | Pictures of all of the above | You want to see it without opening a browser |

## See it

Look before you design. Start with these two:

- `screenshots/example-dashboard-dark.png`: the calm register, an interface.
- `screenshots/example-slides-dark.png`: the playful register, away from interfaces.

Then, as needed:

- **Examples:** `example-dashboard-light`, `example-form-dark`, `example-form-light`, `example-social-dark`.
- **Foundations:** `foundations-colour-dark`, `foundations-colour-light`, `foundations-type-dark`, `foundations-shape-dark`.
- **Elements:** `elements-text-dark`, `elements-buttons-dark`, `elements-forms-dark`, `elements-disclosure-dark` (with `-light` versions of text and forms).
- **Components:** `components-status-dark`, `components-controls-dark`, `components-content-dark`, `components-navigation-dark` (with `-light` versions of status and controls).

## Not the web

For slides, images, video, diagrams and documents, the brand, colour and typography references apply as they are. Take hex values from `css/tokens.css`. `pages/examples/slides.html` and `social.html` show the playful register; take the ingredients, not the layouts. When building slides or images as HTML, `pages/examples/canvas.css` is a working starting point to copy and cut down, and `slides.html` shows how to step through a deck and how to export at a real pixel size.

## Check your work

Render what you've made and look at it, in light and dark, before saying it's done. Compare it with the screenshots here: does it look like it belongs to the same family? If you can't render it (a browser won't launch inside the Claude Code sandbox), say so plainly instead of claiming it's been checked.

## Maintaining this skill

The CSS files are the source of truth, the pages show them in use, and the markdown explains why; don't repeat values from the CSS in the markdown. After changing the CSS or the pages, regenerate the screenshots:

```
bun install
bun run screenshots
```

Chromium won't launch inside the Claude Code sandbox, so run that outside it.
