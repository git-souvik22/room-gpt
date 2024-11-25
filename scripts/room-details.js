// room-details.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');

    fetch('data/rooms.json')
        .then(response => response.json())
        .then(data => {
            const room = data.rooms.find(r => r.id === roomId);
            if (room) {
                document.getElementById('agency-name').textContent = room.agency;
                document.getElementById('star-rating').textContent = room.rating;
                document.getElementById('room-type').textContent = room.type;
                document.getElementById('room-rate').textContent = room.rate;
                document.getElementById('beds-count').textContent = room.beds;
                document.getElementById('bathroom-count').textContent = room.bathrooms;
                document.getElementById('description').textContent = room.description;
                document.getElementById('map-location').src = room.mapUrl;

                // Load carousel images
                const carousel = document.querySelector('.carousel');
                room.images.forEach(img => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img;
                    carousel.appendChild(imgElement);
                });
            }
        });

    // Add call and WhatsApp functionality
    document.getElementById('call-btn').addEventListener('click', () => {
        window.location.href = 'tel:+1234567890';  // Replace with dynamic number if needed
    });
    document.getElementById('whatsapp-share').addEventListener('click', () => {
        const shareUrl = `https://wa.me/?text=Check out this room! ${window.location.href}`;
        window.open(shareUrl, '_blank');
    });
});
