import Game from "../Game.js";
import GameOver from "./GameOver.js";
import Level from "./Level.js";
import Level_2 from "./Level_2.js";
export default class Level_1 extends Level {
    static SCORE_TO_LEVEL_UP = 50;
    constructor(game, score, coins, lives) {
        super(game, score, coins, lives);
        this.score = score;
        this.coins = coins;
        this.currentLevel = 1;
        this.maxBullets = 75;
        Game.changeBackgroundImg('background_3.jpeg');
    }
    update(elapsed) {
        if (this.isAlive) {
            this.isAlive = true;
            return new GameOver(this.game, this.score, this.coins, this.currentLevel);
        }
        if (this.score.getScore() >= Level_1.SCORE_TO_LEVEL_UP) {
            return new Level_2(this.game, this.score, this.coins, this.lives + 1);
        }
        return null;
    }
}
//# sourceMappingURL=Level_1.js.map