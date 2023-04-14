import api from "../payload";

import { fetchSpreadsheetPerSheet } from "./fetchGSheet";
import { createTool } from "./models";

const processSheet = async () => {
  const { spreadSheetId, sheetName } = await api.findGlobal("github-tool");
  const data = await fetchSpreadsheetPerSheet({ spreadSheetId, sheetName });
  const uniqueEntries = Object.values(
    data.reduce((acc, obj) => {
      acc[obj["Tool Github"]] = obj;
      return acc;
    }, {})
  );

  const toProcess = uniqueEntries.map(async (rawData) => {
    const github = rawData["Tool Github"]
      ?.replace(/^https?:\/\/github\.com\//, "")
      .replace(/\/$/, "");
    const toCreate = {
      github,
      name: rawData["Tool Name"],
      description: rawData["Tool Description"],
      location: rawData["Tool Description"],
      topic: rawData.Topic,
    };
    const tool = await createTool(toCreate);
    return tool;
  });
  const res = await Promise.all(toProcess);
  return res;
};

const processGsheet = async (_, res) => {
  try {
    const data = await processSheet();
    return res
      .status(200)
      .json({ message: "PROCESS INITIATED SUCCESSFULLY", data });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default processGsheet;
