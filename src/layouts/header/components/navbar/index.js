import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ROUTES_CONFIG from "routers/routesConfig";
import "./style.scss";

function NavBar() {
  const { t } = useTranslation();
  const [dropdown, setDropdown] = useState(false);
  const dropdownMenu = () => {
    setDropdown(!dropdown);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="bottom-menu__content container">
      <button className="menu__toggle" onClick={dropdownMenu}>
        <i className="fa fa-bars" />
      </button>
      <nav>
        <ul className={`navbar__menu ${dropdown && "dropdown"}`}>
          {ROUTES_CONFIG.map((route, index) => (
            <li key={index} className="navbar-menu__item">
              <NavLink to={route.path}>
                <span>{t(route.name)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
