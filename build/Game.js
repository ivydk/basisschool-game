import GameLoop from './GameLoop.js';
import Player from './Player.js';
import Score from './Score.js';
export default class Game {
    canvas;
    ctx;
    gameLoop;
    player;
    score;
    framecount;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.score = new Score;
        this.framecount = 0;
        this.player = this.insertPlayer();
        this.draw();
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
    draw = () => {
        this.framecount += 1;
        if ((this.framecount % 60) === 0) {
            this.score.setScore(1);
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 30, 30, 40);
        requestAnimationFrame(this.draw);
    };
    drawPlayer() {
        this.player.draw(this.ctx);
    }
}
//# sourceMappingURL=Game.js.map