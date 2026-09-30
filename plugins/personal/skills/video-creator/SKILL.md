---
name: video-creator
description: Make short videos (product promos, feature demos, explainers, animated slide decks, concept intros, social clips) by authoring them as a web page and rendering it frame by frame with Playwright and ffmpeg. Use when asked to create, edit or re-render a video, animated demo, motion graphic or animated presentation, whether inside a project repo or starting from an empty directory.
---

# Video Creator

Author the video as a single HTML page with one function, `render(t)`, that sets every element's state from the time alone: no CSS transitions, timers or memory of previous frames. A Playwright script seeks to each frame's time, screenshots it, and ffmpeg encodes the frames. Because every frame is a pure function of `t`, you can jump to any moment, render in parallel and get identical output every time.

You have a lot of creative latitude. This skill gives you a technique, lessons learned the hard way and Danny's defaults. It isn't a template. The best videos come from one strong idea specific to the subject.

Reference implementation: `website/video/` in https://github.com/dannysmith/astro-editor (the README covers the page, renderer, synthesised audio and publishing). Read it for technique, not for look: its dark, cinematic style suited that product, not every product.

## The page

```js
window.DURATION = 45 // seconds
window.__ready = Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode())])
window.render = (t) => { /* set every element from t */ }
```

Build most motion from three helpers: a 0–1 progress through a time window, easing curves and `lerp`. Add keyframe lists for camera moves and a seeded typing helper for text. Support `?t=12` (freeze on one moment) and `?play` (play at normal speed on a loop, driven by `requestAnimationFrame`) so Danny can open the page in a browser to check it. With neither, the page should do nothing until `render(t)` is called, because that's how the renderer loads it. Resolve `__ready` before rendering frame 0, or early frames use fallback fonts or show missing images.

## Workflow

1. **Research.** Work out what you have to go on:
   - **A project with a website or brand**: pull the real colours, fonts, screenshots, copy and stylesheets, and check product claims against the docs.
   - **A project with little brand or no UI**: take the substance from the README and docs, and the look from House Style.
   - **Just the prompt** (a concept, an article, a fictional product): the prompt and anything attached are the source. Use House Style. Invent freely for fictional things, but keep it consistent.

   If something important is missing, ask.
2. **Pitch.** Before building, give Danny a short concept to confirm: the central idea and what carries it from scene to scene, the beats in order, rough length, the look and the audio approach. With plenty of context, pitch one concept. With little, pitch two or three contrasting directions in a few lines each.
3. **Plan.** Write a timed storyboard (scene, start, end, what's on screen) for your own use.
4. **Build.** Work in a `video/` directory in the current project (don't commit unless asked), or the current directory if it's empty. Write a render script for the project: copy `assets/render.mjs` from this skill as a starting point and change whatever the video needs. Recreate UI in HTML when it has to animate, use real screenshots for static or montage moments, and SVG for shapes and illustration.
5. **Review.** Render contact sheets and stills, fix, repeat, at least twice before the full render (see Craft).
6. **Deliver.** The final MP4, a contact sheet so Danny can see the whole video at a glance, how to re-render it, and `LICENSES.txt` if you used any third-party assets. Spot-check frames from the encoded file.

Unless told otherwise: 16:9 at 1920×1080, 60fps, a length to suit the content (30–60 seconds for promos), and it must make sense with the sound off.

## Craft

- **Find a spine.** One device that carries across every cut: a window, a shape, a caret, a camera path, a single world the camera moves through. Without one, the video becomes animated slides with fades between them. Prefer match cuts and one thing transforming into the next over crossfades.
- **Pace it.** Beats of roughly 1.5–4 seconds. Vary them: the slowest scene should be about three times as long as the fastest. Include at least one held beat where nothing moves and a line lands. Exits are quicker than entrances. Say what this is within the first few seconds.
- **Give people time to read.** Hold text for at least 0.6s plus 0.3s per word after it arrives. If a line can't be read in two seconds, cut words.
- **Size for video, not the web.** At 1080p, headlines at 90px or more and body text at 32px or more. 1px lines and opacities under 10% disappear after encoding. Full-screen linear gradients band, so use solid or radial fills.
- **Dodge the lazy defaults**: the same ease and duration on everything, every entrance a slide-up-and-fade, the same stagger in every scene, a crossfade at every cut, gradient text, purple or cyan glow on black, everything centred.
- **Use real material.** Real colours, copy and UI from the source. Check every number and claim that appears on screen.
- **Review like an editor.**
  - A contact sheet at about one frame per second shows pacing and composition.
  - Stills hide motion, so tile closely spaced frames across each transition to check the easing (`--sheet 0.05 --from 12 --to 12.6` in the example renderer).
  - Check text overflow and collisions in code with `getBoundingClientRect()`, not just by eye.

## Gotchas

- **No state between frames.** Parallel render workers start partway through the video, so anything cached from an earlier frame is missing. Derive everything from `t`, or measure it from the page on each frame.
- **Keep fonts local.** Download web font files into the project; loading from the network at render time is unreliable. Licensed fonts installed on the Mac (like Operator Mono) load with `local()`. Never copy their files into a repo.
- **Seed any randomness** (typing rhythm, jitter, blob shapes) so renders are identical.
- **Measure, don't guess.** Get layout-dependent positions (connector lines, drop targets, cursor paths) from `getBoundingClientRect()`. When overlaying annotations on an image, remember to add the image's own offset.
- **Don't play `<video>` elements.** Extract their frames with ffmpeg and show the right one for `t`.
- **Chromium won't launch inside the Claude Code sandbox.** Run renders outside it.
- **You can't hear the audio.** Say so. Check levels numerically and look at waveforms (see `references/audio.md`).
- **Web delivery:** H.264 with `-crf 27 -preset veryslow -tune animation -pix_fmt yuv420p -movflags +faststart`, AAC audio normalised with `loudnorm=I=-16`.

## House Style

Defaults for anything the project and the prompt leave open. A project's own brand wins on look, and Danny's instructions win over everything. If he asks for a different style, or says to ignore the defaults, drop them completely: don't carry the palette, blobs or typefaces over out of habit. The Tone, Animation and Audio defaults still apply to branded videos unless he says otherwise.

### Colours

Danny's palette, based on Notion's colours: a Brand Grey `#2f3437` canvas, `#191919` for frames and darker panels, white text, and coral `#ff7369` on key words. Pastel 400s and saturated 500s for shapes. `references/colours.md` has the full palette with what each shade is for, plus the danny.is and Flexoki palettes and when to use them. Use one palette per video.

### Fonts

Geist by default, with heavy weights for headlines. Also:

- **Figtree**: a friendlier sans.
- **Literata**: a serif for quotes and editorial pieces.
- **Caveat**: handwriting for asides. Use it sparingly.
- **Operator Mono**: code and terminals. It's installed locally, so use `local('Operator Mono')`, with Fira Code as the fallback.
- **The system font** (SF Pro): for Mac app projects, to match the native UI.
- **Inter**: when matching Danny's older Figma slides.

All except Operator Mono and SF Pro are on Google Fonts.

### Typography

Big and heavy: headlines at weight 800–900, tight leading and slightly negative tracking. All caps for short titles, sentence case for statements. Emphasise with colour, not italics. Left-aligned and asymmetric more often than centred.

### Tone

- UK English.
- Warm, plain and a bit cheeky, like explaining something to a clever friend rather than selling to a stranger.
- Specific: "Your schemas become forms", not "Supercharge your workflow".
- One thought per line.
- Never claim more than the thing does.
- Emoji are welcome.
- No marketing clichés ("introducing", "revolutionise", "seamless", "unlock", "game-changer").

The Astro Editor and Taskdn homepages show the voice. Load `writing:guide` for narration or anything longer than a headline.

### Aesthetic

Start from the project's own homepage. Without one, borrow the flavour of Danny's own slides and social images (screenshots in `references/examples/`; look at them before designing). Take the ingredients, not the layouts:

- A charcoal canvas inset in a darker frame.
- Big, bold white type with coral highlights.
- Organic blobs in coral and pastels bleeding off the corners.
- A loose, hand-drawn squiggle or arrow.
- Large emoji as illustrations.
- Flat vector drawings in the palette.
- The occasional full-bleed colour card.
- macOS window chrome for code.
- Plenty of space.

It should feel friendly, a bit playful and clearly made by a person.

### Images

Prefer SVG you draw yourself (seeded blobs, flat illustrations, diagrams) to photography. Use a photo only when it adds something, from Unsplash or Pexels. Icons come from Lucide or Phosphor. Apple emoji render natively and suit personal videos; use Fluent Emoji (MIT licensed) for commercial product marketing.

### Animation

- Smooth, not swooshy: no spins, 3D flips, zoom blur, lens flares or particle bursts.
- Motion should direct attention, one focal movement at a time.
- Typing should feel human: an uneven rhythm, pauses at punctuation, a caret that's solid while typing and blinks when idle.
- Add a little background life: blobs drifting, emoji bobbing, a tick popping in.
- Aim for one moment that makes someone smile.
- End on a held end card.

### Audio

Choose per video and say why in the pitch:

- **A found track fitted to the video.** Shortlist two or three for Danny, since you can't hear them.
- **Synthesised sound locked to on-screen events.** Use sampled instruments, not bare oscillators.
- **A mix of the two.**
- **Silence**, for short clips or anything that will autoplay muted.

Keep sound effects subtle: one per meaningful event. `references/audio.md` has sources, licences, ffmpeg recipes and ways to check audio you can't hear.
