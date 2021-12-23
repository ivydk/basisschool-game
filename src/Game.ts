import GameItem from './GameItem.js';
import GameLoop from './GameLoop.js';
import Line from './Line.js';
import Player from './Player.js';
import Virus from './Virus.js';
import Score from './Score.js';
import ScoringItem from './ScoringItem.js';

export default class Game {
  // Necessary canvas attributes
  public readonly canvas: HTMLCanvasElement;

  public readonly ctx: CanvasRenderingContext2D;

  private gameLoop: GameLoop;

  private player: Player;

  private score: Score;

  private framecount: number;

  private scoringItems: ScoringItem[];

  private line: Line;

  private lives: number;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Start the game cycle
    this.gameLoop = new GameLoop();

    this.score = new Score;

    this.line = new Line(this.ctx, this.canvas);

    this.scoringItems = [];

    console.log(this.scoringItems)

    this.framecount = 0;

    this.lives = 3;

    this.player = this.insertPlayer();
    this.loop();
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param fontSize - Font size in pixels
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param alignment - Where to align the text
   * @param color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'left',
    color: string = 'black',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Method to load an image
   *
   * @param source the source
   * @returns HTMLImageElement - returns an image
   */
  public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Returns a random number between min and max
   *
   * @param min - lower boundary
   * @param max - upper boundary
   * @returns a random number between min and max
   */
  public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }


  private insertPlayer(): Player {
    const image = Game.loadNewImage('./assets/img/tommie.png');
    return new Player(10, this.canvas.height / 4, image);
  }

  /**
 * Draws all the necessary elements to the canvas
 */
  private loop = () => {
    this.framecount += 1;

    this.mouseMove();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawPlayer();
    this.drawVirus();
    this.createVirusAtInterval();

    this.moveVirusses();

    this.line.drawLine();

    this.virusCollidesWithLine();

    this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 30, 30, 40);

    this.writeTextToCanvas(`Lives: ${this.lives}`, 30, 120, 600);
    requestAnimationFrame(this.loop);
  };

  /**
 * Method to draw the Player
 */
  private drawPlayer() {
    this.player.draw(this.ctx);
  }

  private drawVirus() {
    if (this.scoringItems.length !== 0) {
      // draw each scoring item
      this.scoringItems.forEach((scoringItem) => {
        scoringItem.draw(this.ctx);
      });
    }
  }

  private moveVirusses() {
    if (this.scoringItems.length !== 0) {
      // draw each scoring item
      this.scoringItems.forEach((scoringItem) => {
        scoringItem.move();
      });
    }
  }

  private virusCollidesWithLine() {
    // create a new array with scoring items that are still on the screen
    this.scoringItems = this.scoringItems.filter((element) => {
      // check if the player is over (collided with) the garbage item.
      if (this.line.collidesWithRocket(element)) {
        // Do not include this item.
        this.lives -= 1;
        return false;
      }
      return true;
    });
  }

  private createVirusAtInterval() {
    if (this.framecount % 35 === 0) {
      this.scoringItems.push(
        new Virus(
          'rightToLeft',
          this.canvas,
          this.canvas.width,
          GameItem.randomInteger(0, this.canvas.height - 30),
          GameItem.loadNewImage('./assets/img/virusSmall.png'),
        )
      );
    }
  }

  /**
   *
   * @param other the other object
   * @returns `true` if the player is on a G
   */
  public isVirusHit(other: ScoringItem, xPos: number, yPos: number): boolean {
    return xPos < other.getXPos() + other.getImage().width
      && xPos > other.getXPos()
      && yPos < other.getYPos() + other.getImage().height
      && yPos > other.getYPos();
  }

  private mouseMove() {
    let pointerX: number;
    let pointerY: number;
    this.canvas.onmousedown = (event) => {
      pointerX = event.pageX;
      pointerY = event.pageY;
      console.log(`x: ${pointerX}, y: ${pointerY}`);

      this.scoringItems = this.scoringItems.filter((element) => {
        // check if the player is over (collided with) the garbage item.
        if (this.isVirusHit(element, pointerX, pointerY)) {
          console.log('hit');
          this.score.setScore(10);
          // Do not include this item.
          return false;
        }
        return true;
      });
    }
  }

  private isPlayerDead() {
    if (this.lives < 0) {
      this.gameLoop.isInState(GameLoop.STATE_IDLE);
    }
  }
}
