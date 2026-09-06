// Variables
const image = document.getElementById('interactive-img');
const cursorImg = document.getElementById('cursor-img');
const commentInput = document.getElementById('comment-input');
const sendCommentBtn = document.getElementById('send-comment');
const commentsSection = document.getElementById('comments-section');
const banMessage = document.getElementById('ban-message');
const clearCacheBtn = document.getElementById('clear-cache-btn');
let commentCount = 0;
let firstCommentPosted = false;
let banned = false;

// Función para guardar los comentarios en el localStorage
function saveComments() {
    const userComments = Array.from(document.querySelectorAll('.user-comment, .auto-comment'));
    const commentsHTML = userComments.map(comment => comment.outerHTML).join('');
    localStorage.setItem('comments', commentsHTML);
    localStorage.setItem('commentCount', commentCount);
    localStorage.setItem('firstCommentPosted', firstCommentPosted);
    localStorage.setItem('banned', banned);
}

// Cargar comentarios desde localStorage al iniciar
function loadComments() {
    const savedComments = localStorage.getItem('comments');
    const savedCount = localStorage.getItem('commentCount');
    const savedFirstCommentPosted = localStorage.getItem('firstCommentPosted');
    const savedBanned = localStorage.getItem('banned');

    if (savedComments) {
        commentsSection.insertAdjacentHTML('beforeend', savedComments);
        commentCount = parseInt(savedCount);
        firstCommentPosted = savedFirstCommentPosted === 'true';
        banned = savedBanned === 'true';
    }
}

// Función para limpiar el cache (localStorage) pero mantener los comentarios fijos
clearCacheBtn.addEventListener('click', function() {
    // Elimina solo los comentarios con las clases 'user-comment' y 'auto-comment'
    const userComments = document.querySelectorAll('.user-comment, .auto-comment');
    userComments.forEach(comment => comment.remove());

    localStorage.clear();
    commentCount = 0;
    firstCommentPosted = false;
    banned = false;
    banMessage.classList.add('hidden'); // Oculta el mensaje de baneo si estaba visible
    alert('El cache de comentarios del usuario ha sido eliminado.');
});

// Llama a la función de cargar comentarios al iniciar la página
loadComments();

// Función para mover la imagen pequeña cuando el cursor pasa por encima de la imagen principal
image.addEventListener('mousemove', function(event) {
    cursorImg.style.display = 'block';
    cursorImg.style.left = event.pageX + 'px';
    cursorImg.style.top = event.pageY + 'px';
});

image.addEventListener('mouseleave', function() {
    cursorImg.style.display = 'none';
});

// Función para ejecutar efectos al hacer clic en la imagen principal
image.addEventListener('click', function() {
    image.classList.add('shake');

    const sounds = [
        document.getElementById('click-sound-1'),
        document.getElementById('click-sound-2'),
        document.getElementById('click-sound-3')
    ];

    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.currentTime = 0;
    randomSound.play();

    setTimeout(() => image.classList.remove('shake'), 500);
});

// Evento de envío de comentario
sendCommentBtn.addEventListener('click', function() {
    const commentText = commentInput.value.trim();
    if (commentText === "" || banned) return;

    commentCount++;

    const newComment = document.createElement('div');
    newComment.className = 'comment user-comment'; // Agregar clase para identificar comentarios del usuario
    newComment.innerHTML = `
        <div class="profile-pic" style="background-image: url('Perfil8.PNG');"></div>
        <div class="comment-content">
            <div class="username">Tú</div>
            <div class="comment-text">${commentText}</div>
        </div>
    `;

    commentsSection.appendChild(newComment);
    commentInput.value = ""; // Limpia el textarea

    saveComments(); // Guarda el estado después de cada comentario

    // Primer comentario automático después de 2 segundos
    if (!firstCommentPosted) {
        firstCommentPosted = true;

        setTimeout(() => {
            const autoComment1 = document.createElement('div');
            autoComment1.className = 'comment auto-comment'; // Agregar clase para identificar comentarios automáticos
            autoComment1.innerHTML = `
                <div class="profile-pic" style="background-image: url('Perfil2.PNG');"></div>
                <div class="comment-content">
                    <div class="username">Pasta</div>
                    <div class="comment-text">holii</div>
                </div>
            `;
            commentsSection.appendChild(autoComment1);

            saveComments(); // Guarda después del primer comentario automático

            // Segundo comentario automático después de 1 segundo
            setTimeout(() => {
                const autoComment2 = document.createElement('div');
                autoComment2.className = 'comment auto-comment'; // Agregar clase para identificar comentarios automáticos
                autoComment2.innerHTML = `
                    <div class="profile-pic" style="background-image: url('Rojo.jpg');"></div>
                    <div class="comment-content">
                        <div class="username">Admin</div>
                        <p class="invisible">Mensaje privado</p>
                        <br>
                        <div class="comment-text">Quien sos</div>
                    </div>
                `;
                commentsSection.appendChild(autoComment2);
                saveComments(); // Guarda después de la respuesta automática
            }, 1000);

        }, 2000); // Retraso de 2 segundos antes del primer mensaje automático

    }  // Redirigir si el comentario es "666" y es el segundo comentario
    if (commentCount === 2 && commentText === "666") {
        window.location.href = "../../../Creepypasta/Index.html"; // 
        return; // Asegúrate de salir de la función después de redirigir
    }else if (commentCount === 2) {
        banMessage.classList.remove('hidden');
        banned = true;
        saveComments(); // Guarda el estado de baneo
    }
});


// Función para modificar el texto en el área de entrada
function formatText(style) {
    const input = commentInput;
    let start = input.selectionStart;
    let end = input.selectionEnd;

    let selectedText = input.value.substring(start, end);

    switch(style) {
        case 'bold':
            input.value = input.value.substring(0, start) + '**' + selectedText + '**' + input.value.substring(end);
            break;
        case 'italic':
            input.value = input.value.substring(0, start) + '*' + selectedText + '*' + input.value.substring(end);
            break;
        case 'underline':
            input.value = input.value.substring(0, start) + '__' + selectedText + '__' + input.value.substring(end);
            break;
    }
    input.focus();
}

// Función para ir a la página anterior al hacer clic en el botón con la flecha
document.getElementById('back-btn').addEventListener('click', function() {
    window.history.back();
});
