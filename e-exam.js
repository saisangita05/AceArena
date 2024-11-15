const startExamButton = document.getElementById('start-exam');
const subjectSelect = document.getElementById('subject-select');
const examSection = document.getElementById('exam-section');
const questionContainer = document.getElementById('question-container');
const submitExamButton = document.getElementById('submit-exam');
const resultSection = document.getElementById('result-section');
const scoreElement = document.getElementById('score');
const progressReportElement = document.getElementById('progress-report');
const timerElement = document.getElementById('time-left');

const questions = {
    math: [
        { question: "What is 2 + 2?", choices: ["3", "4", "5"], answer: "4" },
        { question: "What is 5 * 5?", choices: ["10", "20", "25"], answer: "25" }
    ],
    science: [
        { question: "What planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter"], answer: "Mars" },
        { question: "What is H2O?", choices: ["Oxygen", "Hydrogen", "Water"], answer: "Water" }
    ],
    history: [
        { question: "Who was the first President of the United States?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"], answer: "George Washington" },
        { question: "In what year did World War II end?", choices: ["1945", "1939", "1918"], answer: "1945" }
    ]
};

let currentSubject = '';
let correctAnswers = 0;
let timeLeft = 60;
let timerInterval;

startExamButton.addEventListener('click', () => {
    currentSubject = subjectSelect.value;
    if (currentSubject) {
        examSection.style.display = 'block';
        document.getElementById('subject-name').textContent = `Exam: ${currentSubject}`;
        loadQuestions(currentSubject);
        startExamButton.style.display = 'none';
        startTimer();
    } else {
        alert("Please select a subject.");
    }
});

function loadQuestions(subject) {
    questionContainer.innerHTML = '';
    questions[subject].forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${q.question}</p>`;
        q.choices.forEach(choice => {
            questionElement.innerHTML += `<input type="radio" name="question${index}" value="${choice}"> ${choice}<br>`;
        });
        questionContainer.appendChild(questionElement);
    });
    submitExamButton.style.display = 'block';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endExam();
        }
    }, 1000);
}

submitExamButton.addEventListener('click', endExam);

function endExam() {
    clearInterval(timerInterval);
    const userAnswers = Array.from(questionContainer.querySelectorAll('input[type="radio"]:checked'));
    correctAnswers = 0;
    questions[currentSubject].forEach((q, index) => {
        if (userAnswers[index] && userAnswers[index].value === q.answer) {
            correctAnswers++;
        }
    });

    const totalQuestions = questions[currentSubject].length;
    const score = (correctAnswers / totalQuestions) * 100;
    scoreElement.textContent = `You scored: ${score}%`;
    progressReportElement.textContent = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`;

    resultSection.style.display = 'block';
    examSection.style.display = 'none';
    startExamButton.style.display = 'block';
    submitExamButton.style.display = 'none';
}
