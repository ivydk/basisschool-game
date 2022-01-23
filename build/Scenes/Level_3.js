import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_4 from "./Level_4.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
export default class Level_3 extends Level {
    static SCORE_NEEDED = Level.SCORE_TO_LEVEL_UP_ARRAY[3];
    constructor(game, score, coins, lives, character) {
        super(game, score, coins, lives, character);
        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED + Level_3.SCORE_NEEDED;
        this.maxBullets = 450;
        this.character = character;
        this.currentLevel = 3;
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }
        if (this.score.getScore() >= 300) {
            return new Level_4(this.game, this.score, this.coinPoints, this.lives + 1, this.character);
        }
        return null;
    }
}
//# sourceMappingURL=Level_3.js.map