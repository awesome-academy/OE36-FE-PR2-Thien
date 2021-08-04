import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeShowVideo } from "app/features/common";
import getEmbedId from "utils/embedId";
import { Link } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";

MovieItem.propTypes = {
  movie: PropTypes.object,
};

function MovieItem({ movie }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showTrailer = () => {
    dispatch(
      changeShowVideo({
        showVideo: true,
        videoEmbedId: getEmbedId(movie.trailerUrl),
      })
    );
  };
  return (
    <div className="movie-item">
      <div className="movie__image">
        <img
          src={movie.imageSrc}
          alt={movie.name}
          loading="lazy"
          width="272"
          height="340"
        />
        <div className="overlay">
          <div className="view-trailer" onClick={showTrailer}></div>
          <Link to={appRoutes.movieDetails.basePath + movie.id}>
            <div className="booking">
              <span>{t("bookNow")}</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="movie__info">
        <h4 className="movie__name" title={movie.name}>
          {movie.name}
        </h4>
        <p className="movie__genre">{movie.genre}</p>
        <p className="movie__duration">
          <i className="fa fa-clock-o" />
          <span>{` ${movie.duration} ${t("minute")}`}</span>
        </p>
      </div>
    </div>
  );
}

export default MovieItem;
