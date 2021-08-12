import React from "react";
import formatDate from "utils/formatDate";
import { useSelector } from "react-redux";
import "./style.scss";
import formatMoney from "utils/formatMoney";

function Ticket() {
  const offer = useSelector((state) => state.offer);
  return (
    <section className="ticket">
      <h3>Tickets summary</h3>
      <div className="summary__content">
        <div className="movie">
          <span className="movie__name title">{offer.movie.name}</span>
          <br />
          <span className="movie__language subtitle">
            {offer.movie.language}
          </span>
        </div>
        <div className="cinema">
          <div className="cinema__info ">
            <span className="info__name title">
              {offer.showtime.cinemaName}
            </span>
            <span className="info__room subtitle">
              Room: {offer.showtime.room}
            </span>
          </div>
          <div className="ticket-info">
            <p className="ticket__number title">{offer.seats.length}</p>
            <p className="ticket__label subtitle">Ticket(s)</p>
          </div>
        </div>
        <div className="seats description">
          <p>
            {"Seats "}
            {offer.seats.map((seat, index) => (
              <span key={index}> - {seat.name}</span>
            ))}
          </p>
        </div>
        <div className="time description">
          <span>
            {formatDate(offer.showtime.date)} - {offer.showtime.time}
          </span>
        </div>
        <div className="ticket-price">
          <span>Ticket price</span>
          <span>{formatMoney(offer.ticketPrice)} VND</span>
        </div>
      </div>
      <div className="add-on">
        {offer.foods.map((food, index) => (
          <div key={index}>
            <span>{food.name}</span>
            <span>
              {food.number}×{formatMoney(food.price)} VND
            </span>
          </div>
        ))}
      </div>
      <div className="bill">
        <div className="price">
          <span>Price</span>
          <span>{formatMoney(offer.totalPrice)} VND</span>
        </div>
        <div className="vat">
          <span>VAT</span>
          <span>{formatMoney(offer.totalPrice * 0.05)} VND</span>
        </div>
        <div className="total">
          <span>Total</span>
          <span>{formatMoney(offer.totalPrice * 1.05)} VND</span>
        </div>
      </div>
    </section>
  );
}

export default Ticket;
