// Function to close the success modal
function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    successModal.style.display = 'none';
}

// Function to close the subscribe modal
function closeSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    subscribeModal.style.display = 'none';
}

// Function to handle form submission for flight booking
function handleFlightBooking(formId) {
    const form = document.getElementById(formId);
    const successModal = document.getElementById('success-modal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const apiUrl = 'https://rdg-travels.onrender.com';

        try {
            const response = await fetch(`${apiUrl}/booking-flight`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('Content-Type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            form.reset();
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the message.');
        }
    });
}

// Function to handle form submission for studying abroad
function handleStudyAbroad(formId) {
    const form = document.getElementById(formId);
    const successModal = document.getElementById('success-modal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const apiUrl = 'https://rdg-travels.onrender.com';

        try {
            const response = await fetch(`${apiUrl}/studying-abroad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('Content-Type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Display the success modal
            successModal.style.display = 'block';
            // Reset the form
            form.reset();
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the message.');
        }
    });
}

// Function to handle form submission for hotel booking
function handleHotelBooking(formId) {
    const form = document.getElementById(formId);
    const successModal = document.getElementById('success-modal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const apiUrl = 'https://rdg-travels.onrender.com';

        try {
            const response = await fetch(`${apiUrl}/book-hotel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('Content-Type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Display the success modal
            successModal.style.display = 'block';
            // Reset the form
            form.reset();
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the message.');
        }
    });
}

// Function to handle form submission for booking
function handleBooking(formId) {
    const form = document.getElementById(formId);
    const successModal = document.getElementById('success-modal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const apiUrl = 'https://rdg-travels.onrender.com';

        try {
            const response = await fetch(`${apiUrl}/book-now`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('Content-Type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Display the success modal
            successModal.style.display = 'block';
            // Reset the form
            form.reset();
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the message.');
        }
    });
}

// Function to handle form submission for contact
function handleContact(formId) {
    const form = document.getElementById(formId);
    const successModal = document.getElementById('success-modal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const apiUrl = 'https://rdg-travels.onrender.com';

        try {
            const response = await fetch(`${apiUrl}/contact-us`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('Content-Type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Display the success modal
            successModal.style.display = 'block';
            // Reset the form
            form.reset();
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the message.');
        }
    });
}

// Function to handle form submission for subscription
function handleSubscription(formId) {
    const form = document.getElementById(formId);
    const subscribeModal = document.getElementById('subscribe-modal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const apiUrl = 'https://rdg-travels.onrender.com';

        try {
            const response = await fetch(`${apiUrl}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('Content-Type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Display the subscribe modal
            subscribeModal.style.display = 'block';
            // Reset the form
            form.reset();
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the message.');
        }
    });
}

// Form validation function
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

// Toggle navigation menu on mobile
const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('.nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Toggle return date input field based on trip type
function toggleReturnDate(event) {
    const formSection = event.target.closest('.book-flight-section');
    const isReturn = event.target.value === 'return';
    const returnDateInput = formSection.querySelector('[id^="returningOn"]');
    const returnDateGroup = formSection.querySelector('[id^="returningOnGroup"]');

    if (isReturn) {
        returnDateGroup.style.display = 'block';
        returnDateInput.required = true;
    } else {
        returnDateGroup.style.display = 'none';
        returnDateInput.required = false;
        returnDateInput.value = ''; // Clear the return date input
    }
}

// Attach event listeners to radio buttons
document.querySelectorAll('input[name="tripType"]').forEach(radio => {
    radio.addEventListener('change', toggleReturnDate);
});

// Set minimum dates for return fields and validate them
function setMinDate() {
    document.querySelectorAll('input[id^="leavingOn"]').forEach(input => {
        input.min = new Date().toISOString().split("T")[0];
    });
    document.querySelectorAll('input[id^="returningOn"]').forEach(input => {
        input.min = new Date().toISOString().split("T")[0];
    });
}

function validateReturningDate(event) {
    const returningOnDate = new Date(event.target.value);
    const leavingOnInput = event.target.closest('form').querySelector('input[id^="leavingOn"]');
    const leavingOnDate = new Date(leavingOnInput.value);
    const errorMessage = event.target.closest('form').querySelector('.error-message');

    if (returningOnDate <= leavingOnDate) {
        errorMessage.style.display = 'block';
        event.target.value = ''; // Clear the input field
    } else {
        errorMessage.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setMinDate();

    document.querySelectorAll('input[name="tripType"]').forEach(radio => {
        radio.addEventListener('change', toggleReturnDate);
    });

    document.querySelectorAll('input[id^="returningOn"]').forEach(input => {
        input.addEventListener('change', validateReturningDate);
    });

    // Set initial state for return date based on selected trip type
    const initialTripType = document.querySelector('input[name="tripType"]:checked');
    if (initialTripType) {
        toggleReturnDate({ target: initialTripType });
    }
});

// Handle click events on hotel cards
document.addEventListener('DOMContentLoaded', () => {
    const hotelCards = document.querySelectorAll('.hotel-card');

    hotelCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Prevent the click event from firing the anchor tag's default action
            event.preventDefault();
            const url = card.getAttribute('data-url');
            window.location.href = url;
        });
    });
});

// Handle photo modal
document.addEventListener('DOMContentLoaded', () => {
    // Elements for the photo modal
    const photoModal = document.getElementById('photoModal');
    const viewAllPhotosLink = document.getElementById('viewAllPhotosLink');
    const photoModalClose = document.getElementById('photoModalClose');

    // Function to open the photo modal
    viewAllPhotosLink.onclick = function (event) {
        event.preventDefault(); // Prevent the default anchor behavior
        photoModal.style.display = 'block';
    };

    // Function to close the photo modal
    photoModalClose.onclick = function () {
        photoModal.style.display = 'none';
    };

    // Close the modal if the user clicks outside of it
    window.onclick = function (event) {
        if (event.target === photoModal) {
            photoModal.style.display = 'none';
        }
    };

    // Existing modal handling (assuming similar structure)
    const successModal = document.getElementById('success-modal');
    const subscribeModal = document.getElementById('subscribe-modal');
    const closeButtons = document.querySelectorAll('.modal .close');

    closeButtons.forEach(button => {
        button.onclick = function () {
            button.parentElement.parentElement.style.display = 'none';
        };
    });

    window.onclick = function (event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        } else if (event.target === subscribeModal) {
            subscribeModal.style.display = 'none';
        } else if (event.target === photoModal) {
            photoModal.style.display = 'none';
        }
    };
});

// Call the necessary functions
handleFlightBooking('flight-form1');
handleFlightBooking('flight-form2');
handleStudyAbroad('study-form');
handleStudyAbroad('study-form1');
handleHotelBooking('hotel-form');
handleHotelBooking('hotel-form1');
handleBooking('booking-form');
handleContact('contact-form');
handleSubscription('subscribe-form');