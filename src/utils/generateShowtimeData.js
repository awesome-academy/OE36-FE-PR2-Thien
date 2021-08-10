export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export default function generateShowtimeData(cinemas, cinemaName, duration) {
  let showtimeList = [];
  const cinemaData = cinemas?.find((cinema) => cinema.cinemaName === cinemaName);
  cinemaData?.showtime?.forEach((showtime, index) => {
    const startDate = new Date(Number(showtime.date));
    const endDate = addMinutes(startDate, duration);
    showtimeList.push({
      seatsAvailable: showtime.seatsAvailable,
      occupied: showtime.occupied,
      startDate: startDate,
      endDate: endDate,
      room: showtime.room,
      id: index,
    });
  });
  return showtimeList;
}
