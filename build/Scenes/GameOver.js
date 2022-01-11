import KeyListener from "../KeyListener.js";
import QuestionPage from "./QuestionPage.js";
import Scene from "./Scene.js";
import Start from "./Start.js";
export default class GameOver extends Scene {
    static NEXT_SCREEN_START = 0;
    static NEXT_SCREEN_QUESTION = 1;
    answer;
    isFinished;
    keyListener;
    constructor(game) {
        super(game);
        console.log('Game Over');
        this.keyListener = new KeyListener();
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
            this.answer = GameOver.NEXT_SCREEN_START;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_Q)) {
            this.isFinished = true;
            this.answer = GameOver.NEXT_SCREEN_QUESTION;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            if (this.answer === 0) {
                return new Start(this.game);
            }
            else if (this.answer === 1) {
                return new QuestionPage(this.game);
            }
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas('Game over', this.game.canvas.width / 2, this.game.canvas.height / 2, 50, "green", "center");
        this.writeTextToCanvas('Druk op enter om terug te gaan naar het start scherm', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 20, "black", "center");
        this.writeTextToCanvas('Druk op Q als je een exta leven wilt', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 60, 20, "black", "center");
    }
}
//# sourceMappingURL=GameOver.js.map