const responses = [
    {
        text: "¿Eh?, y este tipo... -Leve mirada hacia la izquierda-",
        subQuestions: [
            { text: "[ Guardar silencio ]", response: "Cof-Cof" },
            { text: "Escoria, ¿No me vas a responder?", response: "Gente como tu no merece estar viva." },
            { text: "Ser de este mundo, me encuentro perdido", response: "Esta bien, volvamos a empezar" }
        ]
    },
    {
        text: "Buenas noches muchach@, que gusto ver a un alma joven por aqui, ¿que te trae?...",
        subQuestions: [
            { text: "Un demonio interno del cual no puedo escapar", response: "Busca un sello de fé y recuerda a ese bastardo hasta la muerte." },
            { text: "Una rara sensación de curiosidad", response: "La curiosidad puede ser la motivación de algunos, tan podersa es la curiosidad que a veces es un juego de vida o exito, de encontrar oro o escupir las ultimas palabras." },
            { text: "Quiero conocer a dios", response: "No podrias comprenderlo, el es temible, el lo es todo, nos vigila, esta dentro nuestro, ¡ERES TU!, o es eso que esta detras tuyo..." }
        ]
    },
    {
        text: "rAwRiwr, grNiar SHUARMISHS..SHH -SHHH",
        subQuestions: [
            { text: "Akuma", response: "Cuando hablamos de Akuma hablamos de esos sentimientos corrosivos, de esos demonios, aquellos impulsos que atacan la psiquis sea por un acto de supervivencia o no, son el conjunto de esos akuma los que generan la idea de maldad. El sello de Fé nos separa de ellos..." },
            { text: "Raito", response: "La representación de la luz... no se le ha vuelto a ver por el campo de setas, aunque solía hacer mucho ruido por aqui post desaparición, incluso era capaz de convencer a los demonios y hoy en dia solo algunos lo logran ver de vez en cuando." },
            { 
                text: "Waru", 
                response: "N-no...Ss-SE mUcHO d...e EeEE-l",
                redirect: "indexScream.html"
            }
        ]
    },
    {
        text: "Soy un cuerpo de bajo nivel, me llamo Baúl y estamos en alguna parte del campo de setas...",
        subQuestions: [
            { text: "¿Campo de setas?", response: "Asi es...,esta es una parte del campo de setas, aqui nacen setas del conocimiento sobre el mundo oculto, por esa razon los dos nos vemos hablando en este contexto." },
            { text: "¿Que edad tienes?", response: "Hace mucho tiempo que no cuento esa idotes, ¿Supongo que seran la cantiodad de años de mi vida pasada sumada a los años de mi vida actual?" },
            { text: "Gusto en conocerte", response: "Digo lo mismo..." }
        ]
    },
    {
        text: "... ¿Como conoces a ese muchacho?",
        subQuestions: [
            { 
                text: "Lei su historia", 
                response: "Wow, ¿Su historia?, yo recuerdo su rostro humano, hace tanto tiempo fué que ni si quiera él se recuerda a si mismo",
                redirect: "indexScream.html"
            },
            { text: "Es mi amigo", response: "¡¿Tu amigo?!, tienes suerte, quizas te lo puedas encontrar por aquí, no es el mismo desde ese dia...eso te lo advierto." },
            { text: "¿Por qué lo conoces tu?", response: "¿Como no lo conoceria?, no soy un dopelganger, lo vi en un pasado, quizo crearse y fue de esos pocos que pudo transicionar a $Ser inferior$" }
        ]
    }
];

const randomResponses = [
    "¡Para!",
    "¿Que haces?",
    "...",
    "$··9=)='921301230!9485"
];

let clickCount = 0;

function handleImageClick() {
    clickCount++;
    
    const characterImage = document.getElementById('characterImage');
    const responseBox = document.getElementById('responseBox');
    const audio = document.getElementById('audio');
    const characterName = document.getElementById('characterName');
    const buttonContainer = document.getElementById('buttonContainer');

    if (clickCount >= 16) {
        characterImage.src = 'Tronco.png';
        characterName.textContent = "...";
        buttonContainer.style.display = 'none';
        responseBox.innerHTML = '';
    } else {
        // Cambiar la imagen del personaje
        characterImage.src = 'Abierto.png';

        // Reproducir el audio
        audio.play();

        // Mostrar una respuesta aleatoria
        const randomIndex = Math.floor(Math.random() * randomResponses.length);
        let response = randomResponses[randomIndex];

        let i = 0;
        responseBox.innerHTML = '';

        function typeResponse() {
            if (i < response.length) {
                responseBox.innerHTML += response.charAt(i);
                i++;
                setTimeout(typeResponse, 50);
            } else {
                // Volver a la imagen original después de mostrar la respuesta
                setTimeout(() => {
                    characterImage.src = 'Cerrado.png';
                }, 1000);
            }
        }

        typeResponse();
    }
}

function handleButtonClick(questionIndex, subQuestionIndex) {
    const characterImage = document.getElementById('characterImage');
    const responseBox = document.getElementById('responseBox');
    const buttonContainer = document.getElementById('buttonContainer');
    const audio = document.getElementById('audio');

    // Cambiar la imagen del personaje
    characterImage.src = 'Abierto.png';

    // Reproducir el audio
    audio.play();

    // Esconder los botones
    buttonContainer.style.display = 'none';

    // Mostrar la respuesta palabra por palabra
    let response;
    if (subQuestionIndex === 0) {
        response = responses[questionIndex].text;
    } else {
        response = responses[questionIndex].subQuestions[subQuestionIndex - 1].response;
    }

    let i = 0;
    responseBox.innerHTML = '';

    function typeResponse() {
        if (i < response.length) {
            responseBox.innerHTML += response.charAt(i);
            i++;
            setTimeout(typeResponse, 50);
        } else {
            // Si la subpregunta tiene una redirección, realizarla después de un tiempo
            if (subQuestionIndex > 0 && responses[questionIndex].subQuestions[subQuestionIndex - 1].redirect) {
                setTimeout(() => {
                    window.location.href = responses[questionIndex].subQuestions[subQuestionIndex - 1].redirect;
                }, 2000); // 2 segundos después de mostrar la respuesta
            } else {
                // Mostrar las siguientes subpreguntas después de la respuesta
                setTimeout(() => {
                    characterImage.src = 'Cerrado.png';
                    if (subQuestionIndex === 0) {
                        displaySubQuestions(questionIndex);
                    } else {
                        // Si se llegó a la última subpregunta, mostrar las preguntas iniciales
                        if (subQuestionIndex === responses[questionIndex].subQuestions.length) {
                            displayInitialQuestions();
                        } else {
                            buttonContainer.style.display = 'flex';
                        }
                    }
                }, 1000);
            }
        }
    }

    typeResponse();
}

function displaySubQuestions(questionIndex) {
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = ''; // Limpiar los botones anteriores

    // Agregar un botón para regresar a las preguntas iniciales
    let backButton = document.createElement('button');
    backButton.textContent = "Volver a las preguntas iniciales";
    backButton.onclick = displayInitialQuestions;
    buttonContainer.appendChild(backButton);

    responses[questionIndex].subQuestions.forEach((subQuestion, index) => {
        let button = document.createElement('button');
        button.textContent = subQuestion.text;
        button.onclick = () => handleButtonClick(questionIndex, index + 1);
        buttonContainer.appendChild(button);
    });

    buttonContainer.style.display = 'flex'; // Mostrar los nuevos botones
}

function displayInitialQuestions() {
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = ''; // Limpiar los botones anteriores

    const initialQuestions = [
        "¿Que es este lugar?",
        "Buenas noches",
        "[ Hace ruidos extraños ]",
        "¿Quien eres tu?",
        "Ima"
    ];

    initialQuestions.forEach((question, index) => {
        let button = document.createElement('button');
        button.textContent = question;
        button.onclick = () => handleButtonClick(index, 0);
        buttonContainer.appendChild(button);
    });

    buttonContainer.style.display = 'flex'; // Mostrar los botones iniciales
}


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

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// Fin