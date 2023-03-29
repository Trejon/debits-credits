export const displayTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';
  if (hours > 12) {
    hours = hours - 12;;
  }

  const time = `${hours}:${minutes}:${seconds} ${ampm}`;
  console.log("Someone is hitting the api at:", time);
}