const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

btnStart.addEventListener('click', startShowColor);
btnStop.addEventListener('click', stopShowColor);

//запуск зміни кольору
function startShowColor(evt) {
    timerId = setInterval(changeBgColor, 1000);
    evt.target.disabled = true;
    btnStop.disabletd = false;
}

//стоп зміни кольору 
function stopShowColor(evt) {
    clearInterval(timerId);
    evt.target.disabled = true;
    btnStart.disabled = false;
}

//ф-ція зміни кольору body
function changeBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

//випадкове значення кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}