// Import the functions you need from the SDKs you need
// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// 🔧 Your Firebase config (replace these values with your actual project config)
const firebaseConfig = {
    apiKey: "AIzaSyD3hwEQ4nOJxzxFWDPC1LrAIogpJ61wuuY",
    authDomain: "portfolio-visitors-4515d.firebaseapp.com",
    projectId: "portfolio-visitors-4515d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to your Firestore document
const counterRef = doc(db, "visitors", "mainPage");

// 🔢 Function to safely increment visitor count
export async function updateVisitorCount() {
    try {
        // Increment the counter in Firestore
        await updateDoc(counterRef, { count: increment(1) });
        const snap = await getDoc(counterRef);

        if (snap.exists()) {
            const countEl = document.getElementById("visitorCount");
            countEl.textContent = snap.data().count;

            // ✨ Animate the number pop
            countEl.classList.add("animate-pop");
            setTimeout(() => countEl.classList.remove("animate-pop"), 400); // remove class after animation
        } else {
            document.getElementById("visitorCount").textContent = "0";
        }
    } catch (e) {
        console.error("Error updating visitor count:", e);
        document.getElementById("visitorCount").textContent = "Error";
    }
}

// Run immediately when the script loads
updateVisitorCount();
