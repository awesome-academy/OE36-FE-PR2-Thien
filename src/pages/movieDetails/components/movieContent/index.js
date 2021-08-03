import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./style.scss";

MovieContent.propTypes = {
  movie: PropTypes.object,
};

function MovieContent({ movie }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="movie__image">
        <img src={movie.imageSrc} />
      </div>
      <div className="movie__info">
        <h2 className="movie__title">{movie.name}</h2>
        {movie.language && (
          <div className="movie__language">
            <p>
              {t("language")}: <span>{movie.language}</span>
            </p>
          </div>
        )}
        {movie.genre && (
          <div className="movie__genre">
            <p>
              {t("genre")}: <span>{movie.genre}</span>
            </p>
          </div>
        )}
        {movie.duration && (
          <div className="movie__duration">
            <p>
              {t("duration")}:{" "}
              <span>
                {movie.duration} {t("minute")}
              </span>
            </p>
          </div>
        )}
        {movie.director && (
          <div className="movie__director">
            <p>
              {t("director")}: <span>{movie.director}</span>
            </p>
          </div>
        )}
        {movie.synopsis && (
          <div className="movie__synopsis">
            <p>
              {t("synopsis")}: <span>{movie.synopsis}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieContent;
