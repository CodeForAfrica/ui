import { fetchSpreadsheet } from "@/charterafrica/lib/github/fetchGSheet";
import processGsheet from "@/charterafrica/lib/github/processGsheet";

const spreadsheet = async (req, res) => {
  try {
    const { pathname, source, ...rest } = req.query;
    const data = await fetchSpreadsheet(pathname, rest);
    if (data.error) {
      return res.status(data.error.code).json(data.error);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const sourceMap = {
  spreadsheet,
  processGsheet,
};

export default async function handler(req, res) {
  const {
    query: { source },
  } = req;
  const response = sourceMap[source];
  if (response) {
    return response(req, res);
  }
  return res.status(404).json({ message: "UNKNOWN_SOURCE", source });
}
