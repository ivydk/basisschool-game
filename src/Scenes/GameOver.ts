import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Level from "./Level.js";
import QuestionPage from "./QuestionPage.js";
import Scene from "./Scene.js";
import CoinPoints from "../CoinPoints.js";
import Start from "./Start.js";

export default class GameOver extends Scene {
    private static NEXT_SCREEN_START = 0;

    private static NEXT_SCREEN_QUESTION = 1;

    private answer: number;

    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    private coins: CoinPoints;

    private character: HTMLImageElement;

    private currentLevel: number;

    public constructor(game: Game, score: Score, coins: CoinPoints, currentLevel: number, character: HTMLImageElement) {
        super(game);
        console.log('Game Over');

        this.currentLevel = currentLevel;

        this.character = character;

        this.score = score;
        this.coins = coins;
        this.keyListener = new KeyListener();

        Game.changeBackgroundImg('background_1.jpeg');

    }

    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
            this.answer = GameOver.NEXT_SCREEN_START;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_V)) {
            this.isFinished = true;
            this.answer = GameOver.NEXT_SCREEN_QUESTION
        }
    }

    /**
     *
     * @returns 'null' if the Scene does not need to proceed to the next one
     */
    public update(elapsed: number): Scene {
        if (this.isFinished) {
            // Proceed to the next screen
            if (this.answer === 0) {
                return new Start(this.game);
            } else if (this.answer === 1) {
                return new QuestionPage(this.game, this.score, this.coins, this.currentLevel, this.character);
            }
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas('Game over', this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "white", "center");
        this.writeTextToCanvas('Druk op enter om terug te gaan naar het start scherm', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "white", "center");
        this.writeTextToCanvas('Druk op V als je een extra leven wilt', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "white", "center");
        // this.writeTextToCanvas(`${String.fromCodePoint(129440, 129440, 129440)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "green", "center");

    }
}