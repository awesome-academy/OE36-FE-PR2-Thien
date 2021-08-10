import "./style.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSeats } from "app/features/offer/offerSlice";
import { useTranslation } from "react-i18next";
import generateSeats from "utils/generateSeats";
import Note from "./components/note";
import {
  STATUS_AVAILABLE,
  STATUS_OCCUPIED,
  STATUS_SELECTED,
} from "constants/seatsPageConfig";
import Footer from "layouts/payment/footer";
import { warning } from "react-toastify-redux";
import {
  OVER_RANGE_NOTIFICATION,
  SEAT_OCCUPIED_NOTIFICATION,
} from "constants/notificationMessage";
import { checkSeatRange } from "utils/checkSeat";
import { Redirect } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import Header from "layouts/payment/header";

function SeatSelect() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const offer = useSelector((state) => state.offer);
  const [seatMap, setSeatMap] = useState(() =>
    generateSeats(offer.showtime?.occupied)
  );

  const handleSelectSeat = (event) => {
    const seatId = Number(event.target.dataset.id);
    const status = seatMap[seatId].status;
    if (
      checkSeatRange(offer, seatMap[seatId].type) &&
      status === STATUS_AVAILABLE
    ) {
      setSeatMap((prevSeatMap) => {
        const newSeat = Object.assign({}, prevSeatMap[seatId], {
          status: STATUS_SELECTED,
        });
        return [
          ...prevSeatMap.slice(0, seatId),
          newSeat,
          ...prevSeatMap.slice(seatId + 1),
        ];
      });
      dispatch(changeSeats({ seats: [...offer.seats, seatMap[seatId]] }));
    } else if (status === STATUS_SELECTED) {
      setSeatMap((prevSeatMap) => {
        const newSeat = Object.assign({}, prevSeatMap[seatId], {
          status: STATUS_AVAILABLE,
        });
        return [
          ...prevSeatMap.slice(0, seatId),
          newSeat,
          ...prevSeatMap.slice(seatId + 1),
        ];
      });
      dispatch(
        changeSeats({ seats: offer.seats.filter((seat) => seat.id !== seatId) })
      );
    } else if (status === STATUS_OCCUPIED) {
      dispatch(warning(SEAT_OCCUPIED_NOTIFICATION));
    } else if (!checkSeatRange(offer, seatMap[seatId].type)) {
      dispatch(warning(OVER_RANGE_NOTIFICATION));
    }
  };
  return (
    <section className="seat-select">
      {!offer.showtime && <Redirect to={appRoutes.movies.path} />}
      <Header />
      <main className="seats-main container">
        <div className="screen">
          <span>{t("screen")}</span>
        </div>
        <div className="seats">
          <ul>
            {seatMap.map((seat, index) => (
              <li key={index} className={`seat-${seat.type}-wrap`}>
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
    </section>
  );
}

export default SeatSelect;
