function closeModal() {
    const successModal = document.getElementById("success-modal");
    successModal.style.display = 'none';
}

function closeSubscribeModal() {
    const subscribeModal = document.getElementById("subscribe-modal");
    subscribeModal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    const flightForm = document.getElementById("flight-form");
    const successModal = document.getElementById("success-modal");

    flightForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(flightForm);
        const apiUrl = 'https://rdg-travels.onrender.com';

        fetch(`${apiUrl}/booking-flight`, {
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
            successModal.style.display = 'block';
            // Reset the flight form
            flightForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeModal();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const studyForm = document.getElementById("study-form");
    const successModal = document.getElementById("success-modal");

    studyForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(studyForm);
        const apiUrl = 'https://rdg-travels.onrender.com';

        fetch(`${apiUrl}/studying-abroad`, {
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
            successModal.style.display = 'block';
            // Reset the flight form
            studyForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeModal();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const hotelForm = document.getElementById("hotel-form");
    const successModal = document.getElementById("success-modal");

    hotelForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(hotelForm);
        const apiUrl = 'https://rdg-travels.onrender.com';

        fetch(`${apiUrl}/book-hotel`, {
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
            successModal.style.display = 'block';
            // Reset the flight form
            hotelForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeModal();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const bookingForm = document.getElementById("booking-form");
    const successModal = document.getElementById("success-modal");

    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const apiUrl = 'https://rdg-travels.onrender.com';

        fetch(`${apiUrl}/book-now`, {
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
            successModal.style.display = 'block';
            // Reset the flight form
            bookingForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeModal();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    const successModal = document.getElementById("success-modal");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const apiUrl = 'https://rdg-travels.onrender.com';

        fetch(`${apiUrl}/contact-us`, {
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
            successModal.style.display = 'block';
            // Reset the flight form
            contactForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeModal();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const subscribeForm = document.getElementById("subscribe-form");
    const subscribeModal = document.getElementById("subscribe-modal");

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
            subscribeModal.style.display = 'block';
            // Reset the flight form
            subscribeForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeSubscribeModal();
    });
});


function validateForm(form) {
    let isValid = true;

    // Validate each input field
    const inputs = form.querySelectorAll('input');
    inputs.forEach(function (input) {
        if (!input.checkValidity()) {
            isValid = false;
            alert(`Invalid input for ${input.name}`);
        }
    });

    return isValid;
}

const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('.nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('show');
});
