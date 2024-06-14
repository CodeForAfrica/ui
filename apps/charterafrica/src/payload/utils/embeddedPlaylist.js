export const BLOCK_SLUG = "embedded-playlist";

export const mapPlaylistLinkToId = ({ siblingData }) => {
    try {
        const { link } = siblingData;
        const url = new URL(link);
        const playlistId = url.searchParams.get("list");
        return playlistId;
    } catch (error) {
        return "";
    }
};

function getEmbeddedPlaylistFromBlock(block) {
    const link = block?.playlist?.link;
    const playlistId = mapPlaylistLinkToId({
        siblingData: { link }
    });
    const params = {
        maxResults: 100,
        part: "snippet",
        pathname: "/playlistItems",
        playlistId
    };
    const queryString = new URLSearchParams(params).toString();

    return { playlistId, queryString };
}

export function getEmbeddedPlaylist(documents = {}, blockSlug = BLOCK_SLUG) {
    const { blocks } = documents;
    const block = blocks?.find((b) => b?.blockType === blockSlug);
    console.log(blocks);
    return getEmbeddedPlaylistFromBlock(block);
}
