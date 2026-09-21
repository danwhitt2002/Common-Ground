# Common-Ground
Find your common ground. A social club.

## Common Ground application page

A social club in Rio de Janeiro. Applicants choose between a **Single Event Pass** (R$40 — a one-off, "try us out" ticket into a single event) and a **Grounds Pass** (R$100/month — the main product: every event that month, plus Inner Circle, the invite-only WhatsApp group's day-to-day meetups and curated brand discounts). Coffee-based and matcha-based mocktails are included on every plan, every time.

Three static pages, no build step, no backend required:

- **`index.html` / `styles.css` / `script.js`** — the application landing page for the Instagram bio link. Flow: hero (with a small 🇬🇧/🇧🇷/🇪🇸 language switch in the top-right corner) → application questions (name, then multiple-choice/multi-select) → WhatsApp number/IG → a short "reviewing your application" beat → **select which event(s) you're actually paying for** → the payment screen. Every question screen, the WhatsApp/IG screen, and the select-event screen has a **← Back** button, so applicants can revisit and change any earlier answer before submitting — their answers (and whatever they've typed into the WhatsApp/IG fields) are restored, not cleared, when they go back. Contact is collected as a WhatsApp number rather than an email — it's the more casual, on-brand way to reach someone, and it's what the payment screen already uses.
- **`menu.html` / `menu.js`** — the drinks menu page (linked from the landing and payment screens), showing what's included with the pass.
- **`events.html` / `events.js`** — the upcoming-events page (linked from the landing screen), showing real dates before someone applies, so they know what they're actually paying for.
- **`events-data.js`** — just the `EVENTS_CONFIG` date list (see below), shared between `events.js` and `script.js` — loaded via its own `<script>` tag before either.

### Selecting which event you're paying for

Applicants used to buy a pass without knowing which date they'd actually get — the reviewing screen now leads to a **`data-screen="select-event"`** step first, showing the same upcoming dates as `events.html` (from the shared `EVENTS_CONFIG` in `events-data.js`) as tappable cards. Picking a date always maps to the **Single Event Pass**; the picked date then shows on the payment screen in place of the generic plan description, and gets included in the pre-filled WhatsApp payment-proof message, so you can see exactly which date someone paid for when they message you.

**Grounds Pass** and **Founding Member** both skip this screen instead, via their own links below the date cards — neither is tied to a specific announced date up front: a Grounds Pass is bought now and covers every event announced during that paid month (see "Three plans" below for how it's tracked), and Founding Member is a lifetime pass with no dates at all.

The direct payment-screen shortcut (`yoursite.com/#approved`, see below) still works exactly as before and skips this step too — it falls back to the generic plan copy since no date was picked.

### How payment actually happens

There's no manual approval gate — an in-between step between applying and paying loses people, so the flow goes straight from the questionnaire to the payment screen (`data-screen="approved"`), by way of the select-event step above. The short "reviewing your application…" beat plays for a couple of seconds while the answers are actually submitted, then it moves on automatically.

The application itself is still saved in full (to your Formspree inbox, plus a local-only backup in the browser), so you can read every answer and follow up on WhatsApp afterwards if someone isn't a fit — nothing here auto-adds anyone to the group itself, it just gets them to the Pix QR without waiting on you first.

You can also send that same payment screen directly to anyone at any time: **`yoursite.com/#approved`** — on WhatsApp, Instagram DM, wherever — drops them straight onto it, skipping the whole questionnaire. Handy for a friend you're waving in without the form, or for resending the payment step to someone who dropped off. No backend, no accounts, no per-person unique links — just the one shared hash link.

That payment screen shows a **Pix QR code + copyable Pix key** to pay directly in any Brazilian bank app, then a **"Send Payment Proof on WhatsApp"** button so you can manually confirm and let them into the group. It's already set up:

- **Pix key**: `04409638777` (CPF) (`script.js` → `CONFIG.pixKey`, and baked into `assets/pix-qr.png`)
- **WhatsApp**: `+44 7830 067043` (`script.js` → `CONFIG.whatsappNumber`) — tapping the button opens a chat pre-filled with a message so they just attach their payment screenshot.

If you ever change the Pix key or any price, you'll need new QRs — regenerate `assets/pix-qr.png` (Single Event Pass), `assets/pix-qr-monthly.png` (Grounds Pass), and `assets/pix-qr-founding.png` (Founding Member) (any Pix "BR Code" / EMV QR generator works, or ask me and I'll rebuild them) so they stay in sync with `CONFIG.pixKey`.

### A second and third way to pay: PayPal and Wise

Pix only works for people with a Brazilian bank account, which shuts out international applicants — so the payment screen also has a **Pix / PayPal / Wise** toggle (`script.js` → the `.payment-btn` handlers) sitting next to the plan toggle. Switching it swaps the price shown and the payment card below, without navigating anywhere or losing the chosen plan.

- **Pix and Wise** both show a **QR code + copyable fallback value** (Pix key / Wise tag), same layout — scan to pay the exact amount for whichever plan is selected, or copy the value and enter it by hand.
- **PayPal** shows a single tappable **"Pay with PayPal →"** button instead of a QR, since it's a link meant to be tapped on the same phone rather than scanned from a second device.

Details:

- **PayPal**: `CONFIG.paypalLink` — a [PayPal.me](https://paypal.me) link (`paypal.me/commongroundbr`). PayPal.me supports the amount directly in the URL (`/12GBP`), so each plan's exact link is built automatically. (An earlier PayPal "Request Money" link was deliberately *not* used here — those expire and aren't meant for repeat payers; PayPal.me links don't expire and work for anyone.)
- **Wise**: `CONFIG.wiseLink` — a personal Wise pay-me link (`wise.com/pay/me/danielthomasw81`), with the amount appended as `?amount=X&currency=GBP` — confirmed working directly in the Wise app (it shows the right amount pre-filled on the "Scan to pay" screen). `CONFIG.wiseTag` (`@danielthomasw81`) is the copyable fallback shown under the QR. Each plan gets its own QR image (`assets/wise-qr.png`, `-monthly`, `-founding`) encoding that plan's exact link — regenerate them with any QR generator (or ask me) if you ever change the tag or `CONFIG.gbpAmount`.

Both are priced in **GBP** rather than Reais (`CONFIG.gbpAmount` — currently £6 single / £15 monthly / £100 Founding Member) since that's the currency the PayPal/Wise accounts actually settle in — pricing directly in GBP avoids paying for two currency conversions (payer's currency → BRL → GBP) instead of one. Update `CONFIG.gbpAmount` if you ever reprice (and regenerate the Wise QRs to match).

The pre-filled WhatsApp message also names which method was used ("paid via PayPal") so you can tell at a glance which inbox to check for the payment when confirming someone on WhatsApp.

### Two WhatsApp groups: standard (public) and Inner Circle (invite-only)

There are two separate Common Ground WhatsApp groups, not one:

- **Standard group** — general community chat, open to anyone. Its invite link is **public**, shown right on the landing page (`CONFIG.standardGroupLink` in `script.js`) as a tappable "Common Ground Community Groupchat →" link (`landing.communityLede`/`landing.communityLink`) — no application or payment needed, anyone visiting the site can join directly.
- **Inner Circle** (Common Ground: Inner Circle) — everything the standard group has, plus access to fortnightly events *and* day-to-day meetups announced during the week (five a.m. runs, beach days, co-working sessions, that kind of thing). **Invite-only**: **Grounds Pass** and **Founding Member** holders get this one.

The payment screen tells applicants this via `TRANSLATIONS.<lang>.approved.groupNote` (it points Single Event Pass holders back to the public link on the homepage, and promises Grounds Pass/Founding Member holders Inner Circle once they've paid). Since there's no backend here to confirm payment actually happened, the *Inner Circle* invite still isn't handed out automatically — that part is still on you: once you get their payment proof on WhatsApp, reply with Inner Circle's invite link (WhatsApp → the group → Group Info → Invite to Group via Link).

If you ever change/regenerate the standard group, update `CONFIG.standardGroupLink` to match.

### Partner brand discounts

The landing page's fourth perk bullet (`landing.perks.brands` — "Curated discounts across a handpicked lineup of brands that share our aesthetic") teases discount codes from outside brands, without naming them or publishing the actual codes — same reasoning as the event address: keep it vague publicly, hand over specifics only to people who've actually paid, via Inner Circle.

Current partner deals (not stored anywhere else — keep this list updated as you add or drop partners):

- **NAVEIA** (oat milk, Rio de Janeiro) — 20% off at checkout on their site with code `COMMONGROUND20`.

Since there's no backend, there's no way to gate this automatically — post the code(s) in Inner Circle's group description or pinned message so Grounds Pass and Founding Member holders can find it themselves, rather than sending it out one-by-one.

### Refer a friend — 20% off a Single Event Pass, automatic but honor-based

The landing page has a "Refer a Friend" card (below the stats row) explaining that if an existing applicant refers a friend, both get 20% off a Single Event Pass (`CONFIG.price` → `CONFIG.referralPrice`, currently R$40 → R$32). The application's contact screen has a matching optional **"Referred by"** text field.

The moment someone fills that field in, the payment screen **automatically** swaps to the discounted price and a separate discounted QR (`assets/pix-qr-referral.png` / `assets/wise-qr-referral.png`) — no need to message you first and wait for confirmation, they can pay straight away. This only applies to the Single Event Pass; picking Grounds Pass or Founding Member instead ignores the referral field entirely (`isReferralDiscountActive()` in `script.js` checks `state.plan === "single"`).

**This is honor-based, deliberately** — there's no backend or accounts here, so nothing verifies the named referrer is real; anyone could type any name into that field and get the discount immediately. That trade-off was made on purpose to keep the payment flow frictionless (pay immediately, not "message first, wait for us to confirm, then pay"). The mitigation: every submitted application still records whatever was typed in "Referred by" (it flows straight into your Formspree inbox like every other field), so you can spot-check afterwards — a name that's clearly made up, or the same name showing up suspiciously often, is visible to you after the fact even though it wasn't blocked up front.

The **referrer's own 20% off is not automated at all** — they aren't filling out a new application, so there's no field for them to trigger anything. You'll need to remember to honor that side by hand (a note, a tally, whatever you already use to track Founding Member spots) the next time they book a Single Event Pass.

If you ever reprice, update `CONFIG.referralPrice` and `CONFIG.gbpAmount.referral` and regenerate both referral QR codes to match.

### Discount codes — checkout-entered, easy to add/swap/retire

The payment screen has a discount code field (shown only for Single Event Pass, right in the price card). Codes live in `CONFIG.discountCodes` — an object keyed by the code text (matched case-insensitively), each with its own `price` and `gbp` amount:

```js
discountCodes: {
  COMMONGROUND30: { price: "R$30", gbp: 5 },
},
```

To add a new code, add a new key. To retire one, delete its key. To reprice one, just edit its `price`/`gbp`. Nothing else in the code needs to change.

Applying a valid code swaps the price and QR (`assets/pix-qr-discount.png` / `assets/wise-qr-discount.png`) immediately, same as the referral discount above — **if you add more than one code with different prices, you'll need separate QR images per price** (the current setup assumes a single active discount price at a time; rename/duplicate the QR files and adjust `discountPixQr`/`discountWiseQr` in `script.js` if you ever run two differently-priced codes simultaneously). If someone has both a referral name and a valid code entered, the code takes priority.

**Tracking redemptions**: there's no backend here, so there's no live usage counter. Instead, whichever code was applied gets appended to the pre-filled WhatsApp payment-proof message (`approved.whatsappDiscountSuffix`) — search your WhatsApp chat for the code text (e.g. "COMMONGROUND30") to count how many times it's actually been redeemed.

### Three plans: Grounds Pass, Single Event Pass, or Founding Member

**Grounds Pass is the main product** — the payment screen leads with it: it's first in the plan toggle, carries a "Recommended" badge (`approved.recommendedLabel`, a small pill on the plan button — see `.plan-btn-badge` in `styles.css`), and is what's pre-selected by default (`state.plan` defaults to `"monthly"` in `script.js`) for anyone landing directly on the payment screen via the `#approved` shortcut. **Single Event Pass is framed as the trial option** — its own sub-copy says "Try us out" (`approved.plans.single.sub`) — for people who want to test the club before committing to a month.

The payment screen lets someone pay for a **Grounds Pass** (`CONFIG.monthlyMembershipPrice`, R$100 — every event that month, plus Inner Circle), a **Single Event Pass** (`CONFIG.price`, R$40 — this event only, plus the standard WhatsApp group), or **Founding Member** (`CONFIG.foundingMemberPrice`, R$699 — a one-time payment for lifetime access, plus Inner Circle) — each with its own QR code and Pix amount, and its own pre-filled WhatsApp message so you can tell which one someone paid for. Reached the normal way, Single Event Pass comes from picking a date on the select-event step above; Grounds Pass and Founding Member both come from their own skip links there instead — picking a date always overrides the default back to Single Event Pass, since that's an explicit, deliberate choice.

There's no backend or accounts here, so **Grounds Pass renewal, and spot-tracking for Founding Member, are on you to track manually** — e.g. a running tally against their name (a note, a spreadsheet, whatever you're already using to manage the WhatsApp groups), since the site itself has no way to know when someone's paid month is up, or to hand out live-assigned Founding Member numbers. There's no recurring billing here either — a Grounds Pass is a one-off Pix/PayPal/Wise payment for one month's access, same as Founding Member is a one-off payment for lifetime access; you note when someone's month is up and follow up for the next payment when it comes due.

Internally, the code still calls this tier `"monthly"` throughout (`state.plan`, `CONFIG.monthlyMembershipPrice`, element ids like `plan-btn-monthly`) — that's just the technical/implementation name for "the monthly membership tier." Every user-facing string calls it "Grounds Pass."

#### Founding Member — a deliberately limited lifetime pass

Capped at `CONFIG.foundingMemberSpotsTotal` (currently 20) to keep it exclusive rather than an open-ended giveaway. The payment screen shows a badge like "20 of 20 spots left," pulled from `CONFIG.foundingMemberSpotsRemaining` — **decrement that number yourself** each time one sells (edit `script.js`), since there's no backend to track it live. The actual member number (e.g. "You're Founding Member 4/20!") is something you tell them yourself when you confirm their payment on WhatsApp — the site has no way to assign that safely in real time (two people loading the page at once would have no shared counter to draw from).

### Before you go live, edit `script.js` → `CONFIG`:

1. **`formEndpoint`** — already set to your Formspree endpoint (`https://formspree.io/f/mbgjrjnp`), so applications submit there automatically. They're also kept as a local-only backup in the browser's `localStorage` either way.
2. **`price`** / **`monthlyMembershipPrice`** / **`foundingMemberPrice`** — currently `R$40` per event (Single Event Pass), `R$100` for the Grounds Pass, and `R$699` for Founding Member, shown on the landing and payment screens (should match the amounts encoded in the three Pix QRs). **`referralPrice`** (currently `R$32`) is the discounted Single Event Pass price for the "Refer a Friend" perk, and **`discountCodes`** holds the checkout discount codes — see both sections above.
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

### Events — edit `events-data.js` → `EVENTS_CONFIG`

Holds two lists: `events` (upcoming — shown on `events.html` and selectable on the application flow's select-event step, so applicants can see and pick a real date before they pay rather than paying blind) and `pastEvents` (already happened — shown on `events.html` as a recap section only, never selectable in the application flow). There's no backend here either, so **both lists are maintained by hand**: move an entry from `events` to `pastEvents` once it's happened, add a new one as you schedule it, delete one you've cancelled — both pages pick up the change automatically.

Each entry is `{ date: "YYYY-MM-DD", location, title?, tag?, image? }`:

- **`date`** — formatted automatically into each language's locale (e.g. "Sunday, 6 September" / "domingo, 6 de setembro" / "domingo, 6 de septiembre").
- **`location`** — currently just `"Copacabana"` on every date. Kept as data for your own reference but **not shown on the cards publicly** — the exact spot is only shared with pass-holders in the WhatsApp group once they've paid.
- **`title`** (optional) — a prominent headline for a special date, e.g. `"LAUNCH PARTY: Bring a +1"` (see `.event-card-title` in `styles.css`). Omit it for a normal, date-only event.
- **`tag`** (optional) — a short badge shown above the date, e.g. `"+1 PARTY"` for a launch or special date. Omit it for a normal event.
- **`image`** (optional) — a photo for that specific event, filling the square card (crop it square, add your own branding, drop the file in `assets/`, e.g. `assets/events/launch-party.png`, and reference it here). Omit it for no photo.

Translated strings (`back`, `eyebrow`, `lede`, `pastEventsHeading`, `applyLink`) live in `EVENTS_TRANSLATIONS` in `events.js`, same `{ en, pt, es }` pattern as everywhere else. `lede` ("Carioca time, every time") is the page's one tagline, shown once at the top — it used to repeat on every individual event card, but that read as redundant once it was already established up top. The "Past Events" heading and section only render when `pastEvents` has at least one entry. The chosen language reaches this page the same way `menu.html` does — a `?lang=` URL param on the link from `index.html`.

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

