// Chose const/let declarations for a more blocked scope, const will initialize during declaration, let will be initialized later
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// Game questions
// Creating an array of questions, where answer is set to the choice number as dictated in the game html
let questions = [
    {
     question: 'What is Javascript?',
     choice1:'A scripting language that enables you to create dynamically updating content, control multimedia, animate images, and more.',
     choice2:'The native language of the island of Java.',
     choice3:'The first words I speak every morning.',
     choice4:'IDK',
     answer: 1,
    },
    {
        question: 'What is an array?',
        choice1:'Sun light shinning through the window.',
        choice2:'Arrays are basically single objects that CANNOT contain multiple values stored in a list.',
        choice3:'The first words I speak every morning.',
        choice4:'Arrays are generally described as "list-like objects"',
        answer: 4,
       },
       {
        question: 'How do you call an external Javascript file named, "script.js"?',
        choice1:'<script src="index.html"></script>',
        choice2:'<script src="script.js"></script>',
        choice3:'<script src="styles.css"></script>',
        choice4:'<myscript src="script.js"></myscript>',
        answer: 2,
       },
       {
        question: 'What is a variable?',
        choice1:'Variables are both the values themselves and they are containers for values.',
        choice2:'You can think of them being like little cardboard boxes that you can store things in.',
        choice3:'A variable is NOT a container for a value.',
        choice4:'The amount of sleep I get.',
        answer: 2,
       },
       {
        question: 'What is an object',
        choice1:'It is the same thing as a function.',
        choice2:'It is the same thing as a method.',
        choice3:'An object is a collection of related data and/or functionality.',
        choice4:'All of the above',
        answer: 3,
       },
]

// Global Key Variables
const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

// Timer - will load on page load (once the start button is clicked on the index page) and start the countdown of the first question
// Global Variable, setting outside timer function to call it in the getNewQuestion function
let sec 
function timer(){
    sec = 10;
    const timer = setInterval(function(){
        sec--;
        document.getElementById('timer-count').innerHTML=''+sec;
        if (sec < 0) {
            // Advances to new question at -1, so zero will populate on screen
            getNewQuestion();
        }
    }, 1000);
}

timer()

// Game
// Initializing let variables
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

// Advancing to new question
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('hw_wk4/end.html')
    }

    questionCounter++
    progressText.innerText = `question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
    // Resetting timer on the advance to new question
    sec = 10;
    document.getElementById('timer-count').innerHTML=''+sec;
}
// Setting listener for each choice
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})
//Adding the score
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
