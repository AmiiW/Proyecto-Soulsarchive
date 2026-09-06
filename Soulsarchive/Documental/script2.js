document.addEventListener('DOMContentLoaded', function () {
    // Obtener elementos
    const openModal5 = document.getElementById('openModal5');
    const openModal6 = document.getElementById('openModal6');
    const openModal5Mobile = document.getElementById('openModal5Mobile');
    const openModal6Mobile = document.getElementById('openModal6Mobile');
    const modal5 = document.getElementById('modal5');
    const modal6 = document.getElementById('modal6');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    const closeMenuButton = document.querySelector('.close-menu');

    // Función para abrir modales
    function openModal(modal) {
        modal.style.display = 'block';
    }

    // Función para cerrar modales
    function closeModal() {
        modal5.style.display = 'none';
        modal6.style.display = 'none';
    }

    // Función para abrir modales desde el menú horizontal
    function setupOpenModalHandlers() {
        openModal5.addEventListener('click', function (event) {
            event.preventDefault();
            closeModal();
            openModal(modal5);
        });

        openModal6.addEventListener('click', function (event) {
            event.preventDefault();
            closeModal();
            openModal(modal6);
        });

        // Abrir modales desde el menú lateral en dispositivos móviles
        openModal5Mobile.addEventListener('click', function (event) {
            event.preventDefault();
            closeModal();
            openModal(modal5);
            menu.classList.remove('active');
        });

        openModal6Mobile.addEventListener('click', function (event) {
            event.preventDefault();
            closeModal();
            openModal(modal6);
            menu.classList.remove('active');
        });
    }

    // Cerrar modales al hacer clic en la cruz
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Abrir y cerrar el menú lateral
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    closeMenuButton.addEventListener('click', function () {
        menu.classList.remove('active');
    });

    // Cerrar el menú lateral al hacer clic fuera del menú
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !menuIcon.contains(event.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });

    // Inicializar handlers de modales
    setupOpenModalHandlers();
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

    setTimeout(toggleCartel, 10000); // Inicia el cartel 1 segundo después de cargar la página
    setInterval(toggleCartel, 60000); // Se muestra cada 1 minuto
});

// Cerrar el aviso al hacer clic en "OK"
document.getElementById("popup-ok").addEventListener("click", () => {
    document.getElementById("popup-alert").style.display = "none";
  });