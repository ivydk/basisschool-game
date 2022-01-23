import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Scene from "./Scene.js";
import CoinPoints from "../CoinPoints.js";
import Info from "Scenes/Info.js";
export default class Start extends Scene {
    isFinished;
    keyListener;
    score;
    coins;
    constructor(game) {
        super(game);
        console.log('start');
        this.score = new Score();
        this.coins = new CoinPoints();
        this.keyListener = new KeyListener();
        Game.changeBackgroundImg('startScherm-bg.jpeg');
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            return new Info(this.game);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas('Druk op Enter om door te gaan', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "black", "center");
    }
}
//# sourceMappingURL=Start.js.map