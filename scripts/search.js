// search.js
fetch('data/rooms.json')
    .then(response => response.json())
    .then(data => {
        // Populate room cards based on filters
        const searchBtn = document.getElementById('search-btn');
        searchBtn.addEventListener('click', function () {
            const location = document.getElementById('location').value.toLowerCase();
            const roomType = document.getElementById('room-type').value;
            const beds = parseInt(document.getElementById('beds').value, 10);
            const bathrooms = parseInt(document.getElementById('bathrooms').value, 10);

            const filteredRooms = data.rooms.filter(room => {
                return (location === '' || room.location.toLowerCase().includes(location)) &&
                       (roomType === '' || room.type === roomType) &&
                       (!isNaN(beds) ? room.beds >= beds : true) &&
                       (!isNaN(bathrooms) ? room.bathrooms >= bathrooms : true);
            });

            displayRooms(filteredRooms);
        });
    });

function displayRooms(rooms) {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = '';
    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.classList.add('room-card');
        roomCard.innerHTML = `
            <img src="${room.image}" alt="Room Image">
            <h3>${room.type}</h3>
            <p>Rate: ${room.rate}</p>
            <button onclick="viewRoomDetails('${room.id}')">View Details</button>
        `;
        roomList.appendChild(roomCard);
    });
}

function viewRoomDetails(roomId) {
    window.location.href = `room-details.html?id=${roomId}`;
}
