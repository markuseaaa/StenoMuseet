const video = document.getElementById('bg-video');
const audio = document.getElementById('bg-audio');
const title = document.getElementById('title-text');
const hotspot = document.getElementById('heart-hotspot');
const circlesContainer = document.getElementById('circles-container');
const heartImage = document.getElementById('heart-image');

// Deaktiver hotspot indtil video er startet
hotspot.style.pointerEvents = 'none';

let hasStarted = false;

document.body.addEventListener('click', () => {
  if (hasStarted) return;

  video.muted = false;
  video.play();

  if (audio) {
    audio.play();
  }

  hotspot.style.pointerEvents = 'auto';
  hasStarted = true;
}, { once: true });

hotspot.addEventListener('click', () => {
  heartImage.classList.add('visible');
  video.currentTime = 0;
  video.pause();
  title.classList.add('hidden');

  setTimeout(() => {
    title.style.display = 'none';
  }, 600);

  circlesContainer.style.display = 'flex';
  setTimeout(() => {
    circlesContainer.classList.add('active');
  }, 50);
});
