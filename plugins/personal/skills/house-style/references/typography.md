# Typography

Which typefaces Danny uses, what each is for, and where to get them. Sizes, weights and font stacks for the web are tokens in `css/tokens.css`. To see the type, open `pages/foundations.html` or look at `screenshots/foundations-type-dark.png`.

## The faces

| Role | Typeface | Use it for |
| --- | --- | --- |
| Display and headings | Geist | Headlines, titles, big numbers. 700–900, tight. |
| Body and interface | Figtree | Everything else: paragraphs, labels, buttons, tables. |
| Long-form reading | Literata | Articles and bookish pieces only. Rare. |
| Handwriting | Caveat | Asides and annotations. Sparingly: one per slide or screen at most. |
| Code | Operator Mono | Code and terminals. Licensed and installed on Danny's Mac only. |
| Code, fallback | Fira Code | Whenever the result will be seen on another machine. |

Two faces do nearly all the work. Geist is the confident one; Figtree is the friendly one. If in doubt: Geist for anything large, Figtree for anything you read.

**The system font replaces both** in native Mac apps, in web apps that only ever run on Danny's own machine (a localhost tool, a desktop app's web view), and whenever fonts can't be loaded. For those, leave out the Google Fonts link: the stacks in `tokens.css` fall back to the system sans. Don't substitute a different web font.

## How headlines look

This is the most recognisable thing about the brand after coral.

- Geist at 800 or 900, with tight leading (about 1.0 to 1.1) and slightly negative tracking (about -0.02em to -0.03em).
- Short titles in capitals. Statements and questions in sentence case.
- One word or phrase picked out in coral. Emphasis comes from colour, not italics.
- Left-aligned more often than centred.
- Let it be big. On a slide the headline can fill most of the width.

## Body and interface text

- Figtree at 400 for text, 500 for labels and buttons, 600 for strong text.
- Body at 16px with a line height of about 1.5. Controls and table cells at 14px. Labels and metadata at 12px, never smaller.
- Keep lines to about 70 characters.
- Muted text is a grey from the palette, never the main text colour at reduced opacity.
- In an interface, headings are modest: a page title of 32px is plenty. Save the giant type for slides, images and hero moments.

## Sizes on slides, images and video

Screens you look at from a distance need much bigger type than an interface. As a share of the canvas width: titles about 8%, statements about 6%, supporting text about 3%, and nothing below 1.5%. At 1920px wide that is roughly 160px, 120px, 58px and 30px. `pages/examples/canvas.css` has these as working styles.

## Getting the fonts

All except Operator Mono are open source, on Google Fonts, and variable (one file covers every weight).

For the web, this loads the two main faces:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Geist:wght@100..900&display=swap">
```

Add the others to the same URL only when the page uses them:

| Typeface | Add to the URL | Specimen and download |
| --- | --- | --- |
| Geist | `family=Geist:wght@100..900` | https://fonts.google.com/specimen/Geist |
| Figtree | `family=Figtree:ital,wght@0,300..900;1,300..900` | https://fonts.google.com/specimen/Figtree |
| Literata | `family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900` | https://fonts.google.com/specimen/Literata |
| Caveat | `family=Caveat:wght@400..700` | https://fonts.google.com/specimen/Caveat |
| Fira Code | `family=Fira+Code:wght@300..700` | https://fonts.google.com/specimen/Fira+Code |

- **For anything rendered to an image or video**, download the font files into the project and load them locally. Fetching fonts at render time is unreliable.
- **Operator Mono** is first in the code font stack and loads only if it's installed. Never copy its files into a project or repo.
- **For a single HTML file that must work offline**, drop the link: the stacks in `tokens.css` fall back to the system font.
