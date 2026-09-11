// ---------------------------------------------------------------------------
// EVENTS_CONFIG — the event dates. Shared between events.html (events.js)
// and index.html (script.js, for the "select your event" step in the
// application flow) — load this file before either of those.
//
// There's no backend here, so this list is maintained by hand — add/remove
// dates as you schedule (or cancel) events. `location` is kept as data for
// your own reference but isn't shown publicly on the cards — the exact spot
// is shared with pass-holders in the WhatsApp group, not posted here.
//
// - `events` — upcoming dates. Shown on events.html and selectable on the
//   application flow's select-event step. Move an entry to `pastEvents`
//   (below) once it's happened.
// - `pastEvents` — dates that already happened. Shown on events.html as a
//   recap section only — never selectable in the application flow.
//
// Each entry is { date: "YYYY-MM-DD", location, title?, tag?, image? }:
// - `title` (optional) — a prominent headline for a special date, e.g.
//   "LAUNCH PARTY: Bring a +1". Omit for a normal, date-only event.
// - `tag` (optional) — a short badge shown above the date, e.g. "+1 PARTY".
// - `image` (optional) — a photo for that specific event, filling the
//   square card (e.g. "assets/events/launch-party.jpg" — already used
//   below) — crop it square, add your own branding, drop the file in
//   assets/events/, and reference it here. Omit for no photo.
// ---------------------------------------------------------------------------
const EVENTS_CONFIG = {
  events: [
    { date: "2026-09-27", location: "Copacabana" },
  ],
  pastEvents: [
    { date: "2026-09-06", location: "Copacabana", title: "LAUNCH PARTY: Bring a +1", image: "assets/events/launch-party.jpg" },
  ],
};
