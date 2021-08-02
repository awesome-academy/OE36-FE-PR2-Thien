import React from "react";
import logo from "assets/images/logo.png";
import ROUTES_CONFIG from "routers/routesConfig";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style.scss";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="page__footer">
      <section className="footer__top container">
        <div className="footer__logo">
          <img src={logo} />
        </div>
        <nav className="nav-menu">
          <ul className="navbar__menu">
            {ROUTES_CONFIG.APP_ROUTES.map((route, index) => {
              if (route.navbar) {
                return (
                  <li key={index} className="navbar-menu__item">
                    <Link to={route.path}>
                      <span>{t(route.name)}</span>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </section>
      <section className="contact-info container">
        <div className="hotline">
          <i className="fa fa-phone" />
          <a href="tel:0886255666"> 0886255666</a>
        </div>
        <div className="separate">|</div>
        <div className="social__list">
          <nav>
            <ul>
              <li className="social__item">
                <a href="/">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="social__item">
                <a href="/">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li className="social__item">
                <a href="/">
                  <i className="fa fa-whatsapp"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <div className="copyright">2021 © CINE APP. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;
