const sorpresa = document.getElementById("sorpresa");
const sonido = document.getElementById("sonido");

// Aparece 2 segundos después de cargar
setTimeout(() => {
  sorpresa.style.transform = "translateY(0)";
}, 2000);

// Al hacer click: sonido + redirección
sorpresa.addEventListener("click", () => {
  sonido.play();
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
});

const fondo = document.getElementById("fondo-luminoso");

function cambiarLuzAleatoria() {
  // Brillo entre 0.6 (muy tenue) y 1.2 (más notorio)
  const brillo = (Math.random() * 0.6 + 0.6).toFixed(2);

  // Opacidad entre 0.35 y 0.75
  const opacidad = (Math.random() * 0.4 + 0.35).toFixed(2);

  fondo.style.filter = `brightness(${brillo})`;
  fondo.style.opacity = opacidad;

  // Tiempo entre cada cambio: 1.5 a 3.5 segundos
  const delay = Math.random() * 2000 + 1500;
  setTimeout(cambiarLuzAleatoria, delay);
}

cambiarLuzAleatoria();