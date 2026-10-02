# Interactive components

Dialogs, popovers, menus, tooltips, disclosures, forms and motion, built on native elements. Support tiers are in [SKILL.md](SKILL.md); anything marked "enhancement" here is in two engines only.

## Choosing the element

| Need                                                     | Element                                           |
| -------------------------------------------------------- | ------------------------------------------------- |
| Blocks the page until dealt with (confirm, form, alert)  | `<dialog>` opened modally                         |
| Floats above the page, page stays usable (menu, picker)  | Any element with `popover`                        |
| Short label or hint for a control                        | `popover="hint"` (enhancement) or `popover="manual"` |
| Show and hide content in place                           | `<details>`                                       |

Dialogs and popovers render in the top layer: above everything, unaffected by ancestors' `overflow` or `z-index`. Never give them a `z-index`.

## Opening and closing without JavaScript

Invoker commands wire a button to a dialog or popover declaratively.

```html
<button commandfor="confirm" command="show-modal">Delete…</button>

<dialog id="confirm" closedby="any" aria-labelledby="confirm-title">
  <h2 id="confirm-title">Delete this project?</h2>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="delete">Delete</button>
  </form>
</dialog>

<button commandfor="menu" command="toggle-popover">Options</button>
<div id="menu" popover>…</div>
```

- Built-in commands: `show-modal`, `close`, `request-close`, `show-popover`, `hide-popover`, `toggle-popover`. A custom command is `command="--name"` and fires a `command` event on the target.
- `popovertarget` does the same for popovers only and is equally fine.
- `<form method="dialog">` closes the dialog on submit and sets `dialog.returnValue` to the button's `value`.
- `closedby="any"` adds light dismiss (click outside) to a dialog. It is an enhancement: Safari needs a small click handler on the backdrop for the same behaviour. Esc closes a modal dialog everywhere.

## Dialog

```css
dialog {
  inline-size: min(100% - 2rem, 32rem);
  max-block-size: min(100dvh - 2rem, 40rem);
  padding: var(--space-6);
  border: 0;
  border-radius: var(--radius-3);
  background: var(--surface-elevated);
  color: var(--text-primary);
  overscroll-behavior: contain;

  &::backdrop {
    background: oklch(0% 0 0 / 0.5);
    backdrop-filter: blur(4px);
  }
}

/* Stop the page scrolling behind a modal */
html:has(dialog:modal) {
  overflow: hidden;
}
```

- Do not set `display` on `dialog` without an `:open` or `[open]` condition; it overrides the UA's `display: none` and the dialog shows when closed. Lay out an inner wrapper instead.
- `showModal()` (or `command="show-modal"`) makes the rest of the page inert and traps focus. `show()` and the bare `open` attribute do neither.
- Give it an accessible name with `aria-labelledby`. Focus goes to the first focusable element; put `autofocus` on the element that should receive it.

## Popover

```css
[popover] {
  padding: var(--space-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-2);
  background: var(--surface-elevated);
  color: var(--text-primary);
  box-shadow: var(--shadow-2);
}
```

- `popover` (same as `popover="auto"`) light-dismisses, closes on Esc, and closes other auto popovers when it opens. `popover="manual"` does none of that and must be closed explicitly.
- The UA stylesheet centres a popover in the viewport with `inset: 0; margin: auto`. That is why an unpositioned popover appears in the middle of the screen, and why `margin: 0` is the first step before anchoring it.
- A popover is never modal and does not trap focus. The browser sets `aria-expanded` on the invoker and returns focus on close. The role is up to you: `role="menu"` with `menuitem` children for an action menu, `role="dialog"` with a name for a panel, nothing for plain content.
- Style the open state with `:popover-open`.

## Anchor positioning

Positions one element relative to another, with automatic repositioning when it would overflow. Replaces JavaScript positioning libraries.

```css
/* A popover is implicitly anchored to the button that invokes it */
[popover] {
  margin: 0;
  position-area: bottom span-right;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
  margin-block: var(--space-1);
}
```

`position-area` places the element in a cell of a 3×3 grid around the anchor. `bottom span-right` is below the anchor, left edges aligned, extending right. `top`, `bottom center`, `right span-bottom` and the logical forms (`block-end span-inline-end`) work the same way.

For anything that is not a popover with an invoker, name the anchor:

```css
.field__input {
  anchor-name: --field;
}

.field__hint {
  position: absolute;
  position-anchor: --field;
  position-area: right center;
  margin-inline-start: var(--space-2);
}

/* anchor() gives edge-level control; anchor-size() reads the anchor's dimensions */
.select__listbox {
  position: absolute;
  position-anchor: --select;
  inset-block-start: anchor(bottom);
  inset-inline-start: anchor(left);
  min-inline-size: anchor-size(width);
}
```

- **The anchored element must be `position: absolute` or `fixed`.** Popovers already are.
- **List the combined flip.** `flip-block` and `flip-inline` each flip one axis; add `flip-block flip-inline` for the corner case.
- **`anchor()` on a popover** needs `inset: auto` first to clear the UA's `inset: 0`, and `position-anchor: auto` to use the implicit anchor.
- **Anchor names are global** unless scoped. In a repeated component, set `anchor-scope: --name` on the component root so each instance pairs with its own anchor.
- **Keep the anchor earlier in the DOM than an ordinary absolutely positioned element**, and outside it. Popovers and dialogs are in the top layer and can anchor to any element.
- **Supporting older browsers** (Safari before 26, Firefox before 147): wrap the positioning in `@supports (position-area: bottom)` and leave `margin` alone outside it, so the popover falls back to the centred default.
- Arrows that flip with the popover need anchored container queries, which are Chromium only. Leave the arrow off, or accept that it is decoration.

## Tooltips

```html
<button class="icon-button" aria-labelledby="save-tip" style="anchor-name: --save">
  <svg aria-hidden="true">…</svg>
</button>
<div id="save-tip" popover="hint" role="tooltip" style="position-anchor: --save">Save</div>
```

```css
[role='tooltip'] {
  margin: 0;
  position-area: top center;
  position-try-fallbacks: flip-block;
  margin-block: var(--space-1);
}
```

- When the tooltip is the only label for an icon button, it must name the button: `aria-labelledby`, not `aria-describedby`. Use `aria-describedby` only for extra description on a control that already has a name.
- `popover="hint"` does not close open `auto` popovers, which is what a tooltip inside a menu needs. Safari does not support it yet and treats it as `manual`.
- Showing on hover and focus has no cross-browser declarative form (`interestfor` is Chromium only). Use a small script that calls `showPopover()` and `hidePopover()` on `pointerenter`/`focus` and `pointerleave`/`blur`, plus Esc to dismiss.
- A popover shown from script has no invoker, so it has no implicit anchor. Name the anchor explicitly, as above.
- A tooltip must not hold interactive content, and must not be the only way to reach essential information on touch devices.

## Entry and exit transitions

`@starting-style` gives the value to transition from when an element first renders or leaves `display: none`. `allow-discrete` lets `display` (and `overlay`, the top-layer membership) switch at the end of the exit instead of immediately.

```css
[popover],
dialog {
  opacity: 0;
  translate: 0 0.5rem;
  transition:
    opacity 0.2s,
    translate 0.2s,
    display 0.2s allow-discrete,
    overlay 0.2s allow-discrete;

  &:is(:popover-open, :open) {
    opacity: 1;
    translate: 0;

    @starting-style {
      opacity: 0;
      translate: 0 0.5rem;
    }
  }
}

dialog::backdrop {
  opacity: 0;
  transition:
    opacity 0.2s,
    display 0.2s allow-discrete,
    overlay 0.2s allow-discrete;
}

dialog:open::backdrop {
  opacity: 1;

  @starting-style {
    opacity: 0;
  }
}
```

- The base rule holds the **exit** state, the open rule holds the visible state, and `@starting-style` holds the **entry** state. Three states, not two.
- Put `allow-discrete` inside the `transition` shorthand. A shorthand written after a separate `transition-behavior` resets it.
- `@starting-style` adds no specificity. Nest it in the open-state rule, or place it after that rule.
- `overlay` is Chromium only. Listing it is harmless elsewhere; without it the exit can be cut short when the element leaves the top layer.
- `::backdrop` does not inherit the transition; give it its own.
- `:open` matches open `dialog`, `details` and `select`. `[open]` is equivalent for `dialog` and `details` if older browsers matter.
- The same technique works for any element toggled with `display: none`, or added to the DOM.

## Disclosure and accordion

```html
<details name="faq">
  <summary>First question</summary>
  <p>…</p>
</details>
<details name="faq">
  <summary>Second question</summary>
  <p>…</p>
</details>
```

```css
summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  cursor: pointer;

  /* Replace the default triangle; ::marker content cannot be restyled in Safari */
  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '';
    inline-size: 0.6em;
    block-size: 0.6em;
    border-inline-end: 2px solid;
    border-block-end: 2px solid;
    rotate: 45deg;
    transition: rotate 0.2s;
  }

  details:open > &::after {
    rotate: -135deg;
  }
}

details::details-content {
  opacity: 0;
  transition:
    opacity 0.2s,
    content-visibility 0.2s allow-discrete;
}

details:open::details-content {
  opacity: 1;
}
```

- `details` elements sharing a `name` are an exclusive group: opening one closes the others. Use it only when exclusivity helps; independent disclosures are usually kinder.
- `::details-content` is the wrapper around everything after the summary, and is the element to animate.
- **Animating height** to `auto` needs `interpolate-size: allow-keywords`, which is Chromium only. Add `block-size: 0` on `::details-content` and `block-size: auto` when open, with `overflow: clip`, as an enhancement; elsewhere it snaps open with the fade. If a height animation must work everywhere, the content needs a wrapper and the `grid-template-rows: 0fr` to `1fr` technique.
- Content inside a closed `details` is found by in-page search and opens automatically, which hand-rolled accordions do not do.

## Forms

```css
input,
textarea,
select {
  font: inherit;
  accent-color: var(--color-primary);
}

textarea {
  field-sizing: content;
  min-block-size: 3lh;
  max-block-size: 12lh;
}

input:user-invalid {
  border-color: var(--color-error);
}

.field:has(:user-invalid) .field__error {
  display: block;
}
```

- `field-sizing: content` makes a control fit its content. Always pair it with a minimum and maximum, or an empty field collapses to the width of its placeholder and a long one grows without limit.
- `:user-invalid` and `:user-valid` apply only after the user has interacted with the field. `:invalid` matches an empty required field on page load.
- **Do not disable or dim the submit button while the form is invalid.** It gives no reason and blocks the browser's own validation messages. Let the submit happen and show the errors.
- `accent-color` themes checkboxes, radios, range and progress in one line. Build custom controls only when the design cannot be met with it.
- Inputs with a font size below 16px make iOS Safari zoom the page on focus.
- Associate every control with a `<label>`. Placeholder text is not a label.

### Customisable select

An enhancement: Chromium and Safari render the styled version, Firefox renders the native select. Nothing breaks either way.

```html
<select name="status">
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <option value="open"><span class="dot" data-status="open"></span> Open</option>
  <option value="closed"><span class="dot" data-status="closed"></span> Closed</option>
</select>
```

```css
@supports (appearance: base-select) {
  select,
  ::picker(select) {
    appearance: base-select;
  }

  ::picker(select) {
    margin-block: var(--space-1);
    padding: var(--space-1);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-2);
    background: var(--surface-elevated);
    box-shadow: var(--shadow-2);
  }

  option {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2);
    border-radius: var(--radius-1);

    &:checked {
      font-weight: 600;
    }

    &::checkmark {
      order: 1;
      margin-inline-start: auto;
    }
  }

  select::picker-icon {
    transition: rotate 0.2s;
  }

  select:open::picker-icon {
    rotate: 180deg;
  }
}
```

- Opt in on **both** the `select` and `::picker(select)`, or the dropdown stays native.
- Every option needs real text. Icons and swatches are additions to the text, never a replacement: the native fallback and assistive technology only get the text.
- `<selectedcontent>` mirrors the chosen option's content into the button. It is a clone, so nothing interactive belongs inside an option.
- The picker is a popover anchored to the select, so it takes the entry and exit transitions above and `position-try-fallbacks`.

## Styling from state with `:has()`

```css
/* Layout depends on whether optional content exists */
.card:has(> .card__image) {
  grid-template-rows: auto 1fr;
}

/* Parent reflects a descendant's state */
.field:has(:focus-visible) {
  outline: 2px solid var(--color-primary);
}

/* Page reflects a control's state, with no JavaScript */
body:has(#compact-toggle:checked) {
  --density: compact;
}

/* Quantity query: switch layout when there are five or more items */
.tags:has(> :nth-child(5)) {
  font-size: var(--text-sm);
}
```

Keep the selector inside `:has()` simple and anchored (`>` or a class) on large pages; `body:has(…)` with a broad descendant selector is re-evaluated on many DOM changes.

## Motion

### Defaults

- Transition specific properties, never `all`. Prefer `opacity`, `translate`, `scale` and `rotate`, which do not trigger layout.
- 150–250ms for small state changes, a little longer for large surfaces. Ease-out for things entering, ease-in for things leaving.
- `linear()` expresses spring and bounce curves that `cubic-bezier()` cannot. Store them as tokens.
- Movement goes behind the preference query. Fades and colour changes can stay outside it.

```css
@media (prefers-reduced-motion: no-preference) {
  .toast {
    transition: translate 0.2s ease-out;
  }
}
```

### Stagger

```css
.list > li {
  transition: opacity 0.3s, translate 0.3s;
  transition-delay: calc((sibling-index() - 1) * 40ms);

  @starting-style {
    opacity: 0;
    translate: 0 1rem;
  }
}
```

`sibling-index()` is the element's 1-based position among its siblings, and `sibling-count()` the total. Cap the total delay on long lists: `min((sibling-index() - 1) * 40ms, 400ms)`.

### View transitions

Animate between two DOM states. The browser snapshots before and after and cross-fades, moving and resizing any element that has a matching `view-transition-name` in both.

```js
function update() {
  if (!document.startViewTransition) return render()
  document.startViewTransition(() => render())
}
```

```css
.card {
  view-transition-name: match-element;
  view-transition-class: card;
}

::view-transition-group(.card) {
  animation-duration: 0.25s;
}

/* Cross-document: opt in on both pages (enhancement; Firefox navigates normally) */
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
```

- Names must be unique on the page at the moment of the snapshot. A duplicate cancels the whole transition. `match-element` generates a unique name per element for same-document transitions; `view-transition-class` lets one rule style them all.
- Across documents, both pages must give the shared element the same explicit name.
- Snapshots are images. Text and images can look stretched mid-transition when the aspect ratio changes; set `object-fit` on `::view-transition-old()` and `::view-transition-new()`, or animate only the group.
- The page does not respond to input while a transition runs. Keep them short.
- The old `<meta name="view-transition">` opt-in no longer does anything.

### Scroll-driven animations

An enhancement: Chromium and Safari. Firefox has it behind a flag, so gate it and make the un-animated state the finished one.

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }
  }
}

@keyframes reveal {
  from {
    opacity: 0;
    translate: 0 2rem;
  }
}
```

- `animation-timeline` must come **after** the `animation` shorthand, which resets it.
- Use `both` fill so the element holds its start state before the range and its end state after.
- `view()` tracks the element through the viewport; `scroll()` tracks a scroller's overall progress (reading progress bars, shrinking headers).
- Animate `opacity` and transforms only, so the work stays off the main thread.
- These run in reverse when scrolling back. "Play once when first seen" is still an `IntersectionObserver` job.

## Scrolling regions

```css
.scroller {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--space-4);
  scrollbar-width: thin;

  & > * {
    flex: 0 0 min(80%, 20rem);
    scroll-snap-align: start;
  }
}
```

- `overscroll-behavior: contain` stops scroll chaining into the page and the horizontal swipe-back gesture.
- A scroller with no focusable children needs `tabindex="0"` and an accessible name so keyboard users can scroll it.
- `mandatory` snapping can trap content taller or wider than the scrollport; use `proximity` when items may exceed it.
- CSS carousel controls (`::scroll-button`, `::scroll-marker`) are Chromium only. Build the scroller so it is complete without them.

## Focus and targets

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Enlarge a small control's hit area without changing its size */
.icon-button {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -0.5rem;
  }
}
```

- Use `outline`, not `box-shadow`, for focus rings: outlines stay visible in forced-colours mode and follow `border-radius`.
- `:focus-within` on a wrapper matches for mouse focus too. Use `:has(:focus-visible)` for a keyboard-only ring on a parent.
- A sticky header can cover the focused element; `scroll-padding-block-start` on the scroll container prevents it.
- `inert` on a subtree removes it from focus order and the accessibility tree. Use it for off-screen panels and content behind a non-modal overlay.
