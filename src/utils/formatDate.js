export default function formatDate(time) {
  const newDate = new Date(Number(time));
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  return `${date < 10 ? "0" + date : date}/${
    month < 10 ? "0" + month : month
  }/${year}`;
}
