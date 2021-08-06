import { Button } from "devextreme-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import formatMoney from "utils/formatMoney";
import "./style.scss";

function Footer() {
  const { t } = useTranslation();
  const offer = useSelector((state) => state.offer);
  return (
    <>
      {offer.seats.length > 0 && (
        <footer className="seats-footer">
          <div className="seats-footer__content container">
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
            <Button>{t("proceed")}</Button>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
