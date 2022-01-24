import Game from "../Game.js";
import Score from "../Score.js";
import CoinPoints from "../CoinPoints.js";
import GameOver from "./GameOver.js";
import HighScore from "./Highscore.js";
import Level from "./Level.js";
import Scene from "./Scene.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import Level_3 from "./Level_3.js";

export default class Level_4 extends Level {
    public static readonly SCORE_NEEDED = Level.SCORE_TO_LEVEL_UP_ARRAY[4];

    public constructor(game: Game, score: Score, coins: CoinPoints, lives: number, character: HTMLImageElement, extraBullets: number) {
        super(game, score, coins, lives, character)

        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED + Level_3.SCORE_NEEDED + Level_4.SCORE_NEEDED;
        this.maxBullets = 750 + extraBullets;

        this.character = character;

        this.currentLevel = 4;

        Game.changeBackgroundImg('background_5.jpeg');

    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }

        if (this.score.getScore() >= this.pointsToLevelUp) {
            return new HighScore(this.game, this.score, this.coinPoints, this.currentLevel);
        }

        return null;
    }
}
