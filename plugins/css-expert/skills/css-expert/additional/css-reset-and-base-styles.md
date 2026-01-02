# CSS Reset and Base Styles

A modern CSS "reset" based on https://www.joshwcomeau.com/css/custom-css-reset/.

```css
@layer reset {
  /* Use a more-intuitive box-sizing model */
  :where(*, *::before, *::after) {
    box-sizing: border-box;
  }

  /* Remove default margin */
  :where(*) {
    margin: 0;
  }

  /* Better focus outline spacing */
  :where(:focus-visible) {
    outline-offset: 3px;
  }

  /* Enable keyword animations */
  @media (prefers-reduced-motion: no-preference) {
    :where(html) {
      interpolate-size: allow-keywords;
    }
  }

  /* Prevent font size inflation on mobile*/
  :where(html) {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;

    /* Prevent layout shift when scrollbars appear */
    scrollbar-gutter: stable;
  }

  :where(body) {
    /* Add accessible line-height */
    line-height: 1.5;

    /* Improve text rendering */
    -webkit-font-smoothing: antialiased;

    /* Sensible min-height */
    min-height: 100vh;
  }

  /* Improve media defaults */
  :where(img, picture, video, canvas, svg) {
    display: block;
    max-width: 100%;
  }

  :where(img, picture) {
    height: auto;
  }

  /* Inherit fonts for form controls */
  :where(input, button, textarea, select) {
    font: inherit;
  }

  /* Auto-growing textarea */
  :where(textarea) {
    field-sizing: content;
  }

  /* Fix fieldset sizing in flexbox/grid */
  :where(fieldset) {
    min-inline-size: 0;
  }

  /* Normalize search input appearance */
  :where([type="search"]) {
    -webkit-appearance: textfield;
  }

  /* Keep specific input types LTR in RTL layouts */
  :where(input:is([type="tel"], [type="url"], [type="email"], [type="number"]):not(:placeholder-shown)) {
    direction: ltr;
  }

  /* Sensible defaults for iframes */
  :where(iframe) {
    border: 0;
    overflow: hidden;
  }

  /* Avoid text overflows */
  :where(p, h1, h2, h3, h4, h5, h6) {
    overflow-wrap: break-word;
  }

  /* Improve line wrapping */
  :where(h1, h2, h3, h4, h5, h6) {
    text-wrap: balance;
  }

  /* Anything that has been anchored to should have extra scroll margin */
  :where(:target) {
    scroll-margin-block: 5ex;
  }

  /* Sensible wrapping for code blocks */
  :where(pre) {
    white-space: pre-wrap;
  }

  /* Strengthen hidden attribute */
  :where([hidden]:not([hidden="until-found"])) {
    display: none !important;
  }

  /*
  Create a root stacking context

  You should tweak the selector to match your framework. We want to select the top-level element that your application is rendered within. For example, create-react-app uses a <div id="root">, so the correct selector is #root.
*/
  :where(#root, #__next) {
    isolation: isolate;
  }
}
```

A modern set of base styles.

```css
@layer base {
  html {
    /* Typography */
    font-variant-ligatures: common-ligatures;
    font-family: var(--font-primary);
    font-weight: var(--font-weight-normal, 400);
    hanging-punctuation: first allow-end last;
    word-break: break-word;

    /* Colors - support both light/dark */
    color-scheme: light dark;
    accent-color: var(--color-accent);
    color: var(--color-fg);
    background-color: var(--color-bg);
  }

  /* Sensible default for abbrs */
  abbr[title] {
    cursor: help;
    text-decoration-line: underline;
    text-decoration-style: dotted;
  }

  /* High contrast mode support for mark */
  @media (forced-colors: active) {
    mark {
      color: HighlightText;
      background-color: Highlight;
    }
  }

  /* Better cursor for details/summary */
  summary {
    cursor: default;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    /* Relatively sized thickness and offset */
    text-decoration-thickness: max(0.08em, 1px);
    text-underline-offset: 0.15em;

    /* Ensure descenders work properly */
    text-decoration-skip-ink: auto;

    /* Inherit text colour */
    color: currentColor;
  }

  /* Chilled out underlines - more subtle when not interacting */
  a:not([class]):not(:is(:hover, :focus)) {
    text-decoration-color: color-mix(in srgb, currentColor, transparent 75%);
  }

  /* Tighter line-height headings and UI elements */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button,
  input,
  label {
    line-height: 1.1;
  }

  /* Better typography defaults for H1 and H2 */
  h1,
  h2 {
    font-weight: 900;
    letter-spacing: -0.02rem;
  }

  /* Form defaults */
  label {
    display: block;
  }

  input:not(:where([type="submit"], [type="checkbox"], [type="radio"], [type="button"], [type="reset"])) {
    inline-size: 100%;
  }

  textarea {
    min-block-size: 5lh;
    inline-size: 100%;
    max-inline-size: 100%;
  }

  /* Smooth scrolling for user-initiated navigation (respects user preference) */
  @media (prefers-reduced-motion: no-preference) {
    html:focus-within {
      scroll-behavior: smooth;
    }
  }

  /* Sensible defaults for table styles. This assumes <th> elements have a scope="row" or scope="column" depending on whether they're in a <tr> or a <th>. */
  table {
    --color-table-accent: #d0d0f5;

    border-collapse: collapse;
    caption-side: bottom;
  }

  th,
  td {
    border: 1px solid;
    padding: 0.25rem 0.75rem;
    vertical-align: baseline;
  }

  th,
  caption {
    text-align: start;
  }

  thead th:not(:first-child),
  td {
    text-align: end;
  }

  thead {
    border-block-end: 2px solid;
    background: var(--color-table-accent);

    th {
      vertical-align: bottom;
    }
  }

  tfoot {
    border-block: 2px solid;
    background: var(--color-table-accent);
  }

  tbody tr:nth-child(even) {
    background: color-mix(in srgb, var(--color-table-accent), transparent 60%);
  }
}
```

## Next Steps

After using this reset, set up your color system using OKLCH and design tokens.
See `guidelines/02-color-design-tokens.md` for a complete color system setup.
