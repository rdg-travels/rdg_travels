function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
}

function closeSubscribeModal() {
    const subscribeModal = document.getElementById("subscribe-modal");
    subscribeModal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    const successModal = document.getElementById("success-modal");
    const subscribeModal = document.getElementById("subscribe-modal");
    const closeButton = document.getElementById("closeButton");

    function sendFormData(formData, apiUrl, modal, form) {
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
            form.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    }

    function handleSubmit(event, form, apiUrl, modal) {
        event.preventDefault();

        const formData = new FormData(form);
        sendFormData(formData, apiUrl, modal, form);
    }

    const flightForm = document.getElementById("flight-form");
    const flightForm2 = document.getElementById("flight-form1");
    const studyForm = document.getElementById("study-form");
    const studyForm2 = document.getElementById("study-form1");
    const hotelForm = document.getElementById("hotel-form");
    const hotelForm2 = document.getElementById("hotel-form1");
    const bookingForm = document.getElementById("booking-form");
    const contactForm = document.getElementById("contact-form");
    // const subscribeForm = document.getElementById("subscribe-form");

    flightForm.addEventListener("submit", (event) => handleSubmit(event, flightForm, 'https://rdg-travels.onrender.com/booking-flight', successModal));
    flightForm2.addEventListener("submit", (event) => handleSubmit(event, flightForm2, 'https://rdg-travels.onrender.com/booking-flight', successModal));
    studyForm.addEventListener("submit", (event) => handleSubmit(event, studyForm, 'https://rdg-travels.onrender.com/studying-abroad', successModal));
    studyForm2.addEventListener("submit", (event) => handleSubmit(event, studyForm2, 'https://rdg-travels.onrender.com/studying-abroad', successModal));
    hotelForm.addEventListener("submit", (event) => handleSubmit(event, hotelForm, 'https://rdg-travels.onrender.com/book-hotel', successModal));
    hotelForm2.addEventListener("submit", (event) => handleSubmit(event, hotelForm2, 'https://rdg-travels.onrender.com/book-hotel', successModal));
    bookingForm.addEventListener("submit", (event) => handleSubmit(event, bookingForm, 'https://rdg-travels.onrender.com/book-now', successModal));
    contactForm.addEventListener("submit", (event) => handleSubmit(event, contactForm, 'https://rdg-travels.onrender.com/contact-us', successModal));
    // subscribeForm.addEventListener("submit", (event) => handleSubmit(event, subscribeForm, 'https://rdg-travels.onrender.com/subscribe', subscribeModal));

    
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

    const subscribeForm = document.getElementById("subscribe-form");

    subscribeForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(subscribeForm);
        const apiUrl = 'https://rdg-travels.onrender.com';

        fetch(`${apiUrl}/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to subscribe. Please try again later.');
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
            subscribeModal.style.display = 'block';
            // Reset the flight form
            subscribeForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while subscribing. Please try again later.");
        });
    });
});
