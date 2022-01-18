import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Coins from "../Coins.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import Level_3 from "./Level_3.js";
import Level_4 from "./Level_4.js";
import Scene from "./Scene.js";
import Start from "./Start.js";

export default class QuestionPage extends Scene {
    private answer: boolean;

    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    private coins: Coins;

    private currentLevel: number;

    public constructor(game: Game, score: Score, coins: Coins, currentLevel: number) {
        super(game);
        console.log('Question page');

        this.currentLevel = currentLevel;

        this.score = score;

        this.coins = coins;

        this.keyListener = new KeyListener();
    }

    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            this.isFinished = true;
            this.answer = true;
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_B)) {
            this.isFinished = true;
            this.answer = false;
        } else if (this.keyListener.isKeyDown(KeyListener.KEY_C)) {
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
                // This switch determents what level you should go back to
                // TODO: Add new cases if new levels are added
                switch (this.currentLevel) {
                    case 1: return new Level_1(this.game, this.score, this.coins, 0);
                        break;
                    case 2: return new Level_2(this.game, this.score, this.coins, 0);
                        break;
                    case 3: return new Level_3(this.game, this.score, this.coins, 0);
                        break;
                    case 4: return new Level_4(this.game, this.score, this.coins, 0);
                }
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
        this.writeTextToCanvas('Wat is Malware?', this.game.canvas.width / 2, (this.game.canvas.height / 2) - 45, 30, "white", "center");
        this.writeTextToCanvas('A: Een kwaadaardig programma of code die schadelijk zijn voor computersystemen', this.game.canvas.width / 2, this.game.canvas.height / 2, 20, "white", "center");
        this.writeTextToCanvas('B: Een ander woord voor Firewall', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 25, 20, "white", "center");
        this.writeTextToCanvas('C: Een virusscanner', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 50, 20, "white", "center");
        this.writeTextToCanvas('Druk op A, B of C om het antwoord te geven', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 85, 18, "white", "center");
        // this.writeTextToCanvas(`${String.fromCodePoint(129440, 129440, 129440)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "green", "center");
    }
}
