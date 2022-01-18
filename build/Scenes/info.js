import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Level_1 from "./Level_1.js";
import Scene from "./Scene.js";
import Coins from "../Coins.js";
export default class Info extends Scene {
    isFinished;
    keyListener;
    score;
    coins;
    constructor(game) {
        super(game);
        console.log('start');
        this.score = new Score();
        this.coins = new Coins();
        this.keyListener = new KeyListener();
        Game.changeBackgroundImg('background.jpeg');
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            return new Level_1(this.game, this.score, this.coins, 3);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas('Druk op Enter om te beginnen', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "black", "center");
    }
}
//# sourceMappingURL=info.js.map