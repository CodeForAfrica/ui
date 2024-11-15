import path from "path";
import { spawn } from "child_process";

import { loadEnvConfig } from "@next/env";
import express from "express";
import next from "next";
import payload from "payload";
import { Payload } from "payload/dist/payload";

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

const smtpAuthPass = process.env.SMTP_PASS || process.env.SENDGRID_API_KEY;
const smtpFromName =
  process.env.SMTP_FROM_NAME ||
  process.env.SENDGRID_FROM_NAME ||
  "Charter Africa CMS";
const smtpFromAddress =
  process.env.SMTP_FROM_ADDRESS ||
  process.env.SENDGRID_FROM_EMAIL ||
  "noreply@codeforafrica.org";
const smtpPort = Number(process.env.SMTP_PORT || 587);
// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));
}

const server = express();

const start = async (): Promise<void> => {
  let localPayload: Payload;
  try {
    localPayload = await payload.init({
      ...(smtpAuthPass
        ? {
            email: {
              transportOptions: {
                auth: {
                  user: process.env.SMTP_USER || "apikey",
                  pass: smtpAuthPass,
                },
                host: process.env.SMTP_HOST || "smtp.sendgrid.net",
                port: smtpPort,
                secure: smtpPort === 465, // true for port 465, false (the default) for 587 and others
              },
              fromName: smtpFromName,
              fromAddress: smtpFromAddress,
            },
          }
        : undefined),
      secret: process.env.PAYLOAD_SECRET_KEY,
      express: server,
      onInit: (initPayload) => {
        initPayload.logger.info(
          `Payload Admin URL: ${initPayload.getAdminURL()}`,
        );
      },
    });
  } catch (e: any) {
    /* eslint-disable-next-line no-console */
    console.error(e);
    process.exit();
  }

  if (process.env.NEXT_BUILD) {
    server.listen(port, async () => {
      localPayload.logger.info("NextJS is now building...");
      const nextBuild = spawn(
        "pnpm",
        ["next", "build", path.resolve(projectDir)],
        { shell: true, stdio: "inherit" },
      );
      nextBuild.on("close", (code) => {
        process.exit(code);
      });
      nextBuild.on("error", (error) => {
        localPayload.logger.error(error);
        process.exit();
      });
    });

    return;
  }

  const nextApp = next({ dev, hostname, port });
  const nextHandler = nextApp.getRequestHandler();
  nextApp.prepare().then(() => {
    localPayload.logger.info("NextJS started");

    server.get("*", (req: any, res: any) => nextHandler(req, res));
    server.post("*", (req: any, res: any) => nextHandler(req, res));
    server.put("*", (req: any, res: any) => nextHandler(req, res));

    server.listen(port, async () => {
      localPayload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_APP_URL}`,
      );
    });
  });
};

start();
