gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ================= MENU MOBILE ================= */
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  mobileNav.classList.toggle("open");
  document.body.classList.toggle("nav-open");
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    toggle.classList.remove("open");
    mobileNav.classList.remove("open");
    document.body.classList.remove("nav-open");
  });
});

/* ================= HERO ================= */
gsap.timeline({ delay: 0.2 })
  .from(".hero-title", { y: 50, opacity: 0, duration: 1 })
  .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".hero-actions a", { y: 20, opacity: 0, stagger: 0.15 }, "-=0.4");

/* ================= HEADER / LOGO ================= */
gsap.to(".brand img", {
  scale: 0.78,
  scrollTrigger: {
    trigger: "#hero",
    start: "bottom top",
    end: "bottom+=150 top",
    scrub: true
  }
});

/* ================= MENU ATIVO ================= */
document.querySelectorAll("[data-section]").forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => activate(section),
    onEnterBack: () => activate(section)
  });
});

function activate(section) {
  const id = section.getAttribute("id");
  document.querySelectorAll(".main-nav a").forEach(a => a.classList.remove("active"));
  const link = document.querySelector(`.main-nav a[href="#${id}"]`);
  if (link) link.classList.add("active");
}

/* ================= SCENE CHANGE ================= */
document.querySelectorAll("[data-scroll]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    const overlay = document.querySelector(".scene-overlay");

    gsap.timeline()
      .to(overlay, { opacity: 1, duration: 0.35 })
      .to(window, {
        scrollTo: { y: target, offsetY: 110 },
        duration: 1.1,
        ease: "power3.inOut"
      })
      .to(overlay, { opacity: 0, duration: 0.4 });
  });
});

/* ================= SECTIONS ================= */
gsap.utils.toArray("[data-section]").forEach((section, i) => {
  gsap.from(section.querySelector(".container"), {
    scrollTrigger: { trigger: section, start: "top 80%" },
    opacity: 0,
    x: i % 2 === 0 ? -80 : 80,
    duration: 1
  });
});

/* ================= CARDS ================= */
gsap.utils.toArray(".cards").forEach(cards => {
  gsap.from(cards.querySelectorAll("[data-card]"), {
    scrollTrigger: { trigger: cards, start: "top 85%" },
    y: 40,
    opacity: 0,
    stagger: 0.12
  });
});
