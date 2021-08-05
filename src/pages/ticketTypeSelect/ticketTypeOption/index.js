import React from "react";
import PropTypes from "prop-types";
import formatMoney from "utils/formatMoney";
import { Button } from "devextreme-react";
import "./style.scss";

TicketTypeOption.propTypes = {
  label: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
  onValueChange: PropTypes.func,
};

function TicketTypeOption({ label, price, amount, onValueChange }) {
  return (
    <div className="ticket-option">
      <div className="ticket-option__info">
        <h4 className="ticket-info__type">{label}</h4>
        <div className="ticket-info__price">{formatMoney(price)} VND</div>
      </div>
      <div className="ticket-option__amount">
        <Button onClick={() => onValueChange(amount - 1)}>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </Button>
        <div>
          <span>{amount}</span>
        </div>
        <Button onClick={() => onValueChange(amount + 1)}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Button>
      </div>
    </div>
  );
}

export default TicketTypeOption;
