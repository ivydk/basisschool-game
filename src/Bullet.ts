import GameItem from './GameItem.js';
import ScoringItem from './ScoringItem.js';

export default class Bullet extends GameItem {
    private speed: number;

    private yMoveTo: number;

    private xMoveTo: number;

    constructor(xPos: number, yPos: number, canvas: HTMLCanvasElement) {
        super(
            100,
            yPos,
            GameItem.loadNewImage('./assets/img/rocket-horizontal.png'),
        )

        this.xPosition = 80;
        this.yPosition = canvas.height / 2;
        this.xMoveTo = xPos;
        this.yMoveTo = yPos
        this.speed = 4;
    }

    /**
     * moves the bullit
     */
    public move(): void {
        this.xPosition += this.speed;
        // this.yPosition += this.speed;
        if (this.yMoveTo < this.yPosition) {
            this.yPosition -= this.speed;
        }
        if (this.yMoveTo > this.yPosition) {
            this.yPosition += this.speed;
        }
    }

    public collidesWithVirus(scoringItem: ScoringItem) {
        return this.getXPos() < scoringItem.getXPos() + scoringItem.getImage().width
            && this.getXPos() + this.getImage().width > scoringItem.getXPos()
            && this.getYPos() < scoringItem.getYPos() + scoringItem.getImage().height
            && this.getYPos() + this.getImage().height > scoringItem.getYPos();
    }
}