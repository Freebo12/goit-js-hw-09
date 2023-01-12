//Dom Elements
const btnJsStart = document.querySelector('button[data-start]');
const btnJsStop = document.querySelector('button[data-stop]');
const bodyJs = document.querySelector('body');

let timerId = null;

//function randomColor
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//event click
btnJsStart.addEventListener('click', onClick);
btnJsStop.addEventListener('click', offClick);
btnJsStop.disabled = true;

//Start_click
function onClick() {
  timerId = setInterval(() => {
    bodyJs.style.backgroundColor = getRandomHexColor();
  }, 1000);

  if ((btnJsStart.disabled = true)) {
    btnJsStop.disabled = false;
  }
}
//Stop_click
function offClick() {
  if ((btnJsStart.disabled = false)) {
    btnJsStop.disabled = true;
  }
  btnJsStop.disabled = true;
  clearInterval(timerId);
}
