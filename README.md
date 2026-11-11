# interalia Website

Website for [interalia](https://interalia.host) - a fiscal host for civil society organizations.

Built with [Hugo](https://gohugo.io/) and [Tailwind CSS v4](https://tailwindcss.com/), with content management via [DecapCMS](https://decapcms.org/).

## Prerequisites

- **Node.js** 22+ ([Download](https://nodejs.org/))
- **Hugo Extended** 0.169.0+ ([Installation guide](https://gohugo.io/installation/))

### Installing Hugo

**macOS:**
```bash
brew install hugo
```

**Linux (Debian/Ubuntu):**
```bash
# Download the latest .deb from GitHub releases
wget https://github.com/gohugoio/hugo/releases/download/v0.169.0/hugo_extended_0.169.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.169.0_linux-amd64.deb
```

**Windows:**
```bash
choco install hugo-extended
# or
winget install Hugo.Hugo.Extended
```

## Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/interalia-host/website.git
   cd website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   This runs both Tailwind CSS watch and Hugo server concurrently.

4. **Open in browser:**
   Visit [http://localhost:1313](http://localhost:1313)

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (CSS watch + Hugo server) |
| `npm run cms` | Start the local CMS proxy, then open http://localhost:1313/admin/ to edit files on disk without logging in |
| `npm run build` | Build for production |
| `npm run css:build` | Build and minify Tailwind CSS (`assets/style.css` is generated and not committed; `npm run dev`, `npm run build` and CI build it automatically) |
| `npm run css:watch` | Watch Tailwind CSS for changes |
| `npm run hugo:dev` | Start Hugo development server |
| `npm run hugo:build` | Build Hugo site |

## Project Structure

```
website/
├── archetypes/          # Content templates
├── assets/
│   ├── icons/          # FontAwesome SVG icons
│   ├── js/             # JavaScript files
│   ├── style.css       # Compiled CSS (generated, git-ignored)
│   └── tailwind.css    # Tailwind source
├── config/
│   └── _default/
│       └── params.yml  # Site parameters
├── content/            # Markdown content (multilingual)
├── data/               # YAML data files
├── i18n/               # Translations (en, de)
├── layouts/            # Hugo templates
│   ├── _default/       # Default layouts
│   ├── partials/       # Reusable components
│   └── shortcodes/     # Custom shortcodes
├── static/
│   ├── admin/          # DecapCMS configuration
│   ├── favicons/       # Favicon files
│   ├── fonts/          # Web fonts
│   └── media/          # Images and uploads
├── hugo.toml           # Hugo configuration
└── package.json        # Node.js dependencies
```

## Content Management

Content can be managed via:

1. **DecapCMS** - Visit [interalia.host/admin/](https://interalia.host/admin/) and log in with GitHub
2. **Direct editing** - Edit Markdown files in `content/` and YAML files in `data/`

### Multilingual Content

The site supports English (`en`) and German (`de`). Content files are named:
- `about.en.md` - English version
- `about.de.md` - German version

## Customization

### Colours

Brand colours are defined once in `assets/tailwind.css` (`@theme`) and used by name in templates:
`ink`, `cocoa`, `cream`, `blush`, `blush-light`, `blush-deep`, `sage`, `sage-deep`, `maroon`, `petal`
(e.g. `bg-blush`, `text-ink`, `fill-maroon`, `ring-ink/10`). Avoid hex values in templates.

### Fonts

- **DM Sans**: body text (`font-sans`)
- **Platypi**: headings (`font-serif`)

### Curved sections

Use `{{ partial "curve.html" (dict "fill" "fill-blush" "shape" "left") }}` directly above a block with the matching `bg-*` class. It scales with the page width, with no negative margins.

### Icons

Only a curated set of Font Awesome icons is kept in `assets/icons/{brands,solid}`. To add one, download its SVG from fontawesome.com into the same folder and add it to the icon list in `static/admin/hugo_shortcodes_decap_cms.js` and the team "Icon" select in `static/admin/config.yml`.

### Images

Uploads can be any size. `layouts/partials/img.html` resizes raster images and converts them to WebP at build time (with `srcset`/`sizes`). Use it instead of a raw `<img>` for anything under `/media/`.

### Social sharing

Every page gets a generated sharing card (`layouts/partials/og-image.html`, base image and fonts in `assets/og/`). Articles use their cover image instead.

### CMS live preview

`static/admin/preview-templates.js` renders CMS previews with the site's own CSS (published as `/preview.css`). Update it when you change a section's design.

## Deployment

GitHub Pages serves the `gh-pages` branch (Settings → Pages → Source: *Deploy from a branch*, `gh-pages` / root).

- **Production** (`.github/workflows/deploy.yml`): every push to `main` builds the site and publishes it to the root of `gh-pages` → [interalia.host](https://interalia.host).
- **PR previews** (`.github/workflows/preview.yml`): every pull request, including CMS drafts in the editorial workflow, is built to `gh-pages/pr-preview/pr-{number}/` → `https://interalia.host/pr-preview/pr-{number}/`. The link is posted as a PR comment and as a `deploy/preview` commit status, which powers the CMS "View preview" button. Previews are marked `noindex`, show a "Preview · PR #" badge, and are removed when the PR is closed. PRs from forks don't get a preview.

Templates must stay subpath-safe for previews: use `absURL`/`relURL` without a leading slash (`"media/x.png" | absURL`) or resource permalinks, never hard-coded `/…` paths.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## DecapCMS Guide

For content editors, see the sections below for detailed instructions on using DecapCMS.

### Logging In

1. Go to [interalia.host/admin/](https://interalia.host/admin/)
2. Log in with your GitHub account
3. You'll see the Collections view in the left sidebar

### Editorial Workflow

This site uses editorial workflow:
- New/edited content goes into "draft" state
- An admin reviews and approves changes
- Once approved, changes go live

### Available Collections

The sidebar is grouped into four sections:

- **Pages**
  - **Homepage**: hero, What we do, How we work, services teaser
  - **About page**: intro, mission, who we work with, "the change we want to see"
  - **Services page**: list of services
  - **Partner page**: all texts of the Partner page (English and Deutsch side by side)
  - **Page titles & menu**: titles, SEO summaries and menu position of About, Services and Resources
  - **Other pages**: Imprint, Privacy, Code of Conduct and any new text page
- **Articles & reports**: articles and downloadable PDF reports, both listed on the Resources page
- **People**: team and advisory council
- **Settings**: contact details and social links (Site settings) and small interface texts such as buttons and form labels (Interface text)

Sections stored as one file per language (for example the homepage sections) appear as separate "English" and "Deutsch" entries; everything else is edited side by side.

Sidebar group headings and icons are defined in `static/admin/index.html`, keyed by each collection's `name` in `static/admin/config.yml`.

### Media Uploads

Upload files via the CMS:
- Files are stored in `static/media/uploads/`
- Referenced at `/media/uploads/filename`
