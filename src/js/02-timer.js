import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

// ============================================================================//
const inptEl = document.querySelector('#datetime-picker');

const buttonDateStart = document.querySelector('.button-start');

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let deadLine;

buttonDateStart.disabled = true;

// ============================================================================//
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < new Date()) {
      alert('Please choose a date in the future');
      return;
    }
    buttonDateStart.disabled = false;
    console.log(selectedDates);

    deadLine = selectedDates;
  },
};

flatpickr(inptEl, options);
// ============================================================================//
buttonDateStart.addEventListener('click', startTimer);

function startTimer() {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = deadLine - currentTime;
    const { days, hours, minutes, seconds } = convertMs(diff);
    daysTimer.textContent = addLeadingZero(days);
    hoursTimer.textContent = addLeadingZero(hours);
    minutesTimer.textContent = addLeadingZero(minutes);
    secondsTimer.textContent = addLeadingZero(seconds);
    if (diff < 1000) {
      clearInterval(intervalId);
      alert('Congratulation');
    }
  }, 1000);
}
// ============================================================================//
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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
