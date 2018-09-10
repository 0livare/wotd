const program = require('commander')
const {prompt} = require('inquirer')
const quizGenerator = require('./quizGenerator')
const quizToPrompQuestions = require('./quizToPrompQuestions')
const quizGrader = require('./quizGrader')
const quizEncoder = require('./quizEncoder')

program
    .version('1.0.0')
    .description('Word of the day quiz!')

program
    .command('generateQuiz')
    .alias('gen')
    .description('Generate a new quiz')
    .action(() => {
        let quiz = quizGenerator.generate(3)
        console.info('Quiz code: ' + quiz.code)
        displayQuiz(quiz)
    })

program
    .command('decodeQuiz <code>')
    .alias('code')
    .description('Recreate a previous quiz from a code')
    .action(code => {
        let quiz = quizEncoder.decode(code)
        displayQuiz(quiz)
    })


program.parse(process.argv)


function displayQuiz(quiz) {
    let prompts = quizToPrompQuestions(quiz.questions)
    prompt(prompts).then(usersAnswers => {
        let quizGrade = quizGrader.grade(quiz, usersAnswers)
        console.log(`\n\n ${quizGrade.comment}`)
    })
}