document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const circleContainer = document.getElementById('circle-container');
    const enemyHealthElement = document.getElementById('enemy-health');
    const heroImageElement = document.getElementById('hero-image');
    const moneyCountElement = document.getElementById('money-count');
    const enemyImageElement = document.getElementById('enemy-image');
    const redSound = document.getElementById('sound-red');
    const violetPinkSound = document.getElementById('sound-violet-pink');
    const shakeSound = document.getElementById('sound-shake');
    const silverSound = new Audio('SpecialSound.mp3'); // Añade sonido para el círculo plateado

    let enemyHealth = 100;
    let heroHealth = 100;
    let money = 0;
    let nextShakeHealth = 88;
    let circleCount = 1;
    const maxCircles = 20; // Máximo número de círculos

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#EE82EE', '#DA70D6', '#FF00FF', '#DDA0DD', '#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB']; // Colores comunes
    const heroImages = [
        'vida_100.png', // 100% - 85%
        'vida_84.png', // 84% - 70%
        'vida_68.png', // 69% - 55%
        'vida_52.png', // 54% - 40%
        'vida_36.png', // 39% - 25%
        'vida_20.png', // 24% - 10%
        'vida_4.png'  // 9% - 0%
    ];

    function createCircle() {
        if (enemyHealth <= 0 || heroHealth <= 0) return;

        const circle = document.createElement('div');
        const isSilverCircle = Math.random() < 0.05; // 5% probabilidad de ser un círculo plateado

        if (isSilverCircle) {
            circle.classList.add('circle', 'silver-circle');
            circle.style.width = '20px'; // Más pequeño
            circle.style.height = '20px'; // Más pequeño
            circle.style.boxShadow = '0 0 10px 5px yellow'; // Sombra dorada amarilla
        } else {
            circle.classList.add('circle');
            circle.style.width = '35px';
            circle.style.height = '35px';
        }

        circle.style.top = `${Math.random() * (circleContainer.clientHeight - (isSilverCircle ? 20 : 30))}px`;  // ajuste para el tamaño
        circle.style.left = `${Math.random() * (circleContainer.clientWidth - (isSilverCircle ? 20 : 30))}px`; // ajuste para el tamaño
        const color = isSilverCircle ? 'silver' : getRandomColor();
        circle.style.backgroundColor = color;
        circle.dataset.clicks = 0;

        circle.addEventListener('click', () => {
            let clicks = parseInt(circle.dataset.clicks, 10);
            clicks += 1;
            circle.dataset.clicks = clicks;

            if (clicks === 1 && color !== '#FF0000' && !isVioletOrPink(color) && color !== 'silver') {
                moveCircle(circle);
            } else if (clicks === 2 || clicks === 3) { // Second and third clicks inflict damage
                enemyHealth -= 2;
                if (enemyHealth < 0) enemyHealth = 0;
                enemyHealthElement.textContent = `Vida: ${enemyHealth}%`;

                circle.classList.add('shake');
                setTimeout(() => {
                    circle.classList.remove('shake');
                }, 500);
            } else if (clicks === 4) { // Fourth click has a 60% chance to heal the enemy
                if (Math.random() < 0.6) {
                    enemyHealth += 7;
                    if (enemyHealth > 100) enemyHealth = 100;
                    enemyHealthElement.textContent = `Vida: ${enemyHealth}%`;
                } else {
                    enemyHealth -= 2;
                    if (enemyHealth < 0) enemyHealth = 0;
                    enemyHealthElement.textContent = `Vida: ${enemyHealth}%`;
                }
                circle.remove();
                createCircle();
            } else if (color === '#FF0000' || isVioletOrPink(color) || color === 'silver') {
                circle.classList.add('shake');
                setTimeout(() => {
                    circle.classList.remove('shake');
                }, 500);

                if (color === '#FF0000') {
                    heroHealth += 4;
                    if (heroHealth > 100) heroHealth = 100; // límite superior de 100
                    updateHeroImage();
                    redSound.play();
                } else if (color === 'silver') {
                    silverSound.play();
                    enemyHealth -= 20;
                    if (enemyHealth < 0) enemyHealth = 0; // límite inferior de 0
                    circle.remove(); // Remover el círculo plateado después del primer clic
                } else {
                    if (isVioletOrPink(color)) {
                        enemyHealth += 5;
                        if (enemyHealth > 100) enemyHealth = 100; // límite superior de 100
                        violetPinkSound.play();
                    } else {
                        enemyHealth -= 2;
                        if (enemyHealth < 0) enemyHealth = 0; // límite inferior de 0
                    }
                }

                enemyHealthElement.textContent = `Vida: ${enemyHealth}%`;

                if (enemyHealth <= nextShakeHealth) {
                    enemyImageElement.classList.add('shake');
                    shakeSound.play();
                    setTimeout(() => {
                        enemyImageElement.classList.remove('shake');
                    }, 500);
                    nextShakeHealth -= 12;
                }

                if (enemyHealth === 0 || heroHealth === 0) {
                    if (enemyHealth === 0) {
                        money += 11000;
                        moneyCountElement.textContent = money;
                    }
                    endGame();
                }

                // Duplicar círculos al hacer clic
                if (circleCount < maxCircles) {
                    const newCount = Math.min(circleCount * 2, maxCircles);
                    spawnCircles(newCount - circleCount); // Solo crear los círculos adicionales necesarios
                    circleCount = newCount;
                }
            }
        });

        circleContainer.appendChild(circle);

        setTimeout(() => {
            if (document.body.contains(circle)) {
                circle.remove();
                if (enemyHealth > 0) {
                    createCircle();
                }
            }
        }, isSilverCircle ? 800 : 1600); // Duración menor para el círculo plateado
    }

    function moveCircle(circle) {
        const maxDistance = 50; // Distancia máxima de movimiento en píxeles
        const containerRect = circleContainer.getBoundingClientRect();
        const circleRect = circle.getBoundingClientRect();
        const newTop = Math.min(
            Math.max(circleRect.top - containerRect.top + (Math.random() * maxDistance * 2 - maxDistance), 0),
            containerRect.height - circleRect.height
        );
        const newLeft = Math.min(
            Math.max(circleRect.left - containerRect.left + (Math.random() * maxDistance * 2 - maxDistance), 0),
            containerRect.width - circleRect.width
        );

        circle.style.transition = 'top 0.1s, left 0.1s'; // Aumentar velocidad de movimiento
        circle.style.top = `${newTop}px`;
        circle.style.left = `${newLeft}px`;
    }

    function spawnCircles(number) {
        for (let i = 0; i < number; i++) {
            createCircle();
        }
    }

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function isVioletOrPink(color) {
        const violetPinkColors = ['#EE82EE', '#DA70D6', '#FF00FF', '#DDA0DD'];
        return violetPinkColors.includes(color.toUpperCase());
    }

    function updateHeroImage() {
        const index = Math.floor((100 - heroHealth) / 14.29);
        heroImageElement.src = heroImages[index];
    }

    function decreaseHeroHealth() {
        if (heroHealth <= 0) return;

        heroHealth -= 1.25;
        if (heroHealth < 0) heroHealth = 0;
        updateHeroImage();
        if (heroHealth > 0) {
            setTimeout(decreaseHeroHealth, 1000);
        } else {
            endGame();
        }
    }

    function increaseEnemyHealth() {
        if (enemyHealth <= 0 || heroHealth <= 0) return;

        enemyHealth += 0.6;
        if (enemyHealth > 100) enemyHealth = 100;
        enemyHealthElement.textContent = `Vida: ${enemyHealth}%`;

        setTimeout(increaseEnemyHealth, 1000);
    }

    function updateHeroLifeImage() {
        const heroLifeImage = document.getElementById('hero-life-image');
        if (heroLife > 83) {
            heroLifeImage.src = 'vida_100.png';
        } else if (heroLife > 66) {
            heroLifeImage.src = 'vida_84.png';
        } else if (heroLife > 50) {
            heroLifeImage.src = 'vida_68.png';
        } else if (heroLife > 33) {
            heroLifeImage.src = 'vida_52.png';
        } else if (heroLife > 16) {
            heroLifeImage.src = 'vida_36.png';
        } else if (heroLife > 0) {
            heroLifeImage.src = 'vida_20.png';
        } else {
            heroLifeImage.src = 'vida_4.png';
        }
        
        // Añadir clase flicker
        heroLifeImage.classList.add('flicker');
    
        // Remover clase flicker después de la animación
        setTimeout(() => {
            heroLifeImage.classList.remove('flicker');
        }, 500);
    }


    
/* tienda */

function showShop() {
    const shopContainer = document.createElement('div');
    shopContainer.classList.add('shop-container');

    // Lista de textos de recompensa para el primer objeto
    const rewardTexts = [
        "Usa con ingenio tu ultima carta",
        "Recuerda que el alma tiene una sola visión (cuerpo humano) por cada vida terrenal...",
        "Los buenos merecen ayuda de vez en cuando",
        "La suerte aparecera hoy, pero mañana...",
        "No es suerte lo que necesitas.",
        "No vuelvas a tropezar con la misma piedra",
        "Aqui te va otro codigo --> 3309",
        "El que quiera perder el tiempo que lo pierda",
        "Somos un conjunto de caracteres numericos en la red",
        "https://www.youtube.com/channel/UCKn17aRkMrOzW0TgEy-mG8Q",
        "Simplemente es arriesgarse a dar un paso en falso, ¿que puede salir mal?",
        "Esta pagina se quería llamar SoulMedia.com pero salía carisimo asi que, SoulArchive.com",
        "Cuando los demonios picoteen tu craneo, bajen hacia tus manos y finalicen por tu corazon, no se que podras hacer para evitarlo.",
        "Malgastas el dinero",
        "Parte del querer es aceptar y entender",
        "El verdadero conocimiento no lo entenderíamos.",
        "¿En qué momento es que las cosas dejan de importar tanto?, recuerda la importancia de esas cosas...",
        "No falles en comprender, tu desearias comprensión",
        "No se lo cuentes a nadie pero... hay seres especialmente raros viviendo aqui, en los servidores",
        "Pensar en una idea lleva el tiempo que la idea piense en rescatarte del circulo",
        "la droga que fuman las estrellas no es una droga suave",
        "Por allí enfrente veo una luz, cuida tus ojos de no cegarte",
        "Mala suerte, ningun mensaje",
        "Alguna respuesta es interesante, te ahorro la intriga",
        "Quizas si haya algo para ti en el limbo",
        "Dormir es la mejor cura contra el dolor",
        "Explorar esta cueva necesita algo de destreza",
        "Tendras Fortuna",
        "¿Recuerdas lo peor de ti?, tu demonio",
        "Ayer ocurrio algo bueno y ni te diste cuenta"
    ];

    shopContainer.innerHTML = `
        <h2 class="shop-title">Tienda</h2>
        <div class="shop-items">
            <div class="shop-item" data-price="025" data-text="Compraste el objeto 1">
                <img src="Obj1.png" alt="Item 1" class="shop-item-icon">
                <p class="shop-item-description">Es lo mas parecido a una galleta de la fortuna...</p>
                <p class="shop-item-price">Precio: 25 / %50 OFF</p>
            </div>
            <div class="shop-item" data-price="2200" data-text="6666">
                <img src="Obj2.png"" alt="Item 2" class="shop-item-icon">
                <p class="shop-item-description">^.^</p>
                <p class="shop-item-price">Precio: 2200</p>
            </div>
            <div class="shop-item" data-price="5900" data-text="9812">
                <img src="Obj3.png"" alt="Item 3" class="shop-item-icon">
                <p class="shop-item-description">...</p>
                <p class="shop-item-price">Precio: 5900</p>
            </div>
        </div>
        <button id="buy-button">Comprar</button>
        <div id="purchase-result"></div>
    `;

    document.body.appendChild(shopContainer);

    const shopItems = document.querySelectorAll('.shop-item');
    shopItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    });

    document.getElementById('buy-button').addEventListener('click', () => {
        const selectedItems = document.querySelectorAll('.shop-item.selected');
        let purchaseResult = '';
        selectedItems.forEach((item) => {
            const price = parseInt(item.dataset.price);
            if (money >= price) {
                money -= price;
                moneyCountElement.textContent = money;
                if (price === 25) { // Verifica el precio del primer objeto
                    const randomIndex = Math.floor(Math.random() * rewardTexts.length);
                    purchaseResult += `<p>${rewardTexts[randomIndex]}</p>`;
                } else {
                    purchaseResult += `<p>${item.dataset.text}</p>`;
                }
            } else {
                purchaseResult += `<p>No tienes suficiente dinero para el objeto</p>`;
            }
        });
        document.getElementById('purchase-result').innerHTML = purchaseResult;
    });
}

function endGame() {
    document.body.classList.add('no-scroll');
    gameContainer.classList.add('fall');
    setTimeout(() => {
        gameContainer.remove();
        showShop();
    }, 2000); // Ajusta el tiempo según la duración de la animación de caída
}

    createCircle();
    decreaseHeroHealth();
    increaseEnemyHealth(); // Iniciar el incremento de salud del enemigo
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

document.getElementById('enemy-image').addEventListener('click', function() {
    const texts = [
        "Porfavor no me hagas daño",
        "Mi cria se perdio por aqui",
        "AUCh",
        "Dejame en paz te lo ruego",
        "Tendre que darte una lección"
    ];

    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const textContainer = document.getElementById('text-container');
    
    textContainer.textContent = randomText;
    textContainer.style.display = 'block';
    
    setTimeout(() => {
        textContainer.style.display = 'none';
    }, 3000); // El texto desaparece después de 2 segundos
});