import Game from './Game.js';
console.log("WORKINGGGG!!!");

window.addEventListener('load',
  () => new Game(document.querySelector('#canvas')));

document.addEventListener('mousemove', mouseXposYpos, false);

function mouseXposYpos(e: any) {
  const x = e.pageX;
  const y = e.pageY;
  // console.log(x, y);
}

