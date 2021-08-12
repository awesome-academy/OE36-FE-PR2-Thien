import { SEAT_NUMBER } from "constants/seatsPageConfig";
import getTime from "./getTime";

export default function getShowtimeItem(data) {
  return {
    ...data,
    seatsAvailable: SEAT_NUMBER - data.occupied.length,
    date: data.startDate,
    time: getTime(data.startDate),
  };
}
