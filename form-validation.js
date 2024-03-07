document.addEventListener("DOMContentLoaded", function() {
    const successModal = document.getElementById("success-modal");
    const subscribeModal = document.getElementById("subscribe-modal");
    const closeButton = document.getElementById("closeButton");

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    function closeSubscribeModal() {
        subscribeModal.style.display = 'none';
    }

    function sendFormData(formData, apiUrl, modal) {
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Check the Content-Type header to determine the response format
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                // If the response is JSON, parse it and return the parsed data
                return response.json();
            } else {
                // If the response is not JSON, return the response body as text
                return response.text();
            }
        })
        .then(data => {
            // Display the success modal
            modal.style.display = 'block';
            // Reset the form
            formData.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    }

    function handleSubmit(event, form, apiUrl, modal) {
        event.preventDefault();

        const formData = new FormData(form);
        sendFormData(formData, apiUrl, modal);
    }

    const flightForm = document.getElementById("flight-form");
    const flightForm2 = document.getElementById("flight-form1");
    const studyForm = document.getElementById("study-form");
    const hotelForm = document.getElementById("hotel-form");
    const bookingForm = document.getElementById("booking-form");
    const contactForm = document.getElementById("contact-form");
    const subscribeForm = document.getElementById("subscribe-form");

    flightForm.addEventListener("submit", (event) => handleSubmit(event, flightForm, 'https://rdg-travels.onrender.com/booking-flight', successModal));
    flightForm2.addEventListener("submit", (event) => handleSubmit(event, flightForm2, 'https://rdg-travels.onrender.com/booking-flight', successModal));
    studyForm.addEventListener("submit", (event) => handleSubmit(event, studyForm, 'https://rdg-travels.onrender.com/studying-abroad', successModal));
    hotelForm.addEventListener("submit", (event) => handleSubmit(event, hotelForm, 'https://rdg-travels.onrender.com/book-hotel', successModal));
    bookingForm.addEventListener("submit", (event) => handleSubmit(event, bookingForm, 'https://rdg-travels.onrender.com/book-now', successModal));
    contactForm.addEventListener("submit", (event) => handleSubmit(event, contactForm, 'https://rdg-travels.onrender.com/contact-us', successModal));
    subscribeForm.addEventListener("submit", (event) => handleSubmit(event, subscribeForm, 'https://rdg-travels.onrender.com/subscribe', subscribeModal));

    closeButton.addEventListener("click", () => {
        // Close the modal when the close button is clicked
        closeModal(successModal);
        closeSubscribeModal();
    });

    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav');

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
});
