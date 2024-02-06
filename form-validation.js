document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.flight-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate form inputs
        if (validateForm()) {
            // If the form is valid, send data to the server using Fetch API
            const formData = new FormData(form);

            fetch('your_server_endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming the server sends a JSON response
            })
            .then(data => {
                // Handle the server response, e.g., display a success message
                alert('Form submitted successfully!');
            })
            .then(data => {
                // Hide the form
                form.style.display = 'none';
            
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
        document.getElementById('success-modal').style.display = 'none';
    }
});
