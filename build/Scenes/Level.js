import Bullet from "../Bullet.js";
import Game from "../Game.js";
import GameItem from "../GameItem.js";
import Line from "../Line.js";
import Player from "../Player.js";
import Virus from "../Virus.js";
import Worm from "../Worm.js";
import Scene from "./Scene.js";
import TrojanHorse from "../TrojanHorse.js";
import Spy from "../Spy.js";
import Coin from "../Coin.js";
export default class Level extends Scene {
    static SCORE_TO_LEVEL_UP_ARRAY = [null, 50, 150, 300, 500];
    static SCORE_TOTAL_PER_LEVEL_ARRAY = [
        null,
        Level.SCORE_TO_LEVEL_UP_ARRAY[1],
        Level.SCORE_TO_LEVEL_UP_ARRAY[1] + Level.SCORE_TO_LEVEL_UP_ARRAY[2],
        Level.SCORE_TO_LEVEL_UP_ARRAY[1] + Level.SCORE_TO_LEVEL_UP_ARRAY[2] + Level.SCORE_TO_LEVEL_UP_ARRAY[3],
        Level.SCORE_TO_LEVEL_UP_ARRAY[1] + Level.SCORE_TO_LEVEL_UP_ARRAY[2] + Level.SCORE_TO_LEVEL_UP_ARRAY[3] + Level.SCORE_TO_LEVEL_UP_ARRAY[4]
    ];
    isAlive;
    scoringItems;
    player;
    bullets;
    character;
    toSpawn;
    score;
    coinPoints;
    line;
    lives;
    currentLevel;
    maxBullets;
    pointsToLevelUp;
    bulletsShot;
    constructor(game, score, coins, lives, character) {
        super(game);
        console.log('Level 1');
        this.isAlive = false;
        this.scoringItems = [];
        this.bullets = [];
        this.score = score;
        this.character = character;
        this.coinPoints = coins;
        this.line = new Line(this.game.canvas);
        this.bulletsShot = 0;
        this.lives = lives;
        this.toSpawn = [];
        this.player = new Player(10, this.game.canvas.height / 4, this.character);
    }
    processInput() {
        this.moveItems();
        if (Game.randomNumber(1, 40) === 1) {
            this.scoringItems.push(new Virus('rightToLeft', this.game.canvas, this.game.canvas.width, Game.randomNumber(0, this.game.canvas.height - 30), Game.loadNewImage('assets/img/virusSmall.png')));
        }
        else if (Game.randomNumber(1, 100) === 1 && this.currentLevel >= 2) {
            this.scoringItems.push(new Worm('rightToLeft', this.game.canvas, this.game.canvas.width, Game.randomNumber(0, this.game.canvas.height - 30), Game.loadNewImage('assets/img/mworm.png')));
        }
        else if (Game.randomNumber(1, 400) === 1 && this.currentLevel >= 3) {
            this.scoringItems.push(new TrojanHorse('rightToLeft', this.game.canvas, this.game.canvas.width, GameItem.randomInteger(0, this.game.canvas.height - 75), GameItem.loadNewImage('assets/img/TrojanHorse.png')));
        }
        else if (Game.randomNumber(1, 300) === 1 && this.currentLevel >= 4) {
            this.scoringItems.push(new Spy('rightToLeft', this.game.canvas, 800, GameItem.randomInteger(0, this.game.canvas.height - 72), GameItem.loadNewImage('assets/img/spy.png')));
        }
        if (Game.randomNumber(1, 150) === 1) {
            this.scoringItems.push(new Coin('rightToLeft', this.game.canvas, this.game.canvas.width, GameItem.randomInteger(0, this.game.canvas.height - 30), GameItem.loadNewImage('assets/img/coin.png')));
        }
        this.mouseClick();
        this.bulletCollidesWithVirus();
        this.virusCollidesWithLine();
        this.deleteBulletWhenHit();
    }
    update(elapsed) {
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas(`Level ${this.currentLevel}`, 25, 50, 40, 'white', "left");
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 25, 85, 25, "white", "left");
        this.writeTextToCanvas(`Levens: ${this.lives}`, 25, 110, 25, "white", "left");
        this.writeTextToCanvas(`Kogels over: ${this.maxBullets - this.bulletsShot}`, 25, 135, 25, "white", "left");
        this.writeTextToCanvas(`Munten: ${this.coinPoints.getCoins()}`, 25, 160, 25, "white", "left");
        this.writeTextToCanvas(`${Level.SCORE_TOTAL_PER_LEVEL_ARRAY[this.currentLevel] - this.score.getScore()}`, this.game.canvas.width - 25, 50, 40, "white", "right");
        this.player.draw(ctx);
        this.line.drawLine(ctx);
        if (this.scoringItems.length !== 0) {
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.draw(ctx);
            });
        }
        if (this.bullets.length !== 0) {
            this.bullets.forEach((bullet) => {
                bullet.draw(ctx);
            });
        }
    }
    moveItems() {
        if (this.scoringItems.length !== 0) {
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.move();
            });
        }
        if (this.bullets.length !== 0) {
            this.bullets.forEach((bullet) => {
                bullet.move();
            });
        }
    }
    mouseClick() {
        let pointerX;
        let pointerY;
        this.game.canvas.onmousedown = (event) => {
            pointerX = event.pageX;
            pointerY = event.pageY;
            if (this.bulletsShot < this.maxBullets) {
                this.bulletsShot += 1;
                this.bullets.push(new Bullet(pointerX, pointerY, this.game.canvas));
            }
        };
    }
    bulletCollidesWithVirus() {
        if (this.bullets.length !== 0) {
            this.bullets.forEach((bullet) => {
                this.scoringItems = this.scoringItems.filter((element) => {
                    if (bullet.collidesWithVirus(element)) {
                        if (!(element instanceof Coin)) {
                            this.score.setScore(1);
                        }
                        else {
                            this.coinPoints.setCoins(1);
                        }
                        bullet.setIsHit();
                        if (element instanceof TrojanHorse) {
                            this.score.setScore(2);
                            console.log(element.getLives());
                            element.subtractLivesWhenHit();
                            if (element.isDead()) {
                                this.toSpawn.push(new Virus('rightToLeft', this.game.canvas, element.getXPos(), element.getYPos() + 50, Game.loadNewImage('assets/img/virusSmall.png')));
                                this.toSpawn.push(new Virus('rightToLeft', this.game.canvas, element.getXPos(), element.getYPos() - 50, Game.loadNewImage('assets/img/virusSmall.png')));
                                this.toSpawn.push(new Virus('rightToLeft', this.game.canvas, element.getXPos(), element.getYPos(), Game.loadNewImage('assets/img/virusSmall.png')));
                                return false;
                            }
                            return true;
                        }
                        if (element instanceof Spy) {
                            element.subtractLivesWhenHit();
                            if (element.isDead()) {
                                this.score.setScore(1);
                                return false;
                            }
                            return true;
                        }
                        return false;
                    }
                    return true;
                });
                this.scoringItems = this.scoringItems.concat(this.toSpawn);
                this.toSpawn = [];
            });
        }
    }
    virusCollidesWithLine() {
        this.scoringItems = this.scoringItems.filter((element) => {
            if (this.line.collidesWithRocket(element)) {
                if (element instanceof Coin) {
                    return false;
                }
                else {
                    if (this.lives > 0) {
                        this.lives -= 1;
                    }
                    else {
                        this.isAlive = true;
                    }
                    return false;
                }
            }
            return true;
        });
    }
    deleteBulletWhenHit() {
        this.bullets = this.bullets.filter((element) => {
            if (element.IsHit()) {
                return false;
            }
            return true;
        });
    }
}
//# sourceMappingURL=Level.js.map