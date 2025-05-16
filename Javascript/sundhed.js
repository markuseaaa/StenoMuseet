const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const healthBar = document.getElementById('health-bar');
const choiceButtons = document.querySelectorAll('.choice-btn');

let health = 100;
let currentQuestionIndex = 0;

document.body.classList.add('playing');

// Spørgsmål
const questions = [
  {
    role: "Ung",
    question: "Hvordan bruger du din fritid?",
    answers: [
      { text: "Går en tur", effect: +10 },
      { text: "Ser tv hele dagen", effect: -12 }
    ]
  },
  {
    role: "Ung",
    question: "Du vil snacke om aftenen. Hvad vælger du?",
    answers: [
      { text: "Popcorn uden smør", effect: +5 },
      { text: "Mørk chokolade (70%)", effect: -5 },
      { text: "Chips og dip", effect: -10 }
    ]
  },
  {
    role: "Ung",
    question: "Du har haft en travl dag og er træt, men din ven spørger om du vil med ind og træne",
    answers: [
      { text: "Takker nej og hviler dig", effect: +4 },
      { text: "Tager med selvom du er træt", effect: +2 }
    ]
  },
  {
    role: "Voksen",
    question: "Du skal spise aftensmad. Hvad vælger du?",
    answers: [
      { text: "Salat med kylling", effect: +10 },
      { text: "Burger med pommes", effect: -15 }
    ]
  },
  {
    role: "Voksen",
    question: "Du skal til supermarkedet",
    answers: [
      { text: "Kører i bil", effect: -13 },
      { text: "Cykler derhen", effect: +14 },
      { text: "Kører i bil og køber slik", effect: -17 }
    ]
  },
  {
    role: "Voksen",
    question: "Du mærker stikken i brystet under løb. Hvad gør du?",
    answers: [
      { text: "Stopper og kontakter lægen", effect: +15 },
      { text: "Løber videre", effect: -20 }
    ]
  },
  {
    role: "Ældre",
    question: "Hvordan starter du din dag?",
    answers: [
      { text: "En gåtur i kvarteret", effect: +10 },
      { text: "Avis og morgenkaffe i sofaen", effect: -5 }
    ]
  },
  {
    role: "Ældre",
    question: "Hvad vælger du til frokost?",
    answers: [
      { text: "Rugbrød med æg og grønt", effect: +15 },
      { text: "Franskbrød med ost", effect: 0 },
      { text: "Pølsehorn og sodavand", effect: -10 }
    ]
  },
  {
    role: "Ældre",
    question: "Hvordan bruger du din eftermiddag?",
    answers: [
      { text: "Træner med seniorholdet", effect: +15 },
      { text: "Ser fjernsyn", effect: -5 },
      { text: "Tager en lur og springer måltid over", effect: -10 }
    ]
  }
];

// Funktion til at vise spørgsmål
function showQuestion(index) {
  const questionData = questions[index];
  document.getElementById('role').textContent = questionData.role;
  document.getElementById('question').textContent = questionData.question;

  const buttons = document.querySelectorAll('.choice-btn');

  buttons.forEach((btn, i) => {
    if (questionData.answers[i]) {
      btn.style.display = 'inline-block';
      btn.textContent = questionData.answers[i].text;
      btn.dataset.effect = questionData.answers[i].effect;
    } else {
      btn.style.display = 'none';
    }
  });
}

// Knap-events
choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const effect = parseInt(button.dataset.effect);
    const feedback = document.getElementById('feedback');

    // Opdater health
    health = Math.max(0, Math.min(100, health + effect));
    healthBar.style.width = health + '%';

    // Skift farve
    if (health > 70) {
      healthBar.style.backgroundColor = '#4caf50';
    } else if (health > 30) {
      healthBar.style.backgroundColor = '#ffb300';
    } else {
      healthBar.style.backgroundColor = '#f44336';
    }

    // Vis feedback
feedback.textContent = (effect >= 0 ? "+" : "") + effect;

// Fjern tidligere farver
feedback.classList.remove("positive", "negative");

// Tilføj farve baseret på effekt
if (effect >= 0) {
  feedback.classList.add("positive");
} else {
  feedback.classList.add("negative");
}

feedback.style.opacity = 1;

    // Fjern feedback efter 1.5 sekunder
    setTimeout(() => {
      feedback.style.opacity = 0;
    }, 1500);

    // Gå til næste spørgsmål med det samme
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      // Slut
      setTimeout(() => {
        alert("Spillet er slut! Din hjertesundhed er: " + health + "%");
      }, 1500);
    }
  });
});

// Start-knap
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'flex';
  showQuestion(currentQuestionIndex);
});
