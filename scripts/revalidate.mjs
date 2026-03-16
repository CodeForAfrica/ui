#!/usr/bin/env node

/**
 * @fileoverview Next.js ISR Revalidation Client.
 * Optimized for Node.js 24. Required environment: REVALIDATE_SECRET, APP_URL.
 */

import { parseArgs } from "node:util";
import { stderr, stdout, env, exit } from "node:process";

const { positionals: paths } = parseArgs({ allowPositionals: true });
if (paths.length === 0) {
  stdout.write("No paths provided. Revalidation skipped.\n");
  exit(0);
}

const { REVALIDATE_SECRET, APP_URL } = env;
const REQUEST_TIMEOUT_MS = 10_000;
if (!REVALIDATE_SECRET || !APP_URL) {
  stderr.write(
    "Critical Error: REVALIDATE_SECRET or APP_URL is not defined.\n",
  );
  exit(1);
}
let BASE_URL;
try {
  BASE_URL = new URL(APP_URL).origin;
} catch (err) {
  stderr.write(`APP_URL: ${APP_URL} is not a valid URL.\n`);
  exit(1);
}
const REVALIDATE_ENDPOINT = `${BASE_URL}/api/v1/revalidate`;

/**
 * Triggers revalidation via a secure POST request.
 */
async function triggerRevalidation(routePath) {
  const normalizedPath = routePath.startsWith("/")
    ? routePath
    : `/${routePath}`;
  try {
    const response = await fetch(REVALIDATE_ENDPOINT, {
      method: "POST",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NextJS-Deployment-Revalidator/1.1",
        Authorization: `Bearer ${REVALIDATE_SECRET}`,
      },
      body: JSON.stringify({
        path: normalizedPath,
      }),
    });
    const data = await response.json().catch(() => ({}));

    if (response.ok && data.revalidated) {
      return { path: normalizedPath, success: true, status: response.status };
    }
    return {
      path: normalizedPath,
      success: false,
      status: response.status,
      detail: data.message || response.statusText,
    };
  } catch (err) {
    return {
      path: normalizedPath,
      success: false,
      status: 0,
      detail: err.message,
    };
  }
}

/**
 * Main Orchestrator
 */
stdout.write(`Initiating secure revalidation for ${paths.length} routes...\n`);

const results = [];
// Keep revalidation requests sequential for now to avoid spiky load during deploys.
for (const path of paths) {
  const result = await triggerRevalidation(path);
  results.push(result);

  if (result.success) {
    stdout.write(`[OK] ${result.path}\n`);
  } else {
    stderr.write(
      `[FAILED] ${result.path} (Status: ${result.status}) - ${result.detail}\n`,
    );
  }
}

const failed = results.filter((r) => !r.success);
if (failed.length > 0) {
  stderr.write(`Process completed with ${failed.length} failure(s).\n`);
  exit(1);
}

stdout.write("Deployment cache warming successful.\n");
