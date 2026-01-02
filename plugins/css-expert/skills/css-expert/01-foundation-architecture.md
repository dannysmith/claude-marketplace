# Foundation & Architecture

Modern CSS architecture uses cascade layers for specificity control, a three-tier design token system, and a layout-first approach that minimizes component CSS by doing most work globally.

---

## Core Philosophy & Principles

**The Modern CSS Mindset**:

1. **Use the browser** - If CSS or APIs exist, use them instead of JavaScript
2. **Use native HTML** - Semantic HTML over div soup (unless using React + UI library like shadcn/ui)
3. **Minimize CSS** - Keep it essential and defensive
4. **Component-first** - Self-contained, reusable components
5. **Progressive enhancement** - Solid foundations, modern enhancements

```css
/* ✅ Use native dialog instead of custom modal */
dialog {
  border: none;
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 600px;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}
```

---

## CSS Cascade Layers

**Widely Available** - Use freely without fallbacks.

### Recommended Layer Structure

Declare layer order upfront. Layer priority trumps specificity - a rule in a later layer always wins, even with lower specificity.

```css
@layer reset, base, layout, utilities, blocks, exceptions;

@layer reset {
  /* Pure CSS reset - see additional/css-reset-and-base-styles.md for full implementation */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  /* ...additional reset rules */
}

@layer base {
  /* Project-specific base styles */
  html {
    font-family: var(--font-primary);
    color-scheme: light dark;
    color: var(--text-primary);
    background: var(--surface-base);
  }
  /* ...additional base styles */
}

@layer layout {
  /* High-level layout patterns */
  .flow > * + * {
    margin-top: var(--flow-space, 1em);
  }
}

@layer utilities {
  /* Single-purpose classes */
  .bg-primary {
    background: var(--color-primary);
  }
}

@layer blocks {
  /* Component styles */
  .card {
    container-type: inline-size;
    padding: var(--space-m);
  }
}

@layer exceptions {
  /* State variations */
  .card[data-variant='featured'] {
    border: 2px solid var(--color-primary);
  }
}
```

### Reset vs Base Layers

**Reset layer** - Pure CSS reset that never changes between projects. Normalizes browser defaults, sets box-sizing, removes margins, handles media elements. **See [CSS Reset & Base Styles](additional/css-reset-and-base-styles.md) for the complete implementation.**

**Base layer** - Project-specific foundation. Sets typography, colors, spacing scale via design tokens. Customize per project but keep minimal.

### Optional Theme Layer

For **simple light/dark theming**, skip the theme layer - use `light-dark()` function and semantic tokens at `:root`:

```css
:root {
  color-scheme: light dark;
  --surface-base: light-dark(#fff, #000);
}
```

Use a **theme layer** for multi-brand scenarios or complex theme variations:

```css
@layer reset, base, themes, layout, utilities, blocks, exceptions;

@layer themes {
  [data-brand='acme'] {
    --color-primary: oklch(60% 0.2 250);
    --font-primary: 'Acme Sans', sans-serif;
  }

  [data-brand='globex'] {
    --color-primary: oklch(55% 0.22 25);
    --font-primary: 'Globex Display', serif;
  }
}
```

### Why Layers Matter

**Layer order determines cascade priority**. Layer priority trumps specificity - later layers always win:

```css
@layer blocks, utilities;

@layer blocks {
  form input {
    /* Specificity: 0,0,2 */
    color: black;
  }
}

@layer utilities {
  input {
    /* Specificity: 0,0,1 - WINS! */
    color: blue;
  }
}
```

Unlayered styles always have highest priority, winning over all layers regardless of specificity. Use layers for all organizational CSS to maintain control:

```css
@layer utilities;

@layer utilities {
  .text-primary {
    color: blue;
  } /* Specificity: 0,1,0 */
}

/* ⚠️ This unlayered style wins over the layer */
p {
  color: red;
} /* Specificity: 0,0,1 - WINS anyway! */
```

### Why Layers Over Specificity Wars

```css
/* ❌ Old way - specificity arms race */
.button.button-primary { background: blue; }
.bg-red.bg-red { background: red !important; }
.button[disabled][disabled] { background: gray !important; }
```

```css
/* ✅ Modern - layer order controls priority, not specificity */
@layer base, utilities, exceptions;

@layer base { .button { background: gray; } }
@layer utilities { .bg-red { background: red; } }  /* WINS */
@layer exceptions { .button[disabled] { background: gray; } }  /* WINS */
```

Layer order determines priority. No specificity tricks or !important needed.

### Integration with Modern Features

Layers work seamlessly with nesting and container queries:

```css
@layer blocks {
  .card {
    container-type: inline-size;
    padding: 1rem;

    & .card__header {
      margin-bottom: 1rem;
    }

    @container (min-width: 500px) {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
}
```

### CSS Nesting

**Widely Available** (December 2023) - Use nesting to keep related styles together. The `&` symbol doesn't add specificity.

```css
.button {
  background: var(--color-primary);

  &:hover {
    background: oklch(from var(--color-primary) calc(l - 0.1) c h);
  }

  &[data-variant="secondary"] {
    background: transparent;
  }
}

.card {
  container-type: inline-size;
  padding: 1rem;

  & .card__header {
    margin-bottom: 1rem;
  }

  @container (min-width: 500px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**Keep nesting shallow** (2-3 levels max). Layers still control priority regardless of nesting depth.

### The revert-layer Keyword

Rolls back styles to previous layers:

```css
@layer base, utilities, exceptions;

@layer base {
  .button {
    background: gray;
    color: white;
  }
}

@layer utilities {
  .button {
    background: blue;
  }
}

@layer exceptions {
  .button.reset {
    background: revert-layer; /* Reverts to blue from utilities */
  }
}
```

### Importing Third-Party CSS

Control framework specificity by placing in layers. Add a framework layer early in the order:

```css
@layer reset, framework, base, layout, utilities, blocks, exceptions;

@import url('normalize.css') layer(reset);
@import url('bootstrap.min.css') layer(framework);

@layer base {
  /* Your base styles override framework */
}

/* All your other layers automatically override the framework */
```

---

## Design Token System

Use a three-tier approach: primitive → semantic → component. This creates a maintainable system where changing one value updates everything contextually.

**For color-specific features** (OKLCH, light-dark(), relative colors), see [Color & Design Tokens](02-color-design-tokens.md).

### Three-Tier Structure

**Primitive tokens** - Raw, context-agnostic values:

```css
:root {
  /* Colors - Neutrals */
  --color-gray-50: #fafafa;
  --color-gray-900: #18181b;

  /* Colors - Brand (use OKLCH for perceptual uniformity and wide gamut) */
  --color-blue-500: oklch(60% 0.2 250);

  /* Spacing */
  --space-1: 0.25rem;
  --space-4: 1rem;
  --space-8: 2rem;

  /* Typography */
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
}
```

**Semantic tokens** - Add meaning and context:

```css
:root {
  color-scheme: light dark;

  /* Surfaces */
  --surface-base: light-dark(#ffffff, #09090b);
  --surface-elevated: light-dark(#fafafa, #18181b);

  /* Text */
  --text-primary: light-dark(var(--color-gray-950), var(--color-gray-50));
  --text-secondary: light-dark(var(--color-gray-600), var(--color-gray-400));

  /* Interactive */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
}
```

**Component tokens** - Scoped to components:

```css
.button {
  --button-padding-x: var(--space-4);
  --button-bg: var(--color-primary);
  --button-text: white;

  padding: var(--button-padding-y) var(--button-padding-x);
  background: var(--button-bg);
  color: var(--button-text);
}

.button--small {
  --button-padding-x: var(--space-2);
  font-size: var(--font-size-sm);
}
```

### Naming Conventions

Use **functional names** that work across all themes:

```css
/* ✅ Good - semantic, theme-agnostic */
--color-primary
--text-heading
--surface-elevated
--border-subtle

/* ❌ Poor - visual descriptors don't work in dark mode */
--blue
--dark-text
--white-background
```

### Design Token Flow

Primitives define raw values → Semantics add meaning → Components consume semantics:

```css
/* Primitive */
--color-blue-500: oklch(60% 0.2 250);

/* ↓ Semantic */
--color-primary: var(--color-blue-500);

/* ↓ Component */
.button {
  --button-bg: var(--color-primary);
  background: var(--button-bg);
}
```

Change `--color-blue-500` and everything updates contextually.

### Always Provide Fallbacks

Always provide fallback values for CSS variables. Variables can be undefined or overridden with invalid values.

```css
/* ❌ Poor - no fallback */
.element {
  padding: var(--spacing);
  color: var(--text-color);
}

/* ✅ Good - fallbacks provided */
.element {
  padding: var(--spacing, 1rem);
  color: var(--text-color, #000);
}

/* ✅ Good - fallback to another variable */
.element {
  color: var(--text-primary, var(--text-base, #000));
}

/* ✅ Good - calc with fallback */
.container {
  width: calc(100% - var(--sidebar-width, 250px));
}
```

**When fallbacks aren't needed**: Variables defined with `@property` use their `initial-value` when invalid, but fallbacks are still good practice for browsers without `@property` support.

---

## Type-Safe Tokens with @property

**Status**: Newly Available (July 2024)

The `@property` rule provides type checking for custom properties, enables animation/transitions, and offers safer fallback handling. Use it for critical design tokens across all types: colors, spacing, typography, timing, etc.

### Why @property Matters

**Problem**: Traditional CSS variable fallbacks fail when properties are redefined with invalid values.

```css
/* ❌ Without @property - fallback doesn't work */
:root {
  --spacing: 1rem;
}

.card {
  padding: var(
    --spacing,
    1rem
  ); /* Fallback ignored if --spacing is redefined */
}

.broken {
  --spacing: notavalue; /* Padding becomes 0, not 1rem */
}
```

**Solution**: `@property` validates values at the right time and uses `initial-value` for invalid values.

```css
/* ✅ With @property - initial-value applies */
@property --spacing {
  syntax: '<length>';
  inherits: false;
  initial-value: 1rem;
}

.broken {
  --spacing: notavalue; /* Padding uses 1rem (initial-value) */
}
```

### Basic Syntax

```css
@property --property-name {
  syntax: '<type>'; /* Type definition */
  inherits: true|false; /* Inheritance behavior */
  initial-value: value; /* Fallback value */
}
```

### Common Syntax Types

**Colors**:

```css
@property --color-primary {
  syntax: '<color>';
  inherits: true;
  initial-value: oklch(60% 0.2 250);
}
```

**Spacing**:

```css
@property --spacing-unit {
  syntax: '<length>';
  inherits: false;
  initial-value: 1rem;
}
```

**Typography**:

```css
@property --font-scale {
  syntax: '<number>';
  inherits: true;
  initial-value: 1.25;
}
```

**Timing**:

```css
@property --transition-speed {
  syntax: '<time>';
  inherits: false;
  initial-value: 200ms;
}
```

**Angles** (for animations):

```css
@property --rotation {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
```

**Available types**: `<color>`, `<length>`, `<number>`, `<percentage>`, `<length-percentage>`, `<angle>`, `<time>`, `<integer>`, `*` (universal)

### Enables Animation

Typed properties can be animated/transitioned. Untyped properties cannot:

```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.card {
  background: linear-gradient(
    var(--gradient-angle),
    var(--color-primary),
    var(--color-secondary)
  );
  transition: --gradient-angle 0.5s;
}

.card:hover {
  --gradient-angle: 180deg; /* Smoothly animates */
}
```

### Inheritance Control

**`inherits: true`** - Child elements inherit the value from ancestors:

```css
@property --color-brand {
  syntax: '<color>';
  inherits: true;
  initial-value: blue;
}

.parent {
  --color-brand: red;
}

.child {
  color: var(--color-brand); /* Inherits red from parent */
}
```

**`inherits: false`** - Child elements use `initial-value` unless explicitly set:

```css
@property --card-padding {
  syntax: '<length>';
  inherits: false;
  initial-value: 1rem;
}

.parent {
  --card-padding: 2rem;
}

.child {
  padding: var(
    --card-padding
  ); /* Uses 1rem (initial-value), not parent's 2rem */
}
```

**When to use each**:

- `inherits: true` - Text properties, colors, fonts (cascade naturally)
- `inherits: false` - Layout properties, spacing, borders (don't cascade)

### Complete Type-Safe Design System

```css
/* Type definitions */
@property --color-primary {
  syntax: '<color>';
  inherits: true;
  initial-value: oklch(60% 0.2 250);
}

@property --spacing-unit {
  syntax: '<length>';
  inherits: false;
  initial-value: 0.25rem;
}

:root {
  /* Primitive → Semantic → Component flow */
  --color-primary: var(--color-primary); /* Uses @property */
  --space-4: calc(var(--spacing-unit) * 4);
}

.button {
  --button-bg: var(--color-primary);
  background: var(--button-bg);
  padding: var(--space-4);
}
```

### When to Use @property

**Use for**:

- Critical design tokens (colors, spacing scales)
- Properties that need animation
- Foundation tokens where type safety matters
- Design system tokens used across multiple components

**Skip for**:

- Simple, static values
- One-off component-specific values
- When `initial-value` needs to reference other variables (not allowed)

### initial-value Constraints

**Must be computationally independent** - Cannot reference other variables:

```css
/* ❌ Invalid - references other variables */
@property --dynamic-color {
  syntax: '<color>';
  inherits: true;
  initial-value: var(--brand-color); /* Not allowed */
}

/* ✅ Valid - literal value */
@property --safe-color {
  syntax: '<color>';
  inherits: true;
  initial-value: oklch(60% 0.2 250);
}

/* ✅ Valid - calc without variables */
@property --safe-calc {
  syntax: '<length>';
  inherits: false;
  initial-value: calc(100% - 2rem);
}
```

---

## Component Architecture

### What is a Component?

A self-contained chunk of HTML that is conceptually its own thing. Components may be reusable or single-use:

- **UI primitives** - Button, heading, avatar, picture
- **Reusable modules** - Card, navigation, form group
- **Single-use sections** - Homepage hero, article header
- **Layout containers** - Grid wrapper, sidebar layout

Doesn't matter if they're plain HTML, React components, or Web Components - the principles apply universally.

### Core Principles

- **Self-contained** - Use `container-type: inline-size` and never set external margins.
- **Responsive to context** - Adapt gracefully to internal content (use `:has()`), available space (use container queries), user preferences (`prefers-reduced-motion`), and variants (use data attributes).
- **Leverage global work** - Use inherited styles, utility classes, and design tokens.

### Philosophy

**Global styles first** - Establish typography, colors, spacing globally before writing component CSS. **Components extend global work** - Most styling comes from layout utilities and global styles.

### Component Structure

Components combine global work with component-specific styles:

```html
<article class="card flow bg-base" data-variant="featured">
  <img class="card__image radius" src="..." alt="" />
  <div class="card__content flow">
    <h2 class="font-sans weight-bold">Article Title</h2>
    <p>Description text...</p>
    <a href="#" class="button" data-variant="primary">Read more</a>
  </div>
</article>
```

**Class order**: Main component → Layout utilities → Style utilities → Data attributes for state

**Element naming**: Use double underscores for elements within a component (`.card__image`, `.card__content`).

### Component CSS Pattern

Write defensive CSS by default. Anticipate edge cases like dynamic content, varying viewports, and long text:

```css
@layer blocks {
  .card {
    container-type: inline-size;
    padding: var(--space-m);

    /* Defensive defaults */
    min-width: 0; /* Prevent overflow in flex/grid */
    overflow-wrap: break-word; /* Handle long text */
  }

  .card__content {
    --flow-space: 1.2rem; /* Contextual override */
  }

  @container (min-width: 500px) {
    .card {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: var(--space-m);
    }
  }
}
```

**When components exceed 100 lines**: Likely doing too much. Consider splitting into sub-components or extracting reusable patterns to the layout/utilities layers.

### State Management with Data Attributes

Use data attributes for variants and states:

```html
<button class="button" data-variant="primary">Primary</button>
<button class="button" data-variant="ghost">Ghost</button>
<button class="button" data-state="loading">Loading...</button>
```

```css
@layer exceptions {
  .button[data-variant='ghost'] {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }

  .button[data-state='loading'] {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

### Layout Utilities

Create reusable layout patterns in the layout layer. See [Layout Systems](03-layout-systems.md) for complete patterns.

```css
@layer layout {
  .flow > * + * {
    margin-top: var(--flow-space, 1em);
  }

  .wrapper {
    margin-inline: auto;
    max-width: 65ch;
  }
}
```

---

## Quick Decision Guide

**Where should this CSS go?**

```
Does it normalize browser defaults (box-sizing, margins, media elements)?
  → reset layer (never changes between projects)

Does it set project-specific foundation (typography, colors via tokens)?
  → base layer

Does it handle multi-brand or complex theme switching?
  → themes layer (optional - skip for simple light/dark)

Does it create high-level layout structure or spacing rhythm?
  → layout layer

Does it apply a single CSS property or cohesive pattern?
  → utilities layer

Does it style a specific component?
  → blocks layer

Does it handle state or variations?
  → exceptions layer (use data attributes)
```

**When to use component tokens vs semantic tokens?**

- **Semantic tokens**: Values used across multiple components (`--color-primary`, `--surface-base`)
- **Component tokens**: Values specific to one component (`--button-bg`, `--card-padding`)

**When to use utilities vs component styles?**

- **Utilities**: Reusable patterns applied via classes (`.bg-primary`, `.flow`)
- **Component styles**: Component-specific structure and layout (`.card { container-type: inline-size }`)
