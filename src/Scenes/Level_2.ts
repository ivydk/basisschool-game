import Game from "../Game.js";
import Score from "../Score.js";
import CoinPoints from "../CoinPoints.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Level_3 from "./Level_3.js";
import Scene from "./Scene.js";

export default class Level_2 extends Level {
    public static readonly SCORE_NEEDED = Level.SCORE_TO_LEVEL_UP_ARRAY[2];

    public constructor(game: Game, score: Score, coins: CoinPoints, lives: number, character: HTMLImageElement) {
        super(game, score, coins, lives, character);
        this.currentLevel = 2;

        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED;

        this.maxBullets = 200;
        this.character = character;

        Game.changeBackgroundImg('background_4.jpeg');
    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }

        if (this.score.getScore() >= this.pointsToLevelUp) {
            // Proceed to the next screen
            return new Level_3(this.game, this.score, this.coinPoints, this.lives + 1, this.character);
        }

        return null;
    }
}
