import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORY_COMING_SOON,
  CATEGORY_NOW_SHOWING,
  ERROR_NOTIFICATION,
} from "utils/constant";
import PropTypes from "prop-types";
import "./style.scss";
import FilterBar from "./components/filterBar";
import apiMovie from "apis/tasks/apiMovie";
import MovieItem from "components/movieItem";
import Paging from "./components/paging";
import { changeShowLoading } from "app/features/common";
import { warning } from "react-toastify-redux";
// import { changeShowDate } from "app/features/movieFilter/movieFilterSlice";

Movies.propTypes = {
  location: PropTypes.object,
};

function Movies(props) {
  const { t } = useTranslation();
  const movieFilter = useSelector((state) => state.movieFilter);
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState(
    props.location.category || CATEGORY_NOW_SHOWING
  );
  const [totalMovie, setTotalMovie] = useState(0);
  const dispatch = useDispatch();
  const handleChangeCategory = (event) => {
    setCategory(event.target.dataset.value);
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
        <FilterBar />
      </div>
      <div className="movie__list ">
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <MovieItem
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
          total={totalMovie}
          current={movieFilter._page}
          limit={movieFilter._limit}
          length={movies.length}
        />
      </div>
    </section>
  );
}

export default Movies;
