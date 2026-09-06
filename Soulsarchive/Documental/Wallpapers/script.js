document.querySelectorAll('.image-box a').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href');
        const linkElement = document.createElement('a');
        linkElement.href = href;
        linkElement.download = '';
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    });
});

/* Pantalla de carga */
document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const gif = document.getElementById('loading-gif');

    function hideLoader() {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none'; // Ocultar completamente el loader después del fade-out
            content.classList.add('show'); // Mostrar el contenido de la página
        }, 1000); // Duración de la transición del fade-out
    }

    function showLoader() {
        loader.style.display = 'flex'; // Asegurar que el loader esté visible
        loader.classList.remove('fade-out');
    }

    // Si hay algún error al cargar el gif, mostrarlo en la consola
    gif.addEventListener('error', (e) => {
        console.error('Error al cargar el gif:', e);
    });

    // Simular la carga del contenido
    setTimeout(hideLoader, 900); // Ajusta el tiempo de carga simulado según sea necesario

    // Lógica para redirecciones con animación de cargador
    window.navigateTo = function(url) {
        showLoader(); // Muestra el cargador cuando cambies de página
        setTimeout(() => {
            window.location.href = url;
        }, 1000); // Tiempo antes de la redirección
    };
});
