import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useTranslation } from "react-i18next";

MovieItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  genre: PropTypes.string,
  duration: PropTypes.number,
  imageSrc: PropTypes.string,
};

function MovieItem(props) {
  const { t } = useTranslation();
  return (
    <div className="movie-item">
      <div className="movie__image">
        <img
          src={props.imageSrc}
          alt={props.name}
          loading="lazy"
          width="272"
          height="340"
        />
        <div className="overlay">
          <div className="view-trailer"></div>
          <div className="booking">
            <span>{t("bookNow")}</span>
          </div>
        </div>
      </div>
      <div className="movie__info">
        <h4 className="movie__name" title={props.name}>
          {props.name}
        </h4>
        <p className="movie__genre">{props.genre}</p>
        <p className="movie__duration">
          <i className="fa fa-clock-o" />
          <span>{` ${props.duration} ${t("minute")}`}</span>
        </p>
      </div>
    </div>
  );
}

export default MovieItem;
