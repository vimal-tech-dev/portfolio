/* ===== common.js ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* ============================
     Hamburger Menu (☰ / ✖)
  ============================ */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll("nav ul li a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
    });

    // Close the menu when any nav link is clicked
    navItems.forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
          hamburger.textContent = "☰";
        }
      });
    });

    /* ✅ NEW: Close the menu when clicking outside */
    document.addEventListener("click", (event) => {
      const isClickInside = navLinks.contains(event.target) || hamburger.contains(event.target);
      if (!isClickInside && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.textContent = "☰";
      }
    });

  }

  /* ============================
     Scroll-to-Top Button
  ============================ */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
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
  }

  // ============================
  // Fade-In Animation on Scroll with Perfect Cascade & Staggered Delay
  // ============================
  const faders = document.querySelectorAll(".fade-in");

  if (faders.length) {
    const appearOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Get the index of this element in the NodeList
        const i = Array.from(faders).indexOf(entry.target);

        // Set animation delay dynamically for cascading effect
        entry.target.style.animationDelay = `${i * 150}ms`;
        entry.target.classList.add("visible");

        observer.unobserve(entry.target); // stop observing once visible
      });
    }, appearOptions);

    // Observe each .fade-in element
    faders.forEach(fader => appearOnScroll.observe(fader));
  }

  /* ============================
     ScrollSpy: Highlight Active Nav Link
  ============================ */
  const sections = document.querySelectorAll("section");

  if (sections.length && navItems.length) {
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
  }
});
