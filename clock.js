const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-title");

function timeForm(time) {
  return time < 10 ? "0" + time : time;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${timeForm(hours)}:${timeForm(minutes)}:${timeForm(seconds)}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
