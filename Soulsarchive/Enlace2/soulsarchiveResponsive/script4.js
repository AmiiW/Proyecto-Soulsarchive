// Fondos disponibles
const fondos = [
    'Back1.gif',
    'Back3.gif',
    'Back4.gif',
    'Back2.png',
    'Back5.jpg'
];
let currentFondoIndex = 0;

// Establecer el fondo por defecto
document.body.style.backgroundImage = `url(${fondos[currentFondoIndex]})`;

// Cambiar fondo al presionar el botón
document.getElementById('change-bg-btn').addEventListener('click', () => {
    currentFondoIndex = (currentFondoIndex + 1) % fondos.length;
    document.body.style.backgroundImage = `url(${fondos[currentFondoIndex]})`;
    document.body.style.backgroundSize = 'cover'; // Asegura que el fondo se ajuste a la pantalla
});

// Funcionalidad de las flechas en el carousel
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.left-arrow').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlidePosition();
});

function updateSlidePosition() {
    const carouselContent = document.querySelector('.carousel-content');
    carouselContent.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

/* 
/* Codigo para sacar el video de las imagenes 
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function() {
        const code = document.getElementById('codeInput').value;
        const feedbackMessage = document.getElementById('feedbackMessage');
        const successSound = document.getElementById('successSound');
        const successSound2 = document.getElementById('successSound2');
        
        if (code === '6783321') {
            const coveredVideos = document.querySelectorAll('.covered .mediaContainer video');
            coveredVideos.forEach(video => {
                video.classList.add('hidden');
                const hiddenImage = video.nextElementSibling; // Asumiendo que la imagen es el siguiente elemento
                hiddenImage.classList.remove('hiddenImage');
                hiddenImage.classList.add('visibleImage');
            });
            feedbackMessage.textContent = 'Código correcto ✓';
            feedbackMessage.classList.add('success');
            feedbackMessage.classList.remove('error');
            successSound.play();
        } else {
            feedbackMessage.textContent = 'Código incorrecto ✕';
            feedbackMessage.classList.add('error');
            feedbackMessage.classList.remove('success');
            successSound2.play();
        }
    });
});
// Fin

/* Inicio juego snake*/

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playButton");
const scoreDisplay = document.getElementById("score");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;
let score = 0;
let interval;

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    canvas.style.display = 'block';
    scoreDisplay.style.display = 'block';
    startGame();
});

function startGame() {
    canvas.width = 300;
    canvas.height = 300;
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();
    
    interval = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();
        
        if (snake.eat(fruit)) {
            fruit.pickLocation();
            score++;
            scoreDisplay.innerText = "Score: " + score;
        }
        
        snake.checkCollision();
    }, 250);
}

window.addEventListener('keydown', e => {
    const direction = e.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    
    this.draw = function() {
        ctx.fillStyle = "#4caf50";
        
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        
        ctx.fillRect(this.x, this.y, scale, scale);
    }
    
    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        
        if (this.total >= 1) {
            this.tail[this.total - 1] = { x: this.x, y: this.y };
        }
        
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        if (this.x >= canvas.width) {
            this.x = 0;
        }
        
        if (this.y >= canvas.height) {
            this.y = 0;
        }
        
        if (this.x < 0) {
            this.x = canvas.width - scale;
        }
        
        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    }
    
    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    }
    
    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        
        return false;
    }
    
    this.checkCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                clearInterval(interval);
                this.total = 0;
                this.tail = [];
                score = 0;
                scoreDisplay.innerText = "Score: " + score;
                playButton.style.display = 'block';
                canvas.style.display = 'none';
                scoreDisplay.style.display = 'none';
            }
        }
    }
}

function Fruit() {
    this.x;
    this.y;
    
    this.pickLocation = function() {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random() * rows) * scale;
    }
    
    this.draw = function() {
        ctx.fillStyle = "#f44336";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}

/* Resolución */

function checkResolution() {
    if (window.innerWidth < 1624 || window.innerWidth > 2099 || window.innerHeight < 900) {
        document.getElementById('resolution-warning').style.display = 'flex';
    } else {
        document.getElementById('resolution-warning').style.display = 'none';
    }
}

window.addEventListener('resize', checkResolution);
window.addEventListener('load', checkResolution);

/* Mp3 */

// Array de canciones
const songs = [
    { src: 'Musica/Bad Boy.mp3', icon: 'Portadas/BadBoy.jpg', title: 'Bad Boy - S3RL' },
    { src: 'Musica/Caramelldansen.mp3', icon: 'Portadas/Caramelldansen.jpg', title: 'Caramelldansen - Caramella Girls' },
    { src: 'Musica/Mtc.mp3', icon: 'Portadas/Mtc.jpg', title: 'Mtc - S3RL' },
    { src: 'Musica/Everytime We Touch.mp3', icon: 'Portadas/Everytime We Touch.jpg', title: 'Everytime We Touch - Cascada' },
    { src: 'Musica/Vi sitter i Ventrilo och Spelar DotA.mp3', icon: 'Portadas/Vi sitter i Ventrilo och Spelar DotA.jpg', title: 'Vi sitter i Ventrilo och Spelar DotA - Basshunter' },
    { src: 'Musica/Basshunter Minimix.mp3', icon: 'Portadas/Basshunter Minimix.jpg', title: 'Basshunter Minimix' },
    { src: 'Musica/Butterfly.mp3', icon: 'Portadas/Butterfly.jpg', title: 'Butterfly - SMiLE.dk' },
    { src: 'Musica/Go Go Go Go! - Radio Edit.mp3', icon: 'Portadas/Go Go Go Go! - Radio Edit.jpg', title: 'Go Go Go Go! - Radio Edit' },
    { src: 'Musica/Pika Girl.mp3', icon: 'Portadas/Pika Girl.jpg', title: 'Pika Girl - S3RL' },
    { src: 'Musica/Pretty Rave Girl.mp3', icon: 'Portadas/Pretty Rave Girl.jpg', title: 'Pretty Rave Girl - S3RL' },
    { src: 'Musica/Spelar Ingen Roll.mp3', icon: 'Portadas/Spelar Ingen Roll.jpg', title: 'Spelar Ingen Roll - Caramella Girls' },
    { src: 'Musica/Stereo Love - Sped Up Version.mp3', icon: 'Portadas/Stereo Love - Sped Up Version.jpg', title: 'Stereo Love - Sped Up Version' },
    { src: 'Musica/Superstar.mp3', icon: 'Portadas/Superstar.jpg', title: 'Superstar - Toy-Box' },
    { src: 'Musica/Vad Heter Du_.mp3', icon: 'Portadas/Caramelldansen.jpg', title: 'Vad Heter Du_ - Caramella Girls' },
    { src: 'Musica/PoPiPo.mp3', icon: 'Portadas/PoPiPo.jpg', title: 'PoPiPo - Hatsune Miku' },
    { src: 'Musica/Hatsune Miku - Ievan Polkka.mp3', icon: 'Portadas/Hatsune Miku - Ievan Polkka.jpg', title: 'Ievan Polkka - Hatsune Miku' },
    { src: 'Musica/Audio28.mp3', icon: 'Portadas/Audio28.png', title: 'Audio 28' },
    { src: 'Musica/Perfume.mp3', icon: 'Portadas/Perfume.jpg', title: 'Perfume「エレクトロ・ワールド」' },
    { src: 'Musica/Jamba - Schnuffel .mp3', icon: 'Portadas/Jamba.jpg', title: 'Jamba - Schnuffel' },
    { src: 'Musica/Boa.mp3', icon: 'Portadas/Boa.jpg', title: 'Bôa - Duvet' },
    // Añade más canciones aquí
];

// Variables de control
let currentIndex = 0;
const audioElement = document.getElementById('audio');
const coverArtElement = document.getElementById('cover-art');
const titleElement = document.getElementById('song-title');
const playPauseBtn = document.getElementById('play-pause-btn');

// Cargar la canción actual
function loadSong(index) {
    const song = songs[index];
    audioElement.src = song.src;
    coverArtElement.src = song.icon;
    titleElement.textContent = song.title;
    audioElement.play(); // Reproduce automáticamente al cargar
    playPauseBtn.textContent = '⏸'; // Mostrar el icono de pausa
}

// Reproducir o pausar la canción
function togglePlayPause() {
    if (audioElement.paused) {
        audioElement.play();
        playPauseBtn.textContent = '⏸'; // Mostrar el icono de pausa
    } else {
        audioElement.pause();
        playPauseBtn.textContent = '▶️'; // Mostrar el icono de play
    }
}

// Avanzar a la siguiente canción en orden aleatorio
function nextSong() {
    currentIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentIndex);
}

// Retroceder a la canción anterior en orden aleatorio
function prevSong() {
    currentIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentIndex);
}

// Inicializar reproductor con la primera canción
loadSong(currentIndex);

// Añadir event listeners a los botones
document.getElementById('play-pause-btn').addEventListener('click', togglePlayPause);
document.getElementById('prev-btn').addEventListener('click', prevSong);
document.getElementById('next-btn').addEventListener('click', nextSong);

/* Aparicion imagen */

let inactivityTime = function () {
    let time;
    let image = document.getElementById('inactiveImage');

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    window.onscroll = hideImage;
    image.onclick = hideImage;

    function showImage() {
        image.classList.add('show');
        image.classList.remove('hide');
    }

    function hideImage() {
        image.classList.add('hide');
        image.classList.remove('show');
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(showImage, 7000); // 30 segundos
    }
};

window.onload = function () {
    inactivityTime();
};

/* Fin aparicion imagen */

function checkCode() {
    const codeInput = document.getElementById('codeInput').value;
    const correctCode = "6783321";
    const message = document.getElementById('codeMessage');
    const hiddenImages = document.querySelectorAll('.hidden-img');
    const overlayVideos = document.querySelectorAll('.overlay-video');

    if (codeInput === correctCode) {
        message.textContent = "Código correcto ✔️";
        message.classList.add('correct');
        message.classList.remove('incorrect');

        overlayVideos.forEach(video => video.style.display = 'none');
        hiddenImages.forEach(img => img.style.display = 'block');

        new Audio('Success.mp3').play(); // Reproduce el sonido correcto
    } else {
        message.textContent = "Código erróneo ❌";
        message.classList.add('incorrect');
        message.classList.remove('correct');

        new Audio('Fail.mp3').play(); // Reproduce el sonido de error
    }
}

/* Pantalla de carga */
document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const gif = document.getElementById('loading-gif');

    function hideLoader() {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none'; // Ocultar completamente el loader después del fade-out
            content.classList.add('show'); // Mostrar el contenido de la página
        }, 1000); // Duración de la transición del fade-out
    }

    function showLoader() {
        loader.style.display = 'flex'; // Asegurar que el loader esté visible
        loader.classList.remove('fade-out');
    }

    // Si hay algún error al cargar el gif, mostrarlo en la consola
    gif.addEventListener('error', (e) => {
        console.error('Error al cargar el gif:', e);
    });

    // Simular la carga del contenido
    setTimeout(hideLoader, 900); // Ajusta el tiempo de carga simulado según sea necesario

    // Lógica para redirecciones con animación de cargador
    window.navigateTo = function(url) {
        showLoader(); // Muestra el cargador cuando cambies de página
        setTimeout(() => {
            window.location.href = url;
        }, 1000); // Tiempo antes de la redirección
    };
});

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// Fin