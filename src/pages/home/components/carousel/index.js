import { Gallery } from "devextreme-react";
import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./style.scss";

Carousel.propTypes = {
  data: PropTypes.array,
};

function Carousel(props) {
  let history = useHistory();

  const handleClick = (event) => {
    history.push(event.itemData.eventPath);
  };

  return (
    <>
      <section className="carousel">
        <Gallery
          id="carousel"
          dataSource={props.data}
          slideshowDelay={15000}
          loop={true}
          showNavButtons={true}
          showIndicator={true}
          onItemClick={handleClick}
        />
      </section>
    </>
  );
}

export default Carousel;