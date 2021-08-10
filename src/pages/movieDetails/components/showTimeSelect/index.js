import React, { useEffect, useState } from "react";
import ShowTimeOption from "../showTimeOption";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { warning } from "react-toastify-redux";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import apiShowtime from "apis/tasks/apiShowtime";

function ShowTimeSelect() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showtimeList, setShowtimeList] = useState([]);
  const movie = useSelector((state) => state.offer.movie);
  useEffect(() => {
    try {
      apiShowtime
        .get({ movieId: movie?.movieId })
        .then((response) => setShowtimeList(response.data));
    } catch (err) {
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, [movie]);
  return (
    <>
      <div className="no-showtime-notification">{t("noShowtimeMessage")}</div>
      <ul className="cinema-showtime">
        {movie?.cinemas?.map((cinemaId, index) => (
          <li key={index}>
            <ShowTimeOption showtime={showtimeList} cinemaId={cinemaId} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ShowTimeSelect;
