export const displayTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let minutesString: string = minutes.toString();
  let secondsString: string = seconds.toString();

  const ampm = hours >= 12 ? 'pm' : 'am';

  if (hours > 12) {
    hours = hours - 12;;
  }

  if (minutes < 10) {
    minutesString = '0' + minutes;
  }

  if (seconds < 10) {
    secondsString = '0' + seconds;
  }

  const time = `${hours}:${minutesString}:${secondsString} ${ampm}`;
  console.log("Someone is hitting the api at:", time);
}