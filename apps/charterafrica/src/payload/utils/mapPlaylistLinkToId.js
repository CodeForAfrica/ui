export const mapPlaylistLinkToId = ({ siblingData }) => {
  try {
    const { playlistLink } = siblingData;
    const url = new URL(playlistLink);
    const playlistId = url.searchParams.get("list");
    return playlistId;
  } catch (error) {
    return "";
  }
};

export const mapVideoUrlToId = ({ siblingData }) => {
  try {
    const { videoLink } = siblingData;
    const sharedId = videoLink.split("https://youtu.be/")?.[1];
    const url = new URL(videoLink);
    const videoId = url.searchParams.get("v");
    return sharedId || videoId || "";
  } catch (error) {
    return "";
  }
};
