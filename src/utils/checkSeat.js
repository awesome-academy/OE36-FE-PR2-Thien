import { TYPE_REGULAR, TYPE_VIP } from "constants/seatsPageConfig";

function countSeat(seatsArray = [], type) {
  let count = 0;
  for (let seat of seatsArray) {
    if (seat.type === type) count++;
  }
  return count;
}

export function checkSeatRange(offer, newSeatType) {
  const regularNumber = countSeat(offer.seats, TYPE_REGULAR);
  const VIPNumber = countSeat(offer.seats, TYPE_VIP);
  return (
    regularNumber <= offer.regularNumber - (newSeatType === TYPE_REGULAR) &&
    VIPNumber <= offer.VIPNumber - (newSeatType === TYPE_VIP)
  );
}

export function checkSeatRemain(offer) {
  const regularNumber = countSeat(offer.seats, TYPE_REGULAR);
  const VIPNumber = countSeat(offer.seats, TYPE_VIP);
  return regularNumber === offer.regularNumber && VIPNumber === offer.VIPNumber;
}
