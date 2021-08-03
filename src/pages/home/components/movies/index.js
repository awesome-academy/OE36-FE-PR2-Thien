import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MovieItem from "components/movieItem";
import "./style.scss";
import { Link } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";

MoviesList.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  listData: PropTypes.array,
  category: PropTypes.string,
};

function MoviesList(props) {
  const { t } = useTranslation();
  return (
    <section id={props.id} className="container">
      <header className="section__header">
        <h2 className="section__title">{t(props.title)}</h2>
      </header>
      <main className="section__content">
        <ul>
          {props.listData?.map((movie, index) => (
            <li key={index}>
              <MovieItem
                movie={movie}
              />
            </li>
          ))}
        </ul>
      </main>
      <footer className="section__footer">
        <Link
          to={{ pathname: appRoutes.movies.path, category: props.category }}
        >
          {t("showMore")}
        </Link>
      </footer>
    </section>
  );
}

export default MoviesList;
