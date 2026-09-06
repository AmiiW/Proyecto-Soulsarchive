// script.js

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play');
    const dropsButton = document.getElementById('drops');
    const imagenPrincipal = document.querySelector('.imagen-principal');
    const botones = document.querySelector('.botones');
    const sonidoPuerta = document.getElementById('sonidoPuerta');
    const backgroundSound1 = document.getElementById('backgroundSound1');
    const backgroundSound2 = document.getElementById('backgroundSound2');
    const sonidoEleccion = document.getElementById('sonidoEleccion'); // Nuevo sonido
    const sonidoHabitacion = document.getElementById('sonidoHabitacion'); // Nuevo sonido

    let currentStep = 0; // Contador de pasos
    const maxSteps = 15; // Número máximo de pasos

    // Definir las habitaciones y sus probabilidades
    const habitaciones = [
        { nombre: 'Afeitadora', probabilidad: 51, arma: 'Afeitadora.png' },
        { nombre: 'Arco', probabilidad: 30, arma: 'Arco.png' },
        { nombre: 'CuchilloMariposa', probabilidad: 35, arma: 'Cuchillo mariposa.png' },
        { nombre: 'Cuchillo', probabilidad: 64, arma: 'Cuchillo.png' },
        { nombre: 'Escarbadiente', probabilidad: 36, arma: 'Escarbadiente.png' },
        { nombre: 'Espada', probabilidad: 18, arma: 'Espada.png' },
        { nombre: 'Guantes', probabilidad: 33, arma: 'Guantes.png' },
        { nombre: 'Habitacion', probabilidad: 37, arma: 'Puño.png' },
        { nombre: 'Hacha', probabilidad: 43, arma: 'Hacha.png' },
        { nombre: 'Katana', probabilidad: 19, arma: 'Katana.png' },
        { nombre: 'Maza', probabilidad: 15, arma: 'Maza.png' },
        { nombre: 'Oz', probabilidad: 50, arma: 'Oz.png' },
        { nombre: 'Piedra', probabilidad: 30, arma: 'Piedra.png' },
        { nombre: 'Pistola', probabilidad: 13, arma: 'Pistola.png' },
        { nombre: 'Tenedor', probabilidad: 35, arma: 'Tenedor.png' },
        { nombre: 'Uzi', probabilidad: 9, arma: 'Uzi.png' },
        { nombre: 'Toxico', probabilidad: 25, arma: 'Puño.png', efecto: 'muerte' }, // Nueva habitación
        // Agrega más habitaciones aquí siguiendo el mismo formato
        // { nombre: 'NombreHabitacion', probabilidad: XX, arma: 'NombreArma.png' },
    ];

    // Iniciar la reproducción del sonido de fondo 1 en loop
    backgroundSound1.volume = 1;
    backgroundSound1.play().catch(error => {
        console.warn('Autoplay was prevented. Play was triggered by user interaction.');
    });

    // Definir una función para hacer fade de audio
    function fadeAudio(audio, targetVolume, duration, callback) {
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
    }

    // Función para inicializar el arma
    const inicializarArma = () => {
        // Verificar si hay un arma guardada en localStorage
        let armaActual = localStorage.getItem('armaActual');
        if (!armaActual) {
            // Si no existe, establecer "Puño.png" como arma por defecto
            armaActual = 'Puño.png';
            localStorage.setItem('armaActual', armaActual);
        }

        return armaActual;
    };

    // Función para crear y mostrar la imagen del arma
    const mostrarArma = (arma) => {
        // Verificar si ya existe una imagen de arma
        let imgArma = document.getElementById('armaActual');
        if (!imgArma) {
            // Crear el elemento de la imagen del arma
            imgArma = document.createElement('img');
            imgArma.src = `Armas/${arma}`; // Ruta correcta
            imgArma.alt = `Arma Actual: ${arma}`;
            imgArma.classList.add('armas');
            imgArma.id = 'armaActual';

            // Añadir la imagen al contenedor
            const container = document.querySelector('.container');
            container.appendChild(imgArma);
        } else {
            // Actualizar la fuente de la imagen del arma
            imgArma.src = `Armas/${arma}`;
            imgArma.alt = `Arma Actual: ${arma}`;
        }
    };

    // Función para seleccionar una habitación basada en las probabilidades
    const seleccionarHabitacion = () => {
        const totalProbabilidad = habitaciones.reduce((acc, hab) => acc + hab.probabilidad, 0);
        const random = Math.random() * totalProbabilidad;
        let acumulado = 0;

        for (let i = 0; i < habitaciones.length; i++) {
            acumulado += habitaciones[i].probabilidad;
            if (random < acumulado) {
                return habitaciones[i];
            }
        }

        // Retorna la última habitación si no se selecciona ninguna antes
        return habitaciones[habitaciones.length - 1];
    };

    // Función para manejar el click en "Play"
    playButton.addEventListener('click', () => {
        // Reproducir el sonido de la puerta abriéndose
        sonidoPuerta.play();

        // Iniciar el fade out del backgroundSound1 y fade in de backgroundSound2
        fadeAudio(backgroundSound1, 0, 2000, () => {
            backgroundSound1.pause();
            backgroundSound1.currentTime = 0; // Reiniciar el sonido
        });

        // Configurar backgroundSound2
        backgroundSound2.volume = 0;
        backgroundSound2.play().catch(error => {
            console.warn('Autoplay was prevented. Play was triggered by user interaction.');
        });

        // Iniciar el fade in de backgroundSound2
        fadeAudio(backgroundSound2, 1, 2000);

        // Fade out de la imagen principal
        imagenPrincipal.style.transition = 'opacity 2s';
        imagenPrincipal.style.opacity = '0';

        // Esperar a que la transición de opacidad termine
        setTimeout(() => {
            // Cambiar la imagen principal a 'Caminos.png'
            imagenPrincipal.src = 'Caminos.png';

            // Fade in de la nueva imagen
            imagenPrincipal.style.opacity = '1';

            // Ocultar los botones iniciales
            botones.style.display = 'none';

            // Mostrar la imagen del arma
            const arma = inicializarArma();
            mostrarArma(arma);

            // Crear los nuevos botones "Izquierda" y "Derecha"
            crearNuevosBotones();
        }, 2000); // Debe coincidir con el tiempo de transición de CSS
    });

    // Función para manejar el click en "Drops"
    dropsButton.addEventListener('click', () => {
        // Esperar 2 segundos antes de redireccionar
        setTimeout(() => {
            window.location.href = 'Probabilidades/index.html'; // Reemplaza con la URL deseada
        }, 2000);
    });

    // Función para crear y mostrar los nuevos botones "Izquierda" y "Derecha"
    const crearNuevosBotones = () => {
        // Crear el contenedor para los nuevos botones
        const nuevosBotonesContainer = document.createElement('div');
        nuevosBotonesContainer.classList.add('nuevos-botones');

        // Crear el botón "Izquierda"
        const botonIzquierda = document.createElement('button');
        botonIzquierda.id = 'izquierda';
        botonIzquierda.textContent = 'Izquierda';

        // Crear el botón "Derecha"
        const botonDerecha = document.createElement('button');
        botonDerecha.id = 'derecha';
        botonDerecha.textContent = 'Derecha';

        // Añadir los botones al contenedor
        nuevosBotonesContainer.appendChild(botonIzquierda);
        nuevosBotonesContainer.appendChild(botonDerecha);

        // Añadir el contenedor de nuevos botones al DOM
        const container = document.querySelector('.container');
        container.appendChild(nuevosBotonesContainer);

        // Reproducir sonido al elegir entre "Izquierda" y "Derecha"
        sonidoEleccion.play();

        // Añadir eventos a los nuevos botones
        botonIzquierda.addEventListener('click', () => {
            manejarEleccion();
        });

        botonDerecha.addEventListener('click', () => {
            manejarEleccion();
        });
    };

    // Función para manejar la elección de caminos
    const manejarEleccion = () => {
        if (currentStep >= maxSteps) {
            finalizarJuego();
            return;
        }

        elegirCamino();
    };

    // Función para elegir un camino
    const elegirCamino = () => {
        currentStep++;

        const probabilidad = Math.random();

        if (probabilidad < 0.5) {
            // 50% de probabilidad: subir un piso
            subirPiso();
        } else {
            // 50% de probabilidad: entrar en una habitación
            entrarHabitacion();
        }
    };

    // Función para subir un piso
    const subirPiso = () => {
        // Fade out de la imagen "Caminos.png"
        imagenPrincipal.style.transition = 'opacity 2s';
        imagenPrincipal.style.opacity = '0';

        // Esperar a que la transición de opacidad termine
        setTimeout(() => {
            // Cambiar la imagen principal a 'Caminos.png' (se mantiene la misma imagen)
            imagenPrincipal.src = 'Caminos.png';

            // Fade in de la misma imagen
            imagenPrincipal.style.opacity = '1';
        }, 2000);
    };

    // Función para entrar en una habitación
    const entrarHabitacion = () => {
        // Seleccionar una habitación basada en las probabilidades
        const habitacionSeleccionada = seleccionarHabitacion();

        // Reproducir sonido al entrar en una habitación
        sonidoHabitacion.play();

        // Fade out de la imagen "Caminos.png"
        imagenPrincipal.style.transition = 'opacity 2s';
        imagenPrincipal.style.opacity = '0';

        // Esperar a que la transición de opacidad termine
        setTimeout(() => {
            // Cambiar la imagen principal a la habitación seleccionada
            imagenPrincipal.src = `Habitaciones/${habitacionSeleccionada.nombre}.png`;

            // Fade in de la nueva imagen de habitación
            imagenPrincipal.style.opacity = '1';

            // Reemplazar los botones "Izquierda" y "Derecha" por "Tomar objeto" y "Dar la vuelta"
            reemplazarBotonesHabitacion(habitacionSeleccionada);
        }, 2000);
    };

    // Función para reemplazar los botones al entrar en una habitación
    const reemplazarBotonesHabitacion = (habitacionSeleccionada) => {
        // Remover los botones "Izquierda" y "Derecha"
        const nuevosBotonesContainer = document.querySelector('.nuevos-botones');
        if (nuevosBotonesContainer) {
            nuevosBotonesContainer.remove();
        }

        // Crear nuevos botones "Tomar objeto" y "Dar la vuelta"
        const botonesHabitacion = document.createElement('div');
        botonesHabitacion.classList.add('nuevos-botones');

        // Botón "Tomar objeto"
        const botonTomar = document.createElement('button');
        botonTomar.id = 'tomar';
        botonTomar.textContent = 'Tomar objeto';

        // Botón "Dar la vuelta"
        const botonVuelta = document.createElement('button');
        botonVuelta.id = 'darVuelta';
        botonVuelta.textContent = 'Dar la vuelta';

        // Añadir los botones al contenedor
        botonesHabitacion.appendChild(botonTomar);
        botonesHabitacion.appendChild(botonVuelta);

        // Añadir el contenedor al DOM
        const container = document.querySelector('.container');
        container.appendChild(botonesHabitacion);

        // Evento para "Tomar objeto"
        botonTomar.addEventListener('click', () => {
            tomarObjeto(habitacionSeleccionada);
        });

        // Evento para "Dar la vuelta"
        botonVuelta.addEventListener('click', () => {
            darVuelta();
        });
    };

    // Función para manejar la acción de "Tomar objeto"
    const tomarObjeto = (habitacionSeleccionada) => {
        // Verificar si la habitación tiene un efecto especial
        if (habitacionSeleccionada.efecto === 'muerte') {
            // Cambiar el arma del jugador a "Puño.png"
            mostrarArma('Puño.png');
            localStorage.setItem('armaActual', 'Puño.png');

            alert('Has muerto.');

            // Reiniciar la página después de un breve retraso para mostrar la alerta
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            return; // Salir de la función
        } else {
            // Cambiar el arma del jugador
            mostrarArma(habitacionSeleccionada.arma);
            // Guardar el arma en localStorage
            localStorage.setItem('armaActual', habitacionSeleccionada.arma);

            alert(`Has tomado el objeto: ${habitacionSeleccionada.nombre}`);
        }

        // Remover los botones "Tomar objeto" y "Dar la vuelta"
        const botonesHabitacion = document.querySelector('.nuevos-botones');
        if (botonesHabitacion) {
            botonesHabitacion.remove();
        }

        // Permitir al jugador elegir nuevamente entre "Izquierda" y "Derecha"
        crearNuevosBotones();
    };

    // Función para manejar la acción de "Dar la vuelta"
    const darVuelta = () => {
        // Verificar si la habitación actual es "Toxico"
        const currentSrc = imagenPrincipal.src;
        const toxicoPath = 'Toxico.png';
        if (currentSrc.includes(toxicoPath)) {
            mostrarArma('Puño.png');
            localStorage.setItem('armaActual', 'Puño.png');

            alert('Has muerto.');

            // Reiniciar la página después de un breve retraso para mostrar la alerta
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            return; // Salir de la función
        }

        // Fade out de la habitación
        imagenPrincipal.style.transition = 'opacity 2s';
        imagenPrincipal.style.opacity = '0';

        // Esperar a que la transición de opacidad termine
        setTimeout(() => {
            // Cambiar la imagen principal de vuelta a "Caminos.png"
            imagenPrincipal.src = 'Caminos.png';

            // Fade in de "Caminos.png"
            imagenPrincipal.style.opacity = '1';

            // Remover los botones "Tomar objeto" y "Dar la vuelta"
            const botonesHabitacion = document.querySelector('.nuevos-botones');
            if (botonesHabitacion) {
                botonesHabitacion.remove();
            }

            // Permitir al jugador elegir nuevamente entre "Izquierda" y "Derecha"
            crearNuevosBotones();
        }, 2000);

        // Incrementar el paso ya que el jugador ha decidido dar la vuelta
        currentStep++;
        verificarPaso();
    };

    // Función para verificar si se ha alcanzado el límite de pasos
    const verificarPaso = () => {
        if (currentStep >= maxSteps) {
            finalizarJuego();
        }
    };

    // Función para finalizar el juego después de 15 pasos
    const finalizarJuego = () => {
        // Mostrar alerta final
        alert('Por fin haz alcanzado el ultimo piso de la torre... algo ocurre alli dentro');

        // Redirigir automáticamente a la página secundaria después de mostrar el jefe final
        // Eliminamos las opciones de reiniciar o salir

        // Fade out de la imagen principal
        imagenPrincipal.style.transition = 'opacity 2s';
        imagenPrincipal.style.opacity = '0';

        setTimeout(() => {
            // Cambiar la imagen principal a la del jefe final
            imagenPrincipal.src = 'imagenes/JefeFinal.png'; // Asegúrate de tener esta imagen
            imagenPrincipal.style.opacity = '1';

            // Remover los botones "Izquierda" y "Derecha"
            const nuevosBotonesContainer = document.querySelector('.nuevos-botones');
            if (nuevosBotonesContainer) {
                nuevosBotonesContainer.remove();
            }

            // Redirigir automáticamente a la página secundaria después de mostrar el jefe final
            setTimeout(() => {
                window.location.href = 'Pelea/index.html'; // Asegúrate de crear esta página
            }, 1000); // Espera 3 segundos antes de redireccionar
        }, 2000); // Tiempo para mostrar la imagen del jefe final
    };
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

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// Fin

document.getElementById('retroButton').addEventListener('click', function() {
    // Deshabilitar el botón para evitar múltiples clics
    this.disabled = true;
    this.style.cursor = 'not-allowed';

    // Opcional: Mostrar un mensaje o animación mientras espera
    this.textContent = 'Redirigiendo...';

    // Esperar 1.4 segundos antes de redirigir
    setTimeout(() => {
        window.location.href = 'Ideas/index.html'; // Cambia esta URL por la deseada
    }, 1400);
});