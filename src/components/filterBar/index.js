import apiCinema from "apis/tasks/apiCinema";
import { GENRE_DATA, LANGUAGE_DATA } from "constants/common";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { SelectBox, TextBox } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import PropTypes from "prop-types";
import "./style.scss";

FilterBar.propTypes = {
  filters: PropTypes.object,
  onFiltersChange: PropTypes.func,
  onCinemaChange: PropTypes.func
};

function FilterBar({ onFiltersChange, filters, onCinemaChange }) {
  const [cinemaData, setCinemaData] = useState([]);

  useEffect(() => {
    try {
      apiCinema.get().then((response) => {
        setCinemaData(response.data);
      });
    } catch (error) {
      dispatch(warning(error.message || ERROR_NOTIFICATION));
    }
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  let timeout;
  const handleChangeMovieName = ({ event }) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onFiltersChange({ ...filters, _page: 1, name_like: event.target.value });
    }, 500);
  };

  const handleChangeCinema = (cinema) => {
    onFiltersChange({ ...filters, _page: 1, cinemas_like: cinema.id });
    onCinemaChange(cinema)
  };

  const handleChangeLanguage = (language) => {
    onFiltersChange({ ...filters, _page: 1, language_like: language });
  };

  const handleChangeGenre = (genre) => {
    onFiltersChange({ ...filters, _page: 1, genre_like: genre });
  };

  return (
    <div className="filter-bar">
      <SelectBox
        items={cinemaData}
        displayExpr="name"
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
