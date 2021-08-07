import React, { useRef } from "react";
import useClickOutside from "hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { changeShowVideo } from "app/features/common";
import { YOUTUBE_EMBED_URL } from "constants/common";
import "./style.scss";

function VideoOverlay() {
  const video = useRef();
  const dispatch = useDispatch();
  const handleClickOutside = () => {
    dispatch(changeShowVideo({ showVideo: false }));
  };
  const showVideo = useSelector((state) => state.common.showVideo);
  const embedId =  useSelector((state) => state.common.videoEmbedId);
  
  useClickOutside(video, () => handleClickOutside());
  return (
    <div className={`overlay__wrap video__wrap ${showVideo && "visible"}`}>
      <iframe
        ref={video}
        width="853"
        height="480"
        src={`${YOUTUBE_EMBED_URL}${embedId}?rel=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default VideoOverlay;
