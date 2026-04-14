// ===================================================
// ===== 1. PARTICLES INITIALIZATION =====
// ===================================================

// ===================================================
// ===== 2. CUSTOM PHYSICS (MAGNET + EXPLOSION) =====
// ===================================================

// ===================================================
// ===== 3. UI, THEME, AND FORM LOGIC =====
// ===================================================

// Above all js code handled in global.js, 
// this file is only for contact us page specific js code like form submission logic

document.addEventListener("DOMContentLoaded", function () {

    const messageInput = document.getElementById("message");
    const charCountSpan = document.getElementById("charCount");
    const maxChars = 1000;

    // --- Character Counter Logic ---
    if (messageInput && charCountSpan) {
        messageInput.addEventListener("input", () => {
            const currentLength = messageInput.value.length;
            charCountSpan.textContent = `${currentLength} / ${maxChars}`;

            if (currentLength >= maxChars) {
                charCountSpan.classList.add("at-limit");
                messageInput.value = messageInput.value.substring(0, maxChars);
            } else if (currentLength > maxChars * 0.9) {
                charCountSpan.classList.add("near-limit");
                charCountSpan.classList.remove("at-limit");
            } else {
                charCountSpan.classList.remove("near-limit", "at-limit");
            }
        });
    }

    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const successMsg = document.getElementById("formSuccess");
    const submitIcon = submitBtn ? submitBtn.querySelector(".submit-icon") : null;

    // --- Form Submission & Validation Logic ---
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let isValid = true;

            // 1. Clear previous errors
            document.querySelectorAll(".field-error").forEach((el) => el.classList.remove("visible"));
            document.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));

            // 2. Validate Name
            const name = document.getElementById("name");
            if (!name.value.trim()) {
                showError("name", "Name is required");
                isValid = false;
            }

            // 3. Validate Email
            const email = document.getElementById("email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError("email", "Email is required");
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError("email", "Please enter a valid email address");
                isValid = false;
            }

            // 4. Validate Service Dropdown (NEW)
            const service = document.getElementById("service");
            if (!service.value) {
                showError("service", "Please select a service");
                isValid = false;
            }

            // 5. Validate Message
            const message = document.getElementById("message");
            const messageText = message.value.trim();

            if (!messageText) {
                showError("message", "Please enter a message");
                isValid = false;
            } else if (messageText.length < 10) {
                showError("message", "Message must be at least 10 characters");
                isValid = false;
            }

            // --- API Submission ---
            if (isValid) {
                // UI Loading State
                submitBtn.classList.add("loading");
                submitBtn.querySelector(".btn-text").textContent = "Sending...";
                if (submitIcon) {
                    submitIcon.classList.remove("fa-paper-plane");
                    submitIcon.classList.add("fa-spinner", "fa-spin");
                }

                // Prepare Data for Java Backend
                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    // Maps the selected dropdown option to the "subject" key expected by your backend
                    subject: service.value,
                    message: messageText,
                };

                const API_BASE = window.location.hostname === "localhost"
                    ? "http://localhost:8080"
                    : "https://api.vimaltech.dev";

                // Force the live VPS URL for testing
                // const API_BASE = "https://api.vimaltech.dev";

                // Send to Backend
                fetch(`${API_BASE}/api/v1/contacts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                    .then(async (response) => {
                        const data = await response.json();
                        if (!response.ok) {
                            throw new Error(data.message || "Server error");
                        }
                        return data;
                    })
                    .then((data) => {
                        if (data.success) {
                            // Reset UI & Show Success
                            submitBtn.classList.remove("loading");
                            submitBtn.querySelector(".btn-text").textContent = "Message Sent";
                            if (submitIcon) {
                                submitIcon.classList.remove("fa-spinner", "fa-spin");
                                submitIcon.classList.add("fa-check");
                            }

                            // Reset form fields
                            form.reset();
                            // Reset character counter
                            if (charCountSpan) charCountSpan.textContent = `0 / ${maxChars}`;

                            // Show success message
                            successMsg.classList.add("visible");

                            // Revert Button text after 3 seconds
                            setTimeout(() => {
                                submitBtn.querySelector(".btn-text").textContent = "Send Message";
                                if (submitIcon) {
                                    submitIcon.classList.remove("fa-check");
                                    submitIcon.classList.add("fa-paper-plane");
                                }
                                successMsg.classList.remove("visible");
                            }, 3000);
                        } else {
                            throw new Error(data.message);
                        }
                    })
                    .catch((error) => {
                        console.error("API Error:", error);

                        // Revert Loading UI
                        submitBtn.classList.remove("loading");
                        submitBtn.querySelector(".btn-text").textContent = "Send Message";
                        if (submitIcon) {
                            submitIcon.classList.remove("fa-spinner", "fa-spin");
                            submitIcon.classList.add("fa-paper-plane");
                        }

                        alert("Submission failed. Please try again or use the fallback contact methods.");
                    });
            }
        });
    }

    // --- Helper Function to Show Errors ---
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`error-${fieldId}`);

        if (input) input.classList.add("input-error");
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add("visible");
        }
    }
});