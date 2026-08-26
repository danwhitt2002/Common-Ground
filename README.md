# Common-Ground
Find your common ground. A social club.

## Grounds Pass application page

A single mobile-first landing page (`index.html`, `styles.css`, `script.js`) for the Instagram bio link. Flow: hero → 3 multiple-choice questions → name/email/IG → a short "reviewing your application" beat → approved screen with a CTA to pay for the Grounds Pass.

No build step, no backend required — just static files.

### Before you go live, edit `script.js` → `CONFIG`:

1. **`stripeLink`** — create a free [Stripe Payment Link](https://dashboard.stripe.com/payment-links) for the Grounds Pass price and paste the URL in. Until you do, the button shows a setup reminder instead of a broken checkout.
2. **`formEndpoint`** — where applications get saved. Easiest no-code option: [Formspree](https://formspree.io) (free tier, create a form, paste the endpoint URL, e.g. `https://formspree.io/f/abcdEFGH`). Leave blank and applications still get kept as a local-only backup in the browser's `localStorage`, but you won't see them anywhere.
3. **`price`** — currently `R$120`, shown on the landing and approved screens (should match your Stripe link's price).
4. **`instagramHandle`** — shown on the approved screen.
5. **`questions`** — the 3 multiple-choice questions and their answer options.

### Deploying

Any static host works — no server needed. Easiest options:

- **GitHub Pages**: Settings → Pages → deploy from this branch/root.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo; no build command needed.

Then put the deployed URL in your Instagram bio / reels.

