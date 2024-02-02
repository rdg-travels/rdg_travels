const form = document.querySelector('.flight-form');

form.addEventListener('submit', function(event) {
    if (!isValid()) {
        event.preventDefault();
    }
});
