// resultado.js

document.addEventListener('DOMContentLoaded', () => {
    const imagenInicial = document.getElementById('imagenInicial');
    const imagenJefe = document.getElementById('imagenJefe');
    const sonidoInicial = document.getElementById('sonidoInicial');
    const sonidoLucha = document.getElementById('sonidoLucha');
    const sonidoAtaqueJefe = document.getElementById('sonidoAtaqueJefe');
    const luchaSection = document.querySelector('.lucha');
    const armaImagen = document.getElementById('armaImagen');
    const armaDanio = document.getElementById('armaDanio');
    const saludJefeElement = document.getElementById('saludJefe');
    const resultadoAtaque = document.getElementById('resultadoAtaque');
    const cuadradosContainer = document.getElementById('cuadradosContainer');
    const imagenBossLucha = document.getElementById('imagenBossLucha');

    // Mapeo de armas a daño
    const dañosArmas = {
        'Uzi.png': 8,
        'Pistola.png': 6.5,
        'Maza.png': 5.4,
        'Espada.png': 4.4,
        'Katana.png': 4.7,
        'Piedra.png': 1.5,
        'Arco.png': 3.6,
        'Afeitadora.png': 1.7,
        'Escarbadiente.png': 1.3,
        'Tenedor.png': 1.6,
        'Puño.png': 1,
        'Cuchillo mariposa.png': 3.7,
        'Cuchillo.png': 2.6,
        'Guantes.png': 2.1,
        'Hacha.png': 3,
        'Oz.png': 2.8
    };

    // Imagenes del jefe en diferentes estados de salud
    const imagenesJefe = {
        normal: 'Personaje d frente1.png',
        herido1: 'Personaje d frente2.png',
        herido2: 'Personaje d frente3.png'
    };

    // Inicializar salud del jefe
    let saludJefe = 220;
    saludJefeElement.textContent = saludJefe;

    // Inicializar contador de ataques al jugador
    let ataquesAlJugador = 0;
    const maxAtaquesJugador = 5;

    // Recuperar el arma actual del jugador desde localStorage
    const armaActual = localStorage.getItem('armaActual');

    if (armaActual && dañosArmas[armaActual]) {
        // Establecer la imagen del arma
        armaImagen.src = `Armas/${armaActual}`;
        armaImagen.alt = `Arma Actual: ${armaActual.replace('.png', '')}`;

        // Establecer el daño correspondiente
        const dano = dañosArmas[armaActual];
        armaDanio.textContent = `${dano} de Daño`;
    } else {
        // Manejar el caso donde no hay arma guardada o no se reconoce el arma
        armaImagen.src = `Armas/Puño.png`; // Arma por defecto
        armaImagen.alt = `Arma Actual: Puño`;
        armaDanio.textContent = `1 de Daño`;
    }

    // Función para hacer fade-in de un elemento
    const fadeIn = (element, duration = 2000) => {
        element.classList.add('visible');
        element.classList.remove('hidden');
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = '1';
    };

    // Función para hacer fade-out de un elemento
    const fadeOut = (element, duration = 2000) => {
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = '0';
        setTimeout(() => {
            element.classList.add('hidden');
            element.classList.remove('visible');
        }, duration);
    };

    // Función para hacer fade-in y fade-out de audio
    const fadeAudio = (audio, targetVolume, duration, callback) => {
        const fadeSteps = 50; // Número de pasos para el fade
        const fadeInterval = duration / fadeSteps;
        const volumeStep = (targetVolume - audio.volume) / fadeSteps;
        let currentStepFade = 0;

        const fade = setInterval(() => {
            currentStepFade++;
            let newVolume = audio.volume + volumeStep;
            newVolume = Math.max(0, Math.min(1, newVolume)); // Limitar entre 0 y 1
            audio.volume = newVolume;

            if (currentStepFade >= fadeSteps) {
                clearInterval(fade);
                if (callback) callback();
            }
        }, fadeInterval);
    };

    // Inicializar y reproducir el sonido inicial con fade-in
    sonidoInicial.volume = 0;
    sonidoInicial.play().catch(error => {
        console.warn('Autoplay was prevented. Play was triggered by user interaction.');
    });
    fadeAudio(sonidoInicial, 1, 2000); // Fade-in a volumen 1 en 2 segundos

    // Mostrar la imagen inicial con fade-in
    fadeIn(imagenInicial, 2000);

    // Después de 5 segundos, transicionar a la imagen del jefe final
    setTimeout(() => {
        // Fade out de la imagen inicial
        fadeOut(imagenInicial, 2000);
        // Fade out del sonido inicial
        fadeAudio(sonidoInicial, 0, 2000, () => {
            sonidoInicial.pause();
            sonidoInicial.currentTime = 0;
        });

        // Fade in de la imagen del jefe final
        fadeIn(imagenJefe, 2000);
        // Fade in del sonido de lucha
        sonidoLucha.volume = 0;
        sonidoLucha.play().catch(error => {
            console.warn('Autoplay was prevented. Play was triggered by user interaction.');
        });
        fadeAudio(sonidoLucha, 1, 2000); // Fade-in a volumen 1 en 2 segundos

        // Mostrar la sección de lucha
        luchaSection.classList.remove('hidden');
        luchaSection.classList.add('visible'); // Para activar cualquier animación CSS si aplica

        // Iniciar la generación de cuadrados
        iniciarLucha();

        // Iniciar los ataques del jefe
        iniciarAtaquesJefe();
    }, 5000); // 5 segundos

    // Función para iniciar la lucha
    const iniciarLucha = () => {
        const generarCuadrado = () => {
            // Crear un nuevo cuadrado
            const cuadrado = document.createElement('div');
            cuadrado.classList.add('cuadrado');

            // Posicionar el cuadrado aleatoriamente dentro del contenedor
            const containerRect = cuadradosContainer.getBoundingClientRect();
            const maxLeft = containerRect.width - cuadrado.offsetWidth;
            const maxTop = containerRect.height - cuadrado.offsetHeight;
            const left = Math.random() * maxLeft;
            const top = Math.random() * maxTop;

            cuadrado.style.left = `${left}px`;
            cuadrado.style.top = `${top}px`;

            // Añadir el cuadrado al contenedor
            cuadradosContainer.appendChild(cuadrado);

            // Temporizador para iniciar la animación de temblar en el último segundo y medio
            setTimeout(() => {
                cuadrado.classList.add('shake');
            }, 1100); // 1.5 segundos

            // Temporizador para eliminar el cuadrado después de 3 segundos
            setTimeout(() => {
                eliminarCuadradoRojo(cuadrado);
            }, 1300); // 3 segundos

            // Evento de click en el cuadrado
            cuadrado.addEventListener('click', () => {
                // Reducir la salud del jefe
                const dano = dañosArmas[armaActual] || 1;
                saludJefe -= dano;
                saludJefe = Math.max(saludJefe, 0);
                saludJefeElement.textContent = saludJefe;

                // Mostrar resultado del ataque
                resultadoAtaque.textContent = `Has atacado al jefe con ${dano} de daño. Salud del jefe: ${saludJefe}`;

                // Cambiar la imagen del jefe según su salud
                actualizarImagenJefe();

                // Añadir la clase 'desaparecer' para la animación de caída
                cuadrado.classList.add('desaparecer');

                // Eliminar el cuadrado después de la animación
                setTimeout(() => {
                    cuadrado.remove();
                }, 1000); // 1 segundo coincide con la duración de la animación

                // Verificar si el jefe ha sido derrotado
                if (saludJefe <= 0) {
                    finalizarLucha();
                }
            });
        };

        // Generar cuadrados en intervalos aleatorios
        const intervaloMin = 400; // 0.4 segundo
        const intervaloMax = 700; // 0.7 segundos

        const generarCuadradosAleatoriamente = () => {
            const intervalo = Math.random() * (intervaloMax - intervaloMin) + intervaloMin;
            generarCuadrado();
            setTimeout(generarCuadradosAleatoriamente, intervalo);
        };

        generarCuadradosAleatoriamente();
    };

    // Función para eliminar el cuadrado rojo con animación de caída
    const eliminarCuadradoRojo = (cuadrado) => {
        cuadrado.classList.add('desaparecer'); // Agregar la animación de caída
        setTimeout(() => {
            cuadrado.remove(); // Eliminar el cuadrado después de la animación
        }, 1000); // 1 segundo para que la animación termine
    };

    // Función para actualizar la imagen del jefe según su salud
    const actualizarImagenJefe = () => {
        if (saludJefe <= 60) {
            imagenBossLucha.src = imagenesJefe.herido2;
        } else if (saludJefe <= 130) {
            imagenBossLucha.src = imagenesJefe.herido1;
        } else {
            imagenBossLucha.src = imagenesJefe.normal;
        }
    };

    // Función para iniciar los ataques del jefe
    const iniciarAtaquesJefe = () => {
        const intervaloAtaque = 5300; // 5.3 segundos
        const probabilidadAtaque = 0.50; // 51% de probabilidad

        const ataqueJefe = () => {
            if (Math.random() < probabilidadAtaque) {
                realizarAtaque();
            }
        };

        // Iniciar el intervalo de ataques
        const ataqueInterval = setInterval(() => {
            ataqueJefe();

            // Si el jugador ha sido atacado 5 veces, detener los ataques
            if (ataquesAlJugador >= maxAtaquesJugador) {
                clearInterval(ataqueInterval);
            }
        }, intervaloAtaque);
    };

    // Función para realizar un ataque del jefe al jugador
    const realizarAtaque = () => {
        ataquesAlJugador++;
        resultadoAtaque.textContent = `¡El jefe te ha atacado! Ataques recibidos: ${ataquesAlJugador}/${maxAtaquesJugador}`;

        // Añadir clase 'shake' para animar la imagen del jefe
        imagenBossLucha.classList.add('shake');

        // Reproducir sonido de ataque
        sonidoAtaqueJefe.currentTime = 0;
        sonidoAtaqueJefe.play();

        // Remover la clase 'shake' después de 1 segundo
        setTimeout(() => {
            imagenBossLucha.classList.remove('shake');
        }, 1000);

        // Verificar si el jugador ha recibido 5 ataques
        if (ataquesAlJugador >= maxAtaquesJugador) {
            finalizarJuegoPerdido();
        }
    };

    // Función para finalizar la lucha cuando el jefe es derrotado
    const finalizarLucha = () => {
        // Detener la generación de nuevos cuadrados
        cuadradosContainer.innerHTML = ''; // Eliminar todos los cuadrados existentes

        // Detener el sonido de lucha
        fadeAudio(sonidoLucha, 0, 2000, () => {
            sonidoLucha.pause();
            sonidoLucha.currentTime = 0;
        });

        // Mostrar mensaje de victoria
        alert('¡Has derrotado al jefe final! ¡Felicidades!');

        // Redirigir a una página de victoria o reiniciar el juego
        window.location.href = 'victoria.html'; // Asegúrate de crear esta página
    };

    // Función para finalizar el juego si el jugador es atacado 5 veces
    const finalizarJuegoPerdido = () => {
        // Detener la generación de nuevos cuadrados
        cuadradosContainer.innerHTML = ''; // Eliminar todos los cuadrados existentes

        // Detener el sonido de lucha
        fadeAudio(sonidoLucha, 0, 2000, () => {
            sonidoLucha.pause();
            sonidoLucha.currentTime = 0;
        });

        // Mostrar mensaje de derrota
        alert('Has sido derrotado por el jefe final. ¡Inténtalo de nuevo!');

        // Redirigir al inicio del juego
        window.location.href = '../index.html'; // Asegúrate de que este sea el nombre de tu página principal
    };
});
