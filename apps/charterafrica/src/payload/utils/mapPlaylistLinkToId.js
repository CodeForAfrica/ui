const mapLinkToId = ({ siblingData }) => {
  const { playlistLink } = siblingData;
  const searchParams = playlistLink?.split("?")?.[1];
  const playlistId = new URLSearchParams(searchParams).get("list");
  return playlistId;
};

export default mapLinkToId;
