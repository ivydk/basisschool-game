import KeyListener from "../KeyListener.js";
import Level_1 from "./Level_1.js";
import Level_2 from "./Level_2.js";
import Level_3 from "./Level_3.js";
import Level_4 from "./Level_4.js";
import Scene from "./Scene.js";
import HighScore from "./Highscore.js";
export default class Inbetween extends Scene {
    answer;
    isFinished;
    keyListener;
    score;
    line;
    coins;
    currentLevel;
    character;
    lives;
    screens;
    extraBullets;
    constructor(game, score, coins, currentLevel, character, lives) {
        super(game);
        console.log('Question page');
        this.character = character;
        this.currentLevel = currentLevel;
        this.score = score;
        this.coins = coins;
        this.lives = lives;
        this.screens = 0;
        this.keyListener = new KeyListener();
        this.extraBullets = 0;
    }
    processInput() {
        this.screens += 1;
        if (this.screens % 60 === 0) {
            if (this.keyListener.isKeyDown(KeyListener.KEY_1) && this.coins.getCoins() >= 3) {
                console.log('1');
                this.lives += 1;
                this.coins.setCoins(-3);
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_2) && this.coins.getCoins() >= 1) {
                console.log('2');
                this.extraBullets += 10;
                this.coins.setCoins(-1);
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_3)) {
                console.log('3');
                this.line.setColor('red');
            }
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.isFinished = true;
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            switch (this.currentLevel + 1) {
                case 1:
                    return new Level_1(this.game, this.score, this.coins, this.lives, this.character);
                    break;
                case 2:
                    return new Level_2(this.game, this.score, this.coins, this.lives, this.character);
                    break;
                case 3:
                    return new Level_3(this.game, this.score, this.coins, this.lives, this.character);
                    break;
                case 4:
                    return new Level_4(this.game, this.score, this.coins, this.lives, this.character);
                    break;
                case 5:
                    return new HighScore(this.game, this.score, this.coins, this.currentLevel);
                    break;
            }
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas(`Coins: ${this.coins.getCoins()}`, this.game.canvas.width / 2, 300, 18, "white", "center");
        this.writeTextToCanvas(`Levens: ${this.lives}`, this.game.canvas.width / 2, 340, 18, "white", "center");
        this.writeTextToCanvas(`Extra kogels: ${this.extraBullets}`, this.game.canvas.width / 2, 380, 18, "white", "center");
        this.writeTextToCanvas('Druk op `enter` om veder te gaan :-)', this.game.canvas.width / 2, (this.game.canvas.height / 2) + 85, 18, "white", "center");
    }
}
//# sourceMappingURL=Inbetween.js.map