import { changeSessionTimeLeft } from "app/features/offer/offerSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatTime from "utils/formatTime";
import "./style.scss";

function Header() {
  const offer = useSelector((state) => state.offer);
  const timeLeft = useSelector((state) => state.offer.sessionTimeLeft);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(changeSessionTimeLeft(timeLeft - 1));
      if (timeLeft < 1) {
        clearInterval(timer);
      }
    }, 1000);
    if (timeLeft < 1) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);
  return (
    <>
      <header className="seats-header">
        <div className="seats-header__content container">
          <div className="seats-header__left">
            <div className="cinema-name">{offer.cinemaName}</div>
            <div className="movie-name">{offer.movie.name}</div>
          </div>
          <div className="showtime">{offer.showtime.time}</div>
          <div className="seats-header__right timeleft">
            <p className="timeleft__label">{"Time left"}</p>
            <p className="timeleft__value">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
