document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('game-container');
    const yellowCube = document.getElementById('yellow-cube');
    const greenBlock = document.getElementById('green-block');
    const levelCounter = document.getElementById('level-counter');
    const textContainer = document.getElementById('text-container');
    const containerSize = container.clientWidth;
    const cubeSize = 20;

    let obstacles = [];
    let levelsCompleted = 0;

    const levelMessages = {
        3: "Te veo un tanto concentrado, me presento, soy un alma entrelazada con la SoulArchive.com",
        5: "Y si sigues esforzandote tanto por superar mis niveles, te tendre una pequeña sorpresita...",
        8: "No importa cuantos niveles pierdas, la verdad que no suelo tener compania por estos lares, aprecio que estes aquí",
        10: "wOW estas en el nivel 10, ya lo se, no hay nada nuevo, todos los niveles son iguales",
        13: "Bueno..., 13 esta bastante lejos del principio, ten aqui una pequeña recompensa <5698>",
        15: "¿Y sigues haciendome compania?, que chic@ mas conciderad@",
        17: "Me impresionas.",
        19: "El campo de setas es realmente interesante, su existencia parece de un cuento de adas, hace tiempo que no visito a mis amigos, espero que esten bien.",
        23: "La realidad es que ya no puedo escapar de aqui, pero esta bien, ya no me importa.",
        25: "Bueno, chic@ ah sido un gusto, espero volver a verte luego, me ah dado sueño",
        28: "Que pases muy bien, ten aqui tu ultimo regalito... 7957."
    };

    function randomPosition() {
        return Math.floor(Math.random() * (containerSize - cubeSize));
    }

    function isPositionFree(top, left, width = cubeSize, height = cubeSize) {
        const rect1 = {
            top: top,
            bottom: top + height,
            left: left,
            right: left + width
        };

        for (let obstacle of obstacles) {
            const rect2 = obstacle.getBoundingClientRect();
            if (!(rect1.right < rect2.left || 
                  rect1.left > rect2.right || 
                  rect1.bottom < rect2.top || 
                  rect1.top > rect2.bottom)) {
                return false;
            }
        }
        return true;
    }

    function getRandomFreePosition() {
        let top, left;
        do {
            top = randomPosition();
            left = randomPosition();
        } while (!isPositionFree(top, left));
        return { top, left };
    }

    function resetGame() {
        yellowCube.style.top = '-9999px'; // Esconde el cubo mientras generamos obstáculos
        yellowCube.style.left = '-9999px';
        greenBlock.style.top = '-9999px'; // Esconde el cubo mientras generamos obstáculos
        greenBlock.style.left = '-9999px';

        obstacles.forEach(obstacle => obstacle.remove());
        obstacles = generateObstacles(300);
        obstacles.forEach(obstacle => container.appendChild(obstacle));

        let pos = getRandomFreePosition();
        yellowCube.style.top = `${pos.top}px`;
        yellowCube.style.left = `${pos.left}px`;

        pos = getRandomFreePosition();
        greenBlock.style.top = `${pos.top}px`;
        greenBlock.style.left = `${pos.left}px`;
    }

    function generateObstacles(num) {
        const obs = [];
        for (let i = 0; i < num; i++) {
            const obstacle = document.createElement('div');
            obstacle.className = 'cube obstacle';
            let pos;
            do {
                pos = getRandomFreePosition();
            } while (!isPositionFree(pos.top, pos.left, cubeSize, cubeSize));
            obstacle.style.top = `${pos.top}px`;
            obstacle.style.left = `${pos.left}px`;
            obs.push(obstacle);
        }
        return obs;
    }

    function showTextMessage(message) {
        textContainer.innerHTML = "";
        let index = 0;
        const words = message.split(" ");

        function typeWord() {
            if (index < words.length) {
                textContainer.innerHTML += words[index] + " ";
                index++;
                setTimeout(typeWord, 200);
            }
        }

        typeWord();
    }

    function checkCollision() {
        const yellowRect = yellowCube.getBoundingClientRect();
        const greenRect = greenBlock.getBoundingClientRect();

        if (yellowRect.top < greenRect.bottom &&
            yellowRect.bottom > greenRect.top &&
            yellowRect.left < greenRect.right &&
            yellowRect.right > greenRect.left) {
            levelsCompleted++;
            levelCounter.textContent = `Niveles superados: ${levelsCompleted}`;
            if (levelMessages[levelsCompleted]) {
                showTextMessage(levelMessages[levelsCompleted]);
            }
            resetGame();
        }

        for (let obstacle of obstacles) {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (yellowRect.top < obstacleRect.bottom &&
                yellowRect.bottom > obstacleRect.top &&
                yellowRect.left < obstacleRect.right &&
                yellowRect.right > obstacleRect.left) {
                alert('¡Choque con obstáculo! Reiniciando...');
                resetGame();
            }
        }
    }

    function moveYellowCube(event) {
        const step = 5;
        const top = yellowCube.offsetTop;
        const left = yellowCube.offsetLeft;

        switch(event.key) {
            case 'ArrowUp':
                if (top - step >= 0) yellowCube.style.top = `${top - step}px`;
                break;
            case 'ArrowDown':
                if (top + step <= containerSize - cubeSize) yellowCube.style.top = `${top + step}px`;
                break;
            case 'ArrowLeft':
                if (left - step >= 0) yellowCube.style.left = `${left - step}px`;
                break;
            case 'ArrowRight':
                if (left + step <= containerSize - cubeSize) yellowCube.style.left = `${left + step}px`;
                break;
        }

        checkCollision();
    }

    document.addEventListener('keydown', moveYellowCube);
    resetGame();
});

/* Inicio pantalla de carga */

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