import apiCinema from "apis/tasks/apiCinema";
import { changeShowLoading } from "app/features/common";
import {
  changeRegularNumber,
  changeVIPNumber,
} from "app/features/offer/offerSlice";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { warning } from "react-toastify-redux";
import { appRoutes } from "routers/routesConfig";
import { ERROR_NOTIFICATION } from "utils/constant";
import formatMoney from "utils/formatMoney";
import validateAmount from "utils/validateAmount";
import TicketTypeOption from "./ticketTypeOption";
import "./style.scss";
import { Button } from "devextreme-react";

function TicketTypeSelect() {
  const offer = useSelector((state) => state.offer);
  const seatsAvailable = offer.showtime?.seatsAvailable;
  const [cinemaData, setCinemaData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeRegularNumber = (regularNumber) => {
    if (validateAmount(regularNumber, offer.VIPNumber, seatsAvailable)) {
      const totalPrice =
        offer.VIPNumber * cinemaData.VIPTicketPrice +
        regularNumber * cinemaData.regularTicketPrice;
      dispatch(
        changeRegularNumber({
          regularNumber: regularNumber,
          totalPrice: totalPrice,
        })
      );
    } else {
      dispatch(warning(t("outOfRangeMessage")));
    }
  };

  const handleChangeVIPNumber = (VIPNumber) => {
    if (validateAmount(offer.regularNumber, VIPNumber, seatsAvailable)) {
      const totalPrice =
        VIPNumber * cinemaData.VIPTicketPrice +
        offer.regularNumber * cinemaData.regularTicketPrice;
      dispatch(
        changeVIPNumber({
          VIPNumber: VIPNumber,
          totalPrice: totalPrice,
        })
      );
    } else {
      dispatch(warning(t("outOfRangeMessage")));
    }
  };

  const handleSubmit = () => {
    history.replace(appRoutes.seatSelect.path);
  };

  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiCinema.get({ id: offer.cinemaId }).then((response) => {
        if (
          response.status >= 200 &&
          response.status < 300 &&
          response.data[0]
        ) {
          setCinemaData(response.data[0]);
        } else {
          history.push(appRoutes.movies.path);
          dispatch(warning(response.data || ERROR_NOTIFICATION));
        }
        dispatch(changeShowLoading(false));
      });
    } catch (error) {
      dispatch(changeShowLoading(false));
      dispatch(warning(error.message || ERROR_NOTIFICATION));
    }
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
