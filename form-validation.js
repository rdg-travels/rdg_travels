// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Function to validate form fields
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(function (input) {
        if (!input.checkValidity()) {
            isValid = false;
            alert(`Invalid input for ${input.name}`);
        }
    });
    return isValid;
}

// Function to handle form submissions
function handleFormSubmit(event, formId, apiUrl, successModalId) {
    event.preventDefault();

    const form = document.getElementById(formId);
    if (!validateForm(form)) return;

    const formData = new FormData(form);

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
        return response.json();
    })
    .then(data => {
        document.getElementById(successModalId).style.display = 'block';
        form.reset();
    })
    .catch(error => {
        console.error(error);
        alert("An error occurred while sending the message.");
    });
}

// Initialize event listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    const successModalId = "success-modal";
    const subscribeModalId = "subscribe-modal";

    const forms = [
        { id: "flight-form1", url: "https://rdg-travels.onrender.com/booking-flight" },
        { id: "flight-form2", url: "https://rdg-travels.onrender.com/booking-flight" },
        { id: "study-form", url: "https://rdg-travels.onrender.com/studying-abroad" },
        { id: "study-form1", url: "https://rdg-travels.onrender.com/studying-abroad" },
        { id: "hotel-form", url: "https://rdg-travels.onrender.com/book-hotel" },
        { id: "hotel-form1", url: "https://rdg-travels.onrender.com/book-hotel" },
        { id: "booking-form", url: "https://rdg-travels.onrender.com/book-now" },
        { id: "contact-form", url: "https://rdg-travels.onrender.com/contact-us" },
        { id: "subscribe-form", url: "https://rdg-travels.onrender.com/subscribe", successModalId: subscribeModalId },
    ];

    forms.forEach(form => {
        const formElement = document.getElementById(form.id);
        if (formElement) {
            formElement.addEventListener("submit", (event) => handleFormSubmit(event, form.id, form.url, form.successModalId || successModalId));
        }
    });

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", () => closeModal(successModalId));

    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav');
    menuIcon.addEventListener('click', () => nav.classList.toggle('show'));

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
        const today = new Date().toISOString().split("T")[0];
        document.querySelectorAll('input[id^="leavingOn"], input[id^="returningOn"]').forEach(input => {
            input.min = today;
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

    document.querySelectorAll('.hotel-card').forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();
            const url = card.getAttribute('data-url');
            window.location.href = url;
        });
    });

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
            closeModal(successModalId);
        } else if (event.target === subscribeModal) {
            closeModal(subscribeModalId);
        }
    };

    const closeButtons = document.querySelectorAll('.modal .close');
    closeButtons.forEach(button => {
        button.onclick = function() {
            button.parentElement.parentElement.style.display = 'none';
        };
    });
});
