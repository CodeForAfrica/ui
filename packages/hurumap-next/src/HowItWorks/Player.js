/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

function Player({ url, type }) {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const options = {
        autoplay: false,
        controls: true,
        preload: "auto",
        sources: [{ src: url, type }],
        techOrder: ["youtube"],
        youtube: { ytControls: 2 },
      };
      playerRef.current = videojs(videoRef.current, options);
    }
  }, [url, type]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin hide" />
    </div>
  );
}

Player.propTypes = {
  url: PropTypes.string,
  type: PropTypes.string,
};

export default Player;
