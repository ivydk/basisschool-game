import GameItem from './GameItem.js';
export default class Bullit extends GameItem {
    speed;
    yMoveTo;
    constructor(yPos) {
        super(100, yPos, GameItem.loadNewImage('./assets/img/rocket-horizontal.png'));
        this.xPosition = 100;
        this.yPosition = 100;
        this.yMoveTo = yPos;
        this.speed = 2;
    }
    move() {
        this.xPosition += this.speed;
        if (this.yPosition >= this.yMoveTo) {
            this.yPosition -= this.speed;
        }
    }
}
//# sourceMappingURL=Bullit.js.map