# Colour Reference

Three separate palettes. Each belongs to a different context, so pick one per video and don't mix them. A project's own colours always beat all three.

| Palette | Where it comes from | Use it for |
| --- | --- | --- |
| Danny's palette | Danny's Figma colour library, based on Notion's colours | The default. Slides, explainers, social, anything without a brand |
| danny.is | Danny's personal website | Videos that will live on or represent danny.is |
| Flexoki | Steph Ango's open-source theme | Projects whose websites use it (e.g. Astro Editor, Taskdn docs) |

## Danny's palette (default)

Danny's general-purpose palette, used across his slides, social images and illustrations. It's based on Notion's standard colours, with extra 700 and 400 shades and some shades tweaked to be more harmonious. The token names are the colour style names from his Figma library.

### Core

| Name | Hex | Token | Notes |
| --- | --- | --- | --- |
| Brand Red | `#ff7369` | red-500 | The accent. Coral. Highlight words, @, bullets |
| Brand Grey | `#2f3437` | bg-light-700 | Default dark canvas |
| Brand D Grey | `#191919` | bg-light-800 | Darker frame/border around the canvas, panels |
| Black | `#191919` |  | All text on light backgrounds |
| True White | `#ffffff` |  | Text on dark backgrounds |
| True Black | `#000000` |  | Only when needed |

### What each shade is for

- **800** – backgrounds for callouts and UI elements on a dark background
- **700** – borders for callouts and UI elements on a dark background
- **600** – regular-weight text on a light background
- **500** – objects and display text on any background; regular text on a dark background. The "main" colour of each hue
- **400** – borders on a light background. Also the soft pastel for blobs and shapes
- **300** – backgrounds for callouts and UI elements on a light background

### All colours

| Hue    | 800       | 700       | 600       | 500       | 400       | 300       |
| ------ | --------- | --------- | --------- | --------- | --------- | --------- |
| Pink   | `#533b4c` | `#602d51` | `#ad1a72` | `#e255a1` | `#fac8e4` | `#f4dfeb` |
| Red    | `#594141` | `#b84848` | `#e03e3e` | `#ff7369` | `#ffd4d4` | `#fbe4e4` |
| Orange | `#594a3a` | `#765839` | `#d9730d` | `#ffa344` | `#fed9b7` | `#faebdd` |
| Purple | `#443f57` | `#6f6695` | `#6940a5` | `#9a6dd7` | `#e6d7f9` | `#eae4f2` |
| Yellow | `#59563b` | `#645e26` | `#dfab01` | `#ffdc49` | `#feeebe` | `#fbf3db` |
| Green  | `#354c4b` | `#2c5c5a` | `#0f7b6c` | `#4dab9a` | `#c8eae3` | `#ddedea` |
| Blue   | `#364954` | `#254e66` | `#0b6e99` | `#529cca` | `#c4e4f2` | `#ddebf1` |
| Brown  | `#434040` | `#534343` | `#64473a` | `#937264` | `#f1e0d8` | `#e9e5e3` |
| Grey   | `#454b4e` | `#596063` | `#9b9a97` | `#979a9b` | `#ebeced` | `#ebeced` |

Light backgrounds use a cool, slightly blue-tinted grey ramp (white, `#fafafa`, light greys) rather than Notion's warm one. Dark backgrounds are `#2f3437` with `#191919` for the darker layer.

## danny.is

The colours of Danny's personal website, defined in OKLCH. They share hues with the palette above but form their own system, with a warm beige and charcoal base instead of cool greys.

| Role           | Light                    | Dark                     |
| -------------- | ------------------------ | ------------------------ |
| Background     | beige `oklch(96% 0.02 85)` | charcoal `#202020`     |
| Text           | ink `oklch(28% 0.01 210)`  | beige                  |
| Secondary text | `oklch(55% 0.01 210)`      | `oklch(75% 0.01 210)`  |
| Accent (coral) | `oklch(70% 0.18 25)`       | `oklch(80% 0.14 25)`   |

Other hues (light / dark), all as `oklch(L C H)`:

| Hue    | Light              | Dark               |
| ------ | ------------------ | ------------------ |
| Pink   | `55% 0.15 350`     | `70% 0.13 350`     |
| Orange | `78% 0.16 55`      | `80% 0.14 55`      |
| Purple | `60% 0.14 300`     | `72% 0.12 300`     |
| Yellow | `90% 0.16 95`      | `82% 0.12 95`      |
| Green  | `65% 0.12 165`     | `72% 0.1 165`      |
| Blue   | `62% 0.15 250`     | `70% 0.13 250`     |

Semantic roles on the site: coral is the accent, purple is visited links, yellow is highlight, blue is focus rings.

## Flexoki

An "inky" palette for reading and writing on screen by Steph Ango: https://stephango.com/flexoki. Warm paper and ink rather than pure white and black. Several of Danny's project websites use it, usually with a blue accent. Use it when the project already does, not as a general default.

### Base

| Name  | Hex       | Name | Hex       |
| ----- | --------- | ---- | --------- |
| paper | `#FFFCF0` | 500  | `#878580` |
| 50    | `#F2F0E5` | 600  | `#6F6E69` |
| 100   | `#E6E4D9` | 700  | `#575653` |
| 150   | `#DAD8CE` | 800  | `#403E3C` |
| 200   | `#CECDC3` | 850  | `#343331` |
| 300   | `#B7B5AC` | 900  | `#282726` |
| 400   | `#9F9D96` | 950  | `#1C1B1A` |
| black | `#100F0F` |      |           |

### Roles

| Role                        | Light      | Dark       |
| --------------------------- | ---------- | ---------- |
| bg                          | paper      | black      |
| bg-2                        | 50         | 950        |
| ui (borders)                | 100        | 900        |
| ui-2 (hover)                | 150        | 850        |
| ui-3 (active)               | 200        | 800        |
| tx-3 (faint text)           | 300        | 700        |
| tx-2 (muted text)           | 600        | 500        |
| tx (text)                   | black      | 200        |

### Accents

Use 600 on light backgrounds and 400 on dark ones. Each hue also has a full 50–950 scale on the Flexoki site if you need tints.

| Hue     | 600 (light) | 400 (dark) |
| ------- | ----------- | ---------- |
| Red     | `#AF3029`   | `#D14D41`  |
| Orange  | `#BC5215`   | `#DA702C`  |
| Yellow  | `#AD8301`   | `#D0A215`  |
| Green   | `#66800B`   | `#879A39`  |
| Cyan    | `#24837B`   | `#3AA99F`  |
| Blue    | `#205EA6`   | `#4385BE`  |
| Purple  | `#5E409D`   | `#8B7EC8`  |
| Magenta | `#A02F6F`   | `#CE5D97`  |
