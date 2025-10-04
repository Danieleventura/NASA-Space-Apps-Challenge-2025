const quizData = [
    {
        question: "O que é “clima espacial”",
        answers: ["Quando chove no espaço.", "Quando o Sol manda energia e partículas para o nosso planeta.", "Quando há tempestade de vento na Terra."],
        correct: 1
    },
    {
        question: "O que é uma “explosão” no Sol que pode afetar a Terra?",
        answers: ["Fogo comum.", "Erupção vulcânica.", "Uma explosão de partículas e energia chamada “flare solar” ou ejeção coronal (CME)."],
        correct: 2
    },
    {
        question: "Quanto tempo a luz ou a energia de um flare leva para chegar até a Terra?",
        answers: ["Mais de um dia.", "Cerca de 8 minutos.", "Alguns segundos."],
        correct: 1
    },
    {
        question: "Qual fenômeno bonito no céu pode aparecer quando há clima espacial forte?",
        answers: ["Arco-íris.", "Bolhas de sabão no ar.", "Auroras boreais."],
        correct: 2
    },
    {
        question: "Por que nós, na Terra, não somos queimados quando ocorrem tempestades solares?",
        answers: ["Porque o Sol fica fraco.", "Porque temos escudo de gelo.", "Porque a Terra tem um campo magnético + atmosfera que nos protegem."],
        correct: 2
    },
    {
        question: "Se uma ejeção coronal (CME) parte do Sol, quanto tempo pode levar para atingir a Terra?",
        answers: ["Alguns minutos.", "Vários dias.", "Um dia."],
        correct: 1
    },
    {
        question: "Uma tempestade solar forte pode causar qual problema aqui na Terra?",
        answers: ["Congelar tudo.", "Apagar redes elétricas ou atrapalhar satélites.", "Fazer as árvores crescerem rápido."],
        correct: 1
    },
    {
        question: "Como os cientistas sabem que uma tempestade solar está vindo?",
        answers: ["Olhando para o mar.", "Com satélites que observam o Sol.", "Usando cartas de tarô."],
        correct: 1
    },
    {
        question: "Se você pudesse viajar no espaço entre o Sol e a Terra, o que veria no “clima espacial”?",
        answers: ["Chuva e vento como na Terra.", "Uma “brisa” de partículas, campos magnéticos e ondas de energia.", "Peixinhos nadando."],
        correct: 1
    },
    {
        question: "Quais são os fatores principais que influenciam o clima espacial?",
        answers: ["Tempestades solares, vento solar e partículas carregadas", "Chuva, vento e nuvens", "Temperatura da água do mar."],
        correct: 0
    },
    {
        question: "O que representam as tempestades solares?",
        answers: ["Nuvens de chuva muito fortes.", "Explosões de energia do Sol que podem enviar partículas para a Terra.", "Chuvas de meteoros."],
        correct: 1
    },
    {
        question: "De que maneira as tempestades solares podem impactar nosso planeta?",
        answers: ["Podem causar apagões, problemas em satélites e interferir nas comunicações.", "Fazem chover estrelas na Terra.", "Mudam a cor do céu para azul."],
        correct: 0
    },
    {
        question: "O que é a aurora boreal?",
        answers: ["Um tipo de nuvem brilhante.", "Um arco-íris especial.", "Luzes coloridas no céu criadas por partículas do Sol que chegam à Terra."],
        correct: 2
    },
    {
        question: "O que fazem os cientistas para investigar o clima espacial?",
        answers: ["Assistem filmes sobre o Sol.", "Estudam o Sol, satélites e a atmosfera da Terra para prever tempestades e proteger a tecnologia.", "Colhem água da chuva para estudar nuvens."],
        correct: 1
    },
];

let currentQuestion = 0;
let userAnswers = [];
let score = 0;
let selectedQuestions = []; // Array para armazenar as 5 perguntas selecionadas

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

// Elementos da Seção Educativa
const learnMoreBtn = document.getElementById('learn-more-btn');
const startQuizFromEducationBtn = document.getElementById('start-quiz-from-education');
const backToVideoBtn = document.getElementById('back-to-video');

startQuizBtn.addEventListener('click', startQuiz);
learnMoreBtn.addEventListener('click', showEducationSection);
startQuizFromEducationBtn.addEventListener('click', startQuiz);
backToVideoBtn.addEventListener('click', () => showSection('video'));
prevBtn.addEventListener('click', previousQuestion);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', finishQuiz);
restartQuizBtn.addEventListener('click', restartQuiz);


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
        case 'education':
            document.getElementById('education-section').classList.add('active');
            break;
        case 'quiz':
            quizSection.classList.add('active');
            break;
        case 'result':
            resultSection.classList.add('active');
            break;
    }
}

function showEducationSection() {
    showSection('education');
}

// Selecionar 5 perguntas aleatórias
function selectRandomQuestions() {
    const availableQuestions = [...quizData];
    selectedQuestions = [];
    
    // Selecionar 5 perguntas aleatórias
    for (let i = 0; i < 5 && availableQuestions.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestions.push(availableQuestions[randomIndex]);
        availableQuestions.splice(randomIndex, 1); // Remove a pergunta selecionada
    }
}

function startQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    score = 0;

    selectRandomQuestions();
    showSection('quiz');
    displayQuestion();
}

function displayQuestion() {
    
    const question = selectedQuestions[currentQuestion];

    questionText.textContent = question.question;
    questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${selectedQuestions.length}`;

    const progressPercent = ((currentQuestion + 1) / selectedQuestions.length) * 100;
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
    const isLastQuestion = currentQuestion === selectedQuestions.length - 1;

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
    if (currentQuestion < selectedQuestions.length - 1 && userAnswers[currentQuestion] !== undefined) {
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
    for (let i = 0; i < selectedQuestions.length; i++) {
        if (userAnswers[i] === selectedQuestions[i].correct) {
            score++;
        }
    }
}

function showResults() {
    const percentage = (score / selectedQuestions.length) * 100;
    const passed = score >= 3; // Precisa acertar pelo menos 3 de 5 perguntas

    let resultHTML = '';

    if (passed) {
        resultHTML = `
            <h2 class="success">🎉 Parabéns, Mini Astronauta!</h2>
            <div class="score-display success">${score}/${selectedQuestions.length} (${percentage.toFixed(1)}%)</div>
            <p>Você demonstrou excelente conhecimento sobre o espaço e clima espacial!</p>
            <p>Você conquistou seu certificado de Mini Astronauta! 🚀</p>
        `;
        downloadCertificateBtn.style.display = 'inline-block';
    } else {
        resultHTML = `
            <h2 class="failure">🛸 Quase lá, Cadete!</h2>
            <div class="score-display failure">${score}/${selectedQuestions.length} (${percentage.toFixed(1)}%)</div>
            <p>Você precisa acertar pelo menos 3 de 5 perguntas para obter o certificado.</p>
            <p>Continue estudando sobre o universo e tente novamente! 🌌</p>
        `;
        downloadCertificateBtn.style.display = 'none';
    }
    resultHTML += '<div style="margin-top: 30px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">';
    resultHTML += '<h3 style="text-align: center; margin-bottom: 20px; color: #00d4ff;">📋 Revisão das Respostas</h3>';

    selectedQuestions.forEach((question, index) => {
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

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    score = 0;
    selectedQuestions = []; // Limpa as perguntas selecionadas
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

// ===== FUNCIONALIDADE DO MODAL DE IMAGENS =====

const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalImageTitle = document.getElementById('modal-image-title');
const modalImageSource = document.getElementById('modal-image-source');
const modalImageDescription = document.getElementById('modal-image-description');
const closeImageModal = document.querySelector('.close-image-modal');

let currentImageData = {};

function openImageModal(galleryItem) {
    const img = galleryItem.querySelector('.gallery-image');
    const title = img.getAttribute('data-title');
    const source = img.getAttribute('data-source');
    //const description = img.getAttribute('data-description');
    const imgSrc = img.src;
    const imgAlt = img.alt;

    currentImageData = {
        src: imgSrc,
        title: title,
        source: source,
        // description: description,
        alt: imgAlt
    };

    modalImage.src = imgSrc;
    modalImage.alt = imgAlt;
    modalImageTitle.textContent = title;
    modalImageSource.textContent = source;
    //  modalImageDescription.textContent = description;


    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevenir scroll do body
}


function closeImageModalFunction() {
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restaurar scroll do body


    currentImageData = {};
}

if (closeImageModal) {
    closeImageModal.addEventListener('click', closeImageModalFunction);
}

if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeImageModalFunction();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('show')) {
        closeImageModalFunction();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    init();
});