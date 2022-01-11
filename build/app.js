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
const probeersel = 7;
//# sourceMappingURL=app.js.map