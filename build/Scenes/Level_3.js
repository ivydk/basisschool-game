import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_4 from "./Level_4.js";
export default class Level_3 extends Level {
    constructor(game, score, lives) {
        super(game, score, lives);
        this.currentLevel = 3;
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.currentLevel);
        }
        if (this.score.getScore() >= 300) {
            return new Level_4(this.game, this.score, this.lives + 1);
        }
        return null;
    }
}
//# sourceMappingURL=Level_3.js.map