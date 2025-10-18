document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (!hamburger || !navLinks) return;

    // Function to initialize mobile dropdown toggles
    function initMobileDropdowns() {
        const dropdowns = navLinks.querySelectorAll(".dropdown");

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector(".dropdown-toggle");
            const menu = dropdown.querySelector(".dropdown-menu");

            if (!toggle || !menu) return;

            // Remove previous listener to avoid duplicates
            toggle.replaceWith(toggle.cloneNode(true));
            const newToggle = dropdown.querySelector(".dropdown-toggle");

            newToggle.addEventListener("click", (e) => {
                if (window.innerWidth > 768) return;

                e.preventDefault();
                e.stopPropagation();

                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove("open");
                        const m = d.querySelector(".dropdown-menu");
                        if (m) m.style.display = "none";
                    }
                });

                // Toggle current
                const isOpen = dropdown.classList.toggle("open");
                menu.style.display = isOpen ? "block" : "none";
            });
        });

        // Click outside to close
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 768 && !e.target.closest(".dropdown")) {
                dropdowns.forEach(d => {
                    d.classList.remove("open");
                    const menu = d.querySelector(".dropdown-menu");
                    if (menu) menu.style.display = "none";
                });
            }
        });
    }

    // When hamburger is clicked
    hamburger.addEventListener("click", () => {
        setTimeout(() => {
            if (navLinks.classList.contains("active")) {
                // Attach dropdown events only when menu is visible
                initMobileDropdowns();
            } else {
                // Hamburger closed → reset dropdowns
                const dropdowns = navLinks.querySelectorAll(".dropdown");
                dropdowns.forEach(d => {
                    d.classList.remove("open");
                    const menu = d.querySelector(".dropdown-menu");
                    if (menu) menu.style.display = "none";
                });
            }
        }, 10);
    });

    // Reset dropdowns on resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            const dropdowns = navLinks.querySelectorAll(".dropdown");
            dropdowns.forEach(d => {
                d.classList.remove("open");
                const menu = d.querySelector(".dropdown-menu");
                if (menu) menu.style.display = "";
            });
        }
    });
});
