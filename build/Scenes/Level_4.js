import GameOver from "./GameOver.js";
import HighScore from "./Highscore.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import Level_3 from "./Level_3.js";
export default class Level_4 extends Level {
    static SCORE_NEEDED = 500;
    constructor(game, score, coins, lives, character) {
        super(game, score, coins, lives, character);
        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED + Level_3.SCORE_NEEDED + Level_4.SCORE_NEEDED;
        this.maxBullets = 750;
        this.character = character;
        this.currentLevel = 4;
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }
        if (this.score.getScore() >= 1000) {
            return new HighScore(this.game, this.score, this.coinPoints, this.currentLevel);
        }
        return null;
    }
}
//# sourceMappingURL=Level_4.js.map