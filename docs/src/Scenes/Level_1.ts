// !!!! DIT IS VOOR LATER, VERANDER IETS IN Level.TS

import Game from "../Game.js";
import Score from "../Score.js";
import GameOver from "./GameOver.js";
import Scene from "./Scene.js";
import Level from "./Level.js";
import Level_2 from "./Level_2.js";

export default class Level_1 extends Level {

    public constructor(game: Game, score: Score, lives: number) {
        super(game, score, lives)
        this.score = score;
        this.currentLevel = 1;
    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score);
        }

        if (this.score.getScore() >= 20) {
            // Proceed to the next screen
            // TODO: fix the lives
            return new Level_2(this.game, this.score, this.lives + 1);
        }
        return null;
    }
}
