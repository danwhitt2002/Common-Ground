// ---------------------------------------------------------------------------
// MENU CONFIG — edit this to update what's on the menu. Each category needs
// a `name` and a list of `items` ({ name, description, tag }) — `description`
// and `tag` are optional (e.g. a "New" or "Seasonal" pill) and only render
// when present. `addOns` and `footnote` are optional too.
// ---------------------------------------------------------------------------
const MENU_CONFIG = {
  categories: [
    {
      name: "Matcha-Based",
      items: [
        { name: "The Greenhaus" },
        { name: "Moonshine Matcha" },
      ],
    },
    {
      name: "Coffee-Based",
      items: [
        { name: "CG x Unique Cold Brew" },
        { name: "Sweettalk by Unique" },
        { name: "Shaken Guyanese Dirty Chai" },
      ],
    },
    {
      name: "Other",
      items: [
        { name: "Posto 9" },
        { name: "Carioca Kick" },
      ],
    },
  ],
  addOns: [{ label: "Add", name: "a shot of cachaça" }],
  footnote: "All coffee-based mocktails consumed are product of Unique.",
};

const categoriesEl = document.getElementById("menu-categories");
const addonEl = document.getElementById("menu-addon");
const noteEl = document.getElementById("menu-note");

MENU_CONFIG.categories.forEach((category) => {
  const section = document.createElement("section");
  section.className = "menu-category";

  const title = document.createElement("h2");
  title.className = "menu-category-title";
  title.textContent = category.name;
  section.appendChild(title);

  if (category.note) {
    const note = document.createElement("p");
    note.className = "menu-category-note";
    note.textContent = category.note;
    section.appendChild(note);
  }

  const list = document.createElement("ul");
  list.className = "menu-items";

  category.items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "menu-item";

    const row = document.createElement("div");
    row.className = "menu-item-row";

    const name = document.createElement("span");
    name.className = "menu-item-name";
    name.textContent = item.name;
    row.appendChild(name);

    if (item.tag) {
      const tag = document.createElement("span");
      tag.className = "menu-item-tag";
      tag.textContent = item.tag;
      row.appendChild(tag);
    }

    li.appendChild(row);

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "menu-item-desc";
      desc.textContent = item.description;
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

    const label = document.createElement("span");
    label.className = "menu-addon-label";
    label.textContent = addOn.label || "Add";
    row.appendChild(label);

    const name = document.createElement("span");
    name.className = "menu-addon-name";
    name.textContent = addOn.name;
    row.appendChild(name);

    addonEl.appendChild(row);
  });
}

if (MENU_CONFIG.footnote) {
  noteEl.textContent = `{ ${MENU_CONFIG.footnote} }`;
}
