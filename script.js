document.getElementById("year").textContent = new Date().getFullYear();

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("click", () => {
  header.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => header.classList.remove("open"));
});
