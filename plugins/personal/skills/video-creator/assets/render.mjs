// Example renderer. Copy it into the video project and adapt it; don't run it from the skill.
//
// Renders index.html (next to this script) to video frame by frame. The page must define:
//   window.DURATION  seconds
//   window.__ready   a promise that resolves once fonts and images are loaded
//   window.render(t) sets every element's state for time t (seconds)
//
//   node render.mjs                         -> out/video-silent.mp4
//   node render.mjs --fps 30 --workers 4    -> lower frame rate / fewer browsers
//   node render.mjs --from 20 --to 30       -> render a section only
//   node render.mjs --stills 3,12.5,40      -> out/stills/t-<time>.png at full size
//   node render.mjs --sheet 1               -> out/sheet.jpg, one frame per second
//   node render.mjs --sheet 0.05 --from 12 --to 12.6
//                                           -> out/sheet.jpg of one transition, to check motion
import { chromium } from 'playwright-core'
import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'

const dir = import.meta.dirname
const out = (...p) => path.join(dir, 'out', ...p)
const args = process.argv.slice(2)
const arg = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : def
}
const WIDTH = 1920
const HEIGHT = 1080

const browser = await chromium.launch()
async function openPage() {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  page.on('pageerror', (e) => console.error('page error:', e.message))
  page.on('console', (m) => m.type() === 'error' && console.error('console:', m.text()))
  await page.goto('file://' + path.join(dir, 'index.html'))
  await page.evaluate(() => window.__ready)
  return page
}

function ffmpeg(ffArgs) {
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...ffArgs], { stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

async function shoot(page, t, file, opts = {}) {
  await page.evaluate((t) => window.render(t), t)
  await page.screenshot({ path: file, ...opts })
}

const first = await openPage()
const duration = await first.evaluate(() => window.DURATION)
const from = +arg('from', 0)
const to = +arg('to', duration)

// Full-size stills for checking detail.
if (arg('stills')) {
  mkdirSync(out('stills'), { recursive: true })
  for (const t of arg('stills').split(',').map(Number)) {
    const file = out('stills', `t-${t.toFixed(2)}.png`)
    await shoot(first, t, file)
    console.log(file)
  }
  await browser.close()
  process.exit(0)
}

// A contact sheet: one small frame every `step` seconds, tiled six across and labelled with its time.
if (arg('sheet')) {
  const step = +arg('sheet')
  const tmp = out('sheet-frames')
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp, { recursive: true })
  const times = []
  for (let t = from; t < to + 1e-9; t += step) times.push(+t.toFixed(3))
  // Stamp each frame's time in the corner. Added outside render(t), so the video itself never shows it.
  await first.evaluate(() => {
    const el = document.createElement('div')
    el.id = '__sheet-label'
    el.style.cssText =
      'position:fixed;top:12px;left:12px;z-index:2147483647;padding:8px 18px;font:600 80px/1 ui-monospace,monospace;color:#fff;background:rgb(0 0 0 / 0.65);border-radius:6px'
    document.body.append(el)
  })
  for (const [i, t] of times.entries()) {
    await first.evaluate((t) => (document.getElementById('__sheet-label').textContent = `${t}s`), t)
    await shoot(first, t, path.join(tmp, `${String(i).padStart(4, '0')}.jpg`), { type: 'jpeg', quality: 85 })
  }
  await browser.close()
  const cols = 6
  ffmpeg([
    '-i', path.join(tmp, '%04d.jpg'),
    '-vf', `scale=480:-1,tile=${cols}x${Math.ceil(times.length / cols)}:padding=4:color=black`,
    '-frames:v', '1', '-q:v', '3',
    out('sheet.jpg'),
  ]) // prettier-ignore
  rmSync(tmp, { recursive: true })
  console.log(out('sheet.jpg'), `(${times.length} frames)`)
  process.exit(0)
}

// Full render: each worker takes a contiguous chunk of frames in its own page.
const fps = +arg('fps', 60)
const workers = +arg('workers', 6)
const firstFrame = Math.round(from * fps)
const total = Math.round(to * fps) - firstFrame
const framesDir = out('frames')
rmSync(framesDir, { recursive: true, force: true })
mkdirSync(framesDir, { recursive: true })

let done = 0
const started = Date.now()
const chunk = Math.ceil(total / workers)
await Promise.all(
  Array.from({ length: workers }, async (_, w) => {
    const page = w === 0 ? first : await openPage()
    for (let f = w * chunk; f < Math.min((w + 1) * chunk, total); f++) {
      const file = path.join(framesDir, `${String(f).padStart(5, '0')}.jpg`)
      await shoot(page, (firstFrame + f) / fps, file, { type: 'jpeg', quality: 94 })
      if (++done % 120 === 0) console.log(`${done}/${total} frames (${((Date.now() - started) / 1000).toFixed(0)}s)`)
    }
  })
)
await browser.close()

const file = out(arg('out', 'video-silent.mp4'))
ffmpeg([
  '-framerate', String(fps),
  '-i', path.join(framesDir, '%05d.jpg'),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  file,
]) // prettier-ignore
rmSync(framesDir, { recursive: true }) // hundreds of MB at 60fps
console.log(file)
