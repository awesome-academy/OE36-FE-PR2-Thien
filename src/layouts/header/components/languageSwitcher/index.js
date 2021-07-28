import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.dataset.value);
  };
  return (
    <div className="setting__language">
      <ul className="language-list">
        <li
          className={`language-list__item ${i18n.language === "en" && "active"}`}
          onClick={changeLanguage}
          data-value="en"
        >
          EN
        </li>
        <span className="separate"></span>
        <li
          className={`language-list__item ${i18n.language === "vi" && "active"}`}
          onClick={changeLanguage}
          data-value="vi"
        >
          VI
        </li>
      </ul>
    </div>
  );
}

export default LanguageSwitcher;
