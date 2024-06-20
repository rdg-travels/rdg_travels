function closeModal() {
    const successModal = document.getElementById("success-modal");
    successModal.style.display = 'none';
}

function closeSubscribeModal() {
    const subscribeModal = document.getElementById("subscribe-modal");
    subscribeModal.style.display = 'none';

}

document.addEventListener("DOMContentLoaded", function() {
    const flightForm = document.getElementById("flight-form1");
    const successModal = document.getElementById("success-modal");

    flightForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

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
            // Hide the preloader
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            flightForm.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    })
    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        // Close the modal when the close button is clicked
        closeModal();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const flightForm2 = document.getElementById("flight-form2");
    const successModal = document.getElementById("success-modal");

    flightForm2.addEventListener("submit", function(event) {
        event.preventDefault();

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

        const formData = new FormData(flightForm2);
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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            flightForm2.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    })
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

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            studyForm.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
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
    const studyForm2 = document.getElementById("study-form1");
    const successModal = document.getElementById("success-modal");

    studyForm2.addEventListener("submit", function(event) {
        event.preventDefault();

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

        const formData = new FormData(studyForm2);
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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            studyForm2.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
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

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            hotelForm.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
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
    const hotelForm2 = document.getElementById("hotel-form1");
    const successModal = document.getElementById("success-modal");

    hotelForm2.addEventListener("submit", function(event) {
        event.preventDefault();

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

        const formData = new FormData(hotelForm2);
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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            hotelForm2.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
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

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            bookingForm.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
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

        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';

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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            successModal.style.display = 'block';
            // Reset the flight form
            contactForm.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
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
        // Display the preloader
        document.getElementById('preloader').style.display = 'flex';
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
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
            // Display the success modal
            subscribeModal.style.display = 'block';
            // Reset the flight form
            subscribeForm.reset();
        })
        .catch(error => {
            // Hide the preloader in case of error
            document.getElementById('preloader').style.display = 'none';
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
  
document.addEventListener('DOMContentLoaded', () => {
    // Elements for the photo modal
    const photoModal = document.getElementById('photoModal');
    const viewAllPhotosLink = document.getElementById('viewAllPhotosLink');
    const photoModalClose = document.getElementById('photoModalClose');
  
    // Function to open the photo modal
    viewAllPhotosLink.onclick = function(event) {
      event.preventDefault(); // Prevent the default anchor behavior
      photoModal.style.display = 'block';
    };
  
    // Function to close the photo modal
    photoModalClose.onclick = function() {
      photoModal.style.display = 'none';
    };
  
    // Close the modal if the user clicks outside of it
    window.onclick = function(event) {
      if (event.target === photoModal) {
        photoModal.style.display = 'none';
      }
    };
  
    // Existing modal handling (assuming similar structure)
    const successModal = document.getElementById('success-modal');
    const subscribeModal = document.getElementById('subscribe-modal');
    const closeButtons = document.querySelectorAll('.modal .close');
  
    closeButtons.forEach(button => {
      button.onclick = function() {
        button.parentElement.parentElement.style.display = 'none';
      };
    });
  
    window.onclick = function(event) {
      if (event.target === successModal) {
        successModal.style.display = 'none';
      } else if (event.target === subscribeModal) {
        subscribeModal.style.display = 'none';
      } else if (event.target === photoModal) {
        photoModal.style.display = 'none';
      }
    };

});
  