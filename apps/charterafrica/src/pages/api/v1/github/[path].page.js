import {
  processGsheet,
  updateTools,
} from "@/charterafrica/lib/tools/processGsheet";
import {
  fetchSpreadSheetSheetByName,
  getSpreadSheetSheetTitles,
} from "@/charterafrica/lib/tools/spreadsheet";

const sheetsPerSpreadsheet = async (req, res) => {
  try {
    const { spreadSheetId } = req.query;
    const data = await getSpreadSheetSheetTitles({ spreadSheetId });
    if (data.error) {
      return res.status(data.error.code).json(data.error);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const sheetData = async (req, res) => {
  try {
    const { spreadSheetId, sheetName } = req.query;
    const data = await fetchSpreadSheetSheetByName({
      spreadSheetId,
      sheetName,
    });
    if (data.error) {
      return res.status(data.error.code).json(data.error);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const sourceMap = {
  "sheets-per-doc": sheetsPerSpreadsheet,
  "sheet-data": sheetData,
  processGsheet,
  updateTools,
};

export default async function handler(req, res) {
  const {
    query: { path },
  } = req;
  const response = sourceMap[path];
  if (response) {
    return response(req, res);
  }
  return res.status(404).json({ message: "UNKNOWN_SOURCE", path });
}
