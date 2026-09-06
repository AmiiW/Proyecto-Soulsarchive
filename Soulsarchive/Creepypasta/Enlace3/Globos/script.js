const balloonContainer = document.getElementById('balloon-container');
const explosionSound = document.getElementById('explosion-sound');
const balloonImages = ['Azul.png', 'Verde.png', 'Rojo.png'];

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    const img = document.createElement('img');
    img.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];
    balloon.appendChild(img);

    // Posición inicial aleatoria
    balloon.style.left = `${Math.random() * 100}%`;

    balloon.addEventListener('click', () => {
        explosionSound.play();
        balloon.remove();
    });

    balloonContainer.appendChild(balloon);

    // Animación de flotación
    balloon.style.animation = `float ${5 + Math.random() * 5}s linear infinite`;
}

// Crear globos cada 2 segundos
setInterval(createBalloon, 2000);