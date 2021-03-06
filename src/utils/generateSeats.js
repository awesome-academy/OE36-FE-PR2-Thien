import { ROW_NAME } from "constants/stringMap";
import {
  ROW_LENGTH,
  SEAT_NUMBER,
  STATUS_AVAILABLE,
  STATUS_OCCUPIED,
  TYPE_REGULAR,
  TYPE_VIP,
} from "../constants/seatsPageConfig";

export default function generateSeats(occupied = [3, 5, 9]) {
  let seatMap = [];
  for (let index = 0; index < SEAT_NUMBER; index++) {
    let seat = { id: index, status: STATUS_AVAILABLE, type: TYPE_REGULAR };
    const seatRow = Math.floor(index / ROW_LENGTH);
    const seatPos = index - ROW_LENGTH * seatRow;

    if (occupied.includes(index)) {
      seat.status = STATUS_OCCUPIED;
    }

    if (seatRow > 0 && seatRow < 4 && seatPos > 1 && seatPos < 6) {
      seat.type = TYPE_VIP;
    }

    seat.name = ROW_NAME[seatRow] + seatPos;
    seatMap.push(seat);
  }
  return seatMap;
}

export function generateSeatsData() {
  let seats = [];
  for (let index = 0; index < SEAT_NUMBER; index++) {
    let seat = { id: index };
    const seatRow = Math.floor(index / ROW_LENGTH);
    const seatPos = index - ROW_LENGTH * seatRow;
    seat.name = ROW_NAME[seatRow] + seatPos;
    seats.push(seat);
  }
  return seats;
}