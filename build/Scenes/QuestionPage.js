import KeyListener from "../KeyListener.js";
import Level from "./Level-1.js";
import Scene from "./Scene.js";
import Start from "./Start.js";
export default class QuestionPage extends Scene {
    answer;
    isFinished;
    keyListener;
    constructor(game) {
        super(game);
        console.log('Question page');
        this.keyListener = new KeyListener();
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            this.isFinished = true;
            this.answer = true;
        }
        else if (this.keyListener.isKeyDown(KeyListener.KEY_B)) {
            this.isFinished = true;
            this.answer = false;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            if (this.answer === true) {
                return new Level(this.game);
            }
            else if (this.answer === false) {
                return new Start(this.game);
            }
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas('Lorem ipsum dolor sit amet, consectetur adipiscing elit vivamus congue?', this.game.canvas.width / 2, (this.game.canvas.height / 2) - 45, 25, "green", "center");
        this.writeTextToCanvas('A: Lorem ipsum dolor sit', this.game.canvas.width / 2, this.game.canvas.height / 2, 20, "black", "center");
        this.writeTextToCanvas('B: Lorem ipsum dolor sit amet.', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 25, 20, "black", "center");
        this.writeTextToCanvas('Druk op A of B om het antwoord te geven', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 50, 15, "black", "center");
    }
}
//# sourceMappingURL=QuestionPage.js.map