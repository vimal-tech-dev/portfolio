// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Scroll Fade-in Animation with staggered delay
document.addEventListener("DOMContentLoaded", function () {
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
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

// ===== Particles.js Hero Background (Dynamic for Dark Mode) =====
function initParticles() {
    const isDark = document.body.classList.contains("dark");

    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 60,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": isDark ? "#00e5ff" : "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": { "enable": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": isDark ? "#00bcd4" : "#ffffff",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "bounce": false,
                "attract": { "enable": false }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": false }
            },
            "modes": {
                "repulse": { "distance": 100, "duration": 0.4 }
            }
        },
        "retina_detect": true
    });
}

// Preserve Dark Mode Preference
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

// ===== Initialize on Load =====
document.addEventListener("DOMContentLoaded", () => {
    initParticles();
});

// ===== Re-initialize on Dark Mode Toggle =====
const darkModeToggle = document.getElementById("darkModeToggle");

// Update preference on toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateOverlayGradient();

        setTimeout(() => {
            if (window.pJSDom && pJSDom.length) {
                pJSDom[0].pJS.fn.vendors.destroypJS();
                document.getElementById("particles-js").innerHTML = "";
            }
            initParticles();
        }, 300);
    });
}

function updateOverlayGradient() {
    const overlay = document.querySelector(".gradient-overlay");
    if (!overlay) return;

    if (document.body.classList.contains("dark")) {
        overlay.style.background =
            "linear-gradient(45deg, rgba(33,150,243,0.25), rgba(0,0,0,0.3), rgba(63,81,181,0.3))";
    } else {
        overlay.style.background =
            "linear-gradient(45deg, rgba(255,87,34,0.3), rgba(255,255,255,0.15), rgba(255,152,0,0.25))";
    }
}




