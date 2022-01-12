export default class Scene {
    game;
    constructor(game) {
        this.game = game;
    }
    writeTextToCanvas(text, xPos, yPos, fontSize, color, alignment = 'center') {
        const ctx = this.game.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xPos, yPos);
    }
}
//# sourceMappingURL=Scene.js.map