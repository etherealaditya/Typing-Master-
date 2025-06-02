const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "This is a simple typing test. Try to type it accurately.",
  "Speed and accuracy are both important in typing tests."
];

let currentText = "";
let timer = 60;
let timerInterval;
let started = false;
let correctChars = 0;

const textDisplay = document.getElementById("text-display");
const inputBox = document.getElementById("input-box");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

function startTest() {
  currentText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  textDisplay.innerText = currentText;
  inputBox.value = "";
  correctChars = 0;
  started = false;
  timer = 60;
  timerDisplay.textContent = timer;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 100;
}

inputBox.addEventListener("input", () => {
  if (!started) {
    started = true;
    timerInterval = setInterval(countdown, 1000);
  }

  const typedText = inputBox.value;
  let correct = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentText[i]) correct++;
  }

  correctChars = correct;

  const wpm = Math.round((correct / 5) / ((60 - timer) / 60 || 1));
  const accuracy = Math.round((correct / typedText.length) * 100) || 0;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
});

function countdown() {
  timer--;
  timerDisplay.textContent = timer;
  if (timer <= 0) {
    clearInterval(timerInterval);
    inputBox.disabled = true;
  }
}

restartBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  inputBox.disabled = false;
  startTest();
});

startTest();
