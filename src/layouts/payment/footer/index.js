// import { movieActions } from "app/sagas/movies/movieActions";
import { changeStep, changeTotalPrice } from "app/features/offer/offerSlice";
import { ticketActions } from "app/sagas/ticket/ticketActions";
import {
  SELECT_METHOD_NOTIFICATION,
  SELECT_REMAIN_NOTIFICATION,
} from "constants/notificationMessage";
import { SELECT_FOOD, SELECT_METHOD, SELECT_SEAT } from "constants/paymentStep";
import { Button } from "devextreme-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { warning } from "react-toastify-redux";
import { appRoutes } from "routers/routesConfig";
import { checkSeatRemain } from "utils/checkSeat";
import formatMoney from "utils/formatMoney";
import "./style.scss";

function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const offer = useSelector((state) => state.offer);
  const account = useSelector((state) => state.account);
  const handleSubmit = () => {
    if (checkSeatRemain(offer)) {
      switch (offer.currentStep) {
        case SELECT_SEAT: {
          dispatch(
            changeStep({ currentStep: SELECT_FOOD, nextStep: SELECT_METHOD })
          );
          history.replace(appRoutes.foodSelect.path);
          break;
        }
        case SELECT_FOOD: {
          dispatch(changeStep({ currentStep: SELECT_METHOD, nextStep: null }));
          dispatch(changeTotalPrice(offer.totalPrice * 1.05));
          history.replace(appRoutes.payment.path);
          break;
        }
        case SELECT_METHOD: {
          if (!offer.method) {
            dispatch(warning(SELECT_METHOD_NOTIFICATION));
          } else {
            dispatch({
              type: ticketActions.ADD_TICKET,
              payload: {
                ...offer,
                userId: account.id,
                userRole: account.role,
              },
            });
            history.replace(appRoutes.home.path);
          }
        }
      }
    } else {
      dispatch(warning(SELECT_REMAIN_NOTIFICATION));
    }
  };
  return (
    <>
      {offer.seats.length > 0 && (
        <footer className="sub-footer">
          <div className="sub-footer__content container">
            <div className="seat_selected">
              <h4>Seat selected</h4>
              <ul>
                {offer.seats.map((seat, index) => (
                  <li key={index}>
                    <div>{seat.name}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="total-price">
              <h4>Total price</h4>
              <div>
                <span>{formatMoney(offer.totalPrice)} VND</span>
              </div>
            </div>
            <Button onClick={handleSubmit}>
              {offer.currentStep === SELECT_METHOD ? "Submit" : t("proceed")}
            </Button>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
