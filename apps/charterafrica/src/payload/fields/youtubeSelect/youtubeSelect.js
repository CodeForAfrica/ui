import {
  useAllFormFields,
  Select,
  getSiblingData,
} from "payload/components/forms";
import { createElement, useMemo } from "react";
import useSWR from "swr";

import { getEmbeddedPlaylist } from "../../utils/embeddedPlaylist";

const fetcher = (url) => fetch(url).then((res) => res.json());

function YouTubeSelect(props) {
  const [fields] = useAllFormFields();

  const document = getSiblingData(fields, "blocks");
  const { playlistId, queryString } = getEmbeddedPlaylist(document);
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

export default YouTubeSelect;
