function navigateWithDelay(url) {
    const buttonSound = document.getElementById('button-sound');
    buttonSound.currentTime = 0;  // Rewind to start
    buttonSound.play().then(() => {
        setTimeout(() => {
            window.location.href = url;
        }, 500); // 500ms delay
    }).catch(error => {
        console.error("Failed to play sound:", error);
        window.location.href = url;
    });
}


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