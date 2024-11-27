// room-details.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');
    const carouselSlides = document.querySelector('.carousel-slides');
    const thumbnailPreview = document.querySelector('.thumbnail-preview');

    fetch('../data/rooms.json')
        .then(response => response.json())
        .then(data => {
            const room = data.rooms.find(r => r.id === roomId);
            if (room) {
                displayRoomDetails(room);
                createCarousel(room.images);
                startCarousel();
            }
        });

    function displayRoomDetails(room) {
        document.getElementById('agency-name').textContent = room.agency;
        document.getElementById('star-rating').textContent = room.rating;
        document.getElementById('room-type').textContent = room.type;
        document.getElementById('room-rate').textContent = room.rate;
        document.getElementById('beds-count').textContent = room.beds;
        document.getElementById('bathroom-count').textContent = room.bathrooms;
        document.getElementById('description').textContent = room.description;
        document.getElementById('map-location').src = room.mapUrl;
    }

    function createCarousel(images) {
        images.forEach((imgSrc, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            slide.style.backgroundImage = `url('${imgSrc}')`;
            carouselSlides.appendChild(slide);

            // Create thumbnail
            const thumbnail = document.createElement('img');
            thumbnail.src = imgSrc;
            thumbnail.addEventListener('click', () => jumpToSlide(index));
            if (index === 0) thumbnail.classList.add('active');
            thumbnailPreview.appendChild(thumbnail);
        });
    }

    let currentSlideIndex = 0;

    function startCarousel() {
        setInterval(() => {
            nextSlide();
        }, 1000);
    }

    function nextSlide() {
        const slides = document.querySelectorAll('.carousel-slide');
        const thumbnails = document.querySelectorAll('.thumbnail-preview img');
        slides[currentSlideIndex].style.display = 'none';
        thumbnails[currentSlideIndex].classList.remove('active');

        currentSlideIndex = (currentSlideIndex + 1) % slides.length;

        slides[currentSlideIndex].style.display = 'block';
        thumbnails[currentSlideIndex].classList.add('active');

        // Smoothly move to the next slide
        const slideWidth = slides[currentSlideIndex].clientWidth;
        carouselSlides.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    }

    function jumpToSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        const thumbnails = document.querySelectorAll('.thumbnail-preview img');
        slides[currentSlideIndex].style.display = 'none';
        thumbnails[currentSlideIndex].classList.remove('active');

        currentSlideIndex = index;

        slides[currentSlideIndex].style.display = 'block';
        thumbnails[currentSlideIndex].classList.add('active');

        // Smoothly move to the clicked slide
        const slideWidth = slides[currentSlideIndex].clientWidth;
        carouselSlides.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    }
});
