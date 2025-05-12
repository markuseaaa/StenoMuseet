const video = document.getElementById('bg-video');
const audio = document.getElementById('bg-audio');
const title = document.getElementById('title-text');
const hotspot = document.getElementById('heart-hotspot');
const circlesContainer = document.getElementById('circles-container');
const heartImage = document.getElementById('heart-image');

// Disable hotspot until video has started
hotspot.style.pointerEvents = 'none';

let hasStarted = false;

document.body.addEventListener('click', () => {
  if (hasStarted) return;

  video.muted = false;
  video.play().catch(e => console.warn("Video play error:", e));

  if (audio) {
    audio.play().catch(e => console.warn("Audio play error:", e));
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
