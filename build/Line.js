export default class Line {
    canvas;
    ctx;
    xPosition;
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = 350;
    }
    drawLine() {
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(this.xPosition, 0);
        this.ctx.lineTo(this.xPosition, this.canvas.height);
        this.ctx.stroke();
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