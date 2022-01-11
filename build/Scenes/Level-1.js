import Bullet from "../Bullet.js";
import Game from "../Game.js";
import Line from "../Line.js";
import Player from "../Player.js";
import Score from "../Score.js";
import Virus from "../Virus.js";
import Worm from "../Worm.js";
import GameOver from "./GameOver.js";
import Scene from "./Scene.js";
export default class Level extends Scene {
    isAlive;
    scoringItems;
    player;
    bullets;
    score;
    line;
    lives;
    constructor(game) {
        super(game);
        console.log('Level 1');
        this.isAlive = false;
        this.scoringItems = [];
        this.bullets = [];
        this.score = new Score();
        this.line = new Line(this.game.canvas);
        this.lives = 3;
        this.player = new Player(10, this.game.canvas.height / 4, Game.loadNewImage('../assets/img/tommie.png'));
    }
    processInput() {
        this.moveItems();
        if (Game.randomNumber(1, 20) === 1) {
            this.scoringItems.push(new Virus('rightToLeft', this.game.canvas, this.game.canvas.width, Game.randomNumber(0, this.game.canvas.height - 30), Game.loadNewImage('../assets/img/virusSmall.png')));
        }
        else if (Game.randomNumber(1, 100) === 1) {
            this.scoringItems.push(new Worm('rightToLeft', this.game.canvas, this.game.canvas.width, Game.randomNumber(0, this.game.canvas.height - 30), Game.loadNewImage('../assets/img/mworm.png')));
        }
        this.mouseMove();
        this.bulletCollidesWithVirus();
        this.virusCollidesWithLine();
    }
    update(elapsed) {
        if (this.isAlive) {
            return new GameOver(this.game);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas('Level 1', 25, 50, 40, 'Green', "left");
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 25, 85, 25, "black", "left");
        this.writeTextToCanvas(`Lives: ${this.lives}`, 25, 110, 25, "black", "left");
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
    mouseMove() {
        let pointerX;
        let pointerY;
        this.game.canvas.onmousedown = (event) => {
            pointerX = event.pageX;
            pointerY = event.pageY;
            this.bullets.push(new Bullet(pointerX, pointerY, this.game.canvas));
        };
    }
    bulletCollidesWithVirus() {
        if (this.bullets.length !== 0) {
            this.bullets.forEach((bullet) => {
                this.scoringItems = this.scoringItems.filter((element) => {
                    if (bullet.collidesWithVirus(element)) {
                        this.score.setScore(1);
                        return false;
                    }
                    return true;
                });
            });
        }
    }
    virusCollidesWithLine() {
        this.scoringItems = this.scoringItems.filter((element) => {
            if (this.line.collidesWithRocket(element)) {
                if (this.lives > 0) {
                    this.lives -= 1;
                }
                else {
                    this.isAlive = true;
                }
                return false;
            }
            return true;
        });
    }
}
//# sourceMappingURL=Level-1.js.map