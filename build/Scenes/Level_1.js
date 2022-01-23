import Game from "../Game.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import InBetween from "./InBetween.js";
export default class Level_1 extends Level {
    static SCORE_TO_LEVEL_UP = Level.SCORE_TO_LEVEL_UP_ARRAY[1];
    constructor(game, score, coins, lives, character, extraBullets) {
        super(game, score, coins, lives, character);
        this.score = score;
        this.coinPoints = coins;
        this.currentLevel = 1;
        this.character = character;
        this.maxBullets = 75 + extraBullets;
        Game.changeBackgroundImg('background_3.jpeg');
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coinPoints, this.currentLevel, this.character);
        }
        if (this.score.getScore() >= Level_1.SCORE_TO_LEVEL_UP) {
            return new InBetween(this.game, this.score, this.coinPoints, this.currentLevel, this.character, this.lives);
        }
        return null;
    }
}
//# sourceMappingURL=Level_1.js.map