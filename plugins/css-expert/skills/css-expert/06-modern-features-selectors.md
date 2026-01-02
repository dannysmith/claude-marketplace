# Modern Features & Selectors

Quick reference for modern CSS capabilities not covered in depth elsewhere. For detailed coverage, see the cross-referenced guides.

**What's covered elsewhere:**

- Cascade layers, @property, component architecture → Guide 01
- OKLCH, light-dark(), relative colors → Guide 02
- Grid, Flexbox, container queries, grid template areas → Guide 03
- Typography, fluid sizing, modern units, text-wrap → Guide 04
- :has() selector, defensive CSS, native HTML elements → Guide 05

---

## Modern Selectors

### :is() - Selector Grouping

**Widely Available** - Groups selectors, takes highest specificity of its arguments.

```css
/* Instead of repeating */
h1,
h2,
h3,
h4 {
  text-wrap: balance;
  margin-block: 1lh;
}

/* Use :is() for clarity */
:is(h1, h2, h3, h4) {
  text-wrap: balance;
  margin-block: 1lh;
}

/* Combine with other selectors */
:is(article, section) :is(h1, h2, h3) {
  line-height: 1.2;
}

/* With pseudo-classes */
:is(.button, .link):hover {
  opacity: 0.8;
}
```

### :where() - Zero Specificity Grouping

**Widely Available** - Works like :is() but with zero specificity. Perfect for library defaults.

```css
/* Library/design system base styles */
:where(.button) {
  padding: 0.5rem 1rem;
  border: 1px solid currentColor;
  background: transparent;
}

/* Users can easily override */
.button-large {
  padding: 1rem 2rem; /* This wins! */
}

/* Reset styles with zero specificity */
:where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font-weight: normal;
}
```

**When to use which:**

- :is() - Normal application code where you want standard specificity
- :where() - Libraries, design systems, resets where easy overrides matter

### :has() Selector

**Newly Available (December 2023)** - For detailed patterns, see [Components & Patterns](05-components-patterns.md).

```css
/* Parent selection */
.card:has(img) {
  border: 1px solid var(--border-subtle);
}

/* Form validation */
form:has(:invalid) button[type='submit'] {
  opacity: 0.5;
  pointer-events: none;
}
```

### Sibling Selectors

**Widely Available** - Adjacent (+) and general (~) sibling combinators.

```css
/* Adjacent sibling - immediately following */
.card + .card {
  margin-top: 1rem;
}

/* General sibling - any following */
h2 ~ p {
  color: var(--text-secondary);
}

/* Stack spacing pattern */
.flow > * + * {
  margin-top: var(--flow-space, 1em);
}
```

### Focus Selectors

**:focus-visible** - Shows focus only for keyboard navigation, not mouse clicks.

```css
/* Keyboard focus only */
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove focus ring for mouse users */
button:focus:not(:focus-visible) {
  outline: none;
}
```

**:focus-within** - Matches element if it or any descendant has focus.

```css
/* Highlight form when any input focused */
form:focus-within {
  background: var(--surface-elevated);
}

.field:focus-within .label {
  color: var(--color-primary);
}
```

### Attribute Selectors

**Widely Available** - Substring matching for attributes.

```css
/* Starts with */
a[href^="https://"]::after
{
  content: ' ↗';
}

/* Ends with */
a[download$='.pdf']::before {
  content: '📄 ';
}

/* Contains */
a[href*='example.com'] {
  color: var(--color-brand);
}

/* Case insensitive */
a[href$='.pdf' i] {
  font-weight: bold;
}
```

---

## Layout & Display Features

### overflow: clip

**Widely Available** - Single-axis clipping without creating scroll container.

```css
/* Clip horizontally only - vertical scrolling unaffected */
.hero {
  overflow-x: clip;
}

/* Preserve focus outlines near edges */
.container {
  overflow-x: clip;
  overflow-clip-margin: 4px;
}
```

Unlike `overflow: hidden`, this doesn't establish a scroll container and preserves scroll-driven animations. Use when you need decorative elements extending beyond boundaries or single-axis clipping.

### display: contents

**Widely Available** - Removes wrapper's box; children participate directly in parent layout.

```css
/* Mobile: grouped */
.logo-search {
  display: flex;
  gap: 1rem;
}

/* Desktop: ungroup children for flexible positioning */
@media (min-width: 768px) {
  .logo-search {
    display: contents;
  }

  .search {
    order: 2; /* Now movable within parent grid */
  }
}
```

Use sparingly. Avoid on semantic elements (`<article>`, `<section>`) due to accessibility concerns.

### aspect-ratio

**Widely Available** - Maintain width-to-height ratio.

```css
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.avatar {
  aspect-ratio: 1; /* Square */
}

.card-image {
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
```

### Intrinsic Sizing

**Widely Available** - Size elements based on content.

```css
/* Shrink-wrap to content while staying block-level */
.button {
  width: fit-content;
  margin-inline: auto; /* Center it */
}

/* Tightest fit without overflow */
.tag {
  width: min-content;
}

/* Natural width without wrapping */
.badge {
  width: max-content;
}

/* Logical property equivalents */
.element {
  inline-size: fit-content;
}
```

---

## Visual & Interaction

### Individual Transform Properties

**Widely Available** - Separate translate, rotate, scale instead of combined transform.

```css
.element {
  translate: 50px 100px;
  rotate: 45deg;
  scale: 1.2;
}

/* Easier animations - no overwriting */
.element:hover {
  scale: 1.3; /* Only changes scale */
}
```

### backdrop-filter

**Widely Available** - Apply filters to backdrop behind element.

```css
.glass-card {
  backdrop-filter: blur(10px) saturate(180%);
  background: rgba(255, 255, 255, 0.8);
}

dialog::backdrop {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.5);
}

.frosted-nav {
  backdrop-filter: blur(8px);
  background: light-dark(rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.7));
}
```

### outline-offset

**Widely Available** - Add space between element and outline.

```css
/* Push outline away from element */
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

/* Pull outline inside */
.card:focus-within {
  outline: 2px dashed var(--color-primary);
  outline-offset: -8px;
}
```

Better accessibility than box-shadow hacks. Doesn't affect layout.

### Pseudo-elements

**::backdrop** - Style backdrop of top-layer elements (dialog, fullscreen).

```css
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

[popover]::backdrop {
  background: transparent;
}
```

**::marker** - Style list markers.

```css
li::marker {
  color: var(--color-primary);
  font-size: 1.2em;
}

summary::marker {
  content: '▶ ';
}

details[open] summary::marker {
  content: '▼ ';
}
```

---

## Forms & Accessibility

### accent-color

**Widely Available** - Customize form control colors.

```css
input[type='checkbox'],
input[type='radio'] {
  accent-color: var(--color-primary);
}

/* Per-component theming */
.danger-zone input {
  accent-color: var(--color-error);
}

/* Works with progress, range too */
progress {
  accent-color: var(--color-success);
}
```

### :user-valid and :user-invalid

**Newly Available (November 2023)** - Show validation only after user interaction.

```css
/* Better UX than :invalid (which shows immediately) */
input:user-invalid {
  border-color: var(--color-error);
}

input:user-valid {
  border-color: var(--color-success);
}

/* Highlight label too */
label:has(input:user-invalid) {
  color: var(--color-error);
}
```

Prevents showing errors before users have finished typing.

### field-sizing: content

**Newly Available (2024)** - Form controls resize to fit content.

```css
/* Auto-growing textarea */
textarea {
  field-sizing: content;
  min-height: 3lh;
}

/* Auto-sizing inputs */
input {
  field-sizing: content;
  min-width: 20ch;
}

/* Dynamic select */
select {
  field-sizing: content;
}
```

---

## Performance & Scroll

### content-visibility

**Widely Available** - Skip rendering offscreen content for performance.

```css
/* Long lists/feeds */
.feed-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* Estimated height */
}

/* Large documents */
.article-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 800px;
}
```

**Performance impact**: Dramatically improves rendering of 1000+ items. Most effective for long feeds, large documents, or infinite scroll scenarios.

**Key requirement**: Must provide `contain-intrinsic-size` (estimated height) to prevent layout shift.

### scroll-margin and scroll-padding

**Widely Available** - Add offset to scroll position for anchor links.

```css
/* Account for fixed header */
[id] {
  scroll-margin-top: 80px;
}

/* Alternative: padding on container */
html {
  scroll-padding-top: 80px;
}

/* Logical property version */
[id] {
  scroll-margin-block-start: 80px;
}
```

### scroll-snap

**Widely Available** - Create snap points for scrolling. See [Components & Patterns](05-components-patterns.md) for more.

```css
.container {
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
}

.item {
  scroll-snap-align: start;
}
```

### overscroll-behavior

**Widely Available (not Safari)** - Control scroll chaining and overscroll effects.

```css
/* Prevent background scrolling when modal open */
.modal {
  overscroll-behavior: contain;
}

/* Disable pull-to-refresh */
body {
  overscroll-behavior-y: none;
}
```

### Logical Properties

**Widely Available** - Direction-agnostic properties for internationalization.

```css
/* Auto-adapts to LTR/RTL */
margin-inline: auto; /* Replaces margin-left/right */
padding-block: 2rem; /* Replaces padding-top/bottom */
border-inline-start: 1px solid; /* Replaces border-left */
inset-inline-end: 1rem; /* Replaces right */
```

Single codebase supports all writing modes.

---

## Newer Features

Use with progressive enhancement and feature detection.

### Modern attr() Function

**Chrome 133+, February 2025** - Parse attribute values as CSS types.

```css
/* Dynamic colors from HTML */
.element {
  border-color: attr(data-color type(<color>), blue);
}

/* Dynamic sizing */
.box {
  width: attr(data-width type(<length>), 200px);
}

/* Feature detection required */
@supports (x: attr(x type(<color>))) {
  .card {
    background: attr(data-bg type(<color>), white);
  }
}
```

Previously attr() only worked with content property and strings.

### Anchor Positioning

**Chrome 125+, Limited/Experimental** - Position elements relative to any other element.

```css
.anchor {
  anchor-name: --tooltip-trigger;
}

.tooltip {
  position-anchor: --tooltip-trigger;
  position-area: top center;
  position-try-fallbacks: flip-block; /* Auto-reposition on overflow */
}
```

Not production-ready without fallbacks. Use JavaScript positioning for now.

### @starting-style

**Newly Available (August 2024)** - Define starting values for transitions from display: none.

```css
dialog {
  opacity: 1;
  transition: opacity 0.3s;
}

@starting-style {
  dialog {
    opacity: 0;
  }
}

/* Pair with transition-behavior */
dialog {
  transition: opacity 0.3s, display 0.3s allow-discrete;
}
```

### View Transitions

**Newly Available (October 2025)** - Smooth transitions between DOM states.

```html
<!-- Multi-page apps: zero JavaScript -->
<meta name="view-transition" content="same-origin" />
```

```css
/* Customize animation */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;
}
```

```js
// Single-page apps
document.startViewTransition(() => {
  updateDOM()
})
```

### Dynamic Viewport Units

**Newly Available** - Account for browser UI (address bars, toolbars).

```css
/* Old way - doesn't account for mobile browser UI */
.hero {
  min-height: 100vh;
}

/* New way - adjusts as UI shows/hides */
.hero {
  min-height: 100dvh; /* Dynamic */
}

/* Also available */
.sidebar {
  height: 100svh; /* Small - UI visible */
  height: 100lvh; /* Large - UI hidden */
}
```

Use dvh for full-height sections on mobile.

---

## Quick Reference

**Selectors:**

- :is() - Group with specificity
- :where() - Group with zero specificity
- :has() - Parent/conditional selection (see [Components & Patterns](05-components-patterns.md))
- :focus-visible - Keyboard focus only
- :focus-within - Parent has focused child

**Layout:**

- overflow: clip - Single-axis clipping, no scroll container
- display: contents - Remove wrapper box
- aspect-ratio - Maintain proportions
- fit-content - Shrink-wrap to content

**Visual:**

- translate/rotate/scale - Individual transforms
- backdrop-filter - Blur backgrounds
- outline-offset - Space around outline
- ::backdrop, ::marker - Style pseudo-elements

**Forms:**

- accent-color - Customize controls
- :user-invalid/:user-valid - Post-interaction validation
- field-sizing: content - Auto-resize controls

**Performance:**

- content-visibility: auto - Skip rendering offscreen
- scroll-margin/padding - Offset for fixed headers
- overscroll-behavior - Prevent scroll chaining
- Logical properties - Internationalization

**Progressive Enhancement:**

- Modern attr() - Type-safe attributes (Chrome 133+)
- Anchor positioning - Position to any element (Limited)
- @starting-style - Animate from display: none
- View transitions - Smooth page/state changes
- Dynamic viewport units - dvh, svh, lvh
