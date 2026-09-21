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
// Each entry is { date: "YYYY-MM-DD", location, title?, tag?, image?,
// imagePosition? }:
// - `title` (optional) — a prominent headline for a special date, e.g.
//   "LAUNCH PARTY: Bring a +1". Omit for a normal, date-only event.
// - `tag` (optional) — a short badge shown above the date, e.g. "+1 PARTY".
// - `image` (optional) — a photo for that specific event, filling the
//   square card (e.g. "assets/events/launch-party.jpg" — already used
//   below). The card itself is small (event cards sit 3-up in a grid), so
//   the thumbnail crop is really just a colorful accent — the full image
//   (whatever its shape) is always revealed uncropped when someone taps
//   it open. No need to pre-crop your file to square; drop in the photo
//   at whatever aspect ratio it actually is. Omit `image` entirely for no
//   photo.
// - `imagePosition` (optional) — CSS object-position for the square
//   thumbnail crop (e.g. "top", "center", "25% 20%") — useful for a
//   tall/wide `image` where the default center crop lands on a blank or
//   busy area. Defaults to "center" if omitted.
// ---------------------------------------------------------------------------
const EVENTS_CONFIG = {
  events: [
    { date: "2026-10-04", location: "Ipanema, Posto 9", title: "SUNDAY SOCIALS: Common Ground on the Beach", image: "assets/events/beach-social.jpg", imagePosition: "top" },
  ],
  pastEvents: [
    { date: "2026-09-06", location: "Copacabana", title: "LAUNCH PARTY: Bring a +1", image: "assets/events/launch-party.jpg" },
  ],
};
