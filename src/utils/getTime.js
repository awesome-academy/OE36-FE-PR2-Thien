export default function getTime(date) {
  const hour = date.getHours();
  const mins = date.getMinutes();
  return `${hour < 10 ? "0" + hour : hour}:${mins < 10 ? "0" + mins : mins}`;
}
