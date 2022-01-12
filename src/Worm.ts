import GameItem from './GameItem.js';
import ScoringItem from './ScoringItem.js';

export default class Worm extends ScoringItem {
    private type: string;

    private canvas: HTMLCanvasElement;

    private speed: number;

    private frameCountWorm: number;

    private moveWay: string;

    /**
     * Initialize the Virus
     *
     * @param type type of the Virus
     * @param canvasWidth width of the canvas
     * @param canvasHeight height of the canvas
     */
    public constructor(type: string, canvas: HTMLCanvasElement, xPosition: number, yPosition: number, image: HTMLImageElement) {
        super(0, xPosition, yPosition, image);

        this.canvas = canvas;

        this.xPosition = xPosition;
        this.yPosition = yPosition;

        this.type = 'RightToLeft'

        xPosition = canvas.width; //1850
        this.image = image;

        this.type = type;
        this.speed = 1;
        this.frameCountWorm = 0;
        this.moveWay = 'up';

    }

    /**
     * Method to move the Virus
     */
    public move(): void {
        this.frameCountWorm += 1;
        const randomFrameCount = GameItem.randomInteger(60, 200);

        if (this.frameCountWorm % randomFrameCount === 0 || this.outOfCanvas()) {
            if (this.moveWay === 'up') {
                this.moveWay = 'down';
            } else {
                this.moveWay = 'up';
            }
        }

        this.xPosition -= this.speed;

        if (this.moveWay === 'up') {
            this.yPosition -= this.speed;
        } else {
            this.yPosition += this.speed;
        }
    }

    /**
     * Checks if worm is out of canvas
     */
    public outOfCanvas(): boolean {
        if (this.yPosition <= 0 || this.yPosition >= this.canvas.height - this.image.height) {
            return true
        }
        return false
    }
}