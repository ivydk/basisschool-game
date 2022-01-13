// !!!! DIT IS VOOR LATER, VERANDER IETS IN Level.TS

import Game from "../Game.js";
import Score from "../Score.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Scene from "./Scene.js";

export default class Level_2 extends Level {
    public constructor(game: Game, score: Score, lives: number) {
        super(game, score, lives)

        this.currentLevel = 2;
    }


    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score);
        }
        return null;
    }
}
