import useClickOutside from "hooks/useClickOutside";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ROUTES_CONFIG from "routers/routesConfig";
import Account from "../account";
import "./style.scss";

function NavBar() {
  const { t } = useTranslation();
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  const toggleMenu = () => {
    setDropdown(!dropdown);
  };

  const collapseMenu = () => {
    setDropdown(false);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setDropdown(false);
    }
  };

  useClickOutside(ref, collapseMenu);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="bottom-menu__content container" ref={ref}>
      <button className="menu__toggle" onClick={toggleMenu}>
        <i className="fa fa-bars" />
      </button>
      <div className="navbar__account">
        <Account />
      </div>
      <nav>
        <ul className={`navbar__menu ${dropdown && "dropdown"}`}>
          {ROUTES_CONFIG.APP_ROUTES.map(
            (route, index) =>
              route.navbar && (
                <li
                  key={index}
                  className="navbar-menu__item"
                  onClick={collapseMenu}
                >
                  <NavLink to={route.path}>
                    <span>{t(route.name)}</span>
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
