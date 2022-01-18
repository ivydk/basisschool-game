import GameItem from './GameItem.js';
import ScoringItem from './ScoringItem.js';

export default class Bullet extends GameItem {
    private speed: number;

    private yMoveTo: number;

    private xMoveTo: number;

    private isHit: boolean;

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
        this.isHit = false;
    }

    /**
     * moves the bullet
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

    /**
     * checks if the bullet collides with virus
     *
     * @param scoringItem
     * @returns
     */
    public collidesWithVirus(scoringItem: ScoringItem) {
        return this.getXPos() < scoringItem.getXPos() + scoringItem.getImage().width
            && this.getXPos() + this.getImage().width > scoringItem.getXPos()
            && this.getYPos() < scoringItem.getYPos() + scoringItem.getImage().height
            && this.getYPos() + this.getImage().height > scoringItem.getYPos();
    }

    /**
     *
     * @returns wether the bullet is hit or not
     */
    public IsHit(): boolean {
        return this.isHit;
    }

    /**
     * sets the variable isHit to true when you call the function
     */
    public setIsHit(): void {
        if (this.isHit === false) {
            this.isHit = true;
            console.log('bullet is weg');
        }
    }

    public setSpeed(speed: number) {
        if (this.speed > 0 && this.speed <= 15) {
            this.speed = speed;
        }
    }
}