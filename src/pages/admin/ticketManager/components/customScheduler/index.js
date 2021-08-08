import React from "react";
import PropTypes from "prop-types";
import generateShowtimeData from "utils/generateShowtimeData";
import { Scheduler } from "devextreme-react";
import { ROOM_NAME } from "constants/stringMap";
import Appointment from "../../appointment";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import { SELECT_MOVIE_CINEMA_NOTIFICATION } from "constants/notificationMessage";
import { generateSeatsData } from "utils/generateSeats";
import { SEAT_NUMBER } from "constants/seatsPageConfig";
import getShowtimeItem from "utils/getShowtimeItem";

CustomSchedule.propTypes = {
  onValueChange: PropTypes.func,
  movie: PropTypes.object,
  cinemaName: PropTypes.string,
  onShowtimeChange: PropTypes.func,
};

function CustomSchedule({ movie, cinemaName, onShowtimeChange }) {
  const seatsData = generateSeatsData();
  const showtimeData = generateShowtimeData(
    movie.cinemas,
    cinemaName,
    movie.duration
  );
  const dispatch = useDispatch();
  const onCellClick = () => {
    if (!movie.duration) {
      dispatch(warning(SELECT_MOVIE_CINEMA_NOTIFICATION));
    }
  };
  const onAppointmentFormOpening = (data) => {
    let form = data.form;
    const room = data.appointmentData.room || "D1";
    console.table(data.appointmentData);
    const startDate = data.appointmentData.startDate;
    const occupied = data.appointmentData.occupied || [];
    const endDate = new Date(startDate.getTime() + 60 * 1000 * movie.duration);
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
          type: "time",
          readOnly: true,
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
          onValueChanged: function (args) {
            const room = args.value;
            form.updateData("room", room);
          },
        },
        validationRules: [
          {
            type: "required",
            message: "Room is required",
          },
        ],
      },
      {
        label: {
          text: "Occupied",
        },
        editorType: "dxTagBox",
        dataField: "occupied",

        editorOptions: {
          items: seatsData,
          displayExpr: "name",
          valueExpr: "id",
          defaultValue: occupied,
          applyValueMode: "useButtons",
          searchEnabled: true,
          showSelectionControls: true,
          onValueChange: function (args) {
            const occupied = args.value;
            form.updateData("seatsAvailable", SEAT_NUMBER - occupied.length);
            form.updateData("occupied", occupied);
          },
        },
      },
    ]);
  };

  const handleAddShowtime = (data) => {
    const cinemaId = movie.cinemas.findIndex(
      (cinema) => cinema.cinemaName === cinemaName
    );
    const cinemaData = movie.cinemas.find(
      (cinema) => cinema.cinemaName === cinemaName
    );
    const showtime = getShowtimeItem(data.appointmentData);
    const newCinemaData =
      cinemaId < 0
        ? { cinemaName: cinemaName, showtime: [showtime] }
        : {
          ...cinemaData,
          showtime: [...(cinemaData.showtime || []), showtime],
        };

    const showtimeList =
      cinemaId < 0
        ? [...movie.cinemas, newCinemaData]
        : [
          ...movie.cinemas.slice(0, cinemaId),
          newCinemaData,
          ...movie.cinemas.slice(cinemaId + 1),
        ];
    onShowtimeChange(showtimeList, showtime.date);
  };

  const handleUpdateShowtime = (data) => {
    const cinemaId = movie.cinemas.findIndex(
      (cinemaData) => cinemaData.cinemaName === cinemaName
    );
    const cinemaData = movie.cinemas.find(
      (cinema) => cinema.cinemaName === cinemaName
    );
    const showtime = getShowtimeItem(data.appointmentData);
    const newCinemaData =
      cinemaId < 0
        ? { cinemaName: cinemaName, showtime: [showtime] }
        : {
          ...cinemaData,
          showtime: [
            ...cinemaData.showtime.slice(0, showtime.id),
            showtime,
            ...cinemaData.showtime.slice(showtime.id + 1),
          ],
        };
    const showtimeList =
      cinemaId < 0
        ? [...movie.cinemas, newCinemaData]
        : [
          ...movie.cinemas.slice(0, cinemaId),
          newCinemaData,
          ...movie.cinemas.slice(cinemaId + 1),
        ];
    onShowtimeChange(showtimeList, showtime.date);
  };

  const handleDeleteShowtime = (data) => {
    const cinemaId = movie.cinemas.findIndex(
      (cinemaData) => cinemaData.cinemaName === cinemaName
    );
    const cinemaData = movie.cinemas.find(
      (cinema) => cinema.cinemaName === cinemaName
    );
    const showtime = getShowtimeItem(data.appointmentData);
    const newCinemaData =
      cinemaId < 0
        ? { cinemaName: cinemaName, showtime: [showtime] }
        : {
          ...cinemaData,
          showtime: [
            ...cinemaData.showtime.slice(0, showtime.id),
            ...cinemaData.showtime.slice(showtime.id + 1),
          ],
        };

    const showtimeList =
      cinemaId < 0
        ? [...movie.cinemas, newCinemaData]
        : [
          ...movie.cinemas.slice(0, cinemaId),
          newCinemaData,
          ...movie.cinemas.slice(cinemaId + 1),
        ];
    onShowtimeChange(showtimeList);
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
