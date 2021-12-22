import GameItem from './GameItem.js';

export default abstract class ScoringItem extends GameItem {
    protected points: number;

    // private image: HTMLImageElement;

    /**
     * Initialize the ScoringItem class
     *
     * @param name name of the Game
     * @param points points
     */
    public constructor(points: number, xPosition: number, yPosition: number, image: HTMLImageElement) {
        super(xPosition, yPosition, image);
        this.points = points;
    }

    /**
     * Get the points
     *
     * @returns points
     */
    public getPoints(): number {
        return this.points;
    }

    /**
     * Abstract method to move item
     */
    public abstract move(): void;

    /**
     * Abstract method to determine if item is out of canvas
     *
     * @param canvasWidth width of the canvas
     * @param canvasHeight height of the canvas
     */
    public abstract outOfCanvas(canvasWidth: number, canvasHeight: number): void;
}