// !!!! DIT IS VOOR LATER, VERANDER IETS IN Level.TS

import Game from "../Game.js";
import Score from "../Score.js";
import CoinPoints from "../CoinPoints.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_4 from "./Level_4.js";
import Scene from "./Scene.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";

export default class Level_3 extends Level {
    public static readonly SCORE_NEEDED = 150;

    public constructor(game: Game, score: Score, coins: CoinPoints, lives: number, character: HTMLImageElement) {
        super(game, score, coins, lives, character)

        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED + Level_3.SCORE_NEEDED;
        this.maxBullets = Level_3.SCORE_NEEDED * 1.8;

        this.character = character;

        this.currentLevel = 3;
    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }

        if (this.score.getScore() >= 300) {
            // Proceed to the next screen
            return new Level_4(this.game, this.score, this.coinPoints, this.lives + 1, this.character);
        }

        return null;
    }
}
