// Modal Handling
function closeModal(modal) {
    if (modal) modal.style.display = 'none';
}

// Preloader
function showPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'flex';
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
}

// Form Submission Handler
async function handleFormSubmit(form, endpoint, successModal) {
    try {
        showPreloader();
        const formData = new FormData(form);
        const apiUrl = 'https://rdg-travels.onrender.com';

        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const contentType = response.headers.get('Content-Type');
        const data = contentType && contentType.includes('application/json') 
            ? await response.json() 
            : await response.text();

        if (successModal) {
            successModal.style.display = 'block';
        }

        form.reset();
        return data;

    } catch (error) {
        hidePreloader();
        console.error(error);
        alert("An error occurred while sending the message.");
    }
}

// Form Initialization
function initForms() {
    const forms = [
        { id: 'flight-form1', endpoint: 'booking-flight', modal: 'success-modal' },
        { id: 'flight-form2', endpoint: 'booking-flight', modal: 'success-modal' },
        { id: 'study-form', endpoint: 'studying-abroad', modal: 'success-modal' },
        { id: 'study-form1', endpoint: 'studying-abroad', modal: 'success-modal' },
        { id: 'hotel-form', endpoint: 'book-hotel', modal: 'success-modal' },
        { id: 'hotel-form1', endpoint: 'book-hotel', modal: 'success-modal' },
        { id: 'booking-form', endpoint: 'book-now', modal: 'success-modal' },
        { id: 'contact-form', endpoint: 'contact-us', modal: 'success-modal' },
        { id: 'subscribe-form', endpoint: 'subscribe', modal: 'subscribe-modal' },
    ];

    forms.forEach(({ id, endpoint, modal }) => {
        const form = document.getElementById(id);
        const successModal = document.getElementById(modal);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(form, endpoint, successModal);
        });
    });

    // Global close buttons
    document.querySelectorAll('.modal .close').forEach(button => {
        button.addEventListener('click', () => closeModal(button.closest('.modal')));
    });

    // Close modals on outside click
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) closeModal(modal);
        });
    });
}

// Flight Trip Logic
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

function setMinDates() {
    const today = new Date().toISOString().split("T")[0];
    document.querySelectorAll('input[id^="leavingOn"], input[id^="returningOn"]').forEach(input => {
        input.min = today;
    });
}

function initFlightLogic() {
    setMinDates();

    document.querySelectorAll('input[name="tripType"]').forEach(radio => {
        radio.addEventListener('change', toggleReturnDate);
    });

    document.querySelectorAll('input[id^="returningOn"]').forEach(input => {
        input.addEventListener('change', validateReturningDate);
    });

    const initialTripType = document.querySelector('input[name="tripType"]:checked');
    if (initialTripType) toggleReturnDate({ target: initialTripType });
}

// Hotel Cards Navigation
function initHotelCards() {
    document.querySelectorAll('.hotel-card').forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const url = card.getAttribute('data-url');
            if (url) window.location.href = url;
        });
    });
}

// Photo Modal
function initPhotoModal() {
    const photoModal = document.getElementById('photoModal');
    const viewAllPhotosLink = document.getElementById('viewAllPhotosLink');
    const photoModalClose = document.getElementById('photoModalClose');

    if (viewAllPhotosLink && photoModal) {
        viewAllPhotosLink.addEventListener('click', (e) => {
            e.preventDefault();
            photoModal.style.display = 'block';
        });
    }

    if (photoModalClose && photoModal) {
        photoModalClose.addEventListener('click', () => closeModal(photoModal));
    }
}

// Menu Toggle
function initMenuToggle() {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav');
    if (menuIcon && nav) {
        menuIcon.addEventListener('click', () => nav.classList.toggle('show'));
    }
}

function initModalHandling() {
    // Close modals via close button
    document.querySelectorAll('.modal .close').forEach(button => {
        button.addEventListener('click', (event) => {
            const modal = button.closest('.modal');
            closeModal(modal);
            hidePreloader(); // Ensure preloader stops
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
                hidePreloader();
            }
        });
    });
}

// Footer Year
function setFooterYear() {
    const yearElem = document.getElementById('copyright-year');
    if (yearElem) yearElem.textContent = new Date().getFullYear();
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initForms();
    initFlightLogic();
    initHotelCards();
    initPhotoModal();
    initMenuToggle();
    initModalHandling();
    setFooterYear();
});
