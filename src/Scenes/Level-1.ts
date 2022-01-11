import Bullet from "../Bullet.js";
import Game from "../Game.js";
import Line from "../Line.js";
import Player from "../Player.js";
import Score from "../Score.js";
import ScoringItem from "../ScoringItem.js";
import Virus from "../Virus.js";
import Worm from "../Worm.js";
import GameOver from "./GameOver.js";
import Scene from "./Scene.js";

export default class Level extends Scene {
    private isAlive: boolean;

    private scoringItems: ScoringItem[];

    private player: Player;

    private bullets: Bullet[];

    private score: Score;

    private line: Line;

    private lives: number;

    public constructor(game: Game) {
        super(game);
        console.log('Level 1')
        this.isAlive = false;

        this.scoringItems = [];
        this.bullets = [];
        this.score = new Score();
        this.line = new Line(this.game.canvas)

        // starting value lives
        this.lives = 3;

        this.player = new Player(10, this.game.canvas.height / 4, Game.loadNewImage('../assets/img/tommie.png'))
    }

    /**
     * Handles any user input that has happened since the last call
     */
    public processInput(): void {
        // TODO: check if the score is high enough for a new level

        this.moveItems();

        // Makes new viruses if the random number is equal to 1
        if (Game.randomNumber(1, 20) === 1) {
            this.scoringItems.push(new Virus(
                'rightToLeft',
                this.game.canvas,
                this.game.canvas.width,
                Game.randomNumber(0, this.game.canvas.height - 30),
                Game.loadNewImage('../assets/img/virusSmall.png'),
            ));
            // Makes new Worms if the random number is equal to 1
        } else if (Game.randomNumber(1, 100) === 1) {
            this.scoringItems.push(new Worm(
                'rightToLeft',
                this.game.canvas,
                this.game.canvas.width,
                Game.randomNumber(0, this.game.canvas.height - 30),
                Game.loadNewImage('../assets/img/mworm.png'),
            ));
        }

        this.mouseMove();
        this.bulletCollidesWithVirus();
        this.virusCollidesWithLine();
    }

    /**
  *
  * @returns 'null' if the Scene does not need to proceed to the next one
  */
    public update(elapsed: number): Scene {
        if (this.isAlive) {
            // Proceed to the next screen
            return new GameOver(this.game);
        }
        return null;
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas('Level 1', 25, 50, 40, 'Green', "left");
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 25, 85, 25, "black", "left",);
        this.writeTextToCanvas(`Lives: ${this.lives}`, 25, 110, 25, "black", "left");

        // draw everything
        this.player.draw(ctx);
        this.line.drawLine(ctx);

        if (this.scoringItems.length !== 0) {
            // draw each scoring item
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.draw(ctx);
            });
        }

        if (this.bullets.length !== 0) {
            // draw each bullet
            this.bullets.forEach((bullet) => {
                bullet.draw(ctx);
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
     * When you click a new bullet is added to the bullets array, the bullet will go to you xpos and ypos
     * of your current mouse position
     */
    private mouseMove() {
        let pointerX: number;
        let pointerY: number;
        this.game.canvas.onmousedown = (event) => {
            // current mouse positions
            pointerX = event.pageX;
            pointerY = event.pageY;
            // creates new bullets
            this.bullets.push(new Bullet(pointerX, pointerY, this.game.canvas));
        }
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
                    this.isAlive = true;
                }
                return false;
            }
            return true;
        });
    }
}
