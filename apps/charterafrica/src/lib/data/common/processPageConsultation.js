import {
  fetchDocuments,
  fetchDocumentIframe,
} from "@/charterafrica/lib/sourceAfrica";
import { fetchPlaylistItems } from "@/charterafrica/lib/youtube";
import getDocumentsQuery from "@/charterafrica/utils/documents/documents";
import documentsQueryString from "@/charterafrica/utils/documents/queryString";

export async function getVideosFromPlaylist(playlistId, options) {
  if (!playlistId) {
    return [];
  }

  const videosFromApi = await fetchPlaylistItems(playlistId, options);
  const items =
    videosFromApi.items?.map(({ snippet, ...restArgs }) => {
      const { description } = snippet;
      return {
        ...snippet,
        ...snippet?.resourceId,
        ...restArgs,
        description: description?.replace(/\r?\n/g, "<br />") || null,
      };
    }) || [];
  return items;
}

async function getFeaturedConsultations(featured, playlistItems) {
  if (featured?.featuredType === "latest") {
    const sortedItems = playlistItems.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    if (sortedItems?.length) {
      return sortedItems.slice(0, 1);
    }
    return null;
  }
  if (featured?.featuredType === "custom") {
    const items =
      featured?.items?.map((item) =>
        playlistItems.find((plItem) => plItem.videoId === item)
      ) ?? null;
    return items;
  }
  // featuredType === 'none', show nothing
  return null;
}

async function processPageConsultationDocument(page, api, context) {
  const { query } = context;

  const { title, slugs, ...rest } = query;

  const data = await fetchDocumentIframe(rest);
  const { html } = data;

  return {
    ...page,
    blocks: [
      {
        slug: "embedded-document-viewer",
        html,
        title,
      },
    ],
  };
}

async function processPageConsultation(page, api, context) {
  const { params } = context;

  // Check if we are on a document page: /opportunities/consultation/documents
  if (params.slugs.length > 2 && params.slugs[2] === "documents") {
    return processPageConsultationDocument(page, api, context);
  }

  const { blocks } = page;
  const documentsIndex = blocks.findIndex(
    ({ slug }) => slug === "embedded-documents"
  );
  if (documentsIndex > -1) {
    const {
      description: documentsDescription,
      group: { groupId, options },
      title: documentsTitle,
    } = blocks[documentsIndex];
    const query = getDocumentsQuery(context, options);
    const documents = await fetchDocuments(`group:${groupId}`, query);
    blocks[documentsIndex] = {
      ...documents,
      slug: "documents",
      description: documentsDescription ?? null,
      options,
      title: documentsTitle ?? null,
    };
    // SWR fallback
    let swrKey = `/api/v1/opportunities/consultation/documents`;
    const qs = documentsQueryString(query);
    if (qs) {
      swrKey = `${swrKey}?${qs}`;
    }
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [swrKey]: documents,
    };
  }

  const playlistIndex = blocks.findIndex(
    ({ slug }) => slug === "embedded-playlist"
  );
  if (playlistIndex > -1) {
    const {
      description,
      featured: featuredField,
      playlist: playlistField,
      title,
    } = blocks[playlistIndex];
    let items = await getVideosFromPlaylist(playlistField?.playlistId);
    const featured = await getFeaturedConsultations(featuredField, items);
    if (featured?.length) {
      // Remove featured items from the playlist i.e. no need for duplication
      items = items.filter((i) =>
        featured.find((f) => f.videoId !== i.videoId)
      );
    }
    blocks[playlistIndex] = {
      slug: "embedded-playlist",
      config: {
        mostRecentText: "Most Recent",
        relevanceText: "Relevance",
        sortByText: "Sort by",
        commentsLabel: "Comments",
        previousTitle: "Previous Consultations",
        airedOnText: "Aired On",
      },
      description: description ?? null,
      featured,
      playlist: {
        ...playlistField,
        items,
      },
      title: title ?? null,
    };
  }

  return page;
}

export default processPageConsultation;
