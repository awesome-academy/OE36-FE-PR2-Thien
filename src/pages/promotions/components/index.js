import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Link } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";

PromotionItem.propTypes = {
  promotion: PropTypes.object,
};

function PromotionItem({ promotion }) {
  return (
    <div className="promotion-item">
      <div className="promotion-item__image">
        <img src={promotion.imgSrc} />
      </div>
      <div className="promotion-item__overlay">
        <h3 className="promotion-item__title">{promotion.title}</h3>
        <Link to={appRoutes.promotionDetails.basePath + promotion.id}>
          <div className="show-details">
            <span>Show more</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PromotionItem;
