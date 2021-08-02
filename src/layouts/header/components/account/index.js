import useClickOutside from "hooks/useClickOutside";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL, IMAGE_COLLECTION } from "utils/constant";
import "./style.scss";

function Account() {
  const ref = useRef();
  const account = useSelector((state) => state.account);
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownMenu = () => {
    setShowDropdown(!showDropdown);
  };
  useClickOutside(ref, () => setShowDropdown(false));

  return (
    <div className="setting__account">
      <div className="account">
        <div className="account__avatar">
          {account.avatar ? (
            <img src={`${BASE_URL}/${IMAGE_COLLECTION}/${account.avatar}`} />
          ) : (
            <i className="fa fa-user"></i>
          )}
        </div>
        <div className="account__name">
          {account.token ? (
            <span>{account.name}</span>
          ) : (
            <Link to="/login">
              <span>{t("login")}</span>
            </Link>
          )}
        </div>
      </div>
      {account.token && (
        <div className="account__dropdown" ref={ref}>
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
