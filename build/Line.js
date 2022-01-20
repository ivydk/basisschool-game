export default class Line {
    canvas;
    xPosition;
    color;
    constructor(canvas) {
        this.canvas = canvas;
        this.xPosition = 350;
        if (this.color != 'red') {
            this.color = 'white';
        }
        ;
    }
    drawLine(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(this.xPosition, 0);
        ctx.lineTo(this.xPosition, this.canvas.height);
        ctx.stroke();
    }
    collidesWithRocket(gameItem) {
        if (this.xPosition === gameItem.getXPos()) {
            return true;
        }
        return false;
    }
    ;
}
//# sourceMappingURL=Line.js.map