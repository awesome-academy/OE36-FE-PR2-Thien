import React from "react";
import PropTypes from "prop-types";
import { SEAT_NUMBER } from "constants/seatsPageConfig";
import { formatDate } from "devextreme/localization";

Appointment.propTypes = {
  data: PropTypes.object,
};

function Appointment({ data }) {
  const appointmentData = data.appointmentData;
  return (
    <div className="showtime-info">
      <div className="showtime-info__room">
        <span>Room</span> : <span>{appointmentData.room}</span>
      </div>
      <div className="showtime-info__occupied">
        <span>Occupied</span> :{" "}
        <span>
          {appointmentData.occupied.length} / {SEAT_NUMBER}
        </span>
      </div>
      <div>
        <span>
          {formatDate(new Date(appointmentData.startDate), "shortTime")}
          {" - "}
          {formatDate(new Date(appointmentData.endDate), "shortTime")}
        </span>
      </div>
    </div>
  );
}

export default Appointment;
