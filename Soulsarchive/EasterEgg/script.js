const image = document.getElementById('escapeImage');
const clickSound = document.getElementById('clickSound');
const finalSound = document.getElementById('finalSound');
const backgroundSound = document.getElementById('backgroundSound'); // Sonido de fondo
let clickCount = 0;
let escapeCount = 0;
let imageSize = 100;
const maxEscapes = 10;
let allowEscape = true;
let isGrowing = false;

// Reproducir el sonido de fondo automáticamente al cargar la página en loop
window.onload = () => {
    backgroundSound.loop = true;  // Hacer que el sonido de fondo sea en bucle
    backgroundSound.play();
};

// Mover imagen a posición aleatoria en la pantalla
function moveImageRandomly() {
    const container = document.getElementById('gameContainer');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const randomX = Math.random() * (containerWidth - image.offsetWidth);
    const randomY = Math.random() * (containerHeight - image.offsetHeight);

    image.style.left = `${randomX}px`;
    image.style.top = `${randomY}px`;

    // Incrementar el contador de escapes solo en resoluciones de PC
    if (window.innerWidth > 768) {
        escapeCount++;
        if (escapeCount >= maxEscapes) {
            allowEscape = false;  // Después de 10 escapes, la imagen se deja tocar
        }
    }
}

// Mover imagen al acercar el cursor (solo si allowEscape es verdadero)
image.addEventListener('mouseenter', () => {
    if (allowEscape) {
        moveImageRandomly();
    }
});

// Mover imagen al hacer clic en celular o PC
image.addEventListener('click', () => {
    clickSound.play();
    clickCount++;

    if (clickCount < 5) {
        if (allowEscape) {
            moveImageRandomly();
        } else if (!allowEscape && window.innerWidth > 768) {
            escapeCount = 0;
            allowEscape = true;
        }
    } else if (clickCount === 5) {
        backgroundSound.pause();  // Detener el sonido de fondo cuando se llega a los 5 clics
        finalSound.loop = true;   // Activar el loop del sonido final
        finalSound.play();
        image.style.animation = "shake 0.5s infinite";
        centerImage();  // Centrar la imagen
        growImage();    // Comenzar a hacerla crecer
    }
});

// Centrar la imagen en el contenedor
function centerImage() {
    const container = document.getElementById('gameContainer');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const centerX = (containerWidth - image.offsetWidth) / 2;
    const centerY = (containerHeight - image.offsetHeight) / 2;

    image.style.left = `${centerX}px`;
    image.style.top = `${centerY}px`;
}

// Agrandar imagen lentamente hasta explotar
function growImage() {
    isGrowing = true;
    const growInterval = setInterval(() => {
        imageSize += 10;
        image.style.width = `${imageSize}px`;
        image.style.height = `${imageSize}px`;

        if (imageSize >= window.innerWidth || imageSize >= window.innerHeight) {
            clearInterval(growInterval);
            moveFrantically();  // Comenzar a moverse de forma frenética
        }
    }, 100);
}

// Mover la imagen de forma frenética dentro y fuera de la escena
function moveFrantically() {
    const franticMovement = setInterval(() => {
        const container = document.getElementById('gameContainer');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Posiciones aleatorias, algunas fuera de la pantalla
        const randomX = Math.random() * (containerWidth * 2) - containerWidth;
        const randomY = Math.random() * (containerHeight * 2) - containerHeight;

        image.style.left = `${randomX}px`;
        image.style.top = `${randomY}px`;

        // Parar el movimiento frenético si ya no está visible
        if (!isGrowing) {
            clearInterval(franticMovement);
        }
    }, 50);  // Movimiento rápido, ajustable
}

// Posición inicial aleatoria de la imagen
moveImageRandomly();