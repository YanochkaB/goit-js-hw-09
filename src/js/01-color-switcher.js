const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

btnStart.addEventListener('click', startShowColor);
btnStop.addEventListener('click', stopShowColor);

//запуск зміни кольору
function startShowColor(evt) {
    timerId = setInterval(changeBgColor, 1000);
    evt.target.disablet = true;
    btnStop.disablet = false;
}

//стоп зміни кольору 
function stopShowColor(evt) {
    clearInterval(timerId);
    evt.target.disablet = true;
    btnStart.disablet = false;
}

//ф-ція зміни кольору body
function changeBgColor() {
    document.body.style.background = getRandomHexColor();
}

//випадкове значення кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}