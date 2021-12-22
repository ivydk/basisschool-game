import GameItem from './GameItem.js';
import Rocket from './Rocket.js';

export default class Line {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private xPosition: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.xPosition = 350;
  }

  public drawLine(): void {
    // set line stroke and line width
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 5;

    // draw a red line
    this.ctx.beginPath();
    this.ctx.moveTo(this.xPosition, 0);
    this.ctx.lineTo(this.xPosition, this.canvas.height);
    this.ctx.stroke();
  }

  /**
  * Method to determine of the player is colliding with a rocket
  *
  * @param gameItems array of Rockets
  */
  public collidesWithRocket(gameItem: GameItem): boolean {
    if (this.xPosition === gameItem.getXPos()) {
      return true
    }
    return false
  };
}
