import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { adminRoutes } from "routers/routesConfig";
import "./style.scss";

function AdminSidebar() {
  const { t } = useTranslation();
  const icons = [
    <i key={0} className="fa fa-tachometer" aria-hidden="true"></i>,
    <i key={1} className="fa fa-user-o" aria-hidden="true"></i>,
    <i key={2} className="fa fa-film" aria-hidden="true"></i>,
    <i key={3} className="fa fa-calendar" aria-hidden="true"></i>,
    <i key={4} className="fa fa-ticket" aria-hidden="true"></i>,
  ];
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul className={`navbar__menu`}>
          {Object.entries(adminRoutes).map(
            ([name, route], index) =>
              route.navbar && (
                <li key={index} className="navbar-menu__item">
                  <NavLink to={route.path}>
                    {icons[index]}
                    <span>{t(name)}</span>
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
