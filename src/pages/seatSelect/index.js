import "./style.scss";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSeats,
} from "app/features/offer/offerSlice";
import { useTranslation } from "react-i18next";
import generateSeats from "utils/generateSeats";
import Header from "./components/header";
import Note from "./components/note";
import {
  STATUS_AVAILABLE,
  STATUS_OCCUPIED,
  STATUS_SELECTED,
} from "utils/constant";
import Footer from "./components/footer";

function SeatSelect() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const offer = useSelector((state) => state.offer);
  const [seatMap, setSeatMap] = useState(() =>
    generateSeats(offer.showtime.occupied)
  );

  const handleSelectSeat = (event) => {
    const seatId = Number(event.target.dataset.id);
    const status = seatMap[seatId].status;
    if (status !== STATUS_OCCUPIED) {
      setSeatMap((prevSeatMap) => {
        const newSeat =
          status === STATUS_SELECTED
            ? Object.assign({}, prevSeatMap[seatId], { status: STATUS_AVAILABLE })
            : Object.assign({}, prevSeatMap[seatId], { status: STATUS_SELECTED });
        return [
          ...prevSeatMap.slice(0, seatId),
          newSeat,
          ...prevSeatMap.slice(seatId + 1),
        ];
      });
    }
    if (status === STATUS_AVAILABLE) {
      dispatch(changeSeats({ seats: [...offer.seats, seatMap[seatId]] }));
    } else {
      dispatch(
        changeSeats({ seats: offer.seats.filter((seat) => seat.id !== seatId) })
      );
    }
  };
  return (
    <>
      <Header />
      <main className="seats-main container">
        <div className="screen">
          <span>{t("screen")}</span>
        </div>
        <div className="seats">
          <ul>
            {seatMap.map((seat, index) => (
              <li key={index}>
                <div
                  data-id={seat.id}
                  className={`seat  seat--${seat.type} seat--${seat.status}`}
                  onClick={handleSelectSeat}
                ></div>
                <span>{seat.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <Note />
      </main>
      <Footer />
    </>
  );
}

export default SeatSelect;
