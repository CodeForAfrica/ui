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
// Since we're using middleware, we must provide hostname, in addition to port
// https://nextjs.org/docs/advanced-features/custom-server
// Again, since we're using 'next start' to start the app in production,
// 'localhost' will work in most cases. In Docker containers however, we may
// have to set it to '0.0.0.0' and hence the optional NEXT_HOSTNAME env var.
// https://github.com/vercel/next.js/discussions/33835#discussioncomment-2559392
const hostname = process.env.NEXT_HOSTNAME || "localhost";
const port = Number.parseInt(process.env.PORT || "3000", 10);
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
    const nextApp = next({ dev, hostname, port });

    const nextHandler = nextApp.getRequestHandler();

    nextApp.prepare().then(() => {
      console.info("NextJS started");

      server.get("*", (req: any, res: any) => nextHandler(req, res));

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
