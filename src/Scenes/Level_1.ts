// !!!! DIT IS VOOR LATER, VERANDER IETS IN Level.TS

import Game from "../Game.js";
import Score from "../Score.js";
import Coins from "../Coins.js";
import GameOver from "./GameOver.js";
import Scene from "./Scene.js";
import Level from "./Level.js";
import Level_2 from "./Level_2.js";

export default class Level_1 extends Level {
    public static readonly SCORE_TO_LEVEL_UP = 50

    public constructor(game: Game, score: Score, coins: Coins, lives: number) {
        super(game, score, coins, lives)
        this.score = score;
        this.coins = coins;
        this.currentLevel = 1;

        this.maxBullets = 75;

        // changes the background
        Game.changeBackgroundImg('background_3.jpeg');


    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coins, this.currentLevel);
        }

        if (this.score.getScore() >= Level_1.SCORE_TO_LEVEL_UP) {
            // Proceed to the next screen
            // TODO: fix the lives
            return new Level_2(this.game, this.score, this.coins, this.lives + 1);
        }
        return null;
    }
}
