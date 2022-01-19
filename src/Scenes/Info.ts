import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Scene from "./Scene.js";
import CoinPoints from "../CoinPoints.js";

export default class Info extends Scene {
    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    private coinPoints: CoinPoints;

    private character: HTMLImageElement;

    public constructor(game: Game) {
        super(game);
        console.log('start');
        this.score = new Score();
        this.coinPoints = new CoinPoints();
        this.keyListener = new KeyListener();

        // change the background
        Game.changeBackgroundImg('background_4.jpeg');

    }

    /**
     * Handles any user input that has happened since the last call
     */
    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_M)) {
            this.character = Game.loadNewImage('assets/img/player_girl.png');
            this.isFinished = true;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_J)) {
            this.character = Game.loadNewImage('assets/img/player_boy.png')
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
            return new Level_1(this.game, this.score, this.coinPoints, 3, this.character);
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
        this.writeTextToCanvas('Jij bent een jongen/meisje en jij moet samen met', this.game.canvas.width / 2, (this.game.canvas.height / 2) - 30, 30, "white", "center");
        this.writeTextToCanvas(' je laptop tegen de computer virussen', this.game.canvas.width / 2, (this.game.canvas.height / 2), 30, "white", "center");
        this.writeTextToCanvas('vechten, klik op de virussen om ze weg te halen', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 30, "white", "center");
        this.writeTextToCanvas('Druk op J voor een jongen en M voor een meisje', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 80, 30, "white", "center");
    }
}
