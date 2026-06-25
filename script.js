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

const rabbit = document.querySelector(".hero-rabbit");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (rabbit && !reducedMotion) {
  const normalState = "none";
  const firstFlash = "contrast(1.35) brightness(1.12)";
  const secondFlash = "contrast(0.85) brightness(1.25)";

  const resetRabbit = () => {
    rabbit.style.filter = normalState;
    rabbit.style.transform = "translate3d(0, 0, 0)";
  };

  const runRabbitMoment = () => {
    rabbit.style.filter = firstFlash;
    rabbit.style.transform = "translate3d(1px, -1px, 0)";

    window.setTimeout(() => {
      rabbit.style.filter = secondFlash;
      rabbit.style.transform = "translate3d(-1px, 1px, 0)";
    }, 70);

    window.setTimeout(() => {
      rabbit.style.filter = firstFlash;
      rabbit.style.transform = "translate3d(1px, 0, 0)";
    }, 135);

    window.setTimeout(resetRabbit, 210);
  };

  const scheduleRabbitMoment = () => {
    const nextDelay = 26000 + Math.random() * 22000;

    window.setTimeout(() => {
      runRabbitMoment();
      scheduleRabbitMoment();
    }, nextDelay);
  };

  rabbit.style.transition = "filter 40ms steps(1), transform 40ms steps(1)";
  scheduleRabbitMoment();
}
