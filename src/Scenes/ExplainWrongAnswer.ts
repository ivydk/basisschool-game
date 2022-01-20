import CoinPoints from "../CoinPoints";
import Game from "../Game";
import KeyListener from "../KeyListener";
import Score from "../Score";
import Scene from "./Scene";
import Start from "./Start";

export default class ExplainWrongAnswer extends Scene {
    private answer: boolean;

    private isFinished: boolean;

    private keyListener: KeyListener;

    private explanation: string;

    private question: string;

    private rightAnswer: string;

    public constructor(
        game: Game,
        score: Score,
        coins: CoinPoints,
        currentLevel: number,
        character: HTMLImageElement,
        explanation: string,
        question: string,
        rightAnswer: string) {
        super(game);
        console.log('Explain wrong answer page');

        this.explanation = explanation;
        this.question = question;
        this.rightAnswer = rightAnswer;
    }

    public processInput(): void {
        // If you press `enter` the isFinished will be true
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }

    /**
     *
     * @returns 'null' if the Scene does not need to proceed to the next one
     */
    public update(elapsed: number): Scene {
        if (this.isFinished) {
            // Proceed to the next screen, Start
            if (this.answer === true) {
                return new Start(this.game);
            }
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        // this.writeTextToCanvas(`${this.currentQuestion.getQuestion()}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) - 45, 30, "white", "center");
        // this.writeTextToCanvas(`A: ${this.currentQuestion.getAnswer(0)}`, this.game.canvas.width / 2, this.game.canvas.height / 2, 20, "white", "center");
        // this.writeTextToCanvas(`B: ${this.currentQuestion.getAnswer(1)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 25, 20, "white", "center");
        // this.writeTextToCanvas(`C: ${this.currentQuestion.getAnswer(2)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 50, 20, "white", "center");
        // this.writeTextToCanvas('Druk op A, B of C om het antwoord te geven', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 85, 18, "white", "center");
        // this.writeTextToCanvas(`${String.fromCodePoint(129440, 129440, 129440)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "green", "center");
    }
}
