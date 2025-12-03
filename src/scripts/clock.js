setInterval(() => {
  var currentTime = new Date();
  let hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  let hour_rotate_angle = 30 * hours + minutes / 2;
  document.getElementById('second').style.transform = `rotate(${seconds * 6}deg)`;
  document.getElementById('minute').style.transform = `rotate(${minutes * 6}deg)`;
  document.getElementById('hour').style.transform = `rotate(${hour_rotate_angle}deg)`;
}, 1000);
