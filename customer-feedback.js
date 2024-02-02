document.addEventListener('DOMContentLoaded', function () {
    const ratingIcons = document.querySelectorAll('.rating-icons i');
    const customerContainers = document.querySelectorAll('.customer-feedback-container .customer-feedback-text');

    ratingIcons.forEach((icon, index) => {
        icon.addEventListener('click', function () {
            // Change color of clicked icon and reset colors of others
            ratingIcons.forEach((otherIcon, i) => {
                if (i <= index) {
                    otherIcon.classList.add('blue');
                } else {
                    otherIcon.classList.remove('blue');
                }
            });

            // Hide all customer containers
            customerContainers.forEach(container => {
                container.style.display = 'none';
            });

            // Show the customer container corresponding to the clicked icon
            customerContainers[index].style.display = 'block';
        });
    });
});
