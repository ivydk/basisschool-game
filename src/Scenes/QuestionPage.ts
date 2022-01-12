import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Scene from "./Scene.js";
import Start from "./Start.js";

export default class QuestionPage extends Scene {
    private answer: boolean;

    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    public constructor(game: Game, score: Score) {
        super(game);
        console.log('Question page');

        this.score = score;

        this.keyListener = new KeyListener();
    }

    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            this.isFinished = true;
            this.answer = true;
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_B)) {
            this.isFinished = true;
            this.answer = false;
        }
    }

    /**
     *
     * @returns 'null' if the Scene does not need to proceed to the next one
     */
    public update(elapsed: number): Scene {
        if (this.isFinished) {
            // Proceed to the next screen
            if (this.answer === true) {
                // TODO: go back to the current level you were on
                return new Level_1(this.game, this.score, 0);
            } else if (this.answer === false) {
                return new Start(this.game);
            }
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        // TODO: make a random question about the virus
        this.writeTextToCanvas('Lorem ipsum dolor sit amet, consectetur adipiscing elit vivamus congue?', this.game.canvas.width / 2, (this.game.canvas.height / 2) - 45, 25, "green", "center");
        this.writeTextToCanvas('A: Lorem ipsum dolor sit', this.game.canvas.width / 2, this.game.canvas.height / 2, 20, "black", "center");
        this.writeTextToCanvas('B: Lorem ipsum dolor sit amet.', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 25, 20, "black", "center");
        this.writeTextToCanvas('Druk op A of B om het antwoord te geven', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 50, 15, "black", "center");
        // this.writeTextToCanvas(`${String.fromCodePoint(129440, 129440, 129440)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "green", "center");
    }
}