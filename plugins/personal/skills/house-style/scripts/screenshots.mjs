// Regenerates the reference screenshots in screenshots/ from the pages in pages/.
// Run it whenever the CSS or the pages change:
//
//   bun install          (once, for Playwright)
//   bun run screenshots
//
// Chromium won't launch inside the Claude Code sandbox, so run this outside it.
import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const out = new URL('screenshots/', root)

// Examples are shot whole. Reference pages are shot one section at a time, so each image stays
// small enough to read. Dark is the default look, so everything gets a dark shot; light is added
// where the mode changes what there is to see.
const EXAMPLES = [
  ['pages/examples/dashboard.html', 'example-dashboard', ['dark', 'light'], { width: 1280, height: 800 }],
  ['pages/examples/form.html', 'example-form', ['dark', 'light'], { width: 900, height: 800 }],
  ['pages/examples/slides.html', 'example-slides', ['dark'], { width: 1440, height: 800 }],
  ['pages/examples/social.html', 'example-social', ['dark'], { width: 1440, height: 800 }],
]
const REFERENCE = ['foundations', 'elements', 'components']
const LIGHT_SECTIONS = ['foundations-colour', 'elements-text', 'elements-forms', 'components-status', 'components-controls']

await rm(out, { recursive: true, force: true })
await mkdir(out)

const browser = await chromium.launch()
const open = async (path, viewport) => {
  const page = await browser.newPage({ viewport })
  page.on('pageerror', (e) => console.log(`${path}: ${e.message}`))
  await page.goto(new URL(path, root).href)
  await page.evaluate(() => document.fonts.ready)
  return page
}
const setMode = (page, mode) => page.evaluate((m) => (document.documentElement.dataset.theme = m), mode)
const save = (name) => {
  console.log(name)
  return new URL(name, out).pathname
}

for (const [path, name, modes, viewport] of EXAMPLES) {
  const page = await open(path, viewport)
  for (const mode of modes) {
    await setMode(page, mode)
    await page.screenshot({ path: save(`${name}-${mode}.png`), fullPage: true })
  }
  await page.close()
}

for (const name of REFERENCE) {
  const page = await open(`pages/${name}.html`, { width: 1440, height: 900 })
  // The sticky bar would otherwise sit on top of each section.
  await page.addStyleTag({ content: '.doc-bar { position: static }' })
  for (const section of await page.locator('.doc-section').all()) {
    const id = `${name}-${await section.getAttribute('id')}`
    for (const mode of LIGHT_SECTIONS.includes(id) ? ['dark', 'light'] : ['dark']) {
      await setMode(page, mode)
      await section.screenshot({ path: save(`${id}-${mode}.png`) })
    }
  }
  await page.close()
}
await browser.close()
