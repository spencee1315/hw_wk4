const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

// use local storage to save, highScores, get mostRecentScore
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// stores 5 heighest scores
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore
// Once something is keyed into the username field the save button will work
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})
// save highscore and name, push out lower score if 5 scores are already listed
saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('highscores.html')
}
