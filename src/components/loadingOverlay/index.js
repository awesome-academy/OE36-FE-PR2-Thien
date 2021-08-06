import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./style.scss";

function LoadingOverlay() {
  const showLoading = useSelector((state) => state.common.showLoading);
  const { t } = useTranslation();
  return (
    <div className={`overlay__wrap ${showLoading && "visible"}`}>
      <div className="loading-overlay">
        <span>{t("loading")}</span>
      </div>
    </div>
  );
}

export default LoadingOverlay;
