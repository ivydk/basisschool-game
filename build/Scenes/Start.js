import KeyListener from "../KeyListener.js";
import Level from "./Level-1.js";
import Scene from "./Scene.js";
export default class Start extends Scene {
    isFinished;
    keyListener;
    constructor(game) {
        super(game);
        console.log('start');
        this.keyListener = new KeyListener();
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            return new Level(this.game);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas(`Virus vechter`, this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "green", "center");
        this.writeTextToCanvas('Druk op Enter om te beginnen', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "black", "center");
    }
}
//# sourceMappingURL=Start.js.map