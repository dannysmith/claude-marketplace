---
name: css-expert
description: Modern CSS house style and platform features (cascade layers, design tokens, container queries, OKLCH, popover, anchor positioning, view transitions). Use when writing or reviewing CSS, styling, layout, colour, typography, responsive design or UI components.
allowed-tools: Read, Grep, Glob, Write, Edit, Bash, AskUserQuestion, WebFetch, WebSearch, mcp__context7__*
---

# Modern CSS

Write CSS that leans on the browser: native HTML elements and current CSS features instead of JavaScript, wrapper divs and old workarounds. This file holds the rules and the support picture. The reference files hold patterns and gotchas; read the one that matches the work.

| Working on                                                            | Read                                                     |
| --------------------------------------------------------------------- | -------------------------------------------------------- |
| Layers, tokens, component structure, where a rule belongs             | [architecture.md](architecture.md)                       |
| Palettes, theming, light/dark, colour variants, contrast              | [color.md](color.md)                                     |
| Grid, flex, container queries, fluid type, text wrapping              | [layout-and-typography.md](layout-and-typography.md)     |
| Dialogs, popovers, menus, tooltips, forms, accordions, motion         | [interactive-components.md](interactive-components.md)   |
| Starting a project's stylesheet                                       | [reset.md](reset.md)                                     |

## Fit the project first

In an existing codebase, follow what is already there: its framework (Tailwind, CSS Modules, styled components), its naming, its tokens, its breakpoints. Bring modern features into that system; do not introduce layers, a new token scheme or a new naming convention unless asked. The house style below is for new stylesheets and for projects that already use it.

Check the project's browser targets if it states any (browserslist, docs). Without stated targets, assume current evergreen browsers and use the support tiers below.

## Principles

1. **Use the browser.** If HTML or CSS can do it, do not write JavaScript for it. See the table below.
2. **Global first.** Typography, colour, spacing and layout primitives are set once, globally. Component CSS is what is left over, and should be small.
3. **Intrinsic before breakpoints.** Let content and available space drive layout (`auto-fill`, `minmax()`, `clamp()`, `flex-wrap`, container queries). Media queries are for page-level layout and user preferences.
4. **Write for content you have not seen.** Long words, missing images, translated strings, 200% zoom, a component dropped into a narrow sidebar.
5. **Enhance progressively.** A newer feature should leave a working, plainer result where it is unsupported.

## Use the platform

| Need                                   | Use                                                              | Not                                             |
| -------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| Modal                                  | `<dialog>` opened with `command="show-modal"`                    | Overlay divs, focus-trap libraries              |
| Menu, dropdown, popover panel          | `popover` + anchor positioning                                   | Floating UI/Popper, z-index, click-outside code |
| Disclosure, accordion                  | `<details>`, `<details name>` for exclusive groups               | JS toggles, checkbox hacks                      |
| Enter/exit animation                   | `@starting-style` + `transition-behavior: allow-discrete`        | Class toggling with timeouts                    |
| Component responsiveness               | Container queries                                                | Viewport media queries                          |
| Styling by child or sibling state      | `:has()`                                                         | JS-applied state classes                        |
| Light/dark theme                       | `color-scheme` + `light-dark()`                                  | Duplicated `prefers-color-scheme` blocks        |
| Hover, subtle and alpha colour variants| Relative colour, `color-mix()`                                   | Hand-picked hex variants                        |
| Readable text on a dynamic background  | `contrast-color()`                                               | JS luminance checks                             |
| Auto-growing textarea or input         | `field-sizing: content`                                          | Resize scripts, replica hacks                   |
| Validation styling                     | `:user-invalid`, `:user-valid`                                   | `:invalid` (fires before input), JS             |
| Optical vertical centring of text      | `text-box: trim-both cap alphabetic`                             | Uneven padding, line-height fudges              |
| Staggered animation                    | `sibling-index()`                                                | Inline `--i` custom properties                  |
| State and page transitions             | View transitions                                                 | FLIP libraries                                  |
| Aligning internals across cards        | Subgrid                                                          | Fixed heights, JS equalisers                    |
| Scoping styles to a component          | `@scope` with a lower boundary                                   | Deep descendant selectors                       |
| Full-height sections on mobile         | `svh` / `dvh`                                                    | `100vh`                                         |
| Scrollbar styling                      | `scrollbar-color`, `scrollbar-width`, `scrollbar-gutter`         | `::-webkit-scrollbar`                           |

## Browser support (as of October 2026)

Checked against Chrome 154, Safari 27 and Firefox 157. When this section is more than a few months old, or a feature is not listed, verify with MDN or caniuse via web search before relying on it.

**Use freely.** Shipped in all three engines. No fallback and no hedging in comments.

- Established: `@layer`, nesting, `:has()`, `:is()`/`:where()`, container size queries and `cq*` units, subgrid, logical properties, OKLCH, `color-mix()`, `light-dark()`, relative colour, `@property`, `clamp()`/`min()`/`max()`, `round()`, media query range syntax, `svh`/`dvh`/`lvh`, `lh`/`rlh`/`cap` units, `text-wrap: balance`, individual `translate`/`rotate`/`scale`, `linear()` easing, `:focus-visible`, `:user-invalid`, `inert`, `scrollbar-gutter`, `scrollbar-color`.
- Newer: `popover`, invoker commands (`command`/`commandfor`), anchor positioning, `@starting-style`, `transition-behavior: allow-discrete`, `@scope`, container style queries on custom properties, `:open`, `<details name>`, `::details-content`, `field-sizing`, `text-box`, `sibling-index()`/`sibling-count()`, `contrast-color()`, `shape()`, same-document view transitions with `view-transition-class`.

If the project must support Safari before 26 or Firefox before 147, wrap anchor positioning in `@supports (position-area: bottom)` so popovers keep their default centred position.

**Use as an enhancement.** Two engines. Fine when the unsupported result is still correct, just plainer.

| Feature                                        | Missing in | Unsupported result                              |
| ---------------------------------------------- | ---------- | ----------------------------------------------- |
| Customisable `<select>` (`base-select`)        | Firefox    | Native select                                   |
| `text-wrap: pretty`                            | Firefox    | Normal wrapping                                 |
| Cross-document view transitions                | Firefox    | Normal navigation                               |
| Scroll-driven animations                       | Firefox    | Must gate with `@supports`; element stays static|
| `<dialog closedby>`                            | Safari     | No light dismiss; add a small click handler     |
| `popover="hint"`                               | Safari     | Treated as `manual`; needs a JS show/hide path  |
| `stretch` sizing keyword                       | Firefox    | Declaration dropped; put a fallback before it   |
| Typed `attr()`                                 | Safari     | Declaration dropped; put a fallback before it   |

**Do not build on yet.** One engine. Use only as decoration, behind `@supports`, when asked or when its absence is invisible: `interpolate-size`/`calc-size()`, scroll-state queries, anchored container queries, `if()`, `@function`, CSS carousels (`::scroll-marker`, `::scroll-button`), `interestfor`, `overlay`, `reading-flow`, `corner-shape` (all Chromium only); `display: grid-lanes` masonry and `random()` (Safari only).

## House style for new stylesheets

Details and examples are in [architecture.md](architecture.md).

- **Layers.** Declare the order once: `@layer reset, base, layout, utilities, blocks, exceptions;`. Everything goes in a layer. Control priority with layer order, never with specificity tricks or `!important`.
- **Tokens.** Three tiers: primitive (`--color-blue-500`, `--space-4`), semantic (`--surface-base`, `--text-primary`), component (`--button-bg`). Name by function, not appearance.
- **Components.** Class names with `__` for inner elements (`.card__title`). Variants and states use data attributes (`data-variant="ghost"`, `data-state="loading"`). A component never sets its own outer margin; the parent spaces its children with `gap`.
- **Nesting.** Use native nesting for states, variants and container queries. Keep it two or three levels deep.
- **Colour.** OKLCH for palette values. `color-scheme: light dark` on `:root` and `light-dark()` in semantic tokens.
- **Units.** `rem` for font sizes and for the bounds of any `clamp()`. Logical properties (`margin-inline`, `padding-block`, `inset-inline-end`) throughout.
- **Responsiveness.** Container queries for components, media queries for page layout and preferences. Range syntax: `@container (inline-size > 30rem)`, `@media (width >= 60rem)`.

## Defensive defaults

Apply these with judgement; each prevents a specific failure.

- `min-height`, not `height`, on anything holding variable content.
- `min-width: 0` on flex and grid children that hold text or media, so they can shrink.
- `repeat(n, minmax(0, 1fr))` when equal columns must not be widened by their content.
- `flex-wrap: wrap` on rows whose items could outgrow the container (nav, tags, button groups). Leave it off where wrapping would break the design, and handle overflow there another way.
- `gap` for spacing between siblings, not margins.
- `overflow-wrap: break-word` wherever user or CMS text lands.
- Media: `max-width: 100%`, `aspect-ratio` to reserve space, `object-fit: cover` when cropping.
- `var()` fallbacks only for optional component properties that a parent may or may not set (`var(--flow-space, 1em)`). Do not add fallbacks to references to global tokens.

## Accessibility

- Body text contrast at least 4.5:1, large text and UI boundaries 3:1. Compute contrast, do not estimate it; use a contrast tool or MCP if one is available.
- Every interactive element has a visible `:focus-visible` style. Never remove an outline without replacing it.
- Pointer targets at least 24×24px (WCAG 2.2 AA). Aim for 44px on primary and touch-first controls. Do not force a minimum size onto inline text links.
- Put movement behind `@media (prefers-reduced-motion: no-preference)`. Opacity and colour transitions can stay.
- Text must survive 200% zoom: `rem` font sizes, no fixed heights around text.
- Do not convey state with colour alone.
- Native elements bring focus management and semantics, not complete accessibility. Roles and accessible names are still your job; see [interactive-components.md](interactive-components.md).

## Working approach

- Read the existing styles before writing any. Reuse tokens, utilities and patterns that exist.
- Ask about visual direction (personality, density, colour) only when it is not already decided by the project or the request.
- Verify in a browser when you can. If `playwright-cli` is installed, take screenshots at a narrow and a wide viewport and in both colour schemes, and read computed styles with `eval`. Otherwise say what was not checked.
- For framework specifics (Tailwind, a component library), use Context7 before web search.
