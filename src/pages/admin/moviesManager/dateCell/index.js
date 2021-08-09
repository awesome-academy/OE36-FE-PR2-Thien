import React from "react";
import PropTypes from "prop-types";
import formatDate from "utils/formatDate";

DateCell.propTypes = {
  value: PropTypes.string,
};

function DateCell(props) {
  return <div>{formatDate(props.value)}</div>;
}

export default DateCell;
