const draggableItems = document.querySelectorAll('.draggables .item');
const dropZones = document.querySelectorAll('.droppables .item');
const matchModal = document.getElementById('match-modal');
const completedModal = document.getElementById('completed-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalGraphic = document.getElementById('modal-graphic');

let matchedPairs = 0;
let currentDraggedEl = null;
let currentDropEl = null;
let modalOpen = false;

// Match data
const matchData = {
  hjertestop: {
    title: 'MATCH!',
    description: 'En hjertestarter bruges, når en person får hjertestop. Hjertestarteren giver et elektrisk stød til hjertet for at genoprette normal hjerterytme.',
    graphic: 'images/infografik1.png'
  },
  hjerteklapsygdom: {
    title: 'MATCH!',
    description: 'Transkateter aortaklap-implantation bruges til at behandle slidte hjerteklapper. En ny klap føres ind gennem en blodåre og placeres præcist i hjertet uden behov for åben hjerteoperation.',
    graphic: 'images/infografik2.png'
  },
  hjertearytmier: {
    title: 'MATCH!',
    description: 'Ablation er en behandling, der bruges ved uregelmæssig hjerterytme. Et lille kateter sender varme eller kulde til hjertet for at fjerne de celler, som forstyrrer rytmen.',
    graphic: 'images/infografik3.png'
  },
  aareforsnaevring: {
    title: 'MATCH!',
    description: 'PCI bruges til at åbne blodkar, der er snævre på grund af åreforsnævring. En lille ballon udvider blodåren, og en stent kan sættes ind for at holde den åben.',
    graphic: 'images/infografik4.png'
  }
};

// Setup drag events
draggableItems.forEach(drag => {
  drag.addEventListener('dragstart', (e) => {
    currentDraggedEl = drag;
    e.dataTransfer.setData('text/plain', drag.dataset.id);
    e.dataTransfer.setDragImage(drag, drag.offsetWidth / 2, drag.offsetHeight / 2);
    drag.classList.add('dragging');
  });

  drag.addEventListener('dragend', () => {
    drag.classList.remove('dragging');
  });
});

dropZones.forEach(drop => {
  drop.addEventListener('dragover', (e) => e.preventDefault());

  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const expectedId = drop.dataset.match;

    if (draggedId === expectedId && currentDraggedEl) {
      const data = matchData[draggedId];
      if (data) {
        currentDropEl = drop;

        // Populate modal
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalGraphic.src = data.graphic;
        modalGraphic.alt = `Infografik: ${draggedId}`;

        // Show overlay and modal with animation
        modalOverlay.classList.remove('hidden');
        matchModal.classList.remove('hidden');
        modalOverlay.classList.add('show');
        matchModal.classList.add('show');
        modalOpen = true;
      }
    }
    else {
        drop.classList.add('wiggle');
        setTimeout(() => drop.classList.remove('wiggle'), 400);
      }      
  });
});

// Modal click = close + remove match
modalOverlay.addEventListener('click', () => {
  if (modalOpen) {
    // Hide modal + overlay
    modalOverlay.classList.remove('show');
    modalOverlay.classList.add('hidden');
    matchModal.classList.remove('show');
    matchModal.classList.add('hidden');
    modalOpen = false;

    // Remove matched elements
    if (currentDraggedEl) {
        currentDraggedEl.classList.add('pop-out');
        setTimeout(() => currentDraggedEl.remove(), 400);
      }
      if (currentDropEl) {
        currentDropEl.classList.add('pop-out');
        setTimeout(() => currentDropEl.remove(), 400);
      }      

    matchedPairs++;
    currentDraggedEl = null;
    currentDropEl = null;

    if (matchedPairs === 4) {
      setTimeout(() => {
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('show');
        completedModal.classList.remove('hidden');
        completedModal.classList.add('show');
      }, 400);

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 4000);
    }
  }
});