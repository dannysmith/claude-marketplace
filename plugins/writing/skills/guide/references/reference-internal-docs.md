# Reference: Internal Documentation

Full-length examples of Danny's internal knowledge base articles, guides, and process docs. Load when writing internal documentation, guides, or knowledge base articles.

These are Danny's actual words — unedited. Written for internal teams at companies he worked with.

---

## Guide to Onboarding New Team Members

Source: Notion (internal knowledge base). Demonstrates: warm professional voice, clear principles before practices, fictional walkthrough to make process tangible, anticipating questions.

### Who's this guide for?

Ideally, _everyone_ should read this guide.

You **must** read this guide if you are:

- A **hiring manager** at any level.
- An **onboarding buddy** for a new hire.
- On the **Remote Ops** or **People Ops** team.
- Involved in designing hiring or team-specific onboarding systems.

### Overview

> Onboarding is a magic moment when new employees **decide to stay engaged or become disengaged**. It offers an imprinting window when you can make an impression that **stays with new employees** for the duration of their careers."

First impressions matter. We need new hires to have a great first impression. This is the **main design goal** of our onboarding process. It's also been designed to:

- Reduce the cognitive load on hiring managers and ops staff as much as possible by providing a repeatable, comprehensive process. (If you've ever started a new job and spent your first day chasing people you've never met to get your accounts set up you'll know how that feels as a candidate. But for a fast-growing company this can cripple the Ops/HR department too)
- Introduce new hires to the tools and skills they'll need to work in a distributed company – on a carefully-designed cadence.
- Reduce the need for synchronous onboarding time and help new hires settle in to asynchronous ways of working quickly.

### Guiding Principles

Our onboarding process is designed with a few principles in mind...

- **Effective onboarding is long** — Bringing someone new into our company is not something that can be done in a few days. We don't consider someone to be "onboarded" until they've _really_ become part of the company's fabric: we give everyone time to learn our best practices, build relationships across the company and grow into their new role with us.
- **Make it easy and obvious** — Joining a new company is scary. Joining a remote, globally distributed company is even scarier. We do everything we can to make things easy and obvious for new hires. We also make things easy and obvious for hiring managers and Ops staff.
- **A consistent baseline experience for all** — Everyone has a common, shared onboarding experience: we all share the same baseline. This is crucial for preventing silos and creating a "sense of team" at scale. (ie. Everyone, including CxO hires, follow the same process)
- **Company first, then Team** — The onboarding experience should focus on the common basics **first**, then on role-specific stuff. This makes best use of a new joiner's initial enthusiasm.
- **Leave the expert stuff to experts** — Given a shared baseline for everyone, it's down to individual departments / hiring managers to design team- and role-specific onboarding to suit their needs. The Company onboarding process doesn't get in the way of this.
- **Starting ASAP ≠ Maximum Effectiveness** — Although it might seem like a good idea for new hires to start immediately, it usually leads to a sub-par experience for them and it takes longer for them to become effective. So we aim to leave space between offer and start date, so we can get the preboarding right.

### The Candidate Experience

Let's imagine that Kirki is joining. Here's what we want her experience to feel like...

Kirki will be starting about a month from now, and she just signed her offer letter. The next day she's sent her contract and other legal documents – she takes a few days to look over them and signs.

About three weeks before her start date she receives a link to her personal onboarding home. She watches the welcome video from her hiring manager and reads over the notes. She starts to work through all her pre-reading and begins to get excited. Meanwhile, she exchanges a few emails with her hiring manager where they agree on the kit she needs.

A few days before her start date she receives her laptop, desk, camera and mic in the post. She also receives a swag pack with some awesome swag in it.

The day before she starts, she receives an email with her Google login. She finds her inbox filled with invitations to meetings and tools. She's surprised because her last company was never this organised.

She also receives a video from her onboarding buddy Mark. He explains that she doesn't need to do anything with all the stuff in her inbox until tomorrow – they'll go though it in their intro session.

Kirki's first day starts on a call with Mark. They get to know each other and get her set up on Google, Slack, Notion, Loom and Zoom right away. Mark explains that her onboarding home now includes a big checklist of onboarding tasks and he explains how it works.

When Kirki first opens her calendar, it's already populated with coffee meetings and intro sessions. And when she joins slack, she's already in all the right channels.

She spends the rest of the day working through her checklist. She gets set up on some more tools and reads through some basic lessons, learning about how to use Slack, Zoom, Notion and Loom. Meanwhile, Mark has added her to some social channels that might interest her and introduced her in the welcome channel. They speak a lot on slack during the day.

Kirki ends her day by creating a "Working With Me" page and adding herself to the public team database. She already feels comfortable with the core tools, and has had a chance to start learning about how the company works.

### Onboarding Buddies

Every new hire should have an onboarding buddy. Their job is to make sure that the onboarding experience is as easy and pleasant as possible. They're the **go to person for any questions during the onboarding process**.

The hiring manager should choose the onboarding buddy. Ideally they'll be someone doing the same or similar job to the new hire and will be a similar level of seniority – this should **almost never** be the hiring manager.

Your main job is simply to **be there for the new hire**. Joining a new company can be scary and overwhelming – particularly for people who are new to remote working. During the first couple of days one of your main roles is making sure your buddy doesn't feel lost.

---

## A Case for Using Remix — Technical Proposal

Source: Notion (internal). Demonstrates: technical advocacy balanced with honest risk assessment, acknowledging bias upfront, structured with clear sections, personal voice in a professional context.

Remix is a modern full-stack framework built on top of React and React Router. It's an attractive option for building the web and backend of our product. This document explains why I think so, and looks at some of the advantages and risks.

This is a big deal because Shopify is a **notoriously engineering-focussed** organisation. They're obsessed with good engineering, and helping their customers build things _fast_. Both of which bode well for Remix.

It's worth remembering that **Remix is not a commercially-motivated project** (unlike AWS Amplify).

I've personally had Remix recommended by three people I trust.

### Advantages

Far and away the biggest advantage of Remix over a traditional SPA + API is that Remix is designed to have a simple mental model for developers. The amount that someone needs to know and understand to build a _good_ traditional SPA and server-side API is huge. Remix tries to reduce this and be **easy to grok**.

### Risks

It's not all roses though – there are some obvious risks associated with choosing to build on top of Remix.

**It's Kinda New** — It's a relatively new framework at less than two years old, which raises three main worries:

1. Is it technically mature enough for production use?
2. Is it just a cool passing fad?
3. What important stuff have the core team not worked out yet or anticipated?

I'm much less worried about these than when I first started looking at Remix, because the people involved are Extremely Smart™ and well-known in the React & JavaScript communities. Shopify is investing heavily in the framework, but also betting heavily on it themselves.

**Vendor Lock-In** — After our experience with the Amplify stack, this is probably my biggest concern long-term. If we build on Remix and decide in 2 year's time to move away from it, we must be able to do that without _too much_ pain. This does not look nearly as hard as I expected.

### Summing Up

Our only priority right now is to **build a high quality product and get it to market**. And in that context, I've convinced myself that we'd be insane to not build on top of Remix. The advantages far outweigh the cons in my mind, and the risks are more easily mitigated than I expected.

I asked ChatGPT to challenge me on this proposal and it wasn't much help. Human brains required, please.

---

## About this Notion — Meta-Documentation

Source: Notion (internal). Demonstrates: memorable simple principles, progressive depth, the document itself exemplifies what it teaches, warm even in process docs.

This is Delocate's central hub – our control centre.

We use it for **a lot** of stuff. It's the **single source of truth for how we work at Delocate**. It is the central location where we document important information that team members need to access. We also track all of our work here.

Broadly speaking, we use Notion to:

- Store our "corporate knowledge"
- Record **how we do our thing**.
- Manage everything to do with our clients, projects, tasks, meetings and business processes.
- Store and manage important company records.
- Handle most of our business process flows.

### Before you read on...

We've made one big assumption when designing this notion...

> **That you know how to use notion to a decent level**

This means you should fully understand:

- Basic blocks, pages and page nesting.
- Databases and their different views (table, board,, caleendar, gallery, list).
- How linked databases work.
- How database relations work.
- How database templates work.

You do not need to understand:

- Formulas
- Template blocks

### Design Principles

We've based the design of this notion on some key principles...

**Make it obvious** — No magic. To someone who knows how notion works, everything in our workspace should be very obvious. Things should be as simple as possible, but no simpler. This means we avoid non-obvious conventions, superfluous relations and complicated formulas unless they add **real value**.

**Make it pretty** — People tend to use things when they get pleasure from using them. And they tend to take better care of things that are beautiful. So while we don't waste time with useless sparkles, we do our best to keep our notion looking good.

**Keep it flat** — Deep hierarchies make it hard to find stuff and even harder to understand where things should go. They often lead to duplicated categories and hidden information. We keep things as flat as we can.

**Enforce structure only where it's needed** — Not everything in notion needs to be super neat and structured. A lot of pages _should_ be minimal and messy. One of Notion's great strengths is that it doesn't impose structure, and so allows you to "think on paper" in whatever way suits your brain. We try to embrace this.

That said, a notion filled with unstructured thoughts and notes isn't helpful to anyone. Some things should be highly structured and optimised for ease of use. We enforce strict rules in the places they are helpful, and encourage creative messiness wherever they're not.

**Use databases, relations and templates only to make things easier** — Databases, relations and templates are incredibly powerful tools, but they add significant complexity. Before we use these tools, we think hard about whether they actually add value by making it easier to do our work. If not, keep it simple.

**Build for the future** — We're building this notion to help us work better **_now_**, but if it's not too much effort we also want to build it in a way that helps us work better in the future. So we're ready to scale if we want to.

Imagine coming back to this notion after a year away from it. Would it still make sense? Striking the right balance here is hard: too much detail and everything's out of date; not enough and none of it makes sense. We try to get this right.

### High-Level Structure

There are five top-level pages...

- **Delocate Home** - This is the home page. It contains nearly all the other pages and databases, as well as being a dashboard.
- **Dumping Ground** - This is a place to drop documents when you don't know where they should live. We'll go through this regularly and work out where to put stuff. **It's better that you make a mess in here than scatter new documents all over the workspace**.
- **Public Notion** - If you make a page or database for public consumption, it should be in here.
- **Demo** - This is our Notion demo. It lives in the top level so it's always easy to find when we're showing it off.
- **Archive** - This is where we dump pages that we don't think we'll need again but want to keep around just in case. It is intentionally unorganised.

### Key Principle: JIT - Just In Time

While we make plenty of cheap-and-cheerful plans in advance, we only solidify our plans **Just Before** we need to. If you have an idea for a client project, don't add it to the projects database – instead, add it to the client's record. Once we have a clear plan for it and have decided it's worth working on now, we'll "promote" it by creating a project record.

In the same way, if you're planning a project, don't create a load of tasks on the backlog. Hack together a plan in the project document and "promote" the relevant tasks to the task boards only when you're about to start work on the project.

This approach has some clear advantages:

- Our projects and tasks databases only contain things we're clear about and are definitely going to do. This makes them more useful day-to-day.
- We rarely end up with old, redundant stuff on our backlogs.
- We manage our "messy" planning and thinking with lists, toggles and freeform text - this makes it easier to change our mind about stuff.

### We all gotta have Green fingers

We're all jointly responsible for pruning our notion. We're all Notion Gardeners.

Green fingers FTW.

**How to prune our Notion:**

- Take ownership of our Notion. The easier it is for us to use, the more effective we'll be in our work – we're all responsible for keeping our tools sharp.
- If you see something that could be better, fix it and say so on slack.
- If you regularly use a template to create a new record and there's a part you never use, we should probably remove that from the template. Either do so or raise it on slack.
- Set aside twenty minutes every week to look at the documents you're responsible for and tidy them up.
- Do not move old records from any of the core databases to the Archive. Most of these databases have an internal mechanism for archiving stuff – look for a checkbox or status called _Archived_ or _Dropped_.

**How not to prune our Notion:**

- Remember that (despite everything above), Notion is a tool to help us work better. It's a means not an end. Don't obsess.
- Don't delete or archive work that other people own without asking. What looks like nonsense to you might be crucial to someone else.

### Where do I get help?

Ask in `#notion` on Slack, or hit up @Danny Smith.

---

## Definition of Done — Technical Narrative

Source: Medium. Demonstrates: framing technical topics as stories, real checklist items, acknowledging controversy, connecting engineering practices to business outcomes.

Scrum defines the Definition of Done in pretty simple terms: it's the acceptance criteria that are common to every single user story.

For scrum teams, it's really important to have a solid definition of what "done" means. They work in sprints, and need some way of deciding whether a user story is actually finished. It's no good ending a sprint with a user story that meets all its acceptance criteria, but had no code review, hasn't been tested and isn't deployable. Such a story is clearly not done. Scrum teams solve this by strictly defining "done". In this case, in addition to meeting the acceptance criteria, the story must also:

- Have had a code review.
- Have been tested.
- Be immediately deployable.

If this isn't the case at the end of the sprint then it isn't done — we can't count it's story points towards the sprint velocity and it needs to go on the backlog for the next sprint planning session.

### What does "done" actually mean, though?

Is a new feature "done" when it's in production and being used by customers? It might be. Equally, it might not. Have we published the changelog? Have we emailed our customers to tell them about the feature?

When is a technical improvement or refactoring "done"? We certainly don't want to email our customers about it, and we probably don't want to add it to the changelog.

The definition of "done" depends on the task.

Some teams get around this problem by having multiple definitions of "done" — one for bugfixes, another for features, another for technical tasks, and so on.

At CharlieHR, this seemed overly complex. We don't use scrum, and we don't work in iterations. But we still need a way to remind ourselves of the stuff that should be done before a task is considered finished. So we invented a checklist.

We use two definitions. The first is ready to merge. Everything in this checklist needs to be ticked off before the pull request is merged to the master branch. The second is actually done. Everything in this checklist must be ticked off before the card is moved to the Done column on our task boards.

It's worth noting that these rules apply to every single work item that goes through our task boards, so long as it involves code. Whether it's a large user story with multiple dependencies or a tiny bugfix, the person doing the work is expected to run through these checklists.

That doesn't mean that everything on the checklists has to be ticked off for every work item, though — a tiny technical improvement is unlikely to need a marketing email written about it, for example. It does mean that everything in the checklist must be considered for every work item. We trust our engineers to use their judgement.

While you're reading the DoD below, bear in mind…

- We use Trello for our task boards. Most teams have columns for backlog, next up, in progress and done.
- Technical improvements and exceptions begin life as GitHub issues. These get a trello card on the backlog when they are assigned to or picked up by a team. Bugs live in Sifter, and get a trello card when they're assigned to a team.
- The order in which the items below are considered is irrelevant, so long as they have all been considered.

I've made notes in italics, since some of the items need a bit of explanation.

**Ready to merge:**

- Kickoff done and requirements clear. Kickoff Document stored on Drive. _This is where we define our acceptance criteria and the scope of a new feature._
- Implementation Plan written and reviewed. _For non-trivial work items, engineers discuss and plan the technical solution._
- DPIA Form Completed. _Do we need to do a Data Protection Impact Assessment?_
- Card on Trello, properly labelled, sized and PR/Issue linked (mandatory).
- Pull Request open and properly labelled (mandatory). _We open a PR after the first commit to a branch._
- Acceptance criteria met. _Obviously. If changes to the requirements have been agreed with the product manager, have they been noted on the kickoff document or trello card?_
- Unit tests written.
- Functional specs written.
- Documentation folder reviewed for any changes/additions.
- Environment variables documented, added to secrets manager and present in staging & production environments.
- Analytics considered.
- "What's New" section updated.
- l18n reviewed. _All our copy (including microcopy) should live in locale files._
- Security & Data Protection Review (mandatory). _We take security seriously._
- Code Review from at least one other (mandatory).
- CodeClimate clear of errors.
- Feature Branch green on CI (mandatory).

**Actually done:**

- Merged to master and feature branch deleted (mandatory).
- Related GitHub Issues closed or updated.
- Sifter, Appsignal, and #tech-support issues closed.
- Manually tested on staging environment (mandatory).
- Deployed to production with no obvious errors/exceptions (mandatory).
- Release email sent. _We send a company-wide email for all non-trivial releases._
- Marketing document updated.
- Usage metrics checked/set up.
- Help pages updated.
- FINALLY, card moved to "done" on trello (mandatory).

You'll notice that some of the items are marked mandatory. Those must be done for every single work item. No exceptions. For a scrum purist, these are the only things that should appear in a Definition of Done. For us (right now), they are probably the least useful items on the list — they're all important enough that we'd remember to do them even if we didn't have a checklist!

At the moment, we're deliberately keeping our mandatory items to a minimum, though we have discussed making more stuff mandatory. As we continue to evolve our process, I expect we'll add items to support our current engineering goals.

If we were focussed on improving our unit test coverage, we might include an item that says "all new models and POROs must have an associated unit test".

If we were focussed on improving the quality of our codebase, we might insist that "every pull request must improve the CodeClimate quality rating".

We might even decide to make proof of business value a prerequisite for "done".

Currently though, we are focussed on building an awesome product, and while most pull requests include unit tests and quality improvements, it doesn't make sense to mandate that just now.

Our "Definition of Done" is designed to help us work better and faster, and will change and evolve alongside our business goals.

I'm constantly looking for ways to improve our process, so if you have any thoughts on this, drop me a line on twitter.
