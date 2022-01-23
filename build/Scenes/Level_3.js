import Game from "../Game.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import InBetween from "./InBetween.js";
export default class Level_3 extends Level {
    static SCORE_NEEDED = Level.SCORE_TO_LEVEL_UP_ARRAY[3];
    constructor(game, score, coins, lives, character, extraBullets) {
        super(game, score, coins, lives, character);
        this.pointsToLevelUp = Level_1.SCORE_TO_LEVEL_UP + Level_2.SCORE_NEEDED + Level_3.SCORE_NEEDED;
        this.maxBullets = 450 + extraBullets;
        this.character = character;
        this.currentLevel = 3;
        Game.changeBackgroundImg('background_2.jpeg');
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }
        if (this.score.getScore() >= this.pointsToLevelUp) {
            return new InBetween(this.game, this.score, this.coinPoints, this.currentLevel, this.character, this.lives);
        }
        return null;
    }
}
//# sourceMappingURL=Level_3.js.map