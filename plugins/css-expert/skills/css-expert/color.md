# Colour

OKLCH for palette values, `light-dark()` for theming, relative colour and `color-mix()` for variants. Token structure is in [architecture.md](architecture.md).

## OKLCH

```css
:root {
  /* oklch(lightness chroma hue / alpha) */
  --color-blue-500: oklch(60% 0.2 250);
  --color-blue-500-faint: oklch(60% 0.2 250 / 0.1);
}
```

- **Lightness** 0–100% is perceptual: two colours with the same L look equally light whatever their hue. That makes scales and contrast predictable in a way HSL is not.
- **Chroma** runs from 0 (grey) to roughly 0.37. Around 0.02 is a tinted neutral, 0.1–0.15 moderate, 0.2 and above vivid.
- **Hue** is an angle: about 25 red, 70 orange, 100 yellow, 145 green, 200 cyan, 250 blue, 300 purple, 350 pink.
- **Gamut.** High chroma can fall outside sRGB. The browser maps it into range, so on an sRGB display the colour is less vivid than on P3. Keep chroma moderate for text and anything contrast-critical.
- **Greys.** Give neutrals a little chroma (0.005–0.02) at the brand hue instead of pure grey.
- **Scales.** Step lightness evenly, and reduce chroma at the very light and very dark ends, where full chroma is out of gamut anyway.
- **Status colours** (success, warning, error) need individually chosen lightness. Yellow is only vivid when light and red when darker, so rotating hue at fixed L and C gives a muddy warning colour.

Hex, `rgb()` and named colours remain fine for existing values. Do not convert a codebase's colours unasked.

## Theming with `light-dark()`

`light-dark()` picks a value according to the element's used `color-scheme`. It does nothing unless `color-scheme` is set.

```css
:root {
  color-scheme: light dark;

  --surface-base: light-dark(var(--color-gray-50), var(--color-gray-950));
  --surface-elevated: light-dark(white, var(--color-gray-900));
  --text-primary: light-dark(var(--color-gray-950), var(--color-gray-50));
  --text-secondary: light-dark(var(--color-gray-600), var(--color-gray-400));
  --color-primary: light-dark(oklch(55% 0.2 250), oklch(75% 0.15 250));
}

/* Manual toggle: set data-theme on <html>; no attribute follows the OS */
:root[data-theme='light'] {
  color-scheme: light;
}

:root[data-theme='dark'] {
  color-scheme: dark;
}

/* Force a region into one scheme */
.hero {
  color-scheme: dark;
  background: var(--surface-base);
  color: var(--text-primary);
}
```

- Because it follows `color-scheme` and not the media query, one set of tokens serves the OS preference, a manual toggle and per-region overrides. No duplicated `@media (prefers-color-scheme)` blocks.
- `color-scheme` also themes form controls, scrollbars and system colours (`Canvas`, `CanvasText`), which hand-rolled dark themes usually miss.
- A region that overrides `color-scheme` must re-declare the properties that use the tokens (as `.hero` does). Inherited computed colours do not re-resolve by themselves.
- `light-dark()` takes colours, and images too in the newest browsers (Chrome 150, Safari 27, Firefox 150). For other values that differ between schemes, such as shadow offsets, use a style query on a custom property or `@media (prefers-color-scheme: dark)`.
- Dark themes are not inverted light themes: lower the chroma, raise the lightness of accent colours, and show elevation with lighter surfaces instead of shadows.

## Variants

Derive variants from a base colour where they are used, instead of storing a token for every hover and tint.

### Relative colour

`oklch(from <color> l c h)` exposes the source colour's channels. `l` is a number from 0 to 1, so adjust it with plain numbers.

```css
.button:hover {
  background: oklch(from var(--button-bg) calc(l - 0.08) c h);
}

.badge {
  /* Same hue, much lighter and less saturated */
  background: oklch(from var(--color-primary) 95% calc(c * 0.3) h);
  /* Same colour, translucent */
  border: 1px solid oklch(from var(--color-primary) l c h / 0.3);
}
```

- Setting an absolute lightness (`95%`) is more predictable than adding to `l`, which gives very different results for light and dark source colours.
- A darker hover is right in light mode and often wrong in dark mode. Flip the direction with `light-dark()` or override the hover token per scheme.
- **Secondary text on a coloured background:** do not use grey or lowered opacity, which looks washed out. Keep the background's hue and move lightness towards the text colour: `color: oklch(from var(--surface-brand) 90% calc(c * 0.4) h)`.

### `color-mix()`

Better when the intent is "blend this with that": tinting towards the surface, or mixing with `transparent` or `currentColor`.

```css
.alert {
  background: color-mix(in oklch, var(--color-error) 12%, var(--surface-base));
  border: 1px solid color-mix(in oklch, var(--color-error) 40%, var(--surface-base));
}

a {
  text-decoration-color: color-mix(in oklch, currentColor 40%, transparent);
}
```

Mixing with the surface token adapts to light and dark without extra work. Always name the colour space; `in oklch` or `in oklab` avoids the muddy midpoints of sRGB.

### `contrast-color()`

Returns black or white, whichever contrasts more with the argument. Use it for text on a background whose colour is set dynamically (user-chosen label colours, themed buttons).

```css
.tag {
  background: var(--tag-color);
  color: contrast-color(var(--tag-color));
}
```

It picks the better of two options; it does not guarantee a ratio. On mid-lightness backgrounds neither black nor white may reach 4.5:1.

## Contrast

- Body text 4.5:1, large text (24px, or 18.66px bold) and UI component boundaries 3:1.
- Calculate it. Use a contrast-checking tool or MCP when available; otherwise state the pairs that need checking.
- The gap in OKLCH lightness between text and background is a rough guide to which pairs are at risk, not a substitute for the WCAG calculation.
- Check both schemes, plus hover, focus, disabled and placeholder states.
- Translucent colours take their contrast from whatever is behind them. Prefer opaque tokens for text.

## Gradients

Interpolate in a perceptual space to avoid the grey band in the middle: `linear-gradient(in oklch, var(--a), var(--b))`. Use `in oklch shorter hue` or `longer hue` to control the path round the hue wheel.
