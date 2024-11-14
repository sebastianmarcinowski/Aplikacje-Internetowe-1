function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showErrors);
    } else {
        document.getElementById('localization').innerText = "Geolocation is not supported";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    document.getElementById('localization').innerText = `Latitude: ${lat}, Longitude: ${long}`;

    let map = L.map('localization').setView([lat, long], 18);
    L.tileLayer.provider("Esri.WorldImagery").addTo(map);
    let marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup("<b>Your location</b>");

    document.getElementById("saveLocalization").addEventListener("click", function () {
        leafletImage(map, function (err, canvas) {
            let rasterMap = document.getElementById("puzzleView");
            let rasterContext = rasterMap.getContext("2d");

            rasterContext.drawImage(canvas, 0, 0, 300, 150);

            cutAndShuffleImage();
        });
    });
}

function showErrors(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('localization').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('localization').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('localization').innerText = "The request to get user location timed out.";
            break;
        default:
            break;
    }
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    } else {
        console.log('This browser does not support notifications.');
    }
}
function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    requestNotificationPermission();
});

let pieces = [];
function cutAndShuffleImage() {
    const sourceCanvas = document.getElementById('puzzleView');
    const destinationContainer = document.getElementById('puzzles');
    const sourceImage = sourceCanvas.getContext('2d', { willReadFrequently: true });
    const pieceWidth = sourceCanvas.width / 4;
    const pieceHeight = sourceCanvas.height / 4;
    pieces = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const piece = sourceImage.getImageData(j * pieceWidth, i * pieceHeight, pieceWidth, pieceHeight);
            pieces.push({ piece, x: j, y: i }); // Store coordinates as grid positions
        }
    }

    // Shuffle pieces randomly
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Clear and populate the pieces container
    destinationContainer.innerHTML = '';
    let id = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const pieceCanvas = document.createElement('canvas');
            pieceCanvas.width = pieceWidth;
            pieceCanvas.height = pieceHeight;
            pieceCanvas.id = `piece-${id}`;
            pieceCanvas.classList.add('draggable');
            pieceCanvas.draggable = true;
            pieceCanvas.addEventListener('dragstart', dragStart);
            pieceCanvas.getContext('2d').putImageData(pieces[id].piece, 0, 0);
            destinationContainer.appendChild(pieceCanvas);
            id++;
        }
    }

    setupDragAndDrop();
}

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function dropPiece(event) {
    event.preventDefault();
    const pieceID = event.dataTransfer.getData('text');
    const piece = document.getElementById(pieceID);

    // Get target slot's coordinates
    const slotX = parseInt(event.target.dataset.x);
    const slotY = parseInt(event.target.dataset.y);

    // Find correct piece for slot
    const pieceIndex = parseInt(pieceID.split('-')[1]);
    const correctPiece = pieces[pieceIndex];

    //Logs to check slot and piece coordinates
    //console.log(`Slot coordinates: (${slotX}, ${slotY})`);
    //console.log(`Piece coordinates: (${correctPiece.x}, ${correctPiece.y})`);

    if (correctPiece.x === slotX && correctPiece.y === slotY) {
        event.target.appendChild(piece);
        piece.draggable = false;
        piece.style.border = "1px solid green"; // Indicate correct placement
        setTimeout(isSolution, 0);
    } else {
        piece.style.border = "1px solid red"; // Indicate incorrect placement
    }
}
function isSolution() {
    const slots = document.querySelectorAll('.slot');
    const solved = Array.from(slots).every(slot => slot.children.length > 0 && !slot.children[0].draggable);

    if (solved) {
        alert('Puzzle Solved!');
        showNotification('Puzzle Solved!', 'Congratulations, you have solved the puzzle!');
    }
}

function setupDragAndDrop() {
    let items = document.querySelectorAll('.draggable');
    for (let item of items) {
        item.addEventListener("dragstart", function (event) {
            this.style.border = "5px dashed #D8D8FF";
            event.dataTransfer.setData("text", this.id);
        });

        item.addEventListener("dragend", function (event) {
            this.style.borderWidth = "0";
        });
    }

    let targets = document.querySelectorAll(".slot");
    for (let target of targets) {
        target.addEventListener("dragenter", function (event) {
            this.style.border = "2px solid #7FE9D9";
        });
        target.addEventListener("dragleave", function (event) {
            this.style.border = "2px dashed #7f7fe9";
        });
        target.addEventListener("dragover", function (event) {
            event.preventDefault();
        });
        target.addEventListener("drop", dropPiece);
    }
}
