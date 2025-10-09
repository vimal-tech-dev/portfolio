// ===== localStorage theme handling =====
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  document.body.classList.add("dark");
}

// ===== Dark Mode Persist Across Pages =====
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Apply saved theme immediately
// if (localStorage.getItem("theme") === "dark") {
//   body.classList.add("dark");
//   darkModeToggle.textContent = "☀️";
// } else {
//   darkModeToggle.textContent = "🌙";
// }

// Toggle + Save preference
darkModeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // ===== Optional for Services Page =====
  if (typeof updateOverlayGradient === "function") updateOverlayGradient();

  // Rebuild particles only if available
  if (typeof initParticles === "function") {
    setTimeout(() => {
      if (window.pJSDom && pJSDom.length) {
        pJSDom[0].pJS.fn.vendors.destroypJS();
        document.getElementById("particles-js").innerHTML = "";
      }
      initParticles();
    }, 300);
  }
});


/* ===== Scroll-to-Top Button ===== */
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 150) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== Hamburger Menu & ScrollSpy ===== */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("section");

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navItems.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});