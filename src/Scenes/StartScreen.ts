import Game from '../Game.js';
import KeyListener from '../KeyListener.js';
import Level from './Level1.js';
import Scene from './Scene.js';

export default class Start extends Scene {
    private keyListener: KeyListener;

    private finished: boolean;

    /**
     * l
     *
     * @param game l
     */
    public constructor(game: Game) {
        super(game);
        this.keyListener = new KeyListener();
        this.finished = false;
    }

    /**
     * l
     */
    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.finished = true;
            // this.game.user.resetScore();
        }
    }

    /**
     * l
     *
     * @returns l
     */
    public update(): Scene {
        this.render();
        // if (this.finished){ return new Level(this.game)};
        if (this.finished) {
            console.log('next please?!')
        }
        return null;
    }

    /**
     * b
     */
    public render(): void {
        const ctx = this.game.canvas.getContext('2d');
        // Clear the screen
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.game.writeTextToCanvas('LETS GO GAMING', this.game.canvas.width / 2, 100, 50);
        this.game.writeTextToCanvas('Press Enter to play', this.game.canvas.width / 2, 150, 20);
    }
}