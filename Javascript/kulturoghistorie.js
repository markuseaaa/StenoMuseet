
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', function () {
        this.classList.toggle('flipped');
  
        const back = this.querySelector('.back');
        const rect = this.getBoundingClientRect();
  
        back.classList.remove('adjust-up');
        if (rect.bottom > window.innerHeight - 150) {
          back.classList.add('adjust-up');
        }
      });
    });
  
    // Pulse animation
    function randomPulse() {
      const allCards = document.querySelectorAll('.flip-card');
      allCards.forEach(card => card.classList.remove('pulse'));
  
      const index = Math.floor(Math.random() * allCards.length);
      allCards[index].classList.add('pulse');
    }
  
    setInterval(randomPulse, 3000);
  });
  
