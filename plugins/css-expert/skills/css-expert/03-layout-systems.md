# Layout Systems

Modern layout uses CSS Grid for two-dimensional control, Flexbox for one-dimensional flow, and container queries for component-level responsiveness. Most layouts need minimal CSS when using auto-responsive patterns.

---

## Grid vs Flexbox Decision Tree

Choose the right layout tool:

```
Need two-dimensional control (rows AND columns)?
  YES → Use Grid
  NO ↓

Need one-dimensional flow (single row OR column)?
  YES → Use Flexbox
  NO ↓

```

### When to Use Grid

- All page-level layouts
- Layouts requiring row and column control
- Card grids with automatic reflow
- Layouts with complex positioning
- Any layout where items align in both dimensions
- Anywhere where flexbox is at all complicated

```css
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}
```

### When to Use Flexbox

- One-dimensional arrangements (single row or column)
- Simple component-level layouts
- Centering content
- Items that wrap naturally

```css
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
```

---

## Container Queries

**Status**: Baseline (2024)

Container queries enable component-level responsiveness based on container size, not viewport size

**Prefer container queries over media queries for components.**

### Basic Setup

```css
.card {
  container-type: inline-size;
  padding: 1rem;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }
}
```

Set `container-type` on the parent element. A container cannot query itself. Sometimes this parent may exist already.

```html
<!-- ✅ Correct -->
<div class="card-container">
  <div class="card">Content</div>
</div>

<!-- ❌ Won't work -->
<div class="card">Content</div>
```

### Why Container Queries Over Media Queries for Components

```css
/* ❌ Old way - breaks in narrow sidebars */
@media (min-width: 768px) {
  .card { flex-direction: row; }
}
/* Card in 300px sidebar on 1200px viewport → breaks */
```

```css
/* ✅ Modern - adapts to container width */
.card {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .card { flex-direction: row; }
}
/* Card adapts to its actual width, not viewport */
```

Media queries for page layout. Container queries for components.

### Container Query Units

Use container query units for fluid sizing:

- **`cqi`** - 1% of container inline size (width in horizontal writing modes)
- **`cqb`** - 1% of container block size (height in horizontal writing modes)
- **`cqw`** - 1% of container width
- **`cqh`** - 1% of container height
- **`cqmin`** - Smaller of `cqi` or `cqb`
- **`cqmax`** - Larger of `cqi` or `cqb`

```css
.card {
  container-type: inline-size;
}

.card h2 {
  font-size: clamp(1.5rem, 5cqi, 3rem);
}

.card {
  padding: clamp(1rem, 3cqi, 3rem);
}
```

### The Killer Pattern: Nested Responsive Layouts

**The problem**: When viewport shrinks and triggers a media query that changes from multi-column to single-column layout, individual columns actually GROW in width. Media queries can't handle this elegantly.

**The solution**: Media queries for page-level breakpoints, container queries for component adaptations.

```css
/* Page-level layout with media queries */
.page-layout {
  display: grid;
  gap: 2rem;
}

@media (min-width: 60rem) {
  .page-layout {
    grid-template-columns: 300px 1fr;
  }
}

/* Component-level adaptation with container queries */
.sidebar {
  container-type: inline-size;
}

.metadata {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@container (min-width: 19rem) {
  .metadata {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
  }
}
```

**What happens**:

- Wide viewports (≥60rem): Two-column layout, metadata column is 300px wide, uses vertical layout
- Medium viewports (42rem-59rem): Single-column layout, metadata column expands to full width, switches to horizontal layout
- Narrow viewports (<42rem): Single-column layout, metadata column is narrower, uses vertical layout

The metadata column's layout adapts to its actual width, not the viewport width.

### Named Containers

```css
/* Shorthand syntax */
.sidebar {
  container: sidebar / inline-size;
}

@container sidebar (min-width: 400px) {
  .widget {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

### Integration with Grid and Flexbox

```css
@layer blocks {
  .card {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @container (min-width: 500px) {
    .card {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
}
```

---

## Modern Grid Patterns

### Auto-Responsive Grid (No Media Queries)

**Widely Available** - Use freely.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
```

Automatically reflows items into optimal number of columns based on available width.

### RAM Pattern (Repeat, Auto, Minmax)

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1rem;
}
```

**Why it works**: Columns never get smaller than 300px but collapse to full width on small screens. The `min(100%, 300px)` prevents overflow.

### auto-fit vs auto-fill

- **`auto-fit`** - Collapses empty tracks, stretches items to fill space
- **`auto-fill`** - Keeps empty tracks, maintains item size

```css
/* Items stretch to fill available space */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* Items maintain size, extra space remains */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

**Prefer `auto-fill`** for safer default behavior.

### Subgrid for Consistent Alignment

**Status**: Newly Available (September 2023)

Subgrid allows nested grids to inherit parent grid tracks, solving alignment across varying content lengths.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-rows: auto 1fr auto; /* header, content, footer */
  grid-template-columns: subgrid;
}
```

**Result**: All card headers, content, and footers align perfectly across rows regardless of content length.

**Progressive enhancement**:

```css
@supports (grid-template-columns: subgrid) {
  .card {
    grid-template-columns: subgrid;
  }
}
```

---

## Common Layout Patterns

### Sidebar Layout

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;
  min-height: 100vh;
}

@media (max-width: 60rem) {
  .layout {
    grid-template-columns: 1fr;
  }
}
```

### Holy Grail Layout

```css
.layout {
  display: grid;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

header { grid-area: header; }
nav { grid-area: nav; }
main { grid-area: main; }
aside { grid-area: aside; }
footer { grid-area: footer; }
```

For mobile, rearrange areas with a media query:

```css
@media (max-width: 60rem) {
  .layout {
    grid-template-areas: 'header' 'main' 'nav' 'aside' 'footer';
    grid-template-columns: 1fr;
  }
}
```

### Centered Content with Max-Width

```css
.wrapper {
  margin-inline: auto;
  padding-inline: 1rem;
  max-width: 65ch;
}
```

For multiple width options, use a custom property:

```css
.wrapper {
  --wrapper-width: 65ch;
  max-width: var(--wrapper-width);
}

.wrapper--wide { --wrapper-width: 90ch; }
```

### Full-Bleed Sections Within Constrained Content

```css
.article-grid {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [main-start] minmax(0, 65ch)
    [main-end] 1fr
    [full-end];
  gap: 1rem;
}

.article-grid > * {
  grid-column: main;
}

.article-grid > .full-width {
  grid-column: full;
}
```

---

## Composition Utilities

Create reusable layout patterns in the layout layer.

### Flow Utility (Vertical Rhythm)

```css
@layer layout {
  .flow > * + * {
    margin-top: var(--flow-space, 1em);
  }
}
```

**Contextual override**:

```css
.card__content {
  --flow-space: 1.2rem;
}
```

### Wrapper/Container

```css
@layer layout {
  .wrapper {
    margin-inline: auto;
    padding-inline: 1rem;
    max-width: 65ch;
  }
}
```

### Stack Utility

```css
@layer layout {
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, 1rem);
  }
}
```

### Grid Auto Pattern

```css
@layer layout {
  .grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
    gap: var(--gap, 1rem);
  }
}
```

---

## Defensive Patterns

### Prevent Flex/Grid Overflow

```css
.grid-item,
.flex-item {
  min-width: 0; /* Allow items to shrink below content size */
  overflow-wrap: break-word; /* Handle long text */
}
```

### Always Wrap Flex Containers

```css
.container {
  display: flex;
  flex-wrap: wrap; /* Defensive default */
  gap: 1rem;
}
```

### Use gap Instead of Margin

```css
/* ✅ Good - consistent spacing */
.grid {
  display: grid;
  gap: 1rem;
}

/* ❌ Poor - edge cases with margins */
.grid > * {
  margin: 0.5rem;
}
```

### Prevent Grid Track Overflow

```css
/* ❌ Can overflow */
grid-template-columns: 1fr 1fr 1fr;

/* ✅ Safe - minmax prevents overflow */
grid-template-columns: repeat(3, minmax(0, 1fr));
```

---

## Quick Reference

**Grid vs Flexbox**:

- Two dimensions → Grid
- One dimension → Flexbox
- Page layout → Grid
- Component internals → Flexbox

**Container Queries**:

- Set `container-type: inline-size` on parent
- Use `@container (min-width: 400px)` for breakpoints
- Use container query units (`cqi`) for fluid sizing
- Media queries for page-level, container queries for components

**Grid Patterns**:

- Auto-responsive: `repeat(auto-fit, minmax(250px, 1fr))`
- RAM pattern: `repeat(auto-fit, minmax(min(100%, 300px), 1fr))`
- Prefer `auto-fill` over `auto-fit` for safer defaults

**Defensive Defaults**:

- `min-width: 0` on grid/flex items
- `flex-wrap: wrap` on flex containers
- `gap` instead of margin for spacing
- `minmax(0, 1fr)` instead of `1fr` to prevent overflow
