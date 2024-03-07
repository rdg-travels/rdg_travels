function closeModal() {
    const successModal = document.getElementById("success-modal");
    successModal.style.display = 'none';
}

function closeSubscribeModal() {
    const subscribeModal = document.getElementById("subscribe-modal");
    subscribeModal.style.display = 'none';
}

function handleFormSubmit(event, form, successModalId) {
    event.preventDefault();
  
    if (!validateForm(form)) {
      return; // Prevent submission if validation fails
    }
  
    const formData = new FormData(form);
    const apiUrl = 'https://rdg-travels.onrender.com';
  
    fetch(`${apiUrl}/${form.dataset.action}`, {
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
        return response.json(); // Always try to parse as JSON
      })
      .then(data => {
        const successModal = document.getElementById(successModalId);
        successModal.style.display = 'block';
        form.reset();
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while sending the message.");
      });
  }

document.addEventListener("DOMContentLoaded", function() {
    const flightForm = document.getElementById("flight-form");
    const flightForm2 = document.getElementById("flight-form1");

    flightForm.addEventListener("submit", function(event) {
        handleFormSubmit(event, flightForm, "success-modal");
    });
    
    flightForm2.addEventListener("submit", function(event) {
        handleFormSubmit(event, flightForm2, "success-modal");
    });

    const studyForm = document.getElementById("study-form");

    studyForm.addEventListener("submit", function(event) {
        handleFormSubmit(event, studyForm, "success-modal");
    });

    const hotelForm = document.getElementById("hotel-form");

    hotelForm.addEventListener("submit", function(event) {
        handleFormSubmit(event, hotelForm, "success-modal");
    });

    const bookingForm = document.getElementById("booking-form");

    bookingForm.addEventListener("submit", function(event) {
        handleFormSubmit(event, bookingForm, "success-modal");
    });

    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function(event) {
        handleFormSubmit(event, contactForm, "success-modal");
    });

    const subscribeForm = document.getElementById("subscribe-form");

    subscribeForm.addEventListener("submit", function(event) {
        handleFormSubmit(event, subscribeForm, "subscribe-modal");
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
