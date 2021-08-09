import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

ImageCell.propTypes = {
  value: PropTypes.string,
};

function ImageCell(props) {
  return <img className="image-cell" src={props.value} loading="lazy" />;
}
export default ImageCell;
