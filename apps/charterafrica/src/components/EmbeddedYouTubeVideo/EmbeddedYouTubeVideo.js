import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import useSWR from "swr";

import Comments from "@/charterafrica/components/Comments";
import YoutubeVideoPlayer from "@/charterafrica/components/YoutubeVideoPlayer";

const fetcher = (url) => fetch(url).then((res) => res.json());

const EmbededYoutubeVideo = forwardRef((props, ref) => {
  const { config, videoId } = props;
  const [sort, setSort] = useState("relevance");

  const params = {
    videoId,
    part: ["snippet", "replies"],
    sort,
    pathname: "/commentThreads",
  };

  const searchParams = new URLSearchParams(params).toString();
  const { data } = useSWR(
    `/api/v1/opportunities/consultation/multimedia?${searchParams}`,
    fetcher,
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

  return (
    <Box ref={ref}>
      <YoutubeVideoPlayer videoId={videoId} />
      <Comments
        comments={comments}
        config={config}
        onSortChange={(e) => setSort(e.target.value)}
        sx={{
          border: "1px solid",
          borderColor: "neutral.dark",
        }}
      />
    </Box>
  );
});

export default EmbededYoutubeVideo;

EmbededYoutubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
};
