import GameItem from './GameItem.js';
import KeyboardListener from './KeyListener.js';

export default class Player extends GameItem {
    private keyBoardListener: KeyboardListener;

    /**
     * Initialize the bird
     *
     * @param xPos xPosition on the x-axis
     * @param yPos yPosition on the y-axis
     * @param image image of the Bird
     */
    constructor(xPos: number, yPos: number, image: HTMLImageElement) {
        super(xPos, yPos, image);
        this.keyBoardListener = new KeyboardListener();
    }
}
