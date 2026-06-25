const menuToggle = document.querySelector(".menu-toggle");
const heroMenu = document.querySelector("#hero-menu");

if (menuToggle && heroMenu) {
  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    heroMenu.classList.toggle("is-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!heroMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  heroMenu.addEventListener("click", (event) => {
    const menuLink = event.target.closest("a");

    if (menuLink?.hash) {
      setMenuOpen(false);
    }
  });
}
