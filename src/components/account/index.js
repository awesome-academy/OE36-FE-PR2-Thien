import { logout } from "app/features/account/accountSlice";
import { IMAGE_COLLECTION } from "constants/collections";
import baseUrl from "apis/utils/apiConfig";
import useClickOutside from "hooks/useClickOutside";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { adminRoutes, appRoutes } from "routers/routesConfig";
import checkBaseName from "utils/checkBaseName";
import "./style.scss";

function Account() {
  const ref = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector((state) => state.account);

  const [routes, setRoutes] = useState(appRoutes);
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownMenu = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    history.replace(routes.home.path);
    dispatch(logout());
  };
  useClickOutside(ref, () => setShowDropdown(false));
  useEffect(() => {
    const newRoutes = checkBaseName(history.location.pathname)
      ? adminRoutes
      : appRoutes;
    setRoutes(newRoutes);
  }, [history.location.pathname]);
  return (
    <div className="setting__account">
      <div className="account">
        <div className="account__avatar">
          {account.avatar ? (
            <img src={`${baseUrl}/${IMAGE_COLLECTION}/${account.avatar}`} />
          ) : (
            <i className="fa fa-user"></i>
          )}
        </div>
        <div className="account__name">
          {account.token ? (
            <span>{account.name}</span>
          ) : (
            <Link to={routes.login.path}>
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
                <li
                  className="menu__item"
                  onClick={() => setShowDropdown(false)}
                >
                  <Link to={routes.profile.path}>
                    <span>{t("profile")}</span>
                  </Link>
                </li>
                <li className="menu__item" onClick={handleLogout}>
                  <Link to={routes.home.path}>
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
