import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "devextreme-react";
import { appRoutes } from "routers/routesConfig";
import "./style.scss";

NewsItem.propTypes = {
  news: PropTypes.object,
};

function NewsItem({ news }) {
  return (
    <article className="news-item">
      <div className="news-item__image">
        <img src={news.imgSrc} />
      </div>
      <div className="news-item__content">
        <h3>{news.title}</h3>
        <p>{news.paragraph[0]}...</p>
        <Link to={appRoutes.newsDetails.basePath + news.id}>
          <Button text="Show more"></Button>
        </Link>
      </div>
    </article>
  );
}

export default NewsItem;
