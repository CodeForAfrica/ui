import config from "@/promisetracker/config";
import serverFn from "@/promisetracker/lib/server";
import { formatDate } from "@/promisetracker/utils";

/**
 * Load fact checks stories from PesaCheck site.
 */
function pc(site) {
  const server = serverFn(site);
  const SITE_FACT_CHECKS_URL = server.env("FACT_CHECKS_URL");
  const SITE_FACT_CHECKS_TAG = server.env("FACT_CHECKS_TAG");

  const toFactCheck = (report) => ({
    date: formatDate(report.updatedAt) || null,
    image: `https://cdn-images-1.medium.com/max/480/${report.virtuals.previewImage?.imageId}`,
    description: report.virtuals?.subtitle || null,
    href: `${SITE_FACT_CHECKS_URL}/${report.uniqueSlug}`,
    title: report.title || null,
  });

  async function getFactChecks() {
    const url = `https://corsio.devops.codeforafrica.org/?${SITE_FACT_CHECKS_URL}/tagged/${SITE_FACT_CHECKS_TAG}?format=json`;
    const response = await fetch(url);
    const json = await JSON.parse(
      (await response.text()).replace("])}while(1);</x>", "")
    );
    const reportStreamItems = await json.payload.streamItems;
    const reports = await reportStreamItems.map(
      (reportStreamItem) =>
        reportStreamItem.postPreview &&
        json.payload.references.Post[reportStreamItem.postPreview.postId]
    );

    // Remove null stories & return props supported in PostCard
    return reports.filter((report) => report).map(toFactCheck);
  }

  async function getFactCheck(pesacheckUrl) {
    const { PROXY_URL } = config;
    const url = `${PROXY_URL}/?${pesacheckUrl}?format=json`;
    const response = await fetch(url);
    const json = await JSON.parse(
      (await response.text()).replace("])}while(1);</x>", "")
    );
    return toFactCheck(json.payload.value);
  }

  async function getFactCheckList(urls) {
    return Promise.all(urls?.map(async (url) => getFactCheck(url)) || []);
  }
  const api = {
    factChecks: (options) => {
      const url = options?.url || options?.urls?.[0];
      return {
        get latest() {
          return (async () => {
            return getFactChecks();
          })();
        },
        get list() {
          if (options.urls) {
            return (async () => {
              return getFactCheckList(options.urls);
            })();
          }
          return [];
        },
        get first() {
          if (url) {
            return (async () => {
              return getFactCheck(url);
            })();
          }
          return null;
        },
      };
    },
  };
  return api;
}

export default pc;
