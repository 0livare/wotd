const util = require('./util')
const definitions = require('./definitions')

function encode(quiz) {
    // Start by creating a flat list of all words and all definitions, their
    // indicies in this flat list will be used in the code
    //
    // The format will be:
    //   Each question separated by a dash
    //   Each part of each question separated by a dot
    //     - The index of the word this question is based on from the flat list of q's
    //     - The relative index of the correct answer for this q.  0 to n-1 where n is 
    //       the number of choices for this question.
    //     - params: The rest of the dot separated values are the definitions that make
    //       up the possible choices for this question.  There are n of them.
    // <word-idx>.<correct-ans-idx>.

    let allWords = Object.keys(definitions)
    let allDefinitions = Object.values(definitions).reduce((arr, defs) => arr.concat(defs), [])
    let wordToAnswers = util.arrayToObject(quiz.answerKey, "word")
    let encoding = ''

    for(let i=0; i<quiz.questions.length; ++i) {
        if (i != 0) encoding += '-'

        let q = quiz.questions[i]
        let wordIndex = allWords.indexOf(q.word)
        let correctChoiceIndex = wordToAnswers[q.word].correctChoiceIndex

        let qCode = `${wordIndex}.${correctChoiceIndex}`

        for(let choice of q.choices) {
            qCode += '.' + allDefinitions.indexOf(choice)
        }

        encoding += qCode
    }

    return encoding
}

function decode(encodedQuiz) {
    let allWords = Object.keys(definitions)
    let allDefinitions = Object.values(definitions).reduce((arr, defs) => arr.concat(defs), [])

    let qCodes = encodedQuiz.split('-')

    let quiz = {
        questions: [],
        answerKey: [],
        get code() { return encode(this) }
    }

    for(let qCode of qCodes) {
        let parts = qCode.split('.')
        let wordIndex = Number(parts[0])
        let word = allWords[wordIndex]
        let correctChoiceIndex = Number(parts[1])

        let choices = []
        for(let i=2; i<parts.length; ++i) {
            let definitionIndex = parts[i]
            let definition = allDefinitions[definitionIndex]
            choices.push(definition)
        }

        quiz.questions.push({word, choices })
        quiz.answerKey.push({word, correctChoiceIndex })
    }

    return quiz
}

module.exports = {encode, decode}