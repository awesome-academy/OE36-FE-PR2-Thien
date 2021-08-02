import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

CustomToast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

function CustomToast({ type, message }) {
  const { t } = useTranslation();
  return (
    <div className="toast">
      <div className="header">{type}</div>
      <div className="message">{t(message)}</div>
    </div>
  );
}

export default CustomToast;
