document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     OVERLAY IMÁGENES / VIDEO
  ======================= */

  const overlay = document.getElementById('image-overlay');
  const overlayImg = document.getElementById('overlay-img');
  const overlayVideo = document.getElementById('overlay-video');

  document.querySelectorAll('.post-images img').forEach(img => {
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlayImg.style.display = 'block';

      overlayVideo.pause();
      overlayVideo.src = '';
      overlayVideo.style.display = 'none';

      overlay.style.display = 'flex';
    });
  });

  document.querySelectorAll('.post-images video').forEach(video => {
    video.play().catch(() => {});

    video.addEventListener('click', () => {
      const src = video.querySelector('source').src;

      overlayVideo.src = src;
      overlayVideo.style.display = 'block';
      overlayVideo.volume = 1;
      overlayVideo.play().catch(() => {});

      overlayImg.src = '';
      overlayImg.style.display = 'none';

      overlay.style.display = 'flex';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlayImg.src = '';
    overlayVideo.pause();
    overlayVideo.src = '';
  });


  /* =======================
     PAGINACIÓN
  ======================= */

  let currentPage = 1;
  const pages = document.querySelectorAll('.page');
  const totalPages = pages.length;
  const indicator = document.getElementById('page-indicator');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');


  /* =======================
     MIXER
  ======================= */

  const mixer = document.getElementById('mixer');
  const mixerAudios = mixer ? mixer.querySelectorAll('audio') : [];
  const mixerSliders = mixer ? mixer.querySelectorAll('input[type="range"]') : [];

  // Inicialización segura
  mixerAudios.forEach(audio => {
    audio.preload = "auto";
    audio.volume = 1;
    audio.loop = true;
    audio.pause();
    audio.currentTime = 0;
  });

  // Cada slider controla SOLO su audio
  mixerSliders.forEach(slider => {
    const audio = document.getElementById(slider.dataset.audio);

    slider.addEventListener('input', () => {
      audio.volume = parseFloat(slider.value);
    });
  });

  function startMixer() {
    mixerAudios.forEach(audio => {
      audio.volume = 1;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  }

  function stopMixer() {
    mixerAudios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }


  /* =======================
     MOSTRAR PÁGINA
  ======================= */

  function showPage(page) {
    pages.forEach(p => p.classList.remove('active'));
    pages[page - 1].classList.add('active');

    indicator.textContent = `Página ${page} / ${totalPages}`;
    window.scrollTo(0, 0);

    // 🔑 CONTROL DEL MIXER
    if (page === 2) {
      startMixer();
    } else {
      stopMixer();
    }
  }

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  // Inicial
  showPage(currentPage);

});
