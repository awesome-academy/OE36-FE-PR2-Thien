import { Button, SelectBox } from "devextreme-react";
import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  changeLimit,
  changePage,
} from "app/features/movieFilter/movieFilterSlice";

Paging.propTypes = {
  length: PropTypes.number,
  total: PropTypes.number,
  limit: PropTypes.number,
  current: PropTypes.number,
};

function Paging({ length, total, current, limit }) {
  const maxPage = Math.ceil(total / limit);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleChangeLimit = (limit) => {
    dispatch(changeLimit(limit));
  };
  const handleGotoPrev = () => {
    dispatch(changePage(current - 1));
  };

  const handleGotoNext = () => {
    dispatch(changePage(current + 1));
  };
  return (
    <div className="paging">
      <div className="paging__limit">
        {total > 0 && (
          <>
            <span>{t("show")}</span>
            <SelectBox
              items={[4, 8, 16, 32]}
              displayValue="8"
              defaultValue={8}
              onValueChange={handleChangeLimit}
            />
            <span>
              {t("movies")} {t("perPage")}
            </span>
          </>
        )}
      </div>
      <div className="paging__info">
        {total > 0 ? (
          <span>
            {t("show")} {limit * (current - 1) + 1} -{" "}
            {limit * (current - 1) + Math.min(length, limit)} {t("ofNumber")}{" "}
            {total || 0} {t("movies")}
          </span>
        ) : (
          <span>{t("noMatching")}</span>
        )}
      </div>
      <div className="paging__control">
        {total > 0 && (
          <>
            <Button
              disabled={current === 1}
              component={() => <i className="fa fa-caret-left" />}
              onClick={handleGotoPrev}
            />
            <Button
              disabled={current === maxPage}
              component={() => <i className="fa fa-caret-right" />}
              onClick={handleGotoNext}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Paging;
