const seats = document.querySelectorAll('.seat');
const acceptButton = document.getElementById('accept-btn');

let selectedSeat = null;

seats.forEach(seat => {
  seat.addEventListener('click', () => {
    // Deselect previously selected seat
    if (selectedSeat) {
      selectedSeat.classList.remove('selected');
    }

    // Select the clicked seat
    selectedSeat = seat;
    seat.classList.add('selected');

    // Show the accept button
    acceptButton.style.display = 'block';
  });
});

acceptButton.addEventListener('click', () => {
  setTimeout(() => {
    window.location.href = '../index.html'; // Cambia "nextpage.html" por la URL deseada
  }, 1500);
});

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// Fin