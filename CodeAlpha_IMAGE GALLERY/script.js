// Gallery images
const images = [
    { src: 'images/image1.jpg', alt: 'Project Image 1' },
    { src: 'images/image2.jpg', alt: 'Project Image 2' },
    { src: 'images/image3.jpg', alt: 'Project Image 3' },
    { src: 'images/image4.jpg', alt: 'Project Image 4' },
    { src: 'images/image5.jpg', alt: 'Project Image 5' },
    { src: 'images/image6.jpg', alt: 'Project Image 6' }
];

// Get DOM elements
const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const errorMessage = document.getElementById('errorMessage');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// Initialize gallery
function initGallery() {
    updateMainImage();
    createThumbnails();
    setupEventListeners();
}

// Update main image
function updateMainImage() {
    mainImage.classList.add('loading');
    errorMessage.style.display = 'none';
    
    const img = new Image();
    img.src = images[currentIndex].src;
    
    img.onload = () => {
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = img.src;
            mainImage.alt = images[currentIndex].alt;
            mainImage.classList.remove('loading');
            mainImage.style.opacity = '1';
            updateActiveThumbnail();
        }, 200);
    };
    
    img.onerror = () => {
        mainImage.classList.remove('loading');
        errorMessage.style.display = 'block';
    };
}

// Create thumbnail images
function createThumbnails() {
    images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.classList.add('thumbnail');
        
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateMainImage();
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Update active thumbnail
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showPreviousImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
    
    // Add touch navigation
    mainImage.addEventListener('touchstart', handleTouchStart);
    mainImage.addEventListener('touchend', handleTouchEnd);
}

// Navigation functions
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateMainImage();
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateMainImage();
}

// Touch navigation
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            showPreviousImage();
        } else {
            showNextImage();
        }
    }
}

// Auto-advance slideshow
let slideshowInterval;

function startSlideshow() {
    stopSlideshow();
    slideshowInterval = setInterval(showNextImage, 5000);
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initGallery);

// Uncomment the line below to enable auto-advance slideshow
// startSlideshow();