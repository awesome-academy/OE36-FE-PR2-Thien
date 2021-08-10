import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ShowDateSelect from "../showDateSelect";
import { useDispatch, useSelector } from "react-redux";
import { changePlayEmbedVideo } from "app/features/common";
import "./style.scss";

function MovieContent() {
  const { t } = useTranslation();
  const isPlay = useSelector((state) => state.common.playEmbedVideo);
  const movie = useSelector((state) => state.offer.movie);
  const dispatch = useDispatch();
  const [isCollapse, setIsCollapse] = useState(true);
  const synopsisRef = useRef();

  const collapseParagraph = () => {
    synopsisRef.current.scroll({ top: 0, left: 0 });
    setIsCollapse(!isCollapse);
  };

  const handlePlayTrailer = () => {
    dispatch(changePlayEmbedVideo(!isPlay));
  };
  return (
    <>
      <div className="movie-item">
        <div className="movie__image">
          <img src={movie?.imageSrc} />
          <div className="overlay">
            <div
              className={`view-trailer ${isPlay && "pause"}`}
              onClick={handlePlayTrailer}
            ></div>
          </div>
        </div>
      </div>
      <div className="movie__info">
        <h2 className="movie__title">{movie?.name}</h2>
        {movie?.language && (
          <div className="movie__language">
            <p>
              {t("language")}: <span>{movie?.language}</span>
            </p>
          </div>
        )}
        {movie?.genre && (
          <div className="movie__genre">
            <p>
              {t("genre")}:
              {" "} 
              {movie.genre.map((genreItem, index) => (
                <span key={index}>{`${genreItem}${
                  index < movie.genre.length - 1 ? ", " : ""
                }`}</span>
              ))}
            </p>
          </div>
        )}
        {movie?.duration && (
          <div className="movie__duration">
            <p>
              {t("duration")}:{" "}
              <span>
                {movie?.duration} {t("minute")}
              </span>
            </p>
          </div>
        )}
        {movie?.director && (
          <div className="movie__director">
            <p>
              {t("director")}: <span>{movie?.director}</span>
            </p>
          </div>
        )}
        {movie?.synopsis && (
          <div className="movie__synopsis">
            <h3>{t("synopsis")}:</h3>
            <p ref={synopsisRef} className={isCollapse ? "collapse" : ""}>
              {movie?.synopsis}
            </p>
            <label htmlFor="show-more" onClick={collapseParagraph}>
              {isCollapse ? t("showMore") : t("showLess")}
            </label>
          </div>
        )}
        {movie?.showing_to_date && <ShowDateSelect />}
      </div>
    </>
  );
}

export default MovieContent;
