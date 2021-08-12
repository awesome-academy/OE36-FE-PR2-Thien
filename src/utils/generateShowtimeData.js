import { SEAT_NUMBER } from "constants/seatsPageConfig";

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export default function generateShowtimeData(showtimeList, duration) {
  let newShowtimeList = [];
  showtimeList.forEach((showtime) => {
    const startDate = new Date(showtime.date);
    const endDate = addMinutes(startDate, duration);
    newShowtimeList.push({
      seatsAvailable: SEAT_NUMBER - showtime.occupied.length,
      startDate: startDate,
      endDate: endDate,
      ...showtime
    });
  });
  return newShowtimeList;
}
