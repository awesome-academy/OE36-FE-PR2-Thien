import React from "react";
import ShowTimeOption from "../showTimeOption";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function ShowTimeSelect() {
  const { t } = useTranslation();
  const cinemaShowtimeList = useSelector((state) => state.offer.movie?.cinemas);
  return (
    <>
      <div className="no-showtime-notification">{t("noShowtimeMessage")}</div>
      <ul className="cinema-showtime">
        {cinemaShowtimeList?.map((cinema, index) => (
          <li key={index}>
            <ShowTimeOption
              cinema={cinema}
              showTime={cinema.showtime}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ShowTimeSelect;
