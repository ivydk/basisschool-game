import GameLoop from './GameLoop.js';
import Player from './Player.js';
export default class Game {
    canvas;
    ctx;
    gameLoop;
    player;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.writeTextToCanvas('hallo', 40, 40, 40);
        this.player = this.insertPlayer();
        this.draw();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'black') {
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
        return new Player(this.canvas.width / 2, this.canvas.height / 2, image);
    }
    draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        requestAnimationFrame(this.draw);
    };
    drawPlayer() {
        this.player.draw(this.ctx);
    }
}
//# sourceMappingURL=Game.js.map