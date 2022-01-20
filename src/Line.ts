import GameItem from './GameItem.js';
import Virus from './Virus.js';

export default class Line {
  private canvas: HTMLCanvasElement;

  private xPosition: number;

  public color: string;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.xPosition = 350;
    if (this.color != 'red') {
      this.color = 'white';
    };
  }

  public drawLine(ctx: CanvasRenderingContext2D): void {
    // set line stroke and line width
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(this.xPosition, 0);
    ctx.lineTo(this.xPosition, this.canvas.height);
    ctx.stroke();
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
