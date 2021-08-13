import apiMovie from "apis/tasks/apiMovie";
import FilterBar from "components/filterBar";
import { SelectBox } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { error } from "react-toastify-redux";
import CustomSchedule from "./components/customScheduler";
import MovieOption from "components/movieOption";
import "./style.scss";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";

function ShowtimeManager() {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedCinema, setSelectedCinema] = useState({});
  const [movies, setMovies] = useState([]);
  const [filters, setFilter] = useState({ _limit: 8 });
  const handleFilterChange = (newFilters) => {
    setFilter(newFilters);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (filters.cinemas_like) {
      try {
        apiMovie.get({ ...filters, cinemas_like: "" }).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setMovies(response.data);
          }
        });
      } catch (err) {
        dispatch(error(ERROR_NOTIFICATION));
      }
    }
  }, [filters]);
  return (
    <section className="showtime-manager">
      <header className="showtime-manager__header">
        <FilterBar
          onFiltersChange={handleFilterChange}
          onCinemaChange={setSelectedCinema}
          filters={filters}
        />
        <div className="movies-select">
          <SelectBox
            placeholder={movies.length > 0 ? "Select movie" : "No content"}
            dataSource={movies}
            displayExpr="name"
            itemRender={MovieOption}
            onValueChange={setSelectedMovie}
          />
        </div>
      </header>
      <main>
        <CustomSchedule
          cinema={selectedCinema}
          cinemaId={filters.cinemas_like}
          movie={selectedMovie}
        />
      </main>
    </section>
  );
}

export default ShowtimeManager;
