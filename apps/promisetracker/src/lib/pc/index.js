import config from "@/promisetracker/config";
import server from "@/promisetracker/lib/server";
import { formatDate } from "@/promisetracker/utils";



/**
 * Load fact checks stories from PesaCheck site.
 */
function pc(site) {
  const siteServer = server(site);
  const SITE_FACT_CHECKS_URL =
    process.env[`${siteServer.site}FACT_CHECKS_URL`] || config.FACT_CHECKS_URL;
  const SITE_FACT_CHECKS_TAG =
    process.env[`${siteServer.site}FACT_CHECKS_TAG`] || config.FACT_CHECKS_TAG;

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

  async function getFactCheckList(urls){
    return Promise.all(urls?.map(async (url) => getFactCheck(url)) || [] )
  }
  async function getFactCheck(pesacheckUrl) {
    const url = `https://corsio.devops.codeforafrica.org/?${pesacheckUrl}?format=json`;
    const response = await fetch(url);
    const json = await JSON.parse(
      (await response.text()).replace("])}while(1);</x>", "")
    );
    return toFactCheck({...json.payload,...json.payload.value})
  }

  const api = {
    factChecks: (options) => ({
      get latest() {
        return (async () => {
          return getFactChecks();
        })();
      },
      get list() {
        if(options.urls){
          return (async () => {
            return getFactCheckList(options.urls);
          })();
        }else{
          throw new Error("URl Array Required")
        }
      },
      get first() {
        if(options.url){
          return (async () => {
            return getFactCheck(options.url);
          })();
        }else{
          throw new Error("URl Required")
        }
      }
    }),
  };
  return api;
}

export default pc;
