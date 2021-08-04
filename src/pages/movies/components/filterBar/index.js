import apiCinema from "apis/tasks/apiCinema";
import {
  changeCinema,
  changeGenre,
  changeLanguage,
  changeMovieName,
} from "app/features/movieFilter/movieFilterSlice";
import { SelectBox, TextBox } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import { ERROR_NOTIFICATION, GENRE_DATA, LANGUAGE_DATA } from "utils/constant";
import "./style.scss";

function FilterBar() {
  const [cinemaData, setCinemaData] = useState([]);

  useEffect(() => {
    try {
      apiCinema.get().then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setCinemaData(response.data);
        } else {
          dispatch(warning(response.data || ERROR_NOTIFICATION));
        }
      });
    } catch (error) {
      dispatch(warning(error.message || ERROR_NOTIFICATION));
    }
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  let timeout;
  const handleChangeMovieName = (movieName) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(movieName.event.target.value);
      dispatch(changeMovieName(movieName.event.target.value));
    }, 500);
  };

  const handleChangeCinema = (cinema) => {
    dispatch(changeCinema(cinema));
  };

  const handleChangeLanguage = (language) => {
    dispatch(changeLanguage(language));
  };

  const handleChangeGenre = (genre) => {
    dispatch(changeGenre(genre));
  };

  return (
    <div className="filter-bar">
      <SelectBox
        items={cinemaData}
        displayExpr="name"
        valueExpr="name"
        placeholder={t("cinemas")}
        onValueChange={handleChangeCinema}
      />
      <SelectBox
        items={LANGUAGE_DATA}
        displayExpr="label"
        valueExpr="value"
        placeholder={t("language")}
        onValueChange={handleChangeLanguage}
      />
      <SelectBox
        items={GENRE_DATA}
        displayExpr="label"
        valueExpr="value"
        placeholder={t("genre")}
        onValueChange={handleChangeGenre}
      />
      <TextBox onKeyUp={handleChangeMovieName} placeholder={t("movieName")} />
    </div>
  );
}

export default FilterBar;
