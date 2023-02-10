/* eslint-disable no-console */
import path from "path";

import { loadEnvConfig } from "@next/env";
import express from "express";
import next from "next";
import nextBuild from "next/dist/build";
import nodemailerSendgrid from "nodemailer-sendgrid";
import payload from "payload";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const sendGridAPIKey = process.env.SENDGRID_API_KEY;

// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));
}

const server = express();

const start = async () => {
  let localPayload;
  try {
    localPayload = await payload.init({
      ...(sendGridAPIKey
        ? {
            email: {
              transportOptions: nodemailerSendgrid({
                apiKey: sendGridAPIKey,
              }),
              fromName: process.env.SENDGRID_FROM_NAME || "Admin",
              fromAddress:
                process.env.SENDGRID_FROM_EMAIL || "admin@example.com",
            },
          }
        : undefined),
      secret: process.env.PAYLOAD_SECRET_KEY,
      mongoURL: process.env.MONGO_URL,
      express: server,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
  } catch (e: any) {
    console.error(e);
    process.exit();
  }

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev });

    const nextHandler = nextApp.getRequestHandler();

    server.get("*", (req: any, res: any) => nextHandler(req, res));

    nextApp.prepare().then(() => {
      console.info("NextJS started");

      server.listen(port, async () => {
        console.info(`Server listening on ${port}...`);
      });
    });
  } else {
    server.listen(port, async () => {
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
