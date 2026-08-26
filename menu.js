// ---------------------------------------------------------------------------
// MENU CONFIG — replace these placeholder drinks with the real menu whenever
// it's ready. Each category needs a `name`, an optional `note`, and a list
// of `items` ({ name, description, tag }). `tag` is optional (e.g. "Iced",
// "Seasonal") and shows as a small pill next to the drink name.
// ---------------------------------------------------------------------------
const MENU_CONFIG = [
  {
    name: "Coffee-Based Mocktails",
    note: "Full lineup coming soon — placeholders below.",
    items: [
      {
        name: "Cafezinho Spritz",
        description: "Placeholder description — swap in the real recipe/tasting notes.",
        tag: "Coming Soon",
      },
      {
        name: "Cold Brew Tonic",
        description: "Placeholder description — swap in the real recipe/tasting notes.",
        tag: "Coming Soon",
      },
      {
        name: "Espresso Cream Soda",
        description: "Placeholder description — swap in the real recipe/tasting notes.",
        tag: "Coming Soon",
      },
    ],
  },
  {
    name: "Matcha-Based Mocktails",
    note: "Full lineup coming soon — placeholders below.",
    items: [
      {
        name: "Matcha Citrus Fizz",
        description: "Placeholder description — swap in the real recipe/tasting notes.",
        tag: "Coming Soon",
      },
      {
        name: "Coconut Matcha Cooler",
        description: "Placeholder description — swap in the real recipe/tasting notes.",
        tag: "Coming Soon",
      },
      {
        name: "Matcha Berry Smash",
        description: "Placeholder description — swap in the real recipe/tasting notes.",
        tag: "Coming Soon",
      },
    ],
  },
];

const container = document.getElementById("menu-categories");

MENU_CONFIG.forEach((category) => {
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
  container.appendChild(section);
});
