let isDragging = false;
let initialX, initialY, offsetX = 0, offsetY = 0;
const img = document.getElementById('imagen-flotante');
const audioBackground = document.getElementById('audio-background');
const audioClick = document.getElementById('audio-click');
const flecha = document.getElementById('flecha');
const playSoundButton = document.getElementById('play-sound');

// Lista de audios para reproducir al azar
const audios = ['Audio1.mp3', 'Audio2.mp3', 'Audio3.mp3'];
const audioCaida = 'Caida.mp3';

// Función para reproducir un audio al azar
function playRandomAudio() {
    const randomAudio = audios[Math.floor(Math.random() * audios.length)];
    audioBackground.src = randomAudio;
    audioBackground.play();
}

// Manejar el botón de reproducir sonido
playSoundButton.addEventListener('click', () => {
    audioBackground.pause();
    audioBackground.currentTime = 0;
    playRandomAudio();
});

img.addEventListener('mousedown', (e) => {
    isDragging = true;
    initialX = e.clientX - offsetX;
    initialY = e.clientY - offsetY;
    img.style.animation = 'none'; // Detener la animación de levitación
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        const transformValue = `translate(${offsetX}px, ${offsetY}px)`;
        img.style.transform = transformValue;

        // Forzar la posición actual antes de la animación de caída
        requestAnimationFrame(() => {
            img.style.animation = 'none'; // Desactivar cualquier animación previa
            img.style.transform = transformValue; // Mantener la posición final

            // Esperar un fotograma antes de iniciar la animación de caída
            requestAnimationFrame(() => {
                img.style.animation = 'caer 1s forwards';
                // Detener el audio de fondo
                audioBackground.pause();
                audioBackground.currentTime = 0;

                // Reproducir el sonido de caída
                audioClick.src = audioCaida;
                audioClick.play();

                // Mostrar la flecha cuando la imagen se cae
                setTimeout(() => {
                    flecha.style.display = 'block';
                }, 1000); // Ajusta el tiempo para que coincida con el final de la animación de caída
            });
        });
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        offsetX = e.clientX - initialX;
        offsetY = e.clientY - initialY;
        img.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
});

img.addEventListener('click', () => {
    audioBackground.pause();
    playRandomAudio();
});


// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// Fin