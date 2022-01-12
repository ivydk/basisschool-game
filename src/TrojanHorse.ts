import ScoringItem from './ScoringItem.js';

export default class TrojanHorse extends ScoringItem {
    private type: string;

    private canvas: HTMLCanvasElement;

    private speed: number;

    private isHit: boolean;

    /**
     * Initialize the Virus
     *
     * @param type type of the Virus
     * @param canvasWidth width of the canvas
     * @param canvasHeight heights of the canvas
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
        this.speed = 0.5;

        this.isHit = false;
    }

    /**
     * Method to move the Virus
     */
    public move(): void {
        this.setXPos(this.getXPos() - this.speed);
    }

    /**
     * Checks if Virus is out of canvas
     *
     * @param canvasWidth widht of the canvas
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

    public getIsHit = (): boolean => this.isHit;

    public setIsHit = (isHit: boolean) => {
        this.isHit = isHit;
    }

}
