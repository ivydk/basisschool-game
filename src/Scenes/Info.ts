import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Scene from "./Scene.js";
import Coins from "../Coins.js";

export default class Info extends Scene {
    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    private coins: Coins;

    public constructor(game: Game) {
        super(game);
        console.log('start');
        this.score = new Score();
        this.coins = new Coins();
        this.keyListener = new KeyListener();

        // change the background
        Game.changeBackgroundImg('background.jpeg');

    }

    /**
     * Handles any user input that has happened since the last call
     */
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
            return new Level_1(this.game, this.score, this.coins, 3);
        }
        return null;
    }

    /**
     * renders everything you need in your scene
     */
    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        // this.writeTextToCanvas(`Virus vechter`, this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "white", "center");
        this.writeTextToCanvas('Druk op Enter om te beginnen', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "black", "center");
    }
}
