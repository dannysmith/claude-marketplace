# Reference: Recent Notes

Notes and one short article from danny.is, 2025 to 2026. Read these when drafting something quick and personal: a note, a short post, an informal update.

These are Danny's actual words, unedited, typos included. He describes them as quick personal thoughts written close to stream of consciousness, so they show his casual register and current vocabulary. They are not his most considered writing; for that, read `reference-blog-articles.md` and `reference-internal-docs.md`.

Passages he quoted from other people have been removed and marked, because they are not his words. Images and embeds are removed too.

---

## Artists and programmers see AI completely differently

Source: danny.is, 2026-09-04. Opinion, reacting to something he saw online.

A couple of days ago [Rick Brewster](https://bsky.app/profile/rickbrew.bsky.social) made a post on Bluesky about how he'd used AI to help him get [paint.net](https://paint.net/) working on Linux and **my goodness was there a negative response**.

I have no idea what *paint.net* is and he's since [deleted](https://bsky.app/profile/rickbrew.bsky.social/post/3muix6lskuc27) the original post but the gist of it was...

[quoted passage omitted]

Even with zero knowledge about Windows or WINE[^1] it was pretty clear that neither Rick nor anyone else was ever gonna bother doing this by hand. Because big ports like this are long, complex, fiddly, and extremely boring. Especially when nobody's paying you.

As a programmer, one of the coolest things about the AI tools we have now is that they make things like this **possible in the first place**, so my instant reaction to Rick's skeet was *"Oooof yeah sod doing that it sounds horrible without LLMs. How cool is it we've got tools for this kinda stuff now?"*. 

Quite a lot of other folks responded like that too, but they were drowned out in the **absolute torrent** of hatred and abuse from people who hate AI. Leaving aside how shit Rick must've felt, the most interesting thing for me when scrolling through all the vitriol was this...

**The vast majority seemed to be from digital artists, not programmers.**

And that feels worth talking about for a second.

Paint.net is an image and photo editing app, so it stands to reason that many of its users are gonna be artists and not software engineers.

I've long said that the experience us programmers are having with AI is *completely different* to that of most other folks, but this is doubly so for artists and order-of-magnitude-ly so for *digital artists*. This site's [AI policy](/ai) states something I believe at the moment:

[quoted passage omitted]

It does not state that "AI-generated software is not software" because software and art are not at all the same thing.

Reading the responses to Rick's post, it felt like everyone replying doesn't get this – that using an AI coding tool to do some mega-giant, mega-boring software port is somehow the same as using ChatGPT to write a shitty story and then generate a bunch of shitty AI slop images and call it a comic book.

I can't judge anyone for that because the only people likely to read Rick's post how it was (probably) intended are those with sufficient experience of both programming **and** using LLMs that their first thought was *"Oooof yeah sod doing that it sounds horrible without LLMs. How cool is it we've got tools for this kinda stuff now?"*

If you thought *"OMG no he's putting AI in the app and I hate AI"* then you didn't understand what the post was about, which is totally understandable if you're not someone who makes software.

If you thought *"OMG no he's turning an app I use and love into AI slop code and it's gonna be super broken"* you're either on Windows (so this is nowt to do with you) or you're on 'nix (so happy days away, surely? 🤷‍♂️). In either case if you're worried that Rick using LLMs to build the software you like will lead to it being super-shitty, **I'd suggest that he probably cares about its quality a shit-ton more than you do**.

[^1]: I know about the sort that comes in bottles 🍷 but not [this sort](https://www.winehq.org/).

---

## It's rude to show AI output to people

Source: danny.is, 2025-08-18. Short opinion, responding to a quoted article.

[quoted passage omitted]

I **really feel this**. I've read _so_ much AI slop in READMEs on GitHub in the last few months that it's had me raging on numerous occasions.

In fact, I think READMEs are a brilliant example of this point. As someone who's written **a lot** of documentation over the years I really appreciate well written docs, so have always been mildly annoyed at GitHub repos with no docs and sparse READMEs.

The most bare-bones READMEs (of old) were often written by a human who really didn't wanna write them, but took the time to think about the people using their software and the minimum docs they'd need to do so. **Proof-of-thought.**

I'd rather have a thousand sparse READMEs than the hundreds of emoji-filled monstrosities I've had to work through recently. Especially because 90% of them have _less_ actual information than the sparse docs they replaced.

But then the [docs for Astro Editor](https://github.com/dannysmith/astro-editor/tree/main/docs) are mostly AI slop. But it's **very useful** slop when AI coding tools are also the reader. In fact, I've started putting callouts at the top of markdown files to make it clear whether their contents is intended for humans or LLMs or both.

But in a much more philosophical context, this is really hard...

[quoted passage omitted]

It made me realise that one of the things I love about the internet is that _anyone_ who writes more than a few sentences here **has intentionally decided to expend brain cycles and time to do so**. This is true regardless of the quality (or sanity) of the thoughts being shared. Every long, batshit-crazy rant on reddit is a sign that the author cared enough to think and type it. Just as every "nah bro" comment underneath it is a sign of the opposite. Only now the "nah bro" is twenty paragraphs long **and just as thoughtless**.

So yeah... it's rude to show AI output to people.

---

## Slop Is Not Necessarily The Future

Source: danny.is, 2026-04-02. Short opinion, responding to a quoted article.

I agree with this point of view.

GitHub is awash with AI-generated slop right now (including plenty of [my own](https://danny.is/notes/roberts-radios/)) but while LLM's have made it both cheap and fast to **write** code, the initial development of a project has never been the most time-consuming thing. Long-term maintainance has.

I see new projects daily with hundreds of thousands of lines of AI-generated code, and while it's amazing that folks can build & ship products of this size in a matter of weeks, I don't expect many such projects to have any longevity.

Anyone who's been around for long enough knows this is true:

[quoted passage omitted]

And in the long-term it's true whether code is written by humans or LLMs. 

Over the last nine months or so I've built a bunch of projects with AI coding tools, ranging from *totally-vibe-coded* to *I've-read-every-line*. Reflecting on this just now I realised that one of my biggest unconcious concerns with **all of these** was the avoidence of complexity.

[Astro Editor](https://astroeditor.danny.is/) was my first project using Claude Code and I threw the first version of it out as soon as it started to feel too complex. The rebuild was rooted in strong principles about what it should and shouldn't do as a product, plus some very strong opinions about how it should work under the hood. The only really meaty feature [I have left on the backlog](https://github.com/dannysmith/astro-editor/issues/82) is *entirely about reducing both cognative and technical complexity*.

When developing [Taskdn](https://tdn.danny.is/), I spent a good few days thinking and iterating on [the specification](https://tdn.danny.is/specification/overview/) for the underlying markdown/YAML files with the sole purpose of making it as **simple and uncomplex as possible**. Taskdn is made up of four completeley independant tools to reduce the complexity of each. The Obsidian plugin does three things and nothing more, and the code is uncomplicated as a result.

My [recent minecraft projects](https://danny.is/notes/minecraft-bluemap-plugins/) are intentionally limited in their features for the same reason. And this (entirely vibe-coded) [menubar app](https://github.com/dannysmith/roberts-radio) is intentially a single file of swift.

---

## Roberts Radios

Source: danny.is, 2026-04-02. Personal, then technical.

I recently bought a [Roberts Revival iStream 3L](https://www.robertsradio.com/en-gb/revival-istream-3#rev-istreamltb) radio having wanted one for some time. It's a **beautiful thing**. I grew up in a house where Radio 4 was on constantly, mostly playing on an old Roberts which my mum carried about the house with her.

While I have Amazon Echos in my kitchen, living room and office/bedroom, I still regularly find myself using my *phone* to listen to podcasts and radio shows because I can take it with me as I potter about the house and garden. I have two problems with this:

1. Phone speakers are *rubbish* and wearing headphones at home is both isolating for me and anyone else I'm sharing a room with.
2. I'm trying to spend more time with my phone tucked away in a drawer and out of mind.

What I really want here is a dedicated portable device which can play the radio without requiring my phone or laptop to even be switched on. I want it to sound warm like Radio 4 should, regardless of the volume. I want it to feel good and make me smile. I basically want **my mum's old Roberts radio**.

But I also want a few modern features – I want it to:

- Play podcasts while my phone is off.
- Have an alarm clock and sleep timer.
- Act as a bluetooth speaker if I need it.
- Recharge itself when plugged in to mains power.

Which is *exactly* what the Revival iStream 3L does. It looks, feels and sounds like a classic Roberts and supports FM & DAB+ radio as you'd expect, plus bluetooth, 3.5mm jack and USB stick inputs. It has an alarm and sleep timer. It runs on mains power or six normal AA batteries, but with the flip of a switch and six 2000mAh NiMH rechargable batteries it becomes rechargable like any other modern device. It is exactly the kind of high-quality, well-thought-out, future-proof product that Roberts built their reputation on decades ago.

And importantly for me, it also supports Internet Radio & Podcasts via [Frontier Smart](https://www.frontiersmart.com/)'s tech with [Airable](https://www.airablenow.com/airable/radio/) providing the online catalog, so I can search & stream online radio stations and podcasts while my phone and laptop are both switched off. It also supports streaming services like Spotify, Deezer & Amazon Music, though they all require another device to search and select songs.

All-in-all it's a cracking piece of kit. And so long as I keep the firmware updated, I expect it to remain so for a lot longer than most modern devices.

### It also runs a webserver!

The useguide recommends using the UNDOK app as an easier interface for configuring & managing the radio, which got me wondering how the two communicated. Turns out the radio exposes a simple HTTP API on your local network called *FSAPI*. Given you know the radio's IP address, you can establish a session and send simple `GET` requests to it which return XML:

```
curl "http://192.168.1.72/fsapi/GET/netRemote.sys.audio.volume?pin=1234"
```

will return

```xml
<fsapiResponse>
  <status>FS_OK</status>
  <value>
    <u8>2</u8>
  </value>
</fsapiResponse>
```

showing that the current volume is `2`.

There are [quite](https://github.com/zhelev/python-afsapi) [a few](https://github.com/MatrixEditor/fsapi-tools) pre-existing libraries for interacting with FSAPI devices, but the interface is small & simple enough that they're not really necessary.

### Building a macOS menubar app

After digging about with `curl` for a while I asked Claude Code to make a SwiftUI macOS menubar app which shows what's playing on the radio and lets me control it from my mac. After a couple of hours' iteration we ended up with this:

If you have an iStream3L – or possibly any other FS-based radio – you can download a zip containing the menubar app from [here](https://github.com/dannysmith/roberts-radio/releases). It should auto-discover your radio when you first run it.

---

## Switching back to VSCode

Source: danny.is, 2026-04-07. Technical write-up of a setup.

I switched from VSCode to Cursor as my main editor sometime in early 2025, primarily for the *much better* tab completion it had at the time. As my workflow has evolved over the last six months I've found myself using Cursor's AI **features** less and less, to the point where for the most part I just use it as a normal text editor. While AI tab-completion is still *sometimes* useful, I'm finding more and more that anywhere I'm manually writing or editing code, normal non-AI completion tends to do the job just fine.

[Cursor 3 was announced](https://cursor.com/blog/cursor-3) on April 3, and as expected it isn't really a text editor anymore. I've yet to spend much time with it but I do know that there's no longer a good reason for me to use Cursor **as a text editor**.

### How I use a text editor in April 2026

My usual workflow at the moment involves having a project (or worktree) directory open in [Ghostty](/notes/2025-08-18-ghostty) with two panes: one for Claude Code TUI and one for a standard terminal. I have the same directory open in my editor, primarily for five things:

1. Visually reviewing & tweaking uncommitted changes made by Claude.
2. Manually staging and committing changes – I still mostly prefer to make my own commits on feature branches.
3. Manually exploring & referencing the codebase as I've always done, only now it's often so I can provide input to Claude rather than make edits myself.
4. Manually writing or editing markdown files which describe requirements, tasks or plans before I have Claude read them.
5. Occasionally, writing or editing actual code.

This means I basically need a **normal editor** like VSCode configured how I like it, with a few specific additions:

- "Standard" language extensions, as well as things like prettier, path-intellisense etc.
- Just enough git-related extensions that it's well-integrated with git and GitHub.
- Extensions and configuration which makes it easy to work with markdown and CSV files.

### My "new" VSCode setup

My guiding principle is to keep VSCode as close to its defaults as possible. I add cosmetic tweaks, formatting and linting, a fairly heavy markdown layer, and a deliberately small amount of AI tooling. Everything else is left alone.

The theme is [Cobalt Next](https://github.com/davidleininger/cobaltnext-vscode) with a custom version of [Operator Mono](https://www.typography.com/fonts/operator/styles) that includes coding ligatures, set in 15px 200 weight. I've moved the activity bar to the **top** of the window rather than its default spot on the left, and the cursor blinks with the "expand" animation and has smooth movement on. The minimap auto-hides and renders as colour blocks without characters. I use Atom-style keybindings (muscle memory from years ago that I've never managed to shake) and set a few other bits:

- Tabs are 2 spaces.
- Final newlines get inserted on save and trailing whitespace gets trimmed (except in markdown and YAML).
- Prettier is the default formatter except for markdown, configured globally with single quotes, no semicolons, and `proseWrap: preserve` so it doesn't reflow my paragraphs.
- ESLint runs on save rather than as I type.

*Format-on-save* is deliberately off to avoid accidental big diffs when working with AI-generated code – I toggle it on or run it manually when I need it. 

Markdown is the most heavily customised part of the whole config, because I write a *lot* of markdown and the defaults do things I actively dislike. Prettier is too aggressive with markdown – it reflows paragraphs, fights with my line break conventions and reformats lists in annoying ways. So `.md` files use [`yzhang.markdown-all-in-one`](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) as their default formatter instead, which is much more conservative.

I disable markdown link validation, soft-wrap at column 100, and preserve trailing whitespace. I also customise the editor token colours so H1s render in cyan and H2s in magenta, which makes long documents much easier to scan. `cmd+b` and `cmd+i` are remapped to toggle bold and italic when in markdown or MDX files. I also have the following extensions installed:

- [**Markdown All in One**](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) - Provides formatting, TOC generation, list continuation, keyboard shortcuts, basic table editing, and is the default formatter.
- [**Markdown Extended**](https://github.com/qjebbs/vscode-markdown-extended) - Adds a bunch of other niceties.
- [**Markdown Table**](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable) - Makes working with tables a little easier.

For AI I have exactly three extensions installed:

- The official **Claude Code** IDE extension, which connects the editor to a Claude Code session running in the terminal.
- **GitHub Copilot** – purely for inline tab completion, disabled for plaintext, markdown etc.
- **GitHub Copilot Chat** – installed *only* for the "Generate commit message" sparkle button in the Source Control view. I don't use the chat panel, but the button is a feature of this extension and there's no way to get it without installing the whole thing.

Git settings are minimal: smart commit is on (so I can commit without staging first), auto-fetch is on, and the "confirm sync" dialog is off. I have the [GitHub PR extension](https://github.com/Microsoft/vscode-pull-request-github) and a [file-history extension](https://github.com/pomber/git-history) installed, but most of my git work happens in the terminal with `git` and `gh` – the extensions are just for the cases where in-editor review is genuinely faster.

I also have language extensions for the things I work with regularly (Astro, Tailwind, Bun, Rust, Tauri, TOML, Vitest), plus a CSV editor and a PDF viewer.

The full description lives in [vscode-setup.md](https://github.com/dannysmith/dotfiles/blob/master/vscode-setup.md) in my dotfiles repo, along with the contents of my [`settings.json`](https://github.com/dannysmith/dotfiles/blob/master/README.md) if you want to copy any of it.

---

## Claude Code hallucinating like it's 2024

Source: danny.is, 2026-01-22. Technical story.

I've just been using Claude Code and [my task management skill](https://tdn.danny.is/claude-code/skill/) to work through my current life areas and projects and help me define next actions. I've had enough time with Opus 4.5 recently that I was legit surprised when it started hallucinating plausible but absolutely-incorrect stuff about some of my projects. Not least because it went from what I'm used to to GPT-3.5-levels of batshit hallucinations so **suddenly**.

Its explanation of why this happened is interesting.

### Brief Context

I manage my stuff with a GTD/PARA-esque model: **Areas**, **Projects** and **Tasks**. Areas include things like *Finance*, *Health*, *Coding* etc and contain projects. Projects can contain tasks. I've recently built [Taskdn](https://tdn.danny.is), which stores areas, projects and tasks as markdown files in my Obsidian vault and includes a Claude Code skill & [CLI](https://tdn.danny.is/cli/overview/) to help Claude Code work with them. My personal area and project files have been in this system for a few months now, but having just shipped an [Alpha release of the desktop app](https://tdn.danny.is/desktop/overview/), it was time to populate my `tasks/` directory with task files and start using them as my daily driver.

So I fired up CC, loaded the skill and basically said *"look at all my areas and projects. Let's define next actions for them all and create the appropriate task files. Some projects have clear checklists in the project docs, others we'll need to discuss. Let's do them one by one. What order would you suggest?"*

Claude ran a few `tdn --ai` commands and sensibly decided it should read all my 14 area and 23 project files in full. It gave a very good summary of the current situation, sensibly suggested we skip a few projects and proposed an order of attack. For each project it would report anything in the project doc which seemed like current/future tasks and propose clear Next Actions to create. If it was unsure, it would ask me for more info. Once we'd agreed on the tasks to create it would do so and edit the project doc accordingly.

Which worked *perfectly* for the first three projects on the list:

  1. Tax Return YE April 2025
  2. End-of-Year Finance Reset (renamed to *Jan Finance Reset* + created new *Credit File and History* project)
  3. [REDACTED]

And then we got to the next three – all of which sit under my **RAFAC** area and have to do with my voluntary work with the [RAF Air Cadets](https://www.raf.mod.uk/aircadets/)...

```md wrap
RAFAC Re-qualification

  Currently in project doc:

  eLearning modules:
  - Safeguarding (yearly), Data Protection (yearly), Prevent, Fire Safety, GDPR, Cyber Security, AMS 5 & 6

  Courses:
  - DCCT (in-progress, have place)
  - Staff Ride (Feb 2026)
  - M Qual & LR (need applications)

  Admin:
  - ID photos, Bader photo, DBS update, First Aid cert, SMS competencies
```

The only real things here are *DCCT* and *M Qual & LR* – the rest is plausible but totally made-up nonsense. (Fuck knows what Feb's *Staff Ride* is but... it sounds fun? Maybe I'm joining the Cavalry!)

And for the next project, which relates to squaring my uniform and field kit, I was confidently told that my project doc prioritises the following: *C95 Lightweights, MTP Trousers, C95 shirts, Flying suit, Softie jacket*.

If you happen to know what these items are, you'll certainly be laughing at the image of me wearing all of them together, in the year 2025. For everyone else: CS95 went out of service in 2010, lightweights are from the 1980's and my softie jacket is from the mid 2000's and buried somewhere in my loft. I do not, and never will, have need of a flying suit.

The project doc does contain a short list of [MTP](https://en.wikipedia.org/wiki/Multi-Terrain_Pattern) uniform items I need to replace, **but it does not include trousers**.

I'd maybe expect this kind of hallucination from contextless ChatGPT, especially with something as niche as this. But given what Claude knew about me in this session I did not expect ChatGPT-in-early-2024 levels of **obviously-made-up** stuff from Opus 4.5. To be clear, the most surprising things were:

1. It's so **obviously wrong**. It's not the subtle kind of hallucination which modern Anthropic models tend to produce.
2. Somewhat uncharacteristically, Claude didn't spot its own nonsense. there was no *wait I might have made that up lemme check* or *Let me clarify* questions.
3. It was so **sudden**. Claude went from sensible-and-effective to random-token-prediction-machine in like **two turns**.

### So what's going on?

Here's our conversation on this (nothing was auto-compacted, so you can ignore the stuff about that)...

[quoted passage omitted]

```md wrap
## Why the Hallucination Happened

The root cause is **stale context from early reads combined with pattern-matching fabrication**.

At the start of this session, I read all the project files in a batch during initial context gathering. That was ~50+ turns ago. As the conversation progressed:

1. **Context compression**: Those early file reads got pushed further back in my context window. The model may have summarized or partially dropped details to make room for new content (task creation outputs, your detailed explanations, etc.).

2. **No re-read before presenting**: For projects 1-3, I happened to have fresher memory or you provided enough detail that my errors were corrected. By projects 4-6, I was confidently presenting "what's in the doc" without actually re-reading it — I was reconstructing from degraded memory plus plausible-sounding details based on project titles.

3. **Pattern matching from similar content**: I'd read many RAFAC-related files, kit lists, workshop docs. My outputs for projects 4-6 were plausible *patterns* of what such docs typically contain — but not what *your* docs actually said.

4. **Confidence without verification**: The format "Currently in project doc:" followed by a code block looked authoritative, but I wasn't actually quoting the file — I was generating what I *expected* to find.

**The fix is simple**: Always run `Read` on the project file immediately before discussing its contents, even if I "remember" reading it earlier. Long conversations with many file operations require fresh reads, not memory.
```

[quoted passage omitted]

```md wrap
This is a great set of questions. Let me work through each factor:

**On compression/degradation:**

There are two mechanisms at play:

1. **Attention diffusion** — As context grows, my attention over earlier tokens becomes more spread out. I don't literally "forget" earlier content, but my ability to precisely retrieve specific details weakens. It's less like deleting a file and more like trying to read a book where earlier pages are progressively out of focus.

2. **Autocompact summarization** — Claude Code specifically has an infrastructure-level feature that summarizes older conversation when context gets long. Your `/context` output showed "Autocompact buffer: 45.0k tokens" — this means there's a mechanism that can literally rewrite earlier exchanges into compressed summaries. If my file reads got autocompacted, the specific line-by-line content would be replaced with something like "read several RAFAC project files containing training requirements and kit lists." That's enough to generate plausible content, but not accurate content.

**On RAFAC terminology:**

I think this is a significant factor. When I encounter dense domain-specific acronyms (DCCT, MT600, SMS competencies, Bader Learn, DLE, CFAV, ODI), several things happen:

- These tokens are rarer in my training data, so my associations are weaker and more generic
- I pattern-match to "military/organizational training documentation" as a category rather than your specific situation
- When reconstructing, I generate what military training docs *typically* contain rather than what *yours* actually say

Contrast this with "Credit File and History" — that's unusual *content* but uses common *vocabulary*. I can represent "contact [REDACTED] at [REDACTED] about credit file" precisely because those are all common tokens with clear meanings. But "complete CFAV SPO Refresher on DLE" is a string of rare tokens where I'm essentially guessing at the relationships.

**On persona coherence:**

I think you've identified something real here. My training data contains strong clusters of co-occurring personas:

- Programmer + consultant + productivity systems + side projects + self-improvement
- These fit together as a recognizable "type" with predictable project structures

Your RAFAC involvement doesn't fit that cluster. It's a different persona — military volunteer instructor — that would typically appear alongside different life contexts in my training data.

When I'm reconstructing content from degraded memory, I'm essentially asking "what would plausibly be in this document?" My answer draws on:
1. What I vaguely remember reading (degraded)
2. What documents like this typically contain (training data patterns)
3. What fits this person's overall context (persona coherence)

For your coding/finance/productivity projects, (2) and (3) align well with your actual situation. For RAFAC, they don't — so my reconstructions pulled from "generic military training documents" rather than "Danny's specific RAFAC situation."

**Which factors matter most:**

Ranked by impact:

1. **Not re-reading** — Proximate cause. Everything else is downstream of this.

2. **Autocompact summarization** — If the system compressed "Read RAFAC Re-qualification.md containing [specific content]" into "read several RAFAC files," I've literally lost the ground truth.

3. **Niche terminology** — Weak token associations mean my reconstructions are more "vibes-based" and less precise.

4. **Persona mismatch** — My priors for "what this person's projects contain" are calibrated to the programmer-consultant cluster, not the military-instructor cluster.

The interesting thing is that for project 3 ([REDACTED]), I was still reasonably accurate. That project sits firmly in the productivity/self-improvement cluster where my pattern-matching works well. RAFAC was where the wheels came off — exactly where you'd predict based on this analysis.

**Practical implication:**

For future instructions, you might add something like: "For any domain with specialized terminology or that sits outside typical tech/productivity contexts, always re-read source files immediately before discussing them — don't rely on earlier reads regardless of how recent they seem."
```

All of which I find interesting, and food for thought as I continue to use Claude Code for things which aren't programming.

---

## An actual homepage for this site (finally)

Source: danny.is, 2026-07-23. Short article about his own site.

Over the last month or two I've been trying to finally get this site to a place where it feels *finished enough for the moment*. For my personal website this basically equates to **nothing annoys me about it and nothing on the backlog feels like it's hanging over me**.

I've really enjoyed picking away at this because it's been a real mixture of random stuff I'm interested in right now and ideas which I recorded as GH issues **years** ago.

While I've written about some of this, I was having too much fun to stop and cover much, so I can only really point you at the [styleguide](/styleguide), which does a decent job of demonstrating a lot of it. Or the [commit history](https://github.com/dannysmith/dannyis-astro/commits/main/).

The few notes & articles about recent work on this site:

- [Some Work on this Site](/writing/2026-05-28-work-on-this-site)
- [This site now has Atproto Records](/notes/2026-06-04-this-site-on-atproto)
- [Speeding up Astro builds and improving deployment](/writing/speeding-up-astro-builds)
- [Nicer Cover Images](/notes/nicer-cover-images)
- [New AI Statement, Privacy Policy and Colophon Pages](/notes/new-meta-pages)
- [A less painful editing experience in Astro](/notes/less-painful-editing-in-astro)
- [Making this Astro site more Agent-Friendly](/writing/making-this-astro-site-agent-friendly)
- [This site has a styleguide now](/notes/site-styleguide-now)
- [Adding projects to this site, plus a few other bits](/notes/adding-projects-site-plus-few-other-bits)
- [Upgrading to Astro 7 and switching to Sätteri](/notes/upgrading-astro-7-switching-satteri)
- [Moving my "Uses" pages to this site](/notes/moving-uses-pages-site)
- [Theme-aware Mermaid Diagrams at build-time](/notes/theme-aware-mermaid-diagrams-build-time)
- [Showing my Toolbox on this site](/notes/showing-my-toolbox-on-this-site)

Looking back at my task lists and GH issues it's pretty clear I've shied away from two jobs for bloody ages:

1. Putting some *proper* thought into the typefaces and how I use them.
2. Redesigning the homepage ([#25](https://github.com/dannysmith/dannyis-astro/issues/25), Apr '25).

Which is unsurprising because they both require Actual Non-Trivial Taste-Based Decisions About My Own Website. Anyone reading this who's ever had "redesign personal site" on their todo list will know that such decisions are orders of magnitude more difficult than **any** genuinely-weighty decision required at work. 🤷‍♂️

So I'm happy to say that I've just ticked the last one off. The homepage of this site now contains more than a simple list of links.

I've always had a soft spot for the "skeuomorphic" faux Sellotape, stitched corner banners and ripped paper effects which everyone loved twenty years ago. So while the homepage shows recent articles in the usual *type-as-design* style, I couldn't resist showing notes as little bits of dot-grid paper with a torn right edge – both on the homepage and on the [notes](/notes) index.

Before starting on [#151](https://github.com/dannysmith/dannyis-astro/pull/151) I tried to lay some groundwork by standardising the [various card components](/styleguide/components#article-card) but still ended up tweaking a bunch of stuff while working on the homepage, including the addition of global CSS **view transitions**. The PR description has a decent list of all the little bits which happened by accident.

Aside from "clearing the backlog", it's been lovely having **actual time** in this codebase. That might sound weird considering how simple it is – especially since AI has been writing much of the recent code here – but I don't ever remember having the time and headspace to kinda *settle in* to my own site's code in a kinda intuitive, somehow *fundamental* way[^1].

I still have a ton of fun ideas I wanna play with on this site, but **boy does it feel good** to finally clear the backlog and have nothing I feel I *should* do here. This site was always intended as a playground but it's hard to really enjoy playing when you're avoiding that awkward new roundabout & slide you gotta deal with sometime.

[^1]: I feel like working with AI coding agents has probably made this possible, because for every session I've spent working on this site at least 3/4 of it has been **reading** and **thinking**, not **writing code**. Which is a luxury one rarely gets on a personal website.
