import express from "express";
import payload from "payload";

require("dotenv").config({ path: ".env.local" });
const app = express();

const start = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGODB_URL,
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
  } catch (e: any) {
    console.error(e);
    process.exit();
  }

  const PORT = process.env.PAYLOAD_PUBLIC_PORT || 3010;
  app.listen(PORT, async () => {
    console.log(
      `"Express is now listening for incoming connections on port ${PORT}."`
    );
  });
};

start();
