# interalia Website

Website for [interalia](https://interalia.host) - a fiscal host for civil society organizations.

Built with [Hugo](https://gohugo.io/) and [Tailwind CSS v4](https://tailwindcss.com/), with content management via [DecapCMS](https://decapcms.org/).

## Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **Hugo Extended** 0.154.3+ ([Installation guide](https://gohugo.io/installation/))

### Installing Hugo

**macOS:**
```bash
brew install hugo
```

**Linux (Debian/Ubuntu):**
```bash
# Download the latest .deb from GitHub releases
wget https://github.com/gohugoio/hugo/releases/download/v0.154.3/hugo_extended_0.154.3_linux-amd64.deb
sudo dpkg -i hugo_extended_0.154.3_linux-amd64.deb
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
| `npm run build` | Build for production |
| `npm run css:build` | Build and minify Tailwind CSS |
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
│   ├── style.css       # Compiled CSS (generated)
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

### Colors

Custom colors are defined in `assets/tailwind.css`:
- `green-*` - Green color palette
- `orange-*` - Orange color palette

### Fonts

The site uses:
- **DM Sans** - Body text (`font-sans`)
- **Platypi** - Headings (`font-serif`)

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to `main`:

- **Production**: Deploys to [interalia.host](https://interalia.host)
- **PR Previews**: Each PR gets a preview at `interalia-host.github.io/website/pr-preview/pr-{number}/`

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

- **Single Pages** - Main pages (About, Service, Network, etc.)
- **Site Settings** - Global site configuration
- **Blog Posts** - Reports and articles
- **Team Members** - Team and board member profiles
- **Hero Section** - Homepage hero content
- **Network** - Studios, funders, collaborators

### Media Uploads

Upload files via the CMS:
- Files are stored in `static/media/uploads/`
- Referenced at `/media/uploads/filename`
