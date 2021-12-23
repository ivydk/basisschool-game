import GameItem from './GameItem.js';
import GameLoop from './GameLoop.js';
import Line from './Line.js';
import Player from './Player.js';
import virus from './Virus.js';
import Score from './Score.js';
export default class Game {
    canvas;
    ctx;
    gameLoop;
    player;
    score;
    framecount;
    scoringItems;
    line;
    xMouse;
    yMouse;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.score = new Score;
        this.line = new Line(this.ctx, this.canvas);
        this.scoringItems = [];
        console.log(this.scoringItems);
        this.framecount = 0;
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
        if ((this.framecount % 60) === 0) {
            this.score.setScore(1);
            this.mouseMove();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        this.drawRockets();
        this.createVirus();
        this.moveRockets();
        this.line.drawLine();
        this.virusCollidesWithLine();
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 30, 30, 40);
        requestAnimationFrame(this.loop);
    };
    drawPlayer() {
        this.player.draw(this.ctx);
    }
    drawRockets() {
        if (this.scoringItems.length !== 0) {
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.draw(this.ctx);
            });
        }
    }
    moveRockets() {
        if (this.scoringItems.length !== 0) {
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.move();
            });
        }
    }
    virusCollidesWithLine() {
        this.scoringItems = this.scoringItems.filter((element) => {
            if (this.line.collidesWithRocket(element)) {
                return false;
            }
            return true;
        });
    }
    createVirus() {
        if (this.framecount % 35 === 0) {
            this.scoringItems.push(new virus('rightToLeft', this.canvas, this.canvas.width, GameItem.randomInteger(0, this.canvas.height - 30), GameItem.loadNewImage('./assets/img/virusSmall.png')));
        }
    }
    virusIsClicked() {
        let cursorX;
        let cursorY;
        document.addEventListener('click', function (e) {
            cursorX = e.pageX;
            cursorY = e.pageY;
            console.log('clicked');
            return true;
        });
        console.log(cursorY);
        this.scoringItems = this.scoringItems.filter((element) => {
            if (cursorX === element.getXPos() && cursorY === element.getYPos()) {
                console.log('geraakt');
                return false;
            }
            console.log('niks');
            return true;
        });
    }
    mouseMove() {
        let pointerX;
        let pointerY;
        this.canvas.onmousedown = function (event) {
            pointerX = event.pageX;
            pointerY = event.pageY;
            console.log(`x: ${pointerX}, y: ${pointerY}`);
        };
    }
}
//# sourceMappingURL=Game.js.map