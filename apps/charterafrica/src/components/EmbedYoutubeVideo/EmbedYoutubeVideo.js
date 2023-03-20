import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import Comments from "@/charterafrica/components/Comments";
import YoutubeVideoPlayer from "@/charterafrica/components/YoutubeVideoPlayer";

const EmbededYoutubeVideo = forwardRef((props, ref) => {
  const { videoId } = props;
  const comments = [];
  return (
    <Box ref={ref}>
      <YoutubeVideoPlayer videoId={videoId} />
      <Comments comments={comments} />
    </Box>
  );
});

export default EmbededYoutubeVideo;

EmbededYoutubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
};
