import GameOver from "./GameOver.js";
import HighScore from "./Highscore.js";
import Level from "./Level.js";
export default class Level_4 extends Level {
    constructor(game, score, coins, lives) {
        super(game, score, coins, lives);
        this.currentLevel = 4;
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coins, this.currentLevel);
        }
        if (this.score.getScore() >= 1000) {
            return new HighScore(this.game, this.score, this.coins, this.currentLevel);
        }
        return null;
    }
}
//# sourceMappingURL=Level_4.js.map