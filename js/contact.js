// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle with localStorage persistence
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

const setTheme = (mode) => {
  if (mode === "light") {
    root.classList.add("light");
    sun.style.display = "none";
    moon.style.display = "";
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    root.classList.remove("light");
    sun.style.display = "";
    moon.style.display = "none";
    themeToggle.setAttribute("aria-pressed", "false");
  }
  localStorage.setItem("prefers-theme", mode);
};

const saved = localStorage.getItem("prefers-theme");
if (saved) {
  setTheme(saved);
}
themeToggle.addEventListener("click", () => {
  const isLight = root.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// Micro-interactions: gentle tilt on hover for cards
document.querySelectorAll(".card").forEach((card, i) => {
  if (card.dataset.static === "true") {
    return;
  }
  card.style.setProperty("--delay", i * 80 + "ms");
  let rAF;
  const onMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${-y * 3}deg) rotateY(${
        x * 3
      }deg) translateY(-3px)`;
    });
  };
  const reset = () => {
    card.style.transform = "";
  };
  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", reset);
});

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".card").forEach((el) => io.observe(el));

/* ============================
   Scroll-to-Top Button
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 180) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function makeNoise() {
    const el = document.querySelector(".noise");
    if (!el) return;

    const size = 80; // texture tile size
    const c = document.createElement("canvas");
    c.width = c.height = size;

    const ctx = c.getContext("2d", { willReadFrequently: false });
    const img = ctx.createImageData(size, size);
    const data = img.data;

    // grayscale random pixels with low alpha
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = data[i + 1] = data[i + 2] = v; // R,G,B
      data[i + 3] = 12; // alpha (0–255) -> ~0.05 opacity per pixel
    }
    ctx.putImageData(img, 0, 0);

    el.style.backgroundImage = `url(${c.toDataURL("image/png")})`;
    el.style.backgroundRepeat = "repeat";
  }
});

/* =========================
   Mobile Navigation Toggle
========================= */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});
