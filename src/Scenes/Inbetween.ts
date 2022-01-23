import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import CoinPoints from "../CoinPoints.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import Level_3 from "./Level_3.js";
import Level_4 from "./Level_4.js";
import Scene from "./Scene.js";
import Start from "./Start.js";
import Question from "../Question.js";
import HighScore from "./HighScore.js";
import Line from "../Line.js";

export default class InBetween extends Scene {
    private answer: boolean;

    private isFinished: boolean;

    private keyListener: KeyListener;

    private score: Score;

    private line: Line;

    private coins: CoinPoints;

    private currentLevel: number;

    private character: HTMLImageElement;

    private lives: number;

    private screens: number;

    private extraBullets: number;

    private levelUpImage: HTMLImageElement;

    public constructor(game: Game, score: Score, coins: CoinPoints, currentLevel: number, character: HTMLImageElement, lives: number) {
        super(game);
        console.log('Question page');
        Game.changeBackgroundImg('brickWall.jpg');

        this.character = character;

        this.currentLevel = currentLevel;

        this.score = score;

        this.coins = coins;

        this.lives = lives;

        this.screens = 0;

        this.keyListener = new KeyListener();

        this.extraBullets = 0;

        this.levelUpImage = Game.loadNewImage('assets/img/levelUp2.png');
    }

    // TODO: how many coins will it cost
    public processInput(): void {
        this.screens += 1;

        // Each 60 frames it checks wether the key is down
        if (this.screens % 60 === 0) {
            // When you press 1, you can buy a life for 3 coins
            if ((this.keyListener.isKeyDown(KeyListener.KEY_1) || this.keyListener.isKeyDown(97)) && this.coins.getCoins() >= 3) {
                console.log('1');
                this.lives += 1;
                this.coins.setCoins(-3);
            }
            // When you press 2, you can buy 10 bullets for 1 coins
            if ((this.keyListener.isKeyDown(KeyListener.KEY_2) || this.keyListener.isKeyDown(98)) && this.coins.getCoins() >= 1) {
                console.log('2');
                this.extraBullets += 10
                this.coins.setCoins(-1);
            }
        }
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
            // This switch determents what level you should go back to
            // TODO: Add new cases if new levels are added
            switch (this.currentLevel + 1) {
                case 1: return new Level_1(this.game, this.score, this.coins, this.lives, this.character, this.extraBullets);
                    break;
                case 2: return new Level_2(this.game, this.score, this.coins, this.lives, this.character, this.extraBullets);
                    break;
                case 3: return new Level_3(this.game, this.score, this.coins, this.lives, this.character, this.extraBullets);
                    break;
                case 4: return new Level_4(this.game, this.score, this.coins, this.lives, this.character, this.extraBullets);
                    break;
                case 5: return new HighScore(this.game, this.score, this.coins, this.currentLevel);
                    break;
            }
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.drawImage(this.levelUpImage, (this.game.canvas.width / 2) - (this.levelUpImage.width / 2), 50);

        this.writeTextToCanvas(`Munten: ${this.coins.getCoins()}${String.fromCodePoint(129689)}`, this.game.canvas.width / 2, 150 + this.levelUpImage.height, 30, "black", "center");

        this.writeTextToCanvas(`-3${String.fromCodePoint(129689)}: druk 1 voor 1 extra leven`, this.game.canvas.width / 2, 225 + this.levelUpImage.height, 30, "black", "center");

        this.writeTextToCanvas(`-1${String.fromCodePoint(129689)}: druk 2 voor 10 extra kogels`, this.game.canvas.width / 2, 275 + this.levelUpImage.height, 30, "black", "center");

        this.writeTextToCanvas(`Druk om enter om door te gaan naar level ${this.currentLevel + 1}`, this.game.canvas.width / 2, 350 + this.levelUpImage.height, 30, "black", "center");
    }
}
