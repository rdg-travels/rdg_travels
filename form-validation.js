document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://rdg-travels.onrender.com';
    const successModal = document.getElementById("success-modal");
    const closeButton = document.getElementById("closeButton");

    // Close modal function
    function closeModal() {
        successModal.style.display = 'none';
    }

    // Generic function to handle form submission
    function handleFormSubmit(form, endpoint) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(`${apiUrl}/${endpoint}`, {
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
                return response.headers.get('Content-Type')?.includes('application/json') 
                    ? response.json() 
                    : response.text();
            })
            .then(data => {
                successModal.style.display = 'block';
                form.reset();
            })
            .catch(error => {
                console.error(error);
                alert("An error occurred while sending the message.");
            });
        });
    }

    // Attach form submission handlers
    const flightForms = [document.getElementById("flight-form1"), document.getElementById("flight-form2")];
    const studyForms = [document.getElementById("study-form"), document.getElementById("study-form1")];
    const hotelForms = [document.getElementById("hotel-form"), document.getElementById("hotel-form1")];
    const bookingForm = document.getElementById("booking-form");
    const contactForm = document.getElementById("contact-form");
    const subscribeForm = document.getElementById("subscribe-form");

    flightForms.forEach(form => handleFormSubmit(form, 'booking-flight'));
    studyForms.forEach(form => handleFormSubmit(form, 'studying-abroad'));
    hotelForms.forEach(form => handleFormSubmit(form, 'book-hotel'));
    handleFormSubmit(bookingForm, 'book-now');
    handleFormSubmit(contactForm, 'contact-us');
    handleFormSubmit(subscribeForm, 'subscribe');

    // Close button event listener
    closeButton.addEventListener("click", closeModal);

    // Toggle return date visibility
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
            returnDateInput.value = '';
        }
    }

    document.querySelectorAll('input[name="tripType"]').forEach(radio => {
        radio.addEventListener('change', toggleReturnDate);
    });

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
            event.target.value = '';
        } else {
            errorMessage.style.display = 'none';
        }
    }

    setMinDate();

    document.querySelectorAll('input[id^="returningOn"]').forEach(input => {
        input.addEventListener('change', validateReturningDate);
    });

    const initialTripType = document.querySelector('input[name="tripType"]:checked');
    if (initialTripType) {
        toggleReturnDate({ target: initialTripType });
    }

    // Hotel card click handling
    document.querySelectorAll('.hotel-card').forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();
            const url = card.getAttribute('data-url');
            window.location.href = url;
        });
    });

    // Photo modal handling
    const photoModal = document.getElementById('photoModal');
    const viewAllPhotosLink = document.getElementById('viewAllPhotosLink');
    const photoModalClose = document.getElementById('photoModalClose');

    viewAllPhotosLink.onclick = function(event) {
        event.preventDefault();
        photoModal.style.display = 'block';
    };

    photoModalClose.onclick = function() {
        photoModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === photoModal) {
            photoModal.style.display = 'none';
        } else if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    };

    // Navigation toggle
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav');

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
});
