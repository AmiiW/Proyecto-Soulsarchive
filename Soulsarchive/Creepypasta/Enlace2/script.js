const backgrounds = [
    'Back2.png',
    'Back3.gif',
    'Back4.gif',
    'Back1.gif',
    'Back5.jpg'
];
let currentBackgroundIndex = 0;

document.getElementById('changeBackgroundButton').addEventListener('click', function() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    document.body.style.background = `url('${backgrounds[currentBackgroundIndex]}') no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
});

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// Fin

/* Inicio paantalla de carga */

document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    function hideLoader() {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            content.classList.add('show');
        }, 1000); // Tiempo de la transición del fade out
    }

    function showLoader() {
        loader.style.display = 'flex';
        loader.classList.remove('fade-out');
    }

    function navigateTo(url) {
        showLoader();
        setTimeout(() => {
            window.location.href = url;
        }, 1000); // Tiempo de la transición del fade in
    }

    // Simular que el contenido está listo
    setTimeout(hideLoader, 900); // Ajusta el tiempo según necesites

    // Verificar si el video se está cargando correctamente
    const video = document.getElementById('loading-video');
    video.addEventListener('error', (e) => {
        console.error('Error al cargar el video:', e);
    });
});

/* Fin pantalla de carga */ 

/* Codigo para sacar el video de las imagenes */
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

 /* cuadrado invisible link */

    document.addEventListener("DOMContentLoaded", function() {
        var square = document.querySelector(".clickable-square");
        square.addEventListener("click", function() {
            window.location.href = 'Cruz/index.html';
        });
    });


 /* Fin cuadrado invisible*/

/* Publicidad aparece y desaparece */

document.addEventListener("DOMContentLoaded", function() {
    const leftImageContainer = document.querySelector('.image-container.left');
    const rightImageContainer = document.querySelector('.image-container.right');

    function toggleImage(imageContainer, show) {
        const image = imageContainer.querySelector('.intermittent-image');
        const closeButton = imageContainer.querySelector('.close-button');
        if (show) {
            image.style.display = 'block';
            closeButton.style.display = 'block';
        } else {
            image.style.display = 'none';
            closeButton.style.display = 'none';
        }
    }

    // Añadir event listener al botón de cierre de la imagen izquierda
    const leftCloseButton = leftImageContainer.querySelector('.close-button');
    leftCloseButton.addEventListener('click', () => {
        toggleImage(leftImageContainer, false);
        setTimeout(() => toggleImage(leftImageContainer, true), 10000); // Vuelve a mostrar la imagen después de 10 segundos
    });

    // Añadir event listener al botón de cierre de la imagen derecha
    const rightCloseButton = rightImageContainer.querySelector('.close-button');
    rightCloseButton.addEventListener('click', () => {
        toggleImage(rightImageContainer, false);
        setTimeout(() => toggleImage(rightImageContainer, true), 10000); // Vuelve a mostrar la imagen después de 10 segundos
    });

    // Mostrar ambas imágenes por primera vez después de cargar la página
    toggleImage(leftImageContainer, true);
    toggleImage(rightImageContainer, true);
});

/* Fin Publicidad aparece y desaparece*/


/* Reproductor de musica */

const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const songIcon = document.getElementById('song-icon');
const songTitle = document.getElementById('song-title');

const songs = [
    { src: 'Musica/Bad Boy.mp3', icon: 'Portadas/BadBoy.jpg', title: 'Bad Boy - S3RL' },
    { src: 'Musica/Caramelldansen.mp3', icon: 'Portadas/Caramelldansen.jpg', title: 'Caramelldansen - Caramella Girls' },
    { src: 'Musica/mtc.mp3', icon: 'Portadas/Mtc.jpg', title: 'Mtc - S3RL' },
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
    // Agrega más canciones según sea necesario
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    songIcon.src = song.icon;
    songTitle.textContent = song.title;
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerHTML = '&#10074;&#10074;'; // Icono de pausa
    } else {
        audioPlayer.pause();
        playPauseButton.innerHTML = '&#9654;'; // Icono de play
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseButton.innerHTML = '&#10074;&#10074;'; // Icono de pausa
}

function nextSong() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseButton.innerHTML = '&#10074;&#10074;'; // Icono de pausa
}

playPauseButton.addEventListener('click', playPause);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

loadSong(currentSongIndex);

/* Fin Reproductor de musica */

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

// Efecto Glitch
setInterval(() => {
    const glitchOverlay = document.getElementById('vhs-glitch-overlay');
    glitchOverlay.style.animation = 'glitch-effect 3s infinite';
}, 3000);

// Pantallazos negros
setInterval(() => {
    const blackFlash = document.getElementById('black-flash');
    blackFlash.style.opacity = Math.random() > 0.9 ? '1' : '0';
}, 10000);

// Mostrar imágenes aleatorias
const images = [
    'Img1.PNG',
    'Img2.PNG',
    'Img3.PNG',
    'Img4.PNG',
    'Img5.PNG',
    'Img6.PNG'
];

function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = document.getElementById('random-image');
    randomImage.src = images[randomIndex];

    const imageOverlay = document.getElementById('random-image-overlay');
    imageOverlay.style.opacity = '1';

    setTimeout(() => {
        imageOverlay.style.opacity = '0';
    }, 700); // Duración de la aparición de la imagen
}

setInterval(showRandomImage, 4000); // Cambia cada 15 segundos