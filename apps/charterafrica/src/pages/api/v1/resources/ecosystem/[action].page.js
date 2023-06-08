import {
  updateEcosystemList,
  updateEcosystemContent,
} from "@/charterafrica/lib/ecosystem/ecosystem";

const isApiKeyValid = (key) => {
  return key && key === process.env.RESOURCES_SECRET_TOKEN;
};

const actionMap = {
  "update-ecosystem-list": updateEcosystemList,
  "update-ecosystem-content": updateEcosystemContent,
};

export default async function handler(req, res) {
  const {
    query: { action },
  } = req;
  const key = req.headers["x-api-key"];
  if (!isApiKeyValid(key)) {
    return res.status(403).json({ message: "INVALID_API_KEY" });
  }
  const actionFunc = actionMap[action];
  if (actionFunc) {
    const response = await actionFunc(req, res);
    return res.status(200).json(response);
  }
  return res.status(404).json({ message: "UNKNOWN_ACTION", action });
}
