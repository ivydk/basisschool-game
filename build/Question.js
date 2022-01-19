export default class Question {
    question;
    correctAnswer;
    answerArray;
    constructor(question, correctAnswer, answer2, answer3) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answerArray = [correctAnswer, answer2, answer3];
        this.answerArray = this.shuffleQuestion(this.answerArray);
    }
    shuffleQuestion(arr) {
        return arr.reduce((newArr, _, i) => {
            var rand = i + (Math.floor(Math.random() * (newArr.length - i)));
            [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
            return newArr;
        }, [...arr]);
    }
    getQuestion = () => this.question;
    getRightAnswer = () => this.correctAnswer;
    getAnswer = (index) => this.answerArray[index];
    getAnswerArray = () => this.answerArray;
}
//# sourceMappingURL=Question.js.map