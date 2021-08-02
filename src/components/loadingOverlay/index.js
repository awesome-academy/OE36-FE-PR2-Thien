import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

function LoadingOverlay() {
  const { t } = useTranslation();
  return (
    <div className="loading-overlay__wrap">
      <div className="loading-overlay">
        <span>{t("loading")}</span>
      </div>
    </div>
  );
}

export default LoadingOverlay;
