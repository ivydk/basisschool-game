import Game from "../Game.js";
import Score from "../Score.js";
import Coins from "../Coins.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Level_3 from "./Level_3.js";
import Scene from "./Scene.js";

export default class Level_2 extends Level {
    // TODO: make a SCORE_NEEDED at every level
    public static readonly SCORE_NEEDED = 100

    public constructor(game: Game, score: Score, coins: Coins, lives: number) {
        super(game, score, coins, lives);
        this.currentLevel = 2;

        // TODO: use this sum at every level, previous total + points needed in current level
        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED;

        // TODO: how many bullets do you get every level
        this.maxBullets = Level_2.SCORE_NEEDED * 2;

        Game.changeBackgroundImg('background_4.jpeg');
    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coins, this.currentLevel);
        }

        if (this.score.getScore() >= this.pointsToLevelUp) {
            // Proceed to the next screen
            return new Level_3(this.game, this.score, this.coins, this.lives + 1);
        }

        return null;
    }
}
