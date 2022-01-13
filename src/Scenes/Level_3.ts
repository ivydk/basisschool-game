// !!!! DIT IS VOOR LATER, VERANDER IETS IN Level.TS

import Game from "../Game.js";
import Score from "../Score.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_4 from "./Level_4.js";
import Scene from "./Scene.js";

export default class Level_3 extends Level {
    public constructor(game: Game, score: Score, lives: number) {
        super(game, score, lives)

        this.currentLevel = 3;
    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.currentLevel);
        }

        if (this.score.getScore() >= 300) {
            // Proceed to the next screen
            return new Level_4(this.game, this.score, this.lives + 1);
        }

        return null;
    }
}
