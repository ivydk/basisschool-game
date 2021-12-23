import GameItem from './GameItem.js';
import GameLoop from './GameLoop.js';
import Line from './Line.js';
import Player from './Player.js';
import Virus from './Virus.js';
import Score from './Score.js';
import Bullet from './Bullet.js';
import Worm from './Worm.js';
export default class Game {
    canvas;
    ctx;
    gameLoop;
    player;
    score;
    framecount;
    scoringItems;
    line;
    lives;
    bullets;
    alive;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.score = new Score;
        this.line = new Line(this.ctx, this.canvas);
        this.scoringItems = [];
        this.bullets = [];
        console.log(this.scoringItems);
        this.framecount = 0;
        this.lives = 3;
        this.alive = true;
        this.player = this.insertPlayer();
        this.loop();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'left', color = 'black') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    insertPlayer() {
        const image = Game.loadNewImage('./assets/img/tommie.png');
        return new Player(10, this.canvas.height / 4, image);
    }
    loop = () => {
        this.framecount += 1;
        this.mouseMove();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        this.createScoringItemAtInterval();
        this.moveItems();
        this.line.drawLine();
        this.virusCollidesWithLine();
        this.bullitCollidesWithVirus();
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 30, 30, 40);
        this.writeTextToCanvas(`Lives: ${this.lives}`, 30, 120, 600);
        if (this.alive === false) {
            this.writeTextToCanvas('Je hebt nu een virus ;)', 50, this.canvas.width / 2 + this.canvas.width / 8, this.canvas.height / 2, 'center');
            console.log('dood');
        }
        else {
            requestAnimationFrame(this.loop);
        }
    };
    draw() {
        this.player.draw(this.ctx);
        if (this.scoringItems.length !== 0) {
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.draw(this.ctx);
            });
        }
        if (this.bullets.length !== 0) {
            this.bullets.forEach((bullit) => {
                bullit.draw(this.ctx);
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
            this.bullets.forEach((bullit) => {
                bullit.move();
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
                    this.alive = false;
                }
                return false;
            }
            return true;
        });
    }
    bullitCollidesWithVirus() {
        if (this.bullets.length !== 0) {
            this.bullets.forEach((bullit) => {
                this.scoringItems = this.scoringItems.filter((element) => {
                    if (bullit.collidesWithVirus(element)) {
                        this.score.setScore(1);
                        return false;
                    }
                    return true;
                });
            });
        }
    }
    createScoringItemAtInterval() {
        const randomNumber = GameItem.randomInteger(1, 3);
        if (this.framecount % 35 === 0) {
            if (randomNumber === 1 || randomNumber === 2) {
                this.scoringItems.push(new Virus('rightToLeft', this.canvas, this.canvas.width, GameItem.randomInteger(0, this.canvas.height - 30), GameItem.loadNewImage('./assets/img/virusSmall.png')));
            }
            if (randomNumber === 3) {
                this.scoringItems.push(new Worm('rightToLeft', this.canvas, this.canvas.width, GameItem.randomInteger(0, this.canvas.height - 30), GameItem.loadNewImage('./assets/img/mworm.png')));
            }
        }
    }
    mouseMove() {
        let pointerX;
        let pointerY;
        this.canvas.onmousedown = (event) => {
            pointerX = event.pageX;
            pointerY = event.pageY;
            this.bullets.push(new Bullet(pointerX, pointerY, this.canvas));
        };
    }
}
//# sourceMappingURL=Game.js.map