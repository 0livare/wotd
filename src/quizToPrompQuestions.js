module.exports = function(quizQuestions) {
    return quizQuestions.map(quizQuestionToPromptQuestion)
}

function quizQuestionToPromptQuestion(quizQuestion) {
    // A quiz question is in the format: {"word":"Buttonhole","answers":["Eopch - def2","Kierstyn - def1","Zach - def2","Buttonhole - def1"]}
    // Checkbox prompt needs: type, name, message, choices[, filter, validate, default] 
    return {
        type: 'list',
        name: quizQuestion.word,
        message: 'What does ' + quizQuestion.word + ' mean?',
        choices: quizQuestion.answers,
    }
}