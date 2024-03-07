function closeModal() {
    const successModal = document.getElementById("success-modal");
    successModal.style.display = 'none';
}

function closeSubscribeModal() {
    const subscribeModal = document.getElementById("subscribe-modal");
    subscribeModal.style.display = 'none';

}

document.addEventListener("DOMContentLoaded", function() {
    const successModal = document.getElementById("success-modal");

    function closeModal() {
        successModal.style.display = 'none';
    }

    function handleSubmitForm(form, endpoint) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            if (!validateForm(form)) return;

            const formData = new FormData(form);
            const apiUrl = 'https://rdg-travels.onrender.com';

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
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
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

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", closeModal);

    handleSubmitForm(document.getElementById("flight-form"), "booking-flight");
    handleSubmitForm(document.getElementById("flight-form1"), "booking-flight");
    handleSubmitForm(document.getElementById("study-form"), "studying-abroad");
    handleSubmitForm(document.getElementById("study-form1"), "studying-abroad");
    handleSubmitForm(document.getElementById("hotel-form"), "book-hotel");
    handleSubmitForm(document.getElementById("hotel-form1"), "book-hotel");
    handleSubmitForm(document.getElementById("booking-form"), "book-now");
    handleSubmitForm(document.getElementById("contact-form"), "contact-us");

    const subscribeModal = document.getElementById("subscribe-modal");
    const closeSubscribeModal = () => { subscribeModal.style.display = 'none'; };

    const subscribeForm = document.getElementById("subscribe-form");
    subscribeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!validateForm(subscribeForm)) return;

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
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(data => {
            subscribeModal.style.display = 'block';
            subscribeForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while sending the message.");
        });
    });

    const closeButtonSubscribe = document.getElementById("closeButtonSubscribe");
    closeButtonSubscribe.addEventListener("click", closeSubscribeModal);

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input');
        inputs.forEach(function(input) {
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
});
