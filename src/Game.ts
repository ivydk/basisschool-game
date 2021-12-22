import GameItem from './GameItem.js';
import GameLoop from './GameLoop.js';
import Line from './Line.js';
import Player from './Player.js';
import Rocket from './Rocket.js';
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
        // this.gameLoop.start(this.level);

        this.score = new Score;

        this.line = new Line(this.ctx, this.canvas);

        this.scoringItems = [];

        // add some virusses
        for (let index = 0; index < 10; index++) {
            if (index % 2 === 0) {
                console.log('RightToLeft');
                this.scoringItems.push(
                    // new Rocket('RightToLeft', this.canvas.width, this.canvas.height),
                    // let xPosition = ScoringItem.randomInteger(0, canvasWidth - 200);
                    // const yPosition = ScoringItem.randomInteger(0, canvasHeight - 200)
                    new Rocket(
                        'rightToLeft',
                        this.canvas,
                        // GameItem.randomInteger(0, this.canvas.width - 200),
                        canvas.width,
                        GameItem.randomInteger(0, this.canvas.height - 200),
                        GameItem.loadNewImage('./assets/img/rocket-horizontal.png'),
                    )
                );
            }
        }

        console.log(this.scoringItems)

        this.framecount = 0;

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

        if ((this.framecount % 60) === 0) {
            this.score.setScore(1);
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawPlayer();
        this.drawRockets();

        this.moveRockets();

        this.line.drawLine();

        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 30, 30, 40);
        requestAnimationFrame(this.loop);
    };

    /**
   * Method to draw the Player
   */
    private drawPlayer() {
        this.player.draw(this.ctx);
    }

    private drawRockets() {
        if (this.scoringItems.length !== 0) {
            // draw each scoring item
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.draw(this.ctx);
            });
        }
    }

    private moveRockets() {
        if (this.scoringItems.length !== 0) {
            // draw each scoring item
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.move();
            });
        }
    }
}