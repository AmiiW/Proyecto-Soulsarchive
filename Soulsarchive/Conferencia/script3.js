const audio = document.getElementById("audio");
const subtitlesBox = document.getElementById("subtitles-box");
const subtitlesText = document.getElementById("subtitles-text");
const background = document.getElementById("background");
const playButton = document.getElementById("play-button");

// Texto dividido en bloques de 34 palabras
const subtitles = `
  Buenos dias para todos, yo soy Paz, es un gusto para mi estar hoy aqui con todos ustedes. 
  Dare una charla a cerca del conocimiento. Del verdadero conocimiento.

  El conocimiento tiene una paradoja, “De que sirve saber tanto si no se puede cambiar nada”, “tanto para nada”, una gran contradicción, un mundo inutil en muchos aspectos, vacio, violento y egoista, muchas personas lo quieren todo para su propio beneficio.

  pero hay saberes necesarios, o por lo menos de utilidad para el ser, conocimientos que dejan por fuera a las personas y solo se involucra con uno mismo, como lo es la reflexion, que podria llevar a un auto conocimiento, a saberes arraigados al estudio del mundo en el que vivimos y no el mundo al que aparenta pertenecer el ser humano.

  Cabe aclarar que está en la posibilidad de cada uno, descubrir la visión, la escencia intrínseca de nuestra alma, conocer lo que habita y controla el cuerpo humano y en este proceso convertirnos y hacer fructífero todo el desarrollo que hayamos hecho, el esfuerzo infringido.

  El alma muchas veces quiere conocer el mundo, una vez conozcamos y sepamos cuidar de ella sabremos la forma para hacerla feliz y no arrepentirnos.

  Pero hay otros aspectos que lastimosamente son mas importantes, hay otros saberes para sobrevivir. Tenemos el tiempo contado si no nos dedicamos a dar como ofrenda una parte del alma a cambio de tiempo, y si uno se maneja con precaución posteriormente esos saberes tambien alimentaran al alma.

  ¿La tecnica?, ni yo la se. Pero puedo decir que es necesario mantenerse en paz siempre, buscar el rayo de sol y volverse un iluminado, basta con primero respirar hondo, basta con conocer mejor el espiritu interno de cada uno.

  Muchas gracias a todos por estar aqui, les deseo un feliz dia y suerte en su camino hacia la paz.
`.split(/\s+/).reduce((chunks, word, index) => {
  const chunkIndex = Math.floor(index / 34);
  chunks[chunkIndex] = (chunks[chunkIndex] || []).concat(word);
  return chunks;
}, []).map(chunk => chunk.join(' '));

// Calcular el tiempo promedio por bloque con un pequeño retraso
const totalDuration = 136; // Duración del audio en segundos
const timePerBlock = (totalDuration / subtitles.length) * 1.01; // Ajuste del 1% más lento

// Verificar si el audio se reproduce automáticamente
audio.autoplay = true;

// Si el audio puede reproducirse correctamente, ocultar el botón de play
audio.oncanplaythrough = () => {
  playButton.style.display = 'none'; // Ocultar el botón cuando el audio pueda reproducirse
};

// Mostrar el botón de play si hay un error en la reproducción automática
audio.onerror = () => {
  playButton.style.display = 'block'; // Mostrar el botón si hay un error
};

// Función para reproducir el audio al hacer clic en el botón de play
playButton.addEventListener("click", () => {
  audio.play();
  playButton.style.display = 'none'; // Ocultar el botón después de hacer clic
});

// Sincronizar subtítulos con el tiempo del audio
let currentIndex = 0;
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  // Verificar si es tiempo de cambiar al siguiente bloque
  if (currentTime >= currentIndex * timePerBlock && currentIndex < subtitles.length) {
    subtitlesText.textContent = subtitles[currentIndex];

    // Cambiar fondo de la página intermitentemente
    if (currentIndex % 2 === 0) {
      background.style.backgroundImage = "url('LuzCharla2.png')";
    } else {
      background.style.backgroundImage = "url('LuzCharla1.png')";
    }

    currentIndex++;
  }
});

// Reiniciar subtítulos al terminar el audio y redirigir
audio.addEventListener("ended", () => {
  currentIndex = 0;
  subtitlesText.textContent = "";

  // Fade out al terminar el audio
  document.body.style.transition = "opacity 1s ease";
  document.body.style.opacity = "0";

  // Redirigir después de 1 segundo (el tiempo del fade)
  setTimeout(() => {
    window.location.href = "Menu/index.html"; // Cambia la URL a la página de destino
  }, 1000);
});

// Función para ir a la página anterior
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// Fin