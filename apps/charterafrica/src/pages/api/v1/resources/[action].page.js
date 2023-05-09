import {
  createEcosystemResource,
  updateEcosystemResource,
} from "@/charterafrica/lib/tools/syncEcosystem";

const isApiKeyValid = (key) => {
  return key && key === process.env.LOCAL_API_KEY;
};

const functionMap = {
  "create-ecosystem-resource": createEcosystemResource,
  "update-ecosystem-resource": updateEcosystemResource,
};

export default async function handler(req, res) {
  const {
    query: { action },
  } = req;
  const key = req.headers["x-api-key"];
  if (!isApiKeyValid(key)) {
    return res.status(403).json({ message: "INVALID API KEY" });
  }
  const func = functionMap[action];
  if (func) {
    const response = await func();
    return res.status(200).json(response);
  }
  return res.status(404).json({ message: "UNKNOWN_FREQUENCY", action });
}
