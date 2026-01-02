# Color System

Modern CSS provides OKLCH color space for perceptually uniform colors, `light-dark()` for automatic theming, and relative colors for generating variants. These features enable sophisticated color systems without JavaScript or preprocessors.

---

## OKLCH Color Space

**Status**: Newly Available (2023)

Use OKLCH for all brand colors and color tokens. It provides perceptually uniform colors (equal lightness values appear equally bright), smoother gradients, and 50% wider gamut than sRGB.

### Basic Syntax

```css
:root {
  /* OKLCH: lightness (0-100%) chroma (0-0.4) hue (0-360) */
  --color-primary: oklch(65% 0.2 250);
  --color-accent: oklch(70% 0.15 150);
  --color-success: oklch(65% 0.18 145);
}
```

**Space-separated syntax** (modern): `oklch(65% 0.2 250)` not `oklch(65%, 0.2, 250)`

### With Transparency

```css
.overlay {
  background: oklch(60% 0.2 250 / 0.5);
}
```

### Why OKLCH

- **Perceptually uniform**: `oklch(50% ...)` appears equally bright across all hues
- **Smoother gradients**: No gray dead zones like HSL
- **Wider gamut**: Automatically uses Display P3 on modern displays
- **Intuitive parameters**: Lightness matches human perception

### Practical Color Palette

```css
:root {
  /* Brand colors */
  --color-blue-400: oklch(70% 0.15 250);
  --color-blue-500: oklch(60% 0.2 250);
  --color-blue-600: oklch(50% 0.2 250);

  /* Semantic colors via hue rotation */
  --color-green: oklch(65% 0.18 145);  /* Success */
  --color-red: oklch(60% 0.2 25);      /* Error */
  --color-orange: oklch(70% 0.15 65);  /* Warning */
}
```

**Lightness guide**: 50% = medium, 70% = light, 30% = dark
**Chroma guide**: 0.2 = vivid, 0.15 = moderate, 0.05 = subtle

---

## light-dark() for Theming

**Status**: Baseline (January 2025)

The `light-dark()` function provides automatic theme switching based on user OS preference. Requires `color-scheme: light dark` declaration.

### Basic Usage

```css
:root {
  color-scheme: light dark; /* REQUIRED */

  /* Surfaces */
  --surface-base: light-dark(#ffffff, #09090b);
  --surface-elevated: light-dark(#fafafa, #18181b);

  /* Text */
  --text-primary: light-dark(#000, #fff);
  --text-secondary: light-dark(#525252, #a3a3a3);
}

body {
  background: var(--surface-base);
  color: var(--text-primary);
}
```

### With OKLCH Colors

```css
:root {
  color-scheme: light dark;

  --color-primary: light-dark(
    oklch(60% 0.2 250),    /* Light mode */
    oklch(75% 0.18 250)    /* Dark mode - lighter for contrast */
  );

  --color-accent: light-dark(
    oklch(65% 0.15 150),
    oklch(70% 0.12 150)
  );
}
```

### Component-Level Override

```css
/* Force light mode for specific component */
.pricing-table {
  color-scheme: light;
  background: var(--surface-base); /* Uses light mode value */
}

/* Force dark mode */
.dark-hero {
  color-scheme: dark;
  background: var(--surface-base); /* Uses dark mode value */
}
```

### Complete Theming Example

```css
:root {
  color-scheme: light dark;

  /* Neutrals */
  --gray-50: #fafafa;
  --gray-900: #18181b;
  --gray-950: #09090b;

  /* Surfaces */
  --surface-base: light-dark(var(--gray-50), var(--gray-950));
  --surface-card: light-dark(#ffffff, var(--gray-900));

  /* Text */
  --text-heading: light-dark(var(--gray-950), var(--gray-50));
  --text-body: light-dark(#404040, #d4d4d4);

  /* Interactive */
  --color-primary: oklch(60% 0.2 250);
  --interactive-bg: light-dark(var(--color-primary), oklch(70% 0.15 250));
}
```

**Automatically responds to**: `prefers-color-scheme` media query
**No JavaScript needed**: Pure CSS solution

**What color-scheme affects**:
- Form control rendering (checkbox, radio, select appearance)
- Scrollbar colors
- System color keywords (Canvas, CanvasText)
- Browser UI elements

---

## Relative Colors

**Status**: Newly Available (September 2024)

Generate color variations from base colors without pre-calculating values. Ideal for hover states, tints/shades, and maintaining color relationships.

### Basic Syntax

```css
:root {
  --primary: oklch(60% 0.2 250);

  /* Generate variants */
  --primary-hover: oklch(from var(--primary) calc(l - 0.1) c h);
  --primary-light: oklch(from var(--primary) calc(l + 0.2) c h);
  --primary-dark: oklch(from var(--primary) calc(l - 0.2) c h);
}
```

**Pattern**: `oklch(from var(--base) lightness chroma hue)`

### Why Relative Colors Over Pre-calculated Variants

```css
/* ❌ Old way - manual variants */
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-light: #93c5fd;
  /* Change primary → manually update all variants */
}
```

```css
/* ✅ Modern - generate variants on-demand */
:root {
  --color-primary: oklch(60% 0.2 250);
}

.button:hover {
  background: oklch(from var(--color-primary) calc(l - 0.1) c h);
}
/* Change primary → all variants update automatically */
```

### Common Patterns

**Hover States** (darken by reducing lightness):

```css
.button {
  background: var(--color-primary);
  transition: background 0.2s;
}

.button:hover {
  background: oklch(from var(--color-primary) calc(l - 0.1) c h);
}
```

**Subtle Backgrounds** (increase lightness, reduce chroma):

```css
.info-banner {
  --base: oklch(60% 0.2 250);
  background: oklch(from var(--base) calc(l + 0.3) calc(c * 0.3) h);
  border: 1px solid var(--base);
}
```

**Transparency** (add alpha channel):

```css
.overlay {
  background: oklch(from var(--color-primary) l c h / 0.1);
}

.glass-card {
  background: oklch(from var(--surface-base) l c h / 0.8);
  backdrop-filter: blur(8px);
}
```

### Generating Color Scales

```css
:root {
  --brand: oklch(60% 0.2 250);

  /* Lighter tints */
  --brand-100: oklch(from var(--brand) calc(l + 0.35) calc(c * 0.5) h);
  --brand-200: oklch(from var(--brand) calc(l + 0.25) calc(c * 0.7) h);
  --brand-300: oklch(from var(--brand) calc(l + 0.15) c h);

  /* Base */
  --brand-500: var(--brand);

  /* Darker shades */
  --brand-700: oklch(from var(--brand) calc(l - 0.15) c h);
  --brand-800: oklch(from var(--brand) calc(l - 0.25) c h);
  --brand-900: oklch(from var(--brand) calc(l - 0.35) c h);
}
```

### Semantic Color Families

```css
:root {
  --primary: oklch(60% 0.2 250);

  /* Generate semantic colors via hue rotation */
  --success: oklch(from var(--primary) l c 145);   /* Rotate to green */
  --warning: oklch(from var(--primary) l c 80);    /* Rotate to yellow */
  --error: oklch(from var(--primary) l c 25);      /* Rotate to red */

  /* Auto-generate hover states */
  --success-hover: oklch(from var(--success) calc(l - 0.1) c h);
  --warning-hover: oklch(from var(--warning) calc(l - 0.1) c h);
  --error-hover: oklch(from var(--error) calc(l - 0.1) c h);
}
```

### Manipulation Cheatsheet

**Lightness adjustments** (most common):
- Lighter: `calc(l + 0.1)` to `calc(l + 0.3)`
- Darker: `calc(l - 0.1)` to `calc(l - 0.3)`
- Specific value: `80%`

**Chroma adjustments**:
- More muted: `calc(c * 0.5)`
- More vivid: `calc(c * 1.2)`
- Reduce intensity: `calc(c - 0.05)`

**Hue rotation**:
- Complementary: `calc(h + 180)`
- Analogous: `calc(h + 30)`
- Triadic: `calc(h + 120)`

---

## Complete Color System Example

Putting it all together: OKLCH colors, light-dark() theming, and relative color variants. For type-safe tokens using `@property`, see [Foundation & Architecture](01-foundation-architecture.md).

```css
:root {
  color-scheme: light dark;

  /* Primitive tokens */
  --color-blue-500: oklch(60% 0.2 250);
  --gray-50: #fafafa;
  --gray-950: #09090b;

  /* Semantic tokens with theming */
  --surface-base: light-dark(#ffffff, var(--gray-950));
  --surface-elevated: light-dark(var(--gray-50), #18181b);
  --text-primary: light-dark(#000, #fff);

  /* Interactive colors */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: oklch(from var(--color-primary) calc(l - 0.1) c h);
  --color-primary-subtle: oklch(from var(--color-primary) calc(l + 0.3) calc(c * 0.3) h);

  /* Semantic via hue rotation */
  --color-success: oklch(from var(--color-primary) l c 145);
  --color-error: oklch(from var(--color-primary) l c 25);
}

/* Component tokens */
.button {
  --button-bg: var(--color-primary);
  --button-bg-hover: var(--color-primary-hover);
  --button-text: white;

  background: var(--button-bg);
  color: var(--button-text);
  padding: 0.5rem 1rem;
  transition: background 0.2s;
}

.button:hover {
  background: var(--button-bg-hover);
}

.button--secondary {
  --button-bg: var(--color-primary-subtle);
  --button-text: var(--color-primary);
}

.alert {
  --alert-bg: oklch(from var(--color-success) calc(l + 0.3) calc(c * 0.2) h);
  --alert-border: var(--color-success);
  --alert-text: oklch(from var(--color-success) calc(l - 0.3) c h);

  background: var(--alert-bg);
  border: 1px solid var(--alert-border);
  color: var(--alert-text);
  padding: 1rem;
}

.alert--error {
  --color-success: var(--color-error); /* Override semantic token */
}
```

---

## Quick Reference

**Color Space**: Use OKLCH for all brand colors
**Theming**: Use `light-dark()` + `color-scheme: light dark`
**Variants**: Generate with relative colors using `from var(--base)`
**Hover States**: Reduce lightness by 0.1: `calc(l - 0.1)`
**Subtle Backgrounds**: Increase lightness, reduce chroma: `calc(l + 0.3) calc(c * 0.3)`
**Transparency**: Add alpha channel: `oklch(from var(--color) l c h / 0.5)`
**Hue Rotation**: Complementary `calc(h + 180)`, Analogous `calc(h + 30)`, Triadic `calc(h + 120)`
