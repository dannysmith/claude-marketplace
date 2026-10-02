# CSS Expert Plugin

A Claude Code plugin that keeps CSS work modern: a house style for new stylesheets, the platform features that replace JavaScript and old workarounds, and a browser support table saying which of them are safe to use.

## Installation

```
/plugin install css-expert@dannysmith
```

## What's included

One skill, `css-expert`, which loads for CSS, styling, layout, colour, typography and UI component work.

| File                                                                         | Covers                                                                                       |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [SKILL.md](skills/css-expert/SKILL.md)                                       | Principles, what to use instead of JavaScript, browser support tiers, defensive defaults     |
| [architecture.md](skills/css-expert/architecture.md)                         | Cascade layers, design tokens, `@property`, component structure, `@scope`                    |
| [color.md](skills/css-expert/color.md)                                       | OKLCH, `light-dark()` theming, relative colour, `color-mix()`, `contrast-color()`, contrast  |
| [layout-and-typography.md](skills/css-expert/layout-and-typography.md)       | Intrinsic layout, container and style queries, subgrid, fluid type, `text-wrap`, `text-box`  |
| [interactive-components.md](skills/css-expert/interactive-components.md)     | Dialog, popover, anchor positioning, tooltips, forms, customisable select, motion            |
| [reset.md](skills/css-expert/reset.md)                                       | Reset and base layer to start a project from                                                 |

## Keeping it current

The browser support section in `SKILL.md` is dated. Features move between its three tiers (use freely, use as an enhancement, do not build on yet) as browsers ship them, so that section is the one to revisit; the reference files avoid restating support except where a fallback is needed.

## Optional tools

- [playwright-cli](https://github.com/microsoft/playwright-cli) for screenshots and computed-style checks.
- A contrast-checking MCP such as [a11y-color-contrast-mcp](https://www.npmjs.com/package/a11y-color-contrast-mcp) for accurate WCAG ratios.

## License

MIT
