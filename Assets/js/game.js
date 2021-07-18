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

let questions = [
    {
     question: "What is Javascript?",
     choice1:'A scripting language that enables you to create dynamically updating content, control multimedia, animate images, and more.',
     choice2:'The native language of the island of Java.',
     choice3:'The first words I speak every morning.',
     choice4:'IDK',
     answer: 1,
    },
    {
        question: 'What is an array?',
        choice1:'Sun light shinning through the window.',
        choice2:'Arrays are basically single objects that cannot contain multiple values stored in a list.',
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
        question: "What is Javascript?",
        choice1:'A scripting language that enables you to create dynamically updating content, control multimedia, animate images, and more.',
        choice2:'The native language of the island of Java.',
        choice3:'The first words I speak every morning.',
        choice4:'IDK',
        answer: 1,
       },
       {
        question: "What is an object",
        choice1:'It is the same thing as a function.',
        choice2:'It is the same thing as a method.',
        choice3:'An object is a collection of related data and/or functionality.',
        choice4:'All of the above',
        answer: 3,
       },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
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
}

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

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()