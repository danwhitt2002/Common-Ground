# Common-Ground
Find your common ground. A social club.

## Grounds Pass application page

A social club in Rio de Janeiro. The Grounds Pass (R$120) gets members into weekly events with coffee-based and matcha-based mocktails included.

Two static pages, no build step, no backend required:

- **`index.html` / `styles.css` / `script.js`** — the application landing page for the Instagram bio link. Flow: hero (with a small 🇬🇧/🇧🇷/🇪🇸 language switch in the top-right corner) → application questions (name, then multiple-choice/multi-select) → WhatsApp number/IG → a short "reviewing your application" beat → a "Thank You, under review" screen. Every question screen and the WhatsApp/IG screen has a **← Back** button, so applicants can revisit and change any earlier answer before submitting — their answers (and whatever they've typed into the WhatsApp/IG fields) are restored, not cleared, when they go back. Contact is collected as a WhatsApp number rather than an email — it's the more casual, on-brand way to reach someone, and it's what the approved/payment screen already uses. Applications aren't auto-approved — see **Payment** below for how someone actually gets to pay.
- **`menu.html` / `menu.js`** — the drinks menu page (linked from the landing and approved screens), showing what's included with the pass.

### Applications aren't auto-approved — how payment actually happens

Since applicants answer real, open-ended questions, there's no way to auto-decide who gets in — a person has to read the answers. So the public flow ends at a "Thank You, your application is under review" screen (`data-screen="pending"`), not at payment.

Once you've reviewed someone's application (check your Formspree inbox) and decided to let them in, send them **`yoursite.com/#approved`** — on WhatsApp (using the number they gave you), Instagram DM, wherever — and that link drops them straight onto the payment screen (`data-screen="approved"`), skipping the whole questionnaire. One tap from your message to the Pix QR code. No backend, no accounts, no per-person unique links — just the one shared hash link you send manually to whoever you've accepted.

That payment screen shows a **Pix QR code + copyable Pix key** to pay directly in any Brazilian bank app, then a **"Send Payment Proof on WhatsApp"** button so you can manually confirm and let them into the group. It's already set up:

- **Pix key**: `danwhitt2002@gmail.com` (`script.js` → `CONFIG.pixKey`, and baked into `assets/pix-qr.png`)
- **WhatsApp**: `+44 7830 067043` (`script.js` → `CONFIG.whatsappNumber`) — tapping the button opens a chat pre-filled with a message so they just attach their payment screenshot.

If you ever change the Pix key or the R$120 price, you'll need a new QR — regenerate `assets/pix-qr.png` (any Pix "BR Code" / EMV QR generator works, or ask me and I'll rebuild it) so it stays in sync with `CONFIG.pixKey`.

### Before you go live, edit `script.js` → `CONFIG`:

1. **`formEndpoint`** — already set to your Formspree endpoint (`https://formspree.io/f/mbgjrjnp`), so applications submit there automatically. They're also kept as a local-only backup in the browser's `localStorage` either way.
2. **`price`** — currently `R$120`, shown on the landing and approved screens (should match the amount encoded in the Pix QR).
3. **`instagramHandle`** — shown on the pending and approved screens.
4. **`questions`** — the application questions, in order. Each is `type: "choice"` (single-select, needs an `options` array, tapping one auto-advances), `type: "multi"` (multi-select — same `options` array, tap any number then hit Continue; set `hint` for a note like "Choose one or more"), or `type: "text"`/`"textarea"` (a free-response field — `"text"` is one short line like a name, `"textarea"` is a longer answer). A `"choice"` question can also set `writeIn` to the `en` value of one option (e.g. "Something else") — selecting it opens a text box instead of submitting right away, so you get a real answer instead of a vague catch-all; pair it with `writeInPlaceholder`. An optional `key` (e.g. `"name"`) surfaces that answer as its own field in the saved application, in addition to the full Q&A list.

### Languages — English, Português, Español

Three small flag buttons (🇬🇧/🇧🇷/🇪🇸) sit in the top-right corner of the landing screen — tapping one translates the entire application flow in place (every question, button, error message, and the contact/pending/approved screens) without navigating anywhere. Two places hold the translated text, both in `script.js`:

- **`CONFIG.questions`** — each question's `text`/`hint`/`placeholder`/`writeInPlaceholder`, and every entry in an `options` array, is an `{ en, pt, es }` object instead of a plain string. Add a fourth language by adding its key to each of these objects (and to `TRANSLATIONS` below) — nothing else needs to change structurally.
- **`TRANSLATIONS`** — every other on-screen string (landing copy, buttons, error messages, the pending/approved screens, the WhatsApp pre-filled message), one block per language, looked up by dot-path (e.g. `t("landing.apply")`). A handful of strings are templated with `{price}`/`{handle}`/`{current}`/`{total}` placeholders, filled in with a plain `.replace()` where they're used.

Multiple-choice answers are saved in whichever language the applicant used (so their own words come through), plus an `answerEn` field with the canonical English option text, so you can review applications consistently regardless of which language someone applied in. The saved application also includes a top-level `language` field. The direct `#approved` payment link (see below) always shows in English, since that path never touches the landing screen's flag switcher.

### Drinks menu — edit `menu.js` → `MENU_CONFIG`

Holds the real menu: **Matcha-Based**, **Coffee-Based**, and **Other**. Add/remove items and categories freely — the page renders whatever's in `MENU_CONFIG`. Each item also accepts an optional `description` and `tag` (e.g. "Seasonal") if you want to add tasting notes later. `addOns` and `footnote` are still supported (an add-on and a footnote were on the menu earlier and got cut) if you want to bring either back.

Every category and item currently renders as an `image` — cropped directly out of the real menu photo (`assets/menu/*.png`, background keyed transparent) instead of typed text, so the handwriting is pixel-exact rather than a font approximation. This only works for lines that exist in that source photo. A category or item added later without a matching photo (drop the `image` field) falls back to typed text in `Caveat`, the closest font match — still on-brand, just not pixel-exact.

Drink and category **names always stay in English** (they're that pixel-exact handwriting, or the plain-text fallback) — but `description`, `tag`, `note`, and `footnote` are translated, along with the rest of the page (eyebrow, lede, back link, footer). Each of those fields can be a plain string (shown as-is in every language — fine for a quick addition) or an `{ en, pt, es }` object for a real per-language version, same pattern as `CONFIG.questions` in `script.js`. The chosen language reaches this page via a `?lang=` URL param on the link from `index.html` (there's no other shared state between the two pages) — and the two links back to the application page carry it forward the same way, so going back and forth stays in sync.

### Brand identity

- **Colors** (`styles.css` → `:root`): deep cobalt blue background (`--bg`) with a warm tan/sand accent (`--accent`), matching the Common Ground drink-menu graphic.
- **Wordmark**: `assets/logo-common-ground.png` started as the *actual* "COMMON GROUND" logo cropped directly out of the drink-menu photo (background keyed to transparent), then had an extra hand-drawn pass applied on top — each letter nudged/tilted slightly, a couple of offset semi-transparent stroke copies layered in for a retraced-marker texture, a gentle elastic warp for overall wobble, and noise-roughened edges — so it reads as more organic/unique than the flat photo crop. Used once per page, centered in the topbar. If you ever get a proper vector/high-res version of the real logo, swap this file out (keep the same filename, or update the `<img src>` references in `index.html`/`menu.html`).
- **Community graphic**: `assets/community-graphic.png` — an abstract flame/swirl shape (flowing, wavy lobes curling around a rounded silhouette) rendered in loose burnt-orange watercolor (real painted texture: pigment variation, soft edges). Generated with an AI design tool rather than hand-coded shapes, cropped out of a larger design (the tool's own wordmark text was cropped away — this is the graphic only), background chroma-keyed to transparent to match the site's exact navy. Appears once per page, centered and fixed behind the content, on every screen of `index.html` and on `menu.html` alike (`.center-graphic` in `styles.css`) — adjust `width`/`opacity` there to resize or fade it, or swap the file for a different graphic (same filename, or update the `<img src>` references in both HTML files). Three earlier accents are still in the repo, unused, if you'd rather switch to one of them instead: `assets/people-holding-hands.png` (flat pictogram figures clasping hands), `assets/watercolor-flower.png` (a loop-petal flower), and `assets/watercolor-cup.png` (a soft-watercolour coffee cup). A watercolor huddle-of-people version used briefly before this one is no longer in the repo — it shared this same filename, so it's only recoverable from git history.
- **Fonts**: `Instrument Serif` for headlines/questions/price, `Inter` for body copy, labels, and buttons. `Caveat` (handwritten script) is the fallback font for any drinks-menu text that doesn't have a cropped photo (see above); it was originally used site-wide but pulled back after it read as too much everywhere else. All self-hosted as `.woff2` files in `assets/fonts/` (see `LICENSES.md` there) rather than loaded from Google Fonts, so the site never depends on an external font CDN to look right.

### Deploying

Any static host works — no server needed. Easiest options:

- **GitHub Pages**: Settings → Pages → deploy from this branch/root.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo; no build command needed.

Then put the deployed URL in your Instagram bio / reels.

