# Dan's Media Kit

A one-page UGC media kit for @dansdigitaldiaries. Plain HTML/CSS/JS — no build step.

## Editing content

Every placeholder is marked with a `<!-- TODO -->` comment and styled in
italic ("placeholder" class) so it's obvious what's still a stand-in. Open
`index.html` and fill in, top to bottom:

- **Hero tagline** — your one-line pitch
- **Stats** — follower count, avg. views, engagement rate, videos delivered (delete any stat you don't want to show)
- **About** — short bio + niche tags
- **Portfolio** — swap each card's `href="#"` for the real video/post link, replace
  the thumbnail placeholder text with a background image (or embed a TikTok/YouTube
  `<iframe>` in its place), and fill in the title/platform/views
- **Testimonials** — real quotes from brand partners, or delete the whole `<section id="testimonials">` if you don't have any yet
- **Packages** — swap "Inquire for pricing" for real numbers if you want pricing public
- **Contact** — real email address, and TikTok/YouTube links (or remove the ones you don't use)

Once a placeholder is filled in, remove the `placeholder` class from that element
so it renders in normal (not italic/dimmed) text.

## Colors

Palette lives in `:root` at the top of `styles.css`:

- `--navy-900` / `--navy-800` / `--navy-700` / `--navy-600` — background layers
- `--cream` — main text
- `--accent` — warm gold highlight (buttons, links, numbers)

Change `--accent` if you want a different highlight color; everything else derives from these variables.

## Deploying

This is a static site — any of these work with no config:

- **GitHub Pages**: enable Pages on this repo, set the source to this folder (or move the three files to the repo root / a `docs/` folder, per GitHub Pages' rules)
- **Netlify / Vercel**: drag-and-drop the `media-kit` folder, or connect the repo and set the publish directory to `media-kit`
- Point your custom domain (or the free subdomain the host gives you) — that's the link for your Instagram bio
