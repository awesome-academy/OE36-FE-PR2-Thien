import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";

function Account() {
  const account = useSelector((state) => state.account);
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownMenu = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="setting__account">
      <div className="account">
        <div className="account__avatar">
          {!account.username && <i className="fa fa-user"></i>}
        </div>
        <div className="account__name">
          {!account.username && (
            <Link to="/login">
              <span>{t("login")}</span>
            </Link>
          )}
        </div>
      </div>
      {account.username && (
        <div className="account__dropdown">
          <button className="dropdown__button" onClick={showDropdownMenu}>
            <i className="fa fa-angle-down" />
          </button>
          <div className={`${showDropdown && "active"} dropdown__menu`}>
            <nav>
              <ul>
                <li className="menu__item">
                  <Link to="/profile">
                    <span>{t("profile")}</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to="/">
                    <span>{t("logout")}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
