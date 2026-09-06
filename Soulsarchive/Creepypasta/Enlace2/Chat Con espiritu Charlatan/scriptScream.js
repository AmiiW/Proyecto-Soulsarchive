document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const overlay = document.getElementById('overlay');
  const sound = document.getElementById('sound');

  video.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex'; // Asegurarse de mostrar el overlay
    sound.play();
  });
});