import Game from './Game.js';
import ScoringItem from './ScoringItem.js';

export default class Spy extends ScoringItem {
    private type: string;

    private canvas: HTMLCanvasElement;

    private speed: number;

    private lives: number;

    /**
     * Initialize the Spy
     *
     * @param type type of the Spy
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

        // Lives the spy starts with
        this.lives = 2;

        this.type = type;
        this.speed = 2;
    }

    /**
     * Method to move the Spy
     */
    public move(): void {
        this.setXPos(this.getXPos() - this.speed);
    }

    /**
     * Checks if Spy is out of canvas
     *
     * @param canvasWidth width of the canvas
     * @param canvasHeight height of the canvas
     */
    public outOfCanvas(canvasWidth: number, canvasHeight: number): void {
        if (this.type === 'RightToLeft') {
            if (this.getXPos() + this.image.width >= canvasWidth) {
                this.setXPos(0);
                this.setYPos(ScoringItem.randomInteger(0, canvasHeight));
            }
        } else if (this.getYPos() + this.image.height >= canvasHeight) {
            this.setYPos(0);
            this.xPosition = ScoringItem.randomInteger(0, canvasWidth);
        }
    }

    /**
    * When you call this function it will subtract 1 from the variable lives
    */
    public subtractLivesWhenHit() {
        console.log(this.lives);
        this.lives -= 1;
    }

    /**
     *
     * @returns `true` is the horse is dead
     */
    public isDead(): boolean {
        if (this.lives <= 0) {
            return true
        }
        return false
    }
}
