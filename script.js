// =====================================================
// GSAP SETUP
// =====================================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ScrollTrigger.clearScrollMemory();
ScrollTrigger.refresh();

// =====================================================
// HERO – KEYNOTE OPENING
// =====================================================
gsap.timeline({ delay: 0.2 })
  .from(".hero-title", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from(".hero-subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .from(".hero-actions a", {
    y: 20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.4");

// =====================================================
// HEADER + LOGO SCROLL SYNC (ENTERPRISE)
// =====================================================
gsap.to(".brand img", {
  scale: 0.75,
  scrollTrigger: {
    trigger: ".hero",
    start: "bottom top",
    end: "bottom+=150 top",
    scrub: true
  }
});

let lastScroll = 0;
ScrollTrigger.create({
  start: 0,
  end: 99999,
  onUpdate: self => {
    const current = self.scroll();

    gsap.to(".topbar", {
      y: current > lastScroll && current > 120 ? -90 : 0,
      duration: 0.4,
      ease: "power2.out"
    });

    lastScroll = current;
  }
});

// =====================================================
// MENU – INDICADOR DE SEÇÃO ATIVA
// =====================================================
document.querySelectorAll("[data-section]").forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActive(section),
    onEnterBack: () => setActive(section)
  });
});

function setActive(section) {
  const id = section.getAttribute("id");

  document
    .querySelectorAll(".main-nav a")
    .forEach(a => a.classList.remove("active"));

  const activeLink = document.querySelector(
    `.main-nav a[href="#${id}"]`
  );

  if (activeLink) activeLink.classList.add("active");
}

// =====================================================
// NAVEGAÇÃO COM SCENE CHANGE (OVERLAY)
// =====================================================
document.querySelectorAll("[data-scroll]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    const overlay = document.querySelector(".scene-overlay");

    gsap.timeline()
      .to(overlay, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      })
      .to(window, {
        duration: 1.2,
        scrollTo: {
          y: target,
          offsetY: 110
        },
        ease: "power3.inOut"
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
  });
});

// =====================================================
// SEÇÕES – ENTRADA ALTERNADA
// =====================================================
gsap.utils.toArray("[data-section]").forEach((section, index) => {
  gsap.from(section.querySelector(".container"), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    },
    opacity: 0,
    x: index % 2 === 0 ? -80 : 80,
    duration: 1,
    ease: "power3.out"
  });
});

// =====================================================
// CARDS – STAGGER PREMIUM
// =====================================================
gsap.utils.toArray(".cards").forEach(cards => {
  gsap.from(cards.querySelectorAll("[data-card]"), {
    scrollTrigger: {
      trigger: cards,
      start: "top 85%"
    },
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out"
  });
});

// =====================================================
// HERO GRID – PARALLAX LEVE
// =====================================================
gsap.to(".bg-grid", {
  y: 80,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});
