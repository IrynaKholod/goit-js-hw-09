const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
let timerId = null;
refs.stopBtn.disabled = true;

  refs.startBtn.addEventListener("click", () => {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    timerId = setInterval(() => {
      let color = getRandomHexColor();
      refs.body.style.background = color;
    }, 1000);
  });
  
  
  refs.stopBtn.addEventListener("click", () => {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearTimeout(timerId);

    });

    