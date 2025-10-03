const quizData = [
    {
        question: "Como Vênus é popularmente conhecido?",
        answers: ["Só “Vênus”, mesmo", "Estrela da manhã", "Bola vermelha", "Gigante Gasoso"],
        correct: 1
    },
];

let currentQuestion = 0;
let userAnswers = [];
let score = 0;

const videoSection = document.getElementById('video-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const startQuizBtn = document.getElementById('start-quiz-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionCounter = document.getElementById('question-counter');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const resultContent = document.getElementById('result-content');
const downloadCertificateBtn = document.getElementById('download-certificate');
const restartQuizBtn = document.getElementById('restart-quiz');

const nameModal = document.getElementById('name-modal');
const userNameInput = document.getElementById('user-name');
const generateCertificateBtn = document.getElementById('generate-certificate');
const cancelCertificateBtn = document.getElementById('cancel-certificate');
const closeModalBtn = document.querySelector('.close-modal');

startQuizBtn.addEventListener('click', startQuiz);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', finishQuiz);
downloadCertificateBtn.addEventListener('click', downloadCertificate);
restartQuizBtn.addEventListener('click', restartQuiz);

generateCertificateBtn.addEventListener('click', generateCertificateWithName);
cancelCertificateBtn.addEventListener('click', closeCertificateModal);
closeModalBtn.addEventListener('click', closeCertificateModal);

nameModal.addEventListener('click', (e) => {
    if (e.target === nameModal) {
        closeCertificateModal();
    }
});


userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateCertificateWithName();
    }
});

function init() {
    showSection('video');
}

function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    switch (sectionName) {
        case 'video':
            videoSection.classList.add('active');
            break;
        case 'quiz':
            quizSection.classList.add('active');
            break;
        case 'result':
            resultSection.classList.add('active');
            break;
    }
}

function startQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    score = 0;
    showSection('quiz');
    displayQuestion();
}


function displayQuestion() {
    const question = quizData[currentQuestion];

    questionText.textContent = question.question;
    questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;

    const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
    progress.style.width = `${progressPercent}%`;

    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.textContent = answer;
        answerDiv.addEventListener('click', () => selectAnswer(index));

        if (userAnswers[currentQuestion] === index) {
            answerDiv.classList.add('selected');
        }

        answersContainer.appendChild(answerDiv);
    });
    updateButtons();
}


function selectAnswer(answerIndex) {
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });

    document.querySelectorAll('.answer-option')[answerIndex].classList.add('selected');

    userAnswers[currentQuestion] = answerIndex;

    updateButtons();
}

function updateButtons() {
    prevBtn.disabled = currentQuestion === 0;

    const hasAnswer = userAnswers[currentQuestion] !== undefined;
    const isLastQuestion = currentQuestion === quizData.length - 1;

    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = hasAnswer ? 'inline-block' : 'none';
    } else {
        nextBtn.style.display = 'inline-block';
        nextBtn.disabled = !hasAnswer;
        finishBtn.style.display = 'none';
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1 && userAnswers[currentQuestion] !== undefined) {
        currentQuestion++;
        displayQuestion();
    }
}

function finishQuiz() {
    calculateScore();
    showResults();
    showSection('result');
}

function calculateScore() {
    score = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct) {
            score++;
        }
    }
}

function showResults() {
    const percentage = (score / quizData.length) * 100;
    //const passed = percentage >= 70; // 70% para passar
    const passed = percentage >= 0;

    let resultHTML = '';

    if (passed) {
        resultHTML = `
            <h2 class="success">🎉 Parabéns, Astronauta!</h2>
            <div class="score-display success">${score}/${quizData.length} (${percentage.toFixed(1)}%)</div>
            <p>Você demonstrou excelente conhecimento sobre o espaço e o universo!</p>
            <p>Você conquistou seu certificado de Mini Astronauta! 🚀</p>
        `;
        downloadCertificateBtn.style.display = 'inline-block';
    } else {
        resultHTML = `
            <h2 class="failure">🛸 Quase lá, Cadete!</h2>
            <div class="score-display failure">${score}/${quizData.length} (${percentage.toFixed(1)}%)</div>
            <p>Você precisa de pelo menos 70% para obter o certificado.</p>
            <p>Continue estudando sobre o universo e tente novamente! 🌌</p>
        `;
        downloadCertificateBtn.style.display = 'none';
    }
    resultHTML += '<div style="margin-top: 30px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">';
    resultHTML += '<h3 style="text-align: center; margin-bottom: 20px; color: #00d4ff;">📋 Revisão das Respostas</h3>';

    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correct = question.correct;
        const isCorrect = userAnswer === correct;

        resultHTML += `
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px; border-left: 4px solid ${isCorrect ? '#28a745' : '#dc3545'};">
                <p style="font-weight: bold; margin-bottom: 10px;">${index + 1}. ${question.question}</p>
                <p style="color: ${isCorrect ? '#28a745' : '#dc3545'};">
                    Sua resposta: ${question.answers[userAnswer]} ${isCorrect ? '✅' : '❌'}
                </p>
                ${!isCorrect ? `<p style="color: #28a745;">Resposta correta: ${question.answers[correct]} ✅</p>` : ''}
            </div>
        `;
    });

    resultHTML += '</div>';

    resultContent.innerHTML = resultHTML;
}

function openCertificateModal() {
    nameModal.classList.add('show');
    userNameInput.focus();
    userNameInput.value = '';
}

function downloadCertificate() {
    try {
        const link = document.createElement('a');
        link.href = 'assets/certificado.png';
        link.download = 'certificado-nasa.png';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Erro ao baixar certificado:', error);
    }
}

function closeCertificateModal() {
    nameModal.classList.remove('show');
    userNameInput.value = '';
}

function generateCertificateWithName() {
    const userName = userNameInput.value.trim();

    if (!userName) {
        alert('Por favor, digite seu nome para gerar o certificado!');
        userNameInput.focus();
        return;
    }

    if (userName.length < 2) {
        alert('Por favor, digite um nome mais completo!');
        userNameInput.focus();
        return;
    }

    // Fechar modal e gerar certificado
    closeCertificateModal();
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    score = 0;
    showSection('video');
}

function createDynamicStars() {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    init();
});