// JavaScript for Dark Mode
const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;

// Load saved theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
	toggleBtn.textContent = "☀️ Light Mode";
	localStorage.setItem("theme", "dark");
  } else {
	toggleBtn.textContent = "🌙 Dark Mode";
	localStorage.setItem("theme", "light");
  }
});
