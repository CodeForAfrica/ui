import * as Sentry from "@sentry/nextjs";

import airtable from "@/charterafrica/lib/ecosystem/airtable";
import {
  processContributors,
  processTools,
  processOrganisations,
} from "@/charterafrica/lib/ecosystem/ecosystem/processData";
import api from "@/charterafrica/lib/payload";
import { ECOSYSTEM_GLOBAL } from "@/charterafrica/payload/utils/collections";

export async function updateList() {
  const config = await api.findGlobal(ECOSYSTEM_GLOBAL, {});
  const execute = async () => {
    Sentry.captureEvent({
      message: `Update Ecosystem List process started at ${new Date().toString()}`,
      level: "info",
    });
    const data = await airtable.data(config);
    await processContributors(data, config);
    await processTools(data, config);
    await processOrganisations(data, config);
    Sentry.captureEvent({
      message: `Update Ecosystem List process completed ${new Date().toString()}`,
      level: "info",
    });
  };
  execute();
  return { message: "PROCESS_STARTED" };
}

export async function updateContent() {
  return { message: "PROCESS_STARTED" };
}
