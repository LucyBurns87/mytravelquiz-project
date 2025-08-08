// Array of quiz questions and answers
const questions = [
  {
    question: 'Which of these cities is not located in Australia?',
    answers: [
      { text: 'Auckland', correct: true },
      { text: 'Sydney', correct: false },
      { text: 'Melbourne', correct: false },
      { text: 'Brisbane', correct: false },
    ],
  },
  {
    question: "What is the capital of Brazil?",
    answers: [
      { text: 'Salvador', correct: false },
      { text: 'Sao Paulo', correct: false },
      { text: 'Rio de Janeiro', correct: false },
      { text: 'Brasilia', correct: true },
    ],
  },
    {
    question: 'Which of these Countries is not located in South America',
    answers: [
      { text: 'Mexico', correct: true },
      { text: 'Brazil', correct: false },
      { text: 'Argentina', correct: false },
      { text: 'Chile', correct: false },
    ],
  },
   {
    question: 'Which of these two continents would connect across the Strait of Gibraltar if a bridge were to be built?',
    answers: [
      { text: 'North America and South America', correct: false },
      { text: 'Asia and Europe', correct: false },
      { text: 'Africa and Antarctica', correct: false },
      { text: 'Europe and Africa', correct: true },
    ],
  },
   {
    question: 'Which language is spoken in the Canadian Province of Quebec?',
    answers: [
      { text: 'English', correct: false },
      { text: 'Dutch', correct: false },
      { text: 'German', correct: false },
      { text: 'French', correct: true },
    ],
  },
   {
    question: 'Which cities are you flying between if the airport codes on your ticket are LHR and HKG?',
    answers: [
      { text: 'Leavenworth to Ho Chi Minh City', correct: false },
      { text: 'London to Hangzhou', correct: false },
      { text: 'Lihue to Hong Kong', correct: false },
      { text: 'London to Hong Kong', correct: true },
    ],
  },
   {
    question: 'Which of these Countries is not part of Scandinavia?',
    answers: [
      { text: 'Norway', correct: false },
      { text: 'Finland', correct: true },
      { text: 'Sweden', correct: false },
      { text: 'Denmark', correct: false },
    ],
  },
   {
    question: 'What is the currentcy of Mexico?',
    answers: [
      { text: 'Euro', correct: false },
      { text: 'Pound', correct: false },
      { text: 'Peso', correct: true },
      { text: 'Sterling', correct: false },
    ],
  },
    {
    question: 'Which of these countries is not located in Asia?',
    answers: [
      { text: 'Egypt', correct: true },
      { text: 'Taiwan', correct: false },
      { text: 'India', correct: false },
      { text: 'Russia', correct: false },
    ],
  },
   {
    question: 'In what European Country is Baselworld the annual watch and jewellery fair held?',
    answers: [
      { text: 'France', correct: false },
      { text: 'Austria', correct: false },
      { text: 'Hungary', correct: false },
      { text: 'Switzerland', correct: true },
    ],
  },


];

// Shuffle function to randomize questions
function shuffle(array) {
  return array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

// Game state variables
let gameStarted = false;     // Tracks if the game has started
let shuffledQuestions = [];  // Stores shuffled questions for the session
let currentIndex = 0;        // Current question index
let userAnswers = [];         // Stores user's answers
let score = 0;                // User's score
let showResult = false;        // Tracks if result screen should be shown


// Starts the game and initializes state
function startGame() {
  shuffledQuestions = shuffle(questions).slice(0, 10);  // Pick 10 random questions
  currentIndex = 0;
  userAnswers = [];
  score = 0;
  showResult = false;
  gameStarted = true;
  render();
}

// Handles user's answer selection
function handleAnswer(correct) {
  if (userAnswers[currentIndex] !== undefined) return; // Prevent multiple answers
  userAnswers[currentIndex] = correct;                  // Store answer
  if (correct) score++;                                  // Increment score if correct
  render();
}

// Moves to the next question or shows result if last question
function nextQuestion() {
  if (currentIndex < shuffledQuestions.length - 1) {
    currentIndex++;
  } else {
    showResult = true;
  }
  render();
}

// Moves to the previous question
function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
  }
  render();
}

// Restarts the game
function restartGame() {
  gameStarted = false;
  showResult = false;
  render();
}

// Renders the quiz UI based on current state
function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';

// Show start button if game hasn't started
  if (!gameStarted) {
    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';
    startBtn.className = 'btn start-btn';
    startBtn.onclick = startGame;
    app.appendChild(startBtn);
    return;
  }


  // Show quiz question and score area if game is in progress
  if (gameStarted && !showResult) {
    const scoreArea = document.createElement('div');
    scoreArea.className = 'score-area';
    scoreArea.innerHTML = `
      <span id="score">Score: ${score}/10</span>
      <span id="question-count">Question ${currentIndex + 1} of ${shuffledQuestions.length}</span>
    `;
    app.appendChild(scoreArea);

    // Question container
    const container = document.createElement('div');
    container.className = 'container';

    // Current question
    const questionDiv = document.createElement('div');
    questionDiv.id = 'question';
    questionDiv.className = 'quiz';
    questionDiv.textContent = shuffledQuestions[currentIndex].question;
    container.appendChild(questionDiv);

    const answerButtons = document.createElement('div');
    answerButtons.id = 'answer-buttons';
    answerButtons.className = 'btn-grid';

    shuffledQuestions[currentIndex].answers.forEach((answer, idx) => {
      const btn = document.createElement('button');
      btn.textContent = answer.text;
      // Show correct/wrong styling after answering
      btn.className = userAnswers[currentIndex] !== undefined
        ? answer.correct ? 'btn correct' : 'btn wrong'
        : 'btn';
      btn.disabled = userAnswers[currentIndex] !== undefined;
      btn.onclick = () => handleAnswer(answer.correct);
      answerButtons.appendChild(btn);
    });

    container.appendChild(answerButtons);

      // Navigation controls
    const controls = document.createElement('div');
    controls.className = 'controls';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.className = 'btn prev-btn';
    prevBtn.disabled = currentIndex === 0;
    prevBtn.onclick = prevQuestion;
    controls.appendChild(prevBtn);

    // Next/Finish button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = currentIndex === shuffledQuestions.length - 1 ? 'Finish' : 'Next';
    nextBtn.className = 'btn next-btn';
    nextBtn.disabled = userAnswers[currentIndex] === undefined;
    nextBtn.onclick = nextQuestion;
    controls.appendChild(nextBtn);

    container.appendChild(controls);
    app.appendChild(container);
    return;
  }
  
    // Show result screen after quiz is finished
  if (showResult) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    const h2 = document.createElement('h2');
    h2.textContent =
      score >= 8
        ? `Congratulations! You scored ${score} out of 10. You did great!`
        : score >= 6
        ? `You scored ${score} out of 10. You did well, try again!`
        : `You scored ${score} out of 10. Better luck next time!`;
    resultDiv.appendChild(h2);

    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart';
    restartBtn.className = 'btn start-btn';
    restartBtn.onclick = restartGame;
    resultDiv.appendChild(restartBtn);

    app.appendChild(resultDiv);
  }
}

// Initial render
document.addEventListener('DOMContentLoaded', render);


