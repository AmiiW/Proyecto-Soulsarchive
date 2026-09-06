function showContent(fileId) {
    const contents = document.querySelectorAll('.file-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(fileId).style.display = 'block';
}

function goBack() {
    window.history.back();
}

// Para añadir nuevos archivos dinámicamente, podrías usar algo como esto:
function addFile(fileName, title, content) {
    const sidebar = document.querySelector('.sidebar');
    const newFile = document.createElement('div');
    newFile.className = 'file';
    newFile.textContent = fileName;
    newFile.onclick = () => showContent(fileName.toLowerCase().replace(/\s/g, ''));
    
    const newContent = document.createElement('div');
    newContent.id = fileName.toLowerCase().replace(/\s/g, '');
    newContent.className = 'file-content';
    newContent.innerHTML = `<h2>${title}</h2><hr><p>${content}</p>`;
    
    sidebar.appendChild(newFile);
    document.querySelector('.content').appendChild(newContent);
}

// Ejemplo de cómo añadir un archivo:
/* addFile('Archivo 3', 'Título del Archivo 3', 'Contenido del Archivo 3'); */

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