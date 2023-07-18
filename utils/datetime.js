const getTimeFromMilliseconds = (milliseconds, shouldRound = false) => {
  let seconds;
  if (shouldRound) seconds = Math.ceil(milliseconds  / 1000);
  else seconds = milliseconds / 1000;
  
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  let hours = Math.floor(minutes / 60);
  minutes = minutes - hours * 60;

  return {
    hour: hours,
    minute: minutes,
    second: seconds,
  }
}

const formatTimeFromMilliseconds = (ms) => {
  const timeObj = getTimeFromMilliseconds(ms);

  return `${timeObj.hour} hours, ${timeObj.minute} minutes, ${timeObj.second} seconds`
}

module.exports = {
  getTimeFromMilliseconds,
  formatTimeFromMilliseconds,
}