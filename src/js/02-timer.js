import Notiflix from 'notiflix';
import Flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    myInput: document.querySelector('input#datetime-picker'),
    startEl: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
};

let choosenDate = null;
let intervalCounter = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (!selectedDates[0]) {
        refs.startEl.setAttribute('disabled', true);
        Notiflix.Notify.warning('Please choose a Date!');
        return;
      };
      if (selectedDates[0] < Date.now()) {
        refs.startEl.setAttribute('disabled', true);
        Notiflix.Notify.failure('Please choose Date in the future!');
        return;
      }
      choosenDate = selectedDates[0];
      refs.startEl.removeAttribute('disabled');
    },

    };



const fp = Flatpickr(refs.myInput, options);
refs.startEl.disabled = true;

refs.startEl.addEventListener('click', () => {
    startTimer();
    refs.startEl.disabled = true;
  });
  

  function startTimer() {
      intervalCounter = setInterval(() => {
      const difTime = choosenDate - Date.now();
      const { days, hours, minutes, seconds } = convertMs(difTime);
      refs.daysEl.textContent = addLeadingZero(days);
      refs.hoursEl.textContent = addLeadingZero(hours);
      refs.minutesEl.textContent = addLeadingZero(minutes);
      refs.secondsEl.textContent = addLeadingZero(seconds);
  
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(intervalCounter);
        refs.startEl.disabled = false;
        intervalCounter = null;
      }
    }, 1000);
  }

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
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
  
