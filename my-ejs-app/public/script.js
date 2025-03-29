const quizData = {
  history: [
      {
          question: "Who was the first President of the United States?",
          options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
          correctAnswer: "George Washington",
      },
      {
          question: "What year did World War II end?",
          options: ["1941", "1945", "1950", "1939"],
          correctAnswer: "1945",
      }
  ],
  science: [
      {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "HO"],
          correctAnswer: "H2O",
      },
      {
          question: "What planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Mars",
      }
  ],
  technology: [
      {
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Hyper Transfer Markup Language", "Hyperlinking Text Management Language"],
          correctAnswer: "Hyper Text Markup Language",
      },
      {
          question: "Which company created the Windows operating system?",
          options: ["Apple", "Google", "Microsoft", "IBM"],
          correctAnswer: "Microsoft",
      }
  ],
  sports: [
      {
          question: "Which sport is known as the 'King of Sports'?",
          options: ["Basketball", "Cricket", "Soccer", "Tennis"],
          correctAnswer: "Soccer",
      },
      {
          question: "How many players are there in a standard soccer team?",
          options: ["9", "10", "11", "12"],
          correctAnswer: "11",
      }
  ]
};

// ✅ Correctly Load Quiz When Page Opens
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic');

    // Apply topic validation only on the quiz page
    if (window.location.pathname === '/quiz') {
        if (!topic || !quizData[topic]) {
            alert("Invalid topic selected. Redirecting to home.");
            window.location.href = "/";
        }
    }

    console.log("Selected Topic:", topic); // Debugging check
}); // Debugging check

    const welcomeSection = document.getElementById('welcome-section');
    const quizContainer = document.getElementById('quiz-container');
    const quizTopicSpan = document.getElementById('quiz-topic');
    const quizTopicText = document.getElementById('quiz-topic-text');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackElement = document.getElementById('feedback');
    const questionCounter = document.getElementById('question-counter');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');

    let currentQuestionIndex = 0;
    let score = 0;
    let totalQuestions = quizData[topic].length;
    let selectedAnswer = null;
    let answered = false;

    quizTopicSpan.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);

    setTimeout(() => {
        welcomeSection.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        initQuiz();
    }, 3000);

    function initQuiz() {
        quizTopicText.textContent = `Topic: ${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= totalQuestions) {
            questionText.textContent = `Quiz Completed! You scored ${score} out of ${totalQuestions}.`;
            optionsContainer.innerHTML = '';
            nextBtn.textContent = "Restart Quiz";
            nextBtn.addEventListener('click', () => location.reload());
            return;
        }

        answered = false;
        selectedAnswer = null;
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-50", "cursor-not-allowed");
        nextBtn.classList.add("hidden");
        feedbackElement.classList.add("hidden");

        const currentQuestion = quizData[topic][currentQuestionIndex];

        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        progressBar.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;

        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option) => {
            const optionElement = document.createElement('button');
            optionElement.className = "block w-full text-left border rounded-lg px-4 py-2 hover:bg-gray-200 transition";
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionElement, option));
            optionsContainer.appendChild(optionElement);
        });
    }

    function selectOption(optionElement, answer) {
        if (answered) return;
        document.querySelectorAll('.options button').forEach(opt => opt.classList.remove('bg-blue-500', 'text-white'));
        optionElement.classList.add('bg-blue-500', 'text-white');
        selectedAnswer = answer;
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }

    function checkAnswer() {
        if (!selectedAnswer || answered) return;
        answered = true;

        const currentQuestion = quizData[topic][currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        document.querySelectorAll('.options button').forEach(option => {
            if (option.textContent === currentQuestion.correctAnswer) {
                option.classList.add('bg-green-500', 'text-white');
            } else if (option.textContent === selectedAnswer && !isCorrect) {
                option.classList.add('bg-red-500', 'text-white');
            }
        });

        feedbackElement.textContent = isCorrect ? `Correct!` : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`;
        feedbackElement.classList.remove("hidden");
        if (isCorrect) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }

        submitBtn.classList.add("hidden");
        nextBtn.classList.remove("hidden");
    }

    submitBtn.addEventListener('click', checkAnswer);
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });
});
