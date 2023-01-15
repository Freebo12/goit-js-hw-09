//import library
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

//Dom_elements
const btnJs = document.querySelector('button');
const inputJs = document.querySelector('input');
//Value_timer
const dayJs = document.querySelector('span[data-days]');
const hoursJs = document.querySelector('span[data-hours]');
const minutesJs = document.querySelector('span[data-minutes]');
const secondsJs = document.querySelector('span[data-seconds]');
let timerId = null;

btnJs.disabled = true;
// flatpickr and options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let date = new Date();

    // console.log(selectedDates[0]);
    if (selectedDates[0] < date) {
      Notiflix.Report.failure('Please choose a date in the future', '', 'Ok');
    } else {
      btnJs.disabled = false;
    }
  },
};
const fp = flatpickr(inputJs, options);

//action
inputJs.addEventListener('input', onChoose);
btnJs.addEventListener('click', onClick);

//functions
function onChoose() {
  fp;
}

function onClick() {
  const selectDate = fp.selectedDates[0];
  timerId = setInterval(() => {
    let date = new Date();
    const timerDown = selectDate - date;
    btnJs.disabled = true;

    if (timerDown < 0) {
      clearInterval(timerId);
      return;
    }

    updateTimerFace(convertMs(timerDown));
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  dayJs.textContent = addLeadingZero(days);
  hoursJs.textContent = addLeadingZero(hours);
  minutesJs.textContent = addLeadingZero(minutes);
  secondsJs.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//
