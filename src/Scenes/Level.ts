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
import CoinPoints from "../CoinPoints.js";

export default class Level extends Scene {
    // how many points per level to levelUp
    public static readonly SCORE_TO_LEVEL_UP_ARRAY = [null, 50, 150, 300, 500];


    protected isAlive: boolean;

    private scoringItems: ScoringItem[];

    private player: Player;

    private bullets: Bullet[];

    protected character: HTMLImageElement

    private toSpawn: ScoringItem[];

    protected score: Score;

    protected coinPoints: CoinPoints;

    private line: Line;

    protected lives: number;

    protected currentLevel: number;

    // bullets you get each level
    protected maxBullets: number;

    // how many points needed to level up
    protected pointsToLevelUp: number;

    private bulletsShot: number;

    public constructor(game: Game, score: Score, coins: CoinPoints, lives: number, character: HTMLImageElement) {
        super(game);
        console.log('Level 1')
        this.isAlive = false;

        this.scoringItems = [];
        this.bullets = [];
        this.score = score;
        this.character = character;
        this.coinPoints = coins;
        this.line = new Line(this.game.canvas);

        // keeps track of the maximum bullets that you can shoot and how many you have already shot
        this.bulletsShot = 0;

        // starting value lives
        this.lives = lives;

        this.toSpawn = [];

        this.player = new Player(10, this.game.canvas.height / 4, this.character)
    }

    /**
     * Handles any user input that has happened since the last call
     */
    public processInput(): void {

        this.moveItems();

        // Makes new viruses if the random number is equal to 1
        if (Game.randomNumber(1, 40) === 1) {
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
        } else if (Game.randomNumber(1, 400) === 1 && this.currentLevel >= 3) {
            this.scoringItems.push(new TrojanHorse(
                'rightToLeft',
                this.game.canvas,
                this.game.canvas.width,
                GameItem.randomInteger(0, this.game.canvas.height - 75),
                GameItem.loadNewImage('assets/img/TrojanHorse.png'),
            ));
        } else if (Game.randomNumber(1, 300) === 1 && this.currentLevel >= 4) {
            this.scoringItems.push(new Spy(
                'rightToLeft',
                this.game.canvas,
                800,
                GameItem.randomInteger(0, this.game.canvas.height - 72),
                GameItem.loadNewImage('assets/img/spy.png'),
            ));
        }
        if (Game.randomNumber(1, 150) === 1) {
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

        this.writeTextToCanvas(`Level ${this.currentLevel}`, 25, 50, 40, 'white', "left");
        this.writeTextToCanvas(`Score: ${this.score.getScore()}`, 25, 85, 25, "white", "left",);
        this.writeTextToCanvas(`Levens: ${this.lives}`, 25, 110, 25, "white", "left");
        this.writeTextToCanvas(`Kogels over: ${this.maxBullets - this.bulletsShot}`, 25, 135, 25, "white", "left");
        this.writeTextToCanvas(`Munten: ${this.coinPoints.getCoins()}`, 25, 160, 25, "white", "left",);

        // How many point till level up
        this.writeTextToCanvas(`${Level.SCORE_TO_LEVEL_UP_ARRAY[this.currentLevel] - this.score.getScore()}`, this.game.canvas.width - 25, 50, 40, "white", "right");

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

                        // if the element is a coin the points should not go up
                        if (!(element instanceof Coin)) {
                            this.score.setScore(1);
                        } else {
                            this.coinPoints.setCoins(1);
                        }

                        // sets the isHit variable from bullet to `true`
                        bullet.setIsHit();

                        // checks if the element is a trojan horse
                        if (element instanceof TrojanHorse) {
                            // You need to shoot it three times so you get 2 more points
                            this.score.setScore(2);
                            console.log(element.getLives());
                            element.subtractLivesWhenHit();
                            if (element.isDead()) {
                                // if the horse is shot, it will create three new viruses
                                this.toSpawn.push(new Virus(
                                    'rightToLeft',
                                    this.game.canvas,
                                    element.getXPos(),
                                    element.getYPos() + 50,
                                    Game.loadNewImage('assets/img/virusSmall.png'),
                                ));
                                this.toSpawn.push(new Virus(
                                    'rightToLeft',
                                    this.game.canvas,
                                    element.getXPos(),
                                    element.getYPos() - 50,
                                    Game.loadNewImage('assets/img/virusSmall.png'),
                                ));
                                this.toSpawn.push(new Virus(
                                    'rightToLeft',
                                    this.game.canvas,
                                    element.getXPos(),
                                    element.getYPos(),
                                    Game.loadNewImage('assets/img/virusSmall.png'),
                                ));
                                return false
                            }
                            return true;
                        }

                        // Checks if the element is a spy
                        if (element instanceof Spy) {
                            // you need to shoot it 2 times so you get 1 more point
                            element.subtractLivesWhenHit();
                            if (element.isDead()) {
                                this.score.setScore(1);
                                return false
                            }
                            return true;
                        }

                        return false;
                    }
                    return true;
                });
                this.scoringItems = this.scoringItems.concat(this.toSpawn);

                this.toSpawn = [];
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
                if (element instanceof Coin) {
                    return false;
                } else {
                    if (this.lives > 0) {
                        this.lives -= 1;
                    } else {
                        this.isAlive = true;
                    }
                    return false;
                }
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
