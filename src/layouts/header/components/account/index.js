import { logout } from "app/features/account/accountSlice";
import useClickOutside from "hooks/useClickOutside";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import { BASE_URL, IMAGE_COLLECTION } from "utils/constant";
import "./style.scss";

function Account() {
  const ref = useRef();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownMenu = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = () => {
    setShowDropdown(false);
    dispatch(logout());
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
            <Link to={appRoutes.login.path}>
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
                  <Link to={appRoutes.profile.path}>
                    <span>{t("profile")}</span>
                  </Link>
                </li>
                <li className="menu__item" onClick={handleLogout}>
                  <Link to={appRoutes.home.path}>
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
