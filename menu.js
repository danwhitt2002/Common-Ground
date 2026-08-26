// ---------------------------------------------------------------------------
// MENU CONFIG — edit this to update what's on the menu. Each category needs
// a `name` and a list of `items` ({ name, description, tag }). `description`
// and `tag` are optional (e.g. a "New" or "Seasonal" pill) and only render
// when present. `addOns` and `footnote` are optional too.
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
        { name: "The Greenhaus", image: "assets/menu/the-greenhaus.png", description: "Earthy, fresh, green." },
        { name: "Moonshine Matcha", image: "assets/menu/moonshine-matcha.png", description: "Smoky, wild, nocturnal." },
      ],
    },
    {
      name: "Coffee-Based",
      image: "assets/menu/coffee-based.png",
      items: [
        { name: "CG x Unique Cold Brew", image: "assets/menu/cg-x-unique-cold-brew.png", description: "Dark, smooth, bold." },
        { name: "Sweettalk by Unique", image: "assets/menu/sweettalk-by-unique.png", description: "Silky, warm, flirty." },
        { name: "Shaken Guyanese Dirty Chai", image: "assets/menu/shaken-guyanese-dirty-chai.png", description: "Spiced, punchy, rich." },
      ],
    },
    {
      name: "Other",
      image: "assets/menu/other.png",
      items: [
        { name: "Posto 9", image: "assets/menu/posto-9.png", description: "Fiery, bright, sweet." },
        { name: "Carioca Kick", image: "assets/menu/carioca-kick.png", description: "Zesty, sharp, lively." },
      ],
    },
  ],
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
    renderHandwriting(row, item, "menu-item-name-img", "menu-item-name");

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
    renderHandwriting(row, addOn, "menu-addon-img", "menu-addon-name");
    addonEl.appendChild(row);
  });
}

if (MENU_CONFIG.footnote) {
  noteEl.textContent = `{ ${MENU_CONFIG.footnote} }`;
  noteEl.hidden = false;
}
