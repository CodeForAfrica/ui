import path from "path";

import express from "express";
import next from "next";
import nextBuild from "next/dist/build";
import payload from "payload";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const app = express();

const hostname = process.env.NEXT_HOSTNAME || "localhost";
const PORT = parseInt(process.env.PAYLOAD_PORT || "3010", 10);
const dev = process.env.NODE_ENV !== "production";

const start = async () => {
  try {
    await payload.init({
      secret: process.env.CFA_PAYLOAD_SECRET,
      mongoURL: process.env.CFA_MONGODB_URI,
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
  } catch (e: any) {
    console.error(e);
    process.exit();
  }

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev, hostname, port: PORT });

    const nextHandler = nextApp.getRequestHandler();
    await nextApp.prepare();

    app.get("*", (req: any, res: any) => nextHandler(req, res));

    app.listen(PORT, async () => {
      console.info(`Server listening on ${PORT}...`);
    });
  } else {
    app.listen(PORT, async () => {
      console.info("NextJS is now building...");
      try {
        await nextBuild(path.resolve(projectDir));
      } finally {
        process.exit();
      }
    });
  }
};

start();
