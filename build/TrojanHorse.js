import ScoringItem from './ScoringItem.js';
export default class TrojanHorse extends ScoringItem {
    type;
    canvas;
    speed;
    isHit;
    lives;
    constructor(type, canvas, xPosition, yPosition, image) {
        super(0, xPosition, yPosition, image);
        this.canvas = canvas;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.type = 'RightToLeft';
        xPosition = canvas.width;
        this.image = image;
        this.type = type;
        this.speed = 0.5;
        this.isHit = false;
        this.lives = 3;
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
        this.lives -= 1;
    }
    isDead() {
        if (this.lives <= 0) {
            return true;
        }
        return false;
    }
    getIsHit = () => this.isHit;
    setIsHit = (isHit) => {
        this.isHit = isHit;
    };
    getLives = () => this.lives;
}
//# sourceMappingURL=TrojanHorse.js.map