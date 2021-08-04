import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieContent from "./components/movieContent";
import "./style.scss";
import MovieEmbed from "./components/movieEmbed";
import { useDispatch } from "react-redux";
import { changeShowLoading } from "app/features/common";
import { Redirect, useHistory } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import apiMovie from "apis/tasks/apiMovie";
import { ERROR_NOTIFICATION } from "utils/constant";
import { warning } from "react-toastify-redux";

MovieDetails.propTypes = {
  match: PropTypes.object,
};

function MovieDetails({ match }) {
  const movieId = match.params.movieId;
  const history = useHistory();
  const [movie, setMovie] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiMovie.get({ id: movieId }).then((response) => {
        if (
          response.status >= 200 &&
          response.status < 300 &&
          response.data[0]
        ) {
          setMovie(response.data[0]);
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
          <MovieEmbed movieUrl={movie.trailerUrl} />
        </div>
        <div className="details-content container">
          <MovieContent movie={movie} />
        </div>
      </header>
    </section>
  );
}

export default MovieDetails;
