import Game from './Game.js';
console.log("Is Working!!!");

window.addEventListener('load',
  () => startGame());

document.addEventListener('mousemove', mouseXposYpos, false);

function mouseXposYpos(e: any) {
  const x = e.pageX;
  const y = e.pageY;
  // console.log(x, y);
}

const startGame = (): void => {
  new Game(document.querySelector('#canvas'))
}

// window.addEventListener('load',
//   () => new Game(document.querySelector('#canvas')));

