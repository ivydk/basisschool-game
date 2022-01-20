import KeyListener from "../KeyListener";
import Scene from "./Scene";
import Start from "./Start";
export default class ExplainWrongAnswer extends Scene {
    answer;
    isFinished;
    keyListener;
    explanation;
    question;
    rightAnswer;
    constructor(game, score, coins, currentLevel, character, question) {
        super(game);
        console.log('Explain wrong answer page');
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            if (this.answer === true) {
                return new Start(this.game);
            }
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}
//# sourceMappingURL=ExplainWrongAnswer.js.map