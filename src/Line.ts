import GameItem from './GameItem.js';

export default class Line {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  public drawLine(): void {
    // set line stroke and line width
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 5;

    // draw a red line
    this.ctx.beginPath();
    this.ctx.moveTo(350, 0);
    this.ctx.lineTo(350, this.canvas.height);
    this.ctx.stroke();
  }
}