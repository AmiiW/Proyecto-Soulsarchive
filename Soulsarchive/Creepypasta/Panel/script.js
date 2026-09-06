const images = {
    '1823': 'Puzle/00.png',
'9485': 'Puzle/01.png',
'0100': 'Puzle/02.png',
'3309': 'Puzle/03.png',
'2002': 'Puzle/04.png',
'5698': 'Puzle/05.png',
'7957': 'Puzle/06.png',
'3140': 'Puzle/07.png',
'2039': 'Puzle/08.png',
'8901': 'Puzle/09.png',
'6666': 'Puzle/10.png',
'9812': 'Puzle/11.png',
'3442': 'Puzle/12.png',
'2983': 'Puzle/13.png',
'2024': 'Puzle/14.png'
};

let cacheEnabled = false;

function updateCacheButton() {
    const cacheButton = document.getElementById('cache-button');
    if (cacheEnabled) {
        cacheButton.style.backgroundColor = '#0f0'; // Verde para activado
        cacheButton.innerText = 'Memoria Caché Activada';
    } else {
        cacheButton.style.backgroundColor = '#f00'; // Rojo para desactivado
        cacheButton.innerText = 'Memoria Caché Desactivada';
    }
}

// Cargar el estado inicial del botón de caché desde localStorage
if (localStorage.getItem('cacheEnabled') === 'true') {
    cacheEnabled = true;
}
updateCacheButton();

// Cargar imágenes desde localStorage si la caché está habilitada
if (cacheEnabled) {
    const cachedImages = JSON.parse(localStorage.getItem('cachedImages'));
    if (cachedImages) {
        cachedImages.forEach(code => {
            const imageId = `image-${Object.keys(images).indexOf(code) + 1}`;
            const imageElement = document.getElementById(imageId);
            imageElement.style.backgroundImage = `url(${images[code]})`;
            imageElement.style.display = 'block';
        });
    }
}

// Crear celdas para las imágenes
const imagesContainer = document.getElementById('images-container');
for (let i = 0; i < 15; i++) {
    const cell = document.createElement('div');
    cell.classList.add('image-cell');
    cell.id = `image-${i + 1}`;
    cell.setAttribute('draggable', 'true');
    imagesContainer.appendChild(cell);
}

document.getElementById('submit-button').addEventListener('click', () => {
    const code = document.getElementById('code-input').value;
    if (images[code]) {
        const imageId = `image-${Object.keys(images).indexOf(code) + 1}`;
        const imageElement = document.getElementById(imageId);
        imageElement.style.backgroundImage = `url(${images[code]})`;
        imageElement.style.display = 'block';
        if (cacheEnabled) {
            let cachedImages = JSON.parse(localStorage.getItem('cachedImages')) || [];
            if (!cachedImages.includes(code)) {
                cachedImages.push(code);
                localStorage.setItem('cachedImages', JSON.stringify(cachedImages));
            }
        }
    } else {
        alert('Código incorrecto');
    }
});

document.getElementById('cache-button').addEventListener('click', () => {
    cacheEnabled = !cacheEnabled;
    updateCacheButton(); // Llamar a la función para actualizar el color y el texto del botón
    if (cacheEnabled) {
        localStorage.setItem('cacheEnabled', 'true');
        let cachedImages = [];
        document.querySelectorAll('.image-cell').forEach((cell, index) => {
            if (cell.style.display === 'block') {
                cachedImages.push(Object.keys(images)[index]);
            }
        });
        localStorage.setItem('cachedImages', JSON.stringify(cachedImages));
    } else {
        localStorage.setItem('cacheEnabled', 'false');
        localStorage.removeItem('cachedImages');
    }
});

let draggedElement = null;

document.querySelectorAll('.image-cell').forEach(cell => {
    cell.addEventListener('dragstart', event => {
        draggedElement = event.target;
        event.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            event.target.style.visibility = 'hidden';
        }, 0);
    });

    cell.addEventListener('dragend', event => {
        event.target.style.visibility = 'visible';
    });

    cell.addEventListener('dragover', event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    cell.addEventListener('drop', event => {
        event.preventDefault();
        event.target.style.visibility = 'visible';
        if (event.target.classList.contains('image-cell') && event.target !== draggedElement) {
            const draggedBackground = draggedElement.style.backgroundImage;
            draggedElement.style.backgroundImage = event.target.style.backgroundImage;
            event.target.style.backgroundImage = draggedBackground;
            if (cacheEnabled) {
                let cachedImages = [];
                document.querySelectorAll('.image-cell').forEach((cell, index) => {
                    if (cell.style.display === 'block') {
                        const code = Object.keys(images)[index];
                        cachedImages.push(code);
                    }
                });
                localStorage.setItem('cachedImages', JSON.stringify(cachedImages));
            }
        }
    });
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

function goBack() {
    window.history.back();
}