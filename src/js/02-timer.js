import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let timeLeft;
startBtn.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
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

let interval;
startBtn.addEventListener('click', ev => {
  interval = setInterval(() => {
    let timeLeftObj = convertMs(timeLeft);
    dataDays.innerText = addLeadingZero(timeLeftObj.days);
    dataHours.innerText = addLeadingZero(timeLeftObj.hours);
    dataMinutes.innerText = addLeadingZero(timeLeftObj.minutes);
    dataSeconds.innerText = addLeadingZero(timeLeftObj.seconds);
    timeLeft -= 1000;
  }, 1000);
});
function addLeadingZero(value) {
  if (value.toString().length < 2) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}
