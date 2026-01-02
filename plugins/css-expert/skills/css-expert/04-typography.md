# Typography

Modern typography uses fluid sizing with container query units, semantic units for vertical rhythm, and accessible defaults. Typography responds to container size, not viewport size.

---

## Fluid Typography with clamp()

**Status**: Widely Available

Use `clamp()` to create typography that scales smoothly between minimum and maximum values.

### Basic Pattern

```css
.component {
  container-type: inline-size;
}

.component h1 {
  font-size: clamp(1.5rem, 5cqi, 3rem);
}
```

**Syntax**: `clamp(minimum, preferred, maximum)`

- **Minimum**: Lower bound (always use `rem` for accessibility)
- **Preferred**: Scales with container (use `cqi` units)
- **Maximum**: Upper bound (always use `rem` for accessibility)

### Why Container Query Units Over Viewport Units

```css
/* ❌ Viewport-based - all cards resize at same viewport width */
.card h2 {
  font-size: clamp(1.25rem, 4vw, 2.5rem);
}

/* ✅ Container-based - each card resizes based on its own width */
.card {
  container-type: inline-size;
}

.card h2 {
  font-size: clamp(1.25rem, 5cqi, 2.5rem);
}
```

Container query units enable truly modular components - typography adapts to the actual container width, not the viewport. Critical for components in grids, sidebars, or variable-width layouts.

### Why Container Query Units Over Viewport Units

```css
/* ❌ Old way - same size everywhere */
.card h2 {
  font-size: clamp(1.25rem, 4vw, 2.5rem);
}
/* 300px sidebar on 1200px viewport = huge 48px heading */
```

```css
/* ✅ Modern - adapts to container */
.card {
  container-type: inline-size;
}

.card h2 {
  font-size: clamp(1.25rem, 5cqi, 2.5rem);
}
/* 300px sidebar = 15px, 800px main = 40px */
```

Use `cqi` for component typography, not `vw`.

### Accessibility Requirements

```css
/* ✅ Good - respects user preferences */
h1 {
  font-size: clamp(1.5rem, 5cqi, 3rem);
}

/* ❌ Bad - fixed pixels ignore user font size settings */
h1 {
  font-size: clamp(24px, 5cqi, 48px);
}
```

Always use `rem` for minimum and maximum values. This allows text to zoom up to 200% (WCAG 1.4.4).

---

## Container Query Units for Typography

**Status**: Newly Available (2023)

Available units: `cqi`, `cqw`, `cqh`, `cqmin`, `cqmax`

**Prefer `cqi`** (container inline size) for typography - it represents width in horizontal writing modes.

### Setup

```css
.component {
  container-type: inline-size;
}

.component h1 {
  font-size: clamp(2rem, 6cqi, 3.5rem);
}

.component h2 {
  font-size: clamp(1.5rem, 5cqi, 2.5rem);
}

.component p {
  font-size: clamp(1rem, 2cqi, 1.25rem);
}
```

Container query units require `container-type: inline-size` on an ancestor. Without it, they fall back to viewport size.

### Progressive Enhancement

```css
/* Fallback for older browsers */
h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 2rem;
}

/* Enhancement with container query units */
@supports (font-size: 1cqi) {
  .component {
    container-type: inline-size;
  }

  h1 {
    font-size: clamp(1.5rem, 5cqi, 2.5rem);
  }
  h2 {
    font-size: clamp(1.25rem, 4cqi, 2rem);
  }
}
```

The `@supports` check prevents unsupported browsers from rendering all text at the same size due to CSS custom property quirks.

---

## Modern Typography Units

### Line Height Units: lh and rlh

**Status**: Newly Available (November 2023)

Tie spacing directly to line height for consistent vertical rhythm.

```css
p {
  margin-block: 1lh; /* Spacing equals one line of text */
}

.component {
  padding: 2rlh; /* Spacing equals two root line heights */
}
```

**`lh`** - Line height of current element (like `em` relates to font-size)
**`rlh`** - Root line height (like `rem` relates to root font-size)

Use `lh` for component-level spacing, `rlh` for site-wide consistency.

### Character Unit: ch

**Status**: Widely Available

Represents the width of the "0" character. Ideal for optimal reading line length.

```css
.prose {
  max-width: 65ch; /* 45-75ch is optimal reading length */
}

input {
  width: 20ch; /* Character-based input widths */
}
```

### Cap Unit: cap

**Status**: Widely Available (December 2023)

Equal to the height of capital letters. Perfect for aligning icons with text.

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5cap;
}

.button svg {
  --size: 1.65cap;
  width: var(--size);
  height: var(--size);
}
```

The icon automatically scales with font size changes - no manual pixel adjustments needed at different breakpoints.

---

## Text Wrapping

### text-wrap: balance

**Status**: Baseline (May 2024)

Balances text across lines for better visual appearance.

```css
h1,
h2,
h3 {
  text-wrap: balance;
  max-width: 45ch;
}
```

**Limitations**:

- Only works on short text (6-10 lines depending on browser)
- Requires `max-width` or constrained width to work well

**Best for**: Headlines and titles

### text-wrap: pretty

**Status**: Limited (Chrome/Edge only, no Firefox)

Prevents orphans (single words on their own line).

```css
p {
  text-wrap: pretty;
}
```

Skip this for now - limited browser support makes it unreliable for production.

---

## Link Styling

**Status**: Widely Available

Control underline appearance with modern text-decoration properties.

```css
a {
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.15em;
}

/* Remove skip-ink for consistent appearance */
a {
  text-decoration-skip-ink: none;
}
```

**Best for**: Improving link readability and visual hierarchy.

---

## Accessibility Best Practices

Always integrate accessibility into typography:

```css
body {
  font-size: 1rem; /* Never use px for base font size */
  line-height: 1.5; /* Minimum 1.5 for body text (WCAG) */
}

.prose {
  max-width: 65ch; /* 45-75 characters optimal for reading */
  line-height: 1.6; /* Slightly more generous for long-form */
}

h1,
h2,
h3 {
  line-height: 1.1; /* Tighter for headings */
  text-wrap: balance;
}
```

**Requirements**:

- Text must zoom to 200% (WCAG 1.4.4)
- Body text line height: at least 1.5
- Maintain 4.5:1 contrast ratio for body text
- Line length: 45-75 characters for optimal readability

---

## Typography for Long-Form Content

For blogs, articles, and documentation (not web apps).

### Measure and Leading

```css
.prose {
  max-width: 65ch;
  line-height: 1.6;
  font-size: 1.125rem; /* Slightly larger for comfortable reading */
}

.prose h1 {
  line-height: 1.1;
}
.prose h2 {
  line-height: 1.2;
}
.prose h3 {
  line-height: 1.3;
}
```

### Hyphenation and Text Wrapping

```css
.prose {
  hyphens: auto;
  text-wrap: pretty; /* Where supported */
  overflow-wrap: break-word;
}

.prose h1,
.prose h2,
.prose h3 {
  text-wrap: balance;
  hyphens: none; /* Don't hyphenate headings */
}
```

### Drop Caps

**Status**: Limited (Safari, Chrome 110+)

```css
.prose p:first-of-type::first-letter {
  initial-letter: 3;
  font-weight: 700;
  margin-right: 0.25em;
}
```

Progressive enhancement - browsers that don't support it will simply show regular text.

### Quotation Marks

```css
.prose {
  quotes: '"' '"' '' ' ' ''; /* Smart quotes */
}

.prose q::before {
  content: open-quote;
}
.prose q::after {
  content: close-quote;
}
```

### Small Caps for Abbreviations

```css
abbr {
  font-variant-caps: all-small-caps;
  letter-spacing: 0.05em;
}
```

### Number Styling

```css
.prose {
  font-variant-numeric: oldstyle-nums proportional-nums;
}

.prose table {
  font-variant-numeric: lining-nums tabular-nums; /* Aligned numbers for tables */
}
```

**Oldstyle numerals** have varying heights (like lowercase letters) - better for body text.
**Lining numerals** have uniform height (like capitals) - better for tables and data.
**Tabular numerals** have fixed width - necessary for aligned columns.

### Pull Quotes

```css
.pullquote {
  font-size: 1.5em;
  line-height: 1.3;
  max-width: 30ch;
  margin: 2rem auto;
  text-align: center;
  font-style: italic;
}
```

---

## Experimental Features

### text-box-trim

**Status**: Experimental (Chrome/Edge with flag, Safari experimental)

Removes font-internal spacing for precise vertical centering.

```css
.button {
  text-box: trim-both cap alphabetic; /* Shorthand */
}
```

Useful for buttons and UI elements where precise alignment matters. Progressive enhancement only.

### Variable Fonts

**Status**: Widely Available

Variable fonts contain multiple weights/styles in a single file.

```css
@font-face {
  font-family: 'MyVariableFont';
  src: url('font.woff2') format('woff2-variations');
  font-weight: 100 900;
}

/* Use standard CSS properties */
.text {
  font-weight: 450; /* Any value between 100-900 */
}
```

Prefer standard CSS properties (`font-weight`, `font-stretch`) over `font-variation-settings`. Only use `font-variation-settings` for axes without CSS properties.

---

## Quick Reference

**Fluid Typography**:

- `clamp(min, preferred, max)` with `cqi` units
- Always `rem` for min/max (accessibility)
- Requires `container-type: inline-size` on ancestor

**Modern Units**:

- `lh` / `rlh` - Vertical spacing tied to line height
- `ch` - Optimal line length (`max-width: 65ch`)
- `cap` - Icon alignment (`1.65cap` for icons with text)

**Text Wrapping**:

- `text-wrap: balance` for headings (with `max-width`)
- `text-wrap: pretty` for body text (limited support - skip for now)

**Accessibility**:

- Base font: `1rem` never `px`
- Line height: `1.5` minimum for body text
- Line length: `45-75ch` optimal
- Test zoom at 200%

**Prose Typography**:

- Line length: `65ch` ideal
- Line height: `1.6` for body, `1.1-1.2` for headings
- `hyphens: auto` for justified text
- `initial-letter` for drop caps (progressive enhancement)
- `font-variant-caps: all-small-caps` for abbreviations
- `font-variant-numeric: oldstyle-nums` for body, `tabular-nums` for tables
