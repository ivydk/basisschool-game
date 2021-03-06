export default class GameItem {
    xPosition;
    yPosition;
    image;
    constructor(xPos, yPos, image) {
        this.xPosition = xPos;
        this.yPosition = yPos;
        this.image = image;
    }
    getImage() {
        return this.image;
    }
    setImage(image) {
        this.image = image;
    }
    getXPos() {
        return this.xPosition;
    }
    setXPos(xPos) {
        this.xPosition = xPos;
    }
    getYPos() {
        return this.yPosition;
    }
    setYPos(yPos) {
        this.yPosition = yPos;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=GameItem.js.map