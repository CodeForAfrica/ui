import * as Sentry from "@sentry/nextjs";

import airtable from "@/charterafrica/lib/ecosystem/airtable";
import {
  prepareContributors,
  prepareTools,
  prepareOrganisations,
  updateContributor,
  updateTool,
  updateOrganisation,
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
    await prepareContributors(data, config);
    await prepareTools(data, config);
    await prepareOrganisations(data, config);
    Sentry.captureEvent({
      message: `Update Ecosystem List process completed ${new Date().toString()}`,
      level: "info",
    });
  };
  execute();
  return { message: "PROCESS_STARTED" };
}

export async function updateContent() {
  async function execute() {
    Sentry.captureEvent({
      message: `Update Ecosystem Content process started at ${new Date().toString()}`,
      level: "info",
    });
    const contributors = await updateContributor();
    const organisations = await updateOrganisation();
    const tools = await updateTool();
    Sentry.captureEvent({
      message: `Update Ecosystem Content process completed ${new Date().toString()}`,
      level: "info",
    });
    return { tools, contributors, organisations };
  }
  execute();
  return { message: "PROCESS_STARTED" };
}
