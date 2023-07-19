import express from "express";
import payload from "payload";

require("dotenv").config();
require("dotenv").config({ path: "./.env.local" });
const app = express();

const PORT = process.env.PAYLOAD_PORT || 3010;

const start = async () => {
  await payload.init({
    secret: process.env.CFA_PAYLOAD_SECRET,
    mongoURL: process.env.CFA_MONGODB_URI,
    express: app,
  });

  app.listen(PORT, async () => {
    console.log(
      `Express is now listening for incoming connections on port ${PORT}.`
    );
  });
};

start();
