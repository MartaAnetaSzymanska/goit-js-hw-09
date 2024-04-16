import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let timeLeft;
let interval;

startBtn.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else if (interval) {
      clearInterval(interval);
      startBtn.removeAttribute('disabled');
      timeLeft = selectedDates[0] - new Date();
    } else {
      startBtn.removeAttribute('disabled');
      timeLeft = selectedDates[0] - new Date();
    }
  },
};
const fp = flatpickr(input, options);

// -------------- TIMER --------------------

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

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

startBtn.addEventListener('click', ev => {
  interval = setInterval(() => {
    let timeLeftObj = convertMs(timeLeft);
    dataDays.innerText = addLeadingZero(timeLeftObj.days);
    dataHours.innerText = addLeadingZero(timeLeftObj.hours);
    dataMinutes.innerText = addLeadingZero(timeLeftObj.minutes);
    dataSeconds.innerText = addLeadingZero(timeLeftObj.seconds);
    if (timeLeft >= 1000) {
      timeLeft -= 1000;
    } else {
      interval = 0;
    }
  }, 1000);
});
function addLeadingZero(value) {
  if (value.toString().length < 2) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}
