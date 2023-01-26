/* eslint-disable no-console */
const path = require("path");

const env = require("@next/env");
const express = require("express");
const next = require("next");
const nextBuild = require("next/dist/build").default;
const nodemailerSendgrid = require("nodemailer-sendgrid");
const payload = require("payload");

const projectDir = process.cwd();
env.loadEnvConfig(projectDir);

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

payload.init({
  ...(sendGridAPIKey
    ? {
        email: {
          transportOptions: nodemailerSendgrid({
            apiKey: sendGridAPIKey,
          }),
          fromName: "Admin",
          fromAddress: "admin@example.com",
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

if (!process.env.NEXT_BUILD) {
  const nextApp = next({ dev });

  const nextHandler = nextApp.getRequestHandler();

  server.get("*", (req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    console.log("NextJS started");

    server.listen(port, async () => {
      console.log(`Server listening on ${port}...`);
    });
  });
} else {
  server.listen(port, async () => {
    console.log("NextJS is now building...");
    await nextBuild(path.resolve(projectDir));
    process.exit();
  });
}
