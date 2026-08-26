# Common-Ground
Find your common ground. A social club.

## Grounds Pass application page

A social club in Rio de Janeiro. The Grounds Pass (R$120) gets members into weekly events with coffee-based and matcha-based mocktails included.

Two static pages, no build step, no backend required:

- **`index.html` / `styles.css` / `script.js`** — the application landing page for the Instagram bio link. Flow: hero → 3 open-ended application questions → email/IG → a short "reviewing your application" beat → approved screen with a CTA to pay for the Grounds Pass.
- **`menu.html` / `menu.js`** — the drinks menu page (linked from the landing and approved screens), showing what's included with the pass.

### Payment: Pix + WhatsApp

There's no payment processor in the loop — Pix has no Stripe-style API here, so the approved screen shows a **Pix QR code + copyable Pix key** to pay directly in any Brazilian bank app, then a **"Send Payment Proof on WhatsApp"** button so you can manually confirm and let them into the group. It's already set up:

- **Pix key**: `danwhitt2002@gmail.com` (`script.js` → `CONFIG.pixKey`, and baked into `assets/pix-qr.png`)
- **WhatsApp**: `+44 7830 067043` (`script.js` → `CONFIG.whatsappNumber`) — tapping the button opens a chat pre-filled with a message so they just attach their payment screenshot.

If you ever change the Pix key or the R$120 price, you'll need a new QR — regenerate `assets/pix-qr.png` (any Pix "BR Code" / EMV QR generator works, or ask me and I'll rebuild it) so it stays in sync with `CONFIG.pixKey`.

### Before you go live, edit `script.js` → `CONFIG`:

1. **`formEndpoint`** — already set to your Formspree endpoint (`https://formspree.io/f/mbgjrjnp`), so applications submit there automatically. They're also kept as a local-only backup in the browser's `localStorage` either way.
2. **`price`** — currently `R$120`, shown on the landing and approved screens (should match the amount encoded in the Pix QR).
3. **`instagramHandle`** — shown on the approved screen.
4. **`questions`** — the 3 application questions. Each is `type: "choice"` (needs an `options` array, shown as tappable buttons) or `type: "text"`/`"textarea"` (a free-response field — `"text"` is one short line like a name, `"textarea"` is a longer answer). An optional `key` (e.g. `"name"`) surfaces that answer as its own field in the saved application, in addition to the full Q&A list.

### Drinks menu — edit `menu.js` → `MENU_CONFIG`

Holds the real menu: **Matcha-Based**, **Coffee-Based**, and **Other**, plus the cachaça add-on and the "product of Unique" footnote. Add/remove items, categories, or add-ons freely — the page renders whatever's in `MENU_CONFIG`. Each item also accepts an optional `description` and `tag` (e.g. "Seasonal") if you want to add tasting notes later.

### Brand identity

- **Colors** (`styles.css` → `:root`): deep cobalt blue background (`--bg`) with a warm tan/sand accent (`--accent`), matching the Common Ground drink-menu graphic.
- **Fonts**: `Permanent Marker` for the wordmark, `Caveat` (handwritten script) for headlines/questions/menu items, `Inter` for body copy, labels, and buttons — self-hosted as `.woff2` files in `assets/fonts/` (see `LICENSES.md` there) rather than loaded from Google Fonts, so the site never depends on an external font CDN to look right.

### Deploying

Any static host works — no server needed. Easiest options:

- **GitHub Pages**: Settings → Pages → deploy from this branch/root.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo; no build command needed.

Then put the deployed URL in your Instagram bio / reels.

