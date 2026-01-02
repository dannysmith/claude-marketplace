# UI Design Principles for AI Agents

> **Note**: This guide focuses on design thinking and visual decision-making. For CSS implementation patterns, see the [Modern CSS Guidelines](../).

A guide to making systematic design decisions that create professional, polished interfaces. These principles focus on design thinking, not implementation details.

## Core Philosophy

**Design is not about decoration** - it's about creating clear visual hierarchy, making deliberate decisions, and solving specific problems. Good design emerges from systematic thinking and consistent application of principles, not artistic talent.

---

## 1. Starting from Scratch

### Start with a Feature, Not a Layout

**Never begin by designing the navigation bar or shell of an application.** An app is a collection of features - you can't make informed decisions about navigation until you've designed actual functionality.

**Approach:**

- Pick one core feature and design it in isolation
- Only add shell/navigation after several features are designed
- You might not need complex navigation at all

### Detail Comes Later

**Use progressive refinement:**

1. Start with low-fidelity (thick marker prevents obsessing over details)
2. Design in grayscale first - forces hierarchy through spacing, contrast, and size
3. Add color only after the hierarchy is clear
4. Don't over-invest in mockups - they're disposable, users need functionality

### Work in Cycles

**Avoid designing too much upfront:**

- Design a simple version of the next feature
- Build it immediately
- Discover real problems through implementation
- Iterate on the working design
- Only then move to the next feature

**Be a pessimist:**

- Don't imply functionality you're not ready to build
- Design the smallest useful version you can ship
- If something is "nice-to-have", design it later
- Always have something shippable as a fallback

### Choose a Personality

Design personality is determined by concrete factors:

**Font Choice:**

- Serif typefaces → elegant, classic, sophisticated
- Rounded sans-serif → playful, casual, friendly
- Neutral sans-serif → clean, simple, professional

**Color Psychology:**

- Blue → safe, familiar, trustworthy
- Gold → expensive, sophisticated, premium
- Pink → fun, playful, not serious
- Green → natural, growth, positive
- Red → urgent, important, energetic

**Border Radius:**

- No radius → serious, formal, professional
- Small radius → neutral, modern
- Large radius → playful, friendly, soft

**Language & Tone:**

- Formal → professional, serious ("Submit Request", "Invalid Credentials")
- Casual → friendly, approachable ("Send it!", "Oops, wrong password!")

**Key principle:** Stay consistent - mixing styles almost always looks worse than picking one.

### Limit Your Choices

**The curse of unlimited options:** Having millions of colors and thousands of fonts is paralyzing, not empowering.

**Build systems in advance:**

- Define 8-10 shades for each color
- Create a type scale with 5-10 sizes
- Set up spacing scale with consistent intervals
- Predefine shadow styles (small, medium, large, extra large)

**Design by process of elimination:**

1. Start with your best guess from the system
2. Try the values on either side
3. Eliminate obviously wrong choices
4. If needed, compare again with new middle value

**Systems to define in advance:**

- Font sizes and weights
- Line heights
- Color palettes with multiple shades
- Margins and padding values
- Widths and heights
- Box shadow variations
- Border radius values
- Border widths
- Opacity levels

---

## 2. Hierarchy is Everything

### Not All Elements Are Equal

**Visual hierarchy is the most effective tool for making something feel "designed"** - make important elements appear important and secondary elements recede.

When everything competes for attention, interfaces feel noisy and chaotic. Deliberately de-emphasize secondary and tertiary information while highlighting what matters most.

### Size Isn't Everything

**Don't rely solely on size for hierarchy** - it leads to primary content that's too large and secondary content that's too small.

**Better tools for hierarchy:**

**Font weight:**

- Use 2 weights maximum for UI: normal (400-500) and bold (600-700)
- Never use weights under 400 for UI - too hard to read at small sizes
- Bold text can communicate importance better than large text

**Color:**

- Dark color for primary content
- Grey for secondary content
- Light grey for tertiary content

**Combining techniques:**
Instead of making important text huge, try:

- Slightly larger + bold
- Same size + bold + darker color
- Larger + different color

### Don't Use Grey Text on Colored Backgrounds

Grey text works on white because it reduces contrast. On colored backgrounds, grey looks dull and washed out.

**Wrong approach:** Reducing opacity creates dull, disabled-looking text

**Right approach:** Hand-pick a color based on the background

- Use the same hue as the background
- Adjust saturation and lightness
- Creates reduced contrast without looking faded

### Emphasize by De-emphasizing

When you can't make something stand out enough, try making everything else stand back.

**Examples:**

- Make inactive nav items lighter instead of making active item bolder
- Soften background content when showing a modal
- Reduce contrast on surrounding elements

### Labels Are a Last Resort

**Combine labels with values when possible:**

- Instead of: "In stock: 12"
- Use: "12 left in stock"

**Make data self-evident:**

- Instead of: "Published: Jan 12, 2020"
- Use: "Published Jan 12, 2020" (format makes it obvious)

**Use format to convey meaning:**

- Email addresses don't need "Email:" label
- Phone numbers are self-evident with formatting
- Prices are obvious with currency symbols

### Balance Weight and Contrast

Icons next to text often feel too emphasized because they're solid/heavy while text is thin.

**Solutions:**

- Give icons a softer color than the text
- Reduce icon weight (use outlined instead of solid)
- Make text bolder to match icon weight

### Semantics Are Secondary

**Don't let semantics dictate visual hierarchy.** Buttons don't always need to look like buttons if they're not the primary action.

**Hierarchy trumps semantics:**

- A secondary button might look like a link
- A tertiary action might be just text
- Primary content might not use heading tags
- Navigation links might look like buttons

---

## 3. Layout and Spacing

### Start with Too Much White Space

**The #1 mistake:** Not using enough white space. Interfaces feel cramped and cluttered.

**Start with way more space than needed, then remove until it feels right.** It's easier to remove space than to add it.

**Practical approach:**

- Start with 2x-3x the space you think you need
- Gradually reduce until it stops feeling too loose
- You'll usually end up with more than your initial instinct

### Establish a Spacing System

**Use a limited, mathematical scale:**

- Linear progression (4, 8, 12, 16, 20, 24...)
- Geometric progression with consistent multiplier
- Based on a base unit with predictable intervals

**Key insight:** Perceived size difference is not linear - the jump from small to medium feels more significant than the numeric difference suggests.

### You Don't Have to Fill the Whole Screen

**Just because you have space doesn't mean you need to use it.**

**Mobile constraints create better designs:**

- Forces prioritization
- Prevents feature creep
- Maintains focus

**On large screens:**

- Don't stretch forms to full width - constrain to comfortable reading width
- Use multi-column layouts for long forms
- Center content with margins
- Create columns instead of stretching

**Mixed approaches:**

- Full-width backgrounds with constrained content
- Full-width navigation with centered logo and menu

### Grids Are Overrated

**The problem with rigid grids:** They force you into fractional thinking which rarely matches your content needs.

**Better approach:**

- Design what looks good first
- Don't force content into predetermined columns
- Use simpler columns when helpful
- Let content determine layout, not the grid

### Avoid Ambiguous Spacing

**Every element should clearly belong to a group.**

**Rule:** Things that belong together should be closer than things that don't.

**Examples:**

- Labels closer to their inputs than to previous fields
- Sections separated by more space than items within sections
- List items closer together than separate lists
- Titles closer to their content than to previous sections

---

## 4. Designing Text

### Establish a Type Scale

**Use a constrained type scale** with 5-10 sizes maximum.

Avoid fractional sizes - they're handled inconsistently and add unnecessary complexity.

### Keep Line Length in Check

**Optimal line length:** 45-75 characters per line

**For wide screens:**

- Don't let paragraphs span full width
- Constrain text blocks to comfortable reading width
- Create columns for long content
- Add margins to center content

### Baseline, Not Center

**Always align mixed-size text by baseline, not center.** Centered alignment makes text appear misaligned.

**Exceptions:**

- Single line form inputs with labels (center can work)
- Icons next to text (optical centering may be needed)

### Line-Height Is Proportional

**Line-height is not one-size-fits-all:**

- Body text: Moderate line height (1.5-1.75)
- Large headings: Tighter line height (1-1.25)
- Small text: Looser line height (1.5-2)

**General rule:** Larger text needs tighter line-height, smaller text needs looser line-height.

### Not Every Link Needs a Color

**Colored links can be overwhelming** when there are many on a page.

**Alternatives to colored links:**

- Font weight (bold)
- Underline (on hover or always)
- Darker color than surrounding text
- Arrow or icon indicator

**Use colored links when:**

- Links are inline with other text
- You need clear affordance
- There are few links

### Use Letter-Spacing Effectively

**Tighten letter-spacing for headlines** - large text often benefits from tighter spacing

**Increase letter-spacing for:**

- All-caps text - needs breathing room
- Small text if the font allows

**Never increase letter-spacing on fonts not designed for it** - many fonts look terrible with added spacing.

---

## 5. Working with Color

### You Need More Colors Than You Think

**A typical complex UI needs:**

**Multiple greys:**

- Dark grey for primary text
- Medium grey for secondary text
- Light grey for tertiary/disabled content

**Multiple shades of each color:**

- Primary brand color (5-10 shades)
- Success/green (5 shades)
- Warning/yellow (5 shades)
- Error/red (5 shades)

**Total:** Often 50-100 defined colors for a complete system.

### Define Your Shades Up Front

**Create a palette before you start designing:**

1. Pick your base shade (the "true" version of the color)
2. Create lighter shades
3. Create darker shades

**Naming convention:**

- Numbered scale from lightest to darkest
- Base/middle as your reference point
- Consistent naming across all colors

### Greys Don't Have to Be Grey

**True grey (no color) looks unnatural and cold.**

**Better approach - temperature-matched greys:**

- Cool greys: Add blue undertones for tech/modern feel
- Warm greys: Add yellow/orange undertones for friendly feel
- Match to your primary color's temperature

### Accessible Doesn't Have to Mean Ugly

**Contrast requirements matter:**

- Normal text needs more contrast than large text
- Test with tools, don't guess
- Consider colorblind users (8% of men)

**Strategies for accessible color:**

- Use darker shades for small text
- Lighter colors work on dark backgrounds
- Test early and often
- Plan for accessibility from the start

### Don't Rely on Color Alone

**Always provide secondary indicators:**

- Icons (checkmark for success, warning symbol, X for error)
- Text labels
- Different shapes
- Position/grouping
- Patterns or textures

---

## 6. Creating Depth

### Emulate a Light Source

**Fundamental principle:** Interfaces should behave as if lit from above (matches natural world).

**Raised elements (closer to light):**

- Top edge: slightly lighter
- Bottom edge: shadow
- Face: base color

**Inset elements (further from light):**

- Top edge: shadow
- Bottom edge: slightly lighter
- Interior: slightly darker than surroundings

### Use Shadows to Convey Elevation

**Shadow indicates hierarchy and interaction:**

**Elevation scale:**

- Resting: small, tight shadow with low opacity
- Hovering: medium shadow with medium opacity
- Picked up/dragging: large shadow with higher opacity

**Principle:** The higher the element, the larger and softer the shadow.

### Shadows Can Have Two Parts

**Dual shadow technique for realism:**

1. **Ambient shadow:** Large, soft, subtle (simulates indirect light)
2. **Direct shadow:** Small, sharp, darker (simulates direct light)

Combining both creates more realistic depth than a single shadow.

### Even Flat Designs Can Have Depth

**Depth without shadows:**

- Color: Lighter = closer, darker = further
- Size: Larger = closer, smaller = further
- Contrast: High contrast = closer, low contrast = further
- Overlap: Elements crossing boundaries suggest layering

### Overlap Elements to Create Layers

**Break the grid to create depth:**

- Cards extending beyond containers
- Images overlapping sections
- Buttons crossing borders
- Modals with elements breaking frame

**Key:** Offset elements to cross transitions between different backgrounds.

---

## 7. Working with Images

### Use Good Photos

**Bad photos ruin good design.** If you're not a photographer, use professional stock photos.

**Look for:**

- Good lighting and composition
- Consistent style across your site
- Appropriate resolution

### Text Needs Consistent Contrast

**Problem:** Text on images often has inconsistent readability.

**Solutions:**

1. **Add overlay** - semi-transparent layer between image and text
2. **Lower image contrast** - reduce opacity, apply filters, or desaturate
3. **Text shadows** - adds definition to text
4. **Use solid backgrounds** - put text in boxes/cards, use image as decoration

### Everything Has an Intended Size

**Don't scale assets beyond their intended use:**

**Icons:**

- Small icons should never be scaled dramatically
- Create different assets for different sizes
- Vector formats allow flexibility

**Logos:**

- Have versions for different contexts
- Small (favicon), medium (header), large (hero)
- Different detail levels for different sizes

**Screenshots:**

- Don't stretch to fill space
- Show at actual size or smaller
- Frame in device mockups if needed

### Beware User-Uploaded Content

**Users will upload anything** - prepare for the worst.

**Strategies:**

- **Control aspect ratio** - crop to consistent dimensions
- **Add subtle overlays** - borders, shadows, or backgrounds that show through
- **Set size limits** - maximum dimensions and file sizes

---

## 8. Finishing Touches

### Design for Interaction States

**Every interactive element needs clear state feedback:**

**Hover state:**

- Indicates interactivity before click
- Subtle changes: slight color shift, shadow increase, or scale
- Should be noticeable but not jarring

**Focus state:**

- Critical for keyboard navigation and accessibility
- Must be clearly visible (WCAG requirement)
- Often uses outline or ring around element
- Never remove focus indicators without replacing them

**Active/Pressed state:**

- Provides immediate feedback when clicked
- Often darker, inset appearance, or reduced shadow
- Confirms user action is registering

**Disabled state:**

- Clearly indicates non-interactive elements
- Reduced opacity, grey color, or removed shadow
- Should look "inactive" not just "less prominent"

**Loading state:**

- Shows system is processing
- Spinner, skeleton screen, or progress indicator
- Maintains element size/position to prevent layout shift

**Key principle:** State changes should be obvious enough to provide feedback, but subtle enough not to distract.

### Add Color with Accent Borders

**Subtle colored accents add personality:**

- Top borders on cards
- Left borders on alerts
- Bottom accents on headings

Small touches of color create visual interest without overwhelming.

### Don't Overlook Empty States

**Empty states are opportunities:**

- First impressions for new users
- Explain what should be there
- Guide users to add content
- Show personality

**Include:**

- Illustration or icon
- Friendly explanation
- Clear call-to-action
- Be helpful, not just informative

### Use Fewer Borders

**Borders create visual noise.** Try these alternatives:

1. **Box shadows** - subtle shadows create separation
2. **Different backgrounds** - alternate colors between sections
3. **Extra spacing** - more space between elements
4. **Different font weights/colors** - typography for separation

### Think Outside the Box

**Challenge conventional patterns:**

**Dropdowns:**

- Don't need heavy borders
- Just shadow and background
- Feels lighter and more modern

**Tables:**

- Don't need lines everywhere
- Just horizontal lines or alternating backgrounds
- Headers with different background

**Radio buttons:**

- Entire cards can be selectable
- Show selected state with border/background
- More visual and engaging

---

## 9. Systems Thinking

### Think in Systems, Not Screens

**Every design decision should scale:**

- Create reusable patterns, not one-off solutions
- Maintain consistency across all components
- Build libraries of repeatable decisions
- Document your systems for future reference

**The best designers don't make hundreds of unique decisions** - they make a few dozen good decisions and apply them consistently.

---

## Quick Reference: Design Systems

When making decisions, use these constraint systems as starting points:

**Type Scale (px):**

```
12, 14, 16, 18, 20, 24, 30, 36, 48
```

**Spacing Scale (px):**

```
4, 8, 12, 16, 24, 32, 48, 64
```

**Font Weights:**

```
400 (normal), 600 (semibold), 700 (bold)
```

**Border Radius (px):**

```
0 (none), 2, 4, 8, 16
```

**Shadow Progression:**

```
Small → Medium → Large → Extra Large
(Increase blur, spread, and offset; subtle opacity increase)
```

**Color Shades per Color:**

```
Minimum 5 shades (light → dark)
Typical system: 9 shades (50, 100, 200...900)
```

These constraints prevent decision paralysis and ensure consistency.

---

## Key Takeaways

1. **Start with functionality, not decoration** - Design features, not layouts
2. **Hierarchy is everything** - Use size, weight, color, and spacing to create clear visual order
3. **White space creates clarity** - Start with more than needed, then reduce
4. **Systems prevent paralysis** - Predefined scales for type, spacing, color, and shadows
5. **Consistency beats variety** - Make a few good decisions and apply them systematically
6. **Interaction states matter** - Every interactive element needs hover, focus, active, disabled, and loading states
7. **Context determines treatment** - Grey on colored backgrounds, line length on wide screens, shadows for elevation

**Remember:** Good design is not about artistic talent - it's about making thoughtful, systematic decisions that prioritize clarity and usability over decoration.
