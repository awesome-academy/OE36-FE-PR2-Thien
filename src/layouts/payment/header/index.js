import {
  changeSessionTimeLeft,
  clearOffer,
} from "app/features/offer/offerSlice";
import { SESSION_EXPIRED_NOTIFICATION } from "constants/notificationMessage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { warning } from "react-toastify-redux";
import { appRoutes } from "routers/routesConfig";
import formatTime from "utils/formatTime";
import "./style.scss";

function Header() {
  const offer = useSelector((state) => state.offer);
  const showtime = offer.showtime;
  const timeLeft = offer.sessionTimeLeft;
  const history = useHistory();
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
      dispatch(warning(SESSION_EXPIRED_NOTIFICATION));
      dispatch(clearOffer());
      history.replace(appRoutes.movies.path);
    }
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);
  return (
    <>
      <header className="sub-header">
        <div className="sub-header__content container">
          <div className="sub-header__left">
            <div className="cinema-name">
              <span>{showtime.cinemaName}</span>
            </div>
            <div className="movie-name">
              <span>{showtime.movieName}</span>
            </div>
            <div className="next-step">
              <span>Next step</span>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <span>{offer.nextStep}</span>
            </div>
          </div>
          <div className="showtime">
            <span>{showtime?.time}</span>
          </div>
          <div className="sub-header__right timeleft">
            <p className="timeleft__label">{"Time left"}</p>
            <p className="timeleft__value">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
