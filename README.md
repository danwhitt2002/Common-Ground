# Common-Ground
Find your common ground. A social club.

## Grounds Pass application page

A social club in Rio de Janeiro. The Grounds Pass (R$120) gets members into weekly events with coffee-based and matcha-based mocktails included.

Two static pages, no build step, no backend required:

- **`index.html` / `styles.css` / `script.js`** — the application landing page for the Instagram bio link. Flow: hero → application questions (name, then multiple-choice/multi-select) → email/IG → a short "reviewing your application" beat → a "Thank You, under review" screen. Every question screen and the email/IG screen has a **← Back** button, so applicants can revisit and change any earlier answer before submitting — their answers (and whatever they've typed into the email/IG fields) are restored, not cleared, when they go back. Applications aren't auto-approved — see **Payment** below for how someone actually gets to pay.
- **`menu.html` / `menu.js`** — the drinks menu page (linked from the landing and approved screens), showing what's included with the pass.

### Applications aren't auto-approved — how payment actually happens

Since applicants answer real, open-ended questions, there's no way to auto-decide who gets in — a person has to read the answers. So the public flow ends at a "Thank You, your application is under review" screen (`data-screen="pending"`), not at payment.

Once you've reviewed someone's application (check your Formspree inbox) and decided to let them in, send them **`yoursite.com/#approved`** — by email, Instagram DM, wherever — and that link drops them straight onto the payment screen (`data-screen="approved"`), skipping the whole questionnaire. One tap from your message to the Pix QR code. No backend, no accounts, no per-person unique links — just the one shared hash link you send manually to whoever you've accepted.

That payment screen shows a **Pix QR code + copyable Pix key** to pay directly in any Brazilian bank app, then a **"Send Payment Proof on WhatsApp"** button so you can manually confirm and let them into the group. It's already set up:

- **Pix key**: `danwhitt2002@gmail.com` (`script.js` → `CONFIG.pixKey`, and baked into `assets/pix-qr.png`)
- **WhatsApp**: `+44 7830 067043` (`script.js` → `CONFIG.whatsappNumber`) — tapping the button opens a chat pre-filled with a message so they just attach their payment screenshot.

If you ever change the Pix key or the R$120 price, you'll need a new QR — regenerate `assets/pix-qr.png` (any Pix "BR Code" / EMV QR generator works, or ask me and I'll rebuild it) so it stays in sync with `CONFIG.pixKey`.

### Before you go live, edit `script.js` → `CONFIG`:

1. **`formEndpoint`** — already set to your Formspree endpoint (`https://formspree.io/f/mbgjrjnp`), so applications submit there automatically. They're also kept as a local-only backup in the browser's `localStorage` either way.
2. **`price`** — currently `R$120`, shown on the landing and approved screens (should match the amount encoded in the Pix QR).
3. **`instagramHandle`** — shown on the pending and approved screens.
4. **`questions`** — the 3 application questions. Each is `type: "choice"` (needs an `options` array, shown as tappable buttons) or `type: "text"`/`"textarea"` (a free-response field — `"text"` is one short line like a name, `"textarea"` is a longer answer). An optional `key` (e.g. `"name"`) surfaces that answer as its own field in the saved application, in addition to the full Q&A list.

### Drinks menu — edit `menu.js` → `MENU_CONFIG`

Holds the real menu: **Matcha-Based**, **Coffee-Based**, and **Other**. Add/remove items and categories freely — the page renders whatever's in `MENU_CONFIG`. Each item also accepts an optional `description` and `tag` (e.g. "Seasonal") if you want to add tasting notes later. `addOns` and `footnote` are still supported (an add-on and a footnote were on the menu earlier and got cut) if you want to bring either back.

Every category and item currently renders as an `image` — cropped directly out of the real menu photo (`assets/menu/*.png`, background keyed transparent) instead of typed text, so the handwriting is pixel-exact rather than a font approximation. This only works for lines that exist in that source photo. A category or item added later without a matching photo (drop the `image` field) falls back to typed text in `Caveat`, the closest font match — still on-brand, just not pixel-exact.

### Brand identity

- **Colors** (`styles.css` → `:root`): deep cobalt blue background (`--bg`) with a warm tan/sand accent (`--accent`), matching the Common Ground drink-menu graphic.
- **Wordmark**: `assets/logo-common-ground.png` started as the *actual* "COMMON GROUND" logo cropped directly out of the drink-menu photo (background keyed to transparent), then had an extra hand-drawn pass applied on top — each letter nudged/tilted slightly, a couple of offset semi-transparent stroke copies layered in for a retraced-marker texture, a gentle elastic warp for overall wobble, and noise-roughened edges — so it reads as more organic/unique than the flat photo crop. Used once per page, centered in the topbar. If you ever get a proper vector/high-res version of the real logo, swap this file out (keep the same filename, or update the `<img src>` references in `index.html`/`menu.html`).
- **Landing page accent**: `assets/people-holding-hands.png` — two flat pictogram figures clasping hands, symbolizing "common ground." Built from primitive shapes (head circle + torso trapezoid + limb lines), run through an elastic warp for hand-drawn wobble, reduced to just the outer silhouette via `cv2.findContours` (so it's one continuous outline, not a filled blob or separate crossing strokes), and filled flat solid orange (`#e06528`) — same block-color technique as the flower accent it replaced. Sits centered behind the hero content on `index.html` (`.landing-accent` in `styles.css`) at high opacity — adjust `top`/`left`/`width`/`opacity` there to reposition, or swap the file for a different accent. Two earlier accents (`assets/watercolor-flower.png`, a loop-petal flower matched to a reference photo; `assets/watercolor-cup.png`, a soft-watercolour coffee cup) are still in the repo, unused, if you'd rather switch back to either.
- **Fonts**: `Instrument Serif` for headlines/questions/price, `Inter` for body copy, labels, and buttons. `Caveat` (handwritten script) is the fallback font for any drinks-menu text that doesn't have a cropped photo (see above); it was originally used site-wide but pulled back after it read as too much everywhere else. All self-hosted as `.woff2` files in `assets/fonts/` (see `LICENSES.md` there) rather than loaded from Google Fonts, so the site never depends on an external font CDN to look right.

### Deploying

Any static host works — no server needed. Easiest options:

- **GitHub Pages**: Settings → Pages → deploy from this branch/root.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo; no build command needed.

Then put the deployed URL in your Instagram bio / reels.

