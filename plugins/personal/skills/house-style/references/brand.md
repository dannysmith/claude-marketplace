# Danny's brand: the essence

The medium-agnostic layer: what makes something look and sound like Danny's, whether it's a web page, a slide, a video or a diagram. Colour is covered in more depth in `colour.md`, type in `typography.md`, and building for the web in `web.md`.

## When this applies

This is a default, not a rule. Use it when a project has no look of its own: quick tools, single-page apps, slides, social images, explainers. A project's own brand always wins (Astro Editor and Taskdn use Flexoki, for example), and anything Danny asks for wins over everything. When he says to ignore the defaults, drop them completely.

## In one line

Friendly, plain and a bit playful: dark charcoal, big confident type, and one warm coral accent. It should feel made by a person.

## What makes it recognisable

These are the things to keep even when everything else changes:

1. **Coral is the only accent.** One highlighted word in a headline, one primary button, the bullet markers. If coral is everywhere it stops meaning anything.
2. **Dark, cool neutrals.** Slate (`#2f3437`) and Charcoal (`#191919`), with near-white text. Light mode is white with the same cool greys. Never pure black backgrounds.
3. **Heavy, tight headlines.** Geist at 800 or 900, tight leading, slightly negative tracking. Short titles in caps, statements in sentence case. Emphasis comes from colour, not italics.
4. **Flat.** Solid fills, hairline borders and small radii. Shadows are rare and soft. No gradients, glows or glass.
5. **A family of soft, Notion-like hues.** Pink, coral, orange, yellow, green, blue, purple and brown, each in six steps from pale tint to deep shade. They carry meaning (status, tags, categories) or decorate. They don't compete with coral.
6. **Space.** Generous margins and left-aligned, asymmetric layouts more often than centred ones.

## Two registers

The same brand runs from calm to playful. Pick by context, and say which you picked.

| | Calm | Playful |
| --- | --- | --- |
| Use for | Tools, dashboards, admin, docs, anything used repeatedly | Slides, social images, videos, landing moments, empty states |
| Colour | Neutrals do the work; coral for the one primary action | Coral and pastels in large areas; full-bleed colour cards |
| Decoration | None | Organic blobs bleeding off corners, hand-drawn squiggles and arrows |
| Illustration | Lucide icons | Large emoji, flat vector drawings in the palette |
| Type | Modest sizes, Figtree does most of it | Giant Geist headlines, the odd Caveat aside |

The default for interfaces is calm. A calm tool can still have one playful moment: an emoji in an empty state, a coral word in the page title.

## Colour

- **Core:** Coral `#ff7369`, Slate `#2f3437`, Charcoal `#191919`, white.
- **Dark is the default.** Slides, images and video are dark unless there's a reason. On the web, build both modes and follow the system setting.
- **Coral is the brand colour in both modes**, and text on a coral fill is Charcoal, not white.
- **Beige** `#f8f1e3` replaces white as the light background when working on or for danny.is.
- One palette per piece of work. Don't mix this with Flexoki or a project's own colours.

The full palette, what each step is for and the rules for coral are in `colour.md`.

## Type

Geist for display and headings, Figtree for body and interface text. Literata for bookish long-form, Caveat for the odd handwritten aside, Operator Mono or Fira Code for code. Native Mac apps and local-only web apps use the system font instead.

Faces, weights, sizes and where to load them from are in `typography.md`.

## Shape, icons and images

- Radii are small: 4px on controls, inputs, callouts and toasts; 8px on cards, dialogs and menus. Pills only for status badges and switches.
- Borders are 1px in a neutral a step away from the surface. Prefer spacing or a background change to a border.
- Icons are Lucide (or Phosphor), stroked, in the text colour.
- Prefer drawn SVG (blobs, diagrams, flat illustration) to photography. Apple emoji for personal work, Fluent Emoji for commercial product marketing.
- Code and terminals sit in macOS window chrome on Charcoal.

## Motion

Smooth and quick, never unnecessarily swooshy. Short fades and small movements (120–200ms) that direct attention to one thing at a time. No spins, flips, bounces or blur unless it actually adds something.

## Voice

UK English. Warm, plain and a bit cheeky, like explaining something to a clever friend. Specific over grand: "Your schemas become forms", not "Supercharge your workflow". One thought per line. Never claim more than the thing does. Emoji are welcome. No marketing clichés. Use the `writing:guide` skill for anything longer than a headline.

## What it isn't

- Purple or cyan glows on black, gradient text, glassmorphism.
- Pure black or pure white with thin grey type.
- Everything centred, everything in a rounded card with a drop shadow.
- Corporate blue, or several accent colours fighting.
- Dense, small, low-contrast interface text.
