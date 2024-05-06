import { processNewUsers } from "@/vpnmanager/lib/processUsers";
import { loadEnvConfig } from "@next/env";
import { initSentry } from "../sentry.server.config";

initSentry();
const projectDir = process.cwd();
loadEnvConfig(projectDir);

processNewUsers();
