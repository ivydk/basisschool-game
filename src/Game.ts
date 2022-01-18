import GameLoop from './GameLoop.js';
import Start from './Scenes/Start.js';

export default class Game {
  // Necessary canvas attributes
  public readonly canvas: HTMLCanvasElement;

  private gameLoop: GameLoop;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Start the game cycle
    this.gameLoop = new GameLoop();
    this.gameLoop.start(new Start(this));

    console.log('game');

    const backgroundId = document.querySelector('canvas');
    console.log(backgroundId);

    // changes the background
    // document.body.style.backgroundImage = 'url("assets/img/background.jpeg")';
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
   * function to change the background image
   *
   * @param pictureName name of the image in the img folder
   * !! you need to include the filetype
   * !! it searches from the img folder
   */
  public static changeBackgroundImg(pictureName: string) {
    document.body.style.backgroundImage = `url("assets/img/${pictureName}")`
  }

}