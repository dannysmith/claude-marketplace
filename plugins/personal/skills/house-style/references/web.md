# Building for the web

How the CSS in `css/` is organised, the conventions it follows, and how to extend it. The stylesheets carry their own detailed comments; this is the map.

## Start a page

Copy `css/reset.css`, `css/tokens.css` and `css/base.css` into the project and link them in that order. Add `css/utilities.css` for the layout helpers.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Geist:wght@100..900&display=swap">
<link rel="stylesheet" href="reset.css">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="utilities.css">
```

With just those, plain HTML already looks right: `pages/elements.html` shows the result.

**For a single self-contained HTML file**, the whole foundation is about 40KB, which is too much to paste into a small tool. Paste `tokens.css` whole (it's the palette and the scales), then only the sections of `reset.css` and `base.css` the page actually uses. Both files are divided by banner comments, and every rule must stay inside its `@layer` block. Keep the `@layer reset, tokens, base, components, utilities;` line from the top of `reset.css`.

## The files

| File | What it gives you |
| --- | --- |
| `reset.css` | Browser normalisation, the same reset danny.is uses. Also declares the layer order, so load it first. |
| `tokens.css` | Every value: palette, semantic colours, hue roles, type, space, radius, shadow, motion. Start here to understand the system. |
| `base.css` | Styles for bare elements: headings, links, tables, buttons, every form control, `<dialog>`, popovers, `<details>`. Also `.button` (a link that looks like a button) and `.icon` (a stroked SVG icon). |
| `utilities.css` | A few helpers: `.prose`, `.prose-serif`, `.stack`, `.cluster`, `.grid`, `.display`, `.handwriting`, `.muted`, `.list-reset`, `.visually-hidden`. |
| `components/*.css` | Optional pieces, one per file. Copy the ones you need. |

Components available: app-shell, avatar, badge (and tag), callout, card, empty-state, field (and input group), key-value, loading (spinner and skeleton), menu, nav-list, segmented, tabs, toast, tooltip, window. Each file's header comment shows its markup. `pages/components.html` shows them all.

## Conventions

- **Layers.** Everything sits in `@layer reset, tokens, base, components, utilities`. Unlayered CSS you write in a project beats all of it, so overriding never needs `!important` or specificity tricks.
- **Use semantic tokens.** Write `var(--color-surface)`, not `var(--grey-800)` or a hex. That is what makes light and dark work with no extra code.
- **Colour mode.** Follows the system. Lock it with `data-theme="dark"` or `"light"` on `<html>`; `data-background="beige"` gives the warm light background.
- **Variants are data attributes:** `<button data-variant="primary" data-size="small">`, not modifier classes.
- **Colour from the markup.** `data-color` (`pink`, `coral`, `orange`, `yellow`, `green`, `blue`, `purple`, `brown`) or `data-status` (`danger`, `warning`, `success`, `info`) on an element sets `--hue-surface`, `--hue-border`, `--hue-text` and `--hue-vivid` for it and everything inside. Components read those and fall back to neutral.
- **Interface first.** Elements have no vertical margins, so they sit cleanly in flex and grid layouts. Wrap flowing content in `.prose` for reading rhythm. (danny.is does the opposite, because it's a reading site.)
- **Native elements first.** A plain `<button>`, `<select>`, `<dialog>`, `<details>` or `popover` is already styled. Reach for a class only when there's no element for the job.
- **Per-element knobs** are custom properties set inline: `style="--gap: var(--space-l)"` on a `.stack`, `--min` on a `.grid`, `--size` on an `.avatar`.
- **Icons** are inline SVG in the Lucide style with `class="icon"`: `<svg class="icon" viewBox="0 0 24 24"><path d="…"/></svg>`. Without the class an icon renders as a solid black shape.
- **Logical properties throughout:** `inline-size`, `padding-block`, `margin-inline-start`.

## Modern CSS this leans on

Written for current browsers, with no build step and almost no JavaScript. Worth knowing about, because they replace code you might otherwise write:

- `light-dark()` and `color-scheme` for both modes, `color-mix()` and relative colour for derived shades.
- Opening a dialog with `<button commandfor="id" command="show-modal">` and a popover with `popovertarget`: no script.
- Anchor positioning: popovers and menus sit next to the button that opened them, tooltips sit above their element, and the tab underline and segmented thumb slide to the selected item.
- `<details name="…">` for an exclusive accordion, animated with `::details-content`.
- The customisable select (`appearance: base-select`), with markup allowed inside options.
- `:user-invalid` and `:has()` drive form error states from the browser's own validation.
- `@starting-style` for enter and exit transitions, `text-box` to centre button labels on their capitals, `field-sizing` for auto-growing textareas, `sibling-index()` to stagger skeletons.

Some of these aren't in every browser yet. All fall back quietly: the customisable select (Firefox shows its native select), `closedby` on dialogs (Safari closes with Escape and the buttons only), `text-box`, `sibling-index()` and animating to `auto` height.

## In a project with its own CSS

The names here are short and generic, which is fine in a new project and risky in an existing one. Things that could collide: the classes `.card`, `.menu`, `.tabs`, `.grid`, `.stack`, `.cluster`, `.badge`, `.tag`, `.field` and `.icon`; the registered properties `--gap`, `--min` and `--size`; the keyframes `spin` and `pulse`; and Tailwind's own `--color-*` and `--font-*` theme variables. In that situation take the palette values and the look, and express them in the project's own conventions.

## Making your own

The components are a starting point, not a requirement. Often the better move is to read `tokens.css`, look at the screenshots, and write something that fits the project. When you do:

- Build from the semantic tokens and the hue roles, so it works in both modes without extra rules.
- Keep it flat: solid fills, hairline borders, small radii. Shadows only on things that float.
- Give the one primary action the coral fill; keep everything else neutral.
- Design hover, focus, disabled and error states, not just the resting one. The focus ring comes from the reset.
- Prefer a native element and a few lines of CSS to a scripted widget.
- Check it in light and dark before calling it done.
