export function isEqual(date1, date2) {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  return (
    newDate1.getDate() === newDate2.getDate() &&
    newDate1.getMonth() === newDate2.getMonth()
  );
}
