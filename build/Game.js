import GameLoop from './GameLoop.js';
import Start from './Scenes/Start.js';
export default class Game {
    canvas;
    gameLoop;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new Start(this));
        console.log('game');
        const backgroundId = document.querySelector('canvas');
        console.log(backgroundId);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static changeBackgroundImg(pictureName) {
        document.body.style.backgroundImage = `url("assets/img/${pictureName}")`;
    }
}
//# sourceMappingURL=Game.js.map