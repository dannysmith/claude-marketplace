# CSS Expert Plugin

A Claude Code plugin providing modern CSS expertise - cascade layers, OKLCH colors, container queries, defensive patterns, and design thinking.

## Installation

```bash
claude plugin add /path/to/claude-marketplace/plugins/css-expert
```

## What's Included

- **Skill**: `css-expert` - Activates automatically for CSS, styling, layout, color, typography questions
- **MCP**: `css` - MDN docs and browser compatibility (`@stolinski/css-mcp`)
- **MCP**: `chrome-devtools` - Visual verification and responsive testing

## Core Guidelines

Read these in order for a complete understanding of modern CSS architecture and patterns, or read [01. Foundation & Architecture](skills/css-expert/01-foundation-architecture.md) and then whatever guides you need.

### [01. Foundation & Architecture](skills/css-expert/01-foundation-architecture.md)

**Start here.** Learn cascade layers, design token systems, and the architectural foundation that makes everything else work.

**When to read**: Beginning any new project, or when setting up a CSS architecture.

### [02. Color & Design Tokens](skills/css-expert/02-color-design-tokens.md)

Complete color system using OKLCH, adaptive color palettes, and semantic design tokens.

**When to read**: After understanding foundation. Read before implementing any color scheme.

### [03. Layout Systems](skills/css-expert/03-layout-systems.md)

Modern layout patterns using Grid, Flexbox, and logical properties. Covers responsive design without media queries.

**When to read**: When building page layouts, responsive patterns, or container-based designs.

### [04. Typography](skills/css-expert/04-typography.md)

Fluid typography, advanced text techniques, and modern typographic features.

**When to read**: When setting up type scales, implementing responsive text, or working with web fonts.

### [05. Components & Patterns](skills/css-expert/05-components-patterns.md)

Reusable component patterns for common UI elements using modern CSS features.

**When to read**: When building specific UI components or looking for implementation patterns.

### [06. Modern Features & Selectors](skills/css-expert/06-modern-features-selectors.md)

Advanced selectors, pseudo-classes, and cutting-edge CSS features.

**When to read**: When you need specific selector solutions or want to explore modern CSS capabilities.

---

## Supplementary Guides

### [CSS Reset & Base Styles](skills/css-expert/additional/css-reset-and-base-styles.md)

Production-ready CSS reset template and base styles. Copy-paste starter code.

**When to read**: At the start of any project. Use this before reading the core guidelines.

### [UI Design Principles for AI Agents](skills/css-expert/additional/design-principles-for-ui.md)

Design thinking and visual decision-making principles. Focuses on "what looks good" rather than "how to implement."

**When to read**: When making design decisions, establishing visual hierarchy, or learning design systems thinking.

### [Tooling & MCPs](skills/css-expert/additional/tooling-and-mcps.md)

MCP setup details, optional tooling (color contrast MCP, stylelint plugins).

---

## Quick Start

1. **New project?** Start with [CSS Reset](skills/css-expert/additional/css-reset-and-base-styles.md), then [Foundation & Architecture](skills/css-expert/01-foundation-architecture.md)
2. **Building layouts?** Read [Layout Systems](skills/css-expert/03-layout-systems.md)
3. **Implementing colors?** Read [Color & Design Tokens](skills/css-expert/02-color-design-tokens.md)
4. **Need design guidance?** Read [UI Design Principles](skills/css-expert/additional/design-principles-for-ui.md)
5. **Looking for patterns?** Check [Components & Patterns](skills/css-expert/05-components-patterns.md)

---

## Philosophy

These guidelines follow a consistent philosophy:

1. **Use the browser** - If CSS or browser APIs exist, use them instead of JavaScript
2. **Minimize CSS** - Keep it essential, defensive, and clean
3. **Component-first** - Self-contained, reusable components
4. **Progressive enhancement** - Solid foundations with modern enhancements
5. **Defensive coding** - Anticipate edge cases and dynamic content

## Requirements

- Node.js v20.19+ (for chrome-devtools MCP)
- Chrome browser (for visual testing)

## License

MIT
