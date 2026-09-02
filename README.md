# Common-Ground
Find your common ground. A social club.

## Grounds Pass application page

A social club in Rio de Janeiro. The Grounds Pass (R$80 per event) gets members into that week's event, with coffee-based and matcha-based mocktails included.

Three static pages, no build step, no backend required:

- **`index.html` / `styles.css` / `script.js`** — the application landing page for the Instagram bio link. Flow: hero (with a small 🇬🇧/🇧🇷/🇪🇸 language switch in the top-right corner) → application questions (name, then multiple-choice/multi-select) → WhatsApp number/IG → a short "reviewing your application" beat → straight into the payment screen. Every question screen and the WhatsApp/IG screen has a **← Back** button, so applicants can revisit and change any earlier answer before submitting — their answers (and whatever they've typed into the WhatsApp/IG fields) are restored, not cleared, when they go back. Contact is collected as a WhatsApp number rather than an email — it's the more casual, on-brand way to reach someone, and it's what the payment screen already uses.
- **`menu.html` / `menu.js`** — the drinks menu page (linked from the landing and payment screens), showing what's included with the pass.
- **`events.html` / `events.js`** — the upcoming-events page (linked from the landing screen), showing real dates before someone applies, so they know what they're actually paying for.

### How payment actually happens

There's no manual approval gate — an in-between step between applying and paying loses people, so the flow goes straight from the questionnaire to the payment screen (`data-screen="approved"`). The short "reviewing your application…" beat plays for a couple of seconds while the answers are actually submitted, then it lands on payment automatically.

The application itself is still saved in full (to your Formspree inbox, plus a local-only backup in the browser), so you can read every answer and follow up on WhatsApp afterwards if someone isn't a fit — nothing here auto-adds anyone to the group itself, it just gets them to the Pix QR without waiting on you first.

You can also send that same payment screen directly to anyone at any time: **`yoursite.com/#approved`** — on WhatsApp, Instagram DM, wherever — drops them straight onto it, skipping the whole questionnaire. Handy for a friend you're waving in without the form, or for resending the payment step to someone who dropped off. No backend, no accounts, no per-person unique links — just the one shared hash link.

That payment screen shows a **Pix QR code + copyable Pix key** to pay directly in any Brazilian bank app, then a **"Send Payment Proof on WhatsApp"** button so you can manually confirm and let them into the group. It's already set up:

- **Pix key**: `04409638777` (CPF) (`script.js` → `CONFIG.pixKey`, and baked into `assets/pix-qr.png`)
- **WhatsApp**: `+44 7830 067043` (`script.js` → `CONFIG.whatsappNumber`) — tapping the button opens a chat pre-filled with a message so they just attach their payment screenshot.

If you ever change the Pix key or any price, you'll need new QRs — regenerate `assets/pix-qr.png` (single), `assets/pix-qr-4pack.png` (4-pack), and `assets/pix-qr-founding.png` (Founding Member) (any Pix "BR Code" / EMV QR generator works, or ask me and I'll rebuild them) so they stay in sync with `CONFIG.pixKey`.

### WhatsApp group chat access comes with the pass

Access to the Common Ground WhatsApp group chat is included with any Grounds Pass (single or 4-pack) — it's not sold separately. The payment screen tells them this ("Once you're a pass-holder, we'll add you to the Common Ground WhatsApp group chat") but doesn't hand out the invite link itself, since there's no backend here to confirm payment actually happened. So it's on you: once you get their payment proof on WhatsApp, reply with your group's invite link (WhatsApp → the group → Group Info → Invite to Group via Link) to welcome them in as a pass-holder.

### Three plans: Single Pass, a 4-Pack, or Founding Member

The payment screen lets someone pick a **Single Pass** (`CONFIG.price`, R$80), a **4-Pack of Passes** (`CONFIG.fourPackPrice`, R$250 — a discount, like getting a 4th pass free), or **Founding Member** (`CONFIG.foundingMemberPrice`, R$699 — a one-time payment for lifetime access) — each with its own QR code and Pix amount, and its own pre-filled WhatsApp message so you can tell which one someone paid for. The 4-pack is deliberately not called "monthly" — events aren't strictly weekly, so it's framed as 4 passes good for any 4 events they choose to attend, whenever those land.

There's no backend or accounts here, so **redemption for the 4-pack, and spot-tracking for Founding Member, are on you to track manually** — e.g. a running tally against their name (a note, a spreadsheet, whatever you're already using to manage the WhatsApp group), since the site itself has no way to know how many of a 4-pack's passes someone's used, or to hand out live-assigned Founding Member numbers.

#### Founding Member — a deliberately limited lifetime pass

Capped at `CONFIG.foundingMemberSpotsTotal` (currently 20) to keep it exclusive rather than an open-ended giveaway. The payment screen shows a badge like "20 of 20 spots left," pulled from `CONFIG.foundingMemberSpotsRemaining` — **decrement that number yourself** each time one sells (edit `script.js`), since there's no backend to track it live. The actual member number (e.g. "You're Founding Member 4/20!") is something you tell them yourself when you confirm their payment on WhatsApp — the site has no way to assign that safely in real time (two people loading the page at once would have no shared counter to draw from).

### Before you go live, edit `script.js` → `CONFIG`:

1. **`formEndpoint`** — already set to your Formspree endpoint (`https://formspree.io/f/mbgjrjnp`), so applications submit there automatically. They're also kept as a local-only backup in the browser's `localStorage` either way.
2. **`price`** / **`fourPackPrice`** / **`foundingMemberPrice`** — currently `R$80` per event, `R$250` for the 4-pack, and `R$699` for Founding Member, shown on the landing and payment screens (should match the amounts encoded in the three Pix QRs).
3. **`instagramHandle`** — shown on the payment screen.
4. **`questions`** — the application questions, in order. Each is `type: "choice"` (single-select, needs an `options` array, tapping one auto-advances), `type: "multi"` (multi-select — same `options` array, tap any number then hit Continue; set `hint` for a note like "Choose one or more"), or `type: "text"`/`"textarea"` (a free-response field — `"text"` is one short line like a name, `"textarea"` is a longer answer). A `"choice"` question can also set `writeIn` to the `en` value of one option (e.g. "Something else") — selecting it opens a text box instead of submitting right away, so you get a real answer instead of a vague catch-all; pair it with `writeInPlaceholder`. An optional `key` (e.g. `"name"`) surfaces that answer as its own field in the saved application, in addition to the full Q&A list.

### Languages — English, Português, Español

Three small flag buttons (🇬🇧/🇧🇷/🇪🇸) sit in the top-right corner of the landing screen — tapping one translates the entire application flow in place (every question, button, error message, and the contact/payment screens) without navigating anywhere. Two places hold the translated text, both in `script.js`:

- **`CONFIG.questions`** — each question's `text`/`hint`/`placeholder`/`writeInPlaceholder`, and every entry in an `options` array, is an `{ en, pt, es }` object instead of a plain string. Add a fourth language by adding its key to each of these objects (and to `TRANSLATIONS` below) — nothing else needs to change structurally.
- **`TRANSLATIONS`** — every other on-screen string (landing copy, buttons, error messages, the payment screen, the WhatsApp pre-filled message), one block per language, looked up by dot-path (e.g. `t("landing.apply")`). A handful of strings are templated with `{price}`/`{handle}`/`{current}`/`{total}` placeholders, filled in with a plain `.replace()` where they're used.

Multiple-choice answers are saved in whichever language the applicant used (so their own words come through), plus an `answerEn` field with the canonical English option text, so you can review applications consistently regardless of which language someone applied in. The saved application also includes a top-level `language` field. The direct `#approved` payment link (see below) always shows in English, since that path never touches the landing screen's flag switcher.

### Drinks menu — edit `menu.js` → `MENU_CONFIG`

Holds the real menu: **Matcha-Based**, **Coffee-Based**, and **Other**. Add/remove items and categories freely — the page renders whatever's in `MENU_CONFIG`. Each item also accepts an optional `description` and `tag` (e.g. "Seasonal") if you want to add tasting notes later. `addOns` and `footnote` are still supported (an add-on and a footnote were on the menu earlier and got cut) if you want to bring either back.

Each item also accepts an optional **`playlistUrl`** — a link to that drink's curated playlist (Spotify or otherwise). When set, a "🎵 Listen on Spotify →" link shows up under that item's description; when it's not set (the default for all items right now — no real playlists exist yet), nothing shows. Add them as you make each playlist.

Every category and item currently renders as an `image` — cropped directly out of the real menu photo (`assets/menu/*.png`, background keyed transparent) instead of typed text, so the handwriting is pixel-exact rather than a font approximation. This only works for lines that exist in that source photo. A category or item added later without a matching photo (drop the `image` field) falls back to typed text in `Caveat`, the closest font match — still on-brand, just not pixel-exact.

Drink and category **names always stay in English** (they're that pixel-exact handwriting, or the plain-text fallback) — but `description`, `tag`, `note`, and `footnote` are translated, along with the rest of the page (eyebrow, lede, back link, footer). Each of those fields can be a plain string (shown as-is in every language — fine for a quick addition) or an `{ en, pt, es }` object for a real per-language version, same pattern as `CONFIG.questions` in `script.js`. The chosen language reaches this page via a `?lang=` URL param on the link from `index.html` (there's no other shared state between the two pages) — and the two links back to the application page carry it forward the same way, so going back and forth stays in sync.

### Upcoming events — edit `events.js` → `EVENTS_CONFIG`

Holds the list of upcoming event dates shown on `events.html`, so applicants can see an event is actually coming up before they pay — rather than paying blind. There's no backend here either, so **this list is maintained by hand**: add a new entry as you schedule an event, and delete one you've cancelled or that's already passed.

Each entry is `{ date: "YYYY-MM-DD", location, tag?, image? }`:

- **`date`** — formatted automatically into each language's locale (e.g. "Sunday, 6 September" / "domingo, 6 de setembro" / "domingo, 6 de septiembre").
- **`location`** — currently just `"Copacabana"` on every date. This is **deliberately vague** — a neighborhood, not an address — the exact spot is only shared with pass-holders in the WhatsApp group once they've paid, not posted publicly here. Keep it that way.
- **`tag`** (optional) — a short badge shown above the date, e.g. `"+1 PARTY"` for a launch or special date. Omit it for a normal event.
- **`image`** (optional) — a photo for that specific event, shown above the date. Omit it for no photo (the default for every date right now).

Translated strings (`back`, `eyebrow`, `lede`, `applyLink`) live in `EVENTS_TRANSLATIONS` in the same file, same `{ en, pt, es }` pattern as everywhere else. The chosen language reaches this page the same way `menu.html` does — a `?lang=` URL param on the link from `index.html`.

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

