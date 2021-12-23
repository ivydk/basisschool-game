import GameItem from './GameItem.js';
import ScoringItem from './ScoringItem.js';
export default class Worm extends ScoringItem {
    type;
    canvas;
    speed;
    framcountWorm;
    moveWay;
    constructor(type, canvas, xPosition, yPosition, image) {
        super(0, xPosition, yPosition, image);
        this.canvas = canvas;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.type = 'RightToLeft';
        xPosition = canvas.width;
        this.image = image;
        this.type = type;
        this.speed = 1;
        this.framcountWorm = 0;
        this.moveWay = 'up';
    }
    move() {
        this.framcountWorm += 1;
        const randomFrameCount = GameItem.randomInteger(60, 200);
        if (this.framcountWorm % randomFrameCount === 0 || this.outOfCanvas()) {
            if (this.moveWay === 'up') {
                this.moveWay = 'down';
                console.log('down');
            }
            else {
                this.moveWay = 'up';
                console.log('up');
            }
        }
        this.xPosition -= this.speed;
        if (this.moveWay === 'up') {
            this.yPosition -= this.speed;
        }
        else {
            this.yPosition += this.speed;
        }
    }
    outOfCanvas() {
        if (this.yPosition <= 0 || this.yPosition >= this.canvas.height - this.image.height) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=Worm.js.map