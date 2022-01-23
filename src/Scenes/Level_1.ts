// !!!! DIT IS VOOR LATER, VERANDER IETS IN Level.TS

import Game from "../Game.js";
import Score from "../Score.js";
import CoinPoints from "../CoinPoints.js";
import GameOver from "./GameOver.js";
import Scene from "./Scene.js";
import Level from "./Level.js";
import Level_2 from "./Level_2.js";
import Question from "../Question.js";
import InBetween from "./InBetween.js";

export default class Level_1 extends Level {
    public static readonly SCORE_TO_LEVEL_UP = Level.SCORE_TO_LEVEL_UP_ARRAY[1];

    public constructor(game: Game, score: Score, coins: CoinPoints, lives: number, character: HTMLImageElement, extraBullets: number) {
        super(game, score, coins, lives, character)
        this.score = score;
        this.coinPoints = coins;
        this.currentLevel = 1;

        this.character = character;

        this.maxBullets = 300 + extraBullets; // TODO: verander bullet max

        // changes the background
        Game.changeBackgroundImg('background_3.jpeg');

    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }

        if (this.score.getScore() >= Level_1.SCORE_TO_LEVEL_UP) {
            // Proceed to the next screen
            // TODO: fix the lives
            // return new Level_2(this.game, this.score, this.coinPoints, this.lives + 1, this.character);
            return new InBetween(this.game, this.score, this.coinPoints, this.currentLevel, this.character, this.lives);
        }
        return null;
    }
}
