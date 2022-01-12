import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_2 from "./Level_2.js";
export default class Level_1 extends Level {
    constructor(game, score, lives) {
        super(game, score, lives);
        this.score = score;
        this.currentLevel = 1;
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score);
        }
        if (this.score.getScore() >= 20) {
            return new Level_2(this.game, this.score, this.lives + 1);
        }
        return null;
    }
}
//# sourceMappingURL=Level_1.js.map