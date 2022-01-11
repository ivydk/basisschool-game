import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Level from "./Level-1.js";
import QuestionPage from "./QuestionPage.js";
import Scene from "./Scene.js";
import Start from "./Start.js";

export default class GameOver extends Scene {
    private static NEXT_SCREEN_START = 0;

    private static NEXT_SCREEN_QUESTION = 1;

    private answer: number;

    private isFinished: boolean;

    private keyListener: KeyListener;

    public constructor(game: Game) {
        super(game);
        console.log('Game Over');

        this.keyListener = new KeyListener();
    }

    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
            this.answer = GameOver.NEXT_SCREEN_START;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_Q)) {
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
                return new QuestionPage(this.game);
            }
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas('Game over', this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "green", "center");
        this.writeTextToCanvas('Druk op enter om terug te gaan naar het start scherm', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "black", "center");
        this.writeTextToCanvas('Druk op Q als je een exta leven wilt', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "black", "center");
        // this.writeTextToCanvas(`${String.fromCodePoint(129440, 129440, 129440)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "green", "center");

        // TODO: random question about viruses, if the answer is correct you will get a extra live
    }
}