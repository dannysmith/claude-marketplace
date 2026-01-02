# Tooling and MCPs for Modern CSS

This guide covers tools that help AI agents write better CSS. Some MCPs are included in the css-expert skill's allowed-tools, while others are optional but recommended.

---

## MCP Servers

### Included in css-expert Skill

These MCPs are in the skill's `allowed-tools` and should be installed for full functionality.

#### Context7 (`mcp-context7`)

**Purpose**: Provides up-to-date documentation for CSS frameworks and libraries.

**Installation**:
Context7 is typically pre-installed with Claude Code. No additional setup needed.

**Tools**:
- `resolve-library-id`: Find the correct library identifier
- `get-library-docs`: Fetch current documentation for a library

**Use for**: Tailwind CSS, Bootstrap, Sass, PostCSS, and other CSS frameworks

---

#### Chrome DevTools MCP (`chrome-devtools-mcp`)

**Purpose**: Browser automation and DevTools Protocol access for visual verification and debugging.

**Installation**:
```bash
npm install -g chrome-devtools-mcp
```

**Configure in Claude Desktop**:
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

**Requirements**: Node.js v20.19+, current Chrome stable

**Tools** (26 total - most useful for CSS highlighted):
- **`take_screenshot`** - Visual verification of implementations
- **`evaluate_script`** - Get computed styles, inspect DOM
- **`emulate`** - Test responsive designs (device emulation)
- **`resize_page`** - Test different viewport sizes
- **`get_console_message`** / `list_console_messages` - Check for CSS errors
- Plus: Navigation, input automation, performance tracing, network inspection

**Use for**:
- Taking screenshots to verify CSS implementations
- Testing responsive behavior across device sizes
- Inspecting computed styles and cascade
- Debugging CSS issues in live browsers
- Performance testing of CSS

**GitHub**: https://github.com/ChromeDevTools/chrome-devtools-mcp

---

### Recommended (But Optional)

#### Color Contrast MCP (`a11y-color-contrast-mcp`)

**Purpose**: Accurate WCAG contrast ratio calculations.

**Why optional**: Only needed for color-specific work (~30% of CSS tasks). The skill can provide guidance without it using WCAG minimums.

**Installation**:
```bash
npm install -g a11y-color-contrast-mcp
```

**Configure in Claude Desktop**:
```json
{
  "mcpServers": {
    "a11y-color-contrast": {
      "command": "npx",
      "args": ["-y", "a11y-color-contrast-mcp"]
    }
  }
}
```

**Tools** (3 total):
- `get-color-contrast`: Calculate WCAG contrast ratio between two colors
- `check-color-accessibility`: Test if colors meet WCAG standards (AA/AAA)
- `light-or-dark-text`: Get recommendation for text color against a background

**Accepts**: hex, rgb, hsl, OKLCH, or named colors

**Use for**:
- Validating color palette accessibility
- Choosing text colors for backgrounds
- Ensuring WCAG compliance (AA: 4.5:1, AAA: 7:1 for normal text)

**Why it matters**: AI agents frequently miscalculate WCAG contrast ratios. This MCP provides accurate calculations using proper algorithms.

---

## Stylelint Plugins

These plugins enforce defensive CSS patterns and modern best practices.

### Defensive CSS Plugin (`stylelint-plugin-defensive-css`)

Enforces defensive CSS patterns that prevent common bugs with dynamic content and varying viewports.

**Installation**:
```bash
npm install --save-dev stylelint stylelint-plugin-defensive-css
```

**Configuration** (`.stylelintrc.json`):
```json
{
  "plugins": ["stylelint-plugin-defensive-css"],
  "rules": {
    "plugin/use-defensive-css": [true, {
      "severity": "warning"
    }]
  }
}
```

**Rules enforced**:

1. **`background-repeat`**: Requires explicit `background-repeat` when using `background-image`
   - Prevents unexpected tiling on large screens

2. **`custom-property-fallbacks`**: Requires fallback values for CSS custom properties
   - Catches undefined or mistyped custom properties
   - Example: `color: var(--primary, #000)` not `color: var(--primary)`

3. **`flex-wrapping`**: Requires `flex-wrap` declaration on flex containers
   - Prevents overflow when content grows or viewport shrinks

4. **`vendor-prefix-grouping`**: Prevents grouping vendor-prefixed selectors
   - If one prefix fails, entire rule fails
   - Separating ensures each prefix works independently

**When to use**:
- Projects with dynamic content (CMS, user-generated content)
- Responsive layouts that need to work across many viewports
- Teams that want to enforce defensive patterns automatically

---

### Logical CSS Plugin (`stylelint-plugin-logical-css`)

Enforces logical properties and values (e.g., `inline-start` instead of `left`).

**Installation**:
```bash
npm install --save-dev stylelint-plugin-logical-css
```

**Configuration**:
```json
{
  "plugins": ["stylelint-plugin-logical-css"],
  "rules": {
    "plugin/use-logical-properties-and-values": [true, {
      "severity": "warning"
    }]
  }
}
```

**Enforces**:
- `margin-inline-start` instead of `margin-left`
- `padding-block` instead of `padding-top` + `padding-bottom`
- `inset-inline-start` instead of `left`

**Benefits**:
- Automatic RTL support
- Clearer intent (block vs inline direction)
- Future-proof for writing modes

---

## Usage Notes

**For AI agents using the css-expert skill**:
- The skill automatically has access to `context7` and `chrome-devtools` MCPs
- Use `chrome-devtools` MCP to screenshot implementations and verify visual results
- Use `a11y-color-contrast` MCP if available; otherwise provide WCAG minimums
- Use Context7 or web search for browser compatibility checks
- These tools complement the guidelines, they don't replace judgment

**For projects**:
- Install `chrome-devtools-mcp` for full skill functionality
- Consider adding `a11y-color-contrast` MCP for color-heavy projects
- Add stylelint plugins to enforce patterns automatically
- Run stylelint in CI to catch issues before deployment
- Configure rules as warnings initially, then errors once team is familiar

**Setup priority**:
1. **Essential**: Install `chrome-devtools-mcp`
2. **Recommended**: Install `a11y-color-contrast-mcp` for color work
3. **Optional**: Add stylelint plugins for automated enforcement

---

## Additional Resources

- [Chrome DevTools MCP on GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [a11y-color-contrast-mcp on npm](https://www.npmjs.com/package/a11y-color-contrast-mcp)
- [stylelint-plugin-defensive-css on GitHub](https://github.com/yuschick/stylelint-plugin-defensive-css)
- [Defensive CSS article by Ahmad Shadeed](https://defensivecss.dev/)
- [Stylelint documentation](https://stylelint.io/)
