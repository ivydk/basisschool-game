import Game from "../Game.js";
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
    levelUpImage;
    constructor(game, score, coins, currentLevel, character, lives) {
        super(game);
        console.log('Question page');
        Game.changeBackgroundImg('brickWall.jpg');
        this.character = character;
        this.currentLevel = currentLevel;
        this.score = score;
        this.coins = coins;
        this.lives = lives;
        this.screens = 0;
        this.keyListener = new KeyListener();
        this.extraBullets = 0;
        this.levelUpImage = Game.loadNewImage('assets/img/levelUp2.png');
    }
    processInput() {
        this.screens += 1;
        if (this.screens % 60 === 0) {
            if ((this.keyListener.isKeyDown(KeyListener.KEY_1) || this.keyListener.isKeyDown(97)) && this.coins.getCoins() >= 3) {
                console.log('1');
                this.lives += 1;
                this.coins.setCoins(-3);
            }
            if ((this.keyListener.isKeyDown(KeyListener.KEY_2) || this.keyListener.isKeyDown(98)) && this.coins.getCoins() >= 1) {
                console.log('2');
                this.extraBullets += 10;
                this.coins.setCoins(-1);
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
        ctx.drawImage(this.levelUpImage, (this.game.canvas.width / 2) - (this.levelUpImage.width / 2), 50);
        this.writeTextToCanvas(`Munten: ${this.coins.getCoins()}${String.fromCodePoint(129689)}`, this.game.canvas.width / 2, 150 + this.levelUpImage.height, 30, "black", "center");
        this.writeTextToCanvas(`-3${String.fromCodePoint(129689)}: druk 1 voor 1 extra leven`, this.game.canvas.width / 2, 225 + this.levelUpImage.height, 30, "black", "center");
        this.writeTextToCanvas(`-1${String.fromCodePoint(129689)}: druk 2 voor 10 extra kogels`, this.game.canvas.width / 2, 275 + this.levelUpImage.height, 30, "black", "center");
        this.writeTextToCanvas(`Druk om enter om door te gaan naar level ${this.currentLevel + 1}`, this.game.canvas.width / 2, 350 + this.levelUpImage.height, 30, "black", "center");
    }
}
//# sourceMappingURL=Inbetween.js.map