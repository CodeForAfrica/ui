import processData from "@/charterafrica/lib/tools/processData";

const sourceMap = {
  processData,
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
