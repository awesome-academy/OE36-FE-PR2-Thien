import apiMovie from "apis/tasks/apiMovie";
import { logout } from "app/features/account/accountSlice";
import { movieActions } from "app/sagas/movies/movieActions";
import FilterBar from "components/filterBar";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { SelectBox } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { error, warning } from "react-toastify-redux";
import { adminRoutes } from "routers/routesConfig";
import CustomSchedule from "./components/customScheduler";
import MovieOption from "./components/movieOption";
import "./style.scss";

function TicketManager() {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [filters, setFilter] = useState({ _limit: 8 });
  const handleFilterChange = (newFilters) => {
    setFilter(newFilters);
  };
  const dispatch = useDispatch();

  const handleShowtimeChange = (showtimeList, newDate) => {
    console.log(showtimeList)
    const fromDate = Math.min(
      selectedMovie.showing_from_date || new Date().getTime(),
      newDate || selectedMovie.showing_from_date
    );
    const toDate = Math.max(
      selectedMovie.showing_to_date || new Date().getTime(),
      newDate || selectedMovie.showing_to_date
    );
    const newMovieData = {
      ...selectedMovie,
      cinemas: showtimeList,
      showing_from_date: fromDate,
      showing_to_date: toDate,
    };

    setSelectedMovie(newMovieData);
    dispatch({ type: movieActions.UPDATE_MOVIE, payload: newMovieData });
  };

  useEffect(() => {
    if (filters.cinema_like) {
      try {
        apiMovie.get({ ...filters, cinema_like: "" }).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setMovies(response.data);
          } else if (response.status === 401) {
            dispatch(logout());
            history.replace(adminRoutes.login.path);
          } else {
            dispatch(warning(response.data || ERROR_NOTIFICATION));
          }
        });
      } catch (err) {
        dispatch(error(err));
      }
    }
  }, [filters]);
  return (
    <section className="ticket-manager">
      <header className="ticket-manager__header">
        <FilterBar onFiltersChange={handleFilterChange} filters={filters} />
        <div className="movies-select">
          <SelectBox
            placeholder="Select movie"
            dataSource={movies}
            displayExpr="name"
            itemRender={MovieOption}
            onValueChange={setSelectedMovie}
          />
        </div>
      </header>
      <main>
        <CustomSchedule
          cinemaName={filters.cinema_like}
          movie={selectedMovie}
          onShowtimeChange={handleShowtimeChange}
        />
      </main>
    </section>
  );
}

export default TicketManager;
