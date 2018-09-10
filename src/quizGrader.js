const util = require('./util')

function grade(quiz, usersAnswers) {
    // quiz is in the format:
    // {
    //   "questions": [
    //     {
    //       "word": "Kierstyn",
    //       "answers": [
    //         "Eopch - def2",
    //         "Kierstyn - def3",
    //         "Essence - def1",
    //         "Buttonhole - def3"
    //       ]
    //     },
    //   ],
    //   "answerKey": [
    //     {
    //       "word": "Kierstyn",
    //       "correctChoiceIndex": 1
    //     },
    //   ]
    // }
    //
    // usersAnswers are an object where the keys are the question words and the 
    // values are the selected answer

    let correctAnswerCount = 0

    let correctAnswersByWord = util.arrayToObject(quiz.answerKey, "word")
    let questionsByWord = util.arrayToObject(quiz.questions, "word")

    for(let word in usersAnswers) {
        let correctAnswerIndex = correctAnswersByWord[word].correctChoiceIndex
        let usersChoices = questionsByWord[word].answers
        let correctAnswer = usersChoices[correctAnswerIndex]

        let usersAnswer = usersAnswers[word]
        let userGotQuestionCorrect = usersAnswer === correctAnswer

        if (userGotQuestionCorrect) correctAnswerCount++
    }

    let possiblePoints = quiz.questions.length
    
    return {
        score: `${correctAnswerCount}/${possiblePoints}`,
        percentage: Math.floor(correctAnswerCount / possiblePoints * 100),
        get letterGrade() { return assignLetterGrade(this.percentage) },
        get comment() { return `You got ${this.score} questions correct, ${this.percentage}% ${this.letterGrade}` }
    }
}



 function assignLetterGrade(percentage) {
    // Letter	Grade	Grade Points
    // A	(100 - 93)	4.00
    // AB	(92 - 89)	3.50
    // B	(88 - 85)	3.00
    // BC	(84 - 81)	2.50
    // C	(80 - 77)	2.00
    // CD	(76 - 74)	1.50
    // D	(73 - 70)

    if (percentage >= 93) return 'A'
    if (percentage >= 89) return 'AB'
    if (percentage >= 85) return 'B'
    if (percentage >= 81) return 'BC'
    if (percentage >= 77) return 'C'
    if (percentage >= 74) return 'CD'
    if (percentage >= 70) return 'D'
    return 'F'
    
 }


module.exports = {grade}