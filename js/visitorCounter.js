// Import the functions you need from the SDKs you need
// Import Firebase SDK modules
// Firebase (ESM from CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, increment } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// 🔧 Your Firebase config (replace these values with your actual project config)
const firebaseConfig = {
    apiKey: "AIzaSyD3hwEQ4nOJxzxFWDPC1LrAIogpJ61wuuY",
    authDomain: "portfolio-visitors-4515d.firebaseapp.com",
    projectId: "portfolio-visitors-4515d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore document
const counterRef = doc(db, "visitors", "mainPage");

// Elements
const countEl = document.getElementById("visitorCount");
const refresh = document.getElementById("refreshBtn");

/** Formats number with locale separators */
const fmt = (n) => Number(n || 0).toLocaleString(undefined);

/** Animate number from a to b (gentle, reduced-motion aware) */
function animateCount(el, from, to, ms = 600) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = fmt(to); return; }

    const start = performance.now();
    const tick = (now) => {
        const t = Math.min(1, (now - start) / ms);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const cur = Math.round(from + (to - from) * eased);
        el.textContent = fmt(cur);
        if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

/** Safely increments (creates doc if missing), reads, and animates */
async function updateVisitorCount() {
    try {
        // Atomic increment; if the doc/field doesn't exist it behaves like 0
        await setDoc(counterRef, { count: increment(1) }, { merge: true });

        const snap = await getDoc(counterRef);
        const newVal = snap.exists() ? (snap.data().count || 0) : 0;

        // Remove shimmer once we have data
        countEl.classList.remove("shimmer");

        // Pop animation + count up from displayed value (if numeric)
        const current = Number((countEl.textContent || "0").replace(/[^\d]/g, "")) || 0;
        animateCount(countEl, current, newVal);
        countEl.classList.remove("pop");
        // force reflow to replay animation
        void countEl.offsetWidth;
        countEl.classList.add("pop");
    } catch (e) {
        console.error("Error updating visitor count:", e);
        countEl.classList.remove("shimmer");
        countEl.textContent = "—";
        countEl.title = "Could not load";
    }
}

// Initial run
updateVisitorCount();

// Optional manual refresh (no extra increment)
if (refresh) {
    refresh.addEventListener("click", async () => {
        try {
            const snap = await getDoc(counterRef);
            const val = snap.exists() ? (snap.data().count || 0) : 0;
            countEl.classList.remove("shimmer");
            animateCount(countEl, Number((countEl.textContent || "0").replace(/[^\d]/g, "")) || 0, val, 400);
            countEl.classList.remove("pop"); void countEl.offsetWidth; countEl.classList.add("pop");
        } catch (e) {
            console.error(e);
        }
    });
}

