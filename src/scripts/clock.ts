const secondEl = document.getElementById('second');
const minuteEl = document.getElementById('minute');
const hourEl = document.getElementById('hour');

if (secondEl && minuteEl && hourEl) {
  setInterval(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const hourRotateAngle = 30 * hours + minutes / 2;
    secondEl.style.transform = `rotate(${seconds * 6}deg)`;
    minuteEl.style.transform = `rotate(${minutes * 6}deg)`;
    hourEl.style.transform = `rotate(${hourRotateAngle}deg)`;
  }, 1000);
}
