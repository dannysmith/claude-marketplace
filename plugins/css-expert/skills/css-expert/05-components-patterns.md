# Components & Patterns

Build self-contained components that adapt to their context. See [Foundation & Architecture](01-foundation-architecture.md) for component definition and core principles.

---

## Defensive CSS Essentials

```css
.component {
  /* Flex containers */
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.component__item {
  min-width: 0;  /* Allow shrinking */
  overflow-wrap: break-word;
}

/* Images */
img {
  max-width: 100%;
  object-fit: cover;
  background-color: var(--surface-base);  /* Fallback */
}

/* Variable content */
.card {
  min-height: 300px;  /* Not height */
}

/* Grid items */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  /* Use auto-fill, not auto-fit */
  /* Use minmax(0, 1fr) to prevent overflow */
}

/* Text truncation */
.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## Common Anti-Patterns

```css
/* ❌ Fixed heights for variable content */
.card { height: 300px; }
/* ✅ Use min-height */
.card { min-height: 300px; }

/* ❌ No flex wrapping */
.nav { display: flex; }
/* ✅ Default to wrap */
.nav { display: flex; flex-wrap: wrap; }

/* ❌ Pixel font sizes */
body { font-size: 16px; }
/* ✅ Use rem */
body { font-size: 1rem; }

/* ❌ Grid without minmax */
.grid { grid-template-columns: 1fr 1fr; }
/* ✅ Prevent overflow */
.grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

/* ❌ No CSS variable fallbacks */
.box { padding: var(--spacing); }
/* ✅ Always provide fallbacks */
.box { padding: var(--spacing, 1rem); }
```

---

## Accessibility

**WCAG 2.5.5**: Interactive elements minimum 44×44px.

```css
button,
a {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}

/* Icon buttons */
.icon-button {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
}

.icon-button svg {
  width: 24px;
  height: 24px;
}

/* Expand hit area without visual change */
.small-link {
  position: relative;
}

.small-link::after {
  content: "";
  position: absolute;
  inset: -8px;  /* Expands touch area 8px in all directions */
}

/* Focus states */
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
```

---

## Button

```css
@layer blocks {
  .button {
    /* Accessibility: 44×44px minimum */
    min-height: 44px;
    min-width: 44px;
    padding: 0.75rem 1.5rem;

    /* Center on cap-height for all typefaces */
    text-box: trim-both cap alphabetic;

    /* Defensive */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    /* Styling */
    background: var(--color-primary);
    color: var(--color-text-ui);
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .button:hover {
    background: oklch(from var(--color-primary) calc(l - 0.1) c h);
  }

  .button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .button[data-variant="secondary"] {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }

  .button[data-variant="ghost"] {
    background: transparent;
    color: var(--color-primary);
  }
}
```

---

## Card

```css
@layer blocks {
  .card {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 0;
  }

  .card__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .card__title {
    font-size: clamp(1.25rem, 5cqi, 1.75rem);
  }

  .card__description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Container query for layout */
  @container (min-width: 500px) {
    .card {
      flex-direction: row;
    }

    .card__image {
      width: 200px;
      flex-shrink: 0;
    }
  }

  /* Adapt based on content */
  .card:has(.card__image) {
    border: 1px solid var(--border-subtle);
  }
}
```

---

## Native HTML Elements

### Dialog

```html
<dialog id="modal">
  <h2>Title</h2>
  <p>Content...</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>

<button onclick="document.getElementById('modal').showModal()">Open</button>
```

```css
dialog {
  border: none;
  border-radius: var(--radius-md);
  padding: 2rem;
  max-width: 500px;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
```

### Details

```html
<details>
  <summary>Question</summary>
  <p>Answer...</p>
</details>
```

```css
summary {
  cursor: pointer;
  user-select: none;
}

summary::marker {
  content: "▶ ";
}

details[open] summary::marker {
  content: "▼ ";
}
```

### Popover

**Status**: Baseline (January 2025)

```html
<button popovertarget="help">Help</button>
<div id="help" popover>Help content...</div>
```

```css
[popover] {
  border: 1px solid var(--border-default);
  padding: 1rem;
}
```

---

## Adaptive Components with :has()

**Status**: Baseline (2024)

```css
/* Card with optional image */
.card:has(.card__image) {
  border: 1px solid var(--border-subtle);
}

/* Form submit button */
form:has(:invalid) button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
}

/* Highlight parent on child focus */
.form-group:has(input:focus) {
  background: var(--surface-elevated);
}
```

---

## Data Attributes for Variants

```html
<button class="button" data-variant="secondary">Secondary</button>
<button class="button" data-state="loading">Loading</button>
```

```css
.button[data-variant="secondary"] {
  background: transparent;
  border: 1px solid var(--color-primary);
}

.button[data-state="loading"] {
  opacity: 0.6;
  pointer-events: none;
}
```

**Why**: Clear semantic distinction, easier to toggle with JavaScript, can combine independently.

---

## Scrolling

```css
/* Horizontal scroll */
.scroll-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-gutter: stable;  /* Reserves space, prevents layout shift */
  overscroll-behavior-x: contain;  /* Prevent scroll chaining */
  scroll-snap-type: x mandatory;
}

.scroll-container > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* Modal scroll */
dialog {
  max-height: 80vh;
  overflow-y: auto;
  overscroll-behavior-y: contain;
}
```

---

## Key Patterns

**Defensive**:
- `flex-wrap: wrap` + `min-width: 0` on flex items
- `min-height` over `height` for variable content
- `auto-fill` over `auto-fit` in grids
- `object-fit: cover` on images with fallback background

**Modern CSS**:
- `text-box: trim-both cap alphabetic` for buttons
- `oklch(from var(--color) calc(l - 0.1) c h)` for hover states
- `:has()` for content-based adaptation
- Data attributes for variants/states
- Container queries for responsive components
- Native HTML (`<dialog>`, `<details>`, `popover`)
