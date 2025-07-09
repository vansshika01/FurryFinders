document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Show loading message
        formMessage.style.color = "blue";
        formMessage.textContent = "Sending message...";

        try {
            let response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                formMessage.style.color = "green";
                formMessage.textContent = "Message sent successfully!";
                form.reset(); // Clear form after successful submission
            } else {
                throw new Error("Something went wrong. Try again.");
            }
        } catch (error) {
            formMessage.style.color = "red";
            formMessage.textContent = error.message;
        }
    });
});
