import GameItem from './GameItem.js';
import KeyboardListener from './KeyListener.js';
export default class Player extends GameItem {
    keyBoardListener;
    constructor(xPos, yPos, image) {
        super(xPos, yPos, image);
        this.keyBoardListener = new KeyboardListener();
    }
}
//# sourceMappingURL=Player.js.map