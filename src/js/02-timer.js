import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

//вибираю елементи вікна
const userDate = document.querySelector('#datetime-picker');
const valueNumber = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

//другий аргумент для функції  flatpickr(selector, options)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
        btnStart.disabled = true;
    } else {
        btnStart.disabled = false;
    }
  },
};

//додаємо календар у поле userDate
flatpickr(userDate, options);


// Для підрахунку значень використовуй готову функцію convertMs,
// де ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  // кількість мілісекунд
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // дні
  const days = Math.floor(ms / day);
  // години
  const hours = Math.floor((ms % day) / hour);
  // Rхвилини
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // секунди
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//додає 0 перед цифрою
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countDown = new Date(userDate.value) - new Date();
    btnStart.disabled = true;
    if (countDown >= 0) {
      let timeObj = convertMs(countDown);
      // console.log(timeObj)
      days.textContent = addLeadingZero(timeObj.days)
      hours.textContent = addLeadingZero(timeObj.hours)
      minutes.textContent = addLeadingZero(timeObj.minutes)
      seconds.textContent = addLeadingZero(timeObj.seconds)
      if (countDown <= 10000) {
        seconds.style.color = 'red';
      } 
      if (countDown <= 1000) {
        seconds.style.color = 'black';
        clearInterval(timer)
        Notiflix.Notify.success('Congratulations! The countdown is over');
      }
    }
  })
})