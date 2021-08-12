import apiCinema from "apis/tasks/apiCinema";
import { changeShowLoading } from "app/features/common";
import {
  changeRegularNumber,
  changeStep,
  changeVIPNumber,
} from "app/features/offer/offerSlice";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { warning } from "react-toastify-redux";
import { appRoutes } from "routers/routesConfig";
import formatMoney from "utils/formatMoney";
import validateAmount from "utils/validateAmount";
import TicketTypeOption from "./ticketTypeOption";
import "./style.scss";
import { Button } from "devextreme-react";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { SEAT_NUMBER } from "constants/seatsPageConfig";
import { SELECT_FOOD, SELECT_SEAT } from "constants/paymentStep";

function TicketTypeSelect() {
  const offer = useSelector((state) => state.offer);
  const showtime = offer.showtime;
  const [cinemaData, setCinemaData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeRegularNumber = (regularNumber) => {
    if (
      validateAmount(
        regularNumber,
        offer.VIPNumber,
        SEAT_NUMBER - showtime.occupied.length
      )
    ) {
      const ticketPrice =
        offer.VIPNumber * cinemaData.VIPTicketPrice +
        regularNumber * cinemaData.regularTicketPrice;
      dispatch(
        changeRegularNumber({
          regularNumber: regularNumber,
          ticketPrice: ticketPrice,
        })
      );
    } else {
      dispatch(warning(t("outOfRangeMessage")));
    }
  };

  const handleChangeVIPNumber = (VIPNumber) => {
    if (
      validateAmount(
        offer.regularNumber,
        VIPNumber,
        SEAT_NUMBER - showtime.occupied.length
      )
    ) {
      const ticketPrice =
        VIPNumber * cinemaData.VIPTicketPrice +
        offer.regularNumber * cinemaData.regularTicketPrice;
      dispatch(
        changeVIPNumber({
          VIPNumber: VIPNumber,
          ticketPrice: ticketPrice,
        })
      );
    } else {
      dispatch(warning(t("outOfRangeMessage")));
    }
  };

  const handleSubmit = () => {
    dispatch(changeStep({ currentStep: SELECT_SEAT, nextStep: SELECT_FOOD }));
    history.replace(appRoutes.seatSelect.path);
  };

  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiCinema.getById(showtime.cinemaId).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setCinemaData(response.data);
        }
      });
    } catch (error) {
      dispatch(warning(ERROR_NOTIFICATION));
      history.push(appRoutes.movies.path);
    }
    dispatch(changeShowLoading(false));
  }, []);
  return (
    <>
      {!offer.showtime && <Redirect to={appRoutes.home.path} />}
      <section className="select-ticket-type container">
        <header className="ticket-type__header">
          <h3>{t("selectTicketType")}</h3>
          <p>
            <span>{t("selectedNotification")}</span>{" "}
            <span className="seat-number">
              {offer.VIPNumber + offer.regularNumber}
            </span>
            <span> {t("seat")}</span>
          </p>
        </header>
        <main>
          <ul>
            <li>
              <TicketTypeOption
                amount={offer.regularNumber}
                price={cinemaData.regularTicketPrice}
                label={t("regularTicket")}
                onValueChange={handleChangeRegularNumber}
              />
              <TicketTypeOption
                amount={offer.VIPNumber}
                price={cinemaData.VIPTicketPrice}
                label={t("VIPTicket")}
                onValueChange={handleChangeVIPNumber}
              />
            </li>
          </ul>
        </main>
        <footer
          className={
            offer.VIPNumber + offer.regularNumber > 0 ? "visible" : undefined
          }
        >
          <div className="footer__content container">
            <div className="offer__summary">
              <h4>{t("totalPrice")}</h4>
              <div className="total-price">
                <span>{formatMoney(offer.totalPrice)} VND</span>
              </div>
            </div>
            <Button onClick={handleSubmit}>{t("proceed")}</Button>
          </div>
        </footer>
      </section>
    </>
  );
}

export default TicketTypeSelect;
