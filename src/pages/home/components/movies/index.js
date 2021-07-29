import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MovieItem from "components/movieItem";
import "./style.scss";
import { Link } from "react-router-dom";

MoviesList.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  listData: PropTypes.array,
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
          {props.listData.map((movie, index) => (
            <li key={index}>
              <MovieItem
                name={movie.name}
                genre={movie.genre}
                duration={movie.duration}
                imageSrc={movie.imageSrc}
              />
            </li>
          ))}
        </ul>
      </main>
      <footer className="section__footer">
        <Link to="">{t("showMore")}</Link>
      </footer>
    </section>
  );
}

export default MoviesList;
