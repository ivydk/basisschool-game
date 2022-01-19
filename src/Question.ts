export default class Question {
    private question: string;

    private correctAnswer: string;

    private answerArray: string[];

    /**
     *
     * @param question the question
     * @param correctAnswer the right answer
     * @param answer2 an incorrect answer
     * @param answer3 another incorrect answer
     */
    public constructor(question: string, correctAnswer: string, answer2: string, answer3: string) {
        this.question = question;

        this.correctAnswer = correctAnswer;

        this.answerArray = [correctAnswer, answer2, answer3];

        this.answerArray = this.shuffleQuestion(this.answerArray);
        // console.log(this.answerArray);
    }

    private shuffleQuestion(arr: string[]) {
        return arr.reduce(
            (newArr, _, i) => {
                var rand = i + (Math.floor(Math.random() * (newArr.length - i)));
                [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]]
                return newArr
            }, [...arr]
        )
    }

    public getQuestion = (): string => this.question;

    public getRightAnswer = (): string => this.correctAnswer;

    public getAnswer = (index: number): string => this.answerArray[index];

    public getAnswerArray = (): string[] => this.answerArray;
}