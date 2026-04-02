setInterval(() => {
  const currentTime: Date = new Date();
  const hours: number = currentTime.getHours();
  const minutes: number = currentTime.getMinutes();
  const seconds: number = currentTime.getSeconds();
  const hour_rotate_angle: number = 30 * hours + minutes / 2;
  (document.getElementById('second') as HTMLElement).style.transform = `rotate(${seconds * 6}deg)`;
  (document.getElementById('minute') as HTMLElement).style.transform = `rotate(${minutes * 6}deg)`;
  (document.getElementById('hour') as HTMLElement).style.transform =
    `rotate(${hour_rotate_angle}deg)`;
}, 1000);
