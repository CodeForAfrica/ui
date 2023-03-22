export const mapPlaylistLinkToId = ({ siblingData }) => {
  const { playlistLink } = siblingData;
  const searchParams = playlistLink?.split("?")?.[1];
  const playlistId = new URLSearchParams(searchParams).get("list");
  return playlistId;
};

export const mapVideoUrlToId = ({ siblingData }) => {
  const { videoLink } = siblingData;

  const sharedId = videoLink.split("https://youtu.be/")?.[1];
  const searchParams = videoLink?.split("?")?.[1];
  const videoId = new URLSearchParams(searchParams).get("v");

  return sharedId || videoId || "";
};
