document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById('image-container');
    if (!imageContainer) {
        console.error("No se encontró el contenedor de imágenes.");
        return;
    }

    const imageCount = 27; // Número de imágenes en la carpeta
    const minImages = 2; // Mínimo de imágenes simultáneas
    const maxImages = 6; // Máximo de imágenes simultáneas
    const minImageDuration = 1000; // Duración mínima de cada imagen en milisegundos
    const maxImageDuration = 1500; // Duración máxima de cada imagen en milisegundos
    const minWidthPercentage = 5; // Tamaño mínimo de las imágenes como porcentaje del ancho de la pantalla
    const maxWidthPercentage = 25; // Tamaño máximo de las imágenes como porcentaje del ancho de la pantalla

    const urls = [
        'Cubo/indexCUBO.html',
        'https://www.instagram.com/am1soulmedia_archive/?hl=es',
        'Numero/index.html',
        'https://drive.google.com/drive/folders/1g8ho7evvhOMYw_JxsCGsWmycGn6nbpeC',
        'https://drive.google.com/drive/folders/1-0OgbRLRHtDW98Ve_-Edb924MiWrL7Id',
        'Bosco/index.html',
        'youtubePage/index.html',
        'https://www.bopsecrets.org/Spanish/religion.htm',
        'https://darkrabbithole.neocities.org/photo',
        'BlogFe/index.html',
        'Globos/index.html',
        'https://cat-bounce.com',
        'https://www.omfgdogs.com/#',
        'https://www.windows93.net',
        'http://www.staggeringbeauty.com',
        'https://matias.me/nsfw/',
        'https://eelslap.com',
        'https://www.thisman.org',
        'https://www.lomando.com',
        'https://grotto.faith',
        'http://obsidiansnow.net',
        'https://www.welcomehomerestorationproject.net/welcomehomeyou',
        'https://securitycenter.sonicwall.com/m/page/worldwide-attacks',
        'http://www.insecam.org'
    ];

    let usedImages = [];

    function getRandomImage() {
        if (usedImages.length === imageCount) {
            usedImages = []; // Reset when all images have been used
        }

        let imgNumber;
        do {
            imgNumber = Math.floor(Math.random() * imageCount) + 1;
        } while (usedImages.includes(imgNumber));

        usedImages.push(imgNumber);
        const imagePath = `Apariciones/img${imgNumber}.png`;
        console.log(`Cargando imagen: ${imagePath}`);
        return { imagePath, imgNumber };
    }

    function getRandomSize() {
        const windowWidth = window.innerWidth;
        const randomWidthPercentage = Math.random() * (maxWidthPercentage - minWidthPercentage) + minWidthPercentage;
        const randomWidth = (randomWidthPercentage / 100) * windowWidth;
        return randomWidth;
    }

    function checkOverlap(newPosition, newSize, positions) {
        for (const pos of positions) {
            const distance = Math.sqrt(Math.pow(newPosition.x - pos.x, 2) + Math.pow(newPosition.y - pos.y, 2));
            if (distance < (newSize + pos.size) / 2) {
                return true;
            }
        }
        return false;
    }

    function getRandomPosition(size, positions) {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        let randomX, randomY, newPosition;

        do {
            randomX = Math.random() * (windowWidth - size);
            randomY = Math.random() * (windowHeight - size);
            newPosition = { x: randomX, y: randomY };
        } while (checkOverlap(newPosition, size, positions));

        return newPosition;
    }

    function createImageElement(positions) {
        const { imagePath, imgNumber } = getRandomImage();
        const img = document.createElement('img');
        img.src = imagePath;
        img.classList.add('image');
        const size = getRandomSize();
        const position = getRandomPosition(size, positions);
        img.style.left = `${position.x}px`;
        img.style.top = `${position.y}px`;
        img.style.width = `${size}px`;
        img.style.height = 'auto';
        img.addEventListener('click', () => {
            console.log(`Redirigiendo a: ${urls[imgNumber - 1]}`);
            window.open(urls[imgNumber - 1], '_blank'); // Abre el enlace en una nueva pestaña
        });
        positions.push({ x: position.x, y: position.y, size: size });
        return img;
    }

    function showRandomImages() {
        const numImages = Math.floor(Math.random() * (maxImages - minImages + 1)) + minImages; // Número aleatorio de imágenes entre minImages y maxImages
        console.log(`Mostrando ${numImages} imágenes.`);
        const positions = [];
        for (let i = 0; i < numImages; i++) {
            const img = createImageElement(positions);
            imageContainer.appendChild(img);
            const duration = Math.random() * (maxImageDuration - minImageDuration) + minImageDuration; // Duración aleatoria entre 1s y 1.5s
            setTimeout(() => {
                img.remove();
                console.log(`Imagen eliminada.`);
            }, duration);
        }
    }

    setInterval(showRandomImages, minImageDuration);
});

/* pantalla de carga */

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

/* Fin de pantalla de carga */

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});