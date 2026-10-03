// Shared behaviour for the reference pages: the top bar, the mode switches, the icon sprite
// and the "show markup" disclosure under each demo. Not part of the system.

const PAGES = [
  ['index.html', 'Overview'],
  ['foundations.html', 'Foundations'],
  ['elements.html', 'Elements'],
  ['components.html', 'Components'],
  ['examples/dashboard.html', 'Dashboard'],
  ['examples/form.html', 'Form'],
  ['examples/slides.html', 'Slides'],
  ['examples/social.html', 'Social images'],
]

// A handful of Lucide icons, used in demos as <svg class="icon" viewBox="0 0 24 24"><use href="#i-plus"/></svg>.
// In a real project paste the icon's paths straight into the <svg> instead.
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
  tag: '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.2 2.2m9.8 9.8 2.2 2.2m0-14.2-2.2 2.2m-9.8 9.8-2.2 2.2"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  panel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
}

const root = document.documentElement
const here = location.pathname.split('/').pop() || 'index.html'

document.body.insertAdjacentHTML(
  'afterbegin',
  `<svg hidden><defs>${Object.entries(ICONS).map(([name, paths]) => `<g id="i-${name}">${paths}</g>`).join('')}</defs></svg>
  <header class="doc-bar">
    <strong>House style</strong>
    <nav>${PAGES.map(([href, label]) => `<a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <fieldset class="segmented" data-control="theme">
      <label><input type="radio" name="doc-theme" value="" checked> Auto</label>
      <label><input type="radio" name="doc-theme" value="light"> Light</label>
      <label><input type="radio" name="doc-theme" value="dark"> Dark</label>
    </fieldset>
    <fieldset class="segmented" data-control="background">
      <label><input type="radio" name="doc-background" value="" checked> White</label>
      <label><input type="radio" name="doc-background" value="beige"> Beige</label>
    </fieldset>
  </header>`,
)

// The switches set data-theme and data-background on <html>, as a project would.
for (const group of document.querySelectorAll('[data-control]')) {
  group.addEventListener('change', (e) => {
    if (e.target.value) root.dataset[group.dataset.control] = e.target.value
    else delete root.dataset[group.dataset.control]
  })
}

// Under each demo, a disclosure showing the demo's own markup, so the code can't drift from what renders.
for (const demo of document.querySelectorAll('.doc-demo[data-markup]')) {
  const lines = demo.innerHTML.replace(/^\n+|\s+$/g, '').split('\n')
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length))
  const details = document.createElement('details')
  details.className = 'doc-markup'
  details.innerHTML = '<summary>Markup</summary><pre><code></code></pre>'
  details.querySelector('code').textContent = lines.map((l) => l.slice(indent)).join('\n')
  demo.after(details)
}

// Tabs need a little script to move the selection; the underline slides by itself.
for (const tabs of document.querySelectorAll('.tabs')) {
  tabs.addEventListener('click', (e) => {
    const tab = e.target.closest('[role=tab]')
    if (tab) for (const t of tabs.children) t.setAttribute('aria-selected', t === tab)
  })
}
