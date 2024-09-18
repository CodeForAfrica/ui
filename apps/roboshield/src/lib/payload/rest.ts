import { Config } from "@/root/payload-types";

export type CollectionConfig = keyof Config["collections"];
export type CollectionItemTypes = Config["collections"][CollectionConfig];
export type GlobalConfig = keyof Config["globals"];

async function sendRequestToPayload(url: string, options?: any): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  return response.json();
}

async function findPage(slug: string, options?: any): Promise<any> {
  const url = `${process.env.PAYLOAD_API_URL}/api/RoboshieldPages?where[slug][equals]=${slug}&depth=1&draft=false`;
  return sendRequestToPayload(url, options);
}

async function findGlobal(slug: GlobalConfig, options?: []): Promise<any> {
  const url = `${process.env.PAYLOAD_API_URL}/api/globals/roboshield-site-settings`;
  return sendRequestToPayload(url, options);
}

const api = {
  findGlobal,
  findPage,
};

export type Api = typeof api;

export default api;
