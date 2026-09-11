// EVENTS_CONFIG (the upcoming event dates) now lives in events-data.js,
// loaded via its own <script> tag before this file — shared with script.js,
// which uses the same list for the "select your event(s)" application step.

const EVENTS_TRANSLATIONS = {
  en: {
    back: "← Back",
    eyebrow: "Upcoming Events",
    lede: "Carioca time, every time",
    pastEventsHeading: "Past Events",
    applyLink: "Ready to apply? Join Common Ground →",
    locale: "en-GB",
  },
  pt: {
    back: "← Voltar",
    eyebrow: "Próximos Eventos",
    lede: "Hora carioca, sempre",
    pastEventsHeading: "Eventos Passados",
    applyLink: "Pronto(a) para se inscrever? Junte-se à Common Ground →",
    locale: "pt-BR",
  },
  es: {
    back: "← Atrás",
    eyebrow: "Próximos Eventos",
    lede: "Hora carioca, siempre",
    pastEventsHeading: "Eventos Pasados",
    applyLink: "¿Listo/a para solicitar? Únete a Common Ground →",
    locale: "es-ES",
  },
};

const eventsListEl = document.getElementById("events-list");
const pastEventsListEl = document.getElementById("past-events-list");
const pastEventsHeadingEl = document.getElementById("past-events-heading");

// ---------------------------------------------------------------------------
// Lightbox — tapping an event's poster image expands it to fill the screen,
// so the full detail (any text near the edges especially) is easy to read
// instead of squeezed into the small square card. Set up once here (not
// inside renderEventsPage, which can run more than once) since these
// elements and their close behavior never change between re-renders.
// ---------------------------------------------------------------------------
const eventsLightbox = document.getElementById("events-lightbox");
const eventsLightboxImg = document.getElementById("events-lightbox-img");

function openEventsLightbox(src, alt) {
  eventsLightboxImg.src = src;
  eventsLightboxImg.alt = alt;
  eventsLightbox.hidden = false;
}

function closeEventsLightbox() {
  eventsLightbox.hidden = true;
  eventsLightboxImg.src = "";
}

if (eventsLightbox) {
  document.getElementById("events-lightbox-close").addEventListener("click", closeEventsLightbox);
  // Click anywhere on the dark backdrop closes it; clicking the image itself
  // (inside the backdrop) shouldn't, so only close when the click target is
  // the backdrop element itself, not a child like the image or close button.
  eventsLightbox.addEventListener("click", (e) => {
    if (e.target === eventsLightbox) closeEventsLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !eventsLightbox.hidden) closeEventsLightbox();
  });
}

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

  // Shared by both the upcoming and past-events lists below.
  function buildEventCard(event) {
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
      img.alt = event.title || "";
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "View full-size image");
      const expand = () => openEventsLightbox(event.image, event.title || "");
      img.addEventListener("click", expand);
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          expand();
        }
      });
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

    return li;
  }

  eventsListEl.innerHTML = "";
  const list = document.createElement("ul");
  list.className = "events-cards";
  EVENTS_CONFIG.events.forEach((event) => {
    list.appendChild(buildEventCard(event));
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
        pastList.appendChild(buildEventCard(event));
      });
      pastEventsListEl.appendChild(pastList);
    }
  }
}

renderEventsPage();
