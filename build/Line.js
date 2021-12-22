export default class Line {
    canvas;
    ctx;
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
    }
    drawLine() {
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(350, 0);
        this.ctx.lineTo(350, this.canvas.height);
        this.ctx.stroke();
    }
}
//# sourceMappingURL=Line.js.map