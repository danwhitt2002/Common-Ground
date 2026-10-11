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
//   "LAUNCH PARTY: Bring a +1". Omit for a normal, date-only event. Use
//   "\n" for an explicit two-line title (e.g. a co-host credit on its own
//   line above the event name) — it wraps normally otherwise.
// - `tag` (optional) — a short badge shown above the date, e.g. "+1 PARTY".
// - `image` (optional) — a photo for that specific event (drop the file in
//   assets/events/ and reference it here, e.g.
//   "assets/events/launch-party.jpg"). On events.html, the upcoming event
//   is shown full width with no cropping, sized to fit the whole poster —
//   no need to pre-crop your file, any aspect ratio works. Past events
//   show as small, cropped squares instead (tap one to see the full
//   poster in the lightbox). Omit `image` entirely for no photo.
// - `imagePosition` (optional) — CSS object-position for the small,
//   cropped square thumbnail — used on events.html for past events, and
//   on the application flow's select-event step (script.js) for any
//   event. Has no effect on the upcoming event's full-width poster on
//   events.html, which is never cropped. Useful when the default center
//   crop lands on a blank or busy area (e.g. "top", "25% 20%"). Defaults
//   to "center" if omitted.
// ---------------------------------------------------------------------------
const EVENTS_CONFIG = {
  events: [
    { date: "2026-11-01", location: "Quiosque Dumaré/Casa Fuego, Copacabana", title: "Common Ground x Track & Field\nWellness Morning: COMMON GROUND ON THE BEACH", image: "assets/events/wellness-morning.jpg" },
  ],
  pastEvents: [
    { date: "2026-10-04", location: "Ipanema, Posto 9", title: "SUNDAY SOCIALS: Common Ground on the Beach", image: "assets/events/beach-social.jpg", imagePosition: "top" },
    { date: "2026-09-06", location: "Copacabana", title: "LAUNCH PARTY: Bring a +1", image: "assets/events/launch-party.jpg" },
  ],
};
