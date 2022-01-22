import ScoringItem from './ScoringItem.js';
export default class Spy extends ScoringItem {
    type;
    canvas;
    speed;
    lives;
    constructor(type, canvas, xPosition, yPosition, image) {
        super(0, xPosition, yPosition, image);
        this.canvas = canvas;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.type = 'RightToLeft';
        xPosition = canvas.width;
        this.image = image;
        this.lives = 2;
        this.type = type;
        this.speed = 2;
    }
    move() {
        this.setXPos(this.getXPos() - this.speed);
    }
    outOfCanvas(canvasWidth, canvasHeight) {
        if (this.type === 'RightToLeft') {
            if (this.getXPos() + this.image.width >= canvasWidth) {
                this.setXPos(0);
                this.setYPos(ScoringItem.randomInteger(0, canvasHeight));
            }
        }
        else if (this.getYPos() + this.image.height >= canvasHeight) {
            this.setYPos(0);
            this.xPosition = ScoringItem.randomInteger(0, canvasWidth);
        }
    }
    subtractLivesWhenHit() {
        console.log(this.lives);
        this.lives -= 1;
    }
    isDead() {
        if (this.lives <= 0) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=Spy.js.map