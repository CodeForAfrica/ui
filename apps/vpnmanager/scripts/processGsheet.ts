import { processNewUsers } from "@/vpnmanager/lib/processUsers";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

processNewUsers();
