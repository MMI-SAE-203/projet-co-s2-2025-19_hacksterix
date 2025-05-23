let currentIndex = 0;
const slides = document.getElementById("carouselSlides");
const dots = document.querySelectorAll(".dot");
const totalSlides = dots.length;

function updateCarousel(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-white", i === index);
    dot.classList.toggle("bg-white/50", i !== index);
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel(currentIndex);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel(currentIndex);
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    currentIndex = parseInt(dot.getAttribute("data-index"));
    updateCarousel(currentIndex);
  });
});

updateCarousel(currentIndex);

