import {
  fetchDocument,
  fetchDocuments,
  fetchDocumentIframe,
} from "@/charterafrica/lib/sourceAfrica";
import { fetchPlaylistItems } from "@/charterafrica/lib/youtube";
import getDocumentsQuery from "@/charterafrica/utils/documents/documents";
import queryString from "@/charterafrica/utils/documents/queryString";

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
  // NOTE: This is very similar to processSingleDocumentPage in processPageDocuments
  //       we need to find a way to deduplicate.
  const { params } = context;
  const { blocks } = page;
  const documentsIndex = blocks.findIndex(
    ({ slug }) => slug === "embedded-documents"
  );
  if (documentsIndex === -1) {
    return null;
  }

  const {
    group: { options },
  } = blocks[documentsIndex];
  const documentsQuery = getDocumentsQuery(page, context, options);
  const { pathname, ...query } = documentsQuery;
  // Documents are shown unders /documents of this page
  const documentsPathname = `${pathname}/documents`;
  const id = params.slugs[3];
  const document = await fetchDocument(id, documentsPathname);
  if (!document) {
    return null;
  }

  const { labels: commonLabels } = await api.findGlobal("common-labels", query);
  const { url } = document;
  const data = await fetchDocumentIframe({ ...query, responsive: true, url });
  const { html } = data;
  return {
    ...page,
    blocks: [
      {
        ...document,
        html,
        labels: {
          ...commonLabels,
        },
        slug: "document",
      },
    ],
  };
}

async function processPageConsultation(page, api, context) {
  const { params, locale } = context;
  // Check if we are on a document page: /opportunities/consultation/documents/<id>
  if (params.slugs.length > 3 && params.slugs[2] === "documents") {
    return processPageConsultationDocument(page, api, context);
  }

  const { blocks } = page;
  const documentsIndex = blocks.findIndex(
    ({ slug }) => slug === "embedded-documents"
  );
  if (documentsIndex > -1) {
    const {
      description: documentsDescription,
      group: { groupId, options, pinnedDocuments },
      title: documentsTitle,
    } = blocks[documentsIndex];
    const documentsQuery = getDocumentsQuery(page, context, options);
    const { pathname, ...query } = documentsQuery;
    // Show documents in unders /documents of this page
    const documentsPathname = `${pathname}/documents`;
    const documents = await fetchDocuments(
      `group:${groupId} lang:${locale}`,
      documentsPathname,
      query,
      pinnedDocuments
    );
    blocks[documentsIndex] = {
      ...blocks[documentsIndex],
      ...documents,
      description: documentsDescription ?? null,
      documentOptions: options,
      pathname: documentsPathname,
      slug: "documents",
      title: documentsTitle ?? null,
      pinnedDocuments,
    };

    let swrKey = `/api/v1/resources/documents`;
    const qs = queryString(documentsQuery);
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
      ...blocks[playlistIndex],
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
      slug: "embedded-playlist",
      title: title ?? null,
    };
  }

  return page;
}

export default processPageConsultation;
