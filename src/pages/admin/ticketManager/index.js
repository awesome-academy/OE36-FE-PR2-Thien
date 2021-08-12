import apiMovie from "apis/tasks/apiMovie";
import FilterBar from "components/filterBar";
import { DataGrid, SelectBox } from "devextreme-react";
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
import { error } from "react-toastify-redux";
import MovieOption from "components/movieOption";
import "./style.scss";
import Paging from "components/paging";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import apiTicket from "apis/tasks/apiTicket";
import { TICKET_STATUS_DATA } from "constants/common";
import { createCellTemplate } from "utils/createCellTemplate";
import { ticketActions } from "app/sagas/ticket/ticketActions";

function TicketManager() {
  const [movies, setMovies] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [movieFilters, setMovieFilter] = useState({ _limit: 8 });
  const [ticketFilters, setTicketFilter] = useState({ _page: 1, _limit: 8 });
  const [totalTicket, setTotalTicket] = useState(0);
  const handleMovieFilterChange = (newFilters) => {
    setMovieFilter(newFilters);
    setTicketFilter((prevTicketFilter) => ({
      ...prevTicketFilter,
      cinemaId: newFilters.cinemas_like,
    }));
  };
  const dispatch = useDispatch();

  const handleTicketFilterChange = (filters) => {
    setTicketFilter({ ...ticketFilters, ...filters });
  };

  const handleUpdateTicket = ({data}) => {
      dispatch({type: ticketActions.UPDATE_TICKET, payload: data})
  };
  useEffect(() => {
    try {
      apiMovie.get({ movieFilters, cinemas_like: "" }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setMovies(response.data);
        }
      });
    } catch (err) {
      dispatch(error(ERROR_NOTIFICATION));
    }
  }, [movieFilters]);

  useEffect(() => {
    try {
      apiTicket.get(ticketFilters).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setTickets(response.data);
          setTotalTicket(response.total);
        }
      });
    } catch (err) {
      dispatch(error(err));
    }
  }, [ticketFilters]);

  return (
    <section className="ticket-manager">
      <header className="ticket-manager__header">
        <FilterBar
          onFiltersChange={handleMovieFilterChange}
          filters={movieFilters}
        />
        <div className="ticket-filter">
          <SelectBox
            placeholder={movies.length > 0 ? "Select movie" : "No content"}
            dataSource={movies}
            displayExpr="name"
            valueExpr="id"
            itemRender={MovieOption}
            onValueChange={(movieId) => {
              handleTicketFilterChange({ movieId: movieId });
            }}
          />
          <SelectBox
            placeholder="Ticket Status"
            dataSource={[{ label: "All", value: "" }, ...TICKET_STATUS_DATA]}
            displayExpr="label"
            valueExpr="value"
            onValueChange={(status) => {
              handleTicketFilterChange({ status: status });
            }}
          />
        </div>
      </header>
      <main>
        <DataGrid
          dataSource={tickets}
          allowColumnResizing={true}
          showBorders={true}
          selection={{ mode: "single" }}
          onRowUpdated={handleUpdateTicket}
        >
          <HeaderFilter visible={true} />
          <Column
            dataField="id"
            allowEditing={false}
            width={80}
            fixed={true}
            alignment="center"
          />
          <Column dataField="movieName" allowEditing={false}></Column>
          <Column dataField="cinemaName" allowEditing={false} />
          <Column
            dataField="seats"
            width={100}
            allowEditing={false}
            cellTemplate={createCellTemplate}
          />
          <Column
            dataField="foods"
            width={100}
            allowEditing={false}
            cellTemplate={createCellTemplate}
          />
          <Column dataField="totalPrice" allowEditing={false} />
          <Column dataField="status">
            <RequiredRule />
            <Lookup
              dataSource={TICKET_STATUS_DATA}
              valueExpr="value"
              displayExpr="label"
            />
          </Column>

          {/* <Column dataField="imageSrc" cellRender={ImageCell}>
            <RequiredRule />
          </Column> */}
          <Editing allowUpdating={true} />
          <Scrolling mode="infinite" />
        </DataGrid>
      </main>
      <footer className="movies-manager__footer">
        <Paging
          total={totalTicket}
          filters={ticketFilters}
          length={movies.length}
          onFiltersChange={handleTicketFilterChange}
          content="movies"
        />
      </footer>
    </section>
  );
}

export default TicketManager;
