import path from "path";
import { spawn } from "child_process";
import express from "express";
import next from "next";
import payload from "payload";
import { Payload } from "payload/dist/payload";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const hostname = process.env.NEXT_HOSTNAME || "localhost";
const PORT = parseInt(process.env.PAYLOAD_PUBLIC_PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));
}

const app = express();

const start = async (): Promise<void> => {
  let localPayload: Payload;
  try {
    localPayload = await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGODB_URL,
      express: app,
      onInit: (initPayload) => {
        initPayload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
  } catch (e: any) {
    console.error(e);
    process.exit();
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
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

  const nextApp = next({ dev, hostname, port: PORT });
  const nextHandler = nextApp.getRequestHandler();
  nextApp.prepare().then(() => {
    localPayload.logger.info("NextJS started");

    app.get("*", (req: any, res: any) => nextHandler(req, res));
    app.post("*", (req: any, res: any) => nextHandler(req, res));
    app.put("*", (req: any, res: any) => nextHandler(req, res));

    app.listen(PORT, async () => {
      localPayload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_APP_URL}`,
      );
    });
  });
};

start();
