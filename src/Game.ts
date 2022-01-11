import GameItem from './GameItem.js';
import GameLoop from './GameLoop.js';
import Line from './Line.js';
import Player from './Player.js';
import Virus from './Virus.js';
import Score from './Score.js';
import ScoringItem from './ScoringItem.js';
import Bullet from './Bullet.js';
import Worm from './Worm.js';

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

  private bullets: Bullet[];

  private alive: boolean;

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
    this.bullets = [];

    console.log(this.scoringItems)

    // Starting values
    this.framecount = 0;
    this.lives = 3;
    this.alive = true;

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

  /**
   * create a Player
   */
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

    this.draw();
    this.createScoringItemAtInterval();

    this.moveItems();

    this.line.drawLine();

    this.virusCollidesWithLine();

    this.bulletCollidesWithVirus();

    this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 30, 30, 40);

    this.writeTextToCanvas(`Lives: ${this.lives}`, 30, 120, 600);

    if (this.alive === false) {
      this.writeTextToCanvas('Je hebt nu een virus ;)', 50, this.canvas.width / 2 + this.canvas.width / 8, this.canvas.height / 2, 'center');
      console.log('dood');
    } else {
      requestAnimationFrame(this.loop);
    }
  };

  /**
 * Method to draw the Player
 */
  private draw() {
    this.player.draw(this.ctx);

    if (this.scoringItems.length !== 0) {
      // draw each scoring item
      this.scoringItems.forEach((scoringItem) => {
        scoringItem.draw(this.ctx);
      });
    }

    if (this.bullets.length !== 0) {
      // draw each scoring item
      this.bullets.forEach((bullet) => {
        bullet.draw(this.ctx);
      });
    }
  }

  /**
   * moves the scoringItems
   */
  private moveItems() {
    if (this.scoringItems.length !== 0) {
      // draw each scoring item
      this.scoringItems.forEach((scoringItem) => {
        scoringItem.move();
      });
    }

    if (this.bullets.length !== 0) {
      // draw each scoring item
      this.bullets.forEach((bullet) => {
        bullet.move();
      });
    }
  }

  /**
   *
   */
  private virusCollidesWithLine() {
    // create a new array with scoring items that are still on the screen
    this.scoringItems = this.scoringItems.filter((element) => {
      // check if the player is over (collided with) the garbage item.
      if (this.line.collidesWithRocket(element)) {
        // Do not include this item.
        if (this.lives > 0) {
          this.lives -= 1;
        } else {
          this.alive = false;
        }
        return false;
      }
      return true;
    });
  }


  /**
   * collidesWithVirus(element) = 'true', removes the item from the array
   */
  private bulletCollidesWithVirus() {
    if (this.bullets.length !== 0) {
      // draw each scoring item
      this.bullets.forEach((bullet) => {
        // create a new array with scoring items that are still on the screen
        this.scoringItems = this.scoringItems.filter((element) => {
          // check if the player is over (collided with) the garbage item.
          if (bullet.collidesWithVirus(element)) {
            // Do not include this item.
            this.score.setScore(1);
            return false;
          }
          return true;
        });
      });
    }
  }

  private createScoringItemAtInterval() {
    const randomNumber = GameItem.randomInteger(1, 3)

    if (this.framecount % 35 === 0) {
      if (randomNumber === 1 || randomNumber === 2) {
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

      if (randomNumber === 3) {
        this.scoringItems.push(
          new Worm(
            'rightToLeft',
            this.canvas,
            this.canvas.width,
            GameItem.randomInteger(0, this.canvas.height - 30),
            GameItem.loadNewImage('./assets/img/mworm.png'),
          )
        );
      }
    }
  }

  private mouseMove() {
    let pointerX: number;
    let pointerY: number;
    this.canvas.onmousedown = (event) => {
      pointerX = event.pageX;
      pointerY = event.pageY;
      this.bullets.push(new Bullet(pointerX, pointerY, this.canvas));
    }
  }
}
