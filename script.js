const WHATSAPP_NUMBER = "5582999999999";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

function buildWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function bindWhatsappLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const message = link.getAttribute("data-whatsapp") || "Olá, quero falar com a Roteiros do Nordeste.";
      window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
    });
  });
}

function bindNavigation() {
  navToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    header?.classList.toggle("is-open", Boolean(isOpen));
    document.body.classList.toggle("nav-open", Boolean(isOpen));
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      header?.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function bindContactForm() {
  const form = document.querySelector("[data-contact-form]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const destination = formData.get("destination")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    const whatsappMessage = [
      "Olá, quero informações sobre um roteiro com a Roteiros do Nordeste.",
      "",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Destino de interesse: ${destination}`,
      message ? `Mensagem: ${message}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsappUrl(whatsappMessage), "_blank", "noopener,noreferrer");
  });
}

function revealOnScroll() {
  const animatedElements = document.querySelectorAll("[data-animate]");

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", () => {
  updateHeader();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

bindNavigation();
bindWhatsappLinks();
bindContactForm();
revealOnScroll();
