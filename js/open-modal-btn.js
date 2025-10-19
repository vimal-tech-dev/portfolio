// Get elements
const modal = document.getElementById("myModal");
const btn = document.querySelector(".open-modal-btn");
const close = document.querySelector(".close");

// Open modal on button click
btn.addEventListener("click", () => {
    modal.classList.add("show");
});

// Close modal on close button click
close.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Close modal on clicking outside the modal content
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});