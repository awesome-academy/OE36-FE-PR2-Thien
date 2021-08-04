import React from "react";
import PropTypes from "prop-types";
import getEmbedId from "utils/embedId";
import "./style.scss";
import { YOUTUBE_EMBED_URL } from "utils/constant";

MovieEmbed.propTypes = {
  movieUrl: PropTypes.string,
};

function MovieEmbed({ movieUrl }) {
  return (
    <>
      <iframe
        name="background"
        width="853"
        height="480"
        src={`${YOUTUBE_EMBED_URL}${getEmbedId(
          movieUrl
        )}?autoplay=0&controls=0&showinfo=0&autohide=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Embedded youtube"
      />
      <div className="movie__mask"></div>
    </>
  );
}

export default MovieEmbed;
