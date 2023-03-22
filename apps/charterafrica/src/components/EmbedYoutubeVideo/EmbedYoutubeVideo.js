import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import useSWR from "swr";

import Comments from "@/charterafrica/components/Comments";
import YoutubeVideoPlayer from "@/charterafrica/components/YoutubeVideoPlayer";
import { YOUTUBE_BASE_URL } from "@/charterafrica/utils/constants";

const fetcher = (url) => fetch(url).then((res) => res.json());

const EmbededYoutubeVideo = forwardRef((props, ref) => {
  const { config, videoId } = props;

  const [params, setParams] = useState({
    videoId,
    part: ["snippet", "replies"],
    sort: "relevance",
  });

  const searchParams = new URLSearchParams(params).toString();
  const { data } = useSWR(
    `${YOUTUBE_BASE_URL}/commentThreads?${searchParams}`,
    fetcher
  );

  const comments =
    data?.items?.map((item) => ({
      id: item.id,
      ...item?.snippet?.topLevelComment?.snippet,
      threads:
        item.replies?.comments?.map((thread) => ({
          id: thread.id,
          ...thread.snippet,
          comment: thread.snippet.textDisplay,
        })) || [],
    })) || [];

  const theme = useTheme();
  return (
    <Box ref={ref}>
      <YoutubeVideoPlayer videoId={videoId} />
      <Comments
        comments={comments}
        config={config}
        onSortChange={(e) => setParams((v) => ({ ...v, sort: e.target.value }))}
        sx={{
          border: `1px solid ${theme.palette.neutral.dark}`,
        }}
      />
    </Box>
  );
});

export default EmbededYoutubeVideo;

EmbededYoutubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
};
