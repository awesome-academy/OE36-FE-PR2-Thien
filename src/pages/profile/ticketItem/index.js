import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { TICKET_STATUS_PENDING, TICKET_STATUS_REJECT } from "constants/common";
import apiShowtime from "apis/tasks/apiShowtime";
import formatDate from "utils/formatDate";
import formatMoney from "utils/formatMoney";

TicketItem.propTypes = {
  ticket: PropTypes.object,
};

function TicketItem({ ticket }) {
  const [expanded, setExpanded] = useState(false);
  const [showtimeData, setShowtimeData] = useState({});
  const getShowtimeInfo = useCallback(() => {
    apiShowtime
      .getById(ticket.showtimeId)
      .then((response) => setShowtimeData(response.data));
  }, []);
  const handleItemClick = () => {
    if (!expanded && !showtimeData.id) {
      getShowtimeInfo();
    }
    setExpanded(!expanded);
  };
  return (
    <div
      className={`ticket-item ${expanded ? "expanded" : ""}`}
      onClick={handleItemClick}
    >
      <div className="ticket-item__basic-info">
        <div className="info__cinema-name">
          <i className="fa fa-ticket" aria-hidden="true"></i>
          <span>{ticket.cinemaName}</span>
        </div>
        <div className="info__movie-name">
          <i className="fa fa-film" aria-hidden="true"></i>
          <span>{ticket.movieName}</span>
        </div>
        <div className="info__seats-list">
          <i className="fa fa-users" aria-hidden="true"></i>
          {ticket.seats.map((seat, index) => (
            <span key={index}>
              {index > 0 ? ", " : ""}
              {seat.name}
            </span>
          ))}
        </div>
        <div className="info__room">
          <i className="fa fa-road" aria-hidden="true"></i>
          <span>{showtimeData.room}</span>
        </div>
        <div className="info__show-date">
          <i className="fa fa-calendar" aria-hidden="true"></i>
          <span>{formatDate(showtimeData.date)}</span>
        </div>
        <div className="info__time">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
          <span>{showtimeData.time}</span>
        </div>
        {ticket.foods?.length > 0 && (
          <div className="info__food-list">
            <i className="fa fa-cutlery" aria-hidden="true"></i>
            {ticket.foods?.map((food, index) => (
              <span key={index}>
                {index > 0 ? ", " : ""}
                {food.name}×{food.number}
              </span>
            ))}
          </div>
        )}
        <div className="info__total-money">
          <i className="fa fa-money" aria-hidden="true"></i>
          <span>{formatMoney(ticket.totalPrice)} VND</span>
        </div>
      </div>
      <div
        className={`ticket-item__status ticket-item__status--${ticket.status}`}
      >
        <i
          className={`fa ${
            ticket.status === TICKET_STATUS_REJECT
              ? "fa-frown-o"
              : ticket.status === TICKET_STATUS_PENDING
              ? "fa-meh-o"
              : "fa-smile-o"
          }`}
          aria-hidden="true"
        ></i>
        <span>{ticket.status}</span>
      </div>
    </div>
  );
}

export default TicketItem;
