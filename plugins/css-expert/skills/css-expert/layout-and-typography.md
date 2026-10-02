# Layout and typography

Let content and available space decide the layout. Grid for two dimensions and anything page-level, flex for a single run of items, container queries for components.

## Grid or flex

- **Grid** when rows and columns both matter, when children should be sized by the parent, for page structure, and whenever a flex solution starts needing width calculations.
- **Flex** when items flow along one axis and size themselves: nav rows, button groups, tag lists, icon-plus-label.

## Intrinsic patterns

Each of these responds to space with no media query.

```css
/* As many columns as fit, never narrower than 16rem, never overflowing a narrow parent */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: var(--space-4);
}

/* Sidebar that drops below the content when the content would get too narrow */
.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);

  & > :first-child {
    flex: 1 1 16rem;
  }

  & > :last-child {
    flex: 999 1 60%;
    min-inline-size: 0;
  }
}

/* Centred column with a gutter that survives narrow screens */
.wrapper {
  inline-size: min(100% - 2rem, 70rem);
  margin-inline: auto;
}

/* Reading column with children that can break out to full width */
.prose-grid {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [content-start] minmax(0, 65ch) [content-end]
    minmax(1rem, 1fr) [full-end];

  & > * {
    grid-column: content;
  }

  & > .full-bleed {
    grid-column: full;
  }
}

/* Sticky footer page shell */
body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-block-size: 100svh;
}
```

- **`auto-fill` or `auto-fit`.** `auto-fill` keeps empty tracks, so a lone item stays card-sized. `auto-fit` collapses them, so few items stretch to fill the row. Default to `auto-fill`; choose `auto-fit` when stretching is wanted.
- **`1fr` is `minmax(auto, 1fr)`.** A track will grow to fit a long word or wide image. Use `minmax(0, 1fr)` when columns must stay equal.
- **Viewport height.** `svh` for a stable minimum (page shells, heroes), `dvh` when the element should track the mobile browser's toolbars as they retract. Avoid `100vh`, which is taller than the visible area on mobile.
- **Page-level breakpoints** use media queries with range syntax and `rem`: `@media (width >= 60rem)`.

## Container queries

A component should respond to the space it is given, not to the viewport: the same card may sit in a wide main column and a narrow sidebar on the same page.

```css
.card {
  container-type: inline-size;
}

@container (inline-size > 30rem) {
  .card__layout {
    display: grid;
    grid-template-columns: 12rem 1fr;
  }
}
```

- **A container cannot be styled by its own query.** The query matches descendants. Make the component's root the container and put the changing layout on an inner element, or make the parent slot the container.
- **`inline-size` containment means the container's width cannot come from its contents.** On an element that shrink-wraps (an auto-width flex item, `inline-block`, `fit-content`, a floated box) it collapses to zero width. Containers need a width given by their parent: a block, a grid cell, a flex item with a flex-basis.
- **Name containers** when a query must skip the nearest one: `container: sidebar / inline-size`, then `@container sidebar (inline-size > 20rem)`.
- **Do not make everything a container.** Add `container-type` where something queries it.
- **Units.** `cqi` is 1% of the query container's inline size. With no container ancestor it falls back to the small viewport size.
- Use `container-type: size` only when the container has a definite height, and you need to query it.

### Style queries

Query a custom property's value on an ancestor. Every element is a style container, so no `container-type` is needed. Only custom properties are supported, and only equality (`style(--x: value)`) works everywhere.

```css
.card-list[data-density='compact'] {
  --density: compact;
}

@container style(--density: compact) {
  .card__body {
    padding: var(--space-2);
  }

  .card__meta {
    display: none;
  }
}
```

Good for a mode set high up that changes several unrelated properties lower down. It styles descendants of the element carrying the property, not that element. For a single property, reassigning a component token is simpler.

## Subgrid

Lets a nested grid use its parent's tracks, so parts of sibling components line up.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  gap: var(--space-4);
}

/* Each card spans three rows of the parent and places its title, body and footer in them */
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  gap: var(--space-2);
}
```

Every title, body and footer in a row of cards now shares a height. The item must span as many parent tracks as it has parts, and a subgrid can set its own `gap`.

## Defensive layout

- `min-inline-size: 0` on flex and grid children containing text, `<pre>`, tables or media. Their default minimum is their content size, which is what causes most horizontal overflow.
- Truncation needs that same `min-inline-size: 0` on the flex child, then `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`.
- Multi-line clamp is still the prefixed form: `display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden`.
- `overflow: clip` clips without creating a scroll container, so it does not break `position: sticky` or scroll-driven animations inside. Prefer it to `overflow: hidden` for decorative clipping.
- Wide content (tables, code) gets its own scroll wrapper with `overflow-x: auto`, instead of letting the page scroll sideways.
- `scroll-margin-block-start` on `:target` or `[id]` to clear a sticky header.
- `scrollbar-gutter: stable` on the root or on scroll containers where content appearing would otherwise shift the layout.
- `isolation: isolate` on a component root gives it its own stacking context, so internal `z-index` values cannot interfere with the page. Dialogs and popovers sit in the top layer and need no `z-index` at all.

## Typography

### Sizing

Font sizes in `rem`. For fluid sizes, the preferred value of `clamp()` must include a `rem` term; a bare `vw` or `cqi` value does not respond to browser zoom or the user's font size.

```css
h1 {
  /* Viewport-fluid, for page-level headings */
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
}

.card__title {
  /* Container-fluid, for headings inside components; needs a container ancestor */
  font-size: clamp(1.125rem, 1rem + 1.5cqi, 1.75rem);
}
```

- Keep the maximum within about 2.5 times the minimum so 200% zoom still enlarges the text meaningfully.
- Fluid type suits headings and display text. Body text is better at a fixed `rem` size.
- A modular scale of five to eight sizes as tokens covers most interfaces.

### Units

- `ch` for measure: `max-inline-size: 65ch` on running text (45–75 is the comfortable range).
- `lh` and `rlh` for spacing tied to the line height: `margin-block: 1lh`, `min-block-size: 3lh` on a textarea.
- `cap` and `em` for sizing things next to text, such as icons: `block-size: 1cap` matches capital height.
- Unitless `line-height`: about 1.5 for body, 1.1–1.25 for large headings, looser for small text.

### Wrapping

```css
:is(h1, h2, h3, h4, blockquote, figcaption) {
  text-wrap: balance;
}

p,
li {
  text-wrap: pretty;
}
```

- `balance` evens out line lengths. Browsers only apply it to short blocks (around six lines), so keep it for headings and captions.
- `pretty` avoids orphans and bad rags in body text. Firefox ignores it, which is harmless.
- `overflow-wrap: break-word` on text containers. Add `hyphens: auto` for narrow columns of long-form text, which needs a correct `lang` attribute.

### `text-box`

Fonts carry empty space above the capitals and below the baseline, which is why text in a button or badge looks off-centre and why a heading never sits flush with the top of an image beside it. `text-box` trims it.

```css
.badge {
  display: inline-block;
  padding: 0.5em 0.75em;
  text-box: trim-both cap alphabetic;
}

h1 {
  text-box: trim-both cap alphabetic;
}
```

- With the trim applied, equal padding on all sides looks equal. Without support the box is slightly taller, so do not compensate with uneven padding.
- It applies to block containers and inline boxes. In a flex or grid container, put it on the child holding the text, not on the container.
- Use `ex` instead of `cap` as the top edge for lowercase-heavy labels.

### Details worth getting right

- `font-variant-numeric: tabular-nums` for numbers that update or sit in columns (tables, timers, prices).
- Links: `text-underline-offset: 0.15em` and `text-decoration-thickness: max(1px, 0.08em)`. Leave `text-decoration-skip-ink` at `auto`.
- Tighten `letter-spacing` slightly on large headings, open it on all-caps and small-caps text, and use `em` so it scales.
- Variable fonts: set weight and width with `font-weight` and `font-stretch`. Reach for `font-variation-settings` only for axes with no CSS property.
- `font-size-adjust` on the body keeps the x-height steady between the web font and its fallback and reduces layout shift on load.
- Long-form extras, as enhancement: `hanging-punctuation: first`, `font-variant-numeric: oldstyle-nums`, `initial-letter` for drop caps.
