# Colour

How Danny's palette is put together and how to use it. Every value lives in `css/tokens.css`: read that file for hex codes and token names, whether or not you're building for the web. To see the colours, open `pages/foundations.html` or look at `screenshots/foundations-colour-dark.png`.

## Where it comes from

The palette is based on Notion's standard colours, which is why it sits comfortably next to Notion pages and why it reads as soft and friendly, not corporate. Danny has used it for years across slides, social images and apps, so stay close to it. A few steps have been repaired so each one does the job its number promises; the 500s and most of the Notion values are untouched.

## The structure

Eight hues: pink, coral, orange, yellow, green, blue, purple and brown. Each has six steps, and the step number tells you what it's for.

| Step | Job |
| ---- | --- |
| 800 | Tinted background on dark; small coloured text on a light tint |
| 700 | Border on dark |
| 600 | Coloured text on light |
| 500 | The hue itself: fills, shapes, big type, on any background |
| 400 | Border on light, soft pastel for blobs and shapes, small coloured text on dark |
| 300 | Tinted background on light |

Alongside the hues:

- **One cool grey ramp**, `grey-50` to `grey-950`. Slate (`#2f3437`) is `grey-800` and Charcoal (`#191919`) is `grey-950`. Light mode uses white and the pale end; dark mode uses Charcoal for the page and Slate for surfaces.
- **Three beiges**, for danny.is work. They replace white and the two palest greys, and borders become a translucent Charcoal so they sit on the warm background. Nothing else changes.

## Coral

Coral `#ff7369` (`coral-500`) is the one accent, in both light and dark.

- **Use it sparingly.** One highlighted word in a headline, the primary button, list markers, the focus ring. In the playful register it can also be a blob or a full-bleed card.
- **Text on a coral fill is Charcoal, not white.** White on coral is 2.7:1; Charcoal on coral is 6.6:1.
- **Small coral text changes with the mode.** Links and other small text use `coral-deep` (`#f14e48`) on light and `coral-soft` (`#ffa197`) on dark. Both stay recognisably coral.
- **`coral-deep` is 3.5:1 on white.** That's fine for large text and for links, which should stay underlined. Don't set paragraphs in it.
- **`coral-600` (`#e03e3e`) is a true red**, for destructive buttons and danger states. It isn't the accent.

## Using the other hues

The hues carry meaning or decorate. They never compete with coral for attention.

- **Status:** danger is coral, warning is orange, success is green, info is blue.
- **Categories:** tags, labels, chart series and file types can take any hue.
- **A tinted block** (callout, tag, badge) on light is a 300 background with a 400 border; on dark it is an 800 background with a 700 border. Keep body text in the normal text colour and let only the title, icon or edge take the hue.
- **Coloured small text** is the 800 on a light tint and the 400 on a dark one. The 600s are for coloured text straight on white.
- **Display text and shapes** use the 500, on any background.
- **Yellow and orange** have dark, muted 600s (olive and brown-orange) because bright yellow can't be read on white. For vivid yellow or orange, use the 500 as a fill with dark text on it.

In CSS, each hue also comes as four roles that adapt to the mode (`--purple-surface`, `--purple-border`, `--purple-text`, `--purple-vivid`), and setting `data-color="purple"` on an element points the generic `--hue-*` variables at that hue. See the header of `css/tokens.css`.

## Light and dark

On the web, support both modes and follow the system setting. Where there is no system setting to follow (slides, images, video), use dark. The semantic tokens (`--color-background`, `--color-surface`, `--color-text` and so on) do the switching, so write to those and both modes come for free.

- **Dark:** Charcoal page, Slate surfaces, `grey-100` text. Never pure black.
- **Light:** white page, `grey-50` surfaces, Charcoal text. Never thin grey text on white.
- **Slides and graphics** usually reverse the dark pairing: a Slate canvas, sometimes inset in a Charcoal frame.

## Outside the web

For slides, images, video, diagrams and anything else, take hex values straight from `css/tokens.css` and follow the same step jobs. The usual recipe: Slate canvas, white type, one coral word, pastel 400s and saturated 500s for blobs and shapes. `pages/examples/slides.html` and `social.html` show it.

## Other palettes

Use one palette per piece of work. These two belong to other contexts and are here so you can recognise them and match them when asked.

### danny.is

Danny's website shares these hues but defines them in OKLCH, on a warm beige and charcoal base. Use it for work that lives on or represents the site. The source of truth is `src/styles/_foundation.css` in the `dannyis-astro` repo.

| Role           | Light                      | Dark                  |
| -------------- | -------------------------- | --------------------- |
| Background     | beige `oklch(96% 0.02 85)` | charcoal `#202020`    |
| Text           | ink `oklch(28% 0.01 210)`  | beige                 |
| Secondary text | `oklch(55% 0.01 210)`      | `oklch(75% 0.01 210)` |
| Accent (coral) | `oklch(70% 0.18 25)`       | `oklch(80% 0.14 25)`  |

On the site, purple is visited links, yellow is highlight and blue is focus rings.

### Flexoki

Steph Ango's "inky" palette for reading and writing on screen: warm paper and ink. Several of Danny's project sites use it (Astro Editor, Taskdn), usually with a blue accent. Use it when the project already does, not as a general default. Values and usage: https://stephango.com/flexoki
