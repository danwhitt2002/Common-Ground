// ---------------------------------------------------------------------------
// MENU CONFIG — edit this to update what's on the menu. Each category needs
// a `name` and a list of `items` ({ name, description, tag }). `description`
// and `tag` are optional (e.g. a "New" or "Seasonal" pill) and only render
// when present. `addOns` and `footnote` are optional too.
//
// Drink and category `name`s stay in English always (they're the pixel-exact
// handwriting images below, or a plain-text fallback) — only `description`,
// `tag`, `note`, and `footnote` are translated. Each can be a plain string
// (shown as-is in every language — the simplest way to add a new one) or an
// { en, pt, es } object for a real per-language version, like the ones
// below.
//
// `image` (on a category or an item) points to a cropped image of that exact
// line of handwriting, lifted straight from the real menu photo — used
// instead of typing the name out in a font, so it's pixel-exact. When an
// `image` is present its `name` is still required as the alt text; add a
// new item/category without an `image` and it just renders as text in the
// closest matching font instead — no image is required to extend the menu.
//
// Each image is saved at 2x with its letters' x-height normalized to the
// same pixel count as every other image in its tier (items vs. category
// titles) — that's what makes "Moonshine Matcha" and "Sweettalk by Unique"
// read as the same size despite one having deep descenders and the other
// not. renderHandwriting() below displays each at half its natural size
// (crisp at 2x, and every image's letters now line up at that scale) —
// don't apply a fixed CSS height to these images, it would undo that.
// ---------------------------------------------------------------------------
const MENU_CONFIG = {
  categories: [
    {
      name: "Matcha-Based",
      image: "assets/menu/matcha-based.png",
      items: [
        {
          name: "The Greenhaus",
          image: "assets/menu/the-greenhaus.png",
          description: { en: "Green juice meets matcha latte.", pt: "Suco verde encontra matcha latte.", es: "Jugo verde se encuentra con matcha latte." },
        },
        {
          name: "Moonshine Matcha",
          image: "assets/menu/moonshine-matcha.png",
          description: { en: "Smoky, wild, nocturnal.", pt: "Defumado, selvagem, noturno.", es: "Ahumado, salvaje, nocturno." },
        },
      ],
    },
    {
      name: "Coffee-Based",
      image: "assets/menu/coffee-based.png",
      items: [
        {
          name: "CG x Unique Cold Brew",
          image: "assets/menu/cg-x-unique-cold-brew.png",
          description: { en: "Dark, smooth, bold.", pt: "Escuro, suave, intenso.", es: "Oscuro, suave, intenso." },
        },
        {
          name: "Sweettalk by Unique",
          image: "assets/menu/sweettalk-by-unique.png",
          description: { en: "Silky, warm, flirty.", pt: "Sedoso, quente, sedutor.", es: "Sedoso, cálido, coqueto." },
        },
        {
          name: "Shaken Guyanese Dirty Chai",
          image: "assets/menu/shaken-guyanese-dirty-chai.png",
          description: { en: "Inspired by my time in Guyana.", pt: "Inspirado no meu tempo na Guiana.", es: "Inspirado en mi tiempo en Guyana." },
        },
      ],
    },
    {
      name: "Other",
      image: "assets/menu/other.png",
      items: [
        {
          name: "Posto 9",
          image: "assets/menu/posto-9.png",
          description: { en: "Bright and bold, just like Posto 9.", pt: "Vibrante e ousado, como o Posto 9.", es: "Vibrante y audaz, como el Posto 9." },
        },
        {
          name: "Carioca Kick",
          image: "assets/menu/carioca-kick.png",
          description: { en: "A fiery wellness shot.", pt: "Um shot de bem-estar ardente.", es: "Un shot de bienestar ardiente." },
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Language — carried over from index.html via a "?lang=" URL param (there's
// no shared JS state between the two pages, so the URL is the handoff).
// Translates this page's own copy; MENU_CONFIG's drink/category names are
// never translated (see note above).
// ---------------------------------------------------------------------------
const MENU_TRANSLATIONS = {
  en: {
    back: "← Back",
    eyebrow: "Functional Mocktails",
    lede: "Included with every Grounds Pass.",
    applyLink: "Ready to apply? Get your Grounds Pass →",
  },
  pt: {
    back: "← Voltar",
    eyebrow: "Mocktails Funcionais",
    lede: "Incluído em todo Grounds Pass.",
    applyLink: "Pronto(a) para se inscrever? Garanta seu Grounds Pass →",
  },
  es: {
    back: "← Atrás",
    eyebrow: "Mocktails Funcionales",
    lede: "Incluido en cada Grounds Pass.",
    applyLink: "¿Listo/a para solicitar? Consigue tu Grounds Pass →",
  },
};

const categoriesEl = document.getElementById("menu-categories");
const addonEl = document.getElementById("menu-addon");
const noteEl = document.getElementById("menu-note");

function renderHandwriting(el, node, imgClass, textClass) {
  if (node.image) {
    const img = document.createElement("img");
    img.className = imgClass;
    img.src = node.image;
    img.alt = node.name;
    // Images are saved at 2x — display at half their natural size so the
    // x-height normalization baked into the file actually takes effect.
    img.addEventListener("load", () => {
      img.style.height = img.naturalHeight / 2 + "px";
    });
    el.appendChild(img);
  } else {
    const span = document.createElement("span");
    span.className = textClass;
    span.textContent = node.name;
    el.appendChild(span);
  }
}

// Resolves the language to render in: the "?lang=" URL param (the real
// hand-off from index.html, a separate page/document); falling back to a
// shared `state.lang` if one exists in this scope (only true when menu.js is
// concatenated alongside script.js into one page, as the trial bundle does —
// harmless no-op on the real, separate menu.html); English otherwise.
function resolveMenuLang() {
  const requestedLang = new URLSearchParams(window.location.search).get("lang");
  if (Object.prototype.hasOwnProperty.call(MENU_TRANSLATIONS, requestedLang)) return requestedLang;
  if (typeof state !== "undefined" && state.lang) return state.lang;
  return "en";
}

// Renders the whole page for the current language. Callable more than
// once — the trial bundle's merged single-page app calls this again each
// time the "menu" screen is shown, so a language switched after that screen
// was first built (a real navigation always gets a fresh, correct load, so
// this only matters there) still comes through.
function renderMenuPage() {
  const lang = resolveMenuLang();
  document.documentElement.lang = lang;

  function mt(key) {
    return MENU_TRANSLATIONS[lang][key];
  }

  // Resolves a MENU_CONFIG field that may be a plain string (shown as-is in
  // every language) or an { en, pt, es } object (a real per-language version).
  function localize(field) {
    if (field == null) return field;
    if (typeof field === "object") return field[lang] || field.en;
    return field;
  }

  // Guarded (not an unconditional assignment): in the standalone menu.html
  // this only ever matches this page's own four data-i18n elements, but in
  // the merged single-page trial bundle it would also match every data-i18n
  // element from script.js's screens — mt() correctly returns undefined for
  // those (MENU_TRANSLATIONS has no such key), so skip rather than blank them.
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = mt(el.dataset.i18n);
    if (val !== undefined) el.textContent = val;
  });

  // Carry the language forward on both links back to the application page.
  ["menu-back-link", "menu-apply-link"].forEach((id) => {
    document.getElementById(id).href = `index.html?lang=${lang}`;
  });

  categoriesEl.innerHTML = "";
  addonEl.innerHTML = "";
  noteEl.hidden = true;

  MENU_CONFIG.categories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "menu-category";

    const title = document.createElement("h2");
    title.className = "menu-category-title";
    renderHandwriting(title, category, "menu-category-title-img", "menu-category-title-text");
    section.appendChild(title);

    if (category.note) {
      const note = document.createElement("p");
      note.className = "menu-category-note";
      note.textContent = localize(category.note);
      section.appendChild(note);
    }

    const list = document.createElement("ul");
    list.className = "menu-items";

    category.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "menu-item";

      const row = document.createElement("div");
      row.className = "menu-item-row";
      renderHandwriting(row, item, "menu-item-name-img", "menu-item-name");

      if (item.tag) {
        const tag = document.createElement("span");
        tag.className = "menu-item-tag";
        tag.textContent = localize(item.tag);
        row.appendChild(tag);
      }

      li.appendChild(row);

      if (item.description) {
        const desc = document.createElement("p");
        desc.className = "menu-item-desc";
        desc.textContent = localize(item.description);
        li.appendChild(desc);
      }

      list.appendChild(li);
    });

    section.appendChild(list);
    categoriesEl.appendChild(section);
  });

  if (MENU_CONFIG.addOns && MENU_CONFIG.addOns.length) {
    MENU_CONFIG.addOns.forEach((addOn) => {
      const row = document.createElement("div");
      row.className = "menu-addon";
      renderHandwriting(row, addOn, "menu-addon-img", "menu-addon-name");
      addonEl.appendChild(row);
    });
  }

  if (MENU_CONFIG.footnote) {
    noteEl.textContent = `{ ${localize(MENU_CONFIG.footnote)} }`;
    noteEl.hidden = false;
  }
}

renderMenuPage();
