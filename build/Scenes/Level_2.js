import GameOver from "./GameOver.js";
import Level from "./Level.js";
export default class Level_2 extends Level {
    constructor(game, score, lives) {
        super(game, score, lives);
        this.currentLevel = 2;
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score);
        }
        return null;
    }
}
//# sourceMappingURL=Level_2.js.map