/* eslint-disable jsx-a11y/media-has-caption */
import { Box, styled } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

const StyledDiv = styled(Box)({
  minWidth: "100%",
  height: "100%",
  "& .video-js .vjs-big-play-button": {
    height: "100%",
    left: 0,
    top: 0,
    width: "100%",
    borderRadius: 0,
    background: "rgba(62,32,44, 0.9)",
    border: "none",
  },
  "& .video-js .vjs-big-play-button:hover": {
    height: "100%",
    left: 0,
    top: 0,
    width: "100%",
    borderRadius: 0,
    background: "rgba(62,32,44, 0.8)",
  },
  ".vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before":
    {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // Since we are not using icon of height 126 but rather content "\f101"
      fontSize: 126,
    },
});

function YoutubeVideoPlayer({ videoId }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const parentRef = useRef(null);

  const src = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const options = {
        autoplay: false,
        controls: true,
        preload: "auto",
        sources: [{ src, type: "video/youtube" }],
        techOrder: ["youtube"],
        height: "auto",
        youtube: { ytControls: 2 },
      };
      playerRef.current = videojs(videoRef.current, options);
    }
  }, [src]);

  return (
    <StyledDiv ref={parentRef}>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-fluid vjs-default-skin hide"
        />
      </div>
    </StyledDiv>
  );
}

YoutubeVideoPlayer.propTypes = {
  videoId: PropTypes.string,
};

YoutubeVideoPlayer.defaultProps = {
  videoId: undefined,
};

export default YoutubeVideoPlayer;
