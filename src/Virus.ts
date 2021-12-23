import ScoringItem from './ScoringItem.js';

export default class virus extends ScoringItem {
    private type: string;

    private canvas: HTMLCanvasElement;

    private speed: number;

    /**
     * Initialize the Rocket
     *
     * @param type type of the Rocket
     * @param canvasWidth width of the canvas
     * @param canvasHeight heighst of the canvas
     */
    public constructor(type: string, canvas: HTMLCanvasElement, xPosition: number, yPosition: number, image: HTMLImageElement) {
        // super('Rocket', 3);
        super(0, xPosition, yPosition, image);

        this.canvas = canvas;

        this.xPosition = xPosition;
        this.yPosition = yPosition;

        this.type = 'RightToLeft'


        // let xPosition = ScoringItem.randomInteger(0, canvasWidth - 200);
        // const yPosition = ScoringItem.randomInteger(0, canvasHeight - 200);

        // if (type === 'RightToLeft') {
        //     xPosition = canvas.width; //1850
        //     this.setImage(Rocket.loadNewImage('./assets/img/rocket-horizontal.png'));
        // }

        xPosition = canvas.width; //1850
        this.image = image;

        // this.setXPos(xPosition);
        // this.setYPos(yPosition);

        this.type = type;
        // this.setSpeed(ScoringItem.randomInteger(1, 5));
        // this.speed = ScoringItem.randomInteger(0.5, 2);
        this.speed = 1;
    }

    /**
     * Method to move the Rocket
     */
    public move(): void {
        this.setXPos(this.getXPos() - this.speed);
        // if (this.type === 'RightToLeft') {
        //     this.setXPos(this.getXPos() - this.speed);
        // } else {
        //     this.setYPos(this.getYPos() - this.speed);
        // }
    }

    /**
     * Checks if Rocket is out of canvas
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
            // this.setXPos(ScoringItem.randomInteger(0, canvasWidth));
            this.xPosition = ScoringItem.randomInteger(0, canvasWidth);
        }
    }
}