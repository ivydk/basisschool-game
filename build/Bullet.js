import GameItem from './GameItem.js';
export default class Bullet extends GameItem {
    speed;
    yMoveTo;
    xMoveTo;
    isHit;
    constructor(xPos, yPos, canvas) {
        super(100, yPos, GameItem.loadNewImage('./assets/img/rocket-horizontal.png'));
        this.xPosition = 80;
        this.yPosition = canvas.height / 2;
        this.xMoveTo = xPos;
        this.yMoveTo = yPos;
        this.speed = 4;
        this.isHit = false;
    }
    move() {
        this.xPosition += this.speed;
        if (this.yMoveTo < this.yPosition) {
            this.yPosition -= this.speed;
        }
        if (this.yMoveTo > this.yPosition) {
            this.yPosition += this.speed;
        }
    }
    collidesWithVirus(scoringItem) {
        return this.getXPos() < scoringItem.getXPos() + scoringItem.getImage().width
            && this.getXPos() + this.getImage().width > scoringItem.getXPos()
            && this.getYPos() < scoringItem.getYPos() + scoringItem.getImage().height
            && this.getYPos() + this.getImage().height > scoringItem.getYPos();
    }
    IsHit() {
        return this.isHit;
    }
    setIsHit() {
        if (this.isHit === false) {
            this.isHit = true;
            console.log('bullet is weg');
        }
    }
    setSpeed(speed) {
        if (this.speed > 0 && this.speed <= 15) {
            this.speed = speed;
        }
    }
}
//# sourceMappingURL=Bullet.js.map