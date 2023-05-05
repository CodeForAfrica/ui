import processData from "@/charterafrica/lib/tools/processData";

const sourceMap = {
  processData,
};

const isApiKeyValid = (key) => {
  return key && key === process.env.LOCAL_API_KEY;
};
export default async function handler(req, res) {
  const {
    query: { path },
  } = req;

  const response = sourceMap[path];
  const key = req.headers["x-api-key"];
  if (!isApiKeyValid(key)) {
    return res.status(403).json({ message: "INVALID API KEY" });
  }
  if (response) {
    return response(req, res);
  }
  return res.status(404).json({ message: "UNKNOWN_SOURCE", path });
}
