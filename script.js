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
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const normalState = "none";
  const firstFlash = isMobile ? "contrast(1.42) brightness(1.16)" : "contrast(1.35) brightness(1.12)";
  const secondFlash = isMobile ? "contrast(0.82) brightness(1.3)" : "contrast(0.85) brightness(1.25)";

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
    }, 80);

    window.setTimeout(() => {
      rabbit.style.filter = firstFlash;
      rabbit.style.transform = "translate3d(1px, 0, 0)";
    }, 155);

    window.setTimeout(resetRabbit, 240);
  };

  const scheduleRabbitMoment = (delay) => {
    window.setTimeout(() => {
      runRabbitMoment();
      const nextDelay = 24000 + Math.random() * 24000;

      scheduleRabbitMoment(nextDelay);
    }, delay);
  };

  const firstDelay = 4000 + Math.random() * 4000;

  rabbit.style.transition = "filter 40ms steps(1), transform 40ms steps(1)";
  scheduleRabbitMoment(firstDelay);
}
