import React from "react";
import { Link } from "react-router-dom";
import { adminRoutes } from "routers/routesConfig";
import logo from "assets/images/logo.png";
import Account from "components/account";
import LanguageSwitcher from "components/languageSwitcher";
import "./style.scss";

function AdminHeader() {
  return (
    <header className="page__header">
      <div className="header-content__wrap">
        <section className="header-content">
          <div className="header-content__logo">
            <Link to={adminRoutes.home.path}>
              <img src={logo} alt="logo cinema" />
            </Link>
          </div>
          <div className="header-top__setting">
            <Account />
            <LanguageSwitcher />
          </div>
        </section>
      </div>
    </header>
  );
}

export default AdminHeader;
