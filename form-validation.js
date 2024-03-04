document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.flight-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate form inputs
        if (validateForm()) {
            // If the form is valid, send data to the server using Fetch API
            const formData = new FormData(form);

            fetch('https://rdg-travels.onrender.com/booking-flight', {
                method: 'POST',
                body: formData
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
                document.getElementById('success-modal').style.display = 'block';
            })
            .catch(error => {
                console.error('Error during fetch operation:', error);
                // Handle errors, e.g., display an error message to the user
                alert('Error submitting form. Please try again later.');
            });
        }
    });

    function validateForm() {
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

    function closeModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    const closeButton = document.getElementById('closeButton');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('.nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('show');
});
