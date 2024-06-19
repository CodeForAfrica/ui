import { fetchPlaylistItems } from "@/charterafrica/lib/youtube";
import formatDateTime from "@/charterafrica/utils/formatDate";

const airedOnText = {
  en: "Aired on",
  pt: "Exibido em",
  fr: "Diffusé sur",
};
export async function getVideosFromPlaylist(
  playlistId,
  options,
  locale = "en",
) {
  if (!playlistId) {
    return [];
  }

  const videosFromApi = await fetchPlaylistItems(playlistId, options);
  const items =
    videosFromApi.items?.map(({ snippet, ...restArgs }) => {
      const { description, publishedAt } = snippet;
      return {
        ...snippet,
        ...snippet?.resourceId,
        ...restArgs,
        description: description?.replace(/\r?\n/g, "<br />") || null,
        publishedAt: formatDateTime(publishedAt, {
          locale,
        }),
      };
    }) || [];
  return items;
}

async function getFeaturedVideos(featured, playlistItems) {
  if (featured?.featuredType === "latest") {
    const sortedItems = playlistItems.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
    );
    if (sortedItems?.length) {
      return sortedItems.slice(0, 3);
    }
    return null;
  }
  if (featured?.featuredType === "custom") {
    const items =
      featured?.items?.map((item) =>
        playlistItems.find((plItem) => plItem.videoId === item),
      ) ?? null;
    return items;
  }
  return playlistItems;
}

async function featuredVideos(unProcessedPage, locale) {
  const page = unProcessedPage;
  const { blocks } = page;
  const featuredVideosIndex = blocks.findIndex(
    (block) => block.slug === "featured-videos",
  );
  if (featuredVideosIndex > -1) {
    const { featured: featuredField, playlist: playlistField } =
      blocks[featuredVideosIndex];
    const items = await getVideosFromPlaylist(
      playlistField?.playlistId,
      locale,
    );
    const featured = await getFeaturedVideos(featuredField, items);
    const block = {
      ...blocks[featuredVideosIndex]?.playlist,
      slug: "featured-videos",
      items: featured ?? [],
      airedOnText: airedOnText[locale],
    };
    page.blocks[featuredVideosIndex] = block;
  }
  return page;
}

export default featuredVideos;
