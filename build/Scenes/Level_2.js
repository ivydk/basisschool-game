import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_3 from "./Level_3.js";
export default class Level_2 extends Level {
    constructor(game, score, lives) {
        super(game, score, lives);
        this.currentLevel = 2;
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.currentLevel);
        }
        if (this.score.getScore() >= 150) {
            return new Level_3(this.game, this.score, this.lives + 1);
        }
        return null;
    }
}
//# sourceMappingURL=Level_2.js.map