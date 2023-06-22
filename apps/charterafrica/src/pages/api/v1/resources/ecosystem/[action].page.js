import { schema } from "@/charterafrica/lib/ecosystem/airtable";
import {
  updateEcosystemList,
  updateEcosystemContent,
} from "@/charterafrica/lib/ecosystem/ecosystem";

const isApiKeyValid = (key) => {
  return key && key === process.env.RESOURCES_SECRET_TOKEN;
};

const actionMap = {
  "update-list": updateEcosystemList,
  "update-content": updateEcosystemContent,
  schema,
};

export default async function handler(req, res) {
  const {
    query: { action },
  } = req;
  const key = req.headers["x-api-key"];
  if (!isApiKeyValid(key) && action !== "schema") {
    return res.status(403).json({ message: "INVALID_API_KEY" });
  }
  const actionFunc = actionMap[action];
  if (actionFunc) {
    const response = await actionFunc(req, res);
    if (response) {
      return res.status(200).json(response);
    }
  }
  return res.status(404).json({ message: "UNKNOWN_ACTION", action });
}
