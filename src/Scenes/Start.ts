import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Level from "./Level-1.js";
import Scene from "./Scene.js";

export default class Start extends Scene {
    private isFinished: boolean;

    private keyListener: KeyListener;

    public constructor(game: Game) {
        super(game);
        console.log('start');

        this.keyListener = new KeyListener();
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
            return new Level(this.game);
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas(`Virus vechter`, this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "green", "center");
        this.writeTextToCanvas('Druk op Enter om te beginnen', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "black", "center");
    }

}