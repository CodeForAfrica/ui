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
    payload.logger.error(
      `No existing global settings [${oldGlobalConfigType}] config found, exiting...`,
    );
    return;
  }

  let newGlobalConfig = await db.collection("globals").findOne({
    globalType: newGlobalConfigType,
  });

  if (newGlobalConfig) {
    payload.logger.error(
      `Migration failed: Unable to migrate [${oldGlobalConfigType}] to [${newGlobalConfigType}] because a global configuration with this name already exists.`,
    );
    return;
  }

  try {
    newGlobalConfig = {
      ...existingGlobalConfig,
      globalType: newGlobalConfigType,
    };

    delete newGlobalConfig._id;
    await db.collection("globals").insertOne(newGlobalConfig);
    payload.logger.info(
      `✓ Successfully migrated global config [${oldGlobalConfigType}] to [${newGlobalConfigType}]`,
    );
  } catch (error) {
    payload.logger.error("Error: Migration failed.");
    throw error;
  }
}
export async function down({ payload }: MigrateDownArgs): Promise<void> {}
