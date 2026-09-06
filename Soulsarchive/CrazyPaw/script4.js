const arma = document.getElementById("arma");
const sonidoDisparo = new Audio("Disparo.mp3");
const sonidoSinBalas = new Audio("Recargando.mp3");
const sonidoDaño = new Audio("Danio.mp3");
let destinoAlcanzado = false;


const musicaFondo = new Audio("Musica.mp3");
musicaFondo.loop = true;
musicaFondo.volume = 0.4;

window.addEventListener("load", () => {
  musicaFondo.play().catch(e => {
    console.warn("La música no se pudo reproducir automáticamente (posiblemente por restricciones del navegador).");
  });
});



// VIDA DEL JUGADOR
let vidaJugador = 100;
const vidaImg = document.getElementById("vida-img");
const vidaTexto = document.getElementById("vida-texto");
const zonaMensajes = document.getElementById("zona-mensajes");

function logEvento(mensaje) {
  const div = document.createElement("div");
  div.textContent = mensaje;
  div.className = "mensaje-log";
  zonaMensajes.appendChild(div);

  while (zonaMensajes.children.length > 5) {
    zonaMensajes.removeChild(zonaMensajes.firstChild);
  }

  zonaMensajes.querySelectorAll(".mensaje-log").forEach((el, i) => {
    el.style.opacity = 1 - (zonaMensajes.children.length - 1 - i) * 0.2;
  });
}


logEvento(`Objetivo: Causar 74 bajas Azules y menos de 22 Blancas`);

function mostrarPantallaGameOver() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  overlay.style.zIndex = 99999;
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.innerHTML = `
    <img src="Muerte.png" alt="Game Over" style="width: 220px; max-width: 90%; margin-bottom: 20px;">
     <button id="boton-reiniciar" style="padding: 12px 24px; font-size: 18px; font-weight: bold; background-color: rgba(255, 255, 255, 0.6); color: #000; border: 2px solid #000; border-radius: 4px; cursor: pointer;">Reiniciar (E)</button>
  `;
  document.body.appendChild(overlay);

  clearInterval(regeneracionInterval);
  document.removeEventListener("click", handleDisparo);
  document.removeEventListener("keydown", handleRecarga);
  document.removeEventListener("mousemove", handleParallax);
}

document.addEventListener("keydown", function (e) {
  if (e.key.toLowerCase() === "e") {
    location.reload();
  }
});



function actualizarVida(nuevaVida) {
  const previa = vidaJugador;
  vidaJugador = Math.max(0, Math.min(100, nuevaVida));

  if (vidaJugador > 70) {
    vidaImg.src = "Sonrisa.png";
  } else if (vidaJugador > 40) {
    vidaImg.src = "Enojo1.png";
  } else if (vidaJugador > 15) {
    vidaImg.src = "Asombro1.png";
  } else {
    vidaImg.src = "Critico.png";
  }

  if (vidaJugador < previa) {
    sonidoDaño.currentTime = 0;
    sonidoDaño.play();
    vidaImg.style.animation = "temblor 0.3s";
    setTimeout(() => vidaImg.style.animation = "", 300);
    logEvento(`¡Recibiste daño! Vida: ${Math.round(vidaJugador)}%`);
  }

  vidaTexto.textContent = `Vida: ${Math.round(vidaJugador)}%`;

  if (vidaJugador <= 0) {
    mostrarPantallaGameOver();
  }
}

// REGENERA VIDA CADA 1 SEGUNDO (+1%)
setInterval(() => {
  if (vidaJugador < 100) {
    actualizarVida(vidaJugador + 0.5);
    logEvento("Regeneración: +0.5% vida");
  }
}, 1000);

// BLOQUEAR SELECCIÓN Y ARRASTRE ACCIDENTAL
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());
document.addEventListener("contextmenu", e => e.preventDefault());

// MOVIMIENTO ARMA
document.addEventListener("mousemove", (e) => {
  arma.style.left = `${e.clientX}px`;
  arma.style.top = `${e.clientY}px`;
});

// BALAS Y RECARGA
let balas = 10;
let recargando = false;
const contadorBalas = document.getElementById("contador-balas");

let aciertosConsecutivos = 0;

function cambiarImagenTemporalmente() {
  vidaImg.src = "Uuh1.png";
  vidaImg.style.animation = "temblor 0.3s";
  setTimeout(() => {
    vidaImg.style.animation = "";
    actualizarVida(vidaJugador);
  }, 2000);
  logEvento("¡Racha de precisión! Imagen cambiada");
}

document.addEventListener("click", () => {
  if (recargando) {
    sonidoSinBalas.currentTime = 0;
    sonidoSinBalas.play();
    logEvento("Click sin balas");
    return;
  }

  if (balas > 0) {
    balas--;
    contadorBalas.textContent = "💥".repeat(balas);

    arma.src = "PistolaJugador2.png";
    sonidoDisparo.currentTime = 0;
    sonidoDisparo.play();
    logEvento("Disparo realizado");

    setTimeout(() => {
      if (!recargando) arma.src = "PistolaJugador.png";
    }, 100);

    if (balas === 0) {
      iniciarRecarga();
    }
  }
  
});


document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    if (!recargando && balas < 10) {
      iniciarRecarga();
    }
  }
});

function iniciarRecarga() {
  recargando = true;
  contadorBalas.textContent = "cargando...";
  arma.src = "Recargando.png";
  logEvento("Recargando arma...");

  setTimeout(() => {
    balas = 10;
    recargando = false;
    contadorBalas.textContent = "💥".repeat(balas);
    arma.src = "PistolaJugador.png";
    logEvento("Recarga completada");
  }, 3300);
}

// CRONÓMETRO Y DIFICULTAD
let segundos = 0;
let minutos = 0;
let dificultad = 0;
const cronometro = document.getElementById("cronometro");

setInterval(() => {
  segundos++;
  if (segundos >= 60) {
    segundos = 0;
    minutos++;
    dificultad++;
  }

  const formatoMin = minutos.toString().padStart(2, "0");
  const formatoSeg = segundos.toString().padStart(2, "0");
  cronometro.textContent = `Tiempo: ${formatoMin}:${formatoSeg}`;
}, 1000);

// BAJAS
let bajasAzules = 0;
let bajasBlancas = 0;
const bajasAzulesSpan = document.getElementById("bajas-azules");
const bajasBlancasSpan = document.getElementById("bajas-blancas");

// OBJETIVOS DISPONIBLES
const objetivos = [
  "Angel8.png", "Angel9.png", "Angel3.png", "Angel4.png", "Angel5.png",
  "Angel6.png", "Angel7.png", "Angel10.png", "Angel11.png", "Curacion.png", "Municion.png"
];

let curacionActiva = false;
let municionActiva = false;

// GENERADOR DE OBJETIVOS
setInterval(() => {
  const totalSegundos = minutos * 60 + segundos;
  const incluirAngel10 = totalSegundos >= 90;
  const incluirAngel11 = totalSegundos >= 40;
  const incluirMunicion = totalSegundos >= 100;

  const peligrosos = ["Angel4.png", "Angel5.png", "Angel6.png"];
  const normales = ["Angel3.png", "Angel7.png", "Angel8.png", "Angel9.png"];
  const especiales = [];
  if (incluirAngel10) especiales.push("Angel10.png");
  if (incluirAngel11) especiales.push("Angel11.png");

  let pool = [];
  const prob = Math.random();

  if (!curacionActiva && Math.random() < Math.min(0.05 + dificultad * 0.01, 0.25)) {
    crearObjetivoDesdeImagen("Curacion.png");
    curacionActiva = true;
    return;
  }

  if (incluirMunicion && !municionActiva && Math.random() < 0.15 + dificultad * 0.02) {
    crearObjetivoDesdeImagen("Municion.png");
    municionActiva = true;
    return;
  }

  if (especiales.length && prob < 0.1 + dificultad * 0.02) {
    pool = especiales;
  } else if (prob < Math.min(0.1 + dificultad * 0.05, 0.8)) {
    pool = peligrosos;
  } else {
    pool = normales;
  }

  const src = pool[Math.floor(Math.random() * pool.length)];
  crearObjetivoDesdeImagen(src);
}, 800);

function crearObjetivoDesdeImagen(src) {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("objetivo");
  if (src === "Curacion.png" || src === "Municion.png") {
    img.style.width = "65px";
    img.style.height = "65px";
  }
  document.body.appendChild(img);

  const desdeIzquierda = Math.random() < 0.5;
  const xInicial = desdeIzquierda ? -100 : window.innerWidth + 100;
  const yInicial = 50 + Math.random() * (window.innerHeight - 200);

  img.style.left = `${xInicial}px`;
  img.style.top = `${yInicial}px`;

  const velocidad = 1 + Math.random() * 2;
  const direccionX = desdeIzquierda ? 1 : -1;
  let angulo = Math.random() * Math.PI * 2;

  let objetivoVivo = true;
  let mover, clicks = 0;
  const esPeligroso = ["Angel4.png", "Angel5.png", "Angel6.png"].includes(src);
  let intervaloDaño = null;

  if (esPeligroso) intervaloDaño = setInterval(() => {
    if (objetivoVivo) actualizarVida(vidaJugador - (Math.random() * (6 - 2.5) + 2.5));
  }, 4000);
  if (src === "Angel10.png") intervaloDaño = setInterval(() => {
    if (objetivoVivo) actualizarVida(vidaJugador - 5);
  }, 3500);
  if (src === "Angel11.png") intervaloDaño = setInterval(() => {
    if (objetivoVivo) actualizarVida(vidaJugador - 4.5);
  }, 2000);

  mover = setInterval(() => {
    const x = parseFloat(img.style.left);
    const y = parseFloat(img.style.top);
    angulo += 0.1 + Math.random() * 0.2;
    img.style.left = `${x + direccionX * velocidad}px`;
    img.style.top = `${y + Math.sin(angulo) * 5}px`;

    if (x < -150 || x > window.innerWidth + 150 || y < -150 || y > window.innerHeight + 150) {
      objetivoVivo = false;
      clearInterval(mover);
      if (intervaloDaño) clearInterval(intervaloDaño);
      if (src === "Curacion.png") curacionActiva = false;
      if (src === "Municion.png") municionActiva = false;
      img.remove();
    }
  }, 16);

  img.addEventListener("click", () => {
    if (balas === 0 || recargando || !objetivoVivo) return;

    if (src === "Curacion.png") {
      actualizarVida(vidaJugador + 4);
      logEvento("¡Curación recibida! +4% vida");
      curacionActiva = false;
    }

    if (src === "Municion.png") {
      balas = Math.min(10, balas + 3);
      contadorBalas.textContent = "💥".repeat(balas);
      logEvento("¡Recarga de emergencia! +3 balas");
      municionActiva = false;
    }

    aciertosConsecutivos++;
    if (aciertosConsecutivos >= 5) {
      cambiarImagenTemporalmente();
      aciertosConsecutivos = 0;
    }

    clicks++;
    if ((src === "Angel10.png" && clicks >= 3) ||
        (src === "Angel11.png" && clicks >= 2) ||
        (!["Angel10.png", "Angel11.png"].includes(src))) {

      objetivoVivo = false;
      clearInterval(mover);
      if (intervaloDaño) clearInterval(intervaloDaño);
      if (src === "Curacion.png") curacionActiva = false;
      if (src === "Municion.png") municionActiva = false;

      if (["Angel3.png", "Angel9.png"].includes(src)) {
        bajasAzules++;
        bajasAzulesSpan.textContent = bajasAzules;
        logEvento("Baja azul eliminada");
        actualizarDestino(bajasAzules, bajasBlancas);
      } else if (!["Curacion.png", "Municion.png"].includes(src)) {
        bajasBlancas++;
        actualizarDestino(bajasAzules, bajasBlancas);
        bajasBlancasSpan.textContent = bajasBlancas;
        logEvento("Baja blanca eliminada");
      }

      img.style.pointerEvents = "none";
      img.style.transition = "top 1s ease-in, transform 0.3s";
      img.style.top = `${window.innerHeight + 200}px`;
      img.style.transform = "rotate(90deg)";
      setTimeout(() => img.remove(), 1500);
    }
  });
}

// FONDO INTERACTIVO (parallax)
document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.body.style.backgroundPosition = `${50 + (x - 0.5) * 3}% ${50 + (y - 0.5) * 2}%`;
});

// DESTINO VISUAL
const destinoContenedor = document.createElement("div");
destinoContenedor.style.position = "fixed";
destinoContenedor.style.bottom = "10px";
destinoContenedor.style.left = "10px";
destinoContenedor.style.textAlign = "center";
destinoContenedor.style.zIndex = "9999";
destinoContenedor.innerHTML = `
  <div style="color: white; font-weight: bold; font-size: 18px;">Destino</div>
  <img id="imagen-destino" src="" style="width: 150px; height: auto; display: none; margin-top: 4px; z-index: 1000;">
`;
document.body.appendChild(destinoContenedor);
const imagenDestino = document.getElementById("imagen-destino");

function actualizarDestino(bajasAzules, bajasBlancas) {
  if (destinoAlcanzado) return; // Evita cambiar si ya se eligió un destino

  if (bajasAzules >= 74 && bajasBlancas < 22) {
    imagenDestino.src = "DestinoAzul.png";
    imagenDestino.style.display = "block";
    destinoAlcanzado = true;
  } else if (bajasBlancas >= 22) {
    imagenDestino.src = "DestinoBlanco.png";
    imagenDestino.style.display = "block";
    destinoAlcanzado = true;
  }
}
