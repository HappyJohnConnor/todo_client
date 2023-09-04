export function displayAlert(todoItem) {
  alert(todoItem.text);
}

export function convertTextToDate(date, timetext) {
  date.setHours(timetext.substr(0, 2));
  date.setMinutes(timetext.substr(-2, 2));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export function setSecondsToZero(date) {
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export function toStringDatetime(date) {
  /*
    convert datetime to string like "Sep 9 12:10"
    */
  const datetext = date.toDateString().substr(4, 6);
  const timetext = date.toTimeString().substr(0, 5);
  const datetimeText = `${datetext} ${timetext}`;
  return datetimeText;
}
