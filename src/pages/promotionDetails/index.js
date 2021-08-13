import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import apiPromotions from "apis/tasks/apiPromotions";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { changeShowLoading } from "app/features/common";
import "./style.scss";

PromotionDetails.propTypes = {
  match: PropTypes.object,
};

function PromotionDetails({ match }) {
  const promotionsId = match.params.movieId;
  const [promotionData, setPromotionData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiPromotions.getById(promotionsId).then((response) => {
        if (response.status === 200) {
          setPromotionData(response.data);
        }
        dispatch(changeShowLoading(false));
      });
    } catch (err) {
      dispatch(changeShowLoading(false));
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, [promotionsId]);
  return (
    <article className="promotion-details container">
      {!promotionsId && <Redirect to={appRoutes.promotions.path} />}
      <h2 className="promotion-details__title">{promotionData.title}</h2>
      <div className="promotion-details__content">
        <div className="content__image">
          <img src={promotionData.imgSrc} />
        </div>
        <div className="content__text">
          {promotionData.paragraph?.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default PromotionDetails;
