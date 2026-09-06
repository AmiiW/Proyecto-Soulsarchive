document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('imageContainer');
    const scrollUpButton = document.getElementById('scrollUp');
    const scrollDownButton = document.getElementById('scrollDown');
    
    let currentScroll = 0;
    const scrollAmount = 70; // Ajusta la cantidad de scroll según necesites

    function smoothScroll(target, duration) {
        const startPosition = imageContainer.scrollTop;
        const distance = target - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            imageContainer.scrollTop = run;
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    scrollUpButton.addEventListener('click', () => {
        currentScroll -= scrollAmount;
        if (currentScroll < 0) currentScroll = 0;
        smoothScroll(currentScroll, 500); // 500ms para el desplazamiento suave
    });

    scrollDownButton.addEventListener('click', () => {
        const maxScroll = imageContainer.scrollHeight - imageContainer.clientHeight;
        currentScroll += scrollAmount;
        if (currentScroll > maxScroll) currentScroll = maxScroll;
        smoothScroll(currentScroll, 500); // 500ms para el desplazamiento suave
    });
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