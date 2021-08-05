import React from "react";
import getEmbedId from "utils/embedId";
import { EMBED_VIDEO_PARAM, YOUTUBE_EMBED_URL } from "utils/constant";
import { useSelector } from "react-redux";
import "./style.scss";

function MovieEmbed() {
  const isPlay = useSelector((state) => state.common.playEmbedVideo);
  const movieUrl = useSelector((state) => state.offer.movie?.trailerUrl);
  return (
    <>
      <iframe
        name="background"
        width="853"
        height="480"
        src={
          YOUTUBE_EMBED_URL +
          getEmbedId(movieUrl) +
          `?autoplay=${isPlay}&` +
          EMBED_VIDEO_PARAM
        }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Embedded youtube"
      />
      <div className="movie__mask"></div>
    </>
  );
}

export default MovieEmbed;
