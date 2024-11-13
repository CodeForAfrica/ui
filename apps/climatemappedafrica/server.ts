import path from "path";
import { spawn } from "child_process";
import express from "express";
import next from "next";
import { loadEnvConfig } from "@next/env";
import type { Payload } from "payload/dist/payload";

// TODO(kilemensi): Figure out why alias "@/climatemappedafrica" doesn't work here
import { getClient } from "./src/lib/payload/payload-client";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.NEXT_HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
// TODO(kilemensi): Migrate to SMTP email setup instead of SendGrid specific
const smtpAuthPass = process.env.SMTP_PASS || process.env.SENDGRID_API_KEY;
const smtpFromName =
  process.env.SMTP_FROM_NAME ||
  process.env.SENDGRID_FROM_NAME ||
  "ClimateMapped Africa CMS";
const smtpFromAddress =
  process.env.SMTP_FROM_ADDRESS ||
  process.env.SENDGRID_FROM_EMAIL ||
  "noreply@dodeforafrica.org";
const smtpPort = Number(process.env.SMTP_PORT || 587);

if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));
}

const app = express();

const start = async (): Promise<void> => {
  let localPayload: Payload;
  try {
    localPayload = await getClient({
      ...(smtpAuthPass
        ? {
            email: {
              transportOptions: {
                auth: {
                  user: process.env.SMTP_USER || "apikey",
                  apiKey: smtpAuthPass,
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
      express: app,
      local: false,
      onInit: (initPayload) => {
        initPayload.logger.info(
          `Payload Admin URL: ${initPayload.getAdminURL()}`,
        );
      },
    });
  } catch (e: any) {
    console.error(e);
    process.exit();
  }

  if (process.env.NEXT_BUILD) {
    app.listen(port, async () => {
      localPayload.logger.info("NextJS is now building...");
      const nextBuild = spawn(
        "pnpm",
        ["next", "build", path.resolve(projectDir)],
        {
          shell: true,
          stdio: "inherit",
        },
      );
      nextBuild.on("close", (code) => {
        process.exit(code);
      });
      nextBuild.on("error", (err) => {
        localPayload.logger.error(err);
        process.exit(1);
      });
    });

    return;
  }

  const nextApp = next({ dev, hostname, port });
  const nextHandler = nextApp.getRequestHandler();
  nextApp.prepare().then(() => {
    localPayload.logger.info("NextJS started");

    app.get("*", (req: any, res: any) => nextHandler(req, res));
    app.post("*", (req: any, res: any) => nextHandler(req, res));
    app.put("*", (req: any, res: any) => nextHandler(req, res));

    app.listen(port, async () => {
      localPayload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_APP_URL}`,
      );
    });
  });
};

start();
