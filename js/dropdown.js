document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!dropdowns.length) return;

  // ==========================================
  // 1. DESKTOP HOVER OVERRIDE (The Sledgehammer)
  // ==========================================
  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!menu) return;

    // Force SHOW menu when mouse enters
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        menu.style.setProperty("opacity", "1", "important");
        menu.style.setProperty("visibility", "visible", "important");
        menu.style.setProperty("pointer-events", "auto", "important");
        menu.style.setProperty("transform", "translateY(0)", "important");
        menu.style.setProperty("display", "block", "important");
      }
    });

    // Force HIDE menu when mouse leaves
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        menu.style.setProperty("opacity", "0", "important");
        menu.style.setProperty("visibility", "hidden", "important");
        menu.style.setProperty("pointer-events", "none", "important");
        menu.style.setProperty("transform", "translateY(10px)", "important");

        // Short timeout to remove display:block so transitions can play
        setTimeout(() => {
          if (menu.style.opacity === "0") {
            menu.style.setProperty("display", "none", "important");
          }
        }, 300);
      }
    });
  });

  // ==========================================
  // 2. MOBILE DROPDOWN & HAMBURGER CONNECTION
  // ==========================================
  dropdowns.forEach((dropdown) => {
    let toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!toggle || !menu) return;

    // CRITICAL FIX: Clone the node to strip away the conflicting click
    // event listener coming from global.js, saving us from duplicate triggers!
    toggle.replaceWith(toggle.cloneNode(true));
    toggle = dropdown.querySelector(".dropdown-toggle"); // Re-select the new clone

    // Handle Mobile Clicks
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth > 768) return; // Desktop uses hover, ignore clicks

      e.preventDefault();
      e.stopPropagation();

      // Close other dropdowns
      dropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("open");
          const m = d.querySelector(".dropdown-menu");
          if (m) m.style.display = "none";
        }
      });

      // Toggle the clicked dropdown
      const isOpen = dropdown.classList.toggle("open");
      menu.style.display = isOpen ? "block" : "none";
    });
  });

  // Click outside to close (Mobile)
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !e.target.closest(".dropdown")) {
      dropdowns.forEach((d) => {
        d.classList.remove("open");
        const menu = d.querySelector(".dropdown-menu");
        if (menu) menu.style.display = "none";
      });
    }
  });

  // Hamburger reset connection
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      setTimeout(() => {
        // global.js toggles the "active" class. If it's closed, reset dropdowns.
        if (!navLinks.classList.contains("active")) {
          dropdowns.forEach((d) => {
            d.classList.remove("open");
            const menu = d.querySelector(".dropdown-menu");
            if (menu) menu.style.display = "none";
          });
        }
      }, 10);
    });
  }

  // Cleanup on resize (Preventing mobile logic from sticking on desktop screens)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      dropdowns.forEach((d) => {
        d.classList.remove("open");
        const menu = d.querySelector(".dropdown-menu");
        if (menu) {
          menu.style.display = ""; // Reset inline styles so CSS handles it
        }
      });
    }
  });
});
