import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import generateShowtimeData from "utils/generateShowtimeData";
import { Scheduler } from "devextreme-react";
import { ROOM_NAME } from "constants/stringMap";
import Appointment from "../../appointment";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import {
  ERROR_NOTIFICATION,
  SELECT_MOVIE_CINEMA_NOTIFICATION,
} from "constants/notificationMessage";
import { generateSeatsData } from "utils/generateSeats";
import getShowtimeItem from "utils/getShowtimeItem";
import { changeShowLoading } from "app/features/common";
import apiShowtime from "apis/tasks/apiShowtime";
import { showtimeActions } from "app/sagas/showtime/showtimeActions";
import { ADMIN_ROLE } from "constants/common";
import { movieActions } from "app/sagas/movies/movieActions";

CustomSchedule.propTypes = {
  movie: PropTypes.object,
  cinema: PropTypes.object,
};

function CustomSchedule({ movie, cinema }) {
  const [showtimeList, setShowtimeList] = useState([]);
  const seatsData = useMemo(() => generateSeatsData(), []);
  const showtimeData = useMemo(
    () => generateShowtimeData(showtimeList, movie.duration),
    [showtimeList]
  );
  useEffect(() => {
    dispatch(changeShowLoading(true));
    if (movie.id) {
      try {
        apiShowtime
          .get({ movieId: movie.id, cinemaId: cinema.id })
          .then((response) => setShowtimeList(response.data));
      } catch (err) {
        dispatch(warning(ERROR_NOTIFICATION));
      }
    }
  }, [movie.id, cinema.id]);

  const dispatch = useDispatch();
  const onCellClick = () => {
    if (!movie.id) {
      dispatch(warning(SELECT_MOVIE_CINEMA_NOTIFICATION));
    }
  };
  const onAppointmentFormOpening = (data) => {
    let form = data.form;
    const id = data.appointmentData.id || new Date().getTime();
    const currentTime = new Date();
    const room = data.appointmentData.room || ROOM_NAME[0];
    let startDate = new Date(data.appointmentData.startDate);
    const occupied = data.appointmentData.occupied || [];
    let endDate = new Date(startDate.getTime() + 60 * 1000 * movie.duration);
    form.updateData("id", id);
    form.updateData("room", room);
    form.updateData("startDate", startDate);
    form.updateData("endDate", endDate);
    form.updateData("occupied", occupied);
    form.option("items", [
      {
        label: {
          text: "Start",
        },
        dataField: "startDate",
        editorType: "dxDateBox",
        editorOptions: {
          min: new Date(startDate.setHours(8, 0)),
          max: new Date(startDate.setHours(22, 0)),
          readOnly: startDate < currentTime,
          type: "time",
          onValueChanged: function (args) {
            startDate = new Date(args.value);
            endDate = new Date(
              startDate.getTime() + 60 * 1000 * movie.duration
            );
            form.updateData("startDate", startDate);
            form.updateData("endDate", endDate);
          },
        },
      },
      {
        label: {
          text: "End",
        },
        name: "endDate",
        dataField: "endDate",
        editorType: "dxDateBox",
        editorOptions: {
          type: "time",
          readOnly: true,
        },
      },
      {
        label: {
          text: "Room",
        },
        editorType: "dxSelectBox",
        dataField: "room",
        editorOptions: {
          items: ROOM_NAME,
          defaultValue: room,
          readOnly: startDate < currentTime,
          onValueChanged: function (args) {
            const room = args.value;
            form.updateData("room", room);
          },
        },
      },
      {
        label: {
          text: "Occupied",
        },
        editorType: "dxTagBox",
        dataField: "occupied",
        editorOptions: {
          items: seatsData,
          readOnly: true,
          displayExpr: "name",
          valueExpr: "id",
          defaultValue: occupied,
        },
      },
    ]);
  };

  const updateMovie = (date) => {
    const newCinemas =
      showtimeList.length === 0 || !movie.cinemas || movie.cinemas.length === 0
        ? [...(movie.cinemas || []), cinema.id]
        : [...movie.cinemas];
    const fromDate = Math.min(
      movie.showing_from_date || date.getTime(),
      date.getTime()
    );
    const toDate = Math.max(
      movie.showing_to_date || date.getTime(),
      date.getTime()
    );
    const newMovie = {
      ...movie,
      cinemas: newCinemas,
      showing_from_date: fromDate,
      showing_to_date: toDate,
    };
    dispatch({ type: movieActions.UPDATE_MOVIE, payload: newMovie });
  };

  const handleAddShowtime = ({ appointmentData }) => {
    updateMovie(new Date(appointmentData.startDate));
    const showtime = getShowtimeItem({
      ...appointmentData,
      movieId: movie.id,
      movieName: movie.name,
      cinemaId: cinema.id,
      cinemaName: cinema.name,
    });
    dispatch({
      type: showtimeActions.ADD_SHOWTIME,
      payload: showtime,
    });
  };

  const handleUpdateShowtime = ({ appointmentData }) => {
    updateMovie(new Date(appointmentData.startDate));
    const showtime = getShowtimeItem(appointmentData);
    dispatch({
      type: showtimeActions.UPDATE_SHOWTIME,
      payload: { showtime: showtime, userRole: ADMIN_ROLE },
    });
  };

  const handleDeleteShowtime = ({ appointmentData }) => {
    if (showtimeList.length === 1) {
      const newCinemasList = movie.cinemas.filter(
        (cinemaID) => cinemaID !== cinema.id
      );
      const newMovie = { ...movie, cinemas: newCinemasList };
      dispatch({ type: movieActions.UPDATE_MOVIE, payload: newMovie });
    }
    dispatch({
      type: showtimeActions.REMOVE_SHOWTIME,
      payload: appointmentData.id,
    });
  };

  return (
    <Scheduler
      dataSource={showtimeData}
      firstDayOfWeek={0}
      startDayHour={8}
      endDayHour={23}
      showAllDayPanel={false}
      shadeUntilCurrentTime={true}
      editing={{ allowAdding: !!movie.duration }}
      appointmentComponent={Appointment}
      onCellClick={onCellClick}
      onAppointmentAdded={handleAddShowtime}
      onAppointmentUpdated={handleUpdateShowtime}
      onAppointmentDeleted={handleDeleteShowtime}
      onAppointmentFormOpening={onAppointmentFormOpening}
    />
  );
}

export default CustomSchedule;
