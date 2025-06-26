// Wait until the entire HTML document is fully loaded and parsed
document.addEventListener('DOMContentLoaded', function () {

  // ===== Select all necessary DOM elements =====
  let slidesContainer = document.querySelector('.slides');       
  let prevButton = document.querySelector('.prev');              
  let nextButton = document.querySelector('.next');              
  let dotsContainer = document.querySelector('.dots');           
  let slide = document.querySelectorAll('.slide');               

  let slideCount = slide.length;                                 // Total number of slides
  let currentSlide = 0;                                          // Track the current active slide (starts at 0)

  // ===== Dynamically create dot indicators for each slide =====
  for (let i = 0; i < slideCount; i++) {
    let dot = document.createElement('span');                    // Create a new <span> element for each dot
    dot.classList.add('dot');                                    // Add 'dot' class for styling

    if (i === 0) {
      dot.classList.add('active');                               // Mark the first dot as active by default
    }

    dot.setAttribute("data-index", i);                           // Set a custom attribute to store the slide index
    dotsContainer.appendChild(dot);                              // Add the dot into the dots container
  }

  // Select all the created dots (now that they're in the DOM)
  let dots = document.querySelectorAll('.dots span');

  // ===== Function to update slider based on index =====
  function updateSlider(index) {
    // If the index is beyond the last slide, loop to the first
    if (index >= slideCount) {
      currentSlide = 0;
    }
    // If the index is before the first slide, go to the last slide
    else if (index < 0) {
      currentSlide = slideCount - 1;
    }
    // If index is valid, just update it
    else {
      currentSlide = index;
    }

    // Move the slidesContainer to show the correct slide
    slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;

    // Remove "active" class from all dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Add "active" class to the current slide's dot
    dots[currentSlide].classList.add('active');
  }

  // ===== Navigation: Previous Button Click Event =====
  prevButton.addEventListener('click', function () {
    updateSlider(currentSlide - 1);                               // Go to previous slide
  });

  // ===== Navigation: Next Button Click Event =====
  nextButton.addEventListener('click', function () {
    updateSlider(currentSlide + 1);                               // Go to next slide
  });

  // ===== Dot Navigation: When any dot is clicked =====
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      let index = parseInt(dot.getAttribute("data-index"));      // Get the dot's associated index
      updateSlider(index);                                       // Navigate to that slide
    });
  });

  // ===== Autoplay Function =====
function startAutoplay() {
  setInterval(() => {
    updateSlider(currentSlide + 1); // Move to next slide every 3 seconds
  }, 3000); // 3000ms = 3 seconds
}
// Start the autoplay
startAutoplay();
});
