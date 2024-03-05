document.addEventListener("DOMContentLoaded", function() {
    const flightForm = document.getElementById("flight-form");
    const successModal = document.getElementById("success-modal");
    const closeButton = document.getElementById("closeButton");

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

    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeModal();
    });

    function closeModal() {
        successModal.style.display = 'none';
    }
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

const closeButton = document.getElementById('closeButton');
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('.nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('show');
});