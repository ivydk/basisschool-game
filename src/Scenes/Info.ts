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

    private boy: HTMLImageElement;

    private girl: HTMLImageElement;

    private virusVechterLogo: HTMLImageElement;

    public constructor(game: Game) {
        super(game);
        console.log('start');
        this.score = new Score();
        this.coinPoints = new CoinPoints();
        this.keyListener = new KeyListener();

        // TODO: change the background
        Game.changeBackgroundImg('brickWall.jpg');

        this.boy = Game.loadNewImage('assets/img/player_boy.png');
        this.girl = Game.loadNewImage('assets/img/player_girl.png');
        this.virusVechterLogo = Game.loadNewImage('assets/img/virusVechterLogo.png')

    }

    /**
     * Handles any user input that has happened since the last call
     */
    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_M)) {
            this.character = this.girl;
            this.isFinished = true;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_J)) {
            this.character = this.boy;
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

        // The virus vechter logo
        ctx.drawImage(this.virusVechterLogo, (this.game.canvas.width / 2) - (this.virusVechterLogo.width / 2), 50);

        // Boy image + text
        // this.writeTextToCanvas('Druk op J', (this.game.canvas.width / 4) - (100 / 4), this.game.canvas.height - 220, 30, "black", "center");
        ctx.drawImage(this.boy, (this.game.canvas.width / 2.5) - (100 / 2), this.game.canvas.height - 200, 100, 141.13);

        // Girl image + text
        // this.writeTextToCanvas('Druk op M', this.game.canvas.width - ((this.game.canvas.width / 4) + (88.63 / 4)), this.game.canvas.height - 220, 30, "black", "center");
        ctx.drawImage(this.girl, this.game.canvas.width - (this.game.canvas.width / 2.5) - (88.63 / 2), this.game.canvas.height - 200, 88.63, 141.13);

        // this.writeTextToCanvas(`Virus vechter`, this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "white", "center");
        this.writeTextToCanvas('Jij bent een jongen/meisje en jij moet samen met', this.game.canvas.width / 2, (this.game.canvas.height / 2) - 30, 30, "black", "center");
        this.writeTextToCanvas(' je laptop tegen de computer virussen', this.game.canvas.width / 2, (this.game.canvas.height / 2), 30, "white", "center");
        // TODO: is schieten te boos?
        this.writeTextToCanvas('vechten, schiet op de virussen om ze weg te halen', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 30, "black", "center");
        this.writeTextToCanvas('Druk op J voor een jongen en M voor een meisje', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 80, 30, "black", "center");
    }
}
