const program = require('commander')
const {prompt} = require('inquirer')
const quizGenerator = require('./quizGenerator')
const quizToPrompQuestions = require('./quizToPrompQuestions')

program
    .version('1.0.0')
    .description('Word of the day quiz!')

program
    .command('generateQuiz')
    .alias('gen')
    .description('Generate a new quiz')
    .action(() => {
        let quiz = quizGenerator.generate(3)
        let prompts = quizToPrompQuestions(quiz.questions)
        prompt(prompts).then(answers => console.log(answers))
    })

program.parse(process.argv)