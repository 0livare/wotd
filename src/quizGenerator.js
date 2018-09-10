const definitions = require('./definitions')
const quizEncoder = require('./quizEncoder')

const answersPerQuestion = 4
const wrongAnswersPerQuestion = answersPerQuestion - 1

function generate(questionCount) {
    if (!questionCount) questionCount = definitions.length

    let remainingWords = Object.keys(definitions)

    let quiz = {
        questions: [],
        answerKey: [],
        get code() { return quizEncoder.encode(this) }
    }

    for(let i=0; i<questionCount; ++i) {
        let wordIndex = randIndex(remainingWords.length)
        let word = remainingWords[wordIndex]
        remainingWords.splice(wordIndex, 1) // Remove used word


        let correctDefs = definitions[word]
        let chosenCorrectDef = correctDefs[randIndex(correctDefs.length)]
        let answers = [chosenCorrectDef, ...getWrongDefsForWord(word)]
        let scranbledAnswers = shuffle(answers)
        let correctAnswerIndex = scranbledAnswers.indexOf(chosenCorrectDef)

        quiz.questions.push({
            word,
            answers: scranbledAnswers,
        })

        quiz.answerKey.push({
            word,
            correctChoiceIndex: correctAnswerIndex,
        })
    }

    return quiz
}

function getWrongDefsForWord(word) {
    let wrongDefs = []
    let usedWords = []

    for(let i=0; i<wrongAnswersPerQuestion; ++i) {
        let randWord
        while(!randWord || randWord === word || usedWords.includes(randWord)) {
            randWord = pickRandomProperty(definitions)
        }

        let wordDefs = definitions[randWord]
        let wrongDef = wordDefs[randIndex(wordDefs.length)]

        wrongDefs.push(wrongDef)
        usedWords.push(randWord)
    }

    return wrongDefs
}

// Copied from https://stackoverflow.com/a/2532251/2517147
function pickRandomProperty(obj) {
    let result;
    let count = 0;
    for (let prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

// Copied from https://stackoverflow.com/a/2450976/2517147
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = randIndex(currentIndex)
      currentIndex -= 1
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  
    return array
}

// Copied from https://stackoverflow.com/a/22624453/2517147
function randIndex(length) {
    return Math.floor(Math.random() * length)
}


module.exports = {generate}