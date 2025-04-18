import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;
const oldGlobalConfigType = "settings-site";
const newGlobalConfigType = "settings-research-site";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await mongoose.connect(mongoURL);
  const db = mongoose.connection.db;

  const existingOldGlobalConfig = await db.collection("globals").findOne({
    globalType: oldGlobalConfigType,
  });

  if (!existingOldGlobalConfig) {
    payload.logger.info(
      `No existing global settings [${oldGlobalConfigType}] config found, exiting...`,
    );
    return;
  }

  const existingNewGlobalConfig = await db.collection("globals").findOne({
    globalType: newGlobalConfigType,
  });

  if (existingNewGlobalConfig) {
    payload.logger.error(
      `Migration 20241122_054517 failed: Global type [${newGlobalConfigType}] already exists.`,
    );
    return;
  }

  try {
    const { _id, globalType, ...newGlobalConfig } = existingOldGlobalConfig;
    newGlobalConfig.globalType = newGlobalConfigType;
    await db.collection("globals").insertOne(newGlobalConfig);
    payload.logger.info(
      `✓ Successfully migrated global config [${oldGlobalConfigType}] to [${newGlobalConfigType}]`,
    );
  } catch (error) {
    payload.logger.error("Error: Migration 20241122_054517 failed.");
    throw error;
  }
}
export async function down({ payload }: MigrateDownArgs): Promise<void> {}
