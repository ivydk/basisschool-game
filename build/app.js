import Game from './Game.js';
console.log("Is Working!!!");
window.addEventListener('load', () => startGame());
document.addEventListener('mousemove', mouseXposYpos, false);
function mouseXposYpos(e) {
    const x = e.pageX;
    const y = e.pageY;
}
const startGame = () => {
    new Game(document.querySelector('#canvas'));
};
//# sourceMappingURL=app.js.map