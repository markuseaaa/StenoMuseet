const options = document.querySelectorAll('.option');

options.forEach(option => {
  option.addEventListener('click', () => {
    const isCorrect = option.dataset.correct === 'true';

    options.forEach(btn => {
      btn.disabled = true; // Deaktiver alle efter klik

      if (btn.dataset.correct === 'true') {
        btn.classList.add('correct'); // Det rigtige bliver grønt
      } else if (!isCorrect) {
        btn.classList.add('wrong'); // Hvis man klikker forkert: resten bliver røde
      }
    });
  });
});
