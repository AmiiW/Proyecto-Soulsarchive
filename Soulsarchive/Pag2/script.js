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

    // Prevenir que el video sea pausado
    video.controls = false; // Quita los controles del video
    video.addEventListener('pause', function() {
        video.play();
    });
});

/* Fin pantalla de carga */

/* Introducir codigo */

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    const redirectButton = document.getElementById('redirectButton');
    const codeInput = document.getElementById('codeInput');
    const successSound = document.getElementById('successSound');
    const videoContainer = document.getElementById('videoContainer');
    const buttonContainer = document.getElementById('buttonContainer');
    const introVideo = document.getElementById('introVideo');

    // Verificar si el botón ya está visible al cargar la página
    if (localStorage.getItem('buttonVisible')) {
        buttonContainer.classList.remove('hidden');
    }

    submitButton.addEventListener('click', function() {
        const code = codeInput.value;

        
    
        if (code === '0612') {
            // Verificar si el botón ya ha aparecido
            if (!localStorage.getItem('buttonVisible')) {
                successSound.play();
                videoContainer.classList.remove('hidden');
                introVideo.play();

                introVideo.onended = function() {
                    videoContainer.classList.add('hidden');
                    buttonContainer.classList.remove('hidden');
                    localStorage.setItem('buttonVisible', 'true');
                };
            }
        } if (code === '14102024#tuyo') {
            setTimeout(() => {
                window.location.href = 'EasterEgg/index.html'; // Cambia esta URL por la página a la que quieras redirigir
            }, 2000); // 2000 ms = 2 segundos
        } else {
            alert('Código incorrecto. Intenta de nuevo.');
        }
    });

    redirectButton.addEventListener('click', function() {
        window.location.href = 'Panel/index.html';
    });
});

function redirectToPage() {
    window.location.href = 'achivador/index.html';  // Ajusta el nombre del archivo HTML dentro de la carpeta "archivador"
}


/* Catedral */

let clickCount = 0;
const easterEggImage = document.getElementById('easterEggImage');

easterEggImage.addEventListener('click', () => {
  clickCount++;
  if (clickCount === 6) {
    easterEggImage.src = 'EasterEgg.png'; // Cambia a la nueva imagen después de 6 clics
  }
});

/* Cartel */

document.addEventListener("DOMContentLoaded", function() {
    const cartel = document.getElementById("cartel");
    const closeBtn = document.getElementById("close-btn");

    function showCartel() {
        cartel.style.top = "10px"; // Aparece desde arriba
    }

    function hideCartel() {
        cartel.style.top = "-100%"; // Vuelve a salir de la pantalla
    }

    function toggleCartel() {
        showCartel();
        setTimeout(hideCartel, 10000); // El cartel se oculta después de 10 segundos (puedes ajustar el tiempo)
    }

    closeBtn.addEventListener("click", function() {
        hideCartel();
        setTimeout(toggleCartel, 60000); // Vuelve a aparecer después de 1 minuto
    });

    setTimeout(toggleCartel, 6000); // Inicia el cartel 1 segundo después de cargar la página
    setInterval(toggleCartel, 60000); // Se muestra cada 1 minuto
});