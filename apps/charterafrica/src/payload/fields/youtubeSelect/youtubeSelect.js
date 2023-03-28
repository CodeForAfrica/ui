import {
  useAllFormFields,
  Select,
  getSiblingData,
} from "payload/components/forms";
import { createElement, useMemo } from "react";
import useSWR from "swr";

import { mapPlaylistLinkToId } from "../../utils/mapPlaylistLinkToId";

const fetcher = (url) => fetch(url).then((res) => res.json());

function YoutubeSelect(props) {
  const [fields] = useAllFormFields();

  const { blocks } = getSiblingData(fields, "blocks");
  const currentBlock = blocks.find(
    (block) => block?.blockType === "consultation-multimedia"
  );
  const link = currentBlock?.playlist?.link;
  const playlistId = mapPlaylistLinkToId({
    siblingData: { link },
  });
  const params = {
    pathname: "/playlistItems",
    playlistId,
    part: "snippet",
  };
  const queryString = new URLSearchParams(params).toString();
  const { data } = useSWR(
    playlistId
      ? `/api/v1/opportunities/consultation/multimedia?${queryString}`
      : null,
    fetcher
  );
  const memoOptions = () =>
    data?.items?.map((video) => ({
      label: video?.snippet?.title,
      value: video?.snippet?.resourceId?.videoId,
    })) || [];
  const options = useMemo(memoOptions, [data?.items]);
  return createElement(Select, { ...props, options });
}

export default YoutubeSelect;
