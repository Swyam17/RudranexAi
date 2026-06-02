const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((item) => {
  item.style.opacity = "1";
  item.style.transform = "translateY(0)";
  item.style.transitionDelay = "0ms";
  revealObserver.observe(item);
});

document.querySelector(".menu")?.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => document.body.classList.remove("nav-open"));
});

const numberObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);
      const start = performance.now();
      const duration = 1200;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      numberObserver.unobserve(element);
    });
  },
  { threshold: 0.65 }
);

document.querySelectorAll("[data-count]").forEach((item) => numberObserver.observe(item));
