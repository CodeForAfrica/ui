export const mapPlaylistLinkToId = ({ siblingData }) => {
  const { playlistLink } = siblingData;
  const url = new URL(playlistLink);
  const playlistId = url.searchParams.get("list");
  return playlistId;
};

export const mapVideoUrlToId = ({ siblingData }) => {
  const { videoLink } = siblingData;
  const sharedId = videoLink.split("https://youtu.be/")?.[1];
  const url = new URL(videoLink);
  const videoId = url.searchParams.get("v");
  return sharedId || videoId || "";
};
