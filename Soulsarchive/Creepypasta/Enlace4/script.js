let level = 0;

const backgrounds = {
    3: 'Img1.jpg',
    5: 'Img2.jpg',
    8: 'Img3.jpg',
    15: 'Img4.jpg',
    20: 'Img5.jpg',
    25: 'Img6.jpg',
    27: 'none'
};

document.getElementById('proximamente').addEventListener('click', function() {
    document.getElementById('proximamente').style.display = 'none';
    document.getElementById('levelCounter').style.display = 'block';
    document.getElementById('growButton').style.display = 'block';
});

document.getElementById('growButton').addEventListener('click', function() {
    const button = this;
    const currentPadding = parseFloat(window.getComputedStyle(button).paddingTop);
    const currentFontSize = parseFloat(window.getComputedStyle(button).fontSize);
    const buttonRect = button.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    // Incrementar el tamaño del botón y del texto proporcionalmente
    button.style.padding = (currentPadding * 1.1) + 'px ' + (currentPadding * 2.2) + 'px';
    button.style.fontSize = (currentFontSize * 1.1) + 'px';

    // Verificar si el botón toca los extremos de la pantalla
    if (buttonRect.right >= bodyRect.right || buttonRect.bottom >= bodyRect.bottom) {
        // Restablecer el tamaño del botón
        button.style.padding = '1em 2em';
        button.style.fontSize = '1em';

        // Incrementar el contador de nivel
        level++;
        document.getElementById('levelCounter').innerText = `Nivel: ${level}`;

        // Cambiar el fondo si es un nivel especificado
        if (backgrounds[level] !== undefined) {
            if (backgrounds[level] === 'none') {
                document.body.style.backgroundImage = 'none';
            } else {
                document.body.style.backgroundImage = `url(${backgrounds[level]})`;
            }
        }
    }
});

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

/* pagina de carga */

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

/* Fin pagina de carga */ 