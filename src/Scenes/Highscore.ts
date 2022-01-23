import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import CoinPoints from "../CoinPoints.js";
import Level from "./Level.js";
import QuestionPage from "./QuestionPage.js";
import Scene from "./Scene.js";
import Start from "./Start.js";

export default class HighScore extends Scene {

    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    private coins: CoinPoints;

    private currentLevel: number;

    public constructor(game: Game, score: Score, coins: CoinPoints, currentLevel: number) {
        super(game);
        console.log('Game Over');

        this.currentLevel = currentLevel;

        this.score = score;
        this.coins = coins;
        this.keyListener = new KeyListener();

        Game.changeBackgroundImg('background_1.jpeg');
    }

    public processInput(): void {
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
            // Proceed to the next screen
            return new Start(this.game);
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas(`Lekker bezig! ${String.fromCodePoint(128521)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) - 60, 30, "white", "center");
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "white", "center");
        this.writeTextToCanvas('Druk op enter om terug te gaan naar het start scherm', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 40, 20, "white", "center");
    }
}