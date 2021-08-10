import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./style.scss";
import FilterBar from "components/filterBar";
import apiMovie from "apis/tasks/apiMovie";
import MovieItem from "components/movieItem";
import { changeShowLoading } from "app/features/common";
import { warning } from "react-toastify-redux";
import {
  CATEGORY_COMING_SOON,
  CATEGORY_NOW_SHOWING,
} from "constants/categories";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import Paging from "components/paging";

Movies.propTypes = {
  location: PropTypes.object,
};

function Movies({ location }) {
  const { t } = useTranslation();
  const [movieFilter, setMovieFilter] = useState({ _limit: 8, _page: 1 });
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState(
    location.category || CATEGORY_NOW_SHOWING
  );
  const [totalMovie, setTotalMovie] = useState(0);
  const dispatch = useDispatch();
  const handleChangeCategory = (event) => {
    setCategory(event.target.dataset.value);
  };

  const handleFiltersChange = (newFilter) => {
    setMovieFilter(newFilter);
  };

  useEffect(() => {
    dispatch(changeShowLoading(true));
    const apiGetData =
      category === CATEGORY_NOW_SHOWING
        ? (filters) => apiMovie.getNowShowingMovies(filters)
        : (filters) => apiMovie.getComingSoonMovies(filters);
    try {
      apiGetData(movieFilter).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setTotalMovie(response.total);
          setMovies(response.data);
        } else {
          dispatch(warning(response.data || ERROR_NOTIFICATION));
        }
        window.scrollTo(0, 0);
        dispatch(changeShowLoading(false));
      });
    } catch (error) {
      dispatch(warning(error.message || ERROR_NOTIFICATION));
    }
  }, [category, movieFilter]);

  return (
    <section className="movies container">
      <header>
        <div className="header_tabbar">
          <nav>
            <ul>
              <li
                className={category === CATEGORY_NOW_SHOWING ? "active" : ""}
                data-value={CATEGORY_NOW_SHOWING}
                onClick={handleChangeCategory}
              >
                <h2>{t("nowShowing")}</h2>
              </li>
              <li
                className={category === CATEGORY_COMING_SOON ? "active" : ""}
                data-value={CATEGORY_COMING_SOON}
                onClick={handleChangeCategory}
              >
                <h2>{t("comingSoon")}</h2>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="movie__filters ">
        <FilterBar
          onFiltersChange={handleFiltersChange}
          filters={movieFilter}
        />
      </div>
      <div className="movie__list ">
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <MovieItem
                movie={movie}
                id={movie.id}
                name={movie.name}
                genre={movie.genre}
                duration={movie.duration}
                imageSrc={movie.imageSrc}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="movie__paging">
        <Paging
          content="movies"
          total={totalMovie}
          filters={movieFilter}
          length={movies.length}
          onFiltersChange={handleFiltersChange}
        />
      </div>
    </section>
  );
}

export default Movies;
