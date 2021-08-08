import React from 'react';
import PropTypes from 'prop-types';
import "./style.scss";

MovieOption.propTypes = {
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  genre: PropTypes.number,
};
function MovieOption(props) {
  return (
    <div className="movie-option">
      <img className="movie-option__image" src={props.imageSrc} />
      <div className="movie-option__info">
        <h6 className="info__name">{props.name}</h6>
        <p className="info__genre">
          {props.genre.map((genre, index) => (
            <span key={index}>{`${genre}${
              index < props.genre.length - 1 ? ", " : ""
            }`}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default MovieOption;
