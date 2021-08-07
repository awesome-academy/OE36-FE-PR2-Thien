import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../components/languageSwitcher";
import Account from "../../components/account";
import NavBar from "./components/navbar";
import logo from "assets/images/logo.png";
import "./style.scss";
import { appRoutes } from "routers/routesConfig";

function Header() {
  return (
    <header className="page__header">
      <div className="header-content__wrap">
        <section className="header__top container">
          <div className="header-top__logo">
            <Link to={appRoutes.home.path}>
              <img src={logo} alt="logo cinema" />
            </Link>
          </div>
          <div className="header-top__setting">
            <Account />
            <LanguageSwitcher />
          </div>
        </section>
        <section className="header__bottom">
          <NavBar />
        </section>
      </div>
    </header>
  );
}

export default Header;
