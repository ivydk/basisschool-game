import KeyListener from "../KeyListener.js";
import Scene from "./Scene.js";
import Start from "./Start.js";
export default class HighScore extends Scene {
    isFinished;
    keyListener;
    score;
    coins;
    currentLevel;
    constructor(game, score, coins, currentLevel) {
        super(game);
        console.log('Game Over');
        this.currentLevel = currentLevel;
        this.score = score;
        this.coins = coins;
        this.keyListener = new KeyListener();
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            return new Start(this.game);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas(`Lekker bezig! ${String.fromCodePoint(128521)}`, this.game.canvas.width / 2, (this.game.canvas.height / 2) - 60, 30, "white", "center");
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "white", "center");
        this.writeTextToCanvas('Druk op enter om terug te gaan naar het start scherm', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 40, 20, "white", "center");
    }
}
//# sourceMappingURL=HighScore.js.map