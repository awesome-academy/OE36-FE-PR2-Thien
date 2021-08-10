import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MovieContent from "./components/movieContent";
import MovieEmbed from "./components/movieEmbed";
import { useDispatch } from "react-redux";
import { changePlayEmbedVideo, changeShowLoading } from "app/features/common";
import { Redirect, useHistory } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import apiMovie from "apis/tasks/apiMovie";
import { warning } from "react-toastify-redux";
import ShowTimeSelect from "./components/showTimeSelect";
import { changeMovie, changeShowDate, clearOffer } from "app/features/offer/offerSlice";
import "./style.scss";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";

MovieDetails.propTypes = {
  match: PropTypes.object,
};

function MovieDetails({ match }) {
  const movieId = match.params.movieId;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearOffer());
    dispatch(changeShowLoading(true));
    dispatch(changePlayEmbedVideo(false));
    try {
      apiMovie.getById(movieId).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch(changeMovie({ movie: response.data }));
          dispatch(changeShowDate({ date: new Date() }));
        } else {
          history.push(appRoutes.movies.path);
          dispatch(warning(response.data || ERROR_NOTIFICATION));
        }
        window.scrollTo(0, 0);
        dispatch(changeShowLoading(false));
      });
    } catch (error) {
      dispatch(warning(error.message || ERROR_NOTIFICATION));
    }
  }, []);

  return (
    <section className="movie__detail">
      {!movieId && <Redirect to={appRoutes.movies.path} />}
      <header>
        <div className="movie__background">
          <MovieEmbed />
        </div>
        <div className="details-content container">
          <MovieContent />
        </div>
      </header>
      <main className="container">
        <ShowTimeSelect />
      </main>
    </section>
  );
}

export default MovieDetails;
