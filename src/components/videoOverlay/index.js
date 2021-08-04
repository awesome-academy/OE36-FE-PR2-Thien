import React, { useRef } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import useClickOutside from "hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { changeShowVideo } from "app/features/common";
import { YOUTUBE_EMBED_URL } from "utils/constant";

VideoOverlay.propTypes = {
  embedId: PropTypes.string,
};

function VideoOverlay({ embedId }) {
  const video = useRef();
  const dispatch = useDispatch();
  const handleClickOutside = () => {
    dispatch(changeShowVideo({ showVideo: false }));
  };
  useClickOutside(video, () => handleClickOutside());
  return (
    <div className="overlay__wrap">
      <iframe
        ref={video}
        width="853"
        height="480"
        src={`${YOUTUBE_EMBED_URL}${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default VideoOverlay;
