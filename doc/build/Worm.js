import GameItem from './GameItem.js';
import ScoringItem from './ScoringItem.js';
export default class Worm extends ScoringItem {
    type;
    canvas;
    speed;
    frameCountWorm;
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
        this.frameCountWorm = 0;
        this.moveWay = 'up';
    }
    move() {
        this.frameCountWorm += 1;
        const randomFrameCount = GameItem.randomInteger(60, 200);
        if (this.frameCountWorm % randomFrameCount === 0 || this.outOfCanvas()) {
            if (this.moveWay === 'up') {
                this.moveWay = 'down';
            }
            else {
                this.moveWay = 'up';
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