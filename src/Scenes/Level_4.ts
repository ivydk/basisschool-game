import Game from "../Game.js";
import Score from "../Score.js";
import GameOver from "./GameOver.js";
import HighScore from "./Highscore.js";
import Level from "./Level.js";
import Scene from "./Scene.js";

export default class Level_4 extends Level {
    public constructor(game: Game, score: Score, lives: number) {
        super(game, score, lives)

        this.currentLevel = 4;
    }

    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.currentLevel);
        }

        if (this.score.getScore() >= 1000) {
            return new HighScore(this.game, this.score, this.currentLevel);

        }

        return null;
    }
}
