import React from "react";
import PropTypes from "prop-types";
import { Button, SelectBox } from "devextreme-react";
import { useTranslation } from "react-i18next";

Paging.propTypes = {
  content: PropTypes.string,
  length: PropTypes.number,
  total: PropTypes.number,
  filters: PropTypes.object,
  onFiltersChange: PropTypes.func,
};

function Paging({ content, length, total, filters, onFiltersChange }) {
  const maxPage = Math.ceil(total / filters._limit);
  const limit = Number(filters._limit);
  const page = Number(filters._page);
  const { t } = useTranslation();
  const handleChangeLimit = (limit) => {
    onFiltersChange({ ...filters, _limit: limit });
  };
  const handleGotoPrev = () => {
    onFiltersChange({ ...filters, _page: page - 1 });
  };

  const handleGotoNext = () => {
    onFiltersChange({ ...filters, _page: page + 1 });
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
              {t(content)} {t("perPage")}
            </span>
          </>
        )}
      </div>
      <div className="paging__info">
        {total > 0 ? (
          <span>
            {`${t("show")} ${limit * (page - 1) + 1} - ${
              limit * (page - 1) + Math.min(length, limit)
            } ${t("ofNumber")} ${total || 0} ${t(content)}`}
          </span>
        ) : (
          <span>{t("noMatching")}</span>
        )}
      </div>
      <div className="paging__control">
        {total > 0 && (
          <>
            <Button
              disabled={page === 1}
              component={() => <i className="fa fa-caret-left" />}
              onClick={handleGotoPrev}
            />
            <Button
              disabled={page === maxPage}
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
