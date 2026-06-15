const sliderImages = Array.from(document.querySelectorAll('.slider-container img'));
const slidesCount = sliderImages.length;
let currentSlide = 1;
let autoplayInterval = null;
let isPlaying = true;
const slideNumberElement = document.getElementById('slide-number');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const playPauseButton = document.getElementById('play-pause');
const sliderContainer = document.querySelector('.slider-container');
// إنشاء الـ Pagination
const paginationElement = document.createElement('ul');
paginationElement.id = 'pagination-ul';
for (let i = 1; i <= slidesCount; i++) {
  const paginationItem = document.createElement('li');
  paginationItem.dataset.index = i;
  paginationItem.textContent = i;
  paginationElement.appendChild(paginationItem);
}
document.getElementById('indicators').appendChild(paginationElement);
const paginationsBullets = Array.from(paginationElement.children);
// الأحداث
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;
playPauseButton.onclick = toggleAutoplay;
paginationElement.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    currentSlide = parseInt(e.target.dataset.index);
    theChecker();
    resetAutoplay();
  }
});
// دعم السحب باللمس للجوال
let touchStartX = 0;
let touchEndX = 0;
sliderContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
sliderContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    nextSlide();
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    prevSlide();
  }
  resetAutoplay();
}
// دوال السلايدر
function nextSlide() {
  if (currentSlide === slidesCount) {
    currentSlide = 1; // Loop back to first
  } else {
    currentSlide++;
  }
  theChecker();
}
function prevSlide() {
  if (currentSlide === 1) {
    currentSlide = slidesCount; // Loop to last
  } else {
    currentSlide--;
  }
  theChecker();
}
function theChecker() {
  slideNumberElement.textContent = `Slide ${currentSlide} / ${slidesCount}`;
  removeAllActive();
  sliderImages[currentSlide - 1].classList.add('active');
  paginationsBullets[currentSlide - 1].classList.add('active');
  // شلت الـ disabled عشان السلايدر يلف loop
  prevButton.classList.remove('disabled');
  nextButton.classList.remove('disabled');
}
function removeAllActive() {
  sliderImages.forEach(img => img.classList.remove('active'));
  paginationsBullets.forEach(bullet => bullet.classList.remove('active'));
}
// Autoplay
function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 3000);
  isPlaying = true;
  playPauseButton.textContent = 'Pause';
}
function stopAutoplay() {
  clearInterval(autoplayInterval);
  isPlaying = false;
  playPauseButton.textContent = 'Play';
}
function toggleAutoplay() {
  isPlaying? stopAutoplay() : startAutoplay();
}
function resetAutoplay() {
  if (isPlaying) {
    stopAutoplay();
    startAutoplay();
  }
}
// وقف الـ autoplay لو الماوس فوق السلايدر
sliderContainer.addEventListener('mouseenter', stopAutoplay);
sliderContainer.addEventListener('mouseleave', () => {
  if (isPlaying) startAutoplay();
});
// شغل كل شي
theChecker();
startAutoplay();
