document.querySelector('.boton-cerrar').addEventListener('click', function() {
    const ventana = document.querySelector('.ventana');
    ventana.classList.add('temblor');
    setTimeout(() => ventana.classList.remove('temblor'), 300); // Eliminar el efecto después de la animación
});

document.querySelectorAll('.boton-cerrar').forEach(boton => {
    boton.addEventListener('click', function() {
        const ventana = boton.parentElement;
        ventana.classList.add('temblor');
        setTimeout(() => ventana.classList.remove('temblor'), 300); // Remover efecto después de la animación
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.boton-cerrar').forEach(boton => {
        boton.addEventListener('click', function() {
            const ventana = boton.parentElement;
            ventana.classList.add('temblor');
            setTimeout(() => ventana.classList.remove('temblor'), 300); // Remover efecto después de la animación
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".falling-images-container");
    const imageCount = 10; // Total de imágenes en la carpeta
    const sections = 10; // Número de columnas en que se dividirá la pantalla
    const interval = 1000; // Intervalo de creación en ms para cada columna (1000 ms = 1 segundo)

    function createFallingImage(section) {
        const currentFallingImages = container.querySelectorAll(".falling-image").length; // Contar imágenes caídas
        if (currentFallingImages < 60) { // Limitar a 60 imágenes a la vez
            const imageIndex = Math.floor(Math.random() * imageCount) + 1;
            const image = document.createElement("img");
            image.src = `Imagenes/Img${imageIndex}.png`;
            image.classList.add("falling-image");

            // Asignar posición horizontal basada en la sección y duración aleatoria
            const sectionWidth = window.innerWidth / sections;
            image.style.left = `${section * sectionWidth + Math.random() * sectionWidth}px`;
            image.style.animationDuration = `${Math.random() * 2 + 4}s`; // Duración entre 4 y 6 segundos

            // Remover la imagen después de la animación
            image.addEventListener("animationend", () => {
                image.remove();
            });

            container.appendChild(image);
        }
    }

    // Crear un intervalo para cada sección
    for (let i = 0; i < sections; i++) {
        setInterval(() => createFallingImage(i), interval);
    }
});

  document.addEventListener("DOMContentLoaded", function() {
    const codeInput = document.getElementById("codeInput");
    const sendButton = document.getElementById("sendButton");
    const videoContainer = document.getElementById("videoContainer");
    const secretVideo = document.getElementById("secretVideo");
    const notification = document.getElementById("notification");
    const redirectButton = document.getElementById("redirectButton");

    // Verificar si el código ya fue correctamente ingresado anteriormente
    if (localStorage.getItem("isCodeCorrect") === "true") {
        showRedirectButton(); // Muestra el botón de redirección si ya se guardó en caché
    }

    sendButton.addEventListener("click", function() {
        notification.classList.add("hidden"); // Oculta cualquier notificación previa
        const code = codeInput.value;

        if (code === "0612") {
            videoContainer.classList.remove("hidden");
            secretVideo.play();

            // Al finalizar el video, muestra el botón y guarda en almacenamiento local
            secretVideo.onended = function() {
                showRedirectButton();
                localStorage.setItem("isCodeCorrect", "true"); // Guarda el estado en caché
            };
        } else if (code === "14102024#tuyo") {
            setTimeout(() => {
                window.location.href = 'EasterEgg/index.html'; 
            }, 2000); // Redirige tras 2 segundos
        } else {
            // Si el código no es correcto, muestra el mensaje de notificación
            notification.textContent = "Código incorrecto";
            notification.classList.remove("hidden");
        }
    });

    function showRedirectButton() {
        // Muestra el botón de redirección, oculta el video y su contenedor
        redirectButton.classList.remove("hidden");
        videoContainer.classList.add("hidden");
        secretVideo.classList.add("hidden");
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

// Cerrar el aviso al hacer clic en "OK"
document.getElementById("popup-ok").addEventListener("click", () => {
    document.getElementById("popup-alert").style.display = "none";
  });