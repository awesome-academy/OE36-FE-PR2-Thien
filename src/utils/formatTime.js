export default function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
}
