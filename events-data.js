// ---------------------------------------------------------------------------
// EVENTS_CONFIG — the upcoming event dates. Shared between events.html
// (events.js) and index.html (script.js, for the "select your event(s)"
// step in the application flow) — load this file before either of those.
//
// There's no backend here, so this list is maintained by hand — add/remove
// dates as you schedule (or cancel) events. Location is deliberately vague
// (a neighborhood, not an address) — the exact spot is shared with
// pass-holders in the WhatsApp group, not posted publicly.
//
// Each event is { date: "YYYY-MM-DD", location, tag?, image? }. `tag` is an
// optional short badge (e.g. "+1 PARTY" for a launch/special date) and
// `image` an optional photo for that specific event — both omitted by
// default, only render when present.
// ---------------------------------------------------------------------------
const EVENTS_CONFIG = {
  events: [
    { date: "2026-09-06", location: "Copacabana", tag: "+1 PARTY" },
    { date: "2026-09-13", location: "Copacabana" },
    { date: "2026-09-20", location: "Copacabana" },
    { date: "2026-09-27", location: "Copacabana" },
    { date: "2026-10-04", location: "Copacabana" },
    { date: "2026-10-11", location: "Copacabana" },
  ],
};
