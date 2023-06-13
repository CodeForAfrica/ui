import { airtableSchema } from "@/charterafrica/lib/ecosystem/airtable";

const isApiKeyValid = (key) => {
  return key && key === process.env.RESOURCES_SECRET_TOKEN;
};

export async function schema(req, res) {
  const { source } = req.query;
  const sourceMap = { airtable: airtableSchema };
  const schemaFunc = sourceMap[source];
  if (schemaFunc) {
    const response = await schemaFunc(req, res);
    if (response) {
      return res.status(200).json(response);
    }
  }
  return res.status(404).json({ message: "SOURCE_NOT_FOUND" });
}

const actionMap = {};

export default async function handler(req, res) {
  const {
    query: { action },
  } = req;
  // Because we do not need to expose API KEY
  if (action === "schema") {
    return schema(req, res);
  }
  const key = req.headers["x-api-key"];
  if (!isApiKeyValid(key)) {
    return res.status(403).json({ message: "INVALID_API_KEY" });
  }
  const actionFunc = actionMap[action];
  if (actionFunc) {
    const response = await actionFunc(req, res);
    if (response) {
      return res.status(200).json(response);
    }
    return null;
  }
  return res.status(404).json({ message: "UNKNOWN_ACTION", action });
}
