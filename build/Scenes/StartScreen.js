import KeyListener from '../KeyListener.js';
import Scene from './Scene.js';
export default class Start extends Scene {
    keyListener;
    finished;
    constructor(game) {
        super(game);
        this.keyListener = new KeyListener();
        this.finished = false;
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.finished = true;
        }
    }
    update() {
        this.render();
        if (this.finished) {
            console.log('next please?!');
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.writeTextToCanvas('LETS GO GAMING', this.game.canvas.width / 2, 100, 50);
        this.game.writeTextToCanvas('Press Enter to play', this.game.canvas.width / 2, 150, 20);
    }
}
//# sourceMappingURL=StartScreen.js.map