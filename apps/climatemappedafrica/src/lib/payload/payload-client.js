// TODO(kilemensi): Need to update eslint to handle globalThis but we should
//                  do that when upgrading Next.js
/* eslint no-undef:0 */
import { loadEnvConfig } from "@next/env";
import payload from "payload";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

let cached = globalThis.payload;

if (!cached) {
  globalThis.payload = { client: null, promise: null };
  cached = globalThis.payload;
}

export async function getClient(options) {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      // https://payloadcms.com/docs/local-api/overview#nextjs-conflict-with-local-api
      local: !options?.express,
      secret: process.env.PAYLOAD_SECRET,
      ...options,
    });
  }
  try {
    cached.client = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.client;
}

export default undefined;
