import Game from "../Game.js";
import Player from "../Player.js";
import Virus from "../Virus.js";
import Worm from "../Worm.js";
import Scene from "./Scene.js";
export default class Level extends Scene {
    isFinished;
    scoringItems;
    player;
    constructor(game) {
        super(game);
        console.log('Level 1');
        this.isFinished = false;
        this.scoringItems = [];
        this.player = new Player(10, this.game.canvas.height / 4, Game.loadNewImage('../assets/img/tommie.png'));
    }
    processInput() {
        this.moveItems();
        if (Game.randomNumber(1, 20) === 1) {
            this.scoringItems.push(new Virus('rightToLeft', this.game.canvas, this.game.canvas.width, Game.randomNumber(0, this.game.canvas.height - 30), Game.loadNewImage('../assets/img/virusSmall.png')));
        }
        else if (Game.randomNumber(1, 100) === 1) {
            this.scoringItems.push(new Worm('rightToLeft', this.game.canvas, this.game.canvas.width, Game.randomNumber(0, this.game.canvas.height - 30), Game.loadNewImage('../assets/img/mworm.png')));
        }
    }
    update(elapsed) {
        if (this.isFinished) {
            return new Level(this.game);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.writeTextToCanvas('Level 1', this.game.canvas.width / 2, this.game.canvas.height / 2, 50, 'black', "center");
        this.player.draw(ctx);
        if (this.scoringItems.length !== 0) {
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.draw(ctx);
            });
        }
    }
    moveItems() {
        if (this.scoringItems.length !== 0) {
            this.scoringItems.forEach((scoringItem) => {
                scoringItem.move();
            });
        }
    }
}
//# sourceMappingURL=Level.js.map