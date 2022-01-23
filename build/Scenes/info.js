import KeyListener from "../KeyListener.js";
import Score from "../Score.js";
import Level_1 from "./Level_1.js";
import Scene from "./Scene.js";
import CoinPoints from "../CoinPoints.js";
import Game from "../Game.js";
export default class Info extends Scene {
    isFinished;
    keyListener;
    score;
    coinPoints;
    character;
    boy;
    girl;
    virusVechterLogo;
    constructor(game) {
        super(game);
        console.log('start');
        this.score = new Score();
        this.coinPoints = new CoinPoints();
        this.keyListener = new KeyListener();
        Game.changeBackgroundImg('brickWall.jpg');
        this.boy = Game.loadNewImage('assets/img/player_boy.png');
        this.girl = Game.loadNewImage('assets/img/player_girl.png');
        this.virusVechterLogo = Game.loadNewImage('assets/img/virusVechterLogo.png');
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_M)) {
            this.character = this.girl;
            this.isFinished = true;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_J)) {
            this.character = this.boy;
            this.isFinished = true;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            return new Level_1(this.game, this.score, this.coinPoints, 3, this.character, 0);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        ctx.drawImage(this.virusVechterLogo, (this.game.canvas.width / 2) - (this.virusVechterLogo.width / 2), 50);
        ctx.drawImage(this.boy, (this.game.canvas.width / 2.5) - (100 / 2), this.game.canvas.height - 200, 100, 141.13);
        ctx.drawImage(this.girl, this.game.canvas.width - (this.game.canvas.width / 2.5) - (88.63 / 2), this.game.canvas.height - 200, 88.63, 141.13);
        this.writeTextToCanvas('Jij bent een jongen/meisje en jij moet samen met', this.game.canvas.width / 2, (this.game.canvas.height / 2) - 30, 30, "black", "center");
        this.writeTextToCanvas(' je laptop tegen de computer virussen', this.game.canvas.width / 2, (this.game.canvas.height / 2), 30, "white", "center");
        this.writeTextToCanvas('vechten, schiet op de virussen om ze weg te halen', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 30, "black", "center");
        this.writeTextToCanvas('Druk op J voor een jongen en M voor een meisje', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 80, 30, "black", "center");
    }
}
//# sourceMappingURL=Info.js.map