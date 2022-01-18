import Bullet from "../Bullet.js";
import Game from "../Game.js";
import GameItem from "../GameItem.js";
import Line from "../Line.js";
import Player from "../Player.js";
import Score from "../Score.js";
import ScoringItem from "../ScoringItem.js";
import Virus from "../Virus.js";
import Worm from "../Worm.js";
import GameOver from "./GameOver.js";
import Scene from "./Scene.js";
import TrojanHorse from "../TrojanHorse.js";
import Spy from "../Spy.js";
import Coin from "../Coin.js";
import Coins from "../Coins.js";

export default class Level extends Scene {
    protected isAlive: boolean;

    private scoringItems: ScoringItem[];

    private player: Player;

    private bullets: Bullet[];

    protected score: Score;

    protected coins: Coins;

    private line: Line;

    protected lives: number;

    protected currentLevel: number;

    // bullets you get each level
    protected maxBullets: number;

    // how many points needed to level up
    protected pointsToLevelUp: number;

    private bulletsShot: number;

    public constructor(game: Game, score: Score, coins: Coins, lives: number) {
        super(game);
        console.log('Level 1')
        this.isAlive = false;

        this.scoringItems = [];
        this.bullets = [];
        this.score = score;
        this.coins = coins;
        this.line = new Line(this.game.canvas);

        // keeps track of the maximum bullets that you can shoot and how many you have already shot
        this.bulletsShot = 0;

        // starting value lives
        this.lives = lives;

        this.player = new Player(10, this.game.canvas.height / 4, Game.loadNewImage('assets/img/player_boy.png'))
    }

    /**
     * Handles any user input that has happened since the last call
     */
    public processInput(): void {

        this.moveItems();

        // Makes new viruses if the random number is equal to 1
        if (Game.randomNumber(1, 20) === 1) {
            this.scoringItems.push(new Virus(
                'rightToLeft',
                this.game.canvas,
                this.game.canvas.width,
                Game.randomNumber(0, this.game.canvas.height - 30),
                Game.loadNewImage('assets/img/virusSmall.png'),
            ));
            // Makes new Worms if the random number is equal to 1
        } else if (Game.randomNumber(1, 100) === 1 && this.currentLevel >= 2) {
            this.scoringItems.push(new Worm(
                'rightToLeft',
                this.game.canvas,
                this.game.canvas.width,
                Game.randomNumber(0, this.game.canvas.height - 30),
                Game.loadNewImage('assets/img/mworm.png'),
            ));
        } else if (Game.randomNumber(1, 100) === 1 && this.currentLevel > 0) {
            this.scoringItems.push(new TrojanHorse(
                'rightToLeft',
                this.game.canvas,
                this.game.canvas.width,
                GameItem.randomInteger(0, this.game.canvas.height - 30),
                GameItem.loadNewImage('assets/img/TrojanHorse.png'),
            ));
        } else if (Game.randomNumber(1, 300) === 1 && this.currentLevel >= 4) {
            this.scoringItems.push(new Spy(
                'rightToLeft',
                this.game.canvas,
                800,
                GameItem.randomInteger(0, this.game.canvas.height - 30),
                GameItem.loadNewImage('assets/img/spy.png'),
            ));
        } else if (Game.randomNumber(1, 100) === 1 && this.currentLevel > 0) {
            this.scoringItems.push(new Coin(
                'rightToLeft',
                this.game.canvas,
                this.game.canvas.width,
                GameItem.randomInteger(0, this.game.canvas.height - 30),
                GameItem.loadNewImage('assets/img/coin.png'),
            ));
        }

        this.mouseClick();
        this.bulletCollidesWithVirus();
        this.virusCollidesWithLine();
        this.deleteBulletWhenHit();
    }

    /**
  *
  * @returns 'null' if the Scene does not need to proceed to the next one
  */
    public update(elapsed: number): Scene {
        return null
    }

    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.writeTextToCanvas(`Level ${this.currentLevel}`, 25, 50, 40, 'Green', "left");
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 25, 85, 25, "white", "left",);
        this.writeTextToCanvas(`Lives: ${this.lives}`, 25, 110, 25, "white", "left");
        this.writeTextToCanvas(`Bullets left: ${this.maxBullets - this.bulletsShot}`, 25, 135, 25, "white", "left");
        this.writeTextToCanvas(`Coins: ${this.coins.getCoins()}`, 25, 160, 25, "white", "left",);

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
    private mouseClick() {
        let pointerX: number;
        let pointerY: number;
        this.game.canvas.onmousedown = (event) => {
            // current mouse positions
            pointerX = event.pageX;
            pointerY = event.pageY;
            // creates new bullets
            if (this.bulletsShot < this.maxBullets) {
                this.bulletsShot += 1;
                this.bullets.push(new Bullet(pointerX, pointerY, this.game.canvas));
            }
        }
    }

    /**
     * When the bullet collides with the virus
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

                        // sets the isHit variable from bullet to `true`
                        bullet.setIsHit();

                        // checks if the element is a trojan horse
                        // TODO: hier moeten meerdere virussen komen op ongeveer dezelfde plaats
                        if (element instanceof TrojanHorse) {
                            console.log(element.getLives());
                            element.subtractLivesWhenHit();
                            if (element.isDead()) {
                                return false
                            }
                            return true;
                        }

                        // Checks if the element is a spy
                        if (element instanceof Spy) {
                            element.subtractLivesWhenHit();
                            if (element.isDead()) {
                                return false
                            }
                            return true;
                        }

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

    private deleteBulletWhenHit() {
        this.bullets = this.bullets.filter((element) => {
            // check if the player is over (collided with) the garbage item.
            if (element.IsHit()) {
                return false;
            }
            return true;
        });
    }
}
