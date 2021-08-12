export default function getTime(date) {
  const newDate = new Date(date)
  const hour = newDate.getHours();
  const mins = newDate.getMinutes();
  return `${hour < 10 ? "0" + hour : hour}:${mins < 10 ? "0" + mins : mins}`;
}
