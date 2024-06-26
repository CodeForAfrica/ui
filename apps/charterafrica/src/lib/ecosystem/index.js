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

function checkConfig(config) {
  const requiredTables = [
    "toolTableId",
    "contributorTableId",
    "organisationTableId",
    "partnersTableId",
  ];
  const isPresent = (tableName) => config?.schema?.[tableName];
  return requiredTables.every(isPresent);
}

export async function updateList() {
  const config = await api.findGlobal(ECOSYSTEM_GLOBAL, {});
  if (!checkConfig(config)) {
    Sentry.captureException("Process not executed. Ecosystem Globals not set");
    return { message: "Globals not set" };
  }
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

export async function updateContent(req) {
  async function execute() {
    Sentry.captureEvent({
      message: `Update Ecosystem Content process started at ${new Date().toString()}`,
      level: "info",
    });
    const { cache = "true" } = req.query;
    const forceUpdate = cache.toLowerCase() === "false";
    const contributors = await updateContributor(forceUpdate);
    const organisations = await updateOrganisation(forceUpdate);
    const tools = await updateTool(forceUpdate);
    Sentry.captureEvent({
      message: `Update Ecosystem Content process completed ${new Date().toString()}`,
      level: "info",
    });
    return { tools, contributors, organisations };
  }
  execute();
  return { message: "PROCESS_STARTED" };
}
