document.addEventListener('DOMContentLoaded', () => {
    const lockScreen = document.querySelector('.lock-screen');
    const homeScreen = document.querySelector('.home-screen');
    const appContent = document.querySelectorAll('.app-content');
    const apps = document.querySelectorAll('.app');

    // Actualiza la hora y el día
    function updateTime() {
        const now = new Date();
        const dayElement = document.getElementById('day');
        const timeElement = document.getElementById('time');
        const statusTimeElement = document.getElementById('status-time');
        
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dayElement.textContent = now.toLocaleDateString('es-ES', options);
        timeElement.textContent = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        statusTimeElement.textContent = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    
    updateTime();
    setInterval(updateTime, 60000); // Actualiza cada minuto
    
    // Desbloquear pantalla
    lockScreen.addEventListener('click', () => {
        lockScreen.style.transform = 'translateY(-100%)';
        homeScreen.style.transform = 'translateY(0)';
    });

    // Abrir apps
    apps.forEach(app => {
        app.addEventListener('click', () => {
            const appId = app.getAttribute('data-app') + '-content';
            document.getElementById(appId).style.transform = 'scale(1)';
        });
    });

    // Botón home para volver al menú de apps
    document.querySelector('.home-button').addEventListener('click', () => {
        appContent.forEach(content => {
            content.style.transform = 'scale(0)';
        });
    });

    // Cambiar la fuente en toda la página
    document.querySelectorAll('.font-button').forEach(button => {
        button.addEventListener('click', function() {
            const selectedFont = this.getAttribute('data-font');
            document.body.style.fontFamily = selectedFont === 'default' ? 'Arial, sans-serif' :
                                              selectedFont === 'pixel' ? '"Press Start 2P", cursive' :
                                              '"Courier New", monospace';
            localStorage.setItem('fontFamily', selectedFont);
        });
    });

    // Cambiar el color del texto en toda la página
    document.getElementById('text-color-picker').addEventListener('input', function() {
        const selectedColor = this.value;
        document.body.style.color = selectedColor;
        localStorage.setItem('textColor', selectedColor);
    });

    // Cambiar el color del "phone-container"
    document.getElementById('phone-color-picker').addEventListener('input', function() {
        const selectedColor = this.value;
        document.querySelector('.phone-container').style.backgroundColor = selectedColor;
        localStorage.setItem('phoneColor', selectedColor);
    });

    // Cambiar el color del "home-button"
    document.getElementById('home-button-color-picker').addEventListener('input', function() {
        const selectedColor = this.value;
        document.querySelector('.home-button').style.backgroundColor = selectedColor;
        localStorage.setItem('homeButtonColor', selectedColor);
    });

    // Cambiar el fondo de la "home-screen"
    document.querySelectorAll('.bg-button').forEach(button => {
        button.addEventListener('click', function() {
            const selectedBg = this.getAttribute('data-bg');
            if (this.parentElement.previousElementSibling.textContent.includes("Menú:")) {
                document.querySelector('.home-screen').style.backgroundImage = `url(${selectedBg})`;
                localStorage.setItem('homeScreenBackground', selectedBg);
            } else if (this.parentElement.previousElementSibling.textContent.includes("Bloqueo:")) {
                document.querySelector('.lock-screen').style.backgroundImage = `url(${selectedBg})`;
                localStorage.setItem('lockScreenBackground', selectedBg);
            }
        });
    });

    // Cargar configuraciones guardadas
    const savedFont = localStorage.getItem('fontFamily') || 'default';
    const savedTextColor = localStorage.getItem('textColor') || '#000000';
    const savedPhoneColor = localStorage.getItem('phoneColor') || '#333333';
    const savedHomeButtonColor = localStorage.getItem('homeButtonColor') || '#555555';
    const savedHomeScreenBackground = localStorage.getItem('homeScreenBackground') || 'Fondo2.png';
    const savedLockScreenBackground = localStorage.getItem('lockScreenBackground') || 'Fondo1.png';

    document.body.style.fontFamily = savedFont === 'default' ? 'Arial, sans-serif' :
                                      savedFont === 'pixel' ? '"Press Start 2P", cursive' :
                                      '"Courier New", monospace';
    document.body.style.color = savedTextColor;
    document.querySelector('.phone-container').style.backgroundColor = savedPhoneColor;
    document.querySelector('.home-button').style.backgroundColor = savedHomeButtonColor;
    document.querySelector('.home-screen').style.backgroundImage = `url(${savedHomeScreenBackground})`;
    document.querySelector('.lock-screen').style.backgroundImage = `url(${savedLockScreenBackground})`;

    document.querySelector(`.font-button[data-font="${savedFont}"]`).classList.add('selected');
    document.querySelector(`.bg-button[data-bg="${savedHomeScreenBackground}"]`).classList.add('selected');
    document.querySelector(`.bg-button[data-bg="${savedLockScreenBackground}"]`).classList.add('selected');
});

/* Reproductor de sonido*/

const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const songIcon = document.getElementById('song-icon');
const songTitle = document.getElementById('song-title');

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

/* Simon dice */

const buttons = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let level = 0;

const playSound = (color) => {
    const audio = new Audio(`${color}.mp3`);
    audio.play();
};

const flashButton = (color) => {
    const button = document.getElementById(color);
    button.classList.add('active');
    playSound(color);
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
};

const nextSequence = () => {
    const randomColor = buttons[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    level++;
    document.getElementById('level-title').innerText = `Nivel ${level}`;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
        }, (index + 1) * 600);
    });
};

const checkSequence = () => {
    if (playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
        alert("¡Perdiste! Intenta de nuevo.");
        startOver();
        return;
    }

    if (playerSequence.length === gameSequence.length) {
        playerSequence = [];
        setTimeout(nextSequence, 1000);
    }
};

const handleClick = (color) => {
    playerSequence.push(color);
    flashButton(color);
    checkSequence();
};

const startOver = () => {
    level = 0;
    gameSequence = [];
    playerSequence = [];
};

document.getElementById('start-game').addEventListener('click', () => {
    startOver();
    nextSequence();
});

buttons.forEach(color => {
    document.getElementById(color).addEventListener('click', () => handleClick(color));
});