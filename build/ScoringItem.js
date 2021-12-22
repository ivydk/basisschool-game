import GameItem from './GameItem.js';
export default class ScoringItem extends GameItem {
    points;
    constructor(points, xPosition, yPosition, image) {
        super(xPosition, yPosition, image);
        this.points = points;
    }
    getPoints() {
        return this.points;
    }
}
//# sourceMappingURL=ScoringItem.js.map