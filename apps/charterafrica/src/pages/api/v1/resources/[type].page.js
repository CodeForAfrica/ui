import * as Sentry from "@sentry/nextjs";

import {
  getServerSideOrgs,
  getServerSideContributors,
  getServerSideTools,
} from "@/charterafrica/lib/data/local";
import fetchDatasets from "@/charterafrica/lib/openAfrica";
import { fetchDocuments } from "@/charterafrica/lib/sourceAfrica";

const collectionMap = {
  organisations: getServerSideOrgs,
  contributors: getServerSideContributors,
  tools: getServerSideTools,
};

async function collections(req, res) {
  const { query: { collection, locale = "en", ...query } = {} } = req;
  const collectionFunc = collectionMap[collection];
  if (!collectionFunc) {
    return res.status(400).json({ message: "UNKNOWN_COLLECTION", collection });
  }
  const breadcrumbs = [
    {
      url: `/resources/${collection}`,
    },
  ];
  const page = {
    slug: collection,
    breadcrumbs,
  };
  const context = {
    locale,
    query,
  };
  const found = await collectionFunc(page, context);
  return res.status(200).json(found);
}

async function datasets(req, res) {
  const {
    sort = "metadata_created desc",
    tags,
    countries,
    q = "",
    page = 1,
    pathname,
    locale,
    organizationId,
  } = req.query;

  const data = await fetchDatasets(organizationId, pathname, {
    q,
    page,
    sort,
    tags: tags?.split(","),
    countries: countries?.split(","),
    locale,
  });
  return res.status(200).json(data);
}

async function documents(req, res) {
  const { q, pathname, showPinnedDocuments, ...rest } = req.query;
  const data = await fetchDocuments(q, pathname, rest, showPinnedDocuments);
  return res.status(200).json(data);
}

const fetchResourcesByType = {
  datasets,
  documents,
  collections,
};

export default async function handler(req, res) {
  const { type } = req.query;

  const fetchResources = fetchResourcesByType[type];
  if (fetchResources) {
    try {
      return fetchResources(req, res);
    } catch (err) {
      Sentry.captureException(err);
      return res.status(500).json(err);
    }
  }
  return res.status(404).json({ message: "UNKNOWN_TYPE", type });
}
