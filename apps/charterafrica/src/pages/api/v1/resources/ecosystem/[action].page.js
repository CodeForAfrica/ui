import airtable from "@/charterafrica/lib/ecosystem/airtable";
import {
  updateList,
  updateContent,
} from "@/charterafrica/lib/ecosystem/ecosystem";

const isApiKeyValid = (key) => {
  return key && key === process.env.RESOURCES_SECRET_TOKEN;
};

async function schema(req, res) {
  const { baseId } = req.query;
  if (!baseId) {
    return res.status(400).json({ message: "MISSING BASE ID" });
  }
  return airtable.schema(baseId);
}

async function bases() {
  return airtable.bases();
}

async function entities(req, res) {
  const key = req.headers["x-api-key"];
  if (!isApiKeyValid(key)) {
    return res.status(403).json({ message: "INVALID_API_KEY" });
  }
  if (req.method === "POST") {
    return updateList();
  }
  if (req.method === "PUT") {
    return updateContent();
  }
  return res.status(405).json({ message: "METHOD_NOT_ALLOWED" });
}

const actionMap = {
  schema,
  bases,
  entities,
};

export default async function handler(req, res) {
  const {
    query: { action },
  } = req;
  const actionFunc = actionMap[action];
  if (actionFunc) {
    const response = await actionFunc(req, res);
    if (response) {
      return res.status(200).json(response);
    }
  }
  return res.status(404).json({ message: "UNKNOWN_ACTION", action });
}
