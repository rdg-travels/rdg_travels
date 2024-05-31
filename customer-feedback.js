document.addEventListener("DOMContentLoaded", function() {
    // Get all rating icons
    var ratingIcons = document.querySelectorAll('.rating-icons i');

    // Loop through each rating icon
    ratingIcons.forEach(function(icon, index) {
      // Add click event listener
      icon.addEventListener('click', function() {
        // Reset all icons to grey
        ratingIcons.forEach(function(ratingIcon) {
            ratingIcon.classList.remove('blue');
            ratingIcon.classList.add('grey');
        });
  
        // Update the color of clicked icon to blue
        icon.classList.remove('grey');
        icon.classList.add('blue');

        switch(index) {
          case 0:
            // Update feedback for the first rating
            document.querySelector('.customer-quote').textContent = "I had an amazing experience studying abroad with RDG Consult Global Services. The team was very helpful and made the whole process stress-free.";
            document.querySelector('#customer-image').setAttribute('src', '/images/customer-image.png');
            document.querySelector('.customer-name').textContent = "Smith Johnson";
            document.querySelector('.customer-location').textContent = "London, United Kingdom";
            document.querySelector('#rating1').setAttribute('color', 'blue')
            break;
          case 1:
            // Update feedback for the second rating
            document.querySelector('.customer-quote').textContent = "My experience with RDG Consult Global Services exceeded all expectations. The team went above and beyond to ensure everything was seamless.";
            document.querySelector('#customer-image').setAttribute('src', '/images/Ellipse 53.png');
            document.querySelector('.customer-name').textContent = "Jane Smith";
            document.querySelector('.customer-location').textContent = "New York, USA";
            break;
          case 2:
            // Update feedback for the second rating
            document.querySelector('.customer-quote').textContent = "RDG Consult Global Services made my dream of studying abroad a reality. I'm grateful for their support throughout the entire process.";
            document.querySelector('#customer-image').setAttribute('src', '/images/Ellipse 55.png');
            document.querySelector('.customer-name').textContent = "Chinwe Segun";
            document.querySelector('.customer-location').textContent = "London, United Kingdom";
            break;
          case 3:
            // Update feedback for the second rating
            document.querySelector('.customer-quote').textContent = "Choosing RDG Consult Global Services was the best decision I made for my education. Their expertise and guidance were invaluable.";
            document.querySelector('#customer-image').setAttribute('src', '/images/Ellipse 52.png');
            document.querySelector('.customer-name').textContent = "Emily Brown";
            document.querySelector('.customer-location').textContent = "Toronto, Canada";
            break;
         case 4:
            // Update feedback for the second rating
            document.querySelector('.customer-quote').textContent = "I can't thank RDG Consult Global Services enough for their assistance. They made studying abroad feel effortless and stress-free.";
            document.querySelector('#customer-image').setAttribute('src', '/images/Ellipse 56.png');
            document.querySelector('.customer-name').textContent = "Chris Ade";
            document.querySelector('.customer-location').textContent = "New York, USA";
            break;
        }
      });
    });
  });