import Game from "../Game.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Level_3 from "./Level_3.js";
export default class Level_2 extends Level {
    static SCORE_NEEDED = 100;
    constructor(game, score, coins, lives) {
        super(game, score, coins, lives);
        this.currentLevel = 2;
        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED;
        this.maxBullets = Level_2.SCORE_NEEDED * 2;
        Game.changeBackgroundImg('background_4.jpeg');
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coins, this.currentLevel);
        }
        if (this.score.getScore() >= this.pointsToLevelUp) {
            return new Level_3(this.game, this.score, this.coins, this.lives + 1);
        }
        return null;
    }
}
//# sourceMappingURL=Level_2.js.map