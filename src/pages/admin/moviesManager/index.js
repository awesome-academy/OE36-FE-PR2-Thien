import apiMovie from "apis/tasks/apiMovie";
import { logout } from "app/features/account/accountSlice";
import { movieActions } from "app/sagas/movies/movieActions";
import FilterBar from "components/filterBar";
import Paging from "components/paging";
import { GENRE_DATA } from "constants/common";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { DataGrid } from "devextreme-react";
import {
  Column,
  Editing,
  HeaderFilter,
  Lookup,
  RequiredRule,
  Scrolling,
} from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { error, warning } from "react-toastify-redux";
import { adminRoutes } from "routers/routesConfig";
import ImageCell from "./imageCell";
import "./style.scss";
import TagBoxEditorCell from "./tagBoxEditorCell";

function MoviesManager() {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilter] = useState({ _page: 1, _limit: 8 });
  const dispatch = useDispatch();
  const history = useHistory();
  const createCellTemplate = (container, options) => {
    var noBreakSpace = "\u00A0",
      text = (options.value || [])
        .map((element) => {
          return options.column.lookup.calculateCellValue(element);
        })
        .join(", ");
    container.textContent = text || noBreakSpace;
    container.title = text;
  };
  useEffect(() => {
    try {
      apiMovie.get(filters).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setMovies(response.data);
          setTotal(response.total);
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
  }, [filters]);
  const handleFilterChange = (newFilters) => {
    setFilter(newFilters);
    window.scrollTo(0, 0);
  };
  const handleAddMovie = (event) => {
    dispatch({ type: movieActions.ADD_MOVIE, payload: event.data });
  };

  const handleUpdateMovie = (event) => {
    dispatch({ type: movieActions.UPDATE_MOVIE, payload: event.data });
  };
  const handleRemoveMovie = (event) => {
    dispatch({ type: movieActions.REMOVE_MOVIE, payload: event.data.id });
  };

  return (
    <section className="movies-manager">
      <header className="movies-manager__header">
        <FilterBar onFiltersChange={handleFilterChange} filters={filters} />
      </header>
      <main className="movies-manager__main">
        <DataGrid
          dataSource={movies}
          allowColumnResizing={true}
          showBorders={true}
          onRowInserted={handleAddMovie}
          onRowUpdated={handleUpdateMovie}
          onRowRemoved={handleRemoveMovie}
        >
          <HeaderFilter visible={true} />
          <Column
            dataField="id"
            allowEditing={false}
            width={80}
            fixed={true}
            alignment="center"
          />
          <Column dataField="name">
            <RequiredRule />
          </Column>
          <Column
            dataField="genre"
            editCellComponent={TagBoxEditorCell}
            cellTemplate={createCellTemplate}
          >
            <RequiredRule />
            <Lookup
              dataSource={GENRE_DATA}
              valueExpr="value"
              displayExpr="label"
            />
          </Column>
          <Column dataField="duration" width={100}>
            <RequiredRule />
          </Column>
          <Column dataField="language">
            <RequiredRule />
          </Column>
          <Column dataField="director">
            <RequiredRule />
          </Column>
          <Column dataField="trailerUrl">
            <RequiredRule />
          </Column>
          <Column dataField="synopsis"></Column>
          <Column dataField="imageSrc" cellRender={ImageCell}>
            <RequiredRule />
          </Column>
          <Editing
            mode="form"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
          />
          <Scrolling mode="infinite" />
        </DataGrid>
      </main>
      <footer className="movies-manager__footer">
        <Paging
          total={total}
          filters={filters}
          length={movies.length}
          onFiltersChange={handleFilterChange}
          content="movies"
        />
      </footer>
    </section>
  );
}

export default MoviesManager;
