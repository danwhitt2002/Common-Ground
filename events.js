// EVENTS_CONFIG (the upcoming event dates) now lives in events-data.js,
// loaded via its own <script> tag before this file — shared with script.js,
// which uses the same list for the "select your event(s)" application step.

const EVENTS_TRANSLATIONS = {
  en: {
    back: "← Back",
    eyebrow: "Upcoming Events",
    lede: "Every Sunday · exact location shared with pass-holders in the WhatsApp group",
    pastEventsHeading: "Past Events",
    applyLink: "Ready to apply? Join Common Ground →",
    tagline: "Carioca time, every time",
    locale: "en-GB",
  },
  pt: {
    back: "← Voltar",
    eyebrow: "Próximos Eventos",
    lede: "Todo domingo · o local exato é compartilhado com os pass-holders no grupo do WhatsApp",
    pastEventsHeading: "Eventos Passados",
    applyLink: "Pronto(a) para se inscrever? Junte-se à Common Ground →",
    tagline: "Hora carioca, sempre",
    locale: "pt-BR",
  },
  es: {
    back: "← Atrás",
    eyebrow: "Próximos Eventos",
    lede: "Cada domingo · la ubicación exacta se comparte con los pass-holders en el grupo de WhatsApp",
    pastEventsHeading: "Eventos Pasados",
    applyLink: "¿Listo/a para solicitar? Únete a Common Ground →",
    tagline: "Hora carioca, siempre",
    locale: "es-ES",
  },
};

const eventsListEl = document.getElementById("events-list");
const pastEventsListEl = document.getElementById("past-events-list");
const pastEventsHeadingEl = document.getElementById("past-events-heading");

// Resolves the language to render in: the "?lang=" URL param (the real
// hand-off from index.html, a separate page/document); falling back to a
// shared `state.lang` if one exists in this scope (only true when events.js
// is concatenated alongside script.js into one page, as the trial bundle
// does — harmless no-op on the real, separate events.html); English otherwise.
function resolveEventsLang() {
  const requestedLang = new URLSearchParams(window.location.search).get("lang");
  if (Object.prototype.hasOwnProperty.call(EVENTS_TRANSLATIONS, requestedLang)) return requestedLang;
  if (typeof state !== "undefined" && state.lang) return state.lang;
  return "en";
}

// Renders the whole page for the current language. Callable more than
// once — the trial bundle's merged single-page app calls this again each
// time the "events" screen is shown, so a language switched after that
// screen was first built still comes through.
function renderEventsPage() {
  const lang = resolveEventsLang();
  document.documentElement.lang = lang;
  const t = EVENTS_TRANSLATIONS[lang];

  // Guarded (not an unconditional assignment): in the standalone events.html
  // this only ever matches this page's own three data-i18n elements, but in
  // the merged single-page trial bundle it would also match every data-i18n
  // element from script.js's/menu.js's screens — t[key] correctly returns
  // undefined for those, so skip rather than blank them.
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = t[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  // events-logo-link only exists on the real, standalone events.html — the
  // trial bundle's merged single-page app reuses the shared header's
  // logo-link (a showScreen("landing") call) for every screen instead.
  ["events-back-link", "events-apply-link", "events-logo-link"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = `index.html?lang=${lang}`;
  });

  const dateFormatter = new Intl.DateTimeFormat(t.locale, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

  // Shared by both the upcoming and past-events lists below. Past events
  // skip the "Carioca time, every time" tagline — it's forward-looking
  // marketing copy that doesn't fit a historical recap card.
  function buildEventCard(event, { showTagline }) {
    const li = document.createElement("li");
    li.className = "event-card";

    if (event.tag) {
      const tag = document.createElement("span");
      tag.className = "event-tag";
      tag.textContent = event.tag;
      li.appendChild(tag);
    }

    if (event.image) {
      const img = document.createElement("img");
      img.className = "event-card-img";
      img.src = event.image;
      img.alt = "";
      li.appendChild(img);
    }

    if (event.title) {
      const titleEl = document.createElement("p");
      titleEl.className = "event-card-title";
      titleEl.textContent = event.title;
      li.appendChild(titleEl);
    }

    const dateEl = document.createElement("p");
    dateEl.className = "event-card-date";
    // Date-only parse (no time) is treated as UTC midnight by JS — read the
    // Y/M/D back out in UTC too, so the formatted day-of-week never shifts.
    const [y, m, d] = event.date.split("-").map(Number);
    dateEl.textContent = dateFormatter.format(new Date(Date.UTC(y, m - 1, d)));
    li.appendChild(dateEl);

    if (showTagline) {
      const taglineEl = document.createElement("p");
      taglineEl.className = "event-card-tagline";
      taglineEl.textContent = t.tagline;
      li.appendChild(taglineEl);
    }

    return li;
  }

  eventsListEl.innerHTML = "";
  const list = document.createElement("ul");
  list.className = "events-cards";
  EVENTS_CONFIG.events.forEach((event) => {
    list.appendChild(buildEventCard(event, { showTagline: true }));
  });
  eventsListEl.appendChild(list);

  if (pastEventsListEl) {
    pastEventsListEl.innerHTML = "";
    const pastEvents = EVENTS_CONFIG.pastEvents || [];
    pastEventsHeadingEl.hidden = pastEvents.length === 0;
    if (pastEvents.length > 0) {
      const pastList = document.createElement("ul");
      pastList.className = "events-cards";
      pastEvents.forEach((event) => {
        pastList.appendChild(buildEventCard(event, { showTagline: false }));
      });
      pastEventsListEl.appendChild(pastList);
    }
  }
}

renderEventsPage();
