import GameItem from './GameItem.js';
import GameLoop from './GameLoop.js';
import Line from './Line.js';
import Player from './Player.js';
import Rocket from './Rocket.js';
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
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.score = new Score;
        this.line = new Line(this.ctx, this.canvas);
        this.scoringItems = [];
        for (let index = 0; index < 10; index++) {
            if (index % 2 === 0) {
                console.log('RightToLeft');
                this.scoringItems.push(new Rocket('rightToLeft', this.canvas, canvas.width, GameItem.randomInteger(0, this.canvas.height - 200), GameItem.loadNewImage('./assets/img/rocket-horizontal.png')));
            }
        }
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
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        this.drawRockets();
        this.moveRockets();
        this.line.drawLine();
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
}
//# sourceMappingURL=Game.js.map