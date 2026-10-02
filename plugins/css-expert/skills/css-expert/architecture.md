# Architecture

Cascade layers for priority, three tiers of design tokens, and small components that build on global styles. This is the house style for new stylesheets; in an existing codebase follow what is there.

## Cascade layers

Declare the order once, at the top of the entry stylesheet. A rule in a later layer beats a rule in an earlier one whatever their specificity.

```css
@layer reset, base, layout, utilities, blocks, exceptions;
```

| Layer        | Holds                                                                         |
| ------------ | ----------------------------------------------------------------------------- |
| `reset`      | Browser normalisation. The same in every project. See [reset.md](reset.md).   |
| `base`       | Project foundation: tokens applied to `html`, element defaults, typography.   |
| `layout`     | Reusable layout primitives: `.flow`, `.stack`, `.wrapper`, `.grid-auto`.      |
| `utilities`  | Single-purpose classes: `.visually-hidden`, `.text-center`.                   |
| `blocks`     | Components: `.card`, `.button`, `.site-header`.                               |
| `exceptions` | Variants and states of blocks, keyed on data attributes.                      |

For multi-brand theming add a `themes` layer after `base` that reassigns tokens per `[data-brand]`. Plain light/dark does not need one; use `light-dark()` in the semantic tokens.

Things that catch people out:

- **Unlayered styles beat every layer.** Put everything in a layer, including third-party CSS.
- **`!important` reverses layer order.** An `!important` declaration in `reset` beats one in `exceptions`. Keep `!important` for the rare rule that must never be overridden, such as `[hidden] { display: none !important }`.
- **Third-party CSS** goes in its own early layer so your layers win without a fight:

```css
@layer reset, vendor, base, layout, utilities, blocks, exceptions;
@import url('vendor.css') layer(vendor);
```

- **`revert-layer`** rolls a property back to the value from earlier layers. Useful for opting one element out of a block style.
- **`:where()`** keeps specificity at zero. Use it in resets and anywhere a default should be trivially overridable within the same layer.

### Where does this rule go?

- Normalises a browser default → `reset`
- Applies tokens to elements, sets type and colour foundations → `base`
- Arranges children without caring what they are → `layout`
- Does one small thing, usable anywhere → `utilities`
- Styles one component → `blocks`
- Changes a component for a variant or state → `exceptions`

## Design tokens

Three tiers. Components read semantic tokens; semantic tokens read primitives. Changing a primitive or remapping a semantic token updates everything downstream.

```css
:root {
  color-scheme: light dark;

  /* Primitive: raw values, no meaning */
  --color-gray-50: oklch(98% 0.005 250);
  --color-gray-950: oklch(15% 0.01 250);
  --color-blue-500: oklch(60% 0.2 250);
  --space-2: 0.5rem;
  --space-4: 1rem;
  --radius-2: 0.5rem;

  /* Semantic: meaning, theme-aware */
  --surface-base: light-dark(var(--color-gray-50), var(--color-gray-950));
  --text-primary: light-dark(var(--color-gray-950), var(--color-gray-50));
  --color-primary: var(--color-blue-500);
  --border-subtle: oklch(from var(--text-primary) l c h / 0.15);
}

/* Component: scoped, makes the component configurable */
.button {
  --button-bg: var(--color-primary);
  --button-padding-inline: var(--space-4);

  background: var(--button-bg);
  padding-inline: var(--button-padding-inline);
}
```

- **Name by function.** `--text-primary`, `--surface-elevated`, `--border-subtle`. Names like `--dark-text` or `--white-bg` are wrong the moment the theme changes.
- **Semantic or component?** Used by more than one component → semantic. Specific to one → component token on that component.
- **Variants reassign component tokens** instead of redeclaring properties: `.button[data-variant='danger'] { --button-bg: var(--color-error); }`.
- **Fallbacks.** A reference to a global token needs no fallback; it is defined. Give a fallback only where a property is an optional input that a parent may set: `margin-block-start: var(--flow-space, 1em)`.

### `@property`

Register a custom property when you need one of three things:

1. **To animate it.** Unregistered properties cannot interpolate.
2. **To stop it inheriting** (`inherits: false`), for per-element values that should not leak to children.
3. **A typed value with a guaranteed initial value**, so an invalid assignment falls back to `initial-value` instead of breaking the declaration that uses it.

```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.card {
  background: linear-gradient(var(--gradient-angle), var(--color-primary), var(--color-accent));
  transition: --gradient-angle 0.5s;

  &:hover {
    --gradient-angle: 180deg;
  }
}
```

`initial-value` must be a literal; it cannot reference another custom property. Do not register every token. Ordinary tokens on `:root` are simpler and can reference each other.

## Components

A component is a self-contained piece of UI: a button, a card, a site header. The same rules apply whether it is plain HTML, a React component or a custom element.

- **Lean on global work.** Type, colour and spacing come from `base`, layout primitives and tokens. The block adds only what is specific to it.
- **No outer margin.** The parent positions and spaces its children.
- **Adapt to context, not viewport.** Container queries for available space, `:has()` for content, data attributes for variants.
- **Past about 100 lines**, a block is probably two components, or contains a pattern that belongs in `layout`.

```html
<article class="card" data-variant="featured">
  <img class="card__image" src="…" alt="" />
  <div class="card__body flow">
    <h2 class="card__title">Title</h2>
    <p>Description</p>
    <a class="button" href="…">Read more</a>
  </div>
</article>
```

```css
@layer blocks {
  .card {
    container-type: inline-size;
    display: grid;
    gap: var(--space-4);
    padding: var(--space-4);
    border-radius: var(--radius-2);
    background: var(--surface-elevated);
  }

  .card__image {
    inline-size: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .card__body {
    --flow-space: var(--space-2);
    min-inline-size: 0;
  }

  /* The card is the container, so the query styles its children, never the card itself */
  @container (inline-size > 30rem) {
    .card__image {
      aspect-ratio: 1;
    }
  }
}

@layer exceptions {
  .card[data-variant='featured'] {
    border: 2px solid var(--color-primary);
  }
}
```

### Variants and states

Data attributes, not modifier classes. They read as key and value, cannot be half-applied, and are easy to set from JavaScript or a framework prop.

```css
@layer exceptions {
  .button[data-variant='ghost'] {
    --button-bg: transparent;
    --button-text: var(--color-primary);
  }

  .button[data-state='loading'] {
    cursor: progress;
    opacity: 0.6;
  }
}
```

Prefer real state where it exists: `:disabled`, `[aria-expanded='true']`, `[aria-current='page']`, `:open`, `:popover-open`, `:checked`. Styling the ARIA attribute keeps the visual and the announced state in sync.

### Button

```css
@layer blocks {
  .button {
    --button-bg: var(--color-primary);
    --button-text: contrast-color(var(--button-bg));

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-block-size: 2.75rem;
    padding: var(--space-2) var(--space-4);
    border: 0;
    border-radius: var(--radius-2);
    background: var(--button-bg);
    color: var(--button-text);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
      background: oklch(from var(--button-bg) calc(l - 0.08) c h);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    /* Trim the font's built-in space above caps and below the baseline so the label centres optically */
    & > span {
      text-box: trim-both cap alphabetic;
    }

    & > svg {
      inline-size: 1.25em;
      block-size: 1.25em;
      flex-shrink: 0;
    }
  }
}
```

`contrast-color()` returns black or white only, and on mid-lightness backgrounds neither may reach 4.5:1. Check brand colours, and set `--button-text` by hand where it falls short.

### `@scope`

`@scope` limits where selectors match and can stop at a lower boundary, so a component's styles do not reach into content nested inside it.

```css
@layer blocks {
  @scope (.card) to (.card__slot) {
    img {
      border-radius: var(--radius-2);
    }

    :scope {
      padding: var(--space-4);
    }
  }
}
```

- The scope root adds no specificity. When two scoped rules tie, the one whose root is closer to the element wins.
- Use layers for priority between kinds of styles, `@scope` for component boundaries, nesting for a component's own states.
- Reach for it when a component contains slots or rich content (prose, nested components). A simple block with `__` class names does not need it.

## Layout primitives

Small, content-agnostic classes in the `layout` layer. Most page structure is these plus a few page-level grids. Patterns are in [layout-and-typography.md](layout-and-typography.md).

```css
@layer layout {
  .flow > * + * {
    margin-block-start: var(--flow-space, 1em);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, var(--space-4));
  }

  .wrapper {
    inline-size: min(100% - 2 * var(--space-4), var(--wrapper-max, 70rem));
    margin-inline: auto;
  }

  .grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--grid-min, 16rem)), 1fr));
    gap: var(--grid-gap, var(--space-4));
  }
}
```
