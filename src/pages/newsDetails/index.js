/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { changeShowLoading } from "app/features/common";
import apiNews from "apis/tasks/apiNews";
import { warning } from "react-toastify-redux";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { Redirect } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import "./style.scss";

NewsDetails.propTypes = {
  match: PropTypes.object,
};

function NewsDetails({ match }) {
  const newsId = match.params.newsId;
  const [newsData, setNewsData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiNews.getById(newsId).then((response) => {
        if (response.status === 200) {
          setNewsData(response.data);
        }
        dispatch(changeShowLoading(false));
      });
    } catch (err) {
      dispatch(changeShowLoading(false));
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, [newsId]);
  return (
    <article className="news-details container">
      {!newsId && <Redirect to={appRoutes.news.path} />}
      <h2 className="news-details__title">{newsData.title}</h2>
      <div className="news-details__content">
        <div className="content__image">
          <img src={newsData.imgSrc} />
        </div>
        <div className="content__text">
          {newsData.paragraph?.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default NewsDetails;
