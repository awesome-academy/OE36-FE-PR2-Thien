import { SEAT_NUMBER } from "constants/seatsPageConfig";
import getTime from "./getTime";

export default function getShowtimeItem(data) {
  return {
    room: data.room,
    seatsAvailable: SEAT_NUMBER - data.occupied.length,
    date: data.startDate.getTime(),
    occupied: data.occupied,
    time: getTime(data.startDate),
    id: data.id
  };
}
